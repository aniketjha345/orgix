"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "../core/Icon";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { team, teamStat, imgSrc } from "@/data/site";

export default function LeadershipStrip({ index = "09" }) {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60" id="leadership">
      <div className="container">
        <SectionHeading
          index={index}
          tag="THE PEOPLE BEHIND THE NUMBERS · FOUNDER-LED STUDIO"
          highlightTag="FOUNDER-LED"
          title={
            <>
              Led by the team that{" "}
              <span className="text-accent block sm:inline">built the benchmark.</span>
            </>
          }
          subtitle={`${teamStat.headline} ${teamStat.highlight} ${teamStat.rest}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {team.slice(0, 3).map((m, idx) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl bg-surface-muted/80 border border-border p-5 sm:p-6 shadow-subtle hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-surface border border-white/10">
                  <img
                    src={imgSrc(m.img)}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-white">
                    {m.role}
                  </span>
                </div>

                <h3 className="text-heading-lg font-display text-ink-primary font-medium mb-1">
                  {m.name}
                </h3>
                <div className="text-body-sm font-mono text-accent mb-3">
                  {m.focus}
                </div>
                <p className="text-body-sm text-ink-secondary leading-relaxed font-light mb-6">
                  {m.bio}
                </p>
              </div>

              {/* Socials Link Row */}
              {m.socials && (
                <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                  {m.socials.instagram && (
                    <a
                      href={m.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                      aria-label={`${m.name} on Instagram`}
                    >
                      <Icon name="ig" size={14} />
                    </a>
                  )}
                  {m.socials.linkedin && (
                    <a
                      href={m.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                      aria-label={`${m.name} on LinkedIn`}
                    >
                      <Icon name="linkedin" size={13} />
                    </a>
                  )}
                  {m.socials.youtube && (
                    <a
                      href={m.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-surface border border-border hover:border-accent hover:text-accent text-ink-muted flex items-center justify-center transition-colors"
                      aria-label={`${m.name} on YouTube`}
                    >
                      <Icon name="youtube" size={14} />
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="md" href="/about">
            Meet the Full Team of 25–30 Creators
          </Button>
        </div>
      </div>
    </section>
  );
}
