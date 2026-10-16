#!/usr/bin/env node
// tally11.mjs --base <re-keyed base> --route <route> [--base-rerun r]… [--route-rerun r]… · critique-B pass 11 ·
// written and hashed BEFORE reading pass-11/B-kit. An independent re-derivation of the browser bar from committed
// reports (P7-R2 as RULINGS states it), with its own kind discriminant (REGISTRY §P10-0 item 2: only `rekeyedFrom`
// separates a re-keyed base from a route run or rerun in every committed report):
//   --base, --base-rerun   must carry `rekeyedFrom`;   --route, --route-rerun   must not.
// Keys `spec :: title #n`; a pass is status "expected"; BASE-GREEN: the base full run passes it and every base rerun
// that reports it passes it; FLAKY: the full run passes it and some base rerun fails it; HELD: every route run that
// reports it passes it and one does; FAILED; ABSENT. Prints `KIND` per report, the counts, every key not held, and
// `ACCOUNTED base-green <n> = held + failed + absent : yes|NO`. Exit 0 nothing unheld, 1 something unheld, 2 malformed
// or wrong-kind input, a flag with no value, or a duplicated single-valued flag.
import { readFileSync } from "node:fs";
process.on("uncaughtException", (e) => { console.error(`tally11: no verdict: ${e?.message ?? e}`); process.exit(2); });
const a = process.argv.slice(2);
const KNOWN = new Set(["--base", "--route", "--base-rerun", "--route-rerun"]);
for (let i = 0; i < a.length; i += 2) { if (!KNOWN.has(a[i])) throw new Error(`unknown argument ${a[i]}`); if (!a[i + 1] || a[i + 1].startsWith("--")) throw new Error(`${a[i]} has no value`); }
const all = (k) => a.flatMap((x, i) => (x === k ? [a[i + 1]] : []));
const one = (k) => { const v = all(k); if (v.length !== 1) throw new Error(`${k} must appear exactly once (got ${v.length})`); return v[0]; };
const read = (f, rekeyed) => {
    const r = JSON.parse(readFileSync(f, "utf8"));
    if (r?.$schema !== "browser-seat/2" || !Array.isArray(r.results) || !r.results.length) throw new Error(`${f}: not a non-empty browser-seat/2 report`);
    const has = r.rekeyedFrom !== undefined && r.rekeyedFrom !== null;
    if (has !== rekeyed) throw new Error(`${f}: wrong kind (${has ? "a re-keyed base" : "not a re-keyed base"} in a ${rekeyed ? "base" : "route"} slot)`);
    console.log(`KIND ${f.split("/").slice(-2).join("/")}: testDir ${r.testDir}, rekeyedFrom ${has ? "yes" : "no"}, baseReport ${r.baseReport === null ? "null" : r.baseReport ? "set" : "absent"}`);
    return r;
};
const keyed = (r) => { const n = new Map(), m = new Map(); for (const x of r.results) { const k = `${x.spec} :: ${x.title}`; const i = (n.get(k) ?? 0) + 1; n.set(k, i); m.set(`${k} #${i}`, x.status); } return m; };
const B = read(one("--base"), true), R = read(one("--route"), false);
const BR = all("--base-rerun").map((f) => read(f, true)), RR = all("--route-rerun").map((f) => read(f, false));
if (B.testDir === R.testDir && B.rekeyedFrom === undefined) throw new Error("base and route share a testDir and the base is not re-keyed");
console.log(`reports: base ${B.results.length} testDir ${B.testDir}; route ${R.results.length} testDir ${R.testDir}; base reruns ${BR.length}, route reruns ${RR.length}`);
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
console.log(`base keys ${kb.size}; route keys ${kr.size}; route keys the base lacks ${[...kr.keys()].filter((k) => !kb.has(k)).length}`);
console.log(`base-green ${green}; held ${held}; failed ${failed.length}; absent ${absent.length}; flaky ${flaky}`);
console.log(`ACCOUNTED base-green ${green} = held ${held} + failed ${failed.length} + absent ${absent.length} : ${green === held + failed.length + absent.length ? "yes" : "NO"}`);
process.exit(failed.length + absent.length ? 1 : 0);
