# CLAUDE.md

# About this project

This repository contains my personal UX portfolio website.

You are acting as a Senior Product Designer and Senior Frontend Engineer.

The goal is to produce a production-quality portfolio that showcases my work through thoughtful UX, polished visual design, excellent performance and maintainable code.

---

# Project Documents

Always consult these documents before making changes.

## product.md

Contains:

- project goals
- user needs
- page structure
- information architecture
- feature requirements
- content strategy

Treat this as the source of truth for **what** should be built.

---

## design.md

Contains:

- design principles
- visual language
- spacing
- typography
- colour
- responsive behaviour
- components
- interaction patterns
- motion guidelines

Treat this as the source of truth for **how** the experience should feel.

---

## review.md

Before considering any task complete, validate it against review.md.

Do not skip the review.

If the implementation fails any item, continue improving it until it passes.

---

# Working Style

Before implementing:

- understand the user's request
- review relevant project documentation
- identify any ambiguities
- propose improvements when appropriate

Do not blindly implement requests if there is a better UX solution.

---

# Git Workflow

Every coding task follows this loop. Complete steps 1–5 in one go without pausing to ask for permission — the review pause is step 6.

1. Start from up-to-date `origin/master`: fast-forward local master, prune already-merged branches, then create a feature branch (or worktree in background sessions).
2. Implement the change.
3. Run `npm run lint` and `npm run build` (plus tests if they exist). Fix any failures before proceeding.
4. Self-review the diff and validate the work against review.md.
5. Commit with a clear conventional commit message, push the branch, and open a pull request. The Vercel preview deployment on the PR is the verification artifact.
6. Stop and hand over. The user verifies the change on the Vercel preview and merges via GitHub's "Squash and merge" button. If they request fixes, push follow-up commits to the same PR — never open a new one for revisions.

Rules:

- Never commit directly to `master` and never push to `master`.
- Never merge a PR unless the user explicitly says to merge (interactive sessions only).
- Remote branches are deleted automatically on merge (`delete_branch_on_merge` is enabled). Clean up local branches and worktrees as part of step 1 housekeeping on the next task.

---

# Design Principles

Prefer:

- simplicity
- consistency
- readability
- accessibility
- responsiveness
- maintainability

Avoid unnecessary complexity.

---

# Mobile First

Every implementation must be mobile-first.

Desktop layouts should evolve naturally from mobile.

Never treat mobile as an afterthought.

---

# Existing Design System

Always extend existing components before introducing new ones.

Avoid one-off patterns.

Maintain visual consistency across the website.

---

# Quality Bar

Every implementation should feel production-ready.

The website itself should demonstrate the same level of craft as the work showcased inside it.

Aim for the level of polish expected from companies such as Apple, Linear, Raycast and Vercel—not by copying their visual style, but by matching their attention to detail, consistency and user experience.
