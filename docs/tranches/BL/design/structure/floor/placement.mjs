#!/usr/bin/env node
// placement.mjs — F-7 CLI: every src file's home under R-2's unit set with the FD-1
// publication anchor (P3-R1), the move list the rule proposes, and the R-8 files' readers.
//   node placement.mjs [--root R] [--json out.json] [--moves out.json] [--zone src] [--anchor publication|none]
import { writeFileSync } from "node:fs";
import { DEFAULT_ROOT } from "./lib/tree.mjs";
import { buildGraph, countBy } from "./lib/graph.mjs";
import { dirUnits, placeAll, proposedPath, publicationAnchor } from "./lib/placement.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = opt("--root") ?? DEFAULT_ROOT;
const zones = (opt("--zone") ?? "src").split(",");
const g = buildGraph(root);
const anchorArm = opt("--anchor") ?? "publication";
if (!["publication", "none"].includes(anchorArm)) { console.error("--anchor publication|none"); process.exit(2); }
const p = placeAll(g, dirUnits(), { zones, anchor: anchorArm === "publication" ? publicationAnchor(g) : null });
const proposed = p.rows.filter((r) => r.class === "move" || r.class === "global").map((r) => ({ from: r.file, to: proposedPath(g.tree, r), class: r.class, readerUnits: r.readerUnits }));
// a target two files claim, or one that already exists, needs an authored name (S-7): reported, never emitted
const claims = countBy(proposed, "to");
const collisions = proposed.filter((m) => claims[m.to] > 1 || g.tree.isFile(m.to));
const moves = proposed.filter((m) => !collisions.includes(m));
const R8 = ["springProjection.ts", "safari-probe.mjs", "pi-runner-manifest.mjs", "Code.vue"];
const r8 = R8.map((name) => {
    const files = g.tree.files.filter((f) => f.endsWith(`/${name}`));
    return files.map((f) => ({ file: f, readers: g.edges.filter((e) => e.to === f).map((e) => `${e.from}:${e.line} [${e.kind}]`) }));
}).flat();
const summary = { units: p.units, anchor: anchorArm, zones, files: p.rows.length, byClass: countBy(p.rows, "class"), proposedMoves: moves.length, needsName: collisions.length };
console.log(JSON.stringify(summary, null, 1));
for (const m of collisions) console.log(`NEEDS-NAME ${m.from} → ${m.to} (${claims[m.to] > 1 ? `${claims[m.to]} files claim it` : "target exists"})`);
console.log("R-8 readers at HEAD:");
for (const x of r8) console.log(`  ${x.file}: ${x.readers.length ? x.readers.join("; ") : "(no reader)"}`);
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ summary, rows: p.rows, moves, collisions, r8 }, null, 1));
if (opt("--moves")) writeFileSync(opt("--moves"), JSON.stringify({ moves: moves.map(({ from, to }) => ({ from, to })) }, null, 1));
