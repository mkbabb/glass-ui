// Analyze a census JSON: surface the genuine WCAG-collapse rows (hard legibility floor),
// grouped by route + severity. APCA-only fails on WCAG-legible subordinate muted text are
// reported separately (the "opaque-canvas KEPT" deliberately-subordinate register the prior
// judge established as acceptable). Optional second arg = light census for mode-specificity.
import { readFileSync } from "node:fs";
const darkF = process.argv[2];
const lightF = process.argv[3];
const dark = JSON.parse(readFileSync(darkF, "utf8"));
const light = lightF ? JSON.parse(readFileSync(lightF, "utf8")) : null;

// Build a light-fail lookup keyed by route+sample+txt to test mode-specificity.
const lightFailKey = new Set();
if (light) {
  for (const k of Object.keys(light)) {
    const r = light[k];
    for (const v of r.violations || []) {
      if (v.wcagFail) lightFailKey.add(`${r.route}|${v.sample}|${v.cls}`);
    }
  }
}

let totalWcag = 0, totalApcaOnly = 0;
const bySeverity = { "≤1.5 (illegible)": [], "1.5-2.5": [], "2.5-3.5": [], "3.5-4.5 (marginal)": [] };
const routeWcag = {};

for (const k of Object.keys(dark)) {
  const r = dark[k];
  for (const v of r.violations || []) {
    if (!v.wcagFail) { if (v.apcaFail) totalApcaOnly++; continue; }
    totalWcag++;
    routeWcag[r.route] = (routeWcag[r.route] || 0) + 1;
    const modeSpecific = light ? !lightFailKey.has(`${r.route}|${v.sample}|${v.cls}`) : "?";
    const row = { route: r.route, sample: v.sample, cls: v.cls, ratio: v.ratio, lc: v.lc,
      fpx: v.fpx, fw: v.fw, wcagFloor: v.wcagFloor, scope: v.scope, hasImg: v.hasImg,
      txt: v.txt, plate: v.plate, darkSpecific: modeSpecific };
    let bucket = "3.5-4.5 (marginal)";
    if (v.ratio <= 1.5) bucket = "≤1.5 (illegible)";
    else if (v.ratio <= 2.5) bucket = "1.5-2.5";
    else if (v.ratio <= 3.5) bucket = "2.5-3.5";
    bySeverity[bucket].push(row);
  }
}

console.log(`=== census: ${darkF.split("/").pop()} ===`);
console.log(`TOTAL WCAG-fail nodes: ${totalWcag}   |   APCA-only fails (WCAG-legible subordinate): ${totalApcaOnly}`);
console.log(`\n=== WCAG-fail by route (route: count) ===`);
for (const [rt, c] of Object.entries(routeWcag).sort((a,b)=>b[1]-a[1])) console.log(`  ${String(c).padStart(3)}  ${rt}`);

for (const [sev, rows] of Object.entries(bySeverity)) {
  if (!rows.length) continue;
  console.log(`\n=== ${sev}  (${rows.length} nodes) ===`);
  for (const row of rows.sort((a,b)=>a.ratio-b.ratio)) {
    const ds = row.darkSpecific === true ? "DARK-SPEC" : row.darkSpecific === false ? "both-modes" : "?";
    console.log(`  ${String(row.ratio).padStart(5)}  Lc${String(row.lc).padStart(4)}  ${row.wcagFloor===3?"lg":"bd"}  ${ds.padEnd(10)} ${row.scope.padEnd(6)}${row.hasImg?" IMG":"    "}  [${row.route}]  "${row.sample}"  txt[${row.txt}] on[${row.plate}]  .${row.cls}`);
  }
}
