"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Position in a group of siblings; adds a short stagger (80ms per step). */
  index?: number;
};

/**
 * Fade-and-rise as content scrolls into view.
 *
 * Content is always visible in the server-rendered HTML. After hydration, only
 * elements that are still below the fold are hidden and then revealed by an
 * IntersectionObserver. With reduced motion, nothing is hidden or animated.
 */
export function Reveal({ children, className = "", index = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen (or above it): leave it visible, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--i": index } as CSSProperties}>
      {children}
    </div>
  );
}
