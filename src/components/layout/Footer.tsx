import { socials } from "@content";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";

export function Footer({ name }: { name: string }) {
  const iconLink =
    "inline-flex size-11 items-center justify-center rounded-md border border-border-strong text-muted transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {name}. Built with Next.js.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-mono text-sm text-muted hover:text-accent"
          >
            <ArrowRightIcon className="size-4 -rotate-90" /> Back to top
          </a>
          <ul className="flex gap-2">
            <li>
              <a href={socials.github} className={iconLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a href={socials.linkedin} className={iconLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon />
              </a>
            </li>
            <li>
              <a href={`mailto:${socials.email}`} className={iconLink} aria-label="Send an email">
                <MailIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
