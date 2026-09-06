"use client";

import ParticleRing from "../ParticleRing";
import { company } from "@/data/site";

/**
 * SECTION 11 — CTA (100vh, bg #0F1A2E dark):
 * White text "Ready to grow organically?" giant size.
 * White pill button, inverted. Particle ring returns in WHITE.
 * Subtle aurora gradient behind (3 colors, 5% opacity, slow move).
 */
export default function SplitCtaBanner() {
  const handlePrimary = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "final-cta" } })
    );
  };

  return (
    <section
      id="cta"
      className="editorial-section relative overflow-hidden select-none"
      style={{ backgroundColor: "#0F1A2E", scrollSnapAlign: "start", minHeight: "100svh" }}
    >
      {/* Subtle Aurora Gradient Behind (3 colors, 5% opacity, slow move) */}
      <div className="aurora-subtle" aria-hidden="true" />

      {/* Particle ring returns in WHITE */}
      <ParticleRing tone="light" />

      <div className="editorial-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        <span
          className="editorial-kicker mb-6"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          10 / Start Growing
        </span>

        {/* White text "Ready to grow organically?" giant size */}
        <h2
          className="display-h1 text-center mb-6 text-white"
          style={{ color: "#ffffff" }}
        >
          Ready to grow organically?
        </h2>

        <p
          className="body-editorial text-center max-w-2xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          Tell us what you want to be known for — we&apos;ll map your 90-day trajectory.
        </p>

        {/* White pill button, inverted */}
        <div className="btn-actions-row justify-center !mt-0">
          <button
            type="button"
            onClick={handlePrimary}
            className="btn-pill inline-flex items-center justify-center gap-2.5 rounded-[999px] px-[32px] py-[16px] font-body text-[15.5px] font-semibold leading-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            style={{ backgroundColor: "#ffffff", color: "#0F1A2E" }}
            aria-label="Book your free call"
          >
            <span>Book Your Free Call</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <a
          href={`mailto:${company.email}`}
          className="mt-8 font-body text-[13.5px] underline underline-offset-4 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          or say hi → {company.email}
        </a>
      </div>
    </section>
  );
}
