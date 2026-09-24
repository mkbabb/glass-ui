#!/usr/bin/env node
// place.mjs — DERIVE step B-S2 (LAW §1-§3): F-7 over the FD-3 unit set with B's anchor, to a
// fixpoint, on the floor's move engine. Each pass's list is frozen as literal JSON (F-9)
// under B-kit/frozen/; the replay never runs this planner. FD-2 is a stop: a pass the
// engine refuses for coupling is split by dry runs to name the moves that add pairs, and
// the run STOPS there (no move that adds a pair is ever applied or held silently).
//   node derive/place.mjs --root <linked worktree> [--max 6]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadFloor, arg } from "../lib/floor.mjs";
import { bAnchor } from "../lib/law.mjs";

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const max = Number(arg(args, "--max", 6));
const F = await loadFloor(root);
const A = JSON.parse(readFileSync(join(KIT, "authored/targets.json"), "utf8"));
mkdirSync(join(KIT, "frozen"), { recursive: true });

const log = [];
const fd2Bound = [];
let skip = new Set();
for (let pass = Number(arg(args, "--start", 1)); pass <= max; pass++) {
    const g = F.buildGraph(root);
    const anchor = bAnchor(F, g);
    const P = F.placeAll(g, F.dirUnits(), { zones: ["src"], anchor });
    const rows = P.rows.filter((r) => r.class === "move" || r.class === "global");
    let moves = [];
    const held = [];
    const grouped = new Set(A.groups.flatMap((x) => x.moves.map((m) => m.from)));
    for (const r of rows) {
        if (A.holds?.[r.file]) { held.push({ file: r.file, ...A.holds[r.file] }); continue; }
        if (grouped.has(r.file) || skip.has(r.file)) continue; // moves with its group's lead; or FD-2-bound
        const t = A.targets[r.file]?.to ?? F.proposedPath(g.tree, r);
        moves.push({ from: r.file, to: t, class: r.class, readers: r.readerUnits, why: A.targets[r.file]?.why ?? `F-7 ${r.class}: ${r.why}` });
        for (const grp of A.groups) if (grp.with === r.file) for (const m of grp.moves) moves.push({ ...m, class: "group", readers: [], why: grp.why });
    }
    const seen = new Set();
    moves = moves.filter((m) => !seen.has(m.from) && seen.add(m.from));
    // NEEDS-NAME: a target two files claim or that exists (S-7) is never emitted
    const claims = new Map(); for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
    const needsName = moves.filter((m) => !m.to.endsWith("/") && (claims.get(m.to) > 1 || g.tree.isFile(m.to)));
    moves = moves.filter((m) => !needsName.includes(m));
    const entry = { pass, byClass: F.countBy(P.rows, "class"), proposed: moves.length, needsName: needsName.map((m) => `${m.from} -> ${m.to}`), held: held.map((h) => h.file) };
    log.push(entry);
    if (!moves.length) { entry.result = "fixpoint"; break; }
    const list = moves.map(({ from, to }) => ({ from, to }));
    const dry = F.runMoves(root, list, { dry: true });
    const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `B-S2 placement: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
    entry.dry = { residue: dry.residue?.length ?? 0, scanDeltas: scanDeltas.length, sccAdded: dry.scc?.addedPairs ?? 0 };
    if (dry.scc?.grown?.length) {
        // FD-2 refuses the list: nothing is written. Name each move that adds a pair on its
        // own; those stay where they are (LAW §4: F-7's home at the depth FD-2 permits), and
        // the rest is proposed again as the next list, which FD-2 judges afresh.
        entry.fd2 = [];
        for (const m of list) {
            const one = F.runMoves(root, [m], { dry: true });
            if (one.scc?.grown?.length) entry.fd2.push({ ...m, added: one.scc.addedPairs, first: one.scc.firstAdded });
        }
        entry.result = "FD-2 refused; bound moves named";
        const bound = new Set(entry.fd2.map((m) => m.from));
        fd2Bound.push(...entry.fd2);
        if (!bound.size) break;
        pass--; skip = new Set([...skip, ...bound]);
        continue;
    }
    if (dry.residue?.length) { entry.result = "residue stop"; entry.residue = dry.residue.slice(0, 10); break; }
    const r = F.runMoves(root, list, { declaredScanDeltas: scanDeltas });
    entry.result = r.ok ? "applied" : `refused at ${r.phase}`;
    entry.engine = { filesEdited: r.filesEdited, rewrites: r.rewrites, lost: r.image?.lost ?? [], gained: r.image?.gained ?? [], scc: r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs } : null, digest: r.digest };
    if (!r.ok) break;
    writeFileSync(join(KIT, `frozen/S2-pass-${pass}.json`), `${JSON.stringify({ step: `B-S2 placement pass ${pass} (frozen, F-9)`, moves: list, scanDeltas, reasons: moves.map((m) => ({ from: m.from, why: m.why, readers: m.readers })) }, null, 1)}\n`);
}
writeFileSync(join(KIT, "frozen/S2-log.json"), `${JSON.stringify({ log, fd2Bound }, null, 1)}\n`);
console.log(JSON.stringify(log, null, 1));
console.error(JSON.stringify({ fd2Bound }, null, 1));
