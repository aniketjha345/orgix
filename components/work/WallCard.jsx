"use client";

import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import InstagramCard from "../ui/InstagramCard";

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
  // consultation modal; the real Instagram links inside stop propagation.
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
      className="wall-card ig-wall-item group"
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
      {/* Authentic Instagram profile card — real photo, real data */}
      <InstagramCard s={s} />

      {/* Footer: what Orgix did + action */}
      <div className="ig-wall-foot">
        <div className="ig-wall-foot-top">
          <span className="ig-wall-tag">✦ What we did</span>
          <span className="ig-wall-cat">{s.cat}</span>
        </div>
        <p className="ig-wall-work">{s.work}</p>
        <button className="ig-wall-cta" onClick={handleClaim}>
          Get results like this <Icon name="arrow" size={13} className="arr" />
        </button>
      </div>
    </Reveal>
  );
}