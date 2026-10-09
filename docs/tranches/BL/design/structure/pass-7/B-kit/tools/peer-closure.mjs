#!/usr/bin/env node
// peer-closure.mjs — PROBE (pass 7, §P6-8.4): every name the chain publishes sits on an entry
// whose declared peer class its static closure keeps. Three closures per entry, each over
// static value-level edges (import, side-effect import, re-export, SFC script src; `import
// type`, type-only re-exports and dynamic `import()` load nothing at module evaluation):
//   names  for every runtime name the entry publishes (the tree's surface pin,
//          scripts/structure/records/surface-pin.json), the closure of the file that declares
//          it (the floor's symbol origins): what evaluating that name's own module loads. A
//          published name whose module imports a heavy peer reaches it here, however the
//          entry's barrels are bundled. JUDGED.
//   dist   the built entry file's import closure in dist/ (the shipped artifact, read after
//          `vite build`): the externals a consumer's import of the entry loads. JUDGED.
//   files  the entry source's closure through its doors, every name of every door it reads
//          (an unbundled ESM evaluation of the source barrels: a door that mixes classes
//          drags its heavy names into every reader). JUDGED.
// The declared classes are the root barrel's own table (src/index.ts, "Heavy-peer exclusions"):
// the root is vueuse-free and keyframes.js-free, and ./motion-core is keyframes-free and
// vueuse-free ("(none — keyframes-FREE + vueuse-FREE)"). Every other entry may bear a peer.
// The published names are the S64 `added` table (authored/p6-publish.mjs); each one's own
// module closure must keep its entry's declared class.
// With --base (this probe's report on the floor base), a break the base already holds in the
// same arm is reported as the base's, not the chain's: the verdict judges what the chain
// introduces. The root's declared class is broken on the floor base in all three arms (HEAD's
// own state, outside D1); ./motion-core's is kept there in all three.
//
//   node tools/peer-closure.mjs --root <built tree> [--base base.json] [--overlay plants.json] [--json out.json]
// With --overlay (plants), the dist arm is skipped: an overlay changes source, not the build.
// Exit: 0 GREEN, 1 RED, 2 no verdict (a throw).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg, loadFloor } from "../lib/floor.mjs";

const HEAVY = ["@mkbabb/keyframes.js", "@vueuse/core"];
const DECLARED = {
    ".": { free: HEAVY, source: "src/index.ts: the root barrel is vueuse-free AND keyframes.js-free" },
    "./motion-core": { free: HEAVY, source: "src/index.ts: @mkbabb/glass-ui/motion-core (none — keyframes-FREE + vueuse-FREE)" },
};
const STATIC = new Set(["import", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "sfc-script-src"]);
const pkgOf = (spec) => (spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);

async function main() {
    const args = process.argv.slice(2);
    const root = resolve(arg(args, "--root"));
    const base = arg(args, "--base") ? JSON.parse(readFileSync(arg(args, "--base"), "utf8")) : null;
    const overlay = arg(args, "--overlay") ? JSON.parse(readFileSync(arg(args, "--overlay"), "utf8")) : {};
    const F = await loadFloor(root);
    const g = F.buildGraph(root, { overlay });
    const O = F.makeOrigins(g);
    const out = new Map();
    for (const e of g.edges) {
        if (!STATIC.has(e.kind) || e.typeOnly) continue;
        if (!out.has(e.from)) out.set(e.from, []);
        out.get(e.from).push(e);
    }
    const closure = (starts) => {
        const seen = new Set(starts), peers = new Map(), stack = [...starts];
        while (stack.length) {
            const f = stack.pop();
            for (const e of out.get(f) ?? []) {
                if (e.via === "package" && HEAVY.includes(e.external)) { if (!peers.has(e.external)) peers.set(e.external, `${e.from}:${e.line}`); continue; }
                if (e.to && !e.dir && !seen.has(e.to)) { seen.add(e.to); stack.push(e.to); }
            }
        }
        return { files: seen.size, peers: Object.fromEntries(peers) };
    };
    // the shipped closure: the built entry file and every relative module it imports
    const distClosure = (file) => {
        const seen = new Set(), ext = new Set(), stack = [file];
        while (stack.length) {
            const f = stack.pop();
            if (seen.has(f)) continue;
            seen.add(f);
            for (const m of readFileSync(f, "utf8").matchAll(/(?:^|[;\n}])\s*(?:import|export)\s*(?:[\w*{}\s,$]*?\sfrom\s*)?["']([^"']+)["']/g)) {
                if (m[1].startsWith(".")) stack.push(resolve(dirname(f), m[1]));
                else ext.add(pkgOf(m[1]));
            }
        }
        return { files: seen.size, peers: HEAVY.filter((p) => ext.has(p)) };
    };
    const pin = JSON.parse(readFileSync(join(root, "scripts/structure/records/surface-pin.json"), "utf8")).entries;
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const publish = await import(pathToFileURL(join(import.meta.dirname, "../authored/p6-publish.mjs")).href);
    const published = Object.entries(publish.added).map(([entry, { runtime, types }]) => ({ entry, names: [...new Set([...runtime, ...types])] }));
    const entries = {};
    // the record names an entry by its build name (`index` is the root, `dock` is `./dock`)
    for (const [name, src] of g.record.js) {
        const key = name === "index" ? "." : `./${name}`;
        const ex = O.exportsOf(src);
        // the entry's value names: the pin's runtime list, plus any name the source exports that
        // the pin does not list at all (a name an overlay or a later step adds counts as a value)
        const pinned = new Set([...(pin[key]?.runtime ?? []), ...(pin[key]?.types ?? [])]);
        const runtime = [...ex.keys()].filter((n) => (pin[key]?.runtime ?? []).includes(n) || !pinned.has(n));
        const origins = new Map(); // origin file → the runtime names it declares
        for (const n of runtime) for (const o of ex.get(n) ?? []) { if (!origins.has(o.file)) origins.set(o.file, []); origins.get(o.file).push(n); }
        const byName = {};
        for (const [file, names] of origins) { const c = closure([file]); for (const p of Object.keys(c.peers)) for (const n of names) (byName[p] ??= []).push(`${n} (${file}; first at ${c.peers[p]})`); }
        const distFile = pkg.exports?.[key]?.import ? join(root, pkg.exports[key].import) : null;
        const dist = Object.keys(overlay).length ? { skipped: "overlay" } : distFile && existsSync(distFile) ? distClosure(distFile) : { missing: distFile };
        const d = DECLARED[key];
        const files = closure([src]);
        const broken = {
            names: d ? d.free.filter((p) => p in byName) : [],
            dist: d && dist.peers ? d.free.filter((p) => dist.peers.includes(p)) : [],
            files: d ? d.free.filter((p) => p in files.peers) : [],
        };
        // a break the floor base holds in the same arm is the base's (HEAD's), not the chain's
        const atBase = base?.entries?.[key]?.broken ?? { names: [], dist: [], files: [] };
        const introduced = Object.fromEntries(Object.entries(broken).map(([arm, ps]) => [arm, ps.filter((p) => !(atBase[arm] ?? []).includes(p) || (arm === "dist" && Object.keys(overlay).length))]));
        entries[key] = { source: src, declared: d ? `free of ${d.free.join(", ")}` : "may bear a peer", runtimeNames: runtime.length, names: { origins: origins.size, peers: byName }, dist, files: { files: files.files, peers: files.peers }, broken, introduced, atBase: base ? atBase : null };
    }
    const kept = (k) => entries[k] && Object.values(entries[k].introduced).every((ps) => !ps.length);
    // each published name's own module keeps its entry's declared class
    const ownPeers = (entry, n) => {
        const src = g.record.js.find(([name]) => (name === "index" ? "." : `./${name}`) === entry)?.[1];
        const os = src ? O.exportsOf(src).get(n) ?? [] : [];
        return [...new Set(os.flatMap((o) => Object.keys(closure([o.file]).peers)))];
    };
    const names = published.map(({ entry, names }) => {
        const free = DECLARED[entry]?.free ?? [];
        const own = Object.fromEntries(names.map((n) => [n, ownPeers(entry, n).filter((p) => free.includes(p))]));
        return { entry, names, declared: entries[entry]?.declared ?? "NO SUCH ENTRY", ownModuleBreaks: Object.fromEntries(Object.entries(own).filter(([, ps]) => ps.length)), entryKept: kept(entry), kept: !!entries[entry] && Object.values(own).every((ps) => !ps.length) && kept(entry) };
    });
    const broken = Object.entries(entries).filter(([k]) => !kept(k)).map(([k, v]) => `${k}: introduced ${Object.entries(v.introduced).filter(([, ps]) => ps.length).map(([arm, ps]) => `${arm} ${ps.join(", ")}${arm === "names" ? ` via ${ps.map((p) => v.names.peers[p].slice(0, 3).join("; ")).join(" | ")}` : ""}`).join("; ")}`);
    const report = { root, base: base ? arg(args, "--base") : null, overlay: Object.keys(overlay), declared: DECLARED, entries, published: names, broken, verdict: broken.length || names.some((n) => !n.kept) ? "RED" : "GREEN" };
    if (arg(args, "--json")) writeFileSync(arg(args, "--json"), `${JSON.stringify(report, null, 1)}\n`);
    for (const [k, v] of Object.entries(entries)) {
        if (!DECLARED[k] && !published.some((p) => p.entry === k)) continue;
        const dist = v.dist.peers ? `dist ${v.dist.files} files, peers ${v.dist.peers.join(", ") || "none"}` : `dist ${JSON.stringify(v.dist)}`;
        const pre = v.atBase && Object.values(v.atBase).some((ps) => ps.length) ? `; at the floor base: ${Object.entries(v.atBase).map(([a, ps]) => `${a} ${ps.join("+") || "kept"}`).join(", ")}` : "";
        console.log(`${kept(k) ? "kept  " : "BROKEN"} ${k.padEnd(16)} ${v.declared.padEnd(44)} names ${v.runtimeNames} → peers ${Object.keys(v.names.peers).join(", ") || "none"}; ${dist}; files ${v.files.files} → peers ${Object.keys(v.files.peers).join(", ") || "none"}${pre}`);
    }
    for (const n of names) console.log(`  ${n.kept ? "ok" : "NO"} ${n.entry}: ${n.names.join(", ")}${Object.keys(n.ownModuleBreaks).length ? ` (own module breaks: ${JSON.stringify(n.ownModuleBreaks)})` : ""}`);
    for (const b of broken) console.log(`BROKEN ${b}`);
    console.log(`peer-closure: ${report.verdict}`);
    process.exitCode = report.verdict === "GREEN" ? 0 : 1;
}

main().catch((e) => { console.error(`peer-closure: no verdict: ${e?.stack ?? e}`); process.exit(2); });
