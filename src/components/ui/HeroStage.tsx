"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/** Hero wrapper: a faint grid plus a glow that follows the mouse (mouse only). */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="hero-stage relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      {children}
    </section>
  );
}
