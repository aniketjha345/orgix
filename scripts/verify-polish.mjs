// verify-polish.mjs — confirm section-by-section enhancements rendered.
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const vp of [
  { width: 1440, height: 900, name: "desktop" },
  { width: 390, height: 844, name: "mobile" },
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 40000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  const r = await page.evaluate(() => ({
    heroPill: document.querySelector("#hero")?.innerText.toLowerCase().includes("100% organic growth") || false,
    kicker: document.querySelector("#hero .editorial-kicker")?.textContent.trim() || "",
    manifestoSig: document.querySelector("#manifesto")?.innerText.toLowerCase().includes("one obsessive team") || false,
    stars: (document.querySelector("#testimonials")?.innerText.match(/★/g) || []).length,
    faqCta: document.querySelector("#faq")?.innerText.includes("Still not sure") || false,
    insightsChips: document.querySelector("#insights")?.innerText.toLowerCase().includes("retention curves") || false,
    insightsH: Math.round(document.querySelector("#insights")?.getBoundingClientRect().height || 0),
    castArchH: Math.round(document.querySelector(".cast-arch")?.getBoundingClientRect().height || 0),
    castSectionH: Math.round(document.querySelector("#cast")?.getBoundingClientRect().height || 0),
  }));
  console.log(vp.name, JSON.stringify(r));
  await page.close();
}
await browser.close();