#!/usr/bin/env node
// unrelay.mjs — generation-time only: write the B12 relay-cut row for a tree (LAW.md L4.3).
// Only a door re-exports: a G door is an entry source or a declared door (record.doors) whose
// dir is not a kind slot (X-10: a slot barrel is wiring, not a door). Every `export … from`
// statement in a src file that is no G door is a relay and is cut; so is a door statement that
// re-exports a file a stage-1 list moves out of the door's dir (--departures: the door would
// otherwise publish from outside its own subtree). Each importer of a relayed name is re-pointed
// at the relay's own target (splitting a statement that also takes names the relay owns), the
// relay statement is deleted, and a file left with no statement is deleted and dropped from
// record.doors. The row is frozen as exact before/after text and applied by apply-row.mjs.
// Adapted from pass-2/kit/B-proto/tools/unrelay.mjs (B-S6), with G's door set.
//   node unrelay.mjs --root <wt> --out <row.json> [--departures <stage-1 list.json>] [--zones src,scripts]
// In scripts a door is an `index.mjs`.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const { buildGraph } = await import(join(root, "scripts/structure/lib/graph.mjs"));
const { isSlot } = await import(join(root, "scripts/structure/lib/placement.mjs"));
const RECORD = "scripts/structure/records/entry-record.json";
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");
const g = buildGraph(root);
const T = g.tree;
const dirOf = (f) => posix.dirname(f);
const PUB_JS = new Set(g.record.js.map(([, s]) => s));
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec)\.ts$/.test(f);
const isDoor = (f) => PUB_JS.has(f) || (g.record.doors.includes(f) && !isSlot(dirOf(f))) || (f.startsWith("scripts/") && posix.basename(f) === "index.mjs");
const departures = opt("--departures") ? JSON.parse(readFileSync(opt("--departures"), "utf8")).moves : [];
const departing = new Map(departures.map((m) => [m.from, m.to]));
const zones = (opt("--zones") ?? "src").split(",");
const relayFiles = new Set(g.edges.filter((e) => e.to && e.kind.startsWith("reexport") && zones.some((z) => e.from.startsWith(`${z}/`)) && !isDoor(e.from) && !isTest(e.from)).map((e) => e.from));
// a door whose statement re-exports a departing file (from outside the door's dir after the move)
const departFrom = new Set(g.edges.filter((e) => e.to && e.kind.startsWith("reexport") && isDoor(e.from) && departing.has(e.to) && !departing.get(e.to).startsWith(`${dirOf(e.from)}/`)).map((e) => e.from));

function scripts(file) {
    const text = T.read(file) ?? "";
    if (file.endsWith(".vue")) {
        const { descriptor } = sfc.parse(text, { filename: file });
        return [descriptor.script, descriptor.scriptSetup].filter(Boolean).map((b) => ({ sf: ts.createSourceFile(file, b.content, ts.ScriptTarget.Latest, true), offset: b.loc.start.offset }));
    }
    return [{ sf: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), offset: 0 }];
}
const edgesFrom = (f) => g.edges.filter((e) => e.from === f && e.to && e.spans?.length);
const stmtOfSpan = (file, start) => { for (const { sf, offset } of scripts(file)) for (const s of sf.statements) if (s.moduleSpecifier && s.moduleSpecifier.getStart() + 1 + offset === start) return { s, offset, sf }; return null; };

/** name → {target, name, type} for each relayed name; `only` limits it to statements aimed at those targets */
function relayTable(F, only = null) {
    const table = new Map();
    const stmts = [];
    for (const e of edgesFrom(F).filter((x) => x.kind.startsWith("reexport") && (!only || only.has(x.to)))) {
        const hit = stmtOfSpan(F, e.spans[0].start); if (!hit) continue;
        stmts.push({ ...hit, e });
        const { s } = hit;
        if (!s.exportClause) { for (const n of g.exportsOf.get(e.to)?.own ?? []) if (!table.has(n)) table.set(n, { target: e.to, name: n, type: s.isTypeOnly }); continue; }
        if (ts.isNamedExports(s.exportClause)) for (const el of s.exportClause.elements) table.set(el.name.text, { target: e.to, name: (el.propertyName ?? el.name).text, type: s.isTypeOnly || el.isTypeOnly });
    }
    return { table, stmts };
}
const spellTo = (from, target, orig) => {
    const alias = g.aliases.find((a) => orig === a.key || orig.startsWith(`${a.key}/`));
    const bare = target.replace(/\.(ts|mts)$/, "").replace(/\/index$/, "");
    if (alias && bare.startsWith(`${alias.target}/`)) return `${alias.key}${bare.slice(alias.target.length)}`;
    const rel = posix.relative(dirOf(from), bare);
    return rel.startsWith(".") ? rel : `./${rel}`;
};

const edits = new Map();
const edit = (f, start, end, text) => { if (!edits.has(f)) edits.set(f, []); edits.get(f).push({ start, end, text }); };
const report = { relays: [], importersRewritten: 0, deleted: [], left: [] };
const lineEnd = (f, off, end) => { const t = T.read(f); let j = end + off; while (t[j] === ";") j++; if (t[j] === "\n") j++; return j; };
const targets = [...[...relayFiles].map((F) => [F, null]), ...[...departFrom].map((F) => [F, new Set(departing.keys())])];
for (const [F, only] of targets.sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const { table, stmts } = relayTable(F, only);
    if (!stmts.length) continue;
    report.relays.push(`${F}: ${stmts.length} ${only ? "departure" : "relay"} statement(s), ${table.size} name(s)`);
    for (const e of g.edges.filter((x) => x.to === F && x.spans?.length && ["import", "import-type", "reexport", "reexport-star", "import-type-node", "dynamic", "vi-mock"].includes(x.kind))) {
        if (e.kind === "dynamic" || e.kind === "vi-mock") { report.left.push(`${e.from}:${e.line} ${e.kind} of a relay`); continue; }
        const hit = stmtOfSpan(e.from, e.spans[0].start);
        if (!hit) { report.left.push(`${e.from}:${e.line} statement not found`); continue; }
        const { s, offset } = hit;
        const isExport = ts.isExportDeclaration(s);
        const typeStmt = s.isTypeOnly || s.importClause?.isTypeOnly;
        if (isExport && !s.exportClause) {
            const own = [...(g.exportsOf.get(F)?.own ?? [])];
            const byTarget = new Map();
            for (const [n, r] of table) { if (!byTarget.has(r.target)) byTarget.set(r.target, []); byTarget.get(r.target).push({ n, r }); }
            const parts = own.length || only ? [s.getText()] : [];
            for (const [target, list] of byTarget) {
                const spec = spellTo(e.from, target, e.spans[0].value);
                const vals = list.filter((x) => !x.r.type).map((x) => (x.r.name === x.n ? x.n : `${x.r.name} as ${x.n}`));
                const types = list.filter((x) => x.r.type).map((x) => (x.r.name === x.n ? x.n : `${x.r.name} as ${x.n}`));
                if (vals.length) parts.push(`export { ${vals.join(", ")} } from "${spec}";`);
                if (types.length) parts.push(`export type { ${types.join(", ")} } from "${spec}";`);
            }
            edit(e.from, s.getStart() + offset, s.end + offset, parts.join("\n"));
            report.importersRewritten++;
            continue;
        }
        const els = isExport ? s.exportClause.elements : s.importClause?.namedBindings && ts.isNamedImports(s.importClause.namedBindings) ? s.importClause.namedBindings.elements : null;
        if (!els || s.importClause?.name) { report.left.push(`${e.from}:${e.line} default or namespace import of a relay`); continue; }
        const keep = [], moved = new Map();
        for (const el of els) {
            const imported = (el.propertyName ?? el.name).text;
            const r = table.get(imported);
            if (!r) { keep.push(el.getText()); continue; }
            const local = el.name.text;
            const t = el.isTypeOnly || r.type ? "type " : "";
            const txt = `${typeStmt ? "" : t}${r.name === local ? local : `${r.name} as ${local}`}`;
            if (!moved.has(r.target)) moved.set(r.target, []);
            moved.get(r.target).push(txt);
        }
        if (!moved.size) continue;
        const kw = isExport ? `export${s.isTypeOnly ? " type" : ""}` : `import${s.importClause.isTypeOnly ? " type" : ""}`;
        const parts = keep.length ? [`${kw} { ${keep.join(", ")} } from ${s.moduleSpecifier.getText()};`] : [];
        for (const [target, list] of moved) parts.push(`${kw} { ${list.join(", ")} } from "${spellTo(e.from, target, e.spans[0].value)}";`);
        edit(e.from, s.getStart() + offset, s.end + offset, parts.join("\n"));
        report.importersRewritten++;
    }
    for (const { s, offset } of stmts) edit(F, s.getStart() + offset, lineEnd(F, offset, s.end), "");
}

const files = {};
let doorsDropped = [];
for (const [f, list] of edits) {
    const before = T.read(f);
    const sorted = [...new Map(list.map((x) => [`${x.start}:${x.end}`, x])).values()].sort((a, b) => b.start - a.start);
    let after = before;
    for (let i = 0; i < sorted.length; i++) { if (i && sorted[i].end > sorted[i - 1].start) throw new Error(`overlap in ${f}`); after = after.slice(0, sorted[i].start) + sorted[i].text + after.slice(sorted[i].end); }
    const left = ts.createSourceFile(f, after, ts.ScriptTarget.Latest, true).statements.length;
    if (!left && (relayFiles.has(f) || departFrom.has(f)) && !f.endsWith(".vue")) { files[f] = { before, after: null }; report.deleted.push(f); doorsDropped.push(f); continue; }
    files[f] = { before, after };
}
doorsDropped = doorsDropped.filter((d) => g.record.doors.includes(d));
if (doorsDropped.length) {
    const before = T.read(RECORD);
    const doors = g.record.doors.filter((d) => !doorsDropped.includes(d));
    const after = before.replace(/"doors": \[[^\]]*\]/, `"doors": [\n${doors.map((d) => `        ${JSON.stringify(d)}`).join(",\n")}\n    ]`);
    if (after === before) throw new Error("record.doors not rewritten");
    files[RECORD] = { before, after };
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: "G relay cut (L4.3, B12)", ...report, files }, null, 1)}\n`);
console.log(JSON.stringify({ relays: report.relays, importersRewritten: report.importersRewritten, deleted: report.deleted, left: report.left, files: Object.keys(files).length }, null, 1));
