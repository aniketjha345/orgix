// Debug: find element(s) causing horizontal overflow.
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
await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  const all = document.querySelectorAll("body *");
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 2 || r.right > vw + 2 || r.left < -2) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "")
          .toString()
          .slice(0, 80),
        w: Math.round(r.width),
        right: Math.round(r.right),
        left: Math.round(r.left),
        display: getComputedStyle(el).display,
        overflow: getComputedStyle(el).overflow,
        overflowX: getComputedStyle(el).overflowX,
      });
    }
  }
  return {
    vw,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: offenders.slice(0, 25),
    count: offenders.length,
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();