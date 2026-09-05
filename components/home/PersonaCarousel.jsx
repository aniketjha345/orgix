"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Icon from "../core/Icon";
import { imgSrc } from "@/data/site";

// Real creators from orgixmedia.com — Pure Case Study Data (Zero Video)
const personaCases = [
  {
    id: "pari-jain",
    name: "Pari Jain",
    handle: "@officialparijain",
    role: "Founder & Creative Director",
    niche: "Founders",
    stat: "129K+ Organic",
    result: "Built from 0 to 129K, 100% organic",
    desc: "Turned raw business insights into scroll-stopping hooks and cinematic retention pacing, transforming an unranked profile into India's premier personal branding studio authority with ₹0 ad spend.",
    thumb: "/images/stories/pari-jain.jpg",
    avatar: "/images/founders/pari-jain.jpg",
    caseSlug: "/work",
  },
  {
    id: "tools-fact",
    name: "Tools Fact",
    handle: "@toolsfact",
    role: "AI & Software Media Brand",
    niche: "Tech",
    stat: "₹35L+ in Sales",
    result: "From content to ₹35L in sales",
    desc: "Restructured video scripts around high-intent 'Problem-Tool-Workflow' frameworks and DM automation, converting millions of casual views into over ₹35 Lakhs in direct software sales and sponsorships.",
    thumb: "/images/stories/tools-fact.jpg",
    avatar: "/images/stories/tools-fact.jpg",
    caseSlug: "/work",
  },
  {
    id: "demla-brothers",
    name: "Demla Brothers",
    handle: "@demlabrothers",
    role: "Co-Founders · Cellbell (Shark Tank S2)",
    niche: "Founders",
    stat: "Shark Tank S2",
    result: "Founder-led brand growth driving 4.8x B2B deals",
    desc: "Scaled founder personal brands through behind-the-scenes factory storytelling and startup lessons, turning national Shark Tank television fame into compounding B2B commercial equity.",
    thumb: "/images/creators/demla-brothers.jpg",
    avatar: "/images/creators/demla-brothers.jpg",
    caseSlug: "/work",
  },
  {
    id: "shivam-careers",
    name: "Shivam Careers",
    handle: "@shivamcareer",
    role: "Career & AI Creator",
    niche: "Tech",
    stat: "100K+ in 80 Posts",
    result: "100K followers in just 80 posts",
    desc: "Engineered visual cheat sheets, actionable screen walkthroughs, and 3-second hook loops, averaging 1,250 followers per post through algorithmic retention compounding.",
    thumb: "/images/stories/shivam-careers.jpg",
    avatar: "/images/creators/shivam.jpg",
    caseSlug: "/work",
  },
  {
    id: "ca-jyoti-goyal",
    name: "CA Jyoti Goyal",
    handle: "@ca.jyotigoyal",
    role: "Chartered Accountant & Tax Strategist",
    niche: "Finance",
    stat: "37.6K+ Authority",
    result: "300+ paid high-ticket client consultations",
    desc: "Translated complex tax law and GST codes into relatable consumer hacks and infographics, building massive trust and booking out private consulting calendars.",
    thumb: "/images/stories/ca-jyoti-goyal.jpg",
    avatar: "/images/creators/jyoti-goyal.jpg",
    caseSlug: "/work",
  },
  {
    id: "taranveer-jaura",
    name: "Taranveer Jaura",
    handle: "@techknowbee",
    role: "Tech Creator",
    niche: "Tech",
    stat: "280K+ Followers",
    result: "High-retention content that compounds",
    desc: "Paced long-form and short-form tech reviews with structured retention loops, building a dedicated audience that trusts his gadget and developer recommendations.",
    thumb: "/images/stories/taranveer-jaura.jpg",
    avatar: "/images/creators/taranveer-jaura.jpg",
    caseSlug: "/work",
  },
  {
    id: "gaurav-mahawar",
    name: "Gaurav Mahawar",
    handle: "@gauravmahawar",
    role: "Personal Finance Expert",
    niche: "Finance",
    stat: "358K+ Followers",
    result: "Complex finance turned into viral scripts",
    desc: "Turned mutual funds, stock analysis, and wealth frameworks into simple, high-retention video scripts that consistently achieve multi-million view distribution.",
    thumb: "/images/creators/gaurav-mahawar.jpg",
    avatar: "/images/creators/gaurav-mahawar.jpg",
    caseSlug: "/work",
  },
  {
    id: "alisha-chettri",
    name: "Alisha Chettri",
    handle: "@alishaa_chettri",
    role: "Lifestyle & Fashion Authority",
    niche: "D2C",
    stat: "25.5K+ Followers",
    result: "Conversations that close brand deals",
    desc: "Positioned her personal aesthetic for premium brand collaborations, turning everyday lifestyle engagement into long-term commercial partnerships.",
    thumb: "/images/stories/alisha-chettri.jpg",
    avatar: "/images/stories/alisha-chettri.jpg",
    caseSlug: "/work",
  },
  {
    id: "cellbell",
    name: "Cellbell",
    handle: "@cell_bell",
    role: "D2C Gaming & Office Chairs",
    niche: "D2C",
    stat: "Shark Tank Featured",
    result: "Elevated brand perception & organic demand",
    desc: "Crafted founder-led factory reels and ergonomic comparison videos that drove high-intent organic traffic without recurring Meta ad spend.",
    thumb: "/images/stories/cellbell.jpg",
    avatar: "/images/creators/cellbell.jpg",
    caseSlug: "/work",
  },
  {
    id: "royston-dias",
    name: "Royston Dias",
    handle: "@royston_dias313",
    role: "Indian Cricketer & Athlete",
    niche: "Fitness",
    stat: "31.1K+ Followers",
    result: "Turned reach into quality leads & partnerships",
    desc: "Showcased high-performance cricket training and mental discipline, attracting brand sponsorships and mentorship opportunities.",
    thumb: "/images/stories/royston-dias.jpg",
    avatar: "/images/creators/royston-dias.jpg",
    caseSlug: "/work",
  },
  {
    id: "ruchira",
    name: "Ruchira Pokhriyal",
    handle: "@cyberwithru",
    role: "Cybersecurity Creator",
    niche: "Tech",
    stat: "70.9K+ Followers",
    result: "High-retention edits that perform",
    desc: "Deconstructed cybersecurity hacks, digital fraud protection, and privacy workflows with dynamic typographic overlays and retention editing.",
    thumb: "/images/stories/ruchira-pokhriyal.jpg",
    avatar: "/images/creators/ruchira.jpg",
    caseSlug: "/work",
  },
  {
    id: "bhavit-patil",
    name: "Bhavit Patil",
    handle: "@bhavitpatil",
    role: "Spiritual Guide & Author",
    niche: "Founders",
    stat: "21.8K+ Followers",
    result: "From reels to 180 event attendees",
    desc: "Structured mindful meditation reels that fostered an intimate community, converting social reach into sold-out in-person retreats.",
    thumb: "/images/stories/bhavit-patil.jpg",
    avatar: "/images/creators/bhavit-patil.jpg",
    caseSlug: "/work",
  },
];

const audienceTabs = [
  { id: "all", label: "All Cases" },
  { id: "Founders", label: "Founders & Shark Tank" },
  { id: "Tech", label: "Tech & AI" },
  { id: "Finance", label: "Finance & Tax" },
  { id: "D2C", label: "D2C & Lifestyle" },
];

function PersonaCard({ item, isSelected, onClick, onHoverChange }) {
  return (
    <article
      data-cursor="CASE"
      onClick={onClick}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`shrink-0 w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl overflow-hidden bg-surface-muted border transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 group relative select-none ${
        isSelected
          ? "border-accent shadow-[0_0_24px_-8px_rgba(196,240,66,0.35)] ring-1 ring-accent"
          : "border-border hover:border-accent/60 hover:shadow-2xl"
      }`}
      style={{ aspectRatio: "9/14" }}
    >
      {/* Background Poster Image */}
      <img
        src={imgSrc(item.thumb)}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-[#0a0a1f]/50 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a1f]/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-ink-primary">
          {item.niche.toUpperCase()}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a1f]/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-accent font-semibold">
          {item.stat}
        </span>
      </div>

      {/* Center Case Indicator (Zero Video) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a0a1f]/85 backdrop-blur-md border border-white/20 text-white shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-[#0a0a1f] group-hover:border-accent transition-all duration-300">
          <Icon name="arrow" size={13} />
          <span className="text-[11.5px] font-mono font-medium">View Case Study</span>
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="relative z-10 pointer-events-none">
        <h3 className="text-[17px] font-display font-medium text-white mb-0.5 truncate">
          {item.name}
        </h3>
        <div className="text-[11.5px] font-mono text-accent/90 mb-1.5 truncate">
          {item.handle} · {item.role}
        </div>
        <p className="text-[12px] text-white/85 leading-snug font-light line-clamp-2">
          &ldquo;{item.result}&rdquo;
        </p>
      </div>
    </article>
  );
}

export default function PersonaCarousel() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCase, setSelectedCase] = useState(personaCases[0]);
  const [activeDossier, setActiveDossier] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const pauseTimerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredList = useMemo(() => {
    if (activeTab === "all") return personaCases;
    return personaCases.filter((c) => c.niche === activeTab);
  }, [activeTab]);

  // Triplicate list for 100% seamless infinite scroll loop
  const loopedList = useMemo(() => {
    return [...filteredList, ...filteredList, ...filteredList];
  }, [filteredList]);

  // Reset scroll position on tab change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    setSelectedCase(filteredList[0]);
  }, [activeTab, filteredList]);

  // Continuous Auto-Scroll Engine (Silky smooth 60fps)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animId;
    let lastTime = performance.now();
    const speed = 40; // pixels per second

    const step = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && el) {
        el.scrollLeft += speed * delta;
        const singleLoopWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleLoopWidth) {
          el.scrollLeft -= singleLoopWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, loopedList]);

  const handlePause = (paused) => {
    setIsPaused(paused);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // Resume auto-scroll after 2.5 seconds
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 2500);
    }
  };

  const handleCardClick = (item) => {
    setSelectedCase(item);
    setActiveDossier(item);
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="cases">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>03 — PERSONA CAROUSEL</span>
            </div>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-3">
              People who <span className="text-accent">became brands.</span>
            </h2>
            <p className="text-body-md text-ink-secondary font-light">
              Real creators. Real follower growth. Real commercial leverage. Tab through categories to explore documented outcomes.
            </p>
          </div>

          {/* Carousel Manual Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-surface-elevated hover:bg-accent hover:text-[#0a0a1f] text-ink-primary border border-border hover:border-accent flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-surface-elevated hover:bg-accent hover:text-[#0a0a1f] text-ink-primary border border-border hover:border-accent flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
          {audienceTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-body transition-all duration-200 whitespace-nowrap cursor-pointer border shrink-0 ${
                  isActive
                    ? "bg-accent text-[#0a0a1f] font-semibold border-accent shadow-[0_0_16px_-4px_rgba(196,240,66,0.4)]"
                    : "bg-surface text-ink-secondary hover:text-ink-primary border-border hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Infinite Auto-Scrolling Row (Zero Scrollbar Track) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => handlePause(true)}
          onMouseLeave={() => handlePause(false)}
          onTouchStart={() => handlePause(true)}
          onTouchEnd={() => handlePause(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none"
        >
          {loopedList.map((item, idx) => {
            const isSelected = selectedCase?.id === item.id;
            return (
              <PersonaCard
                key={`${item.id}-${idx}`}
                item={item}
                isSelected={isSelected}
                onClick={() => handleCardClick(item)}
                onHoverChange={handlePause}
              />
            );
          })}
        </div>

        {/* Selected Case Detail Drawer */}
        {selectedCase && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-surface/80 border border-border backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={imgSrc(selectedCase.avatar)}
                alt={selectedCase.name}
                className="w-14 h-14 rounded-full object-cover border border-white/15 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-display font-medium text-ink-primary">
                    {selectedCase.name}
                  </h3>
                  <span className="text-[11px] font-mono text-accent font-semibold px-2 py-0.5 rounded bg-accent/15">
                    {selectedCase.stat}
                  </span>
                </div>
                <div className="text-[12px] font-mono text-ink-muted mb-2">
                  {selectedCase.handle} · {selectedCase.role}
                </div>
                <p className="text-body-sm text-ink-secondary font-light max-w-2xl">
                  {selectedCase.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveDossier(selectedCase)}
                className="px-5 py-2.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[13.5px] hover:bg-[#d2f758] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_16px_-4px_rgba(196,240,66,0.35)]"
              >
                <Icon name="arrow" size={14} />
                <span>Read Case Dossier</span>
              </button>
              <Link
                href="/work"
                className="px-5 py-2.5 rounded-full bg-surface-elevated hover:bg-white/10 text-ink-primary border border-border text-[13.5px] font-body transition-colors flex items-center gap-1.5"
              >
                <span>All Case Studies</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Dossier Modal (100% Pure Case Study, Zero Video Elements) */}
      {mounted &&
        activeDossier &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveDossier(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden shadow-elevated p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-ink-primary flex items-center justify-center transition-colors cursor-pointer z-10"
                onClick={() => setActiveDossier(null)}
                aria-label="Close case dossier"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  CASE STUDY DOSSIER
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-[11px] font-mono text-ink-muted">
                  {activeDossier.niche.toUpperCase()}
                </span>
              </div>

              {/* Creator Profile Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
                <img
                  src={imgSrc(activeDossier.avatar || activeDossier.thumb)}
                  alt={activeDossier.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent/40 shrink-0"
                />
                <div>
                  <h3 className="text-2xl font-display font-medium text-ink-primary">
                    {activeDossier.name}
                  </h3>
                  <div className="text-sm font-mono text-accent font-medium mt-0.5">
                    {activeDossier.handle} · {activeDossier.role}
                  </div>
                </div>
              </div>

              {/* Outcome Highlight Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-surface-muted border border-border mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1">
                  Documented Outcome
                </div>
                <p className="text-lg sm:text-xl font-display text-ink-primary leading-snug">
                  &ldquo;{activeDossier.result}&rdquo;
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/80 text-center">
                  <div className="text-[10.5px] font-mono text-ink-muted uppercase">Growth / Scale</div>
                  <div className="text-base sm:text-lg font-display font-bold text-accent mt-0.5">
                    {activeDossier.stat}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/80 text-center">
                  <div className="text-[10.5px] font-mono text-ink-muted uppercase">Distribution</div>
                  <div className="text-base sm:text-lg font-display font-bold text-ink-primary mt-0.5">
                    100% Organic
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/80 text-center">
                  <div className="text-[10.5px] font-mono text-ink-muted uppercase">Industry</div>
                  <div className="text-base sm:text-lg font-display font-bold text-ink-primary mt-0.5 truncate">
                    {activeDossier.niche}
                  </div>
                </div>
              </div>

              {/* Strategy Breakdown */}
              <div className="mb-8">
                <h4 className="text-[12px] font-mono uppercase tracking-wider text-accent mb-2">
                  Orgix Strategy & Execution
                </h4>
                <p className="text-body-sm text-ink-secondary leading-relaxed font-light">
                  {activeDossier.desc}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <Link
                  href="/work"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent text-[#0a0a1f] font-semibold text-sm hover:bg-[#d2f758] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore All Case Studies</span>
                  <Icon name="arrow" size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveDossier(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-surface-elevated hover:bg-white/10 text-ink-secondary hover:text-ink-primary text-sm font-medium transition-colors cursor-pointer text-center"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
