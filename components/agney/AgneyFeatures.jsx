"use client";

import { Zap, ShieldCheck, Cpu, Activity, Layers, Flame, ArrowUpRight } from "lucide-react";

export default function AgneyFeatures() {
  const features = [
    {
      icon: Zap,
      title: "Hyper-Velocity Engine",
      description: "Sub-millisecond pipeline execution with zero idle compute cycles. Built to deliver blazing responsiveness under demanding real-time traffic.",
      stat: "< 8ms",
      statLabel: "Average latency",
    },
    {
      icon: ShieldCheck,
      title: "Flame-Grade Security",
      description: "Zero-trust enclave architecture with end-to-end hardware encryption. Your mission-critical data remains inviolable against adversarial attacks.",
      stat: "AES-256",
      statLabel: "Hardware enclave",
    },
    {
      icon: Cpu,
      title: "Autonomous Scale",
      description: "Self-healing distributed fabric that dynamically provisions compute during peak surges and collapses safely without service degradation.",
      stat: "10x",
      statLabel: "Elastic capacity",
    },
    {
      icon: Activity,
      title: "Intelligent Telemetry",
      description: "Deep neural observability scanning 24/7 for micro-bottlenecks, predictive failure forecasting, and automated root-cause isolation.",
      stat: "99.98%",
      statLabel: "Predictive precision",
    },
    {
      icon: Layers,
      title: "Frictionless Integration",
      description: "Universal plug-and-play connectors with native multi-language SDKs for Python, Node.js, Go, Rust, and modern cloud orchestrators.",
      stat: "5 Mins",
      statLabel: "Instant deployment",
    },
    {
      icon: Flame,
      title: "Continuous Energy",
      description: "Guaranteed 99.999% high-availability SLA backed by active-active multi-region failover nodes and continuous energy resilience.",
      stat: "99.999%",
      statLabel: "Uptime guarantee",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-28 bg-[#0D0D0D] text-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <Flame className="w-4 h-4 text-[#FF4500]" />
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              WHY AGNEY STANDS APART
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Engineered for Raw Power &amp;{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              Surgical Precision
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Eliminate operational lag. Every core component in Agney is handcrafted to deliver maximal throughput, resilient stability, and explosive momentum.
          </p>
        </div>

        {/* 3-Column Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-[20px] bg-[#161616] p-8 border border-white/10 hover:border-[#FF4500]/60 hover:border-t-2 hover:border-t-[#FF4500] transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-agney-card-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4500]/5 rounded-full blur-2xl group-hover:bg-[#FF4500]/15 transition-all duration-300 -z-0" />

                <div className="relative z-10">
                  {/* 48x48 Icon with Flame Gradient Background */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4500]/25 to-[#FFB400]/10 border border-[#FF4500]/30 text-[#FF4500] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-agneyDisplay font-bold text-xl text-white group-hover:text-[#FFB400] transition-colors duration-200 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-agneyBody text-neutral-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-agneyDisplay font-bold text-lg text-white group-hover:text-[#FF4500] transition-colors">
                      {item.stat}
                    </span>
                    <span className="block text-[11px] font-agneyBody text-neutral-500 uppercase tracking-wider">
                      {item.statLabel}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#FF4500]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
