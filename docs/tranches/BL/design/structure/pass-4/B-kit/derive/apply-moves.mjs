#!/usr/bin/env node
// apply-moves.mjs — DERIVE: apply an AUTHORED move list (each move with its `why`) through the
// floor engine, declaring the scan deltas a dry run names (the test run judges each scanner),
// then freeze the list as literal JSON (F-9) and record the step on the chain.
//   node derive/apply-moves.mjs --root <wt> --authored authored/x.json --id S4a --out frozen/S4a-x.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const doc = JSON.parse(readFileSync(join(KIT, arg(args, "--authored")), "utf8"));
const list = doc.moves.map(({ from, to }) => ({ from, to }));
const dry = F.runMoves(root, list, { dry: true });
if (dry.residue?.length) { console.error(JSON.stringify({ residue: dry.residue.slice(0, 10) }, null, 1)); process.exit(1); }
if (dry.scc?.grown?.length) { console.error(JSON.stringify({ fd2: dry.scc.firstAdded }, null, 1)); process.exit(1); }
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `${arg(args, "--id")}: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
const r = F.runMoves(root, list, { declaredScanDeltas: scanDeltas });
const out = { ok: r.ok, phase: r.phase, moves: list.length, filesEdited: r.filesEdited, rewrites: r.rewrites, scanDeltas: scanDeltas.length, lost: r.image?.lost?.slice(0, 8), gained: r.image?.gained?.slice(0, 8), violations: r.violations?.slice?.(0, 5), scc: r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs } : null };
console.log(JSON.stringify(out, null, 1));
if (!r.ok) process.exit(1);
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify({ step: `B-${arg(args, "--id")} (frozen from ${arg(args, "--authored")}, F-9)`, moves: list, scanDeltas, reasons: doc.moves }, null, 1)}\n`);
recordStep(root, { id: arg(args, "--id"), kind: "moves", file, why: doc.why ?? doc.note });
