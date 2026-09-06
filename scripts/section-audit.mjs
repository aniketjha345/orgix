// section-audit.mjs — per-section audit of the homepage.
import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE || "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

async function auditViewport(w, h, label) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && !m.text().startsWith("Failed to load resource") && errors.push(m.text().slice(0, 140)));
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message.slice(0, 140)));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 40000 });

  // Load all lazy media by scrolling slowly
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));

  const audit = await page.evaluate((wLabel) => {
    const sections = [...document.querySelectorAll("section[id], #manifesto-proof, .creator-marquee")];
    const out = [];
    const docScrollW = document.documentElement.scrollWidth;
    for (const sec of sections) {
      const id = sec.id || sec.className.split(" ").find((c) => c.includes("marquee")) || "?";
      const r = sec.getBoundingClientRect();
      // force layout reads
      const style = getComputedStyle(sec);
      const imgs = [...sec.querySelectorAll("img")];
      const videos = [...sec.querySelectorAll("video")];
      const textEls = [...sec.querySelectorAll("h1, h2, h3, p, span, a, button, li, b")];
      // overflowing text elements (scrollWidth beyond clientWidth by >2px)
      const overflowText = textEls
        .filter((el) => el.scrollWidth > el.clientWidth + 3 && el.clientWidth > 0)
        .map((el) => `${el.tagName.toLowerCase()}:“${(el.textContent || "").trim().slice(0, 40)}” ${el.scrollWidth}px/${el.clientWidth}px`)
        .slice(0, 4);
      // elements poking outside the section horizontally
      let secOverflow = false;
      const secRight = r.left + sec.scrollWidth;
      if (docScrollW > wLabel === undefined ? 0 : (sec.scrollWidth > 0 && r.left + sec.scrollWidth > sec.parentElement?.clientWidth + 2)) {
        // approximate per-section overflow via child bounds
        for (const c of sec.children) {
          const cr = c.getBoundingClientRect();
          if (cr.right > Math.min(window.innerWidth, document.documentElement.clientWidth) + 1 || cr.left < -1) {
            if (style.overflow !== "hidden" && getComputedStyle(c).position !== "absolute" && !getComputedStyle(c).className?.includes("absolute")) {
              secOverflow = true;
              break;
            }
          }
        }
      }
      const brokenImgs = imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.src.split("/").pop().slice(0, 30));
      out.push({
        id: id || "(unlabeled)",
        top: Math.round(r.top),
        h: Math.round(r.height),
        bg: style.backgroundColor,
        textOverflow: overflowText,
        possibleOverflow: secOverflow,
        brokenImgs: brokenImgs,
        imgCount: imgs.length,
        videoCount: videos.length,
        headings: [...sec.querySelectorAll("h1,h2,h3")].slice(0, 2).map((h) => h.textContent.trim().slice(0, 45)),
      });
    }
    return { sections: out, docScrollW, viewport: wLabel };
  }, `${w}x${h}`);

  return { label, errors, ...audit };
}

const desktop = await auditViewport(1440, 900, "desktop");
const mobile = await auditViewport(390, 844, "mobile");

function summarize(a) {
  console.log(`\n== ${a.label} (scrollW ${a.docScrollW}) console errors: ${a.errors.length} ==`);
  if (a.errors.length) a.errors.slice(0, 6).forEach((e) => console.log("  ERR:", e));
  for (const s of a.sections) {
    const issues = [];
    if (s.brokenImgs.length) issues.push(`BROKEN IMG ${s.brokenImgs.join(",")}`);
    if (s.textOverflow.length) issues.push(`TEXT CLIP ${s.textOverflow[0]}`);
    if (s.possibleOverflow) issues.push("POSSIBLE OVERFLOW");
    const flag = issues.length ? "  ⚠ " : "    ";
    console.log(`${flag}${s.id.padEnd(16)} h=${String(s.h).padStart(6)} ${s.headings[0] ? "· " + s.headings[0].slice(0, 40) : ""}${issues.length ? "  | " + issues.join("; ") : ""}`);
  }
}

summarize(desktop);
summarize(mobile);
await browser.close();