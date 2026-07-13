---
version: 1.0
name: ux-portfolio-design-system
description: A typography-led, dual-theme personal portfolio system. Restraint over decoration — one grotesk voice (display and body), one mono voice for small credibility details, one accent color, generous whitespace, and a single deliberate animated hero moment. Light and dark are both fully designed, not an inverted afterthought. Synthesized from thatedchao.com, billysweeney.com, linear.app, aleksitappura.com, and rebeccaling.com — see "Inspiration Synthesis" for the reasoning, not to be copied verbatim.

colors:
  canvas-light: "#fdfdfd"
  canvas-subtle-light: "#f6f6f8"
  ink-light: "#14151a"
  body-light: "#45464f"
  muted-light: "#6c6d78"
  border-light: "#e3e3e8"
  border-strong-light: "#c7c8d1"
  canvas-dark: "#0a0a0d"
  canvas-subtle-dark: "#141417"
  ink-dark: "#f5f5f7"
  body-dark: "#c7c7cf"
  muted-dark: "#8b8b96"
  border-dark: "#232327"
  border-strong-dark: "#38383f"
  accent-light: "#0b5fff"
  accent-light-active: "#0a4fd6"
  accent-dark: "#5b8cff"
  accent-dark-active: "#7fa3ff"
  on-accent: "#ffffff"
  danger-light: "#c43737"
  danger-dark: "#ff6b5c"
  danger-subtle-light: "rgba(255, 74, 74, 0.05)"
  danger-subtle-dark: "rgba(255, 107, 92, 0.08)"
  warning-light: "#a8710a"
  warning-dark: "#e6b34d"
  success-light: "#1f7a4d"
  success-dark: "#4ade95"

typography:
  display-xl:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "clamp(2.75rem, 6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-lg:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "clamp(2.25rem, 4.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  display-md:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
  body-sm:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: "var(--font-geist-mono)"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
    textTransform: uppercase
  mono-detail:
    fontFamily: "var(--font-geist-mono)"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  sm: 6px
  md: 12px
  lg: 20px
  pill: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section-mobile: 56px
  section-desktop: 96px

motion:
  duration-fast: 120ms
  duration-base: 200ms
  duration-slow: 400ms
  easing-standard: "cubic-bezier(0.4, 0, 0.2, 1)"

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    height: 64px
    typography: "{typography.body-sm}"
  theme-toggle:
    size: 44px
    rounded: "{rounded.pill}"
    duration: "{motion.duration-base}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.title-md}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.border-strong}"
    typography: "{typography.title-md}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  project-card:
    backgroundColor: "{colors.canvas-subtle}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  section-heading:
    textColor: "{colors.muted}"
    typography: "{typography.display-md}"
  timeline:
    railColor: "{colors.border}"
    dotColor: "{colors.accent}"
    cardBackground: "{colors.canvas-subtle}"
    rounded: "{rounded.md}"
  tag:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  hero-dot-field:
    dotColor: "{colors.border-strong}"
    spotlightColor: "{colors.accent}"
    spacing: 24px
    visibility: "desktop only (lg+), right-aligned"
  password-gate:
    backgroundColor: "{colors.canvas-subtle}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
  footer:
    backgroundColor: "{colors.canvas}"
    typography: "{typography.mono-detail}"
    padding: "{spacing.2xl}"
  back-to-top:
    size: 44px
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.canvas-subtle}"
---

## Overview

This system exists to get a hiring manager to trust the designer's craft within the first five seconds, without the site itself trying to look "designed." Every reference site the direction is synthesized from earns its polish through restraint: one type voice, one accent, enormous whitespace, and motion that shows up in exactly one or two deliberate places rather than everywhere. Nothing here is decorative. If a color, a radius, or an animation doesn't carry information (hierarchy, state, or orientation), it doesn't belong.

**Key characteristics:**
- One grotesk sans voice (Geist) for everything from the hero headline down to a caption — hierarchy comes from size and weight, never from switching typefaces.
- One mono voice (Geist Mono) reserved for small credibility-signaling details: tags, timeline dates, the footer colophon line — a deliberate second voice used sparingly, the way Billy Sweeney's colophon or Rebecca Ling's timeline dates read as "considered," not decorative.
- Light and dark are both first-class. The toggle lives top-right, always, and is itself a small delight moment (Aleksi Tappura) — not a system-preference afterthought.
- One accent color (`{colors.accent}`, a confident blue evolved from the current site's brand blue), used only for links, the active nav state, the toggle icon, and primary interactive affordances. Everything else is ink/canvas grays in both themes.
- One deliberate animated hero moment on the homepage (a quiet interactive dot field that lights up near the cursor, desktop-only, Aleksi Tappura-style restraint) — everywhere else, motion is a micro-interaction (hover/press, tab switch, scroll-reveal) gated behind `prefers-reduced-motion`.
- Real UI screenshots are shown inside a believable frame with its own shadow and rounding (Linear-style), never floating flat — this extends the case-study screenshot pattern already on the current site.
- A connector-line timeline component is the one recurring structural motif (Rebecca Ling-style), used for the About page's experience section and every case study's process/journey narrative.

## Inspiration Synthesis

Five sites were reviewed for this direction; none are copied directly.

- **thatedchao.com** — no-nav, single-column project list, weight-driven hierarchy. Borrowed: the "list, not grid" pattern is available for a future minimal Work view if the grid ever feels heavy; the tinted-card-behind-image treatment.
- **billysweeney.com** — oversized confident type, plain-text credibility (testimonials/awards), a colophon footer. Borrowed: the footer colophon line; opening pages with one direct sentence, not marketing copy.
- **linear.app** — dark canvas, huge tight headlines, real product UI shown in its own chrome. Borrowed: framing screenshots believably; restrained single-accent-on-dark; a nav divider before CTA/account actions.
- **aleksitappura.com** — sun/moon toggle as a delight moment, one animated hero visual, otherwise very quiet. Borrowed: the toggle's prominence and position; exactly one animated hero element.
- **rebeccaling.com** — segmented-pill nav, connector-line timeline, warm personality. Borrowed: the timeline-with-connector-line component. **Not borrowed:** the illustrated avatar and serif/sans two-voice pairing — too specific to her personal brand.

## Colors

Every color is defined as a light/dark pair; components reference `{colors.X}` and resolve to the active theme via CSS variables switched on the `.dark` class (see `app/globals.css` and `next-themes`).

### Surface
- **Canvas** (`{colors.canvas-light}` #fdfdfd / `{colors.canvas-dark}` #0a0a0d) — the page floor.
- **Canvas Subtle** (`{colors.canvas-subtle-light}` #f6f6f8 / `{colors.canvas-subtle-dark}` #141417) — cards, tags, the password-gate panel, alternating section backgrounds. The only surface elevation step in the system — no shadows-as-depth beyond this.

### Text
- **Ink** (`{colors.ink-light}` #14151a / `{colors.ink-dark}` #f5f5f7) — headlines, primary button text-on-accent is `{colors.on-accent}` instead.
- **Body** (`{colors.body-light}` #45464f / `{colors.body-dark}` #c7c7cf) — running paragraph text.
- **Muted** (`{colors.muted-light}` #6c6d78 / `{colors.muted-dark}` #8b8b96) — section-heading labels, captions, tag text, timeline dates.

### Border
- **Border** (`{colors.border-light}` #e3e3e8 / `{colors.border-dark}` #232327) — hairlines, card outlines where needed.
- **Border Strong** (`{colors.border-strong-light}` #c7c8d1 / `{colors.border-strong-dark}` #38383f) — secondary-button outline, input borders.

### Accent
- **Accent** (`{colors.accent-light}` #0b5fff / `{colors.accent-dark}` #5b8cff) — links, active nav/tab state, theme-toggle icon, primary button fill (paired with `{colors.on-accent}` #ffffff text), focus rings. This is the only chromatic color in the system outside semantic states — reserve it.
- **Accent Active** — press/hover state, darkens in light mode, lightens further in dark mode (`{colors.accent-dark-active}` #7fa3ff) to stay visible against the near-black canvas.

### Semantic
- **Danger** (`{colors.danger-light}` #c43737 / `{colors.danger-dark}` #ff6b5c) — wrong-password state, the "Password protected" tag text, legal/liability warnings (RLCP's case study references this exact pattern). The light value sits a hair darker than the Figma source (#c73a3a) to clear WCAG AA (≥4.5:1) on the danger-subtle tag fill.
- **Danger Subtle** (`{colors.danger-subtle-light}` / `{colors.danger-subtle-dark}`) — a barely-there red fill reserved for the "Password protected" tag background; never used as a large surface.
- **Warning** (`{colors.warning-light}` #a8710a / `{colors.warning-dark}` #e6b34d) — advisory notices.
- **Success** (`{colors.success-light}` #1f7a4d / `{colors.success-dark}` #4ade95) — confirmation states (e.g. unlocked case study).

## Typography

**Font family:** Geist (variable, self-hosted via `next/font/google`) for everything — display, body, UI. Geist Mono for the label/mono-detail roles only. No third typeface, no serif — a single confident grotesk voice is the point.

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.display-xl}` | 44–64px (clamp) | 600 | 1.05 | Homepage hero headline only |
| `{typography.display-lg}` | 36–44px (clamp) | 600 | 1.1 | Page titles (case study, About, Work) |
| `{typography.display-md}` | 30px | 600 | 1.2 | Case-study section headings ("Problem", "Process"), rendered in `{colors.muted}` per the current site's pattern |
| `{typography.title-lg}` | 22px | 500 | 1.3 | Project-card titles, subsection headers |
| `{typography.title-md}` | 18px | 500 | 1.4 | Timeline entry titles, button label size |
| `{typography.body-lg}` | 18px | 400 | 1.6 | Case-study lead paragraphs |
| `{typography.body-md}` | 16px | 400 | 1.65 | Standard body copy |
| `{typography.body-sm}` | 14px | 400 | 1.5 | Captions, nav links |
| `{typography.label}` | 13px | 500 | 1.3 | Uppercase, +0.04em tracking. Tags, category labels, timeline dates — Geist Mono |
| `{typography.mono-detail}` | 13px | 400 | 1.5 | Footer colophon line, small technical details — Geist Mono |

**Principle:** hierarchy is built from size and weight (400/500/600 only — never below 400, never above 600; nothing needs true bold). Color is never used to create hierarchy among headings; `{colors.muted}` on section labels is a deliberate quiet/loud contrast with `{colors.ink}` body headlines, not a hierarchy device.

## Layout

- **Base spacing unit:** 4px. Tokens: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.2xl}` 48 · `{spacing.3xl}` 64.
- **Section rhythm:** `{spacing.section-desktop}` (96px) top+bottom padding between major page sections on desktop, `{spacing.section-mobile}` (56px) on mobile. Whitespace separates sections — rules/dividers are rare, reserved for the nav-to-CTA divider pattern only.
- **Reading column:** case-study body copy caps at ~680px regardless of viewport width, matching the current site's long-form legibility.
- **Max content width:** 1200px centered, with a minimum 24px (mobile) to 64px (desktop) outer gutter.

## Motion

- `{motion.duration-fast}` (120ms) — hover/press micro-interactions on buttons, tags, nav links.
- `{motion.duration-base}` (200ms) — theme toggle crossfade, tab/segment switches.
- `{motion.duration-slow}` (400ms) — scroll-reveal of section content, timeline entries animating in.
- Easing: `{motion.easing-standard}` everywhere — no bounce, no spring for content reveals (a subtle spring is acceptable only on the theme toggle icon itself).
- **The one deliberate hero moment:** on the homepage hero, right side, desktop only (`lg+`) — a faint dot field (`{component.hero-dot-field}`) that brightens near the cursor via a masked spotlight, fading into the canvas on its inner edge. Never present on mobile/tablet; no autoplay/looping — it only reacts to real pointer input, so it fully disables (not just collapses) under `prefers-reduced-motion`.
- **Hero entrance:** on first paint the headline reveals with a typed-in effect (real text is present in the DOM throughout for SEO/screen readers; the animation is a decorative overlay), then the greeting line, subtitle, and buttons fade up in sequence. Reduced motion shows the final state immediately, no delay.
- **`prefers-reduced-motion`:** every transition and scroll-reveal above collapses to an instant state change (opacity-only fade at most) when the user has this preference set. Non-negotiable per product.md.

## Components

**`nav-bar`** — Slim, 64px, `{colors.canvas}` background, no shadow. Wordmark ("Z / KE") at left, 3–4 links (Work, About, Contact) at center or right, `{component.theme-toggle}` always last. Collapses to a hamburger sheet under 768px. No dropdown mega-menu — the current site's Case Studies dropdown becomes a real `/work` link instead.

**`theme-toggle`** — 44px circular icon button, sun/moon glyph, positioned consistently top-right (desktop) or in the mobile menu sheet. `{motion.duration-base}` crossfade on click; the whole page's CSS variables swap simultaneously via the `.dark` class.

**`button-primary`** — `{colors.ink}` fill (inverts per theme), `{colors.on-accent}`-equivalent text (canvas color, not literal white, so it still works in dark mode), `{rounded.pill}`, `{typography.title-md}`. One per viewport, reserved for the primary action (e.g. "See my work," "Download résumé").

**`button-secondary`** — Transparent fill, `{colors.border-strong}` outline, `{colors.ink}` text, same shape as primary. Pairs with primary the way the current site's buttons already do.

**`project-card`** — `{colors.canvas-subtle}` background, `{rounded.lg}`, contains a framed screenshot (see below), title in `{typography.title-lg}`, company/type in `{typography.body-sm}` muted, tags as `{component.tag}` row. A `comingSoon` variant swaps the screenshot for a quiet placeholder pattern and disables the click-through.

**Framed screenshot** — Product/UI images sit inside a card with `{rounded.md}`, a 1px `{colors.border}` outline, and a soft shadow (elevation is this single shadow step, nothing heavier) — the Linear-style "real interface" treatment, applied to every case-study screenshot embed.

**`section-heading`** — Large `{typography.display-md}` label in `{colors.muted}`, used to open each case-study section ("Overview," "Problem," "Process," "Outcome") — directly preserves the current site's pattern.

**`timeline`** — A vertical rail (`{colors.border}`) with dot markers (`{colors.accent}`) at each entry; entry content sits in a `{component.project-card}`-style block to its right. Used on the About page (experience) and inside case studies (multi-stage journeys, iteration history).

**`tag`** — Small pill, `{colors.canvas-subtle}` background, `{colors.muted}` text, `{typography.label}` (mono, uppercase). Used for project tags. The "Password protected" variant (per product.md's requirement that protected projects are clearly marked before opening) swaps to `{colors.danger-subtle}` fill with `{colors.danger}` text and lock glyph, so the locked state reads as a semantic warning rather than a neutral tag.

**`hero-dot-field`** — A faint grid of `{colors.border-strong}` dots anchored to the right edge of the homepage hero, visible desktop-only (`lg+`). A second dot layer in `{colors.accent}` is revealed only inside a small radius around the cursor (a CSS mask, no canvas/JS drawing) and fades into the canvas color on its inner edge. Never repeated elsewhere on the site.

**`password-gate`** — Centered `{colors.canvas-subtle}` card, `{rounded.lg}`, generous `{spacing.2xl}` padding. Single password input (`{colors.border-strong}` outline, focus ring in `{colors.accent}`), primary button, inline `{colors.danger}` error text on failure. No modal — a real page at `/work/[slug]` so the URL stays stable.

**`footer`** — Plain `{colors.canvas}`, contact links (email, LinkedIn, résumé download) plus a single small colophon-style line in `{typography.mono-detail}` (a Billy Sweeney-style craft signal, e.g. noting the stack or a build detail) — one quiet credibility moment, not a marketing footer.

**`back-to-top`** — 44px circular button, `{colors.canvas-subtle}`, appears after scrolling past the hero on long case-study pages — preserved from the current site.

## Do's and Don'ts

### Do
- Keep the accent to one hue across both themes. If a second chromatic color is needed, it must be a semantic state (danger/warning/success), never decorative.
- Let weight and size build hierarchy. Resist the urge to add a second typeface for "personality" — the mono voice already provides that contrast in small doses.
- Treat the theme toggle as a real feature: test both themes for every component before calling it done, not just the default.
- Reserve motion for the homepage hero visual plus small state-change micro-interactions. If a component's animation doesn't communicate a state change or an entrance, cut it.
- Frame every embedded product screenshot — never let a raw flat image float directly on the canvas.

### Don't
- Don't add a second display typeface or a serif — that's Rebecca Ling's move specifically, not a shared "premium" pattern, and would clash with the single-voice system here.
- Don't make the dark theme an inverted afterthought — every color pair above was chosen independently for contrast and warmth in its own theme.
- Don't add shadows beyond the one elevation step (`{colors.canvas-subtle}` + framed-screenshot shadow). No layered/soft-glow shadow systems.
- Don't animate on scroll everywhere — a scroll-reveal on every single section reads as a template, not craft.
- Don't use `{rounded.pill}` on cards or containers — it's reserved for buttons, tags, and the theme toggle.

## Responsive Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | 320–767px | Single column; nav collapses to hamburger sheet; `{spacing.section-mobile}` (56px) section padding; timeline rail moves flush-left; project grid is 1-up |
| Tablet | 768–1023px | Nav stays horizontal; project grid is 2-up; reading column unchanged |
| Desktop | 1024–1439px | Full nav; project grid 2–3-up depending on card content; `{spacing.section-desktop}` (96px) section padding |
| Wide | ≥1440px | Same as Desktop; max content width caps at 1200px, extra space becomes outer margin |

No horizontal scrolling at any width. Touch targets ≥44px everywhere (nav links, tags are the exception as non-interactive, buttons/toggle/back-to-top all meet this).

## Known Gaps

- Exact focus-ring treatment (`{colors.accent}` outline width/offset) needs a final pass against WCAG AA once components are built, not just specified here.
- Motion durations above are starting points — tune after the timeline and scroll-reveal components are built and feel tested by hand.
