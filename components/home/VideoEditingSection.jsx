"use client";

import { useRef, useState } from "react";
import Section from "@/components/core/Section";

/**
 * SECTION 4 — VIDEO EDITING (100vh):
 * Left: headline + copy + audio pills.
 * Right: iPhone 15 Pro mockup with autoplay reel (/images/reel.webm).
 * Interactive sound design toggle with equalizer visualization.
 * Phone enters from right with rotateY(8deg→0).
 * Floating animation (translateY ±8px, 3s).
 * Screen glare: diagonal white gradient overlay 5% opacity.
 */
function PhoneReelMockup() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

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
    <div className="phone-enter-r w-full max-w-[340px] mx-auto select-none">
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
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              poster="/images/founders/pari-jain.jpg"
              className="w-full h-full object-cover"
              aria-label="Orgix Media high-retention reel preview"
            />
          </div>

          {/* Reel Telemetry & Retention Overlays */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pt-10 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40">
            {/* Top Bar with Interactive Sound Toggle */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/90">
              <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                REEL // 4K 60FPS
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
      id="services"
      bgAlt={false}
      headline="Edits that stop the scroll."
      paragraph="High-retention pacing, kinetic typography, and precision sound design engineered to hold viewer attention and trigger algorithmic distribution."
      visual={<PhoneReelMockup />}
      visualPosition="right"
      kicker="03 / Short-Form Video Editing"
    />
  );
}
