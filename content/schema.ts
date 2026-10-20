import { z } from "zod";

/**
 * Content schemas. All site copy lives in `content/` and is validated against these.
 * Unknown data uses the marker "TODO(user):" (see .kiro/steering/content-voice.md).
 */

export const PLACEHOLDER_MARKER = "TODO(user):";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase-kebab-case");
const nonEmpty = z.string().trim().min(1);

export const projectDomains = ["Data", "Mobile", "Web", "IoT"] as const;
export type ProjectDomain = (typeof projectDomains)[number];

export const profileSchema = z.object({
  name: nonEmpty,
  headline: nonEmpty,
  tagline: nonEmpty,
  location: nonEmpty,
  /** Path under /public, or null until a photo is added. */
  photo: z.string().startsWith("/").nullable(),
  photoAlt: nonEmpty,
  bio: z.array(nonEmpty).min(1),
  education: z.object({
    school: nonEmpty,
    degree: nonEmpty,
    years: nonEmpty,
  }),
  experience: z.array(
    z.object({
      organization: nonEmpty,
      role: nonEmpty,
      period: nonEmpty,
      points: z.array(nonEmpty).min(1),
    }),
  ),
  achievements: z.array(
    z.object({
      title: nonEmpty,
      detail: nonEmpty,
      date: nonEmpty,
    }),
  ),
  /** Focus areas shown under Education (from the CV summary). */
  interests: z.array(z.object({ label: nonEmpty, items: z.array(nonEmpty).min(1) })).default([]),
  /** Community numbers shown as stat tiles. Every value must come from the CV. */
  stats: z
    .array(z.object({ value: z.number().int().positive(), suffix: z.string().default(""), label: nonEmpty }))
    .default([]),
  needsReview: z.boolean().default(false),
});
export type Profile = z.infer<typeof profileSchema>;

export const skillGroupSchema = z.object({
  id: slug,
  label: nonEmpty,
  /** One plain-language sentence for non-technical readers. */
  plain: nonEmpty,
  items: z.array(nonEmpty).min(1),
});
export const skillsSchema = z.array(skillGroupSchema).min(1);
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const socialsSchema = z.object({
  github: z.url(),
  linkedin: z.url(),
  email: z.email(),
});
export type Socials = z.infer<typeof socialsSchema>;

export const cvSchema = z.object({
  /** Keep false until the user confirms the PDF is safe to publish. */
  published: z.boolean(),
  path: z.string().startsWith("/"),
  fileName: nonEmpty,
});
export type CvConfig = z.infer<typeof cvSchema>;

export const certificateSchema = z.object({
  id: slug,
  name: nonEmpty,
  issuer: nonEmpty,
  year: z.number().int().min(2000).max(2100),
  verifyUrl: z.url().optional(),
  image: z.string().startsWith("/").optional(),
  imageAlt: nonEmpty.optional(),
});
export const certificatesSchema = z.array(certificateSchema);
export type Certificate = z.infer<typeof certificateSchema>;

export const projectSchema = z.object({
  slug,
  title: nonEmpty,
  domain: z.enum(projectDomains),
  period: nonEmpty,
  /** One sentence a non-technical reader understands. */
  oneLiner: nonEmpty,
  award: nonEmpty.optional(),
  problem: z.array(nonEmpty).min(1),
  solution: z.array(nonEmpty).min(1),
  results: z.array(nonEmpty).min(1),
  role: nonEmpty,
  /** Tags shown on cards (keep short). */
  tags: z.array(nonEmpty).min(1).max(8),
  stack: z.array(z.object({ label: nonEmpty, items: z.array(nonEmpty).min(1) })).min(1),
  architecture: z.object({
    summary: nonEmpty,
    /** Ordered steps rendered as a diagram. */
    steps: z.array(z.object({ label: nonEmpty, detail: nonEmpty })).min(2),
  }),
  decisions: z.array(z.object({ title: nonEmpty, why: nonEmpty })).min(1),
  limitations: z.array(nonEmpty).default([]),
  repoUrl: z.url(),
  needsReview: z.boolean().default(false),
});
export type Project = z.infer<typeof projectSchema>;
export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, {
    message: "project slugs must be unique",
  });
