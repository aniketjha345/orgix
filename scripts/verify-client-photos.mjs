// verify-client-photos.mjs — phase 2: check the trusted-by roster against
// orgix originals + confirm same-client photos are identical across folders.
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

const BASE = "https://orgixmedia.com";

// [orgix remote image, our local candidate]  (only remote checks need net)
const REMOTE_PAIRS = [
  ["/image/team/team-01.jpg", "creators/royston-dias.jpg"],
  ["/image/team/team-03.jpg", "creators/radical-era.jpg"],
  ["/image/team/team-04.jpg", "creators/demla-brothers.jpg"],
  ["/image/team/team-05.jpg", "creators/aarti-malhotra.jpg"],
  ["/image/team/team-06.jpg", "creators/daisy-morgan.jpg"],
  ["/image/team/team-07.jpg", "creators/ruchira.jpg"],
  ["/uploads/img_6a6c50df6742f.jpg", "creators/imarticus.jpg"],
  ["/uploads/img_6a6c53b2eabc8.png", "creators/kanikka-dewanii.png"],
  ["/image/team/team-11.jpg", "creators/akash-pandey.jpg"],
  ["/image/team/team-12.jpg", "creators/anuj-chhajerh.jpg"],
  ["/image/team/team-13.jpg", "creators/simran-balraj.jpg"],
  ["/image/team/team-14.jpg", "creators/jyoti-goyal.jpg"],
  ["/image/team/team-15.jpg", "creators/shivam.jpg"],
  ["/uploads/img_6a7ecebb6f19c.jpeg", "creators/9skin.jpg"],
  ["/uploads/img_6a6c48aaad2a1.png", "creators/amit-arora.png"],
  ["/uploads/img_6a6c48bbc0739.jpg", "creators/cellbell.jpg"],
  ["/uploads/img_6a7f1f28a05be.jpg", "creators/gaurav-mahawar.jpg"],
  ["/uploads/img_6a955bfeaa966.png", "creators/ekta-dahiya.png"],
  ["/uploads/img_6a955e4ce29cd.jpg", "creators/raj-vadhu.jpg"],
  ["/uploads/img_6a95619b0077b.jpg", "creators/rahis.jpg"],
  ["/uploads/img_6a9561f91e59d.jpg", "creators/bhavit-patil.jpg"],
  ["/uploads/img_6a9563608add7.jpg", "creators/shopcasence.jpg"],
  ["/uploads/img_6a95641f1187a.jpg", "creators/garima-barnoliya.jpg"],
  ["/uploads/img_6a8da0a165f4f.webp", "testimonials/royston-dias.jpg"],
  ["/uploads/img_6a95509bb99f1.jpg", "testimonials/neha.jpg"],
  ["/image/anantsir.jpg", "founders/anant-jain.jpg"],
  ["/image/deepsir.jpg", "founders/deepak-jain.jpg"],
  ["/image/pari.jpg", "founders/pari-jain.jpg"],
];

// same client in different folders — these MUST be identical files
const LOCAL_PAIRS = [
  ["stories/pari-jain.jpg", "founders/pari-jain.jpg"], // Pari client vs founder shot
  ["stories/ca-jyoti-goyal.jpg", "creators/jyoti-goyal.jpg"],
  ["stories/shivam-careers.jpg", "creators/shivam.jpg"],
  ["stories/amit-arora.jpg", "creators/amit-arora.png"],
  ["stories/ruchira-pokhriyal.jpg", "creators/ruchira.jpg"],
  ["stories/bhavit-patil.jpg", "creators/bhavit-patil.jpg"],
  ["stories/cellbell.jpg", "creators/cellbell.jpg"],
  ["stories/royston-dias.jpg", "creators/royston-dias.jpg"],
  ["stories/demla-brothers.jpg", "creators/demla-brothers.jpg"],
  ["stories/taranveer-jaura.jpg", "creators/taranveer-jaura.jpg"],
  ["stories/akash-pandey.jpg", "creators/akash-pandey.jpg"],
  ["stories/royston-dias.jpg", "testimonials/royston-dias.jpg"],
];

async function dHash(filePath) {
  const { data } = await sharp(filePath)
    .resize(9, 8, { fit: "fill" })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let hash = 0n;
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++)
      hash = (hash << 1n) | (data[y * 9 + x] > data[y * 9 + x + 1] ? 1n : 0n);
  return hash;
}
function hamming(a, b) {
  let d = a ^ b, c = 0;
  while (d) { c += Number(d & 1n); d >>= 1n; }
  return c;
}
const verdict = (dist) => (dist <= 6 ? "SAME" : dist <= 18 ? "~SAME(edit)" : "DIFFERENT");

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "orgix-photos-"));
console.log("== ROSTER / ORIGINALS ==");
for (let i = 0; i < REMOTE_PAIRS.length; i++) {
  const [remote, localPath] = REMOTE_PAIRS[i];
  const full = path.resolve("public/images", localPath);
  const tmpPath = path.join(tmp, `r${i}${path.extname(remote)}`);
  try {
    const resp = await fetch(BASE + remote);
    if (!resp.ok) { console.log(`ERR HTTP ${resp.status} ${remote}`); continue; }
    await fs.writeFile(tmpPath, Buffer.from(await resp.arrayBuffer()));
    const [hr, hl] = await Promise.all([dHash(tmpPath), dHash(full)]);
    const dist = hamming(hr, hl);
    console.log(`${verdict(dist).padEnd(13)} d=${String(dist).padStart(2)}  ${localPath.padEnd(34)} <- ${remote}`);
  } catch (err) {
    console.log(`ERR ${localPath}: ${err.message.slice(0, 60)}`);
  }
}
console.log("\n== CROSS-FOLDER SAME-CLIENT == (local only)");
for (const [a, b] of LOCAL_PAIRS) {
  try {
    const [ha, hb] = await Promise.all([dHash(path.resolve("public/images", a)), dHash(path.resolve("public/images", b))]);
    const dist = hamming(ha, hb);
    console.log(`${verdict(dist).padEnd(13)} d=${String(dist).padStart(2)}  ${a.padEnd(32)} vs ${b}`);
  } catch (err) {
    console.log(`ERR ${a} vs ${b}: ${err.message.slice(0, 60)}`);
  }
}
await fs.rm(tmp, { recursive: true, force: true });