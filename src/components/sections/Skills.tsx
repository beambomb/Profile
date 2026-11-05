"use client";

import { skills } from "@content";
import { Tag, TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-8 sm:py-10 border-b border-border">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-6">
        Technical Skills
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.id}
            className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5 sm:p-6 pixel-frame transition-all"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-text">{group.label}</h3>
                <span className="shrink-0 font-pixel text-[10px] text-accent">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">{group.plain}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
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
