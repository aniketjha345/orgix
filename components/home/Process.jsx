"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { processSteps } from "@/data/site";

const stepDeliverables = {
  "01": ["Competitor Moat Analysis", "Audience Resonance Audit", "Core Content Pillars", "Contrarian Angle Mapping"],
  "02": ["3-Second Hook Architecture", "Open-Loop Retention Pacing", "Call-to-Action Blueprint", "Tone & Cadence Calibration"],
  "03": ["2 Shoot Days per Month", "On-Camera Executive Coaching", "Teleprompter & Studio Setup", "30 Days Video Buffer"],
  "04": ["Micro-Cut Retention Pacing", "Dynamic Typographic Overlays", "Sound Design & SFX Rhythm", "Cinema Color Grading"],
  "05": ["Algorithmic Peak Timing", "Search-Optimized SEO Captions", "High-CTR Cover & Thumbnail Mastery", "Multi-Platform Syndication"],
  "06": ["DM Lead Funnel Automation", "Comment Sentiment Conversion", "B2B Deal Inbound Qualification", "Monthly Trajectory Brief"],
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
  const currentStep = processSteps[activeIdx] || processSteps[0];
  const deliverables = stepDeliverables[currentStep.n] || [];
  const artifact = stepArtifacts[currentStep.n] || stepArtifacts["01"];

  const handleConsultation = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "process" } })
    );
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="engine">
      <div className="container">
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
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Pipeline Sequence Navigator */}
          <div className="lg:col-span-5 rounded-2xl bg-surface-muted/70 border border-border p-3 sm:p-4 backdrop-blur-md">
            <div className="px-3 py-2 border-b border-border/80 flex items-center justify-between font-mono text-[11px] text-ink-muted mb-2">
              <span>PIPELINE SEQUENCE</span>
              <span className="text-accent font-semibold">
                STAGE 0{activeIdx + 1} / 06
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
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? "bg-surface-elevated border border-accent/40 text-ink-primary shadow-subtle"
                        : "bg-transparent border border-transparent text-ink-secondary hover:bg-surface hover:text-ink-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? "bg-accent shadow-[0_0_8px_#2E5BFF]" : "bg-white/20"
                        }`}
                      />
                      <span className="font-mono text-[11.5px] text-ink-muted">
                        {step.n}
                      </span>
                      <span className="text-body-sm font-medium font-body">
                        {step.title}
                      </span>
                    </div>

                    <Icon
                      name="arrow"
                      size={14}
                      className={`transition-transform duration-200 ${
                        isActive ? "text-accent translate-x-0.5" : "text-ink-muted/50 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Detail & Architecture Artifact */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-surface-muted/90 border border-border p-6 sm:p-8 shadow-elevated relative overflow-hidden backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Stage Top Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] tracking-wider uppercase text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/25">
                      STAGE {currentStep.n} · {currentStep.kicker}
                    </span>
                    <span className="font-mono text-[11px] text-ink-muted">
                      ORX-OS-0{activeIdx + 1}
                    </span>
                  </div>

                  <h3 className="text-heading-xl font-display text-ink-primary font-normal tracking-tight mb-2">
                    {currentStep.title}
                  </h3>

                  <div className="text-body-sm font-mono text-accent/90 mb-4">
                    Core Objective: {currentStep.kicker}
                  </div>

                  <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-6">
                    {currentStep.text}
                  </p>

                  {/* Strategic Deliverables List */}
                  <div className="mb-6 p-4 rounded-xl bg-surface border border-border-subtle">
                    <div className="font-mono text-[10.5px] uppercase tracking-wider text-ink-muted mb-3">
                      Tangible Deliverables Included
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[12.5px] text-ink-secondary font-body"
                        >
                          <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[10px] shrink-0 font-bold">
                            ✓
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engineered Artifact Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-surface to-surface-elevated border border-border/80 mb-8">
                    <div className="flex items-center justify-between text-[10.5px] font-mono mb-1.5">
                      <span className="text-ink-muted">{artifact.badge}</span>
                      <span className="text-accent font-semibold">{artifact.kpi}</span>
                    </div>
                    <div className="text-body-sm font-medium text-ink-primary mb-1">
                      {artifact.title}
                    </div>
                    <p className="text-[12px] text-ink-secondary leading-relaxed font-light">
                      {artifact.detail}
                    </p>
                  </div>

                  {/* Navigation Step Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <button
                      type="button"
                      disabled={activeIdx === 0}
                      onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                      className="px-4 py-2 rounded-full text-[12.5px] font-body text-ink-secondary border border-border hover:bg-surface hover:text-ink-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      ← Previous Stage
                    </button>

                    {activeIdx < processSteps.length - 1 ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          setActiveIdx((i) => Math.min(processSteps.length - 1, i + 1))
                        }
                      >
                        Next Stage: 0{activeIdx + 2}
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" onClick={handleConsultation}>
                        Deploy This Engine
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
