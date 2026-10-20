import type { ReactNode } from "react";

/** "Combo" chip. Always wraps with its siblings and never truncates its label. */
export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const tones = {
    default: "border-border-strong bg-surface-2 text-text hover:border-accent hover:text-accent",
    accent: "border-accent/50 bg-accent/10 text-accent hover:bg-accent/15",
  } as const;
  return (
    <span
      className={`inline-block cursor-default rounded-sm border px-3 py-1.5 font-mono text-sm leading-snug transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function TagList({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {children}
    </ul>
  );
}
