"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: number; suffix?: string; duration?: number };

/**
 * Counts from 0 to `value` once it scrolls into view.
 * The final value is rendered on the server and read by screen readers; the
 * animated number is decorative. Reduced motion skips the animation.
 */
export function CountUp({ value, suffix = "", duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true">{`${display}${suffix}`}</span>
    </span>
  );
}
