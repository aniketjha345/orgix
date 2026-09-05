"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imgSrc } from "@/data/site";

const servicesData = [
  {
    id: "instagram",
    index: "01",
    eyebrow: "INSTAGRAM MANAGEMENT · REELS-FIRST GROWTH",
    title: "From profile to personal brand. Content that connects, compounds & converts.",
    desc: "We engineer an end-to-end Instagram media engine around your raw expertise. Strategy first — contrarian 3-second hooks, cinematic retention editing, and DM nurturing that converts casual viewers into high-ticket inbound clients.",
    features: [
      "Profile & Bio Architecture",
      "Hook-Based Retention Reels",
      "Scriptwriting & Storyboarding",
      "Organic Reach Analytics",
      "DM Funnel & Lead Capture",
      "Weekly Content Calendars",
    ],
    statValue: "128K+",
    statLabel: "Followers built from zero — Pari Jain",
    statSub: "100% Organic · ₹0 Ad Spend",
    tag: "REELS ENGINE",
    flipped: false,
    profiles: [
      {
        id: "pari",
        name: "Pari Jain",
        handle: "@officialparijain",
        role: "Personal Brand Strategist",
        followers: "128K",
        metric: "89.4% Avg Watch Time",
        subMetric: "10B+ Views Network",
        image: "/images/stories/pari-jain.jpg",
      },
      {
        id: "demla",
        name: "Demla Brothers",
        handle: "@demlabrothers",
        role: "Shark Tank India · Cellbell",
        followers: "28.3K",
        metric: "Viral Shark Tank Reach",
        subMetric: "Shark Tank India Partner",
        image: "/images/stories/demla-brothers.jpg",
      },
      {
        id: "jyoti",
        name: "CA Jyoti Goyal",
        handle: "@ca.jyotigoyal",
        role: "Finance & Investing Authority",
        followers: "36.7K",
        metric: "36.7K Inbound Investors",
        subMetric: "High-Ticket Advisory",
        image: "/images/stories/ca-jyoti-goyal.jpg",
      },
    ],
  },
  {
    id: "youtube",
    index: "02",
    eyebrow: "YOUTUBE & LONG-FORM · CATEGORY AUTHORITY",
    title: "Words that convert. High-retention hooks & scripts for category authority.",
    desc: "We craft compelling hooks and narrative architecture for long-form video that keep viewers glued, position you as the definitive authority in your niche, and compound through search and algorithm recommendations for months.",
    features: [
      "Viral Hook Architecture",
      "Long-Form Narrative Scripts",
      "Category Authority Positioning",
      "Algorithm Retention Loops",
      "CTR Title & Thumbnail Direction",
      "Multi-Platform Repurposing",
    ],
    statValue: "280K+",
    statLabel: "Audience scaled — Taranveer Jaura",
    statSub: "2.8M Views in 30 Days · Organic",
    tag: "VIDEO AUTHORITY",
    flipped: true,
    profiles: [
      {
        id: "taranveer",
        name: "Taranveer Jaura",
        handle: "@techknowbee",
        role: "Tech & Gadget Authority",
        followers: "280K",
        metric: "2.8M Views in 30 Days",
        subMetric: "Verified Blue Checkmark",
        image: "/images/stories/taranveer-jaura.jpg",
      },
      {
        id: "akash",
        name: "Akash Pandey",
        handle: "@growthwithakash",
        role: "Tech & Career Coach",
        followers: "120K",
        metric: "120K Category Followers",
        subMetric: "High-Ticket Inbound Leads",
        image: "/images/stories/akash-pandey.jpg",
      },
      {
        id: "toolsfact",
        name: "Tools Fact",
        handle: "@toolsfact",
        role: "Tools & EdTech Creator",
        followers: "100K",
        metric: "100K Followers Compound",
        subMetric: "Consistent Organic Engine",
        image: "/images/stories/tools-fact.jpg",
      },
    ],
  },
];

function ServiceBlock({ svc }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const profile = svc.profiles[activeIdx] || svc.profiles[0];

  const handleOpenConsultation = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { service: svc.eyebrow } })
    );
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
        svc.flipped ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      {/* Text Block */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        <div className="flex items-center gap-2 font-mono text-[11px] text-accent tracking-wider uppercase mb-3">
          <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/25">
            STAGE {svc.index}
          </span>
          <span className="text-ink-muted">·</span>
          <span className="text-ink-secondary">{svc.eyebrow}</span>
        </div>

        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-display font-normal text-ink-primary tracking-tight leading-[1.15] mb-4">
          {svc.title}
        </h3>

        <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-7">
          {svc.desc}
        </p>

        {/* 6 Scope Bullet Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-4 rounded-xl bg-surface/70 border border-border/80">
          {svc.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 text-[13px] text-ink-secondary font-body">
              <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[10px] shrink-0 font-bold">
                ✓
              </span>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Stat Benchmark + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-border/60">
          <div>
            <div className="text-[1.85rem] font-display font-medium text-accent leading-none mb-1">
              {svc.statValue}
            </div>
            <div className="text-[12.5px] font-body text-ink-secondary font-medium">
              {svc.statLabel}
            </div>
            <div className="text-[11px] font-mono text-ink-muted">
              {svc.statSub}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenConsultation}
            className="px-5 py-3 rounded-full bg-surface-elevated hover:bg-accent hover:text-[#0a0a1f] text-ink-primary border border-border hover:border-accent text-[13.5px] font-body font-medium transition-all duration-200 flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
          >
            <span>Get a Strategy</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Visual Showcase: Smartphone Mockup Stage */}
      <div className="lg:col-span-6 flex flex-col items-center">
        {/* Creator Profile Selector Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-surface/90 border border-border/80 mb-6 max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {svc.profiles.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[12px] font-body transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeIdx === idx
                  ? "bg-accent text-[#0a0a1f] font-medium shadow-sm"
                  : "text-ink-secondary hover:text-ink-primary hover:bg-white/5"
              }`}
            >
              <span>{p.name}</span>
              <span
                className={`text-[9.5px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  activeIdx === idx
                    ? "bg-[#0a0a1f]/20 text-[#0a0a1f]"
                    : "bg-surface-elevated text-ink-muted"
                }`}
              >
                {p.followers}
              </span>
            </button>
          ))}
        </div>

        {/* Smartphone Device Stage */}
        <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
          {/* Ambient Glow */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-accent/20 via-indigo-500/10 to-transparent blur-3xl rounded-full -z-10 pointer-events-none opacity-70" />

          {/* Top Floating Badge (Resting on top outer bezel, zero screen overlap) */}
          <div className="absolute -top-3 right-1 sm:-right-2 z-30 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0a0a1f]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[10.5px] font-mono font-semibold text-accent uppercase tracking-wider">
              100% ORGANIC
            </span>
            <span className="text-white/30 text-[9px] sm:text-[10px]">·</span>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono text-ink-muted">
              {profile.subMetric}
            </span>
          </div>

          {/* Bottom Floating Badge (Resting on bottom outer bezel, zero screen overlap) */}
          <div className="absolute -bottom-3 left-1 sm:-left-2 z-30 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0a0a1f]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none whitespace-nowrap">
            <span className="text-accent text-[11px] font-bold">↗</span>
            <span className="text-[11px] sm:text-[11.5px] font-display font-medium text-ink-primary">
              {profile.metric}
            </span>
            <span className="text-white/30 text-[9px] sm:text-[10px]">·</span>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono text-ink-muted">
              {profile.handle}
            </span>
          </div>

          {/* Smartphone Hardware Frame */}
          <div className="relative rounded-[40px] sm:rounded-[44px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2a2e4c] via-[#14172f] to-[#0a0c1e] border-2 border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(198,255,0,0.06)]">
            {/* Top speaker slit in outer frame bezel (above screen) */}
            <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mb-2" />

            {/* Side hardware buttons */}
            <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-white/30 rounded-l" />
            <div className="absolute -left-[3px] top-36 w-[3px] h-8 bg-white/30 rounded-l" />
            <div className="absolute -right-[3px] top-28 w-[3px] h-12 bg-white/30 rounded-r" />

            {/* Screen Bezel */}
            <div className="relative rounded-[30px] sm:rounded-[34px] overflow-hidden bg-white ring-1 ring-black/30 shadow-inner">
              {/* Instagram Profile Screenshot */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0.3, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full bg-white select-none"
                >
                  <img
                    src={imgSrc(profile.image)}
                    alt={`${profile.name} Instagram Profile Screenshot`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Live Caption Under Mockup */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11.5px] sm:text-[12px] font-mono text-ink-secondary text-center">
          <span className="text-accent">●</span>
          <span>Verified profile:</span>
          <span className="text-ink-primary font-medium">{profile.name}</span>
          <span className="text-ink-muted">({profile.handle})</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="showcase">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>02 — PRODUCT SHOWCASE</span>
          </div>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-4">
            We don&apos;t post content. <br />
            <span className="text-accent">We build personal brands.</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-ink-secondary leading-relaxed font-light">
            Antigravity-grade production delivered by our in-house team in Delhi. Real client profile screenshots from our live roster of 85+ founder brands.
          </p>
        </div>

        {/* Vertical Stack of Alternating Full-Bleed Blocks */}
        <div className="space-y-24 md:space-y-36">
          {servicesData.map((svc) => (
            <ServiceBlock key={svc.id} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}
