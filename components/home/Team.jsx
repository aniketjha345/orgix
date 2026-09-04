import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { team, teamStat, imgSrc } from "@/data/site";

export default function Team({ index = "05" }) {
  return (
    <section className="section" id="leadership">
      <div className="container">
        <SectionHead
          center
          index={index}
          kicker="EXECUTIVE LEADERSHIP · CREATIVE DIRECTORS"
          title={
            <>
              The leadership behind <span className="grad-brand">the benchmark.</span>
            </>
          }
          lead={
            <>
              {teamStat.headline} <b style={{ color: "var(--lime)" }}>{teamStat.highlight}</b> {teamStat.rest}
            </>
          }
        />

        <div className="team-grid" style={{ marginTop: 8 }}>
          {team.map((m, i) => (
            <Reveal delay={i * 0.12} as="article" key={m.name} className="member">
              <div className="ph">
                <img src={imgSrc(m.img)} alt={m.name} loading="lazy" width={500} height={520} />
                <div className="tag">
                  <div>
                    <div className="role-t">{m.role}</div>
                  </div>
                </div>
              </div>
              <div className="bio">
                <div className="bio-header">
                  <h3>{m.name}</h3>
                  {m.socials && (
                    <div className="team-socials">
                      {m.socials.instagram && (
                        <a href={m.socials.instagram} target="_blank" rel="noopener noreferrer" className="team-soc-link" aria-label={`${m.name} on Instagram`} title="Instagram">
                          <Icon name="ig" size={15} />
                        </a>
                      )}
                      {m.socials.linkedin && (
                        <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" className="team-soc-link" aria-label={`${m.name} on LinkedIn`} title="LinkedIn">
                          <Icon name="linkedin" size={14} />
                        </a>
                      )}
                      {m.socials.youtube && (
                        <a href={m.socials.youtube} target="_blank" rel="noopener noreferrer" className="team-soc-link" aria-label={`${m.name} on YouTube`} title="YouTube">
                          <Icon name="yt" size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <span className="lbl">{m.focus}</span>
                <p>{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
