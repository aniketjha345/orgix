import Marquee from "../ui/Marquee";
import Reveal from "../core/Reveal";
import { marquee, trusted } from "@/data/site";

export default function TrustedBy() {
  return (
    <section className="section--tight trusted-by-section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="manifesto-index-badge" style={{ marginBottom: 16 }}>
            <span className="pulse" />
            <span>01 — VALIDATED REACH · 85+ CREATORS SCALED</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", marginBottom: 10 }}>
            The people worth following, <span className="grad-hot">scale with us.</span>
          </h2>
          <p className="lead" style={{ maxWidth: 640, margin: "0 auto", fontSize: "0.98rem" }}>
            From Shark Tank founders to category-defining creators with millions of followers — we engineer compounding authority across Instagram &amp; YouTube.
          </p>
        </Reveal>
      </div>
      <div className="photo-marquee-wrap" data-cursor="DRAG" style={{ marginTop: 24 }}>
        <Marquee items={marquee} />
        <div style={{ height: 14 }} />
        <Marquee items={trusted} reverse fast />
      </div>
    </section>
  );
}
