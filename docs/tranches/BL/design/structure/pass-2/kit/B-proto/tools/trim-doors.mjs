#!/usr/bin/env node
// trim-doors.mjs — B11b row: an internal door name that nothing outside its module reads and no
// entry publishes is dropped from the door (a door carries what crosses it, no more). Doors that
// end up with no statement are reported (B11 "exports nothing"), not deleted.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const out = args[args.indexOf("--out") + 1];
const ts = createRequire(join(root, "package.json"))("typescript");
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const drop = new Map();
for (const l of seal(root, { pin: null }).V.B11) { const m = /^(\S+) exports (\S+) \(no reader outside/.exec(l); if (!m) continue; if (!drop.has(m[1])) drop.set(m[1], new Set()); drop.get(m[1]).add(m[2]); }
const files = {};
for (const [door, names] of drop) {
    const text = readFileSync(join(root, door), "utf8");
    const sf = ts.createSourceFile(door, text, ts.ScriptTarget.Latest, true);
    const edits = [];
    for (const s of sf.statements) {
        if (!ts.isExportDeclaration(s) || !s.exportClause || !ts.isNamedExports(s.exportClause)) continue;
        const els = s.exportClause.elements;
        const keep = els.filter((el) => !names.has(el.name.text));
        if (keep.length === els.length) continue;
        if (!keep.length) { let e = s.end; while (text[e] === "\n") { e++; break; } edits.push([s.getFullStart(), e, ""]); continue; }
        const multi = text.slice(s.exportClause.getStart(), s.exportClause.end).includes("\n");
        const body = multi ? `{\n${keep.map((el) => `    ${el.getText()},`).join("\n")}\n}` : `{ ${keep.map((el) => el.getText()).join(", ")} }`;
        edits.push([s.exportClause.getStart(), s.exportClause.end, body]);
    }
    let after = text;
    for (const [a, b, t] of edits.sort((x, y) => y[0] - x[0])) after = after.slice(0, a) + t + after.slice(b);
    files[door] = { before: text, after };
}
writeFileSync(out, `${JSON.stringify({ step: "B11b door trim", dropped: Object.fromEntries([...drop].map(([d, n]) => [d, [...n]])), files }, null, 1)}\n`);
console.log(JSON.stringify(Object.fromEntries([...drop].map(([d, n]) => [d, [...n]]))));
