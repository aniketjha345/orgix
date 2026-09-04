"use client";

import { useRef } from "react";
import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import { services } from "@/data/site";

const accents = {
  lime: "rgba(200,240,77,0.22)",
  violet: "rgba(139,92,246,0.3)",
};

export default function ServicesCards({ detailed = false }) {
  const grid = useRef(null);

  // Cursor spotlight — tracks the pointer across the card surface.
  const onMove = (e) => {
    const card = e.target.closest(".svc-card");
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="svc-grid" ref={grid} onPointerMove={onMove}>
      {services.map((s, i) => (
        <Reveal delay={i * 0.12} key={s.id} as="article">
          <div
            className="svc-card shine"
            style={{ "--glow": accents[s.accent], minHeight: detailed ? 620 : "auto" }}
          >
            <span className="spot" aria-hidden="true" />
            <div className="svc-top">
              <span className="svc-idx">({s.index})</span>
              <span className={`svc-tag ${s.accent === "violet" ? "svc-tag--violet" : ""}`}>{s.tag}</span>
            </div>
            <div>
              <div className="svc-sub">{s.name}</div>
              <h3>{s.title}</h3>
            </div>
            <p className="svc-desc">{s.desc}</p>

            <ul className="svc-feats">
              {s.features.map((f) => (
                <li key={f}>
                  <Icon name="check" size={17} style={{ color: "var(--lime)", flex: "none" }} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="svc-foot">
              <div className="svc-stat">
                <b>{s.stat.value}</b>
                <span>{s.stat.label}</span>
              </div>
              <Link href="/contact" className="btn btn--ghost btn--sm" style={{ whiteSpace: "nowrap" }}>
                Get a strategy
                <Icon name="arrow" size={15} className="arr" />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
