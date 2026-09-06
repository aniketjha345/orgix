"use client";

import { Sparkles, Flame, Zap, Check, ArrowRight } from "lucide-react";

export default function AgneyProducts() {
  const products = [
    {
      badge: "STARTER",
      badgeColor: "bg-white/10 text-neutral-200 border-white/20",
      title: "Agney Spark",
      subtitle: "Entry-level high-performance suite for startups & creators",
      price: "$49",
      period: "/ month",
      gradient: "from-orange-500/20 via-transparent to-transparent",
      features: [
        "Up to 10M requests/month",
        "Sub-15ms guaranteed latency",
        "Standard multi-region nodes",
        "Community & email support",
        "Pre-built SDKs for Node & Python",
      ],
    },
    {
      badge: "MOST POPULAR",
      badgeColor: "bg-gradient-to-r from-[#FF4500] to-[#FFB400] text-black font-bold border-transparent",
      title: "Agney Flare",
      subtitle: "Comprehensive powerhouse suite for scaling enterprises",
      price: "$149",
      period: "/ month",
      gradient: "from-[#FF4500]/30 via-[#FFB400]/10 to-transparent",
      popular: true,
      features: [
        "Up to 100M requests/month",
        "Sub-8ms latency with priority routing",
        "Dedicated VPC peering & isolated cores",
        "24/7 dedicated engineering support",
        "Real-time neural telemetry & auto-tuning",
        "99.99% high-availability SLA",
      ],
    },
    {
      badge: "ULTIMATE POWER",
      badgeColor: "bg-[#FF4500]/20 text-[#FFB400] border-[#FF4500]/40",
      title: "Agney Inferno",
      subtitle: "Bespoke high-throughput infrastructure with dedicated architect",
      price: "$399",
      period: "/ month",
      gradient: "from-red-600/25 via-[#FF4500]/15 to-transparent",
      features: [
        "Unlimited custom throughput",
        "Sub-5ms ultra-low latency tier",
        "Dedicated Principal Solutions Architect",
        "Custom compliance (HIPAA, SOC2, GDPR)",
        "On-premise / Hybrid cloud deployment",
        "99.999% uptime financial SLA",
      ],
    },
  ];

  return (
    <section id="products" className="py-24 sm:py-28 bg-[#0D0D0D] text-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#FFB400]" />
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              CORE ARSENAL
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Solutions Tailored to Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              Operational Momentum
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Select the exact caliber of raw computing power your workloads require. Seamlessly scale tiers as your concurrency multiplies.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {products.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-[20px] bg-[#161616] p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] ${
                item.popular
                  ? "border-[#FF4500] shadow-xl shadow-[#FF4500]/25 ring-1 ring-[#FF4500]/50"
                  : "border-white/10 hover:border-white/30 shadow-lg"
              }`}
            >
              {/* 16:9 Aspect Ratio Visual Header */}
              <div className="relative w-full aspect-video rounded-xl bg-gradient-to-br from-[#202020] to-[#121212] border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`} />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md">
                    {idx === 0 && <Zap className="w-6 h-6 text-[#FFB400]" />}
                    {idx === 1 && <Flame className="w-6 h-6 text-[#FF4500] animate-pulse" />}
                    {idx === 2 && <Sparkles className="w-6 h-6 text-red-500" />}
                  </div>
                  <span className="font-agneyDisplay text-xs font-bold tracking-widest uppercase text-white/80">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div>
                {/* Badge Tag */}
                <div className="inline-block mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-agneyBody font-bold tracking-wider border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-agneyDisplay font-bold text-2xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-agneyBody text-neutral-400 text-sm mb-6 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm font-agneyBody text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-[#FF4500]/20 text-[#FF4500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA Divider */}
              <div className="pt-6 border-t border-white/10 mt-auto">
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="font-agneyDisplay font-extrabold text-4xl text-white">
                    {item.price}
                  </span>
                  <span className="font-agneyBody text-neutral-400 text-sm">{item.period}</span>
                </div>

                <a
                  href="#pricing"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-agneyBody font-bold text-sm transition-all duration-300 ${
                    item.popular
                      ? "bg-gradient-to-r from-[#FF4500] to-[#E8380D] text-white shadow-lg shadow-[#FF4500]/40 hover:shadow-[#FF4500]/70 hover:scale-[1.02]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <span>Deploy {item.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 font-agneyBody text-sm font-semibold text-[#FFB400] hover:text-white transition-colors"
          >
            <span>Compare full architecture &amp; SLA benchmarks</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
