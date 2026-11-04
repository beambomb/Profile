"use client";

import { profile } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { BriefcaseIcon } from "@/components/ui/Icons";

export function ExperienceSection() {
  const { lang } = useLanguage();

  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-neutral-900">
      {/* Header Eyebrow */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
        {lang === "EN" ? "EXPERIENCE" : "PENGALAMAN"}
      </p>

      {/* Cursive Handwriting Annotation */}
      <div className="mb-1">
        <span className="font-handwriting text-2xl sm:text-3xl text-blue-500 font-bold -rotate-1 inline-block">
          {lang === "EN" ? "professional journey" : "perjalanan profesional"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        {lang === "EN" ? "Career Journey" : "Perjalanan Karir"}
      </h2>

      {/* Experience Cards */}
      <div className="space-y-4 sm:space-y-5">
        {profile.experience.map((item) => (
          <div
            key={item.organization}
            className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-7 hover:border-neutral-700/80 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="size-11 sm:size-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
                <BriefcaseIcon className="size-5 text-blue-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs text-neutral-400 shrink-0">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                  🏢 {item.organization}
                </p>

                <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-neutral-300 list-disc pl-5 leading-relaxed">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Awards & Competitions Card */}
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-7 hover:border-neutral-700/80 transition-all">
          <div className="flex items-start gap-4">
            <div className="size-11 sm:size-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-lg">🏆</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {lang === "EN" ? "Competitive Hackathons & Awards" : "Penghargaan & Kompetisi"}
                </h3>
                <span className="font-mono text-xs text-neutral-400 shrink-0">
                  2025 – 2026
                </span>
              </div>

              <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-neutral-300 list-disc pl-5 leading-relaxed">
                {profile.achievements.map((ach) => (
                  <li key={ach.title}>
                    <strong className="text-white">{ach.title}</strong> — {ach.detail}
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

