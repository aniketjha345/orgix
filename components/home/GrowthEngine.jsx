"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps, imgSrc } from "@/data/site";
import Icon from "../core/Icon";

export default function GrowthEngine() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    let ctx;

    const initScrollTrigger = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          stepRefs.current.forEach((el, index) => {
            if (!el) return;
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => setActiveStep(index),
              onEnterBack: () => setActiveStep(index),
            });
          });
        }, sectionRef);
      } catch (err) {
        // Fallback to IntersectionObserver
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const idx = Number(entry.target.getAttribute("data-step-index"));
                if (!isNaN(idx)) setActiveStep(idx);
              }
            });
          },
          { threshold: 0.5 }
        );

        stepRefs.current.forEach((el) => {
          if (el) observer.observe(el);
        });

        return () => observer.disconnect();
      }
    };

    initScrollTrigger();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const current = processSteps[activeStep] || processSteps[0];

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t border-border/60" id="engine">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>04 — THE GROWTH ENGINE</span>
          </div>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-4">
            The 6-Step Growth Engine. <br />
            <span className="text-accent">Zero guesswork.</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-ink-secondary leading-relaxed font-light">
            Every step is handled in-house under one roof in Delhi — from initial audience research to viral hooks, shooting, post-production and DM conversion.
          </p>
        </div>

        {/* Pinned Sticky Scroll Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
          {/* Pinned Left Visual Display */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden bg-surface-muted border border-border p-6 sm:p-8 relative shadow-elevated">
              {/* Active Stage Indicator Badge */}
              <div className="flex items-center justify-between font-mono text-[11px] mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold uppercase tracking-wider">
                  STAGE {current.n} OF 06
                </span>
                <span className="text-ink-muted">
                  ENGINE PIPELINE
                </span>
              </div>

              {/* Graphic Asset Container */}
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#0a0a1f] border border-white/10 mb-6 flex items-center justify-center">
                {processSteps.map((step, idx) => (
                  <img
                    key={step.n}
                    src={imgSrc(step.img)}
                    alt={step.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                      idx === activeStep ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11.5px] font-mono text-white/90">
                  <span>{current.kicker}</span>
                  <span className="text-accent">0{activeStep + 1} / 06</span>
                </div>
              </div>

              {/* Step Summary Block */}
              <div>
                <h3 className="text-heading-lg font-display font-medium text-ink-primary mb-2">
                  {current.title}
                </h3>
                <p className="text-body-sm text-ink-secondary leading-relaxed font-light">
                  {current.text}
                </p>
              </div>

              {/* Quick Stepper Pills for Direct Clicking */}
              <div className="grid grid-cols-6 gap-2 mt-6 pt-4 border-t border-border/80">
                {processSteps.map((s, idx) => (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`py-1.5 rounded text-center font-mono text-[11px] transition-all cursor-pointer ${
                      idx === activeStep
                        ? "bg-accent text-[#0a0a1f] font-bold shadow-[0_0_10px_rgba(196,240,66,0.5)]"
                        : "bg-surface hover:bg-white/10 text-ink-muted"
                    }`}
                  >
                    {s.n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Scrollable Steps */}
          <div className="lg:col-span-6 space-y-12 lg:space-y-24 py-4">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.n}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  data-step-index={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-surface-elevated/90 border-accent/50 shadow-card"
                      : "bg-surface/50 border-border/70 hover:border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 font-mono text-[12px] text-accent mb-3">
                    <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 font-bold">
                      {step.n}
                    </span>
                    <span className="text-ink-muted uppercase tracking-wider">
                      {step.kicker}
                    </span>
                  </div>

                  <h3 className="text-[1.5rem] sm:text-[1.85rem] font-display font-medium text-ink-primary mb-3">
                    {step.title}
                  </h3>

                  <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-4">
                    {step.text}
                  </p>

                  <div className="flex items-center gap-2 text-[12.5px] font-mono text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Included in all monthly creator engagements</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
