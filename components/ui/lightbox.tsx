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
 *
 * The trigger's outline is a preview candidate: design.md currently
 * documents screenshots as flat, borderless, shadowless surfaces
 * ("Real UI screenshots sit flat on the canvas... no border, no shadow"),
 * so this hasn't been reconciled with that rule yet — added on request to
 * compare against the documented flat treatment.
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
          "block w-full cursor-zoom-in overflow-hidden rounded-md bg-canvas outline outline-1 -outline-offset-1 outline-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:outline-white/10",
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
