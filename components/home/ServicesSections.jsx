"use client";

import Image from "next/image";
import Section from "@/components/core/Section";

/**
 * 01. Phone Mockup for Video Editing (Reels/Short-Form)
 * Device mockup: 24px radius, 1px --line border, soft shadow 0 30px 80px rgba(15,26,46,.10)
 */
function VideoEditingMockup() {
  return (
    <div className="device-mockup tilt-r glare w-full max-w-[340px] mx-auto p-3.5 bg-white select-none">
      {/* Phone Screen Shell */}
      <div className="rounded-[20px] overflow-hidden border border-line bg-ink relative aspect-[9/15] flex flex-col justify-between float-slow">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-full bg-black/40 backdrop-blur-md z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/20 ml-auto mr-2" />
        </div>

        {/* Video Reel Frame */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/stories/pari-jain.jpg"
            alt="Video Editing Reel Mockup"
            className="w-full h-full object-cover filter contrast-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-black/30" />
        </div>

        {/* Top Telemetry Overlay */}
        <div className="relative z-10 flex items-center justify-between p-4 pt-8 text-[11px] font-mono text-white/90">
          <span className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            REEL // 4K 60FPS
          </span>
          <span className="flex items-center gap-1.5 bg-accent/90 text-white font-semibold px-2 py-0.5 rounded-full text-[10px]">
            98.2% RETENTION
          </span>
        </div>

        {/* Kinetic Captions & Metrics */}
        <div className="relative z-10 p-4 text-white">
          <div className="bg-black/50 backdrop-blur-md p-3.5 rounded-[14px] border border-white/15 mb-3">
            <div className="text-[10.5px] font-mono uppercase tracking-wider text-white/70 mb-1">
              Kinetic Pacing · Audio Synced
            </div>
            <p className="font-display font-medium text-[16px] sm:text-[17px] leading-snug text-white">
              &ldquo;If your first 3 seconds don&rsquo;t grip, your entire funnel disappears.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono bg-white/10 backdrop-blur-md p-2 rounded-[12px] border border-white/10">
            <div>
              <div className="font-semibold text-white">1.4M</div>
              <div className="text-[9px] text-white/70">Views</div>
            </div>
            <div>
              <div className="font-semibold text-white">98.4%</div>
              <div className="text-[9px] text-white/70">Completed</div>
            </div>
            <div>
              <div className="font-semibold text-white">18.2K</div>
              <div className="text-[9px] text-white/70">Saves</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 02. Laptop Mockup for LinkedIn Management
 * Device mockup: 24px radius, 1px --line border, soft shadow 0 30px 80px rgba(15,26,46,.10)
 */
function LinkedInMockup() {
  return (
    <div className="device-mockup tilt-l glare reflect-below w-full max-w-[560px] mx-auto p-4 sm:p-5 bg-white select-none">
      {/* Laptop Browser Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-[11px] font-mono text-ink-soft">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-ink/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink/15" />
        </div>
        <div className="px-3 py-1 rounded-full bg-bg border border-line text-[10px] text-ink-soft">
          linkedin.com/in/founder/authority
        </div>
        <div className="w-10 text-right">INBOUND</div>
      </div>

      {/* LinkedIn Post Card */}
      <div className="screen-zoom rounded-[16px] border border-line bg-bg p-4 sm:p-5">
        {/* Author Header */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/assets/founders/pari-jain.jpg"
            alt="Pari Jain LinkedIn Authority"
            className="w-11 h-11 rounded-full object-cover border border-line shrink-0"
            loading="lazy"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-medium text-ink">Pari Jain</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-accent/15 text-accent border border-accent/25">
                AUTHORITY
              </span>
            </div>
            <div className="text-[11.5px] text-ink-soft">
              Founder &amp; CEO · 129,400+ followers · 1d · Edited
            </div>
          </div>
        </div>

        {/* Post Copy */}
        <p className="font-body text-[13px] sm:text-[13.5px] text-ink leading-relaxed mb-3">
          Most founders treat content as vanity. We treated content as enterprise distribution.
          In 120 days: 0 ad spend, 1B+ verified reach, and high-ticket pipeline filling on autopilot.
        </p>

        {/* Carousel Visual Snippet */}
        <div className="rounded-[12px] overflow-hidden border border-line bg-white p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">
              Verified Pipeline Impact
            </div>
            <div className="font-display text-[22px] font-medium text-ink mt-0.5">
              ₹35,00,000+ Inbound Value
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-ink text-white text-[11px] font-mono">
            CAROUSEL · 8 SLIDES
          </div>
        </div>

        {/* LinkedIn Engagement Bar */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-line/60 text-[11px] font-mono text-ink-soft">
          <span>👍 ❤️ 💡 3,420 reactions</span>
          <span>412 comments · 1,280 reposts</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 03. Phone Mockup for Instagram Growth
 * Device mockup: 24px radius, 1px --line border, soft shadow 0 30px 80px rgba(15,26,46,.10)
 */
function InstagramGrowthMockup() {
  return (
    <div className="device-mockup tilt-r glare w-full max-w-[340px] mx-auto p-3.5 bg-white select-none">
      {/* Phone Screen Shell */}
      <div className="rounded-[20px] overflow-hidden border border-line bg-bg p-3.5 relative aspect-[9/15] flex flex-col justify-between float-slow">
        {/* Top Notch */}
        <div className="w-16 h-3 rounded-full bg-ink/10 mx-auto mb-2" />

        {/* Profile Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/assets/creators/demla-brothers.jpg"
              alt="Demla Brothers Profile"
              className="w-12 h-12 rounded-full object-cover border border-line"
              loading="lazy"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[13.5px] font-medium text-ink truncate">demlabrothers</span>
                <span className="w-3.5 h-3.5 rounded-full bg-accent text-white flex items-center justify-center text-[8px] font-bold">
                  ✓
                </span>
              </div>
              <div className="text-[11px] font-mono text-ink-soft">
                Founders · Cellbell (Shark Tank S2)
              </div>
            </div>
          </div>

          {/* Growth Stat Pills */}
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-[12px] bg-white border border-line text-center text-[11px] font-mono mb-3">
            <div>
              <div className="font-semibold text-ink">85</div>
              <div className="text-[9px] text-ink-soft">Posts</div>
            </div>
            <div>
              <div className="font-semibold text-accent">129K</div>
              <div className="text-[9px] text-ink-soft">Followers</div>
            </div>
            <div>
              <div className="font-semibold text-ink">100%</div>
              <div className="text-[9px] text-ink-soft">Organic</div>
            </div>
          </div>
        </div>

        {/* Viral Reel Grid Mockup */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
          <div className="rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/assets/stories/tools-fact.jpg"
              alt="Viral Reel 1"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1 left-1 text-[9px] font-mono font-semibold text-white bg-black/60 px-1 rounded">
              ▶ 1.4M
            </div>
          </div>

          <div className="rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/assets/stories/cellbell.jpg"
              alt="Viral Reel 2"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1 left-1 text-[9px] font-mono font-semibold text-white bg-black/60 px-1 rounded">
              ▶ 850K
            </div>
          </div>

          <div className="rounded-[10px] overflow-hidden relative border border-line bg-ink aspect-[9/14]">
            <img
              src="/assets/stories/akash-pandey.jpg"
              alt="Viral Reel 3"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1 left-1 text-[9px] font-mono font-semibold text-white bg-black/60 px-1 rounded">
              ▶ 620K
            </div>
          </div>
        </div>

        {/* Bottom Bar Indicator */}
        <div className="pt-2 text-center text-[10px] font-mono text-ink-soft border-t border-line mt-2">
          100% ALGORITHMIC VELOCITY · ZERO ADS
        </div>
      </div>
    </div>
  );
}

/**
 * 04. Blueprint Framework Mockup for Strategy & Storytelling
 * Device mockup: 24px radius, 1px --line border, soft shadow 0 30px 80px rgba(15,26,46,.10)
 */
function StrategyMockup() {
  return (
    <div className="device-mockup tilt-l glare reflect-below w-full max-w-[560px] mx-auto p-4 sm:p-6 bg-white select-none">
      {/* Blueprint Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-[11px] font-mono text-ink-soft">
        <span>ORGIX IP // NARRATIVE ARCHITECTURE</span>
        <span className="text-accent font-semibold">PROPRIETARY FRAMEWORK</span>
      </div>

      {/* 3 Interlocking Architecture Cards */}
      <div className="space-y-2.5 mb-4">
        <div className="p-3.5 rounded-[14px] bg-bg border border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-ink text-white text-[11px] font-mono flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <div className="text-[13px] font-medium text-ink">Tacit Knowledge Mining</div>
              <div className="text-[11px] text-ink-soft">Extracting your unique lived experiences &amp; contrarian insights</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-ink-soft hidden sm:inline">STEP 01</span>
        </div>

        <div className="p-3.5 rounded-[14px] bg-bg border border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-mono flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <div className="text-[13px] font-medium text-ink">Hook &amp; Retention Architecture</div>
              <div className="text-[11px] text-ink-soft">Scripts structured to defeat short attention spans</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-ink-soft hidden sm:inline">STEP 02</span>
        </div>

        <div className="p-3.5 rounded-[14px] bg-bg border border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-ink text-white text-[11px] font-mono flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <div className="text-[13px] font-medium text-ink">Pipeline Conversion Engine</div>
              <div className="text-[11px] text-ink-soft">Turning audience trust directly into high-ticket inbound pipeline</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-ink-soft hidden sm:inline">STEP 03</span>
        </div>
      </div>

      {/* Blueprint Validation Footer */}
      <div className="flex items-center justify-between p-3 rounded-[12px] bg-bg border border-line text-[11px] font-mono text-ink-soft">
        <div className="flex items-center gap-2">
          <img
            src="/assets/creators/simran-balraj.jpg"
            alt="Creator Authority"
            className="w-6 h-6 rounded-full object-cover border border-line"
            loading="lazy"
          />
          <span className="text-ink font-medium">85+ Frameworks Deployed</span>
        </div>
        <span>COMPOUNDING IP</span>
      </div>
    </div>
  );
}

/**
 * Four Editorial Service Sections per DESIGN.md:
 * - Alternating --bg / --bg-alt
 * - Alternating mockup side left/right
 * - Mobile visual-first vertical stacking
 * - Exactly ONE headline, ONE paragraph, ONE visual per section
 */
export default function ServicesSections() {
  return (
    <>
      {/* 01. Video Editing */}
      <Section
        id="service-video-editing"
        bgAlt={false}
        headline="Edits that stop the scroll."
        paragraph="High-retention pacing, kinetic typography, and precision sound design engineered to hold viewer attention."
        visual={<VideoEditingMockup />}
        visualPosition="right"
      />

      {/* 02. LinkedIn Management */}
      <Section
        id="service-linkedin"
        bgAlt={true}
        headline="Authority, post by post."
        paragraph="Turn executive thinking into high-reach editorial carousels, founder breakdowns, and qualified inbound enterprise leads."
        visual={<LinkedInMockup />}
        visualPosition="left"
      />

      {/* 03. Instagram Growth */}
      <Section
        id="service-instagram"
        bgAlt={false}
        headline="Growth you can measure."
        paragraph="100% organic growth architecture through daily reels, carousel funnels, and algorithmic retention velocity."
        visual={<InstagramGrowthMockup />}
        visualPosition="right"
      />

      {/* 04. Strategy & Storytelling */}
      <Section
        id="service-strategy"
        bgAlt={true}
        headline="Stories engineered to convert."
        paragraph="Extract your tacit knowledge into a distinctive brand narrative, proprietary frameworks, and uncopyable IP."
        visual={<StrategyMockup />}
        visualPosition="left"
      />
    </>
  );
}
