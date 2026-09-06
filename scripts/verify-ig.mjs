// verify-ig.mjs — marquee roster + profile-card check.
import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE || "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 30000 });

// Load marquee + scroll to results cards
await page.evaluate(async () => {
  await new Promise((r) => setTimeout(r, 300));
  document.querySelector("#results")?.scrollIntoView();
  await new Promise((r) => setTimeout(r, 800));
});

const report = await page.evaluate(() => {
  const marqueeItems = [...document.querySelectorAll(".creator-marquee-item")];
  const names = marqueeItems
    .slice(0, 24)
    .map((el) => el.querySelector("b")?.textContent.trim());

  const cards = [...document.querySelectorAll(".ig-card")].slice(0, 4);
  const cardInfo = cards.map((c) => {
    const avatar = c.querySelector(".ig-avatar")?.src.split("/").pop();
    const stats = [...c.querySelectorAll(".ig-stat b")].map((b) => b.textContent.trim());
    return {
      handle: c.querySelector(".ig-top-user, .ig-handle")?.textContent.trim(),
      avatarPhoto: avatar,
      stats, // [posts, followers, following]
      hasFeedGrid: c.querySelector(".ig-grid, .ig-tile") !== null, // must stay false
    };
  });
  return { marqueeItems: marqueeItems.length, visibleNames: names, cardInfo };
});

console.log(JSON.stringify(report, null, 1));
await browser.close();