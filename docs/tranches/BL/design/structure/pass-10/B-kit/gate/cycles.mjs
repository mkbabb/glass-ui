// cycles.mjs — B4's reader (LAW §8): the import graph of the sealed zones is acyclic. Lands at
// scripts/structure/seal/cycles.mjs beside the clauses, which read it; tests are left out.
//   siblings  value and type edges among sibling nodes at every depth, the files of one directory
//             included (pass 4, cB O-1): a node is a file, or the outermost module below the
//             edge's common module.
//   modules   (pass 10, P9-R1 (a)) every value SCC at module grain, parent<->child included: a node
//             is a file's innermost module (a container's own file is its container) and an edge
//             is a value edge between two nodes of one sealed zone. A parent reads its children
//             through their doors, so a child that value-reads a parent-level file closes a cycle
//             among nodes of different depths, which the sibling arm, reading one level at a
//             time, does not see. A type-only edge loads nothing and closes no value cycle. An SCC
//             with no ancestor-descendant pair projects onto a sibling cycle at its members'
//             common level, which the sibling arm counts; every SCC that nests one node inside
//             another is counted by this arm.
import { posix } from "node:path";

const under = (f, d) => f === d || f.startsWith(`${d}/`);

/** Tarjan's strongly connected components of size > 1 over adj: Map<node, Map<node, witness>>. */
function tarjan(adj) {
    let i = 0;
    const I = new Map(), L = new Map(), st = [], on = new Set(), out = [];
    const sc = (x) => {
        I.set(x, i); L.set(x, i++); st.push(x); on.add(x);
        for (const w of adj.get(x).keys()) {
            if (!I.has(w)) { sc(w); L.set(x, Math.min(L.get(x), L.get(w))); }
            else if (on.has(w)) L.set(x, Math.min(L.get(x), I.get(w)));
        }
        if (L.get(x) === I.get(x)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== x); if (c.length > 1) out.push(c); }
    };
    for (const x of adj.keys()) if (!I.has(x)) sc(x);
    return out;
}

const link = (adj, a, b, why) => {
    if (!adj.has(a)) adj.set(a, new Map());
    if (!adj.has(b)) adj.set(b, new Map());
    if (!adj.get(a).has(b)) adj.get(a).set(b, why);
};

/** B4's violations over the graph's edges, one string each. */
export function cycles(edges, { isTest, zoneOf, SEALED, VALUE_KINDS, chain, innerM }) {
    const out = [];
    const sealedPair = (e) => { const z = zoneOf(e.from); return z === zoneOf(e.to) && SEALED.includes(z) ? z : null; };
    // siblings, value and type
    const adjBy = new Map(), typeOnlyPair = new Map();
    for (const e of edges) {
        if (!e.to || e.dir || isTest(e.from) || isTest(e.to)) continue;
        const isVal = VALUE_KINDS.has(e.kind) && !e.typeOnly;
        const isType = /^import-type/.test(e.kind) || (e.typeOnly && (VALUE_KINDS.has(e.kind) || e.kind.startsWith("reexport")));
        if (!isVal && !isType) continue;
        const zf = sealedPair(e); if (!zf) continue;
        const ca = chain(e.from), cb = chain(e.to); const common = ca.filter((m) => cb.includes(m)).pop() ?? zf;
        const node = (f, c) => c.find((m) => m !== common && under(m, common) && (chain(m).filter((y) => y !== m).pop() ?? zf) === common) ?? f;
        const a = node(e.from, ca), b = node(e.to, cb); if (a === b) continue;
        if (!adjBy.has(common)) adjBy.set(common, new Map());
        link(adjBy.get(common), a, b, `${e.from} -> ${e.to}${isVal ? "" : " [type]"}`);
        const k = `${a}|${b}`; typeOnlyPair.set(k, (typeOnlyPair.get(k) ?? true) && !isVal);
    }
    for (const [lvl, adj] of adjBy) for (const c of tarjan(adj)) {
        const S = new Set(c); const why = c.flatMap((a) => [...adj.get(a)].filter(([b]) => S.has(b)).map(([, w]) => w));
        const typeOnly = c.every((a) => [...adj.get(a).keys()].filter((b) => S.has(b)).every((b) => typeOnlyPair.get(`${a}|${b}`)));
        out.push(`cycle @${lvl} [${c.map((x) => x.replace(`${lvl}/`, "")).join(" ")}]${typeOnly ? " (type-only)" : ""} via ${why.slice(0, 3).join(" ; ")}`);
    }
    // modules, value only, parent<->child included
    const nodeOf = (f) => innerM(f) ?? posix.dirname(f);
    const adj = new Map();
    for (const e of edges) {
        if (!e.to || e.dir || isTest(e.from) || isTest(e.to) || !VALUE_KINDS.has(e.kind) || e.typeOnly || !sealedPair(e)) continue;
        const a = nodeOf(e.from), b = nodeOf(e.to);
        if (a !== b) link(adj, a, b, `${e.from}:${e.line ?? ""} -> ${e.to}`);
    }
    for (const c of tarjan(adj)) {
        if (!c.some((a) => c.some((b) => a !== b && under(b, a)))) continue;
        const S = new Set(c); const why = c.flatMap((a) => [...adj.get(a)].filter(([b]) => S.has(b)).map(([, w]) => w));
        out.push(`value SCC at module grain [${[...c].sort().join(" ")}] (parent<->child) via ${why.slice(0, 4).join(" ; ")}`);
    }
    return out;
}
