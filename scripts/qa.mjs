// Visual QA: checks layout/console errors per route and captures screenshots.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const BASE = process.env.QA_BASE || "http://localhost:3001";
const OUT = "research/shots";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const routes = [
  { path: "/", file: "home", viewports: [{ w: 1440, h: 900, name: "desktop" }, { w: 390, h: 844, name: "mobile" }] },
  { path: "/work", file: "work", viewports: [{ w: 1440, h: 900, name: "desktop" }] },
  { path: "/services", file: "services", viewports: [{ w: 1440, h: 900, name: "desktop" }] },
  { path: "/about", file: "about", viewports: [{ w: 1440, h: 900, name: "desktop" }] },
  { path: "/contact", file: "contact", viewports: [{ w: 1440, h: 900, name: "desktop" }] },
  { path: "/media", file: "media", viewports: [{ w: 1440, h: 900, name: "desktop" }] },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const report = [];

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  const failedImgs = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    // Generic resource-404 lines carry no URL — actual 404s are caught below
    // via the response listener (which can distinguish benign prefetch noise).
    if (t.startsWith("Failed to load resource")) return;
    errors.push(t.slice(0, 200));
  });
  page.on("response", (r) => {
    if (r.status() !== 404) return;
    const url = r.url().replace(BASE, "");
    // Next.js prefetch payloads for client-side nav — real web servers
    // (Apache/Nginx/cPanel) serve these fine; python http.server cannot.
    if (url.includes("__next.") || url.includes("_rsc")) return;
    if (url === "/favicon.ico") return;
    errors.push(`404: ${url}`);
  });
  page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message.slice(0, 200)}`));

  for (const vp of route.viewports) {
    await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle0", timeout: 30000 });
    
    // Scroll through page to trigger lazy components and reveals
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
            resolve();
          }
        }, 80);
      });
    });

    await new Promise((r) => setTimeout(r, 1200)); // let reveals/counters settle

    const metrics = await page.evaluate(() => {
      const imgs = [...document.images];
      const bad = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.split("/").pop());
      return {
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        scrollH: document.documentElement.scrollHeight,
        h1: document.querySelector("h1")?.textContent?.slice(0, 60) ?? null,
        badImgs: bad.slice(0, 8),
        imgCount: imgs.length,
      };
    });

    const file = `${OUT}/${route.file}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    report.push({
      route: route.path + " @ " + vp.name,
      overflowX: metrics.scrollW > metrics.innerW + 1 ? `${metrics.scrollW}px > ${metrics.innerW}px` : null,
      pageHeight: Math.round(metrics.scrollH),
      h1: metrics.h1,
      brokenImgs: metrics.badImgs,
      imgCount: metrics.imgCount,
    });
  }
  if (errors.length) report.push({ route: route.path, consoleErrors: [...new Set(errors)].slice(0, 6) });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
