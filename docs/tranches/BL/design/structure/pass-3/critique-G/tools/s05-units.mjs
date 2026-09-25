#!/usr/bin/env node
// s05-units.mjs — one move list through the landed F-2 engine (--dry, nothing written) under
// three unit functions for FD-2: the floor's R-2 dirUnits, G's L0.3 gUnits, and dirUnits with
// tests split off. Prints addedPairs and the first added pairs for each.
//   node s05-units.mjs <list.json> --root <linked worktree>
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const { runMoves } = await import(`${root}/scripts/structure/lib/move.mjs`);
const { dirUnits } = await import(`${root}/scripts/structure/lib/placement.mjs`);
const L = await import(`${root}/scripts/structure/eponym/index.mjs`);
const moves = JSON.parse(readFileSync(args[0], "utf8")).moves;
const du = dirUnits();
const fns = {
    floorDirUnits: du,
    gUnits: L.gUnits(L.context(root)),
    dirUnitsTestsSplit: { ...du, unitOf: (f) => (L.isTest(f) ? `test:${f}` : du.unitOf(f)) },
};
for (const [k, units] of Object.entries(fns)) {
    const r = runMoves(root, moves, { dry: true, units });
    console.log(k, JSON.stringify({ before: r.scc?.before, after: r.scc?.after, addedPairs: r.scc?.addedPairs, first: (r.scc?.firstAdded ?? []).slice(0, 5).map((p) => p.join(" ↔ ")) }));
}
