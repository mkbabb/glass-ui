#!/usr/bin/env node
// browser-rederive.mjs <browser dir> · critique-B pass 7 · written AFTER the battery hash (not part of it).
// Re-derives the browser verdict from the committed browser-seat/2 reports alone, without the route's tally tool:
//   base-green = keys (spec :: title) whose status is "expected" in the rekeyed base report;
//   new failure = a base-green key whose route status is not "expected" (missing counts as a failure);
//   per band = the route report's own band->spec table, base-green and new counted from the two results arrays;
//   the D2 reruns = every blob-rerun-*.json, the D2 key's status per run.
// Also checks the rekey: the base report and the rekeyed base hold the same multiset of statuses and titles.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const D = process.argv[2];
const J = (f) => JSON.parse(readFileSync(join(D, f), "utf8"));
const base = J("base.json"), rb = J("base-rekeyed.json"), route = J("route.json");
const key = (r) => `${r.spec} :: ${r.title}`;
const index = (rep) => { const m = new Map(); for (const r of rep.results) { const k = key(r); if (m.has(k)) m.set(k, `${m.get(k)},${r.status}`); else m.set(k, r.status); } return m; };
const B = index(rb), R = index(route), B0 = index(base);
const dup = (rep) => rep.results.length - index(rep).size;
console.log(`schema base=${base.$schema} rekeyed=${rb.$schema} route=${route.$schema}; dup keys base=${dup(base)} rekeyed=${dup(rb)} route=${dup(route)}`);
const tally = (m) => { const t = {}; for (const s of m.values()) t[s] = (t[s] ?? 0) + 1; return JSON.stringify(t); };
console.log(`statuses base ${tally(B0)} | rekeyed ${tally(B)} | route ${tally(R)}`);
const titles = (rep) => rep.results.map((r) => `${r.title}|${r.status}`).sort().join("\n");
console.log(`rekey preserves (title,status) multiset: ${titles(base) === titles(rb)}; unmapped=${JSON.stringify(rb.unmapped ?? null)}`);
const green = [...B].filter(([, s]) => s === "expected").map(([k]) => k);
const newF = green.filter((k) => R.get(k) !== "expected");
console.log(`base-green ${green.length}; held on route ${green.length - newF.length}; new failures ${newF.length}`);
for (const k of newF) console.log(`  NEW ${k} -> ${R.get(k) ?? "MISSING"}`);
const redGreen = [...B].filter(([k, s]) => s === "unexpected" && R.get(k) === "expected").length;
console.log(`base-red route-green ${redGreen}`);
const routeOnly = [...R.keys()].filter((k) => !B.has(k));
const baseOnly = [...B.keys()].filter((k) => !R.has(k));
console.log(`route-only keys ${routeOnly.length}; base-only keys ${baseOnly.length}`);
for (const k of routeOnly) { const t = k.split(" :: ").slice(1).join(" :: "); const bt = [...B].filter(([bk]) => bk.endsWith(` :: ${t}`)).map(([bk, s]) => `${bk.split(" :: ")[0]}=${s}`); console.log(`  ROUTE-ONLY ${k} -> ${R.get(k)} | base by title: ${bt.join(";") || "none"}`); }
for (const k of baseOnly) console.log(`  BASE-ONLY ${k} -> ${B.get(k)}`);
// per band
const specGreen = (spec) => green.filter((k) => k.startsWith(`${spec} :: `));
let sig = 0, nosig = 0; const rows = [];
for (const b of route.bands) {
    // band specs are written against the route tree; base-green/new counted by key
    const g = b.specs.flatMap(specGreen); const n = g.filter((k) => R.get(k) !== "expected");
    if (b.specs.length) sig++; else nosig++;
    rows.push(`${b.band}: specs ${b.specs.length} base-green(own) ${b.baseGreen} base-green(rederived) ${g.length} new ${n.length}${b.signal === "signal" ? "" : " (" + b.signal + ")"}`);
}
console.log(`bands ${route.bands.length}: with specs ${sig}, without ${nosig}`);
for (const r of rows) console.log(`  ${r}`);
const mism = route.bands.filter((b) => b.specs.flatMap(specGreen).length !== b.baseGreen).map((b) => b.band);
console.log(`band base-green mismatches (own vs re-derived): ${mism.length} ${mism.join(" ")}`);
// D2 reruns
for (const f of readdirSync(D).filter((x) => /^blob-rerun-.*\.json$/.test(x)).sort()) {
    const r = J(f); const d2 = r.results.filter((x) => /\bD2\b/.test(x.title));
    console.log(`RERUN ${f}: ${d2.map((x) => `${x.status}`).join(",")} (tests ${r.tests}, passed ${r.passed}, failed ${r.failed})`);
}
