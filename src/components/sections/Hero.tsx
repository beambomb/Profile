"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cv, profile, socials } from "@content";
import {
  ArrowRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { LanyardBadge } from "@/components/ui/LanyardBadge";

function useTypewriter(word = "Bimo") {
  // Start with full word so heading is never blank on mount or SSR
  const [text, setText] = useState(word);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(word);
      return;
    }

    let timer: NodeJS.Timeout;

    if (!isDeleting && text === word) {
      // Pause at full word for 4s before retyping
      timer = setTimeout(() => setIsDeleting(true), 4000);
    } else if (isDeleting && text === "") {
      // Short pause when erased then type in immediately
      timer = setTimeout(() => setIsDeleting(false), 300);
    } else {
      const speed = isDeleting ? 75 : 130;
      timer = setTimeout(() => {
        setText((curr) =>
          isDeleting ? word.slice(0, curr.length - 1) : word.slice(0, curr.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, word]);

  return text;
}

export function Hero() {
  const displayedName = useTypewriter("Bimo");

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#projects");
    }
  };

  return (
    <section id="profile" className="relative scroll-mt-20 pt-6 pb-14 sm:pb-20 border-b border-border">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Accessible screen-reader tagline and about data to preserve SEO & test contracts */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Hero Layout: Expansive, commanding left column balanced with hanging lanyard badge */}
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
        {/* Left Column: Bold Typography & Prominent Scale (Sub-name removed as requested) */}
        <div className="flex-1 min-w-0">
          <h1
            id="hero-title"
            className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight sm:leading-snug"
          >
            <span className="sr-only">Hi, I&apos;m {profile.name}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-[1ch]">
              <span>Hi, I&apos;m</span>
              <span className="relative inline-grid grid-cols-1 grid-rows-1 text-accent border-b-4 sm:border-b-8 border-accent pb-1 sm:pb-2">
                {/* Invisible ghost reserves width so underline never jumps */}
                <span className="invisible col-start-1 row-start-1 select-none">Bimo</span>
                <span className="col-start-1 row-start-1 inline-flex items-center">
                  <span>{displayedName}</span>
                  <span className="inline-block w-3 sm:w-4 h-[0.85em] bg-accent ml-1.5 align-baseline animate-pulse" />
                </span>
              </span>
            </span>
          </h1>

          {/* Broad, Rich Narrative */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl leading-relaxed text-muted max-w-2xl text-pretty font-normal">
            Information engineering student at Universitas Gadjah Mada, currently focused on software engineering and data engineering. Active in student tech communities as an organizer and mentor.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            {cv.published ? (
              <a
                href={cv.path}
                download={cv.fileName}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-cta text-on-cta font-semibold text-sm sm:text-base hover:bg-cta/90 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <DownloadIcon className="size-4 sm:size-5 shrink-0" />
                <span>Download CV</span>
              </a>
            ) : null}

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-surface border border-border-strong text-text font-medium text-sm sm:text-base hover:border-accent hover:text-accent transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <MailIcon className="size-4 sm:size-5 text-muted shrink-0" />
              <span>Contact</span>
            </Link>

            <Link
              href="/#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm sm:text-base text-muted hover:text-accent transition-colors font-medium group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Direct Social Links */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email Johannes"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <MailIcon className="size-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Elastic Interactive Hanging Lanyard Badge */}
        <div className="shrink-0 flex justify-center lg:justify-end">
          <LanyardBadge />
        </div>
      </div>
    </section>
  );
}