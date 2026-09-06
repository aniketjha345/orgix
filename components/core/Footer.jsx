"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { company, imgSrc } from "@/data/site";

const DIM = "rgba(255,255,255,0.65)";
const FAINT = "rgba(255,255,255,0.12)";

/**
 * Footer — dark navy closer continuing the final CTA.
 * Light grey small type, 4 plain columns, live Delhi clock.
 */
export default function Footer() {
  const elRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      let s;
      try {
        s = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } catch {
        s = new Date().toTimeString().slice(0, 8);
      }
      if (elRef.current) elRef.current.textContent = s;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const colHead = "font-body text-[11px] uppercase tracking-[0.14em] text-white mb-4 font-semibold";
  const colLink = "hover:text-white transition-colors";
  const colLinks = "flex flex-col space-y-2 text-[13.5px] font-body";

  return (
    <footer style={{ backgroundColor: "#0F1A2E", color: DIM }}>
      <div className="w-full max-w-[1200px] mx-auto px-[6vw] pt-20 pb-10">
        {/* 4 plain columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16"
          style={{ borderBottom: `1px solid ${FAINT}` }}
        >
          {/* Col 1: Brand (5 cols) */}
          <div className="lg:col-span-5">
            <Link className="inline-block mb-4" href="/" aria-label={`${company.name} — home`}>
              <img
                src={imgSrc("/images/logo/orgix-logo.png")}
                alt="Orgix Media"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-contain"
              />
            </Link>

            <h3 className="font-display font-medium text-[17px] text-white mb-2">
              {company.name}
            </h3>

            <p className="font-body text-[14.5px] max-w-sm leading-relaxed mb-6" style={{ color: DIM }}>
              {company.tagline} We turn expertise into personal brands that get noticed, trusted and remembered — 100% organic growth.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-colors hover:text-white"
                style={{ border: `1px solid ${FAINT}`, color: DIM }}
                aria-label="Instagram"
              >
                <Icon name="ig" size={14} />
              </a>
              <a
                href={company.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-colors hover:text-white"
                style={{ border: `1px solid ${FAINT}`, color: DIM }}
                aria-label="YouTube"
              >
                <Icon name="youtube" size={14} />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-colors hover:text-white"
                style={{ border: `1px solid ${FAINT}`, color: DIM }}
                aria-label="Email"
              >
                <Icon name="mail" size={14} />
              </a>
            </div>

            {/* Live studio clock */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent text-[11px] font-body"
              style={{ border: `1px solid ${FAINT}`, color: DIM }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>
                DELHI HQ · <span ref={elRef} className="text-white font-medium">12:00:00</span> IST
              </span>
            </div>
          </div>

          {/* Col 2: Pages */}
          <div className="lg:col-span-2">
            <h4 className={colHead}>Pages</h4>
            <div className={colLinks} style={{ color: DIM }}>
              <Link href="/" className={colLink}>Home</Link>
              <Link href="/work" className={colLink}>Work</Link>
              <Link href="/services" className={colLink}>Services</Link>
              <Link href="/about" className={colLink}>About</Link>
              <Link href="/careers" className={colLink}>Careers</Link>
              <Link href="/#process" className={colLink}>Method</Link>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2">
            <h4 className={colHead}>Services</h4>
            <div className={colLinks} style={{ color: DIM }}>
              <Link href="/#services" className={colLink}>Video Editing</Link>
              <Link href="/#service-linkedin" className={colLink}>LinkedIn Authority</Link>
              <Link href="/#service-instagram" className={colLink}>Instagram Growth</Link>
              <Link href="/#results" className={colLink}>Results &amp; Proof</Link>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-3">
            <h4 className={colHead}>Contact</h4>
            <div className="flex flex-col space-y-2.5 text-[13px] font-body" style={{ color: DIM }}>
              <a href={`mailto:${company.email}`} className={`${colLink} truncate`}>
                {company.email}
              </a>
              <a
                href="https://wa.me/918287528395?text=Hi%20Orgix%20Media!%20I%20want%20to%20grow%20my%20social%20media."
                target="_blank"
                rel="noopener noreferrer"
                className={colLink}
              >
                Chat on WhatsApp
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={colLink}
              >
                @orgixmedia
              </a>
              <a
                href="https://maps.google.com/?q=Block%20D%2C%2017%2F67%2C%20Sector%203%2C%20Rohini%2C%20Delhi%2C%20110085"
                target="_blank"
                rel="noopener noreferrer"
                className={colLink}
              >
                View on map ↗
              </a>
              <div className="text-[12px] pt-2" style={{ borderTop: `1px solid ${FAINT}`, color: DIM }}>
                {company.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-body" style={{ color: DIM }}>
          <span>&copy; 2026 {company.name}. 1B+ Organic Views Generated.</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
            }}
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 font-body text-[12px] p-0"
            style={{ color: DIM }}
            aria-label="Back to top"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
