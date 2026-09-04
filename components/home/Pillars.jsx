"use client";

import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { agencyPillars } from "@/data/site";

export default function Pillars() {
  return (
    <section className="section pillars-section grain" id="pillars">
      <div className="container">
        <SectionHead
          center
          index="05"
          kicker="OPERATIONAL PILLARS"
          title={
            <>
              Three core pillars. <span className="grad-brand">Zero compromises.</span>
            </>
          }
          lead="Most agencies sell algorithms and hacks. We build compounding personal brands on first principles."
        />

        <div className="pillars-grid">
          {agencyPillars.map((p, idx) => (
            <Reveal delay={idx * 0.1} key={p.num} as="article">
              <div className="pillar-card shine">
                <div className="pillar-header">
                  <span className="pillar-num">{p.num}</span>
                  <span className="pillar-pill">{p.highlight}</span>
                </div>

                <h3 className="pillar-title">{p.title}</h3>
                <h4 className="pillar-subtitle">{p.subtitle}</h4>
                <p className="pillar-text">{p.text}</p>

                <div className="pillar-footer">
                  <Icon name="check" size={16} style={{ color: "var(--lime)" }} />
                  <span>Engineered for organic compounding</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
