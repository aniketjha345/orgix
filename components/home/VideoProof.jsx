"use client";

import { useRef } from "react";
import Section from "../core/Section";

const CLOUD = "https://res.cloudinary.com/dwjr5yrir/video/upload/f_auto,q_auto";

/**
 * VideoProof — client video rail, Cloudinary-streamed.
 * The rail drifts left → right on its own; hovering a card pauses
 * the rail and instantly previews that video (muted loop). Mouse
 * leave resets to the poster. Touch: tap toggles play with sound
 * controls. Reduced-motion: static grid, tap-to-play.
 */
const VIDEOS = [
  {
    name: "Demla Brothers",
    meta: "Founders · Cellbell",
    stat: "23.1K+ followers",
    poster: "/assets/creators/demla-brothers.jpg",
    src: `${CLOUD}/orgix-media/vid_client1.mp4`,
  },
  {
    name: "Shivam Careers",
    meta: "Career & AI Creator",
    stat: "100K in 80 posts",
    poster: "/assets/creators/shivam.jpg",
    src: `${CLOUD}/orgix-media/vid_client2.mp4`,
  },
  {
    name: "CA Jyoti Goyal",
    meta: "Chartered Accountant",
    stat: "36.7K+ followers",
    poster: "/assets/creators/jyoti-goyal.jpg",
    src: `${CLOUD}/orgix-media/vid_client3.mp4`,
  },
  {
    name: "Amit Arora",
    meta: "Import-Export Expert",
    stat: "23.6K+ followers",
    poster: "/assets/creators/amit-arora.png",
    src: `${CLOUD}/orgix-media/vid_client4.mp4`,
  },
  {
    name: "Pari Jain",
    meta: "Founder",
    stat: "0 → 129K organic",
    poster: "/assets/founders/pari-jain.jpg",
    src: `${CLOUD}/orgix-media/vid_pari.mp4`,
  },
  {
    name: "Alisha Chettri",
    meta: "Lifestyle Influencer",
    stat: "25.5K+ followers",
    poster: "/assets/stories/alisha-chettri.jpg",
    src: `${CLOUD}/orgix-media/vid_alisha.mp4`,
  },
];

function VideoCard({ v, hidden }) {
  const videoRef = useRef(null);

  const preview = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.controls = false;
    el.play().catch(() => {});
  };

  const reset = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    try {
      el.currentTime = 0;
    } catch {}
    el.load();
  };

  const toggleTap = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.controls = true;
      el.play().catch(() => {});
    } else {
      reset();
    }
  };

  return (
    <div
      className="video-rail-card device-mockup overflow-hidden bg-white flex flex-col shrink-0"
      onMouseEnter={preview}
      onMouseLeave={reset}
      aria-hidden={hidden || undefined}
    >
      <div className="relative aspect-[9/14] bg-bg-alt overflow-hidden">
        <video
          ref={videoRef}
          src={v.src}
          poster={v.poster}
          playsInline
          loop
          muted
          preload="none"
          onClick={toggleTap}
          className="w-full h-full object-cover cursor-pointer"
          aria-label={hidden ? undefined : `Testimonial video from ${v.name} — hover to preview, tap for sound`}
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10.5px] font-body font-semibold tracking-wide text-ink pointer-events-none">
          ▶ HOVER TO PLAY
        </span>
      </div>
      <div className="p-5">
        <div className="font-display font-medium text-[16px] text-ink leading-tight">
          {v.name}
        </div>
        <div className="text-[12.5px] font-body text-ink-soft mt-0.5">
          {v.meta} · {v.stat}
        </div>
      </div>
    </div>
  );
}

export default function VideoProof() {
  const row = [...VIDEOS, ...VIDEOS];

  return (
    <Section id="video-proof" bgAlt={true} className="select-none overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            Client stories
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            In their own words.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Hover any story to preview it — streamed from our own Cloudinary CDN.
          </p>
        </div>
      </div>

      {/* Drifting rail (full-bleed, outside the 1200px container) */}
      <div className="video-rail-viewport reveal-visual is-revealed">
        <div className="video-rail-track">
          {row.map((v, i) => (
            <VideoCard key={`${v.name}-${i}`} v={v} hidden={i >= VIDEOS.length} />
          ))}
        </div>
      </div>
    </Section>
  );
}
