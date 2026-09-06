# Orgix Media — Design System (Antigravity-style editorial minimal · Full Rebrand)

## Colours (CSS vars in :root)
--bg: #F6F4EF  --bg-alt: #ECE9E2  --ink: #0F1A2E  --ink-soft: #5B6472
--accent: #2E5BFF (links/hover ONLY)  --line: rgba(15, 26, 46, 0.12)

## Type
Display: "Instrument Sans" (Google Fonts), weight 500, letter-spacing -0.03em, line-height .95
Body: "Inter", weight 400, line-height 1.5
Quotes: "Playfair Display" italic — testimonials ONLY
--h1: clamp(56px, 9vw, 144px)  --h2: clamp(36px, 5vw, 72px)  --body: clamp(17px, 1.2vw, 20px)

## Shape
Cards: white #FFFFFF, radius 24px. Buttons pill (999px), 14px 28px padding. Primary = --ink bg / white text (hover #1A2440). Ghost = transparent + 1px --line border.
Dark closer: final CTA + footer on --ink (#0F1A2E), white text, white pill button (ink text).
Device mockups: 24px radius, 1px --line border, soft shadow 0 30px 80px rgba(15,26,46,.10)

## Layout rules (non-negotiable)
- Every <section> is min-height 100svh, CSS grid centered, padding clamp(96px,14vh,180px) 6vw
- ONE headline, ONE paragraph (max 2 lines), ONE visual per section. Never more.
- Max content width 1200px. Alternate --bg / --bg-alt between sections.
- html { scroll-snap-type: y proximity } section { scroll-snap-align: start } — NEVER mandatory, NEVER JS scroll-jacking.

## Motion
- Reveal: opacity 0→1, translateY 24px→0, 600ms, cubic-bezier(.2,.8,.2,1), stagger 80ms. Use IntersectionObserver or CSS scroll-driven animations. No GSAP unless already in the project.
- Visuals scale .92→1 on enter.
- Hero: canvas particle ring (see /components/ParticleRing). ≤ 50KB JS total.
- Everything respects @media (prefers-reduced-motion: reduce): no particles, no snap, no transforms.

## Performance
Lighthouse 90+ all categories. LCP < 2.5s. Videos lazy-loaded, muted, playsinline, poster image. Fonts preloaded with display=swap.

## Don't
No gradients, no neon, no stock photos, no icons-in-circles, no more than one accent colour, no Google logos/copy/assets.
