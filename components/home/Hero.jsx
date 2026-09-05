"use client";

import { motion } from "framer-motion";
import Icon from "../core/Icon";
import { company, imgSrc } from "@/data/site";

// Drifting creator chips with real photos and live stats
const floatingChips = [
  {
    id: "pari",
    name: "Pari Jain",
    stat: "129K+ Organic",
    outcome: "Built from 0 to 129K",
    img: "/images/founders/pari-jain.jpg",
    badge: "FOUNDER",
    pos: "top-28 left-4 sm:left-10 lg:left-16",
    delay: 0,
    duration: 6.5,
  },
  {
    id: "tools",
    name: "Tools Fact",
    stat: "₹35L in Sales",
    outcome: "Content to Revenue",
    img: "/images/stories/tools-fact.jpg",
    badge: "D2C",
    pos: "top-20 right-4 sm:right-12 lg:right-24",
    delay: 1.2,
    duration: 7.2,
  },
  {
    id: "simran",
    name: "Simran Balar",
    stat: "1.4M+ Reach",
    outcome: "Lifestyle Authority",
    img: "/images/creators/simran-balraj.jpg",
    badge: "CREATOR",
    pos: "bottom-32 left-4 sm:left-14 lg:left-20",
    delay: 2.1,
    duration: 6.8,
  },
  {
    id: "shivam",
    name: "Shivam Careers",
    stat: "100K in 80 Posts",
    outcome: "Algorithmic Velocity",
    img: "/images/creators/shivam.jpg",
    badge: "TECH / AI",
    pos: "bottom-28 right-4 sm:right-16 lg:right-28",
    delay: 0.8,
    duration: 7.5,
  },
  {
    id: "demla",
    name: "Demla Brothers",
    stat: "Shark Tank S2",
    outcome: "Founder-Led Brand",
    img: "/images/creators/demla-brothers.jpg",
    badge: "CELLBELL",
    pos: "top-1/2 -translate-y-1/2 right-2 lg:right-6 hidden xl:flex",
    delay: 1.8,
    duration: 8.0,
  },
];

const trustAvatars = [
  "/images/founders/pari-jain.jpg",
  "/images/founders/anant-jain.jpg",
  "/images/creators/simran-balraj.jpg",
  "/images/creators/anuj-chhajerh.jpg",
  "/images/creators/royston-dias.jpg",
  "/images/creators/taranveer-jaura.jpg",
].map(imgSrc);

export default function Hero() {
  const handleStartGrowing = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "hero" } })
    );
  };

  const handleSeeResults = () => {
    const el = document.getElementById("showcase") || document.getElementById("work") || document.getElementById("cases");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-16 lg:pt-28 lg:pb-20">
      {/* ── 01. Full-Bleed Background Looping Client Video ──────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={imgSrc("/images/stories/pari-jain.jpg")}
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105 filter brightness-[0.7] contrast-[1.15]"
        >
          <source src="https://orgixmedia.com/uploads/vid_client1.mp4" type="video/mp4" />
          <source src="https://orgixmedia.com/uploads/vid_client2.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Navy Gradient Scrim — ensures copy contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f]/90 via-[#0a0a1f]/75 to-[#0a0a1f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a1f_80%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-accent/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* ── 02. Antigravity Drifting Follower-Count & Outcome Chips ──────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingChips.map((chip) => (
          <motion.div
            key={chip.id}
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
              x: [0, 6, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 + chip.delay * 0.2 },
              scale: { duration: 0.8, delay: 0.4 + chip.delay * 0.2 },
              y: {
                repeat: Infinity,
                duration: chip.duration,
                ease: "easeInOut",
                delay: chip.delay,
              },
              x: {
                repeat: Infinity,
                duration: chip.duration * 1.3,
                ease: "easeInOut",
                delay: chip.delay,
              },
            }}
            className={`absolute ${chip.pos} hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface/85 border border-white/10 backdrop-blur-xl shadow-card text-left`}
          >
            <img
              src={imgSrc(chip.img)}
              alt={chip.name}
              className="w-8 h-8 rounded-full object-cover border border-white/15 shrink-0"
              loading="lazy"
            />
            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-medium text-ink-primary truncate">
                  {chip.name}
                </span>
                <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-accent/15 text-accent border border-accent/25">
                  {chip.badge}
                </span>
              </div>
              <div className="text-[11px] font-mono text-accent font-semibold leading-tight">
                {chip.stat}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 03. Core Hero Content (Eyebrow + Large Headline + Sub + 2 CTAs) ──── */}
      <div className="container relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Eyebrow Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/90 border border-white/10 text-[11.5px] sm:text-[12px] font-mono tracking-wider uppercase text-ink-secondary mb-6 backdrop-blur-md shadow-subtle"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>100% ORGANIC · 1B+ VIEWS · 85+ CREATORS</span>
        </motion.div>

        {/* Large Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.75rem] sm:text-[3.75rem] md:text-[4.75rem] lg:text-[5.5rem] font-display font-normal tracking-[-0.035em] text-ink-primary leading-[1.02] mb-6"
        >
          Build the Brand <br />
          <span className="text-accent">Behind You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-body-md sm:text-body-lg md:text-[1.25rem] text-ink-secondary max-w-2xl mx-auto leading-relaxed font-light mb-9"
        >
          We turn expertise into personal brands that get noticed, trusted and remembered.
        </motion.p>

        {/* Two CTAs (Primary Filled + Secondary Text with Arrow) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            type="button"
            onClick={handleStartGrowing}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14.5px] hover:bg-[#d2f758] transition-all duration-200 shadow-[0_0_28px_-6px_rgba(196,240,66,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
            aria-label="Start growing your personal brand"
          >
            <span>Start Growing</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          <button
            type="button"
            onClick={handleSeeResults}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-ink-primary hover:text-accent font-body text-[14.5px] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            aria-label="See results and case studies"
          >
            <span>See Results</span>
            <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
          </button>
        </motion.div>

        {/* Social Proof Avatars Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-border/50"
        >
          <div className="flex -space-x-2.5 shrink-0" aria-hidden="true">
            {trustAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Scaled creator"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0a0a1f] ring-1 ring-white/10"
                loading="eager"
              />
            ))}
          </div>
          <div className="text-[12.5px] sm:text-[13px] text-ink-muted">
            Scaled <span className="text-ink-primary font-medium">85+ Creators &amp; Founders</span> across India ·{" "}
            <span className="font-mono text-accent">₹0 Ad Spend</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
