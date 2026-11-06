"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@content";

export function LanyardBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const strapPathRef = useRef<SVGPathElement>(null);
  const claspGroupRef = useRef<SVGGElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Geometry constants
  const anchorX = 135;
  const restingClipY = 96;

  // Realtime physics variables in refs for 60-120fps direct DOM manipulation
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const idleAnimRef = useRef<number | null>(null);

  // Direct DOM updater for instant response without React render lag
  const updateDOM = useCallback((x: number, y: number, vx: number) => {
    const clipX = anchorX + x;
    const clipY = restingClipY + y;
    const rotation = Math.max(-25, Math.min(25, x * 0.16 + vx * 0.18));

    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rotation}deg)`;
    }

    if (strapPathRef.current) {
      const ctrlX = anchorX + x * 0.35;
      const ctrlY = 44 + y * 0.4;
      const d = `M ${anchorX - 4} 0 Q ${ctrlX - 4} ${ctrlY} ${clipX - 4} ${clipY - 14} L ${clipX + 4} ${clipY - 14} Q ${ctrlX + 4} ${ctrlY} ${anchorX + 4} 0 Z`;
      strapPathRef.current.setAttribute("d", d);
    }

    if (claspGroupRef.current) {
      claspGroupRef.current.setAttribute("transform", `translate(${clipX}, ${clipY - 14})`);
    }
  }, []);

  // Spring physics loop upon release
  const runPhysics = useCallback(() => {
    if (isDraggingRef.current) return;

    const stiffness = 0.088;
    const damping = 0.81;

    const fx = -stiffness * posRef.current.x;
    const fy = -stiffness * posRef.current.y;

    velRef.current.vx = (velRef.current.vx + fx) * damping;
    velRef.current.vy = (velRef.current.vy + fy) * damping;

    posRef.current.x += velRef.current.vx;
    posRef.current.y += velRef.current.vy;

    updateDOM(posRef.current.x, posRef.current.y, velRef.current.vx);

    // Continue until settled
    if (
      Math.abs(posRef.current.x) > 0.15 ||
      Math.abs(posRef.current.y) > 0.15 ||
      Math.abs(velRef.current.vx) > 0.15 ||
      Math.abs(velRef.current.vy) > 0.15
    ) {
      animFrameRef.current = requestAnimationFrame(runPhysics);
    } else {
      posRef.current = { x: 0, y: 0 };
      velRef.current = { vx: 0, vy: 0 };
      updateDOM(0, 0, 0);
      animFrameRef.current = null;
    }
  }, [updateDOM]);

  // Idle gentle pendulum sway before user touch
  useEffect(() => {
    if (hasInteracted) return;

    let startTime = performance.now();
    const idleLoop = (now: number) => {
      if (isDraggingRef.current || hasInteracted) return;
      const elapsed = (now - startTime) / 1000;
      const swayX = Math.sin(elapsed * 2.2) * 4.5;
      const swayY = Math.abs(Math.sin(elapsed * 2.2)) * 1.8;
      posRef.current = { x: swayX, y: swayY };
      updateDOM(swayX, swayY, 0);
      idleAnimRef.current = requestAnimationFrame(idleLoop);
    };

    idleAnimRef.current = requestAnimationFrame(idleLoop);
    return () => {
      if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current);
    };
  }, [hasInteracted, updateDOM]);

  // Universal Drag Initiation (Mouse, Touch, Pen)
  const startDrag = (clientX: number, clientY: number) => {
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

    const startX = clientX;
    const startY = clientY;
    const startPos = { ...posRef.current };
    velRef.current = { vx: 0, vy: 0 };

    const onMove = (moveX: number, moveY: number) => {
      if (!isDraggingRef.current) return;

      const deltaX = moveX - startX;
      const deltaY = moveY - startY;

      // Elastic resistance
      const rawX = startPos.x + deltaX * 0.85;
      const rawY = startPos.y + deltaY * 0.85;

      const clampedX = Math.max(-150, Math.min(150, rawX));
      const clampedY = Math.max(-25, Math.min(190, rawY));

      velRef.current = {
        vx: (clampedX - posRef.current.x) * 0.5,
        vy: (clampedY - posRef.current.y) * 0.5,
      };

      posRef.current = { x: clampedX, y: clampedY };
      updateDOM(clampedX, clampedY, velRef.current.vx);
    };

    const onPointerMove = (e: PointerEvent) => {
      e.preventDefault();
      onMove(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      onMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onEnd = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);

      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);

      isDraggingRef.current = false;
      setIsDragging(false);

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(runPhysics);
    };

    // Attach listeners to window for unbreakable tracking
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);

    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center select-none -mt-4 sm:-mt-6"
      style={{ width: "270px" }}
    >
      {/* SVG Elastic Lanyard Strap & Clip - Hanging from top edge */}
      <svg
        className="pointer-events-none absolute -top-4 left-0 w-full overflow-visible z-10"
        style={{ height: "130px" }}
        viewBox="0 0 270 130"
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
        <line x1={anchorX - 24} y1="0" x2={anchorX + 24} y2="0" stroke="#525252" strokeWidth="4" />
        <circle cx={anchorX} cy="0" r="5" fill="#737373" stroke="#262626" strokeWidth="2" />

        {/* Dynamic Elastic Ribbon (Quadratic Bezier Curve) */}
        <path
          ref={strapPathRef}
          d={`M ${anchorX - 4} 0 Q ${anchorX - 4} 44 ${anchorX - 4} ${restingClipY - 14} L ${anchorX + 4} ${restingClipY - 14} Q ${anchorX + 4} 44 ${anchorX + 4} 0 Z`}
          fill="url(#strapGrad)"
          stroke="#404040"
          strokeWidth="0.75"
        />

        {/* Metallic Clasp & Snap Hook */}
        <g ref={claspGroupRef} transform={`translate(${anchorX}, ${restingClipY - 14})`}>
          <rect x="-8" y="0" width="16" height="7" rx="2" fill="#737373" stroke="#262626" strokeWidth="1" />
          <path d="M -6 7 L 6 7 L 3.5 17 L -3.5 17 Z" fill="#525252" stroke="#262626" strokeWidth="1" />
          <ellipse cx="0" cy="20" rx="4" ry="6" fill="none" stroke="#a3a3a3" strokeWidth="2" />
        </g>
      </svg>

      {/* Elastic Badge Card: Minimal, larger photo, no verified dot, no barcode, no '28 */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transformOrigin: "center top",
          touchAction: "none",
          marginTop: "88px",
          willChange: "transform",
        }}
        className={`relative w-[256px] rounded-2xl bg-[#0a0a0a] border-2 border-border-strong text-text shadow-2xl transition-shadow duration-200 select-none ${
          isDragging
            ? "cursor-grabbing shadow-[0_25px_40px_-10px_rgba(255,255,255,0.18)] border-white/70"
            : "cursor-grab hover:border-white/40 hover:shadow-[0_20px_35px_-10px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Lanyard Hole Cutout at Top of Badge */}
        <div className="mx-auto mt-3 h-3.5 w-12 rounded-full bg-black border border-border-strong flex items-center justify-center shadow-inner">
          <div className="h-1.5 w-8 rounded-full bg-black/90" />
        </div>

        {/* Pass Header Stripe - Clean, no '28 */}
        <div className="px-4 pt-2.5 pb-2 text-center border-b border-border text-[10px] font-mono tracking-widest text-muted uppercase">
          UGM STUDENT PASS
        </div>

        {/* Badge Core Content: Large Photo & Essential Identity */}
        <div className="p-4 pt-4 pb-6 flex flex-col items-center text-center">
          {/* Prominent Large Portrait Photo */}
          <div className="relative w-40 h-44 rounded-xl overflow-hidden border-2 border-border-strong bg-surface p-0.5 shadow-md pointer-events-none">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={160}
              height={176}
              draggable={false}
              className="size-full object-cover rounded-[10px] select-none"
              priority
            />
          </div>

          {/* Full Name */}
          <h3 className="mt-4 font-bold text-sm leading-tight tracking-tight text-text">
            Johannes De Deo Dimas Aryobimo
          </h3>

          {/* Department & University */}
          <p className="mt-1.5 text-xs font-medium text-text">
            Information Engineering
          </p>
          <p className="mt-0.5 text-[11px] text-muted">
            {profile.education.school}
          </p>
        </div>
      </div>

      {/* Subtle Drag Hint */}
      {!hasInteracted ? (
        <span className="mt-3 text-[10px] font-mono tracking-wider text-muted/70 animate-pulse">
          ↕ drag or pull lanyard
        </span>
      ) : (
        <span className="mt-3 text-[10px] font-mono tracking-wider text-transparent select-none">
          ·
        </span>
      )}
    </div>
  );
}