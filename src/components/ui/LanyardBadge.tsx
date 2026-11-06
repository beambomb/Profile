"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@content";

export function LanyardBadge() {
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapPathRef = useRef<SVGPathElement>(null);
  const claspGroupRef = useRef<SVGGElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Geometry constants (compact, refined badge)
  const anchorX = 110;
  const restingClipY = 72;

  // Realtime physics variables in refs
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const idleAnimRef = useRef<number | null>(null);

  // Direct DOM updater for instant response without React re-render lag
  const updateDOM = useCallback((x: number, y: number, vx: number) => {
    const clipX = anchorX + x;
    const clipY = restingClipY + y;
    const rotation = Math.max(-25, Math.min(25, x * 0.16 + vx * 0.18));

    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rotation}deg)`;
    }

    if (strapPathRef.current) {
      const ctrlX = anchorX + x * 0.35;
      const ctrlY = 32 + y * 0.4;
      const d = `M ${anchorX - 10} 0 L ${anchorX + 10} 0 Q ${ctrlX + 3.5} ${ctrlY} ${clipX + 3.5} ${clipY - 12} L ${clipX - 3.5} ${clipY - 12} Q ${ctrlX - 3.5} ${ctrlY} ${anchorX - 10} 0 Z`;
      strapPathRef.current.setAttribute("d", d);
    }

    if (claspGroupRef.current) {
      claspGroupRef.current.setAttribute("transform", `translate(${clipX}, ${clipY - 12})`);
    }
  }, []);

  // Spring physics loop upon release
  const startSpringPhysics = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const springLoop = () => {
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

      if (
        Math.abs(posRef.current.x) > 0.15 ||
        Math.abs(posRef.current.y) > 0.15 ||
        Math.abs(velRef.current.vx) > 0.15 ||
        Math.abs(velRef.current.vy) > 0.15
      ) {
        animFrameRef.current = requestAnimationFrame(springLoop);
      } else {
        posRef.current = { x: 0, y: 0 };
        velRef.current = { vx: 0, vy: 0 };
        updateDOM(0, 0, 0);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(springLoop);
  }, [updateDOM]);

  // Idle pendulum sway on page load so it's visibly swinging
  useEffect(() => {
    if (hasInteracted) return;

    let startTime = performance.now();
    const idleLoop = (now: number) => {
      if (isDraggingRef.current || hasInteracted) return;
      const elapsed = (now - startTime) / 1000;
      const swayX = Math.sin(elapsed * 2.2) * 5.0;
      const swayY = Math.abs(Math.sin(elapsed * 2.2)) * 1.5;
      posRef.current = { x: swayX, y: swayY };
      updateDOM(swayX, swayY, 0);
      idleAnimRef.current = requestAnimationFrame(idleLoop);
    };

    idleAnimRef.current = requestAnimationFrame(idleLoop);
    return () => {
      if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current);
    };
  }, [hasInteracted, updateDOM]);

  // Native listeners on the container for 100% reliable Drag & Swing on Desktop and Mobile
  useEffect(() => {
    const container = dragContainerRef.current;
    if (!container) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startPosX = 0;
    let startPosY = 0;

    const onDragStart = (clientX: number, clientY: number) => {
      if (idleAnimRef.current) {
        cancelAnimationFrame(idleAnimRef.current);
        idleAnimRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      dragging = true;
      isDraggingRef.current = true;
      setIsDragging(true);
      setHasInteracted(true);

      startX = clientX;
      startY = clientY;
      startPosX = posRef.current.x;
      startPosY = posRef.current.y;
      velRef.current = { vx: 0, vy: 0 };
    };

    const onDragMove = (clientX: number, clientY: number) => {
      if (!dragging) return;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const rawX = startPosX + deltaX * 0.85;
      const rawY = startPosY + deltaY * 0.85;

      // Generous pull boundaries
      const clampedX = Math.max(-130, Math.min(130, rawX));
      const clampedY = Math.max(-20, Math.min(160, rawY));

      velRef.current = {
        vx: (clampedX - posRef.current.x) * 0.45,
        vy: (clampedY - posRef.current.y) * 0.45,
      };

      posRef.current = { x: clampedX, y: clampedY };
      updateDOM(clampedX, clampedY, velRef.current.vx);
    };

    const onDragEnd = () => {
      if (!dragging) return;
      dragging = false;
      isDraggingRef.current = false;
      setIsDragging(false);
      startSpringPhysics();
    };

    // Desktop Pointer Events
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch handled by touch events
      if (e.button !== 0) return;
      e.preventDefault();
      onDragStart(e.clientX, e.clientY);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        onDragMove(moveEvent.clientX, moveEvent.clientY);
      };

      const handlePointerUp = () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        onDragEnd();
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    };

    // Mobile Touch Events (with non-passive preventDefault so scroll never interrupts drag!)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const touch = e.touches[0];
      onDragStart(touch.clientX, touch.clientY);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length === 0) return;
        moveEvent.preventDefault();
        const t = moveEvent.touches[0];
        onDragMove(t.clientX, t.clientY);
      };

      const handleTouchEnd = () => {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchcancel", handleTouchEnd);
        onDragEnd();
      };

      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("touchcancel", handleTouchEnd);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("touchstart", handleTouchStart);
    };
  }, [updateDOM, startSpringPhysics]);

  return (
    <div
      ref={dragContainerRef}
      className="relative flex flex-col items-center select-none pt-0 cursor-grab active:cursor-grabbing"
      style={{ width: "220px", touchAction: "none" }}
    >
      {/* SVG Lanyard Strap - Connected flush to the very top edge (no floating gap) */}
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full overflow-visible z-10"
        style={{ height: "96px" }}
        viewBox="0 0 220 96"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="50%" stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#262626" />
          </linearGradient>
        </defs>

        {/* Top Boundary Line - sits flush on the border line */}
        <line x1={anchorX - 24} y1="0" x2={anchorX + 24} y2="0" stroke="#525252" strokeWidth="4" />

        {/* Dynamic Elastic Ribbon (Quadratic Bezier Curve) */}
        <path
          ref={strapPathRef}
          d={`M ${anchorX - 10} 0 L ${anchorX + 10} 0 Q ${anchorX + 3.5} 32 ${anchorX + 3.5} ${restingClipY - 12} L ${anchorX - 3.5} ${restingClipY - 12} Q ${anchorX - 3.5} 32 ${anchorX - 10} 0 Z`}
          fill="url(#strapGrad)"
          stroke="#404040"
          strokeWidth="0.75"
        />

        {/* Metallic Clasp & Snap Hook */}
        <g ref={claspGroupRef} transform={`translate(${anchorX}, ${restingClipY - 12})`}>
          <rect x="-7" y="0" width="14" height="6" rx="2" fill="#737373" stroke="#262626" strokeWidth="1" />
          <path d="M -5 6 L 5 6 L 3 14 L -3 14 Z" fill="#525252" stroke="#262626" strokeWidth="1" />
          <ellipse cx="0" cy="17" rx="3.5" ry="5" fill="none" stroke="#a3a3a3" strokeWidth="1.75" />
        </g>
      </svg>

      {/* Elastic Badge Card: Compact, sleek, large photo, no verified dot, no barcode, no '28 */}
      <div
        ref={cardRef}
        style={{
          transformOrigin: "center top",
          touchAction: "none",
          marginTop: "66px",
          willChange: "transform",
        }}
        className={`relative w-[210px] rounded-2xl bg-[#0a0a0a] border-2 border-border-strong text-text shadow-2xl transition-shadow duration-200 select-none ${
          isDragging
            ? "shadow-[0_20px_35px_-10px_rgba(255,255,255,0.18)] border-white/70"
            : "hover:border-white/40 hover:shadow-[0_16px_30px_-10px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Lanyard Hole Cutout at Top of Badge */}
        <div className="mx-auto mt-2.5 h-3 w-10 rounded-full bg-black border border-border-strong flex items-center justify-center shadow-inner">
          <div className="h-1 w-6 rounded-full bg-black/90" />
        </div>

        {/* Pass Header Stripe - Clean, no '28 */}
        <div className="px-3 pt-2 pb-1.5 text-center border-b border-border text-[9px] font-mono tracking-widest text-muted uppercase">
          UGM STUDENT PASS
        </div>

        {/* Badge Core Content: Large Photo & Essential Identity */}
        <div className="p-3.5 pt-3 pb-4 flex flex-col items-center text-center">
          {/* Large Portrait Photo */}
          <div className="relative w-32 h-36 rounded-xl overflow-hidden border-2 border-border-strong bg-surface p-0.5 shadow-md pointer-events-none">
            <Image
              src={profile.photo || "/images/profile.jpg"}
              alt={profile.photoAlt}
              width={128}
              height={144}
              draggable={false}
              className="size-full object-cover rounded-[10px] select-none"
              priority
            />
          </div>

          {/* Full Name */}
          <h3 className="mt-3 font-bold text-xs leading-tight tracking-tight text-text">
            Johannes De Deo Dimas Aryobimo
          </h3>

          {/* Department & University */}
          <p className="mt-1 text-[11px] font-medium text-text">
            Information Engineering
          </p>
          <p className="mt-0.5 text-[10px] text-muted">
            {profile.education.school}
          </p>
        </div>
      </div>

      {/* Subtle Drag Hint */}
      {!hasInteracted ? (
        <span className="mt-2.5 text-[10px] font-mono tracking-wider text-muted/70 animate-pulse">
          ↕ drag or swing badge
        </span>
      ) : (
        <span className="mt-2.5 text-[10px] font-mono tracking-wider text-transparent select-none">
          ·
        </span>
      )}
    </div>
  );
}