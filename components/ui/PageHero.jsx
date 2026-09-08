"use client";

export default function PageHero({
  eyebrow = "01 — SELECTED WORK",
  kicker = "ORGIX MEDIA",
  title,
  lead,
  children,
}) {
  return (
    <section className="hero-go relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden bg-background border-b border-border/60">
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[650px] h-[500px] bg-gradient-to-b from-accent/[0.05] to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div
            className="hero-rise hero-rise-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-muted/90 border border-border text-[11px] font-mono tracking-wider uppercase text-ink-secondary mb-6 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>{kicker}</span>
            <span className="text-ink-muted">/</span>
            <span>{eyebrow}</span>
          </div>

          {/* Editorial Display Heading */}
          <h1
            className="hero-rise hero-rise-2 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.75rem] font-display font-normal tracking-[-0.035em] text-ink-primary leading-[1.0] mb-5 text-balance"
          >
            {title}
          </h1>

          {/* Lead paragraph */}
          {lead && (
            <p
              className="hero-rise hero-rise-3 text-body-md md:text-body-lg text-ink-secondary leading-relaxed font-light mb-8 max-w-2xl"
            >
              {lead}
            </p>
          )}

          {/* Telemetry chips / children */}
          {children && (
            <div
              className="hero-rise hero-rise-4"
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
