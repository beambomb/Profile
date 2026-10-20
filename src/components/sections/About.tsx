import { profile } from "@content";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { FxCard } from "@/components/ui/FxCard";
import { Section } from "@/components/ui/Section";
import { Tag, TagList } from "@/components/ui/Tag";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FxCard tilt={0} className="h-full rounded-md border border-border bg-surface p-7 hover:border-accent/60 sm:p-8">
      <h3 className="font-mono text-sm uppercase tracking-wider text-accent">{title}</h3>
      <div className="mt-5">{children}</div>
    </FxCard>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="Profile" title="About me">
      {/* Row 1: story + numbers */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="h-full rounded-md border border-border bg-surface p-7 sm:p-10">
            <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
              {profile.bio.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? "text-text" : "text-muted"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-6 lg:col-span-5">
          {profile.stats.map((stat, i) => (
            <li key={stat.label}>
              <Reveal index={i} className="h-full">
                <FxCard tilt={0} className="flex h-full flex-col justify-between rounded-md border border-border bg-surface p-6 hover:border-accent/60">
                  <p className="font-mono text-4xl font-bold text-accent sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-4 text-sm leading-snug text-muted sm:text-base">{stat.label}</p>
                </FxCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Row 2: tall experience column beside stacked education + achievements */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal className="lg:row-span-2">
          <Panel title="Community & experience">
            <ul className="space-y-7">
              {profile.experience.map((item) => (
                <li key={item.organization} className="border-l-2 border-border pl-5">
                  <p className="text-lg font-semibold">{item.organization}</p>
                  <p className="mt-1 text-muted">{item.role}</p>
                  <p className="mt-1 font-mono text-sm text-accent">{item.period}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal index={1}>
          <Panel title="Education">
            <p className="text-lg font-semibold">{profile.education.school}</p>
            <p className="mt-1 text-muted">{profile.education.degree}</p>
            <p className="mt-1 font-mono text-sm text-accent">{profile.education.years}</p>
            {profile.interests.length > 0 ? (
              <div className="mt-6 space-y-4 border-t border-border pt-5">
                {profile.interests.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-sm text-muted">{group.label}</p>
                    <TagList label={group.label}>
                      {group.items.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </TagList>
                  </div>
                ))}
              </div>
            ) : null}
          </Panel>
        </Reveal>

        <Reveal index={2}>
          <Panel title="Achievements">
            <ul className="space-y-6">
              {profile.achievements.map((item) => (
                <li key={item.title} className="border-l-2 border-cta/60 pl-5">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="mt-1 text-muted">{item.detail}</p>
                  <p className="mt-1 font-mono text-sm text-accent">{item.date}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
