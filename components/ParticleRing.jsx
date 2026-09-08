"use client";

import { useEffect, useRef } from "react";

export default function ParticleRing({ className = "", tone = "dark" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 90;
    const REPEL_DIST = 120;
    const DAMPING = 0.08;
    const SPRING_K = 0.045;
    const REV_SEC = 90;
    const COLOR = tone === "light" ? "rgba(255, 255, 255, 0.28)" : "rgba(15, 26, 46, 0.18)";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, animId = null, lastTime = 0, rot = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const dots = Array.from({ length: COUNT }, (_, i) => ({
      angle: (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.05,
      jitter: (Math.random() - 0.5) * 16,
      size: 1.5 + Math.random() * 1.0,
      x: 0, y: 0, vx: 0, vy: 0, init: false,
    }));

    const drawRing = (angleOffset = 0) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = COLOR;
      const cx = w / 2, cy = h / 2, r = 0.44 * Math.min(w, h);
      for (let i = 0; i < COUNT; i++) {
        const d = dots[i];
        const a = d.angle + angleOffset;
        const x = cx + Math.cos(a) * (r + d.jitter);
        const y = cy + Math.sin(a) * (r + d.jitter);
        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prefersReducedMotion) drawRing(0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onLeave = () => { mouse.active = false; };

    const render = (time) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      rot += ((Math.PI * 2) / REV_SEC) * dt;
      // Ring "breathes": radius oscillates ±3% every 4 seconds
      const breathe = 1 + 0.03 * Math.sin((time / 1000) * ((Math.PI * 2) / 4));

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = COLOR;
      const cx = w / 2, cy = h / 2, baseR = 0.44 * Math.min(w, h) * breathe;

      for (let i = 0; i < COUNT; i++) {
        const d = dots[i];
        const a = d.angle + rot;
        const tr = baseR + d.jitter;
        const tx = cx + Math.cos(a) * tr;
        const ty = cy + Math.sin(a) * tr;

        if (!d.init) {
          d.x = tx; d.y = ty; d.init = true;
        }

        if (mouse.active) {
          const dx = d.x - mouse.x, dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_DIST && dist > 0) {
            const force = (1 - dist / REPEL_DIST) * 2.8;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
        }

        d.vx = (d.vx + (tx - d.x) * SPRING_K) * (1 - DAMPING);
        d.vy = (d.vy + (ty - d.y) * SPRING_K) * (1 - DAMPING);
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    const isMobile = window.innerWidth < 768;

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (prefersReducedMotion || isMobile) {
      drawRing(0);
      return () => { window.removeEventListener("resize", resize); };
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });

    const onVisibility = () => {
      if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      } else if (!animId && onScreen) {
        lastTime = 0;
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause the rAF loop while the hero is off-screen — the canvas costs
    // a full repaint every frame and nobody can see it below the fold.
    let onScreen = true;
    let io = null;
    const start = () => {
      if (!animId && onScreen && !document.hidden) {
        lastTime = 0;
        animId = requestAnimationFrame(render);
      }
    };
    const stop = () => {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
    };
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
          if (onScreen) start();
          else stop();
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (io) io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`particle-ring-canvas absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
