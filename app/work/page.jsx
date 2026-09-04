import PageHero from "@/components/ui/PageHero";
import WorkExplorer from "@/components/work/WorkExplorer";
import CtaSection from "@/components/ui/CtaSection";
import Reveal from "@/components/core/Reveal";

export const metadata = {
  title: "Our Work — Orgix Media | 14+ Personal Branding Case Studies",
  description:
    "Real stories, real numbers. Founders, creators and brands scaled 100% organically by Orgix Media — from 0 to 129K followers and beyond.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — ARCHIVE OF WINS"
        kicker="PROOF OVER PROMISES"
        title={
          <>
            Wall of <span className="grad-hot">wins.</span>
          </>
        }
        lead="Every card below is a real founder, creator or D2C brand — with a verified follower count and a documented compounding engine. Filter by category, hover to inspect deliverables."
      >
        <div className="tag-row">
          <span className="mini-tag">1B+ views generated</span>
          <span className="mini-tag">85+ creators scaled</span>
          <span className="mini-tag">100% organic</span>
          <span className="mini-tag">₹0 ad budget</span>
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <WorkExplorer />
        </div>
      </section>

      <CtaSection index="02" kicker="INITIATE YOUR CASE STUDY" />
    </>
  );
}
