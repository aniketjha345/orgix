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
    icon: "whatsapp",
    t: "WhatsApp & Priority Desk",
    v: company.phone,
    href: "https://wa.me/918287528395?text=Hi%20Orgix%20Media!%20I%20want%20to%20grow%20my%20social%20media.",
    color: "#25D366",
  },
  {
    icon: "mail",
    t: "Direct Studio Email",
    v: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: "ig",
    t: "Instagram Direct",
    v: "@orgixmedia",
    href: company.instagram,
  },
  {
    icon: "pin",
    t: "Delhi Studio HQ",
    v: company.address,
    href: "https://maps.google.com/?q=Rohini+Delhi+110085",
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
            Your brand is one <span className="grad-brand">decision away.</span>
          </>
        }
        lead="Tell us where you stand and where you want to be — we'll map the exact organic path there. No pressure, zero spam."
      >
        <div className="tag-row">
          <span className="mini-tag">
            <Icon name="check" size={12} style={{ color: "var(--accent)", marginRight: 6, display: "inline", verticalAlign: "-1px" }} />
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

              <Reveal delay={0.2}>
                <div className="card" style={{ padding: "clamp(20px, 2.5vw, 28px)", marginTop: 26 }}>
                  <span className="eyebrow" style={{ color: "var(--accent)" }}>
                    WHAT HAPPENS NEXT
                  </span>
                  <ol style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
                    {[
                      ["01", "Profile review", "We study your current presence and niche competitors before we ever get on a call."],
                      ["02", "Free 1:1 audit", "A 30-minute strategy call with a founding strategist — no pitch deck, no ad-spend talk."],
                      ["03", "Your 90-day map", "You receive the exact organic content trajectory we'd run for your name."],
                    ].map(([n, t, d]) => (
                      <li key={n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span className="mono" style={{ color: "var(--accent)", fontSize: 12, paddingTop: 3 }}>
                          {n}
                        </span>
                        <span>
                          <b style={{ display: "block", fontSize: 14.5 }}>{t}</b>
                          <span style={{ color: "var(--ink-soft)", fontSize: 13.5, lineHeight: 1.6 }}>{d}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
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
