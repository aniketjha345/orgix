"use client";

import { useRef, useState, useEffect } from "react";
import Section from "../core/Section";
import { sound } from "@/lib/sound";

const CLOUD = "https://res.cloudinary.com/dwjr5yrir/video/upload/f_auto,q_auto";

const VIDEOS = [
  {
    id: "demla",
    name: "Demla Brothers",
    meta: "Founders · Cellbell",
    stat: "23.1K+ followers",
    badge: "Shark Tank Featured Brand",
    quote: "Orgix Media built our organic presence without relying on endless paid advertising before stepping onto Shark Tank.",
    poster: "/images/creators/demla-brothers.jpg",
    src: `${CLOUD}/orgix-media/vid_client1.mp4`,
  },
  {
    id: "shivam",
    name: "Shivam Careers",
    meta: "Career & AI Creator",
    stat: "100K in 80 posts",
    badge: "0 → 100K in 80 Posts",
    quote: "Scaled production quality and viral retention with Orgix, reaching six-figure followers in record time.",
    poster: "/images/creators/shivam.jpg",
    src: `${CLOUD}/orgix-media/vid_client2.mp4`,
  },
  {
    id: "jyoti",
    name: "CA Jyoti Goyal",
    meta: "Chartered Accountant",
    stat: "36.7K+ followers",
    badge: "Finance Authority",
    quote: "Turned technical finance topics into simple, engaging reels that bring high-paying consulting leads.",
    poster: "/images/creators/jyoti-goyal.jpg",
    src: `${CLOUD}/orgix-media/vid_client3.mp4`,
  },
  {
    id: "amit",
    name: "Amit Arora",
    meta: "Import-Export Expert",
    stat: "23.6K+ followers",
    badge: "International Trade",
    quote: "Constructed high-converting inbound funnels that consistently generate qualified international trade leads.",
    poster: "/images/creators/amit-arora.png",
    src: `${CLOUD}/orgix-media/vid_client4.mp4`,
  },
  {
    id: "pari",
    name: "Pari Jain",
    meta: "Founder",
    stat: "0 → 129K organic",
    badge: "Category Dominance",
    quote: "100% organic growth. No ads, no bots, no shortcuts — pure compounding retention.",
    poster: "/images/founders/pari-jain.jpg",
    src: `${CLOUD}/orgix-media/vid_pari.mp4`,
  },
  {
    id: "alisha",
    name: "Alisha Chettri",
    meta: "Lifestyle Influencer",
    stat: "25.5K+ followers",
    badge: "Brand Collaborations",
    quote: "High-retention editing and storytelling that turns viewers into engaged community members.",
    poster: "/images/creators/garima-barnoliya.jpg",
    src: `${CLOUD}/orgix-media/vid_alisha.mp4`,
  },
];

function VideoCard({ v, hidden, onOpenModal, globalAudioAllowed, setGlobalAudioAllowed }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const previewWithSound = () => {
    const el = videoRef.current;
    if (!el) return;

    // Try playing with sound if user interacted or enabled
    el.volume = 0.85;
    el.muted = !globalAudioAllowed;

    const promise = el.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          setIsAudioActive(!el.muted);
        })
        .catch(() => {
          // If browser blocks unmuted play, fallback to muted play smoothly
          el.muted = true;
          el.play()
            .then(() => {
              setIsPlaying(true);
              setIsAudioActive(false);
            })
            .catch(() => {});
        });
    }
  };

  const reset = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
    setIsAudioActive(false);
    try {
      el.currentTime = 0;
    } catch (_) {}
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;

    sound.playPop();
    const newMuted = !el.muted;
    el.muted = newMuted;
    setIsAudioActive(!newMuted);
    setGlobalAudioAllowed(!newMuted);

    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="video-rail-card device-mockup overflow-hidden bg-white flex flex-col shrink-0 group relative shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-line"
      onMouseEnter={previewWithSound}
      onMouseLeave={reset}
      onClick={() => onOpenModal(v)}
      aria-hidden={hidden || undefined}
    >
      <div className="relative aspect-[9/14] bg-[#0F1A2E] overflow-hidden cursor-pointer">
        <video
          ref={videoRef}
          src={v.src}
          poster={v.poster}
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label={hidden ? undefined : `Testimonial video from ${v.name}`}
        />

        {/* Top Floating Badge with Sound Toggle */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-semibold tracking-wide text-white flex items-center gap-1.5 shadow-xs">
            {isAudioActive ? (
              <span className="text-accent animate-pulse flex items-center gap-0.5">
                <span>ılı</span>
                <span>VOICE ON</span>
              </span>
            ) : (
              <span>▶ HOVER TO PLAY</span>
            )}
          </span>

          {/* Dedicated Audio Button on Card */}
          <button
            type="button"
            onClick={toggleSound}
            className="px-2 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs border border-white/20 active:scale-95"
            title={isAudioActive ? "Mute sound" : "Enable voice & sound"}
          >
            {isAudioActive ? "🔊 Voice On" : "🔈 Unmute"}
          </button>
        </div>

        {/* Center Hover Play Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <span className="text-xl ml-0.5">▶</span>
          </div>
          <span className="mt-2 text-white font-mono text-[11px] font-semibold tracking-wider bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
            TAP FOR FULLSCREEN
          </span>
        </div>

        {/* Niche / Outcome Badge at bottom of video preview */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-accent/90 text-white font-mono text-[9.5px] font-bold">
            {v.badge}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 bg-white">
        <div className="font-display font-medium text-[15.5px] text-ink leading-tight flex items-center justify-between">
          <span>{v.name}</span>
          <span className="font-mono text-[11px] text-accent font-semibold">{v.stat}</span>
        </div>
        <div className="text-[12px] font-body text-ink-soft mt-1">
          {v.meta}
        </div>
      </div>
    </div>
  );
}

export default function VideoProof() {
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [globalAudioAllowed, setGlobalAudioAllowed] = useState(true);
  const modalVideoRef = useRef(null);

  const row = [...VIDEOS, ...VIDEOS];

  const handleOpenModal = (video) => {
    sound.playFanfare();
    setActiveModalVideo(video);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveModalVideo(null);
  };

  useEffect(() => {
    if (activeModalVideo && modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 0.9;
      modalVideoRef.current.play().catch(() => {});
    }
  }, [activeModalVideo]);

  return (
    <Section id="video-proof" bgAlt={true} className="select-none overflow-hidden relative">
      <div className="w-full flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="editorial-kicker">
              09 / Client Video Stories
            </span>
            <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-[10px] font-bold">
              🔊 Voice Enabled
            </span>
          </div>

          <h2 className="display-h2 mb-4">
            In their own words.
          </h2>
          <p className="body-editorial text-center mx-auto leading-relaxed">
            Real founders and creators break down their experience scaling with Orgix Media. Hover any video to hear their real voice, or tap to watch fullscreen!
          </p>

          {/* Quick Sound Toggle & Story Link */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setGlobalAudioAllowed(!globalAudioAllowed);
              }}
              className="px-3 py-1 rounded-full bg-white border border-line hover:border-accent text-ink font-mono text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <span>{globalAudioAllowed ? "🔊 Audio: Unmuted On Hover" : "🔇 Audio: Muted On Hover"}</span>
            </button>

            <a
              href="https://youtu.be/6N9-G5LtDy8?si=0Yzw_ueCbAWy9HPy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent hover:text-white text-accent font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <span>▶ Watch Delhi Studio Story</span>
              <span className="text-[9px]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Smooth Right-to-Left Drifting rail (full bleed) */}
      <div className="video-rail-viewport">
        <div className="video-rail-track">
          {row.map((v, i) => (
            <VideoCard
              key={`${v.name}-${i}`}
              v={v}
              hidden={i >= VIDEOS.length}
              onOpenModal={handleOpenModal}
              globalAudioAllowed={globalAudioAllowed}
              setGlobalAudioAllowed={setGlobalAudioAllowed}
            />
          ))}
        </div>
      </div>

      {/* ============================================================
          CINEMATIC VIDEO LIGHTBOX MODAL (FROM ORIGINAL SITE FEATURE)
         ============================================================ */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0F1A2E] border-2 border-line/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 text-white"
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <h3 className="font-display font-semibold text-[16px] text-white">
                  {activeModalVideo.name}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent text-white font-bold">
                  {activeModalVideo.badge}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                title="Close video"
              >
                ✕
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-[9/14] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={modalVideoRef}
                src={activeModalVideo.src}
                poster={activeModalVideo.poster}
                controls
                playsInline
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Case Study Quote */}
            <div className="p-4 sm:p-5 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-body text-[13px] text-white/90 italic leading-relaxed">
                  &ldquo;{activeModalVideo.quote}&rdquo;
                </p>
                <div className="mt-1 font-mono text-[11px] text-accent">
                  {activeModalVideo.meta} · {activeModalVideo.stat}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleCloseModal();
                  window.dispatchEvent(
                    new CustomEvent("open-consultation", {
                      detail: { source: `video-proof-${activeModalVideo.id}`, creator: activeModalVideo.name },
                    })
                  );
                }}
                className="px-4 py-2 rounded-full bg-accent hover:bg-white hover:text-ink text-white font-body text-[12px] font-bold whitespace-nowrap transition-colors cursor-pointer shadow-xs active:scale-95 shrink-0"
              >
                Book Free Audit ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
