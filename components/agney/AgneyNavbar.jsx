"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export default function AgneyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { label: "Features", href: "#features", id: "features" },
    { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
    { label: "Arsenal", href: "#products", id: "products" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" },
    { label: "Pricing", href: "#pricing", id: "pricing" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detector
      const sections = ["hero", "features", "how-it-works", "products", "testimonials", "pricing", "faq"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0D0D]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/60 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "hero")}
          className="group flex items-center gap-2.5 text-white font-agneyDisplay font-bold text-2xl tracking-wider focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#E8380D] shadow-lg shadow-[#FF4500]/30 group-hover:scale-105 group-hover:shadow-[#FF4500]/50 transition-all duration-300">
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F9F9F9] to-white/80 group-hover:to-[#FFB400] transition-colors duration-300">
            AGNEY
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#181818]/70 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollTo(e, link.id)}
                className={`relative px-4 py-1.5 text-sm font-agneyBody font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white bg-[#FF4500]/20 shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#FF4500] rounded-full shadow-agney-glow" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            onClick={(e) => scrollTo(e, "pricing")}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-agneyBody text-sm font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#E8380D] shadow-lg shadow-[#FF4500]/30 hover:shadow-[#FF4500]/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/15"
          >
            <span>Ignite Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFB400] opacity-0 group-hover:opacity-40 blur transition-opacity duration-300 -z-10" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-[#181818] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 transition-all animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollTo(e, link.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-agneyBody font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/30"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <Flame className="w-4 h-4 text-[#FF4500]" />}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href="#pricing"
              onClick={(e) => scrollTo(e, "pricing")}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-agneyBody font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#E8380D] shadow-lg shadow-[#FF4500]/40"
            >
              <span>Ignite Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
