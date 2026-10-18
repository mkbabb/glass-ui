#!/usr/bin/env node
// h7-rescore.mjs · D3 pass 7, H7-1 (REGISTRY P6-2.2 R-14, P6-6.2 step 1): re-score banked M-3 readings under H7-1
// with no new capture, and write every row's verdict under H6 and under H7 for a `diff`.
// The pass-6 critic's captures (and their ring PNGs) were removed with its worktree (pass-6/D3-crit-run.sh, phase
// `teardown`). What is banked from those PNGs is (1) M-3's own per-row output under H6 (crit-records/verbose/m3-*.txt:
// every row's p05, min and column count) and (2) the per-column readout of every three-column ring, made from the same
// PNGs by crit-ringapex.mjs (crit-records/ringapex-*.log: each column's min(inside, outside) and whether its band rows are
// equal within 1 per channel, `=`, else `~`). That flag is lib.mjs fullCoverage's test on a 2-row band, so H7-1's reading
// is lib.mjs ringFallbackRead over those columns (one source for the live reader and this re-score). Every row that is
// not a three-column ring keeps its H6 value: H7-1 does not read it (rows.mjs, lib.mjs edgeContrast).
// A three-column ring with no banked column record keeps its H6 value and prints UNSCORED.
//   node h7-rescore.mjs --verbose <m3-*.txt> --apex <ringapex-*.log>[,<…>] --label <build> --out <dir>
import fs from "node:fs";
import path from "node:path";
import { cli, list, ringFallbackRead } from "../harness/lib.mjs";

const a = cli({ verbose: { type: "string" }, apex: { type: "string" }, label: { type: "string" }, out: { type: "string" } });
const eng = (e) => (e.startsWith("webkit") ? "webkit" : "chromium");
// Banked column records, keyed like the M-3 rows: "<engine> <theme> <ground> <scene> <spec>·ring:<id>" (base variant only:
// M-3 reads the base cells; the retune variants and the deep ground are crit-ringapex's extra rows, not M-3's).
const apex = new Map(), extra = [];
for (const f of list(a.apex, [])) for (const l of fs.readFileSync(f, "utf8").split("\n")) {
  const m = l.match(/^APEX (\S+) (light|dark) (\w+)·([\w]+)(?:·(\S+))? (\S+):(\S+) · M-3 ([\d.]+) · apex [\d.]+(?: \(no full-coverage column\))? · cols (.+)$/);
  if (!m) continue;
  const [, e, theme, scene, ground, variant, spec, id, m3, cols] = m;
  const key = `${eng(e)} ${theme} ${ground} ${scene} ${spec}·ring:${id}`;
  const c = cols.trim().split(" ").map((t) => { const [, x, flag, v] = t.match(/^(\d+)([=~])([\d.]+)$/); return { x: +x, full: flag === "=", v: +v }; });
  if (variant) { extra.push(`${key} [${variant}]`); continue; }
  apex.set(key, { m3: +m3, cols: c, src: path.basename(f) });
}
// H6's rows, from M-3's verbose output.
const rows = [];
let cell = null;
for (const l of fs.readFileSync(a.verbose, "utf8").split("\n")) {
  const h = l.match(/^  (chromium|webkit\+shim|webkit) (light|dark) (\S+)(?: (\w+))?(?: \[[^\]]+\])?(?: \[info\])?: /);
  if (h) { cell = { engine: eng(h[1]), theme: h[2], ground: h[3], scene: h[4] || "ladder" }; continue; }
  const r = l.match(/^ {6}(\S+)·(ring|perimeter):(\S+) p05 (\S+) min (\S+) cols (\d+)/);
  if (!r || !cell) continue;
  const [, spec, kind, id, p05, , n] = r;
  rows.push({ key: `${cell.engine} ${cell.theme} ${cell.ground} ${cell.scene} ${spec}·${kind}:${id}`, kind, n: +n, h6: p05 === "—" ? null : +p05 });
}
const verdict = (v) => (v != null && v >= 3 ? "PASS" : "FAIL");
let fallback = 0, scored = 0, unscored = 0, mismatch = 0, moved = 0, movedOther = 0, near = 0;
const h6Lines = [], h7Lines = [], h6Vals = [], h7Vals = [], notes = [];
for (const r of rows) {
  let h7 = r.h6, how = "";
  const isFallback = r.kind === "ring" && r.n === 3;
  if (isFallback) {
    fallback++;
    const rec = apex.get(r.key);
    if (!rec) { unscored++; how = " UNSCORED (no banked column record)"; }
    else {
      scored++;
      if (Math.abs(rec.m3 - r.h6) > 0.005) { mismatch++; notes.push(`MISMATCH ${r.key}: M-3 ${r.h6} against the column record's ${rec.m3}`); }
      const read = ringFallbackRead(rec.cols); h7 = read.value; how = ` (${read.how}; ${rec.src})`;
      if (Math.abs(h7 - 3) < 0.01 || Math.abs(r.h6 - 3) < 0.01) { near++; notes.push(`NEAR 3.00 ${r.key}: H6 ${r.h6}, H7 ${h7} (two-decimal record; the verdict at the threshold is rounding-limited)`); }
    }
  }
  if (verdict(h7) !== verdict(r.h6)) { if (isFallback) moved++; else movedOther++; }
  h6Lines.push(`${r.key} · ${verdict(r.h6)}`); h7Lines.push(`${r.key} · ${verdict(h7)}`);
  h6Vals.push(`${r.key} · ${r.h6 ?? "—"} · ${verdict(r.h6)}`); h7Vals.push(`${r.key} · ${h7 ?? "—"} · ${verdict(h7)}${how}`);
}
fs.mkdirSync(a.out, { recursive: true });
const w = (n, x) => fs.writeFileSync(path.join(a.out, `m3-${a.label}-${n}.txt`), x.join("\n") + "\n");
w("H6-verdicts", h6Lines); w("H7-verdicts", h7Lines); w("H6-values", h6Vals); w("H7-values", h7Vals);
const tally = (lines) => { const t = {}; for (const l of lines) { const [e, th] = l.split(" "), k = `${e} ${th}`; t[k] ??= [0, 0]; t[k][0]++; if (l.endsWith("FAIL") || / · FAIL/.test(l)) t[k][1]++; } return Object.entries(t).map(([k, [n, f]]) => `${k} ${f ? `FAIL ${f}/${n}` : `PASS ${n}`}`).join(" · "); };
console.log(`H7-RESCORE ${a.label} · ${path.basename(a.verbose)} · rows ${rows.length} · three-column rings ${fallback} (scored ${scored}, unscored ${unscored}) · column records ${apex.size} (+${extra.length} variant rows not read by M-3)`);
for (const n of notes) console.log("  " + n);
console.log(`  H6: ${tally(h6Lines)}`);
console.log(`  H7: ${tally(h7Lines)}`);
console.log(`  verdicts moved: ${moved} three-column rings, ${movedOther} other rows · column-record mismatches ${mismatch} · rows within 0.01 of 3.00: ${near}`);
console.log(movedOther || mismatch ? "FAIL (a row other than a three-column ring moved, or a column record disagrees with M-3)" : "PASS (only three-column rings may move, and the records agree)");
process.exit(movedOther || mismatch ? 1 : 0);
