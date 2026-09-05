"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import { mythBusters } from "@/data/site";

export default function MythBusters({ index = "08" }) {
  const [flipped, setFlipped] = useState({});

  const toggleCard = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="myths">
      <div className="container">
        <SectionHeading
          index={index}
          tag="ALGORITHMIC REALITIES · DATA-BACKED TRUTHS"
          highlightTag="MYTH BUSTERS"
          title={
            <>
              Social media myths,{" "}
              <span className="text-accent block sm:inline">busted with data.</span>
            </>
          }
          subtitle="Tap any card below to reveal what actually powers organic reach versus what wastes your time and capital."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mythBusters.map((item, idx) => {
            const isFlipped = !!flipped[item.id];
            const isFact = item.type === "FACT";

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="h-[270px]"
              >
                <button
                  type="button"
                  onClick={() => toggleCard(item.id)}
                  aria-expanded={isFlipped}
                  aria-label={`Myth or Fact: ${item.statement}. Click to toggle verdict.`}
                  className="w-full h-full text-left focus:outline-none block"
                >
                  <div className="relative w-full h-full">
                    <AnimatePresence mode="wait" initial={false}>
                      {!isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="w-full h-full rounded-2xl bg-surface-muted/90 border border-border p-6 flex flex-col justify-between shadow-subtle hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted mb-4">
                              <span className="flex items-center gap-1.5 text-accent">
                                <Icon name="bulb" size={13} />
                                Myth or Fact?
                              </span>
                              <span>0{idx + 1}</span>
                            </div>

                            <h3 className="text-heading-md font-display font-medium text-ink-primary leading-snug">
                              &ldquo;{item.statement}&rdquo;
                            </h3>
                          </div>

                          <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-[11.5px] font-mono text-ink-muted">
                            <span>Tap to reveal verdict</span>
                            <span className="text-accent flex items-center gap-1">
                              <span>Reveal</span>
                              <Icon name="arrow" size={12} />
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className={`w-full h-full rounded-2xl border p-6 flex flex-col justify-between shadow-elevated ${
                            isFact
                              ? "bg-accent/[0.08] border-accent/40 text-ink-primary"
                              : "bg-surface-elevated border-red-500/30 text-ink-primary"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
                              <span
                                className={`px-2 py-0.5 rounded font-semibold text-[10.5px] ${
                                  isFact
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                }`}
                              >
                                {isFact ? "✓ FACT" : "✕ MYTH"}
                              </span>
                              <span className="text-ink-muted text-[10.5px] font-mono">
                                {item.badge}
                              </span>
                            </div>

                            <div className="text-body-sm font-medium font-body mb-2">
                              {item.verdict}
                            </div>

                            <p className="text-[12px] text-ink-secondary leading-relaxed font-light">
                              {item.detail}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                            <span>Algorithmic benchmark</span>
                            <span className="text-ink-secondary">Tap to return ↺</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
