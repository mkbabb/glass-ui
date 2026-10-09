#!/usr/bin/env node
// reach.mjs — the B2-shaped reading for the rows' files: every module reference
// (import / export-from / dynamic import) in a row's demo files whose `@glass/…` target
// is not a JS entry source of scripts/structure/records/entry-record.json. It counts
// reference lines, the unit B2 reports, so a split that copies one private import into
// two modules shows as +1. P4-R1/P4-R2 (re-point by default) is B-S14's cure, not B-S11's.
//
//   node reach.mjs --root <tree> [--before <snapshot dir>]
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROWS = resolve(HERE, "..");
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const before = opt("--before") ? resolve(opt("--before")) : null;
const rec = JSON.parse(readFileSync(join(root, "scripts/structure/records/entry-record.json"), "utf8"));
const entries = new Set(rec.js.map(([, src]) => src));
const resolveSrc = (spec) => {
    const base = `src/${spec.slice("@glass/".length)}`;
    for (const c of [base, `${base}.ts`, `${base}/index.ts`, `${base}.vue`]) if (statSync(join(root, c), { throwIfNoEntry: false })?.isFile()) return c;
    return base;
};
const RE = /(?:import|export)\s[^;]*?from\s+"(@glass\/[^"]+)"|import\(\s*"(@glass\/[^"]+)"\s*\)/g;
const count = (base, files) => {
    let n = 0;
    const hits = [];
    for (const f of files) {
        if (!f.startsWith("demo/") || !existsSync(join(base, f))) continue;
        for (const m of readFileSync(join(base, f), "utf8").matchAll(RE)) {
            const spec = m[1] ?? m[2];
            const target = resolveSrc(spec);
            if (!entries.has(target)) { n++; hits.push(`${f}: ${spec}`); }
        }
    }
    return { n, hits };
};
const spec = JSON.parse(readFileSync(join(ROWS, "rows.json"), "utf8"));
const out = [];
for (const row of spec.rows) {
    const after = count(root, Object.keys(row.files));
    const was = before ? count(before, [row.source]).n : null;
    out.push({ row: row.id, before: was, after: after.n });
    if (args.includes("--list")) for (const h of after.hits) console.log(`${row.id}\t${h}`);
}
console.log(JSON.stringify(out));
console.log(JSON.stringify({ before: out.reduce((a, r) => a + (r.before ?? 0), 0), after: out.reduce((a, r) => a + r.after, 0) }));
