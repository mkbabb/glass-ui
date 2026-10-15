#!/usr/bin/env node
// peer-closure.mjs — PROBE (pass 7, §P6-8.4; pass 8, P7-R1): the dist arm of the peer classes,
// beside the two source arms the gate judges. Since P7-R1 the gate's B18 owns the class: it
// judges the names and files arms under `npm test`. This probe reads those two arms with the
// gate's own reader (../gate/peer.mjs, the file that lands as scripts/structure/seal/peer.mjs),
// so the source arms are stated once, and adds the one arm the gate cannot read:
//   dist   the built entry file's import closure in dist/ (the shipped artifact, read after
//          `vite build`): the externals a consumer's import of the entry loads.
// A missing build is no verdict: the dist arm throws (exit 2), never reports `missing` and
// passes. With --overlay (plants) the source arms read the overlay; the dist arm still reads
// the build, which an overlay does not change, and still requires it.
// The declared classes are the root barrel's table (gate/peer.mjs: src/README.md on the
// migrated tree; --table src/index.ts on the floor base, where the table still sits in the
// barrel). With --base (this probe's report on the floor base), a break the base already
// holds in the same arm is the base's, not the chain's: the verdict judges what the chain
// introduces. Each name the chain publishes (the S64 `added` table) keeps its entry's class;
// --floor-base (the base report) judges no published name, since the base publishes none of them.
//
//   node tools/peer-closure.mjs --root <built tree> [--floor-base --table src/index.ts] [--base base.json]
//                               [--overlay plants.json] [--json out.json]
// Exit: 0 GREEN, 1 RED, 2 no verdict (a throw: a missing build, a table it cannot read).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg, loadFloor } from "../lib/floor.mjs";
import { PEER_TABLE, peerArms } from "../gate/peer.mjs";

const pkgOf = (spec) => (spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);

async function main() {
    const args = process.argv.slice(2);
    const root = resolve(arg(args, "--root"));
    const table = arg(args, "--table") ?? PEER_TABLE;
    const base = arg(args, "--base") ? JSON.parse(readFileSync(arg(args, "--base"), "utf8")) : null;
    const overlay = arg(args, "--overlay") ? JSON.parse(readFileSync(arg(args, "--overlay"), "utf8")) : {};
    const F = await loadFloor(root);
    const g = F.buildGraph(root, { overlay });
    const O = F.makeOrigins(g);
    const P = peerArms(g, O, table);
    const HEAVY = P.declared.heavy;
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
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const entries = {};
    for (const [key, e] of Object.entries(P.entries)) {
        const rel = pkg.exports?.[key]?.import;
        if (!rel) throw new Error(`peer-closure: package.json exports no import condition for ${key}; the dist arm has no file to read`);
        const distFile = join(root, rel);
        if (!existsSync(distFile)) throw new Error(`peer-closure: the build is missing (${rel}); the dist arm reads the shipped file, so run \`vite build\` first`);
        const dist = distClosure(distFile);
        const broken = { names: Object.keys(e.names), dist: dist.peers.filter((p) => e.free.includes(p)), files: Object.keys(e.files) };
        const atBase = base?.entries?.[key]?.broken ?? { names: [], dist: [], files: [] };
        const introduced = Object.fromEntries(Object.entries(broken).map(([arm, ps]) => [arm, ps.filter((p) => !(atBase[arm] ?? []).includes(p))]));
        entries[key] = { source: e.source, declared: `free of ${e.free.join(", ")}`, runtimeNames: e.runtimeNames, names: { origins: e.origins, peers: e.names }, dist, files: { files: e.closureFiles, peers: e.files }, broken, introduced, atBase: base ? atBase : null };
    }
    const kept = (k) => Object.values(entries[k].introduced).every((ps) => !ps.length);
    // each published name's own module keeps its entry's declared class
    const publish = await import(pathToFileURL(join(import.meta.dirname, "../authored/p6-publish.mjs")).href);
    const srcOf = (entry) => g.record.js.find(([name]) => (name === "index" ? "." : `./${name}`) === entry)?.[1];
    const names = args.includes("--floor-base") ? [] : Object.entries(publish.added).map(([entry, { runtime, types }]) => {
        const free = P.declared.free[entry] ?? [];
        const src = srcOf(entry);
        if (!src) throw new Error(`peer-closure: the S64 table publishes on ${entry}, which the entry record does not hold`);
        const own = {};
        for (const n of new Set([...runtime, ...types])) {
            const ps = [...new Set((O.exportsOf(src).get(n) ?? []).flatMap((o) => Object.keys(P.closure([o.file]).peers)))].filter((p) => free.includes(p));
            if (ps.length) own[n] = ps;
        }
        const entryKept = entries[entry] ? kept(entry) : true;
        return { entry, names: [...new Set([...runtime, ...types])], declared: entries[entry]?.declared ?? "may bear a peer", ownModuleBreaks: own, entryKept, kept: !Object.keys(own).length && entryKept };
    });
    const broken = Object.keys(entries).filter((k) => !kept(k)).map((k) => `${k}: introduced ${Object.entries(entries[k].introduced).filter(([, ps]) => ps.length).map(([arm, ps]) => `${arm} ${ps.join(", ")}`).join("; ")}`);
    const report = { root, table, floorBase: args.includes("--floor-base"), base: base ? arg(args, "--base") : null, overlay: Object.keys(overlay), declared: P.declared, entries, published: names, broken, verdict: broken.length || names.some((n) => !n.kept) ? "RED" : "GREEN" };
    if (arg(args, "--json")) writeFileSync(arg(args, "--json"), `${JSON.stringify(report, null, 1)}\n`);
    for (const [k, v] of Object.entries(entries)) {
        const pre = v.atBase && Object.values(v.atBase).some((ps) => ps.length) ? `; at the floor base: ${Object.entries(v.atBase).map(([a, ps]) => `${a} ${ps.join("+") || "kept"}`).join(", ")}` : "";
        console.log(`${kept(k) ? "kept  " : "BROKEN"} ${k.padEnd(16)} ${v.declared.padEnd(44)} names ${v.runtimeNames} → peers ${Object.keys(v.names.peers).join(", ") || "none"}; dist ${v.dist.files} files → peers ${v.dist.peers.join(", ") || "none"}; files ${v.files.files} → peers ${Object.keys(v.files.peers).join(", ") || "none"}${pre}`);
    }
    for (const n of names) console.log(`  ${n.kept ? "ok" : "NO"} ${n.entry}: ${n.names.join(", ")}${Object.keys(n.ownModuleBreaks).length ? ` (own module breaks: ${JSON.stringify(n.ownModuleBreaks)})` : ""}`);
    for (const b of broken) console.log(`BROKEN ${b}`);
    console.log(`peer-closure: ${report.verdict}`);
    process.exitCode = report.verdict === "GREEN" ? 0 : 1;
}

main().catch((e) => { console.error(`peer-closure: no verdict: ${e?.stack ?? e}`); process.exit(2); });
