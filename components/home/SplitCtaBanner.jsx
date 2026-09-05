"use client";

import Icon from "../core/Icon";

export default function SplitCtaBanner() {
  const handleCreatorCta = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { source: "split-cta-creator", audience: "Creator / Founder" },
      })
    );
  };

  const handleBrandCta = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { source: "split-cta-brand", audience: "Brand / Organization" },
      })
    );
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="contact-split">
      <div className="container">
        {/* Antigravity Two-Column Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-border/80 bg-surface-muted shadow-card divide-y lg:divide-y-0 lg:divide-x divide-border/70">
          {/* Column 1: For Creators */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>FOR CREATORS &amp; FOUNDERS</span>
              </div>

              <h3 className="text-[1.85rem] sm:text-[2.25rem] font-display font-normal text-ink-primary tracking-tight leading-[1.15] mb-4">
                Ready to turn your expertise into a compounding personal brand?
              </h3>

              <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-8 max-w-lg">
                Ideal for individual founders, executives, creators and category experts who want authentic, 100% organic authority without camera anxiety or operational overhead.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <button
                type="button"
                onClick={handleCreatorCta}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14px] hover:bg-[#d2f758] transition-all duration-200 shadow-[0_0_24px_-6px_rgba(196,240,66,0.3)] flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Start Growing</span>
                <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Column 2: For Brands */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden group bg-surface/50">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-ink-secondary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>FOR BRANDS &amp; ORGANIZATIONS</span>
              </div>

              <h3 className="text-[1.85rem] sm:text-[2.25rem] font-display font-normal text-ink-primary tracking-tight leading-[1.15] mb-4">
                Want founder-led organic reach that outpaces paid advertising?
              </h3>

              <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-8 max-w-lg">
                Ideal for D2C brands, Shark Tank innovators, funded startups, and enterprise teams looking to build organic trust channels that compound over time.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <button
                type="button"
                onClick={handleBrandCta}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-surface-elevated hover:bg-white text-ink-primary hover:text-[#0a0a1f] border border-border/80 font-body font-semibold text-[14px] transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Book a Call</span>
                <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
