"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import { faqs } from "@/data/site";

export default function Faq({ index = "10" }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="faq">
      <div className="container max-w-4xl">
        <SectionHeading
          index={index}
          tag="DIRECT INQUIRIES · INTEL DIRECTORY"
          highlightTag="TRANSPARENT"
          title={
            <>
              Questions,{" "}
              <span className="text-accent block sm:inline">answered directly.</span>
            </>
          }
          subtitle="Everything founders, creators, and corporate leaders ask before partnering with Orgix Media."
        />

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <div
                key={f.q}
                className="rounded-xl bg-surface-muted/70 border border-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 select-none hover:bg-surface transition-colors"
                >
                  <span className="text-body-md sm:text-heading-md font-display font-medium text-ink-primary">
                    {f.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-accent border-accent/40" : "text-ink-secondary"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 sm:px-6 sm:pb-6 text-body-md text-ink-secondary leading-relaxed font-light border-t border-border/40 pt-4">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-border/60">
          <p className="text-body-sm text-ink-secondary">
            Have a specific scenario or custom team requirement?{" "}
            <Link
              href="/contact"
              className="text-accent font-medium hover:underline underline-offset-4 ml-1"
            >
              Schedule a 1:1 Strategy Audit →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
