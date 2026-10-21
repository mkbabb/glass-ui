#!/usr/bin/env node
// D4 pass 9 · RE-MEASURE · compare.mjs: every log pass 8's BUILD wrote against the log of the same name pass 9 wrote.
// Engine-free: it reads the two logs/ directories only. Per log it pulls the verdict lines (a witness's tally line,
// a battery summary line, UNIT, SHEET, the bundle line, the restore checks, the stage exit) and compares them after
// stripping what is a measurement of the machine, not of the build: loads, timestamps, durations, settle waits, paths.
//   node compare.mjs [--full]      → one row per log: SAME | DIFF | MISSING, with the verdict lines of each side on DIFF
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const A = path.join(HERE, "../pass-8/logs"), B = path.join(HERE, "logs");
const full = process.argv.includes("--full");
const VERDICT = /^([A-Z][A-Z0-9-]* (PASS|FAIL)|UNIT |T-\d  |W-[A-E]  |sheet exit|build exit|restored:|worktree diff|app: |test: |.* · unpacked |git diff HEAD|HEAD |(src|tests|demo|MIGRATION\.md) (equals|DIFFERS)|exit \d+ ·)/;
const norm = (l) => l
  .replace(/load (at start )?\{?[\d. /]+\}?( ?→ [\d. /]+)?/g, "load ·").replace(/loads? [\d.]+(-[\d.]+)?/g, "load ·")
  .replace(/\d{4}-\d\d-\d\d \d\d:\d\d:\d\d/g, "·")
  .replace(/\b\d+(\.\d+)? s\b/g, "· s").replace(/in \d+(\.\d+)?s/g, "in · s")
  .replace(/settle waits [\d/]+ ms/g, "settle waits ·")
  .replace(/\/Users\/\S+/g, "·").replace(/@ [0-9a-f]{8}/g, "@ ·").replace(/ {2,}/g, " ").trim();
const read = (d, f) => { try { return fs.readFileSync(path.join(d, f), "utf8").split("\n").filter((l) => VERDICT.test(l)); } catch { return null; } };
const names = [...new Set([...fs.readdirSync(A), ...fs.readdirSync(B)])].filter((f) => f.endsWith(".log")).sort();
let same = 0, diff = 0, miss = 0;
for (const f of names) {
  const a = read(A, f), b = read(B, f);
  if (!a || !b) { miss++; console.log(`MISSING ${f} (${a ? "pass 9" : "pass 8"} has none)`); continue; }
  const eq = a.map(norm).join("\n") === b.map(norm).join("\n");
  eq ? same++ : diff++;
  console.log(`${eq ? "SAME" : "DIFF"} ${f}`);
  if (!eq || full) { const na = a.map(norm), nb = b.map(norm);
    for (const l of na) if (!nb.includes(l)) console.log(`   p8 ${l}`);
    for (const l of nb) if (!na.includes(l)) console.log(`   p9 ${l}`); }
}
console.log(`COMPARE · ${names.length} logs · ${same} same · ${diff} differ · ${miss} missing`);
