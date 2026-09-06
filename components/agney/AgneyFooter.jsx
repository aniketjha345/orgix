"use client";

import { Flame, ArrowRight, Send } from "lucide-react";

export default function AgneyFooter() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand Info (Lg col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#hero"
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 font-agneyDisplay font-extrabold text-2xl tracking-wider text-white mb-4"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#E8380D] flex items-center justify-center shadow-lg shadow-[#FF4500]/30">
                <Flame className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFB400]">
                AGNEY
              </span>
            </a>

            <p className="font-agneyBody text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
              Rooted in the Sanskrit essence of pure fire and energy. Agney builds high-velocity infrastructure and autonomous systems that empower ambitious innovators to break operational boundaries.
            </p>

            {/* Social Icons Row with Glow */}
            <div className="flex items-center gap-3 text-neutral-400">
              {[
                {
                  label: "X (Twitter)",
                  href: "https://x.com",
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  href: "https://github.com",
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  svg: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#FF4500] hover:border-[#FF4500]/50 hover:shadow-agney-glow-sm transition-all duration-300"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products & Solutions (Lg col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-agneyDisplay font-bold text-sm tracking-wider uppercase text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm font-agneyBody text-neutral-400">
              <li>
                <a href="#products" onClick={() => scrollTo("products")} className="hover:text-[#FF4500] transition-colors">
                  Agney Spark
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => scrollTo("products")} className="hover:text-[#FF4500] transition-colors">
                  Agney Flare
                </a>
              </li>
              <li>
                <a href="#products" onClick={() => scrollTo("products")} className="hover:text-[#FF4500] transition-colors">
                  Agney Inferno
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => scrollTo("features")} className="hover:text-[#FF4500] transition-colors">
                  Neural Telemetry
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => scrollTo("features")} className="hover:text-[#FF4500] transition-colors">
                  Hardware Enclaves
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Company (Lg col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-agneyDisplay font-bold text-sm tracking-wider uppercase text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm font-agneyBody text-neutral-400">
              <li>
                <a href="#how-it-works" onClick={() => scrollTo("how-it-works")} className="hover:text-[#FF4500] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => scrollTo("features")} className="hover:text-[#FF4500] transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={() => scrollTo("testimonials")} className="hover:text-[#FF4500] transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => scrollTo("pricing")} className="hover:text-[#FF4500] transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#faq" onClick={() => scrollTo("faq")} className="hover:text-[#FF4500] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (Lg col-span-4) */}
          <div className="lg:col-span-4">
            <h4 className="font-agneyDisplay font-bold text-sm tracking-wider uppercase text-white mb-4">
              Stay Fueled
            </h4>
            <p className="font-agneyBody text-neutral-400 text-sm mb-4 leading-relaxed">
              Subscribe to get product releases, engineering deep-dives, and performance benchmarks straight to your inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-neutral-500 text-sm font-agneyBody focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF4500] to-[#E8380D] text-white font-agneyBody font-bold text-sm shadow-md shadow-[#FF4500]/30 hover:shadow-[#FF4500]/60 transition-all duration-200 shrink-0 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <span className="block text-[11px] font-agneyBody text-neutral-500 mt-2">
              Zero spam. Unsubscribe at any time.
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-agneyBody text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Agney Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-neutral-300 transition-colors">Security Enclaves</a>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Firing at Peak Output (99.998%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
