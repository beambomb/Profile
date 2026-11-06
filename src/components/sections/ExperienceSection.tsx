"use client";

import React, { useState, useEffect, useRef } from "react";
import { profile } from "@content";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const items = profile.experience || [];

  useEffect(() => {
    setIsMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On desktop, 2 cards fit side-by-side. On mobile/tablet, 1 card fits.
  const cardsPerView = isDesktop ? 2 : 1;
  const maxIndex = Math.max(0, items.length - cardsPerView);

  // Keep activeIndex within valid bounds when resizing
  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [maxIndex, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Mobile Touch Swipe with Directional Locking (Never interrupts vertical scroll)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalGesture = useRef<boolean | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalGesture.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (isHorizontalGesture.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalGesture.current = Math.abs(dx) > Math.abs(dy);
      }
    }
    // If vertical gesture, we do NOT call preventDefault so native scroll works smoothly!
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || isHorizontalGesture.current !== true) {
      touchStartX.current = null;
      touchStartY.current = null;
      isHorizontalGesture.current = null;
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalGesture.current = null;
  };

  return (
    <section id="experience" className="scroll-mt-20 py-8 sm:py-12 border-b border-border">
      {/* Title (Retro Pixel Font) */}
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-text mb-8">
        Experience
      </h2>

      {/* Subsection 1: Organizational and Committee Experience Carousel */}
      <div
        className="outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Organizational and Committee Experience"
      >
        {/* Header Controls: Title on Left, Counter & Arrow Controls on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-accent uppercase tracking-wider font-mono">
            <span aria-hidden="true" className="text-accent text-sm select-none shrink-0 font-bold">▸</span>
            <span>Organizational and Committee Experience</span>
          </h3>

          {/* Nav Controls: Prev / Next buttons & Counter */}
          {items.length > cardsPerView ? (
            <div className="flex items-center gap-2.5 self-end sm:self-auto select-none">
              <span className="text-[11px] font-mono text-muted/70 tracking-wider">
                {String(activeIndex + 1).padStart(2, "0")} / {String(maxIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5" role="group" aria-label="Carousel navigation">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous organization"
                  className="size-7 inline-flex items-center justify-center rounded-md border border-border bg-[#101010] text-muted hover:text-text hover:border-border-strong disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 text-xs font-mono"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === maxIndex}
                  aria-label="Next organization"
                  className="size-7 inline-flex items-center justify-center rounded-md border border-border bg-[#101010] text-muted hover:text-text hover:border-border-strong disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 text-xs font-mono"
                >
                  →
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Quick-Jump Organization Pill Rail */}
        {items.length > 1 ? (
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-4 select-none"
            role="tablist"
            aria-label="Organization list tabs"
          >
            {items.map((item, idx) => {
              const isSelected = isDesktop
                ? idx >= activeIndex && idx < activeIndex + cardsPerView
                : idx === activeIndex;
              return (
                <button
                  key={item.organization}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(Math.min(idx, maxIndex))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 shrink-0 border ${
                    isSelected
                      ? "border-accent/60 bg-accent/10 text-text font-bold shadow-sm"
                      : "border-border/80 bg-[#0c0c0c] text-muted hover:text-text hover:border-border-strong"
                  }`}
                >
                  <span className="text-accent/80 text-[10px]">0{idx + 1}</span>
                  <span className="truncate max-w-[200px] sm:max-w-none">{item.organization}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Carousel Sliding Viewport */}
        <div
          className="relative overflow-hidden -mx-1 px-1 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-4 transition-transform duration-300 ease-out"
            style={{
              transform: isMounted
                ? isDesktop
                  ? `translateX(calc(-${activeIndex} * (50% + 8px)))`
                  : `translateX(calc(-${activeIndex} * (100% + 16px)))`
                : "none",
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.organization}
                className="w-full md:w-[calc(50%-8px)] shrink-0 rounded-xl border border-border bg-[#0a0a0a] hover:border-border-strong/90 transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Strip: Index badge & Period Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-semibold text-accent/85 tracking-wider uppercase">
                      #{String(idx + 1).padStart(2, "0")} // LEADERSHIP
                    </span>
                    <span className="font-mono text-[11px] font-medium text-accent border border-accent/25 bg-accent/5 px-2.5 py-0.5 rounded-full shrink-0">
                      {item.period}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h4 className="text-base sm:text-lg font-bold text-text leading-snug">
                    {item.role}
                  </h4>

                  {/* Organization Name */}
                  <p className="text-xs sm:text-sm font-medium text-muted mt-1">
                    {item.organization}
                  </p>

                  {/* Hairline Divider */}
                  <div className="w-full h-px bg-border/60 my-4" />

                  {/* Impact Bullets */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted leading-relaxed">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="text-accent shrink-0 mt-0.5 text-xs select-none">▸</span>
                        <span className="text-text/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicator Dots (when multiple slides exist) */}
        {items.length > cardsPerView ? (
          <div
            className="flex items-center justify-center gap-1.5 mt-4 select-none"
            role="group"
            aria-label="Experience slide indicators"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Subsection 2: Competitions and Awards */}
      {profile.achievements && profile.achievements.length > 0 ? (
        <div className="mt-12">
          {/* Preserves deep link & test target */}
          <span id="competitions" className="sr-only" />

          <h3 className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-accent mb-4 uppercase tracking-wider font-mono">
            <span aria-hidden="true" className="text-accent text-base select-none shrink-0 font-bold">▸</span>
            <span>Competitions and Awards</span>
          </h3>

          <div className="divide-y divide-border border-y border-border">
            {profile.achievements.map((ach) => (
              <div
                key={ach.title}
                className="py-4 sm:py-5 -mx-3 px-3 rounded-lg transition-colors hover:bg-surface/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-text leading-tight">
                    {ach.title}
                  </h4>
                  {ach.date ? (
                    <span className="text-xs font-semibold text-accent shrink-0">
                      {ach.date}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                  {ach.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
