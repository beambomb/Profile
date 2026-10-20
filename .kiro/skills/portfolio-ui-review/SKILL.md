---
name: portfolio-ui-review
description: Pre-delivery checklist for the profile website. Use when building, reviewing, or changing any page, component, style, or animation on this site, and before declaring a UI task done.
---

# Portfolio UI Review

Run this checklist before finishing any UI task. It adapts the pre-delivery ideas of UI UX Pro Max to this project. Rules live in `.kiro/steering/` (design-system, ux-rules, content-voice, tech-stack); this skill only verifies them.

## Checklist
**Accessibility**
- [ ] Contrast >= 4.5:1 for text, using tokens only
- [ ] Visible focus ring on every interactive element; full keyboard path works
- [ ] One `h1`, ordered headings, landmarks, skip link
- [ ] Images have correct `alt`; icon-only controls have accessible names

**Interaction and layout**
- [ ] Targets >= 44x44px, `cursor-pointer` on clickables, no hover-only info
- [ ] Checked at 375, 768, 1024, 1440px; no horizontal scroll
- [ ] Tags and chips wrap; long text reflows without clipping

**Motion**
- [ ] `prefers-reduced-motion` honored
- [ ] Only `transform`/`opacity` animated; no looping decoration
- [ ] Typing effect is short, skippable, and content is in the DOM

**Style**
- [ ] No emoji icons, no purple/pink gradients, no percentage skill bars
- [ ] No raw hex colors in components; pixel font only for tiny labels

**Content**
- [ ] Plain-language summary comes before technical detail
- [ ] No invented facts; placeholders use `TODO(user):` and never render publicly
- [ ] No phone, address, or student ID shown

**Build**
- [ ] `npm run lint`, `npm run test -- --run`, and `npm run build` pass

## Reporting
List which items passed, which failed, and which could not be verified (for example, real screen reader testing). Automated checks do not replace manual accessibility testing.
