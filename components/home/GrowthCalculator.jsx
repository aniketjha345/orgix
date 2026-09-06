"use client";

import { useState } from "react";
import Button from "@/components/core/Button";
import Section from "@/components/core/Section";

const TIERS = [
  { id: "starter", label: "0 – 5K", desc: "Starting out / network", baseViews: 350000, baseFollowers: 3800, basePipeline: 800000 },
  { id: "growth", label: "5K – 25K", desc: "Early traction", baseViews: 850000, baseFollowers: 9500, basePipeline: 1800000 },
  { id: "scale", label: "25K – 100K", desc: "High authority", baseViews: 1800000, baseFollowers: 22000, basePipeline: 3600000 },
  { id: "dominant", label: "100K+", desc: "Industry leader", baseViews: 4200000, baseFollowers: 55000, basePipeline: 7500000 },
];

const CADENCES = [
  { id: "3x", label: "3 Reels / week", multiplier: 1.0, cadenceLabel: "Steady Authority Engine" },
  { id: "5x", label: "5 Reels / week", multiplier: 1.6, recommended: true, cadenceLabel: "High Velocity (Recommended)" },
  { id: "7x", label: "Daily (7 / week)", multiplier: 2.3, cadenceLabel: "Omnipresent Category Leader" },
];

const NICHES = [
  { id: "founder", label: "Founder / CEO", pipelineMult: 1.3, sprint: "Founder Authority Flagship" },
  { id: "finance", label: "Finance & Investing", pipelineMult: 1.2, sprint: "High-Ticket Finance Engine" },
  { id: "tech", label: "Tech, AI & SaaS", pipelineMult: 1.25, sprint: "Viral Product & AI Sprint" },
  { id: "d2c", label: "D2C & E-Commerce", pipelineMult: 1.1, sprint: "Creator-Led E-Commerce Track" },
];

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

function formatCurrency(amount) {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(1);
    return `₹${lakhs.endsWith(".0") ? lakhs.slice(0, -2) : lakhs} Lakhs`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function GrowthCalculator() {
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [selectedCadence, setSelectedCadence] = useState(CADENCES[1]);
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);

  // Derived computations
  const projectedViews = Math.round(selectedTier.baseViews * selectedCadence.multiplier);
  const projectedFollowersMin = Math.round(selectedTier.baseFollowers * selectedCadence.multiplier * 0.85);
  const projectedFollowersMax = Math.round(selectedTier.baseFollowers * selectedCadence.multiplier * 1.35);
  const projectedPipeline = Math.round(selectedTier.basePipeline * selectedCadence.multiplier * selectedNiche.pipelineMult);

  const handleBookWithTrajectory = (e) => {
    e?.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-consultation", {
          detail: {
            service: `${selectedNiche.sprint} (${selectedCadence.label})`,
          },
        })
      );
    }
  };

  return (
    <Section id="calculator" bgAlt={true} className="select-none overflow-hidden relative py-16 sm:py-24">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="editorial-kicker mb-3 inline-block">08 / Velocity Modeler</span>
          <h2 className="display-h2 mb-4">Model your 90-day organic trajectory.</h2>
          <p className="body-editorial text-center mx-auto">
            Input your current baseline and target cadence. We project your organic reach,
            follower inflow, and estimated inbound deal flow based on benchmark data from 85+ creator campaigns.
          </p>
        </div>

        {/* Interactive Calculator Surface */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-line p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,26,46,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Interactive Selectors */}
            <div className="lg:col-span-7 space-y-7">
              {/* Selector 1: Current Audience Tier */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-ink-soft mb-3">
                  1. Current Audience Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`text-left p-3 rounded-[14px] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-ink text-white border-ink shadow-sm"
                            : "bg-[#FBF9F5] text-ink border-line hover:border-ink/40"
                        }`}
                      >
                        <div className="text-[14px] font-semibold tracking-tight">{tier.label}</div>
                        <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-white/70" : "text-ink-soft"}`}>
                          {tier.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector 2: Publishing Cadence */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-ink-soft mb-3">
                  2. Weekly Publishing Cadence
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CADENCES.map((cadence) => {
                    const isSelected = selectedCadence.id === cadence.id;
                    return (
                      <button
                        key={cadence.id}
                        type="button"
                        onClick={() => setSelectedCadence(cadence)}
                        className={`relative text-left p-3.5 rounded-[14px] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-ink text-white border-ink shadow-sm"
                            : "bg-[#FBF9F5] text-ink border-line hover:border-ink/40"
                        }`}
                      >
                        {cadence.recommended && (
                          <span
                            className={`absolute -top-2 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              isSelected ? "bg-accent text-white" : "bg-ink text-white"
                            }`}
                          >
                            Optimal
                          </span>
                        )}
                        <div className="text-[13.5px] font-semibold">{cadence.label}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? "text-white/70" : "text-ink-soft"}`}>
                          {cadence.cadenceLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector 3: Creator Niche */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-ink-soft mb-3">
                  3. Niche & Positioning
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {NICHES.map((niche) => {
                    const isSelected = selectedNiche.id === niche.id;
                    return (
                      <button
                        key={niche.id}
                        type="button"
                        onClick={() => setSelectedNiche(niche)}
                        className={`text-left p-3 rounded-[14px] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-[#FBF9F5] text-ink border-line hover:border-ink/40"
                        }`}
                      >
                        <div className="text-[13px] font-semibold">{niche.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time saved pill */}
              <div className="p-3.5 rounded-[16px] bg-[#ECE9E2]/60 border border-line flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-ink-soft">
                    Estimated founder time saved per month:
                  </span>
                </div>
                <span className="font-semibold text-ink font-mono">~45 Hours / mo</span>
              </div>
            </div>

            {/* Right Column: Projected ROI Dashboard Card */}
            <div className="lg:col-span-5 bg-[#0F1A2E] text-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                    90-Day Organic Model
                  </span>
                  <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                    Live Projection
                  </span>
                </div>

                {/* Primary Metric 1: Projected Views */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    Projected Algorithmic Impressions
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
                    {formatNumber(projectedViews)}+
                  </div>
                  <div className="text-[11.5px] text-white/70 mt-1">
                    Across Instagram Reels & LinkedIn Video syndication
                  </div>
                </div>

                {/* Primary Metric 2: Net Follower Gain */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10 mb-6">
                  <div>
                    <div className="text-[10.5px] font-mono uppercase tracking-wider text-white/60 mb-1">
                      Target Audience Inflow
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-semibold text-accent">
                      +{formatNumber(projectedFollowersMin)} – {formatNumber(projectedFollowersMax)}
                    </div>
                    <div className="text-[10px] text-white/60 mt-0.5">High-affinity followers</div>
                  </div>
                  <div>
                    <div className="text-[10.5px] font-mono uppercase tracking-wider text-white/60 mb-1">
                      Estimated Pipeline
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-semibold text-white">
                      {formatCurrency(projectedPipeline)}
                    </div>
                    <div className="text-[10px] text-white/60 mt-0.5">Inbound deal value</div>
                  </div>
                </div>

                {/* Recommended Sprint Badge */}
                <div className="bg-white/5 rounded-[14px] p-3 border border-white/10 mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-0.5">
                    Recommended Agency Blueprint
                  </div>
                  <div className="text-[13px] font-semibold text-white">
                    {selectedNiche.sprint}
                  </div>
                  <div className="text-[10.5px] text-white/60 mt-1">
                    Full scriptwriting, kinetic editing, sound design & retention tracking.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <Button
                  variant="primary"
                  href="/contact"
                  onClick={handleBookWithTrajectory}
                  className="w-full justify-center !bg-accent hover:!bg-accent/90 !text-white"
                  ariaLabel="Lock this 90-day trajectory on a call"
                >
                  Lock This 90-Day Trajectory →
                </Button>
                <p className="text-center text-[10px] font-mono text-white/50">
                  Zero ad spend burn · 100% white-glove organic engine
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
