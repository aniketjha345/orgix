"use client";

import { Sliders, Flame, Rocket, Trophy, ArrowRight } from "lucide-react";

export default function AgneyHowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Sliders,
      title: "Connect & Calibrate",
      description: "Drop in the Agney lightweight agent or universal SDK into your existing stack in under five minutes with zero refactoring required.",
    },
    {
      num: "02",
      icon: Flame,
      title: "Ignite the Core",
      description: "Activate autonomous load orchestration. Agney analyzes peak traffic patterns and sets up instant failover matrices.",
    },
    {
      num: "03",
      icon: Rocket,
      title: "Accelerate Throughput",
      description: "Watch your system throughput surge 10x while operational latency plummets below 10 milliseconds effortlessly.",
    },
    {
      num: "04",
      icon: Trophy,
      title: "Dominate & Expand",
      description: "Harness continuous predictive telemetry, optimize server expenditures, and outpace competing platforms with zero downtime.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-28 bg-[#141414] text-white relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FF4500]/10 blur-[140px] -z-0" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              THE IGNITION PROCESS
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            From Zero to Full Throttle in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              4 Disciplined Steps
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            A frictionless deployment roadmap engineered to transition your operations from sluggish legacy pipelines into a relentless high-velocity engine.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connecting Gradient Line on Desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 -translate-y-12 bg-gradient-to-r from-[#FF4500] via-[#FFB400] to-[#E8380D] opacity-40 z-0"
            aria-hidden="true"
          />

          {/* 4 Steps Grid: Horizontal on Desktop, Vertical Stack on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-[20px] bg-[#181818] p-7 border border-white/10 hover:border-[#FF4500]/60 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-agney-card-hover flex flex-col justify-between overflow-hidden"
                >
                  {/* Huge Watermark Number in Background */}
                  <span
                    className="absolute -top-4 -right-2 font-agneyDisplay font-extrabold text-7xl sm:text-8xl text-white/[0.04] group-hover:text-[#FF4500]/10 transition-colors pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>

                  <div>
                    {/* Step Icon Badge */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#E8380D] text-white flex items-center justify-center mb-6 shadow-md shadow-[#FF4500]/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-xs font-mono font-bold text-[#FFB400] mb-2 uppercase tracking-wider">
                      Stage {step.num}
                    </div>

                    <h3 className="font-agneyDisplay font-bold text-xl text-white mb-3 group-hover:text-[#FFB400] transition-colors">
                      {step.title}
                    </h3>

                    <p className="font-agneyBody text-neutral-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-agneyBody font-semibold text-neutral-400 group-hover:text-white transition-colors">
                    <span>Explore Stage {step.num}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
