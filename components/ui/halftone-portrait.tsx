"use client";

import Image from "next/image";
import { useRef } from "react";
import { useHalftonePortrait } from "@/lib/halftone/use-halftone-portrait";

interface HalftonePortraitProps {
  src: string;
  alt: string;
  /** Intrinsic photo dimensions — used only to reserve the correct aspect
   * ratio (zero layout shift) and for the underlying `next/image` fallback. */
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
 * canvas, with the real photo kept in the DOM underneath as the accessible
 * fallback (and the only thing shown when canvas is unsupported, JS is
 * disabled, or `prefers-reduced-motion` is set — see `useHalftonePortrait`).
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

  // Hide the full-color fallback photo the moment we know the halftone will
  // take over (before it has even loaded), not once it's actually ready —
  // otherwise the real photo flashes in during the load/sample delay. The
  // wrapper's bg-canvas shows through as a plain placeholder in that gap
  // (matching the page floor, since this sits directly on it with no card
  // wrapper), then the canvas fades in over it once the first frame is drawn.
  const imageVisible = !isActive;
  const canvasVisible = isReady;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-canvas ${className ?? ""}`}
      style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 320px, 100vw"
        className="object-cover transition-opacity duration-base ease-standard"
        style={{ opacity: imageVisible ? 1 : 0 }}
        priority
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity duration-base ease-standard"
        style={{ opacity: canvasVisible ? 1 : 0 }}
      />
    </div>
  );
}
