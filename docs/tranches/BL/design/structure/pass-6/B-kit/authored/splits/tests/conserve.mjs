#!/usr/bin/env node
// conserve.mjs — CHECK a split row (split.mjs --out): every line of each removed source, its
// imports aside, lands in that source's outputs, the same number of times or more. A line may
// differ only in the ways the split writes it: an `export ` put before a helper's declaration,
// a re-based `__dirname` literal, and a citation the spec rewrites. Each such line is listed
// by kind, and any other line a source loses is MISSING and fails the check. Import lines are
// recomputed by the split, so they are held by binding instead: every name a source imports is
// imported by at least one of its outputs (a type-only door import asserts by existing).
//   node conserve.mjs --row <row.json> --spec <splits.json> --root <tree>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => args[args.indexOf(k) + 1];
const row = JSON.parse(readFileSync(resolve(opt("--row")), "utf8"));
const spec = JSON.parse(readFileSync(resolve(opt("--spec")), "utf8"));
const ts = createRequire(join(resolve(opt("--root")), "package.json"))("typescript");

let failed = 0;
const norm = (l) => l.trim().replace(/^export /, "");
for (const entry of spec.splits) {
    const op = row.files[entry.source];
    if (!op?.remove) continue;
    const src = op.before;
    const sf = ts.createSourceFile(entry.source, src, ts.ScriptTarget.Latest, true);
    const importLines = new Set();
    for (const s of sf.statements) if (ts.isImportDeclaration(s)) {
        const a = sf.getLineAndCharacterOfPosition(s.getStart()).line, b = sf.getLineAndCharacterOfPosition(s.end).line;
        for (let i = a; i <= b; i++) importLines.add(i);
    }
    const bound = (text) => {
        const f = ts.createSourceFile("x.ts", text, ts.ScriptTarget.Latest, true);
        const names = [];
        for (const s of f.statements) if (ts.isImportDeclaration(s) && s.importClause) {
            const cl = s.importClause;
            if (cl.name) names.push(cl.name.text);
            if (cl.namedBindings) names.push(...(ts.isNamespaceImport(cl.namedBindings) ? [cl.namedBindings.name.text] : cl.namedBindings.elements.map((e) => e.name.text)));
        }
        return names;
    };
    const outs = Object.entries(row.files).filter(([p, o]) => o.create !== undefined && posix.dirname(p) === entry.dir && (entry.parts.some((x) => posix.join(entry.dir, x.file) === p) || posix.join(entry.dir, entry.shared ?? "") === p));
    const have = new Map();
    for (const [, o] of outs) for (const l of o.create.split("\n")) { const k = norm(l); if (k) have.set(k, (have.get(k) ?? 0) + 1); }
    const cites = (spec.citations ?? []).filter((c) => src.includes(c.from));
    const missing = [], rebased = [], cited = [];
    src.split("\n").forEach((l, i) => {
        if (importLines.has(i)) return;
        const k = norm(l);
        if (!k) return;
        const n = have.get(k) ?? 0;
        if (n > 0) { have.set(k, n - 1); return; }
        if (/__dirname/.test(k) || /^"\.\.\//.test(k)) rebased.push(i + 1);
        else if (cites.some((c) => c.from.split("\n").some((f) => f.trim() && k.includes(f.trim())))) cited.push(i + 1);
        else missing.push(`${i + 1}: ${k.slice(0, 100)}`);
    });
    const imported = new Set(outs.flatMap(([, o]) => bound(o.create)));
    for (const n of bound(src)) if (!imported.has(n)) missing.push(`import binding ${n}`);
    const verdict = missing.length ? "MISSING" : "conserved";
    if (missing.length) failed++;
    console.log(`${entry.source}: ${verdict}; ${outs.length} outputs; rebased ${rebased.length} (lines ${rebased.join(",") || "-"}), cited ${cited.length} (lines ${cited.join(",") || "-"})`);
    for (const m of missing) console.log(`  MISSING ${m}`);
}
process.exit(failed ? 1 : 0);
