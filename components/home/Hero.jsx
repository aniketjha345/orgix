"use client";

import { useRef } from "react";
import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import HeroCanvas3D from "./HeroCanvas3D";
import BrandEngine from "../ui/BrandEngine";
import { heroCreators, company, imgSrc } from "@/data/site";

const avatars = [
  "/images/creators/aarti-malhotra.jpg",
  "/images/creators/anuj-chhajerh.jpg",
  "/images/creators/simran-balraj.jpg",
  "/images/creators/gaurav-mahawar.jpg",
  "/images/creators/ruchira.jpg",
].map(imgSrc);

// Safety: the collage expects exactly 3 creator cards. If the data ever has
// fewer entries, cycle what's available instead of crashing.
const casts = Array.from({ length: 3 }, (_, i) => heroCreators[i % Math.max(heroCreators.length, 1)]);
const castClass = ["a", "b", "c"];

export default function Hero() {
  const stage = useRef(null);

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    if (reduced || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    stage.current.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    stage.current.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
  };

  const onLeave = () => {
    if (!stage.current) return;
    stage.current.style.setProperty("--rx", "0deg");
    stage.current.style.setProperty("--ry", "0deg");
  };

  const baseRot = { a: "-7deg", b: "5deg", c: "3deg" };
  const cardStyle = (k) => ({
    transform: `rotate(${baseRot[k]}) perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`,
  });

  return (
    <section className="hero grain">
      <HeroCanvas3D />
      <div className="grid-lines" style={{ position: "absolute", inset: 0 }} aria-hidden="true" />
      <div
        className="hero-glow"
        style={{
          width: 560,
          height: 560,
          top: -160,
          left: "12%",
          background: "radial-gradient(circle, rgba(139,92,246,0.28), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="hero-glow"
        style={{
          width: 640,
          height: 640,
          bottom: -220,
          right: "-8%",
          background: "radial-gradient(circle, rgba(255,61,127,0.16), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container">
        <div className="hero-grid">
          <div>
            <Reveal delay={0.02}>
              <div className="hero-badge">
                <span className="pulse" />
                00 — THE ORGANIC MEDIA ENGINE
                <span style={{ color: "var(--lime)", fontWeight: 800 }}>100% ORGANIC</span>
              </div>
            </Reveal>

            <Reveal delay={0.09}>
              <h1 className="display">
                Build the brand <br />
                <span className="grad-hot">behind you.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.17}>
              <p className="lead sub">
                We turn founders, Shark Tank innovators, and high-impact thinkers into undisputed category authorities —
                with research-backed <b style={{ color: "var(--ink)" }}>Instagram &amp; YouTube</b> video engines.
                Zero ad spend. Zero noise. Content that compounds into enterprise equity.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn--lime btn--lg shine">
                  Start Growing <Icon name="arrow" size={18} className="arr" />
                </Link>
                <Link href="/work" className="btn btn--ghost btn--lg">
                  Explore case studies <Icon name="arrow" size={18} className="arr" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="hero-proof">
                <div className="avatar-stack">
                  {avatars.map((a) => (
                    <img key={a} src={a} alt="" width={42} height={42} />
                  ))}
                </div>
                <p>
                  Trusted by <b>85+ founders &amp; creators</b> across India
                  <br />
                  <span style={{ fontSize: 12 }}>{company.location}</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* collage */}
          <div className="hero-stage" ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
            <div className="hero-orb" aria-hidden="true" />
            <div className="ring" aria-hidden="true" />

            {casts.map((m, i) => (
              <div className={`hero-card hero-card--${castClass[i]}`} key={castClass[i]} style={cardStyle(castClass[i])}>
                <div className="card-img">
                  <img src={imgSrc(m.img)} alt={m.handle || "Creator"} width={400} height={500} />
                  <div className="meta">
                    <div className="role">{m.role}</div>
                    <div className="row">
                      <b>{m.handle}</b>
                      <span className="fcount">
                        <Icon name="ig" size={11} />
                        {m.followers}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="hero-chip chip--a" style={{ animationDelay: "-1s" }}>
              <span className="ic" style={{ background: "rgba(200,240,77,.16)", color: "var(--lime)" }}>
                <Icon name="zap" size={20} />
              </span>
              <span>
                <b>1B+</b>
                <span>Views generated</span>
              </span>
            </div>
            <div className="hero-chip chip--b">
              <span className="ic" style={{ background: "rgba(139,92,246,.2)", color: "var(--violet-2)" }}>
                <Icon name="trend" size={20} />
              </span>
              <span>
                <b>+129K</b>
                <span>followers in 9 months</span>
              </span>
            </div>
            <div className="hero-chip chip--c" style={{ animationDelay: "-3.4s" }}>
              <span className="ic" style={{ background: "rgba(255,61,127,.16)", color: "#ff7aa9" }}>
                <Icon name="heart" size={20} />
              </span>
              <span>
                <b>100%</b>
                <span>Organic growth</span>
              </span>
            </div>
          </div>
        </div>

        <BrandEngine variant="hero" label="01 · THE ORGIX GROWTH ENGINE" />

        <Reveal delay={0.45}>
          <div className="scroll-cue">Scroll to explore</div>
        </Reveal>
      </div>
    </section>
  );
}
