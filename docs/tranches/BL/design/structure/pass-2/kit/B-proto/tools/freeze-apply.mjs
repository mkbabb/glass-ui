#!/usr/bin/env node
// freeze-apply.mjs — an authored move list (B-S3 carve names) through the floor engine: a dry
// run collects the scan deltas the engine sees, each is declared with the step's reason, the
// list is frozen as literal JSON (F-9) and applied by runMoves. No hold: a refusal stops.
//   node freeze-apply.mjs <authored.json> --root WT --out frozen/X.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const { runMoves } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/move.mjs")));
const doc = JSON.parse(readFileSync(args[0], "utf8"));
const dry = runMoves(root, doc.moves, { dry: true });
if (dry.residue?.length) { console.log(JSON.stringify({ phase: "dry", residue: dry.residue }, null, 1)); process.exit(1); }
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `${doc.step}: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
const r = runMoves(root, doc.moves, { declaredScanDeltas: scanDeltas });
writeFileSync(opt("--out"), `${JSON.stringify({ step: doc.step, moves: doc.moves, scanDeltas }, null, 1)}\n`);
const { image, residue, violations, scanDeltas: sd, ...head } = r;
console.log(JSON.stringify({ ...head, scanDeltasDeclared: scanDeltas.length, lost: image?.lost ?? [], gained: image?.gained ?? [], violations: Array.isArray(violations) ? violations.slice(0, 5) : violations, edges: image ? `${image.edgesBefore} -> ${image.edgesAfter}` : null }));
process.exit(r.ok ? 0 : 1);
