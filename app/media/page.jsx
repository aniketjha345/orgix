import PageHero from "@/components/ui/PageHero";
import MediaUploader from "@/components/media/MediaUploader";
import Reveal from "@/components/core/Reveal";

export const metadata = {
  title: "Orgix Media — Media Desk",
  description: "Internal media upload desk for the Orgix website.",
  robots: { index: false, follow: false },
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media desk"
        kicker="Internal tool"
        title={
          <>
            Ship media <span className="grad-hot">straight to the cloud.</span>
          </>
        }
        lead="Drop new client portraits, case-study photos or brand videos here. Files land in your Cloudinary under orgix-media/… and the website serves them through the CDN — automatically compressed and optimized."
      />

      <section className="section section--tight">
        <div className="container" style={{ maxWidth: 860 }}>
          <Reveal>
            <MediaUploader />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card" style={{ padding: 22, marginTop: 26, fontSize: 13.5, color: "var(--ink-3)" }}>
              <b style={{ color: "var(--ink-2)" }}>How to use an uploaded file on the site:</b> press
              “Copy URL” after upload, then open <span className="mono">data/site.js</span> and paste
              the URL into any client’s <span className="mono">img</span> field. The homepage, work
              wall and services pages all read from that one file — no code changes needed.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
