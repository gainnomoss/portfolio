export interface Vec2 {
  x: number;
  y: number;
}

/** A single halftone dot, tracked in CSS-pixel (not device-pixel) space. */
export interface Dot {
  /** Grid position the dot is sampled at, before any idle-breathing offset. */
  gridX: number;
  gridY: number;
  /** Current position the spring is animating. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Radius implied by the sampled brightness at this cell — the "resting" size. */
  baseRadius: number;
  /** Current rendered radius, springs toward a target each frame. */
  radius: number;
  radiusVelocity: number;
}

export interface HalftoneGridConfig {
  cols: number;
  rows: number;
  /** Distance between adjacent grid points, in CSS px. */
  spacing: number;
  /** Largest radius a fully-black cell can render at, in CSS px. */
  maxRadius: number;
}

export interface PointerState {
  /** Pointer position in the canvas's local CSS-pixel space, or null when absent. */
  position: Vec2 | null;
}

export interface InteractionConfig {
  /** Radius, in CSS px, within which the pointer influences dots. */
  radius: number;
  /** Maximum distance a dot is pushed away from the pointer, in CSS px. */
  maxDisplacement: number;
  /** Radius multiplier dots blend toward at the pointer's center. */
  focusRadiusScale: number;
}

export interface SpringConfig {
  /** Spring stiffness — higher snaps back faster. */
  stiffness: number;
  /** Damping — tuned near critical damping for the stiffness above (no bounce). */
  damping: number;
}

export interface BreathingConfig {
  /** Max offset applied to a dot's resting position, in CSS px. */
  amplitude: number;
  /** Spatial frequency of the noise field (per CSS px). */
  frequency: number;
  /** Temporal frequency of the noise field (per ms). */
  timeFrequency: number;
}
