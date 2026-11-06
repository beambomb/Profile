import Link from "next/link";
import type { Project } from "@content";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon, GithubIcon } from "@/components/ui/Icons";
import { Tag, TagList } from "@/components/ui/Tag";

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section
        aria-labelledby={id}
        className="pixel-frame rounded-lg border border-border bg-surface p-6 sm:p-8 mb-6"
      >
        <h2 id={id} className="font-pixel text-sm sm:text-base font-bold tracking-wide text-text">
          {title}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-text">{children}</div>
      </section>
    </Reveal>
  );
}

type Neighbor = { slug: string; title: string };

export function CaseStudy({ project, prev, next }: { project: Project; prev: Neighbor; next: Neighbor }) {
  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-28 pt-4 sm:pt-6 lg:px-10">
      {/* Back button */}
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
      >
        <ArrowLeftIcon className="size-4" /> All projects
      </Link>

      {/* Header (No eyebrow labels, game retro font for title) */}
      <header className="mt-4">
        <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-text leading-relaxed">
          {project.title}
        </h1>

        {/* Metadata row: Award, Domain & Period */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {project.award ? (
            <span className="inline-flex items-center rounded-sm border border-cta/50 bg-cta/15 px-3 py-1 text-xs font-semibold text-gold shadow-sm">
              {project.award}
            </span>
          ) : null}
          <span className="inline-flex items-center rounded-sm border border-border-strong bg-surface-2 px-2.5 py-1 text-xs font-semibold text-accent">
            {project.domain}
          </span>
          <span className="inline-flex items-center rounded-sm border border-border-strong bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
            {project.period}
          </span>
        </div>

        {/* One-liner summary */}
        <p className="mt-5 max-w-3xl text-base sm:text-lg text-muted leading-relaxed">{project.oneLiner}</p>

        {/* Technologies */}
        <div className="mt-5">
          <TagList label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag tone="accent">{tag}</Tag>
              </li>
            ))}
          </TagList>
        </div>
      </header>

      {/* Content blocks: Problem, Solution, Result, Role */}
      <div className="mt-10">
        <Block id="problem" title="The problem">
          {project.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Block>

        <Block id="solution" title="What I built">
          {project.solution.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="mt-6 pt-5 border-t border-border space-y-4">
              <div
                className={`grid gap-4 ${
                  project.screenshots.length > 2 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {project.screenshots.map((ss) => (
                  <div key={ss.src} className="overflow-hidden rounded-lg border border-border-strong bg-surface-2 p-1.5">
                    <img
                      src={ss.src}
                      alt={ss.alt}
                      className="w-full h-auto object-contain rounded border border-border/50"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Block>

        <Block id="result" title="The result">
          <ul className="list-disc space-y-2 pl-5">
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Block>

        <Block id="role" title="My role">
          <p>{project.role}</p>
        </Block>
      </div>

      {/* Technical details block */}
      <Reveal>
        <section aria-labelledby="technical" className="pixel-frame rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h2 id="technical" className="font-pixel text-sm sm:text-base font-bold tracking-wide text-text">
            Technical details
          </h2>

          <h3 className="mt-8 font-pixel text-xs tracking-wider text-accent uppercase">
            Tech stack
          </h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.stack.map((group) => (
              <div key={group.label} className="bg-surface-2/60 border border-border p-3.5 rounded-md">
                <dt className="font-medium text-text text-sm">{group.label}</dt>
                <dd className="mt-2">
                  <TagList label={`${group.label} technologies`}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </TagList>
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-10 font-pixel text-xs tracking-wider text-accent uppercase">
            Architecture
          </h3>
          <div className="mt-4">
            <ArchitectureDiagram architecture={project.architecture} />
          </div>

          <h3 className="mt-10 font-pixel text-xs tracking-wider text-accent uppercase">
            Key decisions
          </h3>
          <ul className="mt-4 space-y-3">
            {project.decisions.map((d) => (
              <li key={d.title} className="bg-surface-2/60 border border-border p-4 rounded-md">
                <p className="font-semibold text-text">{d.title}</p>
                <p className="mt-1 text-sm text-muted">{d.why}</p>
              </li>
            ))}
          </ul>

          {project.limitations.length > 0 ? (
            <>
              <h3 className="mt-10 font-pixel text-xs tracking-wider text-accent uppercase">
                Limitations
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                {project.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-8">
            <Button href={project.repoUrl} variant="secondary">
              <GithubIcon /> View source on GitHub <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>
        </section>
      </Reveal>

      {/* Neighbor Project Navigation */}
      <nav aria-label="More projects" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-full min-w-0">
        <Link
          href={`/projects/${prev.slug}`}
          className="pixel-frame flex min-h-11 min-w-0 max-w-full flex-col rounded-md bg-surface p-4 sm:p-5 hover:border-accent transition-all overflow-hidden"
        >
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <ArrowLeftIcon className="size-3.5 shrink-0" /> Previous project
          </span>
          <span className="mt-2 font-pixel text-[11px] sm:text-xs font-bold text-text leading-snug break-words line-clamp-2">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="pixel-frame flex min-h-11 min-w-0 max-w-full flex-col rounded-md bg-surface p-4 sm:p-5 sm:items-end sm:text-right hover:border-accent transition-all overflow-hidden"
        >
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            Next project <ArrowRightIcon className="size-3.5 shrink-0" />
          </span>
          <span className="mt-2 font-pixel text-[11px] sm:text-xs font-bold text-text leading-snug break-words line-clamp-2">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
