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
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const idleAnimRef = useRef<number | null>(null);

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

  // Spring physics loop upon release
  const runPhysics = useCallback(() => {
    if (isDraggingRef.current) return;

    const stiffness = 0.09;
    const damping = 0.82;

    const fx = -stiffness * posRef.current.x;
    const fy = -stiffness * posRef.current.y;

    velRef.current.vx = (velRef.current.vx + fx) * damping;
    velRef.current.vy = (velRef.current.vy + fy) * damping;

    posRef.current.x += velRef.current.vx;
    posRef.current.y += velRef.current.vy;

    setPos({ x: posRef.current.x, y: posRef.current.y });

    // Continue until settled
    if (
      Math.abs(posRef.current.x) > 0.1 ||
      Math.abs(posRef.current.y) > 0.1 ||
      Math.abs(velRef.current.vx) > 0.1 ||
      Math.abs(velRef.current.vy) > 0.1
    ) {
      animFrameRef.current = requestAnimationFrame(runPhysics);
    } else {
      posRef.current = { x: 0, y: 0 };
      velRef.current = { vx: 0, vy: 0 };
      setPos({ x: 0, y: 0 });
      animFrameRef.current = null;
    }
  }, []);

  // Idle gentle pendulum sway before interaction
  useEffect(() => {
    if (prefersReducedMotion || hasInteracted) return;

    let startTime = performance.now();
    const idleLoop = (now: number) => {
      if (isDraggingRef.current || hasInteracted) return;
      const elapsed = (now - startTime) / 1000;
      // Gentle sway of ~3px and ~1.5deg
      const swayX = Math.sin(elapsed * 2.2) * 3.5;
      const swayY = Math.abs(Math.sin(elapsed * 2.2)) * 1.5;
      posRef.current = { x: swayX, y: swayY };
      setPos({ x: swayX, y: swayY });
      idleAnimRef.current = requestAnimationFrame(idleLoop);
    };

    idleAnimRef.current = requestAnimationFrame(idleLoop);
    return () => {
      if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current);
    };
  }, [hasInteracted, prefersReducedMotion]);

  // Bulletproof Drag Handling on Window
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    // Prevent text selection & default dragging
    e.preventDefault();

    if (idleAnimRef.current) {
      cancelAnimationFrame(idleAnimRef.current);
      idleAnimRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...posRef.current };
    velRef.current = { vx: 0, vy: 0 };

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      moveEvent.preventDefault();

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Elastic resistance
      const rawX = startPos.x + deltaX * 0.85;
      const rawY = startPos.y + deltaY * 0.85;

      // Allow generous movement: ±140px sideways, up to 180px down, -25px up
      const clampedX = Math.max(-140, Math.min(140, rawX));
      const clampedY = Math.max(-25, Math.min(180, rawY));

      velRef.current = {
        vx: (clampedX - posRef.current.x) * 0.5,
        vy: (clampedY - posRef.current.y) * 0.5,
      };

      posRef.current = { x: clampedX, y: clampedY };
      setPos({ x: clampedX, y: clampedY });
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      isDraggingRef.current = false;
      setIsDragging(false);

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(runPhysics);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current);
    };
  }, []);

  // Geometry: Hanging strap coming down from top boundary
  const anchorX = 130;
  const clipX = anchorX + pos.x;
  const clipY = 100 + pos.y; // Longer hanging distance so it visibly hangs
  const rotation = Math.max(-25, Math.min(25, pos.x * 0.16 + velRef.current.vx * 0.18));

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none -mt-6 sm:-mt-8"
      style={{ width: "260px" }}
    >
      {/* SVG Elastic Lanyard Strap & Clip - Hanging from top edge */}
      <svg
        className="pointer-events-none absolute -top-4 left-0 w-full overflow-visible z-10"
        style={{ height: "130px" }}
        viewBox="0 0 260 130"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="50%" stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#262626" />
          </linearGradient>
        </defs>

        {/* Ceiling Mount / Lanyard Neck loop anchor */}
        <line x1={anchorX - 22} y1="0" x2={anchorX + 22} y2="0" stroke="#525252" strokeWidth="4" />
        <circle cx={anchorX} cy="0" r="5" fill="#737373" stroke="#262626" strokeWidth="2" />

        {/* Dynamic Elastic Ribbon (Quadratic Bezier Curve) */}
        <path
          d={`M ${anchorX - 4} 0 Q ${anchorX + pos.x * 0.35 - 4} ${45 + pos.y * 0.4} ${clipX - 4} ${clipY - 14} L ${clipX + 4} ${clipY - 14} Q ${anchorX + pos.x * 0.35 + 4} ${45 + pos.y * 0.4} ${anchorX + 4} 0 Z`}
          fill="url(#strapGrad)"
          stroke="#404040"
          strokeWidth="0.75"
        />

        {/* Metallic Clasp & Snap Hook */}
        <g transform={`translate(${clipX}, ${clipY - 14})`}>
          {/* Metal Ring */}
          <rect x="-8" y="0" width="16" height="7" rx="2" fill="#737373" stroke="#262626" strokeWidth="1" />
          {/* Swivel Body */}
          <path d="M -6 7 L 6 7 L 3.5 17 L -3.5 17 Z" fill="#525252" stroke="#262626" strokeWidth="1" />
          {/* Snap Ring through badge slot */}
          <ellipse cx="0" cy="20" rx="4" ry="6" fill="none" stroke="#a3a3a3" strokeWidth="2" />
        </g>
      </svg>

      {/* Elastic Badge Card */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${rotation}deg)`,
          transformOrigin: "center top",
          touchAction: "none",
          marginTop: "92px",
          willChange: "transform",
        }}
        className={`relative w-[240px] rounded-2xl bg-[#0a0a0a] border-2 border-border-strong text-text shadow-2xl transition-shadow duration-200 select-none ${
          isDragging
            ? "cursor-grabbing shadow-[0_25px_40px_-10px_rgba(255,255,255,0.15)] border-white/70"
            : "cursor-grab hover:border-white/40 hover:shadow-[0_20px_35px_-10px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Lanyard Hole Cutout at Top of Badge */}
        <div className="mx-auto mt-2.5 h-3.5 w-11 rounded-full bg-black border border-border-strong flex items-center justify-center shadow-inner">
          <div className="h-1.5 w-8 rounded-full bg-black/90" />
        </div>

        {/* Pass Header Stripe */}
        <div className="px-4 pt-2.5 pb-2 border-b border-border flex items-center justify-between text-[9px] font-mono tracking-widest text-muted">
          <span>UGM // ENG PASS</span>
          <span className="text-accent font-semibold">&apos;28</span>
        </div>

        {/* Badge Core Content */}
        <div className="p-4 pt-3 flex flex-col items-center text-center">
          {/* Portrait Photo inside ID frame */}
          <div className="relative size-20 rounded-xl overflow-hidden border border-border-strong bg-surface p-0.5 shadow-md pointer-events-none">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={80}
              height={80}
              draggable={false}
              className="size-full object-cover rounded-[10px] select-none"
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
        <span className="mt-3 text-[10px] font-mono tracking-wider text-muted/70 animate-pulse">
          ↕ drag or swing lanyard
        </span>
      ) : (
        <span className="mt-3 text-[10px] font-mono tracking-wider text-transparent select-none">
          ·
        </span>
      )}
    </div>
  );
}