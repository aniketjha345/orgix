import Reveal from "@/components/core/Reveal";

export default function SectionHead({
  index,
  kicker,
  eyebrow,
  title,
  lead,
  center = false,
  className = "",
}) {
  const formattedKicker = index
    ? `${index} — ${kicker || eyebrow || ""}`
    : kicker || eyebrow;

  return (
    <Reveal className={`section-head ${center ? "section-head--center" : ""} ${className}`}>
      {formattedKicker && (
        <span className={`eyebrow ${center ? "center" : ""}`}>
          {formattedKicker}
        </span>
      )}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
