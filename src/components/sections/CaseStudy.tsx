import Link from "next/link";
import type { Project } from "@content";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon, GithubIcon } from "@/components/ui/Icons";
import { Tag, TagList } from "@/components/ui/Tag";

function Block({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section aria-labelledby={id} className="border-t border-border py-10">
        <p aria-hidden="true" className="font-pixel text-[10px] uppercase tracking-widest text-accent">
          {label}
        </p>
        <h2 id={id} className="mt-3 text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-lg">{children}</div>
      </section>
    </Reveal>
  );
}

type Neighbor = { slug: string; title: string };

export function CaseStudy({ project, prev, next }: { project: Project; prev: Neighbor; next: Neighbor }) {
  return (
    <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10 sm:pt-16 lg:px-10">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted hover:text-accent"
      >
        <ArrowLeftIcon className="size-4" /> All projects
      </Link>

      <header className="mt-6">
        <p className="flex flex-wrap gap-x-3 font-mono text-sm text-muted">
          <span className="text-accent">{project.domain}</span>
          <span aria-hidden="true">/</span>
          <span>{project.period}</span>
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        {project.award ? (
          <p className="mt-4 inline-block rounded-sm border border-cta/50 bg-cta/10 px-3 py-1.5 text-cta">
            {project.award}
          </p>
        ) : null}
        <p className="mt-5 max-w-3xl text-xl text-muted">{project.oneLiner}</p>
        <div className="mt-6">
          <TagList label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag tone="accent">{tag}</Tag>
              </li>
            ))}
          </TagList>
        </div>
      </header>

      <div className="mt-10">
        <Block id="problem" label="Level 1" title="The problem">
          {project.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Block>
        <Block id="solution" label="Level 2" title="What I built">
          {project.solution.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Block>
        <Block id="result" label="Level 3" title="The result">
          <ul className="list-disc space-y-2 pl-5">
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Block>
        <Block id="role" label="Player" title="My role">
          <p>{project.role}</p>
        </Block>
      </div>

      <Reveal>
        <section aria-labelledby="technical" className="mt-4 rounded-md border border-border bg-surface p-6 sm:p-8">
          <p aria-hidden="true" className="font-pixel text-[10px] uppercase tracking-widest text-accent">
            For engineers
          </p>
          <h2 id="technical" className="mt-3 text-2xl font-bold tracking-tight">
            Technical details
          </h2>

          <h3 className="mt-8 font-mono text-sm uppercase tracking-wider text-accent">Tech stack</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.stack.map((group) => (
              <div key={group.label}>
                <dt className="text-muted">{group.label}</dt>
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

          <h3 className="mt-10 font-mono text-sm uppercase tracking-wider text-accent">Architecture</h3>
          <div className="mt-4">
            <ArchitectureDiagram architecture={project.architecture} />
          </div>

          <h3 className="mt-10 font-mono text-sm uppercase tracking-wider text-accent">Key decisions</h3>
          <ul className="mt-4 space-y-4">
            {project.decisions.map((d) => (
              <li key={d.title}>
                <p className="font-semibold">{d.title}</p>
                <p className="mt-1 text-muted">{d.why}</p>
              </li>
            ))}
          </ul>

          {project.limitations.length > 0 ? (
            <>
              <h3 className="mt-10 font-mono text-sm uppercase tracking-wider text-accent">Limitations</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {project.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-10">
            <Button href={project.repoUrl} variant="secondary">
              <GithubIcon /> View source on GitHub <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>
        </section>
      </Reveal>

      <nav aria-label="More projects" className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="pixel-frame flex min-h-11 flex-col rounded-md bg-surface p-5"
        >
          <span className="flex items-center gap-2 font-mono text-sm text-muted">
            <ArrowLeftIcon className="size-4" /> Previous project
          </span>
          <span className="mt-1 text-lg font-semibold">{prev.title}</span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="pixel-frame flex min-h-11 flex-col rounded-md bg-surface p-5 sm:items-end sm:text-right"
        >
          <span className="flex items-center gap-2 font-mono text-sm text-muted">
            Next project <ArrowRightIcon className="size-4" />
          </span>
          <span className="mt-1 text-lg font-semibold">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
