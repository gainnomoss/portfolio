"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const DOT_SIZE = "12px 12px";
const DOT_RADIUS = "2px";

// Horizontal midpoint of the hero copy: the 1200px content frame is centered with a
// 24px minimum gutter (px-6), and the copy column is 640px wide, so its center sits
// 320px in from the frame's padded left edge.
const COPY_CENTER_X = "calc(max(24px, (100% - 1200px) / 2 + 24px) + 320px)";

// One canvas-coloured fade painted over the whole field: a soft ellipse clears the
// dots behind the hero copy and lets them re-emerge gradually around it, and short
// fades at the section's top and bottom edges keep the field from stopping on a hard
// line. A single overlay spanning the full section can't leave seams or uncovered
// corners the way the previous per-region patches did.
const FADE_BACKGROUND = [
  `radial-gradient(ellipse 660px 62% at ${COPY_CENTER_X} 50%, var(--canvas) 42%, transparent 100%)`,
  "linear-gradient(to bottom, var(--canvas), transparent 88px)",
  "linear-gradient(to top, var(--canvas), transparent 88px)",
].join(", ");

export function InteractiveDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
        el.style.setProperty("--spotlight-opacity", "1");
      });
    };

    const handleLeave = () => {
      el.style.setProperty("--spotlight-opacity", "0");
    };

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 [--mx:50%] [--my:50%] [--spotlight-opacity:0]"
      >
        <div
          className="absolute inset-0 opacity-40 dark:opacity-60"
          style={{
            backgroundImage: `radial-gradient(var(--border-strong) ${DOT_RADIUS}, transparent ${DOT_RADIUS})`,
            backgroundSize: DOT_SIZE,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-standard"
          style={{
            opacity: "var(--spotlight-opacity)",
            backgroundImage: `radial-gradient(var(--accent) ${DOT_RADIUS}, transparent ${DOT_RADIUS})`,
            backgroundSize: DOT_SIZE,
            WebkitMaskImage:
              "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
            maskImage:
              "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
          }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: FADE_BACKGROUND }} />
    </div>
  );
}
