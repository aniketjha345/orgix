"use client";

import Reveal from "../core/Reveal";
import Icon from "../core/Icon";

export default function Manifesto() {
  return (
    <section className="section manifesto-section grain" id="manifesto">
      <div className="container">
        <div className="manifesto-header">
          <Reveal>
            <div className="manifesto-index-badge">
              <span className="pulse" />
              <span>03 — THE MANIFESTO · WHY WE EXIST</span>
            </div>
            <h2 className="manifesto-headline">
              Most agencies churn out noise. <br />
              <span className="grad-hot">We engineer Category Authority.</span>
            </h2>
            <p className="manifesto-lead">
              The internet is flooded with generic reels, copied trends, and robotic AI voiceovers. 
              We built Orgix Media on the opposite conviction: your personal brand is your most valuable 
              compounding enterprise asset.
            </p>
          </Reveal>
        </div>

        <div className="manifesto-dual-grid">
          {/* Card 1: The Commodity Trap */}
          <Reveal delay={0.08}>
            <div className="manifesto-card manifesto-card--problem">
              <div className="manifesto-card-tag tag-problem">
                <span className="manifesto-dot dot-red" />
                THE COMMODITY TRAP
              </div>
              <h3 className="manifesto-card-title">
                The world doesn't need another generic 30-second clip.
              </h3>
              <p className="manifesto-card-text">
                Every single day, 500,000+ reels are uploaded to Instagram and YouTube. 
                99% of them are carbon copies — regurgitated memes, robotic AI voiceovers, 
                flashing subtitle animations, and empty trending audios.
              </p>
              <p className="manifesto-card-text">
                They burn dozens of founder hours for cheap vanity views that attract zero high-ticket 
                clients, zero angel investors, and zero enterprise trust. Founders burn out on the content hamster wheel 
                wondering why 100,000 views never translated into business growth.
              </p>
              <div className="manifesto-card-metric metric-bad">
                <div className="metric-val">&lt; 2.2s</div>
                <div className="metric-lbl">Average viewer drop-off on commodity content</div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: The Orgix Authority Engine */}
          <Reveal delay={0.16}>
            <div className="manifesto-card manifesto-card--solution">
              <div className="manifesto-card-glow" aria-hidden="true" />
              <div className="manifesto-card-tag tag-solution">
                <span className="manifesto-dot dot-lime" />
                THE ORGIX AUTHORITY ENGINE
              </div>
              <h3 className="manifesto-card-title">
                Your personal brand treated as a high-yield enterprise asset.
              </h3>
              <p className="manifesto-card-text">
                At Orgix Media, we reject low-effort content farming. We treat your personal brand 
                with the same rigor as an IPO roadshow. We extract your contrarian industry theses, 
                engineer psychological retention hooks, and craft cinema-grade visual storytelling.
              </p>
              <p className="manifesto-card-text">
                When your content looks like an HBO documentary and speaks with undeniable domain authority, 
                you don’t have to chase clients. The highest-caliber founders, investors, and customers in your industry 
                inbound to you directly.
              </p>
              <div className="manifesto-card-metric metric-good">
                <div className="metric-val grad-hot">68%+</div>
                <div className="metric-lbl">Average watch-time past 15s on Orgix-engineered reels</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Core Axioms of Organic Dominance */}
        <div className="manifesto-axioms">
          {[
            {
              num: "01",
              label: "AXIOM 01",
              title: "Hook Architecture Over Clickbait",
              desc: "We don't trick viewers with cheap sensationalism. We design the first 1.8 seconds with cognitive pattern interrupts that arrest scrolling and earn genuine intellectual respect.",
              tag: "Psychology-First",
            },
            {
              num: "02",
              label: "AXIOM 02",
              title: "100% Algorithmic Compounding",
              desc: "Paid ads evaporate the millisecond you stop spending. Organic authority assets compound indefinitely — continuing to attract inbound deals and speaking invites months after publishing.",
              tag: "Zero Ad Spend",
            },
            {
              num: "03",
              label: "AXIOM 03",
              title: "Authority-to-Revenue Conversion",
              desc: "Views are meaningless vanity if they do not convert. Every script, hook, and pinned post is engineered to channel inbound attention into measurable commercial pipeline.",
              tag: "Commercial Inbound",
            },
          ].map((axiom, idx) => (
            <Reveal delay={0.24 + idx * 0.08} key={axiom.num}>
              <div className="axiom-card shine">
                <div className="axiom-head">
                  <span className="axiom-label">{axiom.label}</span>
                  <span className="axiom-tag">{axiom.tag}</span>
                </div>
                <h4 className="axiom-title">{axiom.title}</h4>
                <p className="axiom-desc">{axiom.desc}</p>
                <div className="axiom-foot">
                  <Icon name="check" size={15} style={{ color: "var(--lime)" }} />
                  <span>Verified Organic Principle</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
