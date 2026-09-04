"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "../core/Icon";
import { company } from "@/data/site";

const items = [
  // Navigation
  { id: "nav-home", group: "Navigation", title: "Home", sub: "Orgix Media landing & overview", href: "/" },
  { id: "nav-work", group: "Navigation", title: "Selected Work", sub: "14+ client case studies & bento showcase", href: "/work" },
  { id: "nav-services", group: "Navigation", title: "Capabilities & Services", sub: "Instagram & YouTube personal brand scaling", href: "/services" },
  { id: "nav-about", group: "Navigation", title: "About Studio", sub: "Philosophy, team, Delhi HQ, 2022–2026 journey", href: "/about" },
  { id: "nav-careers", group: "Navigation", title: "Careers / Work With Us", sub: "Open roles for writers, editors & strategists", href: "/careers" },
  { id: "nav-contact", group: "Navigation", title: "Contact & Consultation", sub: "Studio email & consultation form", href: "/contact" },
  { id: "nav-faq", group: "Navigation", title: "Frequently Asked Questions", sub: "Pricing, timelines, shoot days, retention", href: "/#faq" },

  // Direct Actions
  { id: "act-consult", group: "Quick Actions", title: "Book Free 1:1 Strategy Call", sub: "Audit current presence + growth roadmap", action: "consult" },
  { id: "act-email", group: "Quick Actions", title: "Email Studio Direct", sub: "info@orgixmedia.com", action: "email" },
  { id: "act-copy-addr", group: "Quick Actions", title: "Copy Delhi Studio Address", sub: "Block D, 17/67, Sector 3, Rohini, Delhi, 110085", action: "copy-address" },

  // Case Studies
  { id: "case-pari", group: "Case Studies", title: "Pari Jain — 0 → 129K Organic", sub: "Lifestyle & personal brand from zero", href: "/work" },
  { id: "case-shivam", group: "Case Studies", title: "Shivam Careers — 100K in 80 Posts", sub: "AI-driven high-retention creator scaling", href: "/work" },
  { id: "case-cellbell", group: "Case Studies", title: "Cellbell / Demla Brothers", sub: "Shark Tank featured founders, D2C authority", href: "/work" },
  { id: "case-toolsfact", group: "Case Studies", title: "Tools Fact — ₹35L in Sales", sub: "Organic content turned into revenue", href: "/work" },
  { id: "case-jyoti", group: "Case Studies", title: "CA Jyoti Goyal — Finance Authority", sub: "Turned technical acumen into brand sponsorships", href: "/work" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const paletteRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const onOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [open]);

  // Focus input on open, trap focus, restore focus on close.
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      previouslyFocusedRef.current = document.activeElement;
      document.documentElement.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.documentElement.style.overflow = "";
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    }
  }, [open]);

  // Focus trap: keep Tab cycling within the palette.
  useEffect(() => {
    if (!open || !paletteRef.current) return;
    const handleTab = (e) => {
      const focusable = paletteRef.current.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [open]);

  // Filter items
  const filtered = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.sub.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
    );
  });

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeItem = (item) => {
    if (!item) return;
    setOpen(false);

    if (item.href) {
      router.push(item.href);
    } else if (item.action === "consult") {
      window.dispatchEvent(new CustomEvent("open-consultation"));
    } else if (item.action === "email") {
      window.location.href = `mailto:${company.email}`;
    } else if (item.action === "copy-address") {
      navigator.clipboard?.writeText(company.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onKeyDownInput = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((idx) => (idx + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((idx) => (idx - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeItem(filtered[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmd-backdrop"
      ref={paletteRef}
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="cmd-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-bar">
          <Icon name="search" size={18} className="cmd-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, page or case study… (ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDownInput}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results found for &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === selectedIndex ? "is-selected" : ""}`}
                onClick={() => executeItem(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-main">
                  <span className="cmd-item-group">{item.group}</span>
                  <div className="cmd-item-title">{item.title}</div>
                  <div className="cmd-item-sub">{item.sub}</div>
                </div>
                <div className="cmd-item-action">
                  {item.href ? "Jump" : "Execute"} <Icon name="arrow" size={13} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>
            <kbd className="cmd-mini-kbd">↑</kbd> <kbd className="cmd-mini-kbd">↓</kbd> Navigate
          </span>
          <span>
            <kbd className="cmd-mini-kbd">↵</kbd> Select
          </span>
          <span>
            <kbd className="cmd-mini-kbd">ESC</kbd> Close
          </span>
          {copied && <span className="cmd-copied">Address copied to clipboard!</span>}
        </div>
      </div>
    </div>
  );
}
