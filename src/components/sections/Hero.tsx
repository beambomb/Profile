"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cv, profile, socials } from "@content";
import {
  ArrowRightIcon,
  AwardIcon,
  BriefcaseIcon,
  DownloadIcon,
  GithubIcon,
  GraduationCapIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
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
    <section id="profile" className="relative scroll-mt-20 pt-2 pb-10 sm:pb-14 border-b border-border">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Accessible screen-reader tagline and about data to preserve SEO & test contracts */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Top Identity Header: Profile Avatar, Academic Tag, and Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div className="flex items-center gap-4">
          <div className="relative size-16 sm:size-20 shrink-0 rounded-2xl overflow-hidden border border-border-strong bg-surface p-0.5 shadow-md transition-all duration-300 hover:scale-105 hover:border-white/40">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={80}
              height={80}
              className="size-full object-cover rounded-[14px]"
              priority
            />
          </div>

          <div>
            <p className="text-base sm:text-lg font-bold text-text tracking-tight">
              {profile.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1 font-medium text-text">
                <GraduationCapIcon className="size-3.5 text-accent shrink-0" />
                <span>Universitas Gadjah Mada &apos;28</span>
              </span>
              <span className="text-border-strong hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="size-3.5 text-muted shrink-0" />
                <span>Yogyakarta, Indonesia</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-xs text-text font-medium self-start sm:self-center shadow-sm transition-colors duration-200 hover:border-white/30">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>Available for opportunities</span>
        </div>
      </div>

      {/* Main Headline (Retro Pixel Font, Animated Underline) */}
      <div className="pt-6 sm:pt-8">
        <h1
          id="hero-title"
          className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-text leading-relaxed"
        >
          <span className="sr-only">Hi, I&apos;m {profile.name}</span>
          <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-[1ch]">
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
      </div>

      {/* Information-Dense Highlights (Zero fluff, clean micro-cards) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-border bg-surface flex items-start gap-3 transition-colors duration-200 hover:border-border-strong hover:bg-surface-2/40">
          <div className="size-8 rounded-lg bg-surface-2 border border-border-strong flex items-center justify-center shrink-0">
            <GraduationCapIcon className="size-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider">Education</p>
            <p className="text-xs font-semibold text-text mt-0.5 truncate">UGM Information Eng.</p>
            <p className="text-[11px] text-muted">Class of 2024 – 2028</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-surface flex items-start gap-3 transition-colors duration-200 hover:border-border-strong hover:bg-surface-2/40">
          <div className="size-8 rounded-lg bg-surface-2 border border-border-strong flex items-center justify-center shrink-0">
            <BriefcaseIcon className="size-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider">Core Focus</p>
            <p className="text-xs font-semibold text-text mt-0.5 truncate">Software & Data Eng.</p>
            <p className="text-[11px] text-muted">Distributed pipelines & web</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-surface flex items-start gap-3 transition-colors duration-200 hover:border-border-strong hover:bg-surface-2/40">
          <div className="size-8 rounded-lg bg-surface-2 border border-border-strong flex items-center justify-center shrink-0">
            <AwardIcon className="size-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-muted font-medium uppercase tracking-wider">Community</p>
            <p className="text-xs font-semibold text-text mt-0.5 truncate">KMTETI & Night Login</p>
            <p className="text-[11px] text-muted">Workshop & mentor lead</p>
          </div>
        </div>
      </div>

      {/* Action Buttons & Social Channels */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
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
            aria-label="Send Email"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface text-muted hover:text-text hover:border-accent transition-all duration-200 active:scale-95"
          >
            <MailIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}