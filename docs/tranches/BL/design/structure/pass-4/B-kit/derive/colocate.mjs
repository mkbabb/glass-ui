#!/usr/bin/env node
// colocate.mjs — DERIVE step B-S15 (R-3, clause B16): a test lives with its subject. The move
// list is the gate's own B16 reading (scripts/structure/seal.mjs, run in the tree): each test
// whose subject sits in one module or unit goes to `<home>/__tests__/<name>`. A test stays
// where it is, named with its reason, when the move would break a law the tree also keeps:
//   reads outside src  it reads a file outside src (a tests helper, a fixture, the setup, a
//             root doc), and a src file that reads another zone breaks B8; the law owes a
//             clause for test helpers first
//   dirname   it computes paths from __dirname, import.meta.url or process.cwd() (B0's class):
//             the engine cannot rewrite a computed path, so the move would break it silently
//   not-test  it is not a `*.test.ts` file, and vitest collects only `*.test.ts` from src
//   fd2       the move would make its home co-cyclic with another module (FD-2 is a stop)
// The engine applies the list with the scan deltas it names declared (the run judges each
// scanner); the list is frozen as literal JSON (F-9) with the stays and their reasons.
//   node derive/colocate.mjs --root <wt> --out frozen/S15-colocate.json [--dry]
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, posix, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const tmp = mkdtempSync(join(tmpdir(), "b-colocate-"));
let V;
try {
    try { execFileSync("node", [join(root, "scripts/structure/seal.mjs"), "--root", root, "--json", join(tmp, "s.json")], { stdio: "ignore" }); }
    catch (e) { if (e.status !== 1) throw e; }
    V = JSON.parse(readFileSync(join(tmp, "s.json"), "utf8")).V;
} finally { rmSync(tmp, { recursive: true, force: true }); }

const rows = V.B16.map((s) => { const m = /^(\S+) \(subject in (\S+): belongs in /.exec(s); if (!m) throw new Error(`colocate: unread B16 row ${s}`); return { test: m[1], home: m[2] }; });
const g = F.buildGraph(root);
// (R-1's register retires in the floor's first row, r1, so no closed record binds a test's path)
const stays = [];
const moves = [];
for (const { test, home } of rows) {
    const why = [];
    const helpers = [...new Set(g.edges.filter((e) => e.from === test && e.to && e.to !== test && !e.to.startsWith("src/") && !e.external).map((e) => e.to))];
    if (helpers.length) why.push(`reads outside src (${helpers.join(", ")})`);
    if (/__dirname|import\.meta\.url|process\.cwd\(\)/.test(readFileSync(join(root, test), "utf8"))) why.push("dirname");
    if (!/\.test\.ts$/.test(test)) why.push("not-test");
    if (why.length) { stays.push({ test, home, why: why.join("; ") }); continue; }
    moves.push({ from: test, to: `${home}/__tests__/${posix.basename(test)}` });
}
const seen = new Map();
for (const m of moves) { if (seen.has(m.to)) throw new Error(`colocate: ${m.from} and ${seen.get(m.to)} both land at ${m.to}`); seen.set(m.to, m.from); }

// FD-2 is a stop: a test whose move would make its home co-cyclic with another module
// stays, named. The pairs a dry run adds name the homes; their tests leave the list and the
// dry run repeats until it adds none.
let dry;
for (;;) {
    dry = F.runMoves(root, moves, { dry: true });
    if (dry.residue?.length) { console.error(JSON.stringify({ residue: dry.residue.slice(0, 10) }, null, 1)); process.exit(1); }
    const added = (dry.scc?.grown ?? []).flatMap((x) => x.scc);
    if (!added.length) break;
    const cyclic = new Set(added);
    const out = moves.filter((m) => cyclic.has(posix.dirname(posix.dirname(m.to))));
    if (!out.length) { console.error(JSON.stringify({ fd2: dry.scc.firstAdded }, null, 1)); process.exit(1); }
    for (const m of out) { moves.splice(moves.indexOf(m), 1); stays.push({ test: m.from, home: posix.dirname(posix.dirname(m.to)), why: `fd2 (the move makes ${posix.dirname(posix.dirname(m.to))} co-cyclic: ${dry.scc.firstAdded.map((p) => p.join(" <-> ")).join("; ")})` }); }
}
const perSlot = {};
for (const m of moves) perSlot[posix.dirname(m.to)] = (perSlot[posix.dirname(m.to)] ?? 0) + 1;
const over = Object.entries(perSlot).filter(([, n]) => n > 12);
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `S15: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
console.log(JSON.stringify({ moves: moves.length, stays: stays.length, slots: Object.keys(perSlot).length, over12: over, scanDeltas: scanDeltas.length }));
if (args.includes("--dry")) { for (const s of stays) console.log(`  stay ${s.test}: ${s.why}`); process.exit(0); }
const r = F.runMoves(root, moves, { declaredScanDeltas: scanDeltas });
console.log(JSON.stringify({ ok: r.ok, phase: r.phase, filesEdited: r.filesEdited, rewrites: r.rewrites, violations: r.violations?.slice?.(0, 5) }));
if (!r.ok) process.exit(1);
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify({ step: "B-S15 R-3 colocation (frozen from the gate's B16 reading, F-9)", moves, scanDeltas, stays, over12: over }, null, 1)}\n`);
recordStep(root, { id: "S15", kind: "moves", file, why: `R-3 (B16): ${moves.length} tests join their subject's module in <home>/__tests__/; ${stays.length} stay, each with its reason` });
