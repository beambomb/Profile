import { existsSync } from "node:fs";
import path from "node:path";
import { certificates, cv, findPlaceholders, profile, projects, skills, socials } from "./index";
import { projectsSchema } from "./schema";

describe("content", () => {
  it("has the five featured projects with unique slugs", () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(
      ["aemads", "carikos", "turbofan-predictive-maintenance", "vanigrow", "weather-elt-pipeline"].sort(),
    );
  });

  it("rejects duplicate slugs", () => {
    const dup = [projects[0], { ...projects[1], slug: projects[0].slug }];
    expect(projectsSchema.safeParse(dup).success).toBe(false);
  });

  it("links every project to a repository owned by beambomb", () => {
    for (const p of projects) {
      expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/beambomb\//);
    }
  });

  it("has skill groups with items and a plain-language line", () => {
    for (const group of skills) {
      expect(group.items.length).toBeGreaterThan(0);
      expect(group.plain.length).toBeGreaterThan(0);
    }
  });

  it("does not expose phone numbers or student IDs", () => {
    const text = JSON.stringify({ profile, skills, projects, socials });
    expect(text).not.toMatch(/\+62|0895|24\/\d{6}\/TK/);
  });

  it("has image files on disk for every certificate and the profile photo", () => {
    const files = [profile.photo, ...certificates.map((c) => c.image)].filter((f): f is string => Boolean(f));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(existsSync(path.join(process.cwd(), "public", file))).toBe(true);
    }
  });

  it("only publishes the CV when the PDF exists in /public", () => {
    if (cv.published) {
      expect(existsSync(path.join(process.cwd(), "public", cv.path))).toBe(true);
    }
  });

  it("reports remaining placeholders (informational)", () => {
    const remaining = findPlaceholders({ profile, skills, projects, socials, certificates });
    if (remaining.length) console.info("Placeholders still to fill:\n" + remaining.join("\n"));
    expect(Array.isArray(remaining)).toBe(true);
  });

  it("lists items that still need the owner's review (informational)", () => {
    const pending = [
      profile.needsReview ? "profile" : null,
      ...projects.filter((p) => p.needsReview).map((p) => `project:${p.slug}`),
    ].filter(Boolean);
    console.info("Awaiting owner review:", pending.join(", "));
    expect(pending.length).toBeGreaterThanOrEqual(0);
  });
});
