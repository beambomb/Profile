"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectDomain } from "@content";
import { ArrowRightIcon, ExternalLinkIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { Tag, TagList } from "@/components/ui/Tag";

type Filter = "All" | ProjectDomain;

export function ProjectsGrid({ projects, domains }: { projects: Project[]; domains: ProjectDomain[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({});

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.domain === filter)),
    [filter, projects],
  );

  const filters: Filter[] = ["All", ...domains];

  const toggleExpand = (slug: string) => {
    setExpandedSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div>
      {/* Category Filter Pills */}
      <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2.5 mb-6">
        {filters.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(name)}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-150 ${
                active
                  ? "border-2 border-accent bg-accent/15 text-accent shadow-sm"
                  : "border border-border-strong bg-surface text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Accessible Status */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} of {projects.length}
      </p>

      {/* Projects Accordion Rows */}
      <div className="divide-y divide-border border-t border-b border-border">
        {visible.map((project, i) => {
          const indexNum = String(i + 1).padStart(2, "0");
          const isExpanded = Boolean(expandedSlugs[project.slug]);

          return (
            <article
              key={project.slug}
              className="group py-4 sm:py-5 transition-colors duration-150 hover:bg-surface-2/40 -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-lg"
            >
              {/* Row Header (Number, Title, Domain, Year, Expand Button) */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                  <span className="font-pixel text-[10px] text-accent shrink-0 select-none">
                    {indexNum}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-accent transition-colors">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:underline focus-visible:outline-accent"
                      >
                        {project.title}
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span className="hidden md:inline-block text-xs sm:text-sm text-muted truncate max-w-[220px]">
                    {project.oneLiner}
                  </span>
                  <span className="text-xs text-muted font-medium shrink-0">
                    {project.period.split(" ").pop()}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleExpand(project.slug)}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle details for ${project.title}`}
                    className="size-8 rounded-md border border-border-strong bg-surface flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all cursor-pointer active:scale-90"
                  >
                    {isExpanded ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Details Container */}
              {isExpanded ? (
                <div className="mt-4 pt-4 border-t border-border pl-6 sm:pl-9 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  {project.award ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cta/15 border border-cta/40 text-gold text-xs font-semibold">
                      <span>🏆 {project.award}</span>
                    </div>
                  ) : null}

                  <p className="text-sm text-text leading-relaxed max-w-2xl">
                    {project.oneLiner}
                  </p>

                  {/* Problem & Solution Snapshot */}
                  <div className="grid gap-3 sm:grid-cols-2 text-xs text-muted max-w-3xl bg-surface-2 border border-border p-3.5 rounded-md">
                    <div>
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Problem</p>
                      <p className="text-text">{project.problem[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-text">{project.solution[0]}</p>
                    </div>
                  </div>

                  {/* Technologies tag list */}
                  <div>
                    <TagList label={`${project.title} technologies`}>
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagList>
                  </div>

                  {/* Action links */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-accent hover:underline transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                    >
                      <span>Source Code</span>
                      <ExternalLinkIcon className="size-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Hidden tech list when collapsed to preserve assistive tech testing */
                <div className="sr-only">
                  <TagList label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
