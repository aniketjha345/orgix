"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleRing from "../ParticleRing";
import Button from "../core/Button";
import { heroCreators, imgSrc } from "@/data/site";
import { sound } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Grow Organically.";

export const SQUAD = [
  {
    id: "strategist",
    name: "The Strategist",
    shortName: "Strategist",
    emoji: "🔍",
    role: "Moat Architect",
    level: "Lvl 5",
    img: "/images/figurines/strategist.png",
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
    img: "/images/figurines/creator.png",
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
    img: "/images/figurines/director.png",
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
    img: "/images/figurines/alchemist.png",
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
    img: "/images/figurines/analyst.png",
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
    img: "/images/figurines/whisperer.png",
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
    img: "/images/figurines/catalyst.png",
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
    img: "/images/figurines/builder.png",
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pokedLeft, setPokedLeft] = useState(false);
  const [pokedRight, setPokedRight] = useState(false);
  const [sparkleLeft, setSparkleLeft] = useState(false);
  const [sparkleRight, setSparkleRight] = useState(false);
  const timerRef = useRef(null);

  const len = SQUAD.length;
  const current = SQUAD[activeIdx];
  const nextIdx = (activeIdx + 1) % len;
  const nextChar = SQUAD[nextIdx];

  // Auto-rotate the squad around the hero headline every 4.8s
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % len);
    }, 4800);

    return () => clearInterval(timerRef.current);
  }, [isPaused, len, activeIdx]);

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

  // GSAP scroll-linked parallax
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax-text", {
        y: -56,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, hero);

    return () => ctx.revert();
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

  const handlePokeLeft = () => {
    sound.playPop();
    setPokedLeft(true);
    setSparkleLeft(true);
    setTimeout(() => {
      setPokedLeft(false);
      setSparkleLeft(false);
    }, 900);
  };

  const handlePokeRight = () => {
    sound.playPop();
    setPokedRight(true);
    setSparkleRight(true);
    setTimeout(() => {
      setPokedRight(false);
      setSparkleRight(false);
    }, 900);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev - 1 + len) % len);
  };

  const handleNext = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev + 1) % len);
  };

  return (
    <section
      id="hero"
      className={`editorial-section section-bg relative overflow-hidden flex flex-col justify-center items-center text-center ${go ? "hero-go" : ""}`}
      style={{ minHeight: "100svh", scrollSnapAlign: "start" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
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
            HERO MAIN STAGE: LEFT MASCOT + CENTER HEADLINE + RIGHT MASCOT
            With Interactive Comic Talk Bubbles!
           ============================================================ */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* ============================================================
              LEFT SIDE: FREESTANDING 3D CHARACTER + INTERACTIVE TALK BUBBLE
             ============================================================ */}
          <div
            className="hidden lg:flex lg:col-span-3 flex-col items-center select-none group/left relative"
            title={`Chief! Tap to banter with ${current.name}`}
          >
            {/* Interactive Floating Talk Bubble (Above Left Character) */}
            <div
              onClick={handlePokeLeft}
              className="relative mb-3 w-[240px] xl:w-[270px] rounded-2xl bg-[#F6F4EF]/95 backdrop-blur-xl border border-line/90 p-3 text-ink shadow-[0_12px_28px_rgba(15,26,46,0.18)] cursor-pointer hover:border-accent transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Balloon tail pointing down toward mascot's head */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F6F4EF] border-r border-b border-line/90 rotate-45"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-1 pb-1 mb-1.5 border-b border-line/50 font-mono text-[9px]">
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: current.themeColor }}
                  />
                  <span className="font-bold text-accent uppercase">
                    {current.name}
                  </span>
                </div>
                <span className="text-[8.5px] text-ink-soft bg-black/5 px-1 rounded">
                  {current.level}
                </span>
              </div>
              <p className="font-body text-[11.5px] text-ink leading-snug font-normal text-left">
                {pokedLeft ? current.banter : current.talkBubble}
              </p>
            </div>

            {/* Mascot Figurine Container */}
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onClick={handlePokeLeft}
            >
              {/* Floating Sparkle Particles */}
              {sparkleLeft && (
                <div className="absolute -top-6 pointer-events-none flex items-center gap-1 text-sm animate-bounce z-20">
                  <span>✨</span>
                  <span>⭐</span>
                  <span>💫</span>
                </div>
              )}

              {/* Ambient radial aura behind the character */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 xl:w-56 xl:h-56 rounded-full blur-2xl pointer-events-none transition-colors duration-700 opacity-60"
                style={{ backgroundColor: current.glowColor }}
                aria-hidden="true"
              />

              {/* Freestanding 3D Mascot Image */}
              <div
                key={`left-${current.id}`}
                className={`relative w-44 h-68 xl:w-54 xl:h-80 flex items-end justify-center animate-fig-levitate transition-transform duration-300 group-hover/left:scale-105 ${
                  pokedLeft ? "-translate-y-4 scale-110 rotate-2" : ""
                }`}
              >
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-contain drop-shadow-[0_24px_45px_rgba(15,26,46,0.32)]"
                />

                {/* Level Medal */}
                <div className="absolute top-2 right-0 px-2 py-0.5 rounded-full bg-[#0F1A2E] text-white font-mono text-[9px] uppercase tracking-wider font-bold shadow-md border border-white/20">
                  {current.level}
                </div>
              </div>

              {/* Freestanding Ground Shadow */}
              <div
                className="w-32 xl:w-38 h-3 rounded-full bg-[#0F1A2E]/25 blur-xs animate-fig-shadow mt-1"
                style={{
                  boxShadow: `0 0 24px 6px ${current.glowColor}`,
                }}
              />

              {/* Character Identity & Controls */}
              <div className="mt-2.5 text-center flex flex-col items-center">
                <div className="font-display font-medium text-[15px] xl:text-[16px] text-ink flex items-center justify-center gap-1.5">
                  <span>{current.emoji}</span>
                  <span>{current.name}</span>
                </div>
                <div className="font-mono text-[10px] xl:text-[10.5px] text-accent font-semibold uppercase tracking-wider">
                  {current.role}
                </div>
                {/* Arrow to cycle */}
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-5 h-5 rounded-full bg-white border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center text-[10px] transition-colors cursor-pointer shadow-2xs"
                    title="Previous character"
                  >
                    ‹
                  </button>
                  <span className="font-mono text-[9px] text-ink-soft">
                    {activeIdx + 1}/{len}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-5 h-5 rounded-full bg-white border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center text-[10px] transition-colors cursor-pointer shadow-2xs"
                    title="Next character"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              CENTER: MAIN HERO TEXT ("Grow Organically.", Pills, CTAs)
             ============================================================ */}
          <div className="lg:col-span-6 hero-parallax-text flex flex-col items-center text-center px-2">
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

            {/* Giant Typewriter Headline: Grow Organically. */}
            <h1 className="display-h1 text-center mb-2 select-none" aria-label={HEADLINE}>
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
              We help creators and brands grow on Instagram, LinkedIn and beyond — with organic content, not ads.
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
                {heroCreators.slice(0, 4).map((c) => (
                  <img
                    key={c.handle}
                    src={imgSrc(c.img)}
                    alt={c.role || c.handle}
                    width={26}
                    height={26}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-[11.5px] sm:text-[12px] font-body text-ink-soft leading-tight">
                <span className="font-medium text-ink">✦ 85+ creators scaled</span> ·{" "}
                <span className="font-medium text-accent">▶ 1.0B+ organic views</span>
              </div>
            </div>

            {/* Squad Roster Rail: All 8 Characters at Chief's Command */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 max-w-lg select-none">
              <span className="text-[10px] font-mono text-ink-soft uppercase tracking-wider mr-1">
                Squad:
              </span>
              {SQUAD.map((sq, i) => {
                const isSelected = activeIdx === i;
                return (
                  <button
                    key={sq.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setActiveIdx(i);
                    }}
                    className={`px-2 py-0.5 rounded-full font-mono text-[9.5px] transition-all cursor-pointer flex items-center gap-1 border ${
                      isSelected
                        ? "bg-ink text-white border-ink font-bold shadow-xs scale-105"
                        : "bg-white/80 hover:bg-white text-ink-soft border-line hover:border-accent"
                    }`}
                    title={`Summon ${sq.name} (${sq.role}) to stage`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: sq.themeColor }}
                    />
                    <span>{sq.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              RIGHT SIDE: FREESTANDING 3D CHARACTER + INTERACTIVE TALK BUBBLE
             ============================================================ */}
          <div
            className="hidden lg:flex lg:col-span-3 flex-col items-center select-none group/right relative"
            title={`Chief! Tap to banter with ${nextChar.name}`}
          >
            {/* Interactive Floating Talk Bubble (Above Right Character) */}
            <div
              onClick={handlePokeRight}
              className="relative mb-3 w-[240px] xl:w-[270px] rounded-2xl bg-[#F6F4EF]/95 backdrop-blur-xl border border-line/90 p-3 text-ink shadow-[0_12px_28px_rgba(15,26,46,0.18)] cursor-pointer hover:border-accent transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Balloon tail pointing down toward mascot's head */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F6F4EF] border-r border-b border-line/90 rotate-45"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-1 pb-1 mb-1.5 border-b border-line/50 font-mono text-[9px]">
                <div className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: nextChar.themeColor }}
                  />
                  <span className="font-bold text-accent uppercase">
                    {nextChar.name}
                  </span>
                </div>
                <span className="text-[8.5px] text-white bg-accent px-1 rounded font-bold">
                  Next ➔
                </span>
              </div>
              <p className="font-body text-[11.5px] text-ink leading-snug font-normal text-left">
                {pokedRight ? nextChar.banter : nextChar.talkBubble}
              </p>
            </div>

            {/* Mascot Figurine Container */}
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onClick={handlePokeRight}
            >
              {/* Floating Sparkle Particles */}
              {sparkleRight && (
                <div className="absolute -top-6 pointer-events-none flex items-center gap-1 text-sm animate-bounce z-20">
                  <span>✨</span>
                  <span>⭐</span>
                  <span>💫</span>
                </div>
              )}

              {/* Ambient radial aura behind the character */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 xl:w-56 xl:h-56 rounded-full blur-2xl pointer-events-none transition-colors duration-700 opacity-40"
                style={{ backgroundColor: nextChar.glowColor }}
                aria-hidden="true"
              />

              {/* Freestanding 3D Mascot Image */}
              <div
                key={`right-${nextChar.id}`}
                className={`relative w-40 h-64 xl:w-50 xl:h-76 flex items-end justify-center animate-fig-levitate transition-transform duration-300 group-hover/right:scale-105 ${
                  pokedRight ? "-translate-y-4 scale-110 rotate-2" : ""
                }`}
                style={{ animationDelay: "1.5s" }}
              >
                <img
                  src={nextChar.img}
                  alt={nextChar.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(15,26,46,0.22)] opacity-85 group-hover:opacity-100"
                />

                {/* Level Medal */}
                <div className="absolute top-2 left-0 px-2 py-0.5 rounded-full bg-accent text-white font-mono text-[9px] uppercase tracking-wider font-bold shadow-md">
                  {nextChar.level}
                </div>
              </div>

              {/* Freestanding Ground Shadow */}
              <div
                className="w-28 xl:w-34 h-2.5 rounded-full bg-[#0F1A2E]/20 blur-xs animate-fig-shadow mt-1"
                style={{
                  boxShadow: `0 0 20px 5px ${nextChar.glowColor}`,
                }}
              />

              {/* Character Identity & Controls */}
              <div className="mt-2.5 text-center flex flex-col items-center">
                <div className="font-display font-medium text-[14px] xl:text-[15px] text-ink-soft flex items-center justify-center gap-1.5">
                  <span>{nextChar.emoji}</span>
                  <span>{nextChar.name}</span>
                </div>
                <div className="font-mono text-[10px] text-ink-soft/80 uppercase tracking-wider">
                  {nextChar.role}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-5 h-5 rounded-full bg-white border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center text-[10px] transition-colors cursor-pointer shadow-2xs"
                    title="Previous character"
                  >
                    ‹
                  </button>
                  <span className="font-mono text-[9px] text-ink-soft">
                    {nextIdx + 1}/{len}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-5 h-5 rounded-full bg-white border border-line text-ink-soft hover:text-accent hover:border-accent flex items-center justify-center text-[10px] transition-colors cursor-pointer shadow-2xs"
                    title="Next character"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================
            MOBILE / TABLET FREESTANDING CHARACTER (< lg screens)
            With Talk Bubble & Interactive Poking!
           ============================================================ */}
        <div
          className="flex lg:hidden flex-col items-center mt-6 select-none cursor-pointer group/mobile"
          onClick={handlePokeLeft}
        >
          {/* Mobile Talk Bubble */}
          <div className="relative mb-2.5 w-[260px] sm:w-[290px] rounded-2xl bg-[#F6F4EF]/95 border border-line p-2.5 text-ink shadow-sm">
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#F6F4EF] border-r border-b border-line rotate-45"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-line/40 font-mono text-[8.5px]">
              <span className="font-bold text-accent uppercase">
                {current.emoji} {current.name}
              </span>
              <span className="text-ink-soft">{current.level}</span>
            </div>
            <p className="font-body text-[11px] text-ink leading-snug">
              {pokedLeft ? current.banter : current.talkBubble}
            </p>
          </div>

          <div className="relative w-40 h-60 sm:w-48 sm:h-68 flex items-end justify-center animate-fig-levitate">
            <img
              src={current.img}
              alt={current.name}
              className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(15,26,46,0.28)]"
            />
            <div className="absolute top-2 right-0 px-2 py-0.5 rounded-full bg-[#0F1A2E] text-white font-mono text-[9px] uppercase tracking-wider font-bold shadow-md border border-white/20">
              {current.level}
            </div>
          </div>
          <div className="w-28 h-3 rounded-full bg-[#0F1A2E]/25 blur-xs animate-fig-shadow mt-1" />
          
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="w-6 h-6 rounded-full bg-white border border-line text-ink-soft flex items-center justify-center text-xs"
            >
              ‹
            </button>
            <span className="font-display font-medium text-[14px] text-ink">
              {current.name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="w-6 h-6 rounded-full bg-white border border-line text-ink-soft flex items-center justify-center text-xs"
            >
              ›
            </button>
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
