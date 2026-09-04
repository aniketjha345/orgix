import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import BrandEngine from "../ui/BrandEngine";
import { processSteps, imgSrc } from "@/data/site";

export default function Process({ index = "04", engine = "04 · THE 6-STEP GROWTH ENGINE" }) {
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          top: "10%",
          left: "-14%",
          background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="container">
        <BrandEngine label={engine} />
        <div className="process-wrap">
          <div className="process-intro">
            <Reveal>
              <span className="eyebrow">{index} — THE PRODUCTION ENGINE · 6-STEP METHODOLOGY</span>
              <h2 className="big">
                The Orgix <span className="grad-brand">Growth Engine.</span>
              </h2>
              <p className="lead" style={{ marginTop: 22 }}>
                Six steps. One obsessive team. From research to results — a complete content ecosystem
                built around your expertise and what you want to be known for.
              </p>
              <div className="tag-row" style={{ marginTop: 32 }}>
                {["Strategy", "Content", "Growth"].map((t) => (
                  <span className="mini-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="process-list">
            {processSteps.map((s, i) => (
              <Reveal delay={(i % 2) * 0.08} key={s.n}>
                <article className="step">
                  <span className="num">{s.n}</span>
                  <div>
                    <div className="st-kick">{s.kicker}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <div className="step-thumb">
                    <img
                      src={imgSrc(s.img)}
                      alt={`${s.title} — Step ${s.n}`}
                      loading="lazy"
                      width={200}
                      height={140}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
