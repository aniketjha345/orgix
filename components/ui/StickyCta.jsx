"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../core/Icon";

/**
 * StickyCta - mobile-only bottom action bar.
 *
 * The mobile homepage runs ~18k px tall, which buries the primary conversion
 * (book a strategy call). This bar fades in once the visitor scrolls past the
 * hero fold and pins a one-tap CTA + WhatsApp shortcut at thumb height.
 *
 * Desktop is untouched (.sticky-cta is display:none above 720px).
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta ${visible ? "is-visible" : ""}`}
      role="complementary"
      aria-label="Quick actions"
    >
      <div className="sticky-cta-inner">
        <Link
          href="https://wa.me/?text=Hi%20Orgix%20Media%20%E2%80%94%20I%27m%20interested%20in%20a%20free%20strategy%20call%20for%20my%20personal%20brand."
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-cta-icon"
          aria-label="Chat with Orgix on WhatsApp"
          title="WhatsApp"
        >
          <Icon name="whatsapp" size={21} />
        </Link>

        <Link href="/contact" className="btn btn--lime btn--sm sticky-cta-btn shine">
          Book Free Strategy Call <Icon name="arrow" size={16} className="arr" />
        </Link>
      </div>
      <div className="sticky-cta-safe" aria-hidden="true" />
    </div>
  );
}