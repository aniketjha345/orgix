"use client";

import { team, teamStat, imgSrc } from "@/data/site";
import Icon from "../core/Icon";

export default function LeadershipEditorial() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="leadership">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>06 — LEADERSHIP</span>
            </div>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-3">
              The strategists <span className="text-accent">behind the numbers.</span>
            </h2>
            <p className="text-body-md text-ink-secondary font-light">
              Founded and operated by creators who test every framework on their own audience first.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-muted border border-border text-[12.5px] font-mono text-ink-secondary">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>25–30 in-house team in Delhi</span>
          </div>
        </div>

        {/* Editorial 3-Card Layout (Large Photo, Name, Role, 2-line bio, social icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl overflow-hidden bg-surface-muted border border-border flex flex-col justify-between group hover:border-accent/40 transition-all duration-300 shadow-subtle"
            >
              <div>
                {/* Large Editorial Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <img
                    src={imgSrc(member.img)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-transparent to-transparent opacity-70" />
                  <span className="absolute top-4 left-4 font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#0a0a1f]/80 backdrop-blur-md border border-white/15 text-accent">
                    {member.focus}
                  </span>
                </div>

                {/* Identity & Bio */}
                <div className="p-6">
                  <h3 className="text-heading-lg font-display font-medium text-ink-primary mb-1">
                    {member.name}
                  </h3>
                  <div className="text-[12px] font-mono text-accent/90 mb-3">
                    {member.role} · {member.focus}
                  </div>
                  <p className="text-body-sm text-ink-secondary leading-relaxed font-light line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Social Links Footer */}
              <div className="px-6 py-4 border-t border-border/60 bg-surface/50 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ink-muted">CONNECT</span>
                <div className="flex items-center gap-3">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent text-ink-muted hover:text-accent flex items-center justify-center transition-colors"
                      aria-label={`${member.name} Instagram`}
                    >
                      <Icon name="ig" size={14} />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent text-ink-muted hover:text-accent flex items-center justify-center transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Icon name="linkedin" size={14} />
                    </a>
                  )}
                  {member.socials.youtube && (
                    <a
                      href={member.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent text-ink-muted hover:text-accent flex items-center justify-center transition-colors"
                      aria-label={`${member.name} YouTube`}
                    >
                      <Icon name="youtube" size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Collective Team Note Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-surface/40 border border-border text-center max-w-2xl mx-auto">
          <p className="text-body-sm text-ink-secondary">
            <span className="text-ink-primary font-medium">{teamStat.headline}</span>{" "}
            <span className="text-accent font-semibold">{teamStat.highlight}</span>{" "}
            {teamStat.rest}
          </p>
        </div>
      </div>
    </section>
  );
}
