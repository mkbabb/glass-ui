#!/usr/bin/env node
// floor-probes/compare.mjs · two battery runs side by side, per witness × engine × scene × arm: gating cells passed /
// measured in each, and the delta. Reads the JSON files only (as tally.mjs does); no browser.
//   node compare.mjs <baseline runs dir> <candidate runs dir> [--changed]
//   --changed  print only the scene rows whose tally differs
import fs from "node:fs";
import path from "node:path";

const [A, B] = process.argv.slice(2).filter((x) => !x.startsWith("--"));
const changedOnly = process.argv.includes("--changed");
const order = ["T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E"];
function read(dir) {
  const m = new Map();
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const r = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    const by = new Map();
    for (const c of r.cells) {
      if ((!c.gating && c.arm !== "unmigrated") || c.fillOnly) continue;
      const k = `${c.scene ?? "(run)"}|${c.arm ?? "library"}`;
      const e = by.get(k) ?? { p: 0, n: 0, u: 0 };
      if (c.pass === null) e.u++; else { e.n++; if (c.pass) e.p++; }
      by.set(k, e);
    }
    m.set(`${r.id}|${r.engine}`, { r, by });
  }
  return m;
}
const a = read(A), b = read(B);
const keys = [...new Set([...a.keys(), ...b.keys()])].sort((x, y) => order.indexOf(x.split("|")[0]) - order.indexOf(y.split("|")[0]) || x.localeCompare(y));
const t = (e) => (e ? `${e.p}/${e.n}${e.u ? ` (+${e.u} unmeasured)` : ""}` : "—");
console.log("| witness | engine | baseline | candidate | load at start (candidate) |\n|---|---|---|---|---|");
for (const k of keys) { const [id, eng] = k.split("|"); console.log(`| ${id} | ${eng} | ${a.get(k)?.r.tally ?? "—"} | ${b.get(k)?.r.tally ?? "—"} | ${b.get(k)?.r.run?.loadStart ?? "?"} |`); }
console.log("\n| witness | engine | scene | arm | baseline | candidate |\n|---|---|---|---|---|---|");
for (const k of keys) {
  const [id, eng] = k.split("|");
  const sa = a.get(k)?.by ?? new Map(), sb = b.get(k)?.by ?? new Map();
  for (const s of [...new Set([...sa.keys(), ...sb.keys()])]) {
    const x = sa.get(s), y = sb.get(s);
    if (changedOnly && t(x) === t(y)) continue;
    const [scene, arm] = s.split("|");
    console.log(`| ${id} | ${eng} | ${scene} | ${arm} | ${t(x)} | ${t(y)} |`);
  }
}
