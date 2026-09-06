"use client";

import Reveal from "../core/Reveal";
import Button from "../ui/Button";
import { services } from "@/data/site";

export default function ServicesCards({ detailed = false }) {
  const handleStrategyClick = (e, svc) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { service: svc.title, category: svc.name },
      })
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((svc, idx) => {
        const isFeatured = svc.id === "instagram" || svc.id === "video-editing";

        return (
          <Reveal
            key={svc.id}
            as="article"
            delay={idx * 0.08}
            className="h-full"
          >
            <div
              className={`rounded-[24px] p-7 sm:p-9 flex flex-col justify-between h-full border transition-all duration-300 group bg-white ${
                isFeatured
                  ? "border-[rgba(46,91,255,0.22)] shadow-[0_20px_50px_rgba(46,91,255,0.08)] hover:border-accent"
                  : "border-line shadow-[0_20px_50px_rgba(15,26,46,0.05)] hover:border-[rgba(15,26,46,0.24)]"
              }`}
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-medium tracking-wide ${
                      isFeatured
                        ? "bg-[rgba(46,91,255,0.08)] text-accent border border-[rgba(46,91,255,0.2)]"
                        : "bg-[var(--bg-alt)] text-[var(--ink-soft)] border border-line"
                    }`}
                  >
                    {svc.tag}
                  </span>
                  <span className="text-[var(--ink-soft)] font-mono tracking-widest text-[11px]">
                    STAGE 0{svc.index}
                  </span>
                </div>

                <div className="text-[12px] font-mono uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  {svc.name}
                </div>

                <h3 className="font-display font-medium text-[26px] sm:text-[30px] text-[var(--ink)] tracking-tight mb-3">
                  {svc.title}
                </h3>

                <p className="text-[15px] sm:text-[16px] text-[var(--ink-soft)] leading-relaxed font-normal mb-6">
                  {svc.desc}
                </p>

                {/* Core Features List */}
                <div className="p-5 rounded-[16px] bg-[var(--bg)] border border-line mb-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-soft)] mb-3 font-semibold">
                    Scope of Delivery &amp; Architecture
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-[13.5px] text-[var(--ink)]"
                      >
                        <span className="w-4 h-4 rounded-full bg-[rgba(46,91,255,0.12)] text-accent flex items-center justify-center text-[10px] shrink-0 font-bold">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer with Metric Benchmark & CTA */}
              <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div>
                  <div className="text-[1.65rem] font-display font-medium text-[var(--ink)] leading-none mb-1">
                    {svc.stat.value}
                  </div>
                  <div className="text-[12px] text-[var(--ink-soft)]">
                    {svc.stat.label}
                  </div>
                </div>

                <Button
                  variant={isFeatured ? "primary" : "secondary"}
                  size="md"
                  onClick={(e) => handleStrategyClick(e, svc)}
                  iconName="arrow"
                >
                  Get a Strategy
                </Button>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
