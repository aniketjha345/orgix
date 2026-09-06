"use client";

import { useEffect, useState, useRef } from "react";
import { sound } from "@/lib/sound";

export const CHARACTERS = [
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
    chiefDialogue:
      "Chief! Don't create content blind. Rule #1 of organic monopoly: we dissect competitor blind spots and audience psychology so you capture uncontested authority before a single camera turns on!",
    headline: "Uncontested Moat & Authority Architecture",
    description:
      "Analyses your niche, audience, competitors, and content gaps before a single reel is written — so every move targets uncontested positioning with 0 paid ad spend.",
    impact: "100% Uncontested Positioning",
    metric: "0 Paid Ad Spend Needed",
    badge: "MOAT ARCHITECTURE",
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
    chiefDialogue:
      "Chief! You have only 1.2 seconds before viewers swipe away! I extract your raw lived expertise and turn it into dopamine hooks that freeze thumbs and demand loyal viewership!",
    headline: "1.2-Second Hook Psychology & Storytelling",
    description:
      "Translates your lived domain expertise into high-velocity scripts with 1.2s thumb-stopping hooks that hold viewer dopamine to the very last frame.",
    impact: "+14.2M Avg Organic Impressions",
    metric: "89.4% 3s Hook Retention",
    badge: "VIRAL SCRIPTING",
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
    chiefDialogue:
      "Chief! Never memorize scripts or fear the lens. We set up teleprompters, studio lighting, and executive coaching. You give us just 4 hours a month — we turn it into 30 days of retention content!",
    headline: "Zero-Friction Executive Directing Protocol",
    description:
      "Teleprompters, cinematic lighting, and camera coaching calibrated so you only spend 4 hours a month on camera with zero camera anxiety or prep work.",
    impact: "4 Hours / Month Founder Time",
    metric: "30 Days Video Buffer",
    badge: "DIRECTING PROTOCOL",
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
    chiefDialogue:
      "Chief! Hear that? Amateurs use generic stock music. We inject custom audio foley, whooshes, and micro-cuts that keep viewers hypnotized all the way past the 30-second drop point!",
    headline: "Dynamic Audio Foley & Micro-Cut Retention",
    description:
      "Micro-cuts, intentional sound cues, and pacing rhythms that eliminate dead air and keep viewers locked into your story past the critical 30-second mark.",
    impact: "3x Higher Completion Rate",
    metric: "Custom Studio Audio Foley",
    badge: "RETENTION CUTS",
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
    chiefDialogue:
      "Chief! Check the data stream! The algorithm doesn't guess, and neither do we. We monitor feed velocity curves and explore page triggers so every reel compounds exponentially!",
    headline: "Feed Telemetry & Explore Velocity",
    description:
      "Continuous algorithmic curve modeling, high-CTR cover testing, and peak publishing windows that trigger viral distribution loops across platforms.",
    impact: "1.0B+ Organic Views Tracked",
    metric: "Multi-Platform Syndication",
    badge: "EXPLORE TELEMETRY",
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
    chiefDialogue:
      "Victory at hand, Chief! Viral views are useless without revenue. We build automated DM conversion funnels and B2B qualification loops that turn reach into enterprise client pipeline!",
    headline: "Turning Media Attention into Enterprise Revenue",
    description:
      "Deploys automated DM conversion loops, comment relationship engines, and inbound qualifying funnels to turn viral views into booked high-ticket pipeline.",
    impact: "4.8x Inbound Pipeline Lift",
    metric: "Monetized Personal Moat",
    badge: "PIPELINE ENGINE",
  },
];

export default function HeroCharacterRotator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const len = CHARACTERS.length;
  const current = CHARACTERS[activeIdx];

  // Auto-slide every 4.2 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % len);
    }, 4200);

    return () => clearInterval(timerRef.current);
  }, [isPaused, len, activeIdx]);

  const handleSelect = (idx) => {
    sound.playPop();
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev - 1 + len) % len);
  };

  const handleNext = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev + 1) % len);
  };

  const handleLaunchTour = () => {
    sound.playFanfare();
    window.dispatchEvent(new CustomEvent("start-studio-tour"));
  };

  return (
    <div
      className="hero-rise hero-rise-6 mt-8 w-full max-w-5xl mx-auto px-3 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 
        CLASH OF CLANS STYLE: 
        Character stands on LEFT SIDE completely FREESTANDING (NO square box, NO border).
        Right side is the Speech Balloon / Game Mission HUD.
      */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
        
        {/* ============================================================
            LEFT SIDE: FREESTANDING 3D CHARACTER MODEL (NO BOX, NO BORDER!)
            Just like the Clash of Clans Villager standing freely on screen
           ============================================================ */}
        <div className="relative shrink-0 flex flex-col items-center select-none group/character cursor-pointer" onClick={handleNext}>
          {/* Ambient soft glow aura behind the freestanding character */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full blur-2xl pointer-events-none transition-colors duration-700 opacity-60"
            style={{ backgroundColor: current.glowColor }}
            aria-hidden="true"
          />

          {/* Freestanding 3D Mascot Image (NO SQUARE BOX CONTAINER) */}
          <div
            key={current.id}
            className="relative w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 flex items-end justify-center animate-fig-levitate transition-transform duration-300 group-hover/character:scale-105"
            title={`Chief! Tap to meet next studio mind (Current: ${current.name})`}
          >
            <img
              src={current.img}
              alt={current.name}
              className="w-full h-full object-contain drop-shadow-[0_24px_45px_rgba(15,26,46,0.32)]"
            />

            {/* Clash Level Medal floating beside character */}
            <div className="absolute top-4 right-1 px-2.5 py-1 rounded-full bg-[#0F1A2E] text-white font-mono text-[10px] uppercase tracking-wider font-bold shadow-lg border border-white/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{current.level}</span>
            </div>
          </div>

          {/* Freestanding Floating Ground Shadow under shoes */}
          <div
            className="w-32 sm:w-44 h-4 rounded-full bg-[#0F1A2E]/25 blur-xs animate-fig-shadow mt-1"
            style={{
              boxShadow: `0 0 25px 8px ${current.glowColor}`,
            }}
          />

          {/* Character Name & Role underneath */}
          <div className="mt-3 text-center">
            <div className="font-display font-medium text-[16px] sm:text-[18px] text-ink flex items-center justify-center gap-1.5">
              <span>{current.emoji}</span>
              <span>{current.name}</span>
            </div>
            <div className="font-mono text-[11px] text-accent font-semibold tracking-wide">
              {current.role}
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT SIDE: CLASH OF CLANS SPEECH BALLOON & WORK SHOWCASE
           ============================================================ */}
        <div className="flex-1 w-full max-w-xl text-left relative">
          {/* Main Speech Balloon Box */}
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-line/80 shadow-[0_20px_60px_rgba(15,26,46,0.12)] p-5 sm:p-7">
            
            {/* Speech bubble arrow pointing directly to the freestanding mascot on the left */}
            <div
              className="hidden md:block absolute top-12 -left-3 w-5 h-5 bg-white border-l-2 border-b-2 border-line/80 rotate-45"
              aria-hidden="true"
            />

            {/* Top Game Ribbon */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line/60">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full font-mono text-[9.5px] uppercase tracking-wider font-bold text-white shadow-xs"
                  style={{ backgroundColor: current.themeColor }}
                >
                  {current.pillar}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/5 font-mono text-[9.5px] uppercase tracking-wider text-ink-soft">
                  {current.badge}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 border border-line text-ink flex items-center justify-center font-mono text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  title="Previous mind"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 border border-line text-ink flex items-center justify-center font-mono text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                  title="Next mind"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Spoken Dialogue to Chief */}
            <div className="p-3 rounded-2xl bg-[#F6F4EF] border border-line/70 mb-3.5">
              <p className="font-body text-[13px] sm:text-[14px] text-ink leading-relaxed font-normal">
                &ldquo;{current.chiefDialogue}&rdquo;
              </p>
            </div>

            {/* Headline & Specific Work Detail */}
            <h4 className="font-display font-medium text-[17px] sm:text-[19px] text-ink mb-1">
              {current.headline}
            </h4>
            <p className="font-body text-[12.5px] sm:text-[13px] text-ink-soft leading-relaxed mb-4 font-light">
              {current.description}
            </p>

            {/* Tangible Metrics / Deliverable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-black/[0.02] border border-line/50 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-[10px] shrink-0">
                  ✦
                </span>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-wider text-ink-soft">
                    MEASURED IMPACT
                  </div>
                  <div className="font-semibold text-ink text-[12px]">
                    {current.impact}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                  ✓
                </span>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-wider text-ink-soft">
                    STUDIO DELIVERABLE
                  </div>
                  <div className="font-semibold text-ink text-[12px]">
                    {current.metric}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots + Clash Mode Trigger */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-line/50">
              {/* 6 Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {CHARACTERS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeIdx
                        ? "w-7 bg-accent"
                        : "w-2 bg-black/15 hover:bg-black/30"
                    }`}
                    title={`View ${c.name}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleLaunchTour}
                className="px-3.5 py-1.5 rounded-full bg-accent hover:bg-blue-600 text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                title="Launch full Clash of Clans studio onboarding walkthrough"
              >
                <span>⚔️ Start Studio Tour</span>
                <span className="text-[9px]">➔</span>
              </button>
            </div>
          </div>

          {/* Quick-Switch Archetype Tabs beneath Dialogue */}
          <div className="mt-3 flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-1">
            {CHARACTERS.map((c, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`px-2.5 py-1 rounded-full text-[10.5px] font-mono transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-ink text-white font-semibold shadow-xs"
                      : "bg-white/80 hover:bg-white border border-line text-ink-soft hover:text-ink shadow-2xs"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
