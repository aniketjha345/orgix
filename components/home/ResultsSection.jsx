"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";
import InstagramCard from "@/components/ui/InstagramCard";
import { stories } from "@/data/site";

const CATEGORIES = ["All", "Founders", "Creators", "Brands"];

export default function ResultsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const carouselRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const displayedStories =
    activeTab === "All"
      ? stories
      : stories.filter((s) => s.cat?.toLowerCase() === activeTab.toLowerCase());

  // Keyboard navigation — ←/→ snap the carousel one card at a time,
  // only while the section is on screen so page scroll stays untouched.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const el = carouselRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      el.scrollBy({ left: e.key === "ArrowRight" ? 364 : -364, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
          <span className="editorial-kicker mb-3 reveal-item reveal-stagger-1 is-revealed">
            08 / Verified Outcomes
          </span>

          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            Numbers, not promises.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Real profiles, real follower counts, 100% organic — exactly as they
            stand on Instagram today.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              const count =
                cat === "All"
                  ? stories.length
                  : stories.filter((s) => s.cat?.toLowerCase() === cat.toLowerCase()).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-ink text-white shadow-xs font-semibold"
                      : "bg-white text-ink-soft border border-line hover:border-ink hover:text-ink"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Drag + Scroll-Snap Carousel of authentic IG cards */}
        <div className="relative w-full max-w-full min-w-0">
          <div
            ref={carouselRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
            className="flex gap-5 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-2 pb-6 px-4 sm:px-1 no-scrollbar w-full max-w-full min-w-0 cursor-grab active:cursor-grabbing"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {displayedStories.map((s, index) => (
              <div
                key={s.handle}
                className="shrink-0 w-[320px] sm:w-[344px] scroll-snap-align-start reveal-visual is-revealed flex justify-center"
                style={{ scrollSnapAlign: "start", transitionDelay: `${index * 80}ms` }}
              >
                <InstagramCard s={s} />
              </div>
            ))}

            {/* End card — next can be you */}
            <div className="shrink-0 w-[320px] sm:w-[344px] scroll-snap-align-start flex items-stretch">
              <div
                className="ig-card ig-card--next flex items-center justify-center text-center cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label="Your profile could be next"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-consultation", {
                      detail: { source: "results-wall" },
                    })
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("open-consultation", {
                        detail: { source: "results-wall" },
                      })
                    );
                  }
                }}
              >
                <div className="px-6 py-10 flex flex-col items-center gap-4">
                  <div className="ig-avatar-ring ig-avatar-ring--next" aria-hidden="true">
                    <span className="ig-next-plus">+</span>
                  </div>
                  <div>
                    <div className="ig-next-handle">yourprofile</div>
                    <h3 className="ig-next-title">
                      Next can be <span className="text-accent">you.</span>
                    </h3>
                    <p className="ig-next-desc">
                      Every profile above started with one conversation. Let&rsquo;s
                      architect your 100% organic engine.
                    </p>
                  </div>
                  <span className="ig-next-cta">
                    Claim your slot <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Carousel Arrows & Drag Affordance */}
          <div className="hidden sm:flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => scrollByAmount(-380)}
              className="w-9 h-9 rounded-full border border-line bg-white hover:border-ink flex items-center justify-center text-ink transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              ←
            </button>
            <span className="text-[11px] font-mono text-ink-soft tracking-wider">
              DRAG OR SNAP TO NAVIGATE · REAL PROFILES
            </span>
            <button
              type="button"
              onClick={() => scrollByAmount(380)}
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
