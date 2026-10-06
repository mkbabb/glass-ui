#!/usr/bin/env node
// diff-row.mjs — DERIVE (pass 5): freeze a hand-authored change as one row. The author edits
// the linked worktree after `snap`, then `row` compares every code file (lib/digest.mjs's
// set: tracked and untracked-not-ignored, docs/ out) against the snapshot, puts the snapshot
// back, and lands the difference through the kit's writer (lib/row.mjs: exact text,
// all-or-nothing, every staged text parsed, P5-F4). Every changed path must carry its own
// why in the reasons file, and a reason that names an unchanged path refuses the row, so the
// row and its reasons agree file for file.
//   node derive/diff-row.mjs snap --root <wt> --base <scratch dir>
//   node derive/diff-row.mjs row  --root <wt> --base <scratch dir> --reasons authored/x.json --id S49 --out frozen/S49-x.json
// reasons: { "why": "…", "files": { "<path>": "<why>", … } }
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { codeFiles } from "../lib/digest.mjs";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const [cmd, ...args] = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const base = resolve(arg(args, "--base"));
if (cmd === "snap") {
    rmSync(base, { recursive: true, force: true });
    const files = codeFiles(root);
    for (const f of files) { mkdirSync(dirname(join(base, f)), { recursive: true }); cpSync(join(root, f), join(base, f)); }
    writeFileSync(join(base, ".files.json"), JSON.stringify(files));
    console.log(JSON.stringify({ snapped: files.length }));
} else if (cmd === "row") {
    const before = new Set(JSON.parse(readFileSync(join(base, ".files.json"), "utf8")));
    const now = new Set(codeFiles(root));
    const reasons = JSON.parse(readFileSync(join(KIT, arg(args, "--reasons")), "utf8"));
    const intended = {};
    for (const f of new Set([...before, ...now])) {
        const a = before.has(f) ? readFileSync(join(base, f), "utf8") : null;
        const b = now.has(f) ? readFileSync(join(root, f), "utf8") : null;
        if (a !== b) intended[f] = b;
    }
    const changed = Object.keys(intended).sort();
    const missing = changed.filter((f) => !reasons.files[f]);
    const stale = Object.keys(reasons.files).filter((f) => !(f in intended));
    if (missing.length || stale.length) { console.error(JSON.stringify({ unreasoned: missing, stale }, null, 1)); process.exit(1); }
    // put the snapshot back, so the row applies onto the tree it was authored against
    for (const f of changed) {
        if (before.has(f)) { mkdirSync(dirname(join(root, f)), { recursive: true }); cpSync(join(base, f), join(root, f)); }
        else if (existsSync(join(root, f))) unlinkSync(join(root, f));
    }
    const row = { ...makeRow(root, reasons.why, intended), reasons: changed.map((file) => ({ file, why: reasons.files[file] })) };
    const file = arg(args, "--out");
    writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
    console.log(JSON.stringify(applyRow(root, row)));
    recordStep(root, { id: arg(args, "--id"), kind: "row", file, why: reasons.why });
} else { console.error("diff-row: snap | row"); process.exit(2); }
