"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";

/**
 * Context to allow child components within <Section> to synchronize with section reveal
 */
export const SectionRevealContext = createContext({ isRevealed: false });
export const useSectionReveal = () => useContext(SectionRevealContext);

/**
 * Section — Implements non-negotiable Orgix Media layout & motion rules:
 * - Every <section> is min-height 100svh, CSS grid centered, padding clamp(96px, 14vh, 180px) 6vw
 * - ONE headline, ONE paragraph (max 2 lines), ONE visual per section.
 * - Max content width 1200px. Alternate --bg / --bg-alt between sections.
 * - html { scroll-snap-type: y proximity } section { scroll-snap-align: start }
 * - Reveal: opacity 0→1, translateY 24px→0, 600ms, cubic-bezier(.2,.8,.2,1), stagger 80ms
 * - Visuals scale .92→1 on enter
 * - Strict prefers-reduced-motion respect (no transforms, no transitions, immediate reveal)
 */
export default function Section({
  id,
  bgAlt = false,
  kicker,
  headline,
  asH1 = false,
  paragraph,
  actions,
  visual,
  visualPosition = "right", // "right" | "left" | "center"
  className = "",
  children,
  ...rest
}) {
  const sectionRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check prefers-reduced-motion or immediate visibility
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsRevealed(true);
        return;
      }

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.25) {
        setIsRevealed(true);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "180px 0px",
      }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const revealedClass = isRevealed ? "is-revealed" : "";
  const bgClass = bgAlt ? "section-bg-alt" : "section-bg";

  // If structured props (headline/visual) are not passed, render as wrapper for children
  const hasStructuredContent = headline || visual || paragraph || kicker || actions;

  return (
    <SectionRevealContext.Provider value={{ isRevealed }}>
      <section
        ref={sectionRef}
        id={id}
        className={`editorial-section ${bgClass} ${revealedClass} ${className}`}
        {...rest}
      >
        <div className="editorial-container">
          {hasStructuredContent ? (
            visualPosition === "center" ? (
              /* Centered layout: kicker, headline, paragraph, actions, full-width visual */
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
                {kicker && (
                  <span className={`editorial-kicker reveal-item reveal-stagger-1 ${revealedClass}`}>
                    {kicker}
                  </span>
                )}

                {asH1 ? (
                  <h1 className={`display-h1 mb-6 reveal-item reveal-stagger-1 ${revealedClass}`}>
                    {headline}
                  </h1>
                ) : (
                  <h2 className={`display-h2 mb-6 reveal-item reveal-stagger-1 ${revealedClass}`}>
                    {headline}
                  </h2>
                )}

                {paragraph && (
                  <p className={`editorial-lead mb-8 reveal-item reveal-stagger-2 ${revealedClass}`}>
                    {paragraph}
                  </p>
                )}

                {actions && (
                  <div className={`btn-actions-row justify-center mb-8 reveal-item reveal-stagger-3 ${revealedClass}`}>
                    {actions}
                  </div>
                )}

                {visual && (
                  <div className={`w-full reveal-visual mt-4 ${revealedClass}`}>
                    {visual}
                  </div>
                )}

                {children}
              </div>
            ) : (
              /* Split 2-column layout: Text on one side, ONE visual on the other */
              <div className="editorial-grid">
                {/* Text column: ONE headline, ONE paragraph (max 2 lines), optional actions */}
                <div
                  className={`flex flex-col items-start justify-center order-1 ${
                    visualPosition === "left" ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {kicker && (
                    <span className={`editorial-kicker reveal-item reveal-stagger-1 ${revealedClass}`}>
                      {kicker}
                    </span>
                  )}

                  {asH1 ? (
                    <h1 className={`display-h1 mb-4 sm:mb-6 text-left reveal-item reveal-stagger-1 ${revealedClass}`}>
                      {headline}
                    </h1>
                  ) : (
                    <h2 className={`display-h2 mb-4 sm:mb-6 text-left reveal-item reveal-stagger-1 ${revealedClass}`}>
                      {headline}
                    </h2>
                  )}

                  {paragraph && (
                    <p className={`editorial-lead text-left reveal-item reveal-stagger-2 ${revealedClass}`}>
                      {paragraph}
                    </p>
                  )}

                  {actions && (
                    <div className={`btn-actions-row reveal-item reveal-stagger-3 ${revealedClass}`}>
                      {actions}
                    </div>
                  )}
                </div>

                {/* Visual column: ONE visual per section */}
                <div
                  className={`w-full flex items-center justify-center order-2 ${
                    visualPosition === "left" ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className={`w-full max-w-[560px] reveal-visual ${revealedClass}`}>
                    {visual}
                  </div>
                </div>

                {children}
              </div>
            )
          ) : (
            /* Wrapper mode: renders children directly inside 1200px grid-centered container */
            <div className={`w-full max-w-full min-w-0 reveal-item ${revealedClass}`}>{children}</div>
          )}
        </div>
      </section>
    </SectionRevealContext.Provider>
  );
}
