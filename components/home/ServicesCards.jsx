"use client";

import Reveal from "../core/Reveal";
import Button from "../ui/Button";
import { services } from "@/data/site";

export default function ServicesCards({ detailed = false, railRef }) {
  const handleStrategyClick = (e, svc) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { service: svc.title, category: svc.name },
      })
    );
  };

  // Detailed Grid View — Used on /services page
  if (detailed) {
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
                className={`svc-card rounded-[24px] p-7 sm:p-9 flex flex-col justify-between h-full border transition-all duration-300 group bg-white ${
                  isFeatured
                    ? "border-[rgba(46,91,255,0.22)] shadow-[0_20px_50px_rgba(46,91,255,0.08)] hover:border-accent"
                    : "border-line shadow-[0_20px_50px_rgba(15,26,46,0.05)] hover:border-[rgba(15,26,46,0.24)]"
                }`}
              >
                {/* Distinct featured ribbons */}
                {svc.id === "instagram" && (
                  <span className="svc-ribbon" aria-hidden="true">
                    Most booked
                  </span>
                )}
                {svc.id === "video-editing" && (
                  <span className="svc-ribbon !bg-ink text-white" aria-hidden="true">
                    High demand
                  </span>
                )}

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
                      SERVICE {svc.index}
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

                  <div className="p-5 rounded-[16px] bg-[var(--bg)] border border-line mb-6">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-soft)] mb-3 font-semibold">
                      Scope of Delivery &amp; Architecture
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feat, fi) => (
                        <li
                          key={feat}
                          className="scope-item flex items-center gap-2.5 text-[13.5px] text-[var(--ink)]"
                          style={{ "--i": fi }}
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

  // Compact Auto-moving Right-to-Left Rail (Used on Homepage WhatWeDo section)
  // 3 duplicate cycles of all 4 services (12 items total) for completely seamless infinite loop
  const loopServices = [...services, ...services, ...services];

  return (
    <div className="services-rail-viewport" ref={railRef}>
      <div className="services-rail-track">
        {loopServices.map((svc, idx) => {
          const isFeatured = svc.id === "instagram" || svc.id === "video-editing";
          // Take first 4 features for compact clean layout
          const compactFeatures = svc.features.slice(0, 4);

          return (
            <article
              key={`${svc.id}-${idx}`}
              className={`services-rail-card rounded-[22px] p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 group bg-white relative overflow-hidden select-none hover:-translate-y-1.5 ${
                isFeatured
                  ? "border-accent/30 shadow-[0_12px_32px_rgba(46,91,255,0.08)] hover:border-accent hover:shadow-[0_22px_45px_rgba(46,91,255,0.18)]"
                  : "border-line shadow-[0_12px_30px_rgba(15,26,46,0.05)] hover:border-ink/40 hover:shadow-[0_20px_40px_rgba(15,26,46,0.12)]"
              }`}
            >
              {/* Featured Ribbon */}
              {svc.id === "instagram" && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent text-white uppercase tracking-wider shadow-xs">
                  Most Booked
                </span>
              )}
              {svc.id === "video-editing" && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-ink text-white uppercase tracking-wider shadow-xs">
                  High Demand
                </span>
              )}

              {/* Card Header */}
              <div>
                {/* Top Meta Line */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md font-mono text-[10.5px] font-bold bg-accent/10 text-accent border border-accent/20">
                    {svc.index}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">
                    {svc.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-medium text-[21px] sm:text-[23px] text-ink leading-snug group-hover:text-accent transition-colors mb-2">
                  {svc.title}
                </h3>

                {/* Tag Pill */}
                <div className="inline-block mb-3">
                  <span className="text-[11.5px] font-mono text-ink-soft bg-bg-alt px-2.5 py-0.5 rounded-full border border-line">
                    ✦ {svc.tag}
                  </span>
                </div>

                {/* Compact Description */}
                <p className="text-[13px] text-ink-soft leading-relaxed line-clamp-2 mb-4 font-normal">
                  {svc.desc}
                </p>

                {/* Compact Deliverables Grid */}
                <div className="p-3.5 rounded-xl bg-bg border border-line/80 mb-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft font-bold mb-2">
                    Scope &amp; Deliverables:
                  </div>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {compactFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-1.5 text-[11.5px] text-ink font-medium truncate"
                        title={feat}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[9px] shrink-0 font-bold">
                          ✓
                        </span>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Metric & Action */}
              <div className="pt-4 border-t border-line flex items-center justify-between gap-3 mt-auto">
                <div className="min-w-0">
                  <div className="font-display font-medium text-[20px] text-ink leading-tight">
                    {svc.stat.value}
                  </div>
                  <div className="text-[11px] text-ink-soft truncate max-w-[150px]">
                    {svc.stat.label}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleStrategyClick(e, svc)}
                  className="px-3.5 py-1.5 rounded-full bg-ink text-white hover:bg-accent text-[12px] font-body font-medium transition-colors shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Strategy</span>
                  <span className="text-[10px]">→</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
