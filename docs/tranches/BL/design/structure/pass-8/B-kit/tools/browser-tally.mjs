#!/usr/bin/env node
// browser-tally.mjs — the browser bar (pass 8: P7-G2, P7-R2), from committed browser-seat/2
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
// Exit: 0 when no base-green key is unheld, 1 otherwise, 2 on a throw.
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const all = (k) => args.flatMap((a, i) => (a === k ? [args[i + 1]] : []));
const read = (f) => { const r = JSON.parse(readFileSync(f, "utf8")); if (r.$schema !== "browser-seat/2") throw new Error(`browser-tally: ${f} is ${r.$schema ?? "unversioned"}, not browser-seat/2`); return r; };
const [baseFile] = all("--base"), [routeFile] = all("--route");
if (!baseFile || !routeFile) throw new Error("browser-tally: --base and --route are required");
/** key → status for one report, duplicate titles numbered in report order */
const keyed = (rep) => {
    const n = new Map(), m = new Map();
    for (const x of rep.results) { const k = `${x.spec} :: ${x.title}`; const i = (n.get(k) ?? 0) + 1; n.set(k, i); m.set(`${k} #${i}`, x.status); }
    return m;
};
const base = read(baseFile), route = read(routeFile);
if (base.testDir !== route.testDir) throw new Error(`browser-tally: the base is keyed from ${base.testDir}, the route from ${route.testDir}; re-key the base (tools/rekey.mjs)`);
const B = keyed(base), R = keyed(route);
const specOf = (k) => k.slice(0, k.indexOf(" :: "));

if (args.includes("--plan")) {
    const specs = [...new Set([...B].filter(([k, s]) => s === "expected" && R.get(k) !== "expected").map(([k]) => specOf(k)))].sort();
    console.log(JSON.stringify({ rerun: specs, perTree: 3, order: "alternating, base first" }));
    process.exit(0);
}

const baseRuns = [B, ...all("--base-rerun").map((f) => keyed(read(f)))];
const routeRuns = [R, ...all("--route-rerun").map((f) => keyed(read(f)))];
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
const fixed = [...B].filter(([k, s]) => s === "unexpected" && R.get(k) === "expected").length;
console.log(`base keys ${B.size}, route keys ${R.size}; base runs ${baseRuns.length}, route runs ${routeRuns.length}`);
console.log(`base-green ${green.length}; held ${held.length}; NOT HELD ${failed.length + absent.length} (failed ${failed.length}, absent ${absent.length}); flaky (out of the bar) ${flaky.length}; base-red route-green ${fixed}`);
for (const f of failed) console.log(`NEW ${f}`);
for (const k of absent) console.log(`ABSENT ${k} (base-green; no route run reports it)`);
for (const f of flaky) console.log(`FLAKY ${f}`);
for (const [k, s] of R) {
    if (B.has(k)) continue;
    const t = k.slice(k.indexOf(" :: ") + 4).replace(/ #\d+$/, "");
    const m = base.results.filter((y) => y.title === t).map((y) => `${y.spec}=${y.status}`);
    console.log(`UNKEYED ${k} -> ${s} | base by title: ${m.join(", ") || "none (a new test)"}`);
}
// per band: the route report's own band → specs table; base-green and not-held keys counted by spec
const unheld = new Set([...failed.map((f) => f.split(" | ")[0]), ...absent]);
for (const b of route.bands ?? []) {
    const ks = green.filter((k) => b.specs.includes(specOf(k)));
    console.log(`BAND ${b.band}: specs ${b.specs.length}, base-green ${ks.length}, not held ${ks.filter((k) => unheld.has(k)).length}${ks.length ? "" : " (no browser signal)"}`);
}
console.log(`verdict: ${failed.length + absent.length ? "RED" : "GREEN"} (${green.length} base-green keys, every one accounted: ${held.length} held + ${failed.length} failed + ${absent.length} absent)`);
process.exitCode = failed.length + absent.length ? 1 : 0;
