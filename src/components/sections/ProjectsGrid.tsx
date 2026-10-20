"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type { Project, ProjectDomain } from "@content";
import { Reveal } from "@/components/motion/Reveal";
import { FxCard } from "@/components/ui/FxCard";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Tag, TagList } from "@/components/ui/Tag";

type Filter = "All" | ProjectDomain;

export function ProjectsGrid({ projects, domains }: { projects: Project[]; domains: ProjectDomain[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  // Re-play the entrance only after the visitor has used a filter.
  const [touched, setTouched] = useState(false);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.domain === filter)),
    [filter, projects],
  );

  const filters: Filter[] = ["All", ...domains];
  const featuredFirst = filter === "All" && projects.length >= 4;

  return (
    <div>
      <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-3">
        {filters.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(name);
                setTouched(true);
              }}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-md border px-5 font-mono text-sm transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 ${
                active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-sm text-muted" role="status" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => {
          const featured = featuredFirst && i === 0;
          return (
            <li
              key={`${filter}-${project.slug}`}
              className={`${featured ? "lg:col-span-2" : ""} ${touched ? "rise" : ""}`.trim()}
              style={{ "--i": i } as CSSProperties}
            >
              <Reveal index={touched ? 0 : i % 3} className="h-full">
                <FxCard
                  as="article"
                  tilt={3}
                  className="pixel-frame group flex h-full flex-col bg-surface p-7 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted">
                    <span className="text-accent">{project.domain}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.period}</span>
                  </div>

                  <h3 className={`mt-4 font-semibold ${featured ? "text-3xl" : "text-2xl"}`}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {project.award ? (
                    <p className="mt-3 inline-block self-start rounded-sm border border-cta/50 bg-cta/10 px-2.5 py-1 text-sm text-cta">
                      {project.award}
                    </p>
                  ) : null}

                  <p className={`mt-4 text-muted ${featured ? "text-lg" : ""}`}>{project.oneLiner}</p>

                  {featured ? (
                    <p className="mt-4 border-l-2 border-accent/60 pl-4 text-text">{project.results[0]}</p>
                  ) : null}

                  <div className="mt-5">
                    <TagList label={`${project.title} technologies`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </TagList>
                  </div>

                  <p className="mt-auto flex items-center gap-2 pt-8 font-mono text-sm text-accent">
                    Read case study
                    <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </p>
                </FxCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
