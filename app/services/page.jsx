import PageHero from "@/components/ui/PageHero";
import ServicesCards from "@/components/home/ServicesCards";
import Process from "@/components/home/Process";
import Faq from "@/components/home/Faq";
import CtaSection from "@/components/ui/CtaSection";
import Reveal from "@/components/core/Reveal";
import Icon from "@/components/core/Icon";

const audiences = [
  {
    title: "Founders & CEOs",
    text: "You are your company's highest-converting distribution channel. We position you as the definitive authority your market turns to — turning organic attention into inbound enterprise pipeline.",
    icon: "rocket",
  },
  {
    title: "Experts & CAs / Consultants",
    text: "Chartered accountants, tax strategists, doctors, lawyers, trainers. We translate technical complexity into punchy, viral education that commands prestige and attracts high-ticket clients.",
    icon: "compass",
  },
  {
    title: "Creators & D2C Brands",
    text: "Already posting but hitting retention plateaus? We engineer your full production pipeline — research, scripting, directed shooting and retention editing that compounds month after month.",
    icon: "camera",
  },
];

export const metadata = {
  title: "Services — Orgix Media | Instagram & YouTube Personal Branding",
  description:
    "Instagram management, YouTube growth, viral scripting, guided shooting, high-retention editing and community management — one team, full ecosystem.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="01 — CAPABILITIES"
        kicker="CORE ARCHITECTURE"
        title={
          <>
            Everything your brand needs <span className="grad-brand">to dominate.</span>
          </>
        }
        lead="Two elite services. One obsessive team. From research and viral scripting to cinematic shoots and retention editing — we run the entire growth ecosystem behind your name."
      >
        <div className="tag-row">
          <span className="mini-tag">Strategy → Script → Shoot → Edit → Post → Convert</span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container" style={{ maxWidth: 1160 }}>
          <ServicesCards detailed />
        </div>
      </section>

      <Process index="02" engine="02 · THE 6-STEP GROWTH ENGINE" />

      <section className="section">
        <div className="container">
          <Reveal style={{ maxWidth: 640, marginBottom: 36 }}>
            <span className="eyebrow">03 — TARGET ARCHETYPES</span>
            <h2 className="display" style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.3rem)", marginTop: 14, letterSpacing: "-0.025em" }}>
              Built for people with something real to say.
            </h2>
          </Reveal>
          <div className="audiences-grid">
            {audiences.map((a, i) => (
              <Reveal delay={i * 0.1} as="article" key={a.title}>
                <div className="card shine" style={{ padding: "clamp(20px, 2.5vw, 30px)", height: "100%" }}>
                  <span
                    className="ic"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(139, 92, 246, 0.15)",
                      color: "var(--violet-2)",
                      marginBottom: 22,
                    }}
                  >
                    <Icon name={a.icon} size={24} />
                  </span>
                  <h3 className="display" style={{ fontSize: 22, marginBottom: 12, letterSpacing: "-0.01em" }}>
                    {a.title}
                  </h3>
                  <p style={{ color: "var(--ink-3)", fontSize: 14.5, lineHeight: 1.75 }}>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq index="04" />
      <CtaSection
        index="05"
        kicker="STRATEGY AUDIT"
        title={
          <>
            Not sure which service fits? <span className="grad-hot">Let's analyze.</span>
          </>
        }
        lead="Book a free 1:1 strategy audit — we'll review your current profiles, identify algorithmic bottlenecks, and map the exact growth trajectory for your industry."
      />
    </>
  );
}
