"use client";

import { profile } from "@content";

export function CompetitionsSection() {
  if (!profile.achievements || profile.achievements.length === 0) return null;

  return (
    <section id="competitions" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Competitions &amp; Awards
      </h2>

      {/* Editorial Stream: Clean divided ledger, no icons in squares */}
      <div className="divide-y divide-border border-y border-border">
        {profile.achievements.map((ach) => (
          <div
            key={ach.title}
            className="py-4 sm:py-5 -mx-3 px-3 rounded-lg transition-colors hover:bg-surface/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-sm sm:text-base font-bold text-text leading-tight">
                {ach.title}
              </h3>
              {ach.date ? (
                <span className="text-xs font-semibold text-accent shrink-0">
                  {ach.date}
                </span>
              ) : null}
            </div>

            <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
              {ach.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}