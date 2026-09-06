"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";

/**
 * SECTION 6 — INSTAGRAM GROWTH (100vh):
 * Left text, Right phone mockup. THE SHOWSTOPPER:
 * Phone starts showing BEFORE state (8K followers).
 * On scroll progress 40-60%: crossfade to AFTER (111K).
 * Counter animation 8000→111000 (2s).
 * Growth graph line draws itself bottom-left to top-right.
 */
function InstagramShowstopper() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [followerCount, setFollowerCount] = useState(8000);
  const [hasTriggeredAfter, setHasTriggeredAfter] = useState(false);
  const [unlocked, setUnlocked] = useState([]);
  const animatingRef = useRef(false);

  const MILESTONES = [10000, 50000, 100000];

  // Monitor scroll progress across 40%-60%
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFollowerCount(111000);
      setHasTriggeredAfter(true);
      setUnlocked([10000, 50000, 100000]);
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;

      // Section progress from 0 (just entering bottom) to 1 (leaving top)
      const secProgress = Math.min(Math.max((h - rect.top) / (h + rect.height), 0), 1);
      setProgress(secProgress);

      // Trigger crossfade when scroll reaches 40%-60%
      if (secProgress >= 0.40 && !hasTriggeredAfter && !animatingRef.current) {
        triggerAfterAnimation();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggeredAfter]);

  const triggerAfterAnimation = () => {
    animatingRef.current = true;
    setHasTriggeredAfter(true);
    setUnlocked([]);

    const startVal = 8000;
    const targetVal = 111000;
    const duration = 2000; // 2s counter animation
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - p, 3);
      const currentCount = Math.round(startVal + (targetVal - startVal) * ease);
      setFollowerCount(currentCount);

      // Milestone unlocks pop in as the counter crosses each threshold
      setUnlocked((prev) => {
        const next = MILESTONES.filter(
          (m) => currentCount >= m && !prev.includes(m)
        );
        return next.length ? [...prev, ...next] : prev;
      });

      if (p < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setFollowerCount(targetVal);
        animatingRef.current = false;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const isAfter = hasTriggeredAfter || progress >= 0.5;

  return (
    <div ref={containerRef} className="device-mockup tilt-r glare w-full max-w-[340px] mx-auto p-3.5 bg-white select-none">
      {/* Phone Shell */}
      <div className="rounded-[22px] overflow-hidden border border-line bg-bg p-3.5 relative aspect-[9/16] flex flex-col justify-between float-slow">
        {/* Notch / Dynamic Island */}
        <div className="w-20 h-4 rounded-full bg-black mx-auto mb-2 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/20 ml-auto mr-2" />
        </div>

        {/* Header Profile Section */}
        <div>
          {/* Creator Profile Row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="color-wipe is-revealed rounded-full">
              <img
                src="/images/founders/pari-jain.jpg"
                alt="Orgix Media Profile"
                className="w-12 h-12 rounded-full object-cover border border-line"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[13.5px] font-medium text-ink truncate">parijain</span>
                {isAfter && (
                  <span className="w-3.5 h-3.5 rounded-full bg-accent text-white flex items-center justify-center text-[8px] font-bold">
                    ✓
                  </span>
                )}
              </div>
              <div className="text-[11px] font-mono text-ink-soft truncate">
                {isAfter ? "Founder · Personal Brand Authority" : "Creator Account"}
              </div>
            </div>

            {/* Toggle Badge to manually replay showstopper */}
            <button
              type="button"
              onClick={() => {
                setHasTriggeredAfter(false);
                setTimeout(triggerAfterAnimation, 50);
              }}
              className="text-[9.5px] font-mono px-2 py-0.5 rounded-full border border-line bg-white text-ink hover:border-accent transition-colors"
              title="Replay growth transformation"
            >
              {isAfter ? "REPLAY" : "TRANSFORM"}
            </button>
          </div>

          {/* Stats Grid with 8000 -> 111000 Animated Counter */}
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-[12px] bg-white border border-line text-center text-[11px] font-mono mb-3">
            <div>
              <div className="font-semibold text-ink">{isAfter ? "85" : "12"}</div>
              <div className="text-[9px] text-ink-soft">Posts</div>
            </div>
            <div>
              <div className="font-semibold text-accent font-mono text-[12px]">
                {followerCount.toLocaleString()}
              </div>
              <div className="text-[9px] text-ink-soft">Followers</div>
            </div>
            <div>
              <div className="font-semibold text-ink">{isAfter ? "100%" : "2.1%"}</div>
              <div className="text-[9px] text-ink-soft">{isAfter ? "Organic" : "Reach"}</div>
            </div>
          </div>

          {/* Milestone unlocks — pop in as the counter crosses each threshold */}
          <div
            className={`ig-milestones ${unlocked.length ? "is-on" : ""}`}
            aria-live="polite"
          >
            {MILESTONES.map((m, i) => (
              <span
                key={m}
                className={`ig-milestone ${
                  unlocked.includes(m) ? "is-unlocked" : ""
                }`}
                style={{ "--mi": i }}
              >
                ✓ {m >= 1000 ? `${m / 1000}K` : m}
              </span>
            ))}
          </div>

          {/* Before-state context — only while the profile is still stale */}
          {!isAfter && (
            <div className="ig-stale font-mono text-[9px] tracking-[0.14em] uppercase text-ink-soft text-center py-1.5 rounded-full border border-line bg-white/60">
              Flat for 90 days · 2.1% reach
            </div>
          )}
        </div>

        {/* Growth Graph Line Draws Itself Bottom-Left to Top-Right */}
        <div className="my-2 p-2.5 rounded-[12px] bg-white border border-line">
          <div className="flex items-center justify-between text-[10px] font-mono text-ink-soft mb-1">
            <span>ALGORITHMIC COMPOUNDING</span>
            <span className="text-accent font-semibold">{isAfter ? "+103,000 NET" : "FLAT"}</span>
          </div>

          <div className="w-full h-14 relative">
            <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E5BFF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2E5BFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area */}
              <path
                d="M 10 50 C 60 48, 100 45, 140 30 C 180 18, 200 12, 230 8 L 230 55 L 10 55 Z"
                fill="url(#growthGrad)"
                className="transition-opacity duration-1000"
                style={{ opacity: isAfter ? 1 : 0.1 }}
              />

              {/* Self-drawing Line from bottom-left to top-right */}
              <path
                d="M 10 50 C 60 48, 100 45, 140 30 C 180 18, 200 12, 230 8"
                fill="none"
                stroke="#2E5BFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 260,
                  strokeDashoffset: isAfter ? 0 : 260,
                  transition: "stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />

              {/* Milestone dots — pop sequentially after the line draws */}
              {isAfter && (
                <g className="growth-dots">
                  <circle cx="140" cy="30" r="3.5" fill="#2E5BFF" style={{ "--gi": 0 }} />
                  <circle cx="185" cy="17" r="3.5" fill="#2E5BFF" style={{ "--gi": 1 }} />
                  <circle cx="230" cy="8" r="4" fill="#2E5BFF" style={{ "--gi": 2 }} />
                  <circle cx="230" cy="8" r="8" fill="#2E5BFF" opacity="0.3" className="animate-ping" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Viral Reel Grid Mockup (Crossfading from BEFORE to AFTER) */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
          <div className="color-wipe is-revealed rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/images/stories/pari-jain.jpg"
              alt="Reel 1"
              className={`w-full h-full object-cover transition-opacity duration-700 ${isAfter ? "opacity-100" : "opacity-75"}`}
            />
            <div className="absolute bottom-1 left-1 text-[8.5px] font-mono font-semibold text-white bg-black/70 px-1 rounded z-30">
              ▶ {isAfter ? "1.4M" : "1.2K"}
            </div>
          </div>

          <div className="color-wipe is-revealed rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/images/stories/tools-fact.jpg"
              alt="Reel 2"
              className={`w-full h-full object-cover transition-opacity duration-700 ${isAfter ? "opacity-100" : "opacity-75"}`}
            />
            <div className="absolute bottom-1 left-1 text-[8.5px] font-mono font-semibold text-white bg-black/70 px-1 rounded z-30">
              ▶ {isAfter ? "850K" : "640"}
            </div>
          </div>

          <div className="color-wipe is-revealed rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/images/stories/akash-pandey.jpg"
              alt="Reel 3"
              className={`w-full h-full object-cover transition-opacity duration-700 ${isAfter ? "opacity-100" : "opacity-75"}`}
            />
            <div className="absolute bottom-1 left-1 text-[8.5px] font-mono font-semibold text-white bg-black/70 px-1 rounded z-30">
              ▶ {isAfter ? "620K" : "890"}
            </div>
          </div>
        </div>

        {/* Bottom Velocity Tag */}
        <div className="pt-2 text-center text-[9.5px] font-mono text-ink-soft border-t border-line mt-2 tracking-wider">
          {isAfter ? "AFTER: 111K FOLLOWERS (100% ORGANIC)" : "BEFORE: 8K FOLLOWERS (STAGNANT)"}
        </div>
      </div>
    </div>
  );
}

export default function InstagramGrowthSection() {
  return (
    <Section
      id="service-instagram"
      bgAlt={false}
      headline="Growth you can measure."
      paragraph="100% organic growth architecture through daily reels, carousel funnels, and algorithmic retention velocity."
      visual={<InstagramShowstopper />}
      visualPosition="right"
      kicker="07 / Instagram Growth Engine"
    />
  );
}
