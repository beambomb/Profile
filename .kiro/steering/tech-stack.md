---
inclusion: always
---

# Tech Stack and Project Conventions

Personal profile website for Johannes De Deo Dimas Aryobimo. Audience: recruiters, including non-technical ones.

## Stack
- Next.js (App Router) + TypeScript (`strict: true`) + Tailwind CSS. Deploy target: Vercel.
- Animation: no animation library. Plain CSS plus small client components (`Reveal`, `CountUp`, `FxCard`, `ScrollProgress`). Content must be visible in the server-rendered HTML; never start elements hidden from JavaScript before hydration. Everything animated must respect `prefers-reduced-motion`.
- Content: local typed files in `content/` plus MDX for case studies. No CMS, no database, no API keys.
- Validation: `zod` schemas for all content. Invalid content must fail the build or tests.
- Tests: Vitest + Testing Library; Playwright for smoke and axe checks (Task 10).
- Pin exact dependency versions (no `^` or `~`). Do not add libraries without a stated reason.

## Structure
```
content/            typed data (profile, skills, socials, certificates, projects)
content/projects/   one MDX case study per project
src/app/            routes (home, projects/[slug])
src/components/     layout | sections | ui | motion | diagrams
public/             cv.pdf, images
```

## Rules
- Server Components by default. Use `"use client"` only for interactivity (menu, filter, lightbox, motion).
- Never hardcode copy, URLs, or colors in components. Copy comes from `content/`, colors from design tokens.
- Use `next/image` for images and `next/font` for fonts.
- Do not invent facts, metrics, roles, or certificates. Unknown data is a flagged placeholder (see content-voice).
- Do not push, deploy, or commit unless the user explicitly asks.
