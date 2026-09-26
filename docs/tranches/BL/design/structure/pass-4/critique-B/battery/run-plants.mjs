// run-plants.mjs --root <tree> --adapter <adapter.mjs> [--out <json>] [--only id,id]
// Each plant is written alone, judged through the adapter, diffed against the unplanted judgement, and undone
// byte-for-byte (created files and dirs removed). Written and hashed before reading the pass-4 kit.
// adapter contract: export async function judge(root) → { [clause]: string[] }
// Verdicts: CAUGHT (a gained line names the mark, in the expected clause or any when expect "*"), OTHER (named in
// another clause), UNNAMED (lines gained, none name the mark), MISSED (nothing gained), THROWS (gate threw),
// CLEAN / FALSE+ for legal probes, SKIP when the battery could not find its target on this tree.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative, basename } from "node:path";
import { pathToFileURL } from "node:url";
import { plants } from "./plants.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const root = resolve(arg("--root"));
const { judge } = await import(pathToFileURL(resolve(arg("--adapter"))));
const only = arg("--only") ? new Set(arg("--only").split(",")) : null;

const SKIPD = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report", ".cache", "docs"]);
const all = [];
(function walk(d) {
    for (const e of readdirSync(join(root, d || "."), { withFileTypes: true })) {
        if (SKIPD.has(e.name) || e.isSymbolicLink()) continue;
        const p = d ? `${d}/${e.name}` : e.name;
        if (e.isDirectory()) walk(p); else all.push(p);
    }
})("");
const find = (base, hint) => {
    const hits = all.filter((p) => basename(p) === base && !p.includes("__tests__"));
    const pick = (hint && hits.find((p) => p.includes(hint))) || hits.find((p) => p.startsWith("src/")) || hits[0];
    if (!pick) throw new Error(`find: ${base} not in tree`);
    return pick;
};
const ctx = {
    find, findAll: (pred) => all.filter(pred),
    read: (p) => readFileSync(join(root, p), "utf8"), exists: (p) => existsSync(join(root, p)),
    ls: (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => statSync(join(root, d, f)).isFile()) : []),
    dirs: (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => statSync(join(root, d, f)).isDirectory()) : []),
    rel: (from, to) => { const r = relative(dirname(from), to); return r.startsWith(".") ? r : `./${r}`; },
};
const P = plants(ctx).filter((p) => !only || only.has(p.id));
const sets = (v) => Object.fromEntries(Object.entries(v).map(([k, l]) => [k, new Set(l)]));
const base = await judge(root); const bs = sets(base);
console.log(`BASE ${JSON.stringify(Object.fromEntries(Object.entries(base).map(([k, l]) => [k, l.length])))}`);
const rows = [];
for (const p of P) {
    if (p.skip) { console.log(`SKIP    ${p.id} [${p.item}] ${p.skip}`); rows.push({ id: p.id, item: p.item, verdict: "SKIP", why: p.skip }); continue; }
    const saved = {}; const made = [];
    for (const [f, text] of Object.entries(p.files)) {
        const abs = join(root, f);
        saved[f] = existsSync(abs) ? readFileSync(abs) : null;
        let d = dirname(abs); const chain = [];
        while (!existsSync(d)) { chain.unshift(d); d = dirname(d); }
        for (const c of chain) { mkdirSync(c); made.unshift(c); }
        writeFileSync(abs, text);
    }
    let r = {}, err = null;
    try { r = await judge(root); } catch (e) { err = String(e?.message ?? e).split("\n")[0]; }
    for (const [f, buf] of Object.entries(saved)) { const abs = join(root, f); if (buf === null) rmSync(abs); else writeFileSync(abs, buf); }
    for (const d of made) rmSync(d, { recursive: true, force: true });
    const gained = Object.fromEntries(Object.entries(r).map(([k, l]) => [k, l.filter((x) => !(bs[k] ?? new Set()).has(x))]).filter(([, l]) => l.length));
    const naming = Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.filter((x) => x.includes(p.mark))]).filter(([, l]) => l.length));
    let v;
    if (p.expect === null) v = err ? "ERROR" : Object.keys(gained).length ? "FALSE+" : "CLEAN";
    else if (err) v = "THROWS";
    else if (p.expect === "*" ? Object.keys(naming).length : naming[p.expect]) v = "CAUGHT";
    else if (Object.keys(naming).length) v = "OTHER";
    else v = Object.keys(gained).length ? "UNNAMED" : "MISSED";
    const g = Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.length]));
    const clauses = Object.keys(naming).join(",");
    console.log(`${v.padEnd(7)} ${p.id} [${p.item}] ${p.what} :: named=${clauses || "-"} gained=${JSON.stringify(g)}${err ? ` :: ${err}` : ""}`);
    rows.push({ id: p.id, item: p.item, expect: p.expect, verdict: v, named: clauses, gained: Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, l.slice(0, 3)])), err });
}
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify({ base: Object.fromEntries(Object.entries(base).map(([k, l]) => [k, l.length])), rows }, null, 1));
