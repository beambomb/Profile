import type { Project } from "@content";

/**
 * Architecture shown as an ordered list: it is the diagram and its own text
 * alternative. Steps stack vertically on small screens and flow in a row from lg up.
 */
export function ArchitectureDiagram({ architecture }: { architecture: Project["architecture"] }) {
  const last = architecture.steps.length - 1;

  return (
    <figure>
      <ol
        aria-label="Architecture, in order"
        className="grid gap-3 lg:auto-cols-fr lg:grid-flow-col lg:items-stretch"
      >
        {architecture.steps.map((step, i) => (
          <li key={step.label} className="relative flex flex-col">
            <div className="flex h-full flex-col rounded-md border border-border bg-surface-2 p-4">
              <span aria-hidden="true" className="font-pixel text-[10px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 font-mono text-base font-semibold">{step.label}</span>
              <span className="mt-1 text-sm text-muted">{step.detail}</span>
            </div>
            {i < last ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-accent lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-muted">{architecture.summary}</figcaption>
    </figure>
  );
}
