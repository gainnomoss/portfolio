/**
 * Reads an image's brightness on a regular grid and converts it to "ink"
 * amount per cell (0 = no dot, 1 = full-radius dot) — the halftone printing
 * convention of dark-in / big-dot-out.
 */

/** Luminance at or below this (0–1) is treated as full ink. */
const BLACK_POINT = 0.08;
/** Luminance at or above this (0–1) is treated as no ink at all, so flat
 * white background (and near-white skin highlights) fully disappear instead
 * of rendering as a field of barely-visible specks. */
const WHITE_POINT = 0.86;
/** Applied to the black/white-normalized value to push midtones darker,
 * so the portrait reads with more contrast than a linear map would give. */
const CONTRAST_GAMMA = 1.4;
/** Pixels with alpha below this (0–255) are treated as transparent
 * background (no ink), for source images that use alpha instead of a flat
 * white fill. */
const ALPHA_CUTOFF = 16;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Draws `image` into an offscreen canvas downscaled to `cols`x`rows` — the
 * browser's bilinear downscale does the area-averaging a real halftone scan
 * needs — then reads one ink value per cell, row-major. The source is
 * center-cropped to the grid's aspect ratio first (matching the fallback
 * `<Image>`'s `object-cover`), so a portrait-shaped photo sampled into a
 * square (or otherwise mismatched) grid isn't squashed.
 */
export function sampleImageToInk(image: HTMLImageElement, cols: number, rows: number): Float32Array {
  const offscreen = document.createElement("canvas");
  offscreen.width = cols;
  offscreen.height = rows;

  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  const ink = new Float32Array(cols * rows);
  if (!ctx) return ink;

  const targetAspect = cols / rows;
  const imageAspect = image.naturalWidth / image.naturalHeight;
  let sx = 0;
  let sy = 0;
  let sWidth = image.naturalWidth;
  let sHeight = image.naturalHeight;
  if (imageAspect > targetAspect) {
    sWidth = image.naturalHeight * targetAspect;
    sx = (image.naturalWidth - sWidth) / 2;
  } else {
    sHeight = image.naturalWidth / targetAspect;
    sy = (image.naturalHeight - sHeight) / 2;
  }

  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  for (let i = 0; i < cols * rows; i++) {
    const offset = i * 4;
    const alpha = data[offset + 3];
    if (alpha < ALPHA_CUTOFF) {
      ink[i] = 0;
      continue;
    }

    const luminance =
      (0.299 * data[offset] + 0.587 * data[offset + 1] + 0.114 * data[offset + 2]) / 255;
    const normalized = clamp01((WHITE_POINT - luminance) / (WHITE_POINT - BLACK_POINT));
    ink[i] = Math.pow(normalized, CONTRAST_GAMMA) * (alpha / 255);
  }

  return ink;
}
