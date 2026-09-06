"use client";

import { Quote, Star, CheckCircle2 } from "lucide-react";

export default function AgneyTestimonials() {
  const reviews = [
    {
      name: "Vikram Malhotra",
      role: "Chief Technology Officer",
      company: "Hyperion Scale",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote:
        "Agney cut our heavy batch processing runtimes from 45 minutes down to 3 minutes. The zero-downtime reliability during Black Friday handled over 40M concurrent calls without a single flinch.",
      stats: "93% Latency Drop",
    },
    {
      name: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "Veloce AI Systems",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      quote:
        "The sheer raw velocity of Agney feels like upgrading from a propeller airplane straight to a supersonic jet. Our development velocity doubled within the very first month of deployment.",
      stats: "2.4x Feature Velocity",
    },
    {
      name: "Devon Chen",
      role: "Head of Infrastructure",
      company: "Ignis Fintech Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote:
        "In fintech, every millisecond carries millions of dollars in risk. Agney’s hardware-level security vaults and autonomous scaling gave our board the exact institutional confidence we required.",
      stats: "99.999% Verified SLA",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-[#141414] text-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#FF4500]/30 mb-4">
            <Quote className="w-4 h-4 text-[#FF4500]" />
            <span className="font-agneyBody text-xs font-bold uppercase tracking-wider text-[#FFB400]">
              FIELD TESTED
            </span>
          </div>

          <h2 className="font-agneyDisplay font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            What Leaders Say About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFB400]">
              Agney Power
            </span>
          </h2>

          <p className="font-agneyBody text-neutral-400 text-base sm:text-lg mt-4 leading-relaxed">
            Real metrics from engineering leaders and high-concurrency operators who transformed their infrastructure with Agney.
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-[20px] bg-[#181818] p-8 border border-white/10 hover:border-[#FF4500]/50 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-agney-card-hover"
            >
              <div>
                {/* Top Row: 5 Gold Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#FFB400]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#FF4500]/50" />
                </div>

                {/* Quote Text */}
                <p className="font-agneyBody text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Proof Badge */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#FF4500]/40 shrink-0">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-agneyDisplay font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB400]" />
                    </h4>
                    <p className="font-agneyBody text-xs text-neutral-400">
                      {rev.role} • <span className="text-neutral-300">{rev.company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#FF4500]/15 text-[#FFB400] border border-[#FF4500]/25">
                    {rev.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
