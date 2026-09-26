#!/usr/bin/env node
// tally.mjs · read the JSON a battery run wrote (<out>/runs/<label>/*.json) and print, per witness and engine,
// the verdict, the arm tally and the gating cells per scene, as Markdown table rows. No browser; it reads files.
//   node tally.mjs <out>/runs/<label> [--scenes] [--fails]
//   --scenes   one row per scene: gating passed / measured, plus the unmigrated arm's tally beside it
//   --fails    every failing gating cell's line (and every failing unmigrated cell), for the record
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib.mjs";

const a = parseArgs();
const dir = a.positional[0];
if (!dir || !fs.existsSync(dir)) { console.error("usage: node tally.mjs <out>/runs/<label> [--scenes] [--fails]"); process.exit(2); }
const order = ["T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E"];
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
  .sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id) || String(x.engine).localeCompare(String(y.engine)));
console.log("| witness | engine | verdict | tally | load at start / end |");
console.log("|---|---|---|---|---|");
for (const r of files) console.log(`| ${r.id} | ${r.engineLabel} | ${r.pass ? "PASS" : "FAIL"} | ${r.tally} | ${r.run?.loadStart ?? "?"} → ${r.run?.loadEnd ?? "?"} |`);
if (a.scenes) {
  console.log("\n| witness | engine | scene | arm | gating pass / measured | unmeasured |");
  console.log("|---|---|---|---|---|---|");
  for (const r of files) {
    const by = new Map();
    for (const c of r.cells) {
      if (!c.gating && c.arm !== "unmigrated") continue;
      if (c.fillOnly) continue;
      const k = `${c.scene ?? "(run)"}|${c.arm ?? "library"}`;
      const e = by.get(k) ?? { p: 0, n: 0, u: 0 };
      if (c.pass === null) e.u++; else { e.n++; if (c.pass) e.p++; }
      by.set(k, e);
    }
    for (const [k, e] of by) { const [s, arm] = k.split("|"); console.log(`| ${r.id} | ${r.engine} | ${s} | ${arm} | ${e.p}/${e.n} | ${e.u || ""} |`); }
  }
}
if (a.fails) {
  for (const r of files) {
    const bad = r.cells.filter((c) => c.pass === false && (c.gating || c.arm === "unmigrated") && !c.fillOnly);
    if (!bad.length) continue;
    console.log(`\n${r.id} · ${r.engineLabel}`);
    for (const c of bad) console.log(`  ${c.arm && c.arm !== "library" ? `[${c.arm}] ` : ""}${c.line}`);
  }
}
