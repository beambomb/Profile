"use client";

import { profile } from "@content";
import { BriefcaseIcon } from "@/components/ui/Icons";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Career Journey
      </h2>

      {/* Experience Cards */}
      <div className="space-y-5">
        {profile.experience.map((item) => (
          <div
            key={item.organization}
            className="rounded-xl border border-border bg-surface p-6 sm:p-7 pixel-frame transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="size-11 sm:size-12 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 shadow-inner">
                <BriefcaseIcon className="size-5 text-accent" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-text leading-tight">
                    {item.role}
                  </h3>
                  <span className="text-xs font-semibold text-accent shrink-0">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-text font-medium mt-1">
                  🏢 {item.organization}
                </p>

                <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-muted list-disc pl-5 leading-relaxed">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Awards & Competitions Card */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-7 pixel-frame transition-all">
          <div className="flex items-start gap-4">
            <div className="size-11 sm:size-12 rounded-md bg-cta/15 border border-cta/40 flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-lg">🏆</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-text leading-tight">
                  Competitive Hackathons & Awards
                </h3>
                <span className="text-xs font-semibold text-gold shrink-0">
                  2025 – 2026
                </span>
              </div>

              <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-muted list-disc pl-5 leading-relaxed">
                {profile.achievements.map((ach) => (
                  <li key={ach.title}>
                    <strong className="text-text">{ach.title}</strong> — {ach.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
