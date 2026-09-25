#!/usr/bin/env node
// place.mjs — DERIVE step B-S2 (LAW §2-§4): F-7 over the FD-3 unit set with B's publication
// anchor (LAW §2), over the sealed zones src and scripts (B-05), to a fixpoint, on the floor's
// move engine. Each applied pass is frozen as literal JSON (F-9) under frozen/S2-pass-N.json
// and recorded on the chain (frozen/SEQUENCE.json); the replay never runs this planner.
//
// FD-2 is a stop, judged twice. Before a pass is proposed, every F-7 row is judged alone by
// LAW §4 (placementViolations: the image graph with that one file moved, sccGrowth over
// src, scripts and demo). A row that would add a co-cyclic pair and already lies inside its
// home is FD-2-bound and stays; one that would add a pair from outside its home STOPS the run
// (the law cannot place it). The engine then judges the whole pass again (its own FD-2 over
// src and demo, plus the image check); a refusal there stops the run too. No move that adds
// a pair is ever applied, and none is held silently: bound rows are logged in S2-log.json.
//   node derive/place.mjs --root <linked worktree> [--max 6] [--css] [--check]
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { bAnchor, placementGraph, placementViolations, targetOf } from "../lib/law.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const max = Number(arg(args, "--max", 6));
const F = await loadFloor(root);
const A = JSON.parse(readFileSync(join(KIT, "authored/targets.json"), "utf8"));
const ZONES = ["src", "scripts"];
// P3-R2: CSS is placed by the same law, but only after the CSS door step (B-S4) gives every
// sheet its load edge through its unit's door; before it, --css is off and sheets are skipped.
const CSS = args.includes("--css");
const tag = arg(args, "--tag", "S2");

const log = [];
let stop = null;
for (let pass = 1; pass <= max; pass++) {
    const g = F.buildGraph(root);
    const anchor = bAnchor(F, g);
    const P = F.placeAll(placementGraph(g), F.dirUnits(), { zones: ZONES, anchor });
    const rowsIn = P.rows.filter((r) => CSS || !r.file.endsWith(".css"));
    const { violations, bound, held } = placementViolations(F, g, rowsIn, { holds: A.holds, targets: A.targets, groups: A.groups });
    const entry = { pass, byClass: F.countBy(P.rows, "class"), bound: bound.map((b) => ({ file: b.file, home: b.home, to: b.to, added: b.added, first: b.first?.[0] })), held: held.map((h) => h.file) };
    log.push(entry);
    const outside = bound.filter((b) => !b.file.startsWith(`${b.home}/`));
    if (outside.length) { stop = `FD-2 binds ${outside.length} row(s) outside their home`; entry.result = stop; break; }
    const grouped = new Set(A.groups.flatMap((x) => x.moves.map((m) => m.from)));
    let moves = [];
    for (const r of violations) {
        if (grouped.has(r.file)) continue; // moves with its group's lead
        const t = targetOf(F, g.tree, r, A.targets);
        moves.push({ from: r.file, to: t, class: r.class, readers: r.readerUnits, why: A.targets[r.file]?.why ?? `F-7 ${r.class}: ${r.why}` });
        for (const grp of A.groups) if (grp.with === r.file) for (const m of grp.moves) moves.push({ ...m, class: "group", readers: [], why: grp.why });
    }
    const seen = new Set();
    moves = moves.filter((m) => !seen.has(m.from) && seen.add(m.from));
    // NEEDS-NAME: a target two files claim or that exists (S-7) is never emitted; it stops the run
    const claims = new Map(); for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
    const needsName = moves.filter((m) => claims.get(m.to) > 1 || g.tree.isFile(m.to));
    entry.proposed = moves.length;
    // --check: the fixpoint claim, read-only (no move, no frozen file, no log)
    if (args.includes("--check")) { console.log(JSON.stringify({ proposed: moves.map((m) => `${m.from} -> ${m.to}`), byClass: entry.byClass, bound: entry.bound.map((b) => b.file), held: entry.held })); process.exit(moves.length ? 1 : 0); }
    if (needsName.length) { stop = "NEEDS-NAME"; entry.needsName = needsName.map((m) => `${m.from} -> ${m.to}`); entry.result = stop; break; }
    if (!moves.length) { entry.result = "fixpoint"; break; }
    const list = moves.map(({ from, to }) => ({ from, to }));
    const dry = F.runMoves(root, list, { dry: true });
    const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `B-S2 placement: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
    if (dry.residue?.length) { stop = "residue"; entry.result = stop; entry.residue = dry.residue.slice(0, 10); break; }
    // P4-F2: a css-source glob delta is carried only when authored/targets.json declares it
    // (with its reason); a declaration for a file this pass does not move is not passed on
    const globDeltas = (A.globDeltas ?? []).filter((x) => list.some((m) => m.from === x.file));
    const r = F.runMoves(root, list, { declaredScanDeltas: scanDeltas, declaredGlobDeltas: globDeltas });
    entry.engine = { ok: r.ok, phase: r.phase, globDeltas: r.globDeltas ? { carried: r.globDeltas.carried.length, undeclared: r.globDeltas.undeclared, stale: r.globDeltas.stale } : null, filesEdited: r.filesEdited, rewrites: r.rewrites, lost: r.image?.lost ?? [], gained: r.image?.gained ?? [], scc: r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs, first: r.scc.firstAdded } : null };
    if (!r.ok) { stop = `engine refused at ${r.phase}`; entry.result = stop; break; }
    entry.result = "applied";
    const file = `frozen/${tag}-pass-${pass}.json`;
    writeFileSync(join(KIT, file), `${JSON.stringify({ step: `B-${tag} placement pass ${pass} (frozen, F-9)`, moves: list, scanDeltas, globDeltas, reasons: moves.map((m) => ({ from: m.from, to: m.to, why: m.why, readers: m.readers })) }, null, 1)}\n`);
    recordStep(root, { id: `${tag}-${pass}`, kind: "moves", file, why: `B-${tag} placement pass ${pass}: ${list.length} move(s) by F-7 with B's anchor (LAW §2-§4)` });
}
writeFileSync(join(KIT, `frozen/${tag}-log.json`), `${JSON.stringify({ log, stop }, null, 1)}\n`);
console.log(JSON.stringify(log.map(({ pass, byClass, proposed, result, bound, held, needsName, engine }) => ({ pass, byClass, proposed, result, bound: bound.map((b) => `${b.file} (+${b.added})`), held, needsName, scc: engine?.scc })), null, 1));
process.exitCode = stop ? 1 : 0;
