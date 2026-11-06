"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@content";

interface Point {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

export function LanyardBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Physics animation state
  const posRef = useRef<Point>({ x: 0, y: 0 });
  const velRef = useRef<Velocity>({ vx: 0, vy: 0 });
  const dragStartRef = useRef<Point>({ x: 0, y: 0 });
  const initialPosRef = useRef<Point>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  const runPhysics = useCallback(() => {
    if (isDraggingRef.current) return;

    // Spring physics constants
    const stiffness = 0.085;
    const damping = 0.82;

    const fx = -stiffness * posRef.current.x;
    const fy = -stiffness * posRef.current.y;

    velRef.current.vx = (velRef.current.vx + fx) * damping;
    velRef.current.vy = (velRef.current.vy + fy) * damping;

    posRef.current.x += velRef.current.vx;
    posRef.current.y += velRef.current.vy;

    setPos({ x: posRef.current.x, y: posRef.current.y });

    // Continue running until velocity and position settle close to 0
    if (
      Math.abs(posRef.current.x) > 0.05 ||
      Math.abs(posRef.current.y) > 0.05 ||
      Math.abs(velRef.current.vx) > 0.05 ||
      Math.abs(velRef.current.vy) > 0.05
    ) {
      animFrameRef.current = requestAnimationFrame(runPhysics);
    } else {
      posRef.current = { x: 0, y: 0 };
      velRef.current = { vx: 0, vy: 0 };
      setPos({ x: 0, y: 0 });
      animFrameRef.current = null;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    e.preventDefault();
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);

    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { ...posRef.current };
    velRef.current = { vx: 0, vy: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || prefersReducedMotion) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Rubber-band resistance
    const rawX = initialPosRef.current.x + deltaX * 0.75;
    const rawY = initialPosRef.current.y + deltaY * 0.75;

    // Clamping: max sideways ±90px, max downward 120px, max upward -25px
    const clampedX = Math.max(-90, Math.min(90, rawX));
    const clampedY = Math.max(-25, Math.min(130, rawY));

    // Approximate velocity
    velRef.current = {
      vx: (clampedX - posRef.current.x) * 0.5,
      vy: (clampedY - posRef.current.y) * 0.5,
    };

    posRef.current = { x: clampedX, y: clampedY };
    setPos({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || prefersReducedMotion) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(runPhysics);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Geometry calculations
  const anchorX = 130;
  const clipX = anchorX + pos.x;
  const clipY = 46 + pos.y;
  const rotation = Math.max(-22, Math.min(22, pos.x * 0.18 + velRef.current.vx * 0.15));

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none pt-1 pb-4"
      style={{ width: "260px" }}
    >
      {/* SVG Elastic Lanyard Strap & Clip */}
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full overflow-visible z-10"
        style={{ height: "70px" }}
        viewBox="0 0 260 70"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#383838" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        {/* Hanging Anchor Grommet at Top */}
        <line x1={anchorX - 16} y1="0" x2={anchorX + 16} y2="0" stroke="#404040" strokeWidth="3" />
        <circle cx={anchorX} cy="0" r="4.5" fill="#525252" stroke="#262626" strokeWidth="1.5" />

        {/* Dynamic Curved Elastic Lanyard Ribbon */}
        <path
          d={`M ${anchorX - 3.5} 0 Q ${anchorX + pos.x * 0.35 - 3.5} ${22 + pos.y * 0.45} ${clipX - 3.5} ${clipY - 14} L ${clipX + 3.5} ${clipY - 14} Q ${anchorX + pos.x * 0.35 + 3.5} ${22 + pos.y * 0.45} ${anchorX + 3.5} 0 Z`}
          fill="url(#strapGrad)"
          stroke="#404040"
          strokeWidth="0.75"
        />

        {/* Metallic Lanyard Hook / Clip Assembly */}
        <g transform={`translate(${clipX}, ${clipY - 14})`}>
          {/* Metal Ring */}
          <rect x="-7" y="0" width="14" height="6" rx="2" fill="#737373" stroke="#262626" strokeWidth="0.75" />
          {/* Clasp body */}
          <path d="M -5 6 L 5 6 L 3 15 L -3 15 Z" fill="#525252" stroke="#262626" strokeWidth="0.75" />
          {/* Snap Hook through the badge hole */}
          <ellipse cx="0" cy="18" rx="3.5" ry="5.5" fill="none" stroke="#8a8a8a" strokeWidth="1.75" />
        </g>
      </svg>

      {/* Elastic Badge Card */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${rotation}deg)`,
          transformOrigin: "center top",
          touchAction: "none",
          marginTop: "48px",
          willChange: "transform",
        }}
        className={`relative w-[240px] rounded-2xl bg-[#0d0d0d] border-2 border-border-strong text-text shadow-2xl transition-shadow duration-200 ${
          isDragging
            ? "cursor-grabbing shadow-[0_20px_35px_-10px_rgba(255,255,255,0.12)] border-white/60"
            : "cursor-grab hover:border-white/40 hover:shadow-[0_16px_30px_-10px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Lanyard Hole Cutout at Top of Badge */}
        <div className="mx-auto mt-2.5 h-3.5 w-11 rounded-full bg-bg border border-border-strong flex items-center justify-center shadow-inner">
          <div className="h-1.5 w-8 rounded-full bg-black/80" />
        </div>

        {/* Pass Header Stripe */}
        <div className="px-4 pt-2.5 pb-2 border-b border-border flex items-center justify-between text-[9px] font-mono tracking-widest text-muted">
          <span>UGM // ENG PASS</span>
          <span className="text-accent font-semibold">&apos;28</span>
        </div>

        {/* Badge Core Content */}
        <div className="p-4 pt-3 flex flex-col items-center text-center">
          {/* Portrait Photo inside ID frame */}
          <div className="relative size-20 rounded-xl overflow-hidden border border-border-strong bg-surface p-0.5 shadow-md">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={80}
              height={80}
              className="size-full object-cover rounded-[10px]"
              priority
            />
            {/* Holographic accent indicator */}
            <div className="absolute top-1 right-1 size-2 rounded-full bg-accent/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Name & Academic Credentials */}
          <h3 className="mt-3 font-bold text-xs leading-tight tracking-tight text-text">
            Johannes De Deo Dimas Aryobimo
          </h3>

          <p className="mt-1 text-[11px] font-medium text-text">
            Information Engineering
          </p>
          <p className="text-[10px] text-muted">
            {profile.education.school}
          </p>

          {/* Micro Specs Ledger on Badge */}
          <div className="mt-3 w-full py-2 border-t border-border grid grid-cols-2 gap-1 text-[10px] text-left">
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-muted font-mono">Location</span>
              <span className="font-medium text-text text-[10px] truncate block">Yogyakarta, ID</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-muted font-mono">Domain</span>
              <span className="font-medium text-text text-[10px] truncate block">Software &amp; Data</span>
            </div>
          </div>

          {/* Barcode & Security ID footer */}
          <div className="mt-2 w-full pt-2 border-t border-border/80 flex items-center justify-between">
            {/* SVG Barcode */}
            <svg
              className="h-5 w-28 text-text/60"
              viewBox="0 0 110 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="2" height="20" />
              <rect x="4" y="0" width="1" height="20" />
              <rect x="7" y="0" width="3" height="20" />
              <rect x="12" y="0" width="2" height="20" />
              <rect x="16" y="0" width="1" height="20" />
              <rect x="19" y="0" width="4" height="20" />
              <rect x="25" y="0" width="2" height="20" />
              <rect x="29" y="0" width="1" height="20" />
              <rect x="32" y="0" width="3" height="20" />
              <rect x="37" y="0" width="2" height="20" />
              <rect x="42" y="0" width="4" height="20" />
              <rect x="48" y="0" width="1" height="20" />
              <rect x="51" y="0" width="2" height="20" />
              <rect x="55" y="0" width="3" height="20" />
              <rect x="60" y="0" width="1" height="20" />
              <rect x="63" y="0" width="4" height="20" />
              <rect x="69" y="0" width="2" height="20" />
              <rect x="73" y="0" width="1" height="20" />
              <rect x="76" y="0" width="3" height="20" />
              <rect x="81" y="0" width="2" height="20" />
              <rect x="85" y="0" width="4" height="20" />
              <rect x="91" y="0" width="1" height="20" />
              <rect x="94" y="0" width="2" height="20" />
              <rect x="98" y="0" width="3" height="20" />
              <rect x="103" y="0" width="2" height="20" />
              <rect x="107" y="0" width="3" height="20" />
            </svg>

            {/* Verified indicator */}
            <span className="inline-flex items-center gap-1 text-[8px] font-mono text-muted tracking-wider">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Drag Hint */}
      {!hasInteracted && !prefersReducedMotion ? (
        <span className="mt-2 text-[10px] font-mono tracking-wider text-muted/80 animate-pulse">
          ↕ drag or pull lanyard
        </span>
      ) : (
        <span className="mt-2 text-[10px] font-mono tracking-wider text-transparent select-none">
          ·
        </span>
      )}
    </div>
  );
}