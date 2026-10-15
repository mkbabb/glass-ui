#!/usr/bin/env node
// split-entry.mjs — DERIVE (pass 4): land a new entry that takes names from an existing one
// (R-6: one symbol, one door; P3-R4's lighter-door reading), as one frozen row.
//
// The authored input (authored/<x>.mjs) names the entry (`key`, `source`, `create`), the
// names it takes (`names`), the specifiers that reach the old entry (`fromSpecs`: specifier →
// the specifier of the new entry, in the same style), and the static edits the change needs
// (the old door's re-exports, the entry record, the MIGRATION rows, the pinned tests; the
// edits.mjs forms). Computed here: every import declaration in the five zones and the root
// configs that takes a moved name through a `fromSpecs` specifier is split in two, the kept
// names on the old specifier and the moved names on the new one, type-only forms kept. A
// namespace import, a default import beside a moved name, or a moved name read any other way
// stops the run: the row is exact, or it does not exist.
//   node derive/split-entry.mjs --root <wt> --authored authored/aurora-config.mjs --id S33 --out frozen/S33-aurora-config.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg, loadFloor } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const doc = await import(pathToFileURL(join(KIT, arg(args, "--authored"))).href);
const F = await loadFloor(root);
const ts = createRequire(join(root, "package.json"))("typescript");
const count = (t, s) => t.split(s).length - 1;
const files = {};
const stop = [];

// ---- the static edits (edits.mjs forms)
for (const { file, from, until, to, all, create, remove } of doc.edits) {
    if (remove) { if (!existsSync(join(root, file))) stop.push(`${file}: absent`); else files[file] = null; continue; }
    if (create !== undefined) { if (existsSync(join(root, file)) || file in files) stop.push(`${file}: exists`); else files[file] = create; continue; }
    const text = (files[file] ??= readFileSync(join(root, file), "utf8"));
    const n = count(text, from);
    if (until !== undefined) {
        if (n !== 1 || count(text, until) !== 1) { stop.push(`${file}: span ${JSON.stringify(from.slice(0, 50))} (${n}) .. ${JSON.stringify(until.slice(0, 50))} (${count(text, until)})`); continue; }
        const i = text.indexOf(from), j = text.indexOf(until, i) + until.length;
        files[file] = text.slice(0, i) + to + text.slice(j);
        continue;
    }
    if (all ? n < 1 : n !== 1) { stop.push(`${file}: ${n} match(es) for ${JSON.stringify(from.slice(0, 70))}`); continue; }
    files[file] = all ? text.split(from).join(to) : text.replace(from, () => to);
}
if (existsSync(join(root, doc.source)) || doc.source in files) stop.push(`${doc.source}: exists`);
files[doc.source] = doc.create;

// ---- the computed splits
const MOVED = new Set(doc.names);
const tree = F.buildGraph(root).tree;
const SCRIPT = /\.(ts|mts|tsx|vue)$/;
const splits = [];
for (const f of tree.files) {
    if (!SCRIPT.test(f) || /\.d\.ts$/.test(f) || f === doc.source) continue;
    const text = files[f] ?? readFileSync(join(root, f), "utf8");
    if (!Object.keys(doc.fromSpecs).some((s) => text.includes(`"${s}"`) || text.includes(`'${s}'`))) continue;
    const blocks = f.endsWith(".vue") ? [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({ code: m[1], at: m.index + m[0].indexOf(">") + 1 })) : [{ code: text, at: 0 }];
    const cuts = [];
    for (const { code, at } of blocks) {
        const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true);
        for (const st of sf.statements) {
            if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier)) continue;
            const spec = st.moduleSpecifier.text;
            if (!(spec in doc.fromSpecs)) continue;
            const clause = st.importClause;
            const nb = clause?.namedBindings;
            if (nb && ts.isNamespaceImport(nb)) continue; // a namespace keeps what the old door still carries; tsc judges its reads
            if (!nb) continue;
            const els = nb.elements.map((e) => ({ name: (e.propertyName ?? e.name).text, text: e.getText(sf), type: e.isTypeOnly }));
            const moved = els.filter((e) => MOVED.has(e.name)), kept = els.filter((e) => !MOVED.has(e.name));
            if (!moved.length) continue;
            if (clause.name) { stop.push(`${f}: a default import beside a moved name`); continue; }
            const q = st.moduleSpecifier.getText(sf)[0];
            const lead = clause.isTypeOnly ? "import type" : "import";
            const decl = (list, s) => {
                const one = `${lead} { ${list.map((e) => e.text).join(", ")} } from ${q}${s}${q};`;
                return one.length <= 100 ? one : `${lead} {\n${list.map((e) => `    ${e.text},\n`).join("")}} from ${q}${s}${q};`;
            };
            const to = [kept.length ? decl(kept, spec) : null, decl(moved, doc.fromSpecs[spec])].filter(Boolean).join("\n");
            cuts.push({ start: at + st.getStart(sf), end: at + st.getEnd(), to });
            splits.push({ file: f, line: code.slice(0, st.getStart(sf)).split("\n").length + text.slice(0, at).split("\n").length - 1, moved: moved.map((e) => e.name), kept: kept.map((e) => e.name) });
        }
    }
    if (!cuts.length) continue;
    let out = text;
    for (const c of cuts.sort((a, b) => b.start - a.start)) out = out.slice(0, c.start) + c.to + out.slice(c.end);
    files[f] = out;
}
if (stop.length) { console.error(`stopped\n  ${stop.join("\n  ")}`); process.exit(1); }
const id = arg(args, "--id");
const row = { ...makeRow(root, doc.why, files), reasons: doc.edits.map(({ file, why }) => ({ file, why })), splits };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), splits: splits.length, files: new Set(splits.map((s) => s.file)).size }));
recordStep(root, { id, kind: "row", file, why: doc.why });
