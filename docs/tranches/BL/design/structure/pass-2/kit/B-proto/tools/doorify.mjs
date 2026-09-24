#!/usr/bin/env node
// doorify.mjs — B-S5 (SPECS-v2 §2.6): a JS door for every module a crossing enters, and every
// crossing re-pointed at the door of the outermost module it enters (the seal's B1 rule).
//
// One pass computes, from the F-1 graph and symbol origins, a row: door lines to add (each
// door re-exports a name from its own file or from the door of the sub-module that holds it,
// so the chain is recursive), doors to create (each added to record.doors in the same row),
// and importer edits whose only change is the specifier and, for a default or a star, the
// clause that names the same binding through the door. A crossing is left in place, and
// listed with its reason, when a door would have to grow a name on a PUBLISHED entry (a
// surface change, §2.9(a)), when a door already carries the name from another origin, or
// when it is a dynamic import (a chunk boundary). Nothing is written until the whole row is
// computed; the row is frozen as JSON (exact text before/after per file) and replayed by
// apply-row.mjs. Passes repeat until a pass computes nothing.
//   node doorify.mjs --root WT --out frozen/S5-doors-N.json
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const FL = join(root, "docs/tranches/BL/design/structure/floor/lib");
const { buildGraph } = await import(pathToFileURL(join(FL, "graph.mjs")));
const { makeOrigins } = await import(pathToFileURL(join(FL, "symbols.mjs")));
const { RECORD_PATH } = await import(pathToFileURL(join(FL, "entries.mjs")));
const { isSlot, CONTAINERS, KIND_SLOTS } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");

const g = buildGraph(root);
const T = g.tree;
const O = makeOrigins(g);
const dirOf = (f) => posix.dirname(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const CODE = /\.(ts|mts|js|mjs|vue|css|glsl|wgsl)$/;
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec)\.ts$/.test(f);
const PUB_JS = new Set(g.record.js.map(([, s]) => s));

// the module set B7 requires in src (every one gets a door when a crossing enters it)
const hasCode = new Set();
for (const f of T.files) if (f.startsWith("src/") && CODE.test(f) && !isTest(f)) { let d = dirOf(f); while (d !== "." && !hasCode.has(d)) { hasCode.add(d); d = dirOf(d); } }
const inSlot = (d) => { const a = d.split("/"); for (let i = 2; i < a.length; i++) if (isSlot(a.slice(0, i).join("/"))) return true; return false; };
const modules = [...hasCode].filter((d) => d.startsWith("src/") && !CONTAINERS.has(d) && !isSlot(d) && !inSlot(d)).sort((a, b) => a.length - b.length);
const outerM = (from, to) => modules.find((m) => under(to, m) && !under(from, m));
const subModule = (m, x) => modules.find((s) => s !== m && under(s, m) && under(x, s) && !modules.some((t) => t !== s && t !== m && under(t, m) && under(s, t)));
const door = (m) => `${m}/index.ts`;

// ---- type-ness of an exported name, read from its origin declaration (verbatimModuleSyntax)
const astCache = new Map();
function scriptOf(file) {
    if (astCache.has(file)) return astCache.get(file);
    let out = [];
    const text = T.read(file) ?? "";
    if (file.endsWith(".vue")) {
        const { descriptor } = sfc.parse(text, { filename: file });
        for (const b of [descriptor.script, descriptor.scriptSetup].filter(Boolean)) out.push({ sf: ts.createSourceFile(file, b.content, ts.ScriptTarget.Latest, true), offset: b.loc.start.offset, text: b.content });
    } else if (/\.(ts|mts|js|mjs)$/.test(file)) out.push({ sf: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), offset: 0, text });
    astCache.set(file, out);
    return out;
}
function declaredType(file, name) {
    if (name === "default" || name === "*") return false;
    for (const { sf } of scriptOf(file)) for (const s of sf.statements) {
        const exported = s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if ((ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) && s.name.text === name) return true;
        if (exported && (ts.isFunctionDeclaration(s) || ts.isClassDeclaration(s) || ts.isEnumDeclaration(s)) && s.name?.text === name) return false;
        if (exported && ts.isVariableStatement(s) && s.declarationList.declarations.some((d) => d.name.getText() === name)) return false;
        if (ts.isExportDeclaration(s) && s.exportClause && ts.isNamedExports(s.exportClause)) for (const el of s.exportClause.elements) if (el.name.text === name) return s.isTypeOnly || el.isTypeOnly;
    }
    return null;
}
function isTypeName(file, name) {
    for (const o of O.originOf(file, name)) { const t = declaredType(o.file, o.name); if (t !== null) return t; }
    const t = declaredType(file, name);
    return t ?? false;
}
const originKey = (file, name) => O.originOf(file, name).map((o) => `${o.file}#${o.name}`).sort().join("|");
const aliasOfDefault = (x) => posix.basename(x).replace(/\.(vue|ts|mts|js|mjs)$/, "").replace(/(^|[-_.])([a-z])/g, (_, __, c) => c.toUpperCase());

// ---- door plan: door -> exportedName -> {spec, name, type, key}
const plan = new Map();
const created = new Set();
const blocked = [];
const doorHas = (d, exported) => {
    const now = T.isFile(d) ? O.exportsOf(d).get(exported) : null;
    if (now) return now.map((o) => `${o.file}#${o.name}`).sort().join("|");
    return plan.get(d)?.get(exported)?.key ?? null;
};
function ensure(m, x, name) {
    const d = door(m);
    const sub = subModule(m, x);
    let exported, spec, srcName, type;
    if (sub) {
        const r = ensure(sub, x, name);
        if (r.blocked) return r;
        exported = r.exported; srcName = r.exported; spec = `./${posix.relative(m, sub)}`; type = r.type;
    } else {
        exported = name === "default" ? aliasOfDefault(x) : name;
        srcName = name;
        const rel = posix.relative(m, x).replace(/\.(ts|mts)$/, "");
        spec = rel.startsWith(".") ? rel : `./${rel}`;
        type = isTypeName(x, name);
    }
    const key = originKey(x, name);
    const has = doorHas(d, exported);
    if (has === key) return { exported, type };
    if (has !== null) return { blocked: `collision: ${d} already exports ${exported} from ${has}` };
    if (PUB_JS.has(d)) return { blocked: `surface: ${d} is a published entry and does not export ${exported} (§2.9(a))` };
    if (!T.isFile(d)) created.add(d);
    if (!plan.has(d)) plan.set(d, new Map());
    plan.get(d).set(exported, { spec, name: srcName, type, key });
    return { exported, type };
}

// ---- crossings (B1): src -> src module edges past a door, from outside the entered module
const KINDS = new Set(["import", "import-type", "import-type-node", "reexport", "reexport-star", "reexport-ns", "dynamic"]);
const edits = new Map(); // file -> [{start,end,text}]
const rerouted = [];
const edit = (f, start, end, text) => { if (!edits.has(f)) edits.set(f, []); edits.get(f).push({ start, end, text }); };
function stmtAt(file, specStart) {
    for (const { sf, offset } of scriptOf(file)) {
        let hit = null;
        const visit = (n) => {
            if (hit) return;
            const ms = n.moduleSpecifier ?? (ts.isImportTypeNode(n) ? n.argument?.literal : null) ?? (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword ? n.arguments[0] : null);
            if (ms && ts.isStringLiteralLike(ms) && ms.getStart() + 1 + offset === specStart) { hit = { node: n, ms, offset, sf }; return; }
            ts.forEachChild(n, visit);
        };
        visit(sf);
        if (hit) return hit;
    }
    return null;
}
const explicit = new Map();
function explicitOf(file) {
    if (explicit.has(file)) return explicit.get(file);
    const set = new Set();
    for (const { sf } of scriptOf(file)) for (const s of sf.statements) {
        if (ts.isExportDeclaration(s) && s.exportClause && ts.isNamedExports(s.exportClause)) for (const el of s.exportClause.elements) set.add(el.name.text);
        else if (s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) { if (s.name?.text) set.add(s.name.text); if (ts.isVariableStatement(s)) for (const d of s.declarationList.declarations) set.add(d.name.getText()); }
    }
    explicit.set(file, set);
    return set;
}
function spell(e, m) {
    const alias = g.aliases.find((a) => e.spans[0].value === a.key || e.spans[0].value.startsWith(`${a.key}/`));
    if (alias && under(m, alias.target)) return `${alias.key}${m.slice(alias.target.length)}`;
    const rel = posix.relative(dirOf(e.from), m);
    const spelled = rel.startsWith(".") ? rel : `./${rel}`;
    // a sibling file named like the dir wins the dir spelling: name the door explicitly
    return [".ts", ".mts", ".js", ".vue"].some((x) => T.isFile(`${m}${x}`)) ? `${spelled}/index` : spelled;
}
for (const e of g.edges) {
    if (!e.to || e.dir || !KINDS.has(e.kind) || !e.from.startsWith("src/") || !e.to.startsWith("src/") || e.from === e.to) continue;
    const m = outerM(e.from, e.to);
    if (!m || e.to === door(m) || isTest(e.from)) continue;
    const at = `${e.from}:${e.line} -> ${e.to} [${e.kind}]`;
    if (e.kind === "dynamic") { blocked.push(`${at} dynamic import (a chunk boundary)`); continue; }
    const hit = stmtAt(e.from, e.spans?.[0]?.start);
    if (!hit) { blocked.push(`${at} statement not found`); continue; }
    const { node, ms, offset } = hit;
    // the names this statement takes from e.to
    let names;
    const star = ts.isExportDeclaration(node) && !node.exportClause;
    const ns = (ts.isImportDeclaration(node) && node.importClause?.namedBindings && ts.isNamespaceImport(node.importClause.namedBindings)) || (ts.isExportDeclaration(node) && node.exportClause && ts.isNamespaceExport(node.exportClause));
    if (star || ns) names = [...O.exportsOf(e.to).keys()].filter((n) => n !== "default");
    else names = (e.names ?? []).map((n) => n.imported).filter((n) => n && n !== "*");
    if (ts.isImportDeclaration(node) && node.importClause?.name && !names.includes("default")) names.push("default");
    if (!names.length && !ts.isImportTypeNode(node)) { blocked.push(`${at} no names`); continue; }
    const got = new Map();
    let stop = null;
    for (const n of names) { const r = ensure(m, e.to, n); if (r.blocked) { stop = r.blocked; break; } got.set(n, r); }
    if (stop) { blocked.push(`${at} ${stop}`); continue; }
    const newSpec = spell(e, m);
    edit(e.from, e.spans[0].start, e.spans[0].end, newSpec);
    const txt = (n) => n.getText();
    if (ts.isImportDeclaration(node) && node.importClause?.name) {
        // `import X[, {…}] from` -> `import { Alias as X, … } from`
        const c = node.importClause; const local = c.name.text; const alias = got.get("default").exported;
        const els = [alias === local ? alias : `${alias} as ${local}`];
        if (c.namedBindings && ts.isNamedImports(c.namedBindings)) els.push(...c.namedBindings.elements.map(txt));
        if (c.namedBindings && ts.isNamespaceImport(c.namedBindings)) { blocked.push(`${at} default plus namespace`); edits.get(e.from).pop(); continue; }
        edit(e.from, c.getStart() + offset + (c.isTypeOnly ? 5 : 0), c.end + offset, `${c.isTypeOnly ? " " : ""}{ ${els.join(", ")} }`);
    } else if (star) {
        // `export * from X` -> the same names, named, through the door
        // a star never shadows an explicit export and merges a name another star gives from the same origin
        const taken = explicitOf(e.from);
        const fresh = names.filter((n) => !taken.has(got.get(n).exported));
        for (const n of fresh) taken.add(got.get(n).exported);
        const vals = fresh.filter((n) => !got.get(n).type).map((n) => got.get(n).exported);
        const types = fresh.filter((n) => got.get(n).type).map((n) => got.get(n).exported);
        const parts = [];
        if (vals.length) parts.push(`export { ${vals.join(", ")} } from "${newSpec}";`);
        if (types.length) parts.push(`export type { ${types.join(", ")} } from "${newSpec}";`);
        edits.get(e.from).pop();
        edit(e.from, node.getStart() + offset, node.end + offset, parts.join("\n"));
    } else if ((ts.isExportDeclaration(node) || ts.isImportDeclaration(node)) && !ns) {
        // `{ default as Foo }` -> `{ Alias as Foo }`; any renamed-through name follows its door name
        const list = ts.isExportDeclaration(node) ? node.exportClause?.elements : node.importClause?.namedBindings?.elements;
        for (const el of list ?? []) {
            const imported = (el.propertyName ?? el.name).text;
            const exported = got.get(imported)?.exported;
            if (exported && exported !== imported) edit(e.from, (el.propertyName ?? el.name).getStart() + offset, (el.propertyName ?? el.name).end + offset, exported);
        }
    }
    rerouted.push(at);
}

// ---- the row: door texts + importer texts, exact before/after, all or nothing
const files = {};
for (const [d, lines] of plan) {
    const before = T.isFile(d) ? T.read(d) : null;
    const bySpec = new Map();
    for (const [exported, l] of [...lines].sort((a, b) => a[0].localeCompare(b[0]))) {
        const k = `${l.type ? "type" : "value"}\u0000${l.spec}`;
        if (!bySpec.has(k)) bySpec.set(k, []);
        bySpec.get(k).push(l.name === exported ? exported : `${l.name} as ${exported}`);
    }
    const out = [...bySpec].sort((a, b) => a[0].split("\u0000")[1].localeCompare(b[0].split("\u0000")[1]) || a[0].localeCompare(b[0])).map(([k, els]) => { const [kind, spec] = k.split("\u0000"); return `export ${kind === "type" ? "type " : ""}{ ${els.join(", ")} } from "${spec}";`; });
    const head = before === null ? `// ${posix.relative("src", dirOf(d))} — module door (B-S5): the names read from outside this module.\n` : before.endsWith("\n") ? before : `${before}\n`;
    files[d] = { before, after: `${head}${out.join("\n")}\n` };
}
for (const [f, list] of edits) {
    const before = files[f]?.after ?? T.read(f);
    const sorted = [...list].sort((a, b) => b.start - a.start);
    let after = before;
    for (let i = 0; i < sorted.length; i++) { if (i && sorted[i].end > sorted[i - 1].start) throw new Error(`overlap in ${f}`); after = after.slice(0, sorted[i].start) + sorted[i].text + after.slice(sorted[i].end); }
    if (files[f]) files[f].after = after; else files[f] = { before, after };
}
if (created.size) {
    const rec = JSON.parse(T.read(RECORD_PATH));
    const doors = [...new Set([...rec.doors, ...created])].sort();
    const before = T.read(RECORD_PATH);
    const after = before.replace(/"doors": \[[^\]]*\]/, `"doors": [\n${doors.map((d) => `        ${JSON.stringify(d)}`).join(",\n")}\n    ]`);
    files[RECORD_PATH] = { before, after };
}
const row = { step: "B-S5 doors", created: [...created].sort(), rerouted: rerouted.length, doorsGrown: plan.size, names: [...plan.values()].reduce((n, m) => n + m.size, 0), blocked, files };
writeFileSync(opt("--out"), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ created: created.size, doorsGrown: plan.size, names: row.names, rerouted: rerouted.length, blocked: blocked.length, filesWritten: Object.keys(files).length }));
