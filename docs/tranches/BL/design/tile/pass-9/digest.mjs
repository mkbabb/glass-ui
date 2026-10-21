#!/usr/bin/env node
// D4 pass 9 · RE-MEASURE · digest.mjs: the per-cell record of a run tree, kept durable, and a cell-by-cell compare.
// Engine-free: it reads run JSON only (what harness H8's witnesses write under <out>/runs/<build>/<WITNESS>-<engine>.json).
//   node digest.mjs --runs <dir> --out <file>             every cell of every run JSON as one line:
//        <build>/<file> · PASS|FAIL|UNMEAS · gate|info · <the cell's own line>; then a tally line per file
//   node digest.mjs --runs <dir> --base <dir> --out <file>  the same cells keyed (build, file, ordinal within the scene
//        and mode), each compared against the base tree: verdict changes listed first (FLIP), then cells whose verdict holds
//        but whose numbers moved (MOVED, both lines printed), then files the base lacks. A verdict that holds is the
//        confirmation; MOVED lines are the timing-sensitive readings to look at.
import fs from "node:fs";
import path from "node:path";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const runs = arg("--runs"), base = arg("--base"), out = arg("--out");
if (!runs || !out) { console.error("usage: digest.mjs --runs <dir> [--base <dir>] --out <file>"); process.exit(2); }
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".json") ? [path.join(d, e.name)] : []);
const verdict = (c) => c.unmeasured ? "UNMEAS" : c.pass === true ? "PASS" : c.pass === false ? "FAIL" : "info";
const load = (root) => {
  const m = new Map();
  for (const f of walk(root)) {
    let j; try { j = JSON.parse(fs.readFileSync(f, "utf8")); } catch { continue; }
    if (!Array.isArray(j.cells)) continue;
    const rel = path.relative(root, f), seen = new Map(), cells = [];
    for (const c of j.cells) {
      const k0 = `${c.scene ?? ""}|${c.mode ?? ""}|${c.sel ?? ""}|${c.arm ?? ""}`; const n = (seen.get(k0) ?? 0) + 1; seen.set(k0, n);
      cells.push({ key: `${k0}#${n}`, v: verdict(c), gate: c.gating ? "gate" : "info", line: String(c.line ?? c.text ?? "").replace(/\s+/g, " ").trim() });
    }
    m.set(rel, { cells, tally: j.tally ?? "", harness: j.harness?.hash ?? "?", run: j.run ? `load ${j.run.loadStart ?? "?"} → ${j.run.loadEnd ?? "?"}` : "" });
  }
  return m;
};
const A = load(runs), lines = [];
if (!base) {
  for (const [rel, r] of [...A].sort()) {
    for (const c of r.cells) lines.push(`${rel} · ${c.v} · ${c.gate} · ${c.line}`);
    lines.push(`${rel} · TALLY ${r.tally} · harness ${r.harness} · ${r.run}`);
  }
} else {
  const B = load(base); let same = 0, moved = 0, flip = 0, newc = 0; const flips = [], moves = [], missing = [];
  for (const [rel, r] of [...A].sort()) {
    const b = B.get(rel); if (!b) { missing.push(`NO-BASE ${rel} (${r.cells.length} cells, ${r.tally})`); continue; }
    const bk = new Map(b.cells.map((c) => [c.key, c]));
    for (const c of r.cells) {
      const o = bk.get(c.key); if (!o) { newc++; flips.push(`NEW   ${rel} · ${c.v} · ${c.line}`); continue; }
      if (o.v !== c.v) { flip++; flips.push(`FLIP  ${rel} · ${o.v} → ${c.v} · ${c.gate}\n   p8 ${o.line}\n   p9 ${c.line}`); }
      else if (o.line !== c.line) { moved++; moves.push(`MOVED ${rel} · ${c.v} · ${c.gate}\n   p8 ${o.line}\n   p9 ${c.line}`); }
      else same++;
    }
    if (b.tally !== r.tally) flips.push(`TALLY ${rel} · p8 ${b.tally} · p9 ${r.tally}`);
  }
  lines.push(`DIGEST-COMPARE · files ${A.size} (base ${B.size}) · cells identical ${same} · verdict held, numbers moved ${moved} · verdict flipped ${flip} · no base cell ${newc}`);
  lines.push(...flips, ...missing, ...moves);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join("\n") + "\n");
console.log(lines[0].startsWith("DIGEST") ? lines[0] : `digest · ${A.size} files · ${lines.length} lines → ${out}`);
