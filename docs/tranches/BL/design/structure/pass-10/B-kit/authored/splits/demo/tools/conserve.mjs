#!/usr/bin/env node
// conserve.mjs — the check that a split moved code rather than rewrote it. For each row in
// rows.json, every non-blank line of its source before the split (trimmed, a leading
// `export ` ignored) must occur among the lines of the row's files after the split, as
// many times as it occurred before. A line that does not is printed with its row; the
// report in splits/demo.md accounts for every one (imports narrowed per module, the
// reshaped declarations each row's why names).
//
//   node conserve.mjs --before <snapshot dir> --root <worktree> [--quiet]
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROWS = resolve(HERE, "..");
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const before = resolve(opt("--before"));
const root = resolve(opt("--root"));
const quiet = args.includes("--quiet");
const norm = (r) => r.trim().replace(/^export /, "");
const bag = (lines) => {
    const m = new Map();
    for (const r of lines) {
        const k = norm(r);
        if (k) m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
};
const spec = JSON.parse(readFileSync(join(ROWS, "rows.json"), "utf8"));
const out = [];
for (const row of spec.rows) {
    const src = readFileSync(join(before, row.source), "utf8").split("\n");
    const after = [];
    for (const f of Object.keys(row.files)) {
        if (!f.startsWith("demo/")) continue; // the consumer re-points are not where code moved to
        if (existsSync(join(root, f))) after.push(...readFileSync(join(root, f), "utf8").split("\n"));
    }
    const have = bag(after);
    const missing = [];
    for (const [k, n] of bag(src)) {
        const got = have.get(k) ?? 0;
        if (got < n) missing.push(`${n - got}× ${k}`);
    }
    out.push({ row: row.id, sourceLines: src.length, nonBlank: [...bag(src).values()].reduce((a, b) => a + b, 0), missing: missing.length });
    if (!quiet) for (const m of missing) console.log(`${row.id}\t${m}`);
}
console.log(JSON.stringify(out, null, 1));
