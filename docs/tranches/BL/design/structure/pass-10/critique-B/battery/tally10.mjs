#!/usr/bin/env node
// tally10.mjs --base <re-keyed base> --route <route> [--base-rerun r]… [--route-rerun r]… · critique-B pass 10 ·
// written and hashed BEFORE reading pass-10/B-kit. An independent re-derivation of the browser bar from committed
// reports, so the kit's tally is checked against a second reader rather than against itself.
// Rules (P7-R2 as RULINGS states it): a key is `spec :: title #n` (n numbers equal spec+title pairs in report order);
// a pass is status "expected"; a key is BASE-GREEN when the base full run passes it and every base rerun that reports
// it passes it; FLAKY when the full run passes it and some base rerun fails it (out of the bar); a base-green key is
// HELD when every route run that reports it passes it and at least one does, FAILED when a route run reports it not
// passing, ABSENT when no route run reports it. Prints the status histogram of each report, the four counts, every
// key not held, and `ACCOUNTED base-green <n> = held <h> + failed <f> + absent <a>`. Exit 0 when nothing is unheld, 1
// when something is, 2 on any malformed input.
import { readFileSync } from "node:fs";
process.on("uncaughtException", (e) => { console.error(`tally10: no verdict: ${e?.message ?? e}`); process.exit(2); });
const a = process.argv.slice(2); const all = (k) => a.flatMap((x, i) => (x === k ? [a[i + 1]] : []));
const read = (f) => { const r = JSON.parse(readFileSync(f, "utf8")); if (r?.$schema !== "browser-seat/2" || !Array.isArray(r.results) || !r.results.length) throw new Error(`${f}: not a non-empty browser-seat/2 report`); return r; };
const keyed = (r) => { const n = new Map(), m = new Map(); for (const x of r.results) { const k = `${x.spec} :: ${x.title}`; const i = (n.get(k) ?? 0) + 1; n.set(k, i); m.set(`${k} #${i}`, x.status); } return m; };
const hist = (r) => { const h = {}; for (const x of r.results) h[x.status] = (h[x.status] ?? 0) + 1; return JSON.stringify(h); };
const [bf] = all("--base"), [rf] = all("--route"); if (!bf || !rf) throw new Error("--base and --route are required");
const B = read(bf), R = read(rf); const BR = all("--base-rerun").map(read), RR = all("--route-rerun").map(read);
console.log(`reports: base ${B.results.length} ${hist(B)} testDir ${B.testDir}; route ${R.results.length} ${hist(R)} testDir ${R.testDir}; base reruns ${BR.length}, route reruns ${RR.length}`);
const kb = keyed(B), kr = keyed(R), kbr = BR.map(keyed), krr = RR.map(keyed);
let green = 0, flaky = 0, held = 0; const failed = [], absent = [], flakies = [];
for (const [k, s] of kb) {
    if (s !== "expected") continue;
    if (kbr.some((m) => m.has(k) && m.get(k) !== "expected")) { flaky++; flakies.push(k); continue; }
    green++;
    const runs = [kr, ...krr].filter((m) => m.has(k)).map((m) => m.get(k));
    if (!runs.length) absent.push(k); else if (runs.every((x) => x === "expected")) held++; else failed.push(`${k} | route ${runs.join(",")}`);
}
for (const k of flakies) console.log(`FLAKY ${k}`);
for (const k of failed) console.log(`FAILED ${k}`);
for (const k of absent) console.log(`ABSENT ${k}`);
const routeOnly = [...kr.keys()].filter((k) => !kb.has(k)).length;
console.log(`base keys ${kb.size}; route keys ${kr.size}; route keys the base lacks ${routeOnly}`);
console.log(`base-green ${green}; held ${held}; failed ${failed.length}; absent ${absent.length}; flaky ${flaky}`);
console.log(`ACCOUNTED base-green ${green} = held ${held} + failed ${failed.length} + absent ${absent.length} : ${green === held + failed.length + absent.length ? "yes" : "NO"}`);
process.exit(failed.length + absent.length ? 1 : 0);
