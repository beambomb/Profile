"use client";

import { useState } from "react";
import { profile } from "@content";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function EducationSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="education" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Academic Path
      </h2>

      {/* Main Education Stream: Clean typography without icon-in-a-box */}
      <div className="border-y border-border py-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-base sm:text-lg font-bold text-text leading-tight">
            {profile.education.school}
          </h3>
          <span className="text-xs font-semibold text-accent shrink-0">
            {profile.education.years}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-text mt-1 font-medium">
          {profile.education.degree} · Class of 2024 – 2028
        </p>
        <p className="text-xs text-muted mt-0.5">
          Yogyakarta, Indonesia
        </p>

        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          aria-expanded={showDetails}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline cursor-pointer transition-colors"
        >
          <span>{showDetails ? "Hide focus & coursework" : "View focus & coursework"}</span>
          <ChevronDownIcon
            className={`size-3.5 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
          />
        </button>

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
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-surface border border-border-strong text-text"
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