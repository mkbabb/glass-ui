// classify.mjs — FD-5: the move-only diff classifier. A structure step (a move list, a
// re-point row, a vi.mock re-aim) changes files; each changed file must fall into exactly
// one of four classes, or the step fails:
//
//   move-only   its text equals the base text once every reference span, in both, is
//               replaced by the file it resolves to (the base's read through the move map)
//   re-point    the same, with each named import replaced by the symbol origins it reads
//               (a resolution-preserving re-point: a barrel import re-aimed at the origin)
//   vi-mock     the same again, with vi.mock specifiers blanked (a mock re-aimed at a moved
//               module; its target is the step's to state, judged by the test run)
//   authored    named, with a reason, in the step's manifest
//
// Anything else fails: a CSS rule smuggled into a moved sheet, a changed literal, a new
// import. The classifier reads the F-1 graph of both trees; it judges structure steps
// only, never an intended content change.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildGraph, loadDeps } from "./graph.mjs";
import { expandMoves, kindClass } from "./plan.mjs";
import { makeOrigins } from "./symbols.mjs";

const MODULE_NAMED = /^(import|import-type|reexport)$/;

/** Separators between the literal segments of one path expression (`"a", "b"`). */
const SEPARATOR = /^["'`]?\s*,\s*["'`]?$/;

/**
 * One token per reference site. An edge whose path is spelled over several literal
 * segments (`join("src", "styles", "tokens.css")`) is ONE site from its first segment to
 * its last, when only separators lie between them (P4-F6): the engine respells such a path
 * as one segment (`join("src/styles/tokens/index.css")`), and both spellings must read as
 * the same reference. A site several edges share (a glob's one literal, one edge per
 * match) carries the sorted set of their targets, so match order never reads as a change.
 */
function spansOf(graph, file, text) {
    const sites = new Map(); // "start:end" → { start, end, edges }
    for (const e of graph.refsOf.get(file) ?? []) {
        const ss = [...(e.spans ?? [])].sort((a, b) => a.start - b.start);
        if (!ss.length) continue;
        const joined = ss.length > 1 && ss.every((x, i) => i === 0 || SEPARATOR.test(text.slice(ss[i - 1].end, x.start)));
        for (const x of joined ? [{ start: ss[0].start, end: ss.at(-1).end }] : ss) {
            const k = `${x.start}:${x.end}`;
            if (!sites.has(k)) sites.set(k, { start: x.start, end: x.end, edges: [] });
            sites.get(k).edges.push(e);
        }
    }
    // overlapping sites (a composite path over its const) keep the outer
    const out = [...sites.values()].sort((a, b) => a.start - b.start || b.end - a.end);
    const kept = [];
    for (const x of out) if (!kept.length || x.start >= kept.at(-1).end) kept.push(x);
    return kept;
}

function tokenOf(O, e, { mapPath, mode }) {
    if (mode !== "move-only" && e.kind === "vi-mock") return "vi-mock";
    if (mode !== "move-only" && MODULE_NAMED.test(e.kind) && e.to && e.names?.length) {
        const origins = [];
        for (const n of e.names) for (const o of O.originOf(e.to, n.imported)) origins.push(`${mapPath(o.file)}#${o.name}`);
        return `${e.kind}:${[...new Set(origins)].sort().join(",")}`;
    }
    const to = e.to ?? e.output ?? e.generated ?? e.external ?? "";
    return `${kindClass(e.kind)}:${e.dir ? `${mapPath(to)}/` : mapPath(to)}`;
}

export function normalized(graph, O, file, text, { mapPath, mode }) {
    let out = "";
    let at = 0;
    for (const s of spansOf(graph, file, text)) {
        const token = [...new Set(s.edges.map((e) => tokenOf(O, e, { mapPath, mode })))].sort().join("|");
        out += `${text.slice(at, s.start)}⟦${token}⟧`;
        at = s.end;
    }
    return out + text.slice(at);
}

/**
 * FD-5 inside the engine (P4-F6): every file an engine step wrote (moved or edited) must
 * read move-only against its original under the step's move map. `original` holds the
 * pre-step bytes of every touched file (old path → Buffer). Returns { rows, counts, failed }.
 */
export function classifyImage(g0, g1, M, original, root) {
    const rows = [];
    const mapPath = (p) => M.any(p);
    const ident = (p) => p;
    for (const [f0, bytes] of original) {
        const f1 = M.file(f0);
        const now = readFileSync(join(root, f1));
        if (bytes.equals(now)) { rows.push({ file: f1, from: f0, class: "move-only", why: "bytes equal" }); continue; }
        const parsed = g0.tree.parsed.includes(f0) && g1.tree.parsed.includes(f1);
        const same = parsed && normalized(g0, null, f0, bytes.toString("utf8"), { mapPath, mode: "move-only" }) === normalized(g1, null, f1, now.toString("utf8"), { mapPath: ident, mode: "move-only" });
        rows.push({ file: f1, ...(f0 !== f1 ? { from: f0 } : {}), class: same ? "move-only" : "unclassified", why: same ? "" : parsed ? "text differs beyond its references" : "unparsed file changed" });
    }
    const counts = {};
    for (const r of rows) counts[r.class] = (counts[r.class] ?? 0) + 1;
    return { rows, counts, failed: rows.filter((r) => r.class === "unclassified").length };
}

/**
 * classifyStep(base, root, { moves, authored }) → { rows, counts, failed }.
 * `moves`: the step's move lists (in order); `authored`: [{ file, reason }], paths as they
 * are in `root`.
 */
export function classifyStep(base, root, { moves = [], authored = [], deps } = {}) {
    deps ??= loadDeps(root);
    const g0 = buildGraph(base, { deps });
    const g1 = buildGraph(root, { deps });
    const O0 = makeOrigins(g0);
    const O1 = makeOrigins(g1);
    // the move map, composed over the step's lists: base path → root path
    const fwd = new Map(g0.tree.files.map((f) => [f, f]));
    for (const list of moves) {
        const byOld = new Map([...fwd].map(([a, b]) => [b, a]));
        const cur = { files: [...fwd.values()], isDir: (p) => [...fwd.values()].some((f) => f.startsWith(`${p}/`)), isFile: (p) => byOld.has(p) };
        for (const m of expandMoves(cur, list)) if (!m.applied && byOld.has(m.from)) fwd.set(byOld.get(m.from), m.to);
    }
    const inv = new Map([...fwd].map(([a, b]) => [b, a]));
    const mapPath = (p) => fwd.get(p) ?? p;
    const ident = (p) => p;
    const authoredSet = new Map(authored.map((a) => [a.file, a.reason]));
    const rows = [];
    const read = (dir, f) => readFileSync(join(dir, f));
    const files1 = new Set(g1.tree.files);
    for (const f1 of g1.tree.files) {
        const f0 = inv.get(f1) ?? null;
        if (f0 === null) { rows.push({ file: f1, class: authoredSet.has(f1) ? "authored" : "unclassified", why: "added" }); continue; }
        const b0 = read(base, f0), b1 = read(root, f1);
        if (b0.equals(b1)) { if (f0 !== f1) rows.push({ file: f1, from: f0, class: "move-only", why: "bytes equal" }); continue; }
        const parsed = g0.tree.parsed.includes(f0) && g1.tree.parsed.includes(f1);
        let cls = null;
        if (parsed) {
            const t0 = b0.toString("utf8"), t1 = b1.toString("utf8");
            for (const mode of ["move-only", "re-point", "vi-mock"]) {
                if (mode === "vi-mock" && !(g1.refsOf.get(f1) ?? []).some((e) => e.kind === "vi-mock")) continue;
                if (normalized(g0, O0, f0, t0, { mapPath, mode }) === normalized(g1, O1, f1, t1, { mapPath: ident, mode })) { cls = mode; break; }
            }
        }
        if (!cls && authoredSet.has(f1)) cls = "authored";
        rows.push({ file: f1, ...(f0 !== f1 ? { from: f0 } : {}), class: cls ?? "unclassified", why: cls ? "" : parsed ? "text differs beyond its references" : "unparsed file changed" });
    }
    for (const f0 of g0.tree.files) {
        const f1 = mapPath(f0);
        if (!files1.has(f1)) rows.push({ file: f0, class: authoredSet.has(f0) ? "authored" : "unclassified", why: "removed" });
    }
    const counts = {};
    for (const r of rows) counts[r.class] = (counts[r.class] ?? 0) + 1;
    const stale = authored.filter((a) => !rows.some((r) => r.file === a.file && r.class === "authored"));
    return { rows, counts, stale, failed: rows.filter((r) => r.class === "unclassified").length + stale.length };
}
