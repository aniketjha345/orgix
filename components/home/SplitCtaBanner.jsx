"use client";

import { useState } from "react";
import ParticleRing from "../ParticleRing";
import { company } from "@/data/site";
import { sound } from "@/lib/sound";

const ALL_CHARACTERS = [
  {
    id: "strategist",
    name: "The Strategist",
    shortName: "Strategist",
    role: "Moat Architect",
    level: "Lvl 5",
    themeColor: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.40)",
    img: "/images/figurines/strategist.png",
    bubble: "Chief! We map your category monopoly before filming a single frame! 🔍",
  },
  {
    id: "creator",
    name: "The Creator",
    shortName: "Creator",
    role: "Hook Architect",
    level: "Lvl 4",
    themeColor: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.40)",
    img: "/images/figurines/creator.png",
    bubble: "1.2-second hooks that freeze thumbs and demand attention! ✍️",
  },
  {
    id: "director",
    name: "The Director",
    shortName: "Director",
    role: "Camera Commander",
    level: "Lvl 5",
    themeColor: "#DB2777",
    glowColor: "rgba(219, 39, 119, 0.40)",
    img: "/images/figurines/director.png",
    bubble: "4 hours in our Delhi studio gives you 30 days of high-authority reels! 🎬",
  },
  {
    id: "alchemist",
    name: "The Alchemist",
    shortName: "Alchemist",
    role: "Sound & Foley",
    level: "Lvl 5",
    themeColor: "#0891B2",
    glowColor: "rgba(8, 145, 178, 0.40)",
    img: "/images/figurines/alchemist.png",
    bubble: "Micro-cuts & audio foley that keep 73% mute viewers glued! 🎧",
  },
  {
    id: "analyst",
    name: "The Analyst",
    shortName: "Analyst",
    role: "Algorithm Scientist",
    level: "Lvl 5",
    themeColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.40)",
    img: "/images/figurines/analyst.png",
    bubble: "Average Percentage Viewed > 85% to trigger organic explore reach! 📊",
  },
  {
    id: "whisperer",
    name: "The Whisperer",
    shortName: "Whisperer",
    role: "Conversion Sage",
    level: "Lvl 6",
    themeColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.40)",
    img: "/images/figurines/whisperer.png",
    bubble: "Turning viral views into booked client calls & high-ticket contracts! 💬",
  },
  {
    id: "catalyst",
    name: "The Catalyst",
    shortName: "Catalyst",
    role: "Trend Accelerator",
    level: "Lvl 5",
    themeColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.40)",
    img: "/images/figurines/catalyst.png",
    bubble: "Riding cultural momentum early to blow up your reach worldwide! ⚡",
  },
  {
    id: "builder",
    name: "The Builder",
    shortName: "Builder",
    role: "Scale General",
    level: "Lvl 6",
    themeColor: "#2E5BFF",
    glowColor: "rgba(46, 91, 255, 0.45)",
    img: "/images/figurines/builder.png",
    bubble: "All 8 studio minds are assembled and locked in your corner! 🚀",
  },
];

export default function SplitCtaBanner() {
  const [activeSpeech, setActiveSpeech] = useState(null);
  const [pokedId, setPokedId] = useState(null);

  const handlePrimary = () => {
    sound.playFanfare();
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "final-cta" } })
    );
  };

  const handleCharacterClick = (c) => {
    sound.playPop();
    setPokedId(c.id);
    setActiveSpeech(c);
    setTimeout(() => setPokedId(null), 800);
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden select-none py-16 sm:py-24 border-t border-white/10 w-full flex flex-col items-center"
      style={{ backgroundColor: "#0F1A2E", scrollSnapAlign: "start" }}
    >
      {/* Subtle Aurora Gradient Behind */}
      <div className="aurora-subtle" aria-hidden="true" />

      {/* Particle ring in light tone for dark signature theme */}
      <ParticleRing tone="light" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.25em] mb-3 inline-block font-semibold"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          14 / Start Growing Organically
        </span>

        {/* Punchy White Headline */}
        <h2 className="text-[34px] sm:text-[48px] md:text-[56px] font-display font-medium text-white tracking-tight mb-3 leading-tight">
          Ready to grow organically?
        </h2>

        <p
          className="text-[14px] sm:text-[16px] max-w-2xl mx-auto mb-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Tell us what you want to be known for — our 8 in-house specialists will map your custom 90-day trajectory with zero ad spend.
        </p>

        {/* Active Speech Balloon when Chief taps any character */}
        {activeSpeech && (
          <div className="mb-6 max-w-lg w-full mx-auto bg-[#16233B]/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/20 animate-in fade-in zoom-in-95 duration-150 flex items-center justify-between gap-3 text-left">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase mb-1">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeSpeech.themeColor }}
                />
                <span style={{ color: activeSpeech.themeColor }}>
                  {activeSpeech.name} ({activeSpeech.level})
                </span>
              </div>
              <p className="font-body text-[13px] text-white/95 leading-snug">
                {activeSpeech.bubble}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSpeech(null)}
              className="text-white/60 hover:text-white text-sm font-bold p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close message"
            >
              ✕
            </button>
          </div>
        )}

        {/* Primary White Pill Button */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <button
            type="button"
            onClick={handlePrimary}
            className="btn-pill inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 font-body text-[15px] font-semibold leading-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(255,255,255,0.25)] active:scale-95 bg-white text-[#0F1A2E] hover:bg-[#FAF8F5]"
            aria-label="Book your free strategy call"
          >
            <span>Book Your Free Strategy Call</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* ============================================================
            SQUAD LINEUP: ALL 8 CHARACTERS + YOU (100% VISIBLE)
            Direct render without ScrollTrigger opacity delay
           ============================================================ */}
        <div className="cta-cast w-full flex flex-col items-center">
          <div className="mb-4 font-mono text-[10.5px] tracking-[0.22em] uppercase text-white/60">
            ✦ All 8 In-House Specialists Assembled Behind Your Brand ✦
          </div>

          {/* Grid of All 8 Characters + YOU slot */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 sm:gap-3 items-end justify-center">
            {ALL_CHARACTERS.map((c) => {
              const isPoked = pokedId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleCharacterClick(c)}
                  className={`cta-cast-card flex flex-col items-center cursor-pointer group/char transition-all duration-200 select-none p-1.5 sm:p-2 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/[0.06] ${
                    isPoked ? "-translate-y-2 scale-105 bg-white/10 border-white/30" : "hover:-translate-y-1.5"
                  }`}
                  title={`Chief! Tap ${c.name} to hear briefing`}
                >
                  {/* 3D Figurine container */}
                  <div className="relative w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 flex items-end justify-center">
                    {/* Ambient glow matching character theme */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-45 group-hover/char:opacity-85 transition-opacity"
                      style={{ backgroundColor: c.glowColor }}
                    />
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover/char:scale-105 transition-transform"
                    />
                    {/* Level badge */}
                    <div
                      className="absolute top-0.5 right-0 text-[7px] font-mono px-1 py-0.2 rounded text-white font-bold uppercase shadow-md z-20"
                      style={{ backgroundColor: c.themeColor }}
                    >
                      {c.level}
                    </div>
                  </div>

                  {/* Ground shadow */}
                  <div className="w-10 sm:w-12 h-1.5 rounded-full bg-black/50 blur-2xs mt-1" />

                  {/* Character Name & Role Label */}
                  <div className="mt-1.5 text-center">
                    <div className="font-display text-[11px] sm:text-[12px] text-white font-semibold group-hover/char:text-accent transition-colors leading-tight">
                      {c.shortName}
                    </div>
                    <div className="font-mono text-[8px] sm:text-[8.5px] text-white/60 leading-tight mt-0.5">
                      {c.role}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* The 9th Slot: YOU (Next In Line) */}
            <div
              onClick={handlePrimary}
              className="cta-you-slot flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-dashed border-accent/80 hover:border-accent bg-accent/15 hover:bg-accent/25 cursor-pointer transition-all duration-200 group/you h-20 sm:h-24 md:h-28 shadow-[0_8px_25px_rgba(46,91,255,0.25)] hover:-translate-y-1"
              title="Chief! Tap to claim your slot!"
            >
              <div className="text-xl sm:text-2xl text-accent font-bold group-hover/you:scale-125 transition-transform">
                +
              </div>
              <div className="font-mono text-[9.5px] sm:text-[10px] font-bold text-white uppercase tracking-wider mt-0.5">
                YOU
              </div>
              <span className="font-mono text-[7.5px] sm:text-[8px] text-accent font-semibold tracking-wider mt-0.5">
                CLAIM SLOT
              </span>
            </div>
          </div>

          <a
            href={`mailto:${company.email}`}
            className="mt-8 font-body text-[12.5px] underline underline-offset-4 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Direct Delhi Studio Desk: {company.email} · {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
