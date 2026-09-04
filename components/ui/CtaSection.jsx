"use client";

import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";

export default function CtaSection({
  index = "12",
  kicker = "STRATEGIC INITIATION",
  title = (
    <>
      Your name could be <span className="grad-hot">next on this wall.</span>
    </>
  ),
  lead = "Every creator and founder on this page started exactly where you are right now — one decision away.",
  primary = { label: "Book your free strategy call", href: "/contact" },
  secondary = { label: "See our work first", href: "/work" },
}) {
  const displayKicker = index ? `${index} — ${kicker}` : kicker;

  return (
    <section className="section cta grain">
      <div className="container">
        <Reveal className="panel">
          <span className="eyebrow center" style={{ marginInline: "auto" }}>
            {displayKicker}
          </span>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          <div className="cta-actions">
            <Link href={primary.href} className="btn btn--lime btn--lg shine">
              {primary.label} <Icon name="arrow" size={18} className="arr" />
            </Link>
            <Link href={secondary.href} className="btn btn--ghost btn--lg">
              {secondary.label}
            </Link>
          </div>
          <p className="mini">Free strategy call · 100% organic · Zero obligation</p>
        </Reveal>
      </div>
    </section>
  );
}
