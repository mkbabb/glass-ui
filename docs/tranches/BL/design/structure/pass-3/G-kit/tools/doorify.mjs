#!/usr/bin/env node
// doorify.mjs — generation-time only: write the B1 seal row (LAW.md L4.1). An import from
// outside a component unit U into a file of U that is not U's door is re-pointed at U's door
// (`<U>/index.ts`), naming each symbol by the name the door publishes for the same origin. An
// import whose symbols the door does not publish is left and reported (a door never grows here:
// growth is a surface-pin diff, not a seal cure). The row is frozen as exact before/after text.
//   node doorify.mjs --root <wt> --out <row.json>
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const L = await import(join(root, "scripts/structure/eponym/law.mjs"));
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");
const ctx = L.context(root);
const { g, T, O, entrySources } = ctx;
const dirOf = (f) => posix.dirname(f);
const PUB = new Set([...entrySources, ...ctx.cssEntrySources]);

function scripts(file) {
    const text = T.read(file) ?? "";
    if (file.endsWith(".vue")) {
        const { descriptor } = sfc.parse(text, { filename: file });
        return [descriptor.script, descriptor.scriptSetup].filter(Boolean).map((b) => ({ sf: ts.createSourceFile(file, b.content, ts.ScriptTarget.Latest, true), offset: b.loc.start.offset }));
    }
    return [{ sf: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), offset: 0 }];
}
const stmtOfSpan = (file, start) => { for (const { sf, offset } of scripts(file)) for (const s of sf.statements) if (s.moduleSpecifier && s.moduleSpecifier.getStart() + 1 + offset === start) return { s, offset }; return null; };

const edits = new Map();
const report = { rewritten: [], left: [] };
for (const e of g.edges) {
    if (!e.to || e.dir || !["import", "import-type"].includes(e.kind) || !e.from.startsWith("src/") || L.isTest(e.from)) continue;
    const U = L.componentUnitOf(e.to);
    if (!U || L.within(e.from, U) || PUB.has(e.to) || e.to === `${U}/index.ts`) continue;
    const door = `${U}/index.ts`;
    if (!T.isFile(door)) { report.left.push(`${e.from}:${e.line} (no door ${door})`); continue; }
    // the door's name for each origin
    const nameOf = new Map();
    for (const [n, os] of O.exportsOf(door)) for (const o of os) if (!nameOf.has(`${o.file}#${o.name}`)) nameOf.set(`${o.file}#${o.name}`, n);
    const hit = stmtOfSpan(e.from, e.spans[0].start);
    if (!hit) { report.left.push(`${e.from}:${e.line} (statement not found)`); continue; }
    const { s, offset } = hit;
    const c = s.importClause;
    const parts = [];
    let ok = true;
    const originName = (imported) => { const os = O.originOf(e.to, imported); return os.length === 1 ? `${os[0].file}#${os[0].name}` : null; };
    if (c?.name) { const n = nameOf.get(originName("default")); if (!n) ok = false; else parts.push(n === c.name.text ? n : `${n} as ${c.name.text}`); }
    if (c?.namedBindings) {
        if (!ts.isNamedImports(c.namedBindings)) ok = false;
        else for (const el of c.namedBindings.elements) {
            const imported = (el.propertyName ?? el.name).text;
            const n = nameOf.get(originName(imported));
            if (!n) { ok = false; break; }
            parts.push(`${el.isTypeOnly ? "type " : ""}${n === el.name.text ? n : `${n} as ${el.name.text}`}`);
        }
    }
    if (!ok || !parts.length) { report.left.push(`${e.from}:${e.line} → ${e.to} (the door publishes no name for a symbol it takes)`); continue; }
    let spec = posix.relative(dirOf(e.from), U);
    if (!spec.startsWith(".")) spec = `./${spec}`;
    const text = `import ${c.isTypeOnly ? "type " : ""}{ ${parts.join(", ")} } from "${spec}";`;
    if (!edits.has(e.from)) edits.set(e.from, []);
    edits.get(e.from).push({ start: s.getStart() + offset, end: s.end + offset, text });
    report.rewritten.push(`${e.from}:${e.line} → ${door}`);
}
const files = {};
for (const [f, list] of edits) {
    const before = T.read(f);
    let after = before;
    for (const x of [...new Map(list.map((y) => [`${y.start}`, y])).values()].sort((a, b) => b.start - a.start)) after = after.slice(0, x.start) + x.text + after.slice(x.end);
    files[f] = { before, after };
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: "G seal (L4.1, B1): cross-unit imports re-pointed at the unit door", ...report, files }, null, 1)}\n`);
console.log(JSON.stringify(report, null, 1));
