// law.mjs — the D1-G law (pass 3): eponymous closures below the declared layer. The
// statement of record is ../LAW.md; every rule here carries its LAW.md id, and a rule that
// is not in LAW.md is a defect. It lands beside the floor at scripts/structure/eponym/
// and reads the floor's library from there (FD-11).
//
//   stage 1 (L1)  between units: F-7 with the FD-1 publication anchor, plus the kernel
//                 publication hold (L1.2), to a fixpoint under FD-2
//   stage 2 (L2)  within a component unit: ownership by immediate dominance over the unit's
//                 reader subgraph; a root with a private closure heads a dir named by L3
//   names   (L3)  rootName(), the authored overrides in names.json, collisions
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { buildGraph, moduleSccs } from "../lib/graph.mjs";
import { sccGrowth } from "../lib/move.mjs";
import { makeOrigins } from "../lib/symbols.mjs";
import { CONTAINERS, GLOBAL_ZONES, KIND_SLOTS, dirUnits, isSlot, placeAll, proposedPath, publicationAnchor } from "../lib/placement.mjs";
import { zoneOf } from "../lib/tree.mjs";
import { globToRegex } from "../lib/resolve.mjs";
import { idoms } from "./dominance.mjs";

const { dirname, basename } = posix;
export const NAMES = JSON.parse(readFileSync(new URL("./names.json", import.meta.url), "utf8"));
export const COMPONENTS = CONTAINERS.has("src/components") ? "src/components" : null;
const TOP = "⊤";
const CODE = /\.(ts|mts|js|mjs|vue)$/;
export const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
export const within = (f, d) => d === "." || f === d || f.startsWith(`${d}/`);
export const inGlobal = (f) => GLOBAL_ZONES.some((z) => within(f, z));
/** L0.1 · a component unit: a first-level dir of src/components outside the global zone. */
export function componentUnitOf(f) {
    if (!f.startsWith(`${COMPONENTS}/`) || inGlobal(f)) return null;
    const seg = f.slice(COMPONENTS.length + 1).split("/");
    return seg.length > 1 ? `${COMPONENTS}/${seg[0]}` : null;
}
/** strip kind slots from a dir: the dir a slot's files belong to (FD-3) */
export const slotStrip = (d) => { while (isSlot(d)) d = dirname(d); return d; };

/** L0.3 · G's unit function for FD-2: R-2's dir units (FD-3 slots belong to their unit), except
 *  that a unit's door (an entry source or a declared door) is a node of its own, and so is a
 *  test. A door publishes; it reads nothing (R-2), so its re-export edges into its own subtree
 *  never make the unit co-cyclic with a sub-unit. A test reads its subject and nothing reads a
 *  test, so a test homed in its subject's `__tests__/` slot (R-3) never joins a cycle. */
export function gUnits(ctx) {
    const base = dirUnits();
    return { name: "G: R-2 dir units, doors and tests as their own nodes", unitOf: (f) => (ctx.doors.has(f) || isTest(f) ? f : base.unitOf(f)) };
}

/** Everything the law and the gate read, built once per tree. */
export function context(root, { overlay = {}, g = null } = {}) {
    g ??= buildGraph(root, { overlay });
    const O = makeOrigins(g);
    const T = g.tree;
    const entrySources = new Set(g.record.js.map(([, s]) => s));
    const cssEntrySources = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
    const doors = new Set([...entrySources, ...cssEntrySources, ...g.record.doors]);
    /** file → Set of entry names that publish it (by symbol origin through barrels) */
    const pubBy = new Map();
    for (const [name, src] of g.record.js) for (const os of O.exportsOf(src).values()) for (const f of O.files(os)) { if (!pubBy.has(f)) pubBy.set(f, new Set()); pubBy.get(f).add(name); }
    const entryOf = new Map(g.record.js.map(([n, s]) => [n, s]));
    /** L1.2 · a kernel entry: an entry whose source lies in the global zone */
    const kernelEntry = (name) => name !== "index" && inGlobal(entryOf.get(name));
    return { root, g, O, T, entrySources, cssEntrySources, doors, pubBy, entryOf, kernelEntry };
}

// ------------------------------------------------------------------ L3 · names
const STAGES = new Set(["frag", "vert", "wgsl", "glsl", "comp"]);
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
export const norm = (s) => s.toLowerCase().replace(/[-_.]/g, "");
/** L3.1 · rootName(file, unitName): the dir name a root's file name gives. */
export function rootName(file, unitName) {
    const b = basename(file);
    if (/^index\./.test(b)) return basename(dirname(file));
    let s = kebab(b.replace(/\.(vue|ts|mts|mjs|js|css)$/, "")).replace(/\./g, "-");
    s = s.replace(/^use-/, "");
    // L3.1(e) a leading token equal to the unit's name drops, unless only a stage token would remain
    if (unitName && s.startsWith(`${unitName}-`)) {
        const rest = s.slice(unitName.length + 1);
        if (!STAGES.has(rest)) s = rest;
    }
    return s;
}
/** L3.2 · the authored name of a root's dir, when names.json overrides it: keyed by the
 *  unit's name and the root's file name. */
export function dirNameOf(file, unit) {
    const u = basename(unit);
    return NAMES.names?.[u]?.[basename(file)] ?? rootName(file, u);
}

// ------------------------------------------------------------------ L1 · stage 1
/** L1.1 + L1.2 · the stage-1 anchor: the floor's publication anchor (FD-1, P3-R1(a)), and the
 *  kernel publication hold: a global-zone file that a kernel entry publishes is anchored in
 *  its own dir (it is global by publication, so placement never moves it into a unit). */
export function stage1Anchor(ctx) {
    const pa = publicationAnchor(ctx.g);
    const units = dirUnits();
    const anchor = (f) => pa(f) ?? (inGlobal(f) && [...(ctx.pubBy.get(f) ?? [])].some(ctx.kernelEntry) ? units.unitOf(f) : null);
    return anchor;
}

/** L1.3 · where a stage-1 row lands: proposedPath, except that in the global zone a shared
 *  file lands in its home dir itself (no `composables/` slot inside a kernel module), and the
 *  authored stage-1 targets and collision renames of names.json. */
export function stage1Target(ctx, row) {
    const T = ctx.T;
    let to = proposedPath(T, row);
    const base = basename(row.file);
    const home = row.class === "global" ? dirname(to) : row.home;
    if (row.class !== "global" && inGlobal(`${home}/x`) && basename(dirname(to)) === "composables" && !isSlot(home)) to = `${home}/${base}`;
    const sub = NAMES.stage1?.[base];
    if (sub) to = `${dirname(to)}/${sub}/${base}`;
    const renamed = NAMES.rename?.[base];
    if (renamed) to = `${dirname(to)}/${renamed}`;
    return to;
}

/** L1.4 · FD-8 disposes: a move that changes the match set of a Tailwind `@source` glob (a
 *  css-source edge's pattern matches the file at one path and not the other) is held, since
 *  F-2's image check refuses any change to a glob's membership (FD-8) and the floor has no
 *  declared glob delta. The file stays; the hold is named with the sheet and the pattern. */
export function globHold(ctx, move) {
    ctx.globs ??= [...new Map(ctx.g.edges.filter((e) => e.kind === "css-source" && e.glob).map((e) => [`${e.from}\u0000${e.glob}`, { sheet: e.from, glob: e.glob, re: globToRegex(e.glob) }])).values()];
    const hit = ctx.globs.find((x) => x.re.test(move.from) !== x.re.test(move.to));
    return hit ? `${hit.sheet} @source ${hit.glob}` : null;
}

/** L1.5 · stage 1 to its fixpoint in memory: F-7's classification re-read on the image of the
 *  moves proposed so far (readers and homes mapped through the move map), until no new move
 *  appears; the union is one list, which FD-2 then judges as a whole. */
export function stage1(ctx, { hold = true } = {}) {
    const anchor = stage1Anchor(ctx);
    const p = placeAll(ctx.g, dirUnits(), { zones: ["src"], anchor });
    ctx.readers = p.readers;
    const units = dirUnits();
    const map = new Map();
    const M = (f) => map.get(f) ?? f;
    const rowOf = new Map(p.rows.map((r) => [r.file, r]));
    const moves = [];
    for (let pass = 1; pass <= 8; pass++) {
        const fresh = [];
        for (const r0 of p.rows) {
            if (r0.class === "anchored") continue;
            const here = M(r0.file);
            // L1.5 a test is no reader: it follows its subject (R-3), never the reverse
            const rs = [...(p.readers.get(r0.file) ?? [])].filter((r) => !isTest(r)).map(M);
            const us = [...new Set(rs.map((r) => units.unitOf(r)))].sort();
            if (!us.length) continue;
            const hereU = units.unitOf(here);
            let cls, home;
            if (us.length === 1) { home = us[0]; cls = within(hereU, home) ? "ok" : "move"; }
            else {
                const parts = us.map((d) => d.split("/"));
                const out = [];
                for (let i = 0; ; i++) { const seg = parts[0][i]; if (seg === undefined || parts.some((x) => x[i] !== seg)) break; out.push(seg); }
                home = out.join("/") || ".";
                const inReader = us.find((u) => u !== home && within(hereU, u));
                const rootHome = ["src", "src/components", "src/composables", "src/styles", "."].includes(home);
                cls = (within(hereU, home) && !inReader) || (rootHome && inGlobal(here)) ? "ok" : rootHome ? "global" : "move";
            }
            if (cls === "ok") continue;
            if (anchor(r0.file)) continue;
            const to = stage1Target(ctx, { ...rowOf.get(r0.file), file: here, class: cls, home, readerUnits: us });
            if (to === here || to === map.get(r0.file)) continue;
            fresh.push({ from: r0.file, to, class: cls, readers: us, pass });
        }
        if (!fresh.length) break;
        for (const m of fresh) { map.set(m.from, m.to); const i = moves.findIndex((x) => x.from === m.from); if (i >= 0) moves[i] = m; else moves.push(m); }
    }
    const claims = new Map();
    for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
    const needsName = moves.filter((m) => claims.get(m.to) > 1 || ctx.T.isFile(m.to));
    const globHeld = [];
    const named = moves.filter((m) => !needsName.includes(m)).filter((m) => { const h = globHold(ctx, m); if (h) globHeld.push({ ...m, glob: h }); return !h; });
    const { kept, held } = hold ? fd2Hold(ctx, named) : { kept: named, held: [] };
    return { rows: p.rows, readers: p.readers, moves: kept, held, globHeld, needsName, anchored: p.rows.filter((r) => r.class === "anchored").length };
}

/** L1.6 · FD-2 disposes: the co-cyclic module pairs a set of moves adds on its image graph
 *  (G's unit function, L0.3). While the set adds any, one move leaves the set (the rule is in
 *  fd2Hold); a removed move is `fd2-held`: the file stays, and the pair it would add is named. */
export function addedPairs(ctx, moves) {
    const fm = new Map();
    for (const m of moves) for (const x of m.expand ?? [m]) fm.set(x.from, x.to);
    const M = { fileMap: fm, file: (x) => fm.get(x) ?? x, dir: (d) => d };
    const image = { edges: ctx.g.edges.map((e) => ({ ...e, from: M.file(e.from), to: e.to && !e.dir ? M.file(e.to) : e.to })), tree: { files: ctx.T.files.map(M.file) } };
    return sccGrowth(ctx.g, image, M, { moduleOf: gUnits(ctx).unitOf });
}
export function fd2Hold(ctx, moves) {
    let kept = [...moves];
    const held = [];
    const alone = new Map(moves.map((m) => [m, addedPairs(ctx, [m])]));
    let r = addedPairs(ctx, kept);
    while (r.addedPairs > 0 && kept.length) {
        // the move whose removal lowers the added count most; ties go to the move that adds the
        // most alone, then to list order. A set whose pairs no single removal lowers loses the
        // move that adds the most alone.
        let best = null;
        for (const m of kept) {
            const n = addedPairs(ctx, kept.filter((x) => x !== m)).addedPairs;
            const a = alone.get(m).addedPairs;
            if (!best || n < best.n || (n === best.n && a > best.a)) best = { m, n, a };
        }
        if (best.n >= r.addedPairs && best.a === 0) throw new Error("L1.6: pairs added by a combination no single move carries");
        held.push({ ...best.m, pairs: alone.get(best.m).firstAdded.map((p) => p.join(" ↔ ")), added: r.addedPairs - best.n });
        kept = kept.filter((x) => x !== best.m);
        r = addedPairs(ctx, kept);
    }
    return { kept, held };
}

// ------------------------------------------------------------------ L2 · stage 2
/** L2.4 · a wiring file: 3 or more registration edges. A registration edge is the import of
 *  an SFC (a component) whose binding is only ever placed in an array literal or as an
 *  object-literal value: the component is registered, never rendered or read here. A
 *  wiring file's reads are weak. Any other use of an imported binding is a read. */
function registrationCounts(ctx, files, ts) {
    const out = new Map();
    for (const f of files) {
        if (!/\.(ts|mts)$/.test(f)) continue;
        const code = ctx.T.read(f);
        const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true);
        const bindings = new Map();
        for (const s of sf.statements) {
            if (!ts.isImportDeclaration(s) || !s.importClause || s.importClause.isTypeOnly || !/\.vue$/.test(s.moduleSpecifier.text)) continue;
            const c = s.importClause;
            if (c.name) bindings.set(c.name.text, 0);
            if (c.namedBindings && ts.isNamedImports(c.namedBindings)) for (const e of c.namedBindings.elements) if (!e.isTypeOnly) bindings.set(e.name.text, 0);
        }
        const uses = new Map([...bindings.keys()].map((k) => [k, { reg: 0, other: 0 }]));
        const visit = (n) => {
            if (ts.isIdentifier(n) && uses.has(n.text) && !ts.isImportSpecifier(n.parent) && !ts.isImportClause(n.parent)) {
                const p = n.parent;
                const reg = ts.isArrayLiteralExpression(p) || (ts.isPropertyAssignment(p) && p.initializer === n) || ts.isShorthandPropertyAssignment(p);
                uses.get(n.text)[reg ? "reg" : "other"]++;
            }
            ts.forEachChild(n, visit);
        };
        visit(sf);
        const n = [...uses.values()].filter((u) => u.reg > 0 && u.other === 0).length;
        if (n) out.set(f, n);
    }
    return out;
}

/**
 * L2 · stage 2 in one component unit U: the reader subgraph of U's code files (no CSS, no
 * tests, no U root door), plus ⊤ for everything that enters U from outside; immediate
 * dominators from ⊤; roots and their private closures; each file's target dir.
 */
export function unitLayout(ctx, U, { ts, flat = new Set() } = {}) {
    const { T, O } = ctx;
    const door = `${U}/index.ts`;
    const uName = basename(U);
    const F = T.files.filter((f) => within(f, U) && CODE.test(f) && !/\.d\.m?ts$/.test(f) && !isTest(f) && f !== door);
    const inU = new Set(F);
    const wiring = ts ? registrationCounts(ctx, F, ts) : new Map();
    const isWiring = (f) => (wiring.get(f) ?? 0) >= 3;
    const succ = new Map([[TOP, new Set()], ...F.map((f) => [f, new Set()])]);
    const pred = new Map(F.map((f) => [f, new Set()]));
    for (const r of F) {
        if (isWiring(r)) continue; // L2.4 a wiring file's reads are weak
        for (const f of O.readsOf(r)) if (inU.has(f) && f !== r) { succ.get(r).add(f); pred.get(f).add(r); }
    }
    // L2.2 ⊤ enters U at: a file read from outside U (in the src zone, a door is no reader),
    // a file no file of U reads, an entry source or declared door, and U's eponymous SFC (pin)
    const outside = new Set();
    for (const [f, rs] of ctx.readers ?? new Map()) if (inU.has(f)) for (const r of rs) if (!within(r, U) && !isTest(r)) outside.add(f);
    const pinned = (f) => f.endsWith(".vue") && dirname(f) === U && norm(rootName(f, null)) === norm(uName);
    for (const f of F) if (outside.has(f) || !pred.get(f).size || ctx.doors.has(f) || pinned(f) || isWiring(f)) succ.get(TOP).add(f);
    const { idom, unreached } = idoms(succ, TOP);
    for (const f of unreached) idom.set(f, TOP);
    const kids = new Map();
    for (const f of F) { const d = idom.get(f); kids.set(d, (kids.get(d) ?? 0) + 1); }
    // L2.3 roots: every SFC, entry source and declared door, and every immediate dominator of 2+ files
    const isRoot = (f) => f === TOP || (!isWiring(f) && (f.endsWith(".vue") || ctx.doors.has(f) || (kids.get(f) ?? 0) >= 2));
    const owner = (f) => { let a = idom.get(f); while (!isRoot(a)) a = idom.get(a); return a; };
    const closure = new Map();
    for (const f of F) { const o = owner(f); if (!closure.has(o)) closure.set(o, []); closure.get(o).push(f); }
    // L2.5 heads: a root heads a dir when its private closure has 2+ files, or when it already
    // sits in its eponymous dir and its closure has 1+ (hysteresis); U's pinned SFC, an entry
    // source and a declared door head U itself; a root FD-2 flattened (L2.7) heads nothing
    const eponymousDirOf = (R) => { const d = slotStrip(dirname(R)); return d !== U && norm(basename(d)) === norm(dirNameOf(R, U)) ? d : null; };
    const heads = (R) => {
        if (R === TOP || pinned(R) || ctx.doors.has(R) || flat.has(R)) return false;
        // L3.4 collapse: a root whose name equals the dir it would nest in heads nothing
        if (norm(dirNameOf(R, U)) === norm(basename(home(owner(R))))) return false;
        const c = (closure.get(R) ?? []).length;
        return c >= 2 || (c >= 1 && !!eponymousDirOf(R));
    };
    const dirOfRoot = new Map([[TOP, U]]);
    const home = (R) => {
        if (dirOfRoot.has(R)) return dirOfRoot.get(R);
        const parent = home(owner(R));
        const d = heads(R) ? `${parent}/${dirNameOf(R, U)}` : parent;
        dirOfRoot.set(R, d);
        return d;
    };
    const target = new Map();
    for (const f of F) {
        const d = isRoot(f) && heads(f) ? home(f) : home(owner(f));
        target.set(f, d);
    }
    return { U, F, idom, owner, isRoot, closure, heads, home, target, wiring, pinned, eponymousDirOf };
}

/** L2.6 · the path a file takes in its target dir T: kept when it already sits in T or in a
 *  kind slot of T (slot tolerance); a `use*` hook goes to T/composables/ when that slot exists;
 *  otherwise T itself. */
export function placeInDir(T, f, dir) {
    if (slotStrip(dirname(f)) === dir) return f;
    const base = basename(f);
    if (/^use[A-Z]/.test(base) && T.isDir(`${dir}/composables`)) return `${dir}/composables/${base}`;
    return `${dir}/${base}`;
}

/** The component units of a tree. */
export const componentUnits = (T) => [...new Set(T.files.map(componentUnitOf).filter(Boolean))].sort();

/**
 * L2 over every component unit, with L2.7's FD-2 rule: a nested dir the layout would create
 * that sits in a static module SCC after the moves (moduleSccs over R-2 dir units) is not
 * made: its root is flattened, and the layout recomputed, until no created dir is co-cyclic.
 */
export function stage2(ctx, { ts, units = componentUnits(ctx.T) } = {}) {
    ctx.readers ??= placeAll(ctx.g, dirUnits(), { zones: ["src"] }).readers;
    const flat = new Map(units.map((u) => [u, new Set()]));
    const held = [];
    for (let round = 0; round < 12; round++) {
        const layouts = units.map((U) => unitLayout(ctx, U, { ts, flat: flat.get(U) }));
        const moves = [];
        for (const L of layouts) for (const f of L.F) { const to = placeInDir(ctx.T, f, L.target.get(f)); if (to !== f) moves.push({ from: f, to, unit: L.U }); }
        // L1.4 applies within units too: a move that changes a `@source` glob's membership is held
        const globHeld = [];
        for (let i = moves.length - 1; i >= 0; i--) { const h = globHold(ctx, moves[i]); if (h) { globHeld.push({ ...moves[i], glob: h }); moves.splice(i, 1); } }
        // collisions: two files onto one path, or onto an existing file
        const claims = new Map();
        for (const m of moves) claims.set(m.to, (claims.get(m.to) ?? 0) + 1);
        const needsName = moves.filter((m) => claims.get(m.to) > 1 || (ctx.T.isFile(m.to) && !moves.some((x) => x.from === m.to)));
        // L2.7 FD-2: the image under the moves (G's unit function, L0.3); a dir the moves create
        // that sits in a static module SCC is flattened
        const created = new Set(moves.map((m) => dirname(m.to)).filter((d) => !ctx.T.isDir(d)));
        const fileMap = new Map(moves.map((m) => [m.from, m.to]));
        const mapF = (x) => fileMap.get(x) ?? x;
        const image = { edges: ctx.g.edges.map((e) => ({ ...e, from: mapF(e.from), to: e.to && !e.dir ? mapF(e.to) : e.to })) };
        const sccs = moduleSccs(image, { moduleOf: gUnits(ctx).unitOf });
        const bad = new Set();
        for (const c of sccs) for (const d of c) if (created.has(d)) bad.add(d);
        if (!bad.size) return { layouts, moves: moves.filter((m) => !needsName.includes(m)), needsName, held, globHeld, rounds: round + 1 };
        // flatten the root of each co-cyclic created dir (the deepest first)
        for (const L of layouts) for (const R of L.F) if (L.isRoot(R) && L.heads(R) && bad.has(L.home(R))) { flat.get(L.U).add(R); held.push({ unit: L.U, root: R, dir: L.home(R), round }); }
    }
    throw new Error("stage2: L2.7 did not settle in 12 rounds");
}

// ------------------------------------------------------------------ L5 · tests (R-3)
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
