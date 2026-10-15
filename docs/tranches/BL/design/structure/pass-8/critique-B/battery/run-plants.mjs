// run-plants.mjs --root <tree> --adapter <adapter.mjs> --set <set.mjs> [--out <json>] [--only id,id] [--group]
// critique-B pass 8. Written and hashed BEFORE reading pass-8/B-kit or pass-8/B-proto.md.
// The pass-7 runner (pass-7/critique-B/battery/run-plants.mjs) with two additions, nothing removed:
//   1. `expect: "-<clause>"` (ABSENCE control): CLEAN when <clause> gains no line at all, FALSE+ when it gains any line
//      (named or not). Used for the keyframes-free controls of the peer class: B18 must stay silent.
//   2. `anyLine: true` on a plant expecting a clause: any line that clause GAINS counts as naming the plant (a class
//      clause may name the entry or the file rather than the planted symbol). The base must hold that clause at 0 or
//      the gained-set diff still isolates the plant.
// Each plant is written, judged through the adapter, diffed against the unplanted judgement, and undone byte for byte.
// adapter contract: export async function judge(root) -> { [clause]: string[] }  (throws on a crashed gate)
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative, basename } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const root = resolve(arg("--root"));
const { judge } = await import(pathToFileURL(resolve(arg("--adapter"))));
const { plants } = await import(pathToFileURL(resolve(arg("--set"))));
const only = arg("--only") ? new Set(arg("--only").split(",")) : null;
const GROUP = process.argv.includes("--group");

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
    root, all, find, findAll: (pred) => all.filter(pred),
    read: (p) => readFileSync(join(root, p), "utf8"), exists: (p) => existsSync(join(root, p)),
    ls: (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => statSync(join(root, d, f)).isFile()) : []),
    dirs: (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => statSync(join(root, d, f)).isDirectory()) : []),
    rel: (from, to) => { const r = relative(dirname(from), to); return r.startsWith(".") ? r : `./${r}`; },
};
const ALLP = plants(ctx);
const need = new Set(only ? ALLP.filter((p) => only.has(p.id) && p.contrast).map((p) => p.contrast) : []);
const P = ALLP.filter((p) => !only || only.has(p.id) || need.has(p.id));
const sets = (v) => Object.fromEntries(Object.entries(v).map(([k, l]) => [k, new Set(l)]));
const base = await judge(root); const bs = sets(base);
console.log(`BASE ${JSON.stringify(Object.fromEntries(Object.entries(base).map(([k, l]) => [k, l.length])))}`);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const marksOf = (p) => p.marks ?? [p.mark];
const names = (line, p) => marksOf(p).some((m) => new RegExp(`(^|[^A-Za-z0-9_])${esc(m)}(?![A-Za-z0-9_])`).test(line));

function plant(list) {
    const saved = {}; const made = [];
    for (const p of list) for (const [f, text] of Object.entries(p.files)) {
        const abs = join(root, f);
        if (!(f in saved)) saved[f] = existsSync(abs) ? readFileSync(abs) : null;
        let d = dirname(abs); const chain = [];
        while (!existsSync(d)) { chain.unshift(d); d = dirname(d); }
        for (const c of chain) { mkdirSync(c); made.unshift(c); }
        writeFileSync(abs, text);
    }
    return () => {
        for (const [f, buf] of Object.entries(saved)) { const abs = join(root, f); if (buf === null) rmSync(abs, { force: true }); else writeFileSync(abs, buf); }
        for (const d of made) rmSync(d, { recursive: true, force: true });
    };
}
const namedBy = {};
function verdict(p, r, err) {
    const gained = Object.fromEntries(Object.entries(r).map(([k, l]) => [k, l.filter((x) => !(bs[k] ?? new Set()).has(x))]).filter(([, l]) => l.length));
    const naming = Object.fromEntries(Object.entries(gained).map(([k, l]) => [k, (p.anyLine && k === p.expect) ? l : l.filter((x) => names(x, p))]).filter(([, l]) => l.length));
    namedBy[p.id] = new Set(Object.keys(naming));
    let v;
    if (typeof p.expect === "string" && p.expect.startsWith("-")) {
        const c = p.expect.slice(1);
        v = err ? "ERROR" : (gained[c]?.length ? "FALSE+" : "CLEAN");
    } else if (p.expect === null) v = err ? "ERROR" : Object.keys(naming).length ? "FALSE+" : "CLEAN";
    else if (err) v = "THROWS";
    else if (p.contrast) {
        const ctl = namedBy[p.contrast];
        if (!ctl) v = "NO-CONTROL";
        else { const extra = Object.keys(naming).filter((k) => !ctl.has(k)); v = extra.length ? "CAUGHT" : Object.keys(naming).length ? "SAME-AS-CTL" : (Object.keys(gained).length ? "UNNAMED" : "MISSED"); }
    } else if (p.expect === "*?") v = Object.keys(naming).length ? "RECORDED" : "MISSED-RECORD";
    else if (p.expect === "*" ? Object.keys(naming).length : naming[p.expect]) v = "CAUGHT";
    else if (Object.keys(naming).length) v = "OTHER";
    else v = Object.keys(gained).length ? "UNNAMED" : "MISSED";
    return { v, naming, gained };
}
const rows = [];
const report = (p, r, err, grouped) => {
    const { v, naming, gained } = verdict(p, r, err);
    const clauses = Object.keys(naming).join(",");
    const g = Object.fromEntries(Object.entries(grouped ? naming : gained).map(([k, l]) => [k, l.length]));
    console.log(`${v.padEnd(7)} ${p.id} [${p.item}] ${p.what} :: named=${clauses || "-"}${p.contrast ? ` ctl(${p.contrast})=${[...(namedBy[p.contrast] ?? [])].join(",") || "-"}` : ""} ${grouped ? "namedLines" : "gained"}=${JSON.stringify(g)}${err ? ` :: ${err}` : ""}`);
    if (v !== "CLEAN") for (const [k, l] of Object.entries(grouped ? naming : (Object.keys(naming).length ? naming : gained))) for (const x of l.slice(0, 2)) console.log(`        ${k}: ${x.slice(0, 240)}`);
    rows.push({ id: p.id, item: p.item, expect: p.expect, contrast: p.contrast ?? null, verdict: v, named: clauses, lines: Object.fromEntries(Object.entries(naming).map(([k, l]) => [k, l.slice(0, 3)])), gainedCount: g, err, grouped });
};
const live = P.filter((p) => !p.skip);
for (const p of P.filter((p) => p.skip)) { console.log(`SKIP    ${p.id} [${p.item}] ${p.skip}`); rows.push({ id: p.id, item: p.item, verdict: "SKIP", why: p.skip }); }
const isNew = (p) => Object.keys(p.files).every((f) => !existsSync(join(root, f)));
const groupable = GROUP ? live.filter((p) => isNew(p) && p.group !== false && !p.contrast && !(typeof p.expect === "string" && p.expect.startsWith("-")) && !p.anyLine) : [];
const seen = new Map(); for (const p of groupable) for (const f of Object.keys(p.files)) seen.set(f, (seen.get(f) ?? 0) + 1);
const G = groupable.filter((p) => Object.keys(p.files).every((f) => seen.get(f) === 1));
const ctlIds = new Set(live.filter((p) => p.contrast).map((p) => p.contrast));
const solo = live.filter((p) => !G.includes(p)).sort((a, b) => (ctlIds.has(b.id) ? 1 : 0) - (ctlIds.has(a.id) ? 1 : 0));
if (G.length) {
    const undo = plant(G); let r = {}, err = null;
    try { r = await judge(root); } catch (e) { err = String(e?.message ?? e).split("\n")[0]; }
    undo();
    console.log(`GROUP of ${G.length} co-planted plants judged once`);
    for (const p of G) report(p, r, err, true);
}
for (const p of solo) {
    const undo = plant([p]); let r = {}, err = null;
    try { r = await judge(root); } catch (e) { err = String(e?.message ?? e).split("\n")[0]; }
    undo();
    report(p, r, err, false);
}
const after = await judge(root);
const drift = Object.keys({ ...base, ...after }).filter((k) => (base[k] ?? []).length !== (after[k] ?? []).length);
console.log(drift.length ? `RESTORE-DRIFT ${drift.join(",")}` : "RESTORED base judgement unchanged");
const tally = {}; for (const r of rows) tally[r.verdict] = (tally[r.verdict] ?? 0) + 1;
console.log(`TALLY ${JSON.stringify(tally)}`);
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify({ base: Object.fromEntries(Object.entries(base).map(([k, l]) => [k, l.length])), rows }, null, 1));
