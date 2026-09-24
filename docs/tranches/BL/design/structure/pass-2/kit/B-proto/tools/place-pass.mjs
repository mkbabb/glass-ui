#!/usr/bin/env node
// place-pass.mjs — one pass of B's placement law (SPECS-v2 §2.2): F-7 over the FD-3 unit set,
// the FD-1 root-door anchor, targets from the floor's proposedPath, two authored names (B-S2),
// NEEDS-NAME collisions reported and never emitted. The pass is applied by the floor move
// engine (F-2) in-process; a move the image check refuses is held with the refusal it met
// (FD-8) and the rest retried. The list that applied is frozen as literal JSON (F-9), with its
// scan-delta declarations, so a replay runs `move.mjs <frozen>` and never this planner.
//   node place-pass.mjs --root WT --out frozen/S2-pass-N.json [--holds holds.json]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const FL = join(root, "docs/tranches/BL/design/structure/floor/lib");
const { buildGraph, moduleSccs } = await import(pathToFileURL(join(FL, "graph.mjs")));
const { placeAll, proposedPath } = await import(pathToFileURL(join(FL, "placement.mjs")));
const { runMoves } = await import(pathToFileURL(join(FL, "move.mjs")));
const { units, anchorsOf } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));

// B-S2's authored targets (SPECS-v2 §2.2 item 3, §1.4 M03): the only names placement does not derive
const AUTHORED = {
    "src/components/dialog/ModalOverlay.vue": "src/components/_shared/overlay/ModalOverlay.vue",
    "src/composables/glass/webgl/shaders/flow.glsl.ts": "src/components/aurora/constants/shaders/curlNoise.glsl.ts",
    "src/composables/glass/webgl/shaders/flow.wgsl.ts": "src/components/aurora/constants/shaders/curlNoise.wgsl.ts",
};
const holdsPath = opt("--holds");
const holds = holdsPath && existsSync(holdsPath) ? JSON.parse(readFileSync(holdsPath, "utf8")) : { holds: [] };
const held = new Set(holds.holds.map((h) => h.from));

const sccSize = (g) => moduleSccs(g, { moduleOf: units.unitOf, zones: ["src"] }).reduce((n, c) => n + c.length, 0);
const g = buildGraph(root);
const before = sccSize(g);
const anchor = anchorsOf(g);
const rows = placeAll(g, units, { zones: ["src"] }).rows.filter((r) => (r.class === "move" || r.class === "global") && !anchor.has(r.file));
const proposed = rows.map((r) => ({ from: r.file, to: AUTHORED[r.file] ?? proposedPath(g.tree, r), class: r.class, readers: r.readerUnits }));
const claims = new Map(); for (const m of proposed) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
const needsName = proposed.filter((m) => claims.get(m.to) > 1 || g.tree.isFile(m.to));
let moves = proposed.filter((m) => !needsName.includes(m) && !held.has(m.from));
const report = { proposed: proposed.length, needsName: needsName.map((m) => `${m.from} -> ${m.to}`), heldBefore: [...held], attempts: [] };

let result = null;
while (moves.length) {
    const list = moves.map(({ from, to }) => ({ from, to }));
    const dry = runMoves(root, list, { dry: true });
    const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `placement (F-7): ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
    if (dry.residue?.length) { report.attempts.push({ moves: list.length, phase: "dry", residue: dry.residue }); break; }
    const r = runMoves(root, list, { declaredScanDeltas: scanDeltas });
    report.attempts.push({ moves: list.length, ok: r.ok, phase: r.phase ?? "write", filesEdited: r.filesEdited, rewrites: r.rewrites, byKind: r.byKind, scanDeltas: scanDeltas.length, lost: r.image?.lost ?? [], gained: r.image?.gained ?? [], violations: Array.isArray(r.violations) ? r.violations.length : r.violations });
    if (r.ok) { result = { moves: list, scanDeltas, digest: r.digest, image: { before: r.image.edgesBefore, after: r.image.edgesAfter } }; break; }
    if (r.phase !== "image") break;
    // hold every move whose file (old or new path) is named by a lost or gained edge
    const named = [...(r.image.lost ?? []), ...(r.image.gained ?? [])].join("\n");
    const refused = moves.filter((m) => named.includes(`|${m.to}|`) || named.includes(`|${m.from}|`) || named.startsWith(`${m.to}|`));
    if (!refused.length) break;
    for (const m of refused) holds.holds.push({ from: m.from, to: m.to, readers: m.readers, refusal: "image check", edges: [...(r.image.lost ?? []).filter((x) => x.includes(m.to) || x.includes(m.from)).map((x) => `lost ${x}`), ...(r.image.gained ?? []).filter((x) => x.includes(m.to) || x.includes(m.from)).map((x) => `gained ${x}`)], ruling: "FD-8 (a @source glob's match set)" });
    moves = moves.filter((m) => !refused.includes(m));
}
const after = sccSize(buildGraph(root));
report.sccMembers = { before, after, grew: after > before };
report.applied = result?.moves.length ?? 0;
writeFileSync(opt("--out"), `${JSON.stringify({ moves: result?.moves ?? [], scanDeltas: result?.scanDeltas ?? [], note: "frozen B-S2 placement pass (F-9)" }, null, 1)}\n`);
if (holdsPath) writeFileSync(holdsPath, `${JSON.stringify(holds, null, 1)}\n`);
writeFileSync(opt("--out").replace(/\.json$/, ".report.json"), `${JSON.stringify({ ...report, digest: result?.digest, image: result?.image }, null, 1)}\n`);
console.log(JSON.stringify({ proposed: report.proposed, applied: report.applied, needsName: report.needsName.length, held: holds.holds.length, attempts: report.attempts.map((a) => ({ moves: a.moves, ok: a.ok, phase: a.phase, filesEdited: a.filesEdited, rewrites: a.rewrites, scanDeltas: a.scanDeltas, lost: a.lost?.length, gained: a.gained?.length })), scc: report.sccMembers }));
