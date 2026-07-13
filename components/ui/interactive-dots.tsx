"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const DOT_SIZE = "24px 24px";
const DENSITY_MASK = "linear-gradient(to right, transparent 0%, transparent 40%, black 100%)";

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
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <div className="relative mx-auto h-full max-w-content px-6">
        <div
          ref={containerRef}
          className="absolute inset-0 [--mx:50%] [--my:50%] [--spotlight-opacity:0]"
          style={{
            WebkitMaskImage: DENSITY_MASK,
            maskImage: DENSITY_MASK,
          }}
        >
          <div
            className="absolute inset-0 opacity-40 dark:opacity-60"
            style={{
              backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
              backgroundSize: DOT_SIZE,
            }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-standard"
            style={{
              opacity: "var(--spotlight-opacity)",
              backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
              backgroundSize: DOT_SIZE,
              WebkitMaskImage: "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
              maskImage: "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
