"use client";

import { useEffect, useRef, useState } from "react";
import ParticleRing from "../ParticleRing";
import Button from "../core/Button";
import { heroCreators, imgSrc } from "@/data/site";

const HEADLINE = "Build the Brand Behind You.";

export const SQUAD = [
  {
    id: "strategist",
    name: "The Strategist",
    shortName: "Strategist",
    emoji: "🔍",
    role: "Moat Architect",
    level: "Lvl 5",
    img: "/images/figurines/strategist.webp",
    pillar: "AUTHORITATIVE POSITIONING",
    themeColor: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.35)",
    quote: "We dissect competitor blind spots & audience psychology so you capture uncontested authority before filming a single frame.",
    impact: "100% Uncontested Positioning",
    metric: "0 Paid Ad Spend Needed",
    talkBubble: "Chief! Paid ads rent attention that dies when budget stops. Organic authority builds a compound monopoly! 🔥",
    banter: "No shortcuts, Chief! Category leaders are built with defensible IP, not boosted posts!",
  },
  {
    id: "creator",
    name: "The Creator",
    shortName: "Creator",
    emoji: "✍️",
    role: "Viral Hook Architect",
    level: "Lvl 4",
    img: "/images/figurines/creator.webp",
    pillar: "VIRAL THUMB-STOP INFLUENCE",
    themeColor: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.35)",
    quote: "Translates your domain expertise into 1.2s dopamine hooks that freeze thumbs and demand loyal viewership.",
    impact: "+14.2M Avg Organic Impressions",
    metric: "89.4% 3s Hook Retention",
    talkBubble: "Chief! The first 1.2 seconds decides if your reel gets 1K views or 1M views. We engineer that hook! ⚡",
    banter: "Stop talking about yourself, Chief! Solve the exact pain point keeping your clients awake at night!",
  },
  {
    id: "director",
    name: "The Director",
    shortName: "Director",
    emoji: "🎥",
    role: "Camera Commander",
    level: "Lvl 5",
    img: "/images/figurines/director.webp",
    pillar: "EXECUTIVE CINEMATIC PRESENCE",
    themeColor: "#DB2777",
    glowColor: "rgba(219, 39, 119, 0.35)",
    quote: "Teleprompters & high-trust coaching so you only spend 4 hours a month in front of the lens with zero anxiety.",
    impact: "4 Hours / Month Founder Time",
    metric: "30 Days Video Buffer",
    talkBubble: "Camera shy? No problem, Chief! 2 guided shoot days gives you a full 30 days of high-retention reels! 🎬",
    banter: "Relax your shoulders, Chief! Speak your real domain knowledge — our cameras handle the rest!",
  },
  {
    id: "alchemist",
    name: "The Alchemist",
    shortName: "Alchemist",
    emoji: "🎧",
    role: "Sound & Foley Master",
    level: "Lvl 5",
    img: "/images/figurines/alchemist.webp",
    pillar: "PSYCHOLOGICAL RETENTION RHYTHM",
    themeColor: "#0891B2",
    glowColor: "rgba(8, 145, 178, 0.35)",
    quote: "Micro-cuts, audio foley, and pacing rhythms that eliminate dead air and keep viewers locked in past the 30s mark.",
    impact: "3x Higher Completion Rate",
    metric: "Custom Studio Foley Beats",
    talkBubble: "Chief! 73% watch reels on mute! Our kinetic typography and audio foley keep viewers glued! 🎧",
    banter: "Every micro-cut has a purpose! If a sentence can be 5 words instead of 12, cut the fluff!",
  },
  {
    id: "analyst",
    name: "The Analyst",
    shortName: "Analyst",
    emoji: "📊",
    role: "Algorithm Scientist",
    level: "Lvl 5",
    img: "/images/figurines/analyst.webp",
    pillar: "ALGORITHMIC VELOCITY & REACH",
    themeColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.35)",
    quote: "Models algorithmic curve dynamics and peak velocity windows to trigger Explore page viral distribution loops.",
    impact: "1.0B+ Organic Views Tracked",
    metric: "Multi-Platform Syndication",
    talkBubble: "Data before drama, Chief! We track Average Percentage Viewed to trigger organic algorithmic pushes! 📈",
    banter: "Forget vanity likes, Chief! Saves, shares, and watch time are the metrics that actually build authority!",
  },
  {
    id: "whisperer",
    name: "The Whisperer",
    shortName: "Whisperer",
    emoji: "💬",
    role: "Conversion Sage & Dealmaker",
    level: "Lvl 6",
    img: "/images/figurines/whisperer.webp",
    pillar: "HIGH-TICKET INBOUND DM FLOWS",
    themeColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.38)",
    quote: "Turns casual viewers into high-ticket clients through psychological DM nurturing and automated inbound dealflow.",
    impact: "+₹45L Pipeline Closed",
    metric: "78.6% DM Conversion Rate",
    talkBubble: "Chief! A million views is nice, but closed high-ticket deals in your inbox is what actually builds empires! 💰",
    banter: "We engineer comment triggers that funnel warm buyers straight into your calendar booking link!",
  },
  {
    id: "catalyst",
    name: "The Catalyst",
    shortName: "Catalyst",
    emoji: "⚡",
    role: "Trend Igniter & Accelerator",
    level: "Lvl 5",
    img: "/images/figurines/catalyst.webp",
    pillar: "EXPLORE VELOCITY & SPEED",
    themeColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.38)",
    quote: "Detects cultural momentum and algorithm triggers to turn everyday expertise into runaway breakout sensations.",
    impact: "10x Reach Acceleration",
    metric: "Explosive Explore Syndication",
    talkBubble: "Chief! When we ride the algorithmic wave early, your reels break out to non-followers worldwide! 🚀",
    banter: "Timing is everything! Catch the trend wave with your unique authority and watch numbers explode!",
  },
  {
    id: "builder",
    name: "The Builder",
    shortName: "Builder",
    emoji: "🚀",
    role: "Scale & Revenue General",
    level: "Lvl 6",
    img: "/images/figurines/builder.webp",
    pillar: "COMPOUNDING INBOUND PIPELINE",
    themeColor: "#2E5BFF",
    glowColor: "rgba(46, 91, 255, 0.40)",
    quote: "Automated DM conversion loops and inbound qualifying funnels that turn viral reach into booked high-ticket pipeline.",
    impact: "4.8x Inbound Pipeline Lift",
    metric: "Monetized Personal Moat",
    talkBubble: "Chief! All 8 studio minds are assembled and locked in your corner! Ready to deploy your organic engine? 🛡️",
    banter: "Why rent your audience when you can own your category? Claim your 90-day trajectory slot today!",
  },
];

export default function Hero() {
  const [chars, setChars] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [ringOn, setRingOn] = useState(false);
  const [go, setGo] = useState(false);
  

  // Entrance choreography
  useEffect(() => {
    const raf = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(raf);
  }, []);

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

  // Scroll-linked parallax (zero-dep rAF — was GSAP ScrollTrigger).
  // Fades + lifts the headline block slightly as the hero scrolls away.
  const parallaxRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.getElementById("hero");
    const el = parallaxRef.current;
    if (!hero || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      // 0 when hero fully in view → 1 when scrolled past
      const p = Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1);
      el.style.transform = `translate3d(0, ${(-32 * p).toFixed(1)}px, 0)`;
      el.style.opacity = (1 - 0.3 * p).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
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
      className={`editorial-section section-bg relative overflow-hidden flex flex-col justify-center items-center text-center ${go ? "hero-go" : ""}`}
      style={{ minHeight: "100svh" }}
    >
      {/* Particle ring */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ringOn ? 1 : 0 }}
        aria-hidden="true"
      >
        <ParticleRing />
      </div>

      {/* Main Container with generous responsive spacing */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center py-6 sm:py-10">
        
        {/* ============================================================
            HERO MAIN STAGE: REAL CREATOR PROOF + CENTER HEADLINE
            Human-first — no mascots.
           ============================================================ */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* ============================================================
              LEFT SIDE: REAL CREATOR PROOF (human-first — no mascots)
             ============================================================ */}
          <div
            className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-center select-none"
            aria-label="Real creators who trust Orgix"
          >

            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-soft">
              Real faces · Real growth
            </span>
            {heroCreators.slice(0, 2).map((c) => (
              <div
                key={c.handle}
                className="w-[220px] xl:w-[248px] flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur-md border border-line shadow-sm p-3 text-left transition-all hover:border-accent/50 hover:shadow-md"
              >
                <img
                  src={imgSrc(c.img)}
                  alt={c.role || c.handle}
                  width={52}
                  height={52}
                  loading="lazy"
                  decoding="async"
                  className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-2xs shrink-0"
                />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="font-display font-medium text-[13px] text-ink truncate">{c.handle}</div>
                  <div className="font-mono text-[9px] text-ink-soft uppercase tracking-wider truncate">{c.role}</div>
                  <div className="text-[10.5px] font-semibold text-accent">{c.followers} followers</div>
                </div>
              </div>
            ))}
          </div>

          {/* ============================================================
              CENTER: MAIN HERO TEXT ("Build the Brand Behind You.", Pills, CTAs)
             ============================================================ */}
          <div ref={parallaxRef} className="lg:col-span-6 hero-parallax-text flex flex-col items-center text-center px-2">
            {/* Authentic promise pill */}
            <div className="hero-rise hero-rise-1 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 border border-line shadow-xs mb-4 text-[11px] sm:text-[12px] font-mono tracking-wide text-ink select-none backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-semibold text-accent uppercase tracking-wider">100% Organic Growth</span>
              <span className="text-ink/30">|</span>
              <span className="text-ink-soft font-body font-medium">No Ads · No Bots · No Shortcuts</span>
            </div>

            <span className="hero-rise hero-rise-2 editorial-kicker mb-2.5">The Personal Branding Agency in India</span>

            {/* Giant Typewriter Headline: Build the Brand Behind You. */}
            <h1 className="display-h1 hero-long-headline text-center mb-2 select-none" aria-label={HEADLINE}>
              <span aria-hidden="true">
                {HEADLINE.slice(0, chars)}
                {!done && !reduced && <span className="type-caret" />}
              </span>
              <svg
                className="hero-swash"
                viewBox="0 0 420 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M6 16 C 90 6, 210 4, 414 10"
                  stroke="var(--accent)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 420,
                    strokeDashoffset: done ? 0 : 420,
                    transition: "stroke-dashoffset 900ms cubic-bezier(0.2, 0.8, 0.2, 1) 150ms",
                  }}
                />
              </svg>
            </h1>

            <p className="hero-rise hero-rise-3 body-editorial text-center max-w-xl mx-auto mb-6 leading-relaxed text-[15px] sm:text-[16px]">
              We turn expertise into personal brands that get noticed, trusted and remembered.
            </p>

            {/* CTAs */}
            <div className="hero-rise hero-rise-4 btn-actions-row justify-center mt-0 gap-3.5 mb-5">
              <Button variant="primary" href="/contact" onClick={handleBookCall} ariaLabel="Book a free call">
                Book a Free Call
              </Button>
              <Button variant="ghost" href="/work" ariaLabel="See our work">
                See Our Work <span aria-hidden="true">→</span>
              </Button>
            </div>

            {/* Verified Social Proof Pill */}
            <div className="hero-rise hero-rise-5 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/75 border border-line backdrop-blur-md shadow-2xs text-left select-none mb-2">
              <div className="flex -space-x-2">
                {heroCreators.slice(0, 4).map((c, i) => (
                  <img
                    key={c.handle}
                    src={imgSrc(c.img)}
                    alt={c.role || c.handle}
                    width={26}
                    height={26}
                    loading="eager"
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-[11.5px] sm:text-[12px] font-body text-ink-soft leading-tight">
                <span className="font-medium text-ink">✦ 85+ creators scaled</span> ·{" "}
                <span className="font-medium text-accent">▶ 1.0B+ organic views</span>
              </div>
            </div>

            
          </div>

          {/* ============================================================
              RIGHT SIDE: REAL CREATOR PROOF (human-first — no mascots)
             ============================================================ */}
          <div
            className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-center select-none"
            aria-label="Creators trusted across India"
          >

            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-soft">
              85+ creators scaled
            </span>
            {heroCreators.slice(2, 4).map((c) => (
              <div
                key={c.handle}
                className="w-[220px] xl:w-[248px] flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur-md border border-line shadow-sm p-3 text-left transition-all hover:border-accent/50 hover:shadow-md"
              >
                <img
                  src={imgSrc(c.img)}
                  alt={c.role || c.handle}
                  width={52}
                  height={52}
                  loading="lazy"
                  decoding="async"
                  className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-2xs shrink-0"
                />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="font-display font-medium text-[13px] text-ink truncate">{c.handle}</div>
                  <div className="font-mono text-[9px] text-ink-soft uppercase tracking-wider truncate">{c.role}</div>
                  <div className="text-[10.5px] font-semibold text-accent">{c.followers} followers</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile: real creator faces — human-first proof, no mascot */}
        <div className="flex lg:hidden flex-col items-center mt-4 gap-3 select-none">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-soft">
            Real faces · real growth · 85+ creators
          </span>
          <div className="flex -space-x-2.5">
            {heroCreators.map((c, i) => (
              <img
                key={c.handle}
                src={imgSrc(c.img)}
                alt={c.role || c.handle}
                width={44}
                height={44}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="w-11 h-11 rounded-full object-cover border-2 border-white"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Thin horizontal line draws left→right at section bottom */}
      <div className="hero-draw-line" aria-hidden="true" />

      {/* Scroll cue */}
      <a
        href="#manifesto-proof"
        aria-label="Scroll to see who trusts us"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 text-ink-soft hover:text-accent transition-colors"
      >
        <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase">Scroll</span>
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          aria-hidden="true"
          className="animate-bounce"
        >
          <path
            d="M7 2v14m0 0l5-5m-5 5l-5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
