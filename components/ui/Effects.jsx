"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/**
 * Lenis smooth scroll library — desktop + motion-safe only.
 * Exposes window.__lenis for back-to-top smooth scrolling.
 */
function SmoothScroll({ disabled }) {
  useEffect(() => {
    if (disabled) return;
    let lenis = null;
    let raf = 0;
    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenis = new Lenis({
          smoothWheel: true,
          lerp: 0.1,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        });
        window.__lenis = lenis;

        const loop = (t) => {
          lenis.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch {
        /* Fallback: native browser scroll */
      }
    })();

    // Back to top click listener helper
    const handleScrollLinks = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute("href");
      if (targetId === "#main" || targetId === "#hero" || targetId === "#") {
        e.preventDefault();
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleScrollLinks);

    return () => {
      document.removeEventListener("click", handleScrollLinks);
      cancelAnimationFrame(raf);
      try {
        if (lenis) {
          lenis.destroy();
          window.__lenis = null;
        }
      } catch {}
    };
  }, [disabled]);
  return null;
}

/**
 * Custom cursor: 8px dark dot + 32px outer ring with spring follow.
 * Disabled on touch / non-fine pointers and reduced motion.
 */
function Cursor({ disabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      // Spring follow physics (spring damping 0.15)
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [disabled]);

  if (disabled) return null;
  return (
    <>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

/**
 * 2px scroll progress bar at top (accent #2E5BFF).
 */
function Progress({ disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? h.scrollTop / max : 0;
      el.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [disabled]);

  if (disabled) return null;
  return <span ref={ref} className="scroll-progress" aria-hidden="true" />;
}

/**
 * Magnetic pull hover (2–3px toward cursor) for all interactive elements.
 */
function Magnetic({ disabled }) {
  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    if (window.innerWidth < 768) return;

    const selector = ".btn-pill, a.btn-pill, button, .interactive-magnetic";
    const els = [...document.querySelectorAll(selector)].slice(0, 60);

    const cleanups = els.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        // Magnetic pull of 2-3px toward cursor
        const pullX = (dx / (r.width / 2)) * 2.5;
        const pullY = (dy / (r.height / 2)) * 2.5;
        el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      };

      const leave = () => {
        el.style.transform = "";
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);

      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((fn) => fn && fn());
  }, [disabled]);

  return null;
}

/**
 * Page transition: "ORGIX" text fills like water, 1.5s, then reveals page.
 */
function Loader({ disabled }) {
  const [gone, setGone] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setGone(true);
      return;
    }
    // Water fill runs for 1.35s, completes at 1.5s and cleanly unmounts
    const t = setTimeout(() => {
      setGone(true);
    }, 1500);

    return () => clearTimeout(t);
  }, [disabled]);

  if (gone) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      <div className="page-loader-inner">
        <span className="page-loader-word" data-text="ORGIX">
          ORGIX
        </span>
      </div>
    </div>
  );
}

/**
 * Global Color Wipe observer:
 * Automatically activates .is-revealed on .color-wipe elements when they enter viewport.
 */
function ColorWipeObserver({ disabled }) {
  useEffect(() => {
    if (disabled) return;
    const wipes = document.querySelectorAll(".color-wipe:not(.is-revealed)");
    if (!wipes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    wipes.forEach((w) => io.observe(w));
    return () => io.disconnect();
  });

  return null;
}

export default function Effects() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Loader disabled={reduced} />
      <SmoothScroll disabled={reduced} />
      <Cursor disabled={reduced} />
      <Progress disabled={reduced} />
      <Magnetic disabled={reduced} />
      <ColorWipeObserver disabled={reduced} />
      <span className="film-grain" aria-hidden="true" />
    </>
  );
}
