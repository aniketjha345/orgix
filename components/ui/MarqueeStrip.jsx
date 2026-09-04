/**
 * MarqueeStrip — oversized editorial "typography moment".
 * Giant uppercase display words scrolling in a loop; alternate words are
 * outlined in lime for that expensive, owned type-system feel.
 */
const DEFAULTS = [
  "ORGANIC GROWTH ENGINE",
  "100% ORGANIC",
  "ZERO AD SPEND",
  "COMPOUNDING AUTHORITY",
  "1,000,000,000+ VIEWS",
  "NO TRENDS. NO NOISE.",
];

export default function MarqueeStrip({
  words = DEFAULTS,
  reverse = false,
  className = "",
}) {
  if (!Array.isArray(words) || words.length === 0) return null;
  const seq = [...words, ...words];

  return (
    <div
      className={`type-marquee ${reverse ? "type-marquee--reverse" : ""} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="type-marquee-track">
        {seq.map((w, i) => (
          <span className={`type-marquee-word ${i % 2 ? "type-marquee-word--outline" : ""}`} key={`${w}-${i}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}