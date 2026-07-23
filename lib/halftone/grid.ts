import type { HalftoneGridConfig } from "./types";

/**
 * Spacing bounds (CSS px between adjacent dot centers). Small screens use the
 * upper bound (fewer, larger dots — legible and cheap to animate); large
 * screens use the lower bound (a finer, more photographic halftone grid).
 */
const MIN_SPACING_PX = 5;
const MAX_SPACING_PX = 8.5;

/** Container width, in CSS px, at which spacing bottoms out at MIN_SPACING_PX. */
const DENSE_AT_WIDTH_PX = 480;
/** Container width, in CSS px, at which spacing tops out at MAX_SPACING_PX. */
const SPARSE_AT_WIDTH_PX = 220;

/** A dot's radius at full black, as a fraction of the grid spacing — leaves a
 * small gap between adjacent dots even at maximum ink so the grid never
 * visually merges into a solid mass. */
const MAX_RADIUS_TO_SPACING_RATIO = 0.46;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Derives dot density and size from the rendered container size, so the
 * portrait stays a comparable number of dots-per-area across viewports.
 * `spacingScale` (default 1) multiplies the resulting spacing — pass a value
 * below 1 to force a finer grid on a container smaller than
 * `SPARSE_AT_WIDTH_PX`, where the size-based curve alone would otherwise
 * clamp to the sparse, large-dot end and look pixelated. */
export function computeGridConfig(
  containerWidth: number,
  containerHeight: number,
  spacingScale = 1,
): HalftoneGridConfig {
  const widthT = clamp(
    (containerWidth - SPARSE_AT_WIDTH_PX) / (DENSE_AT_WIDTH_PX - SPARSE_AT_WIDTH_PX),
    0,
    1,
  );
  const spacing = (MAX_SPACING_PX - widthT * (MAX_SPACING_PX - MIN_SPACING_PX)) * spacingScale;

  const cols = Math.max(1, Math.round(containerWidth / spacing));
  const rows = Math.max(1, Math.round(containerHeight / spacing));

  return {
    cols,
    rows,
    spacing,
    maxRadius: spacing * MAX_RADIUS_TO_SPACING_RATIO,
  };
}
