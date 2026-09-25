#!/usr/bin/env node
// demo-doors.mjs — generation-time only: write the R-10 demo reroute row (LAW.md L4.5, E6). A
// demo import (value or type) that resolves to a src file no entry publishes as its source is
// re-pointed at a published entry: the entry that publishes every symbol the statement takes,
// by symbol origin, preferring the entry whose source dir holds the file most deeply (the
// root `index` entry last). The specifier keeps the author's alias (`@glass/…`), so the demo
// reaches the entry source exactly as a consumer reaches the package subpath (R-10). A binding
// the entry publishes under another name is imported `as` its local name. A statement one entry
// cannot serve whole is left and reported, with the symbols no entry publishes (a private
// symbol is a surface question, never a reroute). A statement no one entry serves whole is split,
// each name to its best entry. A dynamic import() of a published file (the async boundary) takes
// the entry dynamically: import("<entry>").then((m) => m.<name>). Frozen as exact before/after text.
//   node demo-doors.mjs --root <wt> --out <row.json>
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const L = await import(join(root, "scripts/structure/eponym/index.mjs"));
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");
const ctx = L.context(root);
const { g, T, O } = ctx;
const PUB = new Set(g.record.js.map(([, s]) => s));

function scripts(file) {
    const text = T.read(file) ?? "";
    if (file.endsWith(".vue")) {
        const { descriptor } = sfc.parse(text, { filename: file });
        return [descriptor.script, descriptor.scriptSetup].filter(Boolean).map((b) => ({ sf: ts.createSourceFile(file, b.content, ts.ScriptTarget.Latest, true), offset: b.loc.start.offset }));
    }
    return [{ sf: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), offset: 0 }];
}
const stmtOfSpan = (file, start) => { for (const { sf, offset } of scripts(file)) for (const s of sf.statements) if (s.moduleSpecifier && s.moduleSpecifier.getStart() + 1 + offset === start) return { s, offset }; return null; };
/** entry name → Map(origin key → published name) */
const pubNames = new Map();
for (const [name, src] of g.record.js) {
    const m = new Map();
    for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name}`; if (!m.has(k)) m.set(k, n); }
    pubNames.set(name, { src, m });
}
const depth = (src, f) => (f.startsWith(`${posix.dirname(src)}/`) ? posix.dirname(src).split("/").length : 0);
const originKey = (file, imported) => { const os = O.originOf(file, imported); return os.length === 1 ? `${os[0].file}#${os[0].name}` : null; };
const aliasSpell = (orig, src) => {
    const a = g.aliases.find((x) => orig === x.key || orig.startsWith(`${x.key}/`));
    const bare = src.replace(/\.(ts|mts)$/, "").replace(/\/index$/, "");
    if (a && bare.startsWith(`${a.target}/`)) return `${a.key}${bare.slice(a.target.length)}`;
    if (a && bare === a.target) return `${a.key}/index`; // the root entry: tsconfig maps `@glass/*`, not the bare key
    return null;
};

const edits = new Map();
const report = { rewritten: [], left: [] };
const put = (f, x) => { if (!edits.has(f)) edits.set(f, []); edits.get(f).push(x); };
/** the entries that publish an origin key, best first: the entry whose source dir holds the
 *  file most deeply, the root `index` entry last, then by name */
const rank = (key, file) => [...pubNames].filter(([, p]) => key && p.m.has(key)).sort((a, b) => (a[0] === "index") - (b[0] === "index") || depth(b[1].src, file) - depth(a[1].src, file) || (a[0] < b[0] ? -1 : 1));
for (const e of g.edges) {
    if (!e.to || e.dir || !["import", "import-type", "dynamic"].includes(e.kind) || !e.from.startsWith("demo/") || !e.to.startsWith("src/") || PUB.has(e.to)) continue;
    if (e.kind === "dynamic") {
        // L4.5 · an async boundary imports the entry dynamically and takes the published name
        const key = originKey(e.to, "default");
        const [best] = rank(key, e.to);
        const spec = best && aliasSpell(e.spans[0].value, best[1].src);
        if (!best || !spec) { report.left.push(`${e.from}:${e.line} → ${e.to} (dynamic: no entry publishes its default)`); continue; }
        const text = T.read(e.from);
        const q = text[e.spans[0].start - 1];
        const open = text.lastIndexOf("import(", e.spans[0].start);
        const close = e.spans[0].end + 1;
        if (text[close] !== ")") { report.left.push(`${e.from}:${e.line} (dynamic: not a plain import() call)`); continue; }
        put(e.from, { start: open, end: close + 1, text: `import(${q}${spec}${q}).then((m) => m.${best[1].m.get(key)})` });
        report.rewritten.push(`${e.from}:${e.line} → ./${best[0]} (dynamic, ${best[1].m.get(key)})`);
        continue;
    }
    const hit = stmtOfSpan(e.from, e.spans[0].start);
    if (!hit) { report.left.push(`${e.from}:${e.line} (statement not found)`); continue; }
    const { s, offset } = hit;
    const c = s.importClause;
    if (!c || (c.namedBindings && !ts.isNamedImports(c.namedBindings))) { report.left.push(`${e.from}:${e.line} → ${e.to} (namespace or side-effect import)`); continue; }
    const wants = [];
    if (c.name) wants.push({ imported: "default", local: c.name.text, type: false });
    for (const el of c.namedBindings?.elements ?? []) wants.push({ imported: (el.propertyName ?? el.name).text, local: el.name.text, type: el.isTypeOnly });
    const keys = wants.map((w) => originKey(e.to, w.imported));
    const unpublished = wants.filter((w, i) => !rank(keys[i], e.to).length).map((w) => w.imported);
    if (unpublished.length) { report.left.push(`${e.from}:${e.line} → ${e.to} (no entry publishes ${unpublished.join(", ")})`); continue; }
    // one entry serves every name when it can; otherwise each name goes to its best entry
    const whole = [...pubNames].filter(([, p]) => keys.every((k) => p.m.has(k))).sort((a, b) => (a[0] === "index") - (b[0] === "index") || depth(b[1].src, e.to) - depth(a[1].src, e.to) || (a[0] < b[0] ? -1 : 1))[0];
    const groups = new Map();
    wants.forEach((w, i) => { const [name, p] = whole ?? rank(keys[i], e.to)[0]; if (!groups.has(name)) groups.set(name, { p, list: [] }); groups.get(name).list.push({ ...w, key: keys[i] }); });
    const lines = [];
    let bad = null;
    for (const [name, { p, list }] of groups) {
        const spec = aliasSpell(e.spans[0].value, p.src);
        if (!spec) { bad = `${e.from}:${e.line} → ${e.to} (the specifier has no alias to keep)`; break; }
        const allType = c.isTypeOnly || list.every((w) => w.type);
        const parts = list.map((w) => { const n = p.m.get(w.key); const t = w.type && !allType ? "type " : ""; return `${t}${n === w.local ? n : `${n} as ${w.local}`}`; });
        lines.push(`import ${allType ? "type " : ""}{ ${parts.join(", ")} } from "${spec}";`);
        report.rewritten.push(`${e.from}:${e.line} → ./${name} (${p.src})`);
    }
    if (bad) { report.left.push(bad); continue; }
    put(e.from, { start: s.getStart() + offset, end: s.end + offset, text: lines.join("\n") });
}
const files = {};
for (const [f, list] of edits) {
    const before = T.read(f);
    let after = before;
    for (const x of [...new Map(list.map((y) => [`${y.start}`, y])).values()].sort((a, b) => b.start - a.start)) after = after.slice(0, x.start) + x.text + after.slice(x.end);
    files[f] = { before, after };
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: "G demo doors (L4.5, R-10): a demo import past a door is re-pointed at the entry that publishes it", ...report, files }, null, 1)}\n`);
console.log(JSON.stringify({ rewritten: report.rewritten.length, left: report.left }, null, 1));
