"use client";

import { useState } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";

export default function TransformationSlider() {
  const [activeTab, setActiveTab] = useState("comparison"); // "comparison" | "retention"
  const [videoSecond, setVideoSecond] = useState(15);

  // Retention calculation at given second
  // Conventional: sharp drop in first 3s
  const conventionalRetention = Math.max(8, Math.round(100 * Math.exp(-0.14 * videoSecond)));
  // Orgix: high hook retention, holds past 15s
  const orgixRetention = Math.max(38, Math.round(96 * Math.exp(-0.028 * videoSecond)));

  return (
    <section className="section grain" id="transformation">
      <div className="container">
        <SectionHead
          center
          index="04"
          kicker="ANATOMY OF A BREAKTHROUGH"
          title={
            <>
              What happens when you switch to <br />
              <span className="grad-hot">the Orgix Content Engine.</span>
            </>
          }
          lead="Compare the retention, positioning, and commercial inbound reality of typical creator content versus an Orgix-engineered personal brand."
        />

        {/* Interactive View Mode Switcher */}
        <div className="trans-mode-bar">
          <button
            type="button"
            className={`trans-mode-pill ${activeTab === "comparison" ? "active" : ""}`}
            onClick={() => setActiveTab("comparison")}
          >
            <span>01</span> Side-by-Side Breakdown
          </button>
          <button
            type="button"
            className={`trans-mode-pill ${activeTab === "retention" ? "active" : ""}`}
            onClick={() => setActiveTab("retention")}
          >
            <span>02</span>
            <span className="pulse" style={{ display: "inline-block", width: 6, height: 6, marginRight: 6 }} />
            Algorithmic Retention Graph
          </button>
        </div>

        {activeTab === "comparison" ? (
          <Reveal delay={0.08}>
            <div className="trans-dual-grid">
              {/* Card 1: Conventional Way */}
              <div className="trans-dual-card trans-dual-card--before">
                <div className="trans-dual-header">
                  <div className="trans-dual-badge trans-dual-badge--before">
                    THE CONVENTIONAL WAY
                  </div>
                  <span className="trans-dual-status">Low Retention · No Funnel</span>
                </div>

                <div className="trans-dual-stat">
                  <div className="trans-dual-num">1.2K – 3.8K</div>
                  <div className="trans-dual-lbl">Average Reel Reach</div>
                </div>

                <ul className="trans-dual-list">
                  <li className="item-neg">
                    <span className="ic-cross">✕</span>
                    <div>
                      <b>Weak Opening Hooks:</b>
                      <p>Viewers swipe away within 2.5 seconds. The algorithm kills distribution immediately.</p>
                    </div>
                  </li>
                  <li className="item-neg">
                    <span className="ic-cross">✕</span>
                    <div>
                      <b>Unplanned Recording:</b>
                      <p>Rambling thoughts, awkward pacing, poor microphone audio, and flat visual hierarchy.</p>
                    </div>
                  </li>
                  <li className="item-neg">
                    <span className="ic-cross">✕</span>
                    <div>
                      <b>Vanity Chasing:</b>
                      <p>Posting random memes or trending audios that bring zero high-ticket authority.</p>
                    </div>
                  </li>
                  <li className="item-neg">
                    <span className="ic-cross">✕</span>
                    <div>
                      <b>Zero Inbound Pipeline:</b>
                      <p>Lots of effort, zero business deals, zero sponsorships, zero converted clients.</p>
                    </div>
                  </li>
                </ul>

                <div className="trans-card-footer">
                  <span style={{ color: "var(--ink-3)", fontSize: 13 }}>Result: High creator burnout, zero compounding reach.</span>
                </div>
              </div>

              {/* Card 2: The Orgix Engine */}
              <div className="trans-dual-card trans-dual-card--after">
                <div className="trans-glow-orb" aria-hidden="true" />
                <div className="trans-dual-header">
                  <div className="trans-dual-badge trans-dual-badge--after">
                    <span className="pulse" />
                    THE ORGIX CONTENT MACHINE
                  </div>
                  <span className="trans-dual-status" style={{ color: "var(--lime)" }}>
                    100% Organic Hypergrowth
                  </span>
                </div>

                <div className="trans-dual-stat">
                  <div className="trans-dual-num grad-hot">125K – 1.4M+</div>
                  <div className="trans-dual-lbl" style={{ color: "var(--lime)" }}>
                    Consistent Organic Views per Reel
                  </div>
                </div>

                <ul className="trans-dual-list">
                  <li className="item-pos">
                    <span className="ic-check">✓</span>
                    <div>
                      <b>Pattern-Interrupt Hooks:</b>
                      <p>Psychology-backed first 3 seconds engineered to hold 68%+ watch-time past 15s.</p>
                    </div>
                  </li>
                  <li className="item-pos">
                    <span className="ic-check">✓</span>
                    <div>
                      <b>Guided Production &amp; Studio Editing:</b>
                      <p>2 days of recording turns into 30 days of cinematic, high-retention content with sharp cuts and sound design.</p>
                    </div>
                  </li>
                  <li className="item-pos">
                    <span className="ic-check">✓</span>
                    <div>
                      <b>Verified Authority Positioning:</b>
                      <p>Niche domination where viewers, peers, and media see you as the undisputed category leader.</p>
                    </div>
                  </li>
                  <li className="item-pos">
                    <span className="ic-check">✓</span>
                    <div>
                      <b>Inbound Client Flywheel:</b>
                      <p>Organic comments and DMs turn directly into high-paying client contracts and brand partnerships.</p>
                    </div>
                  </li>
                </ul>

                <div className="trans-card-footer trans-card-footer--highlight">
                  <span style={{ color: "var(--lime)", fontWeight: 700, fontSize: 13 }}>
                    Result: 1B+ views generated, 85+ creators scaled to authority.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.08}>
            {/* Tab 2: Algorithmic Watch-Time Simulator */}
            <div className="trans-graph-panel">
              <div className="trans-graph-head">
                <div>
                  <h3 className="trans-graph-title">
                    The 30-Second Algorithm Threshold
                  </h3>
                  <p className="trans-graph-desc">
                    Instagram and YouTube promote videos with high <b>Average Watch Percentage (AWP)</b>. See how Orgix hooks prevent the dreaded drop-off curve.
                  </p>
                </div>
                <div className="trans-graph-scrubber">
                  <label htmlFor="scrubber-input" className="trans-scrubber-lbl">
                    Timeline Scrubber: <b>{videoSecond}s / 30s</b>
                  </label>
                  <input
                    id="scrubber-input"
                    type="range"
                    min="1"
                    max="30"
                    value={videoSecond}
                    onChange={(e) => setVideoSecond(Number(e.target.value))}
                    className="sim-range"
                  />
                </div>
              </div>

              {/* Live Metric Display */}
              <div className="trans-curve-comparison">
                <div className="curve-box curve-box--neg">
                  <span className="curve-lbl">Conventional Video Retention at {videoSecond}s</span>
                  <div className="curve-val" style={{ color: "#f43f5e" }}>
                    {conventionalRetention}%
                  </div>
                  <span className="curve-note">Below algorithmic viral threshold (kills reach)</span>
                </div>
                <div className="curve-box curve-box--pos">
                  <span className="curve-lbl">Orgix Hooked Video Retention at {videoSecond}s</span>
                  <div className="curve-val grad-hot">
                    {orgixRetention}%
                  </div>
                  <span className="curve-note" style={{ color: "var(--lime)" }}>
                    Qualifies for Instagram explore &amp; YouTube recommendation feed
                  </span>
                </div>
              </div>

              {/* Interactive SVG Retention Graph */}
              <div className="trans-svg-wrapper">
                <svg viewBox="0 0 800 240" className="trans-svg" preserveAspectRatio="none" aria-label="Viewer Retention Comparison Graph">
                  <defs>
                    <linearGradient id="orgixGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c8f04d" />
                      <stop offset="50%" stopColor="#ff3d7f" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="orgixFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#c8f04d" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="40" y1="40" x2="780" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="100" x2="780" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="160" x2="780" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="40" y1="210" x2="780" y2="210" stroke="rgba(255,255,255,0.12)" />

                  {/* Y Axis Labels */}
                  <text x="10" y="44" fill="var(--ink-3)" fontSize="10" fontFamily="var(--font-mono)">100%</text>
                  <text x="16" y="104" fill="var(--ink-3)" fontSize="10" fontFamily="var(--font-mono)">60%</text>
                  <text x="16" y="164" fill="var(--ink-3)" fontSize="10" fontFamily="var(--font-mono)">25%</text>
                  <text x="22" y="214" fill="var(--ink-3)" fontSize="10" fontFamily="var(--font-mono)">0%</text>

                  {/* Viral threshold line at 50% */}
                  <line x1="40" y1="120" x2="780" y2="120" stroke="rgba(200,240,77,0.3)" strokeDasharray="6 4" />
                  <text x="640" y="115" fill="var(--lime)" fontSize="10" fontFamily="var(--font-mono)">
                    ★ Viral Recommendation Line
                  </text>

                  {/* Conventional Curve */}
                  <path
                    d="M 40 40 Q 120 180, 240 195 T 500 205 T 780 208"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />

                  {/* Orgix Curve with Gradient Area */}
                  <path
                    d="M 40 40 Q 180 55, 360 85 T 600 110 T 780 135 L 780 210 L 40 210 Z"
                    fill="url(#orgixFill)"
                  />
                  <path
                    d="M 40 40 Q 180 55, 360 85 T 600 110 T 780 135"
                    fill="none"
                    stroke="url(#orgixGrad)"
                    strokeWidth="4"
                  />

                  {/* Dynamic Time Marker */}
                  <line
                    x1={40 + (videoSecond / 30) * 740}
                    y1="20"
                    x2={40 + (videoSecond / 30) * 740}
                    y2="210"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={40 + (videoSecond / 30) * 740}
                    cy={210 - (orgixRetention / 100) * 170}
                    r="6"
                    fill="var(--lime)"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="trans-graph-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "url(#orgixGrad)", borderColor: "var(--lime)" }} />
                  <span><b>Orgix Retention Architecture:</b> Pacing, dynamic B-roll, and micro-hooks keep viewers engaged past 15s</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "#f43f5e", borderColor: "#f43f5e" }} />
                  <span><b>Typical Content Drop-off:</b> 80%+ drop within 3 seconds due to lack of hook structure</span>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
