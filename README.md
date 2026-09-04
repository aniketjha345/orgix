# Orgix Media — Next-Level Redesign

A complete redesign of [orgixmedia.com](https://orgixmedia.com/) — India's personal branding
agency — built to win the pitch. Dark premium canvas, lime/violet/IG-gradient system,
Space Grotesk display type, scroll-reveal motion, animated counters, infinite marquees,
pointer-parallax hero collage and a fully working contact flow.

Built with **Next.js 16 (App Router)** + handcrafted CSS. No Tailwind, no UI-kit bloat —
every pixel is custom. Content lives in one editable file (`data/site.js`), so text,
photos, stats and even whole case studies can be swapped without touching components.

## What's inside

| Route      | Highlights |
| ---------- | ---------- |
| `/`        | Hero w/ parallax collage, creator marquees, animated stat counters, case-study wall, 6-step Growth Engine, service cards, testimonial slider, leadership, FAQ accordion, CTA panel |
| `/work`    | Filterable wall of all 14 client stories (Founders / Creators / Brands) with hover "what we did" reveals |
| `/services`| Deep-dive on Instagram & YouTube management + audience cards + full process + FAQ |
| `/about`   | Studio story, animated stats, values, quote card, leadership team |
| `/contact` | Working form — tries `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree / your future `/api/contact`) → pre-filled email fallback. 100% JavaScript, no PHP. |
| `/media`   | Internal media desk — drag & drop images/videos straight into your Cloudinary (`orgix-media/…`), copy the CDN URL, paste into `data/site.js`. |

Full-page screenshots of every route are in **`preview/`** (desktop + mobile home).

## Run it locally

```bash
npm install
npm run dev        # → http://localhost:3000
```

## Production builds

```bash
npm run build      # full Next.js server build (VPS / Vercel / Node host)
npm start          # serve the production build
```

```bash
npm run export     # → 100% static site in /out (shared hosting, cPanel, S3, Netlify…)
```

`npm run export` produces plain HTML/CSS/JS — just upload the `/out` folder to any shared
hosting (Hostinger, GoDaddy, cPanel…) and it works with zero server requirements.
That's the two-in-one trick: **VPS-ready server build + shared-hosting-ready static export**
from the same codebase.

## Is it really “dynamic” on shared hosting?

Yes. Every interactive feature — work-wall filters, testimonial slider, animated
counters, marquees, FAQ accordion, scroll reveals and the contact form — runs
client-side in the browser with zero server requirements. `npm run export` produces
plain HTML/CSS/JS that behaves identically on Hostinger shared hosting, a $5 VPS,
or S3. There is no server-side dependency to break.

## Deploy

### Hostinger / cPanel shared hosting (quickest)

1. `npm run export` → generates the fully static site in `/out`.
2. In Hostinger's File Manager, open `public_html` and **upload everything inside `/out`**.
3. Done — clean URLs work out of the box (`/work/`, `/about/`, …) because routes are
   exported as `index.html` files (`trailingSlash` is already configured).
4. No PHP anywhere. For mail, set `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree/Web3Forms)
   and rebuild — or wait for the `/api/contact` route when the admin/CMS goes live.

### VPS / cloud

1. `npm run build`, then run with PM2 or systemd:
   `pm2 start "npm run start" --name orgix`. Put it behind Nginx.

### Vercel / Netlify

Connect the repo — build command `npm run build`. (Static export also works as a
plain upload there.)

## Making the contact form actually send mail

The form tries two delivery methods in order — no config needed unless you want method 1:

1. **Your JSON endpoint** — set
   `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx` (Formspree, Web3Forms,
   Make, etc.) and rebuild. Posts JSON `{ name, email, handle, niche, goals, message }`.
   This is also the exact shape a future `/api/contact` route (admin-panel CMS build)
   will accept.
2. **Mail app fallback** — if the endpoint is missing/unreachable, it opens a
   pre-filled email to `info@orgixmedia.com`. The enquiry can never be lost.

> **Stack note:** the project is 100% JavaScript. The old `public/form.php` mailer has
> been removed to keep the codebase clean for the upcoming full-stack admin-panel /
> CMS phases (Next.js API routes + database).

## Editing content

Open **`data/site.js`** — it holds every client, case study, stat, process step, service
feature, testimonial, team member and FAQ.

## Media on Cloudinary

All 51 site images live in the Cloudinary cloud **`dwjr5yrir`** under the
**`orgix-media/`** folder and are served through the CDN with automatic format/quality
optimization (`f_auto,q_auto`). Local copies remain in `public/images/` as source
originals (set `NEXT_PUBLIC_MEDIA_LOCAL=1` to serve those instead).

- **Re-upload after changing images:** `node scripts/upload-media.mjs` — uses the
  unsigned preset `orgix_web` (folder `orgix-media`), so no API secret is needed.
- **Add new media from the browser:** open `/media` on the live site and drop files in —
  they upload directly to your Cloudinary, and you can copy the ready CDN URL into
  `data/site.js`.
- **Env keys** (optional): `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`,
  `NEXT_PUBLIC_CLOUDINARY_PRESET`. See `.env.example`.

Security notes: the unsigned preset only permits uploads inside `orgix-media/…`;
no secret ever ships to the browser. Admin credentials are used only by migration
scripts via `CLOUDINARY_URL` env (see `.env.example`) and are git-ignored.

## Visual QA

Screenshots are regenerated with a headless-Chrome script (checks overflow, broken images,
404s and console errors against desktop + mobile):

```bash
node scripts/qa.mjs                              # against a local server on :3210
QA_BASE=http://localhost:3211 node scripts/qa.mjs # against any other origin (e.g. static export)
```

Requires Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe` (edit `CHROME`
in `scripts/qa.mjs` for other OS paths).

---

**Note:** all photos belong to the creators/brands shown and were pulled from
orgixmedia.com for this redesign demo. Swap in final approved assets before launch.
