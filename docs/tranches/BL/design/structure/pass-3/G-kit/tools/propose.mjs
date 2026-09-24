#!/usr/bin/env node
// propose.mjs — generation-time only: compute one G stage's move list on a tree with the
// landed law (scripts/structure/eponym/law.mjs) and write it as literal JSON, with the
// scan-delta declarations a dry run of the F-2 engine names (each declared per file, with
// its reason). The written list is frozen under G-kit/lists/ and the replay applies it; the
// replay never calls this tool (SPECS-v2 §1.4 freeze rule).
//   node propose.mjs --root <wt> --stage 1|2|3|4 --out <list.json> [--tag name] [--units a,b] [--raw]
// --raw (stage 1): the list before FD-2's holds, which the relay-cut row reads as its departures.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const stage = opt("--stage");
const L = await import(`${root}/scripts/structure/eponym/law.mjs`);
const { runMoves } = await import(`${root}/scripts/structure/lib/move.mjs`);
const ts = createRequire(`${root}/package.json`)("typescript");
const ctx = L.context(root);
let moves, extra = {};
if (stage === "1") {
    const s = L.stage1(ctx, { hold: !args.includes("--raw") });
    moves = s.moves.map((m) => ({ from: m.from, to: m.to, why: `stage 1 (L1): ${m.class}, readers ${m.readers.join(", ")}` }));
    extra = { needsName: s.needsName.map((m) => `${m.from} → ${m.to}`), anchored: s.anchored, fd2Held: s.held.map((h) => `${h.from} → ${h.to}: ${h.pairs.join("; ")}`), fd8Held: s.globHeld.map((h) => `${h.from} → ${h.to}: ${h.glob}`) };
} else if (stage === "4") {
    // L5 · R-3: every test to the __tests__ slot of its subject's home
    const s2 = L.stage2(ctx, { ts });
    const layoutOf = new Map(s2.layouts.map((x) => [x.U, x]));
    const tests = ctx.T.files.filter((f) => /\.(test|test-d)\.(ts|mts)$/.test(f) && (f.startsWith("tests/") || f.includes("/__tests__/")));
    moves = [];
    for (const t of tests) {
        const home = L.testHome(ctx, t, layoutOf);
        if (home === null) continue;
        const to = `${home}/__tests__/${L.NAMES.testNames?.[t] ?? t.split("/").pop()}`;
        if (to !== t) moves.push({ from: t, to, why: `L5: the test's subjects are dominated by ${home}` });
    }
    const claims = new Map();
    for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
    const clash = moves.filter((m) => claims.get(m.to) > 1 || ctx.T.isFile(m.to));
    extra = { needsName: clash.map((m) => `${m.from} → ${m.to}`) };
    moves = moves.filter((m) => !clash.includes(m));
} else if (stage === "3") {
    moves = L.cssDoorMoves(ctx).map((m) => ({ from: m.from, to: m.to, why: "L3.6: the aggregator moves in as its dir's door" }));
} else {
    const only = opt("--units") ? opt("--units").split(",") : null;
    const s = L.stage2(ctx, { ts, ...(only ? { units: L.componentUnits(ctx.T).filter((u) => only.some((o) => u.endsWith(`/${o}`))) } : {}) });
    const why = new Map();
    for (const Lx of s.layouts) for (const f of Lx.F) { const o = Lx.owner(f); why.set(f, `stage 2 (L2): owner ${o === "⊤" ? "the unit door" : o}`); }
    moves = s.moves.map((m) => ({ from: m.from, to: m.to, why: why.get(m.from) }));
    extra = { needsName: s.needsName.map((m) => `${m.from} → ${m.to}`), fd2Flattened: s.held.map((h) => `${h.root} (would head ${h.dir})`) };
}
const units = L.gUnits(ctx);
const plan = runMoves(root, moves.map(({ from, to }) => ({ from, to })), { dry: true, units });
const scanDeltas = (plan.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `G stage ${stage}: the scanner reads ${d.file} at ${d.to}` }));
const doc = { tag: opt("--tag") ?? `stage-${stage}`, stage: Number(stage), moves, scanDeltas, ...extra };
writeFileSync(opt("--out"), `${JSON.stringify(doc, null, 1)}\n`);
console.log(JSON.stringify({ out: opt("--out"), moves: moves.length, scanDeltas: scanDeltas.length, residue: plan.residue?.length ?? 0, fd2: plan.scc ? plan.scc.addedPairs : null, firstAdded: plan.scc?.firstAdded, ...extra }, null, 1));
