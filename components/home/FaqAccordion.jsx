"use client";

import { useState } from "react";
import { faqs } from "@/data/site";
import Icon from "../core/Icon";

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="faq">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>07 — DIRECT FAQ</span>
          </div>
          <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-4">
            Everything you need <br />
            <span className="text-accent">to know.</span>
          </h2>
          <p className="text-body-md text-ink-secondary font-light">
            Clear answers about our engagement model, shoot schedules, and organic trajectory.
          </p>
        </div>

        {/* Antigravity Accordion: plain text, thin divider lines, no card backgrounds */}
        <div className="divide-y divide-border/60 border-y border-border/60">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="py-6">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-start justify-between gap-6 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1.125rem] sm:text-[1.25rem] font-display font-medium text-ink-primary group-hover:text-accent transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-ink-muted group-hover:text-accent group-hover:border-accent shrink-0 transition-all font-mono text-[14px]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-10">
                    <p className="text-body-md text-ink-secondary leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
