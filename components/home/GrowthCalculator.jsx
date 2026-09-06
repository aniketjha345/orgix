"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/core/Button";
import Section from "@/components/core/Section";
import { sound } from "@/lib/sound";

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

/**
 * useTweenedNumber — glides a number to its new value (~450ms, ease-out)
 */
function useTweenedNumber(target) {
  const [display, setDisplay] = useState(target);
  const [delta, setDelta] = useState(null);
  const fromRef = useRef(target);
  const settledRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    if (target === settledRef.current) return;
    const from = settledRef.current;
    fromRef.current = from;
    const startTime = performance.now();
    const duration = 450;

    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * ease));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        const prev = settledRef.current;
        settledRef.current = target;
        setDelta(prev > 0 ? Math.round(((target - prev) / prev) * 100) : null);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return [display, delta];
}

function DeltaChip({ delta }) {
  if (delta === null || delta === 0) return null;
  const up = delta > 0;
  return (
    <span
      className={`calc-delta inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded-full ${
        up ? "calc-delta-up" : "calc-delta-down"
      }`}
    >
      {up ? "▲" : "▼"} {up ? "+" : ""}{delta}% vs last
    </span>
  );
}

export default function GrowthCalculator() {
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [selectedCadence, setSelectedCadence] = useState(CADENCES[1]);
  const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);

  // Interactive calculation states (Prompted by user: ask first, calculate button, reveal results)
  const [calculated, setCalculated] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // Derived computations — tweened so the dashboard glides between states
  const rawViews = Math.round(selectedTier.baseViews * selectedCadence.multiplier);
  const rawFollowersMin = Math.round(selectedTier.baseFollowers * selectedCadence.multiplier * 0.85);
  const rawFollowersMax = Math.round(selectedTier.baseFollowers * selectedCadence.multiplier * 1.35);
  const rawPipeline = Math.round(selectedTier.basePipeline * selectedCadence.multiplier * selectedNiche.pipelineMult);

  const [projectedViews, viewsDelta] = useTweenedNumber(rawViews);
  const [projectedFollowersMax, followersDelta] = useTweenedNumber(rawFollowersMax);
  const [projectedPipeline, pipelineDelta] = useTweenedNumber(rawPipeline);

  // Audience ladder
  const ladderPct = Math.min(100, Math.round((rawFollowersMax / 100000) * 100));

  const handleRunCalculation = () => {
    sound.playFanfare();
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setCalculated(true);
    }, 450);
  };

  const handleTierSelect = (tier) => {
    sound.playPop();
    setSelectedTier(tier);
  };

  const handleCadenceSelect = (cadence) => {
    sound.playPop();
    setSelectedCadence(cadence);
  };

  const handleNicheSelect = (niche) => {
    sound.playPop();
    setSelectedNiche(niche);
  };

  const handleBookWithTrajectory = (e) => {
    e?.preventDefault();
    sound.playFanfare();
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
    <Section id="calculator" bgAlt={true} className="select-none overflow-hidden relative !py-8 sm:!py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <span className="editorial-kicker mb-2.5 inline-block">10 / Velocity Modeler</span>
          <h2 className="display-h2 mb-2.5">Model your 90-day organic trajectory.</h2>
          <p className="body-editorial text-center mx-auto text-[14px] sm:text-[15px]">
            Input your baseline and cadence on the left, then calculate your custom 90-day reach, follower growth, and deal pipeline.
          </p>
        </div>

        {/* Interactive Calculator Surface with Luxury Alabaster Shell */}
        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-b from-white via-black/[0.08] to-black/[0.12] shadow-[0_24px_64px_-12px_rgba(15,26,46,0.08),0_4px_16px_rgba(15,26,46,0.03)]">
          <div className="bg-gradient-to-b from-[#FFFFFF] via-[#FCFBF8] to-[#F7F5EE] rounded-[27px] p-5 sm:p-7 relative overflow-hidden">
            {/* Ambient silk light flare */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(46,91,255,0.14) 0%, transparent 70%)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
              {/* Left Column: Interactive Selectors */}
              <div className="lg:col-span-7 space-y-4.5">
                {/* Selector 1: Current Audience Tier */}
                <div>
                  <label className="block text-[11.5px] font-mono uppercase tracking-wider text-ink-soft mb-2">
                    1. Select Current Audience Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIERS.map((tier) => {
                      const isSelected = selectedTier.id === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleTierSelect(tier)}
                          className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-b from-[#131F37] to-[#0B1322] text-white border-[#0F1A2E] shadow-[0_8px_20px_-4px_rgba(15,26,46,0.35)] ring-1 ring-white/20"
                              : "bg-white/95 hover:bg-white text-ink border-black/[0.08] hover:border-accent/40 shadow-[0_2px_6px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="text-[13px] font-semibold tracking-tight">{tier.label}</div>
                          <div className={`text-[9.5px] mt-0.5 line-clamp-1 ${isSelected ? "text-white/70" : "text-ink-soft"}`}>
                            {tier.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selector 2: Publishing Cadence */}
                <div>
                  <label className="block text-[11.5px] font-mono uppercase tracking-wider text-ink-soft mb-2">
                    2. Select Weekly Publishing Cadence
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {CADENCES.map((cadence) => {
                      const isSelected = selectedCadence.id === cadence.id;
                      return (
                        <button
                          key={cadence.id}
                          type="button"
                          onClick={() => handleCadenceSelect(cadence)}
                          className={`relative text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-b from-[#131F37] to-[#0B1322] text-white border-[#0F1A2E] shadow-[0_8px_20px_-4px_rgba(15,26,46,0.35)] ring-1 ring-white/20"
                              : "bg-white/95 hover:bg-white text-ink border-black/[0.08] hover:border-accent/40 shadow-[0_2px_6px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5"
                          }`}
                        >
                          {cadence.recommended && (
                            <span
                              className={`absolute -top-2 right-2.5 text-[8.5px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                                isSelected ? "bg-accent text-white" : "bg-ink text-white"
                              }`}
                            >
                              Optimal
                            </span>
                          )}
                          <div className="text-[13px] font-semibold">{cadence.label}</div>
                          <div className={`text-[9.5px] mt-0.5 ${isSelected ? "text-white/70" : "text-ink-soft"}`}>
                            {cadence.cadenceLabel}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selector 3: Creator Niche */}
                <div>
                  <label className="block text-[11.5px] font-mono uppercase tracking-wider text-ink-soft mb-2">
                    3. Select Your Niche &amp; Positioning
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {NICHES.map((niche) => {
                      const isSelected = selectedNiche.id === niche.id;
                      return (
                        <button
                          key={niche.id}
                          type="button"
                          onClick={() => handleNicheSelect(niche)}
                          className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-b from-[#3B66FF] to-[#2049E0] text-white border-accent shadow-[0_8px_20px_-4px_rgba(46,91,255,0.40)] ring-1 ring-white/20"
                              : "bg-white/95 hover:bg-white text-ink border-black/[0.08] hover:border-accent/40 shadow-[0_2px_6px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="text-[12.5px] font-semibold">{niche.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Interactive Calculate Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleRunCalculation}
                    className="w-full py-3.5 px-6 rounded-full font-body font-semibold text-[13.5px] text-white bg-gradient-to-r from-accent via-[#2855F8] to-accent hover:brightness-110 shadow-[0_10px_25px_-5px_rgba(46,91,255,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                  >
                    <span className="relative z-10">{calculated ? "🔄 Recalculate 90-Day Model" : "⚡ Calculate 90-Day Trajectory"}</span>
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                    <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                {/* Time saved pill */}
                <div className="p-3 rounded-2xl bg-white/90 border border-black/[0.06] shadow-[0_2px_8px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-ink-soft">
                      Estimated founder time saved per month:
                    </span>
                  </div>
                  <span className="font-semibold text-ink font-mono">~45 Hours / mo</span>
                </div>
              </div>

              {/* Right Column: Projected ROI Dashboard Card (Sculpted Porcelain Surface) */}
              <div className="lg:col-span-5 relative rounded-[22px] p-[1px] bg-gradient-to-br from-white via-black/[0.08] to-black/[0.12] shadow-[0_16px_40px_-10px_rgba(15,26,46,0.08)]">
                <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F4] to-[#F2EFE8] text-ink rounded-[21px] p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden min-h-[360px]">
                  {/* Soft ambient studio lighting */}
                  <div
                    className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-50 blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(46,91,255,0.12) 0%, transparent 70%)" }}
                  />

                  {/* State A: Loading / Simulation Transition */}
                  {calculating ? (
                    <div className="flex flex-col items-center justify-center text-center h-full my-auto animate-in fade-in duration-200 relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin mb-3" />
                      <div className="font-display font-semibold text-[16px] text-ink mb-1">
                        Simulating 90-Day Curve...
                      </div>
                      <div className="font-mono text-[11px] text-ink-soft">
                        Matching {selectedTier.label} with 85+ creator datasets
                      </div>
                    </div>
                  ) : !calculated ? (
                    /* State B: Prompt First / Ready Teaser State */
                    <div className="flex flex-col justify-between h-full text-left animate-in fade-in duration-200 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                          <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-soft font-semibold">
                            90-Day Simulator
                          </span>
                        </div>

                        <h3 className="font-display font-medium text-[19px] sm:text-[21px] text-ink tracking-tight mb-2">
                          Ready to model your trajectory?
                        </h3>
                        <p className="font-body text-[12.5px] text-ink-soft leading-relaxed mb-5">
                          Configure your baseline audience, cadence, and category on the left, then tap <strong>Calculate</strong> to forecast your views, followers, and deal pipeline.
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2.5 text-[11.5px] font-mono text-ink-soft bg-white/80 p-2 rounded-xl border border-black/[0.05]">
                            <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[9px] font-bold">✓</span>
                            <span>Modeled on 85+ verified founder campaigns</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[11.5px] font-mono text-ink-soft bg-white/80 p-2 rounded-xl border border-black/[0.05]">
                            <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[9px] font-bold">✓</span>
                            <span>Algorithmic APV retention &amp; Explore velocity</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[11.5px] font-mono text-ink-soft bg-white/80 p-2 rounded-xl border border-black/[0.05]">
                            <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[9px] font-bold">✓</span>
                            <span>100% Organic trajectory · Zero ad spend burn</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={handleRunCalculation}
                          className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-accent to-[#2049E0] hover:brightness-110 text-white font-body font-semibold text-[13px] flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(46,91,255,0.4)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                        >
                          <span>⚡ Calculate 90-Day Trajectory</span>
                          <span>→</span>
                        </button>
                        <p className="text-center text-[9px] font-mono text-ink-soft/70 mt-2">
                          Tap button to generate live model
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* State C: Calculated Results Ready */
                    <div className="flex flex-col justify-between h-full animate-in fade-in zoom-in-95 duration-200 relative z-10">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-soft font-semibold">
                            90-Day Model Result
                          </span>
                          <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 font-bold flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Ready &amp; Verified</span>
                          </span>
                        </div>

                        {/* Primary Metric 1: Projected Views */}
                        <div className="bg-white/90 rounded-2xl p-4 border border-black/[0.06] shadow-[0_4px_16px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)] mb-3.5">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft">
                              Projected Algorithmic Impressions
                            </div>
                            <DeltaChip delta={viewsDelta} />
                          </div>
                          <div className="text-3xl sm:text-4xl font-display font-bold text-ink tracking-tight">
                            {formatNumber(projectedViews)}+
                          </div>
                          <div className="text-[10.5px] text-ink-soft mt-0.5">
                            Across Instagram Reels &amp; LinkedIn syndication
                          </div>
                        </div>

                        {/* Primary Metric 2: Net Follower Gain & Pipeline */}
                        <div className="grid grid-cols-2 gap-3 mb-3.5">
                          <div className="bg-white/90 rounded-2xl p-3.5 border border-black/[0.06] shadow-[0_4px_16px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)]">
                            <div className="text-[9.5px] font-mono uppercase tracking-wider text-ink-soft mb-1">
                              Target Inflow
                            </div>
                            <div className="text-xl sm:text-2xl font-display font-bold text-accent">
                              +{formatNumber(rawFollowersMin)} – {formatNumber(projectedFollowersMax)}
                            </div>
                            <div className="text-[9px] text-ink-soft mt-0.5">High-affinity followers</div>
                          </div>
                          <div className="bg-white/90 rounded-2xl p-3.5 border border-black/[0.06] shadow-[0_4px_16px_rgba(15,26,46,0.03),inset_0_1px_0_rgba(255,255,255,1)]">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <div className="text-[9.5px] font-mono uppercase tracking-wider text-ink-soft">
                                Est. Pipeline
                              </div>
                              <DeltaChip delta={pipelineDelta} />
                            </div>
                            <div className="text-xl sm:text-2xl font-display font-bold text-ink">
                              {formatCurrency(projectedPipeline)}
                            </div>
                            <div className="text-[9px] text-ink-soft mt-0.5">Inbound deal value</div>
                          </div>
                        </div>

                        {/* Audience ladder */}
                        <div className="bg-white/80 rounded-2xl p-3 border border-black/[0.06] mb-3.5">
                          <div className="flex items-center justify-between text-[8.5px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                            <span>Audience ladder</span>
                            <span className="font-semibold text-ink">{ladderPct >= 100 ? "100K+ territory" : `${ladderPct}% toward 100K`}</span>
                          </div>
                          <div
                            className="h-2 rounded-full bg-black/[0.06] overflow-hidden p-0.5"
                            role="img"
                            aria-label={`Projected inflow reaches ${ladderPct}% toward 100K followers`}
                          >
                            <div
                              className="calc-ladder h-full rounded-full bg-gradient-to-r from-accent via-blue-500 to-indigo-500"
                              style={{ width: `${ladderPct}%` }}
                            />
                          </div>
                        </div>

                        {/* Recommended Blueprint Badge */}
                        <div className="bg-white rounded-2xl p-3.5 border border-accent/25 shadow-[0_4px_16px_rgba(46,91,255,0.06),inset_0_1px_0_rgba(255,255,255,1)] mb-4">
                          <div className="text-[9px] font-mono uppercase tracking-wider text-accent font-bold mb-0.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span>Recommended Agency Blueprint</span>
                          </div>
                          <div className="text-[13px] font-semibold text-ink">
                            {selectedNiche.sprint}
                          </div>
                          <div className="text-[10.5px] text-ink-soft mt-0.5">
                            Full scriptwriting, kinetic editing, sound design &amp; retention tracking.
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-1.5 pt-1">
                        <Button
                          variant="primary"
                          href="/contact"
                          onClick={handleBookWithTrajectory}
                          className="w-full justify-center !bg-gradient-to-b !from-[#131F37] !to-[#0B1322] hover:!brightness-110 !text-white text-[13.5px] font-semibold py-3 shadow-[0_12px_28px_-6px_rgba(15,26,46,0.30)]"
                          ariaLabel="Lock this 90-day trajectory on a call"
                        >
                          Lock This 90-Day Trajectory →
                        </Button>
                        <p className="text-center text-[9px] font-mono text-ink-soft">
                          Zero ad spend burn · 100% white-glove organic engine
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
