/**
 * BRAND ENGINE — Orgix's owned visual signature.
 *
 * A continuous lime "growth engine" rail: baseline + compounding curve +
 * pulse node + mono tick labels. Rendered as:
 *   · hero    — large ghost rail under the hero statement
 *   · band    — section-divider rail (Stats → Process → …) so the motif
 *               reads as ONE element running through the whole page
 *   · node    — tiny engineered mark (CTA / footer)
 *
 * Pure presentational SVG — no state, no client JS.
 */

const TICKS = ["RESEARCH", "SCRIPT", "SHOOT", "EDIT", "POST", "COMPOUND"];

export default function BrandEngine({ variant = "band", label = "ORGIX GROWTH ENGINE", className = "" }) {
  if (variant === "node") {
    return (
      <span className={`engine-node ${className}`} role="presentation" aria-hidden="true">
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
          <circle cx="23" cy="23" r="21" stroke="var(--lime)" strokeWidth="1" opacity="0.45" />
          <path d="M23 2 C 33 10, 33 36, 23 44" stroke="var(--lime)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <circle cx="23" cy="23" r="11" className="engine-node-pulse" />
          <circle cx="23" cy="23" r="5" fill="var(--lime)" />
        </svg>
      </span>
    );
  }

  if (variant === "hero") {
    return (
      <div className="engine engine--hero" role="presentation" aria-hidden="true">
        <svg className="engine-svg" viewBox="0 0 1200 150" fill="none">
          <defs>
            <linearGradient id="engineLime" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c8f04d" stopOpacity="0" />
              <stop offset="0.4" stopColor="#c8f04d" />
              <stop offset="0.75" stopColor="#e5f872" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="engineWash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c8f04d" stopOpacity="0.16" />
              <stop offset="1" stopColor="#c8f04d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Baseline rail */}
          <line x1="0" y1="136" x2="1200" y2="136" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Compounding curve */}
          <path
            d="M0 136 C 220 134, 360 118, 500 106 S 800 76, 940 56 S 1120 30, 1200 18"
            stroke="url(#engineLime)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M0 136 C 220 134, 360 118, 500 106 S 800 76, 940 56 S 1120 30, 1200 18 L 1200 136 Z" fill="url(#engineWash)" />

          {/* Pulse nodes */}
          <circle cx="500" cy="106" r="3.5" fill="#c8f04d" opacity="0.85" />
          <circle cx="940" cy="56" r="5" fill="#e5f872" className="engine-node-pulse" />
          <circle cx="1200" cy="18" r="6" fill="#c8f04d" />

          {/* Tick labels */}
          <g
            className="engine-ticks"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.22em"
            fill="rgba(255,255,255,0.4)"
          >
            <text x="20" y="126">01 — RESEARCH</text>
            <text x="430" y="88" textAnchor="middle">03 — SHOOT</text>
            <text x="760" y="40" textAnchor="middle">05 — COMPOUND</text>
            <text x="1140" y="12" textAnchor="end">∞</text>
          </g>
        </svg>
        <div className="engine-hero-meta">
          <span className="engine-dot" />
          <span>
            {label} — COMPOUNDING, NOT POSTING · ZERO AD SPEND
          </span>
        </div>
      </div>
    );
  }

  // Default: band (section divider rail).
  return (
    <div className={`engine engine--band ${className}`} role="presentation" aria-hidden="true">
      <div className="engine-band-head">
        <span className="engine-dot" />
        <span className="engine-band-label">{label}</span>
        <span className="engine-band-bases">· {TICKS.join(" · ")}</span>
        <span className="engine-band-track" />
        <span className="engine-band-figure mono">⟶ ∞</span>
      </div>
      <svg className="engine-svg engine-svg--band" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
        <line x1="0" y1="48" x2="1440" y2="48" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <path
          d="M0 48 C 260 48, 420 40, 600 34 S 980 20, 1180 12 S 1360 6, 1440 4"
          stroke="url(#engineLime)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="600" cy="34" r="3" fill="#c8f04d" opacity="0.8" />
        <circle cx="1180" cy="12" r="5" fill="#e5f872" className="engine-node-pulse" />
      </svg>
    </div>
  );
}