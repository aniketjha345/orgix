// Capture screenshots for ONE route (arg: work|services|about|contact|media) — fits in short command timeouts.
import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE || "http://localhost:3001";
const OUT = "research/shots";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const key = process.argv[2];
const routes = {
  work: "/work",
  services: "/services",
  about: "/about",
  contact: "/contact",
  media: "/media",
};
if (!routes[key]) {
  console.error("unknown route: " + key);
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${BASE}${routes[key]}`, { waitUntil: "networkidle0", timeout: 30000 });

// Scroll through page to trigger lazy components and reveals
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let totalHeight = 0;
    const timer = setInterval(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, 800);
      totalHeight += 800;
      if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        resolve();
      }
    }, 60);
  });
});
await new Promise((r) => setTimeout(r, 1200));

const file = `${OUT}/${key}-desktop.png`;
await page.screenshot({ path: file, fullPage: true });
console.log("saved " + file);
await browser.close();
