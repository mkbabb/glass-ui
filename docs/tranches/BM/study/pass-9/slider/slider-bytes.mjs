// BM pass 9 (DESIGN §12): the bytes of B against A. A is BL's built sheet (`bl/slider/proto` @ fe30f9882,
// src/components/slider/styles.css); B is that sheet with A's disc rules removed and slider-expand.next.css added.
// Standalone gzip -9 of comment-stripped CSS, whole sheet each way, so the difference is B's cost over A.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node slider-bytes.mjs  (adds `bytes` to slider.json)
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), REPO = path.resolve(HERE, "../../../../../..");
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
const A = strip(execFileSync("git", ["-C", REPO, "show", "fe30f9882:src/components/slider/styles.css"], { encoding: "utf8" }));
// A's disc: its scale rule and transition, the grown scale, the token, and the two reduced-motion arms.
const disc = [
  /\.glass-slider\[data-expand\] \.slider-thumb::before \{ scale: 1; transition: scale [^}]*\}/,
  /\.glass-slider\[data-expand\]:is\(\[data-held\], \[data-focus-key\], \[data-hover\]\) \.slider-thumb::before \{ scale: var\(--slider-thumb-grown\); \}/,
  /--slider-thumb-grown: calc\( \(var\(--slider-track-height\) \+ var\(--slider-g\)\) \/ var\(--slider-track-height\) \);/,
  /\.glass-slider\[data-expand\] \.slider-thumb::before \{ scale: 1 !important; \}/,
  /\.glass-slider\[data-expand\]\[data-motion="reduced"\] \.slider-thumb::before \{ scale: 1 !important; \}/,
];
let Aless = A; const found = disc.map((re) => { const ok = re.test(Aless); Aless = Aless.replace(re, ""); return ok; });
const Bsheet = Aless + " " + strip(readFileSync(path.join(HERE, "sketch/slider-expand.next.css"), "utf8"));
const j = JSON.parse(readFileSync(path.join(HERE, "slider.json"), "utf8"));
j.bytes = { method: "gzip -9 of the comment-stripped sheet, whole", A_sheet: gz(A), B_sheet: gz(Bsheet), B_over_A: gz(Bsheet) - gz(A), A_disc_rules_found: found, script: "0 B: B adds no script and no node" };
writeFileSync(path.join(HERE, "slider.json"), JSON.stringify(j, null, 1));
console.log(JSON.stringify(j.bytes));
