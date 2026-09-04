"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Responsive sizing
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // 3D Particle system
    const PARTICLE_COUNT = 380;
    const particles = [];
    const sphereRadius = Math.min(width, height) * 0.42 || 220;

    // Colors matching brand: Lime (#c8f04d), Violet (#8b5cf6), Hot Pink (#ff3d7f), Cyan (#38bdf8)
    const colorPalette = [
      { r: 200, g: 240, b: 77 },   // Lime
      { r: 139, g: 92,  b: 246 },  // Violet
      { r: 255, g: 61,  b: 127 },  // Hot Pink
      { r: 56,  g: 189, b: 248 },  // Cyan
    ];

    // Fibonacci sphere distribution for uniform 3D distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Base radius with slight organic noise
      const rOffset = 0.92 + Math.random() * 0.16;
      const col = colorPalette[i % colorPalette.length];

      particles.push({
        origX: x * sphereRadius * rOffset,
        origY: y * sphereRadius * rOffset,
        origZ: z * sphereRadius * rOffset,
        x: x * sphereRadius * rOffset,
        y: y * sphereRadius * rOffset,
        z: z * sphereRadius * rOffset,
        vx: 0,
        vy: 0,
        vz: 0,
        size: 1.4 + Math.random() * 1.8,
        color: col,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Interactive pointer physics
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let isHovering = false;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.8;
      targetRotX = -ny * 1.8;
      mouseX = (e.clientX - rect.left) - width / 2;
      mouseY = (e.clientY - rect.top) - height / 2;
      isHovering = true;
    };

    const onPointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
      isHovering = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Intersection observer to pause rendering when offscreen (saves GPU/battery)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      time += 0.015;

      // Smooth rotation spring physics
      curRotX += (targetRotX - curRotX) * 0.06;
      curRotY += (targetRotY - curRotY) * 0.06;

      // Constant slow background orbit
      const autoAngleY = time * 0.25;
      const autoAngleX = Math.sin(time * 0.15) * 0.18;

      const totalRotX = curRotX + autoAngleX;
      const totalRotY = curRotY + autoAngleY;

      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);
      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      // Sort particles by Z depth for proper layering
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic breath oscillation
        const breath = 1 + Math.sin(time * 1.5 + p.pulseOffset) * 0.04;
        const bx = p.origX * breath;
        const by = p.origY * breath;
        const bz = p.origZ * breath;

        // Rotate around Y
        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;

        // Rotate around X
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Distance to pointer for interactive displacement
        if (isHovering) {
          const dx = x1 - mouseX;
          const dy = y2 - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 14400 && distSq > 0) { // 120px radius
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 120) * 18;
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }

        // Spring restitution
        p.vx *= 0.88;
        p.vy *= 0.88;
        const finalX = x1 + p.vx;
        const finalY = y2 + p.vy;

        // 3D Perspective Projection
        const scale = fov / (fov + z2 + 260);
        const screenX = cx + finalX * scale;
        const screenY = cy + finalY * scale;

        // Opacity based on depth (front is bright, back is soft)
        const alpha = Math.max(0.12, Math.min(0.95, (z2 + sphereRadius) / (sphereRadius * 2) * 0.9 + 0.1));

        projected.push({
          x: screenX,
          y: screenY,
          scale,
          z: z2,
          alpha,
          color: p.color,
          size: p.size * scale,
        });
      }

      // Sort by Z back to front
      projected.sort((a, b) => a.z - b.z);

      // Draw particle trails / constellation connections
      const maxConnectDist = 48;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < -40) continue; // Only connect foreground particles for performance and clarity

        // Connect only a few nearby neighbors
        for (let j = i + 1; j < Math.min(i + 7, projected.length); j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < maxConnectDist) {
            const lineAlpha = (1 - d / maxConnectDist) * 0.22 * p1.alpha;
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const rad = Math.max(0.6, p.size);

        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.fill();

        // Extra soft glow for prominent foreground particles
        if (p.z > 60 && rad > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.2})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-3d-canvas"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}
