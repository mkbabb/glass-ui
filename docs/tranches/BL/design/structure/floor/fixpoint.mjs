#!/usr/bin/env node
// fixpoint.mjs — F-7 to a fixpoint (FD-2): propose the placement moves (R-2 units, the
// FD-1 publication anchor), apply them with the F-2 engine, repeat until a pass proposes
// nothing. FD-2 is the engine's stop: a pass that would add a co-cyclic module pair is
// refused before anything is written, and the run stops there, naming the pass.
//   node fixpoint.mjs --root <linked worktree> [--zone src] [--scan-deltas decl.json]
//                     [--out dir] [--max 6] [--dry]
// decl.json: { "scanDeltas": [...] } as move.mjs takes them. Each pass is handed the
// declarations that cover one of its deltas; a declaration no pass used is stale and fails
// the run (the ledger rule, over the whole fixpoint). --dry plans pass 1 and writes nothing.
// NEEDS-NAME targets are reported and never moved (S-7).
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildGraph, countBy } from "./lib/graph.mjs";
import { runMoves } from "./lib/move.mjs";
import { dirUnits, placeAll, proposedPath, publicationAnchor } from "./lib/placement.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root") ?? "");
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("fixpoint.mjs refuses the main checkout: run it in a linked worktree"); process.exit(2); }
const zones = (opt("--zone") ?? "src").split(",");
const max = Number(opt("--max") ?? 6);
const dry = args.includes("--dry");
const out = opt("--out") ? resolve(opt("--out")) : null;
if (out) mkdirSync(out, { recursive: true });
const declared = opt("--scan-deltas") ? JSON.parse(readFileSync(opt("--scan-deltas"), "utf8")).scanDeltas ?? [] : [];
const used = new Set();
const covers = (x, d) => x.scanner === d.scanner && x.spec === d.spec && (x.all === true || x.file === d.file);

const passes = [];
let stop = null;
for (let i = 1; i <= max; i++) {
    const g = buildGraph(root);
    const p = placeAll(g, dirUnits(), { zones, anchor: publicationAnchor(g) });
    const proposed = p.rows.filter((r) => r.class === "move" || r.class === "global").map((r) => ({ from: r.file, to: proposedPath(g.tree, r) }));
    const claims = countBy(proposed, "to");
    const named = proposed.filter((m) => claims[m.to] > 1 || g.tree.isFile(m.to));
    const moves = proposed.filter((m) => !named.includes(m));
    const row = { pass: i, byClass: countBy(p.rows, "class"), moves: moves.length, needsName: named.map((m) => `${m.from} → ${m.to}`) };
    passes.push(row);
    if (!moves.length) { row.result = "fixpoint"; break; }
    if (out) writeFileSync(join(out, `pass-${i}.json`), `${JSON.stringify({ moves }, null, 1)}\n`);
    // hand this pass the declarations that cover one of its deltas
    const plan = runMoves(root, moves, { dry: true, declaredScanDeltas: declared });
    const deltas = [...(plan.scanDeltas?.undeclared ?? [])];
    const mine = declared.filter((x) => (plan.scanDeltas?.stale ?? []).every((s) => s !== x));
    for (const x of mine) used.add(x);
    const r = runMoves(root, moves, { dry, declaredScanDeltas: mine });
    row.result = r.ok ? "applied" : r.phase;
    row.scc = r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs } : null;
    row.residue = r.residue?.length ?? 0;
    row.undeclared = deltas.length;
    row.rewrites = r.rewrites ?? 0;
    if (r.scc?.grown?.length) { stop = { pass: i, reason: "FD-2: the pass adds co-cyclic module pairs", firstAdded: r.scc.firstAdded }; break; }
    if (!r.ok) { stop = { pass: i, reason: `refused at ${r.phase}`, residue: r.residue?.slice(0, 5), undeclared: deltas.slice(0, 5).map((d) => `${d.scanner} [${d.spec}] ${d.file}`), lost: r.image?.lost?.slice(0, 5), gained: r.image?.gained?.slice(0, 5) }; break; }
    if (dry) break;
}
const stale = declared.filter((x) => !used.has(x));
const doc = { root, zones, dry, passes, stop, staleDeclarations: stale.length };
if (out) writeFileSync(join(out, "fixpoint.json"), `${JSON.stringify(doc, null, 1)}\n`);
console.log(JSON.stringify(doc, null, 1));
process.exit(stop || stale.length ? 1 : 0);
