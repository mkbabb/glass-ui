#!/usr/bin/env node
// probe-e2.mjs — explain each E2 line of G's gate on a tree: for every file stage 2 moves or
// names NEEDS-NAME, print its immediate dominator, its owner root (G LAW L2.3), whether that
// owner is a declared door (record.doors / an entry source), the owner's private closure size,
// whether the owner heads a dir (L2.5), and the target. Also counts, per component unit, the
// declared doors below the unit root (the B7 "door in every module" doors G's L2.5 reads as
// heading U itself). Read-only; stages the gate through stage-g.mjs.
//   node probe-e2.mjs --tree <tree> --stage <scratch dir> --out <json>
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { stageG } from "./stage-g.mjs";

const { dirname, basename } = posix;
const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const tree = opt("--tree"), stage = opt("--stage"), out = opt("--out");
const G = await stageG(tree, stage);
const L = await import(pathToFileURL(join(G.dir, "index.mjs")).href);
const ts = createRequire(`${tree}/package.json`)("typescript");
const ctx = L.context(tree);
const s2 = L.stage2(ctx, { ts });
const byUnit = new Map(s2.layouts.map((x) => [x.U, x]));
const explain = (m, kind) => {
    const Lx = byUnit.get(m.unit);
    const f = m.from;
    const idom = Lx.idom.get(f);
    const owner = Lx.isRoot(f) ? f : Lx.owner(f);
    return {
        kind, from: f, to: m.to, isRoot: Lx.isRoot(f), idom, owner,
        ownerIsDoor: ctx.doors.has(owner), ownerCloses: (Lx.closure.get(owner) ?? []).length,
        ownerHeads: owner === L.TOP ? false : Lx.heads(owner), ownerHome: Lx.home(owner),
        eponymousHere: ctx.T.files.some((x) => dirname(x) === dirname(f) && !/^index\./.test(basename(x)) && !L.isTest(x) && L.norm(L.dirNameOf(x, m.unit)) === L.norm(basename(dirname(f)))),
    };
};
const rows = [...s2.moves.map((m) => explain(m, "move")), ...s2.needsName.map((m) => explain(m, "NEEDS-NAME"))];
const nestedDoors = [...ctx.g.record.doors].filter((d) => { const U = L.componentUnitOf(d); return U && dirname(d) !== U && /\/index\.(ts|css)$/.test(d); });
const result = {
    moves: s2.moves.length, needsName: s2.needsName.length, needsBase: s2.needsBase,
    nestedDeclaredDoors: nestedDoors.length, nestedDeclaredDoorsTs: nestedDoors.filter((d) => d.endsWith(".ts")).length,
    needsNameOnNestedDoor: s2.needsName.filter((m) => nestedDoors.includes(m.from)).length,
    movesOwnedByNestedDoor: rows.filter((r) => r.kind === "move" && nestedDoors.includes(r.owner)).length,
    rows,
};
writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
console.log(JSON.stringify({ moves: result.moves, needsName: result.needsName, needsBase: result.needsBase, nestedDeclaredDoors: result.nestedDeclaredDoors, nestedDeclaredDoorsTs: result.nestedDeclaredDoorsTs, needsNameOnNestedDoor: result.needsNameOnNestedDoor, movesOwnedByNestedDoor: result.movesOwnedByNestedDoor }));
for (const r of rows.filter((x) => x.kind === "move")) console.log(`${r.from} → ${r.to} | idom ${r.idom} | owner ${r.owner}${r.ownerIsDoor ? " [DOOR]" : ""} closes ${r.ownerCloses} heads ${r.ownerHeads} home ${r.ownerHome} | eponymous-root-in-dir ${r.eponymousHere}`);
