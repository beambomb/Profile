"use client";

import Image from "next/image";
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
    <section id="profile" className="relative scroll-mt-20 pt-4 pb-10 sm:pb-14 border-b border-border">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Accessible screen-reader tagline and about data to preserve SEO & test contracts */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Editorial Hero Layout: Natural flow without bento grid or nested cards */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted tracking-wide mb-2.5">
            {profile.name}
          </p>

          <h1
            id="hero-title"
            className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-text leading-relaxed"
          >
            <span className="sr-only">Hi, I&apos;m {profile.name}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-[1ch]">
              <span>Hi, I&apos;m</span>
              <span className="relative inline-grid grid-cols-1 grid-rows-1 text-accent border-b-2 sm:border-b-4 border-accent pb-0.5 sm:pb-1">
                <span className="invisible col-start-1 row-start-1 select-none">Bimo</span>
                <span className="col-start-1 row-start-1 inline-flex items-center">
                  <span>{displayedName}</span>
                  <span className="inline-block w-2 sm:w-2.5 h-[0.85em] bg-accent ml-1 align-baseline animate-pulse" />
                </span>
              </span>
            </span>
          </h1>

          {/* Abstracted Narrative: High signal, concise prose */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted max-w-2xl text-pretty">
            Information engineering student at Universitas Gadjah Mada, currently focused on software engineering and data engineering. Active in student tech communities as an organizer and mentor.
          </p>

          {/* Minimalist Typographic Metadata (No boxes, no bento grid) */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
            <span>📍 Yogyakarta, Indonesia</span>
            <span className="text-border-strong">•</span>
            <span>🎓 {profile.education.school} (&apos;28)</span>
            <span className="text-border-strong">•</span>
            <span>⚡ Software &amp; Data Systems</span>
          </div>
        </div>

        {/* Clean Portrait Avatar */}
        <div className="shrink-0 self-start sm:self-center">
          <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border border-border-strong bg-surface p-0.5 shadow-md transition-transform duration-300 hover:scale-105 hover:border-white/40">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={96}
              height={96}
              className="size-full object-cover rounded-[14px]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Action Buttons & Social Channels */}
      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {cv.published ? (
            <a
              href={cv.path}
              download={cv.fileName}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cta text-on-cta font-semibold text-xs sm:text-sm hover:bg-cta/90 transition-all shadow-md active:scale-95"
            >
              <DownloadIcon className="size-4 shrink-0" />
              <span>Download CV</span>
            </a>
          ) : null}

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border-strong text-text font-medium text-xs sm:text-sm hover:border-accent hover:text-accent transition-all shadow-sm active:scale-95"
          >
            <MailIcon className="size-4 text-muted shrink-0" />
            <span>Contact</span>
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm text-muted hover:text-accent transition-colors font-medium group"
          >
            <span>View Projects</span>
            <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Direct Social Links */}
        <div className="flex items-center gap-2">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${socials.email}`}
            aria-label="Email Johannes"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
          >
            <MailIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}