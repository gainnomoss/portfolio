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
}

/**
 * Renders a photo as an interactive grid of monochrome halftone dots on
 * canvas, with the real photo kept in the DOM underneath as the accessible
 * fallback (and the only thing shown when canvas is unsupported, JS is
 * disabled, or `prefers-reduced-motion` is set — see `useHalftonePortrait`).
 */
export function HalftonePortrait({ src, alt, naturalWidth, naturalHeight, className }: HalftonePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isActive, isReady } = useHalftonePortrait(src, containerRef, canvasRef);

  const canvasVisible = isActive && isReady;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-canvas-subtle ${className ?? ""}`}
      style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 320px, 100vw"
        className="object-cover transition-opacity duration-base ease-standard"
        style={{ opacity: canvasVisible ? 0 : 1 }}
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
