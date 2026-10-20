"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

type TypedTextProps = {
  text: string;
  /** Milliseconds per character. Keep the whole effect under ~2.5 seconds. */
  speed?: number;
  className?: string;
};

/**
 * Short typing effect. The full text always exists for assistive tech and for
 * layout (so nothing shifts). The effect is skippable and off for reduced motion.
 */
export function TypedText({ text, speed = 22, className }: TypedTextProps) {
  const reduce = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const done = reduce || count >= text.length;

  useEffect(() => {
    if (reduce || count >= text.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, reduce, speed, text.length]);

  return (
    <div className={className}>
      <p className="grid">
        <span className="sr-only">{text}</span>
        {/* Invisible full copy reserves space so the layout never jumps. */}
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          {text}
        </span>
        <span aria-hidden="true" className="col-start-1 row-start-1">
          {done ? text : text.slice(0, count)}
          {!done ? <span className="caret ml-0.5 inline-block h-[1em] w-[3px] translate-y-[2px] bg-accent" /> : null}
        </span>
      </p>
      {!done ? (
        <button
          type="button"
          onClick={() => setCount(text.length)}
          className="mt-2 inline-flex min-h-11 cursor-pointer items-center font-mono text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          Skip animation
        </button>
      ) : null}
    </div>
  );
}
