#!/usr/bin/env node
// colocate-rest.mjs — DERIVE step S24 (R-3, clause B16; LAW §9 as amended in pass 3's second
// seat). S15 left 55 tests in tests/ with reasons; this step re-reads each reason against
// the law and moves every test whose reason no longer holds:
//   rostered   the register retired (S21, R-1's precondition), so no closed record binds a path
//   not-test   a `*.test-d.ts` is type-checked by the test program (tsconfig.test.json includes
//              src/), which reads src/**/__tests__ like tests/; vitest never collected it
//   helpers    a colocated test may read the test harness (LAW §9, B8's test arm): shared
//              helpers (tests/utils, tests/setup) stay where they are; a helper only this test
//              reads moves with it into the same slot
//   dirname    the engine judges it: a resolvable path is rewritten or the image check
//              refuses; a computed one is census and the test run judges it
// What still holds is FD-2: each move is dry-run alone through the engine, and a move that
// adds a co-cyclic module pair stays, named with the pair (the floor's stop).
// The list is the gate's own B16 reading of the tree (scripts/structure/seal via the door),
// frozen as literal JSON (F-9) with every stay and its reason.
// A test whose default slot path is taken is named in authored/test-targets.json.
//   node derive/colocate-rest.mjs --root <wt> --id S24 --out frozen/S24-colocate.json [--dry]
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadFloor, arg } from "../lib/floor.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const V = seal(root).V;
const rows = V.B16.map((s) => { const m = /^(\S+) \(subject in (\S+): belongs in /.exec(s); return m ? { test: m[1], home: m[2] } : null; }).filter(Boolean);
const g = F.buildGraph(root);
const TARGETS = JSON.parse(readFileSync(join(KIT, "authored/test-targets.json"), "utf8")).targets;
const readersOf = (f) => new Set(g.edges.filter((e) => e.to === f && e.from !== f).map((e) => e.from));

const stays = [];
const moves = [];
for (const { test, home } of rows) {
    const slot = `${home}/__tests__`;
    const group = [{ from: test, to: TARGETS[test]?.to ?? `${slot}/${posix.basename(test)}` }];
    // a helper in the tests zone that only this test reads travels with it
    for (const e of g.edges) {
        if (e.from !== test || !e.to || e.external || !e.to.startsWith("tests/") || e.to.startsWith("tests/harness/")) continue;
        const rs = readersOf(e.to);
        if (rs.size === 1 && rs.has(test) && !group.some((m) => m.from === e.to)) group.push({ from: e.to, to: `${slot}/${posix.basename(e.to)}` });
    }
    const dry = F.runMoves(root, group, { dry: true });
    if (dry.residue?.length) { stays.push({ test, home, why: `residue (${dry.residue.length}): the engine has no rewrite for ${JSON.stringify(dry.residue[0]).slice(0, 120)}` }); continue; }
    if (dry.scc?.grown?.length) { stays.push({ test, home, why: `fd2 (the move adds ${dry.scc.firstAdded.map((p) => p.join(" <-> ")).join("; ")})` }); continue; }
    moves.push(...group.map((m) => ({ ...m, why: m.from === test ? `R-3: its subject is ${home}` : `the helper only ${posix.basename(test)} reads travels with it` })));
}
const seen = new Map();
for (const m of moves) { if (seen.has(m.to)) throw new Error(`colocate-rest: ${m.from} and ${seen.get(m.to)} both land at ${m.to}`); seen.set(m.to, m.from); }
const list = moves.map(({ from, to }) => ({ from, to }));
const dry = F.runMoves(root, list, { dry: true });
if (dry.scc?.grown?.length) { console.error(JSON.stringify({ fd2: dry.scc.firstAdded }, null, 1)); process.exit(1); }
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `${arg(args, "--id") ?? "S24"}: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
console.log(JSON.stringify({ rows: rows.length, moves: moves.length, stays: stays.length, scanDeltas: scanDeltas.length }));
for (const s of stays) console.log(`  stay ${s.test}: ${s.why}`);
if (args.includes("--dry")) process.exit(0);
const r = F.runMoves(root, list, { declaredScanDeltas: scanDeltas });
console.log(JSON.stringify({ ok: r.ok, phase: r.phase, filesEdited: r.filesEdited, rewrites: r.rewrites, lost: r.image?.lost?.slice(0, 5), violations: r.violations?.slice?.(0, 5) }));
if (!r.ok) process.exit(1);
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify({ step: `${arg(args, "--id") ?? "S24"} R-3 colocation of the tests the gate's B16 still homes elsewhere (frozen from its reading, F-9)`, moves: list, scanDeltas, reasons: moves, stays }, null, 1)}\n`);
recordStep(root, { id: arg(args, "--id") ?? "S24", kind: "moves", file, why: `R-3 (B16): ${rows.length - stays.length} held tests join their subject's module; ${stays.length} stay, each with its reason` });
