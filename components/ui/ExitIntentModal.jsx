"use client";

import { useState, useEffect } from "react";
import Icon from "../core/Icon";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    if (sessionStorage.getItem("orgix_exit_dismissed") === "1") {
      return;
    }

    const handleMouseLeave = (e) => {
      if (e.clientY <= 8) {
        setIsOpen(true);
        sessionStorage.setItem("orgix_exit_dismissed", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Also trigger on 45s timer if still on page
    const timer = setTimeout(() => {
      if (sessionStorage.getItem("orgix_exit_dismissed") !== "1") {
        setIsOpen(true);
        sessionStorage.setItem("orgix_exit_dismissed", "1");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleCta = () => {
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("open-consultation", { detail: { source: "exit-intent" } })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,26,46,0.6)] backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-[24px] bg-white border border-line shadow-[0_30px_90px_rgba(15,26,46,0.2)] p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg)] border border-line flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg-alt)] text-sm cursor-pointer transition-colors"
          aria-label="Close popup"
        >
          ✕
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(46,91,255,0.08)] border border-[rgba(46,91,255,0.2)] text-accent font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Limited Cohort Spots
        </span>

        <h3 className="font-display font-medium text-[24px] sm:text-[28px] text-[var(--ink)] tracking-tight mb-2">
          Still thinking about it?
        </h3>

        <p className="text-[14.5px] text-[var(--ink-soft)] leading-relaxed font-normal mb-6">
          We only take 3–4 new personal brand clients each month to preserve output quality. Let&apos;s see if we&apos;re a fit — zero pitch, 100% organic strategy.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleCta}
            className="w-full py-3.5 rounded-full bg-[var(--ink)] text-white font-medium text-[14.5px] hover:bg-[#1A2440] transition-colors cursor-pointer"
          >
            Claim Free Strategy Audit →
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 text-[var(--ink-soft)] hover:text-[var(--ink)] text-[12.5px] font-mono cursor-pointer"
          >
            I&apos;ll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}
