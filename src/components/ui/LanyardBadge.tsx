"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { profile } from "@content";

export function LanyardBadge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability safely
    const isWebGLAvailable = () => {
      try {
        const testCanvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
            (testCanvas.getContext("webgl2") || testCanvas.getContext("webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 330;
    const height = container.clientHeight || 390;

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Studio Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88b0d0, 1.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // --- Compute Frustum Top Edge (Exact Flush Anchor) ---
    const computeWorldBounds = () => {
      const vFOV = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      return {
        topY: visibleHeight / 2,
        bottomY: -visibleHeight / 2,
        halfW: visibleWidth / 2,
      };
    };

    let bounds = computeWorldBounds();
    const topAnchorY = bounds.topY;

    // --- Metallic Top Wall Anchor (T-Bar / Clamp) ---
    const topAnchorGeom = new THREE.BoxGeometry(0.85, 0.08, 0.1);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x777777,
      metalness: 0.92,
      roughness: 0.2,
    });
    const topAnchorMesh = new THREE.Mesh(topAnchorGeom, metalMat);
    topAnchorMesh.position.set(0, topAnchorY - 0.04, 0);
    scene.add(topAnchorMesh);

    // --- Dynamic 3D Ribbon Strap ---
    const RIBBON_SEGMENTS = 28;
    const ribbonGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array((RIBBON_SEGMENTS + 1) * 2 * 3);
    const uvsArray = new Float32Array((RIBBON_SEGMENTS + 1) * 2 * 2);
    const indexArray: number[] = [];

    for (let i = 0; i < RIBBON_SEGMENTS; i++) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indexArray.push(a, b, c);
      indexArray.push(b, d, c);
    }

    for (let i = 0; i <= RIBBON_SEGMENTS; i++) {
      const t = i / RIBBON_SEGMENTS;
      uvsArray[i * 4] = 0;
      uvsArray[i * 4 + 1] = t;
      uvsArray[i * 4 + 2] = 1;
      uvsArray[i * 4 + 3] = t;
    }

    ribbonGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    ribbonGeom.setAttribute("uv", new THREE.BufferAttribute(uvsArray, 2));
    ribbonGeom.setIndex(indexArray);

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2b,
      roughness: 0.75,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    scene.add(ribbonMesh);

    // --- Badge Card Dimensions & Geometry ---
    const cardW = 2.35;
    const cardH = 3.4;
    const cardR = 0.18;
    const cardThick = 0.045;

    // Create 3D Rounded Card Shape
    const shape = new THREE.Shape();
    const x0 = -cardW / 2;
    const y0 = -cardH / 2;
    shape.moveTo(x0 + cardR, y0);
    shape.lineTo(x0 + cardW - cardR, y0);
    shape.quadraticCurveTo(x0 + cardW, y0, x0 + cardW, y0 + cardR);
    shape.lineTo(x0 + cardW, y0 + cardH - cardR);
    shape.quadraticCurveTo(x0 + cardW, y0 + cardH, x0 + cardW - cardR, y0 + cardH);
    shape.lineTo(x0 + cardR, y0 + cardH);
    shape.quadraticCurveTo(x0, y0 + cardH, x0, y0 + cardH - cardR);
    shape.lineTo(x0, y0 + cardR);
    shape.quadraticCurveTo(x0, y0, x0 + cardR, y0);

    const cardGeom = new THREE.ExtrudeGeometry(shape, {
      depth: cardThick,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.018,
      bevelThickness: 0.018,
    });
    cardGeom.center();

    // Map custom UV coordinates [0, 1] across front and back faces
    const posAttr = cardGeom.attributes.position;
    const customUvs = new Float32Array(posAttr.count * 2);
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      customUvs[i * 2] = (px + cardW / 2) / cardW;
      customUvs[i * 2 + 1] = (py + cardH / 2) / cardH;
    }
    cardGeom.setAttribute("uv", new THREE.BufferAttribute(customUvs, 2));

    // High-Resolution 2D Canvas Texture for Card Front
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 960;
    textureCanvas.height = 1420;
    const ctx = textureCanvas.getContext("2d");

    const renderCardTexture = (img?: HTMLImageElement) => {
      if (!ctx) return;
      const w = textureCanvas.width;
      const h = textureCanvas.height;

      // Base card dark gradient with crisp border
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#181818");
      grad.addColorStop(0.5, "#101010");
      grad.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Card outer hairline border
      ctx.strokeStyle = "#525252";
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, w - 10, h - 10);

      // Top Lanyard Punch Hole Cutout
      const holeW = 160;
      const holeH = 42;
      const holeX = (w - holeW) / 2;
      const holeY = 46;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(holeX, holeY, holeW, holeH, 21);
      ctx.fill();
      ctx.strokeStyle = "#5a5a5a";
      ctx.lineWidth = 4;
      ctx.stroke();

      // "UGM STUDENT PASS" Header Stripe
      ctx.fillStyle = "#aaaaaa";
      ctx.font = "600 32px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.letterSpacing = "6px";
      ctx.fillText("UGM STUDENT PASS", w / 2, 160);

      // Thin separator line
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 195);
      ctx.lineTo(w - 50, 195);
      ctx.stroke();

      // Portrait Photo
      const photoW = 560;
      const photoH = 640;
      const photoX = (w - photoW) / 2;
      const photoY = 245;

      // Photo frame background & border
      ctx.fillStyle = "#1e1e1e";
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 24);
      ctx.fill();
      ctx.strokeStyle = "#444444";
      ctx.lineWidth = 6;
      ctx.stroke();

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(photoX + 4, photoY + 4, photoW - 8, photoH - 8, 20);
        ctx.clip();
        ctx.drawImage(img, photoX + 4, photoY + 4, photoW - 8, photoH - 8);
        ctx.restore();
      }

      // Identity Details (Name, Dept, University)
      ctx.letterSpacing = "0px";
      ctx.textAlign = "center";

      // Full Name
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 48px system-ui, -apple-system, sans-serif";
      ctx.fillText("Johannes De Deo Dimas Aryobimo", w / 2, 980);

      // Department
      ctx.fillStyle = "#d4d4d4";
      ctx.font = "500 38px system-ui, -apple-system, sans-serif";
      ctx.fillText("Information Engineering", w / 2, 1050);

      // School
      ctx.fillStyle = "#999999";
      ctx.font = "400 34px system-ui, -apple-system, sans-serif";
      ctx.fillText(profile.education.school || "Universitas Gadjah Mada", w / 2, 1110);

      // Subtle bottom decorative stripe
      ctx.fillStyle = "#262626";
      ctx.fillRect(100, 1220, w - 200, 4);
    };

    renderCardTexture();
    const cardTexture = new THREE.CanvasTexture(textureCanvas);
    cardTexture.colorSpace = THREE.SRGBColorSpace;
    cardTexture.generateMipmaps = true;
    cardTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Load profile photo asynchronously
    const profileImg = new window.Image();
    profileImg.crossOrigin = "anonymous";
    profileImg.src = profile.photo || "/images/profile.jpg";
    profileImg.onload = () => {
      renderCardTexture(profileImg);
      cardTexture.needsUpdate = true;
    };

    // Card Back Texture
    const backCanvas = document.createElement("canvas");
    backCanvas.width = 960;
    backCanvas.height = 1420;
    const bCtx = backCanvas.getContext("2d");
    if (bCtx) {
      bCtx.fillStyle = "#121212";
      bCtx.fillRect(0, 0, 960, 1420);
      bCtx.strokeStyle = "#383838";
      bCtx.lineWidth = 10;
      bCtx.strokeRect(5, 5, 950, 1410);

      bCtx.fillStyle = "#444444";
      bCtx.font = "600 36px 'JetBrains Mono', monospace";
      bCtx.textAlign = "center";
      bCtx.letterSpacing = "4px";
      bCtx.fillText("UNIVERSITAS GADJAH MADA", 480, 680);
      bCtx.font = "400 28px 'JetBrains Mono', monospace";
      bCtx.fillStyle = "#333333";
      bCtx.fillText("FACULTY OF ENGINEERING", 480, 740);
    }
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    // Card Materials: front uses cardTexture, sides use dark satin
    const frontMat = new THREE.MeshStandardMaterial({
      map: cardTexture,
      roughness: 0.35,
      metalness: 0.08,
    });
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      roughness: 0.45,
      metalness: 0.25,
    });

    const cardMesh = new THREE.Mesh(cardGeom, [frontMat, sideMat]);

    // Card Group
    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);

    // Clasp & Swivel Hook Assembly (Silver Metallic)
    const claspGroup = new THREE.Group();
    claspGroup.position.set(0, cardH / 2 + 0.05, 0);

    const swivelGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.14, 16);
    const swivelMesh = new THREE.Mesh(swivelGeom, metalMat);
    claspGroup.add(swivelMesh);

    const snapRingGeom = new THREE.TorusGeometry(0.065, 0.016, 12, 24);
    const snapRingMesh = new THREE.Mesh(snapRingGeom, metalMat);
    snapRingMesh.position.set(0, -0.09, 0);
    claspGroup.add(snapRingMesh);

    cardGroup.add(claspGroup);
    scene.add(cardGroup);

    // --- Balanced Resting Position ---
    // Positions card beautifully parallel with "Hi, I'm Bimo" headline and bio
    const restPos = new THREE.Vector3(0, topAnchorY - 1.85, 0);
    const cardPos = restPos.clone();
    const cardVel = new THREE.Vector3(0, 0, 0);
    const targetPos = restPos.clone();

    // Rotations & angular velocities
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;
    let rotVelX = 0;
    let rotVelY = 0;
    let rotVelZ = 0;

    let isDragging = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();

    // --- Strap Curve & Mesh Update ---
    const updateStrap = () => {
      const p0 = new THREE.Vector3(0, topAnchorY, 0);
      const p2 = new THREE.Vector3(
        cardPos.x,
        cardPos.y + cardH / 2 + 0.14,
        cardPos.z
      );

      const mid = new THREE.Vector3(
        (p0.x + p2.x) * 0.5 - cardVel.x * 0.03,
        (p0.y + p2.y) * 0.5 - 0.1 - Math.max(0, -cardVel.y * 0.02),
        (p0.z + p2.z) * 0.5 - cardVel.z * 0.03
      );

      const positions = ribbonGeom.attributes.position as THREE.BufferAttribute;
      const curve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
      const points = curve.getPoints(RIBBON_SEGMENTS);

      for (let i = 0; i <= RIBBON_SEGMENTS; i++) {
        const pt = points[i];
        const t = i / RIBBON_SEGMENTS;
        const tangent = curve.getTangent(t).normalize();
        const normal = new THREE.Vector3(0, 0, 1);
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        const halfWidth = 0.11 * (1 - t * 0.35);
        positions.setXYZ(i * 2, pt.x - binormal.x * halfWidth, pt.y - binormal.y * halfWidth, pt.z - binormal.z * halfWidth);
        positions.setXYZ(i * 2 + 1, pt.x + binormal.x * halfWidth, pt.y + binormal.y * halfWidth, pt.z + binormal.z * halfWidth);
      }

      positions.needsUpdate = true;
      ribbonGeom.computeVertexNormals();
    };

    // --- Pointer & Touch Handlers ---
    const updateRaycaster = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
    };

    const onPointerDown = (e: PointerEvent) => {
      updateRaycaster(e.clientX, e.clientY);
      isDragging = true;
      setHasInteracted(true);
      container.style.cursor = "grabbing";

      dragPlane.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(0, 0, 1),
        cardPos
      );
      raycaster.ray.intersectPlane(dragPlane, intersectPoint);
    };

    const onPointerMove = (e: PointerEvent) => {
      updateRaycaster(e.clientX, e.clientY);

      if (isDragging) {
        if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
          const maxDist = 2.8;
          const delta = intersectPoint.clone().sub(new THREE.Vector3(0, topAnchorY, 0));
          if (delta.length() > maxDist) {
            delta.setLength(maxDist);
            intersectPoint.copy(new THREE.Vector3(0, topAnchorY, 0).add(delta));
          }
          targetPos.copy(intersectPoint);
        }
      }
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = "grab";
        targetPos.copy(restPos);
      }
    };

    // Mobile Touch Handlers
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      updateRaycaster(t.clientX, t.clientY);
      isDragging = true;
      setHasInteracted(true);

      dragPlane.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(0, 0, 1),
        cardPos
      );
      raycaster.ray.intersectPlane(dragPlane, intersectPoint);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      updateRaycaster(t.clientX, t.clientY);

      if (isDragging && raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
        const maxDist = 2.8;
        const delta = intersectPoint.clone().sub(new THREE.Vector3(0, topAnchorY, 0));
        if (delta.length() > maxDist) {
          delta.setLength(maxDist);
          intersectPoint.copy(new THREE.Vector3(0, topAnchorY, 0).add(delta));
        }
        targetPos.copy(intersectPoint);
      }
    };

    const onTouchEnd = () => {
      if (isDragging) {
        isDragging = false;
        targetPos.copy(restPos);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    // --- Animation & Physics Loop ---
    let animationFrameId: number;
    let prevTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const dt = Math.min((currentTime - prevTime) / 1000, 0.05);
      prevTime = currentTime;

      const timeSec = currentTime * 0.001;

      // Ambient idle swing when not being dragged
      if (!isDragging) {
        const idleSwingX = Math.sin(timeSec * 2.0) * 0.09;
        const idleSwingZ = Math.cos(timeSec * 1.5) * 0.03;
        targetPos.x = restPos.x + idleSwingX;
        targetPos.z = restPos.z + idleSwingZ;
        targetPos.y = restPos.y;
      }

      // 3D Spring Physics
      const springK = isDragging ? 48.0 : 22.0;
      const damping = isDragging ? 0.76 : 0.88;

      const force = targetPos.clone().sub(cardPos).multiplyScalar(springK);
      cardVel.add(force.multiplyScalar(dt));
      cardVel.multiplyScalar(damping);
      cardPos.add(cardVel.clone().multiplyScalar(dt));

      // Natural 3D Card Tilting & Rotations based on swing inertia
      const targetRotZ = -cardVel.x * 0.22 - (cardPos.x / 2.5) * 0.35;
      const targetRotX = cardVel.y * 0.18 + (cardPos.z / 2.0) * 0.25;
      const targetRotY = -cardVel.x * 0.28;

      rotVelZ += (targetRotZ - rotZ) * 25.0 * dt;
      rotVelZ *= 0.85;
      rotZ += rotVelZ * dt;

      rotVelX += (targetRotX - rotX) * 22.0 * dt;
      rotVelX *= 0.85;
      rotX += rotVelX * dt;

      rotVelY += (targetRotY - rotY) * 20.0 * dt;
      rotVelY *= 0.85;
      rotY += rotVelY * dt;

      // Apply positions & rotations to card mesh group
      cardGroup.position.copy(cardPos);
      cardGroup.rotation.set(rotX, rotY, rotZ);

      // Update Ribbon Geometry
      updateStrap();

      // Render Three.js Scene
      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !canvas) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bounds = computeWorldBounds();
      topAnchorMesh.position.y = bounds.topY - 0.04;
      restPos.y = bounds.topY - 1.85;
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      ribbonGeom.dispose();
      ribbonMat.dispose();
      cardGeom.dispose();
      frontMat.dispose();
      sideMat.dispose();
      cardTexture.dispose();
      backTexture.dispose();
      topAnchorGeom.dispose();
      metalMat.dispose();
      swivelGeom.dispose();
      snapRingGeom.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none pt-0 cursor-grab active:cursor-grabbing w-[270px] sm:w-[300px] lg:w-[320px] h-[350px] sm:h-[370px] lg:h-[390px]"
      style={{ touchAction: "none" }}
      aria-label="3D Interactive Lanyard Student ID Pass"
    >
      {/* Three.js Canvas Container - Anchored Flush to Top (0px gap from navbar border) */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="size-full block overflow-visible outline-none pointer-events-auto"
          aria-hidden="true"
        />
      ) : (
        /* Accessible Fallback when WebGL is unavailable (e.g. In jsdom / test suites) */
        <div className="relative w-[210px] rounded-2xl bg-[#0a0a0a] border-2 border-border-strong text-text shadow-2xl p-4 mt-6 text-center">
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

      {/* Subtle Interaction Hint - positioned right under the badge */}
      {!hasInteracted ? (
        <span className="absolute bottom-0 text-[10px] font-mono tracking-wider text-muted/50 animate-pulse pointer-events-none">
          ↕ drag or swing 3d lanyard
        </span>
      ) : null}
    </div>
  );
}
