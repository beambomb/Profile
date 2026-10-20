"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the upper-middle of the
 * viewport, or null while the top of the page (`topId`) is in view.
 */
export function useActiveSection(ids: readonly string[], topId = "top"): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const targets = [topId, ...key.split(",")]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(entry.target.id === topId ? null : entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, topId]);

  return active;
}
