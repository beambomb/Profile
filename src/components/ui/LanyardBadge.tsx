"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { profile } from "@content";
import Lanyard from "./Lanyard";

export function LanyardFallback() {
  const [hasWebgl, setHasWebgl] = useState(false);

  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (gl) setHasWebgl(true);
    } catch {
      setHasWebgl(false);
    }
  }, []);

  return (
    <>
      {!hasWebgl ? (
        /* Accessible Fallback when WebGL is unavailable (e.g. In jsdom / test suites) */
        <div className="relative w-[210px] rounded-2xl bg-surface border-2 border-border-strong text-text shadow-2xl p-4 mt-8 text-center">
          <div className="mx-auto h-3 w-10 rounded-full bg-surface-2 border border-border-strong mb-2" />
          <div className="text-[9px] font-mono tracking-widest text-muted uppercase mb-3">
            UGM STUDENT PASS
          </div>
          <div className="relative w-32 h-36 mx-auto rounded-xl overflow-hidden border-2 border-border-strong bg-surface">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={128}
              height={144}
              className="size-full object-cover rounded-[10px]"
              priority
            />
          </div>
          <h3 className="mt-3 font-bold text-xs leading-tight tracking-tight text-text">
            Johannes De Deo Dimas Aryobimo
          </h3>
          <p className="mt-1 text-[11px] font-medium text-text">
            Information Engineering
          </p>
          <p className="mt-0.5 text-[10px] text-muted">
            {profile.education.school}
          </p>
        </div>
      ) : null}

      {/* Screen-reader Accessible Information for Assistive Tech and Test Contracts */}
      <div className="sr-only">
        <h3>Johannes De Deo Dimas Aryobimo</h3>
        <p>Information Engineering</p>
        <p>{profile.education.school}</p>
        <p>UGM Student Pass</p>
      </div>
    </>
  );
}

export function LanyardBadge({ targetRef }: { targetRef?: React.RefObject<HTMLElement | null> } = {}) {
  const [mounted, setMounted] = useState(false);
  const [hasWebgl, setHasWebgl] = useState(true);
  const [topOffset, setTopOffset] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) setHasWebgl(false);
    } catch {
      setHasWebgl(false);
    }

    const updatePosition = () => {
      if (typeof window !== "undefined" && targetRef?.current) {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (mobile) {
          const section = targetRef.current.closest("#profile");
          if (section) {
            const sectionRect = section.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();
            // Account for any scroll offset
            setTopOffset(Math.max(0, targetRect.top - sectionRect.top));
            return;
          }
        }
        setTopOffset(0);
      }
    };

    updatePosition();
    // Allow DOM to settle before measuring
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener("resize", updatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
    };
  }, [targetRef]);

  if (!mounted || !hasWebgl) return null;

  return (
    <div
      style={{ top: `${topOffset}px` }}
      className="absolute left-1/2 -translate-x-1/2 w-screen max-w-[100vw] h-[480px] sm:h-[520px] lg:h-[640px] pointer-events-none z-20 overflow-visible flex justify-center transition-[top] duration-200"
    >
      <Lanyard
        frontImage="/images/card-front.png"
        backImage="/images/card-back.png"
        strapImage="/images/band.png"
        imageFit="cover"
        cardColor="#0a0a0a"
        orientation="portrait"
        finish="glossy"
        cornerRadius={0.3}
        size={isMobile ? 0.52 : 0.58}
        anchor="center"
        anchorRef={targetRef}
        strapLength={isMobile ? 0.22 : 0.26}
        strapColor="#111111"
        strapWidth={0.65}
        metal="silver"
        gravity={1}
        damping={0.5}
        elasticity={0.5}
        breeze={0.3}
        interactive
        intro={false}
      />
    </div>
  );
}
