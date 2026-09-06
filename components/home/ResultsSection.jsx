"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";

// SECTION 8 — EXACT 4 RESULTS CARDS
const resultsData = [
  {
    id: "pari",
    name: "Pari Jain",
    role: "Founder Authority",
    avatar: "/images/founders/pari-jain.jpg",
    metric: "0 → 129K followers",
    count: { to: 129, decimals: 0, prefix: "0 → ", suffix: "K followers" },
    timeframe: "120 days · 100% organic",
    submetric: "+129,000 net followers",
    graphPoints: [10, 18, 25, 38, 55, 78, 129],
    graphColor: "#2E5BFF",
  },
  {
    id: "tools",
    name: "Tools Fact",
    role: "Software & AI Media",
    avatar: "/images/stories/tools-fact.jpg",
    metric: "₹35L+ sales",
    count: { to: 35, decimals: 0, prefix: "₹", suffix: "L+ sales" },
    timeframe: "Inbound content revenue",
    submetric: "₹35,00,000+ direct conversions",
    graphPoints: [5, 12, 18, 26, 31, 33, 35],
    graphColor: "#0F1A2E",
  },
  {
    id: "shivam",
    name: "Shivam Careers",
    role: "Career & AI Coach",
    avatar: "/images/stories/shivam-careers.jpg",
    metric: "0 → 100K followers",
    count: { to: 100, decimals: 0, prefix: "0 → ", suffix: "K followers" },
    timeframe: "In just 80 posts",
    submetric: "1,250 avg followers / post",
    graphPoints: [0, 8, 22, 41, 65, 84, 100],
    graphColor: "#2E5BFF",
  },
  {
    id: "demla",
    name: "Demla Brothers",
    role: "Cellbell Founders",
    avatar: "/images/creators/demla-brothers.jpg",
    metric: "2.4M reach",
    count: { to: 2.4, decimals: 1, prefix: "", suffix: "M reach" },
    timeframe: "Shark Tank S2 featured",
    submetric: "100% algorithmic reach",
    graphPoints: [20, 35, 60, 95, 140, 190, 240],
    graphColor: "#0F1A2E",
  },
];

/**
 * CountUp — eases 0 → `to` over ~1.6s when scrolled into view.
 */
function CountUp({ to, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.05, rootMargin: "80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * GrowthGraph curve
 */
function GrowthGraph({ points, color = "#0F1A2E" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 280;
  const height = 80;
  const padding = 8;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    const y = height - padding - ((p - min) / range) * (height - padding * 2);
    return [x, y];
  });

  let d = `M ${coords[0][0]} ${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cx1 = prev[0] + (curr[0] - prev[0]) * 0.5;
    const cy1 = prev[1];
    const cx2 = prev[0] + (curr[0] - prev[0]) * 0.5;
    const cy2 = curr[1];
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr[0]} ${curr[1]}`;
  }

  const lastX = coords[coords.length - 1][0];
  const firstX = coords[0][0];
  const areaD = `${d} L ${lastX} ${height} L ${firstX} ${height} Z`;
  const lastCoord = coords[coords.length - 1];

  return (
    <div className="w-full h-[84px] relative my-2.5">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`res-grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={areaD} fill={`url(#res-grad-${color.replace("#", "")})`} />
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx={lastCoord[0]} cy={lastCoord[1]} r="4" fill={color} />
        <circle
          cx={lastCoord[0]}
          cy={lastCoord[1]}
          r="8"
          fill={color}
          opacity="0.25"
          className="animate-ping"
        />
      </svg>
    </div>
  );
}

/**
 * SECTION 8 — RESULTS CAROUSEL:
 * Horizontal drag + scroll-snap carousel. 4 cards (320px min,
 * 24px radius, white bg). Each: big metric (counter animation
 * on viewport enter), growth graph image, client name.
 * Stagger entrance 120ms. Background: faint grid 3% opacity.
 */
export default function ResultsSection() {
  const carouselRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const onMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const scrollByAmount = (distance) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  return (
    <Section id="results" bgAlt={false} className="select-none overflow-hidden relative">
      {/* Background: faint grid 3% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,26,46,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,26,46,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-full min-w-0 flex flex-col items-center relative z-10">
        {/* Header: ONE headline, ONE paragraph */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 px-4">
          <span className="editorial-kicker mb-3 reveal-item reveal-stagger-1 is-revealed">
            07 / Verified Outcomes
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            Numbers, not promises.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Real audience growth and inbound revenue across 85+ creators.
          </p>
        </div>

        {/* Horizontal Drag + Scroll-Snap Carousel (4 Cards, Stagger 120ms) */}
        <div className="relative w-full max-w-full min-w-0">
          <div
            ref={carouselRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-2 pb-6 px-4 sm:px-1 no-scrollbar w-full max-w-full min-w-0 cursor-grab active:cursor-grabbing"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {resultsData.map((res, index) => (
              <div
                key={res.id}
                className="device-mockup shrink-0 w-[320px] sm:w-[350px] p-6 bg-white border border-line rounded-[24px] shadow-device flex flex-col justify-between scroll-snap-align-start select-none reveal-visual is-revealed"
                style={{
                  scrollSnapAlign: "start",
                  transitionDelay: `${index * 120}ms`, // Stagger entrance 120ms
                }}
              >
                {/* 1. Client Profile Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-line">
                  <div className="color-wipe is-revealed rounded-full">
                    <img
                      src={res.avatar}
                      alt={res.name}
                      className="w-11 h-11 rounded-full object-cover border border-line shrink-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-medium text-[16px] text-ink truncate leading-tight">
                      {res.name}
                    </div>
                    <div className="text-[12px] font-body text-ink-soft truncate">
                      {res.role}
                    </div>
                  </div>
                </div>

                {/* 2. Growth Graph Image */}
                <div className="py-2">
                  <GrowthGraph points={res.graphPoints} color={res.graphColor} />
                  <div className="flex items-center justify-between text-[10.5px] font-mono text-ink-soft px-1">
                    <span>TIMELINE</span>
                    <span className="font-medium text-ink">{res.timeframe}</span>
                  </div>
                </div>

                {/* 3. Big Metric with Counter Animation */}
                <div className="pt-3 border-t border-line">
                  <div className="text-[10.5px] font-mono uppercase tracking-wider text-ink-soft mb-1">
                    Verified Outcome
                  </div>
                  <div className="font-display font-medium text-[24px] sm:text-[26px] text-ink leading-tight tracking-tight">
                    <CountUp
                      to={res.count.to}
                      decimals={res.count.decimals}
                      prefix={res.count.prefix}
                      suffix={res.count.suffix}
                    />
                  </div>
                  <div className="text-[12px] font-body text-ink-soft mt-1">
                    {res.submetric}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Carousel Arrows & Drag Affordance */}
          <div className="hidden sm:flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => scrollByAmount(-370)}
              className="w-9 h-9 rounded-full border border-line bg-white hover:border-ink flex items-center justify-center text-ink transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              ←
            </button>
            <span className="text-[11px] font-mono text-ink-soft tracking-wider">
              DRAG OR SNAP TO NAVIGATE
            </span>
            <button
              type="button"
              onClick={() => scrollByAmount(370)}
              className="w-9 h-9 rounded-full border border-line bg-white hover:border-ink flex items-center justify-center text-ink transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
