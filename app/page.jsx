import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Stats from "@/components/home/Stats";
import CaseWall from "@/components/home/CaseWall";
import LeadershipStrip from "@/components/home/LeadershipStrip";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import Testimonials from "@/components/home/Testimonials";
import MythBusters from "@/components/home/MythBusters";
import Process from "@/components/home/Process";
import ServicesCards from "@/components/home/ServicesCards";
import Faq from "@/components/home/Faq";
import CtaSection from "@/components/ui/CtaSection";
import SectionHead from "@/components/ui/SectionHead";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <TrustedBy />
      <Stats />
      <CaseWall />

      <section className="section" id="services">
        <div className="container">
          <SectionHead
            center
            index="03"
            kicker="SERVICE CAPABILITIES · ENGAGEMENT MODELS"
            title={
              <>
                We don't post content.
                <br />
                <span className="grad-brand">We build personal brands.</span>
              </>
            }
            lead="As one of the highest-retention personal branding studios in India, we don't chase trends — we build compounding, organic growth. Two elite services. One obsessive team."
          />
        </div>
        <div className="container" style={{ maxWidth: 1160 }}>
          <ServicesCards />
        </div>
      </section>

      <Process index="04" />
      <VideoTestimonials />
      <Testimonials />
      <MythBusters />
      <LeadershipStrip index="08" />
      <Faq index="09" />
      <MarqueeStrip reverse />
      <CtaSection index="10" kicker="STRATEGIC INITIATION · BESPOKE ONBOARDING" />
    </>
  );
}
