// One-off pruner: removes rules from app/globals.css whose selector matches
// dropped features (light theme, deleted components' classes).
// Run: node scripts/prune-css.mjs
import fs from "node:fs";

const FILE = new URL("../app/globals.css", import.meta.url);
let css = fs.readFileSync(FILE, "utf8");
const before = css.length;

const DROP = [
  /data-theme=["']light["']/,
  /\.trans-[\w-]/,
  /\.sim-[\w-]/,
  /\.sound-[\w-]/,
  /\.pillar-[\w-]/,
  /\.axiom-[\w-]/,
  /\.theme-toggle-btn/,
  /\.manifesto-(?!index-badge)[\w-]/,
];

let removedCount = 0;

function prune(input) {
  let out = "";
  let i = 0;
  while (i < input.length) {
    const brace = input.indexOf("{", i);
    if (brace === -1) {
      out += input.slice(i);
      break;
    }
    const header = input.slice(i, brace);
    let depth = 1;
    let j = brace + 1;
    for (; j < input.length && depth > 0; j++) {
      if (input[j] === "{") depth++;
      else if (input[j] === "}") depth--;
    }
    const body = input.slice(brace + 1, j - 1);
    const sel = header.trim();

    if (sel.startsWith("@media") || sel.startsWith("@supports")) {
      const inner = prune(body);
      if (inner.trim() === "") {
        removedCount++;
      } else {
        out += header + "{" + inner + "}";
      }
    } else if (sel.startsWith("@")) {
      // @keyframes / @font-face etc — keep whole block
      out += header + "{" + body + "}";
    } else if (DROP.some((rx) => rx.test(sel))) {
      removedCount++;
    } else {
      out += header + "{" + body + "}";
    }
    i = j;
  }
  return out;
}

css = prune(css);
fs.writeFileSync(FILE, css);
console.log(`Removed ${removedCount} rules · ${(before - css.length).toLocaleString()} bytes saved`);
