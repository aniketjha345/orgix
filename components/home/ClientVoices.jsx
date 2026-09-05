"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import { testimonials, imgSrc } from "@/data/site";

export default function ClientVoices({ index = "07" }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const item = testimonials[currentIdx] || testimonials[0];

  const handlePrev = () => {
    setCurrentIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const handleNext = () => {
    setCurrentIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="endorsements">
      <div className="container">
        <SectionHeading
          index={index}
          tag="CLIENT ENDORSEMENTS · VERIFIED VOICES"
          highlightTag="UNEDITED"
          title={
            <>
              In their own words.{" "}
              <span className="text-accent block sm:inline">Perspectives that matter.</span>
            </>
          }
          subtitle="Unedited written perspectives from founders, athletes, and category experts on partnering with our studio."
        />

        <div className="relative rounded-2xl bg-surface-muted/80 border border-border p-8 sm:p-12 lg:p-14 shadow-card overflow-hidden backdrop-blur-md max-w-4xl mx-auto">
          {/* Subtle Watermark Quote Mark */}
          <div
            className="pointer-events-none absolute -top-8 -left-4 text-[9rem] font-serif text-white/[0.03] select-none leading-none"
            aria-hidden="true"
          >
            “
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="text-heading-lg sm:text-heading-xl font-display font-light text-ink-primary leading-relaxed mb-8 sm:mb-10">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border/80">
                <div className="flex items-center gap-4">
                  {item.img && (
                    <img
                      src={imgSrc(item.img)}
                      alt={item.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border border-white/15"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h3 className="text-heading-md font-display font-medium text-ink-primary">
                      {item.name}
                    </h3>
                    <div className="text-body-sm font-mono text-accent">
                      {item.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-ink-muted mr-2">
                    0{currentIdx + 1} / 0{testimonials.length}
                  </span>

                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-surface-elevated hover:text-white text-ink-secondary flex items-center justify-center transition-all duration-200"
                    aria-label="Previous endorsement"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-surface border border-border hover:bg-surface-elevated hover:text-white text-ink-secondary flex items-center justify-center transition-all duration-200"
                    aria-label="Next endorsement"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
