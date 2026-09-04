"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { testimonials, imgSrc } from "@/data/site";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const tstRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % n);
    }, 8000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section
      className="section grain"
      style={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: "0%",
          right: "-12%",
          background: "radial-gradient(circle, rgba(236,72,153,0.14), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="container">
        <SectionHead
          index="06"
          kicker="CLIENT ENDORSEMENTS · VERIFIED VOICES"
          title={
            <>
              In their <span className="grad-hot">own words.</span>
            </>
          }
          lead="Founders, creators and brands who trusted us with their name — and what happened next."
        />

        <div className="tst-wrap">
          <Reveal dir="left" className="tst-left">
            <div className="card" style={{ padding: "clamp(20px, 2.5vw, 32px)" }}>
              <span className="display" style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)", letterSpacing: "-0.02em" }}>
                The people <span className="grad-hot">behind the words.</span>
              </span>
              <div className="avatar-stack" style={{ marginTop: 22 }}>
                {testimonials.map((t) => (
                  <img key={t.name} src={imgSrc(t.img)} alt={t.name} width={46} height={46} />
                ))}
              </div>
              <p className="lead" style={{ marginTop: 18, fontSize: 15, color: "var(--ink-2)" }}>
                Real reviews, real names, real follower counts — every quote here comes from a
                founder or creator Orgix Media has actually scaled.
              </p>
              <div className="tag-row" style={{ marginTop: 18 }}>
                {["5-star reviews", "85+ creators scaled", "100% organic"].map((t) => (
                  <span className="mini-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" className="tst-right">
            <div className="tst-stage" ref={tstRef}>
              {testimonials.map((t, i) => (
                <article
                  className={`tst-card ${i === idx ? "on" : ""}`}
                  key={t.name}
                  aria-hidden={i !== idx}
                  tabIndex={i === idx ? 0 : -1}
                  role="group"
                >
                  <span className="quote-mark">"</span>
                  <blockquote>{t.quote}</blockquote>
                  <div className="stars" aria-hidden="true">
                    {[...Array(5)].map((_, j) => (
                      <Icon name="star" size={16} key={j} />
                    ))}
                  </div>
                  <span className="sr-only">Rated {t.rating || 5} out of 5</span>
                  <div className="tst-author">
                    <img src={imgSrc(t.img)} alt={t.name} width={52} height={52} />
                    <div>
                      <b>{t.name}</b>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Visually-hidden live region announcing the current testimonial for screen readers. */}
            <div className="tst-live" aria-live="polite" aria-atomic="true">
              {testimonials[idx] && (
                <span lang="en">
                  Testimonial from {testimonials[idx].name}, {testimonials[idx].role}.
                </span>
              )}
            </div>

            <div className="tst-nav">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === idx ? "on" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
              <div className="tst-arrows">
                <button className="icon-btn" onClick={() => setIdx((idx - 1 + n) % n)} aria-label="Previous testimonial">
                  <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
                </button>
                <button className="icon-btn" onClick={() => setIdx((idx + 1) % n)} aria-label="Next testimonial">
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
