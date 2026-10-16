// move.mjs — F-2: the one move engine. Applies a move list to a tree and rewrites every
// reference the F-1 graph resolved to a moved file (or out of one): module specifiers in
// every form, CSS @import/url()/@source, SFC block src, globs, new URL, evaluated path
// expressions (anchor + literal tail), JSON/shell/HTML path strings, and the floor's own
// records. It then rebuilds the graph and proves the edge set is the image of the old one
// under the move map; whatever is not is the residue census, and residue fails the run.
// Idempotent: a move whose source is gone and whose target exists counts as applied.
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { buildGraph, loadDeps, moduleSccs } from "./graph.mjs";
import { dirUnits } from "./placement.mjs";
import { zoneOf } from "./tree.mjs";
import { globToRegex } from "./resolve.mjs";
import { classifyImage } from "./classify.mjs";
import { expandMoves, kindClass } from "./plan.mjs";
import { unparsed } from "./syntax.mjs";

const EXT = /\.(d\.ts|ts|tsx|mts|cts|js|mjs|cjs|jsx|vue|css|json)$/;

export function planMoves(tree, moves) {
    const pending = [];
    const applied = [];
    const errors = [];
    const targets = new Set();
    for (const m of expandMoves(tree, moves)) {
        if (m.applied) { applied.push(m); continue; }
        const src = tree.isFile(m.from);
        const dst = tree.isFile(m.to);
        if (src && !dst) pending.push(m);
        else if (!src && dst) applied.push(m);
        else if (src && dst) errors.push({ move: m, error: "target exists" });
        else errors.push({ move: m, error: "source and target both absent" });
        if (targets.has(m.to)) errors.push({ move: m, error: "two moves share a target" });
        targets.add(m.to);
    }
    return { pending, applied, errors };
}

function mapper(tree, pending) {
    const fileMap = new Map(pending.map((m) => [m.from, m.to]));
    // a directory maps when every file under it moves under one new prefix
    const dirMap = new Map();
    const dirs = [...tree.dirs].sort((a, b) => a.length - b.length);
    for (const d of dirs) {
        const members = tree.files.filter((f) => f.startsWith(`${d}/`));
        if (!members.length) continue;
        let prefix = null;
        let ok = true;
        for (const f of members) {
            const n = fileMap.get(f);
            const suf = f.slice(d.length);
            if (!n || !n.endsWith(suf)) { ok = false; break; }
            const p = n.slice(0, n.length - suf.length);
            if (prefix === null) prefix = p;
            else if (prefix !== p) { ok = false; break; }
        }
        if (ok && prefix !== null && prefix !== d) dirMap.set(d, prefix);
    }
    const file = (p) => fileMap.get(p) ?? p;
    const dir = (p) => {
        if (dirMap.has(p)) return dirMap.get(p);
        for (const [d, n] of dirMap) if (p.startsWith(`${d}/`)) return n + p.slice(d.length);
        return p;
    };
    const any = (p) => (p === null ? null : fileMap.has(p) ? fileMap.get(p) : dir(p));
    return { fileMap, dirMap, file, dir, any };
}

const withDot = (rel) => (rel.startsWith(".") ? rel : `./${rel}`);

function specEnding(origBare, oldTarget, newTarget) {
    // keep the spelling the author used: full name, no extension, .js-for-.ts, or the dir index
    const base = posix.basename(origBare);
    const oldBase = posix.basename(oldTarget);
    if (base === oldBase) return { form: "full" };
    if (/^index\.[a-z.]+$/.test(oldBase) && !EXT.test(base) && base === posix.basename(posix.dirname(oldTarget))) return { form: "dir" };
    if (origBare === "." || origBare === ".." || origBare.endsWith("/")) return { form: "dir" };
    if (/\.(m|c)?js$/.test(base) && /\.(m|c)?ts$/.test(oldBase)) return { form: "js-for-ts" };
    return { form: "noext" };
}

function spell(targetPath, ending) {
    if (ending.form === "full") return targetPath;
    if (ending.form === "dir") return /^index\.[a-z.]+$/.test(posix.basename(targetPath)) ? posix.dirname(targetPath) : targetPath.replace(EXT, "");
    if (ending.form === "js-for-ts") return targetPath.replace(/\.(m|c)?ts$/, (m) => m.replace("t", "j"));
    return targetPath.replace(EXT, "");
}

export function computeEdits(graph, M, deps) {
    const edits = new Map(); // old file path -> [{start,end,text}]
    const residue = [];
    const stats = { rewrites: 0, byKind: {}, byVia: {} };
    const aliasOf = new Map(graph.aliases.map((a) => [a.key, a.target]));
    const push = (file, start, end, text, e) => {
        if (!edits.has(file)) edits.set(file, []);
        edits.get(file).push({ start, end, text, kind: e.kind });
        stats.rewrites++;
        stats.byKind[e.kind] = (stats.byKind[e.kind] ?? 0) + 1;
        stats.byVia[e.via] = (stats.byVia[e.via] ?? 0) + 1;
    };
    const rootAbs = graph.tree.root;
    for (const e of graph.edges) {
        const fromNew = M.file(e.from);
        // P4-F3: a generated target (dist, a cache root) is not a tree file and never moves;
        // only its holder's spelling can follow the holder. An edge with no target at all is
        // never respelled: it is residue, never the text "null".
        const target = e.to ?? e.output ?? e.generated ?? null;
        const toNew = target === null ? null : e.generated && !e.to ? target : e.dir ? M.dir(target) : M.any(target);
        const fromMoved = fromNew !== e.from;
        const toMoved = target !== null && toNew !== target;
        const anchorMoved = (!!e.anchorFile && M.file(e.anchorFile) !== e.anchorFile) || (!!e.anchorDir && M.dir(e.anchorDir) !== e.anchorDir);
        if (!fromMoved && !toMoved && !anchorMoved) continue;
        if (e.via === "package" || e.via === "builtin" || e.via === "url" || e.via === "self-name" || e.via === "ledger" || e.via === "generated" || e.via === "absence") continue;
        if (e.kind === "helper-base") continue; // a base marker: the helper's own literals carry the spelling
        if (target === null) { if (!e.external) residue.push({ kind: "no-target", edge: brief(e) }); continue; } // an external never moves
        const span = e.spans?.[0];
        const replaceOne = (text) => {
            if (!span) return residue.push({ kind: "no-span", edge: brief(e) });
            if (text !== span.value) push(e.from, span.start, span.end, text, e);
        };
        const { bare, query } = splitQ(span?.value ?? e.spec);
        if (e.mode === "based") {
            // relative to the dir the file scans; a target that leaves that dir cannot be spelled
            if (!toMoved && !anchorMoved) continue;
            const base = e.anchorDir ? M.dir(e.anchorDir) : posix.dirname(M.file(e.anchorFile));
            const rel = posix.relative(base, toNew);
            if (rel.startsWith("..")) { residue.push({ kind: "based-escape", edge: brief(e) }); continue; }
            // P3-F5: one segment is spelled `./name`, the form F-1 reads as a text-anchored
            // path (`glass.css → glass/index.css` makes `glass/grasp.css` `./grasp.css`)
            replaceOne(rel.includes("/") ? rel : `./${rel}`);
            continue;
        }
        if (e.mode === "embedded") {
            // relative to the file whose text it quotes, not to the file that holds it
            if (!toMoved && !anchorMoved) continue;
            if (!e.anchorFile) { replaceOne(toNew); continue; }
            const rel = posix.relative(posix.dirname(M.file(e.anchorFile)), toNew);
            replaceOne(rel.startsWith("..") ? rel : `./${rel}`);
            continue;
        }
        if (e.mode === "module") {
            if (e.via === "relative") {
                const ending = specEnding(bare, target, toNew);
                replaceOne(withDot(posix.relative(posix.dirname(fromNew), spell(toNew, ending))) + query);
            } else if (e.via === "alias") {
                const key = [...aliasOf.keys()].find((k) => bare === k || bare.startsWith(`${k}/`));
                const aliasRoot = aliasOf.get(key);
                const ending = specEnding(bare, target, toNew);
                const spelled = spell(toNew, ending);
                if (spelled === aliasRoot || spelled.startsWith(`${aliasRoot}/`)) replaceOne(`${key}${spelled.slice(aliasRoot.length)}` + query);
                else replaceOne(withDot(posix.relative(posix.dirname(fromNew), spelled)) + query);
            } else if (e.via === "root-absolute") {
                const ending = specEnding(bare, target, toNew);
                replaceOne(`/${spell(toNew, ending)}${query}`);
            } else residue.push({ kind: "module-via", edge: brief(e) });
            continue;
        }
        if (e.mode === "url" || (e.mode === "path" && e.via === "file-relative")) {
            const rel = posix.relative(posix.dirname(fromNew), toNew) || ".";
            const keepDot = bare.startsWith("./") || e.mode === "url";
            const text = (keepDot ? withDot(rel) : rel) + (bare.endsWith("/") && !rel.endsWith("/") ? "/" : "") + query;
            replaceOne(text);
            continue;
        }
        if (e.mode === "path" && (e.via === "root-relative" || e.via === "root-absolute" || e.via === "write")) {
            if (e.via === "write" && !toMoved) continue; // an output path relative to the root does not move with its writer
            const lead = e.via === "root-absolute" ? "/" : (bare.match(/^(?:\.\/|(?:\.\.\/)*)/)?.[0] ?? "");
            replaceOne(`${lead}${toNew}${bare.endsWith("/") ? "/" : ""}${query}`);
            continue;
        }
        if (e.mode === "abs") {
            // P3-F5: a cwd-rooted path with no literal at this site (`join(process.cwd(), PLATE)`)
            // is spelled by its consts, whose own literals are edges this run rewrites; the
            // working directory never moves. The image check judges the result.
            if (!e.spans?.length && e.rooted) continue;
            if (!e.spans?.length || e.anchor === null) { residue.push({ kind: "unrewritable-path", edge: brief(e) }); continue; }
            const oldSelf = dirname(graph.tree.abs(e.from));
            const selfRel = e.anchor === oldSelf || e.anchor.startsWith(`${oldSelf}/`);
            let anchor = e.anchor;
            if (selfRel) anchor = join(dirname(graph.tree.abs(fromNew)), e.anchor.slice(oldSelf.length));
            else {
                const relA = graph.tree.rel(anchor);
                if (!relA.startsWith("..")) anchor = join(rootAbs, M.dir(relA === "" ? "." : relA));
            }
            const targetAbs = join(rootAbs, toNew ?? target);
            const oldTail = e.spans.map((s) => s.value).join("/");
            let rel = posix.relative(anchor, targetAbs);
            if (e.suffix) {
                if (!rel.endsWith(e.suffix)) { residue.push({ kind: "helper-suffix", edge: brief(e) }); continue; }
                rel = rel.slice(0, rel.length - e.suffix.length);
            }
            if (oldTail.startsWith("/")) rel = `/${rel}`;
            else if (oldTail.startsWith("./") && !rel.startsWith("..")) rel = `./${rel}`;
            if (oldTail.endsWith("/") && !rel.endsWith("/")) rel += "/";
            if (rel === "" ) rel = ".";
            const oldJoined = posix.normalize(e.spans.map((s) => s.value).join("/"));
            if (posix.normalize(rel) === oldJoined && e.spans.length > 1) continue;
            if (e.spans.length === 1) { if (rel !== e.spans[0].value) push(e.from, e.spans[0].start, e.spans[0].end, rel, e); continue; }
            const segs = rel.split("/");
            if (segs.length === e.spans.length && e.spans.every((s) => !s.value.includes("/"))) {
                e.spans.forEach((s, i) => { if (segs[i] !== s.value) push(e.from, s.start, s.end, segs[i], e); });
            } else {
                push(e.from, e.spans[0].start, e.spans[0].end, rel, e);
                for (const s of e.spans.slice(1)) {
                    if (s.delFrom === undefined) { residue.push({ kind: "unsplittable-tail", edge: brief(e) }); break; }
                    push(e.from, s.delFrom, s.end + 1, "", e);
                }
            }
            continue;
        }
        if (e.mode === "glob") {
            if (!fromMoved) continue; // a moved target changes the match set; the post-move graph judges it
            if (!span || e.plane === "published") { residue.push({ kind: "glob-unrewritable", edge: brief(e) }); continue; }
            const pat = bare;
            if (!pat.startsWith(".")) continue; // root-relative pattern: independent of the file's place
            const i = pat.search(/[*{]/);
            const head = i === -1 ? pat : pat.slice(0, pat.lastIndexOf("/", i) + 1);
            const headAbs = posix.normalize(posix.join(posix.dirname(e.from), head));
            const newHead = withDot(posix.relative(posix.dirname(fromNew), M.dir(headAbs.replace(/\/$/, "")) || "."));
            const text = `${newHead}${head.endsWith("/") && !newHead.endsWith("/") ? "/" : ""}${pat.slice(head.length)}`;
            if (!edits.get(e.from)?.some((x) => x.start === span.start)) replaceOne(text + query);
            continue;
        }
        if (e.mode === "scan") continue; // judged by the scan-set check after the move
        residue.push({ kind: `mode-${e.mode}`, edge: brief(e) });
    }
    return { edits, residue, stats };
}

function splitQ(s) {
    const m = /^([^?#]*)([?#].*)?$/.exec(s ?? "");
    return { bare: m[1], query: m[2] ?? "" };
}
function brief(e) {
    return { from: e.from, line: e.line, kind: e.kind, via: e.via, spec: String(e.spec).slice(0, 120), to: e.to ?? e.output };
}

export function applyEdits(code, list) {
    const sorted = [...new Map(list.map((x) => [`${x.start}:${x.end}`, x])).values()].sort((a, b) => b.start - a.start);
    for (let i = 1; i < sorted.length; i++) if (sorted[i].end > sorted[i - 1].start) throw new Error(`overlapping edits at ${sorted[i].start}`);
    let out = code;
    for (const x of sorted) out = out.slice(0, x.start) + x.text + out.slice(x.end);
    return out;
}

export function treeDigest(root, files) {
    const h = createHash("sha256");
    for (const f of [...files].sort()) {
        h.update(f);
        h.update("\0");
        h.update(createHash("sha256").update(readFileSync(join(root, f))).digest("hex"));
        h.update("\n");
    }
    return h.digest("hex");
}

/** Edge signature for the image check: identity of an edge that survives a move. */
function sig(e, map) {
    const to = e.to ?? e.output ?? e.generated ?? e.external ?? "";
    const target = map ? (e.dir ? map.dir(to) : map.any(to)) : to;
    const kind = kindClass(e.kind);
    return `${map ? map.file(e.from) : e.from}|${kind}|${target}|${e.dir ? "d" : "f"}|${e.plane}`;
}

/** Scan deltas: every file whose path relative to a scanner's base dir changes under M —
 *  it leaves the base, or it relocates inside it (a per-dir census or a flat readdir sees
 *  that too). A scanner is a scan edge: a dynamic read, a readdir walk or a template head. */
export function scanDeltasOf(g0, M) {
    const byKey = new Map();
    for (const e of g0.edges) {
        if (e.via !== "scan" || !e.dir || !e.to || e.to === ".") continue;
        const nb = M.dir(e.to);
        for (const f of g0.tree.files) {
            if (!f.startsWith(`${e.to}/`)) continue;
            const nf = M.file(f);
            const relNew = nf.startsWith(`${nb}/`) ? nf.slice(nb.length + 1) : null;
            if (relNew === f.slice(e.to.length + 1)) continue;
            const d = { scanner: e.from, line: e.line, spec: e.spec, base: e.to, file: f, to: nf };
            byKey.set(`${d.scanner}\u0000${d.spec}\u0000${d.file}`, d);
        }
    }
    return [...byKey.values()];
}

/**
 * FD-8 · css-source glob deltas (P4-F2). A Tailwind `@source` glob is a collection pattern:
 * a move can take a file out of its match set (`_shared/overlay/isTeleportedTarget.ts`
 * leaving `@source "../src/components/_shared/**\/*.ts"`) or bring one into it. Such a move
 * changes what Tailwind scans, which no rewrite can express, so every such delta is named
 * and must be declared (`globDeltas: [{ scanner, glob, file, reason }]`, `file` the path
 * before the move); the image check then expects exactly the declared edge lost or gained.
 * A negated `@source not` of the same sheet subtracts, as in F-1. Only source-plane globs
 * whose holder stays put: a moved holder's glob is respelled and keeps its match set.
 */
export function globDeltasOf(g0, M) {
    const out = [];
    const isSource = (e) => /css-source$/.test(e.kind) && e.via === "glob" && e.glob && e.plane === "source";
    const scanners = new Map(); // `${from}\0${spec}` → { from, spec, re, members }
    for (const e of g0.edges) {
        if (!isSource(e) || M.file(e.from) !== e.from) continue;
        const k = `${e.from}\u0000${e.spec}`;
        if (!scanners.has(k)) scanners.set(k, { from: e.from, spec: e.spec, re: globToRegex(e.glob), members: new Set() });
        scanners.get(k).members.add(e.to);
    }
    const negations = new Map();
    for (const e of g0.edges) if (e.via === "program-glob" && /css-source$/.test(e.kind) && e.glob) (negations.get(e.from) ?? negations.set(e.from, []).get(e.from)).push(globToRegex(e.glob));
    const negated = (from, f) => { const res = negations.get(from) ?? []; for (let d = f; d.includes("/"); d = posix.dirname(d)) if (res.some((re) => re.test(d))) return true; return false; };
    const matches = (s, f) => s.re.test(f) && !negated(s.from, f);
    for (const s of scanners.values()) {
        for (const [from, to] of M.fileMap) {
            const was = s.members.has(from);
            const now = matches(s, to);
            if (was && !now) out.push({ scanner: s.from, glob: s.spec, file: from, to, change: "leaves" });
            if (!was && now && !s.members.has(to)) out.push({ scanner: s.from, glob: s.spec, file: from, to, change: "enters" });
        }
    }
    return out;
}

/**
 * FD-2 · the coupling stop. Two modules are co-cyclic when they sit in one SCC of
 * `moduleSccs` over the unit function. A pass may dissolve coupling, never add it: every
 * co-cyclic pair after the pass must have been co-cyclic before it, with the old module
 * names read through the move map. A new cycle, a grown SCC (including a new dir that
 * joins one, such as a parent↔child nesting cycle) and two SCCs merged all add a pair;
 * the pass is refused and the tree rolled back. A file that moves into a module already
 * in an SCC adds no pair.
 */
export function sccGrowth(g0, g1, M, { moduleOf = dirUnits().unitOf, zones = ["src", "demo"], kinds = "static" } = {}) {
    const s0 = moduleSccs(g0, { moduleOf, zones, kinds });
    const s1 = moduleSccs(g1, { moduleOf, zones, kinds });
    const rename = (m) => (M?.dir ? M.dir(m) : m);
    const pairs = (sccs, map = (m) => m) => {
        const out = new Set();
        for (const c of sccs) {
            const ms = [...new Set(c.map(map))].sort();
            for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) out.add(`${ms[i]}\u0000${ms[j]}`);
        }
        return out;
    };
    const p0 = pairs(s0, rename);
    const added = [...pairs(s1)].filter((p) => !p0.has(p)).map((p) => p.split("\u0000"));
    const members = (s) => s.reduce((n, c) => n + c.length, 0);
    const grown = s1.filter((c) => added.some(([a, b]) => c.includes(a) && c.includes(b))).map((scc) => ({ scc, addedPairs: added.filter(([a, b]) => scc.includes(a) && scc.includes(b)).length }));
    return { before: { sccs: s0.length, members: members(s0) }, after: { sccs: s1.length, members: members(s1) }, addedPairs: added.length, firstAdded: added.slice(0, 5), grown };
}

/**
 * runMoves(root, moves, { declaredScanDeltas }) — apply a move list, or refuse.
 *
 * Preflight (nothing written): the tree's graph is clean, the plan is consistent, every
 * reference to a moved file (or out of one) has a rewrite (residue is 0), and every scan
 * delta is declared. A declaration (`scanDeltas: [{ scanner, spec, file | all: true,
 * reason }]`) names one delta exactly or one scanner as a whole; an undeclared delta and a
 * declaration that matches nothing both refuse the run (the ledger rule).
 *
 * Parse (P5-F4): every file the step would write, moved or edited, parses (lib/syntax.mjs),
 * or the step is refused before the first write.
 *
 * Write, then the image check: the new graph must be the old one under the move map, with
 * no violation. A failed image check rolls the tree back byte for byte, so a failed run
 * never leaves a half-applied tree that a rerun would then read as "already applied".
 * Idempotent: a move whose source is gone and whose target exists counts as applied.
 */
export function runMoves(root, moves, { dry = false, deps, declaredScanDeltas = [], declaredGlobDeltas = [], units = dirUnits() } = {}) {
    deps ??= loadDeps(root);
    const g0 = buildGraph(root, { deps });
    if (g0.violations.length) return { ok: false, phase: "preflight", reason: "the tree's graph is not clean", violations: g0.violations };
    const plan = planMoves(g0.tree, moves);
    if (plan.errors.length) return { ok: false, phase: "plan", errors: plan.errors };
    const report = { moves: moves.length, expanded: plan.pending.length + plan.applied.length, pending: plan.pending.length, alreadyApplied: plan.applied.length };
    if (!plan.pending.length) return { ok: true, ...report, filesEdited: 0, rewrites: 0, residue: [], violations: 0, digest: treeDigest(root, g0.tree.files) };
    const M = mapper(g0.tree, plan.pending);
    const { edits, residue, stats } = computeEdits(g0, M, deps);
    const deltas = scanDeltasOf(g0, M);
    const covers = (x, d) => x.scanner === d.scanner && x.spec === d.spec && (x.all === true || x.file === d.file);
    const undeclared = deltas.filter((d) => !declaredScanDeltas.some((x) => covers(x, d)));
    const stale = declaredScanDeltas.filter((x) => !deltas.some((d) => covers(x, d)));
    const scanDeltas = { total: deltas.length, declared: deltas.length - undeclared.length, undeclared, stale };
    // P4-F2: css-source glob deltas, declared like scan deltas (the ledger rule both ways)
    const gd = globDeltasOf(g0, M);
    const gcovers = (x, d) => x.scanner === d.scanner && x.glob === d.glob && x.file === d.file;
    const gUndeclared = gd.filter((d) => !declaredGlobDeltas.some((x) => gcovers(x, d)));
    const gStale = declaredGlobDeltas.filter((x) => !gd.some((d) => gcovers(x, d)));
    const globDeltas = { total: gd.length, declared: gd.length - gUndeclared.length, undeclared: gUndeclared, stale: gStale, carried: gd.filter((d) => !gUndeclared.includes(d)) };
    Object.assign(report, { filesEdited: edits.size, rewrites: stats.rewrites, byKind: stats.byKind, byVia: stats.byVia, dirsMoved: M.dirMap.size });
    // FD-2 in preflight: the image check makes the new graph the old one under M, so the
    // coupling a pass would add is known before anything is written
    const image0 = { edges: g0.edges.map((e) => ({ ...e, from: M.file(e.from), to: e.to ? (e.dir ? M.dir(e.to) : M.any(e.to)) : e.to })), tree: { files: g0.tree.files.map(M.file) } };
    const sccPre = sccGrowth(g0, image0, M, { moduleOf: units.unitOf });
    const preflight = residue.length === 0 && undeclared.length === 0 && stale.length === 0 && gUndeclared.length === 0 && gStale.length === 0 && sccPre.grown.length === 0;
    if (dry || !preflight) return { ok: false, phase: dry ? "dry" : "preflight", preflight, ...report, residue, scanDeltas, globDeltas, scc: sccPre, written: false };
    // write edited contents at their new paths, then remove the old files; keep the originals
    const touched = new Set([...edits.keys(), ...plan.pending.map((m) => m.from)]);
    const original = new Map();
    const contents = new Map();
    for (const f of touched) {
        const bytes = readFileSync(join(root, f));
        original.set(f, bytes);
        contents.set(f, edits.has(f) ? applyEdits(bytes.toString("utf8"), edits.get(f)) : null);
    }
    // P5-F4: every file this step would write is parsed first; one that does not parse
    // refuses the step, with nothing written
    const parse = unparsed(deps, [...touched].map((f) => [M.file(f), contents.get(f) ?? original.get(f)]));
    if (parse.length) return { ok: false, phase: "parse", preflight, ...report, residue, scanDeltas, globDeltas, scc: sccPre, unparsed: parse, written: false };
    for (const m of plan.pending) {
        const dest = join(root, m.to);
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, contents.get(m.from) ?? original.get(m.from));
        unlinkSync(join(root, m.from));
    }
    for (const [f, code] of contents) if (code !== null && !M.fileMap.has(f)) writeFileSync(join(root, f), code);
    const pruned = pruneEmpty(root, plan.pending.map((m) => dirname(m.from)));
    // image check: the new graph must be the old one under the move map
    const g1 = buildGraph(root, { deps });
    const want = new Map();
    for (const e of g0.edges) { const k = sig(e, M); want.set(k, (want.get(k) ?? 0) + 1); }
    // a declared glob delta is the one expected change: the leaving edge is not wanted, the
    // entering edge is (sig: from|kind|target|f|plane, the holder unmoved)
    for (const d of globDeltas.carried) {
        const kinds = new Set(g0.edges.filter((e) => e.from === d.scanner && e.spec === d.glob && e.via === "glob").map((e) => kindClass(e.kind)));
        for (const kind of kinds) {
            if (d.change === "leaves") { const k = `${d.scanner}|${kind}|${d.to}|f|source`; if (want.get(k) > 0) want.set(k, want.get(k) - 1); }
            else { const k = `${d.scanner}|${kind}|${d.to}|f|source`; want.set(k, (want.get(k) ?? 0) + 1); }
        }
    }
    const got = new Map();
    for (const e of g1.edges) { const k = sig(e, null); got.set(k, (got.get(k) ?? 0) + 1); }
    const lost = [...want].filter(([k, n]) => (got.get(k) ?? 0) < n).map(([k]) => k);
    const gained = [...got].filter(([k, n]) => (want.get(k) ?? 0) < n).map(([k]) => k);
    const imageOk = lost.length === 0 && gained.length === 0 && g1.violations.length === 0;
    const image = { edgesBefore: g0.edges.length, edgesAfter: g1.edges.length, lost, gained };
    // FD-2: a pass that grows moduleSccs over the unit function is refused, not logged
    const scc = imageOk ? sccGrowth(g0, g1, M, { moduleOf: units.unitOf }) : null;
    // FD-5 on every engine step (P4-F6): each file the engine wrote must read move-only
    // against its original under the move map, or the step is refused and rolled back
    const classified = imageOk && scc.grown.length === 0 ? classifyImage(g0, g1, M, original, root) : null;
    const ok = imageOk && scc.grown.length === 0 && classified.failed === 0;
    if (!ok) {
        for (const m of plan.pending) { const dest = join(root, m.to); if (existsSync(dest)) unlinkSync(dest); }
        pruneEmpty(root, plan.pending.map((m) => dirname(m.to)));
        for (const [f, bytes] of original) { mkdirSync(dirname(join(root, f)), { recursive: true }); writeFileSync(join(root, f), bytes); }
        return { ok: false, phase: !imageOk ? "image" : scc.grown.length ? "scc" : "classify", rolledBack: true, ...report, residue, scanDeltas, globDeltas, image, scc, classified, violations: g1.violations, digest: treeDigest(root, buildGraph(root, { deps }).tree.files) };
    }
    return { ok, ...report, residue, scanDeltas, globDeltas, pruned, image, scc, classified, violations: g1.violations, digest: treeDigest(root, g1.tree.files) };
}

/** Remove every dir a move emptied, and each parent it empties in turn (P3-F5). Dirs are
 *  visited deepest first and a parent is re-checked after its children, so a parent whose
 *  last entry was an emptied child dir (`aurora/constants/` after `constants/shaders/`) goes too. */
function pruneEmpty(root, dirs) {
    let n = 0;
    const queue = [...new Set(dirs)].sort((a, b) => b.split("/").length - a.split("/").length || (a < b ? -1 : 1));
    const done = new Set();
    while (queue.length) {
        const d = queue.shift();
        if (!d || d === "." || done.has(d)) continue;
        const abs = join(root, d);
        if (!existsSync(abs) || !statSync(abs).isDirectory() || readdirSync(abs).length) continue;
        rmdirSync(abs);
        done.add(d);
        n++;
        const parent = dirname(d);
        if (parent && parent !== ".") queue.push(parent);
    }
    return n;
}
