// Shared constants for site-wide maintenance mode.
// Used by middleware.ts (the gate) and by layout chrome (Nav/Footer/BackToTop)
// so the maintenance route never shows nav/footer/back-to-top chrome.

/** Route the middleware rewrites blocked requests to. */
export const MAINTENANCE_PATH = "/maintenance";

/** Long-lived cookie set once a visitor supplies the correct bypass key. */
export const MAINTENANCE_BYPASS_COOKIE = "maintenance_bypass";
