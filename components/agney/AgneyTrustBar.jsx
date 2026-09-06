"use client";

export default function AgneyTrustBar() {
  const partners = [
    { name: "HYPERION", category: "Cloud Matrix" },
    { name: "VELOCE AI", category: "Neural Infra" },
    { name: "IGNIS LABS", category: "Security" },
    { name: "SOLARIA", category: "Scalability" },
    { name: "NOVA CORE", category: "Data Engine" },
    { name: "AETHER DYNAMICS", category: "High Throughput" },
    { name: "TITAN METRICS", category: "Enterprise" },
    { name: "PULSE ENGINE", category: "Real-time" },
  ];

  return (
    <section className="bg-[#0D0D0D] border-y border-white/10 py-10 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="font-agneyBody text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase">
          Trusted by 10,000+ ambitious teams and innovators worldwide
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 items-center gap-12 sm:gap-16 animate-marquee py-2">
          {partners.concat(partners).map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 cursor-default group"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF4500]/60 group-hover:bg-[#FF4500] group-hover:scale-125 transition-all duration-300" />
              <span className="font-agneyDisplay font-bold text-lg sm:text-xl tracking-wider text-neutral-300 group-hover:text-[#FFB400] transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase px-2 py-0.5 rounded bg-white/5">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
