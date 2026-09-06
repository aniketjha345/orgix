import Hero from "@/components/home/Hero";
import CreatorMarquee from "@/components/home/CreatorMarquee";
import Manifesto from "@/components/home/Manifesto";
import VideoEditingSection from "@/components/home/VideoEditingSection";
import LinkedInSection from "@/components/home/LinkedInSection";
import InstagramGrowthSection from "@/components/home/InstagramGrowthSection";
import StrategySection from "@/components/home/StrategySection";
import ResultsSection from "@/components/home/ResultsSection";
import GrowthCalculator from "@/components/home/GrowthCalculator";
import ComparisonMatrix from "@/components/home/ComparisonMatrix";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProcessStrip from "@/components/home/ProcessStrip";
import SplitCtaBanner from "@/components/home/SplitCtaBanner";

/**
 * Orgix Media — High-Converting Luxury Authority Landing Page
 * Architectural Flow:
 * - Section 1: Hero (typewriter reveal, live cohort urgency, breathing particle ring)
 * - Section 2: Social Proof Bar (greyscale marquee)
 * - Section 3: Manifesto (bg #ECE9E2, progressive blur reveal)
 * - Section 4: Video Editing (iPhone 15 Pro, interactive sound design, reel.webm)
 * - Section 5: LinkedIn (bg #ECE9E2, flipped MacBook, reflection)
 * - Section 6: Instagram Growth (8K->111K counter, drawing graph)
 * - Section 7: Strategy (bg #ECE9E2, calendar 8s scroll loop)
 * - Section 8: Results Carousel (4 verified creator outcome cards)
 * - Section 9: 90-Day Organic Velocity & ROI Calculator (interactive modeler)
 * - Section 10: Comparison Matrix (Orgix Engine vs Paid Ads vs Freelancer Roulette)
 * - Section 11: Testimonials (5s crossfade, Playfair italic, watermark)
 * - Section 12: Process (bg #ECE9E2, sine wave line, #2E5BFF fill)
 * - Section 13: CTA (bg #0F1A2E dark, white ring, aurora gradient)
 */
export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 2 — SOCIAL PROOF BAR */}
      <CreatorMarquee />

      {/* SECTION 3 — MANIFESTO */}
      <Manifesto />

      {/* SECTION 4 — VIDEO EDITING WITH SOUND DESIGN */}
      <VideoEditingSection />

      {/* SECTION 5 — LINKEDIN */}
      <LinkedInSection />

      {/* SECTION 6 — INSTAGRAM GROWTH */}
      <InstagramGrowthSection />

      {/* SECTION 7 — STRATEGY */}
      <StrategySection />

      {/* SECTION 8 — RESULTS CAROUSEL */}
      <ResultsSection />

      {/* SECTION 9 — INTERACTIVE 90-DAY ROI & VELOCITY CALCULATOR */}
      <GrowthCalculator />

      {/* SECTION 10 — STRATEGIC COMPARISON MATRIX */}
      <ComparisonMatrix />

      {/* SECTION 11 — TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 12 — PROCESS */}
      <ProcessStrip />

      {/* SECTION 13 — CTA */}
      <SplitCtaBanner />
    </>
  );
}
