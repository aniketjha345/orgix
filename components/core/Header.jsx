"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-3 sm:pt-4 px-4 transition-all duration-300">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Centered Floating Capsule Bar (Light, No Dark Colors) */}
        <div
          className={`pointer-events-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between w-full border ${
            scrolled
              ? "bg-[#F6F4EF]/95 backdrop-blur-xl border-line shadow-[0_12px_36px_-8px_rgba(15,26,46,0.10)]"
              : "bg-[#F6F4EF]/85 backdrop-blur-xl border-line shadow-[0_4px_24px_rgba(15,26,46,0.05)]"
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-ink select-none group shrink-0"
            aria-label={`${company.name} Home`}
          >
            <img
              src={imgSrc("/images/logo/orgix-logo.png")}
              alt="Orgix Media"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain"
            />
            <span className="font-display font-medium text-[15px] sm:text-[16px] tracking-tight text-ink flex items-center gap-1.5">
              <span>ORGIX</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-body text-ink-soft">
            {/* 1. Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`py-1.5 flex items-center gap-1 hover:text-ink transition-colors cursor-pointer font-medium ${
                  openDropdown === "services" ? "text-ink" : ""
                }`}
                onClick={() => setOpenDropdown((prev) => (prev === "services" ? null : "services"))}
                aria-expanded={openDropdown === "services"}
              >
                <span>Services</span>
                <span className="text-[9px] text-ink-soft transition-transform duration-200">
                  {openDropdown === "services" ? "▲" : "▼"}
                </span>
              </button>

              {openDropdown === "services" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[440px] z-50">
                  <div className="p-3.5 rounded-2xl bg-white border border-line shadow-[0_20px_50px_rgba(15,26,46,0.14)] backdrop-blur-2xl grid gap-1.5 text-left">
                    <Link
                      href="/#services"
                      onClick={() => setOpenDropdown(null)}
                      className="p-3 rounded-xl hover:bg-bg-alt transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[13px] font-semibold">
                        01
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink group-hover:text-accent transition-colors">
                          High-Retention Video Editing
                        </div>
                        <p className="text-[12px] text-ink-soft leading-relaxed">
                          Pacing, dynamic kinetic captions, audio design &amp; B-roll.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/#services"
                      onClick={() => setOpenDropdown(null)}
                      className="p-3 rounded-xl hover:bg-bg-alt transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[13px] font-semibold">
                        02
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink group-hover:text-accent transition-colors">
                          LinkedIn Founder Authority
                        </div>
                        <p className="text-[12px] text-ink-soft leading-relaxed">
                          Contrarian hooks, authority carousels &amp; B2B deal pipelines.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/#services"
                      onClick={() => setOpenDropdown(null)}
                      className="p-3 rounded-xl hover:bg-bg-alt transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[13px] font-semibold">
                        03
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink group-hover:text-accent transition-colors">
                          Instagram Growth Engine
                        </div>
                        <p className="text-[12px] text-ink-soft leading-relaxed">
                          100% organic algorithmic reach &amp; automated inbound conversion.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/#services"
                      onClick={() => setOpenDropdown(null)}
                      className="p-3 rounded-xl hover:bg-bg-alt transition-colors flex items-start gap-3 group border-t border-line"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[13px] font-semibold">
                        04
                      </div>
                      <div>
                        <div className="text-[13.5px] font-medium text-ink group-hover:text-accent transition-colors">
                          Content Strategy &amp; Guided Shoot
                        </div>
                        <p className="text-[12px] text-ink-soft leading-relaxed">
                          2 recording days = 30 days of compounding authority content.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Work Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("work")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`py-1.5 flex items-center gap-1 hover:text-ink transition-colors cursor-pointer font-medium ${
                  openDropdown === "work" ? "text-ink" : ""
                }`}
                onClick={() => setOpenDropdown((prev) => (prev === "work" ? null : "work"))}
                aria-expanded={openDropdown === "work"}
              >
                <span>Work</span>
                <span className="text-[9px] text-ink-soft transition-transform duration-200">
                  {openDropdown === "work" ? "▲" : "▼"}
                </span>
              </button>

              {openDropdown === "work" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[380px] z-50">
                  <div className="p-3.5 rounded-2xl bg-white border border-line shadow-[0_20px_50px_rgba(15,26,46,0.14)] backdrop-blur-2xl grid gap-1 text-left">
                    <Link
                      href="/#results"
                      onClick={() => setOpenDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-bg-alt transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[13px] font-medium text-ink group-hover:text-accent transition-colors">
                          Pari Jain · 129K+
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-soft">Founder Authority</span>
                    </Link>

                    <Link
                      href="/#results"
                      onClick={() => setOpenDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-bg-alt transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[13px] font-medium text-ink group-hover:text-accent transition-colors">
                          Tools Fact · ₹35L Sales
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-soft">Software Inbound</span>
                    </Link>

                    <Link
                      href="/#results"
                      onClick={() => setOpenDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-bg-alt transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[13px] font-medium text-ink group-hover:text-accent transition-colors">
                          Demla Brothers · Shark Tank
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-ink-soft">Cellbell 2.4M Reach</span>
                    </Link>

                    <Link
                      href="/work"
                      onClick={() => setOpenDropdown(null)}
                      className="mt-2 pt-2.5 border-t border-line text-[12px] font-mono text-accent hover:underline flex items-center justify-between px-2"
                    >
                      <span>Explore all 85+ creator case studies</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Flat Links */}
            <Link href="/#results" className="hover:text-ink transition-colors font-medium">
              Results
            </Link>
            <Link href="/#testimonials" className="hover:text-ink transition-colors font-medium">
              Testimonials
            </Link>
            <Link href="/#process" className="hover:text-ink transition-colors font-medium">
              Process
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Right Actions: Pill CTA (Book a call) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Primary Pill Button — Official Antigravity Ink (#0F1A2E) */}
            <button
              type="button"
              onClick={handleOpenConsultation}
              className="px-4 sm:px-5 py-2 rounded-full bg-ink text-white font-body font-medium text-[13px] sm:text-[13.5px] hover:bg-[#1A2440] transition-all duration-200 shadow-sm flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Book a call</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>

            {/* Mobile Burger Toggle (Light) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 rounded-full bg-bg-alt border border-line flex items-center justify-center text-ink"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Clean Pure White / Light, No Dark Color) */}
        {mobileOpen && (
          <div className="md:hidden mt-2 p-5 rounded-2xl bg-white border border-line shadow-[0_20px_60px_rgba(15,26,46,0.14)] backdrop-blur-2xl flex flex-col space-y-3 w-full text-left pointer-events-auto">
            <Link
              href="/#services"
              onClick={() => setMobileOpen(false)}
              className="text-[14.5px] font-medium text-ink hover:text-accent py-2 px-2.5 rounded-xl hover:bg-bg-alt flex items-center justify-between"
            >
              <span>Services</span>
              <span className="text-[11px] font-mono text-ink-soft">01</span>
            </Link>
            <Link
              href="/#results"
              onClick={() => setMobileOpen(false)}
              className="text-[14.5px] font-medium text-ink hover:text-accent py-2 px-2.5 rounded-xl hover:bg-bg-alt flex items-center justify-between"
            >
              <span>Results &amp; Proof</span>
              <span className="text-[11px] font-mono text-ink-soft">02</span>
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setMobileOpen(false)}
              className="text-[14.5px] font-medium text-ink hover:text-accent py-2 px-2.5 rounded-xl hover:bg-bg-alt flex items-center justify-between"
            >
              <span>Testimonials</span>
              <span className="text-[11px] font-mono text-ink-soft">03</span>
            </Link>
            <Link
              href="/#process"
              onClick={() => setMobileOpen(false)}
              className="text-[14.5px] font-medium text-ink hover:text-accent py-2 px-2.5 rounded-xl hover:bg-bg-alt flex items-center justify-between"
            >
              <span>Method &amp; Process</span>
              <span className="text-[11px] font-mono text-ink-soft">04</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-[14.5px] font-medium text-ink hover:text-accent py-2 px-2.5 rounded-xl hover:bg-bg-alt flex items-center justify-between"
            >
              <span>About Us</span>
              <span className="text-[11px] font-mono text-ink-soft">05</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleOpenConsultation();
              }}
              className="w-full py-3 rounded-full bg-ink text-white font-body font-medium text-[14px] hover:bg-[#1A2440] transition-colors mt-2"
            >
              Book a Strategy Call →
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
