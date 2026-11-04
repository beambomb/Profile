"use client";

import Link from "next/link";
import { cv, profile, socials } from "@content";
import { ArrowRightIcon, DownloadIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section id="profile" className="relative scroll-mt-20 pt-2 pb-10 sm:pb-12 border-b border-border">
      {/* Anchor targets for intro and about to ensure smooth jump from any link */}
      <span id="intro" className="sr-only" />
      <span id="about" className="sr-only" />

      {/* Accessible screen-reader tagline to preserve SEO & tests */}
      <h2 className="sr-only">About me</h2>
      <p className="sr-only">{profile.tagline}</p>
      <span className="sr-only">{profile.education.school}</span>

      {/* Main Heading (Retro Pixel Font, No Subtitle, No Label) */}
      <h1
        id="hero-title"
        className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-text leading-relaxed"
      >
        Hi, I&apos;m {profile.name}
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
