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
  accent-weak-light: "#4772c2"
  accent-weak-dark: "#7c93d1"
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
    fontSize: "1.9375rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  display-sm:
    fontFamily: "var(--font-geist-sans)"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.01em"
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
    layout: "single-column list, thumbnail left / body right from 768px up, stacked (thumbnail on top) below it"
    titleTypography: "{typography.display-md}"
    hoverMotion: "card lifts (-translate-y-1.5) while the thumbnail scales (1.05), both {motion.duration-base} {motion.easing-standard}"
    thumbnailAnimation: "optional per-project Lottie/video overlay that plays on hover, desktop pointer-hover only, no autoplay, disabled under prefers-reduced-motion"
    thumbnailFloat: "opt-in static variant of the animated-thumbnail frame (centered, max-width 500px, drop-shadow-md) for projects without a hover animation asset, so the thumbnail still floats and enlarges on hover consistently with animated cards"
  principle-card:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.accent-weak}"
    rounded: "{rounded.lg}"
    padding: 20px
    shadow: "0 1px 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.10)"
  section-heading:
    textColor: "{colors.body}"
    typography: "{typography.display-md}"
  case-study-subheading:
    textColor: "{colors.body}"
    typography: "{typography.display-sm}"
  timeline:
    railColor: "{colors.border}"
    dotColor: "{colors.accent}"
    cardBackground: "{colors.canvas-subtle}"
    rounded: "{rounded.md}"
  tag:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    border: "1px solid {colors.border}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  hero-dot-field:
    dotColor: "{colors.border-strong}"
    spotlightColor: "{colors.accent}"
    spacing: 24px
    visibility: "desktop only (lg+), right-aligned"
  halftone-portrait:
    dotColor: "{colors.ink}"
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    interactionRadius: 100px
    fallback: "next/image, shown whenever canvas is unsupported, JS is disabled, or prefers-reduced-motion is set"
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
  lightbox:
    trigger: "cursor-zoom-in, focus-visible ring, wraps every case-study screenshot"
    scrimColor: "{colors.canvas}/95 with backdrop-blur-sm"
    controlStyle: "{component.back-to-top} pill pattern"
    zIndex: 60
  numbered-callout:
    labelColor: "{colors.accent-weak}"
    numberColor: "{colors.accent-weak}"
    titleColor: "{colors.body}"
    borderColor: "{colors.border}"
  principle-card:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.accent-weak}"
    rounded: "{rounded.lg}"
    shadow: "0px 1px 1px rgba(0,0,0,0.1), 0px 1px 0.5px rgba(0,0,0,0.06)"
  numbered-list:
    markerBackground: "{colors.accent}"
    markerTextColor: "{colors.on-accent}"
    itemTextColor: "{colors.body}"
---

## Overview

This system exists to get a hiring manager to trust the designer's craft within the first five seconds, without the site itself trying to look "designed." Every reference site the direction is synthesized from earns its polish through restraint: one type voice, one accent, enormous whitespace, and motion that shows up in exactly one or two deliberate places rather than everywhere. Nothing here is decorative. If a color, a radius, or an animation doesn't carry information (hierarchy, state, or orientation), it doesn't belong.

**Key characteristics:**
- One grotesk sans voice (Geist) for everything from the hero headline down to a caption — hierarchy comes from size and weight, never from switching typefaces.
- One mono voice (Geist Mono) reserved for small credibility-signaling details: tags, timeline dates, the footer colophon line — a deliberate second voice used sparingly, the way Billy Sweeney's colophon or Rebecca Ling's timeline dates read as "considered," not decorative.
- Light and dark are both first-class. The toggle lives top-right, always, and is itself a small delight moment (Aleksi Tappura) — not a system-preference afterthought.
- One accent color (`{colors.accent}`, a confident blue evolved from the current site's brand blue), used only for links, the active nav state, the toggle icon, and primary interactive affordances. Everything else is ink/canvas grays in both themes.
- Two deliberate animated moments, and no more: the homepage hero's quiet interactive dot field (desktop-only, Aleksi Tappura-style restraint) and the interactive halftone portrait (the profile photo, on both the homepage About preview and the About page itself). Everywhere else, motion is a micro-interaction (hover/press, tab switch, scroll-reveal) gated behind `prefers-reduced-motion`.
- Real UI screenshots sit flat on the canvas with subtle rounding (`{rounded.md}`) — no border, no shadow — so the interface being shown carries the visual weight, not its container.
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
- **Accent** (`{colors.accent-light}` #0b5fff / `{colors.accent-dark}` #5b8cff) — links, active nav/tab state, theme-toggle icon, primary button fill (paired with `{colors.on-accent}` #ffffff text), focus rings. This is the only *primary* chromatic color in the system outside semantic states — reserve it.
- **Accent Active** — press/hover state, darkens in light mode, lightens further in dark mode (`{colors.accent-dark-active}` #7fa3ff) to stay visible against the near-black canvas.
- **Accent Weak** (`{colors.accent-weak-light}` #3468c9 / `{colors.accent-weak-dark}` #7c93d1) — a secondary, less-saturated blue reserved for case-study narrative markers: the `numbered-callout` label/number and the `principle-card` border. Never used for primary interactive affordances (links, buttons, focus rings) — those stay on `{colors.accent}`. The light value sits a step darker than the Figma source (#3a72dc) to clear WCAG AA (≥4.5:1) as 14px label text on `{colors.canvas-subtle}`.

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
| `{typography.display-md}` | 31px | 600 | 1 | Case-study section headings ("Overview", "The Problem", "Design Process"), rendered in `{colors.body}` with +1% tracking |
| `{typography.display-sm}` | 20px | 500 | 1.3 | Case-study subsection headings, always sentence case ("Design principles", "Key design decisions"), rendered in `{colors.body}` with +1% tracking |
| `{typography.title-xl}` | 28px | 600 | 1.2 | Project-card titles only — sits a step above title-lg so the project name is the first thing read in the card |
| `{typography.title-lg}` | 22px | 500 | 1.3 | Subsection headers, timeline entry headers, password-gate heading |
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
- **Reading column:** case-study body copy caps at ~680px (`{layout.reading}`) regardless of viewport width, matching the current site's long-form legibility.
- **Screenshot breakout:** screenshots inside case-study body copy break out of the reading column to a wider ~960px cap (`{layout.breakout}`), centered, so UI detail stays legible on wide viewports while prose stays narrow. Captions span the full width of the image they describe — never narrower than the media above them.
- **Max content width:** 1200px (`{layout.content}`) centered, with a minimum 24px (mobile) to 64px (desktop) outer gutter.

## Motion

- `{motion.duration-fast}` (120ms) — hover/press micro-interactions on buttons, tags, nav links.
- `{motion.duration-base}` (200ms) — theme toggle crossfade, tab/segment switches.
- `{motion.duration-slow}` (400ms) — scroll-reveal of section content, timeline entries animating in.
- Easing: `{motion.easing-standard}` everywhere — no bounce, no spring for content reveals (a subtle spring is acceptable only on the theme toggle icon itself).
- **The homepage hero moment:** on the homepage hero, right side, desktop only (`lg+`) — a faint dot field (`{component.hero-dot-field}`) that brightens near the cursor via a masked spotlight, fading into the canvas on its inner edge. Never present on mobile/tablet; no autoplay/looping — it only reacts to real pointer input, so it fully disables (not just collapses) under `prefers-reduced-motion`.
- **The profile photo moment:** the halftone portrait (`{component.halftone-portrait}`) — the profile photo rendered as a canvas grid of monochrome dots sized by local brightness. Used for the homepage's About preview thumbnail and the About page's larger portrait alike; present at every breakpoint, it responds to pointer proximity with a spring-based repel-and-refocus interaction and an almost-imperceptible idle breathing motion, and falls back to the plain photo whenever canvas is unsupported, JS is disabled, or `prefers-reduced-motion` is set.
- **Hero entrance:** on first paint the headline reveals with a typed-in effect (real text is present in the DOM throughout for SEO/screen readers; the animation is a decorative overlay), then the greeting line, subtitle, and buttons fade up in sequence. Reduced motion shows the final state immediately, no delay.
- **`prefers-reduced-motion`:** every transition and scroll-reveal above collapses to an instant state change (opacity-only fade at most) when the user has this preference set. Non-negotiable per product.md.
- **Lightbox open/close:** scrim fade + image fade/scale `0.96 → 1`, `{motion.duration-base}` (200ms), `{motion.easing-standard}`; close reverses the same transition on unmount. Zoom/pan transitions triggered by buttons, keyboard, and double-click/tap use the same duration and easing; continuous gestures (wheel, drag-pan, pinch) update transform values directly, uneased, for 1:1 tracking. Under `prefers-reduced-motion`, open/close and all discrete zoom transitions collapse to `duration: 0`.

## Components

**`nav-bar`** — Slim, 64px, `{colors.canvas}` background, no shadow. Wordmark ("Z / KE") at left, 3–4 links (Work, About, Contact) at center or right, `{component.theme-toggle}` always last. Collapses to a hamburger sheet under 768px. No dropdown mega-menu — the current site's Case Studies dropdown becomes a real `/work` link instead.

**`theme-toggle`** — 44px circular icon button, sun/moon glyph, positioned consistently top-right (desktop) or in the mobile menu sheet. `{motion.duration-base}` crossfade on click; the whole page's CSS variables swap simultaneously via the `.dark` class.

**`button-primary`** — `{colors.ink}` fill (inverts per theme), `{colors.on-accent}`-equivalent text (canvas color, not literal white, so it still works in dark mode), `{rounded.pill}`, `{typography.title-md}`. One per viewport, reserved for the primary action (e.g. "See my work," "Download resume").

**`button-secondary`** — Transparent fill, `{colors.border-strong}` outline, `{colors.ink}` text, same shape as primary. Pairs with primary the way the current site's buttons already do.

**`project-card`** — `{colors.canvas-subtle}` background, `{rounded.lg}`, full-width row in a single-column list (Home "Selected Work" and the Work page both use one card per row, not a grid). Below `768px` the thumbnail stacks on top of the body, full width; from `768px` up the card splits into two equal columns — thumbnail left, body right, vertically centered against each other. Body content, top to bottom: password tag (if protected) → title in `{typography.title-lg}` + company in `{typography.body-sm}` muted → description in `{typography.body-sm}` → tag row (`{component.tag}`). On hover the whole card lifts (`-translate-y-1.5`) while the thumbnail scales up slightly (`scale-105`) — both on `{motion.duration-base}` / `{motion.easing-standard}`, no shadow added (stays inside the system's one elevation step). A project may optionally opt into a hover-triggered Lottie animation layered over its static thumbnail (frontmatter `thumbnailAnimation`): it only mounts for pointer-hover-capable desktop viewports (`(hover: hover) and (pointer: fine)`), never autoplays, plays on hover and resets on mouse-leave, and is skipped entirely under `prefers-reduced-motion` — the static screenshot underneath is what mobile/touch and reduced-motion visitors always see. A `comingSoon` variant swaps the screenshot for a quiet placeholder pattern, disables the click-through, and skips the hover motion entirely. Thumbnail source images should be high enough resolution, and close enough in aspect ratio to the card's `aspect-[4/3]` frame, that neither `cover` nor `contain` fit crops out meaningful UI or forces visible upscaling — prefer a wide/landscape source (a composited hero shot, a browser screenshot) over a raw tall mobile-app capture. Any empty space around a `contain`-fit thumbnail should come from the source asset having a transparent background (keyed/exported with alpha) rather than a solid fill color, so it sits directly on `{colors.canvas-subtle}` without a mismatched color block behind it. Where a project supplies both a static thumbnail and a hover animation, the static image should depict the same frame the animation opens on (not an unrelated screenshot), and the swap between the two on load is a `{motion.duration-base}` / `{motion.easing-standard}` opacity crossfade, never an instant cut.

**Case-study screenshot** — Product/UI images and video embeds sit flat on `{colors.canvas}` with `{rounded.md}` corners — no border, no shadow. This is a site-wide rule for every media embed, not a per-case-study choice. Images render at high quality (`quality={95}` via next/image) and span the content width; the caption sits below in `{typography.body-sm}` `{colors.muted}`, left-aligned with the image edge and spanning the image's full width. This caption-matches-media-width rule applies to every captioned embed (single screenshots, pairs, videos).

**`principle-card`** — Small informational card used inside case-study body copy to present a set of guiding principles: `{colors.canvas}` background, 1px `{colors.accent-weak}` border, `{rounded.lg}`, 20px padding, and a single micro-shadow (0 1px 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.10)) — the system's one allowed card elevation. A 40px icon sits on top, followed by a bold 16px title and a regular 16px description in `{colors.body}`. Cards stack in one column on mobile and sit three-up from 768px.

**`section-heading`** — Large `{typography.display-md}` label in `{colors.body}`, used to open each case-study section ("Overview," "Problem," "Process," "Outcome").

**`case-study-subheading`** — `{typography.display-sm}` in `{colors.body}`, used for subsection headings inside a case-study section. Always sentence case ("Design principles," "Key design decisions").

**`numbered-callout`** — A small structural marker inside case-study body copy that calls out a research insight or design decision before its supporting paragraph: an uppercase-free `{colors.accent-weak}` label ("Research insight" / "Design decision"), a numbered circle in the same color, and a bold `{colors.body}` statement, sitting above a `{colors.border}` rule. Distinct from `numbered-list` — this marks a narrative beat, not a summary list.

**`principle-card`** — A 3-up card grid (1-up on mobile) used for the "guiding principles" moment in a case study's process section: `{colors.canvas}` background, `{colors.accent-weak}` 1px border, `{rounded.lg}`, and a documented shadow exception (`0px 1px 1px rgba(0,0,0,0.1), 0px 1px 0.5px rgba(0,0,0,0.06)`) — the one other place besides the framed-screenshot elevation that a shadow is allowed, because the card sits directly on the page canvas with no other depth cue. Each card holds a 40px icon (in a `{colors.accent}`-tinted circle), a bold title, and a short description.

**`numbered-list`** — A vertical list of outcome statements, each with a filled `{colors.accent}` circle (white number) and a bold `{colors.body}` statement. Used for "what the redesign introduced"-style outcome summaries; visually distinct from the plain bulleted `<ul>` used elsewhere in body copy.

**`timeline`** — A vertical rail (`{colors.border}`) with dot markers (`{colors.accent}`) at each entry; entry content sits in a `{component.project-card}`-style block to its right. Used on the About page (experience) and inside case studies (multi-stage journeys, iteration history).

**`tag`** — Small bordered chip, `{rounded.sm}`, `{colors.canvas}` background, 1px `{colors.border}` stroke, `{colors.muted}` text, `{typography.label}` (mono, uppercase). Used for project tags. The "Password protected" variant (per product.md's requirement that protected projects are clearly marked before opening) keeps the `{rounded.pill}` shape and swaps to `{colors.danger-subtle}` fill with `{colors.danger}` text and lock glyph — no border — so the locked state reads as a distinct semantic warning rather than a neutral tag.

**`hero-dot-field`** — A faint grid of `{colors.border-strong}` dots anchored to the right edge of the homepage hero, visible desktop-only (`lg+`). A second dot layer in `{colors.accent}` is revealed only inside a small radius around the cursor (a CSS mask, no canvas/JS drawing) and fades into the canvas color on its inner edge. Never repeated elsewhere on the site.

**`halftone-portrait`** — The profile photo, sampled on a regular grid and rendered as one dot per cell: darker pixels become larger dots, near-white pixels shrink to nothing, so the photo reads as a monochrome halftone print rather than a continuous-tone image. Used both for the homepage's small About-preview thumbnail and the About page's full portrait, center-cropping the source to whichever aspect ratio the container needs. Dots are flat `{colors.ink}` fills (no gradients/glow/outlines) on a `{colors.canvas}` background inside a `{rounded.lg}` frame — matching the page floor it sits directly on, with no card surface behind it — so both are theme-correct without needing separate light/dark source images. Dot density adapts to the rendered container size (finer grid on wider layouts). On pointer proximity, nearby dots spring gently away from the cursor and their radius blends toward a uniform "in-focus" size — reading as the halftone briefly snapping into a crisp, ordered pattern — then relaxes exactly back to its resting grid position and brightness-mapped size once the pointer moves on; a barely-visible low-frequency noise field also keeps the whole grid "breathing" at rest. The real photo (`next/image`, with real `alt` text) is in the DOM underneath as the accessible fallback and is the only thing shown when canvas is unsupported, JS is disabled, or `prefers-reduced-motion` is set — otherwise it's hidden immediately (never shown mid-load) behind the `{colors.canvas}` placeholder, and the canvas fades in once dots are actually ready to draw.

**`password-gate`** — Centered `{colors.canvas-subtle}` card, `{rounded.lg}`, generous `{spacing.2xl}` padding. Single password input (`{colors.border-strong}` outline, focus ring in `{colors.accent}`), primary button, inline `{colors.danger}` error text on failure. No modal — a real page at `/work/[slug]` so the URL stays stable.

**`footer`** — Plain `{colors.canvas}`, contact links (email, LinkedIn, resume download) plus a single small colophon-style line in `{typography.mono-detail}` (a Billy Sweeney-style craft signal, e.g. noting the stack or a build detail) — one quiet credibility moment, not a marketing footer.

**`back-to-top`** — 44px circular button, `{colors.canvas-subtle}`, appears after scrolling past the hero on long case-study pages — preserved from the current site.

**`lightbox`** — Every case-study screenshot (`FramedScreenshot`, used by `Screenshot` and `ScreenshotPair`) is a `cursor-zoom-in` trigger button that opens a full-screen, single-image, zoomable overlay: `{colors.canvas}/95` scrim with a `backdrop-blur-sm`, image at natural resolution (`quality={95}`), fit to the viewport with generous padding. Interaction is hand-rolled (no dependency): wheel/pinch/double-click/double-tap zoom anchored at the pointer, drag-to-pan once zoomed, `+`/`−`/arrow-key/`Escape` keyboard support, and a 3-control focus trap (zoom out, zoom in, close) styled as `{component.back-to-top}` pills. No prev/next gallery and no thumbnail→overlay morph in v1 — the overlay is image-only, `alt` doubles as the dialog's accessible name.

## Z-index scale

A flat, documented stacking order — every `fixed`/`sticky` element on the site sits at one of these three layers, low to high:

| Layer | Value | Element |
|---|---|---|
| `back-to-top` | `z-40` | Scroll-triggered pill button |
| `nav-bar` | `z-50` | Sticky header |
| `lightbox` overlay | `z-[60]` | Full-screen image dialog — must sit above the nav it's portaled past |

## Do's and Don'ts

### Do
- Keep the accent to one hue across both themes. If a second chromatic color is needed, it must be a semantic state (danger/warning/success), never decorative.
- Let weight and size build hierarchy. Resist the urge to add a second typeface for "personality" — the mono voice already provides that contrast in small doses.
- Treat the theme toggle as a real feature: test both themes for every component before calling it done, not just the default.
- Reserve sustained/interactive motion for the homepage hero visual and the halftone portrait, plus small state-change micro-interactions elsewhere. If a component's animation doesn't communicate a state change or an entrance, cut it.
- Let case-study screenshots and videos sit flat on the canvas at content width — the interface itself is the frame. Reserve borders and shadows for the `principle-card` micro-shadow, the system's single card elevation step.

### Don't
- Don't add a second display typeface or a serif — that's Rebecca Ling's move specifically, not a shared "premium" pattern, and would clash with the single-voice system here.
- Don't make the dark theme an inverted afterthought — every color pair above was chosen independently for contrast and warmth in its own theme.
- Don't add shadows beyond the one elevation step (`{colors.canvas-subtle}` surfaces + the `principle-card` micro-shadow). No layered/soft-glow shadow systems.
- Don't animate on scroll everywhere — a scroll-reveal on every single section reads as a template, not craft.
- Don't use `{rounded.pill}` on cards or containers — it's reserved for buttons, tags, and the theme toggle.

## Responsive Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | 320–767px | Single column; nav collapses to hamburger sheet; `{spacing.section-mobile}` (56px) section padding; timeline rail moves flush-left; project-card thumbnail stacks above body |
| Tablet | 768–1023px | Nav stays horizontal; project-card splits into thumbnail/body columns; reading column unchanged |
| Desktop | 1024–1439px | Full nav; project list stays single-column (one full-width card per row); `{spacing.section-desktop}` (96px) section padding |
| Wide | ≥1440px | Same as Desktop; max content width caps at 1200px, extra space becomes outer margin |

No horizontal scrolling at any width. Touch targets ≥44px everywhere (nav links, tags are the exception as non-interactive, buttons/toggle/back-to-top all meet this).

## Known Gaps

- Exact focus-ring treatment (`{colors.accent}` outline width/offset) needs a final pass against WCAG AA once components are built, not just specified here.
- Motion durations above are starting points — tune after the timeline and scroll-reveal components are built and feel tested by hand.
