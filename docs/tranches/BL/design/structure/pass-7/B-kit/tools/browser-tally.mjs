#!/usr/bin/env node
// browser-tally.mjs — the base-green tally of a route report against a re-keyed base report,
// both browser-seat/2 (pass 7, P6-G4). A test is keyed `spec :: title`. Base-green is a key the
// base reports `expected`; a new failure is a base-green key the route does not report
// `expected`. A route key with no base key (a spec a row split under a new stem) is matched by
// title against the base's results and reported with both statuses, so nothing is dropped.
//   node tools/browser-tally.mjs <base-rekeyed.json> <route.json>
import { readFileSync } from "node:fs";

const [b, r] = process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, "utf8")));
const key = (x) => `${x.spec} :: ${x.title}`;
const base = new Map(b.results.map((x) => [key(x), x.status]));
const route = new Map(r.results.map((x) => [key(x), x.status]));
let green = 0, held = 0, fixed = 0;
const fresh = [], unkeyed = [];
for (const [k, s] of route) {
    if (!base.has(k)) { unkeyed.push(k); continue; }
    if (base.get(k) === "expected") { green++; if (s === "expected") held++; else fresh.push(`${k} -> ${s}`); }
    else if (base.get(k) === "unexpected" && s === "expected") fixed++;
}
console.log(`base keys ${base.size}, route keys ${route.size}; base-green ${green}, held on the route ${held}; base-red route-green ${fixed}`);
for (const f of fresh) console.log(`NEW ${f}`);
for (const k of unkeyed) {
    const title = k.slice(k.indexOf(" :: ") + 4);
    const m = b.results.filter((y) => y.title === title).map((y) => `${y.spec}=${y.status}`);
    console.log(`UNKEYED ${k} -> ${route.get(k)} | base by title: ${m.join(", ") || "none (a new test)"}`);
}
