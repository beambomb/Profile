---
inclusion: always
---

# UX Rules (adapted from UI UX Pro Max priorities)

When rules conflict, the lower-numbered section wins. Accessibility always comes first.

## 1. Accessibility (critical)
- Text contrast >= 4.5:1 (large text >= 3:1). Meaning is never conveyed by color alone.
- Visible keyboard focus on every interactive element (`accent` ring). Never remove outlines without a replacement.
- Skip link to main content. Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order.
- Meaningful `alt` text for images; decorative images use empty `alt`. Icon-only buttons need an accessible name.
- Typing effect and other motion must not hide content from assistive tech: the full text exists in the DOM, with an accessible label.

## 2. Touch and interaction (critical)
- Minimum 44x44px targets, at least 8px between them. `cursor-pointer` on clickable elements.
- Provide feedback for state changes (hover, focus, active). Never rely on hover alone.

## 3. Performance (high)
- `next/image` with explicit sizes; lazy-load below the fold; reserve space to avoid layout shift (CLS < 0.1).
- Prefer static generation. Keep client JavaScript small.

## 4. Layout and responsive (high)
- Mobile-first. Verify at 375, 768, 1024, 1440px. No horizontal scroll; do not disable zoom.
- Essential text must reflow without clipping at narrow widths, browser zoom, and text scaling.
- Chips and tag lists wrap (or offer an operable "+n" disclosure). Long URLs and identifiers wrap safely.

## 5. Animation (medium)
- Respect `prefers-reduced-motion`: replace movement with instant or fade-only changes.
- Motion must carry meaning (entrance, focus, state), not decoration. Different durations for different interactions.
- Rapid interactions may cancel animation, but final state, focus, and content must stay correct.

## 6. Navigation (high)
- Plain, predictable menu (Profile, Skills, Projects, Certificates, Contact). No command-line navigation.
- Primary CTAs on the home page: View Projects, Download CV, Contact. Project pages offer a clear way back and previous/next links.
- Mobile menu works with keyboard (Esc closes, focus is managed).

## 7. Recruiter-first
- A non-technical reader should understand who Johannes is and what he built within 30 seconds, without reading jargon.
- Technical detail lives below the plain-language summary, never in place of it.
