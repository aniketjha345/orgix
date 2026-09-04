// Bulk-upload public/images/** to Cloudinary under orgix-media/<folder>/<name>.
//
// Uses the account's unsigned upload preset (orgix_web) — no secrets needed.
// Optional overrides:
//   CLOUD_NAME=dwjr5yrir  CLOUD_PRESET=orgix_web  CLOUD_FOLDER=orgix-media
//
// Usage: node scripts/upload-media.mjs
import { readdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(root, "public", "images");

const CLOUD_NAME = process.env.CLOUD_NAME || "dwjr5yrir";
const PRESET = process.env.CLOUD_PRESET || "orgix_web";
const FOLDER = process.env.CLOUD_FOLDER || "orgix-media";

const EXT_TO_TYPE = {
  jpg: "image", jpeg: "image", png: "image", webp: "image", gif: "image", avif: "image", svg: "image",
  mp4: "video", webm: "video", mov: "video", m4v: "video",
};

function walk(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full, path.join(base, name)));
    else out.push({ full, rel: path.posix.join(base, name) });
  }
  return out;
}

async function uploadOne(file) {
  const ext = path.extname(file.rel).slice(1).toLowerCase();
  const type = EXT_TO_TYPE[ext] || "auto";
  const pubId = file.rel.slice(0, -(ext.length + 1)); // strip extension, keep subfolders

  const body = new FormData();
  body.append("file", new Blob([readFileSync(file.full)]), path.basename(file.full));
  body.append("upload_preset", PRESET);
  body.append("public_id", pubId);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`, {
    method: "POST",
    body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${file.rel}: ${json?.error?.message || res.status}`);
  return { rel: file.rel, publicId: json.public_id, secureUrl: json.secure_url };
}

const files = walk(srcDir).filter((f) => /\.(jpe?g|png|webp|gif|avif|svg|mp4|webm|mov)$/i.test(f.rel));
console.log(`Uploading ${files.length} files → ${CLOUD_NAME} (preset: ${PRESET}, folder base: ${FOLDER})`);

const ok = [];
const failed = [];
for (let i = 0; i < files.length; i++) {
  try {
    const r = await uploadOne(files[i]);
    ok.push(r);
    if (i % 8 === 0) console.log(`  ${i + 1}/${files.length}… (${r.publicId})`);
  } catch (e) {
    failed.push(e.message);
    console.error(`  ✗ ${e.message}`);
  }
}

console.log(`\nDone: ${ok.length} uploaded, ${failed.length} failed.`);
if (failed.length) console.log("Failed:\n" + failed.join("\n"));
