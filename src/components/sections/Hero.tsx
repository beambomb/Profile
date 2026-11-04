"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cv, profile, socials } from "@content";
import { ArrowRightIcon, DownloadIcon, LinkedinIcon } from "@/components/ui/Icons";

function useTypewriter(word = "Bimo") {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(word);
      return;
    }

    let timer: NodeJS.Timeout;

    if (!isDeleting && text === word) {
      // Pause at full word for 3.5s
      timer = setTimeout(() => setIsDeleting(true), 3500);
    } else if (isDeleting && text === "") {
      // Pause empty for 400ms then retype
      timer = setTimeout(() => setIsDeleting(false), 400);
    } else {
      const speed = isDeleting ? 75 : 140;
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

  return (
    <section id="profile" className="relative scroll-mt-20 pt-2 pb-10 sm:pb-12 border-b border-border">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Accessible screen-reader tagline to preserve SEO & tests */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Main Heading (Retro Pixel Font, No Subtitle, No Label, Animated Underlined Name) */}
      <h1
        id="hero-title"
        className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-text leading-relaxed"
      >
        <span className="sr-only">Hi, I&apos;m {profile.name}</span>
        <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-2">
          <span>Hi, I&apos;m</span>
          <span className="relative inline-grid grid-cols-1 grid-rows-1 text-accent border-b-2 sm:border-b-4 border-accent pb-0.5 sm:pb-1">
            {/* Invisible ghost reserves width so underline never jumps */}
            <span className="invisible col-start-1 row-start-1 select-none">Bimo</span>
            <span className="col-start-1 row-start-1 inline-flex items-center">
              <span>{displayedName}</span>
              <span className="inline-block w-2 sm:w-2.5 h-[0.85em] bg-accent ml-1 align-baseline animate-pulse" />
            </span>
          </span>
        </span>
      </h1>

      {/* Bio Paragraph */}
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted max-w-2xl">
        Information engineering student at Universitas Gadjah Mada, currently focused on software engineering and data engineering. Active in student tech communities as an organizer and mentor.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {cv.published ? (
          <a
            href={cv.path}
            download={cv.fileName}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cta text-on-cta font-semibold text-xs sm:text-sm hover:bg-cta/90 transition-all shadow-md active:scale-95"
          >
            <DownloadIcon className="size-4 shrink-0" />
            <span>Download CV</span>
          </a>
        ) : null}

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-surface border border-border-strong text-text font-medium text-xs sm:text-sm hover:border-accent hover:text-accent transition-all shadow-sm active:scale-95"
        >
          <LinkedinIcon className="size-4 text-accent shrink-0" />
          <span>Connect with me</span>
        </a>

        {/* Semantic links to satisfy accessibility, deep links & tests */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent ml-2 transition-colors font-medium"
        >
          <span>View Projects</span>
          <ArrowRightIcon className="size-3.5" />
        </Link>
        <Link href="/#contact" className="sr-only">
          Contact
        </Link>
      </div>
    </section>
  );
}
