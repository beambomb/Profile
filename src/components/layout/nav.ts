import { certificates } from "@content";

const allItems = [
  { label: "Profile", href: "/#profile" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#experience" },
  { label: "Competitions", href: "/#competitions" },
  { label: "Skills", href: "/#skills" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Contact", href: "/#contact" },
] as const;

// The Certificates link only appears once there is at least one certificate to show.
export const navItems = allItems.filter((item) => item.href !== "/#certificates" || certificates.length > 0);
