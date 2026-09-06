"use client";

import { Flame, ArrowRight, Play, Zap, Shield, Cpu, ChevronDown } from "lucide-react";
import AgneyFlameCanvas from "./AgneyFlameCanvas";

export default function AgneyHero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-[#0D0D0D] text-white overflow-hidden pt-28 pb-12"
    >
      {/* Background Animated Canvas */}
      <AgneyFlameCanvas />

      {/* Radial Gradient Glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FF4500]/25 via-[#E8380D]/10 to-transparent blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-[-10%] w-[450px] h-[450px] rounded-full bg-[#FFB400]/15 blur-[100px] -z-10"
        aria-hidden="true"
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] -z-10"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines and Dual CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/40 shadow-sm shadow-[#FF4500]/20 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4500]"></span>
              </span>
              <span className="font-agneyBody text-xs font-semibold uppercase tracking-wider text-[#FFB400]">
                UNSTOPPABLE RAW VELOCITY
              </span>
            </div>

            {/* Fluid TypeScale Main Headline (Space Grotesk 700-800) */}
            <h1 className="font-agneyDisplay font-extrabold tracking-tight text-white leading-[1.05] text-[clamp(2.5rem,5.5vw,4.5rem)] mb-6">
              Ignite Your Potential.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] via-[#FFB400] to-[#E8380D] block mt-1">
                Fuel Your Ambition.
              </span>
            </h1>

            {/* Subheadline (Inter 400-500) */}
            <p className="font-agneyBody text-neutral-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              Born from the Sanskrit essence of pure fire and unyielding energy, Agney empowers modern enterprises to break latency limits, automate hyperscale workloads, and command undeniable market authority.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <button
                onClick={() => scrollTo("pricing")}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-agneyBody text-base font-bold text-white bg-gradient-to-r from-[#FF4500] to-[#E8380D] shadow-xl shadow-[#FF4500]/40 hover:shadow-[#FF4500]/70 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/20"
              >
                <span>Ignite Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                <div className="absolute -inset-1 rounded-full bg-[#FF4500] opacity-30 blur-md group-hover:opacity-75 transition-opacity duration-300 -z-10 animate-pulse" />
              </button>

              <button
                onClick={() => scrollTo("features")}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-agneyBody text-base font-semibold text-neutral-200 bg-[#181818]/80 hover:bg-[#202020] border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-200">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-xs font-agneyBody text-neutral-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFB400]" />
                <span>Zero Latency Overhead</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FF4500]" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FFB400]" />
                <span>Universal SDKs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Visual Element (3D Energy Core + Badges) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Visual Glassmorphic Core Container */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-br from-[#181818]/90 via-[#141414]/90 to-[#0D0D0D]/90 p-8 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#FF4500]/50 transition-all duration-500">
              {/* Internal Flame Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4500]/15 via-transparent to-[#FFB400]/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Row: System Status */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF4500] animate-ping" />
                  <span className="font-agneyDisplay text-xs font-bold uppercase tracking-wider text-neutral-300">
                    AGNEY ENGINE CORE v4.2
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#FF4500]/20 text-[#FFB400] border border-[#FF4500]/30">
                  ONLINE
                </span>
              </div>

              {/* Center Dynamic Visual: Rotating Flame Core */}
              <div className="relative my-auto flex items-center justify-center py-6">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#FF4500] via-[#E8380D] to-[#FFB400] p-[2px] animate-spin [animation-duration:12s] shadow-agney-glow">
                  <div className="w-full h-full rounded-full bg-[#0D0D0D] flex items-center justify-center p-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF4500]/30 to-[#FFB400]/20 flex items-center justify-center backdrop-blur-sm">
                      <Flame className="w-12 h-12 text-[#FF4500] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Concentric Pulse Rings */}
                <div className="absolute w-48 h-48 rounded-full border border-[#FF4500]/20 animate-ping [animation-duration:3s] pointer-events-none" />
                <div className="absolute w-60 h-60 rounded-full border border-[#FFB400]/15 pointer-events-none" />
              </div>

              {/* Bottom Real-time Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-3 z-10 pt-4 border-t border-white/10">
                <div className="bg-[#181818]/80 rounded-xl p-3 border border-white/5">
                  <div className="text-[11px] font-agneyBody text-neutral-400">Peak Velocity</div>
                  <div className="text-lg font-agneyDisplay font-bold text-white mt-0.5">99.98%</div>
                </div>
                <div className="bg-[#181818]/80 rounded-xl p-3 border border-white/5">
                  <div className="text-[11px] font-agneyBody text-neutral-400">Acceleration</div>
                  <div className="text-lg font-agneyDisplay font-bold text-[#FFB400] mt-0.5">10x Speed</div>
                </div>
              </div>

              {/* Floating Live Metric Badges */}
              <div className="absolute -top-3 -left-4 bg-[#181818]/95 border border-[#FF4500]/40 px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20 animate-bounce [animation-duration:4s]">
                <div className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping" />
                <span className="text-xs font-agneyBody font-semibold text-white">
                  ⚡ 8ms Sub-cycle Response
                </span>
              </div>

              <div className="absolute -bottom-3 -right-4 bg-[#181818]/95 border border-[#FFB400]/40 px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20 animate-bounce [animation-duration:4.5s] [animation-delay:1s]">
                <Flame className="w-3.5 h-3.5 text-[#FFB400]" />
                <span className="text-xs font-agneyBody font-semibold text-white">
                  🔥 10M+ Operations / sec
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Explore Indicator */}
      <div className="max-w-[1280px] w-full mx-auto px-4 flex justify-center items-center z-10">
        <button
          onClick={() => scrollTo("features")}
          className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Scroll to features"
        >
          <span className="font-agneyBody text-xs tracking-widest uppercase text-neutral-500 group-hover:text-[#FFB400] transition-colors">
            Scroll To Explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-neutral-600 group-hover:border-[#FF4500] flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-[#FF4500] animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
}
