// Deep UI/UX audit — measures rendering reality against a running server.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const BASE = process.env.AUDIT_BASE || "http://localhost:3000";
const OUT = "research/deep-audit";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,900"],
});

const routes = [
  { path: "/", vw: 1440, vh: 900, name: "home-desktop" },
  { path: "/", vw: 390, vh: 844, name: "home-mobile" },
  { path: "/work", vw: 1440, vh: 900, name: "work-desktop" },
  { path: "/services", vw: 1440, vh: 900, name: "services-desktop" },
  { path: "/about", vw: 1440, vh: 900, name: "about-desktop" },
  { path: "/contact", vw: 1440, vh: 900, name: "contact-desktop" },
];

const report = {};

for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: route.vw, height: route.vh, deviceScaleFactor: 1 });
  const consoleMsgs = [];
  const failedReq = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(`[${m.type()}] ${m.text().slice(0, 300)}`);
  });
  page.on("pageerror", (e) => consoleMsgs.push(`[pageerror] ${e.message.slice(0, 300)}`));
  page.on("requestfailed", (r) => failedReq.push(`${r.url().split("/").pop().slice(0, 60)} :: ${r.failure()?.errorText}`));

  await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle0", timeout: 45000 });

  // scroll whole page to settle reveals
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const timers = setInterval(() => {
        const h = document.documentElement.scrollHeight;
        window.scrollBy(0, 600);
        total += 600;
        if (total >= h) { clearInterval(timers); window.scrollTo(0, 0); document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in")); resolve(); }
      }, 60);
    });
  });
  await new Promise((r) => setTimeout(r, 800));

  const data = await page.evaluate(() => {
    const doc = document.documentElement;
    const out = {
      viewport: { w: innerWidth, h: innerHeight },
      scrollW: doc.scrollWidth,
      scrollH: doc.scrollHeight,
      bodyFont: getComputedStyle(document.body).fontSize,
      hCount: { h1: document.querySelectorAll("h1").length, h2: document.querySelectorAll("h2").length, h3: document.querySelectorAll("h3").length },
    };

    // Find exact overflow sources (elements wider than viewport)
    const overflows = [];
    const all = document.querySelectorAll("*");
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.width > innerWidth + 2 && r.width > 0) {
        overflows.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && typeof el.className === "string" ? el.className : "").toString().slice(0, 90),
          w: Math.round(r.width),
          vw: innerWidth,
        });
        if (overflows.length > 25) break;
      }
    }
    out.overflowSources = overflows;

    // Images audit
    out.imgs = [...document.images].map((i) => ({
      src: i.src.split("/").pop().slice(0, 40),
      nw: i.naturalWidth,
      nh: i.naturalHeight,
      dispW: Math.round(i.getBoundingClientRect().width),
      loading: i.loading || "eager",
      hasAlt: i.hasAttribute("alt"),
    }));

    // a11y quick hits
    out.a11y = {
      noAltImgs: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
      noNameButtons: [...document.querySelectorAll("button")].filter((b) => { const t = (b.textContent || "").trim(); const aria = b.getAttribute("aria-label"); const title = b.getAttribute("title"); return !t && !aria && !title; }).map((b) => (b.className || "").toString().slice(0, 50)),
      emptyLinks: [...document.querySelectorAll("a")].filter((a) => !(a.textContent || "").trim() && !a.getAttribute("aria-label") && !a.querySelector("img")).length,
    };

    // decorative-layer count (perf)
    out.decorCount = document.querySelectorAll(".hero-glow, [class*='glow'], [class*='orb'], .ring, .grain, .grid-lines, .noise-overlay, .hero-canvas, canvas").length;

    // Font scale survey
    const sizes = {};
    document.querySelectorAll("h1, h2, h3, .display, .lead, p, .stat .num, .kicker").forEach((el) => {
      const fs = parseFloat(getComputedStyle(el).fontSize).toFixed(1);
      sizes[fs] = (sizes[fs] || 0) + 1;
    });
    out.fontSizes = Object.entries(sizes).sort((a, b) => b[1] - a[1]).slice(0, 14);

    // h1 computed style
    out.h1Style = (() => {
      const h1 = document.querySelector("h1");
      if (!h1) return null;
      const cs = getComputedStyle(h1);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, fontFamily: cs.fontFamily.split(",")[0], fontWeight: cs.fontWeight };
    })();

    // Section order with heights
    out.sections = [...document.querySelectorAll("main > *, footer")].map((s, i) => ({
      i,
      tag: s.tagName.toLowerCase(),
      cls: (s.className || "").toString().split(" ").slice(0, 3).join("."),
      h: Math.round(s.getBoundingClientRect().height),
    }));

    // Any element using fixed/vh sizing that could clip
    out.suspiciousFixed = [...document.querySelectorAll("[style*='vh'], .vh, .screen")].map((e) => (e.className || e.tagName).toString().slice(0, 60)).slice(0, 10);

    return out;
  });

  const file = `${OUT}/${route.name}.json`;
  fs.writeFileSync(file, JSON.stringify({ data, consoleMsgs: consoleMsgs.slice(0, 12), failedReq: failedReq.slice(0, 8) }, null, 2));
  report[route.name] = {
    overflow: data.overflowSources.slice(0, 10),
    sectionCount: data.sections.length,
    scrollH: data.scrollH,
    consoleMsgs: consoleMsgs.slice(0, 6),
  };
  await page.close();;
}

await browser.close();
fs.writeFileSync(`${OUT}/_summary.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));