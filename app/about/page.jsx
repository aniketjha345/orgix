import PageHero from "@/components/ui/PageHero";
import Team from "@/components/home/Team";
import Stats from "@/components/home/Stats";
import AgencyJourney from "@/components/about/AgencyJourney";
import CtaSection from "@/components/ui/CtaSection";
import Reveal from "@/components/core/Reveal";
import Icon from "@/components/core/Icon";
import { imgSrc } from "@/data/site";

const values = [
  { icon: "eye", t: "Organic only", d: "No ads, no bots, no shortcuts. Growth that survives algorithm changes and compounds indefinitely." },
  { icon: "trend", t: "Data before drama", d: "Deep competitor analytics and retention curves dictate every hook, cut and posting schedule." },
  { icon: "users", t: "One team, one roof", d: "Strategists, scriptwriters, directors and video editors aligned in single-threaded focus." },
  { icon: "flame", t: "Obsessed with retention", d: "A view is worthless if the audience drops off in 3 seconds. Every frame earns the next." },
];

export const metadata = {
  title: "About Us — Orgix Media | The Personal Branding Studio in India",
  description:
    "Meet the Orgix Media team — strategists, scriptwriters, editors and shooters turning names into brands for founders and creators across India.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — ABOUT STUDIO"
        kicker="THE ORIGIN & ETHOS"
        title={
          <>
            We turn names <span className="grad-brand">into brands.</span>
          </>
        }
        lead="Orgix Media is a dedicated personal branding studio based in Delhi. Not a generic marketing agency, not an ad buyer — we build the complete organic content ecosystem behind your name."
      />

      <Stats />

      {/* 2-Column Editorial Split with Sticky Left Anchor */}
      <section className="section editorial-split-section">
        <div className="container editorial-split-grid">
          {/* Left: Sticky oversized statement / anchor */}
          <div className="editorial-sticky-col">
            <div className="editorial-sticky-inner">
              <span className="eyebrow" style={{ color: "var(--lime)" }}>
                02 — THE MANIFESTO
              </span>
              <div className="editorial-display-anchor">
                EVERYONE HAS EXPERTISE.
                <br />
                <span className="grad-hot">FEW COMMAND ATTENTION.</span>
              </div>
              <div className="editorial-anchor-stats">
                <div className="anchor-stat-item">
                  <b>1B+</b>
                  <span>Verified organic views across client networks</span>
                </div>
                <div className="anchor-stat-item">
                  <b>85+</b>
                  <span>High-reputation creators &amp; founders scaled</span>
                </div>
                <div className="anchor-stat-item">
                  <b>100%</b>
                  <span>Organic algorithmic discovery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: High-contrast narrative prose */}
          <div className="editorial-prose-col">
            <Reveal>
              <h2 className="editorial-h2">
                From technical strategy to precision editing, we architect an unassailable digital presence around your intellect.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="editorial-para">
                Personal branding in modern India has been corrupted by vanity metrics and generic advice. Buying followers, running paid reel boosts, or reposting recycled motivational quotes yields empty audiences that never convert into deals, authority, or enterprise trust.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="editorial-para">
                At Orgix Media, we treat your personal brand like an enterprise asset. We identify your differentiated intellectual property, extract your lived insights through rigorous interviews, and engineer high-retention video formats that algorithmically resonate across Instagram and YouTube.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="editorial-quote-card">
                <span className="quote-badge">
                  <Icon name="quote" size={20} />
                </span>
                <blockquote className="quote-text">
                  &ldquo;Our task is simple: transform your raw domain knowledge into a personal brand that doesn&rsquo;t just generate views — it commands prestige, commands attention, and closes high-value relationships.&rdquo;
                </blockquote>
                <div className="quote-author">
                  <img
                    src={imgSrc("/images/founders/anant-jain.jpg")}
                    alt="Anant Jain — Co-Founder"
                    className="quote-avatar"
                  />
                  <div>
                    <div className="quote-name">Anant Jain</div>
                    <div className="quote-role">Co-Founder &amp; Managing Director · Orgix Media</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="tag-row" style={{ marginTop: 32 }}>
                <span className="mini-tag">Instagram Strategy</span>
                <span className="mini-tag">YouTube Systems</span>
                <span className="mini-tag">Hook Architecture</span>
                <span className="mini-tag">Cinematic Shoots</span>
                <span className="mini-tag">Retention Analytics</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Four Rules Section */}
      <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="eyebrow center">03 — CORE CONVICTIONS</span>
            <h2 className="display" style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.3rem)", marginTop: 14 }}>
              Four non-negotiable rules. <span className="grad-hot">Zero exceptions.</span>
            </h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal delay={i * 0.08} key={v.t}>
                <div className="value-card shine">
                  <span
                    className="value-icon-box"
                    style={{
                      background: `rgba(${i % 2 ? "139, 92, 246" : "200, 240, 77"}, 0.14)`,
                      color: i % 2 ? "var(--violet-2)" : "var(--lime)",
                    }}
                  >
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="value-title">{v.t}</h3>
                  <p className="value-desc">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AgencyJourney index="04" />
      <Team index="05" />

      <CtaSection
        index="06"
        kicker="DIRECT INITIATION"
        title={
          <>
            Meet the team behind the <span className="grad-hot">growth.</span>
          </>
        }
        lead="Tell us where you are today and where you want to be — we'll map the exact 90-day organic trajectory to get you there."
      />
    </>
  );
}
