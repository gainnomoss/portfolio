import type { Dot } from "./types";

/** Dots smaller than this (CSS px) are skipped entirely — both because
 * they're visually indistinguishable from nothing and to keep the per-frame
 * path cheap once a lot of a bright image has faded out. */
const MIN_VISIBLE_RADIUS = 0.35;

export function clearCanvas(ctx: CanvasRenderingContext2D, widthCss: number, heightCss: number): void {
  ctx.clearRect(0, 0, widthCss, heightCss);
}

/**
 * Draws every dot as a single flat fill — one `Path2D`/`fill()` call for the
 * whole frame rather than per-dot, since the entire portrait is one solid
 * color (monochrome, no gradients/glow/outlines).
 */
export function drawDots(ctx: CanvasRenderingContext2D, dots: readonly Dot[], color: string): void {
  ctx.fillStyle = color;
  ctx.beginPath();

  for (const dot of dots) {
    if (dot.radius < MIN_VISIBLE_RADIUS) continue;
    ctx.moveTo(dot.x + dot.radius, dot.y);
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
  }

  ctx.fill();
}
