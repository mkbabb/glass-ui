#!/usr/bin/env node
// rows/fd11-land.mjs — floor row FD-11: land the floor, so no gate or build reader imports
// it from docs/. The runtime (the CLIs, lib/, records/) moves from its design home to
// `scripts/structure/`, the module the SPECS name; the design record stays under docs/
// (FLOOR.md, plants/, samples/, and rows/, which are one-time cuts run from the checkout).
// The floor is location-independent (lib/tree.mjs: the root is found, the records are
// found), so the move edits no floor file. Its readers are re-pointed by one substitution
// of the home path, which spells a valid relative path from every reader. The old SCC
// census `scripts/import-dag.mjs` (628 lines, its own graph) is deleted under E-7 with its
// two ledger rows: F-1's moduleSccs over the unit function is the one SCC report.
//   node rows/fd11-land.mjs --root <linked worktree>
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { FLOOR_HOME, FLOOR_LANDED as LANDED, openRow } from "./lib.mjs";

const STAYS = /^(FLOOR\.md|plants\/|samples\/|rows\/)/;
/** Every reader of the home path outside the floor, and how many times it names it. */
const READERS = {
    "vite.library.ts": 1,
    "vite.style-fold.ts": 1,
    "vite.style-assets.ts": 3,
    "scripts/flatten-subpath-types.mjs": 1,
    "tests/gates/orphan-css-partial.test.ts": 1,
    "tests/gates/overfit-structure.test.ts": 1,
    "tests/gates/floor.test.ts": 1,
    "tests/harness/source.ts": 2,
};

const row = openRow("fd11-land");
const home = join(row.root, FLOOR_HOME);
const runtime = [];
const walk = (dir) => {
    if (!existsSync(join(home, dir))) return;
    for (const d of readdirSync(join(home, dir), { withFileTypes: true })) {
        const rel = dir ? `${dir}/${d.name}` : d.name;
        if (STAYS.test(d.isDirectory() ? `${rel}/` : rel)) continue;
        if (d.isDirectory()) walk(rel);
        else runtime.push(rel);
    }
};
walk("");
const dropped = (text) => {
    const doc = JSON.parse(text);
    const n = doc.entries.length;
    doc.entries = doc.entries.filter((e) => e.file !== "scripts/import-dag.mjs");
    if (n - doc.entries.length !== 2) throw new Error(`row fd11-land: expected to drop 2 import-dag ledger rows, dropped ${n - doc.entries.length}`);
    // the floor's own ledger rows follow it home
    for (const e of doc.entries) if (e.file.startsWith(`${FLOOR_HOME}/`)) e.file = `${LANDED}/${e.file.slice(FLOOR_HOME.length + 1)}`;
    return `${JSON.stringify(doc, null, 4)}\n`;
};
// on a replay over a landed tree the runtime list is empty, and every other operation
// reads applied
for (const rel of runtime.sort()) {
    const text = readFileSync(join(home, rel), "utf8");
    row.create(`${LANDED}/${rel}`, rel === "records/opaque-ledger.json" ? dropped(text) : text);
    row.remove(`${FLOOR_HOME}/${rel}`);
}
for (const [file, n] of Object.entries(READERS)) row.substitute(file, FLOOR_HOME, LANDED, n);
row.remove("scripts/import-dag.mjs");
row.commit(`floor runtime (${runtime.length} files) landed at ${LANDED}; ${Object.keys(READERS).length} readers re-pointed; scripts/import-dag.mjs deleted`);
