#!/usr/bin/env node
// graph.mjs — F-1 CLI. Builds the graph, prints edge counts by kind and by resolution,
// lists every violation, and exits 1 when there is one.
//   node graph.mjs [--root R] [--json out.json] [--quiet]
import { writeFileSync } from "node:fs";
import { DEFAULT_ROOT } from "./lib/tree.mjs";
import { buildGraph, countBy, valueSccs } from "./lib/graph.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = opt("--root") ?? DEFAULT_ROOT;
const t0 = Date.now();
const g = buildGraph(root);
const sccs = valueSccs(g, "src");
const summary = {
    root: g.tree.root,
    parsedFiles: g.tree.parsed.length,
    treeFiles: g.tree.files.length,
    aliases: g.aliases.map((a) => ({ key: a.key, target: a.target, planes: a.planes.length })),
    edges: g.edges.length,
    fileEdges: g.edges.filter((e) => e.to).length,
    byKind: countBy(g.edges, "kind"),
    byVia: countBy(g.edges, "via"),
    violations: g.violations.length,
    violationsByKind: countBy(g.violations, "kind"),
    fsReadCensus: g.census.length,
    srcValueSccs: sccs.map((c) => c.length),
    ms: Date.now() - t0,
};
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ summary, violations: g.violations, sccs, census: g.census, edges: g.edges.map(({ spans, ...e }) => e) }, null, 1));
console.log(JSON.stringify(summary, null, 1));
if (!args.includes("--quiet")) for (const v of g.violations) console.log(`VIOLATION ${v.kind} ${v.from}:${v.line ?? ""} [${v.edgeKind ?? ""}] ${v.spec}${v.pattern ? ` (${v.pattern})` : ""}${v.target ? ` → ${v.target}` : ""}`);
process.exit(g.violations.length ? 1 : 0);
