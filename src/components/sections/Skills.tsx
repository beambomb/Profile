"use client";

import { skills } from "@content";
import { Tag, TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Technical Skills
      </h2>

      {/* Editorial Ledger Layout: No cards, no bento grid */}
      <div className="divide-y divide-border border-y border-border">
        {skills.map((group) => (
          <div
            key={group.id}
            className="py-4 sm:py-5 flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 group hover:bg-surface/40 -mx-3 px-3 rounded transition-colors"
          >
            <div className="md:w-64 shrink-0">
              <h3 className="text-sm sm:text-base font-bold text-text group-hover:text-accent transition-colors">
                {group.label}
              </h3>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">{group.plain}</p>
            </div>

            <div className="flex-1">
              <TagList label={`${group.label} skills`}>
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </TagList>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}