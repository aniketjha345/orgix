"use client";

import { marquee, imgSrc } from "@/data/site";
import Icon from "../core/Icon";

export default function TrustedBy() {
  const marqueeList = [...marquee, ...marquee];

  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/40 overflow-hidden select-none" id="creators">
      <div className="container mb-7 text-center">
        <p className="font-mono text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] text-ink-muted">
          TRUSTED BY 85+ FOUNDERS &amp; CATEGORY CREATORS ACROSS INDIA
        </p>
      </div>

      {/* Slow Infinite Marquee Strip (Antigravity-style spacing, small avatars, no borders) */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-3 shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <img
                src={imgSrc(item.img)}
                alt={item.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-medium text-ink-primary whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-accent font-semibold px-1 py-0.2 rounded bg-accent/10">
                    {item.followers}
                  </span>
                </div>
                <span className="text-[11px] text-ink-muted whitespace-nowrap">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
