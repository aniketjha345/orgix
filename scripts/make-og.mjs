// Generates public/images/og/orgix-og.png — a 1200×630 type-lockup for
// social shares, using the site's own dark canvas + lime accent system.
// Run: node scripts/make-og.mjs
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images", "og", "orgix-og.png");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Manrope:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
  .stage {
    position: relative; width: 1200px; height: 630px;
    background: #07060c;
    font-family: "Manrope", sans-serif;
    display: flex; align-items: center;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(ellipse 90% 120% at 30% 40%, black 30%, transparent 75%);
  }
  .glow-a { position: absolute; width: 640px; height: 640px; top: -220px; left: -140px;
    background: radial-gradient(circle, rgba(139,92,246,0.30), transparent 65%); }
  .glow-b { position: absolute; width: 560px; height: 560px; bottom: -240px; right: -100px;
    background: radial-gradient(circle, rgba(200,240,77,0.14), transparent 65%); }
  .content { position: relative; padding: 0 84px; max-width: 860px; }
  .brandline {
    display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
    font-family: "JetBrains Mono", monospace; font-size: 15px; letter-spacing: 0.32em;
    color: rgba(255,255,255,0.72); text-transform: uppercase;
  }
  .dot { width: 12px; height: 12px; border-radius: 999px; background: #c8f04d;
    box-shadow: 0 0 18px rgba(200,240,77,0.9); }
  h1 {
    font-family: "Bricolage Grotesque", sans-serif; font-weight: 700;
    font-size: 92px; line-height: 1.02; letter-spacing: -0.03em; color: #ffffff;
  }
  .accent {
    background: linear-gradient(135deg, #ffffff 10%, #e5f872 55%, #bbf447 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sub { margin-top: 34px; font-size: 24px; font-weight: 500; color: rgba(255,255,255,0.66); max-width: 700px; line-height: 1.5; }
  .sub b { color: rgba(255,255,255,0.92); font-weight: 700; }
  .badges { display: flex; gap: 12px; margin-top: 40px; }
  .badge {
    font-family: "JetBrains Mono", monospace; font-size: 15px; letter-spacing: 0.14em;
    color: #c8f04d; border: 1px solid rgba(200,240,77,0.35); background: rgba(200,240,77,0.08);
    padding: 10px 18px; border-radius: 999px; white-space: nowrap;
  }
  .badge.violet { color: #b9a5ff; border-color: rgba(139,92,246,0.4); background: rgba(139,92,246,0.1); }
  .ring { position: absolute; right: 60px; top: 90px; width: 420px; height: 420px; opacity: 0.9; }
</style>
</head>
<body>
<div class="stage">
  <div class="glow-a"></div>
  <div class="glow-b"></div>
  <div class="grid"></div>
  <svg class="ring" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="210" cy="210" rx="200" ry="64" transform="rotate(-24 210 210)" stroke="rgba(200,240,77,0.4)" stroke-width="2" stroke-dasharray="4 10"/>
    <ellipse cx="210" cy="210" rx="160" ry="160" transform="rotate(-24 210 210)" stroke="rgba(139,92,246,0.35)" stroke-width="2"/>
    <circle cx="210" cy="210" r="86" fill="rgba(139,92,246,0.16)"/>
    <circle cx="210" cy="210" r="3.5" fill="#c8f04d"/>
    <circle cx="365" cy="130" r="6" fill="#c8f04d"/>
    <circle cx="78" cy="292" r="5" fill="#8b5cf6"/>
  </svg>
  <div class="content">
    <div class="brandline"><span class="dot"></span> ORGIX MEDIA · DELHI</div>
    <h1>Build the brand<br><span class="accent">behind you.</span></h1>
    <div class="sub">India's personal branding studio for <b>founders &amp; creators</b> — organic Instagram &amp; YouTube growth engines.</div>
    <div class="badges">
      <span class="badge">1B+ VIEWS</span>
      <span class="badge violet">85+ CREATORS SCALED</span>
      <span class="badge">100% ORGANIC</span>
    </div>
  </div>
</div>
</body>
</html>`;

mkdirSync(dirname(OUT), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0", timeout: 45000 });
await new Promise((r) => setTimeout(r, 800)); // let webfonts settle
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("saved " + OUT);
