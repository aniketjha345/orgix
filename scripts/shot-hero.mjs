import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

// 1. Mobile Hero Viewport
const pageMobile = await browser.newPage();
await pageMobile.setViewport({ width: 390, height: 844 });
await pageMobile.goto(BASE, { waitUntil: "networkidle0" });
await pageMobile.screenshot({ path: "research/shots/aplus/hero-viewport-mobile.png" });

// Scroll to the engine
await pageMobile.evaluate(() => window.scrollBy(0, 500));
await new Promise(r => setTimeout(r, 800));
await pageMobile.screenshot({ path: "research/shots/aplus/hero-engine-scrolled-mobile.png" });

await pageMobile.close();

// 2. Desktop Hero Viewport
const pageDesktop = await browser.newPage();
await pageDesktop.setViewport({ width: 1440, height: 900 });
await pageDesktop.goto(BASE, { waitUntil: "networkidle0" });
await pageDesktop.screenshot({ path: "research/shots/aplus/hero-viewport-desktop.png" });
await pageDesktop.close();

await browser.close();
console.log("Hero shots saved!");
