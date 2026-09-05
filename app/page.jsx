import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import ProductShowcase from "@/components/home/ProductShowcase";
import PersonaCarousel from "@/components/home/PersonaCarousel";
import GrowthEngine from "@/components/home/GrowthEngine";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import SplitCtaBanner from "@/components/home/SplitCtaBanner";
import LeadershipEditorial from "@/components/home/LeadershipEditorial";
import FaqAccordion from "@/components/home/FaqAccordion";
import LatestBlogGrid from "@/components/home/LatestBlogGrid";

export default function HomePage() {
  return (
    <>
      {/* 01 — Full-bleed video hero + floating follower chips + 2 CTAs */}
      <Hero />

      {/* 02 — Trusted-by avatar marquee strip */}
      <TrustedBy />

      {/* 03 — Alternating product showcase: Instagram & YouTube management */}
      <ProductShowcase />

      {/* 04 — Persona carousel: video thumbnails, tabbed by audience, 'Watch case' */}
      <PersonaCarousel />

      {/* 05 — The 6-step Growth Engine: sticky pinned visual with step scroll */}
      <GrowthEngine />

      {/* 06 — Video testimonials carousel + written quotes */}
      <TestimonialCarousel />

      {/* 07 — Split two-column CTA banner (For Creators / For Brands) */}
      <SplitCtaBanner />

      {/* 08 — Leadership editorial 3-card layout with real bios + social links */}
      <LeadershipEditorial />

      {/* 09 — FAQ accordion: plain text, thin divider lines */}
      <FaqAccordion />

      {/* 10 — Latest blog 3-card grid */}
      <LatestBlogGrid />
    </>
  );
}
