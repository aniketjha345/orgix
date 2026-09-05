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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#0e1026] border border-accent/40 shadow-elevated p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink-primary text-sm cursor-pointer"
          aria-label="Close popup"
        >
          ✕
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[11px] font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Limited Spots
        </span>

        <h3 className="text-[1.65rem] font-display font-medium text-ink-primary mb-2">
          Still thinking about it?
        </h3>

        <p className="text-body-sm text-ink-secondary leading-relaxed font-light mb-6">
          Only a few onboarding slots open this month. Let&apos;s see if we&apos;re a fit — zero pressure, zero pitch.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleCta}
            className="w-full py-3.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14px] hover:bg-[#d2f758] transition-colors shadow-[0_0_20px_rgba(196,240,66,0.3)] cursor-pointer"
          >
            Talk to us →
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 text-ink-muted hover:text-ink-secondary text-[12px] font-mono cursor-pointer"
          >
            I&apos;ll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}
