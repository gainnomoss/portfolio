# Ke Er Zhang — Product Design Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. See `product.md.md` for goals/IA, `design.md` for the design system, and `review.md` for the QA checklist.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the case-study password(s)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new case study

1. Add `content/projects/<slug>.mdx` with frontmatter (`title`, `company`, `summary`, `type`, `tags`, `thumbnail`, `protected`, `order`) — see existing files for the shape.
2. Drop images in `public/projects/<slug>/`.
3. To password-protect it: set `protected: true` in the frontmatter and add `PASSWORD_<SLUG-IN-SCREAMING-SNAKE-CASE>` to `.env.local` (and to the deploy environment). No other code changes needed.
4. To stub it before content is ready: set `comingSoon: true` instead — it'll show as a "Coming soon" card and won't be statically generated or indexed.

## Stack

Next.js 15 (App Router, Node 18-compatible — Tailwind is pinned to v3 since v4's native binary requires Node 20+), `next-themes` for light/dark, `next-mdx-remote` for case study content, `motion` for the sparing bits of animation, Geist (sans + mono) via `next/font`.

## Deploying

Recommended target is Vercel. Set `NEXT_PUBLIC_SITE_URL` and the `PASSWORD_*` env var(s) from `.env.example` in the deploy environment.
