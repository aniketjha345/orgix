import PageHero from "@/components/ui/PageHero";
import WorkExplorer from "@/components/work/WorkExplorer";
import CtaSection from "@/components/ui/CtaSection";

export const metadata = {
  title: "Our Work — Orgix Media | 14+ Personal Branding Case Studies",
  description:
    "Real stories, real numbers. Founders, creators and brands scaled 100% organically by Orgix Media — from 0 to 129K followers and beyond.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="ARCHIVE OF SELECTED WORK"
        kicker="PORTFOLIO"
        title={
          <>
            Selected work. <br />
            <span className="text-accent">Documented authority.</span>
          </>
        }
        lead="Real founders, real numbers — scaled from zero to category prominence with zero ad spend."
      >
        <div className="flex flex-wrap gap-2.5">
          <span className="px-3 py-1 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono text-ink-secondary">
            1.0B+ Views Generated
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono text-ink-secondary">
            85+ Category Authorities Scaled
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono text-accent">
            100% Organic Distribution
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono text-ink-muted">
            ₹0 Spent on Paid Ads
          </span>
        </div>
      </PageHero>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <WorkExplorer />
        </div>
      </section>

      <CtaSection index="02" />
    </>
  );
}
