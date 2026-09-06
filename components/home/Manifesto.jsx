"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";

const LINES = [
  { pre: "We don't ", em: "run ads.", post: "" },
  { pre: "We don't ", em: "buy followers.", post: "" },
  { pre: "We ", em: "build digital identities", post: "" },
  { pre: "that ", em: "outlast algorithms.", post: "" },
];

/**
 * SECTION 3 — MANIFESTO (100vh, bg #ECE9E2):
 * 4 lines of bold text (64px). Progressive blur reveal on scroll:
 * all lines start blurred(4px) + opacity 0.3.
 * Current line in viewport: blur(0) + opacity 1.
 * Previous lines: slight fade back. No images.
 */
export default function Manifesto() {
  const rootRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIdx(LINES.length - 1);
      return;
    }

    const onScroll = () => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const h = window.innerHeight;
      
      // Calculate how far through the section the viewport is
      // rect.top starts at h (entering) down to -rect.height (leaving)
      const progress = Math.min(Math.max((h * 0.7 - rect.top) / (rect.height * 0.7), 0), 1);
      const step = Math.min(Math.floor(progress * LINES.length), LINES.length - 1);
      setActiveIdx(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="manifesto" bgAlt={true} className="text-center select-none">
      <div
        ref={rootRef}
        className="flex flex-col items-center text-center max-w-4xl mx-auto w-full py-6"
      >
        <span className="editorial-kicker mb-6 reveal-item reveal-stagger-1 is-revealed">
          01 / The Manifesto
        </span>
        <h2 className="display-h2 flex flex-col items-center justify-center gap-3 sm:gap-4">
          {LINES.map((line, i) => {
            let stateClass = "manif-upcoming";
            if (i === activeIdx) stateClass = "manif-active";
            else if (i < activeIdx) stateClass = "manif-past";

            return (
              <span
                key={line.em}
                className={`manif-line text-[32px] sm:text-[48px] lg:text-[64px] font-display font-semibold tracking-[-0.03em] leading-[1.08] ${stateClass}`}
              >
                {line.pre}
                <em className="manif-em">{line.em}</em>
                {line.post}
              </span>
            );
          })}
        </h2>

        {/* Progress — which conviction is on screen right now */}
        <span
          className="mt-6 font-mono text-[11px] tracking-[0.28em] text-ink-soft select-none"
          aria-live="polite"
        >
          {String(activeIdx + 1).padStart(2, "0")} / {String(LINES.length).padStart(2, "0")}
        </span>

        {/* Signature — the team behind the statement */}
        <div className="flex flex-col items-center gap-3 mt-10 sm:mt-12">
          <span
            className="w-10 h-px bg-ink/20"
            aria-hidden="true"
          />
          <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-ink-soft">
            One obsessive team · Rohini, Delhi
          </p>
        </div>
      </div>
    </Section>
  );
}
