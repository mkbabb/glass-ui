// tools/run-plants.mjs — battery/run-plants.mjs plus one post-hash mechanic: --alias base=path,... resolves a plant
// target the migration renamed (disclosed in critique-B.md). Otherwise the battery runner, line for line.
// run-plants.mjs --root <replayed tree> --adapter <adapter.mjs> [--out <json>] [--only id,id] [--alias b=p,...]
// Applies each plant alone to disk, runs the gate through the adapter, diffs against the unplanted tree, restores
// every touched path byte-for-byte (created files deleted, created dirs removed). Prints one line per plant.
// adapter contract: export async function judge(root) → { [clause]: string[] }   (lines, any format)
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative, basename } from "node:path";
import { pathToFileURL } from "node:url";
import { plants } from "../battery/plants.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const root = resolve(arg("--root"));
const { judge } = await import(pathToFileURL(resolve(arg("--adapter"))));
const only = arg("--only") ? new Set(arg("--only").split(",")) : null;

const SKIP = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report"]);
const all = [];
(function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
    if (SKIP.has(e.name) || e.isSymbolicLink()) continue;
    const p = d ? `${d}/${e.name}` : e.name;
    if (e.isDirectory()) walk(p); else all.push(p);
} })("");
const ALIAS = Object.fromEntries((arg("--alias", "") || "").split(",").filter(Boolean).map((s) => s.split("=")));
const find = (base, hint) => {
    if (ALIAS[base]) return ALIAS[base];
    const hits = all.filter((p) => basename(p) === base && !p.includes("__tests__"));
    const pick = (hint && hits.find((p) => p.includes(hint))) || hits.find((p) => p.startsWith("src/")) || hits[0];
    if (!pick) throw new Error(`find: ${base} not in tree`);
    return pick;
};
const ctx = {
    find, read: (p) => readFileSync(join(root, p), "utf8"), exists: (p) => existsSync(join(root, p)),
    ls: (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => statSync(join(root, d, f)).isFile()) : []),
    rel: (from, to) => { const r = relative(dirname(from), to); return r.startsWith(".") ? r : `./${r}`; },
};
const P = plants(ctx).filter((p) => !only || only.has(p.id));

const flat = (v) => Object.fromEntries(Object.entries(v).map(([k, l]) => [k, new Set(l)]));
const base = await judge(root); const bs = flat(base);
const counts = Object.fromEntries(Object.entries(base).map(([k, l]) => [k, l.length]));
console.log(`BASE ${JSON.stringify(counts)}`);
const rows = [];
for (const p of P) {
    const saved = {}; const madeDirs = [];
    for (const [f, text] of Object.entries(p.files)) {
        const abs = join(root, f);
        saved[f] = existsSync(abs) ? readFileSync(abs) : null;
        let d = dirname(abs); const chain = [];
        while (!existsSync(d)) { chain.unshift(d); d = dirname(d); }
        for (const c of chain) { mkdirSync(c); madeDirs.unshift(c); }
        writeFileSync(abs, text);
    }
    let r, err = null;
    try { r = await judge(root); } catch (e) { err = String(e.message ?? e).split("\n")[0]; r = {}; }
    for (const [f, buf] of Object.entries(saved)) { const abs = join(root, f); if (buf === null) rmSync(abs); else writeFileSync(abs, buf); }
    for (const d of madeDirs) rmSync(d, { recursive: true, force: true });
    const gained = Object.fromEntries(Object.entries(r).map(([k, l]) => [k, l.filter((x) => !(bs[k] ?? new Set()).has(x))]).filter(([, l]) => l.length));
    const naming = Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.filter((x) => x.includes(p.mark))]).filter(([, l]) => l.length));
    let verdict;
    if (p.expect === null) verdict = err ? "ERROR " : Object.keys(gained).length ? "FALSE+" : "CLEAN ";
    else if (err) verdict = "THROWS";
    else if (p.expect === "*" ? Object.keys(naming).length : naming[p.expect]) verdict = "CAUGHT";
    else if (Object.keys(naming).length) verdict = "OTHER ";
    else verdict = Object.keys(gained).length ? "UNNAMED" : "MISSED";
    const g = Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.length]));
    console.log(`${verdict} ${p.id} [${p.item} → ${p.expect}] ${p.what} :: ${JSON.stringify(g)}${err ? ` :: ${err}` : ""}`);
    rows.push({ id: p.id, item: p.item, expect: p.expect, verdict: verdict.trim(), gained: Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.slice(0, 4)])), err });
}
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify({ base: counts, rows }, null, 1));
