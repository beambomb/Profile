"use client";

import { cv, socials } from "@content";
import { useLanguage } from "@/lib/languageContext";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";

function handle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Contact() {
  const { lang } = useLanguage();

  return (
    <section id="contact" className="py-12 sm:py-16 pb-28">
      {/* Eyebrow */}
      <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
        {lang === "EN" ? "CONTACT" : "KONTAK"}
      </p>

      {/* Cursive Handwriting Annotation */}
      <div className="mb-1">
        <span className="font-handwriting text-2xl sm:text-3xl text-blue-500 font-bold -rotate-1 inline-block">
          {lang === "EN" ? "let's build together!" : "mari berkarya bersama!"}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
        {lang === "EN" ? "Get in Touch" : "Hubungi Saya"}
      </h2>

      <p className="text-sm sm:text-base text-neutral-300 max-w-xl mb-8">
        {lang === "EN"
          ? "Ready to work on your next project? Let's connect and build something together."
          : "Siap mewujudkan proyek berikutnya? Mari terhubung dan bangun solusi bersama."}
      </p>

      {/* Contact Channels Card */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8 hover:border-neutral-700/80 transition-all">
        <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-6">
          {lang === "EN" ? "CONTACT CHANNELS" : "SALURAN KONTAK"}
        </p>

        <div className="divide-y divide-neutral-900 space-y-4">
          {/* Email Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 first:pt-0">
            <div className="flex items-center gap-3">
              <MailIcon className="size-5 text-neutral-400 shrink-0" />
              <span className="text-sm font-medium text-white">Email</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${socials.email}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-blue-400 transition-colors font-mono"
              >
                <span>{socials.email}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-neutral-400" />
              </a>
              <CopyButton text={socials.email} label="Copy email" />
            </div>
          </div>

          {/* LinkedIn Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3">
              <LinkedinIcon className="size-5 text-neutral-400 shrink-0" />
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-blue-400 transition-colors font-mono"
              >
                <span>{handle(socials.linkedin)}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* GitHub Channel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3">
              <GithubIcon className="size-5 text-neutral-400 shrink-0" />
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
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
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-blue-400 transition-colors font-mono"
              >
                <span>{handle(socials.github)}</span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {cv.published ? (
        <div className="mt-8">
          <a
            href={cv.path}
            download={cv.fileName}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95"
          >
            <DownloadIcon className="size-4" /> Download CV
          </a>
        </div>
      ) : null}
    </section>
  );
}
