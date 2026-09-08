/**
 * optimize-images.mjs
 * --------------------
 * One-shot image diet for Orgix Media's public/ folder.
 *
 * - 8 figurine PNGs (600-800KB each, displayed at ~48-200px)
 *   -> WebP, max 360px wide, q82
 * - 3 creator portrait PNGs (~2MB each, displayed at <=300px cards/avatars)
 *   -> WebP, max 600px wide, q80
 * - process/02-scripting.webp (1.5MB, displayed at ~500px)
 *   -> recompressed in place, max 1280px wide, q72
 * - logo/orgix-logo.png (512px/198KB, displayed at 32px)
 *   -> WebP, max 256px wide, q85
 *
 * Usage:  node scripts/optimize-images.mjs
 * After:  update code refs from .png to .webp (see REPLACEMENTS below),
 *         then delete the superseded .png originals.
 */
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const ROOT = path.resolve("public/images");

const FIGURINES = [
  "strategist",
  "creator",
  "director",
  "alchemist",
  "analyst",
  "whisperer",
  "catalyst",
  "builder",
];

const CREATORS = ["kanikka-dewanii", "ekta-dahiya", "amit-arora"];

async function kb(p) {
  return Math.round((await fs.stat(p)).size / 1024);
}

async function main() {
  let saved = 0;

  for (const name of FIGURINES) {
    const input = path.join(ROOT, "figurines", `${name}.png`);
    const output = path.join(ROOT, "figurines", `${name}.webp`);
    try {
      const before = await kb(input);
      await sharp(input)
        .resize({ width: 360, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(output);
      const after = await kb(output);
      saved += before - after;
      console.log(`figurines/${name}: ${before}KB -> ${after}KB`);
    } catch (err) {
      console.error(`FAILED figurines/${name}:`, err.message);
    }
  }

  for (const name of CREATORS) {
    const input = path.join(ROOT, "creators", `${name}.png`);
    const output = path.join(ROOT, "creators", `${name}.webp`);
    try {
      const before = await kb(input);
      await sharp(input)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(output);
      const after = await kb(output);
      saved += before - after;
      console.log(`creators/${name}: ${before}KB -> ${after}KB`);
    } catch (err) {
      console.error(`FAILED creators/${name}:`, err.message);
    }
  }

  // 02-scripting.webp: recompress in place via temp file.
  try {
    const input = path.join(ROOT, "process", "02-scripting.webp");
    const tmp = path.join(ROOT, "process", "02-scripting.tmp.webp");
    const before = await kb(input);
    await sharp(input)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(tmp);
    await fs.rename(tmp, input);
    const after = await kb(input);
    saved += before - after;
    console.log(`process/02-scripting: ${before}KB -> ${after}KB`);
  } catch (err) {
    console.error("FAILED process/02-scripting:", err.message);
  }

  // Logo: 512px PNG displayed at 32px.
  try {
    const input = path.join(ROOT, "logo", "orgix-logo.png");
    const output = path.join(ROOT, "logo", "orgix-logo.webp");
    const before = await kb(input);
    await sharp(input)
      .resize({ width: 256, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(output);
    const after = await kb(output);
    saved += before - after;
    console.log(`logo/orgix-logo: ${before}KB -> ${after}KB`);
  } catch (err) {
    console.error("FAILED logo:", err.message);
  }

  console.log(`\nEstimated savings: ${(saved / 1024).toFixed(1)}MB`);
}

main();
