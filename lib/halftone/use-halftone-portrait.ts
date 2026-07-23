"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { computeGridConfig } from "./grid";
import { sampleImageToInk } from "./sample-image";
import { createBreathingNoise, breathingOffset } from "./noise";
import { computeInteraction, lerp, stepDot } from "./physics";
import { clearCanvas, drawDots } from "./render";
import type { BreathingConfig, Dot, InteractionConfig, PointerState, Vec2 } from "./types";

const INTERACTION: InteractionConfig = {
  radius: 100,
  maxDisplacement: 14,
  focusRadiusScale: 0.8,
};

const BREATHING: BreathingConfig = {
  amplitude: 0.6,
  frequency: 0.02,
  timeFrequency: 0.00012,
};

/** Clamp the per-frame delta so a throttled/backgrounded tab resuming
 * doesn't fling the spring simulation forward in one huge, visible jump. */
const MAX_DT_SECONDS = 1 / 30;

function supportsCanvas(): boolean {
  const canvas = document.createElement("canvas");
  return typeof canvas.getContext === "function" && !!canvas.getContext("2d");
}

/** Mirrors `{colors.ink-light}` / `{colors.ink-dark}` from design.md/globals.css.
 * Resolved directly from `resolvedTheme` rather than reading the `--ink`
 * custom property off the DOM, since that would race next-themes' own
 * effect that applies the `.dark` class — this hook's color-sync effect can
 * otherwise read the CSS variable before next-themes has updated it. */
function inkColorForTheme(resolvedTheme: string | undefined): string {
  return resolvedTheme === "dark" ? "#f5f5f7" : "#14151a";
}

interface UseHalftonePortraitResult {
  /** True once capability/motion checks pass and the canvas is driving the
   * portrait — the caller should hide/cover the static fallback image. */
  isActive: boolean;
  /** True once the first frame has been drawn — used to crossfade the
   * canvas in rather than popping in over a blank frame. */
  isReady: boolean;
}

export function useHalftonePortrait(
  src: string,
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
): UseHalftonePortraitResult {
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const colorRef = useRef(inkColorForTheme(resolvedTheme));
  const pointerRef = useRef<PointerState>({ position: null });

  // Keep the dot color in sync with the active theme without tearing down
  // and re-sampling the whole simulation.
  useEffect(() => {
    colorRef.current = inkColorForTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined" || !supportsCanvas()) {
      setIsActive(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let frameId = 0;
    let intersecting = true;
    let dots: Dot[] = [];
    let cols = 0;
    let rows = 0;
    let maxRadius = 0;
    let cellOffsetX = 0;
    let cellOffsetY = 0;
    let cellSpacing = 0;
    let resizePending = false;

    const noise2D = createBreathingNoise();
    const startTime = performance.now();
    let lastTime = startTime;

    function gridPosition(colIndex: number, rowIndex: number): Vec2 {
      return {
        x: cellOffsetX + colIndex * cellSpacing,
        y: cellOffsetY + rowIndex * cellSpacing,
      };
    }

    function buildDots(image: HTMLImageElement) {
      const rect = container!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const grid = computeGridConfig(width, height);
      cols = grid.cols;
      rows = grid.rows;
      maxRadius = grid.maxRadius;
      cellSpacing = grid.spacing;
      cellOffsetX = (width - (cols - 1) * cellSpacing) / 2;
      cellOffsetY = (height - (rows - 1) * cellSpacing) / 2;

      const ink = sampleImageToInk(image, cols, rows);

      dots = new Array(cols * rows);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const { x, y } = gridPosition(col, row);
          const baseRadius = ink[index] * maxRadius;
          dots[index] = {
            gridX: x,
            gridY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            baseRadius,
            radius: baseRadius,
            radiusVelocity: 0,
          };
        }
      }
    }

    function tick(now: number) {
      if (cancelled) return;
      frameId = requestAnimationFrame(tick);
      if (!intersecting) return;

      const dtSeconds = Math.min(MAX_DT_SECONDS, (now - lastTime) / 1000);
      lastTime = now;
      const elapsedMs = now - startTime;
      const pointer = pointerRef.current.position;
      const focusRadius = maxRadius * INTERACTION.focusRadiusScale;

      for (const dot of dots) {
        const breathing = breathingOffset(noise2D, dot.gridX, dot.gridY, elapsedMs, BREATHING);
        const interaction = computeInteraction({ x: dot.gridX, y: dot.gridY }, pointer, INTERACTION);

        const targetX = dot.gridX + breathing.x + interaction.offset.x;
        const targetY = dot.gridY + breathing.y + interaction.offset.y;
        const targetRadius = lerp(dot.baseRadius, focusRadius, interaction.focus);

        stepDot(dot, targetX, targetY, targetRadius, dtSeconds);
      }

      const rect = container!.getBoundingClientRect();
      clearCanvas(ctx!, rect.width, rect.height);
      drawDots(ctx!, dots, colorRef.current);

      if (!cancelled) setIsReady(true);
    }

    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (cancelled) return;
      buildDots(image);
      setIsActive(true);
      frameId = requestAnimationFrame(tick);
    };
    image.src = src;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container!.getBoundingClientRect();
      pointerRef.current.position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    const handlePointerLeave = () => {
      pointerRef.current.position = null;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      if (resizePending || !image.complete || cancelled) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resizePending = false;
        if (!cancelled) buildDots(image);
      });
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        intersecting = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      image.onload = null;
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [src, shouldReduceMotion, containerRef, canvasRef]);

  return { isActive, isReady };
}
