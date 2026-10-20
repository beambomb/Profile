import { PLACEHOLDER_MARKER } from "./schema";

export { profile } from "./profile";
export { skills } from "./skills";
export { projects } from "./projects";
export { socials, cv, certificates } from "./socials";
export type { Project, ProjectDomain, SkillGroup, Certificate, Profile } from "./schema";
export { projectDomains } from "./schema";

/** Recursively collect string values that still contain the placeholder marker. */
export function findPlaceholders(value: unknown, path = "$"): string[] {
  if (typeof value === "string") {
    return value.includes(PLACEHOLDER_MARKER) ? [path] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => findPlaceholders(item, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, v]) => findPlaceholders(v, `${path}.${key}`));
  }
  return [];
}
