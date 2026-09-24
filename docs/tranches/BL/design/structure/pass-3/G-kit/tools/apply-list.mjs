#!/usr/bin/env node
// apply-list.mjs — apply one frozen G move list through the floor's F-2 engine (runMoves in the
// tree's own landed floor), with G's unit function for FD-2 (LAW.md L0.3: R-2 dir units, doors
// as their own nodes). FD-2 is a stop: a list that adds a co-cyclic pair is refused before
// anything is written, and this exits 1. Idempotent: an applied list reports pending 0.
//   node apply-list.mjs <list.json> --root <linked worktree> [--dry] [--out report.json]
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root") ?? "");
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("apply-list refuses the main checkout"); process.exit(2); }
const { runMoves } = await import(`${root}/scripts/structure/lib/move.mjs`);
const L = await import(`${root}/scripts/structure/eponym/law.mjs`);
const doc = JSON.parse(readFileSync(args[0], "utf8"));
const units = L.gUnits(L.context(root));
const t0 = Date.now();
const r = runMoves(root, doc.moves.map(({ from, to }) => ({ from, to })), { dry: args.includes("--dry"), declaredScanDeltas: doc.scanDeltas ?? [], units });
r.ms = Date.now() - t0;
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify(r, null, 1));
const s = {
    list: args[0].split("/").pop(), ok: r.ok, phase: r.phase ?? "applied", moves: r.moves, pending: r.pending, alreadyApplied: r.alreadyApplied,
    filesEdited: r.filesEdited, rewrites: r.rewrites, residue: r.residue?.length ?? 0,
    scanDeltas: r.scanDeltas ? { total: r.scanDeltas.total, undeclared: r.scanDeltas.undeclared.length, stale: r.scanDeltas.stale.length } : null,
    lost: r.image?.lost?.length ?? 0, gained: r.image?.gained?.length ?? 0, fd2: r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs } : null,
    digest: r.digest, ms: r.ms,
};
console.log(JSON.stringify(s));
for (const x of r.residue ?? []) console.log("RESIDUE", JSON.stringify(x).slice(0, 300));
for (const x of r.scanDeltas?.undeclared ?? []) console.log("SCAN-DELTA undeclared", JSON.stringify(x));
for (const x of r.scanDeltas?.stale ?? []) console.log("SCAN-DELTA stale", JSON.stringify(x));
for (const x of r.image?.lost ?? []) console.log("LOST", x);
for (const x of r.image?.gained ?? []) console.log("GAINED", x);
for (const [a, b] of r.scc?.addedPairs ? r.scc.firstAdded : []) console.log("FD-2 CO-CYCLIC (new)", a, "↔", b);
for (const x of (Array.isArray(r.violations) ? r.violations : []).slice(0, 20)) console.log("VIOLATION", JSON.stringify(x).slice(0, 300));
process.exit(r.ok || (args.includes("--dry") && r.preflight) ? 0 : 1);
