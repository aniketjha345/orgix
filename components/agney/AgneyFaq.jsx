"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function AgneyFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What makes Agney fundamentally different from legacy cloud platforms?",
      a: "Agney was built from scratch to eliminate idle execution layers and virtual virtualization bloat. By utilizing hardware-level enclave acceleration and zero-trust neural telemetry, Agney processes data up to 10x faster with guaranteed sub-8ms latency guarantees.",
    },
    {
      q: "How difficult is it to migrate our existing workflows to Agney?",
      a: "Most engineering teams achieve complete integration in under 30 minutes. We provide turnkey SDKs for Python, Node.js, Go, and Rust, alongside universal API connectors compatible with major cloud providers and Docker containers.",
    },
    {
      q: "What security and compliance certifications does Agney hold?",
      a: "Agney is compliant with SOC 2 Type II, HIPAA, and GDPR standards. All data in transit and at rest is protected via AES-256 hardware cryptographic isolation with zero-knowledge keys owned exclusively by your organization.",
    },
    {
      q: "What happens if our user requests or data spikes unpredictably?",
      a: "Our autonomous scale fabric instantly provisions elastic buffer nodes in milliseconds to absorb traffic surges without packet drops or throttles. You only pay for the exact compute consumed without punitive surge premiums.",
    },
    {
      q: "Can I change or cancel my plan at any point?",
      a: "Yes. You can upgrade, downgrade, or cancel your subscription anytime directly from your telemetry console. Prorated credits are automatically adjusted without penalties.",
    },
    {
      q: "Do you offer on-premise or private cloud deployments?",
      a: "Yes! Our Enterprise tier provides dedicated VPC peering, private cloud air-gapped clusters, and custom on-premise hardware appliances supported by our Principal Infrastructure Architects.",
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-28 bg-[#141414] text-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <HelpCircle className="w-4 h-4 text-[#FF4500]" />
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              FREQUENTLY ASKED
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              Know About Agney
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Clear answers to common questions about deployment, speed, security, and scaling.
          </p>
        </div>

        {/* Accordion List (Max-width 768px / max-w-3xl) */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-[#181818] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#FF4500]/50 shadow-lg shadow-[#FF4500]/10 bg-[#1c1c1c]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-agneyDisplay font-bold text-base sm:text-lg text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#FF4500] text-white"
                        : "bg-white/5 text-neutral-400"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-neutral-300 text-sm sm:text-base font-agneyBody leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
