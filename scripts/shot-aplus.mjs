// Quick visual QA shots for the A+ pass. Usage: node scripts/shot-aplus.mjs
import puppeteer from "puppeteer-core";

import fs from "fs";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = "research/shots/aplus";
fs.mkdirSync(OUT, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const routes = [
  ["home", "/", 1440, 900],
  ["work", "/work", 1440, 900],
  ["contact", "/contact", 1440, 900],
  ["careers", "/careers", 1440, 900],
  ["home-mobile", "/", 390, 844],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

for (const [key, path, width, height] of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 800);
        total += 800;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
          resolve();
        }
      }, 50);
    });
    // Wait until every image has finished decoding so nothing is collapsed.
    // Race each image with a 6s cap so a stuck request can't hang the shot.
    await Promise.all(
      Array.from(document.images).map((img) =>
        Promise.race([
          img.complete
            ? Promise.resolve()
            : new Promise((r) => { img.onload = img.onerror = r; }),
          new Promise((r) => setTimeout(r, 6000)),
        ])
      )
    );
  });
  await new Promise((r) => setTimeout(r, 1500));
  const file = `${OUT}/${key}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log("saved " + file);
  await page.close();
}

await browser.close();
