#!/usr/bin/env node
// tally12.mjs --base <re-keyed base> --route <route> [--base-rerun r]… [--route-rerun r]… [--new <file>]
// critique-B pass 12 · written and hashed BEFORE reading pass-12/B-kit. An independent re-derivation of the browser bar
// from committed reports (P7-R2 as RULINGS states it), with its own kind check (rekeyedFrom: --base and --base-rerun
// must carry it, --route and --route-rerun must not) and its own EXTENT check (§P11-6.3, P11-R1 (a), read
// independently of the kit's map): every spec the route holds must have results in --base, except the specs listed in
// --new (one path per line: the route's new specs, which the caller derives and prints). With no --new, every route spec
// must be in the base.
// Keys `spec :: title #n`; a pass is status "expected"; BASE-GREEN: the base full run passes it and every base rerun that
// reports it passes it; FLAKY: the full run passes it and some base rerun fails it; HELD: every route run that reports
// it passes it and one does; FAILED; ABSENT. Prints `KIND` per report, the counts, every key not held, every route spec
// the base lacks, and `ACCOUNTED base-green <n> = held + failed + absent : yes|NO`, and one line per base-green key's
// disposition count by spec dir. Exit 0 nothing unheld, 1 something unheld, 2 malformed, wrong-kind or partial input, a
// flag with no value, or a duplicated single-valued flag.
import { readFileSync } from "node:fs";
process.on("uncaughtException", (e) => { console.error(`tally12: no verdict: ${e?.message ?? e}`); process.exit(2); });
const a = process.argv.slice(2);
const KNOWN = new Set(["--base", "--route", "--base-rerun", "--route-rerun", "--new"]);
for (let i = 0; i < a.length; i += 2) { if (!KNOWN.has(a[i])) throw new Error(`unknown argument ${a[i]}`); if (!a[i + 1] || a[i + 1].startsWith("--")) throw new Error(`${a[i]} has no value`); }
const all = (k) => a.flatMap((x, i) => (x === k ? [a[i + 1]] : []));
const one = (k, opt = false) => { const v = all(k); if (opt && !v.length) return null; if (v.length !== 1) throw new Error(`${k} must appear exactly once (got ${v.length})`); return v[0]; };
const read = (f, rekeyed) => {
    const r = JSON.parse(readFileSync(f, "utf8"));
    if (r?.$schema !== "browser-seat/2" || !Array.isArray(r.results) || !r.results.length) throw new Error(`${f}: not a non-empty browser-seat/2 report`);
    for (const x of r.results) if (typeof x?.spec !== "string" || typeof x?.title !== "string" || typeof x?.status !== "string") throw new Error(`${f}: a result without spec, title, status`);
    const has = r.rekeyedFrom !== undefined && r.rekeyedFrom !== null;
    if (has !== rekeyed) throw new Error(`${f}: wrong kind (${has ? "a re-keyed base" : "not a re-keyed base"} in a ${rekeyed ? "base" : "route"} slot)`);
    console.log(`KIND ${f.split("/").slice(-2).join("/")}: testDir ${r.testDir}, rekeyedFrom ${has ? "yes" : "no"}, results ${r.results.length}`);
    return r;
};
const keyed = (r) => { const n = new Map(), m = new Map(); for (const x of r.results) { const k = `${x.spec} :: ${x.title}`; const i = (n.get(k) ?? 0) + 1; n.set(k, i); m.set(`${k} #${i}`, x.status); } return m; };
const B = read(one("--base"), true), R = read(one("--route"), false);
if (B.testDir !== R.testDir) throw new Error(`base keyed from ${B.testDir}, route from ${R.testDir}`);
const BR = all("--base-rerun").map((f) => read(f, true)), RR = all("--route-rerun").map((f) => read(f, false));
for (const x of [...BR, ...RR]) if (x.testDir !== R.testDir) throw new Error("a rerun keyed from another testDir");
const nf = one("--new", true);
const NEW = new Set(nf ? readFileSync(nf, "utf8").split("\n").map((s) => s.trim()).filter(Boolean) : []);
const bSpecs = new Set(B.results.map((x) => x.spec)), rSpecs = new Set(R.results.map((x) => x.spec));
const lacks = [...rSpecs].filter((s) => !bSpecs.has(s));
for (const s of lacks) console.log(`ROUTE-SPEC-NOT-IN-BASE ${s}${NEW.has(s) ? " (listed new)" : ""}`);
const unlisted = lacks.filter((s) => !NEW.has(s));
if (unlisted.length) throw new Error(`a partial base: ${unlisted.length} route spec(s) with no base results and not listed new (first: ${unlisted[0]})`);
console.log(`reports: base ${B.results.length} (${bSpecs.size} specs); route ${R.results.length} (${rSpecs.size} specs); base reruns ${BR.length}, route reruns ${RR.length}; new ${NEW.size}`);
const kb = keyed(B), kr = keyed(R), kbr = BR.map(keyed), krr = RR.map(keyed);
let green = 0, flaky = 0, held = 0; const failed = [], absent = [], flakies = [];
const byDir = new Map(); const bump = (k, d) => { const top = k.split("/").slice(0, 2).join("/"); const m = byDir.get(top) ?? { held: 0, failed: 0, absent: 0 }; m[d]++; byDir.set(top, m); };
for (const [k, s] of kb) {
    if (s !== "expected") continue;
    if (kbr.some((m) => m.has(k) && m.get(k) !== "expected")) { flaky++; flakies.push(k); continue; }
    green++;
    const runs = [kr, ...krr].filter((m) => m.has(k)).map((m) => m.get(k));
    if (!runs.length) { absent.push(k); bump(k, "absent"); } else if (runs.every((x) => x === "expected")) { held++; bump(k, "held"); } else { failed.push(`${k} | route ${runs.join(",")}`); bump(k, "failed"); }
}
for (const k of flakies) console.log(`FLAKY ${k}`);
for (const k of failed) console.log(`FAILED ${k}`);
for (const k of absent) console.log(`ABSENT ${k}`);
for (const [d, m] of [...byDir].sort()) console.log(`BYDIR ${d}: held ${m.held} failed ${m.failed} absent ${m.absent}`);
console.log(`base keys ${kb.size}; route keys ${kr.size}; route keys the base lacks ${[...kr.keys()].filter((k) => !kb.has(k)).length}`);
console.log(`base-green ${green}; held ${held}; failed ${failed.length}; absent ${absent.length}; flaky ${flaky}`);
console.log(`ACCOUNTED base-green ${green} = held ${held} + failed ${failed.length} + absent ${absent.length} : ${green === held + failed.length + absent.length ? "yes" : "NO"}`);
process.exit(failed.length + absent.length ? 1 : 0);
