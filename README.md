# Profile website: Johannes De Deo Dimas Aryobimo

A dark, terminal-flavored portfolio with a light arcade touch, written for recruiters (including non-technical ones). Built with Next.js (App Router), TypeScript, and Tailwind CSS. All content lives in local files, so there is no database or CMS.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm test -- --run` | Unit and component tests (Vitest) |
| `npm run validate:content` | Validates the content files only |
| `npm run test:e2e` | Browser tests with Playwright and axe (uses the Microsoft Edge installed on Windows) |

## Edit the content

Everything shown on the site comes from `content/`, validated by the schemas in `content/schema.ts`.

| File | Controls |
|---|---|
| `content/profile.ts` | Name, bio, education, experience, achievements, stat tiles, photo |
| `content/skills.ts` | Skill groups and the plain-language line for each |
| `content/projects.ts` | The project cards and every case study page |
| `content/socials.ts` | GitHub, LinkedIn, email, CV settings, certificates |

### Add a project
Add an object to the array in `content/projects.ts`. A new `slug` automatically gets its own page at `/projects/<slug>`. Write the plain-language `oneLiner`, `problem`, `solution`, and `results` first, then the technical parts. Do not invent metrics.

### Easiest way: the `inbox/` folder
Drop your photo, certificate images, and a safe CV into `inbox/` (see the README inside each subfolder), then ask Kiro to process it. Files in `inbox/` are not committed to Git.

### Add certificates (manual way)
Put images in `public/images/certificates/` and add entries to `certificates` in `content/socials.ts`:

```ts
{ id: "example", name: "Course name", issuer: "Issuer", year: 2026,
  verifyUrl: "https://...", image: "/images/certificates/example.png",
  imageAlt: "Short description of the certificate" }
```
The Certificates section and its menu link appear automatically once there is at least one entry.

### Add your photo
Save it in `public/images/` and set `photo: "/images/your-photo.jpg"` in `content/profile.ts`. Until then a monogram is shown.

### Publish the CV (not yet enabled)
The CV PDF contains a phone number and home address, so the **Download CV** button is off. To turn it on, save a public-safe copy as `public/cv.pdf` and set `published: true` in `content/socials.ts`. The test suite fails if `published` is true and the file is missing.

## Themes

Dark and a beige-gold light theme. New visitors get their system setting; the sun/moon button in the header saves a choice. Colors are tokens in `src/app/globals.css` (see the table in `.kiro/steering/design-system.md`).

## Design and consistency rules

Project rules live in `.kiro/steering/` (tech stack, design system, UX rules, content voice) and the checklist skill in `.kiro/skills/portfolio-ui-review/`. Colors and fonts are tokens in `src/app/globals.css`. Read those files before changing the look.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project** and import the repository. The framework is detected automatically; no extra settings are needed.
3. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) so the sitemap, canonical URLs, and social preview use your real address. Without it, the Vercel production URL is used.

## Notes

- Content marked `needsReview: true` was drafted from the CV and the project READMEs and still needs the owner's approval of the wording.
- Automated accessibility checks (axe) are included, but they do not replace testing with a real screen reader and keyboard.
