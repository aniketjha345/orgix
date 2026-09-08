"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";

const quotesData = [
  {
    id: "royston",
    quote:
      "Working with Orgix Media has been a great experience. They helped me increase my followers and, more importantly, attract valuable, high quality leads through strategic content and personal branding. Their team understands how to create content that not only grows your audience but also brings real business opportunities.",
    name: "Royston Dias",
    role: "Indian Cricketer · 31.1K+ followers",
    since: "Client since 2022",
    avatar: "/images/creators/royston-dias.jpg",
  },
  {
    id: "gaurav",
    quote:
      "Working with Orgix Media has completely changed the way I approach content. Their team understands finance and knows how to turn complex topics into simple, engaging scripts that people actually want to watch. From content ideas and scripting to social media strategy, everything is well planned and executed. I’ve seen a clear improvement in my content quality, reach and overall personal brand. Highly recommended!",
    name: "Gaurav Mahawar",
    role: "Finance Creator · 287K+ followers",
    since: "Client since 2023",
    avatar: "/images/creators/gaurav-mahawar.jpg",
  },
  {
    id: "demla",
    quote:
      "Founder-led storytelling done right. Orgix Media built our organic presence around the Cellbell brand without relying on endless paid advertising. The consistency and video retention gave us real authority when stepping onto Shark Tank.",
    name: "Pawan & Chirag Demla",
    role: "Founders · Cellbell (Shark Tank Featured Brand)",
    since: "Client since 2023",
    avatar: "/images/creators/demla-brothers.jpg",
  },
  {
    id: "neha",
    quote:
      "Orgix Media took my food content to the next level. Their editing made my videos more engaging, professional and enjoyable to watch. They understand social media and know exactly how to keep viewers hooked. Highly recommended!",
    name: "Neha",
    role: "Food & Lifestyle Creator",
    since: "Client since 2024",
    avatar: "/images/testimonials/neha.jpg",
  },
];

/**
 * SECTION 9 — TESTIMONIALS (100vh):
 * One quote at a time, auto-rotating 5s crossfade.
 * Large italic Playfair Display for quotes.
 * Client photo (greyscale, 48px circle) + name + title.
 * Giant " watermark 400px at 3% opacity behind.
 */export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);
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

  const prev = () => go((idx - 1 + quotesData.length) % quotesData.length);
  const next = () => go((idx + 1) % quotesData.length);

  // Mobile swipe — touch-drag ≥48px flips the quote.
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) >= 48) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  // Arrow-key navigation — only while the section is on screen
  useEffect(() => {
    const onKey = (e) => {
      const el = sectionRef.current;
      if (!el || typeof el.getBoundingClientRect !== "function") return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const q = quotesData[idx];

  return (
    <Section id="testimonials" bgAlt={false} className="select-none overflow-hidden">
      <div ref={sectionRef} className="w-full max-w-4xl mx-auto flex flex-col items-center relative">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            12 / Written Client Reviews
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            In their own words.
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
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`rotator-quote relative z-10 transition-all duration-500 cursor-pointer ${
              fading ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
            style={{ minHeight: 220 }}
          >
            {/* Large italic Playfair Display for quotes */}
            <p className="font-quote italic text-[24px] sm:text-[32px] lg:text-[36px] text-ink leading-[1.38] mb-8 max-w-2xl mx-auto">
              &ldquo;{q.quote}&rdquo;
            </p>

            {/* 5-star rating — like the real orgixmedia.com written cards */}
            <div
              className="flex items-center justify-center gap-1 text-[17px] mb-6"
              style={{ color: "#f5a623" }}
              aria-label="5 out of 5 stars"
            >
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            {/* Client photo (greyscale, 48px circle) + name + title + tenure */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center justify-center gap-3.5">
                <div className="color-wipe is-revealed rounded-full">
                  <img
                    src={q.avatar}
                    alt={q.name}
                    className="w-12 h-12 rounded-full object-cover border border-line"
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
              <span className="testi-since font-mono text-[9.5px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-line bg-white text-ink-soft">
                ✓ {q.since}
              </span>
            </div>
          </div>

          {/* Controls: prev · counter · dots · next */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-12">
            <button
              type="button"
              onClick={prev}
              className="w-9 h-9 rounded-full border border-line bg-white hover:border-ink flex items-center justify-center text-ink transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div
              className="flex items-center gap-3"
              role="tablist"
              aria-label="Testimonials"
            >
              {quotesData.map((item, i) => {
                const isActive = i === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show testimonial from ${item.name}`}
                    className={`rotator-dot-wrap ${isActive ? "on" : ""}`}
                    onClick={() => go(i)}
                  >
                    {/* 5s progress arc — shows exactly when the next quote lands */}
                    <svg viewBox="0 0 36 36" aria-hidden="true">
                      <circle className="rotator-arc-bg" cx="18" cy="18" r="16" />
                      {isActive && !isPaused && (
                        <circle
                          className="rotator-arc"
                          cx="18"
                          cy="18"
                          r="16"
                          style={{
                            animation:
                              typeof window !== "undefined" &&
                              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                                ? "none"
                                : undefined,
                          }}
                        />
                      )}
                    </svg>
                    <span className="rotator-dot" />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              className="w-9 h-9 rounded-full border border-line bg-white hover:border-ink flex items-center justify-center text-ink transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          {/* Live counter — announces position to screen readers too */}
          <span
            className="block text-center font-mono text-[11px] tracking-[0.22em] text-ink-soft mt-5 select-none"
            aria-live="polite"
          >
            {String(idx + 1).padStart(2, "0")} / {String(quotesData.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </Section>
  );
}
