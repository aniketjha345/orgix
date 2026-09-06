"use client";

import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { timelineJourney } from "@/data/site";

export default function AgencyJourney({ index = "04" }) {
  return (
    <section className="section journey-section grain" id="journey">
      <div className="container">
        <SectionHead
          center
          index={index}
          kicker="EVOLUTION &amp; MILESTONES"
          title={<>From a small room to 1 Billion+ views.</>}
          lead="How two founders turned a belief in organic growth into India's most dedicated personal branding studio."
        />

        <div className="journey-timeline">
          <div className="journey-line" aria-hidden="true" />

          {timelineJourney.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={item.year}
                className={`journey-item ${isLeft ? "journey-item--left" : "journey-item--right"}`}
              >
                <div className="journey-dot" aria-hidden="true">
                  <span className="journey-dot-inner" />
                </div>

                <Reveal
                  dir={isLeft ? "left" : "right"}
                  delay={idx * 0.1}
                  className="journey-card-wrap"
                >
                  <div className="journey-card shine">
                    <div className="journey-card-top">
                      <span className="journey-year">{item.year}</span>
                      <span className="journey-kicker">{item.kicker}</span>
                    </div>

                    <h3 className="journey-title">{item.title}</h3>
                    <p className="journey-text">{item.text}</p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
