"use client";

import Section from "@/components/core/Section";

/**
 * SECTION 7 — STRATEGY (100vh, bg #ECE9E2):
 * Left laptop with content calendar screenshot. Right text.
 * Screen has internal scroll animation (translateY, 8s loop).
 */
function StrategyLaptopMockup() {
  const calendarItems = [
    {
      day: "MON 03",
      title: "Tacit Knowledge Mining Session",
      pillar: "IP Extraction",
      tag: "COMPLETED",
      tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      notes: "Extracting contrarian perspectives & lived case studies",
    },
    {
      day: "WED 05",
      title: "Batch Scripting: 15 High-Retention Hooks",
      pillar: "Viral Scripting",
      tag: "APPROVED",
      tagClass: "bg-blue-50 text-accent border-blue-200",
      notes: "3-second pattern interrupt testing across categories",
    },
    {
      day: "FRI 07",
      title: "Studio Guided Shoot Day 1 (15 Reels)",
      pillar: "Production",
      tag: "SCHEDULED",
      tagClass: "bg-purple-50 text-purple-700 border-purple-200",
      notes: "Teleprompter flow, lighting, tone calibration & b-roll",
    },
    {
      day: "TUE 11",
      title: "Dynamic Pacing & Sound Design Assembly",
      pillar: "Post-Production",
      tag: "IN EDITING",
      tagClass: "bg-amber-50 text-amber-700 border-amber-200",
      notes: "Kinetic typography, micro-sound cues, 98% retention pacing",
    },
    {
      day: "THU 13",
      title: "Carousel Funnel: Enterprise Pipeline Case",
      pillar: "LinkedIn Authority",
      tag: "READY TO POST",
      tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      notes: "Converting profile visits into high-ticket DMs",
    },
    {
      day: "SAT 15",
      title: "Algorithmic Retention Review & Scaling",
      pillar: "Growth Review",
      tag: "ANALYTICS",
      tagClass: "bg-slate-100 text-slate-700 border-slate-200",
      notes: "Doubling down on breakout creative angles",
    },
  ];

  return (
    <div className="laptop-enter-l w-full max-w-[540px] mx-auto select-none">
      {/* MacBook Screen Shell */}
      <div className="device-mockup rounded-[20px] sm:rounded-[24px] bg-[#1A1F26] p-2.5 sm:p-3 pb-4 border border-[#2B3340] shadow-[0_30px_80px_rgba(15,26,46,0.14)]">
        {/* Top Display Notch */}
        <div className="flex items-center justify-center mb-1.5">
          <div className="w-12 h-2.5 bg-black rounded-b-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A3150]" />
          </div>
        </div>

        {/* Laptop Display with Viewport Mask */}
        <div className="rounded-[12px] sm:rounded-[14px] overflow-hidden bg-bg border border-line h-[300px] sm:h-[340px] relative flex flex-col">
          {/* Calendar Software Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-white/90 backdrop-blur text-[10.5px] font-mono text-ink-soft z-20 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">ORGIX CALENDAR // 30-DAY ENGINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-semibold">LIVE SYNC</span>
            </div>
          </div>

          {/* Internal Scroll Animated Container (translateY, 8s loop) */}
          <div className="calendar-auto-scroll p-3 sm:p-4 space-y-2.5 flex-1">
            {calendarItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[12px] bg-white border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-ink-soft bg-bg px-2 py-1 rounded border border-line shrink-0">
                    {item.day}
                  </span>
                  <div>
                    <div className="font-display font-medium text-[13.5px] text-ink leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-ink-soft mt-0.5">
                      {item.notes}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-full border self-start sm:self-center shrink-0 ${item.tagClass}`}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Gradient Fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-t from-bg to-transparent z-10"
            aria-hidden="true"
          />
        </div>

        {/* MacBook Base Hinge */}
        <div className="w-20 h-1 bg-[#4A5568] mx-auto rounded-b-sm mt-1" />
      </div>
    </div>
  );
}

export default function StrategySection() {
  return (
    <Section
      id="service-strategy"
      bgAlt={true}
      headline="Stories engineered to convert."
      paragraph="Extract your tacit knowledge into a distinctive brand narrative, proprietary frameworks, and uncopyable IP."
      visual={<StrategyLaptopMockup />}
      visualPosition="left"
      kicker="06 / Strategy & Frameworks"
    />
  );
}
