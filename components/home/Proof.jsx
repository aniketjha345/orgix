"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { videoTestimonials, testimonials, imgSrc } from "@/data/site";

/**
 * Proof — single "proof lab" section with two views:
 *   · Video reviews (lightbox player)
 *   · Written reviews (auto-advancing slider)
 * Replaces the former back-to-back VideoTestimonials + Testimonials sections.
 */
export default function Proof({ index = "05" }) {
  const [tab, setTab] = useState("video");

  // ── Video lightbox state ──────────────────────────────────────────────
  const [activeVideo, setActiveVideo] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!activeVideo) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        return;
      }
      if (e.key === "Tab") {
        const panel = modalRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll(
          'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previouslyFocused = document.activeElement;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      modalRef.current?.querySelector(".vt-modal-close")?.focus();
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [activeVideo]);

  // ── Written-review slider state ───────────────────────────────────────
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (tab !== "written" || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 8000);
    return () => clearInterval(t);
  }, [tab, paused, n]);

  const tabs = [
    { id: "video", label: "Video reviews", count: videoTestimonials.length },
    { id: "written", label: "Written reviews", count: testimonials.length },
  ];

  return (
    <section
      className="section vt-section grain"
      id="video-testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="blob"
        style={{
          width: 580,
          height: 580,
          top: "10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(200,240,77,0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container">
        <SectionHead
          center
          index={index}
          kicker="CLIENT VERIFICATION · VIDEO + WRITTEN PROOF"
          title={<>Hear it directly from the people we scaled.</>}
          lead="From Shark Tank brands to 100K+ creator channels — every review below comes from a founder or creator Orgix Media has actually scaled."
        />

        <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div className="filters" role="tablist" aria-label="Switch between video and written reviews">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`proof-panel-${t.id}`}
                id={`proof-tab-${t.id}`}
                className={`filter-btn ${tab === t.id ? "on" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <span>{t.label}</span>
                <span className="filter-count">{t.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Video reviews panel ─────────────────────────────────────── */}
        {tab === "video" && (
          <div
            className="vt-grid"
            id="proof-panel-video"
            role="tabpanel"
            aria-labelledby="proof-tab-video"
          >
            {videoTestimonials.map((item, idxV) => (
              <Reveal delay={idxV * 0.08} key={item.name} as="article">
                <button
                  type="button"
                  className="vt-card group shine"
                  onClick={() => setActiveVideo(item)}
                  aria-label={`Watch video review from ${item.name}`}
                >
                  <div className="vt-poster-wrap">
                    <img
                      src={item.poster}
                      alt={item.name}
                      className="vt-poster-img"
                      loading="lazy"
                    />
                    <div className="vt-poster-overlay" />

                    <div className="vt-play-btn" aria-hidden="true">
                      <span className="vt-play-pulse" />
                      <Icon name="play" size={20} className="vt-play-icon" />
                    </div>

                    <div className="vt-top-badges">
                      <span className="vt-tag">{item.badge}</span>
                      <span className="vt-followers">
                        <Icon name="trend" size={13} style={{ color: "var(--lime)" }} />
                        {item.followers}
                      </span>
                    </div>

                    <div className="vt-bottom-meta">
                      <h3 className="vt-client-name">
                        {item.name}
                        <Icon name="verified" size={16} className="vt-verified-icon" />
                      </h3>
                      <p className="vt-client-role">{item.role}</p>
                      <p className="vt-client-quote">"{item.quote}"</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}

        {/* ── Written reviews panel ───────────────────────────────────── */}
        {tab === "written" && (
          <div
            className="tst-wrap"
            id="proof-panel-written"
            role="tabpanel"
            aria-labelledby="proof-tab-written"
          >
            <Reveal dir="left" className="tst-left">
              <div className="card" style={{ padding: "clamp(20px, 2.5vw, 32px)" }}>
                <span className="display" style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)", letterSpacing: "-0.02em" }}>
                  The people behind the words.
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
              <div className="tst-stage">
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
        )}
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div
          className="vt-modal-backdrop"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video review by ${activeVideo.name}`}
        >
          <div
            className="vt-modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="vt-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="vt-video-wrapper">
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                className="vt-modal-video"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>

            <div className="vt-modal-footer">
              <div>
                <div className="vt-modal-name">
                  {activeVideo.name}
                  <span className="vt-modal-tag">{activeVideo.badge}</span>
                </div>
                <div className="vt-modal-role">{activeVideo.role} · {activeVideo.followers}</div>
              </div>
              <a
                href={`https://instagram.com/${activeVideo.handle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--sm"
              >
                <Icon name="ig" size={15} />
                {activeVideo.handle}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
