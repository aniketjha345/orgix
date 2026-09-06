"use client";

import { FadeUp } from "../motion/MotionPrimitives";

export default function SectionHeading({
  index = "01",
  tag = "SECTION",
  highlightTag,
  title,
  subtitle,
  align = "left", // "left" | "center"
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
      } ${className}`}
    >
      <FadeUp delay={0.05}>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-muted/80 border border-border text-[11.5px] font-mono tracking-wider uppercase text-ink-secondary mb-4 backdrop-blur-sm ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>
            {index && <span className="text-ink-muted mr-1.5">{index} —</span>}
            {tag}
          </span>
          {highlightTag && (
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent/15 text-accent border border-accent/30">
              {highlightTag}
            </span>
          )}
        </div>
      </FadeUp>

      <FadeUp delay={0.12}>
        <h2 className="text-display-md md:text-display-lg font-display text-ink-primary font-normal tracking-tight leading-[1.05] text-balance">
          {title}
        </h2>
      </FadeUp>

      {subtitle && (
        <FadeUp delay={0.18}>
          <p
            className={`mt-4 text-body-md md:text-body-lg text-ink-secondary leading-relaxed font-light ${
              isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
