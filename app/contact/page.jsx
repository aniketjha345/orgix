import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/core/Reveal";
import Icon from "@/components/core/Icon";
import ContactForm from "@/components/contact/ContactForm";
import { company } from "@/data/site";

export const metadata = {
  title: "Contact — Orgix Media | Book Your Free Strategy Call",
  description:
    "Ready to build your personal brand? Book a free strategy call with Orgix Media. Tell us where you are and where you want to be.",
};

const info = [
  {
    icon: "mail",
    t: "Direct Studio Email",
    v: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: "youtube",
    t: "Official YouTube Channel",
    v: "@orgixmedia",
    href: company.youtube,
    color: "#ff0000",
  },
  {
    icon: "ig",
    t: "Instagram Channel",
    v: "@orgixmedia",
    href: company.instagram,
  },
  {
    icon: "pin",
    t: "Delhi Studio HQ",
    v: company.address,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — INITIATE CONSULTATION"
        kicker="FOUNDER STRATEGY SLOT"
        title={
          <>
            Your brand is one <span className="grad-hot">decision away.</span>
          </>
        }
        lead="Tell us where your personal brand stands today and your 12-month ambition — we'll map the exact organic content architecture to get you there. No pressure, zero spam."
      >
        <div className="tag-row">
          <span className="mini-tag">
            <Icon name="check" size={12} style={{ color: "var(--lime)", marginRight: 6, display: "inline", verticalAlign: "-1px" }} />
            Free 1:1 Strategy Audit
          </span>
          <span className="mini-tag">No Ad-Spend Pitch</span>
          <span className="mini-tag">100% Organic Roadmap</span>
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <div className="contact-grid">
            <div>
              <Reveal>
                <span className="eyebrow">02 — DIRECT CHANNELS</span>
                <h2 className="display" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", marginTop: 14, letterSpacing: "-0.025em" }}>
                  Let's engineer <span className="grad-brand">your unfair advantage.</span>
                </h2>
                <p className="lead" style={{ marginTop: 14, fontSize: 15 }}>
                  Every application is personally reviewed by our founding strategists. We prepare niche competitor analytics and immediate hook recommendations before getting on the call.
                </p>
              </Reveal>

              <div className="contact-cards">
                {info.map((c, i) => (
                  <Reveal delay={i * 0.08} key={c.t}>
                    <div className="c-card">
                      <span className="ic" style={c.color ? { color: c.color } : {}}>
                        <Icon name={c.icon} size={20} />
                      </span>
                      <div>
                        <b>{c.t}</b>
                        {c.href ? (
                          <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                            {c.v}
                          </a>
                        ) : (
                          <span>{c.v}</span>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal dir="right" delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
