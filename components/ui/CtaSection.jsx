"use client";

import Button from "./Button";
import { FadeUp } from "../motion/MotionPrimitives";

export default function CtaSection({ index = "11" }) {
  const handleStartGrowing = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { source: "final-cta" },
      })
    );
  };

  return (
    <section className="relative py-24 md:py-36 bg-background border-t border-border/80 overflow-hidden text-center" id="start">
      {/* Ambient background depth: soft center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-accent/[0.08] to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="container relative z-10 max-w-4xl">
        <FadeUp delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono tracking-wider uppercase text-ink-secondary mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{index} — STRATEGIC INITIATION · BESPOKE ONBOARDING</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h2 className="text-[2.75rem] sm:text-[4rem] lg:text-[5rem] font-display font-normal tracking-[-0.035em] text-ink-primary leading-[1.0] mb-6 text-balance">
            Your expertise <br />
            <span className="text-accent">deserves</span> an audience.
          </h2>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p className="text-body-md sm:text-body-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Tell us what you want to be known for. We'll map your 90-day organic content trajectory — with zero ad spend and zero obligation.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartGrowing}
              magnetic
              ariaLabel="Book a free personal brand strategy call"
            >
              Start Growing
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="/work"
              iconName="arrow"
              ariaLabel="Explore our documented case studies"
            >
              Explore Case Studies
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-ink-muted uppercase tracking-wider">
            <span>Free 1:1 Strategy Audit</span>
            <span>·</span>
            <span className="text-accent">100% Organic Execution</span>
            <span>·</span>
            <span>Zero Ad Spend</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
