"use client";

import { profile } from "@content";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-8">
        Experience
      </h2>

      {/* Subsection 1: Organizational and Committee Experience */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-text mb-4 uppercase tracking-wider font-mono text-accent">
          Organizational and Committee Experience
        </h3>

        <div className="divide-y divide-border border-y border-border">
          {profile.experience.map((item) => (
            <div
              key={item.organization}
              className="py-5 sm:py-6 -mx-3 px-3 rounded-lg transition-colors hover:bg-surface/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="text-base sm:text-lg font-bold text-text leading-tight">
                  {item.role}
                </h4>
                <span className="text-xs font-semibold text-accent shrink-0">
                  {item.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-muted mt-1">
                {item.organization}
              </p>

              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-muted list-disc pl-5 leading-relaxed">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Subsection 2: Competitions and Awards */}
      {profile.achievements && profile.achievements.length > 0 ? (
        <div className="mt-12">
          {/* Preserves deep link & test target */}
          <span id="competitions" className="sr-only" />

          <h3 className="text-sm sm:text-base font-bold text-text mb-4 uppercase tracking-wider font-mono text-accent">
            Competitions and Awards
          </h3>

          <div className="divide-y divide-border border-y border-border">
            {profile.achievements.map((ach) => (
              <div
                key={ach.title}
                className="py-4 sm:py-5 -mx-3 px-3 rounded-lg transition-colors hover:bg-surface/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-text leading-tight">
                    {ach.title}
                  </h4>
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
        </div>
      ) : null}
    </section>
  );
}