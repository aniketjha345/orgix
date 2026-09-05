"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { company, imgSrc } from "@/data/site";

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

  return (
    <footer className="pt-20 pb-12 bg-background border-t border-border/80 text-ink-secondary">
      <div className="container">
        {/* Antigravity Minimal 4 Plain Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-border/60">
          {/* Col 1: Brand & Tagline (5 cols) */}
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

            <h3 className="text-[17px] font-display font-medium text-ink-primary mb-2">
              {company.name}
            </h3>

            <p className="text-body-sm text-ink-secondary max-w-sm leading-relaxed font-light mb-6">
              {company.tagline} We turn expertise into personal brands that get noticed, trusted and remembered — 100% organic growth.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Icon name="ig" size={14} />
              </a>
              <a
                href={company.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Icon name="youtube" size={14} />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Icon name="mail" size={14} />
              </a>
            </div>

            {/* Live Studio Clock */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-ink-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>
                DELHI HQ · <span ref={elRef} className="text-ink-primary font-medium">12:00:00</span> IST
              </span>
            </div>
          </div>

          {/* Col 2: Pages (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-primary mb-4">
              Pages
            </h4>
            <div className="flex flex-col space-y-2 text-[13.5px] font-body">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/work" className="hover:text-accent transition-colors">
                Work
              </Link>
              <Link href="/services" className="hover:text-accent transition-colors">
                Services
              </Link>
              <Link href="/about" className="hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/careers" className="hover:text-accent transition-colors">
                Careers
              </Link>
              <Link href="/#faq" className="hover:text-accent transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-primary mb-4">
              Services
            </h4>
            <div className="flex flex-col space-y-2 text-[13.5px] font-body">
              <Link href="/services" className="hover:text-accent transition-colors">
                Instagram Growth
              </Link>
              <Link href="/services" className="hover:text-accent transition-colors">
                YouTube Authority
              </Link>
              <Link href="/#engine" className="hover:text-accent transition-colors">
                Growth Engine
              </Link>
              <Link href="/#video-proof" className="hover:text-accent transition-colors">
                Video Testimonials
              </Link>
            </div>
          </div>

          {/* Col 4: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-primary mb-4">
              Contact
            </h4>
            <div className="flex flex-col space-y-2.5 text-[13px] font-body">
              <a
                href={`mailto:${company.email}`}
                className="hover:text-accent transition-colors truncate"
              >
                {company.email}
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                @orgixmedia
              </a>
              <div className="text-ink-muted text-[12px] pt-2 border-t border-border/40">
                {company.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Plain Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-mono text-ink-muted">
          <span>&copy; 2026 {company.name}. 1B+ Organic Views Generated.</span>
          <div className="flex items-center gap-4">
            <span>Sector 3, Rohini, Delhi</span>
            <button
              type="button"
              className="px-2 py-0.5 rounded bg-surface border border-border text-ink-secondary text-[11px] hover:border-white/20 transition-colors"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              aria-label="Open Command Palette"
            >
              ⌘K
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
