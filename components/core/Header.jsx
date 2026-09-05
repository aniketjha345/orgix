"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { company, imgSrc } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'work' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleOpenConsultation = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "header" } })
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <div className="container pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
            scrolled
              ? "bg-[#0a0a1f]/92 backdrop-blur-xl border-white/12 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8)]"
              : "bg-[#0a0a1f]/70 backdrop-blur-lg border-white/8"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-ink-primary select-none group shrink-0"
            aria-label={`${company.name} Home`}
          >
            <img
              src={imgSrc("/images/logo/orgix-logo.png")}
              alt="Orgix Media"
              width={34}
              height={34}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg object-contain"
            />
            <span className="font-display font-medium text-[15px] sm:text-[16px] tracking-tight">
              ORGIX
            </span>
          </Link>

          {/* Desktop Navigation Links (Antigravity pattern: thin, mostly text, 2 mega dropdowns) */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-body text-ink-secondary">
            {/* 1. Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`py-1.5 flex items-center gap-1 hover:text-ink-primary transition-colors cursor-pointer ${
                  openDropdown === "services" ? "text-ink-primary" : ""
                }`}
                onClick={() => setOpenDropdown((prev) => (prev === "services" ? null : "services"))}
                aria-expanded={openDropdown === "services"}
              >
                <span>Services</span>
                <span className="text-[10px] text-ink-muted transition-transform duration-200">
                  {openDropdown === "services" ? "▲" : "▼"}
                </span>
              </button>

              {openDropdown === "services" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[460px] z-50">
                  <div className="p-4 rounded-2xl bg-[#0e1026] border border-white/12 shadow-elevated backdrop-blur-2xl grid gap-2">
                    <Link
                      href="/services"
                      className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 text-[14px]">
                        ★
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                          <span>Instagram Management</span>
                          <span className="text-[10px] font-mono text-accent">01</span>
                        </div>
                        <p className="text-[12px] text-ink-muted leading-relaxed font-light">
                          Profile optimization, hook-based reels, viral scripting &amp; analytics.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/services"
                      className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 text-ink-primary flex items-center justify-center shrink-0 text-[14px]">
                        ▶
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                          <span>YouTube Management</span>
                          <span className="text-[10px] font-mono text-ink-muted">02</span>
                        </div>
                        <p className="text-[12px] text-ink-muted leading-relaxed font-light">
                          Viral hook writing, long-form scriptwriting &amp; retention pacing.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/#engine"
                      className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group border-t border-border/40"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[13px]">
                        ⚙
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-ink-primary group-hover:text-accent transition-colors">
                          The 6-Step Growth Engine
                        </div>
                        <p className="text-[11.5px] text-ink-muted leading-relaxed font-light">
                          Research, scripting, guided shooting, high-retention editing &amp; DM growth.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Work Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("work")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`py-1.5 flex items-center gap-1 hover:text-ink-primary transition-colors cursor-pointer ${
                  openDropdown === "work" ? "text-ink-primary" : ""
                }`}
                onClick={() => setOpenDropdown((prev) => (prev === "work" ? null : "work"))}
                aria-expanded={openDropdown === "work"}
              >
                <span>Work</span>
                <span className="text-[10px] text-ink-muted transition-transform duration-200">
                  {openDropdown === "work" ? "▲" : "▼"}
                </span>
              </button>

              {openDropdown === "work" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[420px] z-50">
                  <div className="p-4 rounded-2xl bg-[#0e1026] border border-white/12 shadow-elevated backdrop-blur-2xl grid gap-2">
                    <Link
                      href="/work"
                      className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[13px] font-medium text-ink-primary group-hover:text-accent transition-colors">
                          Pari Jain · 129K+
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-muted">Founder Authority</span>
                    </Link>

                    <Link
                      href="/work"
                      className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        <span className="text-[13px] font-medium text-ink-primary group-hover:text-accent transition-colors">
                          Tools Fact · ₹35L Sales
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-muted">Software Funnel</span>
                    </Link>

                    <Link
                      href="/work"
                      className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-violet-400" />
                        <span className="text-[13px] font-medium text-ink-primary group-hover:text-accent transition-colors">
                          Demla Brothers · Shark Tank
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-muted">Cellbell Founders</span>
                    </Link>

                    <Link
                      href="/work"
                      className="mt-2 pt-2.5 border-t border-border/40 text-[12px] font-mono text-accent hover:text-[#d2f758] flex items-center justify-between px-2"
                    >
                      <span>Explore all 85+ creators archive</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Flat Links */}
            <Link href="/about" className="hover:text-ink-primary transition-colors">
              About
            </Link>
            <Link href="/careers" className="hover:text-ink-primary transition-colors">
              Careers
            </Link>
            <Link href="/#faq" className="hover:text-ink-primary transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Right Actions: Command Palette Button + "Start Growing" Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface border border-white/10 text-[11px] font-mono text-ink-muted hover:text-ink-primary hover:border-white/20 transition-colors"
              title="Open Command Palette (⌘K)"
              aria-label="Open command palette"
            >
              <Icon name="search" size={12} />
              <span>⌘K</span>
            </button>

            <button
              type="button"
              onClick={handleOpenConsultation}
              className="px-4 sm:px-5 py-2 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[13px] sm:text-[13.5px] hover:bg-[#d2f758] transition-all duration-200 shadow-[0_0_20px_-6px_rgba(196,240,66,0.35)] flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Start Growing</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>

            {/* Mobile Burger Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center text-ink-primary"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-2 p-5 rounded-2xl bg-[#0c0e24] border border-white/12 shadow-elevated backdrop-blur-2xl flex flex-col space-y-4">
            <Link
              href="/work"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-primary hover:text-accent flex items-center justify-between"
            >
              <span>Work</span>
              <span className="text-[12px] font-mono text-ink-muted">01</span>
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-primary hover:text-accent flex items-center justify-between"
            >
              <span>Services</span>
              <span className="text-[12px] font-mono text-ink-muted">02</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-primary hover:text-accent flex items-center justify-between"
            >
              <span>About</span>
              <span className="text-[12px] font-mono text-ink-muted">03</span>
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-primary hover:text-accent flex items-center justify-between"
            >
              <span>Careers</span>
              <span className="text-[12px] font-mono text-ink-muted">04</span>
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-ink-primary hover:text-accent flex items-center justify-between"
            >
              <span>FAQ</span>
              <span className="text-[12px] font-mono text-ink-muted">05</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleOpenConsultation();
              }}
              className="w-full py-3 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14px] mt-2"
            >
              Start Growing →
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
