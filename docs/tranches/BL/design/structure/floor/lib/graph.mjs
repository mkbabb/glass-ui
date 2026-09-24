// graph.mjs — F-1: the one import graph. Full TS AST for scripts, @vue/compiler-sfc for
// SFCs, postcss for CSS, a tokenizer for JSON, shell and HTML. Every reference resolves
// to a file (or a directory, a declared external, or a generated output), or it is a
// violation: the graph fails closed.
import { createRequire } from "node:module";
import { posix } from "node:path";
import { floorHome, ledgerPath, openTree, zoneOf } from "./tree.mjs";
import { dirUnits } from "./placement.mjs";
import { loadRecord, publishedPathOf } from "./entries.mjs";
import { discoverAliases, expandGlob, globToRegex, isGenerated, makeResolver } from "./resolve.mjs";
import { makeEvaluator } from "./evaluate.mjs";
import { scanCss } from "./scan/css.mjs";
import { scanScript } from "./scan/script.mjs";
import { scanHtml, scanJson, scanSh, scanYaml } from "./scan/text.mjs";
import { scanVue } from "./scan/vue.mjs";

const SCRIPT = /\.(ts|tsx|mts|cts|js|mjs|cjs|jsx)$/;
/** Module edge kinds a `src` file may not spell by the package's own name (P3-F3). */
const SELF_NAME_BANNED = /^(import|import-type|import-side-effect|import-type-node|reexport|reexport-star|reexport-ns|dynamic|require|vi-mock|(sfc-inline-)?css-(import|reference))$/;
/** Edge kinds that carry a value dependency (an evaluated module edge). */
export const VALUE_KINDS = new Set(["import", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "require", "sfc-script-src"]);

export function loadDeps(root) {
    const req = createRequire(`${root}/package.json`);
    return { ts: req("typescript"), postcss: req("postcss"), sfc: req("@vue/compiler-sfc") };
}

export function buildGraph(root, { overlay = {}, deps } = {}) {
    const tree = openTree(root, { overlay });
    deps ??= loadDeps(tree.root);
    const { ts, postcss, sfc } = deps;
    const record = loadRecord(tree);
    const { aliases, conflicts } = discoverAliases(tree, ts, makeEvaluator);
    const R = makeResolver(tree, { aliases, record });
    let ledger = { entries: [] };
    try { ledger = JSON.parse(tree.read(ledgerPath(tree.root))); } catch { /* absent ledger = empty */ }
    const ledgerUsed = new Set();
    const recordsDir = `${floorHome(tree.root)}/records/`;
    const edges = [];
    const violations = [];
    const census = [];
    const exportsOf = new Map();
    const refsOf = new Map();
    const ctx = { root: tree.root, abs: (p) => tree.abs(p) };
    let negations = [];
    /** A program pattern (a tsconfig include/exclude/files glob, a vite/vitest include) and a
     *  negated `@source` are collection patterns, not claims: an empty match is legal. Each
     *  keeps one edge to its static head dir (which must exist), plus one per matched file
     *  (FD-7: the first `__tests__/` file then joins a pattern instead of staling a ledger row). */
    const PROGRAM_CONFIG = /^(tsconfig[^/]*\.json|vite[^/]*\.ts|vitest[^/]*\.ts)$/;
    const programPattern = (from, ref) => (PROGRAM_CONFIG.test(from) && (ref.kind === "json-glob" || ref.kind === "glob-literal")) || (ref.cssSource && ref.negated);
    const headDir = (pattern) => { const i = pattern.search(/[*{?]/); const head = i === -1 ? pattern : pattern.slice(0, pattern.lastIndexOf("/", i)); return head.replace(/\/$/, "") || "."; };
    const publishedJs = record.js.map(([name, source]) => ({ dist: name === "index" ? "dist/glass-ui.js" : `dist/${name}.js`, source }));

    for (const f of tree.parsed) {
        let code;
        try { code = tree.read(f); } catch { continue; }
        let out = { refs: [] };
        try {
            if (f.endsWith(".vue")) out = scanVue(ts, postcss, sfc, f, code, ctx);
            else if (SCRIPT.test(f)) out = scanScript(ts, f, code, 0, ctx);
            else if (f.endsWith(".css")) out = scanCss(postcss, f, code, 0);
            else if (f.endsWith(".json")) out = scanJson(f, code, { records: recordsDir });
            else if (f.endsWith(".sh")) out = scanSh(f, code);
            else if (f.endsWith(".html")) out = scanHtml(f, code);
            else if (/\.ya?ml$/.test(f)) out = scanYaml(f, code);
        } catch (e) {
            violations.push({ kind: "parse-error", from: f, spec: String(e.message).slice(0, 160) });
            continue;
        }
        if (out.exp) exportsOf.set(f, out.exp);
        const fileEdges = [];
        refsOf.set(f, fileEdges);
        // P3-R6: a negated `@source not "…"` subtracts its matches from the same sheet's scans
        negations = out.refs.filter((r) => r.cssSource && r.negated).map((r) => globToRegex(expandRefGlob(f, r).pattern));
        const later = [];
        // text-anchored forms resolve last: they need the set of files this file reads
        const deferred = (r) => r.mode === "embedded" || r.mode === "based" || (r.mode === "path" && r.bareLiteral && !r.claim && !r.zoneRooted && !r.write && r.spec.startsWith("."));
        out.refs.forEach((ref, i) => { ref.index = i; if (deferred(ref)) later.push(ref); else resolveRef(f, code, ref, fileEdges); });
        for (const ref of later) {
            if (ref.mode === "embedded") resolveEmbedded(f, code, ref, fileEdges);
            else if (ref.mode === "based") resolveBased(f, code, ref, fileEdges);
            else resolveRelative(f, code, ref, fileEdges);
        }
    }

    function lineOf(code, off) {
        let n = 1;
        for (let i = 0; i < off && i < code.length; i++) if (code.charCodeAt(i) === 10) n++;
        return n;
    }
    function add(from, code, ref, target, fileEdges) {
        const e = {
            from,
            to: target.to ?? null,
            kind: ref.kind,
            via: target.via,
            spec: ref.spec,
            line: lineOf(code, ref.start),
            start: ref.start,
            end: ref.end,
            spans: ref.spans ?? [],
            anchor: ref.anchor ?? null,
            suffix: ref.suffix ?? null,
            names: ref.names,
            typeOnly: !!ref.typeOnly,
            dir: !!target.dir,
            generated: target.generated ?? null,
            output: target.output ?? null,
            anchorFile: target.anchorFile ?? null,
            anchorDir: target.anchorDir ?? null,
            external: target.external ?? null,
            glob: target.glob ?? null,
            plane: target.plane ?? "source",
            mode: ref.mode,
            rooted: !!ref.rooted,
            refIndex: ref.index,
        };
        edges.push(e);
        fileEdges.push(e);
        return e;
    }
    function violate(from, code, ref, kind, extra = {}) {
        violations.push({ kind, edgeKind: ref.kind, from, line: lineOf(code, ref.start), spec: ref.spec, ...extra });
    }
    function ledgered(from, ref) {
        const i = (ledger.entries ?? []).findIndex((x) => x.file === from && x.kind === ref.kind && x.spec === ref.spec);
        if (i >= 0) ledgerUsed.add(i);
        return i >= 0;
    }

    function resolveRef(from, code, ref, fileEdges) {
        if (ref.mode === "error") return violate(from, code, ref, ref.kind);
        if (ref.absent && (ref.mode === "path" || ref.mode === "abs")) {
            const r = ref.mode === "abs" ? R.absPath(ref.abs) : R.path(from, ref.spec, { rootFirst: !!ref.rootFirst });
            if (r && !r.error) return violate(from, code, ref, "absence-present", { target: r.to });
            return add(from, code, { ...ref, kind: "absence" }, { via: "absence", external: `absent:${ref.mode === "abs" ? tree.rel(ref.abs) : ref.spec}` }, fileEdges);
        }
        if (ref.mode === "census") return census.push({ from, line: lineOf(code, ref.start), kind: ref.kind, spec: ref.spec, ...(ref.base !== undefined ? { base: ref.base } : {}) });
        if (ref.mode === "npm-script") {
            // FD-10: `npm run x` in CI names a package script; a missing one is a violation
            const pkg = ref.workspace ? `${ref.workspace.replace(/\/$/, "")}/package.json` : "package.json";
            let scripts = null;
            try { scripts = JSON.parse(tree.read(pkg)).scripts ?? {}; } catch { /* no such package */ }
            if (!scripts || !Object.prototype.hasOwnProperty.call(scripts, ref.spec)) return violate(from, code, ref, "unresolved", { target: `${pkg}#scripts.${ref.spec}` });
            return add(from, code, ref, { via: "npm-script", to: pkg }, fileEdges);
        }
        if (ref.mode === "opaque") {
            if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "opaque(ledgered)" }, fileEdges);
            return violate(from, code, ref, "opaque");
        }
        if (ref.mode === "module") {
            const r = R.module(from, ref.spec);
            if (r.error) return violate(from, code, ref, r.error);
            // P3-F3: library source never imports its own package by name (a second path to a
            // file it can reach relatively). A shipped sheet's url() of a published asset is
            // not an import and stays an edge.
            if (r.via === "self-name" && zoneOf(from) === "src" && SELF_NAME_BANNED.test(ref.kind)) return violate(from, code, ref, "self-name-in-src", { target: r.to ?? r.generated });
            return add(from, code, ref, r, fileEdges);
        }
        if (ref.mode === "url") {
            const r = R.path(from, ref.spec);
            if (!r || r.error || r.via !== "file-relative") return violate(from, code, ref, "unresolved");
            return add(from, code, ref, { ...r, via: "new-url" }, fileEdges);
        }
        if (ref.mode === "path") {
            const r = R.path(from, ref.spec, { rootFirst: !!ref.rootFirst });
            if (!r) return;
            if (r.error) {
                if (ref.write) return add(from, code, ref, { via: "write", output: ref.spec }, fileEdges);
                if (ref.claim || ref.zoneRooted) {
                    if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "phantom(ledgered)" }, fileEdges);
                    return violate(from, code, ref, "unresolved");
                }
                return census.push({ from, line: lineOf(code, ref.start), kind: "unverified-relative", spec: ref.spec });
            }
            return add(from, code, ref, r, fileEdges);
        }
        if (ref.mode === "abs") {
            const r = R.absPath(ref.abs);
            if (r.error) {
                if (ref.write) return add(from, code, ref, { via: "write", output: r.base }, fileEdges);
                if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "phantom(ledgered)" }, fileEdges);
                return violate(from, code, ref, "unresolved", { target: r.base });
            }
            return add(from, code, ref, r, fileEdges);
        }
        if (ref.mode === "scan" && ref.write) return add(from, code, ref, { via: "write", output: tree.rel(ref.abs) }, fileEdges);
        if (ref.mode === "scan") {
            const rel = tree.rel(ref.abs);
            if (rel.startsWith("..")) return add(from, code, ref, { via: "outside", external: ref.abs }, fileEdges);
            const r0 = rel === "" ? "." : rel.replace(/\/$/, "");
            // a segment-boundary prefix names its dir exactly; only a mid-name prefix falls to its dir
            const base = ref.boundary ? r0 : tree.isDir(r0) || tree.isFile(r0) ? r0 : posix.dirname(r0);
            if (tree.isFile(base)) return add(from, code, ref, { via: "scan", to: base }, fileEdges);
            if (!tree.isDir(base)) {
                if (isGenerated(posix.normalize(base))) return add(from, code, ref, { via: "generated", generated: base }, fileEdges);
                if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "phantom(ledgered)" }, fileEdges);
                return violate(from, code, ref, "scan-base-missing", { target: rel });
            }
            return add(from, code, ref, { via: "scan", to: base, dir: true }, fileEdges);
        }
        if (ref.mode === "maybe-module") {
            const r = R.module(from, ref.spec);
            if (r.error || r.external) return census.push({ from, line: lineOf(code, ref.start), kind: "specifier-mention", spec: ref.spec });
            return add(from, code, { ...ref, mode: "module" }, r, fileEdges);
        }
        if (ref.mode === "hbase") {
            // a read helper's base: a dir that exists, a generated root, or outside the repo;
            // a helper over a dir that is gone is a violation even when nothing calls it yet
            const r = R.absPath(ref.abs);
            if (r.dir) return add(from, code, ref, { via: "anchored", to: r.to, dir: true }, fileEdges);
            if (r.external || r.generated) return;
            if (r.to) return; // a file prefix: the helper appends a suffix, its calls are the edges
            if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "phantom(ledgered)" }, fileEdges);
            return violate(from, code, ref, "helper-base-missing", { target: r.base });
        }
        if (ref.mode === "tscan") {
            // a template head: file-relative when spelled relative, else root-relative (both tried
            // for `./`, since tests read cwd-relative); the base must be a dir that exists
            const h = ref.head;
            const cands = h.startsWith(".") ? [posix.normalize(posix.join(posix.dirname(from), h)), posix.normalize(h.replace(/^(\.\.?\/)+/, ""))] : [posix.normalize(h.replace(/^\//, ""))];
            const hit = cands.find((d) => !d.startsWith("../") && tree.isDir(d));
            if (ref.write) return add(from, code, ref, { via: "write", output: hit ?? cands[0] }, fileEdges);
            if (hit) return add(from, code, ref, { via: "scan", to: hit, dir: true }, fileEdges);
            const gen = cands.find((d) => isGenerated(d));
            if (gen) return add(from, code, ref, { via: "generated", generated: gen }, fileEdges);
            if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "phantom(ledgered)" }, fileEdges);
            return violate(from, code, ref, "scan-base-missing", { target: cands.join(" | ") });
        }
        if (ref.mode === "glob") {
            const { pattern, matches: all, plane } = expandRefGlob(from, ref);
            // a negation that names a dir (`@source not "../src/**/__tests__"`) excludes everything under it
            const negated = (m) => { for (let d = m; d.includes("/"); d = posix.dirname(d)) if (negations.some((re) => re.test(d))) return true; return false; };
            const matches = ref.cssSource && !ref.negated && negations.length ? all.filter((m) => !negated(m)) : all;
            if (programPattern(from, ref)) {
                const head = headDir(pattern);
                if (!tree.isDir(head)) return violate(from, code, ref, "scan-base-missing", { target: head, pattern });
                add(from, code, ref, { via: "program-glob", to: head, dir: true, glob: pattern }, fileEdges);
                if (ref.negated) return; // an exclusion reads nothing
                for (const m of matches) add(from, code, ref, { via: "glob", to: m, glob: pattern, plane }, fileEdges);
                return;
            }
            if (!matches.length && [pattern, ref.spec.replace(/^\.?\//, "")].some((x) => isGenerated(posix.normalize(x))))
                return add(from, code, ref, { via: "generated", generated: pattern }, fileEdges);
            if (!matches.length) {
                if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "empty-glob(ledgered)", glob: pattern }, fileEdges);
                return violate(from, code, ref, "empty-glob", { pattern });
            }
            for (const m of matches) add(from, code, ref, { via: "glob", to: m, glob: pattern, plane }, fileEdges);
        }
    }

    /** An embedded path is source text a file asserts about another file it reads. It
     *  resolves against the read files whose own text carries it (the file it quotes), or the
     *  root when zone-rooted. One target is an edge anchored at that file, so a move of either
     *  end rewrites it; two targets are a violation; none is census (a synthetic fixture, an
     *  absence assertion, or dist-relative text). */
    function resolveEmbedded(from, code, ref, fileEdges) {
        const hits = [];
        if (!ref.spec.startsWith(".")) { if (tree.isFile(ref.spec)) hits.push({ to: ref.spec, anchorFile: null }); }
        else {
            // an anchor is a file this file reads whose own text carries the quoted path
            const quotes = [`"${ref.spec}"`, `'${ref.spec}'`, `(${ref.spec})`];
            const carries = (a) => { try { const t = tree.read(a); return quotes.some((q) => t.includes(q)); } catch { return false; } };
            const anchors = [...new Set(fileEdges.filter((e) => e.to && !e.dir && tree.isFile(e.to)).map((e) => e.to))].filter(carries);
            for (const a of anchors) {
                const t = posix.normalize(posix.join(posix.dirname(a), ref.spec));
                if (!t.startsWith("../") && tree.isFile(t)) hits.push({ to: t, anchorFile: a });
            }
        }
        const targets = [...new Set(hits.map((h) => h.to))];
        if (targets.length === 1) return add(from, code, ref, { via: "embedded", to: hits[0].to, anchorFile: hits[0].anchorFile }, fileEdges);
        if (targets.length > 1) {
            if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "ambiguous(ledgered)" }, fileEdges);
            return violate(from, code, ref, "embedded-ambiguous", { target: targets.join(" | ") });
        }
        census.push({ from, line: lineOf(code, ref.start), kind: "embedded-unresolved", spec: ref.spec });
    }

    /** The files this file reads whose own text carries `spec` after a delimiter: the
     *  files a quoted or searched path string can be relative to. */
    function textAnchors(fileEdges, spec) {
        const needles = [`"${spec}"`, `'${spec}'`, `(${spec})`, `/${spec}`];
        const carries = (a) => { try { const t = tree.read(a); return needles.some((q) => t.includes(q)); } catch { return false; } };
        return [...new Set(fileEdges.filter((e) => e.to && !e.dir && tree.isFile(e.to)).map((e) => e.to))].filter(carries);
    }

    /** A bare relative path resolves against the dirs this file names, scans or reads
     *  through a helper (never the root: a bare string that happens to match from the root
     *  is not claimed), else against a read file whose text carries it (a substring search
     *  over that file's imports). One target is an edge; two are a violation; none is census
     *  (a package subpath, a MIME type, a dist name, prose). */
    function resolveBased(from, code, ref, fileEdges) {
        const bases = [...new Set(fileEdges.filter((e) => e.to && e.dir && e.to !== ".").map((e) => e.to))];
        let hits = bases.map((b) => ({ anchorDir: b, to: posix.normalize(posix.join(b, ref.spec)) })).filter((h) => tree.isFile(h.to));
        if (!hits.length) hits = textAnchors(fileEdges, ref.spec).map((a) => ({ anchorFile: a, to: posix.normalize(posix.join(posix.dirname(a), ref.spec)) })).filter((h) => tree.isFile(h.to));
        const targets = [...new Set(hits.map((h) => h.to))];
        if (targets.length === 1) return add(from, code, ref, { via: "based", to: hits[0].to, anchorDir: hits[0].anchorDir, anchorFile: hits[0].anchorFile }, fileEdges);
        if (targets.length > 1) {
            if (ledgered(from, ref)) return add(from, code, ref, { via: "ledger", external: "ambiguous(ledgered)" }, fileEdges);
            return violate(from, code, ref, "based-ambiguous", { target: targets.join(" | ") });
        }
        census.push({ from, line: lineOf(code, ref.start), kind: "based-unresolved", spec: ref.spec });
    }

    /** A relative literal that names nothing from its own file: resolved from the root as
     *  before, else against a read file whose text quotes it (an expected import spelling). */
    function resolveRelative(from, code, ref, fileEdges) {
        const r = R.path(from, ref.spec, { rootFirst: !!ref.rootFirst });
        if (r && !r.error) return add(from, code, ref, r, fileEdges);
        const anchors = textAnchors(fileEdges, ref.spec);
        const hits = anchors.map((a) => ({ anchorFile: a, to: posix.normalize(posix.join(posix.dirname(a), ref.spec)) })).filter((h) => !h.to.startsWith("../") && tree.isFile(h.to));
        const targets = [...new Set(hits.map((h) => h.to))];
        if (targets.length === 1) return add(from, code, { ...ref, mode: "embedded", kind: "quoted-relative" }, { via: "embedded", to: hits[0].to, anchorFile: hits[0].anchorFile }, fileEdges);
        if (targets.length > 1) return violate(from, code, ref, "embedded-ambiguous", { target: targets.join(" | ") });
        census.push({ from, line: lineOf(code, ref.start), kind: "unverified-relative", spec: ref.spec });
    }

    function expandRefGlob(from, ref) {
        const spec = ref.spec.replace(/[?#].*$/, "");
        const hasGlob = /[*{]/.test(spec);
        let pattern;
        const alias = aliases.find((a) => spec.startsWith(`${a.key}/`));
        if (alias) pattern = posix.join(alias.target, spec.slice(alias.key.length + 1));
        else if (ref.rootFirst && !spec.startsWith(".")) pattern = spec.replace(/^\//, "");
        else pattern = posix.normalize(posix.join(posix.dirname(from), spec));
        if (ref.kind.endsWith("-template") && !alias) pattern = posix.normalize(posix.join(posix.dirname(from), spec));
        if (!hasGlob && ref.cssSource) pattern = tree.isDir(pattern) ? `${pattern}/**` : pattern;
        let matches = pattern.startsWith("../") ? [] : expandGlob(tree, pattern);
        if (ref.rootFirst && !matches.length && !spec.startsWith(".")) {
            const alt = posix.normalize(posix.join(posix.dirname(from), spec));
            if (!alt.startsWith("../")) { const m = expandGlob(tree, alt); if (m.length) { pattern = alt; matches = m; } }
        }
        if (!matches.length && ref.cssSource && from.startsWith("src/")) {
            // a shipped stylesheet's @source reads the PUBLISHED layout: match dist names back to entry sources
            const distPattern = posix.normalize(posix.join(posix.dirname(publishedPathOf(record, from)), spec));
            const re = globToRe(distPattern);
            const hits = publishedJs.filter((p) => re.test(p.dist)).map((p) => p.source);
            if (hits.length) return { pattern: distPattern, matches: hits, plane: "published" };
        }
        return { pattern, matches, plane: "source" };
    }

    for (const c of conflicts) violations.push({ kind: "alias-conflict", from: c.planes.map((p) => p.plane).join(","), spec: c.key });
    (ledger.entries ?? []).forEach((x, i) => { if (!ledgerUsed.has(i)) violations.push({ kind: "ledger-stale", from: x.file, spec: x.spec, edgeKind: x.kind }); });

    return { tree, record, aliases, edges, violations, census, exportsOf, refsOf };
}

function globToRe(p) {
    return new RegExp(`^${p.replace(/[.+^$()|[\]\\]/g, "\\$&").replace(/\*\*\//g, "(?:[^/]+/)*").replace(/\*/g, "[^/]*")}$`);
}

export function countBy(list, key) {
    const out = {};
    for (const x of list) { const k = typeof key === "function" ? key(x) : x[key]; out[k] = (out[k] ?? 0) + 1; }
    return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

/** Strongly connected components over value edges inside one zone (Tarjan). */
export function valueSccs(graph, zone = "src") {
    const adj = new Map();
    for (const e of graph.edges) {
        if (!VALUE_KINDS.has(e.kind) || e.typeOnly || !e.to || zoneOf(e.from) !== zone || zoneOf(e.to) !== zone) continue;
        if (!adj.has(e.from)) adj.set(e.from, new Set());
        adj.get(e.from).add(e.to);
    }
    let index = 0;
    const idx = new Map(), low = new Map(), on = new Set(), stack = [], out = [];
    const strong = (v) => {
        idx.set(v, index); low.set(v, index); index++; stack.push(v); on.add(v);
        for (const w of adj.get(v) ?? []) {
            if (!idx.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
            else if (on.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
        }
        if (low.get(v) === idx.get(v)) {
            const comp = [];
            let w;
            do { w = stack.pop(); on.delete(w); comp.push(w); } while (w !== v);
            if (comp.length > 1) out.push(comp.sort());
        }
    };
    for (const v of adj.keys()) if (!idx.has(v)) strong(v);
    return out;
}

/** The load-order edges: value + dynamic + glob + SFC block src + CSS. */
export const RUNTIME_KINDS = new Set([...VALUE_KINDS, "dynamic", "glob", "sfc-style-src", "sfc-template-src", "css-import", "css-url", "sfc-inline-css-import"]);

/** SCCs at a grain (`moduleOf`, R-2's dir units by default) over src + demo. `kinds`:
 *  "static" = value edges only, "runtime" = value + dynamic + glob + SFC block src + CSS. */
export function moduleSccs(graph, { moduleOf = dirUnits().unitOf, kinds: which = "static", zones = ["src", "demo"] } = {}) {
    const kinds = which === "runtime" ? RUNTIME_KINDS : VALUE_KINDS;
    const adj = new Map();
    for (const e of graph.edges) {
        if (!kinds.has(e.kind) || e.typeOnly || !e.to || e.dir) continue;
        if (!zones.includes(zoneOf(e.from)) || !zones.includes(zoneOf(e.to))) continue;
        const a = moduleOf(e.from);
        const b = moduleOf(e.to);
        if (a === b) continue;
        if (!adj.has(a)) adj.set(a, new Set());
        adj.get(a).add(b);
    }
    return tarjan(adj);
}

export function tarjan(adj) {
    let index = 0;
    const idx = new Map(), low = new Map(), on = new Set(), stack = [], out = [];
    const strong = (v) => {
        idx.set(v, index); low.set(v, index); index++; stack.push(v); on.add(v);
        for (const w of adj.get(v) ?? []) {
            if (!idx.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
            else if (on.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
        }
        if (low.get(v) === idx.get(v)) {
            const comp = [];
            let w;
            do { w = stack.pop(); on.delete(w); comp.push(w); } while (w !== v);
            if (comp.length > 1) out.push(comp.sort());
        }
    };
    for (const v of adj.keys()) if (!idx.has(v)) strong(v);
    return out.sort((a, b) => b.length - a.length);
}
