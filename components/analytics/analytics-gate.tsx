"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_OPT_OUT_COOKIE } from "@/lib/analytics";

// The opt-out cookie check is client-side (not cookies()/headers()) so pages
// stay statically rendered instead of every route opting into per-request
// SSR just to check a cookie. isProductionDeployment is passed in from the
// server (VERCEL_ENV isn't a NEXT_PUBLIC_ var) so preview deployments and
// local dev — including a Claude Code session testing a change — never load
// GA/Hotjar and never pollute real visitor data. Skips loading for any
// browser carrying the opt-out cookie (see middleware.ts's ?notrack=<key>).
export function AnalyticsGate({
  isProductionDeployment,
  children,
}: {
  isProductionDeployment: boolean;
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isProductionDeployment) return;
    const optedOut = document.cookie
      .split("; ")
      .some((entry) => entry === `${ANALYTICS_OPT_OUT_COOKIE}=1`);
    setEnabled(!optedOut);
  }, [isProductionDeployment]);

  if (!enabled) return null;
  return <>{children}</>;
}
