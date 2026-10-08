#!/usr/bin/env node
// split-door.mjs — DERIVE step B-S5a (LAW §5, clause B14 door purity; ported from pass-2's
// B-proto/tools/split-door.mjs onto the landed floor and lib/row.mjs). A JS door that holds
// code keeps only its `export … from` statements; the code moves to the leaf the law names
// (authored/doors.json `leaves`: a class-recipe leaf is `<unit>Variants.ts`, the name the
// demo's `*Variants.ts` class scan already reads; any other leaf takes the dir's own name).
// The door re-exports the leaf's names; a member that imported its own door, and a text reader
// of the door, are re-pointed at the leaf. One frozen row, applied and recorded.
//   node derive/split-door.mjs --root <wt> --out frozen/S5a-split-doors.json
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const ts = createRequire(join(root, "package.json"))("typescript");
const A = JSON.parse(readFileSync(join(KIT, "authored/doors.json"), "utf8"));
const g = F.buildGraph(root);
const T = g.tree;
const intended = {};
const cur = (f) => intended[f] ?? T.read(f);
const report = [];
for (const [door, leafName] of Object.entries(A.leaves)) {
    const dir = posix.dirname(door), leaf = `${dir}/${leafName}.ts`;
    if (T.isFile(leaf)) throw new Error(`${leaf} exists`);
    const text = T.read(door);
    const sf = ts.createSourceFile(door, text, ts.ScriptTarget.Latest, true);
    const stay = [], move = [], vals = [], types = [];
    for (const s of sf.statements) {
        if (ts.isExportDeclaration(s) && s.moduleSpecifier) { stay.push(s); continue; }
        move.push(s);
        const exp = s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) { if (exp) types.push(s.name.text); }
        else if (ts.isVariableStatement(s)) { if (exp) for (const v of s.declarationList.declarations) vals.push(v.name.getText()); }
        else if (s.name && exp) vals.push(s.name.text);
        else if (ts.isExportDeclaration(s) && s.exportClause && ts.isNamedExports(s.exportClause)) for (const el of s.exportClause.elements) (s.isTypeOnly || el.isTypeOnly ? types : vals).push(el.name.text);
    }
    const head = text.slice(0, sf.statements[0].getStart());
    const leafText = `${move.map((s) => text.slice(s.getFullStart(), s.end)).join("").replace(/^\s+/, "")}\n`;
    const doorBody = stay.map((s) => text.slice(s.getFullStart(), s.end)).join("").replace(/^\s+/, "");
    const lines = [];
    if (vals.length) lines.push(`export { ${vals.join(", ")} } from "./${leafName}";`);
    if (types.length) lines.push(`export type { ${types.join(", ")} } from "./${leafName}";`);
    intended[leaf] = leafText;
    intended[door] = `${head}${doorBody}${doorBody ? "\n" : ""}${lines.join("\n")}\n`;
    for (const e of g.edges) {
        if (e.to !== door || !e.spans?.length) continue;
        const own = e.from.startsWith(`${dir}/`) && /^(import|import-type)/.test(e.kind);
        const textRead = /^path-(literal|helper)$/.test(e.kind);
        if (!own && !textRead) continue;
        const sp = e.spans[0];
        const repl = own ? `./${leafName}` : sp.value.replace(/index\.ts$/, `${leafName}.ts`);
        const body = cur(e.from);
        if (body.slice(sp.start, sp.end) !== sp.value) throw new Error(`span drift ${e.from}:${e.line}`);
        intended[e.from] = body.slice(0, sp.start) + repl + body.slice(sp.end);
        report.push(`${e.from}:${e.line} re-pointed at ${leaf} (${own ? "member of its own door" : "text reader"})`);
    }
    report.push(`${door}: ${move.length} statement(s) -> ${leaf}; the door re-exports ${vals.length} value(s), ${types.length} type(s)`);
}
const row = { ...makeRow(root, "B-S5a door purity splits (LAW §5, B14)", intended), report };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(report.join("\n"));
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: "S5a", kind: "row", file, why: "B14: the alert, badge and color doors hold code; it moves to its leaf and the door re-exports it" });
