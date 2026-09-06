"use client";

import { useState } from "react";
import Section from "../core/Section";
import { faqs } from "@/data/site";

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <Section id="faq" bgAlt={false} className="select-none">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* ONE headline, ONE paragraph */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            14 / FAQ
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            Everything you need to know.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Engagement model, shoot schedules and organic trajectory.
          </p>
        </div>

        {/* ONE visual: plain divider accordion */}
        <div className="w-full divide-y divide-[var(--line)] border-y border-line reveal-visual is-revealed">
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
                  <span className="font-display font-medium text-[18px] sm:text-[20px] text-ink group-hover:text-accent transition-colors leading-snug tracking-tight">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-transparent border border-line flex items-center justify-center text-ink-soft group-hover:text-accent group-hover:border-ink shrink-0 transition-all font-body text-[14px]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-10">
                    <p className="font-body text-[16px] text-ink-soft leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still not sure? — mirror of orgixmedia.com's FAQ closer */}
        <div className="flex flex-col items-center gap-4 mt-10 text-center reveal-visual is-revealed">
          <p className="font-body text-[15px] text-ink-soft">
            Still not sure? Get a free 1:1 strategy audit — zero obligation.
          </p>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-consultation", {
                  detail: { source: "faq" },
                })
              )
            }
            className="btn-pill inline-flex items-center gap-2 rounded-full px-7 py-3 bg-ink text-white font-body text-[14px] font-semibold hover:bg-[#1A2440] transition-colors cursor-pointer"
          >
            Book a Free Strategy Call <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* FAQPage structured data — eligible for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </Section>
  );
}
