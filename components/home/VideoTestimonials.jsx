"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { videoTestimonials } from "@/data/site";

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);
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

  return (
    <section className="section vt-section grain" id="video-testimonials">
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
          index="05"
          kicker="CLIENT VERIFICATION · VIDEO PROOF"
          title={
            <>
              Hear directly from the <span className="grad-hot">creators we scaled.</span>
            </>
          }
          lead="From Shark Tank brands to 100K+ creator channels — watch how organic personal branding built their authority."
        />

        <div className="vt-grid">
          {videoTestimonials.map((item, idx) => (
            <Reveal delay={idx * 0.08} key={item.name} as="article">
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

                  {/* Play Action Badge */}
                  <div className="vt-play-btn" aria-hidden="true">
                    <span className="vt-play-pulse" />
                    <Icon name="play" size={20} className="vt-play-icon" />
                  </div>

                  {/* Top Badges */}
                  <div className="vt-top-badges">
                    <span className="vt-tag">{item.badge}</span>
                    <span className="vt-followers">
                      <Icon name="trend" size={13} style={{ color: "var(--lime)" }} />
                      {item.followers}
                    </span>
                  </div>

                  {/* Bottom Meta */}
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
                ref={modalVideoRef}
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
