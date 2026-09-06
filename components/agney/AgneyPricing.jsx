"use client";

import { useState } from "react";
import { Check, Flame, Zap, Shield, ArrowRight } from "lucide-react";

export default function AgneyPricing() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      badge: "PROTOTYPE",
      description: "For startups, builders, and fast-moving teams testing new models.",
      monthlyPrice: 39,
      annualPrice: 31,
      popular: false,
      features: [
        "10M API requests / month",
        "Sub-15ms guaranteed response time",
        "Standard multi-region nodes",
        "5 Team collaborators",
        "Community & standard email support",
        "Automatic security patches",
      ],
      cta: "Start Free 14-Day Trial",
    },
    {
      name: "Pro",
      badge: "MOST POPULAR",
      description: "For scaling platforms and high-throughput production applications.",
      monthlyPrice: 99,
      annualPrice: 79,
      popular: true,
      features: [
        "100M API requests / month",
        "Sub-8ms latency with fast-track routing",
        "Dedicated isolated compute cores",
        "Unlimited team collaborators",
        "24/7 priority slack & phone support",
        "Neural telemetry & predictive auto-tune",
        "99.99% high-availability SLA",
      ],
      cta: "Ignite Pro Engine",
    },
    {
      name: "Enterprise",
      badge: "UNLIMITED",
      description: "Custom architecture designed for global conglomerates and high-security operations.",
      monthlyPrice: 299,
      annualPrice: 239,
      popular: false,
      features: [
        "Custom / Unlimited throughput volume",
        "Sub-5ms ultra-low latency tier",
        "Private VPC & custom hardware deployment",
        "Dedicated Principal Solutions Architect",
        "SOC2, HIPAA & ISO 27001 compliance audit",
        "99.999% uptime financial credit guarantee",
        "Custom invoicing & vendor agreements",
      ],
      cta: "Schedule Architecture Call",
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-28 bg-[#0D0D0D] text-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <Flame className="w-4 h-4 text-[#FF4500]" />
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              TRANSPARENT VALUE
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Invest in Pure{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              Acceleration
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Predictable pricing with zero hidden fees. Scale up or down anytime with prorated billing.
          </p>

          {/* Monthly / Annual Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-[#181818] border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-agneyBody font-semibold transition-all ${
                !annual
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-agneyBody font-semibold transition-all ${
                annual
                  ? "bg-gradient-to-r from-[#FF4500] to-[#E8380D] text-white shadow-md shadow-[#FF4500]/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FFB400] text-black rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={idx}
                className={`relative rounded-[20px] bg-[#161616] p-8 border transition-all duration-300 flex flex-col justify-between ${
                  tier.popular
                    ? "border-[#FF4500] shadow-2xl shadow-[#FF4500]/30 ring-2 ring-[#FF4500]/60 lg:-translate-y-2 bg-gradient-to-b from-[#1c1412] to-[#161616]"
                    : "border-white/10 hover:border-white/25 shadow-lg"
                }`}
              >
                {/* Most Popular Flame Banner */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFB400] text-black font-agneyBody font-extrabold text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div>
                  {/* Tier Name & Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-agneyDisplay font-bold text-2xl text-white">
                      {tier.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                      {tier.badge}
                    </span>
                  </div>

                  <p className="font-agneyBody text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-white/10">
                    <span className="font-agneyDisplay font-extrabold text-5xl text-white">
                      ${price}
                    </span>
                    <span className="font-agneyBody text-neutral-400 text-sm">
                      / month {annual && "(billed annually)"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-agneyBody text-neutral-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            tier.popular
                              ? "bg-[#FF4500] text-white"
                              : "bg-white/10 text-neutral-300"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tier CTA */}
                <button
                  className={`w-full py-4 rounded-xl font-agneyBody font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#FF4500] to-[#E8380D] text-white shadow-lg shadow-[#FF4500]/50 hover:shadow-[#FF4500]/80 hover:scale-[1.02]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
