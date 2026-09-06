/**
 * optimize-figurines.mjs
 * ----------------------
 * The v4 experiment shipped 4 archetype figurines (5-7 MB each) as
 * 1.png..4.png. This resizes them into lightweight named PNGs
 * (strategist / creator / director / builder) so the homepage can
 * feature characters without a 24 MB image budget.
 *
 * Usage:  node scripts/optimize-figurines.mjs
 * Output: public/images/figurines/{strategist,creator,director,builder}.png
 */
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const FIG_DIR = path.resolve("public/images/figurines");
const WIDTH = 720; // displayed at ~300px max — retina-safe, 4x headroom

const MAP = {
  "1.png": "strategist",
  "2.png": "creator",
  "3.png": "director",
  "4.png": "builder",
};

async function main() {
  for (const [src, name] of Object.entries(MAP)) {
    const input = path.join(FIG_DIR, src);
    const output = path.join(FIG_DIR, `${name}.png`);

    try {
      const meta = await sharp(input).metadata();
      const width = Math.min(meta.width || WIDTH, WIDTH);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: false })
        .toFile(output);

      const outMeta = await sharp(output).metadata();
      const inKb = Math.round((meta.size || 0) / 1024);
      const outKb = Math.round(outMeta.size / 1024);
      console.log(
        `${src.padEnd(8)} -> ${name.padEnd(11)} ${String(inKb).padStart(5)}KB -> ${String(outKb).padStart(5)}KB  (${outMeta.width}x${outMeta.height})`
      );
    } catch (err) {
      console.error(`FAILED ${src}:`, err.message);
    }
  }
}

main();