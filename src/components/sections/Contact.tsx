"use client";

import { cv, socials } from "@content";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";

function handle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-8 sm:py-10 pb-16">
      {/* Title (Retro Pixel Font, No Label, No Subtitle) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-3">
        Get in touch
      </h2>

      <p className="text-sm sm:text-base text-muted max-w-xl mb-6">
        Email is the quickest way to reach me. You can also connect via LinkedIn and explore my code on GitHub.
      </p>

      {/* Contact Channels Card */}
      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 pixel-frame transition-all">
        <div className="divide-y divide-border space-y-4">
          {/* Email Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 first:pt-0">
            <div className="flex items-center gap-3">
              <MailIcon className="size-5 text-accent shrink-0" />
              <span className="text-sm font-semibold text-text">Email</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${socials.email}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-text hover:text-accent transition-colors font-medium"
              >
                <span>{socials.email}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-muted" />
              </a>
              <CopyButton text={socials.email} label="Copy email" />
            </div>
          </div>

          {/* LinkedIn Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3">
              <LinkedinIcon className="size-5 text-accent shrink-0" />
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-text hover:text-accent transition-colors"
              >
                LinkedIn <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-text hover:text-accent transition-colors font-medium"
              >
                <span>{handle(socials.linkedin)}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-muted" />
              </a>
            </div>
          </div>

          {/* GitHub Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3">
              <GithubIcon className="size-5 text-accent shrink-0" />
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-text hover:text-accent transition-colors"
              >
                GitHub <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-text hover:text-accent transition-colors font-medium"
              >
                <span>{handle(socials.github)}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-muted" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
