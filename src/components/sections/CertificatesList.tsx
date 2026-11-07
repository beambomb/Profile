"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Certificate } from "@content";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ExternalLinkIcon } from "@/components/ui/Icons";

export function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Certificate | null>(null);

  // Cycling navigation so user never gets stuck with a dead disabled button
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const open = (cert: Certificate) => {
    setActive(cert);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const close = () => {
    dialogRef.current?.close();
    setActive(null);
  };

  return (
    <>
      {/* Carousel Track Container: Full-bleed on mobile for generous peek visibility */}
      <div
        className="cert-carousel-track relative w-screen -ml-[calc((100vw-100%)/2)] sm:w-full sm:ml-0 overflow-hidden py-3 select-none touch-pan-y focus-visible:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Certificates Carousel"
      >
        <ul
          className="flex items-center transition-transform duration-500 ease-out list-none p-0 m-0"
          style={{
            gap: "var(--slide-gap)",
            transform: `translateX(calc(50% - (var(--slide-w) / 2) - ${currentIndex} * (var(--slide-w) + var(--slide-gap))))`,
          }}
        >
          {certificates.map((cert, index) => {
            const isActive = index === currentIndex;

            return (
              <li
                key={cert.id}
                className={`cert-slide relative shrink-0 flex flex-col transition-all duration-500 ease-out rounded-xl border bg-surface overflow-hidden ${
                  isActive
                    ? "border-border-strong shadow-2xl scale-100 opacity-100 z-10"
                    : "border-border-strong/70 scale-[0.88] sm:scale-[0.92] opacity-60 hover:opacity-85 cursor-pointer z-0"
                }`}
                onClick={() => {
                  if (!isActive) setCurrentIndex(index);
                }}
              >
                {/* Full-card overlay button for inactive cards to instantly bring them to center */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`View ${cert.name}`}
                    className="absolute inset-0 z-20 w-full h-full cursor-pointer bg-transparent border-0"
                  />
                )}

                {/* Certificate Image Frame */}
                {cert.image ? (
                  <button
                    type="button"
                    onClick={() => isActive && open(cert)}
                    disabled={!isActive}
                    className={`group relative block aspect-[16/10] w-full overflow-hidden bg-[#050505] border-b border-border ${
                      isActive ? "cursor-pointer" : "cursor-pointer pointer-events-none"
                    }`}
                    aria-label={`View certificate image: ${cert.name}`}
                    aria-haspopup="dialog"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.imageAlt ?? `Certificate: ${cert.name}`}
                      fill
                      sizes="(min-width: 1024px) 520px, (min-width: 640px) 460px, 75vw"
                      className="object-contain p-3 sm:p-5 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                ) : (
                  <div className="aspect-[16/10] w-full bg-surface-2 border-b border-border flex items-center justify-center p-6 text-center">
                    <span className="font-mono text-xs text-muted">No scan available</span>
                  </div>
                )}

                {/* Card Details: Clean, No Labels, Pure Typography */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-text leading-snug line-clamp-2">
                    {cert.name}
                  </h3>
                  <div className="mt-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted truncate pr-2">{cert.issuer}</span>
                    <span className="font-mono text-accent font-medium shrink-0">{cert.year}</span>
                  </div>

                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isActive ? 0 : -1}
                      className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-xs sm:text-sm font-medium text-accent hover:underline group/link"
                    >
                      <span>Verify credential</span>
                      <ExternalLinkIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile-Friendly Control Bar: In Thumb Reach Zone, Min 44px Touch Targets, No Labels */}
      {certificates.length > 1 && (
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous certificate"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-text transition-all hover:border-accent hover:bg-surface-2 active:scale-95 shadow-md"
          >
            <ArrowLeftIcon className="size-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-2">
            {certificates.map((cert, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to certificate ${idx + 1}: ${cert.name}`}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    isCurrent ? "w-7 bg-accent" : "w-2 bg-border-strong hover:bg-muted"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next certificate"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-text transition-all hover:border-accent hover:bg-surface-2 active:scale-95 shadow-md"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      )}

      {/* Full-size Dialog Modal */}
      <dialog
        ref={dialogRef}
        aria-label={active ? `Certificate: ${active.name}` : "Certificate"}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[90dvh] w-[min(92vw,56rem)] rounded-xl border-2 border-border-strong bg-surface p-0 text-text backdrop:bg-black/80"
      >
        {active?.image ? (
          <div className="relative">
            <button
              type="button"
              onClick={close}
              aria-label="Close certificate"
              className="absolute right-2 top-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-border-strong bg-bg/90 text-text hover:border-accent hover:text-accent"
            >
              <CloseIcon />
            </button>
            <Image
              src={active.image}
              alt={active.imageAlt ?? `Certificate: ${active.name}`}
              width={1600}
              height={1131}
              sizes="(min-width: 896px) 896px, 92vw"
              className="h-auto max-h-[85dvh] w-full object-contain"
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
