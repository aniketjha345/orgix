"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { processSteps } from "@/data/site";

const stepEmojis = {
  "01": "🔍",
  "02": "✍️",
  "03": "🎥",
  "04": "✂️",
  "05": "🚀",
  "06": "💬",
};

const stepDeliverables = {
  "01": ["Competitor Moat Analysis", "Audience Resonance Audit", "Core Content Pillars", "Contrarian Angle Mapping"],
  "02": ["3-Second Hook Architecture", "Open-Loop Retention Pacing", "Call-to-Action Blueprint", "Tone & Cadence Calibration"],
  "03": ["2 Shoot Days per Month", "On-Camera Executive Coaching", "Teleprompter & Studio Setup", "30 Days Video Buffer"],
  "04": ["Micro-Cut Retention Pacing", "Dynamic Typographic Overlays", "Sound Design & SFX Rhythm", "Cinema Color Grading"],
  "05": ["Algorithmic Peak Timing", "Search-Optimized SEO Captions", "High-CTR Cover & Thumbnail Mastery", "Multi-Platform Syndication"],
  "06": ["DM Lead Funnel Automation", "Comment Sentiment Conversion", "B2B Deal Inbound Qualification", "Monthly Trajectory Brief"],
};

const stageArchetypes = {
  "01": {
    img: "/images/figurines/strategist.webp",
    name: "The Strategist",
    emoji: "🔍",
    line: "Finds the white space and maps the moat before anyone else does.",
  },
  "02": {
    img: "/images/figurines/creator.webp",
    name: "The Creator",
    emoji: "✍️",
    line: "Turns deep expertise into hooks that stop the scroll in 1.2s.",
  },
  "03": {
    img: "/images/figurines/director.webp",
    name: "The Director",
    emoji: "🎥",
    line: "Guides every shoot and camera angle for executive confidence.",
  },
  "04": {
    img: "/images/figurines/alchemist.webp",
    name: "The Alchemist",
    emoji: "🎧",
    line: "Injects micro-cut rhythms, audio foley, and psychological pacing.",
  },
  "05": {
    img: "/images/figurines/analyst.webp",
    name: "The Analyst",
    emoji: "📊",
    line: "Models algorithm curve dynamics, metadata, and viral syndication.",
  },
  "06": {
    img: "/images/figurines/builder.webp",
    name: "The Builder",
    emoji: "🚀",
    line: "Turns community engagement and DM funnels into inbound pipeline.",
  },
};

const stepArtifacts = {
  "01": {
    badge: "RESEARCH ARTIFACT",
    title: "Audience Archetype & Competitive Gap Map",
    detail: "Data-backed blueprint mapping where competitors leave white space and how to position you as the definitive authority.",
    kpi: "100% Uncontested Positioning",
  },
  "02": {
    badge: "SCRIPTING BLUEPRINT",
    title: "3-Second Hook & Retention Curve Schema",
    detail: "Every script follows a strict 3-beat rhythm: Provocative premise, high-density value delivery, frictionless call to action.",
    kpi: "89.4% Avg 3-Second Retention",
  },
  "03": {
    badge: "PRODUCTION DASHBOARD",
    title: "Zero-Friction Executive Directing Protocol",
    detail: "We set up teleprompters, studio lighting, and audio. You step in front of the lens for 4 hours a month, zero prep required.",
    kpi: "4 Hours / Month Time Investment",
  },
  "04": {
    badge: "POST-PRODUCTION SYSTEM",
    title: "Micro-Cut Editing & Dynamic Sound Engineering",
    detail: "Every frame is calibrated for psychological retention — intentional sound cues, precise text animations, and cinematic color.",
    kpi: "3x Higher Completion Rate",
  },
  "05": {
    badge: "DISTRIBUTION PROTOCOL",
    title: "Multi-Platform Syndication & Cover Optimization",
    detail: "Engineered metadata, strategic publishing windows, and high-CTR custom covers designed for Instagram Explore & YouTube Search.",
    kpi: "Multi-Format Viral Reach",
  },
  "06": {
    badge: "CONVERSION ENGINE",
    title: "Inbound Funnel & Authority Monopolization",
    detail: "Turning video reach into booked client calls, speaking invitations, investor inquiries, and high-ticket business outcomes.",
    kpi: "4.8x Inbound Conversion Lift",
  },
};

export default function Process({ index = "03" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const currentStep = processSteps[activeIdx] || processSteps[0];
  const deliverables = stepDeliverables[currentStep.n] || [];
  const artifact = stepArtifacts[currentStep.n] || stepArtifacts["01"];
  const archetype = stageArchetypes[currentStep.n] || stageArchetypes["01"];

  const handleConsultation = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "process" } })
    );
  };

  // Auto-advance: the engine narrates itself — one stage every 5s while
  // the section is on screen. Hover/focus pauses; manual click stops it
  // for that visit (the user has taken the wheel). Reduced motion: off.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(section);

    const iv = setInterval(() => {
      if (visible) {
        setActiveIdx((i) => (i + 1) % processSteps.length);
      }
    }, 5000);

    return () => {
      io.disconnect();
      clearInterval(iv);
    };
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-18 bg-background border-t border-line relative overflow-hidden select-none"
      id="process"
      data-paused={paused || undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index={index}
          tag="THE ORGIX OPERATING SYSTEM · 6-STEP METHODOLOGY"
          highlightTag="SYSTEM OS"
          title={
            <>
              The Orgix Growth Engine.{" "}
              <span className="text-accent block sm:inline">Six disciplined stages.</span>
            </>
          }
          subtitle="Six interconnected engineering disciplines executed entirely by our in-house team. We turn your raw domain expertise into a compounding personal media monopoly."
          className="!mb-6 sm:!mb-8"
        />

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Left Column: Pipeline Sequence Navigator */}
          <div className="lg:col-span-4 rounded-[22px] bg-white/90 border border-black/[0.08] p-3 sm:p-4 backdrop-blur-md shadow-[0_8px_24px_rgba(15,26,46,0.04)]">
            <div className="px-3 py-2 border-b border-black/[0.06] flex items-center justify-between font-mono text-[10.5px] text-ink-soft mb-2">
              <span className="uppercase tracking-wider font-semibold">Pipeline Sequence</span>
              <span className="text-accent font-semibold">
                {paused ? "PAUSED · " : ""}0{activeIdx + 1} / 06
              </span>
            </div>

            <div className="space-y-1.5" role="tablist" aria-label="Operating System Stages">
              {processSteps.map((step, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={step.n}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveIdx(idx);
                      setPaused(true); // manual pick = user has the wheel
                    }}
                    className={`process-nav-btn relative overflow-hidden w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-[#0F1A2E] text-white border border-[#0F1A2E] shadow-sm"
                        : "bg-transparent border border-transparent text-ink hover:bg-black/[0.04]"
                    }`}
                  >
                    {/* Progress rail — sweeps as this stage stays active */}
                    <span
                      className={`process-rail ${isActive ? "is-on" : ""}`}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? "bg-accent shadow-[0_0_8px_#2E5BFF]" : "bg-black/15"
                        }`}
                      />
                      <span className={`font-mono text-[11px] ${isActive ? "text-white/60" : "text-ink-soft"}`}>
                        {step.n}
                      </span>
                      <span className={`text-[13px] font-medium font-body tracking-tight ${isActive ? "text-white" : "text-ink"}`}>
                        {stepEmojis[step.n]} {step.title}
                      </span>
                    </div>

                    <span
                      className={`text-xs transition-transform duration-200 ${
                        isActive ? "text-accent translate-x-0.5" : "text-ink-soft/40 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Detail & Architecture Artifact (Compact Cockpit) */}
          <div className="lg:col-span-8">
            <div className="rounded-[24px] bg-white/90 border border-black/[0.08] p-5 sm:p-6 shadow-[0_16px_40px_-10px_rgba(15,26,46,0.06),inset_0_1px_0_rgba(255,255,255,1)] relative overflow-hidden backdrop-blur-xl">
              <div
                key={currentStep.n}
                className="process-stage-enter"
              >
                  {/* Stage Top Meta Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/25 font-bold">
                        {stepEmojis[currentStep.n]} STAGE {currentStep.n}
                      </span>
                      <span className="font-mono text-[11px] text-ink-soft font-medium">
                        · {currentStep.kicker}
                      </span>
                    </div>
                    <span className="font-mono text-[10.5px] text-ink-soft/75 bg-black/[0.03] px-2 py-0.5 rounded">
                      ORX-OS-0{activeIdx + 1}
                    </span>
                  </div>

                  {/* 2-Column Split: Left = Strategy & Figurine, Right = Real Studio Photo & Artifact */}
                  <div className="grid md:grid-cols-12 gap-5 items-start">
                    {/* Left Sub-Column: Text, Figurine Briefing, Deliverables */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[21px] sm:text-[25px] font-display text-ink font-semibold tracking-tight mb-2 leading-tight">
                          {currentStep.title}
                        </h3>

                        <p className="text-[13px] text-ink-soft leading-relaxed font-body mb-3.5">
                          {currentStep.text}
                        </p>

                        {/* Figurine & Specialist Speech Briefing (Compact & Integrated) */}
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] mb-3.5 shadow-2xs">
                          <div className="relative w-11 h-16 sm:w-12 sm:h-18 flex items-end justify-center shrink-0">
                            <img
                              src={archetype.img}
                              alt={archetype.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(15,26,46,0.20)] hover:scale-105 transition-transform"
                            />
                            <div className="w-9 h-1.5 rounded-full bg-black/15 blur-2xs absolute bottom-0" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                                {archetype.emoji} {archetype.name}
                              </span>
                              <span className="text-[8.5px] font-mono text-ink-soft/60">· Specialist</span>
                            </div>
                            <p className="text-[11.5px] text-ink leading-snug font-body italic">
                              &ldquo;{archetype.line}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Strategic Deliverables (Compact 2x2 grid) */}
                        <div className="p-3 rounded-xl bg-white border border-black/[0.06] shadow-2xs">
                          <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink-soft font-semibold mb-2">
                            Tangible Deliverables
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-1.5 text-[11.5px] text-ink font-body"
                              >
                                <span className="w-3.5 h-3.5 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[8.5px] shrink-0 font-bold">
                                  ✓
                                </span>
                                <span className="line-clamp-1">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Sub-Column: REAL STUDIO PHOTO + Engineered Artifact */}
                    <div className="md:col-span-5 flex flex-col gap-3">
                      {/* REAL STUDIO OFFICE PHOTO — PROMINENT AND BEAUTIFULLY FRAMED */}
                      {currentStep.img && (
                        <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-xl overflow-hidden border border-black/[0.08] shadow-xs group/photo bg-black/5">
                          <img
                            src={currentStep.img}
                            alt={`${currentStep.title} — Orgix Studio`}
                            className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                            <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[9px] tracking-wider uppercase flex items-center gap-1">
                              <span>📷</span>
                              <span>Delhi HQ Studio</span>
                            </span>
                            <span className="text-white/90 font-mono text-[9.5px] font-semibold">
                              STAGE 0{currentStep.n}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Engineered Artifact Card */}
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white to-[#FAF8F5] border border-black/[0.06] shadow-2xs">
                        <div className="flex items-center justify-between text-[9.5px] font-mono mb-1">
                          <span className="text-ink-soft uppercase tracking-wider font-semibold">{artifact.badge}</span>
                          <span className="text-accent font-bold">{artifact.kpi}</span>
                        </div>
                        <div className="text-[11.5px] font-semibold text-ink leading-tight mb-0.5">
                          {artifact.title}
                        </div>
                        <p className="text-[10.5px] text-ink-soft leading-relaxed font-light line-clamp-2">
                          {artifact.detail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Step Actions */}
                  <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={activeIdx === 0}
                        onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                        className="px-3.5 py-1.5 rounded-full text-[12px] font-body text-ink-soft border border-black/[0.08] bg-white hover:bg-[#FAF8F5] hover:text-ink disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      >
                        ← Previous Stage
                      </button>

                      {activeIdx < processSteps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIdx((i) => Math.min(processSteps.length - 1, i + 1))
                          }
                          className="px-3.5 py-1.5 rounded-full text-[12px] font-body font-semibold text-white bg-accent hover:bg-accent/90 shadow-xs transition-all cursor-pointer"
                        >
                          Next Stage: 0{activeIdx + 2} →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleConsultation}
                          className="px-3.5 py-1.5 rounded-full text-[12px] font-body font-semibold text-white bg-accent hover:bg-accent/90 shadow-xs transition-all cursor-pointer"
                        >
                          Deploy This Engine →
                        </button>
                      )}
                    </div>

                    <div className="font-mono text-[10px] text-ink-soft/75 hidden sm:flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span>{paused ? "Paused" : "Auto-cycling"} · 0{activeIdx + 1} / 06</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
