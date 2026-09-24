#!/usr/bin/env node
// split-door.mjs — B14 door purity (SPECS-v2 §2.5): a JS door that holds code keeps only its
// `export … from` statements; the code moves to `<dir>/<leaf>.ts` (the dir's own name), the
// door re-exports the leaf's names, a member that imported its own door imports the leaf, a
// text reader of the door (a path literal in a test) is re-pointed at the leaf, and a demo
// `@source` that scanned the door for class names names the leaf. One frozen row.
//   node split-door.mjs --root WT --out frozen/S7-split.json
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const { buildGraph } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/graph.mjs")));
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const ts = createRequire(join(root, "package.json"))("typescript");
const g = buildGraph(root);
const T = g.tree;
const impure = seal(root).V.B14.map((l) => l.split(":")[0]).filter((d) => d.endsWith(".ts"));
const files = {};
const put = (f, after) => { files[f] = { before: files[f]?.before ?? (T.isFile(f) ? T.read(f) : null), after }; };
const cur = (f) => files[f]?.after ?? T.read(f);
const report = [];
for (const d of impure) {
    const dir = posix.dirname(d), leafName = posix.basename(dir), leaf = `${dir}/${leafName}.ts`;
    if (T.isFile(leaf)) { report.push(`${d}: ${leaf} exists, not split`); continue; }
    const text = T.read(d);
    const sf = ts.createSourceFile(d, text, ts.ScriptTarget.Latest, true);
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
    const first = sf.statements[0];
    const head = text.slice(0, first.getStart());
    const leafText = `${move.map((s) => text.slice(s.getFullStart(), s.end)).join("").replace(/^\s+/, "")}\n`;
    const doorBody = stay.map((s) => text.slice(s.getFullStart(), s.end)).join("").replace(/^\s+/, "");
    const lines = [];
    if (vals.length) lines.push(`export { ${vals.join(", ")} } from "./${leafName}";`);
    if (types.length) lines.push(`export type { ${types.join(", ")} } from "./${leafName}";`);
    put(leaf, leafText);
    put(d, `${head}${doorBody}${doorBody ? "\n" : ""}${lines.join("\n")}\n`);
    // members that imported their own door, and text readers of the door
    for (const e of g.edges) {
        if (e.to !== d || !e.spans?.length) continue;
        const inside = e.from.startsWith(`${dir}/`);
        const own = inside && /^(import|import-type)/.test(e.kind);
        const text_ = /^path-(literal|helper)$/.test(e.kind);
        if (!own && !text_) continue;
        const sp = e.spans[0];
        const repl = own ? `./${leafName}` : sp.value.replace(/index\.ts$/, `${leafName}.ts`);
        const body = cur(e.from);
        if (body.slice(sp.start, sp.end) !== sp.value) throw new Error(`span drift ${e.from}:${e.line}`);
        put(e.from, body.slice(0, sp.start) + repl + body.slice(sp.end));
    }
    // the demo's Tailwind scan of component doors reads classes the door no longer holds
    for (const e of g.edges.filter((x) => x.to === d && x.kind === "css-source" && x.plane === "source" && x.from.startsWith("demo/"))) {
        const body = cur(e.from);
        const lineText = body.split("\n")[e.line - 1];
        const rel = posix.relative(posix.dirname(e.from), leaf);
        const add = `@source "${rel}";`;
        if (body.includes(add)) continue;
        const at = body.split("\n").slice(0, e.line).join("\n").length;
        put(e.from, `${body.slice(0, at)}\n${add}${body.slice(at)}`);
        report.push(`${e.from}:${e.line} (${lineText.trim()}) + ${add}`);
    }
    report.push(`${d}: ${move.length} statement(s) -> ${leaf}; door re-exports ${vals.length} value(s), ${types.length} type(s)`);
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: "B14 door purity splits", report, files }, null, 1)}\n`);
console.log(JSON.stringify({ doors: impure, report, files: Object.keys(files) }, null, 1));
