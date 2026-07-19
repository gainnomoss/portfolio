"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import clsx from "clsx";
import { LightboxOverlay } from "@/components/ui/lightbox-overlay";

/**
 * Wraps a case-study screenshot's trigger in a click-to-zoom lightbox. The
 * overlay is portaled to `document.body` because `Reveal` wraps MDX sections
 * in transformed `motion.div`s, which would break `position: fixed`
 * containment if the overlay rendered in place.
 */
export function Lightbox({
  src,
  alt,
  width,
  height,
  className,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const handleClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={clsx(
          "block w-full cursor-zoom-in overflow-hidden rounded-md bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
      >
        {children}
      </button>
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <LightboxOverlay src={src} alt={alt} width={width} height={height} onClose={handleClose} />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
