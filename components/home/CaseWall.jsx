"use client";

import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { imgSrc } from "@/data/site";

export default function CaseWall({ showAllLink = true }) {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead
          index="02"
          kicker="FLAGSHIP CASE STUDIES · AUTHORITY VAULT"
          title={
            <>
              People who <span className="grad-hot">became brands.</span>
            </>
          }
          lead="Every profile has a person. Every personal brand has a compounding engine. Explore our asymmetrical proof grid — real founders and creators scaled from zero, 100% organically."
        />

        <div className="bento-grid">
          {/* Card 1: 2x2 Hero Featured Case Study (Pari Jain) */}
          <Reveal className="bento-cell bento-cell--hero" as="article">
            <a
              href="/work"
              className="bento-inner bento-link"
              data-cursor="VIEW"
              aria-label="View all case studies including Pari Jain — 129K organic followers"
            >
              <div className="bento-bg">
                <img
                  src={imgSrc("/images/stories/pari-jain.jpg")}
                  alt="Pari Jain — 129K Organic Growth"
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
                {/* Generative SVG Trajectory Curve */}
                <svg
                  className="bento-svg-graph"
                  viewBox="0 0 400 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0 140 C100 135, 180 110, 260 60 C320 20, 370 10, 400 5"
                    stroke="var(--lime)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                  />
                  <circle cx="400" cy="5" r="5" fill="var(--lime)" />
                  <path
                    d="M0 140 C100 135, 180 110, 260 60 C320 20, 370 10, 400 5 L400 160 L0 160 Z"
                    fill="url(#limeGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="limeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--lime)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="bento-content">
                <div className="bento-top">
                  <span className="bento-pill">FEATURED CASE STUDY</span>
                  <span className="bento-verified">
                    <Icon name="verified" size={15} style={{ color: "var(--lime)" }} /> Verified Organic
                  </span>
                </div>

                <div className="bento-bottom">
                  <div className="bento-stat-hero">129,000+</div>
                  <div className="bento-stat-label">ORGANIC FOLLOWERS · FROM ZERO</div>
                  <h3 className="bento-title">Pari Jain</h3>
                  <div className="bento-handle">@officialparijain · Founder &amp; Creator</div>
                  <p className="bento-desc">
                    Scaled from an unranked profile to 129,000+ authentic community members. Zero ad spend, 100% compounding organic reel strategy and narrative hook architecture.
                  </p>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Card 2: 1x1 Stat Anchor */}
          <Reveal className="bento-cell bento-cell--stat" delay={0.08} as="article">
            <div className="bento-inner bento-card-stat">
              <div className="bento-stat-num">1B+</div>
              <div className="bento-stat-head">ORGANIC VIEWS</div>
              <p className="bento-stat-text">
                Generated across Instagram &amp; YouTube algorithms for 85+ founders, creators, and D2C brands.
              </p>
              {/* Procedural Waveform */}
              <div className="bento-waveform" aria-hidden="true">
                {[40, 70, 30, 85, 60, 95, 45, 80, 100, 65, 50, 90, 75, 40, 85, 95, 60, 80, 50].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 3: 1x1 High Conversion Case (Tools Fact) */}
          <Reveal className="bento-cell" delay={0.14} as="article">
            <a
              href="/work"
              className="bento-inner bento-link"
              data-cursor="VIEW"
              aria-label="View case study — Tools Fact, ₹35 Lakhs in software sales"
            >
              <div className="bento-bg">
                <img
                  src={imgSrc("/images/stories/tools-fact.jpg")}
                  alt="Tools Fact — ₹35L in Sales"
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
              </div>
              <div className="bento-content">
                <div className="bento-top">
                  <span className="bento-pill bento-pill--orange">REVENUE PROOF</span>
                  <span className="bento-metric-tag">97.6K+ Followers</span>
                </div>
                <div className="bento-bottom">
                  <div className="bento-mono-figure">₹35L+</div>
                  <h3 className="bento-title-sm">Tools Fact</h3>
                  <div className="bento-handle">@toolsfact · Content to Sales</div>
                  <p className="bento-desc-sm">
                    Engineered viral software breakdown reels that converted attention directly into ₹35 Lakhs+ in software sales.
                  </p>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Card 4: 2x1 Landscape Case Study (Cellbell / Shark Tank) */}
          <Reveal className="bento-cell bento-cell--wide" delay={0.2} as="article">
            <a
              href="/work"
              className="bento-inner bento-card-landscape bento-link"
              data-cursor="VIEW"
              aria-label="View case study — Pawan and Chirag Demla, Cellbell"
            >
              <div className="bento-landscape-visual">
                <img
                  src={imgSrc("/images/stories/demla-brothers.jpg")}
                  alt="Demla Brothers & Cellbell"
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
              </div>
              <div className="bento-landscape-info">
                <div className="bento-top">
                  <span className="bento-pill bento-pill--violet">SHARK TANK FEATURED</span>
                  <span className="bento-metric-tag">Founders · Cellbell</span>
                </div>
                <div className="bento-mono-figure" style={{ color: "var(--violet-2)", marginTop: 12 }}>
                  23.1K+
                </div>
                <h3 className="bento-title-sm">Pawan &amp; Chirag Demla</h3>
                <div className="bento-handle">@demlabrothers · D2C Gaming Furniture</div>
                <p className="bento-desc-sm">
                  Transformed factory founders into celebrated thought-leaders. Founder-led distribution that lowered blended CAC across all retail channels.
                </p>
              </div>
            </a>
          </Reveal>

          {/* Card 5: 1x1 Velocity Case (Shivam Careers) */}
          <Reveal className="bento-cell" delay={0.26} as="article">
            <a
              href="/work"
              className="bento-inner bento-link"
              data-cursor="VIEW"
              aria-label="View case study — Shivam Careers, 100K followers in 80 posts"
            >
              <div className="bento-bg">
                <img
                  src={imgSrc("/images/stories/shivam-careers.jpg")}
                  alt="Shivam Careers — 100K in 80 Posts"
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
              </div>
              <div className="bento-content">
                <div className="bento-top">
                  <span className="bento-pill bento-pill--cyan">VELOCITY BENCHMARK</span>
                  <span className="bento-metric-tag">80 Posts</span>
                </div>
                <div className="bento-bottom">
                  <div className="bento-mono-figure" style={{ color: "var(--cyan)" }}>
                    100K+
                  </div>
                  <h3 className="bento-title-sm">Shivam Careers</h3>
                  <div className="bento-handle">@shivamcareer · Career &amp; AI</div>
                  <p className="bento-desc-sm">
                    From zero to 100,000 career enthusiasts in just 80 tightly scripted, retention-optimized reels.
                  </p>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Card 6: 1x1 Authority Case (CA Jyoti Goyal) */}
          <Reveal className="bento-cell" delay={0.32} as="article">
            <a
              href="/work"
              className="bento-inner bento-link"
              data-cursor="VIEW"
              aria-label="View case study — CA Jyoti Goyal, finance authority"
            >
              <div className="bento-bg">
                <img
                  src={imgSrc("/images/stories/ca-jyoti-goyal.jpg")}
                  alt="CA Jyoti Goyal"
                  className="bento-img"
                  loading="lazy"
                />
                <div className="bento-overlay" />
              </div>
              <div className="bento-content">
                <div className="bento-top">
                  <span className="bento-pill bento-pill--lime">AUTHORITY ARCHITECTURE</span>
                  <span className="bento-metric-tag">Finance &amp; Tax</span>
                </div>
                <div className="bento-bottom">
                  <div className="bento-mono-figure" style={{ color: "var(--lime)" }}>
                    36.7K+
                  </div>
                  <h3 className="bento-title-sm">CA Jyoti Goyal</h3>
                  <div className="bento-handle">@ca.jyotigoyal · Chartered Accountant</div>
                  <p className="bento-desc-sm">
                    Turned technical taxation knowledge into viral, digestible education and closed major corporate sponsorships.
                  </p>
                </div>
              </div>
            </a>
          </Reveal>
        </div>

        {showAllLink && (
          <Reveal style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/work" className="btn btn--ghost btn--lg">
              Explore All 14 Client Case Studies <Icon name="arrow" size={18} className="arr" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
