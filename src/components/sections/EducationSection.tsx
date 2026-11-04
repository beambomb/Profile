"use client";

import { useState } from "react";
import { profile } from "@content";
import { ChevronDownIcon, GraduationCapIcon } from "@/components/ui/Icons";

export function EducationSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="education" className="scroll-mt-20 py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Academic Path
      </h2>

      {/* Main Education Card */}
      <div className="rounded-xl border border-border bg-surface p-6 sm:p-7 pixel-frame transition-all">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Institution Shield / Seal Icon */}
          <div className="size-12 sm:size-14 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 shadow-inner">
            <GraduationCapIcon className="size-6 text-accent" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-text leading-tight">
              {profile.education.school}
            </h3>
            <p className="text-xs sm:text-sm text-text mt-1 font-medium">
              {profile.education.degree} · Class of 2024 – 2028
            </p>
            <p className="text-xs text-muted mt-1 font-medium">
              {profile.education.years} &nbsp;·&nbsp; Yogyakarta, Indonesia
            </p>

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              aria-expanded={showDetails}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline cursor-pointer transition-colors"
            >
              <span>{showDetails ? "Hide details" : "Show details"}</span>
              <ChevronDownIcon
                className={`size-3.5 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Expandable Academic Details */}
        {showDetails ? (
          <div className="mt-6 pt-5 border-t border-border space-y-4 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                Focus disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-surface-2 border border-border-strong text-text"
                  >
                    <strong className="text-accent mr-1.5">{interest.label}:</strong> {interest.items.join(", ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                Notable honors
              </p>
              <ul className="space-y-1.5 text-muted list-disc pl-5">
                {profile.achievements.map((ach) => (
                  <li key={ach.title}>
                    <strong className="text-text">{ach.title}</strong> — {ach.detail} ({ach.date})
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
