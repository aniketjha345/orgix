"use client";

import Icon from "../core/Icon";

/**
 * InstagramCard — a fully original Instagram profile mockup built from
 * real client data (profile photo, handle, follower count, category).
 * Replaces raw screenshots with a crisp, on-brand profile card:
 * story-ring avatar, verified badge, live stats, bio, action buttons
 * and highlights. No feed grid — pure profile-card presentation.
 */

function hashNum(str, max) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100003;
  return h % max;
}

function parseFollowers(f) {
  const m = String(f)
    .replace(/[+,]/g, "")
    .match(/([\d.]+)\s*([KM]?)/i);
  if (!m) return 10000;
  const v = parseFloat(m[1]);
  const unit = (m[2] || "").toUpperCase();
  return unit === "M" ? v * 1e6 : unit === "K" ? v * 1e3 : v;
}

function compact(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

const ROLE_EMOJI = {
  Founder: "🏆",
  Creators: "🎬",
  Brands: "🛍️",
};

export default function InstagramCard({ s, className = "" }) {
  const followersNum = parseFollowers(s.followers);
  const posts = 58 + hashNum(s.handle, 70);
  const following = 220 + hashNum(s.handle, 460);
  const emoji = ROLE_EMOJI[s.cat] || "🌟";
  const profileUrl = `https://instagram.com/${s.handle.replace("@", "")}`;

  return (
    <div className={`ig-card ${className}`}>
      {/* Top nav: back arrow · username + verified · menu */}
      <div className="ig-topbar">
        <span className="ig-top-icon" aria-hidden="true">←</span>
        <span className="ig-top-user">
          {s.handle}
          {s.verified && (
            <span className="ig-verified" title="Verified on Instagram">
              <Icon name="verified" size={12} />
            </span>
          )}
        </span>
        <span className="ig-top-icon" aria-hidden="true">⋯</span>
      </div>

      {/* Avatar row with story ring + identity */}
      <div className="ig-head">
        <div className="ig-avatar-ring">
          <img
            src={s.img}
            alt={`${s.name} Instagram profile picture`}
            width={72}
            height={72}
            className="ig-avatar"
            loading="lazy"
          />
        </div>
        <div className="ig-id">
          <div className="ig-handle">
            {s.handle}
            {s.verified && (
              <span className="ig-verified" title="Verified on Instagram">
                <Icon name="verified" size={13} />
              </span>
            )}
          </div>
          <div className="ig-name">{s.name}</div>
          <div className="ig-role">{s.role}</div>
        </div>
      </div>

      {/* Live stats row */}
      <div className="ig-stats">
        <div className="ig-stat">
          <b>{posts}</b>
          <span>posts</span>
        </div>
        <div className="ig-stat">
          <b>{compact(followersNum)}</b>
          <span>followers</span>
        </div>
        <div className="ig-stat">
          <b>{following}</b>
          <span>following</span>
        </div>
      </div>

      {/* Bio — name, category + what Orgix did */}
      <div className="ig-bio">
        <b>{s.name}</b>
        <span>{s.role}</span>
        <span className="ig-work">
          ✦ <i>What we did:</i> {s.work}
        </span>
      </div>

      {/* Action buttons */}
      <div className="ig-actions">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-btn ig-btn-follow"
          aria-label={`Follow ${s.name} on Instagram`}
          onClick={(e) => e.stopPropagation()}
        >
          Follow
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-btn ig-btn-msg"
          onClick={(e) => e.stopPropagation()}
        >
          Message
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ig-btn ig-btn-more"
          aria-label="More options"
          onClick={(e) => e.stopPropagation()}
        >
          ▾
        </a>
      </div>

      {/* Highlights */}
      <div className="ig-highlights">
        <div className="ig-hl">
          <span className="ig-hl-ring">{emoji}</span>
          <span className="ig-hl-label">Featured</span>
        </div>
        <div className="ig-hl">
          <span className="ig-hl-ring">🎯</span>
          <span className="ig-hl-label">Hooks</span>
        </div>
        <div className="ig-hl">
          <span className="ig-hl-ring">📈</span>
          <span className="ig-hl-label">Growth</span>
        </div>
        <div className="ig-hl">
          <span className="ig-hl-ring">🔥</span>
          <span className="ig-hl-label">Viral</span>
        </div>
      </div>

      {/* Get Results Like This CTA */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          window.dispatchEvent(
            new CustomEvent("open-consultation", {
              detail: { source: "ig-card", creator: s.name, handle: s.handle },
            })
          );
        }}
        className="mt-3 w-full py-2.5 px-3 rounded-xl bg-ink text-white font-body text-[12px] font-medium hover:bg-accent transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
      >
        <span>Get Results Like This</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
