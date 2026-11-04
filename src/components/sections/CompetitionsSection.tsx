"use client";

import { profile } from "@content";
import { AwardIcon } from "@/components/ui/Icons";

export function CompetitionsSection() {
  if (!profile.achievements || profile.achievements.length === 0) return null;

  return (
    <section id="competitions" className="scroll-mt-20 py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Competitions
      </h2>

      {/* Competitions Cards */}
      <div className="space-y-4">
        {profile.achievements.map((ach) => (
          <div
            key={ach.title}
            className="rounded-xl border border-border bg-surface p-5 sm:p-6 pixel-frame transition-all hover:border-gold/40"
          >
            <div className="flex items-start gap-4">
              <div className="size-10 sm:size-11 rounded-md bg-cta/15 border border-cta/40 flex items-center justify-center shrink-0 shadow-inner">
                <AwardIcon className="size-5 text-gold" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-text leading-tight">
                    {ach.title}
                  </h3>
                  {ach.date ? (
                    <span className="text-xs font-semibold text-gold shrink-0">
                      {ach.date}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                  {ach.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
