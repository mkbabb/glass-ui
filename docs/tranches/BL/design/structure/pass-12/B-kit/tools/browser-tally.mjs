#!/usr/bin/env node
// browser-tally.mjs — the browser bar (pass 8: P7-G2, P7-R2; pass 12: the extent, P11-R1 (a)), from committed browser-seat/2
// reports only. It iterates the BASE's keys, never the route's, so a base-green test the
// route did not run is counted, as not held, and printed.
//
// A test is keyed `spec :: title #n`: n numbers the tests one report gives the same spec and
// title (in report order), so a duplicate title is its own key and nothing folds.
//
// P7-R2. A key is base-green when it passes on the floor base in EVERY base run that ran it
// (the full run and each rerun). A key that passes in the base's full run and fails in a base
// rerun is FLAKY: it is recorded and kept out of the bar. A base-green key is HELD when every
// route run that ran it passes it; it is NOT HELD when a route run fails it (a new failure) or
// when no route run reports it (absent). The rerun protocol (LAW §13 "The browser bar"): every
// spec holding a key the full runs leave unheld (base-green in the base run, not passed in the
// route run) runs alone, alternating base then route, three times per tree; the base reruns are
// re-keyed onto the route program (tools/rekey.mjs) like the base run.
//
//   node tools/browser-tally.mjs --base base-rekeyed.json --route route.json
//        [--base-rerun r.json]… [--route-rerun r.json]… [--plan]
// --plan prints the specs the protocol reruns (from the two full runs) and exits.
// Exit (pass 9, P8-R2; LAW §14): 0 when no base-green key is unheld, 1 otherwise, 2 on any throw.
// The tool imports nothing but node's own before its first statement, which installs the seal.mjs
// guard, so a throw anywhere (no arguments, a missing or non-JSON report, a report of another schema,
// a degenerate report: no results array, or an empty one) exits 2, never 1 (RED).
// (pass 11, P10-G1) Every report slot takes one kind, told apart by `rekeyedFrom` (LAW §14): --base
// and every --base-rerun take a RE-KEYED BASE (rekeyedFrom an object whose testDir is not the
// route's, the report itself keyed from the route's testDir); --route and every --route-rerun take a
// ROUTE RUN (no rekeyedFrom). A raw base run, a route run or rerun in a base slot, and a re-keyed
// base in a route slot are throws: each would read a comparison the bar does not make, and two of
// them read GREEN over a failing route. `baseReport` tells nothing apart: a route rerun records null.
// (pass 11, P10-G2) The command line is read by lib/argv.mjs: an option it does not take, a value-
// taking option with no value or followed by another option, and --base or --route given twice are
// throws.
// (pass 12, P11-R1 (a); LAW §14 "Extent") --base must COVER the route: every spec of --route's results that
// the chain carries from a base-program spec (lib/follow.mjs chainOrigin, the map rekey follows forward, read
// from frozen/SEQUENCE.json, onto the floor base's program at the chain's baseSha) must have results in --base, or
// the tally throws. A route spec with no base origin (one the chain creates, or one no base spec reaches) holds no
// base-green test and is printed UNKEYED; a capture spec in --route is a throw. So a partial base (a base rerun, a touched-spec pair's base, or
// a base with a spec's results deleted) judged against a fuller route is no verdict, never a verdict over the
// keys it happens to hold. Inside a covered spec, a key --route gives that --base lacks is UNBASED: a key the
// base cannot vouch for (a deleted base result, or a test the route has and the base does not; the chain adds
// none) is not held, so it reads RED, never GREEN. The rerun slots stay partial by design (P7-R2).
import { readFileSync } from "node:fs";
import { posix } from "node:path";

process.on("uncaughtException", (e) => {
    console.error(`browser-tally: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const { readArgs } = await import("../lib/argv.mjs");
const { chainOrigin, baseProgram } = await import("../lib/follow.mjs");
const A = readArgs("browser-tally", process.argv.slice(2), { values: ["--base", "--route"], lists: ["--base-rerun", "--route-rerun"], switches: ["--plan"] });
const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const read = (f) => {
    const r = JSON.parse(readFileSync(f, "utf8"));
    if (r?.$schema !== "browser-seat/2") throw new Error(`browser-tally: ${f} is ${r?.$schema ?? "unversioned"}, not browser-seat/2`);
    // a degenerate report is no input: an empty run would read every base-green key absent (RED),
    // or an empty base would read GREEN over nothing
    if (!Array.isArray(r.results) || !r.results.length) throw new Error(`browser-tally: ${f} holds no results; an empty report is no verdict`);
    if (typeof r.testDir !== "string") throw new Error(`browser-tally: ${f} records no testDir`);
    // (pass 10, P9-G1) every result names its spec, title and status, and the band table is a list:
    // a result with no status would read as a failure on the route and as not-green on the base
    for (const x of r.results) if (typeof x?.spec !== "string" || typeof x?.title !== "string" || typeof x?.status !== "string") throw new Error(`browser-tally: ${f} holds a result without spec, title and status: ${JSON.stringify(x).slice(0, 120)}`);
    if (!Array.isArray(r.bands)) throw new Error(`browser-tally: ${f} holds no band table`);
    return r;
};
const baseFile = A.value("--base"), routeFile = A.value("--route");
if (baseFile === null || routeFile === null) throw new Error("browser-tally: --base and --route are required");
/** (pass 11, P10-G1) the kind a slot takes, or a throw. `route` is the route run, read first. */
const ROUTE_SLOT = (r, f, slot) => {
    if ("rekeyedFrom" in r) throw new Error(`browser-tally: ${slot} ${f} is a re-keyed base (rekeyedFrom ${JSON.stringify(r.rekeyedFrom)}), not a route run; a base read as the route is no verdict`);
    return r;
};
const BASE_SLOT = (r, f, slot, route) => {
    if (!isRecord(r.rekeyedFrom) || typeof r.rekeyedFrom.testDir !== "string") throw new Error(`browser-tally: ${slot} ${f} is not a re-keyed base (rekeyedFrom ${JSON.stringify(r.rekeyedFrom)}): ${r.testDir === route.testDir ? "a route run or rerun" : "a base run not re-keyed: re-key the base (tools/rekey.mjs)"} read as the base is no verdict`);
    if (r.rekeyedFrom.testDir === route.testDir) throw new Error(`browser-tally: ${slot} ${f} was re-keyed from ${r.rekeyedFrom.testDir}, the route's own testDir: it is a route report re-keyed, not a base`);
    return r;
};
/** key → status for one report, duplicate titles numbered in report order */
const keyed = (rep) => {
    const n = new Map(), m = new Map();
    for (const x of rep.results) { const k = `${x.spec} :: ${x.title}`; const i = (n.get(k) ?? 0) + 1; n.set(k, i); m.set(`${k} #${i}`, x.status); }
    return m;
};
const route = ROUTE_SLOT(read(routeFile), routeFile, "--route");
const base = BASE_SLOT(read(baseFile), baseFile, "--base", route);
if (base.testDir !== route.testDir) throw new Error(`browser-tally: the base is keyed from ${base.testDir}, the route from ${route.testDir}; re-key the base (tools/rekey.mjs)`);
const B = keyed(base), R = keyed(route);
const specOf = (k) => k.slice(0, k.indexOf(" :: "));

// (pass 12, P11-R1 (a)) the extent: --base covers every spec of --route with a base origin, a spec of the base
// program (lib/follow.mjs baseProgram, the floor base's specs at the chain's baseSha) the chain carries to it
const PROGRAM = baseProgram();
const origin = chainOrigin();
const toRepo = (k) => posix.normalize(posix.join(route.testDir, k));
const baseSpecs = new Set([...B.keys()].map(specOf));
const routeSpecs = new Set([...R.keys()].map(specOf));
const created = [], uncovered = [], unbased = [];
for (const spec of routeSpecs) {
    if (spec.slice(spec.lastIndexOf("/") + 1).startsWith("_")) throw new Error(`browser-tally: --route ${routeFile} reports ${spec}, a capture spec, which no run selects (LAW §13); a route report of another program is no verdict`);
    const o = origin(toRepo(spec));
    // no base origin: a spec the chain creates (a row with no row-move pair), or one no base program spec reaches;
    // either holds no base-green key, so it is printed (UNKEYED) and judged for nothing
    if (o === null || !PROGRAM.has(o)) { created.push(spec); continue; }
    if (!baseSpecs.has(spec)) { uncovered.push(`${spec} (from ${o})`); continue; }
    for (const [k, st] of R) if (specOf(k) === spec && !B.has(k)) unbased.push(`${k} -> ${st}`);
}
if (uncovered.length) throw new Error(`browser-tally: --base ${baseFile} holds no results for ${uncovered.length} of the route's ${routeSpecs.size - created.length} base-origin spec(s) (${uncovered.slice(0, 3).join(", ")}${uncovered.length > 3 ? ", …" : ""}): a partial base judged against a fuller route is no verdict`);

if (A.on("--plan")) {
    const specs = [...new Set([...B].filter(([k, s]) => s === "expected" && R.get(k) !== "expected").map(([k]) => specOf(k)))].sort();
    console.log(JSON.stringify({ rerun: specs, perTree: 3, order: "alternating, base first" }));
    process.exit(0);
}

// (pass 10, P9-G1) a rerun is keyed from the route program like the full runs: a base rerun that
// was not re-keyed (another testDir) is a report of the wrong kind, and its keys would match nothing
const rerun = (f, slot) => {
    const r = read(f);
    if (r.testDir !== route.testDir) throw new Error(`browser-tally: the rerun ${f} is keyed from ${r.testDir}, the route from ${route.testDir}; re-key it (tools/rekey.mjs)`);
    return keyed(slot === "--base-rerun" ? BASE_SLOT(r, f, slot, route) : ROUTE_SLOT(r, f, slot));
};
const baseRuns = [B, ...A.list("--base-rerun").map((f) => rerun(f, "--base-rerun"))];
const routeRuns = [R, ...A.list("--route-rerun").map((f) => rerun(f, "--route-rerun"))];
const statuses = (runs, k) => runs.filter((m) => m.has(k)).map((m) => m.get(k));
const green = [], flaky = [], held = [], failed = [], absent = [];
for (const [k, s] of B) {
    if (s !== "expected") continue;
    const bs = statuses(baseRuns, k);
    if (!bs.every((x) => x === "expected")) { flaky.push(`${k} | base ${bs.join(",")} | route ${statuses(routeRuns, k).join(",") || "absent"}`); continue; }
    green.push(k);
    const rs = statuses(routeRuns, k);
    if (!rs.length) absent.push(k);
    else if (rs.every((x) => x === "expected")) held.push(k);
    else failed.push(`${k} | base ${bs.join(",")} | route ${rs.join(",")}`);
}
if (!green.length && !flaky.length) throw new Error("browser-tally: the base report passes no test; a bar over no base-green key is no verdict");
const fixed = [...B].filter(([k, s]) => s === "unexpected" && R.get(k) === "expected").length;
console.log(`base keys ${B.size}, route keys ${R.size}; base runs ${baseRuns.length}, route runs ${routeRuns.length}`);
// the summary line keeps its pass-8 shape (earlier batteries parse it); the unbased count is its own line
console.log(`base-green ${green.length}; held ${held.length}; NOT HELD ${failed.length + absent.length} (failed ${failed.length}, absent ${absent.length}); flaky (out of the bar) ${flaky.length}; base-red route-green ${fixed}`);
for (const f of failed) console.log(`NEW ${f}`);
for (const k of absent) console.log(`ABSENT ${k} (base-green; no route run reports it)`);
// the extent lines follow the summary: earlier batteries read the first "held … N" of the output
console.log(`extent: --base covers the route's ${routeSpecs.size - created.length} base-origin spec(s); route keys in them the base lacks (UNBASED) ${unbased.length}; route specs with no base origin (the chain creates them, or no base spec reaches them) ${created.length}${created.length ? `: ${created.join(", ")}` : ""}`);
console.log(`unbased ${unbased.length} (route keys of covered specs the base lacks; each counts against the bar)`);
for (const k of unbased) console.log(`UNBASED ${k} | the base holds this spec, not this key`);
const unbasedKeys = new Set(unbased.map((u) => u.slice(0, u.lastIndexOf(" -> "))));
for (const f of flaky) console.log(`FLAKY ${f}`);
for (const [k, s] of R) {
    if (B.has(k) || unbasedKeys.has(k)) continue;
    const t = k.slice(k.indexOf(" :: ") + 4).replace(/ #\d+$/, "");
    const m = base.results.filter((y) => y.title === t).map((y) => `${y.spec}=${y.status}`);
    console.log(`UNKEYED ${k} -> ${s} | base by title: ${m.join(", ") || "none (a new test)"}`);
}
// per band: the route report's own band → specs table; base-green and not-held keys counted by spec
const unheld = new Set([...failed.map((f) => f.split(" | ")[0]), ...absent]);
for (const b of route.bands) {
    const ks = green.filter((k) => b.specs.includes(specOf(k)));
    console.log(`BAND ${b.band}: specs ${b.specs.length}, base-green ${ks.length}, not held ${ks.filter((k) => unheld.has(k)).length}${ks.length ? "" : " (no browser signal)"}`);
}
const notHeld = failed.length + absent.length + unbased.length;
console.log(`verdict: ${notHeld ? "RED" : "GREEN"} (${green.length} base-green keys, every one accounted: ${held.length} held + ${failed.length} failed + ${absent.length} absent${unbased.length ? `; ${unbased.length} route key(s) unbased` : ""})`);
process.exitCode = notHeld ? 1 : 0;
