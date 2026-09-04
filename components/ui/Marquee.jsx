import { imgSrc } from "@/data/site";
import Icon from "../core/Icon";

export default function Marquee({ items, reverse = false, fast = false, variant = "photo" }) {
  const renderCard = (c, i) => {
    if (variant === "chip") {
      return (
        <span className="trust-chip" key={`${c.name}-${i}`}>
          <img src={imgSrc(c.img)} alt="" loading="lazy" width={34} height={34} />
          <span className="t">
            <b>{c.name}</b>
            <span>
              {c.role} · {c.followers}
            </span>
          </span>
        </span>
      );
    }

    return (
      <div className="cr-photo-card" key={`${c.name}-${i}`}>
        <img
          src={imgSrc(c.img)}
          alt={c.name}
          loading="lazy"
          width={260}
          height={200}
          className="cr-photo-img"
        />
        <div className="cr-photo-gradient" />
        <div className="cr-photo-content">
          <div className="cr-photo-badge">
            <span className="cr-photo-dot" />
            <span className="cr-photo-role">{c.role}</span>
          </div>
          <div className="cr-photo-bottom">
            <h4 className="cr-photo-name">{c.name}</h4>
            <span className="cr-photo-stat">
              <Icon name="trend" size={12} />
              {c.followers}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`marquee-band ${variant === "photo" ? "marquee-band--photo" : ""} ${
        reverse ? "marquee--reverse" : ""
      } ${fast ? "marquee--fast" : ""}`}
      aria-hidden={false}
    >
      <div className="marquee-track">
        {items.map(renderCard)}
        <span aria-hidden="true" style={{ display: "inline-flex", gap: variant === "photo" ? 14 : 18 }}>
          {items.map(renderCard)}
        </span>
      </div>
    </div>
  );
}

