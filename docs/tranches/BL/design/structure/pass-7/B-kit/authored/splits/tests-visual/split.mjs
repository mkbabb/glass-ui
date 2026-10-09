#!/usr/bin/env node
// split.mjs — DERIVE (B-S11, tests-visual): split a file over R-5's 500 lines into named
// files of its module, from `splits.json` (beside this file), computed on the tree it runs
// on. It runs after the carve (carve.mjs), so every source already sits in its module and
// every output lands beside it: no path in the source is re-based. The spec names blocks by
// title and declarations by name, never by line, so earlier route edits do not stale it.
//
// Two kinds of entry.
//
// kind "spec" (a Playwright spec):
//   { source, kind: "spec", why, header, within?, copy?,
//     parts:   [{ file, why, blocks: [title prefix…] }],
//     helpers: [{ file, why, names: [declaration…] }] }
//   - A block is a top-level `test(…)` / `test.describe(…)` / `test.skip("t", fn)` (and the
//     fixme/fail/only forms with a body), or a loop or `if` whose body declares tests (its
//     title is its first test's). With `within`, the children of the one top-level describe
//     it names are blocks too, and each part that takes one re-opens that describe under its
//     own title, with the describe's own hooks and the declarations its blocks read.
//   - Every block goes to the one part whose `blocks` names it by title prefix. A block no
//     part names, or two parts name, stops the run: no test is dropped or run twice.
//   - A file-level hook (`test.beforeAll/afterAll/beforeEach/afterEach`, `test.use`,
//     `test.setTimeout`, `test.slow`, `test.describe.configure`, a conditional
//     `test.skip(cond, why)`) goes to every part: it covered every block in the source.
//   - A declaration goes to the helper whose `names` lists it (exported there), or to the
//     one part that reads it. A declaration two parts read and no helper names, one a helper
//     reads that no helper names, or one nothing reads, stops the run; `copy` names a one-line
//     declaration each reading part carries itself. Module state (a ledger) in a helper is
//     one instance per worker, as it was in the one file.
//   - `unread` names a declaration nothing reads that the source keeps on purpose (a
//     recorded fact), with the part it stays in and why; any other unread one stops the run.
//   - Imports are recomputed per output from the bindings it reads; an import no statement
//     of the source reads is an assertion and stays, verbatim, in the `header` part.
//   - The source's header comment heads the `header` part (the file that keeps the gate's
//     account); every other output opens with its own `why`.
//
// kind "module" (a plain ES module):
//   { source, kind: "module", why, parts: [{ file, why, names: [declaration…] }] }
//   - Each named declaration, with its leading comments, leaves the source for its part.
//     The source keeps its header and every other statement, its re-exports included.
//   - A name one file declares and another reads is imported from the declaring file, and
//     exported there if it was not (listed as `exported`); an import cycle between the files
//     stops the run.
//   - A file of the tree that imports a name that leaves the source imports it from its new
//     file instead (re-point by default, P4-R2): the import splits by provider, in the same
//     row. A re-export, or a default or namespace import, of a moved name stops the run.
//
// Every output is at most 500 lines, parses (the floor's lib/syntax.mjs), and does not
// exist before the split unless it is the source itself (then the row carries hunks). The
// test declarations of a spec are counted in and out and must match.
//   node split.mjs --root <tree> --spec splits.json [--only <source>…] [--out row.json] [--apply]
// --out writes one row in B's row shape (pass-4 B-kit lib/row.mjs); --apply applies that row
// through lib/row.mjs's own applyRow, the route's writer.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const STRUCTURE = resolve(HERE, "../../../../..");
const { hunksOf, applyRow } = await import(pathToFileURL(join(STRUCTURE, "pass-4/B-kit/lib/row.mjs")));

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i < 0 ? undefined : args[i + 1]; };
const root = resolve(opt("--root") ?? ".");
const specPath = resolve(opt("--spec"));
const only = args.flatMap((a, i) => (args[i - 1] === "--only" ? [a] : []));
const out = opt("--out");
const apply = args.includes("--apply");
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const floorLib = existsSync(join(root, "scripts/structure/lib/syntax.mjs")) ? join(root, "scripts/structure/lib") : join(STRUCTURE, "floor/lib");
const { unparsed } = await import(pathToFileURL(join(floorLib, "syntax.mjs")));
const deps = { ts, postcss: req("postcss"), sfc: req("@vue/compiler-sfc") };
const MAX = 500;
const overlay = new Map(); // file -> its text after the re-points (kind "module")
const repoints = [];
const readText = (f) => overlay.get(f) ?? readFileSync(join(root, f), "utf8");

const spec = JSON.parse(readFileSync(specPath, "utf8"));
const entries = spec.splits.filter((s) => !only.length || only.includes(s.source));
if (only.length && entries.length !== only.length) throw new Error("--only names a source the spec does not hold");

// ---- syntax helpers -------------------------------------------------------------------------
const chainOf = (call) => {
    let e = call.expression;
    while (ts.isCallExpression(e)) e = e.expression;
    const parts = [];
    while (ts.isPropertyAccessExpression(e)) { parts.unshift(e.name.text); e = e.expression; }
    if (!ts.isIdentifier(e)) return []; // `/re/.test(s)` is no Playwright call
    parts.unshift(e.text);
    return parts;
};
const HOOKS = new Set(["beforeAll", "afterAll", "beforeEach", "afterEach", "use", "setTimeout", "slow"]);
const MODIFIERS = new Set(["skip", "fixme", "fail", "only"]);
const isFn = (n) => n && (ts.isArrowFunction(n) || ts.isFunctionExpression(n));
/** A call's Playwright kind: "test" (declares one test), "describe", "hook", or null. */
function callKind(call) {
    const c = chainOf(call);
    if (c[0] !== "test") return null;
    if (c.length === 1) return "test";
    if (c[1] === "describe") return c[2] === "configure" ? "hook" : "describe";
    if (HOOKS.has(c[1])) return "hook";
    if (MODIFIERS.has(c[1])) return isFn(call.arguments[1]) || isFn(call.arguments[2]) ? "test" : "hook";
    if (c[1] === "step" || c[1] === "info") return null;
    return null;
}
const titleText = (a) => (!a ? "" : ts.isStringLiteralLike(a) ? a.text : a.getText());
function testCalls(node) {
    const found = [];
    const v = (x) => { if (ts.isCallExpression(x) && callKind(x) === "test") found.push(x); ts.forEachChild(x, v); };
    v(node);
    return found;
}
/** A statement's kind: import, hook, block (with title), decl, or other. */
function kindOf(s) {
    if (ts.isImportDeclaration(s)) return { kind: "import" };
    if (ts.isExpressionStatement(s) && ts.isCallExpression(s.expression)) {
        const k = callKind(s.expression);
        if (k === "hook") return { kind: "hook" };
        if (k === "test" || k === "describe") return { kind: "block", title: titleText(s.expression.arguments[0]) };
    }
    if (declared(s).length) return { kind: "decl" };
    const tc = testCalls(s);
    if (tc.length && (ts.isForOfStatement(s) || ts.isForStatement(s) || ts.isForInStatement(s) || ts.isIfStatement(s) || ts.isBlock(s))) return { kind: "block", title: titleText(tc[0].arguments[0]) };
    return { kind: "other" };
}
function declared(s) {
    if (ts.isVariableStatement(s)) {
        const names = [];
        const bind = (n) => { if (ts.isIdentifier(n)) names.push(n.text); else for (const el of n.elements ?? []) if (!ts.isOmittedExpression(el)) bind(el.name); };
        for (const d of s.declarationList.declarations) bind(d.name);
        return names;
    }
    if ((ts.isFunctionDeclaration(s) || ts.isClassDeclaration(s) || ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s) || ts.isEnumDeclaration(s)) && s.name) return [s.name.text];
    return [];
}
const isExported = (s) => !!s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
const isTypeOnly = (s) => ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s);
/** Identifiers a node reads (property names, member names and import clauses left out). */
function reads(node) {
    const outS = new Set();
    const v = (x) => {
        if (ts.isIdentifier(x)) {
            const p = x.parent;
            const isName =
                (ts.isPropertyAccessExpression(p) && p.name === x) ||
                (ts.isPropertyAssignment(p) && p.name === x) ||
                (ts.isQualifiedName(p) && p.right === x) ||
                ((ts.isPropertySignature(p) || ts.isMethodSignature(p) || ts.isPropertyDeclaration(p) || ts.isMethodDeclaration(p) || ts.isGetAccessor(p) || ts.isSetAccessor(p) || ts.isEnumMember(p)) && p.name === x) ||
                (ts.isBindingElement(p) && p.propertyName === x) ||
                ts.isImportSpecifier(p) || ts.isExportSpecifier(p) || ts.isImportClause(p) || ts.isNamespaceImport(p) ||
                (ts.isLabeledStatement(p) && p.label === x);
            if (!isName) outS.add(x.text);
        }
        ts.forEachChild(x, v);
    };
    v(node);
    return outS;
}
const readsText = (t) => reads(ts.createSourceFile("x.ts", t, ts.ScriptTarget.Latest, true));
const lines = (t) => t.replace(/\n$/, "").split("\n").length;
const trimLead = (t) => t.replace(/^[ \t]*\n/, "").replace(/^(?:[ \t]*\n)+/, "\n");
const bindingsOf = (cl) => [
    ...(cl.name ? [cl.name.text] : []),
    ...(cl.namedBindings ? (ts.isNamespaceImport(cl.namedBindings) ? [cl.namedBindings.name.text] : cl.namedBindings.elements.map((e) => e.name.text)) : []),
];
const exportText = (d, text) => {
    if (isExported(d.node) || !d.names.length) return d.text;
    return d.text.slice(0, d.lead) + "export " + d.text.slice(d.lead);
};

/** A statement's end, with the comment that ends its line (`x = 1; // why`) included. */
const endOf = (text, s) => {
    const m = /^[ \t]*(\/\/[^\n]*|\/\*[^\n]*?\*\/[ \t]*(?=\n|$))/.exec(text.slice(s.end));
    return s.end + (m ? m[0].length : 0);
};
/** A chunk: `{ text, lead }`, where `lead` is the length of its leading trivia (comments). */
const chunkOf = (text, from, s) => {
    const t = trimLead(text.slice(from, endOf(text, s)));
    return { text: t, lead: t.length - (endOf(text, s) - s.getStart()) };
};
/** Parse a source into its statements, each with its text (leading comments included). */
function statementsOf(src, text) {
    const sf = ts.createSourceFile(src, text, ts.ScriptTarget.Latest, true, /\.m?js$/.test(src) ? ts.ScriptKind.JS : ts.ScriptKind.TS);
    const stmts = [...sf.statements];
    const header = text.slice(0, stmts[0].getStart()).replace(/\s+$/, "");
    const tail = text.slice(endOf(text, stmts[stmts.length - 1])).trim();
    if (tail) throw new Error(`${src}: trailing text after the last statement is not placed`);
    return {
        sf, header,
        items: stmts.map((s, i) => ({ node: s, index: i, ...(i === 0 ? { text: text.slice(s.getStart(), endOf(text, s)), lead: 0 } : chunkOf(text, endOf(text, stmts[i - 1]), s)) })),
    };
}

/** The import lines an output needs, from the source's imports and the bindings it reads. */
function importsFor(src, text, imports, body, { host, readAnywhere }) {
    const used = readsText(body);
    const outL = [];
    for (const im of imports) {
        const s = im.node;
        const lead = im.text.slice(0, im.lead).replace(/^\s*\n/, "");
        const cl = s.importClause;
        if (!cl) { if (host) outL.push(im.text.replace(/^\s*\n/, "")); continue; }
        const all = bindingsOf(cl);
        const asserted = all.filter((n) => !readAnywhere.has(n));
        const keep = new Set(all.filter((n) => used.has(n) || (host && asserted.includes(n))));
        if (!keep.size) continue;
        const withLead = (line) => (host && lead ? `${lead}${line}` : line);
        if (keep.size === all.length) { outL.push(withLead(im.text.slice(im.lead))); continue; }
        if (/@ts-/.test(lead)) throw new Error(`${src}: an import under a @ts- directive is read by more than one output in part`);
        const typeAll = cl.isTypeOnly ? "type " : "";
        const def = cl.name && keep.has(cl.name.text) ? cl.name.text : null;
        let named = null;
        if (cl.namedBindings && ts.isNamespaceImport(cl.namedBindings)) {
            if (keep.has(cl.namedBindings.name.text)) named = `* as ${cl.namedBindings.name.text}`;
        } else if (cl.namedBindings) {
            const els = cl.namedBindings.elements.filter((e) => keep.has(e.name.text)).map((e) => e.getText());
            if (els.length) named = `{ ${els.join(", ")} }`;
        }
        outL.push(withLead(`import ${typeAll}${[def, named].filter(Boolean).join(", ")} from ${s.moduleSpecifier.getText()};`));
    }
    return outL;
}
/** A why as a line comment, wrapped at 96 columns. */
const commentOf = (why) => {
    const out = [];
    let line = "//";
    for (const w of why.split(/\s+/).filter(Boolean)) {
        if (line.length + 1 + w.length > 96 && line !== "//") { out.push(line); line = "//"; }
        line += ` ${w}`;
    }
    out.push(line);
    return `${out.join("\n")}\n`;
};
const importFrom = (names, file) => {
    const list = names.join(", ");
    return list.length > 80 ? `import {\n    ${names.join(",\n    ")},\n} from "./${file}";` : `import { ${list} } from "./${file}";`;
};

// ---- kind "spec" --------------------------------------------------------------------------
function planSpec(entry) {
    const src = entry.source, dir = posix.dirname(src);
    const text = readText(src), text0 = readFileSync(join(root, src), "utf8");
    const { header, items } = statementsOf(src, text);
    const imports = [], decls = [], hooks = [], blocks = [];
    let outer = null;
    for (const it of items) {
        const k = kindOf(it.node);
        if (k.kind === "import") imports.push(it);
        else if (k.kind === "hook") hooks.push(it);
        else if (k.kind === "decl") { it.names = declared(it.node); decls.push(it); }
        else if (k.kind === "block") { it.title = k.title; blocks.push(it); }
        else throw new Error(`${src}: a top-level statement that is no import, hook, block or declaration: ${it.text.trim().slice(0, 80)}`);
    }
    // units: top-level blocks, and the children of `within`
    const units = [];
    const inner = { hooks: [], decls: [] };
    for (const b of blocks) {
        if (entry.within && b.title.startsWith(entry.within)) {
            if (outer) throw new Error(`${src}: within "${entry.within}" names two describes`);
            outer = b;
            const call = b.node.expression, fn = call.arguments[1];
            if (!isFn(fn) || !ts.isBlock(fn.body)) throw new Error(`${src}: the within describe has no block body`);
            const body = fn.body.statements;
            body.forEach((s, i) => {
                const { text: t, lead } = chunkOf(text, i === 0 ? fn.body.getStart() + 1 : endOf(text, body[i - 1]), s);
                const k = kindOf(s);
                const c = { node: s, text: t, lead };
                if (k.kind === "block") units.push({ ...c, title: k.title, inner: true });
                else if (k.kind === "hook") inner.hooks.push(c);
                else if (k.kind === "decl") inner.decls.push({ ...c, names: declared(s) });
                else throw new Error(`${src}: the within describe holds a statement that is no block, hook or declaration: ${t.trim().slice(0, 80)}`);
            });
            b.open = text.slice(b.node.getStart(), fn.body.getStart() + 1);
            b.close = text.slice(fn.body.end - 1, endOf(text, b.node));
            b.leadText = b.text.slice(0, b.lead);
        } else units.push({ ...b, inner: false });
    }
    if (entry.within && !outer) throw new Error(`${src}: within "${entry.within}" names no top-level describe`);
    // assign
    const owner = new Map();
    for (const u of units) {
        const hits = entry.parts.filter((p) => p.blocks.some((t) => u.title.startsWith(t)));
        if (hits.length !== 1) throw new Error(`${src}: block "${u.title.slice(0, 70)}" is named by ${hits.length} parts`);
        owner.set(u, hits[0]);
    }
    for (const p of entry.parts) for (const t of p.blocks) if (!units.some((u) => u.title.startsWith(t))) throw new Error(`${src}: part ${p.file} names "${t}", which no block carries`);
    // declarations
    const declOf = new Map();
    for (const d of decls) { d.reads = reads(d.node); for (const n of d.names) declOf.set(n, d); }
    const helperOf = new Map();
    for (const h of entry.helpers ?? []) for (const n of h.names) {
        const d = declOf.get(n);
        if (!d) throw new Error(`${src}: helper ${h.file} names ${n}, which no top-level declaration carries`);
        if (helperOf.has(d) && helperOf.get(d) !== h) throw new Error(`${src}: ${n} is named by two helpers`);
        helperOf.set(d, h);
    }
    for (const [d, h] of helperOf) for (const n of d.names) if (!h.names.includes(n)) throw new Error(`${src}: ${h.file} takes ${d.names.join(", ")} but names only some of them`);
    const closure = (names, seen = new Set()) => {
        for (const n of names) { const d = declOf.get(n); if (d && !seen.has(d)) { seen.add(d); if (!helperOf.has(d)) closure(d.reads, seen); } }
        return seen;
    };
    const hookReads = [...hooks].flatMap((h) => [...reads(h.node)]);
    const partReads = new Map(entry.parts.map((p) => [p, new Set(hookReads)]));
    for (const u of units) for (const n of reads(u.node)) partReads.get(owner.get(u)).add(n);
    for (const p of entry.parts) if (units.some((u) => u.inner && owner.get(u) === p)) for (const c of [...inner.hooks, ...inner.decls]) for (const n of reads(c.node)) partReads.get(p).add(n);
    const users = new Map(decls.map((d) => [d, new Set()]));
    for (const p of entry.parts) for (const d of closure(partReads.get(p))) users.get(d).add(p);
    const copy = new Set(entry.copy ?? []);
    for (const d of decls) {
        if (helperOf.has(d)) {
            for (const n of d.reads) { const x = declOf.get(n); if (x && x !== d && !helperOf.has(x)) throw new Error(`${src}: helper ${helperOf.get(d).file}'s ${d.names[0]} reads ${n}, which no helper names`); }
            continue;
        }
        const n = users.get(d).size;
        const kept = (entry.unread ?? []).find((u) => d.names.includes(u.name));
        if (kept) {
            if (n) throw new Error(`${src}: unread names ${kept.name}, which ${[...users.get(d)].map((p) => p.file).join(", ")} reads`);
            const p = entry.parts.find((x) => x.file === kept.file);
            if (!p) throw new Error(`${src}: unread puts ${kept.name} in ${kept.file}, which is no part`);
            users.get(d).add(p);
            continue;
        }
        if (n === 0) {
            const by = decls.filter((x) => helperOf.has(x) && d.names.some((m) => x.reads.has(m)));
            throw new Error(`${src}: ${d.names.join(", ")}: ${by.length ? `read only by helper declarations (${by.map((x) => x.names[0]).join(", ")}); name it in a helper` : "read by no output"}`);
        }
        if (n > 1 && !d.names.every((x) => copy.has(x))) throw new Error(`${src}: ${d.names.join(", ")}: read by ${[...users.get(d)].map((p) => p.file).join(", ")}; name it in a helper or copy it`);
    }
    // inner declarations: into every part whose inner blocks (or inner hooks) read them
    const innerDeclsFor = (p) => {
        const mine = units.filter((u) => u.inner && owner.get(u) === p);
        if (!mine.length) return [];
        const r = new Set([...mine, ...inner.hooks].flatMap((c) => [...reads(c.node)]));
        let grew = true;
        const take = new Set();
        while (grew) { grew = false; for (const d of inner.decls) if (!take.has(d) && d.names.some((n) => r.has(n))) { take.add(d); for (const n of reads(d.node)) r.add(n); grew = true; } }
        return inner.decls.filter((d) => take.has(d));
    };
    for (const d of inner.decls) if (!entry.parts.some((p) => innerDeclsFor(p).includes(d))) throw new Error(`${src}: the within describe's ${d.names.join(", ")} is read by no part`);

    // outputs
    const readAnywhere = new Set();
    for (const it of items) if (!ts.isImportDeclaration(it.node)) for (const n of reads(it.node)) readAnywhere.add(n);
    const outputs = [];
    const helperNames = new Map(); // name -> {file, type}
    for (const h of entry.helpers ?? []) for (const n of h.names) helperNames.set(n, { file: h.file, type: isTypeOnly(declOf.get(n).node) });
    const fromHelpers = (body, self) => {
        const used = readsText(body);
        const by = new Map();
        for (const [n, { file, type }] of helperNames) if (file !== self && used.has(n)) { if (!by.has(file)) by.set(file, []); by.get(file).push(type ? `type ${n}` : n); }
        return [...by].map(([file, names]) => importFrom(names, file)); // the workspace spells .ts
    };
    for (const h of entry.helpers ?? []) {
        const mine = decls.filter((d) => helperOf.get(d) === h);
        const body = mine.map((d) => exportText(d, text)).join("\n").replace(/^\s*\n/, "");
        const im = [...importsFor(src, text, imports, body, { host: false, readAnywhere }), ...fromHelpers(body, h.file)];
        const content = `${commentOf(h.why)}\n${im.length ? `${im.join("\n")}\n\n` : ""}${body.replace(/^\n+/, "")}\n`;
        outputs.push({ path: posix.join(dir, h.file), content, role: "helper", tests: 0 });
    }
    for (const p of entry.parts) {
        const isHead = p.file === entry.header;
        const pieces = [];
        for (const it of items) {
            if (ts.isImportDeclaration(it.node)) continue;
            if (hooks.includes(it)) { pieces.push(it.text); continue; }
            const d = decls.find((x) => x === it);
            if (d) { if (!helperOf.has(d) && users.get(d).has(p)) pieces.push(d.text); continue; }
            if (it === outer) {
                const mine = units.filter((u) => u.inner && owner.get(u) === p);
                if (!mine.length) continue;
                const body = [...inner.hooks.map((c) => c.text), ...innerDeclsFor(p).map((c) => c.text), ...mine.map((u) => u.text)];
                // keep the describe body's own order: re-sort by source position
                const order = (c) => c.node.getStart();
                const sorted = [...inner.hooks, ...innerDeclsFor(p), ...mine].sort((a, b) => order(a) - order(b)).map((c) => c.text);
                void body;
                pieces.push(`${it.leadText.replace(/^\s*\n/, "")}${outer.open}\n${sorted.join("\n").replace(/^\s*\n/, "")}\n${outer.close}`);
                continue;
            }
            const u = units.find((x) => !x.inner && x.index === it.index);
            if (u && owner.get(u) === p) pieces.push(it.text);
        }
        const body = pieces.map((x) => x.replace(/^\s*\n/, "")).join("\n\n");
        const im = [...importsFor(src, text, imports, body, { host: isHead, readAnywhere }), ...fromHelpers(body, null)];
        const head = isHead && header ? `${header}\n\n` : "";
        const why = isHead && p.file === posix.basename(src) && !p.why ? "" : `${commentOf(p.why)}\n`;
        const content = `${head}${why}${im.join("\n")}\n\n${body}\n`;
        const tests = units.filter((u) => owner.get(u) === p).reduce((a, u) => a + testCalls(u.node).length, 0);
        outputs.push({ path: posix.join(dir, p.file), content, role: "part", tests });
    }
    if (!entry.parts.some((p) => p.file === entry.header)) throw new Error(`${src}: header names ${entry.header}, which is no part`);
    const before = testCalls(statementsOf(src, text).sf).length;
    const after = outputs.reduce((a, o) => a + testCalls(ts.createSourceFile(o.path, o.content, ts.ScriptTarget.Latest, true)).length, 0);
    return { entry, src, text: text0, outputs, testsIn: before, testsOut: after };
}

// ---- kind "module" ------------------------------------------------------------------------
function planModule(entry) {
    const src = entry.source, dir = posix.dirname(src), base = posix.basename(src);
    const text = readText(src), text0 = readFileSync(join(root, src), "utf8");
    const { header, items } = statementsOf(src, text);
    const imports = items.filter((it) => ts.isImportDeclaration(it.node));
    // a re-export (`export { x } from "./y"`) declares nothing here and stays with the source
    const rest = items.filter((it) => !ts.isImportDeclaration(it.node));
    for (const it of rest) { it.names = declared(it.node); if (!it.names.length && !(ts.isExportDeclaration(it.node) && it.node.moduleSpecifier)) throw new Error(`${src}: a statement that declares nothing: ${it.text.trim().slice(0, 80)}`); }
    const fileOf = new Map(); // item -> file
    const byName = new Map();
    for (const it of rest) for (const n of it.names) byName.set(n, it);
    for (const p of entry.parts) for (const n of p.names) {
        const it = byName.get(n);
        if (!it) throw new Error(`${src}: part ${p.file} names ${n}, which no declaration carries`);
        if (fileOf.has(it) && fileOf.get(it) !== p.file) throw new Error(`${src}: ${n} named by two parts`);
        fileOf.set(it, p.file);
    }
    for (const [it, f] of fileOf) for (const n of it.names) if (!entry.parts.find((p) => p.file === f).names.includes(n)) throw new Error(`${src}: ${f} takes ${it.names.join(", ")} but names only some`);
    for (const it of rest) if (!fileOf.has(it)) fileOf.set(it, base);
    const files = [base, ...entry.parts.map((p) => p.file)];
    // cross-file reads
    const need = new Map(files.map((f) => [f, new Map()])); // file -> (provider file -> names)
    const exported = [];
    const exportSet = new Set();
    for (const it of rest) {
        const f = fileOf.get(it);
        for (const n of reads(it.node)) {
            const d = byName.get(n);
            if (!d || d === it) continue;
            const g = fileOf.get(d);
            if (g === f) continue;
            if (!need.get(f).has(g)) need.get(f).set(g, new Set());
            need.get(f).get(g).add(n);
            if (!isExported(d.node) && !exportSet.has(d)) { exportSet.add(d); exported.push(`${n} (${g})`); }
        }
    }
    for (const [f, m] of need) for (const g of m.keys()) if (need.get(g).has(f)) throw new Error(`${src}: ${f} and ${g} would import each other`);
    // readers elsewhere in the tree of a name that leaves the source
    const moved = rest.filter((it) => fileOf.get(it) !== base).flatMap((it) => it.names);
    const git = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 }).split("\0")
        .filter((f) => f && /\.(m?[jt]s|vue)$/.test(f) && !f.includes("node_modules/") && f !== src && existsSync(join(root, f)) && !f.startsWith("docs/"));
    const readersHit = [];
    for (const f of git) {
        const t = readText(f);
        if (!t.includes(base)) continue;
        const sf = ts.createSourceFile(f, t, ts.ScriptTarget.Latest, true);
        for (const s of sf.statements) if ((ts.isImportDeclaration(s) || ts.isExportDeclaration(s)) && s.moduleSpecifier && ts.isStringLiteral(s.moduleSpecifier) && posix.normalize(posix.join(posix.dirname(f), s.moduleSpecifier.text)) === src) {
            const names = s.importClause ? bindingsOf(s.importClause) : s.exportClause ? s.exportClause.elements.map((e) => (e.propertyName ?? e.name).text) : ["*"];
            const orig = s.importClause?.namedBindings && !ts.isNamespaceImport(s.importClause.namedBindings) ? s.importClause.namedBindings.elements.map((e) => (e.propertyName ?? e.name).text) : names;
            for (const n of orig) if (n === "*" || moved.includes(n)) readersHit.push(`${f} imports ${n}`);
        }
    }
    if (readersHit.length) throw new Error(`${src}: names that leave it are imported from it: ${readersHit.join("; ")}`);
    const readAnywhere = new Set(rest.flatMap((it) => [...reads(it.node)]));
    const outputs = files.map((f) => {
        const mine = rest.filter((it) => fileOf.get(it) === f);
        const body = mine.map((it) => (exportSet.has(it) ? exportText(it, text) : it.text)).join("\n").replace(/^\s*\n/, "");
        const im = [...importsFor(src, text, imports, body, { host: f === base, readAnywhere }), ...[...need.get(f)].map(([g, ns]) => importFrom([...ns], g))];
        const p = entry.parts.find((x) => x.file === f);
        const head = f === base ? (header ? `${header}\n\n` : "") : `${commentOf(p.why)}\n`;
        return { path: posix.join(dir, f), content: `${head}${im.length ? `${im.join("\n")}\n\n` : ""}${body.replace(/^\n+/, "")}\n`, role: f === base ? "source" : "part", tests: 0 };
    });
    return { entry, src, text: text0, outputs, testsIn: 0, testsOut: 0, exported };
}

// ---- re-point (kind "module") ---------------------------------------------------------------
// A file that imports a name a module split moves imports it from its new file: the import
// splits by provider, in place, before any plan reads the tree (a split source that imports
// from another is planned from its re-pointed text). A re-export or a namespace or default
// import of a moved name stops the run: that is a surface decision, not a re-point.
function repointAll() {
    const listed = execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", "-z"], { encoding: "utf8", maxBuffer: 1 << 28 }).split("\0")
        .filter((f) => f && /\.(m?[jt]s|vue)$/.test(f) && !f.includes("node_modules/") && existsSync(join(root, f)) && !f.startsWith("docs/"));
    for (const e of entries.filter((x) => x.kind === "module")) {
        const dir = posix.dirname(e.source), base = posix.basename(e.source);
        const movedTo = new Map(e.parts.flatMap((p) => p.names.map((n) => [n, posix.join(dir, p.file)])));
        for (const f of listed) {
            if (f === e.source) continue;
            const t = readText(f);
            if (!t.includes(base)) continue;
            const sf = ts.createSourceFile(f, t, ts.ScriptTarget.Latest, true);
            const edits = [];
            for (const s of sf.statements) {
                if (!(ts.isImportDeclaration(s) || ts.isExportDeclaration(s)) || !s.moduleSpecifier || !ts.isStringLiteral(s.moduleSpecifier)) continue;
                if (posix.normalize(posix.join(posix.dirname(f), s.moduleSpecifier.text)) !== e.source) continue;
                const named = s.importClause?.namedBindings && ts.isNamedImports(s.importClause.namedBindings) ? s.importClause.namedBindings.elements : null;
                const orig = (el) => (el.propertyName ?? el.name).text;
                if (ts.isExportDeclaration(s) || !named || s.importClause.name) {
                    const names = ts.isExportDeclaration(s) ? (s.exportClause?.elements ?? []).map(orig) : named ? named.map(orig) : ["*"];
                    if (names.some((n) => n === "*" || movedTo.has(n))) throw new Error(`${f}: re-exports or imports a moved name of ${e.source} by default or namespace; that is a surface decision, not a re-point`);
                    continue;
                }
                const groups = new Map();
                for (const el of named) { const to = movedTo.get(orig(el)) ?? e.source; if (!groups.has(to)) groups.set(to, []); groups.get(to).push(el.getText(sf)); }
                if (groups.size === 1 && groups.has(e.source)) continue;
                const type = s.importClause.isTypeOnly ? "type " : "";
                const lines = [...groups].map(([to, els]) => {
                    let rel = to === e.source ? s.moduleSpecifier.text : posix.relative(posix.dirname(f), to);
                    if (!rel.startsWith(".")) rel = `./${rel}`;
                    const list = els.join(", ");
                    return list.length > 80 ? `import ${type}{\n    ${els.join(",\n    ")},\n} from "${rel}";` : `import ${type}{ ${list} } from "${rel}";`;
                });
                edits.push({ start: s.getStart(sf), end: s.end, text: lines.join("\n") });
                repoints.push(`${f}: ${[...groups.keys()].filter((g) => g !== e.source).map((g) => `${groups.get(g).join(", ")} from ${posix.basename(g)}`).join("; ")}`);
            }
            let next = t;
            for (const x of edits.sort((a, b) => b.start - a.start)) next = next.slice(0, x.start) + x.text + next.slice(x.end);
            if (next !== t) overlay.set(f, next);
        }
    }
}

// ---- run ----------------------------------------------------------------------------------
repointAll();
const plans = entries.map((e) => (e.kind === "module" ? planModule(e) : planSpec(e)));
const row = { step: spec.why, files: {}, reasons: [] };
const stop = [];
for (const p of plans) {
    for (const o of p.outputs) {
        o.lines = lines(o.content);
        if (o.lines > MAX) stop.push(`${o.path}: ${o.lines} lines > ${MAX}`);
        if (o.path !== p.src && existsSync(join(root, o.path))) stop.push(`${o.path}: exists`);
    }
    if (p.testsIn !== p.testsOut) stop.push(`${p.src}: ${p.testsIn} test declarations in, ${p.testsOut} out`);
    for (const u of unparsed(deps, p.outputs.map((o) => [o.path, o.content]))) stop.push(`${u.file}: does not parse: ${u.error}`);
    const kept = p.outputs.find((o) => o.path === p.src);
    if (kept) row.files[p.src] = { hunks: hunksOf(p.text, kept.content) };
    else row.files[p.src] = { remove: true, before: p.text };
    for (const o of p.outputs) if (o.path !== p.src) row.files[o.path] = { create: o.content };
    row.reasons.push({ file: p.src, why: p.entry.why });
}
for (const [f, next] of overlay) {
    if (plans.some((p) => p.src === f)) continue; // a split source carries its re-point in its own outputs
    for (const u of unparsed(deps, [[f, next]])) stop.push(`${u.file}: does not parse: ${u.error}`);
    row.files[f] = { hunks: hunksOf(readFileSync(join(root, f), "utf8"), next) };
    row.reasons.push({ file: f, why: "re-points its import of a name a module split moved" });
}
if (stop.length) { console.error(`split: stopped\n  ${stop.join("\n  ")}`); process.exit(1); }
for (const r of repoints) console.log(`re-point ${r}`);
for (const p of plans) {
    console.log(`${p.src} (${lines(p.text)} lines${p.entry.kind === "module" ? "" : `, ${p.testsIn} test declarations`}) -> ${posix.dirname(p.src)}/`);
    for (const o of p.outputs) console.log(`  ${posix.basename(o.path).padEnd(40)} ${String(o.lines).padStart(4)} lines  ${o.role}${o.role === "part" && p.entry.kind !== "module" ? `, ${o.tests} tests` : ""}`);
    if (p.exported?.length) console.log(`  exported for the split: ${p.exported.join(", ")}`);
}
if (out) writeFileSync(resolve(out), `${JSON.stringify(row, null, 1)}\n`);
if (apply) { const r = applyRow(root, row); console.log(`applied: ${r.written} written, ${r.applied} already in place`); }
