"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/core/Section";

/**
 * SECTION 4 — VIDEO EDITING (100vh):
 * Left: headline + copy + audio pills.
 * Right: iPhone 15 Pro mockup with autoplay reel (/images/reel.webm).
 * Interactive sound design toggle with equalizer visualization.
 * Phone enters from right with rotateY(8deg→0).
 * Floating animation (translateY ±8px, 3s).
 * Screen glare: diagonal white gradient overlay 5% opacity.
 *
 * Enhancements:
 * - Retention progress bar synced to real playback (timeupdate).
 * - Live views counter that ticks up while the reel plays.
 * - Pointer-follow 3D tilt (max 4°) on fine pointers, reduced-motion safe.
 */
function PhoneReelMockup() {
  const videoRef = useRef(null);
  const tiltRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [views, setViews] = useState(1204830);

  // Retention progress + live views ticker — synced to real playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onTime = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
      // Views tick up as the reel plays — one view per ~300ms of playback,
      // so the number feels alive but never runs away.
      if (!video.paused) setViews((v) => v + 1);
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  // Lazy playback: only download + play the 2.3MB reel while the phone is
  // actually visible (was autoPlay on mount, even far below the fold).
  useEffect(() => {
    const video = videoRef.current;
    const el = tiltRef.current;
    if (!video || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer-follow tilt — ±4° max, fine pointers only.
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-ny * 4).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(nx * 4).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMute = !videoRef.current.muted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
    if (!nextMute) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={tiltRef}
      className="phone-enter-r phone-tilt w-full max-w-[340px] mx-auto select-none"
      style={{ "--rx": "0deg", "--ry": "0deg" }}
    >
      {/* Outer iPhone 15 Pro Titanium Chassis */}
      <div className="float-phone relative rounded-[48px] p-3 bg-[#1F242D] border-[3px] border-[#363E4D] shadow-[0_30px_80px_rgba(15,26,46,0.22)]">
        {/* Screen Bezel */}
        <div className="relative rounded-[38px] overflow-hidden aspect-[9/18.5] bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-30 flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111927] border border-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
          </div>

          {/* Screen Glare (diagonal white gradient overlay 5% opacity) */}
          <div className="screen-glare" aria-hidden="true" />

          {/* Color Wipe Container & Reel */}
          <div className="color-wipe absolute inset-0 z-10">
            <video
              ref={videoRef}
              src="/images/reel.webm"
              loop
              muted={isMuted}
              playsInline
              preload="none"
              poster="/images/founders/pari-jain.jpg"
              className="w-full h-full object-cover"
              aria-label="Orgix Media high-retention reel preview"
            />
          </div>

          {/* Reel Telemetry & Retention Overlays */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pt-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40">
            {/* Top Bar with Interactive Sound Toggle + live views */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/90">
              <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                ▶ {views.toLocaleString("en-US")} watching
              </span>

              {/* Sound Design Interactive Pill */}
              <button
                type="button"
                onClick={toggleSound}
                className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all shadow-md text-[10px] font-mono cursor-pointer"
                aria-label={isMuted ? "Unmute video sound design" : "Mute video sound"}
              >
                {isMuted ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>🔇 Unmute</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 bg-accent rounded-full animate-pulse" style={{ height: "70%" }} />
                      <span className="w-0.5 bg-accent rounded-full animate-pulse" style={{ height: "100%" }} />
                      <span className="w-0.5 bg-accent rounded-full animate-pulse" style={{ height: "50%" }} />
                    </span>
                    <span className="text-accent font-semibold">🔊 Audio On</span>
                  </>
                )}
              </button>
            </div>

            {/* Retention progress bar — synced to real playback */}
            <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/15">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-linear"
                style={{ width: `${(progress * 100).toFixed(1)}%` }}
              />
            </div>

            {/* Bottom Captions & Metrics */}
            <div className="space-y-2.5">
              <div className="bg-black/60 backdrop-blur-md p-3 rounded-[14px] border border-white/15">
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent mb-0.5">
                  Kinetic Pacing · Precision Foley
                </div>
                <p className="font-display text-[14px] leading-snug text-white font-medium">
                  &ldquo;Every frame earns the next second of attention.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-[10.5px] font-mono bg-white/10 backdrop-blur-md p-1.5 rounded-[12px] border border-white/10 text-white">
                <div>
                  <div className="font-semibold">1.4M</div>
                  <div className="text-[8.5px] text-white/70">Views</div>
                </div>
                <div>
                  <div className="font-semibold">98.2%</div>
                  <div className="text-[8.5px] text-white/70">Completed</div>
                </div>
                <div>
                  <div className="font-semibold">18.2K</div>
                  <div className="text-[8.5px] text-white/70">Saves</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoEditingSection() {
  return (
    <Section
      id="editing"
      bgAlt={false}
      headline="Edits that stop the scroll."
      paragraph="High-retention pacing, kinetic typography, and precision sound design engineered to hold viewer attention and trigger algorithmic distribution."
      visual={<PhoneReelMockup />}
      visualPosition="right"
      kicker="06 / Short-Form Video Editing"
    />
  );
}
