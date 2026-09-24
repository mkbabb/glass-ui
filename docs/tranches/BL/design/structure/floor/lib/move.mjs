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
import { buildGraph, loadDeps } from "./graph.mjs";

const EXT = /\.(d\.ts|ts|tsx|mts|cts|js|mjs|cjs|jsx|vue|css|json)$/;

export function expandMoves(tree, moves) {
    const out = [];
    for (const m of moves) {
        if (m.from.endsWith("/")) {
            const base = m.from.replace(/\/$/, "");
            const dest = m.to.replace(/\/$/, "");
            const members = tree.files.filter((f) => f.startsWith(`${base}/`));
            if (members.length) for (const f of members) out.push({ from: f, to: `${dest}/${f.slice(base.length + 1)}` });
            else if (tree.isDir(dest)) out.push({ from: m.from, to: m.to, applied: true, dir: true });
            else throw new Error(`move: directory ${m.from} is empty and ${m.to} does not exist`);
        } else out.push({ from: m.from, to: m.to });
    }
    return out;
}

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
        const target = e.to ?? e.output ?? null;
        const toNew = target === null ? null : e.dir ? M.dir(target) : M.any(target);
        const fromMoved = fromNew !== e.from;
        const toMoved = target !== null && toNew !== target;
        const anchorMoved = (!!e.anchorFile && M.file(e.anchorFile) !== e.anchorFile) || (!!e.anchorDir && M.dir(e.anchorDir) !== e.anchorDir);
        if (!fromMoved && !toMoved && !anchorMoved) continue;
        if (e.via === "package" || e.via === "builtin" || e.via === "url" || e.via === "self-name" || e.via === "ledger" || e.via === "generated" || e.via === "absence") continue;
        if (e.kind === "helper-base") continue; // a base marker: the helper's own literals carry the spelling
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
            replaceOne(rel);
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
            const lead = e.via === "root-absolute" ? "/" : (bare.match(/^(\.\.\/)*/)?.[0] ?? "");
            replaceOne(`${lead}${toNew}${bare.endsWith("/") ? "/" : ""}${query}`);
            continue;
        }
        if (e.mode === "abs") {
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
    return `${map ? map.file(e.from) : e.from}|${e.kind}|${target}|${e.dir ? "d" : "f"}|${e.plane}`;
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
 * runMoves(root, moves, { declaredScanDeltas }) — apply a move list, or refuse.
 *
 * Preflight (nothing written): the tree's graph is clean, the plan is consistent, every
 * reference to a moved file (or out of one) has a rewrite (residue is 0), and every scan
 * delta is declared. A declaration (`scanDeltas: [{ scanner, spec, file | all: true,
 * reason }]`) names one delta exactly or one scanner as a whole; an undeclared delta and a
 * declaration that matches nothing both refuse the run (the ledger rule).
 *
 * Write, then the image check: the new graph must be the old one under the move map, with
 * no violation. A failed image check rolls the tree back byte for byte, so a failed run
 * never leaves a half-applied tree that a rerun would then read as "already applied".
 * Idempotent: a move whose source is gone and whose target exists counts as applied.
 */
export function runMoves(root, moves, { dry = false, deps, declaredScanDeltas = [] } = {}) {
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
    Object.assign(report, { filesEdited: edits.size, rewrites: stats.rewrites, byKind: stats.byKind, byVia: stats.byVia, dirsMoved: M.dirMap.size });
    const preflight = residue.length === 0 && undeclared.length === 0 && stale.length === 0;
    if (dry || !preflight) return { ok: false, phase: dry ? "dry" : "preflight", preflight, ...report, residue, scanDeltas, written: false };
    // write edited contents at their new paths, then remove the old files; keep the originals
    const touched = new Set([...edits.keys(), ...plan.pending.map((m) => m.from)]);
    const original = new Map();
    const contents = new Map();
    for (const f of touched) {
        const bytes = readFileSync(join(root, f));
        original.set(f, bytes);
        contents.set(f, edits.has(f) ? applyEdits(bytes.toString("utf8"), edits.get(f)) : null);
    }
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
    const got = new Map();
    for (const e of g1.edges) { const k = sig(e, null); got.set(k, (got.get(k) ?? 0) + 1); }
    const lost = [...want].filter(([k, n]) => (got.get(k) ?? 0) < n).map(([k]) => k);
    const gained = [...got].filter(([k, n]) => (want.get(k) ?? 0) < n).map(([k]) => k);
    const ok = lost.length === 0 && gained.length === 0 && g1.violations.length === 0;
    const image = { edgesBefore: g0.edges.length, edgesAfter: g1.edges.length, lost, gained };
    if (!ok) {
        for (const m of plan.pending) { const dest = join(root, m.to); if (existsSync(dest)) unlinkSync(dest); }
        pruneEmpty(root, plan.pending.map((m) => dirname(m.to)));
        for (const [f, bytes] of original) { mkdirSync(dirname(join(root, f)), { recursive: true }); writeFileSync(join(root, f), bytes); }
        return { ok: false, phase: "image", rolledBack: true, ...report, residue, scanDeltas, image, violations: g1.violations, digest: treeDigest(root, buildGraph(root, { deps }).tree.files) };
    }
    return { ok, ...report, residue, scanDeltas, pruned, image, violations: g1.violations, digest: treeDigest(root, g1.tree.files) };
}

function pruneEmpty(root, dirs) {
    let n = 0;
    const seen = new Set();
    for (let d of dirs) {
        while (d && d !== "." && !seen.has(d)) {
            seen.add(d);
            const abs = join(root, d);
            if (!existsSync(abs) || !statSync(abs).isDirectory() || readdirSync(abs).length) break;
            rmdirSync(abs);
            n++;
            d = dirname(d);
        }
    }
    return n;
}
