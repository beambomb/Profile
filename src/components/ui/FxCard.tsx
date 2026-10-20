"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type FxCardProps = {
  as?: "div" | "article";
  className?: string;
  /** Max tilt in degrees. 0 disables tilt (the cursor spotlight still works). */
  tilt?: number;
  children: ReactNode;
};

/**
 * Card with a cursor-following spotlight and an optional subtle 3D tilt.
 * Mouse only: touch and keyboard users get the normal hover/focus styles, and
 * reduced motion disables the tilt.
 */
export function FxCard({ as = "div", className = "", tilt = 4, children }: FxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Component = as as "div";

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (tilt > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-py * tilt).toFixed(2)}deg) rotateY(${(px * tilt).toFixed(2)}deg) translateY(-2px)`;
    }
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Component
      ref={ref}
      className={`spotlight fx ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Component>
  );
}
