"use client";

import { useEffect, useRef, useState } from "react";
import BrandEngine from "../ui/BrandEngine";
import { stats } from "@/data/site";

function CountUp({ to, suffix, decimals = 0, duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const fmt = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  const display = `${fmt}${suffix}`;

  return (
    <span
      ref={ref}
      className="num grad-hot"
      aria-live="off"
      aria-label={display}
    >
      {display}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="container">
        <BrandEngine label="COMPOUNDING METRICS" />
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat" key={s.label}>
              <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              <div className="lbl">{s.label}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
