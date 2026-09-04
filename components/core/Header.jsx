"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { nav, company, imgSrc } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const saved = window.localStorage.getItem("orgix-theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("orgix-theme", next);
  };

  // Mobile drawer focus trap + focus restoration.
  useEffect(() => {
    if (!open) {
      document.documentElement.style.overflow = "";
      return;
    }
    previouslyFocusedRef.current = document.activeElement;
    document.documentElement.style.overflow = "hidden";
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleTab = (e) => {
      if (e.key !== "Tab" || !drawer) return;
      const items = drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => {
      window.removeEventListener("keydown", handleTab);
      document.documentElement.style.overflow = "";
      if (previouslyFocusedRef.current) previouslyFocusedRef.current.focus();
    };
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div
          className="container header-inner"
          style={
            scrolled
              ? {
                  background: theme === "light" ? "rgba(255, 255, 255, 0.94)" : "rgba(12, 10, 18, 0.94)",
                  borderColor: theme === "light" ? "rgba(33, 34, 38, 0.12)" : "rgba(255, 255, 255, 0.12)",
                  boxShadow: theme === "light" ? "0 12px 32px rgba(18, 19, 23, 0.08)" : "0 16px 40px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
                }
              : undefined
          }
        >
          <Link
            className="brand"
            href="/"
            aria-label={`${company.name} — home`}
            onClick={(event) => {
              // A link to the current route does not trigger navigation. Make
              // the brand mark useful from every scroll position on home.
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              src={imgSrc("/images/logo/orgix-logo.png")}
              alt="Orgix Media"
              width={44}
              height={44}
              className="brand-logo-img"
            />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <Link href="/work" className={isActive("/work") ? "active" : ""} aria-current={isActive("/work") ? "page" : undefined}>
              Work
            </Link>
            <Link href="/services" className={isActive("/services") ? "active" : ""} aria-current={isActive("/services") ? "page" : undefined}>
              Services
            </Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""} aria-current={isActive("/about") ? "page" : undefined}>
              About
            </Link>
            <Link href="/careers" className={isActive("/careers") ? "active" : ""} aria-current={isActive("/careers") ? "page" : undefined}>
              Careers
            </Link>
            <Link href="/#faq">FAQ</Link>
          </nav>

          <div className="nav-cta">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button
              className="header-cmd-btn"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <Icon name="search" size={14} />
              <span className="header-cmd-kbd">⌘K</span>
            </button>

            <Link href="/contact" className="btn btn--lime btn--sm">
              Start Growing
              <Icon name="arrow" size={16} className="arr" />
            </Link>
            <button
              className="nav-burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${open ? "open" : ""}`} ref={drawerRef}>
        {[{ label: "Home", href: "/" }, ...nav].map((l, i) => (
          <Link key={l.href} href={l.href}>
            {l.label}
            <span>0{i + 1}</span>
          </Link>
        ))}
        <div style={{ marginTop: 32 }}>
          <Link href="/contact" className="btn btn--lime btn--lg btn--block">
            Start Growing <Icon name="arrow" size={18} className="arr" />
          </Link>
        </div>
      </div>
    </>
  );
}
