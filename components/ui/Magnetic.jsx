"use client";

import { useRef, useEffect } from "react";

/**
 * Magnetic — subtly pulls the wrapped element toward the pointer on desktop.
 * Restrained spring-style movement (never attached 1:1 to cursor coords).
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function Magnetic({ children, strength = 0.22, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      targetX = (e.clientX - (r.left + r.width / 2)) * strength;
      targetY = (e.clientY - (r.top + r.height / 2)) * strength;
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      rafId = null;
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      }
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic-wrap ${className}`} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}