"use client";

import { useEffect, useRef } from "react";
import { sound } from "@/lib/sound";

/**
 * ArchetypeCast — The Orgix Growth Engine Specialists Cast
 * Displays all 8 freestanding 3D figurine characters with concise,
 * compact descriptions drifting smoothly in a single continuous row
 * from Right to Left. Pauses on hover; manual arrow controls included.
 */
const CAST = [
  {
    n: "01",
    id: "strategist",
    emoji: "🔍",
    img: "/images/figurines/strategist.webp",
    name: "The Strategist",
    role: "Moat Architect",
    level: "Lvl 5",
    themeColor: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.35)",
    stage: "STAGE 01 · RESEARCH",
    tip: "Map uncontested category white space before shooting a frame.",
    desc: "Analyzes niche, audience psychographics, and competitor gaps to establish uncontested positioning.",
  },
  {
    n: "02",
    id: "creator",
    emoji: "✍️",
    img: "/images/figurines/creator.webp",
    name: "The Creator",
    role: "Hook Architect",
    level: "Lvl 4",
    themeColor: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.35)",
    stage: "STAGE 02 · SCRIPTING",
    tip: "Thumb-stopping hooks engineered from authentic lived expertise.",
    desc: "Turns founder knowledge into 1.2-second scroll-stopping hooks and psychological retention loops.",
  },
  {
    n: "03",
    id: "director",
    emoji: "🎥",
    img: "/images/figurines/director.webp",
    name: "The Director",
    role: "Camera Commander",
    level: "Lvl 5",
    themeColor: "#DB2777",
    glowColor: "rgba(219, 39, 119, 0.35)",
    stage: "STAGE 03 · DIRECTION",
    tip: "Two guided shoot days produce thirty days of high-authority reels.",
    desc: "Guides camera coaching, teleprompter pacing, and studio cinematography in our Delhi HQ.",
  },
  {
    n: "04",
    id: "alchemist",
    emoji: "🎧",
    img: "/images/figurines/alchemist.webp",
    name: "The Alchemist",
    role: "Sound & Foley",
    level: "Lvl 5",
    themeColor: "#0891B2",
    glowColor: "rgba(8, 145, 178, 0.35)",
    stage: "STAGE 04 · EDITING",
    tip: "Audio foley and micro-cuts that keep 73% mute viewers hooked.",
    desc: "Engineers kinetic captions, sound foley, and micro-cuts calibrated for maximum watch-time completion.",
  },
  {
    n: "05",
    id: "analyst",
    emoji: "📊",
    img: "/images/figurines/analyst.webp",
    name: "The Analyst",
    role: "Algorithm Scientist",
    level: "Lvl 5",
    themeColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.35)",
    stage: "STAGE 05 · METRICS",
    tip: "APV > 85% with peak timing triggers organic Explore discovery.",
    desc: "Models retention curve dynamics, high-CTR covers, and algorithmic distribution timing.",
  },
  {
    n: "06",
    id: "whisperer",
    emoji: "💬",
    img: "/images/figurines/whisperer.webp",
    name: "The Whisperer",
    role: "Conversion Sage",
    level: "Lvl 6",
    themeColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.35)",
    stage: "STAGE 06 · INBOUND",
    tip: "Turn viral comments into booked discovery calls & contracts.",
    desc: "Builds psychological comment-to-DM funnels that convert passive video viewers into high-ticket clients.",
  },
  {
    n: "07",
    id: "catalyst",
    emoji: "⚡",
    img: "/images/figurines/catalyst.webp",
    name: "The Catalyst",
    role: "Trend Igniter",
    level: "Lvl 5",
    themeColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    stage: "STAGE 07 · VELOCITY",
    tip: "Ride cultural momentum early for multi-million view breakouts.",
    desc: "Harnesses viral momentum and algorithmic syndication to catapult content into Explore sensations.",
  },
  {
    n: "08",
    id: "builder",
    emoji: "🚀",
    img: "/images/figurines/builder.webp",
    name: "The Builder",
    role: "Scale General",
    level: "Lvl 6",
    themeColor: "#2E5BFF",
    glowColor: "rgba(46, 91, 255, 0.40)",
    stage: "STAGE 08 · SCALE",
    tip: "All 8 specialists assembled to build an enduring monopoly.",
    desc: "Aligns all 8 studio minds under one roof to compound audience authority into long-term enterprise value.",
  },
];

export default function ArchetypeCast() {
  const railRef = useRef(null);

  const scrollLeft = () => {
    sound.playPop();
    if (railRef.current) {
      railRef.current.scrollBy({ left: -310, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    sound.playPop();
    if (railRef.current) {
      railRef.current.scrollBy({ left: 310, behavior: "smooth" });
    }
  };

  const handleCardClick = (c) => {
    sound.playClick();
    const el = document.getElementById("process");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 16 cards (8 + 8) for infinite continuous drift
  const railCast = [...CAST, ...CAST];

  return (
    <section
      id="cast"
      className="editorial-section section-bg-alt relative overflow-hidden select-none py-16 sm:py-22"
    >
      {/* Subtle radial backdrop ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(46,91,255,0.06), transparent 70%)",
        }}
      />

      <div className="editorial-container relative z-10 w-full px-4 sm:px-6">
        <div className="w-full flex flex-col items-center">
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="editorial-kicker mb-3 inline-block">
              04 / The Orgix Cast · Operating Specialists
            </span>
            <h2 className="display-h2 mb-4">
              Eight minds. One unstoppable engine.
            </h2>
            <p className="body-editorial text-center mx-auto text-[15px] sm:text-[16px] leading-relaxed">
              Every brand we build is operated by eight in-house specialists working as one unified machine. Hover any specialist to pause and inspect their briefing.
            </p>

            {/* Tactical Control Bar */}
            <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
              <span className="font-mono text-[11px] text-ink-soft bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-line">
                ✦ Drifting Right → Left · Hover to Pause
              </span>

              {/* Manual Nav Buttons */}
              <div className="inline-flex items-center gap-1.5 bg-white rounded-full p-1 border border-line shadow-2xs">
                <button
                  type="button"
                  onClick={scrollLeft}
                  className="w-7 h-7 rounded-full bg-bg-alt hover:bg-accent hover:text-white text-ink font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                  title="Scroll Left"
                  aria-label="Scroll specialists left"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={scrollRight}
                  className="w-7 h-7 rounded-full bg-bg-alt hover:bg-accent hover:text-white text-ink font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                  title="Scroll Right"
                  aria-label="Scroll specialists right"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SINGLE CONTINUOUS ROW DRIFTING RIGHT TO LEFT
          Adjusted, compact card sizes that fit content cleanly!
         ============================================================ */}
      <div ref={railRef} className="cast-rail-viewport">
        <div className="cast-rail-track">
          {railCast.map((c, idx) => (
            <article
              key={`${c.id}-${idx}`}
              onClick={() => handleCardClick(c)}
              className="cast-rail-card bg-gradient-to-b from-[#FFFFFF] via-[#FCFBF8] to-[#F7F5EE] rounded-[24px] border border-black/[0.08] shadow-[0_12px_32px_rgba(15,26,46,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_22px_48px_rgba(46,91,255,0.16)] hover:border-accent/50 transition-all duration-300 flex flex-col group/card overflow-hidden cursor-pointer select-none"
              title={`Tap to explore ${c.name}'s engine stage`}
            >
              {/* Compact Figurine Showcase Arch */}
              <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] to-[#EEEAE0] flex items-end justify-center pt-3 border-b border-black/[0.06]">
                {/* Ambient glow matching character color */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-35 group-hover/card:opacity-75 transition-opacity"
                  style={{ backgroundColor: c.glowColor }}
                />

                {/* Number Badge */}
                <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] font-mono text-[11px] font-bold text-ink flex items-center justify-center shadow-xs z-10">
                  {c.n}
                </span>

                {/* Level Tag */}
                <span
                  className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-wider font-bold text-white px-2 py-0.5 rounded-full shadow-xs z-10"
                  style={{ backgroundColor: c.themeColor }}
                >
                  {c.level}
                </span>

                {/* Freestanding 3D Figurine Image */}
                <img
                  src={c.img}
                  alt={`${c.name} — ${c.role}`}
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 h-[88%] w-auto object-contain drop-shadow-[0_12px_20px_rgba(15,26,46,0.22)] group-hover/card:scale-105 group-hover/card:-translate-y-1 transition-all duration-300"
                />

                {/* Ground shadow */}
                <div className="w-16 h-2 rounded-full bg-black/25 blur-2xs absolute bottom-1 z-0" />
              </div>

              {/* Compact Card Content Body */}
              <div className="p-4 sm:p-5 flex flex-col grow justify-between text-left">
                <div>
                  {/* Stage Pill */}
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-accent font-bold mb-1 flex items-center gap-1">
                    <span>{c.emoji}</span>
                    <span>{c.stage}</span>
                  </div>

                  {/* Character Name & Role */}
                  <h3 className="font-display font-medium text-[18px] text-ink leading-tight group-hover/card:text-accent transition-colors">
                    {c.name}
                  </h3>
                  <div className="text-[12px] font-body text-ink-soft italic mb-2">
                    {c.role}
                  </div>

                  {/* Concise Description */}
                  <p className="font-body text-[12px] text-ink-soft leading-snug line-clamp-2 mb-3">
                    {c.desc}
                  </p>
                </div>

                {/* Compact Studio Rule Pill & Link */}
                <div className="mt-auto pt-2 border-t border-black/[0.06]">
                  <div className="p-2.5 rounded-xl bg-white/90 border border-black/[0.06] text-[11px] font-body text-ink-soft leading-snug shadow-[0_2px_6px_rgba(15,26,46,0.02)]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold block mb-0.5">
                      ✦ Studio Rule:
                    </span>
                    &ldquo;{c.tip}&rdquo;
                  </div>

                  <div className="mt-2.5 inline-flex items-center justify-between w-full text-[11px] font-mono text-accent hover:underline">
                    <span>Explore engine stage</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}