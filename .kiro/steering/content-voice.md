---
inclusion: always
---

# Content Voice and Rules

All site copy is in English. Tone: confident, warm, plain. Short sentences. No hype or superlatives.

## Case study format (every project)
1. One plain-language sentence a non-technical reader understands.
2. Problem: who had what problem and why it mattered.
3. Solution: what was built, described by what it does for people.
4. Result: only outcomes supported by the source (README, CV, or user). No invented metrics.
5. My role (confirmed by the user; team projects must say so).
6. Technical details (stack, architecture, key decisions), then links.

## Rules
- Define jargon on first use or avoid it (for example "streaming pipeline: data processed continuously as it arrives").
- Never claim a metric, award, role, employer, or certificate that is not in a verified source.
- Source READMEs are mostly Indonesian and technical. Rewrite in plain English; do not translate word-for-word.
- Program: "Information Engineering" (Teknologi Informasi), Universitas Gadjah Mada. This is the English name used on the owner's CV; use it consistently.

## Placeholders
- Unknown data uses the marker `TODO(user):` inside the value, for example `"TODO(user): LinkedIn URL"`.
- The content validation script lists every remaining placeholder. Placeholders must never render publicly: empty sections hide or show a neutral state.
- Items needing user review carry `needsReview: true` until the user confirms them.

## Privacy
- Do not publish phone numbers, home address, or ID numbers (for example student ID/NIM) anywhere on the site.
- The CV is copied to `public/` only after the user confirms it is safe to publish.
