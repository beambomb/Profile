---
inclusion: always
---

# Design System: "A friendly terminal with an arcade touch"

Dark, techy, readable. The retro fighting-game reference is a subtle flavor, never the whole theme.

## Color tokens (single source of truth)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0B0F17` | Page background |
| `surface` | `#121826` | Cards, panels |
| `surface-2` | `#1A2233` | Raised or hovered surfaces |
| `border` | `#2A3550` | Borders, pixel frames |
| `text` | `#E6EAF2` | Body text |
| `muted` | `#9AA6BD` | Secondary text (must stay >= 4.5:1 on `bg` and `surface`) |
| `accent` | `#22D3EE` | Links, highlights, focus ring |
| `cta` | `#FBBF24` | Primary call to action only |
| `danger` | `#F43F5E` | Tiny decorative accents only (HP-bar details) |

Use tokens through Tailwind names (`bg-bg`, `text-muted`, `border-border`, ...). No raw hex in components.

## Typography
- Body and headings: Inter. Code and labels: JetBrains Mono.
- Press Start 2P: tiny decorative labels only (for example "PLAYER 1", "SELECT"), uppercase, never for body copy or long text.
- Body text >= 16px, line-height 1.5 to 1.7. No text below 12px.

## Shape, spacing, effects
- 4px spacing grid. Radius is small (`rounded-sm`/`rounded-md`); arcade cards use a stepped pixel-style border.
- Glow is allowed on `accent` hover/focus only, and it must be subtle.
- Motion: 150-250ms for micro interactions, 400-600ms for entrances. Animate `transform` and `opacity` only.

## Arcade touches (allowed)
- Hero as a "PLAYER 1" card; short, skippable typing effect.
- Projects grid as "character select" with a selected highlight.
- Skill tags as "combo" chips.

## Anti-patterns (forbidden)
- Purple or pink gradients, neon overload, scanline overlays that reduce legibility.
- Percentage skill bars or invented proficiency numbers.
- Emoji as icons (use inline SVG icons).
- Mixing unrelated styles in one view, raw hex colors, body text in the pixel font.
- Hover-only information; infinite or looping decorative animation (the tiny blinking text caret is the only exception, and it stops with reduced motion).
- Marquees, auto-playing carousels, and parallax that moves content out of reach.

## Interactions (encouraged, all reduced-motion safe)
- Cursor spotlight and subtle tilt on cards (mouse only), count-up numbers, scroll progress bar, active-section nav, staggered reveal on scroll, copy-to-clipboard feedback.
