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
// introduces. (pass 10, P9-G1) --base must be this probe's own floor-base report: an object whose
// `floorBase` is true and whose `entries` holds every entry the tree declares free, each with its
// three `broken` arms as arrays. Anything else (`{}`, `[]`, another report kind, this probe's own
// non-floor report) is a throw, never "no breaks at the base". Each name the chain publishes (the S64 `added` table) keeps its entry's class;
// --floor-base (the base report) judges no published name, since the base publishes none of them.
//
//   node tools/peer-closure.mjs --root <built tree> [--floor-base --table src/index.ts] [--base base.json]
//                               [--overlay plants.json] [--json out.json]
// Exit (P6-R3; pass 9, P8-R2, LAW §14): 0 GREEN, 1 RED, 2 no verdict, on any throw: a missing
// build, a table it cannot read, no --root, and a degenerate build (an entry file, or a module
// it imports, that is empty: a build never emits one, and an empty file reads no peer). The
// first statement installs the seal.mjs guard, and the floor and B18's reader load after it, by
// a dynamic import the guard covers, so a throw while they evaluate is 2 as well.
// (pass 11, P10-G2; LAW §14) The command line is read by lib/argv.mjs: --root, --table, --base,
// --overlay and --json each once, with a value; --floor-base a switch; nothing else. A value-taking
// option present with no value or followed by another option is a throw (pass 10 read a value-less
// --base as no --base, and a value-less --table as the default table). Absent, each has one stated
// reading: no --root is a throw; no --table reads PEER_TABLE (the one table, P8-R3); no --base reads
// every break as the chain's; no --overlay plants nothing; no --json writes no record. --floor-base
// writes the base report on the floor base itself: its tree must be at the chain's S1 digest, and a
// --base beside it is a throw (the base is not judged against a base).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => {
    console.error(`peer-closure: no verdict: ${e?.stack ?? e}`);
    process.exit(2);
});

const { loadFloor } = await import("../lib/floor.mjs");
const { PEER_TABLE, peerArms } = await import("../gate/peer.mjs");
const { readArgs } = await import("../lib/argv.mjs");
const { codeDigest } = await import("../lib/digest.mjs");
const { readSeq } = await import("../lib/sequence.mjs");

const pkgOf = (spec) => (spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
/** --base: this probe's own floor-base report, or a throw (P9-G1). Its entries are checked against
 *  the tree's declared entries once the declarations are read (baseArms). */
function readBase(f) {
    const b = JSON.parse(readFileSync(f, "utf8"));
    if (!isRecord(b)) throw new Error(`peer-closure: --base ${f} is ${Array.isArray(b) ? "an array" : typeof b}, not this probe's report`);
    if (b.floorBase !== true) throw new Error(`peer-closure: --base ${f} is not this probe's floor-base report (floorBase ${JSON.stringify(b.floorBase)}); a base of another kind is no input`);
    if (!isRecord(b.entries) || !Object.keys(b.entries).length) throw new Error(`peer-closure: --base ${f} holds no entries; a base of no entry is no input`);
    return b;
}
/** the base's three broken arms for one declared entry, or a throw: a base that does not name the
 *  entry, or names it without all three arms, says nothing about it, and reading that as "no
 *  break at the base" would pass any break the chain introduces. */
function baseArms(base, key, f) {
    const e = base.entries[key];
    if (!isRecord(e) || !isRecord(e.broken)) throw new Error(`peer-closure: --base ${f} holds no broken arms for ${key}, which the tree declares free`);
    for (const arm of ["names", "dist", "files"]) if (!Array.isArray(e.broken[arm])) throw new Error(`peer-closure: --base ${f}: ${key}.broken.${arm} is not a list`);
    return e.broken;
}
/** --overlay: { path: text } with at least one file; an overlay of nothing plants nothing. */
function readOverlay(f) {
    const o = JSON.parse(readFileSync(f, "utf8"));
    if (!isRecord(o) || !Object.keys(o).length) throw new Error(`peer-closure: --overlay ${f} is not a { path: text } map of at least one file`);
    for (const [p, t] of Object.entries(o)) if (typeof t !== "string") throw new Error(`peer-closure: --overlay ${f}: ${p} is not text`);
    return o;
}

async function main() {
    const A = readArgs("peer-closure", process.argv.slice(2), { values: ["--root", "--table", "--base", "--overlay", "--json"], switches: ["--floor-base"] });
    if (A.value("--root") === null) throw new Error("peer-closure: --root is required");
    const root = resolve(A.value("--root"));
    const floorBase = A.on("--floor-base");
    if (floorBase && A.value("--base") !== null) throw new Error("peer-closure: --floor-base writes the base report; a --base beside it is no input");
    if (floorBase) {
        const s1 = readSeq().steps[0], at = codeDigest(root).digest;
        if (s1.kind !== "floor-rows") throw new Error(`peer-closure: the chain's first step is ${s1.id} (${s1.kind}), not the floor rows`);
        if (at !== s1.digest) throw new Error(`peer-closure: --floor-base names ${root}, at code digest ${at.slice(0, 16)}…, not the floor base (S1 ${s1.digest.slice(0, 16)}…)`);
    }
    // absent, each option has the one reading the header states
    const table = A.value("--table") !== null ? A.value("--table") : PEER_TABLE;
    const baseFile = A.value("--base");
    const base = baseFile !== null ? readBase(baseFile) : null;
    const overlay = A.value("--overlay") !== null ? readOverlay(A.value("--overlay")) : {};
    const jsonOut = A.value("--json");
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
            const text = readFileSync(f, "utf8");
            if (!text.trim()) throw new Error(`peer-closure: ${f} is empty; the dist arm reads no closure from an empty build file`);
            for (const m of text.matchAll(/(?:^|[;\n}])\s*(?:import|export)\s*(?:[\w*{}\s,$]*?\sfrom\s*)?["']([^"']+)["']/g)) {
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
        // no --base: every break is the chain's (the strictest reading); a --base names this entry's arms or throws
        const atBase = base ? baseArms(base, key, baseFile) : { names: [], dist: [], files: [] };
        const introduced = Object.fromEntries(Object.entries(broken).map(([arm, ps]) => [arm, ps.filter((p) => !atBase[arm].includes(p))]));
        entries[key] = { source: e.source, declared: `free of ${e.free.join(", ")}`, runtimeNames: e.runtimeNames, names: { origins: e.origins, peers: e.names }, dist, files: { files: e.closureFiles, peers: e.files }, broken, introduced, atBase: base ? atBase : null };
    }
    const kept = (k) => Object.values(entries[k].introduced).every((ps) => !ps.length);
    // each published name's own module keeps its entry's declared class
    const publish = await import(pathToFileURL(join(import.meta.dirname, "../authored/p6-publish.mjs")).href);
    const srcOf = (entry) => g.record.js.find(([name]) => (name === "index" ? "." : `./${name}`) === entry)?.[1];
    const names = floorBase ? [] : Object.entries(publish.added).map(([entry, { runtime, types }]) => {
        // an entry the table does not declare free may bear any peer: its class is empty by statement
        const free = entry in P.declared.free ? P.declared.free[entry] : [];
        const src = srcOf(entry);
        if (!src) throw new Error(`peer-closure: the S64 table publishes on ${entry}, which the entry record does not hold`);
        const own = {};
        for (const n of new Set([...runtime, ...types])) {
            const origins = O.exportsOf(src).get(n);
            if (!origins?.length) throw new Error(`peer-closure: the S64 table publishes ${n} on ${entry}, which ${src} does not export`);
            const ps = [...new Set(origins.flatMap((o) => Object.keys(P.closure([o.file]).peers)))].filter((p) => free.includes(p));
            if (ps.length) own[n] = ps;
        }
        const entryKept = entries[entry] ? kept(entry) : true;
        return { entry, names: [...new Set([...runtime, ...types])], declared: entries[entry]?.declared ?? "may bear a peer", ownModuleBreaks: own, entryKept, kept: !Object.keys(own).length && entryKept };
    });
    const broken = Object.keys(entries).filter((k) => !kept(k)).map((k) => `${k}: introduced ${Object.entries(entries[k].introduced).filter(([, ps]) => ps.length).map(([arm, ps]) => `${arm} ${ps.join(", ")}`).join("; ")}`);
    const report = { root, table, floorBase, base: baseFile, overlay: Object.keys(overlay), declared: P.declared, entries, published: names, broken, verdict: broken.length || names.some((n) => !n.kept) ? "RED" : "GREEN" };
    if (jsonOut !== null) writeFileSync(jsonOut, `${JSON.stringify(report, null, 1)}\n`);
    for (const [k, v] of Object.entries(entries)) {
        const pre = v.atBase && Object.values(v.atBase).some((ps) => ps.length) ? `; at the floor base: ${Object.entries(v.atBase).map(([a, ps]) => `${a} ${ps.join("+") || "kept"}`).join(", ")}` : "";
        console.log(`${kept(k) ? "kept  " : "BROKEN"} ${k.padEnd(16)} ${v.declared.padEnd(44)} names ${v.runtimeNames} → peers ${Object.keys(v.names.peers).join(", ") || "none"}; dist ${v.dist.files} files → peers ${v.dist.peers.join(", ") || "none"}; files ${v.files.files} → peers ${Object.keys(v.files.peers).join(", ") || "none"}${pre}`);
    }
    for (const n of names) console.log(`  ${n.kept ? "ok" : "NO"} ${n.entry}: ${n.names.join(", ")}${Object.keys(n.ownModuleBreaks).length ? ` (own module breaks: ${JSON.stringify(n.ownModuleBreaks)})` : ""}`);
    for (const b of broken) console.log(`BROKEN ${b}`);
    console.log(`peer-closure: ${report.verdict}`);
    process.exitCode = report.verdict === "GREEN" ? 0 : 1;
}

await main();
