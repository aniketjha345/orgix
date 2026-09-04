// Deep debug: computed layout of hero chain + marquee + engine.
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3001/";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 800));

const report = await page.evaluate(() => {
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel,
      w: Math.round(r.width),
      right: Math.round(r.right),
      left: Math.round(r.left),
      position: cs.position,
      width: cs.width,
      display: cs.display,
      gridCols: cs.gridTemplateColumns,
      overflowX: cs.overflowX,
    };
  };
  return {
    docSW: document.documentElement.scrollWidth,
    bodySW: document.body.scrollWidth,
    hero: info(".hero"),
    grid: info(".hero-grid"),
    stage: info(".hero-stage"),
    cardA: info(".hero-card--a"),
    cardB: info(".hero-card--b"),
    engine: info(".engine--hero"),
    marquee: info(".type-marquee"),
    marqueeTrack: info(".type-marquee-track"),
    wallpaper: info(".hero-3d-canvas"),
    photoWrap: info(".photo-marquee-wrap"),
    photoBand: info(".marquee-band"),
    track: info(".marquee-track"),
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();