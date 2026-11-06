"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project, ProjectDomain, ProjectScreenshot } from "@content";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  ExternalLinkIcon,
} from "@/components/ui/Icons";
import { Tag, TagList } from "@/components/ui/Tag";

export function ProjectsGrid({
  projects,
  domains: _domains,
}: {
  projects: Project[];
  domains?: ProjectDomain[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<ProjectScreenshot | null>(null);

  const visible = projects;

  // Safe slide navigation with cycling
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? visible.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === visible.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation when user interacts with carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const openPreview = (ss: ProjectScreenshot) => {
    setActiveScreenshot(ss);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const closePreview = () => {
    dialogRef.current?.close();
    setActiveScreenshot(null);
  };

  const currentProject = visible[currentIndex] || visible[0];

  const renderScreenshot = (project: Project, className = "") => {
    const primaryScreenshot = project.screenshots?.[0];
    if (!primaryScreenshot) {
      return (
        <div className={`rounded-xl border border-dashed border-border-strong p-8 text-center text-muted text-xs font-mono ${className}`}>
          No preview screenshot available
        </div>
      );
    }

    return (
      <div className={`relative group/ss ${className}`}>
        <button
          type="button"
          onClick={() => openPreview(primaryScreenshot)}
          className="w-full text-left rounded-xl overflow-hidden border border-border-strong bg-[#030303] p-1.5 transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 cursor-pointer block focus-visible:outline-accent active:scale-[0.99]"
          aria-haspopup="dialog"
          aria-label={`View full screenshot: ${primaryScreenshot.alt}`}
        >
          {/* Browser Mockup Header */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#121212] border-b border-border/80 rounded-t-lg mb-1 select-none">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
            </div>
            <span className="text-[10px] font-mono text-muted/60 truncate max-w-[140px] sm:max-w-[200px]">
              {project.slug}.local
            </span>
            <span className="text-[10px] font-mono text-accent/80 hover:text-accent">
              🔍 Zoom
            </span>
          </div>

          {/* Screenshot Image Container */}
          <div className="relative overflow-hidden rounded bg-black aspect-[16/10] flex items-center justify-center">
            <img
              src={primaryScreenshot.src}
              alt={primaryScreenshot.alt}
              className="w-full h-full object-cover sm:object-contain transition-transform duration-500 group-hover/ss:scale-[1.03]"
              loading="lazy"
            />
          </div>

          {/* Caption */}
          {primaryScreenshot.caption ? (
            <p className="mt-2 text-[11px] font-mono text-muted/70 text-center truncate px-2 select-none">
              {primaryScreenshot.caption}
            </p>
          ) : null}
        </button>
      </div>
    );
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {/* Accessible Status */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing project {currentIndex + 1} of {projects.length}: {currentProject?.title}
      </p>

      {/* Retro Console Horizontal Carousel Container */}
      <div
        className="relative rounded-2xl border border-border-strong bg-[#090909] overflow-hidden shadow-2xl focus-visible:outline-accent"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects carousel"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const touchEnd = e.changedTouches[0].clientX;
          const diff = touchStart - touchEnd;
          if (diff > 45) nextSlide();
          else if (diff < -45) prevSlide();
          setTouchStart(null);
        }}
      >
        {/* Top Console Bar: Index Counter, Domain, Period, and Navigation Controls */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-border bg-[#0e0e0e]/95 backdrop-blur-sm select-none gap-2">
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <span className="font-pixel text-xs sm:text-sm text-accent font-bold tracking-wider shrink-0">
              {String(currentIndex + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
            </span>
            <span className="text-border-strong text-xs shrink-0">•</span>
            <span className="px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold bg-surface border border-border-strong text-muted shrink-0">
              {currentProject?.domain}
            </span>
            <span className="text-xs text-muted/60 hidden md:inline truncate">
              {currentProject?.period}
            </span>
          </div>

          {/* Navigation Controls: Prev Button, Dot Indicators (tablet/desktop), Next Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous project"
              className="size-8 sm:size-9 rounded-lg border border-border-strong bg-surface flex items-center justify-center text-text hover:border-accent hover:text-accent hover:bg-surface-2 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <ArrowLeftIcon className="size-4" />
            </button>

            {/* Pagination Dots (visible on sm: screens and up to give mobile full breathing room) */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2" role="group" aria-label="Slide indicators">
              {visible.map((p, idx) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to project ${idx + 1}: ${p.title}`}
                  aria-current={idx === currentIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-5 sm:w-6 bg-accent"
                      : "w-1.5 sm:w-2 bg-border-strong hover:bg-muted"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next project"
              className="size-8 sm:size-9 rounded-lg border border-border-strong bg-surface flex items-center justify-center text-text hover:border-accent hover:text-accent hover:bg-surface-2 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Track with Smooth Horizontal Slide Transition */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {visible.map((project, i) => {
              return (
                <article
                  key={project.slug}
                  className="w-full shrink-0 p-5 sm:p-7 lg:p-9"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${visible.length}: ${project.title}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Left Column: Full Project Narrative, Problem/Solution, Tech Tags, and CTAs */}
                    <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
                      {project.award ? (
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded bg-cta/15 border border-cta/40 px-3 py-1 text-gold text-xs font-semibold w-fit">
                          <span>🏆</span>
                          <span>{project.award}</span>
                        </div>
                      ) : null}

                      {/* Project Title */}
                      <h3 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-text leading-snug">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-accent transition-colors focus-visible:outline-accent"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      {/* Plain-English One-Liner Summary */}
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-normal text-pretty">
                        {project.oneLiner}
                      </p>

                      {/* On Mobile: Featured Screenshot is right under the title & summary for instant visual recognition */}
                      {renderScreenshot(project, "lg:hidden mt-4 mb-2")}

                      {/* Problem & Solution Snapshot Box */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#111111] border border-border p-3.5 rounded-xl shadow-inner">
                        <div>
                          <span className="font-mono text-[10px] uppercase font-bold text-accent tracking-wider block mb-1">
                            Problem
                          </span>
                          <p className="text-text/90 line-clamp-3 leading-relaxed">
                            {project.problem[0]}
                          </p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase font-bold text-accent tracking-wider block mb-1">
                            Solution &amp; Results
                          </span>
                          <p className="text-text/90 line-clamp-3 leading-relaxed">
                            {project.results ? project.results[0] : project.solution[0]}
                          </p>
                        </div>
                      </div>

                      {/* Technologies Tag List */}
                      <div className="mt-5">
                        <TagList label={`${project.title} technologies`}>
                          {project.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </TagList>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cta text-on-cta font-semibold text-xs sm:text-sm hover:bg-cta/90 transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          <span>Read Case Study</span>
                          <ArrowRightIcon className="size-4" />
                        </Link>

                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border-strong text-text font-medium text-xs sm:text-sm hover:border-accent hover:text-accent transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <span>Source Code</span>
                          <ExternalLinkIcon className="size-4 text-muted" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column (Desktop only): Featured Screenshot side-by-side */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col justify-center">
                      {renderScreenshot(project)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar: Centered Dots Indicator */}
        <div className="sm:hidden flex items-center justify-center py-2.5 border-t border-border bg-[#0e0e0e]/95 backdrop-blur-sm select-none">
          <div className="flex items-center gap-1.5" role="group" aria-label="Mobile slide indicators">
            {visible.map((p, idx) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project ${idx + 1}: ${p.title}`}
                aria-current={idx === currentIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-border-strong hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal Dialog for Full-size Screenshot Preview */}
      <dialog
        ref={dialogRef}
        onClose={() => setActiveScreenshot(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closePreview();
        }}
        className="fixed inset-0 m-auto max-h-[92vh] max-w-[94vw] rounded-xl border border-border bg-surface p-4 text-text shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-6"
      >
        {activeScreenshot ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-xs font-mono text-muted truncate max-w-[70vw]">
                {activeScreenshot.caption || activeScreenshot.alt}
              </span>
              <button
                type="button"
                onClick={closePreview}
                aria-label="Close dialog"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border-strong text-muted hover:border-accent hover:text-accent transition-colors"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center p-1">
              <img
                src={activeScreenshot.src}
                alt={activeScreenshot.alt}
                className="max-h-[75vh] w-auto max-w-full rounded object-contain shadow-lg"
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
