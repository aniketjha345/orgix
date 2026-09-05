"use client";

import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import { imgSrc } from "@/data/site";

export default function WallCard({ s, i }) {
  const handleClaim = (e) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { creator: s.name, niche: s.role },
      })
    );
  };

  // Touch + keyboard users can't hover, so the whole card opens the
  // consultation modal; the IG profile link inside still stops propagation.
  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { creator: s.name, niche: s.role },
      })
    );
  };

  return (
    <Reveal
      delay={(i % 3) * 0.08}
      as="article"
      className="wall-card group"
      tabIndex={0}
      role="group"
      aria-label={`${s.name} — ${s.work}. Activate to get results like this.`}
      data-cursor="HOVER"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="wall-card-frame">
        <img
          src={imgSrc(s.img)}
          alt={`${s.name} — Instagram growth with Orgix Media`}
          loading="lazy"
          className="wall-card-img"
        />
        <div className="wall-card-gradient" />

        {/* Top Badges */}
        <div className="wall-card-top">
          <span className="wall-card-badge">{s.role}</span>
          <span className="wall-card-followers">
            <Icon name="trend" size={12} style={{ color: "var(--lime)" }} />
            {s.followers}
          </span>
        </div>

        {/* Default Bottom Meta (Visible before hover) */}
        <div className="wall-card-meta">
          <div className="wall-card-name-row">
            <h4 className="wall-card-name">{s.name}</h4>
            {s.verified && <Icon name="verified" size={15} style={{ color: "var(--lime)" }} />}
          </div>
          <span className="wall-card-handle">{s.handle}</span>
          <p className="wall-card-work">{s.work}</p>
          <span className="wall-card-tap-hint">
            <Icon name="arrow" size={12} />
            Tap to claim your slot
          </span>
        </div>

        {/* Hover Reveal: What We Did & Action */}
        <div className="wall-card-reveal" aria-hidden="true">
          <span className="wall-reveal-tag">✦ What We Did</span>
          <p className="wall-reveal-role">{s.role}</p>
          <p className="wall-reveal-work">{s.work}</p>
          <div className="wall-reveal-stats">
            <span className="wall-stat-followers">{s.followers} Followers</span>
            <a
              href={`https://instagram.com/${s.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wall-stat-handle"
              onClick={(e) => e.stopPropagation()}
              title={`View ${s.name} on Instagram`}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--lime)", textDecoration: "none" }}
            >
              <Icon name="ig" size={13} />
              {s.handle}
            </a>
          </div>
          <button className="wall-card-cta" onClick={handleClaim}>
            Get Results Like This →
          </button>
        </div>
      </div>
    </Reveal>
  );
}
