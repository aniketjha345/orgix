"use client";

/**
 * SECTION 2 — SOCIAL PROOF BAR (20vh):
 * Marquee scroll of 5 client names/photos in greyscale.
 * "Trusted by creators with 500K+ combined following"
 * Hover: individual photo goes colour + scale(1.05)
 */
import { imgSrc } from "@/data/site";

const CLIENTS_5 = [
  {
    name: "Pari Jain",
    handle: "@officialparijain",
    followers: "129K+",
    img: "/images/founders/pari-jain.jpg",
  },
  {
    name: "Taranveer Jaura",
    handle: "@techknowbee",
    followers: "280K+",
    img: "/images/creators/taranveer-jaura.jpg",
  },
  {
    name: "Akash Pandey",
    handle: "@growithakash",
    followers: "120K+",
    img: "/images/creators/akash-pandey.jpg",
  },
  {
    name: "CA Jyoti Goyal",
    handle: "@ca.jyotigoyal",
    followers: "36.7K+",
    img: "/images/creators/jyoti-goyal.jpg",
  },
  {
    name: "Demla Brothers",
    handle: "@demlabrothers",
    followers: "23.1K+",
    img: "/images/creators/demla-brothers.jpg",
  },
];

function ClientItem({ client, hidden }) {
  return (
    <div className="creator-marquee-item group" aria-hidden={hidden || undefined}>
      <img
        src={imgSrc(client.img)}
        alt={hidden ? "" : `${client.name} — ${client.handle}`}
        className="w-11 h-11 rounded-full object-cover border border-line grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
        loading="lazy"
      />
      <span className="creator-marquee-meta">
        <b className="text-ink font-display text-[14px] font-medium">{client.name}</b>
        <span className="text-[12px] text-ink-soft">
          {client.handle} · {client.followers}
        </span>
      </span>
    </div>
  );
}

export default function CreatorMarquee() {
  // Triple the 5 clients to ensure silky seamless infinite marquee
  const track = [...CLIENTS_5, ...CLIENTS_5, ...CLIENTS_5];

  return (
    <div
      id="manifesto-proof"
      className="creator-marquee min-h-[20vh] flex flex-col justify-center py-6 select-none"
      aria-label="Trusted creators"
    >
      <p className="creator-marquee-label mb-4 text-center font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-ink-soft">
        Trusted by creators with 500K+ combined following
      </p>
      <div className="creator-marquee-viewport">
        <div className="creator-marquee-track flex gap-10">
          {track.map((c, i) => (
            <ClientItem key={`${c.handle}-${i}`} client={c} hidden={i >= CLIENTS_5.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
