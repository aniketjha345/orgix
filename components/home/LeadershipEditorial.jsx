"use client";

import Section from "../core/Section";
import Icon from "../core/Icon";
import { team, teamStat, imgSrc } from "@/data/site";

export default function LeadershipEditorial() {
  return (
    <Section id="leadership" bgAlt={true} className="select-none">
      <div className="w-full flex flex-col items-center">
        {/* ONE headline, ONE paragraph */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            08 / Leadership
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            The strategists behind the numbers.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Creators who test every framework on their own audience first.
          </p>
        </div>

        {/* ONE visual: editorial 3-portrait row */}
        <div className="w-full max-w-[1200px] flex flex-col gap-8 reveal-visual is-revealed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {team.map((member) => (
              <article
                key={member.name}
                className="device-mockup bg-white overflow-hidden flex flex-col group"
              >
                {/* Large editorial portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-alt">
                  <img
                    src={imgSrc(member.img)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 font-body text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-line text-ink">
                    {member.focus}
                  </span>
                </div>

                {/* Identity */}
                <div className="p-6">
                  <h3 className="font-display font-medium text-[20px] text-ink mb-1 tracking-tight">
                    {member.name}
                  </h3>
                  <div className="text-[12px] font-body text-ink-soft mb-3">
                    {member.role}
                  </div>
                  <p className="font-body text-[14px] text-ink-soft leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Social footer */}
                <div className="px-6 py-4 border-t border-line flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-body uppercase tracking-[0.14em] text-ink-soft">
                    Connect
                  </span>
                  <div className="flex items-center gap-2.5">
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-transparent border border-line hover:border-ink text-ink-soft hover:text-accent flex items-center justify-center transition-colors"
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
                        className="w-8 h-8 rounded-full bg-transparent border border-line hover:border-ink text-ink-soft hover:text-accent flex items-center justify-center transition-colors"
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
                        className="w-8 h-8 rounded-full bg-transparent border border-line hover:border-ink text-ink-soft hover:text-accent flex items-center justify-center transition-colors"
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

          {/* Collective note */}
          <p className="text-center font-body text-[14px] text-ink-soft">
            <span className="text-ink font-medium">{teamStat.headline}</span>{" "}
            <span className="font-semibold">{teamStat.highlight}</span> {teamStat.rest}
          </p>
        </div>
      </div>
    </Section>
  );
}
