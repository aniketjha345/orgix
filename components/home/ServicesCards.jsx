"use client";

import { motion } from "framer-motion";
import Icon from "../core/Icon";
import Button from "../ui/Button";
import { services } from "@/data/site";

export default function ServicesCards({ detailed = false }) {
  const handleStrategyClick = (e, svc) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { service: svc.title, category: svc.name },
      })
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
      {services.map((svc, idx) => {
        const isInstagram = svc.id === "instagram";

        return (
          <motion.article
            key={svc.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl p-7 sm:p-9 flex flex-col justify-between overflow-hidden border transition-all duration-300 group ${
              isInstagram
                ? "bg-surface-muted/90 border-accent/30 shadow-[0_16px_40px_-12px_rgba(196,240,66,0.12)] hover:border-accent/60"
                : "bg-surface-muted/70 border-border hover:border-white/20 shadow-subtle"
            }`}
          >
            {/* Top Meta Bar */}
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] mb-4">
                <span
                  className={`px-2.5 py-1 rounded-full border ${
                    isInstagram
                      ? "bg-accent/10 text-accent border-accent/25"
                      : "bg-white/5 text-ink-secondary border-white/10"
                  }`}
                >
                  {svc.tag}
                </span>
                <span className="text-ink-muted">STAGE 0{svc.index}</span>
              </div>

              <div className="text-[12px] font-mono uppercase tracking-wider text-ink-muted mb-1">
                {svc.name}
              </div>

              <h3 className="text-heading-xl font-display font-normal text-ink-primary tracking-tight mb-3">
                {svc.title}
              </h3>

              <p className="text-body-md text-ink-secondary leading-relaxed font-light mb-6">
                {svc.desc}
              </p>

              {/* Core Features List */}
              <div className="p-4 rounded-xl bg-surface border border-border-subtle mb-6">
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-ink-muted mb-3">
                  Scope of Delivery &amp; Architecture
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {svc.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-[12.5px] text-ink-secondary font-body"
                    >
                      <span className="w-4 h-4 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[10px] shrink-0 font-bold">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Card Footer with Metric Benchmark & CTA */}
            <div className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[1.5rem] font-display font-medium text-accent leading-none mb-1">
                  {svc.stat.value}
                </div>
                <div className="text-[11px] font-mono text-ink-muted">
                  {svc.stat.label}
                </div>
              </div>

              <Button
                variant={isInstagram ? "primary" : "secondary"}
                size="md"
                onClick={(e) => handleStrategyClick(e, svc)}
                iconName="arrow"
              >
                Get a Strategy
              </Button>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
