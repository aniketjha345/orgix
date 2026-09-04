"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal — fades/slides children in when scrolled into view.
 * dir: "up" | "left" | "right" · delay: seconds
 */
export default function Reveal({ children, dir = "up", delay = 0, className = "", as: Tag = "div", style, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["reveal", dir === "left" ? "reveal--l" : dir === "right" ? "reveal--r" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={cls} style={{ "--d": `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
