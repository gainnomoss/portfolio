import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MAINTENANCE_BYPASS_COOKIE, MAINTENANCE_PATH } from "@/lib/maintenance";
import { ANALYTICS_OPT_OUT_COOKIE } from "@/lib/analytics";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Analytics opt-out: visiting with ?notrack=<key> sets a long-lived cookie
  // that suppresses GA/Hotjar for this browser from then on (checked in
  // app/layout.tsx), then redirects to the same URL with the key stripped so
  // it never lingers in browser history or analytics.
  const analyticsOptOutKey = process.env.ANALYTICS_OPT_OUT_KEY;
  const providedOptOutKey = searchParams.get("notrack");
  if (analyticsOptOutKey && providedOptOutKey === analyticsOptOutKey) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("notrack");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(ANALYTICS_OPT_OUT_COOKIE, "1", {
      // Not httpOnly: the client-side analytics gate (components/analytics/
      // analytics-gate.tsx) reads this via document.cookie so the rest of
      // the site can stay statically rendered instead of every page opting
      // into per-request SSR just to check a cookie.
      secure: true,
      sameSite: "lax",
      maxAge: ONE_YEAR_SECONDS,
      path: "/",
    });
    return response;
  }

  // Fast path: maintenance mode is off (or unset) — behave exactly as before,
  // no cookie/query checks, no rewrite, zero added overhead.
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Never gate the maintenance page itself — avoids a rewrite/redirect loop.
  if (pathname === MAINTENANCE_PATH) {
    return NextResponse.next();
  }

  // Owner bypass: ?key=<MAINTENANCE_BYPASS_KEY> sets a long-lived cookie, then
  // redirects to the same URL with the key stripped so it never lingers in
  // browser history or analytics.
  const bypassKey = process.env.MAINTENANCE_BYPASS_KEY;
  const providedKey = searchParams.get("key");
  if (bypassKey && providedKey === bypassKey) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("key");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(MAINTENANCE_BYPASS_COOKIE, "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ONE_YEAR_SECONDS,
      path: "/",
    });
    return response;
  }

  // Already-bypassed browsers always see the real site.
  if (request.cookies.get(MAINTENANCE_BYPASS_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // Everyone else gets the maintenance page, rewritten in place so the
  // address bar keeps showing the URL they requested.
  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = MAINTENANCE_PATH;
  maintenanceUrl.search = "";
  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: [
    // Run on everything except Next.js internals, the favicon/app icon,
    // robots/sitemap (so review.md's SEO requirements keep working), and any
    // request for a static asset file (images, fonts, pdf, css, js, etc.).
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|pdf|txt|xml|woff|woff2|css|js|map|mp4|webm)$).*)",
  ],
};
