"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { company, nav, imgSrc } from "@/data/site";

export default function Footer() {
  const timeRef = useRef("");
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
      timeRef.current = s;
      if (elRef.current) elRef.current.textContent = s;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link className="brand" href="/" aria-label={`${company.name} — home`}>
              <img
                src={imgSrc("/images/logo/orgix-logo.png")}
                alt="Orgix Media"
                width={52}
                height={52}
                className="brand-logo-img brand-logo-img--footer"
              />
            </Link>
            <p className="about-p">
              India's personal branding studio. We turn expertise into personal brands the internet
              can't ignore — 100% organic growth, zero ad spend.
            </p>
            <div className="socials">
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="ig" size={19} />
              </a>
              <a href={company.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icon name="youtube" size={19} />
              </a>
              <a href={`mailto:${company.email}`} aria-label="Email">
                <Icon name="mail" size={19} />
              </a>
            </div>

            <div className="footer-clock">
              <span className="pulse-dot" />
              <span>DELHI HQ · <span ref={elRef}>12:00:00</span> IST</span>
            </div>
          </div>

          <div>
            <h4>Navigation</h4>
            <div className="f-links">
              <Link href="/">Home</Link>
              <Link href="/work">Selected Work</Link>
              <Link href="/services">Services &amp; Packages</Link>
              <Link href="/about">About Studio</Link>
              <Link href="/careers">Careers (We&apos;re Hiring)</Link>
              <Link href="/contact">Book Strategy Call</Link>
            </div>
          </div>

          <div>
            <h4>Capabilities &amp; Proof</h4>
            <div className="f-links">
              <Link href="/services">Instagram Management</Link>
              <Link href="/services">YouTube Growth</Link>
              <Link href="/work">Case Studies Vault</Link>
              <Link href="/#video-testimonials">Client Video Proof</Link>
              <Link href="/#faq">FAQ &amp; Pricing</Link>
            </div>
          </div>

          <div>
            <h4>HQ &amp; Contact</h4>
            <div className="f-contact">
              <a href={`mailto:${company.email}`}>
                <Icon name="mail" size={17} />
                {company.email}
              </a>
              <a href={company.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="ig" size={17} />
                @orgixmedia
              </a>
              <a href={company.youtube} target="_blank" rel="noopener noreferrer">
                <Icon name="youtube" size={17} />
                Orgix Media YouTube
              </a>
              <span style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--ink-3)", fontSize: 13.5, lineHeight: 1.5 }}>
                <Icon name="pin" size={17} style={{ flex: "none", marginTop: 3, color: "var(--lime)" }} />
                <span>{company.address}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span className="footer-bar-right">
            <span>Built in Delhi · 1B+ Organic Views Generated</span>
            <button
              className="cmd-trigger-btn"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              aria-label="Open Command Palette"
            >
              <span>⌘K</span>
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
