// zones.mjs — the D1-G law, part 4 (LAW.md L5, L6, L3.6): tests, scripts and the zones outside
// the library, and CSS aggregator doors.
import { posix } from "node:path";
import { dirUnits, isSlot } from "../lib/placement.mjs";
import { ZONES, zoneOf } from "../lib/tree.mjs";
import { idoms } from "./dominance.mjs";
import { NAMES, TOP, componentUnitOf, isTest, rootName, within } from "./units.mjs";

const { dirname, basename } = posix;
const TEST_KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "dynamic", "vi-mock", "reexport", "reexport-star", "path-literal", "path-helper", "new-url"]);
/** L5.1 · a test's subjects: the src files it and its private test-zone helpers (files of a test
 *  zone that only this test reaches) load by module edges or read by a path (a literal, a read
 *  helper, `new URL`): a test that reads another unit's sheet reads that unit. */
export function testSubjects(ctx, t) {
    ctx.byFrom ??= (() => { const m = new Map(); for (const e of ctx.g.edges) { if (!m.has(e.from)) m.set(e.from, []); m.get(e.from).push(e); } return m; })();
    ctx.testLoaders ??= (() => { const m = new Map(); for (const e of ctx.g.edges) if (e.to && !e.dir && TEST_KINDS.has(e.kind) && ["tests", "tests-visual"].includes(zoneOf(e.to))) { if (!m.has(e.to)) m.set(e.to, new Set()); m.get(e.to).add(e.from); } return m; })();
    const out = new Set();
    const seen = new Set([t]);
    const stack = [t];
    while (stack.length) {
        const f = stack.pop();
        for (const e of ctx.byFrom.get(f) ?? []) {
            if (!e.to || e.dir || !TEST_KINDS.has(e.kind)) continue;
            if (zoneOf(e.to) === "src") out.add(e.to);
            else if (["tests", "tests-visual"].includes(zoneOf(e.to)) && !seen.has(e.to) && [...(ctx.testLoaders.get(e.to) ?? [])].every((r) => r === f || seen.has(r))) { seen.add(e.to); stack.push(e.to); }
        }
    }
    return out;
}
/** L5.2 · a test's home: the nearest common R-2 unit of its subjects; inside a component unit,
 *  the dir of the nearest root that dominates every subject (LAW L2). A zone root or container
 *  (src, src/components, src/composables, src/styles) is no home: the test stays in the harness.
 *  The file name is kept, except where names.json `testNames` authors one (two tests of one
 *  name meeting in one slot). */
export function testHome(ctx, t, layoutOf) {
    const S = [...testSubjects(ctx, t)];
    if (!S.length) return null;
    // L5.3 · a test that scans a dir (a scan edge: a walk, a template path, a computed read)
    // reads the tree, not a subject: it is a whole-library suite and stays in the harness
    if ((ctx.byFrom.get(t) ?? []).some((e) => e.via === "scan")) return null;
    const units = dirUnits();
    const us = S.map((f) => units.unitOf(f));
    const parts = us.map((d) => d.split("/"));
    const out = [];
    for (let i = 0; ; i++) { const seg = parts[0][i]; if (seg === undefined || parts.some((x) => x[i] !== seg)) break; out.push(seg); }
    let home = out.join("/") || ".";
    if (["src", "src/components", "src/composables", "src/styles", "src/fonts", "."].includes(home)) return null;
    const U = componentUnitOf(`${home}/x`);
    const Lx = U ? layoutOf.get(U) : null;
    if (!Lx) return home;
    const chain = (f) => { const c = []; let a = Lx.F.includes(f) ? f : TOP; for (;;) { c.push(a); if (a === TOP) break; a = Lx.idom.get(a); } return c; };
    const chains = S.filter((f) => within(f, U)).map(chain);
    if (!chains.length) return home;
    let lca = chains[0].find((a) => chains.every((c) => c.includes(a)));
    while (!Lx.isRoot(lca)) lca = Lx.idom.get(lca);
    const dir = lca === TOP ? U : Lx.heads(lca) ? Lx.home(lca) : Lx.home(Lx.owner(lca));
    return within(dir, home) ? dir : home;
}

// ------------------------------------------------------------------ L6 · scripts (§4.8)
const LOAD_KINDS = new Set(["import", "import-type", "import-side-effect", "dynamic", "require", "reexport", "reexport-star", "reexport-ns"]);
/** L6 · the scripts zone. A bin is a scripts file entered from outside the zone (a package.json
 *  or CI command token, a shell token, a root-config import, any edge from another zone) or
 *  loaded by no scripts file. Bins are roots; ownership is immediate dominance over the zone's
 *  load edges from ⊤ through the bins. A file one bin B alone owns lives inside B's module dir:
 *  dirname(B) when B sits in a module below `scripts/`, else `scripts/<rootName(B)>/`, with B in
 *  it (a top-level bin with a private closure moves into its dir). A file 2+ bins reach is
 *  shared and is not placed by this rule. */
export function scriptsLaw(ctx) {
    const { g, T } = ctx;
    const inS = (f) => zoneOf(f) === "scripts";
    const F = T.files.filter((f) => inS(f) && /\.(mjs|js|cjs|ts|mts)$/.test(f) && !isTest(f));
    const inF = new Set(F);
    const succ = new Map([[TOP, new Set()], ...F.map((f) => [f, new Set()])]);
    const loaded = new Set();
    const entered = new Set();
    for (const e of g.edges) {
        if (!e.to || e.dir || !inF.has(e.to)) continue;
        if (inF.has(e.from) && LOAD_KINDS.has(e.kind)) { if (e.from !== e.to) { succ.get(e.from).add(e.to); loaded.add(e.to); } continue; }
        if (!inS(e.from)) entered.add(e.to);
    }
    const bins = F.filter((f) => entered.has(f) || !loaded.has(f));
    for (const b of bins) succ.get(TOP).add(b);
    const { idom, unreached } = idoms(succ, TOP);
    for (const f of unreached) idom.set(f, TOP);
    const isBin = new Set(bins);
    const owner = (f) => { let a = idom.get(f); while (a !== TOP && !isBin.has(a)) a = idom.get(a); return a; };
    const dirOfBin = (B) => (dirname(B) !== zoneOf(B) ? dirname(B) : `${dirname(B)}/${rootName(B, null)}`);
    const misplaced = [];
    const closure = new Map();
    for (const f of F) { if (isBin.has(f)) continue; const o = owner(f); if (o === TOP) continue; if (!closure.has(o)) closure.set(o, []); closure.get(o).push(f); }
    for (const [B, fs] of closure) {
        const D = dirOfBin(B);
        if (!within(B, D)) misplaced.push({ file: B, want: `${D}/${basename(B)}`, bin: B });
        for (const f of fs) if (!within(f, D)) misplaced.push({ file: f, want: `${D}/${basename(f)}`, bin: B });
    }
    return { bins, owner, misplaced };
}

/** L6.0 · cross-zone placement outside the library (SPECS-v2 §1.4, the S-15 consensus). A file of
 *  scripts/, tests/ or tests-visual/ whose every loader (a module edge from a file) sits in ONE
 *  other of those zones, and that no command token (package.json, CI YAML, shell) or root config
 *  names, moves into that zone: to its loaders' nearest common dir, or where that is the zone
 *  root, into the authored module names.json `zones` gives the zone. The move is judged on the
 *  image of the moves already proposed, to a fixpoint (a loader that moves carries its reads). */
const ZONES_OUT = ["scripts", "tests", "tests-visual"];
const MODULE_LOADS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "dynamic", "require", "reexport", "reexport-star", "reexport-ns", "vi-mock"]);
export function crossZone(ctx) {
    const { g, T } = ctx;
    const loaders = new Map();
    const named = new Set();
    for (const e of g.edges) {
        if (!e.to || e.dir || !ZONES_OUT.includes(zoneOf(e.to))) continue;
        if (MODULE_LOADS.has(e.kind) && ZONES.includes(zoneOf(e.from))) { if (!loaders.has(e.to)) loaders.set(e.to, new Set()); loaders.get(e.to).add(e.from); }
        else if (/command|npm-script|sh-ref/.test(e.kind) || !ZONES.includes(zoneOf(e.from))) named.add(e.to);
    }
    const map = new Map();
    const at = (f) => map.get(f) ?? f;
    for (let pass = 0, changed = true; changed && pass < 6; pass++) {
        changed = false;
        for (const [f, ls] of [...loaders].sort()) {
            if (named.has(f) || isTest(f) || map.has(f)) continue;
            const zs = new Set([...ls].map((l) => zoneOf(at(l))));
            const here = zoneOf(f);
            if (zs.size !== 1) continue;
            const [z] = zs;
            if (z === here || !ZONES_OUT.includes(z)) continue;
            const dirs = [...ls].map((l) => dirname(at(l)).split("/"));
            const out = [];
            for (let i = 0; ; i++) { const seg = dirs[0][i]; if (seg === undefined || dirs.some((x) => x[i] !== seg)) break; out.push(seg); }
            let d = out.join("/");
            if (d === z) d = NAMES.zones?.[z] ? `${z}/${NAMES.zones[z]}` : z;
            map.set(f, `${d}/${basename(f)}`);
            changed = true;
        }
    }
    return [...map].map(([from, to]) => ({ from, to, class: "cross-zone", readers: [...loaders.get(from)] }));
}

/** L6.2 · R-8 / E-7: a scripts file that nothing reaches (no edge of any kind from any file,
 *  the package manifest and CI included) is deleted, unless an entry publishes it. */
export function unreadScripts(ctx) {
    const reached = new Set();
    // the opaque ledger names files as data (a reason row), never as a reader
    for (const e of ctx.g.edges) if (e.to && !e.dir && e.from !== e.to && !e.from.endsWith("records/opaque-ledger.json")) reached.add(e.to);
    return ctx.T.files.filter((f) => zoneOf(f) === "scripts" && /\.(mjs|js|cjs|ts|mts|sh)$/.test(f) && !f.startsWith("scripts/structure/") && !reached.has(f));
}

// ------------------------------------------------------------------ L3.6 · CSS aggregator doors
/** L3.6 · a sheet beside a dir of its own name that imports only files of that dir is the dir's
 *  root sitting outside it: it moves in as the dir's door, `<dir>/index.css` (G-S3's root
 *  normalisation for CSS; F-3's declared dist name keeps any published key, P3-F5). Applies to
 *  dirs below component units, which E3 judges. */
export function cssDoorMoves(ctx) {
    const { g, T } = ctx;
    const out = [];
    for (const d of [...T.dirs].sort()) {
        const U = componentUnitOf(`${d}/x`);
        if (!U || d === U || isSlot(d) || T.isFile(`${d}/index.css`)) continue;
        const agg = `${dirname(d)}/${basename(d)}.css`;
        if (!T.isFile(agg)) continue;
        const imports = g.edges.filter((e) => e.from === agg && /css-import$/.test(e.kind) && e.to);
        if (imports.length && imports.every((e) => within(e.to, d))) out.push({ from: agg, to: `${d}/index.css`, class: "css-door", readers: [] });
    }
    return out;
}
