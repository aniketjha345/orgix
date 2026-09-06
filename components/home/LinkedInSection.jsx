"use client";

import Section from "@/components/core/Section";

/**
 * SECTION 5 — LINKEDIN (100vh, bg #ECE9E2):
 * FLIPPED: Left laptop mockup, Right text.
 * MacBook with LinkedIn post screenshot.
 * Enters from left, perspective tilt rotateY(-6deg→0).
 * Hover: screen zooms 1→1.03.
 * Reflection below laptop: flipped, 15% opacity, blur(4px).
 */
function MacBookLinkedInMockup() {
  const postContent = (
    <div className="bg-white rounded-[16px] border border-line p-4 sm:p-5 shadow-sm text-left">
      {/* LinkedIn Post Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="color-wipe is-revealed rounded-full shrink-0">
          <img
            src="/assets/founders/pari-jain.jpg"
            alt="Pari Jain"
            className="w-11 h-11 rounded-full object-cover border border-line"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-medium text-ink truncate">Pari Jain</span>
            <span className="text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
              AUTHORITY
            </span>
          </div>
          <div className="text-[11.5px] text-ink-soft truncate">
            Founder &amp; CEO · 129,400+ followers · 1d · Edited
          </div>
        </div>
      </div>

      {/* Post Copy */}
      <p className="font-body text-[12.5px] sm:text-[13px] text-ink leading-relaxed mb-3">
        Most founders treat content as vanity. We treated content as enterprise distribution.
        In 120 days: 0 ad spend, 1B+ verified reach, and high-ticket pipeline filling on autopilot.
      </p>

      {/* Carousel Visual Snippet */}
      <div className="rounded-[12px] overflow-hidden border border-line bg-bg p-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft">
            Verified Pipeline Impact
          </div>
          <div className="font-display text-[18px] sm:text-[20px] font-medium text-ink mt-0.5">
            ₹35,00,000+ Inbound Value
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-ink text-white text-[10px] font-mono">
          CAROUSEL · 8 SLIDES
        </div>
      </div>

      {/* LinkedIn Engagement Bar */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-line/60 text-[10.5px] font-mono text-ink-soft">
        <span>👍 ❤️ 💡 3,420 reactions</span>
        <span>412 comments · 1,280 reposts</span>
      </div>
    </div>
  );

  return (
    <div className="laptop-enter-l w-full max-w-[540px] mx-auto select-none">
      {/* MacBook Screen Shell */}
      <div className="device-mockup rounded-[20px] sm:rounded-[24px] bg-[#1E232B] p-2.5 sm:p-3 pb-4 border border-[#303846] shadow-[0_30px_80px_rgba(15,26,46,0.14)]">
        {/* Top Display Notch */}
        <div className="flex items-center justify-center mb-1.5">
          <div className="w-12 h-2.5 bg-black rounded-b-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A3150]" />
          </div>
        </div>

        {/* Laptop Display (with zoom on hover) */}
        <div className="laptop-screen-zoom rounded-[12px] sm:rounded-[14px] overflow-hidden bg-bg border border-line p-3 sm:p-4">
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-line text-[10px] font-mono text-ink-soft">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="px-3 py-0.5 rounded-full bg-white border border-line text-[9.5px] text-ink-soft">
              linkedin.com/in/founder/authority
            </div>
            <div className="w-8 text-right font-semibold text-accent">INBOUND</div>
          </div>

          {/* LinkedIn Post Content */}
          {postContent}
        </div>

        {/* MacBook Base Hinge */}
        <div className="w-20 h-1 bg-[#4A5568] mx-auto rounded-b-sm mt-1" />
      </div>

      {/* Reflection below laptop: flipped, 15% opacity, blur(4px) */}
      <div className="laptop-reflection hidden sm:block overflow-hidden" aria-hidden="true">
        <div className="device-mockup rounded-[20px] sm:rounded-[24px] bg-[#1E232B] p-2.5 sm:p-3 border border-[#303846]">
          <div className="rounded-[12px] bg-bg p-3 opacity-80">
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInSection() {
  return (
    <Section
      id="service-linkedin"
      bgAlt={true}
      headline="Authority, post by post."
      paragraph="Turn executive thinking into high-reach editorial carousels, founder breakdowns, and qualified inbound enterprise leads."
      visual={<MacBookLinkedInMockup />}
      visualPosition="left"
      kicker="04 / Executive LinkedIn"
    />
  );
}
