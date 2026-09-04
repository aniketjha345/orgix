import Reveal from "@/components/core/Reveal";
import Icon from "@/components/core/Icon";
import CtaSection from "@/components/ui/CtaSection";
import { company } from "@/data/site";

export const metadata = {
  title: "Careers — Join Orgix Media | India's Personal Branding Studio",
  description:
    "Join our team of 25–30 creators, scriptwriters, video editors and strategists at Orgix Media in Delhi. Explore open positions and build digital legacies.",
};

const jobs = [
  {
    title: "Senior High-Retention Video Editor",
    type: "Full-Time · Studio (Rohini, Delhi)",
    exp: "2+ Years Experience",
    tags: ["Premiere Pro", "After Effects", "Sound Design", "Pacing & Storytelling"],
    desc: "Transform raw footage into scroll-stopping, high-retention reels and long-form YouTube videos. You understand pacing, visual cues, sound design, and how to hold cognitive attention.",
  },
  {
    title: "Viral Scriptwriter & Researcher",
    type: "Full-Time / Part-Time · Hybrid / Delhi",
    exp: "1+ Years Experience",
    tags: ["Hook Architecture", "Deep Research", "Finance / Tech / D2C", "Storytelling"],
    desc: "Turn complex expertise into punchy, compelling 60-second reels and 10-minute video essays. You know how to structure an open loop and write scripts that retain 60%+ viewers.",
  },
  {
    title: "Social Media Growth & Community Lead",
    type: "Full-Time · Delhi HQ",
    exp: "1–3 Years Experience",
    tags: ["Instagram Growth", "YouTube Analytics", "DM Automation", "Lead Funnels"],
    desc: "Manage posting schedules, SEO metadata, engagement strategies, and inbound lead funnels across our roster of founders and creators.",
  },
  {
    title: "Shoot Director & Cinematographer",
    type: "Full-Time · Delhi Studio",
    exp: "2+ Years Experience",
    tags: ["Sony Alpha / FX", "Studio Lighting", "Directing Talent", "Shot Planning"],
    desc: "Direct our 2-day monthly studio shoot batches. Guide camera-shy founders, set cinematic lighting, and ensure crisp audio & visuals for 30 days of client content.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Job Openings Section */}
      <section className="section" id="openings" style={{ paddingTop: "clamp(130px, 15vw, 180px)" }}>
        <div className="container">
          <Reveal style={{ maxWidth: 700, marginBottom: 44 }}>
            <span className="eyebrow">01 — OPEN ROLES</span>
            <h1 className="display" style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.6rem)", marginTop: 14, letterSpacing: "-0.025em" }}>
              Current <span className="grad-brand">opportunities.</span>
            </h1>
            <p className="lead" style={{ marginTop: 12 }}>
              Don't see your exact title? If you're an exceptional creator, editor or writer, send us your portfolio anyway.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {jobs.map((job, idx) => (
              <Reveal delay={idx * 0.08} key={job.title}>
                <article className="card shine" style={{ padding: "clamp(20px, 2.5vw, 30px)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                    <div>
                      <h3 className="display" style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", letterSpacing: "-0.02em" }}>
                        {job.title}
                      </h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8, fontSize: 13.5, color: "var(--ink-3)" }}>
                        <span style={{ color: "var(--lime)", fontWeight: 600 }}>{job.type}</span>
                        <span>•</span>
                        <span>{job.exp}</span>
                      </div>
                    </div>

                    <a
                      href={`mailto:${company.email}?subject=Job Application: ${encodeURIComponent(job.title)}&body=Hi Orgix Team,%0D%0A%0D%0AI would like to apply for the ${encodeURIComponent(job.title)} role.%0D%0A%0D%0AMy Portfolio / Resume Link:%0D%0AMy Phone Number:%0D%0AWhy I am a great fit:%0D%0A`}
                      className="btn btn--lime btn--sm"
                    >
                      Apply Now <Icon name="arrow" size={15} className="arr" />
                    </a>
                  </div>

                  <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.75, maxWidth: 840, marginBottom: 20 }}>
                    {job.desc}
                  </p>

                  <div className="tag-row">
                    {job.tags.map((t) => (
                      <span className="mini-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection index="02" kicker="SPONTANEOUS APPLICATION" />
    </>
  );
}
