"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import { videoTestimonials, imgSrc } from "@/data/site";

export default function VideoProof({ index = "06" }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="video-proof">
      <div className="container">
        <SectionHeading
          index={index}
          tag="CLIENT VERIFICATION · RAW VIDEO EVIDENCE"
          highlightTag="UNFILTERED"
          title={
            <>
              Hear directly from the creators{" "}
              <span className="text-accent block sm:inline">we scaled.</span>
            </>
          }
          subtitle="Unfiltered, on-camera reflections from category leaders and founders who trusted Orgix Media with their personal brand equity."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videoTestimonials.map((item, idx) => (
            <motion.article
              key={item.handle}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveVideo(item)}
              role="button"
              tabIndex={0}
              aria-label={`Play video review from ${item.name} (${item.role})`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveVideo(item);
                }
              }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface border border-border hover:border-accent/50 transition-all duration-300 shadow-card cursor-pointer flex flex-col justify-end p-5 sm:p-6"
            >
              {/* Background Poster Image */}
              <img
                src={imgSrc(item.poster)}
                alt={`${item.name} video review`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Top Meta Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-mono font-medium text-ink-primary">
                  {item.badge}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-accent">
                  <Icon name="trend" size={11} />
                  {item.followers}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300">
                  <Icon name="play" size={20} className="ml-0.5" />
                </div>
              </div>

              {/* Bottom Identity & Quote */}
              <div className="relative z-10">
                <h3 className="text-heading-md font-display font-medium text-white mb-0.5 truncate">
                  {item.name}
                </h3>
                <div className="text-[12px] font-mono text-accent/90 mb-2">
                  {item.role}
                </div>
                <p className="text-[13px] text-white/85 leading-snug font-light line-clamp-2 italic">
                  "{item.quote}"
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal via Portal */}
      {mounted &&
        activeVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Video review: ${activeVideo.name}`}
            ref={modalRef}
          >
            <div
              className="relative w-full max-w-xl bg-surface-muted border border-border rounded-2xl overflow-hidden shadow-elevated p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-ink-primary flex items-center justify-center transition-colors"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
              >
                <Icon name="close" size={18} />
              </button>

              <div className="mb-4 text-left">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                  VERIFIED CLIENT REVIEW
                </span>
                <h3 className="text-heading-lg font-display text-ink-primary mt-1">
                  {activeVideo.name}
                </h3>
                <div className="text-[12.5px] font-mono text-ink-muted">
                  {activeVideo.role} · {activeVideo.followers} Followers
                </div>
              </div>

              <div className="relative aspect-[9/16] sm:aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  poster={imgSrc(activeVideo.poster)}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              <p className="text-body-sm text-ink-secondary italic font-light">
                "{activeVideo.quote}"
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
