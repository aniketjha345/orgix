// verify-home.mjs — sanity-check the rebuilt homepage DOM.
import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE || "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 30000 });

// Scroll to each character section and pause so lazy images load
for (const id of ["cast", "process", "cta"]) {
  await page.evaluate((i) => {
    document.getElementById(i)?.scrollIntoView();
  }, id);
  await new Promise((r) => setTimeout(r, 900));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 500));

const report = await page.evaluate(() => {
  const loaded = (img) => img.complete && img.naturalWidth > 0;

  // Progress bar
  const progressBar = [...document.querySelectorAll("header + div, div")].find(
    (el) => el.classList.contains("bg-accent") && el.style.transform
  );
  const progressVisible = !!document.querySelector('div[style*="scaleX"]');

  // Growth-engine archetype panel
  const runBy = document.querySelector('#process [class*="Run by"], #process .font-mono');
  const processArchImg = [...document.querySelectorAll("#process img")].find((i) =>
    i.src.includes("figurines")
  );

  // CTA cast lineup
  const ctaCastFigs = [...document.querySelectorAll("#cta .cta-cast img")];
  const youSlot = document.querySelector("#cta .cta-you-slot");

  // Hero figurine
  const heroFig = document.querySelector(".hero-fig");

  // Cast band cards + images
  const castCards = document.querySelectorAll(".cast-card").length;
  const castImgsLoaded = [...document.querySelectorAll(".cast-card img")].map((i) =>
    loaded(i)
  );

  return {
    progressBar: progressVisible,
    castCards,
    castImgsLoaded,
    heroFig: loaded(heroFig),
    processArchetypeImg: processArchImg ? loaded(processArchImg) : false,
    processRunByText: runBy ? runBy.textContent.trim().slice(0, 40) : null,
    ctaCastFigs: ctaCastFigs.length,
    ctaCastFigsLoaded: ctaCastFigs.map((i) => loaded(i)),
    youSlot: !!youSlot,
  };
});

console.log(JSON.stringify(report, null, 2));

// 404 page check
const nf = await browser.newPage();
await nf.setViewport({ width: 1440, height: 900 });
await nf.goto(`${BASE}/nonexistent-page-check`, { waitUntil: "networkidle0", timeout: 30000 });
const nfReport = await nf.evaluate(() => {
  const img = document.querySelector('img[src*="director"]');
  return {
    title: document.querySelector("h1")?.textContent.trim().slice(0, 50),
    directorImg: img ? img.complete && img.naturalWidth > 0 : false,
  };
});
console.log(JSON.stringify({ notFound: nfReport }, null, 2));

await browser.close();