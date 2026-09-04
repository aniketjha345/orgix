import Reveal from "../core/Reveal";

export default function PageHero({ eyebrow, title, lead, children, kicker }) {
  return (
    <section className="page-hero grain">
      <div className="grid-lines" style={{ position: "absolute", inset: 0 }} aria-hidden="true" />
      <div
        className="hero-glow"
        style={{
          width: 620,
          height: 620,
          top: -200,
          right: "-6%",
          background: "radial-gradient(circle, rgba(139,92,246,0.24), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="container" style={{ position: "relative" }}>
        <Reveal delay={0.02}>
          <div className="breadcrumb">
            <span>{kicker || "Orgix Media"}</span>
            <i>→</i>
            <span>{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.18}>
            <p className="lead">{lead}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.26}>{children}</Reveal>}
      </div>
    </section>
  );
}
