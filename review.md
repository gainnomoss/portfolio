# Review Checklist

## UX

- Is the user goal obvious?
- Is navigation intuitive?
- Is the next action clear?
- Is the hierarchy obvious?

## Mobile

- Works at 320px
- Works at 375px
- Works at 768px
- Works at 1024px
- Works at 1440px

No horizontal scrolling.

Touch targets >=44px.

## Accessibility

- Meets WCAG AA contrast in both light and dark themes.
- Every interactive element has a visible focus state (`focus-visible` ring, not just a browser default outline removed with nothing in its place).
- Semantic HTML: one `<h1>` per page, headings in order, nav in a `<header>`/`<nav>`, content in `<main>`, links use `<a>`/`next/link`, buttons use `<button>`.
- Fully keyboard-navigable: nav links, theme toggle, mobile menu, project cards, password form, and all buttons reachable and operable via Tab/Enter/Space alone.
- Images have meaningful `alt` text (or empty `alt=""` for decorative images).
- Color is never the only signal for state (e.g. the password error uses both red text and a `role="alert"`, not color alone).
- `prefers-reduced-motion: reduce` disables the hero visual's animation and collapses scroll-reveal/transition durations to nearly instant — verified via OS/browser emulation, not just code review.
- Password-protected project is clearly marked before opening (lock icon + "Password protected" tag on the card).

## Performance

- Lighthouse (mobile + desktop) targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Cumulative Layout Shift (CLS) < 0.1 — all images specify width/height (via `next/image`) so nothing jumps on load.
- Fonts are self-hosted via `next/font` (no external font request, no flash of unstyled text).
- Images are served responsively and lazy-loaded below the fold via `next/image`.
- No unused/oversized JS shipped to the client — case study content renders as static HTML (SSG) wherever it isn't gated.

## SEO

- Every page has a unique `<title>` and meta description.
- Case studies have Open Graph title/description/image.
- Password-protected and coming-soon projects are `noindex, nofollow` and excluded from `sitemap.xml`, and listed in `robots.txt`'s disallow rules.
- URLs are descriptive slugs (`/work/ai-assisted-police-report-lodging`), not IDs.
- `sitemap.xml` and `robots.txt` are live and correct.

## Polish

- Both light and dark themes get equal visual attention — check every page/component in both before calling it done.
- Motion is used sparingly and with intent (per design.md: one hero moment, everything else is a micro-interaction) — no decorative animation.
- Typography hierarchy is consistent across pages (same heading/body/label tokens reused, not one-off sizes).
- Empty/loading/error states exist where applicable (password error state, coming-soon project state).
- No layout breakage or orphaned content when browser zoom is increased to 200%.
