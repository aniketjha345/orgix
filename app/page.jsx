import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import CreatorMarquee from "@/components/home/CreatorMarquee";
import Manifesto from "@/components/home/Manifesto";
import Stats from "@/components/home/Stats";

// Below-fold sections are code-split with next/dynamic: each becomes its
// own JS chunk fetched after first paint, while SSR still renders the HTML
// (SEO + no-JS unaffected). Only the first screen ships eagerly.
const ScrollStory = dynamic(() => import("@/components/home/ScrollStory"));
const WhatWeDo = dynamic(() => import("@/components/home/WhatWeDo"));
const GrowthSprint = dynamic(() => import("@/components/home/GrowthSprint"));
const ArchetypeCast = dynamic(() => import("@/components/home/ArchetypeCast"));
const Process = dynamic(() => import("@/components/home/Process"));
const VideoEditingSection = dynamic(() => import("@/components/home/VideoEditingSection"));
const InstagramGrowthSection = dynamic(() => import("@/components/home/InstagramGrowthSection"));
const ResultsSection = dynamic(() => import("@/components/home/ResultsSection"));
const GrowthCalculator = dynamic(() => import("@/components/home/GrowthCalculator"));
const ComparisonMatrix = dynamic(() => import("@/components/home/ComparisonMatrix"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const VideoProof = dynamic(() => import("@/components/home/VideoProof"));
const LeadershipEditorial = dynamic(() => import("@/components/home/LeadershipEditorial"));
const FaqAccordion = dynamic(() => import("@/components/home/FaqAccordion"));
const LatestBlogGrid = dynamic(() => import("@/components/home/LatestBlogGrid"));
const SplitCtaBanner = dynamic(() => import("@/components/home/SplitCtaBanner"));

/**
 * Orgix Media — Personal Branding & Social Growth Agency (Home)
 * Architectural flow mirrors orgixmedia.com, from statement to CTA:
 * - 01 Hero        — typewriter headline + particle ring + avatar proof
 * - 02 Trusted-By  — creator marquee (85+ founders & creators)
 * - 03 Manifesto   — "we turn names into brands" positioning statement
 * - 04 Metrics     — 1B+ views / 85+ scaled / 100% organic (animated)
 * - 05 What We Do  — Instagram + YouTube management, real scope checklists
 * - 06 The Cast    — 4 archetypes (Strategist / Creator / Director / Builder)
 * - 07 Growth Engine — the 6-stage Orgix Operating System (interactive)
 * - 08 Editing     — high-retention reel showcase (iPhone, sound design)
 * - 09 Instagram   — 8K → 111K showstopper with self-drawing graph
 * - 10 Results     — verified creator outcome carousel
 * - 11 Calculator  — interactive 90-day organic velocity & ROI modeler
 * - 12 Comparison  — Orgix Engine vs Paid Ads vs Freelancer
 * - 13 Testimonials— written client proof (crossfade quotes)
 * - 14 VideoProof  — client stories video rail (hover to preview)
 * - 15 Leadership  — the 3 co-founders behind the engine
 * - 16 FAQ         — everything people ask before working with us
 * - 17 Insights    — the Orgix blog
 * - 18 CTA         — "Start Growing" closing panel
 */
export default function HomePage() {
  return (
    <>
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — TRUSTED-BY SOCIAL PROOF MARQUEE */}
      <CreatorMarquee />

      {/* 03 — MANIFESTO / POSITIONING STATEMENT */}
      <Manifesto />

      {/* 04 — COMPOUNDING METRICS (1B+ / 85+ / 100%) */}
      <Stats />

      {/* 04b — THE ORGIX STORY (scroll-view story: 2022 room → 1B+ views era) */}
      <ScrollStory />

      {/* 05 — WHAT WE DO (INSTAGRAM + YOUTUBE MANAGEMENT) */}
      <WhatWeDo />

      {/* 05b — PLAYFUL 10-SEC GROWTH SPRINT (fun hook → book a call) */}
      <GrowthSprint />

      {/* 06 — THE ORGIX CAST (4 CHARACTER ARCHETYPES) */}
      <ArchetypeCast />

      {/* 07 — THE 6-STEP ORGIX GROWTH ENGINE */}
      <Process index="05" />

      {/* 08 — SHORT-FORM VIDEO EDITING */}
      <VideoEditingSection />

      {/* 09 — INSTAGRAM GROWTH SHOWSTOPPER */}
      <InstagramGrowthSection />

      {/* 10 — VERIFIED OUTCOMES CAROUSEL */}
      <ResultsSection />

      {/* 11 — CLIENT STORIES VIDEO RAIL (IMMEDIATELY VALIDATES RESULTS) */}
      <VideoProof />

      {/* 12 — 90-DAY VELOCITY & ROI CALCULATOR */}
      <GrowthCalculator />

      {/* 13 — STRATEGIC COMPARISON MATRIX */}
      <ComparisonMatrix />

      {/* 14 — CLIENT TESTIMONIALS */}
      <TestimonialsSection />

      {/* 15 — LEADERSHIP (3 CO-FOUNDERS) */}
      <LeadershipEditorial />

      {/* 16 — FAQ */}
      <FaqAccordion />

      {/* 17 — LATEST FROM THE STUDIO (BLOG) */}
      <LatestBlogGrid />

      {/* 18 — FINAL CTA */}
      <SplitCtaBanner />
    </>
  );
}
