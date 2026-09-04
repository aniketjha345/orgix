# Orgix Media — Deep UI/UX & Design Audit

> **Goal:** bring the site to a "premium $20k" standard.
> **Method:** full code review (all 35+ components, 7,500-line design system), runtime
> measurements against the live dev server (6 routes × desktop/mobile via headless Chrome),
> accessibility + contrast + overflow + console instrumentation, and a conversion-funnel walkthrough.
> **Date:** 2026-09-04 · **Auditor:** automated deep-audit + manual code pass.

---

## 0. Executive summary

| Area | Grade | Verdict |
|---|---|---|
| Visual design system | **A−** | Strong, coherent, genuinely premium tokens. Held back by repetition. |
| Art direction (motion/3D/cursor) | **B+** | Impressive craft; can feel like "lots of shiny things" rather than restraint. |
| Typography | **B** | Great choice of typefaces; **faux-bold weights + two competing type sizes** dilute it. |
| Layout & rhythm | **B−** | Generous and clean, but the homepage is **13,033 px (desktop) / 18,076 px (mobile)** — the conversion CTA is ~10 screens deep. |
| Color | **B+** | Excellent dark theme. Light theme silently *changes the brand* (lime → green). |
| Responsive | **B** | No overflow bugs on the live build. Mobile is 39% longer than desktop and the hero takes 1,447 px. |
| Accessibility | **A−** | Genuinely above average: focus traps, live regions, skip link, reduced-motion, no missing alts. |
| Performance | **B−** | ~84 images, 12+ decorative layers, continuous rAF cursor + 380-particle canvas; heavy for low-end devices. |
| Content & messaging | **B** | Strong claims, but **overlapped proof sections** (two testimonial blocks, three stat moments). |
| Conversion UX | **B−** | Good CTAs, but the sticky need (mobile CTA) was missing; dead-ends exist (careers apply = mailto). |
| Code health | **B−** | 4 orphaned components + their CSS ship to every visitor (dead weight). |
| SEO/Share | **B+** | Solid metadata; missing Twitter card, sub-optimal OG image size. |

**Overall: B+.** This is already an above-average agency site. What stops it from looking
"$20k" is **restraint and coherence** — not more effects. A $20k design feels like every
decision was made *once, deliberately*. The fixes below are mostly **removals and
tightening**, not additions.

---

## 1. What's already working (don't touch)

- **Cohesive design system.** 4 px spacing scale, strict radius family (4/8/16/24/28/full),
  single-hue lime accent, HSL token cadence. This is rare and should be preserved.
- **Owned visual signature.** The *Growth Engine* SVG rail (hero → stats → process),
  the *type marquee*, and the gradient text are a real "brand system", not template décor.
- **Accessibility.** Skip link, keyboard scroll-to-top, focus traps in all three modals
  (command palette, consultation, video lightbox), `aria-live` for the testimonial,
  `prefers-reduced-motion` respected everywhere, focus-visible rings, no image missing alt.
- **Micro-interactions with intent.** Cursor spotlight on cards, pointer-parallax hero,
  spine-edited count-up stats. These are done with restraint (pointer-coarse detection,
  paused on hover) and that's exactly the right instinct.
- **Zero layout bugs on the live build.** No horizontal overflow (the 4,104 px figure in
  `qa-out.txt` came from a **stale `/out` export**, not the dev code), no broken images
  (all Cloudinary URLs verified 200), no console errors across all 6 routes.
- **Data-driven content model.** Everything lives in `data/site.js` — easy to A/B.

---

## 2. P0 — Fix these first (visible "not-finished" signals)

### 2.1 Duplicate numbering reads as a mistake
Two numbering systems collide: the `BrandEngine` rails (`01 · THE ORGIX GROWTH ENGINE`,
`02 · COMPOUNDING METRICS`, `04 · THE 6-STEP GROWTH ENGINE`) and the `SectionHead`
indexes (`02 — CASE STUDIES`, `03 — SERVICES` …). Adjacent bands printed **two "02"s**
in a row, and on `/services` the process section said `02 —` while its engine rail still
said `04 —`. ✅ **Fixed in this pass** — the stats rail is now unnumbered and `Process`
accepts an explicit `engine` label so `/services` reads `02`.

### 2.2 Faux-bold fonts
`layout.jsx` loaded Space Grotesk 500/700 and Manrope 400/500/700, but the CSS uses
`font-weight: 600` and `800` in ~30 places. Browsers **synthesize** those from 700 —
fake bold is one of the fastest "template tells" on the internet.
✅ **Fixed** — 600 added to Space Grotesk; 600 + 800 added to Manrope.

### 2.3 Mobile CTA behavior
The sticky bottom action bar was evaluated and removed per user feedback because it was floating persistently across all pages on mobile view and obstructing page content. The header mobile drawer and inline page CTAs provide ample conversion points.

### 2.4 Dead code shipping to every visitor
`TransformationSlider.jsx` (14 KB), `GrowthSimulator.jsx` (9.5 KB), `Manifesto.jsx`,
`Pillars.jsx`, `SoundToggle.jsx` are **never imported**. Their CSS (~500+ lines incl.
`.trans-*, .sim-*, .sound-*, .manifesto-*, .pillar-*`) still loads on every page.
➡️ **Next step:** either wire them in or delete them — a half-built "interactive
simulator" that nobody sees is a strong signal the site isn't finished. (Not deleted in
this pass — they may be planned content. Decide deliberately, then commit.)

---

## 3. P1 — Structure & rhythm (the "premium vs padded" difference)

### 3.1 The homepage is too long and repeats itself
`/` = 15 sections, **13,033 px desktop / 18,076 px mobile** (premium agency sites rarely exceed 10).

The doubling is visible:
- **Two** giant type-marquee strips (top + bottom) *and* **two** photo-marquee rows inside TrustedBy.
- **Two testimonial blocks back-to-back**: `VideoTestimonials` then `Testimonials`.
- **Three stat moments** in the first half: hero chips, stats band, wall counts.

**Recommended moves:**
1. Keep one type-marquee as a single bookend (top *or* bottom).
2. Merge the two testimonial blocks into one section with two views (tab: "Video Proof / Written Reviews") — half the length, same content.
3. Cut one stat moment; the work-wall counts are the strongest (per-client).
4. TrustedBy's two marquees reuse the same faces as the hero + wall. Consolidate to **one** marquee with a distinct cast so the roster feels bigger.

### 3.2 First fold is crowded
Hero stacks: badge + headline + lead + 2 CTAs + avatar proof + **3D particle canvas** + **grid lines** + **2 glows** + **orb** + **2 rings** + **3 floating chips** + collage + engine rail + scroll cue. Each element is tasteful; together they're a crowd. **Recommendation:** on first view, pause particles after initial animation, dim the orbiting ring, cap chips to two. Let the headline + collage own the first 800 ms.

### 3.3 Section numbering must match real order on every page
Subpages reuse components with hardcoded indexes that don't match their actual position. ✅ Partially fixed (stats rail + services engine label). Keep the rule: **indexes must match the real order**, or drop numbers on non-home pages.

---

## 4. P2 — Craft details a $20k eye will catch

### 4.1 Light theme silently rebrands the site
Dark mode's identity is the **lime** accent (`hsl(75 88% 62%)`). Light mode overrides it to **green** (`#16a34a`) and swaps all gradients to green/indigo. Same wordmark, two different brands. Options: (a) keep lime in light mode but darken it deliberately to ~`hsl(75 70% 45%)` and reuse the same hue family, or (b) drop the light-mode toggle and be a dark-first studio site (many premium dark brands do exactly this).

### 4.2 Marginal contrast spots
- `--ink-4` `hsl(240 4% 42%)` ≈ **3.6 : 1** — used for 11 px mono role labels (`.member .role-t`, `.engine-band-bases`). Below AA for normal text. Raise to ~`hsl(240 5% 52%)`.
- `.eyebrow`/`.mini-tag` lime at 10–11 px on violet fills is fine on dark but verify after any light-mode change.

### 4.3 Images
All images go through Cloudinary `f_auto,q_auto` (good), but the page never calls `next/image`, so boxes can flicker and there's no `srcset`. For a static Cloudinary setup this is acceptable; biggest win would be `&w=` srcset variants for the work-wall cards.

### 4.4 Low-effort, high-polish wins
- Career posts open a `mailto` — fine, but add a "prefer WhatsApp?" line next to it.
- Header CTA cluster on mobile (theme + ⌘K + burger) is 3 icon buttons — consider moving ⌘K to footer only.
- OG image is a 512×512 PNG; a 1200×630 type-lockup would lift social shares.
- `qa-out.txt` / `research/shots/*.png` are **stale** (report a 4,104 px overflow + ChunkLoadError from an old `/out`). Re-run before any pitch.

---

## 5. P3 — Performance budget

| Item | Current | Note |
|---|---|---|
| Decor layers on home | **12+** | Each `backdrop-filter`/`blur` costs paint time on mobile. |
| Hero particle canvas | 380 particles @ DPR≤2, rAF | Respects reduced-motion; add off-screen pause (reuse IntersectionObserver pattern from Stats). |
| Custom cursor | continuous rAF ring easing | Fine-pointer + reduced-motion gated — correct. |
| Fonts | 3 families, now 5/6 weights | ~15–25 KB extra after the weight fix — worth it; `next/font` handles preconnect. |
| Images | 84 on home | All lazy except avatar stack + logo; Cloudinary `q_auto` shrinks payload. |

**Biggest single TBT win:** an `IntersectionObserver` that pauses the hero canvas + cursor ring when the tab is hidden or the hero is off-screen.

---

## 6. What changed in this pass (ready to verify)

1. ✅ **Font weights:** `Space Grotesk 500/600/700`, `Manrope 400/500/600/700/800` — no more synthetic bold (`app/layout.jsx`).
2. ✅ **Twitter card metadata** added (`app/layout.jsx`).
3. ✅ **Stats rail unnumbered** — removes the duplicate "02" collision (`Stats.jsx`); About page numbering is a clean 01→06.
4. ✅ **`Process` accepts an `engine` label**; `/services` reads `02 · THE 6-STEP GROWTH ENGINE` (`Process.jsx`, `services/page.jsx`).
5. ✅ **Sticky mobile CTA bar removed**: Disabled floating bar that was covering content across mobile pages.
6. ✅ **Mobile hero tightened**: paddings, gaps, margins reduced for a faster first fold (desktop untouched).

---

## 7. Recommended next moves (ranked by ROI)

1. **Decide the dead-feature fate** (§2.4) — wire in or delete; then rebuild `/out`.
2. **Merge the two testimonial blocks** (§3.1.2) — single biggest page-length cut, zero content loss.
3. **Do the light-theme decision** (§4.1) — true lime-scaled light mode or dark-only.
4. **Raise `--ink-4` contrast** (§4.2).
5. **Regenerate the static export + QA** before showing anyone: `npm run export` then `QA_BASE=http://localhost:3211 node scripts/qa.mjs`.
6. **Pause hero canvas & cursor off-screen** (P3) for a TBT win.

---

*Tooling: headless-Chrome instrumentation (`research/deep-audit/*.json`), static analysis of all components + CSS, Cloudinary URL verification, Lighthouse-style manual checks. Review screenshots in `research/shots/review/`.*