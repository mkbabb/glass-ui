#!/usr/bin/env node
// gates.mjs — the floor's invariant gates, one runner (F-9: wired into `npm test`).
//   F-1 graph      every reference resolves, or the ledger declares it
//   F-3 entries    the record regenerates exports + typesVersions byte-equal; guard clean
//   F-4 cascade    the declared terminal is the last @import of ./styles, one importer
//   F-9 surface    the built dist's doors and names equal the pin (needs `npm run build`)
//   node gates.mjs [--root R] [--json]
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { DEFAULT_ROOT, openTree, pinPath } from "./lib/tree.mjs";
import { buildGraph, countBy } from "./lib/graph.mjs";
import { compareToPackage, loadRecord, validateRecord } from "./lib/entries.mjs";
import { contract } from "./cascade.mjs";
import { diffSurface, readSurface } from "./surface.mjs";

const args = process.argv.slice(2);
const root = resolve(args.includes("--root") ? args[args.indexOf("--root") + 1] : DEFAULT_ROOT);
const checks = [];

const g = buildGraph(root);
checks.push({ id: "F-1 graph", pass: g.violations.length === 0, detail: { edges: g.edges.length, violations: g.violations.length, byKind: countBy(g.violations, "kind"), first: g.violations.slice(0, 5) } });

const tree = openTree(root);
const record = loadRecord(tree);
const guard = validateRecord(record, tree);
const cmp = compareToPackage(record, JSON.parse(readFileSync(join(root, "package.json"), "utf8")));
checks.push({ id: "F-3 entries", pass: guard.length === 0 && cmp.exportsByteEqual && cmp.typesVersionsByteEqual, detail: { exportKeys: cmp.exportKeys, typesVersions: cmp.typesVersions, exportsByteEqual: cmp.exportsByteEqual, typesVersionsByteEqual: cmp.typesVersionsByteEqual, guard } });

const c = await contract(root, g);
checks.push({ id: "F-4 cascade contract", pass: c.pass, detail: c });

const dist = join(root, "dist");
if (!existsSync(join(dist, "glass-ui.js"))) checks.push({ id: "F-9 surface pin", pass: false, detail: "no dist/ — run `npm run build` first (CI builds before `npm test`)" });
else {
    const pin = JSON.parse(readFileSync(join(root, pinPath(root)), "utf8"));
    const now = await readSurface(root, dist);
    const diff = diffSurface(pin, now);
    checks.push({ id: "F-9 surface pin", pass: diff.length === 0, detail: { pinned: pin.totals, now: now.totals, differences: diff.slice(0, 40) } });
}

const pass = checks.every((x) => x.pass);
if (args.includes("--json")) console.log(JSON.stringify({ pass, checks }, null, 1));
else for (const x of checks) console.log(`${x.pass ? "PASS" : "FAIL"}  ${x.id}  ${JSON.stringify(x.detail).slice(0, 240)}`);
process.exit(pass ? 0 : 1);
