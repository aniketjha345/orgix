"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { imgSrc } from "@/data/site";

// ── Complete Flagship Case Dossiers Intelligence Dataset ───────────────────
const flagshipCases = [
  {
    id: "pari-jain",
    name: "Pari Jain",
    role: "Founder & Category Authority",
    handle: "@officialparijain",
    igUrl: "https://www.instagram.com/officialparijain",
    avatar: "/images/founders/pari-jain.jpg",
    proofImg: "/images/stories/pari-jain.jpg",
    badge: "Flagship Authority",
    category: "Founders",
    accent: "lime",
    statHero: "129,000+",
    statSub: "ORGANIC FOLLOWERS · FROM ZERO",
    timeframe: "9 Months Compounding",
    totalViews: "85,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "High-Ticket Advisory & Speaking Engagements",
    trajectory: [
      { label: "DAY 0", val: "0" },
      { label: "MONTH 3", val: "35K" },
      { label: "NOW", val: "129K+" },
    ],
    challenge:
      "Possessed deep executive expertise in business storytelling and brand building, but had zero digital footprint. Valuable ideas were getting lost in inconsistent reels with no conversion mechanism.",
    solution:
      "Orgix built an end-to-end authority engine: contrarian 3-second hook scripting, cinematic retention pacing, and bi-monthly guided studio shoots that repeatedly capture Instagram Explore and Suggested feeds.",
    deliverables: [
      "Contrarian 3-Second Hook Architecture",
      "Bi-Monthly Guided Studio Shoots",
      "High-Retention Sound & Narrative Editing",
      "Bio-Funnel & Advisory Inbound Engine",
    ],
    highlight:
      "Scaled from an unranked profile to India's premier personal branding authority with 100% organic growth and ₹0 ad spend.",
  },
  {
    id: "tools-fact",
    name: "Tools Fact",
    role: "Software & AI Media Brand",
    handle: "@toolsfact",
    igUrl: "https://www.instagram.com/toolsfact",
    avatar: "/images/stories/tools-fact.jpg",
    proofImg: "/images/stories/tools-fact.jpg",
    badge: "Direct Revenue Engine",
    category: "Brands",
    accent: "orange",
    statHero: "₹35L+",
    statSub: "DIRECT COMMERCIAL SALES",
    timeframe: "7 Months Active Funnel",
    totalViews: "120,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "₹35,00,000+ Inbound Software Sales & Brand Sponsors",
    trajectory: [
      { label: "AUDIT", val: "0 Funnel" },
      { label: "MONTH 2", val: "Tool Workflows" },
      { label: "NOW", val: "₹35L+ Sales" },
    ],
    challenge:
      "Tools Fact was generating occasional viral reach, but had zero monetization infrastructure. Millions of views were bouncing without translating into software sales or buyer lists.",
    solution:
      "Restructured every video script around a high-intent 'Problem-Tool-Workflow' narrative framework. Every reel answered an urgent workflow pain point, routing viewers into automated ManyChat DM funnels that convert attention into paying customers.",
    deliverables: [
      "High-Intent Commercial Scriptwriting",
      "Screen-Recorded Demos & Dynamic B-Roll",
      "DM Keyword Automation & Lead Capture",
      "Software Sponsorship Monetization",
    ],
    highlight:
      "Engineered problem-tool video scripts that converted organic views into ₹35,00,000+ in direct software sales.",
  },
  {
    id: "demla-brothers",
    name: "Pawan & Chirag Demla",
    role: "Co-Founders · Cellbell (Shark Tank S2)",
    handle: "@demlabrothers",
    igUrl: "https://www.instagram.com/demlabrothers",
    avatar: "/images/creators/demla-brothers.jpg",
    proofImg: "/images/stories/demla-brothers.jpg",
    badge: "Shark Tank Featured",
    category: "Founders",
    accent: "violet",
    statHero: "23.1K+",
    statSub: "FOUNDER BRAND EQUITY",
    timeframe: "12 Months Continuous",
    totalViews: "45,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "4.8x B2B Inquiries & National Brand Prestige",
    trajectory: [
      { label: "START", val: "Post-Shark Tank" },
      { label: "MONTH 4", val: "Factory BTS" },
      { label: "NOW", val: "4.8x Inquiries" },
    ],
    challenge:
      "After appearing on Shark Tank India S2, Cellbell had national recognition but lacked an ongoing founder voice. Corporate product marketing was experiencing diminishing returns on paid ads.",
    solution:
      "Positioned Pawan and Chirag Demla as visionary D2C leaders. Through behind-the-scenes factory tours, supply chain transparency, and startup lessons, their personal channels became Cellbell's highest-ROI organic growth asset.",
    deliverables: [
      "Executive Founder Storytelling Matrix",
      "On-Site Factory & Warehouse Shoots",
      "B2B Authority & Industry Positioning",
      "Multi-Platform Distribution (IG + LinkedIn)",
    ],
    highlight:
      "Transformed national Shark Tank television fame into compounding founder equity driving 4.8x B2B enterprise inquiries.",
  },
  {
    id: "shivam-careers",
    name: "Shivam Careers",
    role: "Career, Tech & AI Authority",
    handle: "@shivamcareer",
    igUrl: "https://www.instagram.com/shivamcareer",
    avatar: "/images/creators/shivam.jpg",
    proofImg: "/images/stories/shivam-careers.jpg",
    badge: "Velocity Benchmark",
    category: "Creators",
    accent: "cyan",
    statHero: "100K+ in 80 Posts",
    statSub: "1,250 FOLLOWERS / POST AVERAGE",
    timeframe: "Record Velocity (80 Posts)",
    totalViews: "60,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "Sold-Out AI Masterclasses & Cohorts",
    trajectory: [
      { label: "POST 1", val: "0" },
      { label: "POST 40", val: "48K Saves" },
      { label: "POST 80", val: "100K+ Scale" },
    ],
    challenge:
      "The tech and career niche is flooded with repetitive tips. Shivam needed a distinctive visual format and hook discipline that would break through audience fatigue and double retention.",
    solution:
      "Engineered proprietary visual cheat sheets, actionable screen walkthroughs, and ruthless 3-second hook loops. Optimized for saves and DM shares, triggering continuous algorithm recommendation.",
    deliverables: [
      "Proprietary 3-Second Hook Matrix",
      "Visual Cheat Sheet & Infographic Overlays",
      "Retention Loop Sound & Pacing",
      "Cohort & Masterclass Funnel Architecture",
    ],
    highlight:
      "Scaled to 100,000+ followers in just 80 posts, averaging 1,250 followers per post through retention-loop scripting.",
  },
  {
    id: "ca-jyoti-goyal",
    name: "CA Jyoti Goyal",
    role: "Chartered Accountant & Tax Strategist",
    handle: "@ca.jyotigoyal",
    igUrl: "https://www.instagram.com/ca.jyotigoyal",
    avatar: "/images/creators/jyoti-goyal.jpg",
    proofImg: "/images/stories/ca-jyoti-goyal.jpg",
    badge: "Authority Architecture",
    category: "Creators",
    accent: "lime",
    statHero: "36.7K+",
    statSub: "HIGH-NET-WORTH INBOUND",
    timeframe: "6 Months Compounding",
    totalViews: "28,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "300+ Paid High-Ticket Tax Consultations",
    trajectory: [
      { label: "BEFORE", val: "Tax Jargon" },
      { label: "MONTH 2", val: "Viral Wealth Hacks" },
      { label: "NOW", val: "300+ Clients" },
    ],
    challenge:
      "Tax laws, GST compliance, and financial filing are dry subjects that traditionally struggle on short-form video algorithms.",
    solution:
      "Recut complex tax codes into punchy, relatable consumer hacks (e.g. 'How founders legally save 40% tax'). Combined with high-trust presentation coaching and animated kinetic typography.",
    deliverables: [
      "Tax Law to Viral Narrative Translation",
      "Camera Confidence & Delivery Direction",
      "High-Trust Infographic Styling",
      "Consultation Booking Funnel Integration",
    ],
    highlight:
      "Turned dry tax education into viral, high-trust reels that generated over 300 paid high-ticket client consultations.",
  },
  {
    id: "akash-pandey",
    name: "Akash Pandey",
    role: "Tech & Career Coach",
    handle: "@growithakash",
    igUrl: "https://www.instagram.com/growithakash",
    avatar: "/images/creators/akash-pandey.jpg",
    proofImg: "/images/stories/akash-pandey.jpg",
    badge: "Growth Pipeline",
    category: "Founders",
    accent: "lime",
    statHero: "120,000+",
    statSub: "TECH CAREER COMMUNITY",
    timeframe: "8 Months Compounding",
    totalViews: "40,000,000+",
    adSpend: "₹0 (100% Organic)",
    commercialImpact: "Continuous High-Ticket 1:1 Mentorship Inbound",
    trajectory: [
      { label: "START", val: "Unranked" },
      { label: "MONTH 3", val: "45K Viral Series" },
      { label: "NOW", val: "120K+ Authority" },
    ],
    challenge:
      "Inconsistent posting cadence and generic career advice failing to convert viewers into paying mentorship students.",
    solution:
      "Implemented a structured weekly studio sprint combining salary negotiation breakdowns, resume critiques, and automated DM application funnels.",
    deliverables: [
      "Tech Career Narrative Framework",
      "Weekly Content Pipeline Direction",
      "Automated Lead Capture DM Engine",
      "Mentorship Inbound Funnel Setup",
    ],
    highlight:
      "Built an authoritative 120,000+ member career community generating consistent inbound students.",
  },
];

const filterCategories = [
  { id: "all", label: "All Flagships", count: "06" },
  { id: "founders", label: "Founders & Shark Tank", count: "03" },
  { id: "creators", label: "Authority Creators", count: "02" },
  { id: "brands", label: "Revenue & Brands", count: "02" },
];

export default function CaseWall({ showAllLink = true }) {
  const [activeTab, setActiveTab] = useState("all");
  const [activeDossier, setActiveDossier] = useState(null);
  const [dossierTab, setDossierTab] = useState("strategy"); // 'strategy' | 'proof'
  const [proofPreviews, setProofPreviews] = useState({}); // { [id]: boolean }
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter cases dynamically based on active tab
  const filteredCases = useMemo(() => {
    if (activeTab === "all") return flagshipCases;
    if (activeTab === "founders") {
      return flagshipCases.filter(
        (c) => c.category === "Founders" || c.id === "demla-brothers"
      );
    }
    if (activeTab === "creators") {
      return flagshipCases.filter((c) => c.category === "Creators");
    }
    if (activeTab === "brands") {
      return flagshipCases.filter(
        (c) => c.category === "Brands" || c.id === "demla-brothers"
      );
    }
    return flagshipCases;
  }, [activeTab]);

  // Pari Jain as featured master case
  const masterCase = flagshipCases[0];
  // Companion cases when 'all' is active (excluding Pari Jain)
  const companionCases = useMemo(() => {
    return flagshipCases.slice(1);
  }, []);

  // Keyboard trap and Esc handler for the Dossier Modal
  useEffect(() => {
    if (!activeDossier) return;

    previouslyFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDossier(null);
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => {
      modalRef.current?.querySelector(".dossier-modal-close")?.focus();
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocusedRef.current?.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [activeDossier]);

  const openDossier = (caseItem, e) => {
    if (e) e.preventDefault();
    setDossierTab("strategy");
    setActiveDossier(caseItem);
  };

  const toggleProof = (id, e) => {
    if (e) e.stopPropagation();
    setProofPreviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleConsultation = (dossier) => {
    setActiveDossier(null);
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { creator: dossier.name, niche: dossier.role },
      })
    );
  };

  const handleNextSlot = (e) => {
    if (e) e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { creator: "Case Study Visitor", niche: "Personal Brand Scale" },
      })
    );
  };

  return (
    <section className="section case-vault" id="work">
      <div className="case-vault-atmosphere" aria-hidden="true" />
      <div className="container">
        {/* ── Executive Header & Live Index ───────────────────────────────── */}
        <div className="case-vault-intro">
          <SectionHead
            index="02"
            kicker="PROVEN TRANSFORMATION SYSTEMS · FLAGSHIP CASE STUDIES"
            title={
              <>
                People who <span className="grad-hot">became brands.</span>
              </>
            }
            lead="Not vanity metrics. Documented authority systems engineered for founders, category creators, and Shark Tank innovators who turned organic reach into compounding equity."
          />
          <div className="case-vault-status" aria-label="Live Case Study Authority Index">
            <span className="case-vault-pulse" />
            <span className="case-vault-status-title">LIVE AUTHORITY VAULT</span>
            <b>06 / 14</b>
            <small>VERIFIED DOSSIERS · ₹0 ADS</small>
          </div>
        </div>

        {/* ── Executive Proof Bar ─────────────────────────────────────────── */}
        <div className="case-vault-proof-bar" aria-label="Key Case Study Metrics">
          <div className="case-proof-kpi">
            <span className="case-proof-val">1,000,000,000+</span>
            <span className="case-proof-lbl">TOTAL ORGANIC VIEWS</span>
          </div>
          <div className="case-proof-sep" aria-hidden="true" />
          <div className="case-proof-kpi">
            <span className="case-proof-val">85+</span>
            <span className="case-proof-lbl">CREATORS &amp; FOUNDERS SCALED</span>
          </div>
          <div className="case-proof-sep" aria-hidden="true" />
          <div className="case-proof-kpi">
            <span className="case-proof-val" style={{ color: "var(--lime)" }}>
              100%
            </span>
            <span className="case-proof-lbl">ORGANIC · ZERO AD SPEND</span>
          </div>
          <div className="case-proof-sep" aria-hidden="true" />
          <div className="case-proof-kpi">
            <span className="case-proof-val" style={{ color: "var(--violet-2)" }}>
              4.8x
            </span>
            <span className="case-proof-lbl">AVG. INBOUND CONVERSION LIFT</span>
          </div>
        </div>

        {/* ── Dynamic Category Switcher ───────────────────────────────────── */}
        <div className="case-vault-filter-bar">
          <div className="case-vault-rail" aria-hidden="true">
            <span>01 · SIGNAL</span>
            <i />
            <span>02 · HOOK MATRIX</span>
            <i />
            <span>03 · AUTHORITY</span>
            <i />
            <span>∞ · COMPOUND</span>
          </div>

          <div className="vault-tabs" role="tablist" aria-label="Filter case studies by category">
            {filterCategories.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`vault-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="vault-tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Flagship Presentation Layout ─────────────────────────────────── */}
        {activeTab === "all" ? (
          <div className="case-vault-showcase">
            {/* 1. Spotlight Master Case: Pari Jain */}
            <Reveal as="article" className="case-spotlight-card">
              <div className="case-spotlight-grid">
                {/* Visual Half */}
                <div className="case-spotlight-visual">
                  <div className="case-spotlight-media">
                    <img
                      src={imgSrc(
                        proofPreviews[masterCase.id]
                          ? masterCase.proofImg
                          : masterCase.avatar
                      )}
                      alt={`${masterCase.name} — ${masterCase.statHero} organic growth`}
                      className={`case-spotlight-img ${
                        proofPreviews[masterCase.id] ? "case-spotlight-img--proof" : ""
                      }`}
                      loading="lazy"
                    />
                    <div className="case-spotlight-vignette" />

                    {/* Generative SVG Trajectory Curve */}
                    {!proofPreviews[masterCase.id] && (
                      <svg
                        className="case-spotlight-svg"
                        viewBox="0 0 400 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 145 C90 142, 170 115, 250 65 C310 28, 360 14, 400 6"
                          stroke="var(--lime)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray="6 4"
                        />
                        <circle cx="400" cy="6" r="6" fill="var(--lime)" className="pulse-svg-dot" />
                        <path
                          d="M0 145 C90 142, 170 115, 250 65 C310 28, 360 14, 400 6 L400 160 L0 160 Z"
                          fill="url(#limeSpotlightGrad)"
                          opacity="0.18"
                        />
                        <defs>
                          <linearGradient id="limeSpotlightGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--lime)" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>

                  {/* Interactive Proof Preview Switcher */}
                  <div className="case-spotlight-toggle-wrap">
                    <button
                      type="button"
                      className={`case-proof-toggle-btn ${
                        proofPreviews[masterCase.id] ? "on" : ""
                      }`}
                      onClick={(e) => toggleProof(masterCase.id, e)}
                      aria-label="Toggle between portrait and verified Instagram profile proof"
                    >
                      <Icon name="eye" size={14} />
                      <span>
                        {proofPreviews[masterCase.id]
                          ? "Show Studio Portrait"
                          : "View Verified IG Proof"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Editorial Content Half */}
                <div className="case-spotlight-content">
                  <div className="case-card-header">
                    <div className="case-badge-cluster">
                      <span className="bento-pill bento-pill--lime">★ FLAGSHIP AUTHORITY</span>
                      <span className="case-verified-badge">
                        <Icon name="verified" size={14} style={{ color: "var(--lime)" }} /> Verified Organic
                      </span>
                    </div>
                    <a
                      href={masterCase.igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-handle-link"
                      aria-label={`${masterCase.name} on Instagram`}
                    >
                      <Icon name="ig" size={14} /> {masterCase.handle}
                    </a>
                  </div>

                  <div className="case-spotlight-hero-block">
                    <div className="case-stat-giant" style={{ color: "var(--lime)" }}>
                      {masterCase.statHero}
                    </div>
                    <div className="case-stat-sublabel">{masterCase.statSub}</div>
                    <h3 className="case-spotlight-title">{masterCase.name}</h3>
                    <p className="case-spotlight-role">{masterCase.role}</p>
                  </div>

                  {/* Velocity Trajectory Steps */}
                  <div className="case-trajectory-strip" aria-label="Growth Milestones">
                    {masterCase.trajectory.map((t, idx) => (
                      <div className="case-trajectory-step" key={t.label}>
                        <small>{t.label}</small>
                        <b>{t.val}</b>
                        {idx < masterCase.trajectory.length - 1 && <i aria-hidden="true" />}
                      </div>
                    ))}
                  </div>

                  {/* 4-Column Quick Metrics Grid */}
                  <div className="case-mini-metrics-grid">
                    <div className="case-mini-kpi">
                      <span className="mini-kpi-val">{masterCase.totalViews}</span>
                      <span className="mini-kpi-lbl">TOTAL VIEWS</span>
                    </div>
                    <div className="case-mini-kpi">
                      <span className="mini-kpi-val" style={{ color: "var(--lime)" }}>
                        {masterCase.adSpend}
                      </span>
                      <span className="mini-kpi-lbl">PAID AD SPEND</span>
                    </div>
                    <div className="case-mini-kpi">
                      <span className="mini-kpi-val">{masterCase.timeframe}</span>
                      <span className="mini-kpi-lbl">TIMEFRAME</span>
                    </div>
                    <div className="case-mini-kpi">
                      <span className="mini-kpi-val" style={{ color: "var(--violet-2)" }}>
                        High-Ticket
                      </span>
                      <span className="mini-kpi-lbl">COMMERCIAL IMPACT</span>
                    </div>
                  </div>

                  {/* Summary & Deliverables */}
                  <p className="case-spotlight-desc">{masterCase.highlight}</p>

                  <div className="case-deliverable-chips">
                    {masterCase.deliverables.slice(0, 3).map((d) => (
                      <span key={d} className="case-chip">
                        <Icon name="check" size={12} style={{ color: "var(--lime)" }} />
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="case-spotlight-actions">
                    <button
                      type="button"
                      className="btn btn--lime btn--sm"
                      onClick={(e) => openDossier(masterCase, e)}
                    >
                      Inspect Full Dossier <Icon name="arrow" size={15} className="arr" />
                    </button>
                    <a
                      href={masterCase.igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--sm"
                    >
                      <Icon name="ig" size={15} /> Verify on IG
                    </a>
                    <button
                      type="button"
                      className="btn btn--glass btn--sm"
                      onClick={() => handleConsultation(masterCase)}
                    >
                      Scale Like Pari <Icon name="zap" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Companion Grid: 5 Power Flagships + 'Next Can Be You' Slot */}
            <div className="case-card-grid">
              {companionCases.map((c, i) => (
                <CaseCard
                  key={c.id}
                  c={c}
                  delay={(i + 1) * 0.08}
                  isProof={proofPreviews[c.id]}
                  onToggleProof={(e) => toggleProof(c.id, e)}
                  onOpenDossier={(e) => openDossier(c, e)}
                />
              ))}

              {/* 6th Slot: High-Converting Invitation Card */}
              <article
                className="case-card case-card--next"
                data-cursor="CLAIM"
                onClick={handleNextSlot}
              >
                <div className="case-next-inner">
                  <div className="case-next-ambient" aria-hidden="true" />
                  <div className="case-card-header">
                    <span className="bento-pill bento-pill--lime">YOUR BRAND</span>
                    <span className="case-verified-badge">
                      <Icon name="trend" size={14} style={{ color: "var(--lime)" }} /> Next In Line
                    </span>
                  </div>

                  <div className="case-next-body">
                    <div className="case-next-symbol" aria-hidden="true">
                      +
                    </div>
                    <div className="case-stat-giant" style={{ color: "var(--lime)" }}>
                      Next Win.
                    </div>
                    <h4 className="case-card-title">
                      Your story <span className="grad-hot">starts here.</span>
                    </h4>
                    <p className="case-card-desc">
                      Every founder on this wall started with zero followers and one strategic call.
                      Let’s engineer your compounding authority engine.
                    </p>
                    <button
                      type="button"
                      className="btn btn--lime btn--sm"
                      style={{ marginTop: 20 }}
                      onClick={handleNextSlot}
                    >
                      Claim Your Slot <Icon name="arrow" size={15} className="arr" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ) : (
          /* ── Category Filtered Grid (Smooth, Balanced, No Empty Slots) ──── */
          <div className="case-card-grid case-card-grid--filtered">
            {filteredCases.map((c, i) => (
              <CaseCard
                key={c.id}
                c={c}
                delay={i * 0.08}
                isProof={proofPreviews[c.id]}
                onToggleProof={(e) => toggleProof(c.id, e)}
                onOpenDossier={(e) => openDossier(c, e)}
              />
            ))}
          </div>
        )}

        {/* ── Section Bottom Strip ─────────────────────────────────────────── */}
        {showAllLink && (
          <div className="case-vault-foot">
            <div className="vault-foot-badge">
              <span className="case-vault-pulse" />
              <span>100% ORGANIC VERIFIED · ZERO PAID AD SPEND · NO SHORTCUTS</span>
            </div>
            <div className="vault-foot-links">
              <Link href="/work" className="btn btn--ghost btn--md">
                Explore Full 14-Client Archive <Icon name="arrow" size={16} className="arr" />
              </Link>
              <button
                type="button"
                className="btn btn--lime btn--md"
                onClick={handleNextSlot}
              >
                Scale Your Brand Like These <Icon name="zap" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Interactive Case Study Dossier Intelligence Modal ─────────────── */}
      {mounted && activeDossier && createPortal(
        <div
          className="dossier-modal-backdrop"
          onClick={() => setActiveDossier(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
        >
          <div
            className="dossier-modal-box"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="dossier-modal-close"
              onClick={() => setActiveDossier(null)}
              aria-label="Close dossier modal"
            >
              <Icon name="close" size={18} />
            </button>

            {/* Modal Header */}
            <div className="dossier-head">
              <img
                src={imgSrc(activeDossier.avatar)}
                alt={activeDossier.name}
                className="dossier-avatar"
              />
              <div className="dossier-head-info">
                <div className="dossier-badge-row">
                  <span className={`bento-pill bento-pill--${activeDossier.accent}`}>
                    {activeDossier.badge}
                  </span>
                  <span className="dossier-category">{activeDossier.category}</span>
                </div>
                <h3 id="dossier-modal-title" className="dossier-title">
                  {activeDossier.name}
                  <Icon name="verified" size={18} style={{ color: "var(--lime)" }} />
                </h3>
                <p className="dossier-role">{activeDossier.role}</p>
                <a
                  href={activeDossier.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-ig-tag"
                >
                  <Icon name="ig" size={14} /> {activeDossier.handle} ↗
                </a>
              </div>
            </div>

            {/* Core KPIs 4-Column Grid */}
            <div className="dossier-metrics-grid">
              <div className="dossier-kpi">
                <span className="kpi-num" style={{ color: "var(--lime)" }}>
                  {activeDossier.statHero}
                </span>
                <span className="kpi-label">{activeDossier.statSub}</span>
              </div>
              <div className="dossier-kpi">
                <span className="kpi-num">{activeDossier.totalViews}</span>
                <span className="kpi-label">ORGANIC VIEWS GENERATED</span>
              </div>
              <div className="dossier-kpi">
                <span className="kpi-num">{activeDossier.timeframe}</span>
                <span className="kpi-label">EXECUTION TIMEFRAME</span>
              </div>
              <div className="dossier-kpi">
                <span className="kpi-num" style={{ color: "var(--lime)" }}>
                  {activeDossier.adSpend}
                </span>
                <span className="kpi-label">PAID ADVERTISING SPEND</span>
              </div>
            </div>

            {/* Modal Internal Navigation: Strategy vs. Verified Proof */}
            <div className="dossier-view-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={dossierTab === "strategy"}
                className={`dossier-view-btn ${dossierTab === "strategy" ? "active" : ""}`}
                onClick={() => setDossierTab("strategy")}
              >
                <Icon name="pen" size={13} /> Strategy &amp; Commercial Payoff
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={dossierTab === "proof"}
                className={`dossier-view-btn ${dossierTab === "proof" ? "active" : ""}`}
                onClick={() => setDossierTab("proof")}
              >
                <Icon name="eye" size={13} /> Verified Social Proof
              </button>
            </div>

            {/* Modal Tab 1: Strategy & Commercial Breakdown */}
            {dossierTab === "strategy" && (
              <div className="dossier-body-grid">
                <div className="dossier-story-col">
                  <div className="dossier-section-label">THE STARTING CHALLENGE</div>
                  <p className="dossier-body-text">{activeDossier.challenge}</p>

                  <div className="dossier-section-label" style={{ marginTop: 22 }}>
                    THE ORGIX STRATEGY &amp; SYSTEM
                  </div>
                  <p className="dossier-body-text">{activeDossier.solution}</p>
                </div>

                <div className="dossier-deliverables-col">
                  <div className="dossier-section-label">SYSTEM DELIVERABLES EXECUTED</div>
                  <ul className="dossier-deliverable-list">
                    {activeDossier.deliverables.map((d) => (
                      <li key={d}>
                        <Icon name="check" size={15} style={{ color: "var(--lime)", flex: "none" }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="dossier-impact-box">
                    <div className="impact-tag">COMMERCIAL PAYOFF</div>
                    <p className="impact-text">{activeDossier.commercialImpact}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Tab 2: Verified Social Proof Image */}
            {dossierTab === "proof" && (
              <div className="dossier-proof-stage">
                <div className="dossier-proof-frame">
                  <img
                    src={imgSrc(activeDossier.proofImg)}
                    alt={`${activeDossier.name} Instagram Proof`}
                    className="dossier-proof-img"
                    loading="lazy"
                  />
                </div>
                <p className="dossier-proof-caption">
                  Direct capture of {activeDossier.name}&apos;s verified Instagram account (
                  {activeDossier.handle}). Built 100% organically through Orgix Media video
                  production sprints.
                </p>
              </div>
            )}

            {/* Modal Bottom Action Footer */}
            <div className="dossier-modal-footer">
              <div className="dossier-guarantee">
                <span className="case-vault-pulse" />
                <span>Documented 100% Organic Case Study</span>
              </div>
              <div className="dossier-footer-actions">
                <a
                  href={activeDossier.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost btn--sm"
                >
                  <Icon name="ig" size={15} /> Verify on Instagram ↗
                </a>
                <button
                  type="button"
                  className="btn btn--lime btn--sm"
                  onClick={() => handleConsultation(activeDossier)}
                >
                  Scale Like {activeDossier.name.split(" ")[0]} <Icon name="arrow" size={15} className="arr" />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

// ── Reusable Individual Flagship Case Card ─────────────────────────────────
function CaseCard({ c, delay, isProof, onToggleProof, onOpenDossier }) {
  return (
    <article className="case-card">
      <div className="case-card-inner">
        {/* Top Header Row */}
        <div className="case-card-header">
          <div className="case-card-creator">
            <img
              src={imgSrc(isProof ? c.proofImg : c.avatar)}
              alt={c.name}
              className={`case-card-avatar ${isProof ? "case-card-avatar--proof" : ""}`}
              loading="lazy"
            />
            <div>
              <div className="case-card-name-row">
                <h4 className="case-card-name">{c.name}</h4>
                <Icon name="verified" size={13} style={{ color: "var(--lime)" }} />
              </div>
              <a
                href={c.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-handle-micro"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="ig" size={11} /> {c.handle}
              </a>
            </div>
          </div>

          <div className="case-card-badge-wrap">
            <span className={`bento-pill bento-pill--${c.accent}`}>{c.badge}</span>
          </div>
        </div>

        {/* Hero Figure & Metric Label */}
        <div className="case-card-hero">
          <div className="case-stat-figure" data-accent={c.accent}>
            {c.statHero}
          </div>
          <div className="case-stat-sub">{c.statSub}</div>
          <p className="case-card-role">{c.role}</p>
        </div>

        {/* Velocity Trajectory Bar */}
        <div className="case-trajectory-strip case-trajectory-strip--card" aria-label="Growth Milestones">
          {c.trajectory.map((t, idx) => (
            <div className="case-trajectory-step" key={t.label}>
              <small>{t.label}</small>
              <b>{t.val}</b>
              {idx < c.trajectory.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>

        {/* Narrative Highlight */}
        <p className="case-card-desc">{c.highlight}</p>

        {/* Deliverables Chips */}
        <div className="case-deliverable-chips">
          {c.deliverables.slice(0, 2).map((d) => (
            <span key={d} className="case-chip case-chip--sm">
              <Icon name="check" size={11} style={{ color: "var(--lime)" }} />
              {d}
            </span>
          ))}
        </div>

        {/* Bottom Actions Row */}
        <div className="case-card-actions">
          <button
            type="button"
            className="case-inspect-action-btn"
            onClick={onOpenDossier}
            aria-label={`Inspect full dossier for ${c.name}`}
          >
            Inspect Dossier <Icon name="arrow" size={13} className="arr" />
          </button>

          <button
            type="button"
            className={`case-preview-proof-btn ${isProof ? "active" : ""}`}
            onClick={onToggleProof}
            title={isProof ? "Show portrait" : "Preview verified Instagram proof"}
          >
            <Icon name="eye" size={13} />
            <span>{isProof ? "Portrait" : "Proof"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
