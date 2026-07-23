import type { Dot, InteractionConfig, SpringConfig, Vec2 } from "./types";

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Position spring: soft enough to read as "gently move away," tuned just
 * under critical damping (c = 2*sqrt(k)) for its stiffness so dots settle
 * back home without any bounce/overshoot. */
export const POSITION_SPRING: SpringConfig = {
  stiffness: 180,
  damping: 24,
};

/** Radius spring: a bit snappier than position so the size change reads
 * immediately on approach rather than lagging the movement. */
export const RADIUS_SPRING: SpringConfig = {
  stiffness: 260,
  damping: 30,
};

/** Smoothstep falloff so the interaction radius has a soft edge instead of a
 * hard cutoff circle. */
function smoothFalloff(distance: number, radius: number): number {
  if (distance >= radius) return 0;
  const t = 1 - distance / radius;
  return t * t * (3 - 2 * t);
}

/** Semi-implicit Euler step of a single scalar toward `target` under a
 * damped spring. Stable and cheap enough to run per-dot, per-frame, per-axis. */
export function stepSpring(
  value: number,
  velocity: number,
  target: number,
  spring: SpringConfig,
  dtSeconds: number,
): [nextValue: number, nextVelocity: number] {
  const acceleration = spring.stiffness * (target - value) - spring.damping * velocity;
  const nextVelocity = velocity + acceleration * dtSeconds;
  const nextValue = value + nextVelocity * dtSeconds;
  return [nextValue, nextVelocity];
}

export interface InteractionResult {
  /** Displacement to add to a dot's resting position, in CSS px. */
  offset: Vec2;
  /** 0 (no influence) → 1 (at the pointer's center) — how strongly this dot
   * should blend toward the uniform "in-focus" radius. */
  focus: number;
}

const ZERO_INTERACTION: InteractionResult = { offset: { x: 0, y: 0 }, focus: 0 };

/**
 * Computes how much a dot at `home` should be pushed away from `pointer`,
 * and how strongly it should blend toward the uniform "in-focus" dot size —
 * the "dots reorganize into a precise, ordered pattern" moment.
 */
export function computeInteraction(
  home: Vec2,
  pointer: Vec2 | null,
  config: InteractionConfig,
): InteractionResult {
  if (!pointer) return ZERO_INTERACTION;

  const dx = home.x - pointer.x;
  const dy = home.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  const focus = smoothFalloff(distance, config.radius);
  if (focus === 0) return ZERO_INTERACTION;

  // Guard the degenerate case of the pointer sitting exactly on a dot.
  const [dirX, dirY] = distance > 0.001 ? [dx / distance, dy / distance] : [1, 0];
  const displacement = config.maxDisplacement * focus;

  return {
    offset: { x: dirX * displacement, y: dirY * displacement },
    focus,
  };
}

/** Advances one dot's position and radius springs by `dtSeconds` toward the
 * given targets, mutating it in place (called once per dot, per frame). */
export function stepDot(
  dot: Dot,
  targetX: number,
  targetY: number,
  targetRadius: number,
  dtSeconds: number,
): void {
  const [nextX, nextVx] = stepSpring(dot.x, dot.vx, targetX, POSITION_SPRING, dtSeconds);
  const [nextY, nextVy] = stepSpring(dot.y, dot.vy, targetY, POSITION_SPRING, dtSeconds);
  const [nextRadius, nextRadiusVel] = stepSpring(
    dot.radius,
    dot.radiusVelocity,
    targetRadius,
    RADIUS_SPRING,
    dtSeconds,
  );

  dot.x = nextX;
  dot.vx = nextVx;
  dot.y = nextY;
  dot.vy = nextVy;
  dot.radius = Math.max(0, nextRadius);
  dot.radiusVelocity = nextRadiusVel;
}
