"use client";

import { useState } from "react";
import { profile } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { ChevronDownIcon, GraduationCapIcon } from "@/components/ui/Icons";

export function EducationSection() {
  const { lang } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="education" className="py-12 sm:py-16 border-b border-neutral-900">
      {/* Header Eyebrow */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
        {lang === "EN" ? "EDUCATION" : "PENDIDIKAN"}
      </p>

      {/* Cursive Handwriting Annotation */}
      <div className="mb-1">
        <span className="font-handwriting text-2xl sm:text-3xl text-blue-500 font-bold -rotate-1 inline-block">
          {lang === "EN" ? "education is key" : "pendidikan adalah kunci"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        {lang === "EN" ? "Academic Path" : "Jalur Akademik"}
      </h2>

      {/* Main Education Card */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-7 hover:border-neutral-700/80 transition-all">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Institution Shield / Seal Icon */}
          <div className="size-12 sm:size-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
            <GraduationCapIcon className="size-6 text-amber-400" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              {profile.education.school}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">
              {profile.education.degree} · Class of 2024 – 2028
            </p>
            <p className="font-mono text-xs text-neutral-400 mt-1">
              📅 {profile.education.years} &nbsp;·&nbsp; 📍 Yogyakarta, Indonesia
            </p>

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              aria-expanded={showDetails}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
            >
              <span>{showDetails ? (lang === "EN" ? "Hide details" : "Sembunyikan") : (lang === "EN" ? "Show details" : "Lihat detail")}</span>
              <ChevronDownIcon
                className={`size-3.5 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Expandable Academic Details */}
        {showDetails ? (
          <div className="mt-6 pt-5 border-t border-neutral-800/80 space-y-4 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <div>
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {lang === "EN" ? "Focus Disciplines" : "Fokus Keilmuan"}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-200"
                  >
                    <strong className="text-blue-400 mr-1.5">{interest.label}:</strong> {interest.items.join(", ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {lang === "EN" ? "Notable Honors" : "Prestasi Akademik"}
              </p>
              <ul className="space-y-1.5 text-neutral-300 list-disc pl-5">
                {profile.achievements.map((ach) => (
                  <li key={ach.title}>
                    <strong className="text-white">{ach.title}</strong> — {ach.detail} ({ach.date})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

