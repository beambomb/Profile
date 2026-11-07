"use client";

import React, { useState, useMemo, useRef } from "react";
import { profile } from "@content";
import {
  FoldableItem,
  FoldableBranchLine,
  FoldableBranchDot,
} from "@/components/motion/FoldableItem";
import { TreeTrunkLine } from "@/components/motion/TreeTrunkLine";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
] as const;

type MonthName = (typeof MONTH_NAMES)[number];

const MONTH_MAP: Record<string, MonthName> = {
  jan: "Jan", january: "Jan",
  feb: "Feb", february: "Feb",
  mar: "Mar", march: "Mar",
  apr: "Apr", april: "Apr",
  may: "May",
  jun: "Jun", june: "Jun",
  jul: "Jul", july: "Jul",
  aug: "Aug", august: "Aug",
  sep: "Sep", september: "Sep",
  oct: "Oct", october: "Oct",
  nov: "Nov", november: "Nov",
  dec: "Dec", december: "Dec",
};

interface ParsedExperienceItem {
  organization: string;
  role: string;
  period: string;
  points: string[];
  year: number;
  month: MonthName;
}

export function ExperienceSection() {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Normalize and parse every experience item to an exact year and month
  const parsedItems: ParsedExperienceItem[] = useMemo(() => {
    return (profile.experience || []).map((item) => {
      // 1. Year determination
      let year = item.year;
      if (!year) {
        const yearMatch = item.period.match(/\b(20\d\d)\b/);
        year = yearMatch ? parseInt(yearMatch[1], 10) : 2026;
      }

      // 2. Month determination
      let monthStr = item.month || "";
      if (!monthStr) {
        const monthMatch = item.period.match(
          /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/i
        );
        if (monthMatch) {
          monthStr = monthMatch[1];
        }
      }

      const normalizedMonth = MONTH_MAP[monthStr.toLowerCase()] || "Jan";

      return {
        ...item,
        year,
        month: normalizedMonth,
      };
    });
  }, []);

  // Build the Tree structure:
  // Evaluates Jan-Dec across 2024–2026 (or any years present),
  // BUT ONLY includes months that actually have correlated events!
  const treeData = useMemo(() => {
    // Collect all unique years in data, plus guaranteed support for 2024..2026
    const dataYears = parsedItems.map((item) => item.year);
    const minYear = Math.min(2024, ...dataYears);
    const maxYear = Math.max(2026, ...dataYears);

    const yearsList: number[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      yearsList.push(y);
    }

    if (sortOrder === "desc") {
      yearsList.sort((a, b) => b - a);
    } else {
      yearsList.sort((a, b) => a - b);
    }

    const groups: {
      year: number;
      months: {
        month: MonthName;
        monthIndex: number;
        items: ParsedExperienceItem[];
      }[];
    }[] = [];

    for (const year of yearsList) {
      const yearEvents = parsedItems.filter((item) => item.year === year);
      // If a year has no events yet, skip rendering it until user adds items
      if (yearEvents.length === 0) continue;

      // Iterate Jan through Dec
      const monthGroups: {
        month: MonthName;
        monthIndex: number;
        items: ParsedExperienceItem[];
      }[] = [];

      // Sort months either desc (Dec -> Jan) or asc (Jan -> Dec) matching sort order
      const monthIndices = sortOrder === "desc"
        ? [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      for (const idx of monthIndices) {
        const monthName = MONTH_NAMES[idx];
        const monthEvents = yearEvents.filter((item) => item.month === monthName);

        // ONLY add if there is at least one correlated event in this month!
        if (monthEvents.length > 0) {
          monthGroups.push({
            month: monthName,
            monthIndex: idx,
            items: monthEvents,
          });
        }
      }

      if (monthGroups.length > 0) {
        groups.push({
          year,
          months: monthGroups,
        });
      }
    }

    return groups;
  }, [parsedItems, sortOrder]);

  return (
    <section id="experience" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-8">
        Experience
      </h2>

      {/* Subsection 1: Organizational and Committee Experience (Tree Timeline) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h3 className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-accent uppercase tracking-wider font-mono">
            <span aria-hidden="true" className="text-accent text-sm select-none shrink-0 font-bold">▸</span>
            <span>Organizational and Committee Experience</span>
          </h3>

          {/* Minimalist Chronological Order Toggle */}
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-surface-2 text-[11px] font-mono text-muted hover:text-text hover:border-border-strong transition-all select-none"
            aria-label={`Toggle timeline sort order. Currently ${sortOrder === "desc" ? "Latest first (2026 → 2024)" : "Oldest first (2024 → 2026)"}`}
          >
            <span className="text-accent/80 font-bold">⇅</span>
            <span>{sortOrder === "desc" ? "2026 → 2024" : "2024 → 2026"}</span>
          </button>
        </div>

        {/* Tree Container with Dynamic Vertical Trunk Line */}
        <div
          ref={treeContainerRef}
          className="relative pl-6 sm:pl-8 border-l-2 border-transparent ml-2.5 sm:ml-4 space-y-10"
        >
          {/* Vertical Trunk Line (Animated Scroll Drawing & Retraction) */}
          <TreeTrunkLine containerRef={treeContainerRef} />

          {treeData.map((yearGroup, yIdx) => (
            <div key={yearGroup.year} className="relative">
              {/* Year Trunk Node Point & Label (Foldable on Scroll) */}
              <FoldableItem index={yIdx} foldAngle={14} className="relative">
                {/* Year Trunk Node Point */}
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="size-3.5 rounded-sm bg-surface border-2 border-accent shadow-sm" />
                </div>

                {/* Year Label */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="font-pixel text-base sm:text-lg font-bold text-text tracking-wide">
                    {yearGroup.year}
                  </span>
                  <span className="font-mono text-[11px] text-muted/60">
                    // {yearGroup.months.reduce((acc, m) => acc + m.items.length, 0)} {yearGroup.months.reduce((acc, m) => acc + m.items.length, 0) === 1 ? "role" : "roles"}
                  </span>
                </div>
              </FoldableItem>

              {/* Month Branches (Only rendered if an event exists for that month!) */}
              <div className="space-y-6">
                {yearGroup.months.map((monthGroup, mIdx) => (
                  <FoldableItem
                    key={`${yearGroup.year}-${monthGroup.month}`}
                    index={mIdx}
                    className="relative pl-5 sm:pl-6"
                  >
                    {/* Horizontal Branch Connector Line from Trunk (Animated) */}
                    <FoldableBranchLine
                      className="absolute -left-6 sm:-left-8 top-3.5 w-5 sm:w-6 h-[1.5px] bg-border-strong/90"
                      delayMs={mIdx * 60 + 50}
                    />

                    {/* Branch Node Point (Animated pop-in) */}
                    <FoldableBranchDot
                      className="absolute -left-1 top-2.5 size-2 rounded-full bg-accent/90 shadow-sm"
                      delayMs={mIdx * 60 + 90}
                    />

                    {/* Month Tag */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-[11px] font-mono font-bold text-accent tracking-wider uppercase mb-3">
                      <span>{monthGroup.month}</span>
                      <span className="text-muted/60">/ {yearGroup.year}</span>
                    </div>

                    {/* Events List on this Branch */}
                    <div className="space-y-4">
                      {monthGroup.items.map((item, itemIdx) => (
                        <FoldableItem
                          key={`${item.organization}-${item.role}-${item.year}`}
                          index={itemIdx}
                        >
                          <div
                            className="rounded-xl border border-border bg-surface p-4 sm:p-5 hover:border-border-strong transition-colors duration-200"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                              <h4 className="text-base sm:text-lg font-bold text-text leading-snug">
                                {item.role}
                              </h4>
                              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                <span className="text-xs font-mono text-accent font-medium">
                                  {item.period}
                                </span>
                                {item.period.includes("Nov 2025") || item.role.includes("Wisuda") ? (
                                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                    1-Year Contract
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm font-medium text-muted mt-1">
                              {item.organization}
                            </p>

                            <div className="w-full h-px bg-border/60 my-3.5" />

                            <ul className="space-y-2 text-xs sm:text-sm text-text/80 leading-relaxed">
                              {item.points.map((point) => (
                                <li key={point} className="flex items-start gap-2.5">
                                  <span aria-hidden="true" className="text-accent shrink-0 mt-0.5 text-xs select-none">▸</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </FoldableItem>
                      ))}
                    </div>
                  </FoldableItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subsection 2: Competitions and Awards */}
      {profile.achievements && profile.achievements.length > 0 ? (
        <div className="mt-12">
          {/* Preserves deep link & test target */}
          <span id="competitions" className="sr-only" />

          <h3 className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-accent mb-4 uppercase tracking-wider font-mono">
            <span aria-hidden="true" className="text-accent text-base select-none shrink-0 font-bold">▸</span>
            <span>Competitions and Awards</span>
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
