"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cv, profile, socials } from "@content";
import {
  ArrowRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { LanyardBadge, LanyardFallback } from "@/components/ui/LanyardBadge";
import { FloatingPass3D } from "@/components/ui/FloatingPass3D";

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
  const badgeTargetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#projects");
    }
  };

  return (
    <section id="profile" className="relative scroll-mt-20 pt-0 pb-8 sm:pb-10 border-b border-border overflow-visible">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Desktop-only Full-width 3D Lanyard Canvas with Hanging Strap */}
      {mounted && isDesktop ? (
        <LanyardBadge targetRef={badgeTargetRef} />
      ) : null}

      {/* Accessible screen-reader tagline and about data to preserve SEO & test contracts */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Hero Layout: Centered vertical alignment between left narrative and right 3D badge */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 min-h-[480px] overflow-visible">
        {/* Left Column: Centered vertically */}
        <div className="flex-1 min-w-0 py-6 sm:py-8 flex flex-col justify-center">
          <h1
            id="hero-title"
            className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight sm:leading-snug"
          >
            <span className="sr-only">Hi, I&apos;m {profile.name}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-[1ch]">
              <span>Hi, I&apos;m</span>
              <span className="relative inline-grid grid-cols-1 grid-rows-1 text-accent border-b-4 sm:border-b-6 border-accent pb-1 sm:pb-1.5">
                {/* Invisible ghost reserves width so underline never jumps */}
                <span className="invisible col-start-1 row-start-1 select-none">Bimo</span>
                <span className="col-start-1 row-start-1 inline-flex items-center">
                  <span>{displayedName}</span>
                  <span className="inline-block w-2.5 sm:w-3.5 h-[0.85em] bg-accent ml-1.5 align-baseline animate-pulse" />
                </span>
              </span>
            </span>
          </h1>

          {/* Bio Narrative */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-[19px] leading-relaxed text-muted max-w-2xl text-pretty font-normal">
            Information engineering student at Universitas Gadjah Mada, currently focused on software engineering and data engineering. Active in student tech communities as an organizer and mentor.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            {cv.published ? (
              <a
                href={cv.path}
                download={cv.fileName}
                className="inline-flex items-center gap-2.5 px-5.5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-cta text-on-cta font-semibold text-sm sm:text-base hover:bg-cta/90 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <DownloadIcon className="size-4.5 shrink-0" />
                <span>Download CV</span>
              </a>
            ) : null}

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-5.5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-surface border border-border-strong text-text font-medium text-sm sm:text-base hover:border-accent hover:text-accent transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <MailIcon className="size-4.5 text-muted shrink-0" />
              <span>Contact</span>
            </Link>

            <Link
              href="/#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm sm:text-base text-muted hover:text-accent transition-colors font-medium group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Direct Social Links */}
          <div className="mt-6 sm:mt-7 flex items-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <GithubIcon className="size-[18px]" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <LinkedinIcon className="size-[18px]" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email Johannes"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
            >
              <MailIcon className="size-[18px]" />
            </a>
          </div>

          {/* Mobile Position: Floating 3D Pass */}
          {mounted && !isDesktop ? (
            <div className="mt-6 mb-2 flex justify-center">
              <FloatingPass3D />
            </div>
          ) : null}
        </div>

        {/* Right Column (Desktop only): Elastic Interactive Lanyard Badge target */}
        <div className="hidden lg:flex shrink-0 justify-end overflow-visible">
          <div
            ref={badgeTargetRef}
            className="relative flex flex-col items-center select-none pt-0 w-[340px] h-[480px] z-20 overflow-visible"
            aria-label="Interactive 3D Physics Lanyard Pass"
          >
            <LanyardFallback />
          </div>
        </div>
      </div>
    </section>
  );
}