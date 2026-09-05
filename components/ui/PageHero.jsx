"use client";

import { motion } from "framer-motion";

export default function PageHero({
  eyebrow = "01 — SELECTED WORK",
  kicker = "ORGIX MEDIA",
  title,
  lead,
  children,
}) {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden bg-background border-b border-border/60">
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[650px] h-[500px] bg-gradient-to-b from-accent/[0.05] to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono tracking-wider uppercase text-ink-secondary mb-6 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{kicker}</span>
            <span className="text-ink-muted">/</span>
            <span>{eyebrow}</span>
          </motion.div>

          {/* Editorial Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.75rem] sm:text-[3.75rem] lg:text-[4.75rem] font-display font-normal tracking-[-0.035em] text-ink-primary leading-[1.0] mb-5 text-balance"
          >
            {title}
          </motion.h1>

          {/* Lead paragraph */}
          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-body-md md:text-body-lg text-ink-secondary leading-relaxed font-light mb-8 max-w-2xl"
            >
              {lead}
            </motion.p>
          )}

          {/* Telemetry chips / children */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
