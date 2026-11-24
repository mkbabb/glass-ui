// BM pass 10 (DESIGN §8.3): the bytes of C against A, and of pass 9's B for the record.
// A is BL's built sheet (`bl/slider/proto` @ fe30f9882, src/components/slider/styles.css). C is that sheet with its
// expanded-view section (from the "THE EXPANDED VIEW" banner to the forced-colours block) replaced by
// sketch/slider-expand-c.css, and sketch/slider-expand-c.fc.css appended. B is pass 9's (pass-9/slider/slider.json).
// Standalone gzip -9 of comment-stripped CSS, whole sheet each way, so the difference is C's cost over A.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-10/slider/slider-bytes.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), REPO = path.resolve(HERE, "../../../../../..");
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
const raw = execFileSync("git", ["-C", REPO, "show", "fe30f9882:src/components/slider/styles.css"], { encoding: "utf8" });
const banner = raw.indexOf("THE EXPANDED VIEW (`expand`)");
const start = raw.lastIndexOf("/*", banner), end = raw.indexOf("/* Forced colours (last");
if (banner < 0 || start < 0 || end < 0 || end < start) throw new Error("BL's sheet moved: section markers not found");
const sec = readFileSync(path.join(HERE, "sketch/slider-expand-c.css"), "utf8");
const fc = readFileSync(path.join(HERE, "sketch/slider-expand-c.fc.css"), "utf8");
const A = strip(raw), C = strip(raw.slice(0, start) + sec + raw.slice(end) + "\n" + fc);
const Asec = strip(raw.slice(start, end)), Csec = strip(sec + "\n" + fc);
const b9 = JSON.parse(readFileSync(path.resolve(HERE, "../../pass-9/slider/slider.json"), "utf8")).bytes || {};
const out = {
  method: "gzip -9 of the comment-stripped sheet, whole; A = BL fe30f9882, C = A with its expanded-view section replaced by the sketch",
  A_sheet: gz(A), C_sheet: gz(C), C_over_A: gz(C) - gz(A),
  section: { A_raw_chars: Asec.length, C_raw_chars: Csec.length },
  B_over_A_pass9: b9.B_over_A ?? null,
  script: "0 B: C adds no script, no node and no listener; the shell node is BL's",
};
const file = path.join(HERE, "slider.json");
let j = {};
try { j = JSON.parse(readFileSync(file, "utf8")); } catch {}
j.bytes = out;
writeFileSync(file, JSON.stringify(j, null, 1));
console.log(JSON.stringify(out));
