import Link from "next/link";
import Icon from "@/components/core/Icon";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        {/* The Director — even he can't cut to this scene */}
        <div style={{ marginBottom: 20 }} aria-hidden="true">
          <img
            src="/images/figurines/director.webp"
            alt=""
            width={112}
            height={144}
            className="w-28 h-36 object-contain mx-auto opacity-90"
            style={{ filter: "drop-shadow(0 18px 30px rgba(15,26,46,0.16))" }}
          />
        </div>

        <span className="eyebrow center" style={{ color: "var(--accent)", marginBottom: 16 }}>
          404 — OFF-SCRIPT
        </span>
        <h1
          className="display"
          style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.8rem)", marginTop: 12 }}
        >
          Even The Director{" "}
          <span className="grad-hot">can&rsquo;t cut to this scene.</span>
        </h1>
        <p className="lead" style={{ marginTop: 20, color: "var(--ink-soft)" }}>
          The page or campaign you requested doesn&rsquo;t exist or has been archived.
          Every frame matters — let&rsquo;s get you back on track.
        </p>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
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