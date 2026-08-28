"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MAINTENANCE_PATH } from "@/lib/maintenance";

export function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === MAINTENANCE_PATH) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 8,
            transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: "easeOut" },
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-canvas-subtle text-ink shadow-[var(--shadow-border)] transition-shadow duration-fast hover:shadow-[var(--shadow-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
