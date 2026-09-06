import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE || "http://localhost:3230";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const pg = await browser.newPage();
await pg.setViewport({ width: 1440, height: 900 });
await pg.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 30000 });
await pg.evaluate(() => document.querySelector("#video-proof").scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 1200));
const t1 = await pg.evaluate(() => getComputedStyle(document.querySelector(".video-rail-track")).transform);
await new Promise((r) => setTimeout(r, 2000));
const t2 = await pg.evaluate(() => getComputedStyle(document.querySelector(".video-rail-track")).transform);
const pt = await pg.evaluate(() => {
  const cards = [...document.querySelectorAll(".video-rail-card")];
  const i = cards.findIndex((c) => {
    const r = c.getBoundingClientRect();
    return r.left >= 0 && r.right <= window.innerWidth && r.width > 50;
  });
  const r = cards[i].getBoundingClientRect();
  window.__hoverIdx = i;
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
await pg.mouse.move(pt.x, pt.y);
await new Promise((r) => setTimeout(r, 4500));
const st = await pg.evaluate(() => {
  const v = document.querySelectorAll(".video-rail-card video")[window.__hoverIdx];
  return { ready: v.readyState, paused: v.paused, muted: v.muted, src: v.currentSrc.slice(-32) };
});
console.log("RAIL_MOVES:" + (t1 !== t2) + " HOVERPLAY:" + JSON.stringify(st));
await pg.screenshot({ path: "research/shots/video-rail.png" });
await browser.close();
