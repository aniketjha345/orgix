import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/core/Reveal";
import Icon from "@/components/core/Icon";
import CtaSection from "@/components/ui/CtaSection";
import { company } from "@/data/site";

export const metadata = {
  title: "Careers — Join Orgix Media | India's Personal Branding Studio",
  description:
    "Join our team of 25–30 creators, scriptwriters, video editors and strategists at Orgix Media in Delhi. Explore open positions and build digital legacies.",
};

const jobs = [
  {
    title: "High-Retention Video Editor",
    type: "Full-Time · Remote / Studio",
    exp: "1+ Years Experience · Portfolio Required",
    tags: ["Premiere Pro / DaVinci", "Kinetic Typography", "Sound Design", "Retention Curves"],
    desc: "We need an editor obsessed with storytelling and retention — turning raw talking-head footage into scroll-stopping reels, shorts, and YouTube masterpieces with razor-sharp cuts, custom soundscapes, and kinetic graphics.",
  },
  {
    title: "Personal Brand & Content Strategist",
    type: "Full-Time · Remote",
    exp: "2+ Years Social Growth Experience",
    tags: ["Competitive Audits", "Hook Architecture", "Content Systems", "Founder Positioning"],
    desc: "A strategic operator who understands high-ticket audience psychology and builds content systems from scratch — identifying unique founder moats, planning content calendars, and engineering viral algorithmic distribution.",
  },
  {
    title: "Viral Scriptwriter & Researcher",
    type: "Full-Time · Remote",
    exp: "Proven Short-Form Writing Track Record",
    tags: ["Contrarian Hooks", "Storytelling Pacing", "Research Teardowns", "Script-to-Screen"],
    desc: "A writer who knows how to grab attention in 1.5 seconds. You'll extract lived wisdom from founders and executives, conduct deep industry research, and transform complex business ideas into punchy scripts that retain audiences.",
  },
];

const culturePillars = [
  {
    icon: "flame",
    title: "High-Impact Production Rigor",
    desc: "Your work is seen by millions every single week. We study retention down to the millisecond — every hook, sound effect, and frame transition is intentional.",
  },
  {
    icon: "users",
    title: "Direct Founder Mentorship",
    desc: "Work side-by-side with Pari, Anant, and Deepak. Zero corporate bureaucracy, no endless email chains — just fast feedback loops and collaborative growth.",
  },
  {
    icon: "rocket",
    title: "Remote First with Studio Muscle",
    desc: "Work from wherever you produce your best creative output, backed by cloud storage infrastructure, asset packs, and dedicated research tools.",
  },
  {
    icon: "trend",
    title: "Performance & Career Upside",
    desc: "We reward excellence. Performance bonuses for viral milestones, clear advancement trajectories, and continuous skills training from day one.",
  },
];

const perks = [
  "Remote-first",
  "High-impact projects",
  "Direct founder access",
  "Performance bonuses",
  "Modern toolstack",
  "Rapid growth track",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — JOIN THE STUDIO"
        kicker="CAREERS AT ORGIX"
        title={
          <>
            Build digital legacies <span className="grad-brand">with us.</span>
          </>
        }
        lead="A dedicated studio of 25–30 content obsessives building authority brands that the internet will remember. If you live and breathe retention, we want you on our bench."
      >
        <div className="tag-row">
          {perks.map((p) => (
            <span className="mini-tag" key={p}>
              {p}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Job Openings Section */}
      <section className="section" id="openings">
        <div className="container">
          <Reveal style={{ maxWidth: 700, marginBottom: 44 }}>
            <span className="eyebrow">02 — OPEN POSITIONS</span>
            <h2 className="display" style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.6rem)", marginTop: 14, letterSpacing: "-0.025em" }}>
              Current opportunities.
            </h2>
            <p className="lead" style={{ marginTop: 12 }}>
              Don&apos;t see your exact title? If you&apos;re an exceptional creator, editor or writer, send us your portfolio anyway — we review every application within 48 hours. Or DM your showreel directly to{" "}
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
                @orgixmedia
              </a>
              .
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {jobs.map((job, idx) => {
              const waMsg = encodeURIComponent(
                `Hi Orgix Media team! I want to apply for the "${job.title}" role. Here is a link to my portfolio/work:`
              );

              return (
                <Reveal delay={idx * 0.08} key={job.title}>
                  <article className="card shine" style={{ padding: "clamp(24px, 3vw, 36px)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                      <div>
                        <h3 className="display" style={{ fontSize: "clamp(1.3rem, 2vw, 1.65rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
                          {job.title}
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8, fontSize: 13.5, color: "var(--ink-soft)" }}>
                          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{job.type}</span>
                          <span>•</span>
                          <span>{job.exp}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        <a
                          href={`https://wa.me/918287528395?text=${waMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                          style={{
                            background: "rgba(46, 91, 255, 0.08)",
                            color: "var(--accent)",
                            borderColor: "rgba(46, 91, 255, 0.2)",
                            padding: "10px 20px",
                            fontSize: 13.5,
                          }}
                        >
                          Apply via WhatsApp
                        </a>
                        <a
                          href={`mailto:${company.email}?subject=Job Application: ${encodeURIComponent(job.title)}&body=Hi Orgix Team,%0D%0A%0D%0AI would like to apply for the ${encodeURIComponent(job.title)} role.%0D%0A%0D%0AMy Portfolio / Resume Link:%0D%0AMy Phone Number:%0D%0AWhy I am a great fit:%0D%0A`}
                          className="btn btn--lime"
                          style={{ padding: "10px 22px", fontSize: 13.5 }}
                        >
                          Apply via Email <Icon name="arrow" size={14} className="arr" />
                        </a>
                      </div>
                    </div>

                    <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.75, maxWidth: 840, marginBottom: 20 }}>
                      {job.desc}
                    </p>

                    <div className="tag-row">
                      {job.tags.map((t) => (
                        <span className="mini-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture & Perks Section */}
      <section className="section" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="eyebrow center">03 — STUDIO ETHOS</span>
            <h2 className="display" style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.3rem)", marginTop: 14 }}>
              Why build your career at Orgix.
            </h2>
            <p className="lead" style={{ maxWidth: 640, margin: "12px auto 0" }}>
              We aren&apos;t an agency that burns people out on low-ticket churn. We work with high-stature founders on long-horizon compound growth.
            </p>
          </Reveal>

          <div className="values-grid">
            {culturePillars.map((c, i) => (
              <Reveal delay={i * 0.08} key={c.title}>
                <div className="card shine" style={{ height: "100%", padding: "clamp(22px, 2.5vw, 32px)" }}>
                  <span
                    className="ic"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(46, 91, 255, 0.08)",
                      color: "var(--accent)",
                      marginBottom: 18,
                    }}
                  >
                    <Icon name={c.icon} size={22} />
                  </span>
                  <h3 className="value-title" style={{ fontSize: 18, marginBottom: 8, color: "var(--ink)" }}>
                    {c.title}
                  </h3>
                  <p className="value-desc" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        index="04"
        kicker="SPONTANEOUS INITIATION"
        title={
          <>
            Great work starts with <span className="grad-brand">a conversation.</span>
          </>
        }
        lead="Send your showreel, GitHub, portfolio link, or write a quick note on WhatsApp — every application is personally reviewed by the founders."
      />
    </>
  );
}
