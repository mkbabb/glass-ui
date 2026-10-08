#!/usr/bin/env node
// conserve.mjs — CHECK a split row (split.mjs --out): every line of each split source, its
// imports aside, lands in that source's outputs as often or more, and every name it imports
// is imported by at least one output. A line may differ only by the `export ` the split puts
// before a helper's declaration. The outputs are the files the row creates in the source's
// directory, and the source itself when it stays (its text after the row's hunks).
//   node conserve.mjs --row <row.json> --spec <splits.json> --root <tree before the row>
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => args[args.indexOf(k) + 1];
const row = JSON.parse(readFileSync(resolve(opt("--row")), "utf8"));
const spec = JSON.parse(readFileSync(resolve(opt("--spec")), "utf8"));
const root = resolve(opt("--root"));
const ts = createRequire(join(root, "package.json"))("typescript");

const norm = (l) => l.trim().replace(/^export /, "");
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
let failed = 0;
for (const entry of spec.splits) {
    const op = row.files[entry.source];
    if (!op) { console.log(`${entry.source}: not in the row`); failed++; continue; }
    const src = readFileSync(join(root, entry.source), "utf8");
    if (op.before !== undefined && op.before !== src) throw new Error(`${entry.source}: the row's before is not the tree's text`);
    let kept = null;
    if (op.hunks) { kept = src; for (const [f, t] of op.hunks) { if (kept.split(f).length - 1 !== 1) throw new Error(`${entry.source}: a hunk does not match once`); kept = kept.replace(f, () => t); } }
    const dir = posix.dirname(entry.source);
    const outs = [
        ...(kept !== null ? [kept] : []),
        ...Object.entries(row.files).filter(([p, o]) => o.create !== undefined && posix.dirname(p) === dir && [...(entry.parts ?? []), ...(entry.helpers ?? [])].some((x) => x.file === posix.basename(p))).map(([, o]) => o.create),
    ];
    const sf = ts.createSourceFile(entry.source, src, ts.ScriptTarget.Latest, true);
    const importLines = new Set();
    for (const s of sf.statements) if (ts.isImportDeclaration(s)) {
        const a = sf.getLineAndCharacterOfPosition(s.getStart()).line, b = sf.getLineAndCharacterOfPosition(s.end).line;
        for (let i = a; i <= b; i++) importLines.add(i);
    }
    const have = new Map();
    for (const o of outs) for (const l of o.split("\n")) { const k = norm(l); if (k) have.set(k, (have.get(k) ?? 0) + 1); }
    const missing = [];
    let lines = 0;
    src.split("\n").forEach((l, i) => {
        if (importLines.has(i)) return;
        const k = norm(l);
        if (!k) return;
        lines++;
        const n = have.get(k) ?? 0;
        if (n > 0) have.set(k, n - 1); else missing.push(`${i + 1}: ${k.slice(0, 100)}`);
    });
    const imported = new Set(outs.flatMap(bound));
    for (const n of bound(src)) if (!imported.has(n)) missing.push(`import binding ${n}`);
    if (missing.length) failed++;
    console.log(`${missing.length ? "MISSING  " : "conserved"} ${entry.source}: ${lines} non-import lines into ${outs.length} outputs${missing.length ? `\n  ${missing.slice(0, 12).join("\n  ")}` : ""}`);
}
process.exit(failed ? 1 : 0);
