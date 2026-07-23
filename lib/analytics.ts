// Shared constants for excluding the site owner's own visits from
// analytics. Used by middleware.ts (the opt-out link) and
// components/analytics/analytics-gate.tsx (the check that skips rendering
// GA/Hotjar for that browser).

/** Long-lived cookie set once a visitor supplies the correct opt-out key. */
export const ANALYTICS_OPT_OUT_COOKIE = "analytics_opt_out";
