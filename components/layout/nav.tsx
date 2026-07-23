"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MAINTENANCE_PATH } from "@/lib/maintenance";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // No nav chrome on the maintenance page — it's a standalone, calm state.
  if (pathname === MAINTENANCE_PATH) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-body-md text-ink transition-colors duration-fast",
                      active && "font-medium"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-title-md text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
