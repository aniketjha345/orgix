"use client";

import { useEffect, useRef } from "react";
import Section from "../core/Section";

/**
 * SECTION 10 — PROCESS (100vh, bg #ECE9E2):
 * "How we grow you."
 * 4 steps horizontal with sine-wave connecting line that draws on scroll.
 * Steps light up sequentially. Numbers fill with accent #2E5BFF.
 */
const STEPS = [
  {
    n: "01",
    title: "Discovery",
    text: "We analyse your niche, audience and competitors before a single reel.",
  },
  {
    n: "02",
    title: "Strategy",
    text: "Hooks, scripts and pillars engineered to stop the scroll.",
  },
  {
    n: "03",
    title: "Create",
    text: "2 guided shoot days become 30 days of high-retention content.",
  },
  {
    n: "04",
    title: "Growth",
    text: "Strategic posting, community and DMs — engagement into pipeline.",
  },
];

export default function ProcessStrip() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const path = root.querySelector(".sine-draw");
    const nodes = root.querySelectorAll(".step-node");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path && path.classList.add("is-on");
      nodes.forEach((n) => n.classList.add("is-on"));
      return;
    }

    const timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        path && path.classList.add("is-on");
        nodes.forEach((n, i) => {
          timers.push(setTimeout(() => n.classList.add("is-on"), 350 + i * 320));
        });
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(root);

    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  return (
    <Section id="process" bgAlt={true} className="select-none">
      <div ref={rootRef} className="w-full flex flex-col items-center">
        {/* Header: ONE headline */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            09 / Method
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            How we grow you.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            One obsessive team running the full engine, end to end.
          </p>
        </div>

        {/* Sine-Wave Connecting Line That Draws on Scroll (Desktop) */}
        <svg
          className="hidden lg:block w-full max-w-[1200px] h-[48px] mb-[-8px]"
          viewBox="0 0 1200 48"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="sine-draw"
            d="M 60 24 Q 210 4, 360 24 T 660 24 T 960 24 T 1140 24"
            stroke="#2E5BFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* 4 Steps Horizontal (Numbers fill with accent #2E5BFF) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-[1200px] reveal-visual is-revealed">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="step-node device-mockup bg-white p-6 sm:p-7 flex flex-col rounded-[24px] border border-line shadow-device transition-all duration-500"
            >
              <span className="step-num inline-flex items-center justify-center w-11 h-11 rounded-full border border-line font-body text-[13px] font-semibold text-ink mb-5 transition-all duration-500">
                {s.n}
              </span>
              <h3 className="font-display font-medium text-[20px] text-ink tracking-tight mb-2">
                {s.title}
              </h3>
              <p className="font-body text-[13.5px] text-ink-soft leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
