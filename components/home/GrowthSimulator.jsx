"use client";

import { useState, useId } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";

const niches = [
  { id: "founder", label: "Founder / Shark Tank", avgReachPerReel: 85000, convRate: 0.042, baseMultiplier: 1.4 },
  { id: "finance", label: "Personal Finance / CA", avgReachPerReel: 110000, convRate: 0.038, baseMultiplier: 1.6 },
  { id: "tech", label: "Tech / AI / SaaS", avgReachPerReel: 95000, convRate: 0.035, baseMultiplier: 1.5 },
  { id: "d2c", label: "D2C / Skincare / E-Com", avgReachPerReel: 70000, convRate: 0.051, baseMultiplier: 1.3 },
  { id: "fitness", label: "Fitness & Wellness", avgReachPerReel: 90000, convRate: 0.045, baseMultiplier: 1.35 },
  { id: "career", label: "Career & Education", avgReachPerReel: 120000, convRate: 0.040, baseMultiplier: 1.55 },
];

export default function GrowthSimulator() {
  const [selectedNiche, setSelectedNiche] = useState(niches[0]);
  const [currentFollowers, setCurrentFollowers] = useState(15000);
  const [reelsPerMonth, setReelsPerMonth] = useState(20);
  const sliderId1 = useId();
  const sliderId2 = useId();

  // Calculations
  const monthlyViews = Math.round(
    reelsPerMonth * selectedNiche.avgReachPerReel * (1 + Math.log10(Math.max(currentFollowers, 1000)) * 0.12)
  );
  const quarterlyViews = monthlyViews * 3;
  const projectedFollowers = Math.round(
    currentFollowers + (monthlyViews * 0.014 * selectedNiche.baseMultiplier) * 3
  );
  const estimatedLeads = Math.round(
    (monthlyViews * selectedNiche.convRate * 0.01) * 3
  );
  const brandValuationMin = Math.round((monthlyViews / 1000) * 180 * 3 / 1000) * 1000;
  const brandValuationMax = Math.round(brandValuationMin * 1.65 / 1000) * 1000;

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toLocaleString("en-IN");
  };

  const formatRupees = (num) => {
    if (num >= 100000) return "₹" + (num / 100000).toFixed(1) + "L";
    if (num >= 1000) return "₹" + (num / 1000).toFixed(0) + "K";
    return "₹" + num;
  };

  const handleClaim = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: {
          niche: selectedNiche.label,
          followers: currentFollowers,
          reels: reelsPerMonth,
          expectedViews: quarterlyViews,
        },
      })
    );
  };

  return (
    <section className="section grain" id="growth-simulator">
      <div className="container">
        <SectionHead
          center
          index="06"
          kicker="ORGANIC ROI SIMULATOR"
          title={
            <>
              Simulate your <span className="grad-hot">organic growth potential.</span>
            </>
          }
          lead="Adjust your niche, existing follower base, and content frequency to project your 90-day reach with Orgix Media's 6-step growth engine."
        />

        <Reveal delay={0.1}>
          <div className="sim-panel">
            {/* Left Column: Interactive Inputs */}
            <div className="sim-controls">
              <div className="sim-field">
                <label className="sim-label">
                  <span className="sim-label-num">01</span>
                  <span>Select Your Industry / Creator Niche</span>
                </label>
                <div className="sim-niche-grid">
                  {niches.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className={`sim-niche-pill ${selectedNiche.id === n.id ? "active" : ""}`}
                      onClick={() => setSelectedNiche(n)}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sim-field">
                <div className="sim-slider-head">
                  <label htmlFor={sliderId1} className="sim-label">
                    <span className="sim-label-num">02</span>
                    <span>Current Following (Instagram / YouTube)</span>
                  </label>
                  <span className="sim-slider-val">{formatNumber(currentFollowers)}</span>
                </div>
                <input
                  id={sliderId1}
                  type="range"
                  min="500"
                  max="500000"
                  step="2500"
                  value={currentFollowers}
                  onChange={(e) => setCurrentFollowers(Number(e.target.value))}
                  className="sim-range"
                />
                <div className="sim-range-labels">
                  <span>0 (Brand New)</span>
                  <span>100K</span>
                  <span>250K</span>
                  <span>500K+</span>
                </div>
              </div>

              <div className="sim-field">
                <div className="sim-slider-head">
                  <label htmlFor={sliderId2} className="sim-label">
                    <span className="sim-label-num">03</span>
                    <span>Monthly Content Capacity</span>
                  </label>
                  <span className="sim-slider-val">{reelsPerMonth} Reels / Month</span>
                </div>
                <input
                  id={sliderId2}
                  type="range"
                  min="8"
                  max="30"
                  step="2"
                  value={reelsPerMonth}
                  onChange={(e) => setReelsPerMonth(Number(e.target.value))}
                  className="sim-range"
                />
                <div className="sim-range-labels">
                  <span>8 Reels (Light)</span>
                  <span>16 Reels (Standard)</span>
                  <span>24 Reels (Hypergrowth)</span>
                  <span>30 (Full Domination)</span>
                </div>
              </div>

              <div className="sim-note">
                <Icon name="check" size={16} style={{ color: "var(--lime)", flexShrink: 0 }} />
                <span>
                  All projections benchmarked on real historical performance of <b>85+ Orgix Media accounts</b> in 2024–2026. Zero paid ad spend factored in.
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Live 3D Projected Output */}
            <div className="sim-output">
              <div className="sim-output-header">
                <div className="sim-badge">
                  <span className="pulse" />
                  PROJECTED 90-DAY DELIVERABLES
                </div>
                <div className="sim-niche-badge">{selectedNiche.label}</div>
              </div>

              {/* Main Headline Stat */}
              <div className="sim-main-metric">
                <div className="sim-metric-label">Projected Organic Views (Quarterly)</div>
                <div className="sim-metric-number grad-hot">{formatNumber(quarterlyViews)}+</div>
                <div className="sim-metric-sub">
                  ~{formatNumber(monthlyViews)} monthly impressions across Reels &amp; Shorts
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="sim-metrics-grid">
                <div className="sim-metric-card">
                  <span className="sim-metric-card-lbl">New Follower Benchmark</span>
                  <div className="sim-metric-card-val">
                    +{formatNumber(projectedFollowers - currentFollowers)}
                  </div>
                  <span className="sim-metric-card-sub">
                    Growth to {formatNumber(projectedFollowers)}
                  </span>
                </div>

                <div className="sim-metric-card">
                  <span className="sim-metric-card-lbl">Inbound High-Intent Inquiries</span>
                  <div className="sim-metric-card-val">{estimatedLeads}+</div>
                  <span className="sim-metric-card-sub">Qualified DMs &amp; Deals</span>
                </div>

                <div className="sim-metric-card sim-metric-card--full">
                  <span className="sim-metric-card-lbl">Estimated Organic Media Value (PR Eqv.)</span>
                  <div className="sim-metric-card-val" style={{ color: "var(--lime)" }}>
                    {formatRupees(brandValuationMin)} – {formatRupees(brandValuationMax)}
                  </div>
                  <span className="sim-metric-card-sub">
                    Equivalent ad spend saved via organic viral retention loops
                  </span>
                </div>
              </div>

              {/* Interactive CTA */}
              <div className="sim-cta-wrap">
                <button
                  type="button"
                  onClick={handleClaim}
                  className="btn btn--lime btn--lg btn--block shine"
                >
                  Apply This Strategy to My Brand
                  <Icon name="arrow" size={18} className="arr" />
                </button>
                <div className="sim-guarantee">
                  <Icon name="verified" size={14} style={{ color: "var(--lime)" }} />
                  <span>Includes 1-on-1 strategy teardown with Anant &amp; Pari</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
