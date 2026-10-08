#!/usr/bin/env node
// consumer-entries.mjs — DERIVE: a consumer reaches src only through an entry (R-10, B2). The
// list is the landed gate's own B2 reading of the tree. Each line whose edge is a static import
// (value, type or default) is re-pointed at the entry source that publishes every imported name
// from that file (by origin, F-3; one symbol has one door, B9, so at most one does), written in
// the specifier style the file already uses (`@glass/…`, relative, or a `/src/…` dev URL).
// A line no entry covers is a stop: the name is private, and publishing it is a surface
// decision (a reviewed pin growth with its MIGRATION row), never a side effect of this tool.
// Stops are listed with the file and names; with --partial the covered lines land and the
// stops are frozen beside them as the residue. A line authored/consumer-holds.json holds is
// left for the step it names.
//   node derive/consumer-entries.mjs --root <wt> --id S29 --out frozen/S29-consumer-entries.json [--dry] [--partial]
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg, loadFloor } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const STATIC = new Set(["import", "import-type", "import-type-node"]);
const lines = seal(root).V.B2
    .map((s) => /^(\S+):(\d+) -> (\S+) \[(\S+)\]$/.exec(s))
    .filter((m) => m && STATIC.has(m[4]))
    .map(([, from, line, to, kind]) => ({ from, line: Number(line), to, kind }));
const g = F.buildGraph(root);
const O = F.makeOrigins(g);
const ENTRIES = JSON.parse(readFileSync(join(root, "scripts/structure/records/entry-record.json"), "utf8")).js.map(([, source]) => source);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const specFor = (from, orig, entry) => {
    if (orig.startsWith("@glass/")) return `@glass/${(posix.basename(entry) === "index.ts" ? posix.dirname(entry) : entry.replace(/\.ts$/, "")).replace(/^src\/?/, "") || "index"}`;
    if (orig.startsWith("/src/")) return `/${entry}`;
    let rel = posix.relative(posix.dirname(from), entry);
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return /\.ts$/.test(orig) ? rel : rel.replace(/\.ts$/, "");
};
// deepest entry first: an entry inside the file's own unit before the root barrel
const ranked = (to) => ENTRIES.filter((e) => to.startsWith(`${posix.dirname(e)}/`) || posix.dirname(e) === "src").sort((a, b) => b.split("/").length - a.split("/").length);
const HOLDS = JSON.parse(readFileSync(join(KIT, "authored/consumer-holds.json"), "utf8")).holds;
const files = {};
const stops = [];
const reasons = [];
for (const l of lines) {
    const hold = HOLDS.find((h) => h.file === l.from && l.to.startsWith(h.to));
    if (hold) { stops.push({ ...l, why: `held: ${hold.why}` }); continue; }
    const e = g.edges.find((x) => x.from === l.from && x.line === l.line && x.to === l.to && x.kind === l.kind);
    if (!e) { stops.push({ ...l, why: "no edge" }); continue; }
    const text = files[l.from] ?? readFileSync(join(root, l.from), "utf8");
    const stmt = new RegExp(`^[ \\t]*import(\\s+type)?\\s+((?:(?!\\bfrom\\s*["'])[^;])*?)\\s+from\\s+(["'])${esc(e.spec)}\\3;?`, "m").exec(text);
    if (!stmt) { stops.push({ ...l, why: `no static statement for ${e.spec}` }); continue; }
    let clause = stmt[2];
    if (/^\*/.test(clause) || /,\s*\*/.test(clause)) { stops.push({ ...l, names: ["*"], why: "a namespace import reads the whole module; no entry is that module" }); continue; }
    const def = /^([A-Za-z_$][\w$]*)$/.exec(clause);
    const names = def ? ["default"] : (e.names ?? []).map((n) => n.imported);
    // the name each entry publishes for each imported name: the export whose origin is the same
    const key = (o) => `${o.file}#${o.name}`;
    const published = (d, n) => { const want = new Set(O.originOf(l.to, n).map(key)); for (const [x, os] of O.exportsOf(d)) if (x !== "default" && os.some((o) => want.has(key(o)))) return x; return null; };
    const entry = names.length && !names.includes("*") ? ranked(l.to).find((d) => names.every((n) => { const x = published(d, n); return n === "default" ? Boolean(x) : x === n; })) : null;
    if (!entry) { stops.push({ ...l, names: names.filter((n) => n === "*" || !ENTRIES.some((d) => published(d, n))), why: "private" }); continue; }
    if (def) { const x = published(entry, "default"); clause = x === def[1] ? `{ ${x} }` : `{ ${x} as ${def[1]} }`; }
    const to = `import${stmt[1] ?? ""} ${clause} from ${stmt[3]}${specFor(l.from, e.spec, entry)}${stmt[3]}${stmt[0].endsWith(";") ? ";" : ""}`;
    files[l.from] = text.replace(stmt[0], () => to);
    reasons.push({ file: l.from, from: stmt[0], to, entry, why: `R-10 (B2): ${l.to} is published by ${entry}` });
}
const byName = {};
for (const s of stops) for (const n of s.names ?? ["?"]) (byName[`${s.to}#${n}`] ??= []).push(`${s.from}:${s.line}`);
console.log(JSON.stringify({ lines: lines.length, edits: reasons.length, stops: stops.length, privateNames: Object.keys(byName).length }));
if (args.includes("--dry")) { for (const [k, v] of Object.entries(byName)) console.log(`  private ${k} <- ${v.join(" ")}`); process.exit(0); }
if (stops.length && !args.includes("--partial")) { console.error("stops present; rerun with --partial to land the covered lines"); process.exit(1); }
const id = arg(args, "--id");
const row = { ...makeRow(root, `${id} R-10: consumer imports through the entry that publishes them (frozen from the gate's B2 reading, F-9)`, files), reasons, residue: stops };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id, kind: "row", file, why: `R-10 (B2): ${reasons.length} consumer imports re-pointed at their publishing entry; ${stops.length} lines read private names (the residue, frozen in the row)` });
