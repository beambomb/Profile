"use client";

import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface FoldableContextValue {
  isFolded: boolean;
}

const FoldableContext = createContext<FoldableContextValue>({ isFolded: false });

export function useFoldable() {
  return useContext(FoldableContext);
}

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
    <FoldableContext.Provider value={{ isFolded }}>
      <div
        ref={ref}
        data-folded={isFolded ? "true" : "false"}
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
    </FoldableContext.Provider>
  );
}

/**
 * Animated horizontal branch line that extends outward from the trunk when unfolded,
 * and retracts back into the trunk when folded.
 */
export function FoldableBranchLine({
  className = "",
  delayMs = 0,
}: {
  className?: string;
  delayMs?: number;
}) {
  const { isFolded } = useFoldable();
  return (
    <div
      className={`origin-left transition-all duration-500 ease-out ${
        isFolded ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
      } ${className}`}
      style={{
        transitionDelay: isFolded ? "0ms" : `${delayMs}ms`,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Animated branch node dot that pops in when the connector line touches it,
 * and collapses when folded.
 */
export function FoldableBranchDot({
  className = "",
  delayMs = 0,
}: {
  className?: string;
  delayMs?: number;
}) {
  const { isFolded } = useFoldable();
  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isFolded ? "scale-0 opacity-0" : "scale-100 opacity-100"
      } ${className}`}
      style={{
        transitionDelay: isFolded ? "0ms" : `${delayMs}ms`,
      }}
      aria-hidden="true"
    />
  );
}
