"use client";

import { useState } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { mythBusters } from "@/data/site";

export default function MythBusters() {
  const [flipped, setFlipped] = useState({});

  const toggleCard = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="section myth-section grain" id="myths">
      <div
        className="blob"
        style={{
          width: 540,
          height: 540,
          bottom: "-5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(139,92,246,0.14), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container">
        <SectionHead
          center
          index="07"
          kicker="INDUSTRY REALITIES · DATA-BACKED TRUTHS"
          title={
            <>
              Social media myths, <span className="grad-hot">busted by data.</span>
            </>
          }
          lead="Tap any card below to test what actually drives organic reach versus what wastes your time."
        />

        <div className="myth-grid">
          {mythBusters.map((item, idx) => {
            const isFlipped = !!flipped[item.id];
            const isFact = item.type === "FACT";

            return (
              <Reveal delay={idx * 0.07} key={item.id} as="article">
                <button
                  type="button"
                  className={`myth-card ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => toggleCard(item.id)}
                  aria-expanded={isFlipped}
                  aria-label={`Myth or Fact question: ${item.statement}. Click to flip.`}
                >
                  <div className="myth-card-inner">
                    {/* Front Face */}
                    <div className="myth-card-front">
                      <div className="myth-front-top">
                        <span className="myth-eyebrow">
                          <Icon name="bulb" size={14} style={{ color: "var(--lime)" }} />
                          Myth or Fact?
                        </span>
                        <span className="myth-idx">0{idx + 1}</span>
                      </div>

                      <h3 className="myth-question">"{item.statement}"</h3>

                      <div className="myth-front-bottom">
                        <span className="myth-flip-hint">
                          <span>Tap to reveal verdict</span>
                          <Icon name="arrow" size={14} className="myth-flip-arr" />
                        </span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className={`myth-card-back ${isFact ? "is-fact" : "is-myth"}`}>
                      <div className="myth-back-header">
                        <span className={`myth-verdict-badge ${isFact ? "fact-badge" : "myth-badge"}`}>
                          {isFact ? "✓ FACT" : "✕ MYTH"}
                        </span>
                        <span className="myth-stat-tag">{item.badge}</span>
                      </div>

                      <p className="myth-verdict-title">{item.verdict}</p>
                      <p className="myth-detail">{item.detail}</p>

                      <div className="myth-back-footer">
                        <span className="myth-unflip-hint">
                          <Icon name="loop" size={13} />
                          Tap to flip back
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
