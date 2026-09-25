#!/usr/bin/env node
// one-door.mjs — generation-time only: write the R-6 one-door row (LAW.md L4.7, E5). For every
// symbol origin two or more non-root entries publish, the law names the owner (r6Owner: the
// entry whose source dir most deeply holds the origin; among equals the lighter door, P3-R4),
// and every other entry drops the name:
//   - the dropping entry's source loses the export specifier (a statement left empty, or an
//     `export *` whose every name is dropped, is deleted with the comment above it);
//   - every module in the tree that imports or re-exports a dropped name through the dropping
//     entry's source is re-pointed at the owner's source, in the consumer's own spelling (the
//     package self-name, the `@glass` alias, or a relative path);
//   - MIGRATION.md gets one row per name under the BL section (E-6: consumers update).
// Frozen as exact before/after text; the replay applies the row, never this tool.
//   node one-door.mjs --root <wt> --out <row.json> [--added "<markdown>"]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
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
const PKG = "@mkbabb/glass-ui";

// ---- the E5 set, read exactly as the gate reads it, with the law's owner
const onEntries = new Map();
for (const [name, src] of g.record.js) {
    if (name === "index") continue;
    for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name === "*" ? n : o.name}`; if (!onEntries.has(k)) onEntries.set(k, new Set()); onEntries.get(k).add(name); }
}
const drops = new Map(); // entry name → Set(origin key)
const table = []; // [published name, leaves, owner]
for (const [k, s] of [...onEntries].sort()) {
    if (s.size < 2) continue;
    const owner = L.r6Owner(ctx, k.split("#")[0], s);
    for (const e of s) if (e !== owner) { if (!drops.has(e)) drops.set(e, new Set()); drops.get(e).add(k); table.push([k.split("#")[1], e, owner, k]); }
}
const ownerOfKey = new Map(table.map(([, , o, k]) => [k, o]));
const srcOf = new Map(g.record.js);
const keyOf = (file, imported) => { const os = O.originOf(file, imported); return os.length === 1 ? `${os[0].file}#${os[0].name}` : null; };

function blocks(file) {
    const text = T.read(file) ?? "";
    if (file.endsWith(".vue")) {
        const { descriptor } = sfc.parse(text, { filename: file });
        return [descriptor.script, descriptor.scriptSetup].filter(Boolean).map((b) => ({ sf: ts.createSourceFile(file, b.content, ts.ScriptTarget.Latest, true), offset: b.loc.start.offset }));
    }
    return [{ sf: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), offset: 0 }];
}
const edits = new Map(); // file → [{start, end, text}]
const edit = (f, start, end, text) => { if (!edits.has(f)) edits.set(f, []); edits.get(f).push({ start, end, text }); };
const specList = (els, multi, indent = "    ") => (multi ? `{\n${els.map((x) => `${indent}${x},`).join("\n")}\n}` : `{ ${els.join(", ")} }`);
// a statement cut whole takes the comment paragraph directly above it (contiguous comment lines,
// up to a blank line), never a file header (a paragraph that reaches the file's first line)
function cutWhole(f, s, offset, text) {
    const lineStart = (i) => { while (i > 0 && text[i - 1] !== "\n") i--; return i; };
    const stmt = lineStart(s.getStart() + offset);
    let a = stmt;
    for (;;) {
        if (a === 0) { a = stmt; break; }
        const prev = lineStart(a - 1);
        const line = text.slice(prev, a - 1).trim();
        if (!/^(\/\/|\/\*|\*)/.test(line) || prev < s.getFullStart() + offset - 1) break;
        a = prev;
    }
    let b = s.end + offset;
    if (text[b] === "\n") b++;
    // a blank line on both sides collapses to one
    if (text[a - 1] === "\n" && text[a - 2] === "\n" && text[b] === "\n") b++;
    edit(f, a, b, "");
}
// remove the listed elements of a named import/export list in place: each takes its own leading
// comments and its comma; the kept elements and their comments stay byte-for-byte
function dropElements(f, els, gone, offset, text) {
    for (const el of gone) {
        const i = els.indexOf(el);
        let a = el.getFullStart() + offset;
        let b = el.end + offset;
        let j = b; while (text[j] === " " || text[j] === "\t") j++;
        if (text[j] === ",") b = j + 1;
        else if (i > 0 && !gone.includes(els[i - 1])) a = els[i - 1].end + offset; // the last element: cut the comma before it
        edit(f, a, b, "");
    }
}

// ---- 1 · the dropping entries' own statements
const report = { owners: {}, doors: [], consumers: [] };
for (const [e, keys] of drops) {
    const file = srcOf.get(e);
    const text = T.read(file);
    for (const { sf, offset } of blocks(file)) for (const s of sf.statements) {
        if (!ts.isExportDeclaration(s) || !s.moduleSpecifier) continue;
        if (!s.exportClause) {
            const tgt = g.edges.find((x) => x.from === file && x.kind === "reexport-star" && x.spans?.[0]?.start === s.moduleSpecifier.getStart() + 1 + offset)?.to;
            if (!tgt) continue;
            const names = [...O.exportsOf(tgt).keys()];
            const gone = names.filter((n) => { const os = O.originOf(tgt, n); return os.length === 1 && keys.has(`${os[0].file}#${os[0].name}`); });
            if (!gone.length) continue;
            if (gone.length !== names.length) throw new Error(`${file}: export * from ${s.moduleSpecifier.text} drops ${gone.length} of ${names.length}; write it out by hand`);
            cutWhole(file, s, offset, text);
            report.doors.push(`${file}: export * from ${s.moduleSpecifier.text} (${gone.join(", ")})`);
            continue;
        }
        if (!ts.isNamedExports(s.exportClause)) continue;
        const els = s.exportClause.elements;
        const gone = els.filter((el) => { const n = el.name.text; return (O.exportsOf(file).get(n) ?? []).some((o) => keys.has(`${o.file}#${o.name}`)); });
        if (!gone.length) continue;
        report.doors.push(`${file}: ${gone.map((x) => x.name.text).join(", ")}`);
        if (gone.length === els.length) { cutWhole(file, s, offset, text); continue; }
        dropElements(file, [...els], gone, offset, text);
    }
}

// ---- 2 · the consumers
const aliasOf = (spec) => g.aliases.find((a) => spec === a.key || spec.startsWith(`${a.key}/`));
const bare = (p) => p.replace(/\.(ts|mts)$/, "").replace(/\/index$/, "");
function spell(consumer, spec, owner) {
    if (spec === PKG || spec.startsWith(`${PKG}/`)) return `${PKG}/${owner}`;
    const src = srcOf.get(owner);
    const a = aliasOf(spec);
    if (a) return `${a.key}${bare(src).slice(a.target.length)}`;
    const rel = posix.relative(posix.dirname(consumer), bare(src));
    return rel.startsWith(".") ? rel : `./${rel}`;
}
const dropSources = new Map([...drops.keys()].map((e) => [srcOf.get(e), e]));
const seen = new Set();
for (const x of g.edges) {
    if (!x.to || x.dir || !dropSources.has(x.to) || !["import", "import-type", "reexport"].includes(x.kind) || !x.spans?.length) continue;
    const D = dropSources.get(x.to);
    const keys = drops.get(D);
    const file = x.from;
    const at = `${file}\u0000${x.spans[0].start}`;
    if (seen.has(at)) continue;
    seen.add(at);
    const text = T.read(file);
    let hit = null;
    for (const { sf, offset } of blocks(file)) for (const s of sf.statements) if (s.moduleSpecifier && s.moduleSpecifier.getStart() + 1 + offset === x.spans[0].start) hit = { s, offset };
    if (!hit) throw new Error(`${file}:${x.line}: statement not found`);
    const { s, offset } = hit;
    const isImport = ts.isImportDeclaration(s);
    const clause = isImport ? s.importClause : s;
    const named = isImport ? clause?.namedBindings : s.exportClause;
    if (!named || !(ts.isNamedImports(named) || ts.isNamedExports(named))) continue;
    const typeOnly = isImport ? !!clause.isTypeOnly : !!s.isTypeOnly;
    const els = [...named.elements];
    const byOwner = new Map();
    const gone = [];
    for (const el of els) {
        const k = keyOf(x.to, (el.propertyName ?? el.name).text);
        if (k && keys.has(k)) { const o = ownerOfKey.get(k); if (!byOwner.has(o)) byOwner.set(o, []); byOwner.get(o).push(el); gone.push(el); }
    }
    if (!byOwner.size) continue;
    const multi = s.getText().includes("\n");
    const kw = isImport ? "import" : "export";
    const q = s.moduleSpecifier.getText()[0];
    // a group of type-only elements is written as a type-only statement
    const added = [...byOwner].map(([o, list]) => {
        const allType = typeOnly || list.every((el) => el.isTypeOnly);
        const texts = list.map((el) => (allType && el.isTypeOnly ? el.getText().replace(/^type\s+/, "") : el.getText()));
        return `${kw} ${allType ? "type " : ""}${specList(texts, multi && texts.length > 2)} from ${q}${spell(file, s.moduleSpecifier.text, o)}${q};`;
    }).join("\n");
    const whole = gone.length === els.length && !(isImport && clause.name);
    if (whole) edit(file, s.getStart() + offset, s.end + offset, added);
    else { dropElements(file, els, gone, offset, text); edit(file, s.end + offset, s.end + offset, `\n${added}`); }
    report.consumers.push(`${file}:${x.line} → ${[...byOwner.keys()].map((o) => `./${o}`).join(", ")}`);
}

// ---- 3 · MIGRATION.md
const MIG = "MIGRATION.md";
const mig = T.read(MIG);
const firstSection = mig.indexOf("\n## ");
const rows = table.map(([n, from, to]) => `| \`${n}\` | \`${PKG}/${from}\` | \`${PKG}/${to}\` |`);
const section = `## UNRELEASED — the structure cut (BL)

${opt("--added") ? `${opt("--added")}\n\n` : ""}_One symbol, one entry_

A name two entries published now ships from one: the entry whose own directory holds the
name's source, and where two entries of one directory both publish it, the lighter one (so a
consumer that wants only the configuration or the maths does not pull the component).
Re-point the import; nothing else changes.

| Name | Leaves | Import it from |
| --- | --- | --- |
${rows.join("\n")}

`;
edit(MIG, firstSection + 1, firstSection + 1, section);

const files = {};
for (const [f, list] of edits) {
    const before = T.read(f);
    let after = before;
    const sorted = [...list].sort((a, b) => b.start - a.start);
    for (let i = 1; i < sorted.length; i++) if (sorted[i].end > sorted[i - 1].start) throw new Error(`${f}: overlapping edits`);
    for (const y of sorted) after = after.slice(0, y.start) + y.text + after.slice(y.end);
    files[f] = { before, after };
}
for (const [n, from, to] of table) (report.owners[`./${to}`] ??= []).push(`${n} (leaves ./${from})`);
writeFileSync(opt("--out"), `${JSON.stringify({ step: "G R-6 one door (LAW.md L4.7, E5): each name keeps its owning entry; the others drop it; consumers re-pointed; a MIGRATION row per name", names: table.length, ...report, files }, null, 1)}\n`);
console.log(JSON.stringify({ names: table.length, owners: Object.fromEntries(Object.entries(report.owners).map(([k, v]) => [k, v.length])), doors: report.doors.length, consumers: report.consumers.length, files: Object.keys(files).length }, null, 1));
