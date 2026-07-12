"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import clsx from "clsx";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function TypedText({
  text,
  className,
  speed = 40,
  onDone,
}: {
  text: string;
  className?: string;
  speed?: number;
  onDone?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(text.length);
  const doneRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }

    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(id);
        doneRef.current = true;
        onDone?.();
      }
    }, speed);

    return () => clearInterval(id);
  }, [shouldReduceMotion, text, speed]);

  const done = count >= text.length;

  return (
    <span className="relative inline-block align-top">
      {/* Reserves the final layout size so the typing animation never shifts surrounding content. */}
      <span aria-hidden="true" className={clsx(className, "invisible")}>
        {text}
      </span>
      <span aria-hidden="true" className={clsx(className, "absolute inset-0")}>
        {text.slice(0, count)}
        {!done && (
          <span
            aria-hidden="true"
            className="ml-[2px] inline-block w-[3px] animate-pulse bg-ink align-middle"
            style={{ height: "0.85em" }}
          />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
