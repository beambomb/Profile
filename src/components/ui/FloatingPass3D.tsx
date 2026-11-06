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
    const width = container.clientWidth || 260;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "none";
    container.appendChild(canvas);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const movingLight = new THREE.PointLight(0xffffff, 1.5, 8);
    movingLight.position.set(0, 0, 3);
    scene.add(movingLight);

    // Build Card Geometry
    const cardWidth = 1.6;
    const cardHeight = 2.3;
    const radius = 0.16;
    const depth = 0.035;

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
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const frontTex = textureLoader.load(frontImage);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    const backTex = textureLoader.load(backImage);
    backTex.colorSpace = THREE.SRGBColorSpace;
    backTex.wrapS = THREE.RepeatWrapping;
    backTex.repeat.x = -1; // Mirror back image so text reads properly from the back

    // Materials
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.35,
      metalness: 0.85,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTex,
      roughness: 0.25,
      metalness: 0.2,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTex,
      roughness: 0.25,
      metalness: 0.2,
    });

    // Create 3D Card Mesh Group
    const cardGroup = new THREE.Group();

    // Body with beveled edges
    const bodyMesh = new THREE.Mesh(geometry, edgeMaterial);
    cardGroup.add(bodyMesh);

    // Front Face Plane
    const faceGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const frontFace = new THREE.Mesh(faceGeo, frontMaterial);
    frontFace.position.z = depth / 2 + 0.016;
    cardGroup.add(frontFace);

    // Back Face Plane
    const backFace = new THREE.Mesh(faceGeo, backMaterial);
    backFace.position.z = -(depth / 2 + 0.016);
    backFace.rotation.y = Math.PI;
    cardGroup.add(backFace);

    scene.add(cardGroup);

    // Interaction State
    let isDragging = false;
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

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      prevX = e.clientX;
      prevY = e.clientY;
      totalMoved = 0;
      velY = 0;
      velX = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      totalMoved += Math.abs(dx) + Math.abs(dy);

      targetRotY += dx * 0.018;
      targetRotX += dy * 0.015;

      // Limit vertical tilt so card doesn't flip upside down
      targetRotX = Math.max(-0.65, Math.min(0.65, targetRotX));

      velY = dx * 0.018;
      velX = dy * 0.015;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      // If user tapped without dragging, flip the card 180 degrees
      if (totalMoved < 8) {
        targetRotY += Math.PI;
        setIsFlipped((prev) => !prev);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    // Animation Loop
    const animate = () => {
      if (!alive) return;
      raf = requestAnimationFrame(animate);
      time += 0.02;

      if (!isDragging) {
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

      // Move specular highlight light with card rotation
      movingLight.position.x = Math.sin(rotY) * 2;
      movingLight.position.y = -Math.sin(rotX) * 2;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !alive) return;
      const newW = container.clientWidth || 260;
      const newH = container.clientHeight || 340;
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
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
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
      {/* 3D Floating Canvas Container */}
      <div
        ref={mountRef}
        className="relative w-[240px] sm:w-[260px] h-[310px] sm:h-[330px] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
        aria-label="Interactive 3D Floating Student Pass. Drag to rotate 360 degrees or tap to flip."
      />

      {/* Dynamic Floor Shadow */}
      <div
        aria-hidden="true"
        className="w-36 sm:w-44 h-3.5 rounded-full bg-white/10 blur-md -mt-4 transition-all duration-300"
      />

      {/* Interaction Hint */}
      <p className="mt-2 text-[10px] font-mono text-muted/70 tracking-wide select-none flex items-center gap-1.5">
        <span className="text-accent">⟲</span>
        <span>Drag to rotate 3D • Tap to flip</span>
      </p>

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
