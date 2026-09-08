"use client";

import { useEffect, useRef, useState } from "react";

export const transitions = {
  fast: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  normal: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  emphasis: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  cinematic: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

/**
 * Zero-dependency reveal hook — replaces framer-motion's whileInView.
 * Uses a single IntersectionObserver per element + the existing
 * `.reveal-item` / `.reveal-visual` CSS in globals.css (600ms, stagger
 * via transition-delay). Content is visible by default when JS is off,
 * reduced-motion is on, or the observer never fires (fallback timer).
 */
function useReveal({ y = 20, scale = false, delay = 0, duration = 0.6, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    // Safety net: never leave content hidden (e.g. observer blocked)
    const fallback = setTimeout(() => setInView(true), 2500);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            clearTimeout(fallback);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.05, rootMargin: "60px" }
    );
    io.observe(el);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, [once]);

  const style = {
    transitionDelay: delay ? `${Math.round(delay * 1000)}ms` : undefined,
    transitionDuration: duration ? `${Math.round(duration * 1000)}ms` : undefined,
    ...(inView
      ? null
      : y
        ? { transform: `translateY(${y}px)` }
        : scale
          ? { transform: `scale(${scale})` }
          : null),
  };

  return { ref, inView, style };
}

/**
 * FadeUp — progressive enhancement reveal that is always visible by default
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = "",
  once = true,
}) {
  const { ref, inView, style } = useReveal({ y, delay, duration, once });
  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-item${inView ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

/**
 * FadeIn — clean opacity reveal
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}) {
  const { ref, inView, style } = useReveal({ y: 0, delay, duration, once });
  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-item${inView ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

/**
 * ScaleIn — subtle expansion reveal
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.96,
  className = "",
  once = true,
}) {
  const { ref, inView, style } = useReveal({ y: 0, scale, delay, duration, once });
  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-visual${inView ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

/**
 * StaggerContainer & StaggerItem — CSS-delay stagger, no JS orchestration.
 * StaggerContainer simply reveals; children use StaggerItem with an
 * auto-incremented delay via CSS variable so markup order = stagger order.
 */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  once = true,
}) {
  const { ref, inView } = useReveal({ y: 0, delay, duration: 0.3, once });
  return (
    <div
      ref={ref}
      style={{ "--stagger-step": `${Math.round(stagger * 1000)}ms` }}
      className={`reveal-item${inView ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  y = 16,
  duration = 0.5,
  className = "",
}) {
  const { ref, inView, style } = useReveal({ y, delay: 0, duration });
  return (
    <div
      ref={ref}
      style={style}
      className={`reveal-item${inView ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
