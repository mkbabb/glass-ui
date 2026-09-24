#!/usr/bin/env node
// unrelay.mjs — DERIVE step B-S1b (LAW §5, clause B12): only a door re-exports. Every
// `export … from` in a src file that is not a module door (a relay), and every JS barrel in a
// kind slot (B5), is cut: each importer of a relayed name is re-pointed at the relay's own
// target (a statement that also takes names the relaying file owns is split), the relay
// statement is deleted, a file left with no statement is deleted and dropped from
// record.doors. The row is frozen (lib/row.mjs) and applied. Ported from pass-2's
// B-proto/tools/unrelay.mjs onto the landed floor.
//   node derive/unrelay.mjs --root <wt> --out frozen/S1b-unrelay.json [--only a,b]
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { doorsOf, withDoors } from "../lib/record.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const only = arg(args, "--only")?.split(",") ?? null;
const F = await loadFloor(root);
const RECORD_PATH = F.tree.recordPath(root);
const req = createRequire(join(root, "package.json"));
const ts = req("typescript");
const sfc = req("@vue/compiler-sfc");
const g = F.buildGraph(root);
const T = g.tree;
const dirOf = (f) => posix.dirname(f);
const PUB_JS = new Set(g.record.js.map(([, s]) => s));
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec)\.ts$/.test(f);
const isDoor = (f) => PUB_JS.has(f) || (/\/index\.(ts|mjs)$/.test(f) && !F.isSlot(dirOf(f)) && !F.CONTAINERS.has(dirOf(f))) || f === "src/index.ts";
let relayFiles = new Set(g.edges.filter((e) => e.to && e.kind.startsWith("reexport") && e.from.startsWith("src/") && !isDoor(e.from) && !isTest(e.from)).map((e) => e.from));
if (only) relayFiles = new Set(only); // --only names the files to dissolve, doors included (LAW §3)

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

function relayTable(file) {
    const table = new Map();
    const stmts = [];
    for (const e of edgesFrom(file).filter((x) => x.kind.startsWith("reexport"))) {
        const hit = stmtOfSpan(file, e.spans[0].start); if (!hit) continue;
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
for (const file of [...relayFiles].sort()) {
    const { table, stmts } = relayTable(file);
    if (!stmts.length) continue;
    report.relays.push(`${file}: ${stmts.length} relay statement(s), ${table.size} name(s)`);
    for (const e of g.edges.filter((x) => x.to === file && x.spans?.length && ["import", "import-type", "reexport", "reexport-star", "import-type-node"].includes(x.kind))) {
        const hit = stmtOfSpan(e.from, e.spans[0].start);
        if (!hit) { report.left.push(`${e.from}:${e.line} statement not found`); continue; }
        const { s, offset } = hit;
        const isExport = ts.isExportDeclaration(s);
        const typeStmt = s.isTypeOnly || s.importClause?.isTypeOnly;
        if (isExport && !s.exportClause) {
            const own = [...(g.exportsOf.get(file)?.own ?? [])];
            const byTarget = new Map();
            for (const [n, r] of table) { if (!byTarget.has(r.target)) byTarget.set(r.target, []); byTarget.get(r.target).push({ n, r }); }
            const parts = own.length ? [s.getText()] : [];
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
    for (const { s, offset } of stmts) edit(file, s.getStart() + offset, lineEnd(file, offset, s.end), "");
}

const intended = {};
const doorsDropped = [];
for (const [f, list] of edits) {
    const before = T.read(f);
    const sorted = [...new Map(list.map((x) => [`${x.start}:${x.end}`, x])).values()].sort((a, b) => b.start - a.start);
    let after = before;
    for (let i = 0; i < sorted.length; i++) { if (i && sorted[i].end > sorted[i - 1].start) throw new Error(`overlap in ${f}`); after = after.slice(0, sorted[i].start) + sorted[i].text + after.slice(sorted[i].end); }
    const left = ts.createSourceFile(f, after, ts.ScriptTarget.Latest, true).statements.length;
    if (!left && relayFiles.has(f) && !f.endsWith(".vue")) { intended[f] = null; report.deleted.push(f); doorsDropped.push(f); continue; }
    intended[f] = after;
}
const dropped = doorsDropped.filter((d) => g.record.doors.includes(d));
if (dropped.length) {
    const before = T.read(RECORD_PATH);
    intended[RECORD_PATH] = withDoors(before, doorsOf(before).filter((d) => !dropped.includes(d)));
}
const row = { ...makeRow(root, arg(args, "--step", "B-S1b relays cut (LAW §5, B12)"), intended), report };
writeFileSync(arg(args, "--out"), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ relayFiles: report.relays, importersRewritten: report.importersRewritten, deleted: report.deleted, left: report.left, files: Object.keys(row.files).length }));
if (!args.includes("--dry")) console.log(JSON.stringify(applyRow(root, row)));
