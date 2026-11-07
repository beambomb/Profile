"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface FoldableItemProps {
  children: ReactNode;
  className?: string;
  /** Position in a group of siblings for staggered reveal */
  index?: number;
  /** Fold angle in degrees (default 16deg for subtle tactile 3D fold) */
  foldAngle?: number;
}

/**
 * FoldableItem creates a 3D perspective unfold on downward scroll,
 * and folds back up when scrolling back up past the bottom fold.
 *
 * Fully respects `prefers-reduced-motion: reduce`.
 */
export function FoldableItem({
  children,
  className = "",
  index = 0,
  foldAngle = 16,
}: FoldableItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFolded, setIsFolded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsFolded(false);
      return;
    }

    const evaluate = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Trigger threshold: 88% down the viewport (12% above the bottom edge)
      const triggerLine = window.innerHeight * 0.88;

      if (rect.top < triggerLine) {
        setIsFolded(false);
      } else {
        setIsFolded(true);
      }
    };

    // Evaluate immediately on mount
    evaluate();

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        evaluate();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`foldable-item ${className}`}
      style={{
        perspective: "1000px",
        transformOrigin: "50% 0%",
        transition:
          "transform 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), filter 450ms ease",
        transitionDelay: isFolded ? "0ms" : `${Math.min(index * 70, 210)}ms`,
        transform: isFolded
          ? `rotateX(-${foldAngle}deg) translateY(20px) scale(0.97)`
          : "rotateX(0deg) translateY(0) scale(1)",
        opacity: isFolded ? 0 : 1,
        filter: isFolded ? "blur(3px)" : "blur(0px)",
        pointerEvents: isFolded ? "none" : "auto",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
