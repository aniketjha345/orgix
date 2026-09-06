"use client";

import { useEffect, useState } from "react";
import Section from "@/components/core/Section";

const quotesData = [
  {
    id: "gaurav",
    quote:
      "Working with Orgix Media completely changed how I approach content. Their team turns complex ideas into sharp, engaging scripts that consistently hook viewers.",
    name: "Gaurav Mahawar",
    role: "Finance Creator · 287K+ followers",
    avatar: "/images/creators/gaurav-mahawar.jpg",
  },
  {
    id: "royston",
    quote:
      "They helped me grow my audience and, more importantly, attract high-quality leads through structured personal branding.",
    name: "Royston Dias",
    role: "Indian Cricketer · 31.1K+ followers",
    avatar: "/images/creators/royston-dias.jpg",
  },
  {
    id: "neha",
    quote:
      "Orgix Media took my production value to the next level. High-retention pacing and sharp edits made my videos far more enjoyable to watch.",
    name: "Neha",
    role: "Food & Lifestyle Creator",
    avatar: "/images/testimonials/neha.jpg",
  },
];

/**
 * SECTION 9 — TESTIMONIALS (100vh):
 * One quote at a time, auto-rotating 5s crossfade.
 * Large italic Playfair Display for quotes.
 * Client photo (greyscale, 48px circle) + name + title.
 * Giant " watermark 400px at 3% opacity behind.
 */
export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isPaused) return;
    const iv = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % quotesData.length);
        setFading(false);
      }, 450);
    }, 5000);
    return () => clearInterval(iv);
  }, [isPaused]);

  const go = (i) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => {
      setIdx(i);
      setFading(false);
    }, 350);
  };

  const q = quotesData[idx];

  return (
    <Section id="testimonials" bgAlt={true} className="select-none overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            08 / Client Proof
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            Real voices.
          </h2>
        </div>

        {/* Rotating quote viewport with Giant " Watermark */}
        <div className="relative w-full max-w-3xl mx-auto text-center px-4 reveal-visual is-revealed">
          {/* Giant " watermark 400px at 3% opacity behind */}
          <div
            aria-hidden="true"
            className="font-quote italic leading-none select-none pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 text-[320px] sm:text-[400px] z-0"
            style={{ color: "#0F1A2E", opacity: 0.03 }}
          >
            &ldquo;
          </div>

          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`rotator-quote relative z-10 transition-all duration-500 cursor-pointer ${
              fading ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
            style={{ minHeight: 220 }}
          >
            {/* Large italic Playfair Display for quotes */}
            <p className="font-quote italic text-[24px] sm:text-[32px] lg:text-[36px] text-ink leading-[1.38] mb-8 max-w-2xl mx-auto">
              &ldquo;{q.quote}&rdquo;
            </p>

            {/* Client photo (greyscale, 48px circle) + name + title */}
            <div className="flex items-center justify-center gap-3.5">
              <div className="color-wipe is-revealed rounded-full">
                <img
                  src={q.avatar}
                  alt={q.name}
                  className="w-12 h-12 rounded-full object-cover border border-line grayscale"
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <div className="font-display font-medium text-[16.5px] text-ink leading-tight">
                  {q.name}
                </div>
                <div className="text-[13px] font-body text-ink-soft mt-0.5">{q.role}</div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div
            className="flex items-center justify-center gap-3 mt-12"
            role="tablist"
            aria-label="Testimonials"
          >
            {quotesData.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === idx}
                aria-label={`Show testimonial from ${item.name}`}
                className={`rotator-dot ${i === idx ? "on" : ""}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
