import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { team, teamStat, imgSrc } from "@/data/site";

export default function LeadershipStrip({ index = "08" }) {
  return (
    <section className="section section--tight leadership-strip" id="leadership">
      <div className="container">
        <div className="leadership-inner">
          <Reveal>
            <SectionHead
              center
              index={index}
              kicker="THE PEOPLE BEHIND THE NUMBERS"
              title={
                <>
                  Led by the people who <span className="grad-hot">built the benchmark.</span>
                </>
              }
              lead={
                <>
                  {teamStat.headline} <b style={{ color: "var(--lime)" }}>{teamStat.highlight}</b> {teamStat.rest}
                </>
              }
            />
          </Reveal>

          <div className="leadership-grid">
            {team.slice(0, 3).map((m, i) => (
              <Reveal delay={i * 0.08} key={m.name} as="article" className="leadership-card">
                <div className="lc-ph">
                  <img
                    src={imgSrc(m.img)}
                    alt={m.name}
                    loading="lazy"
                    width={220}
                    height={240}
                  />
                  <div className="lc-tag">
                    <span className="lc-role">{m.role}</span>
                  </div>
                </div>
                <div className="lc-bio">
                  <h3 className="lc-name">{m.name}</h3>
                  <span className="lc-focus">{m.focus}</span>
                  <p className="lc-text">{m.bio}</p>
                  {m.socials && (
                    <div className="lc-socials" aria-label={`${m.name} social profiles`}>
                      {m.socials.instagram && (
                        <a
                          href={m.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lc-soc"
                          aria-label={`${m.name} on Instagram`}
                        >
                          <Icon name="ig" size={15} />
                        </a>
                      )}
                      {m.socials.linkedin && (
                        <a
                          href={m.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lc-soc"
                          aria-label={`${m.name} on LinkedIn`}
                        >
                          <Icon name="linkedin" size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/about" className="btn btn--ghost btn--sm">
              Meet the full team of 25–30 <Icon name="arrow" size={15} className="arr" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
