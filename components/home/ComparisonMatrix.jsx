"use client";

import Button from "@/components/core/Button";
import Section from "@/components/core/Section";

const COMPARISON_ROWS = [
  {
    dimension: "Long-Term Asset Value",
    orgix: "Permanent compounding authority. Videos continue generating views & inbound pipeline for 12+ months.",
    ads: "Zero compounding value. The moment you stop paying Meta/Google, your reach drops to absolute zero.",
    freelancer: "Fragmented one-off files with no unified brand positioning or long-term growth architecture.",
  },
  {
    dimension: "Editorial & Sound Design Quality",
    orgix: "Cinema-grade 4K pacing, custom foley, sub-bass transitions & frame-by-frame kinetic typography.",
    ads: "Repetitive ad-creative templates that viewers reflexively skip within the first 1.5 seconds.",
    freelancer: "Inconsistent standard presets, lack of retention pacing, and erratic sound levels.",
  },
  {
    dimension: "Viral Scripting & Creative Direction",
    orgix: "Dedicated retention strategist testing psychological hooks, audience data, and viral formats.",
    ads: "Creative guesswork focused on direct pitches that trigger immediate ad resistance.",
    freelancer: "You write every script yourself. You must think of all hooks, angles, and formats alone.",
  },
  {
    dimension: "Founder Time Commitment",
    orgix: "< 90 minutes per month. You simply batch-record your insights; our team handles everything else.",
    ads: "Weekly ad review calls, creative fatigue meetings, and constantly escalating customer acquisition costs.",
    freelancer: "15–20 hours / month reviewing edits, managing timeline delays, and repeating basic instructions.",
  },
  {
    dimension: "Capital Efficiency & Economics",
    orgix: "Fixed monthly investment with unlimited algorithmic upside and zero media-budget burn.",
    ads: "Escalating ad auction inflation (Meta CPMs up 35%+ YoY) eating straight into operating margins.",
    freelancer: "Unpredictable per-video billing, hidden revision fees, and constant re-hiring costs.",
  },
];

export default function ComparisonMatrix() {
  const handleOpenConsult = (e) => {
    e?.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-consultation", { detail: { source: "comparison" } })
      );
    }
  };

  return (
    <Section id="comparison" bgAlt={false} className="select-none overflow-hidden py-16 sm:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="editorial-kicker mb-3 inline-block">09 / Strategic Comparison</span>
          <h2 className="display-h2 mb-4">Renting reach vs. owning authority.</h2>
          <p className="body-editorial text-center mx-auto">
            Why high-ticket founders and venture-backed creators partner with Orgix instead of burning budget on performance ads or gambling on freelancer roulette.
          </p>
        </div>

        {/* Desktop / Tablet Comparison Grid */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <div className="min-w-[840px] bg-white rounded-[28px] border border-line overflow-hidden shadow-[0_20px_50px_rgba(15,26,46,0.05)]">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-line bg-[#FAF8F5] text-left">
              {/* Strategic Dimension */}
              <div className="col-span-3 p-5 lg:p-6 text-[12px] font-mono uppercase tracking-wider text-ink-soft flex items-center">
                Strategic Dimension
              </div>

              {/* Orgix Column Highlight */}
              <div className="col-span-3 p-5 lg:p-6 bg-ink text-white relative flex flex-col justify-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent text-[9px] font-mono uppercase tracking-wider font-semibold text-white mb-2 w-fit whitespace-nowrap">
                  The Compounding Engine
                </div>
                <div className="text-[18px] font-display font-semibold">Orgix Media</div>
                <div className="text-[11.5px] text-white/60 mt-0.5">End-to-End Organic Authority</div>
              </div>

              {/* Alternative A */}
              <div className="col-span-3 p-5 lg:p-6 text-left border-l border-line flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Alternative A
                </div>
                <div className="text-[16px] font-semibold text-ink">Paid Meta & Google Ads</div>
                <div className="text-[11.5px] text-ink-soft mt-0.5">Ad-spend dependent</div>
              </div>

              {/* Alternative B */}
              <div className="col-span-3 p-5 lg:p-6 text-left border-l border-line flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Alternative B
                </div>
                <div className="text-[16px] font-semibold text-ink">Freelancers / Agencies</div>
                <div className="text-[11.5px] text-ink-soft mt-0.5">Disjointed execution</div>
              </div>
            </div>

            {/* Table Body Rows */}
            <div className="divide-y divide-line">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-stretch transition-colors hover:bg-[#FAF8F5]/50"
                >
                  {/* Dimension label */}
                  <div className="col-span-3 p-5 lg:p-6 flex items-center">
                    <span className="text-[14px] font-semibold text-ink font-body">
                      {row.dimension}
                    </span>
                  </div>

                  {/* Orgix cell (highlighted) */}
                  <div className="col-span-3 p-5 lg:p-6 bg-[#0F1A2E]/[0.03] border-x border-ink/10 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold">
                      ✓
                    </span>
                    <p className="text-[13px] leading-relaxed text-ink font-medium">
                      {row.orgix}
                    </p>
                  </div>

                  {/* Paid Ads cell */}
                  <div className="col-span-3 p-5 lg:p-6 border-r border-line flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✕
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-ink-soft">
                      {row.ads}
                    </p>
                  </div>

                  {/* Freelancers cell */}
                  <div className="col-span-3 p-5 lg:p-6 flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      △
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-ink-soft">
                      {row.freelancer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Action */}
            <div className="p-6 bg-[#FAF8F5] border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[13px] text-ink-soft">
                Ready to stop renting attention and start owning permanent distribution?
              </div>
              <Button
                variant="primary"
                href="/contact"
                onClick={handleOpenConsult}
                className="whitespace-nowrap"
                ariaLabel="Switch to organic authority"
              >
                Partner with Orgix →
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stacked Cards (Visible on Small Screens) */}
        <div className="md:hidden space-y-4">
          {COMPARISON_ROWS.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] border border-line p-5 shadow-xs space-y-3"
            >
              <h3 className="text-[14px] font-semibold text-ink font-body pb-2 border-b border-line">
                {row.dimension}
              </h3>

              {/* Orgix Option */}
              <div className="p-3 rounded-[12px] bg-[#0F1A2E] text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                  <span>✓</span> Orgix Media
                </div>
                <p className="text-[12px] leading-relaxed text-white/90">
                  {row.orgix}
                </p>
              </div>

              {/* Paid Ads */}
              <div className="p-2.5 rounded-[12px] bg-[#FBF9F5] border border-line space-y-0.5 text-left">
                <div className="text-[10.5px] font-mono text-red-600 font-semibold uppercase tracking-wider">
                  ✕ Paid Meta / Google Ads
                </div>
                <p className="text-[11.5px] leading-snug text-ink-soft">
                  {row.ads}
                </p>
              </div>

              {/* Freelancers */}
              <div className="p-2.5 rounded-[12px] bg-[#FBF9F5] border border-line space-y-0.5 text-left">
                <div className="text-[10.5px] font-mono text-amber-700 font-semibold uppercase tracking-wider">
                  △ Freelancers / Upwork
                </div>
                <p className="text-[11.5px] leading-snug text-ink-soft">
                  {row.freelancer}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-2 text-center">
            <Button
              variant="primary"
              href="/contact"
              onClick={handleOpenConsult}
              className="w-full justify-center"
              ariaLabel="Switch to organic authority"
            >
              Partner with Orgix →
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
