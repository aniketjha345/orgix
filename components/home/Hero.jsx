"use client";

import { useEffect, useState } from "react";
import ParticleRing from "../ParticleRing";
import Button from "../core/Button";
import { heroCreators, imgSrc } from "@/data/site";

const HEADLINE = "Grow Organically.";

/**
 * Hero — giant typewriter headline, one-line subtitle, two pills,
 * particle ring behind (fades in after the headline), real creator
 * trust pill, scroll cue + self-drawing baseline.
 */
export default function Hero() {
  const [chars, setChars] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [ringOn, setRingOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setChars(HEADLINE.length);
      setRingOn(true);
      return;
    }
    const step = 1200 / HEADLINE.length;
    const iv = setInterval(() => {
      setChars((c) => {
        if (c >= HEADLINE.length) {
          clearInterval(iv);
          return c;
        }
        return c + 1;
      });
    }, step);
    const ring = setTimeout(() => setRingOn(true), 1250);
    return () => {
      clearInterval(iv);
      clearTimeout(ring);
    };
  }, []);

  const done = chars >= HEADLINE.length;

  const handleBookCall = (e) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("open-consultation", { detail: { source: "hero" } })
      );
    }
  };

  return (
    <section
      id="hero"
      className="editorial-section section-bg relative overflow-hidden flex flex-col justify-center items-center text-center"
      style={{ minHeight: "100svh", scrollSnapAlign: "start" }}
    >
      {/* Particle ring — fades in after the headline */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ringOn ? 1 : 0 }}
        aria-hidden="true"
      >
        <ParticleRing />
      </div>

      <div className="editorial-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Urgent Exclusive Cohort Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-line shadow-xs mb-5 text-[11px] sm:text-[12px] font-mono tracking-wide text-ink select-none backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-semibold text-accent uppercase tracking-wider">Q2 Founder Cohort</span>
          <span className="text-ink/30">|</span>
          <span className="text-ink-soft font-body font-medium">3 of 5 Retainer Slots Filled</span>
        </div>

        <span className="editorial-kicker mb-4">Content-First Personal Branding</span>

        <h1 className="display-h1 text-center mb-6 select-none" aria-label={HEADLINE}>
          <span aria-hidden="true">
            {HEADLINE.slice(0, chars)}
            {!done && !reduced && <span className="type-caret" />}
          </span>
        </h1>

        <p className="body-editorial text-center max-w-2xl mx-auto mb-9 leading-relaxed">
          We help creators and brands grow on Instagram, LinkedIn and beyond — with organic content, not ads.
        </p>

        <div className="btn-actions-row justify-center mt-0 gap-3.5 mb-7">
          <Button variant="primary" href="/contact" onClick={handleBookCall} ariaLabel="Book a free call">
            Book a Free Call
          </Button>
          <Button variant="ghost" href="/work" ariaLabel="See our work">
            See Our Work <span aria-hidden="true">→</span>
          </Button>
        </div>

        {/* Verified Social Proof Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/70 border border-line backdrop-blur-md shadow-sm text-left select-none">
          <div className="flex -space-x-2">
            {heroCreators.slice(0, 4).map((c) => (
              <img
                key={c.handle}
                src={imgSrc(c.img)}
                alt={c.role || c.handle}
                width={26}
                height={26}
                className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full object-cover border-2 border-white"
              />
            ))}
          </div>
          <div className="text-[11.5px] sm:text-[12px] font-body text-ink-soft leading-tight">
            <span className="font-medium text-ink">85+ creators scaled</span> ·{" "}
            <span className="font-medium text-accent">1.0B+ organic views</span>
          </div>
        </div>
      </div>

      {/* Thin horizontal line draws left→right at section bottom (2s) */}
      <div className="hero-draw-line" aria-hidden="true" />
    </section>
  );
}
