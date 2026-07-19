"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, animate, useReducedMotion } from "motion/react";
import clsx from "clsx";

const EASE = [0.4, 0, 0.2, 1] as const;
const MIN_SCALE = 1;
const DOUBLE_TAP_SCALE = 2.5;
const KEY_ZOOM_STEP = 0.5;
const KEY_PAN_STEP = 48;
const WHEEL_SENSITIVITY = 0.0022;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DIST = 24;

type Point = { x: number; y: number };

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const controlClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-canvas-subtle text-ink shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-colors duration-fast hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40";

export function LightboxOverlay({
  src,
  alt,
  width,
  height,
  onClose,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClose: () => void;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const duration = shouldReduceMotion ? 0 : 0.2;

  const dialogRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const zoomOutRef = useRef<HTMLButtonElement>(null);
  const zoomInRef = useRef<HTMLButtonElement>(null);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [maxScale, setMaxScale] = useState(8);
  const [isZoomed, setIsZoomed] = useState(false);
  const [atMax, setAtMax] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  const fittedSizeRef = useRef({ w: 0, h: 0 });
  const containerSizeRef = useRef({ w: 0, h: 0 });
  const pointersRef = useRef(new Map<number, Point>());
  const pinchStateRef = useRef<{ startDist: number; startScale: number; startX: number; startY: number } | null>(
    null
  );
  const panStartRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number } | null>(null);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const tapStartRef = useRef<Point | null>(null);
  const gestureInvolvedPinchRef = useRef(false);
  const previouslyFocusedRef = useRef<Element | null>(null);

  useMotionValueEvent(scale, "change", (latest) => {
    setIsZoomed(latest > 1.001);
    setAtMax(latest >= maxScale - 0.001);
  });

  // Measure the fitted (unzoomed) image box so pan clamps and maxScale can be
  // computed relative to the image's actual displayed size.
  useLayoutEffect(() => {
    function measure() {
      const wrap = imageWrapRef.current;
      const container = containerRef.current;
      if (!wrap || !container) return;
      const wrapRect = wrap.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      fittedSizeRef.current = { w: wrapRect.width, h: wrapRect.height };
      containerSizeRef.current = { w: containerRect.width, h: containerRect.height };
      setMaxScale(clampValue(width / (wrapRect.width || width), 1, 8));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [width]);

  // Focus management: focus the dialog on open, restore focus to whatever had
  // it beforehand on unmount (belt-and-braces alongside the trigger's own
  // restore-on-close in lightbox.tsx).
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      if (previouslyFocusedRef.current instanceof HTMLElement) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, []);

  // Scroll lock, restored on unmount.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  // Non-passive wheel listener so we can preventDefault (React's onWheel is
  // passive by default and can't stop page scroll/native pinch-zoom).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const point = getContainerPoint(event.clientX, event.clientY);
      const s1 = scale.get();
      const newScale = clampValue(s1 * Math.exp(-event.deltaY * WHEEL_SENSITIVITY), MIN_SCALE, maxScale);
      applyZoom(point, s1, newScale);
    }

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxScale]);

  function getContainerPoint(clientX: number, clientY: number): Point {
    const rect = containerRef.current!.getBoundingClientRect();
    return { x: clientX - (rect.left + rect.width / 2), y: clientY - (rect.top + rect.height / 2) };
  }

  function clampPan(nx: number, ny: number, s: number) {
    const { w: fw, h: fh } = fittedSizeRef.current;
    const { w: cw, h: ch } = containerSizeRef.current;
    const maxX = Math.max(0, (fw * s - cw) / 2);
    const maxY = Math.max(0, (fh * s - ch) / 2);
    return { x: clampValue(nx, -maxX, maxX), y: clampValue(ny, -maxY, maxY) };
  }

  /** Sets scale/x/y immediately (no animation) — used for continuous gestures. */
  function applyZoom(point: Point, fromScale: number, toScale: number) {
    const ratio = toScale / fromScale;
    const rawX = point.x - (point.x - x.get()) * ratio;
    const rawY = point.y - (point.y - y.get()) * ratio;
    const clamped = clampPan(rawX, rawY, toScale);
    scale.set(toScale);
    x.set(clamped.x);
    y.set(clamped.y);
  }

  /** Animates scale/x/y toward a target — used for discrete actions. */
  function animateZoom(point: Point, toScale: number) {
    const fromScale = scale.get();
    const ratio = toScale / fromScale;
    const rawX = point.x - (point.x - x.get()) * ratio;
    const rawY = point.y - (point.y - y.get()) * ratio;
    const clamped = clampPan(rawX, rawY, toScale);
    animate(scale, toScale, { duration, ease: EASE });
    animate(x, clamped.x, { duration, ease: EASE });
    animate(y, clamped.y, { duration, ease: EASE });
  }

  function zoomBy(delta: number) {
    animateZoom({ x: 0, y: 0 }, clampValue(scale.get() + delta, MIN_SCALE, maxScale));
  }

  function toggleZoom(point: Point) {
    const target = scale.get() > 1.01 ? 1 : Math.min(DOUBLE_TAP_SCALE, maxScale);
    animateZoom(point, target);
  }

  function handlePointerDown(event: React.PointerEvent) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 1) {
      tapStartRef.current = { x: event.clientX, y: event.clientY };
    }

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      pinchStateRef.current = {
        startDist: distance(pts[0], pts[1]),
        startScale: scale.get(),
        startX: x.get(),
        startY: y.get(),
      };
      panStartRef.current = null;
      gestureInvolvedPinchRef.current = true;
      setIsPanning(false);
    } else if (pointersRef.current.size === 1 && scale.get() > 1.01) {
      panStartRef.current = { pointerX: event.clientX, pointerY: event.clientY, startX: x.get(), startY: y.get() };
      setIsPanning(true);
    }
  }

  function handlePointerMove(event: React.PointerEvent) {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 2 && pinchStateRef.current) {
      const pts = Array.from(pointersRef.current.values());
      const dist = distance(pts[0], pts[1]);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const point = getContainerPoint(mid.x, mid.y);
      const { startDist, startScale, startX, startY } = pinchStateRef.current;
      const newScale = clampValue(startScale * (dist / startDist), MIN_SCALE, maxScale);
      const ratio = newScale / startScale;
      const clamped = clampPan(point.x - (point.x - startX) * ratio, point.y - (point.y - startY) * ratio, newScale);
      scale.set(newScale);
      x.set(clamped.x);
      y.set(clamped.y);
    } else if (pointersRef.current.size === 1 && panStartRef.current) {
      const dx = event.clientX - panStartRef.current.pointerX;
      const dy = event.clientY - panStartRef.current.pointerY;
      const clamped = clampPan(panStartRef.current.startX + dx, panStartRef.current.startY + dy, scale.get());
      x.set(clamped.x);
      y.set(clamped.y);
    }
  }

  function endPointer(event: React.PointerEvent, detectDoubleTap: boolean) {
    const wasTracked = pointersRef.current.has(event.pointerId);
    pointersRef.current.delete(event.pointerId);

    if (pointersRef.current.size < 2) pinchStateRef.current = null;

    if (pointersRef.current.size === 1) {
      const [remaining] = Array.from(pointersRef.current.values());
      if (scale.get() > 1.01) {
        panStartRef.current = { pointerX: remaining.x, pointerY: remaining.y, startX: x.get(), startY: y.get() };
        setIsPanning(true);
      }
    } else if (pointersRef.current.size === 0) {
      panStartRef.current = null;
      setIsPanning(false);
    }

    if (pointersRef.current.size === 0) {
      const point = { x: event.clientX, y: event.clientY };
      const moved = tapStartRef.current ? distance(point, tapStartRef.current) : Infinity;
      const wasTap = !gestureInvolvedPinchRef.current && moved < DOUBLE_TAP_DIST;

      if (detectDoubleTap && wasTracked && wasTap && event.pointerType !== "mouse") {
        const now = Date.now();
        const last = lastTapRef.current;
        if (last && now - last.time < DOUBLE_TAP_MS && distance(point, last) < DOUBLE_TAP_DIST) {
          toggleZoom(getContainerPoint(event.clientX, event.clientY));
          lastTapRef.current = null;
        } else {
          lastTapRef.current = { time: now, ...point };
        }
      } else if (detectDoubleTap) {
        // A drag, pinch, or pan release — not a tap. Don't let it chain into
        // a future tap's double-tap window.
        lastTapRef.current = null;
      }

      gestureInvolvedPinchRef.current = false;
      tapStartRef.current = null;
    }
  }

  function handleDoubleClick(event: React.MouseEvent) {
    toggleZoom(getContainerPoint(event.clientX, event.clientY));
  }

  function handleContainerClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key === "Tab") {
      const focusable = [closeButtonRef.current, zoomOutRef.current, zoomInRef.current].filter(
        (el): el is HTMLButtonElement => el != null && !el.disabled
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || active === dialogRef.current) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomBy(KEY_ZOOM_STEP);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      zoomBy(-KEY_ZOOM_STEP);
    } else if (scale.get() > 1.01 && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      const dx = event.key === "ArrowLeft" ? KEY_PAN_STEP : event.key === "ArrowRight" ? -KEY_PAN_STEP : 0;
      const dy = event.key === "ArrowUp" ? KEY_PAN_STEP : event.key === "ArrowDown" ? -KEY_PAN_STEP : 0;
      const clamped = clampPan(x.get() + dx, y.get() + dy, scale.get());
      animate(x, clamped.x, { duration: shouldReduceMotion ? 0 : 0.12, ease: EASE });
      animate(y, clamped.y, { duration: shouldReduceMotion ? 0 : 0.12, ease: EASE });
    }
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: EASE }}
      className="fixed inset-0 z-[60] bg-canvas/95 backdrop-blur-sm [overscroll-behavior:contain] focus:outline-none"
    >
      <div
        ref={containerRef}
        className="flex h-full w-full touch-none items-center justify-center p-4"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => endPointer(event, true)}
        onPointerCancel={(event) => endPointer(event, false)}
        onDoubleClick={handleDoubleClick}
        onClick={handleContainerClick}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration, ease: EASE }}
        >
          <motion.div
            ref={imageWrapRef}
            style={{ x, y, scale }}
            className={clsx(
              "relative inline-flex touch-none select-none",
              isZoomed ? (isPanning ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
            )}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={95}
              sizes="100vw"
              draggable={false}
              className="h-auto max-h-[calc(100vh-2rem)] w-auto max-w-[calc(100vw-2rem)] select-none object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={clsx(controlClassName, "fixed right-4 top-4 md:right-6 md:top-6")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          ref={zoomOutRef}
          type="button"
          aria-label="Zoom out"
          disabled={!isZoomed}
          onClick={() => zoomBy(-KEY_ZOOM_STEP)}
          className={controlClassName}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 14l-2.9-2.9M4.75 7h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <button
          ref={zoomInRef}
          type="button"
          aria-label="Zoom in"
          disabled={atMax}
          onClick={() => zoomBy(KEY_ZOOM_STEP)}
          className={controlClassName}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M14 14l-2.9-2.9M4.75 7h4.5M7 4.75v4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
