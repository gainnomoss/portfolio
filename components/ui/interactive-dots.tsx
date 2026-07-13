"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

const DOT_SIZE = "12px 12px";
const DOT_RADIUS = "2px";

// How close to the hero copy the dots stay fully hidden, and how far out the fade-in completes.
const TEXT_CLEAR = "40px";
const TEXT_FADE_END = "66px";

function DotField({
  className,
  dotOpacityClassName,
  fadeClassName,
  fadeStyle,
}: {
  className: string;
  dotOpacityClassName: string;
  fadeClassName: string;
  fadeStyle?: CSSProperties;
}) {
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
    <div aria-hidden="true" className={className}>
      <div ref={containerRef} className="absolute inset-0 [--mx:50%] [--my:50%] [--spotlight-opacity:0]">
        <div
          className={`absolute inset-0 ${dotOpacityClassName}`}
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
            WebkitMaskImage: "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
            maskImage: "radial-gradient(160px circle at var(--mx) var(--my), black, transparent 70%)",
          }}
        />
      </div>
      <div className={fadeClassName} style={fadeStyle} />
    </div>
  );
}

export function InteractiveDots() {
  return (
    <>
      {/* Right field: sits in the open space beside the hero copy, inside the content frame. Fades
          in over a narrow band by the text (kept tight so it doesn't read as blank space) and fades
          out again before the far edge instead of stopping on a hard line. */}
      <DotField
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] max-w-[560px] overflow-hidden lg:block"
        dotOpacityClassName="opacity-40 dark:opacity-60"
        fadeClassName="absolute inset-0"
        fadeStyle={{
          background:
            "linear-gradient(to right, var(--canvas) 0, transparent 31%, transparent 80%, var(--canvas) 100%)",
        }}
      />

      {/* Left field: width is exactly the gutter outside the 1200px content frame (max-w-content),
          so it fills flush to the viewport edge with no gap and never reaches under the hero copy —
          it simply narrows to nothing on screens too narrow to have a gutter at all. */}
      <DotField
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[max(0px,calc((100%-1200px)/2))] overflow-hidden lg:block"
        dotOpacityClassName="opacity-20 dark:opacity-35"
        fadeClassName="absolute inset-y-0 right-0 w-[73%] bg-gradient-to-l from-canvas to-transparent"
      />

      {/* Top/bottom fields are scoped to the hero copy's own column (24px in from the content
          frame, 640px wide — matching the `max-w-[640px]` text wrapper in app/page.tsx) instead of
          the full section width. Spanning edge-to-edge previously painted a canvas-colored strip
          over the left/right fields' corners too, which read as a hard bar with no dots in it. */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-content lg:block">
        <DotField
          className="absolute left-6 top-0 h-32 w-[640px] overflow-hidden"
          dotOpacityClassName="opacity-20 dark:opacity-35"
          fadeClassName="absolute inset-0"
          fadeStyle={{
            background: `linear-gradient(to top, var(--canvas) 0, var(--canvas) ${TEXT_CLEAR}, transparent ${TEXT_FADE_END})`,
          }}
        />
        <DotField
          className="absolute left-6 bottom-0 h-32 w-[640px] overflow-hidden"
          dotOpacityClassName="opacity-20 dark:opacity-35"
          fadeClassName="absolute inset-0"
          fadeStyle={{
            background: `linear-gradient(to bottom, var(--canvas) 0, var(--canvas) ${TEXT_CLEAR}, transparent ${TEXT_FADE_END})`,
          }}
        />
      </div>
    </>
  );
}
