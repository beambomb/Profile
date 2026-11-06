"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { profile } from "@content";
import Lanyard from "./Lanyard";

export function LanyardBadge() {
  const [mounted, setMounted] = useState(false);
  const [hasWebgl, setHasWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) setHasWebgl(false);
    } catch {
      setHasWebgl(false);
    }
  }, []);

  return (
    <div
      className="relative flex flex-col items-center select-none pt-0 w-[280px] sm:w-[320px] lg:w-[340px] h-[430px] sm:h-[460px] lg:h-[480px] z-20 overflow-visible"
      aria-label="Interactive 3D Physics Lanyard Pass"
    >
      {mounted && hasWebgl ? (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] max-w-none h-[430px] sm:h-[460px] lg:h-[480px] pointer-events-none z-20 overflow-visible flex justify-center">
          <Lanyard
            frontImage="/images/card-front.png"
            backImage="/images/card-back.png"
            strapImage="/images/band.png"
            imageFit="cover"
            cardColor="#0a0a0a"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={0.58}
            anchor="center"
            strapLength={0.44}
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
      ) : (
        /* Accessible Fallback when WebGL is unavailable (e.g. In jsdom / test suites) */
        <div className="relative w-[210px] rounded-2xl bg-[#0a0a0a] border-2 border-border-strong text-text shadow-2xl p-4 mt-8 text-center">
          <div className="mx-auto h-3 w-10 rounded-full bg-black border border-border-strong mb-2" />
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
      )}

      {/* Screen-reader Accessible Information for Assistive Tech and Test Contracts */}
      <div className="sr-only">
        <h3>Johannes De Deo Dimas Aryobimo</h3>
        <p>Information Engineering</p>
        <p>{profile.education.school}</p>
        <p>UGM Student Pass</p>
      </div>
    </div>
  );
}
