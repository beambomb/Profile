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
      className="relative flex flex-col items-center select-none pt-0 w-[300px] sm:w-[340px] lg:w-[380px] h-[440px] sm:h-[480px] lg:h-[500px]"
      aria-label="Interactive 3D Physics Lanyard Pass"
    >
      {mounted && hasWebgl ? (
        <Lanyard
          frontImage="/images/card-front.png"
          backImage="/images/card-back.png"
          strapImage="/images/band.png"
          imageFit="cover"
          cardColor="#0a0a0a"
          orientation="portrait"
          finish="glossy"
          cornerRadius={0.3}
          size={0.7}
          anchor="center"
          strapLength={0.42}
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

      {/* Subtle Hint positioned gracefully under the badge */}
      <span className="mt-2 text-[10px] font-mono tracking-wider text-muted/50 select-none pointer-events-none">
        ↕ drag or click to flip
      </span>
    </div>
  );
}
