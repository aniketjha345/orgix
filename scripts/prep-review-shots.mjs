// Downscale + split full-page screenshots into viewable JPEG chunks.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const IN = "research/shots";
const OUT = "research/shots/review";
const WIDTH = 760; // downscale target width
const CHUNK = 1600; // max chunk height in px at output scale

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(IN).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const src = path.join(IN, f);
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  const scale = WIDTH / meta.width;
  const outH = Math.round(meta.height * scale);

  const base = sharp(src)
    .resize({ width: WIDTH })
    .jpeg({ quality: 78, mozjpeg: true });

  if (outH <= CHUNK) {
    await base.toFile(path.join(OUT, f.replace(".png", ".jpg")));
    console.log(`${f}: ${WIDTH}x${outH} (single)`);
    continue;
  }

  const buf = await base.toBuffer();
  const parts = Math.ceil(outH / CHUNK);
  for (let i = 0; i < parts; i++) {
    const top = i * CHUNK;
    const h = Math.min(CHUNK, outH - top);
    await sharp(buf)
      .extract({ left: 0, top, width: WIDTH, height: h })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT, `${f.replace(".png", "")}-p${i + 1}.jpg`));
  }
  console.log(`${f}: ${WIDTH}x${outH} -> ${parts} chunks`);
}
