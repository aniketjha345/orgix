"use client";

import { useMemo, useState } from "react";
import WallCard from "./WallCard";
import Reveal from "../core/Reveal";
import Icon from "../core/Icon";
import { stories } from "@/data/site";

const cats = ["All", "Founders", "Creators", "Brands"];

export default function WorkExplorer() {
  const [cat, setCat] = useState("All");
  const items = useMemo(() => (cat === "All" ? stories : stories.filter((s) => s.cat === cat)), [cat]);

  const counts = useMemo(() => {
    const c = { All: stories.length };
    cats.slice(1).forEach((k) => (c[k] = stories.filter((s) => s.cat === k).length));
    return c;
  }, []);

  const handleNextClick = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { creator: "New Client", niche: "Personal Brand Scale" },
      })
    );
  };

  return (
    <div className="work-explorer-wrap">
      <div className="filters" role="tablist" aria-label="Filter case studies by category">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            className={`filter-btn ${cat === c ? "on" : ""}`}
            onClick={() => setCat(c)}
          >
            <span>{c}</span>
            <span className="filter-count">{counts[c]}</span>
          </button>
        ))}
      </div>

      <div className="wall-grid">
        {items.map((s, i) => (
          <WallCard s={s} i={i} key={s.handle} />
        ))}

        {/* The 15th CTA Card: Next Can Be You */}
        <Reveal
          delay={0.15}
          as="article"
          className="wall-card wall-card--next group"
          data-cursor="CLAIM"
          onClick={handleNextClick}
        >
          <div className="wall-card-frame wall-card-next-inner">
            <div className="wall-next-radial" aria-hidden="true" />
            <div className="wall-card-top">
              <span className="wall-card-badge wall-next-badge">
                YOUR PROFILE
              </span>
              <span className="wall-card-followers">
                <Icon name="trend" size={12} style={{ color: "var(--accent)" }} />
                Next In Line
              </span>
            </div>

            <div className="wall-next-body">
              <div className="wall-next-plus" aria-hidden="true">+</div>
              <h3 className="wall-next-title">
                Next can be <span className="grad-hot">you.</span>
              </h3>
              <p className="wall-next-desc">
                Every founder on this wall started with one conversation. Let’s architect your 100% organic engine.
              </p>
              <button
                className="wall-next-cta"
                onClick={handleNextClick}
              >
                Claim Your Slot <Icon name="arrow" size={14} className="arr" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
