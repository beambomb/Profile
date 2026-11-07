"use client";

import React, { useEffect, useState } from "react";

interface TreeTrunkLineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

/**
 * TreeTrunkLine draws the main vertical trunk line of the tree timeline
 * smoothly downward as the user scrolls, and retracts it upward when
 * the user scrolls back up.
 *
 * Synchronized with the 88% viewport threshold of FoldableItem.
 * Fully supports `prefers-reduced-motion: reduce`.
 */
export function TreeTrunkLine({ containerRef, className = "" }: TreeTrunkLineProps) {
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReduced(true);
      return;
    }

    const updateLine = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Match the 88% viewport trigger threshold used by FoldableItem
      const triggerLine = window.innerHeight * 0.88;
      const topOffset = 8; // Center of the first year node

      const currentProgress = triggerLine - (rect.top + topOffset);
      const maxHeight = Math.max(0, rect.height - topOffset - 24);

      const clamped = Math.max(0, Math.min(currentProgress, maxHeight));
      setLineHeight(clamped);
    };

    updateLine();

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateLine();
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
  }, [containerRef]);

  if (isReduced) {
    return (
      <div
        className={`absolute -left-[2px] top-2 bottom-6 w-[2px] bg-border-strong/70 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {/* Background Subtle Ghost Track */}
      <div
        className="absolute -left-[2px] top-2 bottom-6 w-[2px] bg-border-strong/20"
        aria-hidden="true"
      />

      {/* Dynamic Animated Active Trunk Line */}
      <div
        className="absolute -left-[2px] top-2 w-[2px] bg-gradient-to-b from-border-strong via-accent to-accent rounded-full transition-[height] duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        style={{ height: `${lineHeight}px` }}
        aria-hidden="true"
      >
        {/* Leading glowing pulse dot at the tip of the active line */}
        {lineHeight > 8 && (
          <div
            className="absolute -bottom-1 -left-[3px] size-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
