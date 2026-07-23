"use client";

import { useRef } from "react";
import { useHalftonePortrait } from "@/lib/halftone/use-halftone-portrait";
import { PORTRAIT_HALFTONE_FALLBACK } from "@/lib/halftone/portrait-fallback-dots";

interface HalftonePortraitProps {
  src: string;
  alt: string;
  /** Intrinsic photo dimensions — used only to reserve the correct aspect
   * ratio (zero layout shift). */
  naturalWidth: number;
  naturalHeight: number;
  className?: string;
  /** Multiplies the computed dot spacing (default 1). Use a value below 1 for
   * small renderings (e.g. a thumbnail-sized portrait) where the size-based
   * density curve would otherwise clamp to its sparsest, large-dot end. */
  spacingScale?: number;
}

/**
 * Renders a photo as an interactive grid of monochrome halftone dots on
 * canvas, with a pre-rendered static halftone (same dot grid, no
 * interaction/breathing) kept in the DOM underneath — the accessible
 * fallback, and the only thing shown when canvas is unsupported, JS is
 * disabled, or `prefers-reduced-motion` is set (see `useHalftonePortrait`).
 * `PORTRAIT_HALFTONE_FALLBACK` is pre-computed from the source photo by
 * `scripts/generate-halftone-fallback.mjs` using the same ink formula as the
 * live canvas, so the two renderings match.
 */
export function HalftonePortrait({
  src,
  alt,
  naturalWidth,
  naturalHeight,
  className,
  spacingScale,
}: HalftonePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isActive, isReady } = useHalftonePortrait(src, containerRef, canvasRef, spacingScale);

  // Hide the static fallback the moment we know the interactive halftone will
  // take over (before it has even loaded), not once it's actually ready —
  // otherwise it flashes during the load/sample delay. The wrapper's
  // bg-canvas shows through as a plain placeholder in that gap (matching the
  // page floor, since this sits directly on it with no card wrapper), then
  // the canvas fades in over it once the first frame is drawn.
  const fallbackVisible = !isActive;
  const canvasVisible = isReady;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden rounded-lg bg-canvas text-ink ${className ?? ""}`}
      style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${PORTRAIT_HALFTONE_FALLBACK.viewBoxWidth} ${PORTRAIT_HALFTONE_FALLBACK.viewBoxHeight}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full transition-opacity duration-base ease-standard"
        style={{ opacity: fallbackVisible ? 1 : 0 }}
      >
        {PORTRAIT_HALFTONE_FALLBACK.dots.map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} fill="currentColor" />
        ))}
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity duration-base ease-standard"
        style={{ opacity: canvasVisible ? 1 : 0 }}
      />
    </div>
  );
}
