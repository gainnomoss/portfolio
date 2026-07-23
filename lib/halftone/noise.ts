import { createNoise2D, type NoiseFunction2D } from "simplex-noise";
import type { BreathingConfig, Vec2 } from "./types";

export function createBreathingNoise(): NoiseFunction2D {
  return createNoise2D();
}

/**
 * A near-imperceptible, low-frequency positional offset for a dot's resting
 * position — the "portrait breathes" idle motion. Two independent samples
 * (offset in noise-space on the x lookup) keep the x/y wobble from moving in
 * lockstep, which would read as a single pulsing scale rather than a calm
 * drift.
 */
export function breathingOffset(
  noise2D: NoiseFunction2D,
  gridX: number,
  gridY: number,
  timeMs: number,
  config: BreathingConfig,
): Vec2 {
  const t = timeMs * config.timeFrequency;
  const nx = gridX * config.frequency;
  const ny = gridY * config.frequency;

  return {
    x: noise2D(nx, ny + t) * config.amplitude,
    y: noise2D(nx + 1000, ny + t) * config.amplitude,
  };
}
