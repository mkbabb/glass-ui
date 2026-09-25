// stage2.mjs — the D1-G law, part 3 (LAW.md L2, L3.4b, L7.1): stage 2, within a component unit.
import { posix } from "node:path";
import { VALUE_KINDS, moduleSccs } from "../lib/graph.mjs";
import { dirUnits, isSlot, placeAll } from "../lib/placement.mjs";
import { idoms } from "./dominance.mjs";
import { globHold } from "./stage1.mjs";
import { CODE, TOP, baseNameOf, carveModule, collapsedRoot, componentUnitOf, dirNameOf, gUnits, isTest, norm, renamedTo, rootName, slotStrip, within } from "./units.mjs";

const { dirname, basename } = posix;
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
    const layout = (extraRoots, chained) => {
    // L2.3 roots: every SFC, entry source and declared door, every immediate dominator of 2+
    // files, and a bound root (L7.1)
    const isRoot = (f) => f === TOP || (!isWiring(f) && (f.endsWith(".vue") || ctx.doors.has(f) || (kids.get(f) ?? 0) >= 2 || extraRoots.has(f)));
    const owner = (f) => { let a = idom.get(f); while (!isRoot(a)) a = idom.get(a); return a; };
    const closure = new Map();
    for (const f of F) { const o = owner(f); if (!closure.has(o)) closure.set(o, []); closure.get(o).push(f); }
    // L2.5 heads: a root heads a dir when its private closure has 2+ files, or when it already
    // sits in its eponymous dir and its closure has 1+ (hysteresis); U's pinned SFC, an entry
    // source and a declared door head U itself; an authored collapse (L3.2), a chain (L3.4b) and
    // a root FD-2 flattened (L2.7) head nothing
    const eponymousDirOf = (R) => { const d = slotStrip(dirname(R)); return d !== U && norm(basename(d)) === norm(dirNameOf(R, U)) ? d : null; };
    const heads = (R) => {
        if (R === TOP || pinned(R) || ctx.doors.has(R) || flat.has(R) || collapsedRoot(R, U) || chained.has(R)) return false;
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
        // L7.2 · a file of an authored carve lives in its module when its L2 target is the carved dir
        target.set(f, carveModule(d, basename(f)) ?? d);
    }
    const based = applyBases(ctx, U, F, target);
    return { U, F, idom, owner, isRoot, closure, heads, home, target, based, wiring, pinned, eponymousDirOf };
    };
    // L3.4b chain compression and L7.1 bound split, to a fixpoint (each adds one root to a set)
    const extraRoots = new Set();
    const chained = new Set();
    const others = T.files.filter((f) => within(f, U) && !inU.has(f) && !isTest(f));
    for (let round = 0; round < 64; round++) {
        const Lx = layout(extraRoots, chained);
        const at = (f) => dirname(placeInDir(T, f, Lx.target.get(f)));
        // L3.4b · a root whose dir would hold every file of U but the door (U's root left with
        // only its door and that one dir) heads nothing: the unit is the module
        const heads1 = [...new Set(F.filter((f) => Lx.isRoot(f) && Lx.heads(f)).map((f) => f))].filter((R) => dirname(Lx.home(R)) === U);
        const chain = heads1.find((R) => F.every((f) => within(Lx.target.get(f), Lx.home(R))) && !others.some((f) => dirname(f) === U && !ctx.doors.has(f) && !/\.md$/.test(f)));
        if (chain && !chained.has(chain)) { chained.add(chain); continue; }
        // L7.1 · a non-slot dir over R-5's 12 direct files splits along its dominator children:
        // the file heading the largest private subtree (2+ files below it, all in that dir)
        // becomes a root and heads its own dir, named by L3
        const count = new Map();
        for (const f of F) { const d = at(f); count.set(d, (count.get(d) ?? 0) + 1); }
        for (const f of others) { const d = dirname(f); count.set(d, (count.get(d) ?? 0) + 1); }
        let split = null;
        for (const [d, n] of [...count].sort()) {
            if (n <= 12 || isSlot(d)) continue;
            const inD = F.filter((f) => Lx.target.get(f) === d && !Lx.isRoot(f));
            const below = (a) => inD.filter((x) => { for (let y = idom.get(x); y && y !== TOP; y = idom.get(y)) { if (y === a) return true; if (Lx.isRoot(y)) return false; } return false; }).length;
            const best = inD.map((f) => [f, below(f)]).filter(([, b]) => b >= 2).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))[0];
            if (best) { split = best[0]; break; }
        }
        if (split) { extraRoots.add(split); continue; }
        return { ...Lx, boundRoots: [...extraRoots], chained: [...chained] };
    }
    throw new Error(`L7.1/L3.4b: ${U} did not settle`);
}

/**
 * L2.8 · base modules. A parent dir P reads the modules nested in it (its roots import their
 * roots), so a file at P's level that a nested module value-imports closes a parent <-> child
 * cycle, which FD-2 counts (G-12: the nesting cycle is a module cycle, not an intra-unit one).
 * Every such file, with every P-level file it value-imports in turn (to closure), moves into one
 * sibling module of the nested ones, `P/<name>`, whose name is authored in names.json `bases`
 * (taken from B, P2-4). A door, an entry source and U's eponymous SFC never move. A needed base
 * with no authored name is a NEEDS-NAME stop. Levels are judged on the dominance targets (never
 * on where a file sits), so the rule reads the same on the base tree and on the migrated tree.
 */
function applyBases(ctx, U, F, target) {
    ctx.valueReads ??= (() => { const m = new Map(); for (const e of ctx.g.edges) if (VALUE_KINDS.has(e.kind) && !e.typeOnly && e.to && !e.dir) { if (!m.has(e.from)) m.set(e.from, new Set()); m.get(e.from).add(e.to); } return m; })();
    const inU = new Set(F);
    const out = new Map();
    const dirOf = (f) => out.get(f) ?? target.get(f);
    const fixed = (f) => ctx.doors.has(f) || (f.endsWith(".vue") && dirname(f) === U && norm(rootName(f, null)) === norm(basename(U)));
    for (let changed = true, guard = 0; changed; guard++) {
        if (guard > 12) throw new Error(`L2.8: bases in ${U} did not settle`);
        changed = false;
        const parents = new Set([...F].map(dirOf).filter((d) => d !== U).map((d) => dirname(d)).filter((P) => within(P, U)));
        for (const P of [...parents].sort()) {
            const childOf = (f) => { const d = dirOf(f); return d !== P && within(d, P) ? `${P}/${d.slice(P.length + 1).split("/")[0]}` : null; };
            const atP = (f) => inU.has(f) && dirOf(f) === P;
            const pReads = new Set();
            for (const f of F) if (atP(f)) for (const t of ctx.valueReads.get(f) ?? []) { if (!inU.has(t)) continue; const c = childOf(t); if (c) pReads.add(c); }
            const pull = new Set();
            for (const f of F) { const c = childOf(f); if (!c || !pReads.has(c)) continue; for (const t of ctx.valueReads.get(f) ?? []) if (atP(t) && !fixed(t)) pull.add(t); }
            for (let grow = true; grow;) { grow = false; for (const f of [...pull]) for (const t of ctx.valueReads.get(f) ?? []) if (atP(t) && !fixed(t) && !pull.has(t)) { pull.add(t); grow = true; } }
            if (!pull.size) continue;
            const name = baseNameOf(U, P);
            if (!name) { (ctx.needsBase ??= new Set()).add(`${P}: a base module takes ${[...pull].map((f) => basename(f)).sort().join(", ")}`); continue; }
            for (const f of pull) { out.set(f, `${P}/${name}`); changed = true; }
        }
    }
    for (const [f, d] of out) target.set(f, d);
    return out;
}

/** L2.6 · the path a file takes in its target dir T: kept when it already sits in T or in a
 *  kind slot of T (slot tolerance); a `use*` hook goes to T/composables/ when that slot exists;
 *  otherwise T itself. */
export function placeInDir(T, f, dir) {
    const renamed = renamedTo(f);
    if (slotStrip(dirname(f)) === dir) return renamed ? `${dirname(f)}/${renamed}` : f;
    const base = renamed ?? basename(f);
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
        ctx.needsBase = new Set();
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
        if (!bad.size) return { layouts, moves: moves.filter((m) => !needsName.includes(m)), needsName, needsBase: [...(ctx.needsBase ?? [])], held, globHeld, rounds: round + 1 };
        // flatten the root of each co-cyclic created dir (the deepest first)
        for (const L of layouts) for (const R of L.F) if (L.isRoot(R) && L.heads(R) && bad.has(L.home(R))) { flat.get(L.U).add(R); held.push({ unit: L.U, root: R, dir: L.home(R), round }); }
    }
    throw new Error("stage2: L2.7 did not settle in 12 rounds");
}
