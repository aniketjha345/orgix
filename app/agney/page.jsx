import AgneyLoader from "@/components/agney/AgneyLoader";
import AgneyNavbar from "@/components/agney/AgneyNavbar";
import AgneyHero from "@/components/agney/AgneyHero";
import AgneyTrustBar from "@/components/agney/AgneyTrustBar";
import AgneyFeatures from "@/components/agney/AgneyFeatures";
import AgneyHowItWorks from "@/components/agney/AgneyHowItWorks";
import AgneyProducts from "@/components/agney/AgneyProducts";
import AgneyTestimonials from "@/components/agney/AgneyTestimonials";
import AgneyPricing from "@/components/agney/AgneyPricing";
import AgneyFaq from "@/components/agney/AgneyFaq";
import AgneyCtaBanner from "@/components/agney/AgneyCtaBanner";
import AgneyFooter from "@/components/agney/AgneyFooter";

export const metadata = {
  title: "Agney — Ignite Your Potential. Fuel Your Ambition.",
  description:
    "Agney delivers high-velocity infrastructure, autonomous orchestration, and raw computing power for ambitious engineering teams and modern enterprises.",
  openGraph: {
    title: "Agney — Pure Energy & Velocity",
    description:
      "Ignite your potential. Fuel your ambition. High-velocity infrastructure engineered for unstoppable performance.",
    siteName: "Agney",
  },
};

export default function AgneyLandingPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white font-agneyBody antialiased selection:bg-[#FF4500] selection:text-white">
      {/* 2s Loading Window with Thin Percentage Bar */}
      <AgneyLoader />
      {/* 01: Navbar */}
      <AgneyNavbar />

      {/* 02: Hero */}
      <AgneyHero />

      {/* 03: Social Proof / Trust Bar */}
      <AgneyTrustBar />

      {/* 04: Features Section (Why Agney) */}
      <AgneyFeatures />

      {/* 05: How It Works / Process */}
      <AgneyHowItWorks />

      {/* 06: Product / Service Cards */}
      <AgneyProducts />

      {/* 07: Testimonials */}
      <AgneyTestimonials />

      {/* 08: Pricing */}
      <AgneyPricing />

      {/* 09: FAQ */}
      <AgneyFaq />

      {/* 10: CTA Banner */}
      <AgneyCtaBanner />

      {/* 11: Footer */}
      <AgneyFooter />
    </main>
  );
}
