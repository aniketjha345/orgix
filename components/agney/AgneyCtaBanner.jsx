"use client";

import { Flame, ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";

export default function AgneyCtaBanner() {
  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 sm:py-24 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Full-width Flame Gradient Container */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#FF4500] via-[#E8380D] to-[#990000] p-10 sm:p-16 lg:p-20 text-center shadow-2xl overflow-hidden border border-white/20">
          {/* Internal Ember & Vignette Highlights */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,0,0.35),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-black/20" />

          {/* Floating Subtle Flame Icon */}
          <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white mb-8 shadow-xl">
            <Flame className="w-8 h-8 animate-pulse text-[#FFB400]" />
          </div>

          {/* Centered Headline */}
          <h2 className="relative z-10 font-agneyDisplay font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Ignite Your Next Era of High Velocity?
          </h2>

          {/* Motivating Subtext */}
          <p className="relative z-10 font-agneyBody text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Join over 10,000 engineering teams, founders, and enterprises accelerating their systems with Agney today.
          </p>

          {/* Big Glowing CTA Button */}
          <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToPricing}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-agneyBody text-lg font-extrabold text-[#0D0D0D] bg-white hover:bg-[#F9F9F9] shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <span>Ignite Your Engine Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute -inset-1 rounded-full bg-white opacity-40 blur-md group-hover:opacity-75 transition-opacity -z-10 animate-pulse" />
            </button>
          </div>

          {/* Reassurance Guarantees */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-agneyBody text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFB400]" />
              <span>5-Minute Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFB400]" />
              <span>14-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FFB400]" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
