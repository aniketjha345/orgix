"use client";

import { useRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import ServicesCards from "./ServicesCards";
import { sound } from "@/lib/sound";

export default function WhatWeDo() {
  const railRef = useRef(null);

  const scrollLeft = () => {
    sound?.playPop?.();
    if (railRef.current) {
      railRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    sound?.playPop?.();
    if (railRef.current) {
      railRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-20 md:py-28 bg-background border-t border-border/60 overflow-hidden select-none relative"
      id="services"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <SectionHeading
            index="03"
            tag="WHAT WE DO · FOUR CORE DISCIPLINES"
            highlightTag="ONE OBSESSIVE TEAM"
            title={
              <>
                We don&rsquo;t post content.{" "}
                <span className="text-accent block sm:inline">
                  We build personal brands.
                </span>
              </>
            }
            subtitle="As one of India's best personal branding agencies, we don't chase trends — we build compounding, organic growth. Four core disciplines, one obsessive team."
            className="mb-0 md:mb-0"
          />

          {/* Controls: Auto-move status pill + Manual Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end pb-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-ink-soft tracking-wider uppercase">
              ✦ Auto-scrolling · Hover to pause
            </span>
            <div className="inline-flex items-center gap-1.5 bg-white rounded-full p-1 border border-line shadow-2xs">
              <button
                type="button"
                onClick={scrollLeft}
                className="w-8 h-8 rounded-full bg-bg-alt hover:bg-accent hover:text-white text-ink font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Scroll Services Left"
                aria-label="Scroll services left"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="w-8 h-8 rounded-full bg-bg-alt hover:bg-accent hover:text-white text-ink font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Scroll Services Right"
                aria-label="Scroll services right"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed smooth Right-to-Left auto-moving rail */}
      <ServicesCards railRef={railRef} />
    </section>
  );
}
