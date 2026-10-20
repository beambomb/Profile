import { skills } from "@content";
import { Reveal } from "@/components/motion/Reveal";
import { FxCard } from "@/components/ui/FxCard";
import { Section } from "@/components/ui/Section";
import { Tag, TagList } from "@/components/ui/Tag";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      intro="Tools and technologies I have used in my projects, grouped by what they are for."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <li key={group.id}>
            <Reveal index={i % 3} className="h-full">
              <FxCard
                tilt={3}
                className="flex h-full flex-col rounded-md border border-border bg-surface p-7 hover:border-accent/60"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">{group.label}</h3>
                  <span className="shrink-0 font-mono text-sm text-accent">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 text-muted">{group.plain}</p>
                <div className="mt-6">
                  <TagList label={`${group.label} skills`}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </TagList>
                </div>
              </FxCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
