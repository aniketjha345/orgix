"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/core/Button";
import { timelineJourney } from "@/data/site";

const THEMES = ["#EA580C", "#16A34A", "#DB2777", "#2E5BFF"];
const THEME_RGB = [
  [234, 88, 12],
  [22, 163, 74],
  [219, 39, 119],
  [46, 91, 255],
];

// Editorial enrichment per chapter — visuals + proof chips live here so
// data/site.js (shared with /about) stays untouched.
const META = [
  {
    indexLabel: "01",
    era: "Origin",
    metric: "₹0",
    metricLabel: "ad spend. Pure conviction.",
    visual: {
      kind: "duo",
      images: [
        { src: "/images/founders/anant-jain.jpg", alt: "Anant Jain, co-founder" },
        { src: "/images/founders/deepak-jain.jpg", alt: "Deepak Jain, co-founder" },
      ],
      caption: "Anant × Deepak — the two minds in one room",
    },
    chips: ["2 founders", "1 small room", "0 ad spend"],
    beat: "The bet: authentic organic beats paid. Every single time.",
  },
  {
    indexLabel: "02",
    era: "Momentum",
    metric: "3×",
    metricLabel: "niches pull us in via referrals.",
    visual: {
      kind: "grid",
      images: [
        { src: "/images/creators/gaurav-mahawar.jpg", alt: "Finance creator scaled by Orgix" },
        { src: "/images/stories/ca-jyoti-goyal.jpg", alt: "CA creator scaled by Orgix" },
        { src: "/images/creators/royston-dias.jpg", alt: "Creator scaled by Orgix" },
        { src: "/images/stories/alisha-chettri.jpg", alt: "Creator scaled by Orgix" },
      ],
      caption: "Founders · Doctors · CAs — word of mouth only",
    },
    chips: ["Founders", "Doctors & CAs", "100% referrals"],
    beat: "No ads, no outreach. Creator circles just kept talking.",
  },
  {
    indexLabel: "03",
    era: "Studio",
    metric: "E2E",
    metricLabel: "script → shoot → edit → grow.",
    visual: {
      kind: "single",
      images: [{ src: "/images/process/04-editing.webp", alt: "High-retention editing inside Orgix studio" }],
      caption: "Scripting · Guided shoots · Retention edits",
    },
    chips: ["Script → Post", "Full-stack studio", "Retention-first"],
    beat: "A real studio pipeline — not freelancers on WhatsApp.",
  },
  {
    indexLabel: "04",
    era: "Impact",
    metric: "1B+",
    metricLabel: "organic views & counting.",
    visual: {
      kind: "single",
      images: [{ src: "/images/founders/pari-jain.jpg", alt: "Pari Jain, creative face of Orgix Media" }],
      caption: "25–30 operators · Delhi HQ · 85+ authorities built",
    },
    chips: ["1B+ views", "85+ creators", "25–30 in-house"],
    beat: "From a room to India's organic growth headquarters.",
  },
];

const CHAPTERS = timelineJourney.map((c, i) => ({
  ...c,
  theme: THEMES[i % THEMES.length],
  themeRgb: THEME_RGB[i % THEME_RGB.length],
  meta: META[i] || META[META.length - 1],
}));

function mixRgb(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/**
 * ScrollStory — "The Orgix Story" (next-level cinematic timeline).
 *
 * Desktop: GSAP pins a 100svh stage for ~4 screens of scroll.
 * - Left: chapter narrative (kicker → giant title → text → proof chips → beat line)
 * - Right: visual stage — per-chapter photography cards with Ken Burns + metric plate
 * - Behind: warp-streak canvas tunnel tinted by the active chapter theme,
 *   giant ghost-year watermark, per-chapter aurora glow
 * - Below: clickable journey rail (2022 → 2026) with filling progress line
 * Mobile / reduced-motion: vertical timeline with rail, dots, photo cards.
 */
export default function ScrollStory() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const slidesRef = useRef([]);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const barRef = useRef(null);
  const railFillRef = useRef(null);
  const hintRef = useRef(null);
  const stRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStacked(window.innerWidth < 768 || reduce);
  }, []);

  // Jump to a chapter when its year pill is clicked (desktop pinned mode)
  const jumpTo = (i) => {
    const st = stRef.current;
    const section = sectionRef.current;
    if (!st || !section) return;
    const scrollLen = st.end - st.start;
    const target = st.start + scrollLen * (i / CHAPTERS.length + 0.001);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Desktop: warp-streak canvas + GSAP pinned cinematic
  useEffect(() => {
    if (stacked) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    const FOCAL = 340;
    const TRAVEL = 9;
    const Z_MAX = 10;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let prevProgress = 0;
    let vel = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const COUNT = 170;

    const pts = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 3.6,
      y: (Math.random() - 0.5) * 2.4,
      z: Math.random() * Z_MAX,
      r: 0.8 + Math.random() * 1.8,
      a: 0.22 + Math.random() * 0.62,
      accent: Math.random() < 0.22,
      speed: 0.7 + Math.random() * 0.9,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointer = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const prog = progressRef.current;
      // Scroll velocity → streak length (clamped, eased back to rest)
      vel += (Math.min(Math.abs(prog - prevProgress) * 14, 1.6) - vel) * 0.08;
      prevProgress = prog;
      const camZ = prog * TRAVEL;
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      const cx = w / 2 + mouse.x * 30;
      const cy = h / 2 + mouse.y * 20;
      ctx.clearRect(0, 0, w, h);

      // Blend theme colour across chapter boundaries for a seamless grade shift
      const f = Math.min(CHAPTERS.length - 1.001, prog * CHAPTERS.length);
      const ci = Math.floor(f);
      const ct = f - ci;
      const rgb = mixRgb(
        CHAPTERS[ci].themeRgb,
        CHAPTERS[Math.min(ci + 1, CHAPTERS.length - 1)].themeRgb,
        ct
      );

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.z += vel * 0.012 * p.speed;
        if (p.z - camZ < -0.6) {
          p.z += Z_MAX;
          if (p.z - camZ > Z_MAX) p.z = camZ + Math.random() * Z_MAX;
          continue;
        }
        const dz = p.z - camZ;
        const far = Math.max(0, Math.min(1, dz / Z_MAX));
        const scale = FOCAL / (FOCAL + dz * 46);
        const sx = cx + p.x * scale * 175;
        const sy = cy + p.y * scale * 175;
        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;
        // Radial streak away from vanishing point — reads as time-travel
        const dx = sx - cx;
        const dy = sy - cy;
        const dist = Math.max(1, Math.hypot(dx, dy));
        const streak = (2 + vel * 46 * p.speed + (1 - scale) * 7) / dist;
        const tx = sx + dx * streak;
        const ty = sy + dy * streak;
        const alpha = p.a * Math.max(0, Math.min(1, (1 - far) * 1.7 + 0.1));
        ctx.beginPath();
        ctx.strokeStyle = p.accent
          ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(alpha * 0.95).toFixed(3)})`
          : `rgba(236, 233, 226, ${(alpha * 0.8).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.4, p.r * scale * (p.accent ? 1.25 : 1));
        ctx.lineCap = "round";
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    let ctxG = null;
    let cancelled = false;
    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ctxG = gsap.context(() => {
          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => "+=" + (CHAPTERS.length * 110 + 40) + "%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              stRef.current = self;
              const pct = (self.progress * 100).toFixed(2) + "%";
              if (barRef.current) {
                barRef.current.style.width = pct;
                const f2 = Math.min(
                  CHAPTERS.length - 1,
                  Math.floor(self.progress * CHAPTERS.length)
                );
                barRef.current.style.backgroundColor = CHAPTERS[f2].theme;
              }
              if (railFillRef.current) railFillRef.current.style.transform = `scaleX(${self.progress})`;
              if (hintRef.current)
                hintRef.current.style.opacity = self.progress > 0.03 ? "0" : "1";
              const idx = Math.min(
                CHAPTERS.length - 1,
                Math.floor(self.progress * CHAPTERS.length)
              );
              activeRef.current = idx;
              setActiveIdx((prev) => (prev === idx ? prev : idx));
            },
          });
          stRef.current = st;
        }, section);
      } catch {
        /* No-JS-animation fallback: stacked reading order still works */
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      stRef.current = null;
      if (ctxG) ctxG.revert();
    };
  }, [stacked]);

  // Mobile / reduced-motion: reveal chapters as you scroll
  useEffect(() => {
    if (!stacked) return;
    const els = slidesRef.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stacked]);

  const active = CHAPTERS[activeIdx];

  const renderVisual = (ch, i, isActive) => {
    const v = ch.meta.visual;
    return (
      <div
        aria-hidden={!isActive}
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          isActive
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-[0.94] blur-[6px] pointer-events-none"
        }`}
        style={{ transform: isActive ? undefined : "scale(0.94) translateY(14px)" }}
      >
        <div
          className="relative h-full rounded-[24px] overflow-hidden border border-white/12 bg-white/[0.04] backdrop-blur-sm"
          style={{ boxShadow: `0 40px 120px -30px ${ch.theme}55, 0 30px 80px rgba(0,0,0,0.5)` }}
        >
          {v.kind === "duo" && (
            <div className="grid grid-cols-2 h-[62%]">
              {v.images.map((im) => (
                <div key={im.src} className="relative overflow-hidden">
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover object-top ${isActive ? "kenburns" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/70 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          )}
          {v.kind === "grid" && (
            <div className="grid grid-cols-2 grid-rows-2 h-[62%]">
              {v.images.map((im, k) => (
                <div key={im.src} className="relative overflow-hidden">
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover ${isActive ? "kenburns" : ""}`}
                    style={{ animationDelay: `${k * 0.4}s` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          )}
          {v.kind === "single" && (
            <div className="relative h-[62%] overflow-hidden">
              <img
                src={v.images[0].src}
                alt={v.images[0].alt}
                loading="lazy"
                className={`w-full h-full object-cover ${isActive ? "kenburns" : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/20 to-transparent" />
              {/* Metric monument riding the photo */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                <div
                  className="font-display font-semibold leading-none tracking-[-0.03em] text-white"
                  style={{ fontSize: "clamp(56px, 7vw, 96px)", textShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
                >
                  {ch.meta.metric}
                </div>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/85 mb-2"
                >
                  {ch.meta.era}
                </div>
              </div>
            </div>
          )}

          {/* Caption + proof plate */}
          <div className="p-5 sm:p-6 flex flex-col justify-between gap-4" style={{ height: "38%" }}>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55 leading-relaxed">
              {v.caption}
            </p>
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div>
                <div className="font-display text-[22px] sm:text-[26px] text-white leading-tight">
                  {ch.meta.metricLabel}
                </div>
                <div className="text-[13px] text-white/50 mt-1">{ch.meta.beat}</div>
              </div>
              <span
                className="shrink-0 w-11 h-11 rounded-full grid place-items-center font-mono text-[11px] text-white border"
                style={{ borderColor: ch.theme + "66", backgroundColor: ch.theme + "1F" }}
              >
                {ch.meta.indexLabel}
              </span>
            </div>
          </div>

          {/* Theme edge light */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] transition-colors duration-700"
            style={{ background: `linear-gradient(90deg, transparent, ${ch.theme}, transparent)` }}
          />
        </div>
      </div>
    );
  };

  const renderSlide = (ch, i) => {
    const last = i === CHAPTERS.length - 1;
    const isActive = stacked ? true : activeIdx === i;
    return (
      <div
        key={ch.year}
        ref={stacked ? (el) => (slidesRef.current[i] = el) : undefined}
        aria-hidden={stacked ? undefined : !isActive}
        className={
          stacked
            ? "story-chapter opacity-0 translate-y-8 transition-all duration-700"
            : `absolute inset-0 transition-all duration-700 ease-out ${
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
              }`
        }
      >
        <div className="relative">
          {/* Chapter eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border backdrop-blur-md"
              style={{
                color: ch.theme,
                borderColor: ch.theme + "55",
                backgroundColor: ch.theme + "14",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ch.theme }} />
              {ch.meta.indexLabel} · {ch.kicker}
            </span>
          </div>

          <h2 className="font-display font-medium text-white leading-[0.98] tracking-[-0.03em] mb-4 text-[clamp(38px,5.2vw,68px)]">
            {ch.title}
            <span style={{ color: ch.theme }}>.</span>
          </h2>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/70 max-w-[560px]">
            {ch.text}
          </p>

          {/* Proof chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {ch.meta.chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.05] text-white/75 backdrop-blur-md"
              >
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: ch.theme }} />
                {c}
              </span>
            ))}
          </div>

          {last && !stacked && (
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                href="/contact"
                ariaLabel="Book a free call to start your story"
                className="bg-white text-ink border-white hover:bg-white/85 hover:border-white/85"
              >
                Book a Free Call →
              </Button>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                1B+ views · 85+ creators · 100% organic
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (stacked) {
    return (
      <section
        id="story"
        aria-label="The Orgix story — how a two-person room became a one-billion-view studio"
        className="relative overflow-hidden text-white"
        style={{ background: "radial-gradient(120% 130% at 50% 0%, #14223E 0%, #0C1526 48%, #070D18 100%)" }}
      >
        <style>{`.story-chapter.is-in{opacity:1 !important;transform:none !important;}.kenburns{animation:story-kenburns 7s ease-out forwards;}@keyframes story-kenburns{from{transform:scale(1.12);}to{transform:scale(1);}}`}</style>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
              The Orgix Story
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              2022 → 2026
            </span>
          </div>
          <h2 className="font-display font-medium text-white tracking-[-0.03em] leading-[0.98] text-[clamp(34px,8vw,56px)] mb-14 max-w-[16ch]">
            A small room. <span className="text-white/40">An unreasonable belief in organic.</span>
          </h2>

          <div className="relative pl-8 sm:pl-10">
            {/* Vertical journey rail */}
            <div aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-white/12">
              <div className="absolute inset-0 bg-gradient-to-b from-[#EA580C] via-[#DB2777] to-[#2E5BFF] opacity-60" />
            </div>
            <div className="space-y-14">
              {CHAPTERS.map((ch, i) => (
                <div
                  key={ch.year}
                  ref={(el) => (slidesRef.current[i] = el)}
                  className="story-chapter relative opacity-0 translate-y-8 transition-all duration-700"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 sm:-left-10 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#070D18]"
                    style={{ backgroundColor: ch.theme, boxShadow: `0 0 18px ${ch.theme}` }}
                  />
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase mb-3" style={{ color: ch.theme }}>
                    {ch.meta.indexLabel} — {ch.year} · {ch.meta.era}
                  </div>
                  <div className="rounded-[20px] overflow-hidden border border-white/12 bg-white/[0.04] mb-5">
                    <div className="relative h-52 sm:h-64 overflow-hidden">
                      <img
                        src={ch.meta.visual.images[0].src}
                        alt={ch.meta.visual.images[0].alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/85 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 font-display text-[44px] leading-none text-white font-semibold">
                        {ch.meta.metric}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-[26px] text-white mb-2">{ch.title}</h3>
                      <p className="text-[14.5px] leading-relaxed text-white/65 mb-4">{ch.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {ch.meta.chips.map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-white/12 bg-white/[0.05] text-white/70"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-[20px] border border-white/12 bg-white/[0.04] p-6 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 mb-2">
              1B+ views · 85+ creators · 100% organic
            </div>
            <div className="font-display text-[28px] text-white mb-4">Your chapter starts here.</div>
            <Button
              href="/contact"
              ariaLabel="Book a free call to start your story"
              className="bg-white text-ink border-white hover:bg-white/85"
            >
              Book a Free Call →
            </Button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(246,244,239,0), #F6F4EF)" }}
        />
      </section>
    );
  }

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-label="The Orgix story — how a two-person room became a one-billion-view studio"
      className="relative overflow-hidden text-white"
      style={{ background: "#070D18" }}
    >
      <style>{`.kenburns{animation:story-kenburns 7s ease-out forwards;}@keyframes story-kenburns{from{transform:scale(1.12);}to{transform:scale(1);}}`}</style>

      {/* Base grade + per-chapter aurora (crossfades via opacity) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 130% at 50% 0%, #16263F 0%, #0C1526 48%, #070D18 100%)" }}
      />
      {CHAPTERS.map((ch, i) => (
        <div
          key={ch.year}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: activeIdx === i ? 1 : 0,
            background: `radial-gradient(46% 38% at 78% 42%, ${ch.theme}26, transparent 70%), radial-gradient(34% 30% at 12% 78%, ${ch.theme}14, transparent 70%)`,
          }}
        />
      ))}
      {/* Faint blueprint grid + vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(75% 70% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(75% 70% at 50% 45%, black 30%, transparent 100%)",
        }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(90% 90% at 50% 50%, transparent 55%, rgba(3,6,12,0.75) 100%)" }}
      />

      {/* Ghost year watermark — stacked, active punches through */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.year}
            className="absolute -bottom-6 sm:bottom-0 left-0 right-0 text-center select-none font-display font-semibold leading-none transition-all duration-700"
            style={{
              fontSize: "clamp(140px, 26vw, 420px)",
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: `1.5px ${ch.theme}${activeIdx === i ? "55" : "00"}`,
              opacity: activeIdx === i ? 1 : 0,
              transform: activeIdx === i ? "translateY(0)" : "translateY(46px)",
            }}
          >
            {ch.year.replace("–2026", "")}
          </div>
        ))}
      </div>

      {/* Top scroll progress in active theme colour */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ backgroundColor: "rgba(255,255,255,0.10)" }} aria-hidden="true">
        <div ref={barRef} className="h-full transition-colors duration-500" style={{ width: "0%", backgroundColor: active.theme }} />
      </div>

      {/* Pinned viewport */}
      <div ref={pinRef} className="relative z-10 h-screen flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
            The Orgix Story <span className="text-white/25">— scroll to time-travel</span>
          </span>
          <span className="font-mono text-[11px] tracking-[0.24em] text-white/50 tabular-nums">
            <span className="text-white text-[15px] font-semibold">{active.meta.indexLabel}</span>
            <span className="text-white/30"> / 04</span>
          </span>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 min-h-0 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center pb-2">
          {/* LEFT — narrative chapters */}
          <div className="relative min-h-[380px] sm:min-h-[420px]">
            {CHAPTERS.map((ch, i) => renderSlide(ch, i))}
          </div>

          {/* RIGHT — visual stage */}
          <div className="relative hidden md:block h-[480px] lg:h-[520px]">
            {CHAPTERS.map((ch, i) => renderVisual(ch, i, activeIdx === i))}
            {/* Corner ticks — viewfinder feel */}
            <div aria-hidden="true" className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-white/25" />
            <div aria-hidden="true" className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-white/25" />
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-white/25" />
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-white/25" />
          </div>
        </div>

        {/* Journey rail — clickable years with filling line */}
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="relative pt-5">
            <div aria-hidden="true" className="absolute top-[27px] left-0 right-0 h-px bg-white/12">
              <div
                ref={railFillRef}
                className="h-full origin-left"
                style={{
                  transform: "scaleX(0)",
                  background: `linear-gradient(90deg, ${CHAPTERS[0].theme}, ${CHAPTERS[1].theme}, ${CHAPTERS[2].theme}, ${CHAPTERS[3].theme})`,
                }}
              />
            </div>
            <div className="relative flex justify-between gap-2">
              {CHAPTERS.map((ch, i) => {
                const isOn = i <= activeIdx;
                const isNow = i === activeIdx;
                return (
                  <button
                    key={ch.year}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Jump to chapter ${ch.year}: ${ch.title}`}
                    className="group flex flex-col items-start gap-2 pt-0 text-left focus-visible:outline-none"
                  >
                    <span
                      className="block w-2.5 h-2.5 rounded-full border transition-all duration-500"
                      style={{
                        backgroundColor: isOn ? ch.theme : "transparent",
                        borderColor: isOn ? ch.theme : "rgba(255,255,255,0.3)",
                        boxShadow: isNow ? `0 0 16px ${ch.theme}` : "none",
                        transform: isNow ? "scale(1.35)" : "scale(1)",
                      }}
                    />
                    <span
                      className={`font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                        isNow ? "text-white" : isOn ? "text-white/70" : "text-white/35 group-hover:text-white/70"
                      }`}
                    >
                      {ch.year}
                    </span>
                    <span
                      className={`hidden sm:block text-[12px] transition-colors duration-500 max-w-[160px] leading-snug ${
                        isNow ? "text-white/75" : "text-white/30 group-hover:text-white/55"
                      }`}
                    >
                      {ch.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition-opacity duration-500 animate-bounce"
          aria-hidden="true"
        >
          Scroll ↓
        </div>
      </div>

      {/* Soft fade into the next paper section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(246,244,239,0), #F6F4EF)" }}
      />
    </section>
  );
}
