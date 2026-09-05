"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Icon from "../core/Icon";
import { videoTestimonials, testimonials, imgSrc } from "@/data/site";

function HoverReviewCard({ item, onClick, onHoverChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    onHoverChange(true);
    setIsPlaying(true);
    const v = videoRef.current;
    if (v && item.videoUrl) {
      v.currentTime = 0;
      v.muted = false; // Voice enabled on hover as requested!
      v.volume = 1.0;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioActive(!v.muted);
          })
          .catch(() => {
            // Browser autoplay policy might restrict unmuted until user interaction
            v.muted = true;
            setIsAudioActive(false);
            v.play().catch(() => {});
          });
      }
    }
  };

  const handleMouseLeave = () => {
    onHoverChange(false);
    setIsPlaying(false);
    setIsAudioActive(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const handleUnmuteClick = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.volume = 1.0;
      setIsAudioActive(true);
    }
  };

  return (
    <article
      data-cursor="WATCH"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="shrink-0 w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl overflow-hidden bg-surface-muted border border-border hover:border-accent/60 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 group relative select-none"
      style={{ aspectRatio: "9/14" }}
    >
      {/* Background Poster Image */}
      <img
        src={imgSrc(item.poster)}
        alt={item.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100 group-hover:scale-105"
        }`}
        loading="lazy"
      />

      {/* HTML5 Video Element (Plays WITH SOUND on hover) */}
      {item.videoUrl && (
        <video
          ref={videoRef}
          src={item.videoUrl}
          playsInline
          loop
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Dark Vignette Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isPlaying
            ? "bg-gradient-to-t from-[#0a0a1f]/95 via-transparent to-black/30"
            : "bg-gradient-to-t from-[#0a0a1f] via-[#0a0a1f]/50 to-transparent"
        }`}
      />

      {/* Top Meta Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a1f]/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-ink-primary">
          {item.badge}
        </span>
        <div className="flex items-center gap-1.5">
          {isPlaying && (
            <span
              onClick={handleUnmuteClick}
              className="px-2 py-0.5 rounded-full bg-accent text-[#0a0a1f] font-mono text-[10px] font-bold shadow-md flex items-center gap-1 pointer-events-auto"
            >
              <span>{isAudioActive ? "🔊 VOICE ON" : "🔇 TAP VOICE"}</span>
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full bg-[#0a0a1f]/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-accent font-semibold">
            {item.followers}
          </span>
        </div>
      </div>

      {/* Center Play Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? "bg-accent text-[#0a0a1f] border-accent scale-100 shadow-lg font-semibold"
              : "bg-[#0a0a1f]/85 border-white/20 text-white shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-[#0a0a1f] group-hover:border-accent"
          }`}
        >
          {isPlaying ? (
            <>
              <span className="text-[12px]">🔊</span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                Playing Voice
              </span>
            </>
          ) : (
            <>
              <Icon name="play" size={13} />
              <span className="text-[11.5px] font-mono font-medium">Hover for voice</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Identity & Quote */}
      <div className="relative z-10 pointer-events-none">
        <h3 className="text-[17px] font-display font-medium text-white mb-0.5 truncate">
          {item.name}
        </h3>
        <div className="text-[11.5px] font-mono text-accent/90 mb-1.5 truncate">
          {item.role}
        </div>
        <p className="text-[12px] text-white/85 leading-snug font-light line-clamp-2 italic">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </article>
  );
}

export default function TestimonialCarousel() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const pauseTimerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Triplicate list for 100% seamless infinite loop
  const loopedList = useMemo(() => {
    return [...videoTestimonials, ...videoTestimonials, ...videoTestimonials];
  }, []);

  // Continuous Auto-Scroll Engine (Silky smooth 60fps)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animId;
    let lastTime = performance.now();
    const speed = 40; // pixels per second

    const step = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && el) {
        el.scrollLeft += speed * delta;
        const singleLoopWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleLoopWidth) {
          el.scrollLeft -= singleLoopWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, loopedList]);

  const handlePause = (paused) => {
    setIsPaused(paused);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // Resume auto-scroll after 2.5 seconds
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 2500);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="video-proof">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>05 — VIDEO TESTIMONIALS</span>
            </div>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-3">
              Hear directly from the creators <br className="hidden sm:block" />
              <span className="text-accent">we scaled.</span>
            </h2>
            <p className="text-body-md text-ink-secondary font-light">
              Hover over any card to preview the on-camera review. Click to watch the full client story.
            </p>
          </div>

          {/* Carousel Manual Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-surface-elevated hover:bg-accent hover:text-[#0a0a1f] text-ink-primary border border-border hover:border-accent flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Previous video testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-surface-elevated hover:bg-accent hover:text-[#0a0a1f] text-ink-primary border border-border hover:border-accent flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Next video testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* Video Testimonials Infinite Auto-Scrolling Row (Zero scrollbar track) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => handlePause(true)}
          onMouseLeave={() => handlePause(false)}
          onTouchStart={() => handlePause(true)}
          onTouchEnd={() => handlePause(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none"
        >
          {loopedList.map((item, idx) => (
            <HoverReviewCard
              key={`${item.handle}-${idx}`}
              item={item}
              onClick={() => setPlayingVideo(item)}
              onHoverChange={handlePause}
            />
          ))}
        </div>

        {/* Written Quotes Grid Below */}
        <div className="mt-16 pt-12 border-t border-border/60">
          <div className="max-w-2xl mb-8">
            <h3 className="text-heading-lg font-display text-ink-primary">
              Written Endorsements
            </h3>
            <p className="text-body-sm text-ink-muted">
              More reflections from clients across finance, sports, and content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-surface/60 border border-border/80 flex flex-col justify-between"
              >
                <p className="text-[13.5px] text-ink-secondary font-light leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img
                    src={imgSrc(t.img)}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-[14px] font-medium text-ink-primary">
                      {t.name}
                    </div>
                    <div className="text-[11.5px] font-mono text-ink-muted">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Lightbox Player Modal */}
      {mounted &&
        playingVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setPlayingVideo(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-xl bg-surface-muted border border-border rounded-2xl overflow-hidden shadow-elevated p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-ink-primary flex items-center justify-center transition-colors"
                onClick={() => setPlayingVideo(null)}
                aria-label="Close video player"
              >
                ✕
              </button>

              <div className="mb-4 text-left">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                  VERIFIED CLIENT VIDEO REVIEW
                </span>
                <h3 className="text-heading-lg font-display text-ink-primary mt-1">
                  {playingVideo.name}
                </h3>
                <div className="text-[12.5px] font-mono text-ink-muted">
                  {playingVideo.role} · {playingVideo.followers}
                </div>
              </div>

              <div className="relative aspect-[9/16] sm:aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                <video
                  src={playingVideo.videoUrl}
                  poster={imgSrc(playingVideo.poster)}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              <p className="text-body-sm text-ink-secondary font-light italic">
                &ldquo;{playingVideo.quote}&rdquo;
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
