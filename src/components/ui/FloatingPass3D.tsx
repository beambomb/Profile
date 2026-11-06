"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { profile } from "@content";

interface FloatingPass3DProps {
  frontImage?: string;
  backImage?: string;
  className?: string;
}

export function FloatingPass3D({
  frontImage = "/images/card-front.png",
  backImage = "/images/card-back.png",
  className = "",
}: FloatingPass3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebgl, setHasWebgl] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setHasWebgl(false);
        return;
      }
    } catch {
      setHasWebgl(false);
      return;
    }

    let alive = true;
    let raf = 0;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 330;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.65);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "pan-y";
    container.appendChild(canvas);

    // Lights - Clean, even studio lighting with directional lights (no harsh point light hotspot)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-2, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(2.5, -1, 4);
    scene.add(fillLight);

    const backKeyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    backKeyLight.position.set(0, 3, -5);
    scene.add(backKeyLight);

    // Build Card Geometry (Goldilocks medium size - clear photo & comfortable spacing)
    const cardWidth = 1.52;
    const cardHeight = 2.18;
    const radius = 0.16;
    const depth = 0.038;

    const shape = new THREE.Shape();
    const x = -cardWidth / 2;
    const y = -cardHeight / 2;
    const w = cardWidth;
    const h = cardHeight;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + w - radius, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + radius);
    shape.lineTo(x + w, y + h - radius);
    shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    shape.lineTo(x + radius, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const extrudeSettings = {
      depth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.018,
      bevelThickness: 0.018,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const frontTex = textureLoader.load(frontImage);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    const backTex = textureLoader.load(backImage);
    backTex.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.35,
      metalness: 0.85,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.45,
      metalness: 0.05,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.45,
      metalness: 0.05,
    });

    // Create 3D Card Mesh Group
    const cardGroup = new THREE.Group();

    // Body with beveled edges
    const bodyMesh = new THREE.Mesh(geometry, edgeMaterial);
    cardGroup.add(bodyMesh);

    // Front Face Plane
    const faceGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const frontFace = new THREE.Mesh(faceGeo, frontMaterial);
    frontFace.position.z = depth / 2 + 0.019;
    cardGroup.add(frontFace);

    // Back Face Plane
    const backFace = new THREE.Mesh(faceGeo, backMaterial);
    backFace.position.z = -(depth / 2 + 0.019);
    backFace.rotation.y = Math.PI;
    cardGroup.add(backFace);

    scene.add(cardGroup);

    // Interaction State
    let isDragging = false;
    let isTouch = false;
    let isHorizontalGesture: boolean | null = null;
    let startX = 0;
    let startY = 0;
    let prevX = 0;
    let prevY = 0;
    let totalMoved = 0;

    let rotY = 0;
    let rotX = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let velY = 0;
    let velX = 0;
    let time = 0;

    // --- Desktop Mouse Pointer Events ---
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch is handled by dedicated touch listeners
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      prevX = e.clientX;
      prevY = e.clientY;
      totalMoved = 0;
      velY = 0;
      velX = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerType === "touch") return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      totalMoved += Math.abs(dx) + Math.abs(dy);

      targetRotY += dx * 0.024;
      targetRotX += dy * 0.018;
      targetRotX = Math.max(-0.65, Math.min(0.65, targetRotX));

      velY = dx * 0.024;
      velX = dy * 0.018;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging || e.pointerType === "touch") return;
      isDragging = false;
      if (totalMoved < 8) {
        targetRotY += Math.PI;
        setIsFlipped((prev) => !prev);
      }
    };

    // --- Mobile Touch Events with Directional Locking ---
    // Allows completely natural native vertical page scrolling while enabling horizontal 3D card rotation
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      isTouch = true;
      isHorizontalGesture = null;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      prevX = startX;
      prevY = startY;
      totalMoved = 0;
      velY = 0;
      velX = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouch || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = currentX - prevX;
      const dy = currentY - prevY;
      totalMoved += Math.abs(dx) + Math.abs(dy);

      // Lock gesture direction after first 6px of motion
      if (isHorizontalGesture === null) {
        const distX = Math.abs(currentX - startX);
        const distY = Math.abs(currentY - startY);
        if (distX > 6 || distY > 6) {
          isHorizontalGesture = distX > distY * 1.1;
        }
      }

      // If user is intentionally rotating horizontally:
      if (isHorizontalGesture === true) {
        if (e.cancelable) e.preventDefault(); // Prevent accidental scroll jitter while spinning 3D
        targetRotY += dx * 0.024;
        velY = dx * 0.024;
        prevX = currentX;
        prevY = currentY;
      }
      // If isHorizontalGesture === false (vertical drag):
      // DO NOT call e.preventDefault() -> Native browser page scroll handles it completely smoothly!
    };

    const onTouchEnd = () => {
      if (!isTouch) return;
      isTouch = false;
      // Quick tap detected
      if (totalMoved < 8) {
        targetRotY += Math.PI;
        setIsFlipped((prev) => !prev);
      }
      isHorizontalGesture = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    // Animation Loop
    const animate = () => {
      if (!alive) return;
      raf = requestAnimationFrame(animate);
      time += 0.02;

      if (!isDragging && !isTouch) {
        // Apply inertia decay
        targetRotY += velY;
        targetRotX += velX;
        velY *= 0.92;
        velX *= 0.92;

        // Subtle idle floating motion
        const idleBob = Math.sin(time * 1.5) * 0.07;
        const idleTilt = Math.sin(time) * 0.05;
        cardGroup.position.y = idleBob;

        // Spring return vertical tilt toward idle
        targetRotX += (idleTilt - targetRotX) * 0.04;
      }

      // Smooth interpolation
      rotY += (targetRotY - rotY) * 0.12;
      rotX += (targetRotX - rotX) * 0.12;

      cardGroup.rotation.y = rotY;
      cardGroup.rotation.x = rotX;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !alive) return;
      const newW = container.clientWidth || 240;
      const newH = container.clientHeight || 330;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
      geometry.dispose();
      faceGeo.dispose();
      frontTex.dispose();
      backTex.dispose();
      edgeMaterial.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [frontImage, backImage]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`.trim()}>
      {/* 3D Floating Canvas Container (Balanced medium size with touch-pan-y) */}
      <div
        ref={mountRef}
        className="relative w-[240px] sm:w-[260px] h-[330px] sm:h-[355px] flex items-center justify-center cursor-grab active:cursor-grabbing z-10 touch-pan-y"
        aria-label="Interactive 3D Floating Student Pass. Drag sideways to rotate 360 degrees or tap to flip."
      />

      {/* Dynamic Floor Shadow */}
      <div
        aria-hidden="true"
        className="w-40 sm:w-44 h-3.5 rounded-full bg-white/10 blur-md -mt-3 transition-all duration-300"
      />

      {/* Screen reader info for assistive tech */}
      <div className="sr-only">
        <h3>{profile.name}</h3>
        <p>UGM Student Pass</p>
        <p>{profile.tagline}</p>
        <p>{profile.education.school}</p>
      </div>
    </div>
  );
}

