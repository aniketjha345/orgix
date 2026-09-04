"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState(null); // 'VIEW' | 'DRAG' | 'HOVER' | null
  const [visible, setVisible] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const interactiveSelector =
      "a, button, [role='button'], [role='link'], [role='tab'], [role='checkbox'], input, select, textarea, summary, [tabindex]:not([tabindex='-1'])";

    const typeFromTarget = (el) => {
      const cursorTarget = el.closest("[data-cursor]");
      if (cursorTarget) return cursorTarget.getAttribute("data-cursor") || null;
      if (el.closest(interactiveSelector)) return "HOVER";
      return null;
    };

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target;
      if (!target) return;

      setCursorType(typeFromTarget(target));
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Keep the cursor coordinated with keyboard focus too, so the mode matches
    // the element the user is actually interacting with.
    const onFocusIn = (e) => {
      if (e.target && e.target.nodeType === 1) {
        setCursorType(typeFromTarget(e.target));
      }
    };
    const onFocusOut = () => setCursorType(null);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);

    const render = () => {
      const ease = 0.18;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      className={`custom-cursor-layer ${visible ? "is-visible" : "is-hidden"} ${cursorType ? `mode-${cursorType.toLowerCase()}` : ""}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        {cursorType === "VIEW" && <span className="cursor-badge">VIEW</span>}
        {cursorType === "DRAG" && <span className="cursor-badge">DRAG</span>}
      </div>
    </div>
  );
}
