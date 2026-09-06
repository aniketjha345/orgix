"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";

function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    const duration = 1600;
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const progress = elapsed === 1 ? 1 : 1 - Math.pow(2, -10 * elapsed);
      const current = start + (value - start) * progress;

      setDisplayValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));

      if (elapsed < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? displayValue.toFixed(decimals) : displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="metrics">
      <div className="container">
        <SectionHeading
          index="02"
          tag="COMPOUNDING REACH · VERIFIED DATA"
          highlightTag="100% ORGANIC"
          title={
            <>
              Numbers as evidence.{" "}
              <span className="text-accent block sm:inline">Not marketing decoration.</span>
            </>
          }
          subtitle="Every view, follower, and inbound lead is tracked from first-party analytics. We don't buy bots or run paid boosts — we build compounding media equity."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Flagship Monument: 1.0B+ Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-7 sm:p-8 rounded-2xl bg-surface-muted/80 border border-accent/30 shadow-[0_12px_32px_-10px_rgba(46,91,255,0.14)] flex flex-col justify-between overflow-hidden group hover:border-accent/60 transition-colors"
          >
            {/* Top Tag */}
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-accent mb-4">
                <Icon name="zap" size={14} />
                <span>Primary Distribution Metric</span>
              </div>

              {/* Stat Figure */}
              <div className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-display font-medium text-accent tracking-tight leading-none mb-3">
                <AnimatedNumber value={1.0} decimals={1} suffix="B+" />
              </div>

              <div className="text-heading-md font-display font-medium text-ink-primary mb-2">
                Organic Views Generated
              </div>
            </div>

            <p className="text-body-sm text-ink-secondary leading-relaxed font-light mt-4 pt-4 border-t border-border/80">
              Generated exclusively across Instagram Reels and YouTube long-form content. Real human attention, verified watch time, and zero ad spend.
            </p>
          </motion.div>

          {/* Monument 2: 85+ Scaled Authorities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-2xl bg-surface-muted/60 border border-border shadow-subtle flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-ink-secondary mb-4">
                <Icon name="trend" size={14} />
                <span>Velocity Benchmark</span>
              </div>

              <div className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-display font-medium text-ink-primary tracking-tight leading-none mb-3">
                <AnimatedNumber value={85} suffix="+" />
              </div>

              <div className="text-heading-md font-display font-medium text-ink-primary mb-2">
                Founders &amp; Creators Scaled
              </div>
            </div>

            <p className="text-body-sm text-ink-secondary leading-relaxed font-light mt-4 pt-4 border-t border-border/80">
              From day zero to millions of engaged followers. From Shark Tank founders to top tech coaches, internet icons, and doctors.
            </p>
          </motion.div>

          {/* Monument 3: 100% Organic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-2xl bg-surface-muted/60 border border-border shadow-subtle flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-ink-secondary mb-4">
                <Icon name="verified" size={14} />
                <span>Integrity Standard</span>
              </div>

              <div className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] font-display font-medium text-ink-primary tracking-tight leading-none mb-3">
                <AnimatedNumber value={100} suffix="%" />
              </div>

              <div className="text-heading-md font-display font-medium text-ink-primary mb-2">
                Pure Organic Compounding
              </div>
            </div>

            <p className="text-body-sm text-ink-secondary leading-relaxed font-light mt-4 pt-4 border-t border-border/80">
              No paid boosts. No engagement pods. No fake comments. True algorithmic distribution that converts cold scrollers into loyal advocates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
