import Link from "next/link";
import Icon from "@/components/core/Icon";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <span className="eyebrow center" style={{ color: "var(--lime)", marginBottom: 16 }}>
          404 — LOCATION UNMAPPED
        </span>
        <h1 className="display" style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.8rem)", marginTop: 12 }}>
          Lost in the <span className="grad-hot">algorithm.</span>
        </h1>
        <p className="lead" style={{ marginTop: 20, color: "var(--ink-2)" }}>
          The page or campaign you requested does not exist or has been archived. Every frame matters — let's get you back on track.
        </p>

        <div style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn--lime btn--lg">
            Return to Homepage <Icon name="arrow" size={18} className="arr" />
          </Link>
          <Link href="/work" className="btn btn--ghost btn--lg">
            View Selected Work
          </Link>
        </div>
      </div>
    </section>
  );
}
