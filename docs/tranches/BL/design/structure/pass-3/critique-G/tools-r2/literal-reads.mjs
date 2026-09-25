#!/usr/bin/env node
// literal-reads.mjs: critique-G run 2, written after the battery hash (disclosed). Two literal
// readings of LAW.md against the tree, compared with what the gate counts.
//  (1) L4.2 "`src` reads no consumer zone (`demo`, `tests`, `tests-visual`, `scripts`)": every src
//      edge of LAW §E's module and read kinds into a consumer zone, tests included (the LAW text
//      names no test exemption; the gate's B8 skips `L.isTest(e.from)`).
//  (2) SPECS-v2 §4.8's multi-bin rule, which L6 does not carry: a scripts file that 2 or more bins
//      reach (static load edges from bins) and that is not in scripts/lib/.
//   node literal-reads.mjs --tree T [--out O.json]
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const T = resolve(opt("--tree"));
const G = await import(join(T, "scripts/structure/lib/graph.mjs"));
const { zoneOf } = await import(join(T, "scripts/structure/lib/tree.mjs"));
const g = G.buildGraph(T);
const KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-script-src", "sfc-template-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob", "new-url", "path-literal", "path-helper", "ts-reference"]);
const CONSUMER = new Set(["demo", "tests", "tests-visual", "scripts"]);
const isTest = (f) => /(^|\/)__tests__\/|\.(test|spec|test-d)\.(ts|tsx|mts)$|\.visual\.ts$/.test(f);
const l42 = g.edges.filter((e) => e.to && KINDS.has(e.kind) && zoneOf(e.from) === "src" && CONSUMER.has(zoneOf(e.to)));
const byFrom = [...new Set(l42.map((e) => e.from))];
// (2) scripts files reached by 2+ bins
const LOAD = new Set(["import", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "require"]);
const inScripts = (f) => f?.startsWith("scripts/");
const bins = new Set(g.edges.filter((e) => inScripts(e.to) && !inScripts(e.from)).map((e) => e.to));
const adj = new Map();
for (const e of g.edges) if (LOAD.has(e.kind) && inScripts(e.from) && inScripts(e.to)) { if (!adj.has(e.from)) adj.set(e.from, new Set()); adj.get(e.from).add(e.to); }
const reach = new Map();
for (const b of bins) { const seen = new Set([b]); const q = [b]; while (q.length) { const x = q.pop(); for (const y of adj.get(x) ?? []) if (!seen.has(y)) { seen.add(y); q.push(y); } } for (const f of seen) if (f !== b) { if (!reach.has(f)) reach.set(f, new Set()); reach.get(f).add(b); } }
const multi = [...reach].filter(([f, s]) => s.size >= 2 && !f.startsWith("scripts/lib/") && !bins.has(f)).map(([f, s]) => `${f} ← ${s.size} bins`);
const out = { l42: { edges: l42.length, fromTests: l42.filter((e) => isTest(e.from)).length, fromNonTests: l42.filter((e) => !isTest(e.from)).length, files: byFrom.length, list: l42.map((e) => `${e.from}:${e.line} → ${e.to} [${e.kind}]`) }, multiBin: { bins: bins.size, count: multi.length, list: multi } };
console.log(JSON.stringify({ l42: { ...out.l42, list: out.l42.list.slice(0, 30) }, multiBin: { ...out.multiBin, list: out.multiBin.list.slice(0, 30) } }, null, 1));
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify(out, null, 1));
