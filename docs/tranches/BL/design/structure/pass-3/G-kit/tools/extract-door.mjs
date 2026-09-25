#!/usr/bin/env node
// extract-door.mjs — generation-time only: write the B14 door-purity row for one door (LAW.md
// L4.4). A door holds only `export … from`. Every other statement of door D (with the imports it
// uses and the comments around it) moves, verbatim and in order, into a new module <dir>/<name>;
// D keeps its own `export … from` statements and re-exports the moved module's names (values
// with `export {}`, types with `export type {}`), so the door publishes exactly what it did. A
// file of D's own dir that imported moved names through D is re-pointed at the new module (a
// member never imports its own door, B1). The name is authored: it says what the module holds.
//   node extract-door.mjs --root <wt> --door <path> --to <name.ts> --out <row.json>
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const door = opt("--door");
const to = opt("--to");
const { buildGraph } = await import(join(root, "scripts/structure/lib/graph.mjs"));
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");
const g = buildGraph(root);
const T = g.tree;
const dir = posix.dirname(door);
const target = `${dir}/${to}`;
const stem = `./${to.replace(/\.(ts|mts)$/, "")}`;
if (T.isFile(target)) throw new Error(`${target} exists`);
const text = T.read(door);
const sf = ts.createSourceFile(door, text, ts.ScriptTarget.Latest, true);
const keep = sf.statements.filter((s) => ts.isExportDeclaration(s) && s.moduleSpecifier);
// the moved module: the door's text with the kept statements cut (full lines)
let moved = text;
for (const s of [...keep].sort((a, b) => b.getStart() - a.getStart())) {
    let end = s.end; while (moved[end] === "\n" && moved[end + 1] === "\n") end++; if (moved[end] === "\n") end++;
    moved = moved.slice(0, s.getFullStart() === 0 ? 0 : s.getStart()) + moved.slice(end);
}
moved = moved.replace(/^\n+/, "");
const vals = [], types = [];
for (const s of sf.statements) {
    const exp = s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!exp) continue;
    if (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) types.push(s.name.text);
    else if (ts.isVariableStatement(s)) for (const d of s.declarationList.declarations) vals.push(d.name.text);
    else if (s.name) vals.push(s.name.text);
}
const doorAfter = [
    ...keep.map((s) => s.getText()),
    ...(vals.length ? [`export { ${vals.join(", ")} } from "${stem}";`] : []),
    ...(types.length ? [`export type { ${types.join(", ")} } from "${stem}";`] : []),
].join("\n") + "\n";
const files = { [door]: { before: text, after: doorAfter }, [target]: { before: null, after: moved } };
// members of the dir that import moved names through the door
const movedNames = new Set([...vals, ...types]);
const report = { door, target, values: vals, types, repointed: [] };
for (const e of g.edges) {
    if (e.to !== door || !posix.dirname(e.from).startsWith(dir) || !["import", "import-type"].includes(e.kind) || !e.spans?.length) continue;
    const names = (e.names ?? []).map((n) => n.imported);
    if (!names.some((n) => movedNames.has(n))) continue;
    if (!names.every((n) => movedNames.has(n))) throw new Error(`${e.from}:${e.line} takes moved and kept names in one statement`);
    const f = e.from;
    const before = files[f]?.after ?? T.read(f);
    const sp = e.spans[0];
    const quote = before[sp.start - 1];
    const rel = posix.relative(posix.dirname(f), target.replace(/\.(ts|mts)$/, ""));
    const spec = rel.startsWith(".") ? rel : `./${rel}`;
    const after = before.slice(0, sp.start - 1) + quote + spec + quote + before.slice(sp.end + 1);
    files[f] = { before: files[f]?.before ?? T.read(f), after };
    report.repointed.push(`${f}:${e.line}`);
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: `G door purity (L4.4, B14): ${door} → ${target}`, ...report, files }, null, 1)}\n`);
console.log(JSON.stringify(report, null, 1));
