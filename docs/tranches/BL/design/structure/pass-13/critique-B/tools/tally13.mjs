#!/usr/bin/env node
// tally13.mjs <browser dir> · critique-B pass 13 · POST-HASH tool (written after the battery hash, after reading the
// kit): an independent re-derivation of the browser bar from the committed reports, sharing no code with the kit's
// browser-tally or pass 12's tally12. Key = spec :: title #n (n = occurrence of that title in that spec, 1-based).
// Base runs: base-rekeyed.json, reruns/base-*.rekeyed.json, p*-steps/base.rekeyed.json. Route runs: route.json,
// reruns/route-*.json, p*-steps/route.json. P7-R2: a key is base-green when it is "expected" in the full base and in every
// base run that ran it; a key expected in the full base and not in some base run is flaky (out of the bar). A base-green
// key is held when the full route has it and every route run that ran it reads "expected"; failed when the full route
// has it and some route run does not; absent when the full route lacks it. Prints the counts and every key not held.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
const br = process.argv[2];
if (!br || !existsSync(join(br, "route.json"))) { console.error("usage: tally13.mjs <browser dir>"); process.exit(2); }
const rd = (f) => { const j = JSON.parse(readFileSync(f, "utf8")); if (j.$schema !== "browser-seat/2" || !Array.isArray(j.results) || !j.results.length) throw new Error(`${f}: not a browser-seat/2 report with results`); return j; };
const keyed = (j) => { const seen = new Map(), m = new Map(); for (const r of j.results) { const b = `${r.spec} :: ${r.title}`; const n = (seen.get(b) ?? 0) + 1; seen.set(b, n); m.set(`${b} #${n}`, r.status); } return m; };
const pairs = readdirSync(br).filter((d) => /^p\d+-steps$/.test(d)).sort();
const rr = existsSync(join(br, "reruns")) ? readdirSync(join(br, "reruns")).sort() : [];
const baseRuns = [join(br, "base-rekeyed.json"), ...rr.filter((f) => /^base-.*\.rekeyed\.json$/.test(f)).map((f) => join(br, "reruns", f)), ...pairs.map((d) => join(br, d, "base.rekeyed.json"))];
const routeRuns = [join(br, "route.json"), ...rr.filter((f) => /^route-.*\.json$/.test(f)).map((f) => join(br, "reruns", f)), ...pairs.map((d) => join(br, d, "route.json"))];
const B = baseRuns.map((f) => keyed(rd(f))), R = routeRuns.map((f) => keyed(rd(f)));
console.log(`base runs ${B.length} (${baseRuns.map((f) => f.slice(br.length + 1)).join(", ")})`);
console.log(`route runs ${R.length} (${routeRuns.map((f) => f.slice(br.length + 1)).join(", ")})`);
console.log(`base keys ${B[0].size}, route keys ${R[0].size}`);
let green = 0, flaky = 0, held = 0, failed = 0, absent = 0; const out = [];
for (const [k, s] of B[0]) {
  if (s !== "expected") continue;
  if (B.slice(1).some((m) => m.has(k) && m.get(k) !== "expected")) { flaky++; out.push(`FLAKY ${k}`); continue; }
  green++;
  if (!R[0].has(k)) { absent++; out.push(`ABSENT ${k}`); continue; }
  if (R.some((m) => m.has(k) && m.get(k) !== "expected")) { failed++; out.push(`FAILED ${k} :: ${R.map((m) => m.get(k) ?? "-").join(",")}`); continue; }
  held++;
}
const routeSpecs = new Set([...R[0].keys()].map((k) => k.split(" :: ")[0])), baseSpecs = new Set([...B[0].keys()].map((k) => k.split(" :: ")[0]));
const newSpecs = [...routeSpecs].filter((s) => !baseSpecs.has(s)), goneSpecs = [...baseSpecs].filter((s) => !routeSpecs.has(s));
const unbased = [...R[0].keys()].filter((k) => baseSpecs.has(k.split(" :: ")[0]) && !B[0].has(k));
for (const l of out) console.log(l);
console.log(`route specs ${routeSpecs.size}, base specs ${baseSpecs.size}; route specs the base lacks ${newSpecs.length}: ${newSpecs.join(", ")}; base specs the route lacks ${goneSpecs.length}`);
console.log(`route keys of base specs the base lacks (unbased) ${unbased.length}${unbased.length ? ": " + unbased.join(" | ") : ""}`);
console.log(`base-green ${green}; held ${held}; failed ${failed}; absent ${absent}; flaky ${flaky}; accounted ${held + failed + absent === green ? "yes" : "NO"}`);
console.log(`verdict ${green > 0 && held === green && unbased.length === 0 ? "GREEN" : "RED"}`);
process.exit(green > 0 && held === green && unbased.length === 0 ? 0 : 1);
