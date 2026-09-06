"use client";

import { useEffect, useRef, useState } from "react";
import { trustedBy } from "@/data/site";
import { sound } from "@/lib/sound";

// Rich verified impact data mapped to roster names
const CLIENT_EXTRAS = {
  "Royston Dias": {
    role: "Indian Cricketer · Athlete",
    handle: "@royston_dias313",
    work: "Turned organic Instagram reach into high-value speaking deals and commercial brand sponsorships.",
    highlight: "31.1K+ Followers",
    metric: "4.2M+ Views",
  },
  "Radical Era": {
    role: "Business Breakdown Media",
    handle: "@radicalera",
    work: "Deep business teardowns and viral case study reels achieving massive algorithmic discovery.",
    highlight: "185K+ Followers",
    metric: "28M+ Views",
  },
  "Demla Brothers": {
    role: "Founders · Cellbell (Shark Tank)",
    handle: "@demlabrothers",
    work: "Built dominant organic presence and founder authority before stepping onto Shark Tank India.",
    highlight: "Shark Tank Brand",
    metric: "100% Organic",
  },
  "Aarti Malhotra": {
    role: "Internet Mom & Creator",
    handle: "@aartimalhotra",
    work: "Relatable family storytelling and viral parenting reels that convert audience into brand loyalists.",
    highlight: "459K+ Followers",
    metric: "45M+ Views",
  },
  "Daisy Morgan": {
    role: "Founder · 9SKIN (Celebrity Brand)",
    handle: "@daisymorgan",
    work: "Expanded celebrity skincare footprint with high-retention founder authority content.",
    highlight: "30.6K+ Followers",
    metric: "3.2x Engagement",
  },
  "Ruchira": {
    role: "Cybersecurity Specialist",
    handle: "@cyberwithru",
    work: "Engineered complex tech frameworks into 60-second retention reels for global tech professionals.",
    highlight: "70.9K+ Followers",
    metric: "12M+ Views",
  },
  "Imarticus Learning": {
    role: "Education Brand · YouTube",
    handle: "@imarticus",
    work: "High-retention YouTube long-form scripting and multi-platform organic authority architecture.",
    highlight: "177K+ Subscribers",
    metric: "15M+ Minutes Watched",
  },
  "Kanikka Dewanii": {
    role: "Founder · Mintree (Shark Tank)",
    handle: "@kanikkadewanii",
    work: "Shark Tank featured beauty brand scaled without paid ad burn through authentic founder stories.",
    highlight: "Shark Tank Brand",
    metric: "66.7K+ Reach",
  },
  "Akash Pandey": {
    role: "Tech & Career Coach",
    handle: "@growithakash",
    work: "Scaled career consulting inbound pipeline 5x using high-retention kinetic reels.",
    highlight: "120K+ Followers",
    metric: "₹35L+ Deal Flow",
  },
  "Anuj Chhajerh": {
    role: "Skincare Specialist",
    handle: "@anujchhajerh",
    work: "Converted clinical expertise into a half-million audience with compounding organic retention.",
    highlight: "516K+ Community",
    metric: "60M+ Organic Views",
  },
  "Simran Balar Jain": {
    role: "Lifestyle & Social Impact",
    handle: "@simranbalarjain",
    work: "Seven-figure community built on authentic, courageous storytelling and high-retention video pacing.",
    highlight: "1.4M+ Followers",
    metric: "120M+ Views",
  },
  "Jyoti Goyal": {
    role: "Chartered Accountant & Finance",
    handle: "@ca.jyotigoyal",
    work: "Turned financial acumen into an undisputed personal brand with high-ticket consulting inbound.",
    highlight: "37.6K+ Followers",
    metric: "Top 1% Finance Voice",
  },
  "Shivam": {
    role: "Career & AI Creator",
    handle: "@shivamcareer",
    work: "Scaled from zero to 100K followers in just 80 posts using Orgix retention editing & viral scripts.",
    highlight: "0 → 100K in 80 Posts",
    metric: "18.5M+ Views",
  },
  "Cellbell": {
    role: "Gaming & Ergonomic Chairs",
    handle: "@cell_bell",
    work: "Elevated D2C brand perception through founder-led reels ahead of national Shark Tank showcase.",
    highlight: "Shark Tank Brand",
    metric: "10M+ Reach",
  },
  "Gaurav Mahawar": {
    role: "Personal Finance Creator",
    handle: "@gauravmahawar",
    work: "Turned dry tax and investment frameworks into viral reels that hold viewers past the 30-second mark.",
    highlight: "358K+ Followers",
    metric: "50M+ Views",
  },
  "Amit Arora": {
    role: "Investor · International Trade",
    handle: "@amit_aroraa",
    work: "High-ticket B2B client acquisition through authoritative personal branding videos.",
    highlight: "23.6K+ Followers",
    metric: "₹1.2Cr+ Pipeline",
  },
};

function ClientItem({ client, hidden, onSelect, isActive }) {
  const extra = CLIENT_EXTRAS[client.name];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(client);
      }}
      onMouseEnter={() => {
        if (window.innerWidth > 768) {
          onSelect(client);
        }
      }}
      className={`creator-marquee-item group cursor-pointer transition-all duration-300 select-none ${
        isActive ? "!border-accent shadow-[0_12px_28px_rgba(46,91,255,0.18)] scale-[1.03]" : ""
      }`}
      aria-hidden={hidden || undefined}
      title="Click to view verified creator outcome"
    >
      {/* Increased size avatar in full vivid color (No grayscale) */}
      <div className="relative shrink-0">
        <img
          src={client.img}
          alt={hidden ? "" : `${client.name} — ${client.tag}`}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full object-cover border-2 border-white shadow-[0_2px_8px_rgba(15,26,46,0.10)] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center text-[9px] font-bold border-2 border-white shadow-xs">
          ✓
        </span>
      </div>

      {/* Meta details with increased font clarity */}
      <div className="flex flex-col justify-center text-left pr-1">
        <div className="flex items-center gap-1.5">
          <b className="text-ink font-display text-[15px] sm:text-[15.5px] font-medium group-hover:text-accent transition-colors">
            {client.name}
          </b>
          {extra?.highlight && (
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold bg-accent/10 text-accent border border-accent/20">
              {client.followers}
            </span>
          )}
        </div>
        <span className="text-[12px] sm:text-[12.5px] text-ink-soft flex items-center gap-1.5 mt-0.5">
          <span>{client.tag}</span>
          <span className="text-[9px] text-ink-soft/60">•</span>
          <span className="font-mono text-accent font-semibold text-[11.5px] sm:hidden">
            {client.followers}
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-ink-soft/80">
            100% Organic
          </span>
        </span>
      </div>
    </div>
  );
}

function StatTile({ hidden }) {
  return (
    <div
      className="creator-marquee-stat select-none"
      role="presentation"
      aria-hidden={hidden || undefined}
    >
      <span className="creator-marquee-stat-num">
        85<span className="creator-marquee-stat-plus">+</span>
      </span>
      <span className="creator-marquee-stat-meta">
        creators scaled
        <i>1.0B+ organic views</i>
      </span>
    </div>
  );
}

export default function CreatorMarquee() {
  const viewportRef = useRef(null);
  const [activeClient, setActiveClient] = useState(null);
  const closeTimeoutRef = useRef(null);

  // Pause the marquee while it's off-screen; resume when visible again.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        viewport.classList.toggle("is-paused", !entry.isIntersecting);
      },
      { rootMargin: "80px 0px" }
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const handleSelectClient = (client) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    sound?.playPop?.();
    setActiveClient(client);
  };

  const handleMouseLeaveMarquee = () => {
    // Graceful debounce on desktop so moving cursor doesn't dismiss immediately
    closeTimeoutRef.current = setTimeout(() => {
      setActiveClient(null);
    }, 450);
  };

  const handleOpenConsultation = (client) => {
    sound?.playFanfare?.();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-consultation", {
          detail: {
            service: `Creator Scale Case: ${client?.name || "Client"}`,
            category: client?.tag || "Personal Branding",
          },
        })
      );
    }
  };

  const firstHalf = trustedBy.slice(0, Math.ceil(trustedBy.length / 2));
  const secondHalf = trustedBy.slice(Math.ceil(trustedBy.length / 2));

  const renderSequence = (copy) => (
    <>
      {firstHalf.map((c, i) => (
        <ClientItem
          key={`${copy}-a-${c.name}-${i}`}
          client={c}
          hidden={copy === 2}
          onSelect={handleSelectClient}
          isActive={activeClient?.name === c.name}
        />
      ))}
      <StatTile hidden={copy === 2} />
      {secondHalf.map((c, i) => (
        <ClientItem
          key={`${copy}-b-${c.name}-${i}`}
          client={c}
          hidden={copy === 2}
          onSelect={handleSelectClient}
          isActive={activeClient?.name === c.name}
        />
      ))}
    </>
  );

  const activeExtra = activeClient ? CLIENT_EXTRAS[activeClient.name] : null;

  return (
    <section
      id="manifesto-proof"
      className="creator-marquee min-h-[22vh] flex flex-col justify-center py-7 sm:py-8 select-none relative"
      aria-label="Trusted by founders and creators"
      onMouseLeave={handleMouseLeaveMarquee}
    >
      {/* Label and interactive hint */}
      <div className="flex items-center justify-center gap-2 mb-4 px-4 text-center">
        <p className="creator-marquee-label mb-0 text-center font-body text-[12px] sm:text-[12.5px] font-semibold tracking-[0.14em] uppercase text-ink-soft">
          Trusted by 85+ founders &amp; creators across India
        </p>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono text-accent bg-accent/10 border border-accent/25">
          Hover or tap any profile
        </span>
      </div>

      {/* Infinite track */}
      <div className="creator-marquee-viewport" ref={viewportRef}>
        <div className="creator-marquee-track flex items-center gap-6 sm:gap-8">
          {renderSequence(1)}
          {renderSequence(2)}
        </div>
      </div>

      {/* ============================================================
          RESPONSIVE DETAIL CARD POP-UP
          Fits phone, tablet, and desktop without screen overflow!
         ============================================================ */}
      {activeClient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveClient(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
            }}
            className="w-full max-w-[340px] sm:max-w-[370px] bg-white rounded-[24px] p-5 sm:p-6 border border-line shadow-[0_25px_60px_-10px_rgba(15,26,46,0.25)] relative overflow-hidden"
          >
            {/* Subtle brand glow accent */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-accent/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveClient(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-bg-alt hover:bg-ink hover:text-white flex items-center justify-center text-ink-soft text-xs font-bold transition-colors cursor-pointer"
              aria-label="Close detail card"
            >
              ✕
            </button>

            {/* Top row: Avatar + Identity */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                <img
                  src={activeClient.img}
                  alt={activeClient.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-accent/25"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-xs">
                  ✓
                </span>
              </div>

              <div className="min-w-0 pr-6">
                <div className="inline-block px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 mb-1">
                  Verified Client
                </div>
                <h4 className="font-display font-bold text-[18px] text-ink leading-tight truncate">
                  {activeClient.name}
                </h4>
                <p className="text-[12px] font-body text-ink-soft truncate mt-0.5">
                  {activeExtra?.role || activeClient.tag}
                </p>
                {activeExtra?.handle && (
                  <span className="font-mono text-[11px] text-accent font-semibold block mt-0.5">
                    {activeExtra.handle}
                  </span>
                )}
              </div>
            </div>

            {/* Metric pill row */}
            <div className="grid grid-cols-2 gap-2 mb-3.5 p-2.5 rounded-xl bg-bg border border-line">
              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-soft">
                  Audience Scale
                </span>
                <span className="font-display font-bold text-[16px] text-ink">
                  {activeClient.followers}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-soft">
                  Organic Benchmark
                </span>
                <span className="font-display font-bold text-accent text-[16px]">
                  {activeExtra?.metric || "100% Organic"}
                </span>
              </div>
            </div>

            {/* Work & Achievement highlight */}
            <div className="p-3 rounded-xl bg-bg-alt/70 border border-line/60 mb-4 text-[12.5px] font-body text-ink leading-relaxed">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-accent font-bold mb-1">
                ✦ Studio Impact:
              </span>
              &ldquo;{activeExtra?.work || "Scaled audience authority and high-retention video reach through Orgix organic growth systems."}&rdquo;
            </div>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={() => {
                setActiveClient(null);
                handleOpenConsultation(activeClient);
              }}
              className="w-full py-2.5 rounded-xl bg-ink hover:bg-accent text-white font-body font-medium text-[13px] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Build Strategy Like {activeClient.name.split(" ")[0]}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
