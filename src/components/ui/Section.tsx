import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionProps = {
  id: string;
  /** Tiny pixel-font label, decorative only. */
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
      <Reveal>
        <p aria-hidden="true" className="font-pixel text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="sweep mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        {intro ? <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p> : null}
      </Reveal>
      <div className="mt-12 sm:mt-14">{children}</div>
    </section>
  );
}
