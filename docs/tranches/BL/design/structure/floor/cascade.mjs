#!/usr/bin/env node
// cascade.mjs — F-4: the cascade contract.
//   contract [--root R]                          source half: the entry record declares a
//                                                 terminal; it is the last @import of the
//                                                 ./styles source and has one importer
//   snapshot --dist D --out DIR [--sha S]        the named baseline: each published CSS
//                                                 entry flattened to its ordered leaf rules
//   verify --baseline DIR --dist D               move-only check: every entry's sequence is
//          [--reorders listed.json]              identical to the baseline, or exit 1 with
//          [--browser seat-report.json]…         the first divergence and its class. A
//                                                 LISTED reorder ({"reorders": [{"entry",
//                                                 "moved": [rule…], "reason"}]}) names the
//                                                 rule set it reviewed (P5-F3): a moved rule
//                                                 outside it is unlisted, a listed rule that
//                                                 did not move is stale. It is then judged
//                                                 pair by pair (P4-F7): GREEN only when no
//                                                 swapped pair can change a value, or a band
//                                                 spec that reads it ran
// Flattening inlines relative @imports depth-first (layer()/supports()/media wrap the
// inlined sheet), and normalises Vue scope ids, hashed v-bind vars and scoped @keyframes
// suffixes (FD-4) by first appearance, so a pure move reads identical while any reorder
// or content change reads RED.
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_ROOT, openTree } from "./lib/tree.mjs";
import { classRecipes, classOwners, coOccurrence, impliedBy } from "./lib/recipes.mjs";

export function cssEntries(root) {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    return Object.entries(pkg.exports)
        .filter(([, v]) => typeof v === "string" && v.endsWith(".css"))
        .map(([key, v]) => ({ key, file: v.replace(/^\.\/dist\//, "") }));
}

export function flatten(postcss, file, seen = []) {
    if (seen.includes(file)) return postcss.parse(`/* cycle ${file} */`);
    const root = postcss.parse(readFileSync(file, "utf8"), { from: file });
    root.walkAtRules("import", (at) => {
        const m = /^\s*(?:url\(\s*)?["']([^"']+)["']\s*\)?\s*(.*)$/.exec(at.params);
        if (!m || !m[1].startsWith(".")) return;
        const target = resolve(dirname(file), m[1]);
        if (!existsSync(target)) { at.replaceWith(postcss.comment({ text: `MISSING ${m[1]}` })); return; }
        let body = flatten(postcss, target, [...seen, file]);
        let tail = m[2].trim();
        const wrap = (name, params) => { const w = postcss.atRule({ name, params }); w.append(body.nodes); body = postcss.root(); body.append(w); };
        const layer = /^layer(?:\(([^)]*)\))?/.exec(tail);
        if (layer) { tail = tail.slice(layer[0].length).trim(); }
        const supports = /^supports\(([^)]*)\)/.exec(tail);
        if (supports) { tail = tail.slice(supports[0].length).trim(); }
        if (tail) wrap("media", tail);
        if (supports) wrap("supports", `(${supports[1]})`);
        if (layer) wrap("layer", layer[1] ?? "");
        at.replaceWith(body.nodes);
    });
    return root;
}

export function leafSequence(postcss, root) {
    const out = [];
    const ctxOf = (n) => { const c = []; let p = n.parent; while (p && p.type !== "root") { c.unshift(p.type === "atrule" ? `@${p.name} ${p.params}`.trim() : p.selector); p = p.parent; } return c.join(" > "); };
    const decls = (n) => (n.nodes ?? []).filter((d) => d.type === "decl").map((d) => `${d.prop}:${d.value}${d.important ? "!important" : ""}`).join(";");
    root.walk((n) => {
        if (n.type === "rule") out.push(`${ctxOf(n)} :: ${n.selector.replace(/\s+/g, " ")} {${decls(n)}}`);
        else if (n.type === "atrule" && (!n.nodes || n.nodes.some((d) => d.type === "decl"))) out.push(`${ctxOf(n)} :: @${n.name} ${n.params}${n.nodes ? ` {${decls(n)}}` : ""}`);
        else if (n.type === "decl" && n.parent.type === "atrule" && n.parent.nodes.every((d) => d.type !== "rule")) { /* folded into its at-rule */ }
    });
    const ids = new Map();
    const vars = new Map();
    const seq = out.map((line) =>
        line
            .replace(/data-v-([0-9a-f]{8})/g, (_, h) => { if (!ids.has(h)) ids.set(h, ids.size + 1); return `data-v-#${ids.get(h)}`; })
            .replace(/--([0-9a-f]{8})-/g, (_, h) => { if (!vars.has(h)) vars.set(h, vars.size + 1); return `--#${vars.get(h)}-`; }),
    );
    return scopedKeyframes(seq);
}

/**
 * FD-4 · Vue's scoped `@keyframes` suffix. A scoped SFC renames `@keyframes x` to
 * `x-<8hex>`, the hash derived from the SFC's path and source, so a pure move reads as
 * changed rules. Every name the sequence declares with `@keyframes` and that carries an
 * 8-hex suffix is renamed `x-#N` by order of first declaration, and the same map is
 * applied to every use (`animation`, `animation-name`). Unscoped names are untouched.
 */
export function scopedKeyframes(seq) {
    const names = new Map();
    for (const line of seq) for (const m of line.matchAll(/@keyframes ([A-Za-z0-9_-]+?)-([0-9a-f]{8})(?![0-9A-Za-z_-])/g)) {
        const full = `${m[1]}-${m[2]}`;
        if (!names.has(full)) names.set(full, `${m[1]}-#${names.size + 1}`);
    }
    if (!names.size) return seq;
    const re = new RegExp(`(?<![0-9A-Za-z_-])(${[...names.keys()].join("|")})(?![0-9A-Za-z_-])`, "g");
    return seq.map((line) => line.replace(re, (x) => names.get(x)));
}

export function snapshotDist(root, dist) {
    const postcss = createRequire(join(root, "package.json"))("postcss");
    const entries = {};
    for (const { key, file } of cssEntries(root)) {
        if (file.includes("*")) continue;
        const seq = leafSequence(postcss, flatten(postcss, join(dist, file)));
        entries[key] = { file, rules: seq.length, sha256: createHash("sha256").update(seq.join("\n")).digest("hex"), seq };
    }
    return entries;
}

export function compare(base, now) {
    const out = [];
    for (const key of new Set([...Object.keys(base), ...Object.keys(now)])) {
        const a = base[key]?.seq ?? [];
        const b = now[key]?.seq ?? [];
        if (base[key]?.sha256 === now[key]?.sha256) { out.push({ key, identical: true, rules: a.length }); continue; }
        let i = 0;
        while (i < a.length && i < b.length && a[i] === b[i]) i++;
        const count = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());
        const ca = count(a), cb = count(b);
        let onlyA = 0, onlyB = 0;
        for (const [x, n] of ca) onlyA += Math.max(0, n - (cb.get(x) ?? 0));
        for (const [x, n] of cb) onlyB += Math.max(0, n - (ca.get(x) ?? 0));
        out.push({ key, identical: false, class: onlyA === 0 && onlyB === 0 ? "reorder" : "content", rulesBase: a.length, rulesNow: b.length, onlyBase: onlyA, onlyNow: onlyB, firstDivergence: i, base: a[i]?.slice(0, 200), now: b[i]?.slice(0, 200) });
    }
    return out;
}

/** A leaf-rule line (`ctx :: selector {decls}`) read back: its layer path, its complex
 *  selectors and its declared properties. At-rule lines (`@font-face`, `@property`) carry no
 *  selector and are not judged. */
function parseRule(line) {
    const m = /^(.*?) :: (.*?) \{(.*)\}$/.exec(line);
    if (!m || m[2].startsWith("@")) return null;
    const layers = m[1].split(" > ").filter((c) => c.startsWith("@layer")).join(" > ");
    const props = new Set([...m[3].matchAll(/(?:^|;)([-a-zA-Z0-9_]+):/g)].map((x) => x[1]));
    return { layers, selectors: splitList(m[2]), props };
}
function splitList(sel) {
    const out = [];
    let depth = 0, cur = "";
    for (const ch of sel) {
        if (ch === "(" || ch === "[") depth++;
        if (ch === ")" || ch === "]") depth--;
        if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
}
/** Specificity (a,b,c) of one complex selector; `:where()` counts 0, the other functional
 *  pseudo-classes count their argument (the most specific branch is not resolved). */
export function specificity(sel) {
    const s = sel.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, "").replace(/\[[^\]]*\]/g, " [a] ").replace(/::?-?[a-zA-Z-]+\(/g, (x) => (x.startsWith("::") ? " ::pe ( " : " ( "));
    const a = (s.match(/#[-_a-zA-Z0-9]+/g) ?? []).length;
    const b = (s.match(/\.-?[_a-zA-Z][-_a-zA-Z0-9]*/g) ?? []).length + (s.match(/\[a\]/g) ?? []).length + (s.match(/(?<!:):(?!:)[-a-zA-Z]+/g) ?? []).length;
    const c = (s.replace(/[.#][-_a-zA-Z0-9]+/g, " ").replace(/:+[-a-zA-Z]+/g, " ").match(/(^|[\s>+~(])[a-zA-Z][-a-zA-Z0-9]*/g) ?? []).length + (s.match(/::[-a-zA-Z]+/g) ?? []).length;
    return `${a},${b},${c}`;
}
const classSet = (sel) => new Set([...sel.matchAll(/\.(-?[_a-zA-Z][-_a-zA-Z0-9]*)/g)].map((m) => m[1]));

/**
 * FD-4 · the listed-reorder judge (P4-F7, S-28). Rule-count identity is not paint identity:
 * two rules in one layer at one specificity that declare the same property, on classes one
 * element wears together, cannot swap order without changing the value that wins. For every
 * pair whose relative order the reorder changed (base order against the longest kept
 * subsequence), the pair is a RISK when the two share a declared property, sit in one layer
 * path, and hold complex selectors of equal specificity whose classes co-occur in a source
 * class recipe (lib/recipes.mjs) or are one class (or, classless, are one selector).
 */
export function reorderRisks(a, b, recipes) {
    const idx = new Map();
    b.forEach((r, i) => (idx.get(r) ?? idx.set(r, []).get(r)).push(i));
    const used = new Map();
    const pos = a.map((r) => { const l = idx.get(r) ?? []; const k = used.get(r) ?? 0; used.set(r, k + 1); return l[k] ?? -1; });
    const n = pos.length, tails = [], tailIdx = [], prev = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        if (pos[i] < 0) continue;
        let lo = 0, hi = tails.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < pos[i]) lo = m + 1; else hi = m; }
        tails[lo] = pos[i]; tailIdx[lo] = i; prev[i] = lo ? tailIdx[lo - 1] : -1;
    }
    const keep = new Set();
    for (let i = tailIdx[tails.length - 1] ?? -1; i >= 0; i = prev[i]) keep.add(i);
    const moved = [...Array(n).keys()].filter((i) => !keep.has(i) && pos[i] >= 0);
    const parsed = a.map(parseRule);
    const risks = [];
    let swapped = 0;
    const seen = new Set();
    for (const i of moved) {
        const ri = parsed[i];
        if (!ri) continue;
        for (let j = 0; j < n; j++) {
            if (j === i || pos[j] < 0 || (j < i) === (pos[j] < pos[i])) continue;
            const pk = i < j ? `${i}:${j}` : `${j}:${i}`;
            if (seen.has(pk)) continue;
            seen.add(pk);
            swapped++;
            const rj = parsed[j];
            if (!rj || ri.layers !== rj.layers) continue;
            const props = [...ri.props].filter((p) => rj.props.has(p));
            if (!props.length) continue;
            let hit = null;
            for (const si of ri.selectors) for (const sj of rj.selectors) {
                if (hit || specificity(si) !== specificity(sj)) continue;
                const ci = classSet(si), cj = classSet(sj);
                const co = ci.size && cj.size ? coOccurrence(ci, cj, recipes) : si === sj ? { shared: si } : null;
                if (co) hit = { selectors: [si, sj], specificity: specificity(si), classes: [...ci, ...cj], via: co };
            }
            if (hit) risks.push({ moved: a[i].slice(0, 200), swappedWith: a[j].slice(0, 200), baseOrder: [i, j], nowOrder: [pos[i], pos[j]], props, layers: ri.layers, ...hit });
        }
    }
    return { rules: n, moved: moved.length, movedRules: moved.map((i) => a[i]), swappedPairs: swapped, risks };
}

/** A risk is covered when a browser-seat report run WITH a base report shows a spec that
 *  reads it: the spec's text names one of the shared properties AND a class of either rule
 *  (or a class whose every wearer wears one), it has a base-green band, it passed, and it
 *  has no new failure. Naming the class alone is not reading the property: the P4 battery
 *  measured the accent-tone rung (22%/25% → 18%) pass all 18 base-green tests of the five
 *  specs that name `.glass-chip`, none of which reads --accent-band-strength. */
const tokenRe = (names) => new RegExp(`(?<![-\\w])(${names.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![-\\w])`);
export function coverRisks(risks, reports, tree, { recipes, owners }) {
    const text = (spec) => { try { return tree.read(`tests-visual/${spec}`); } catch { return ""; } };
    for (const r of risks) {
        const cls = new Set(r.classes);
        const propRe = tokenRe(r.props);
        const classRe = tokenRe([...cls, ...impliedBy(cls, recipes, owners)]);
        r.evidence = [];
        r.namedOnlyTheClass = [];
        for (const rep of reports) {
            if (!rep.baseReport) continue;
            const bySpec = new Map();
            for (const t of rep.results ?? []) (bySpec.get(t.spec) ?? bySpec.set(t.spec, []).get(t.spec)).push(t);
            for (const [spec, ts] of bySpec) {
                const t = text(spec);
                const c = classRe.exec(t);
                if (!c) continue;
                const p = propRe.exec(t);
                if (!p) { r.namedOnlyTheClass.push(spec); continue; }
                const band = (rep.bands ?? []).find((b) => b.specs.includes(spec));
                const green = ts.filter((x) => x.status === "expected").length;
                const fresh = (rep.newFailures ?? []).filter((k) => k.startsWith(`${spec} :: `));
                if (green > 0 && fresh.length === 0 && band?.baseGreen > 0) r.evidence.push({ report: rep.root, spec, reads: `${p[1]} on .${c[1]}`, passed: green, baseGreenInBand: band.baseGreen });
                else r.refuted = [...(r.refuted ?? []), { spec, reads: `${p[1]} on .${c[1]}`, newFailures: fresh }];
            }
        }
        r.covered = r.evidence.length > 0 && !r.refuted?.length;
    }
    return risks;
}

export async function contract(root, graph = null) {
    const { buildGraph } = await import("./lib/graph.mjs");
    const g = graph ?? buildGraph(root);
    const terminal = g.record.cascade?.terminal;
    const stylesSource = g.record.css.find(([k]) => k === "./styles")?.[1]?.source;
    const imports = g.edges.filter((e) => e.from === stylesSource && /css-import$/.test(e.kind)).sort((a, b) => a.start - b.start);
    const importers = g.edges.filter((e) => e.to === terminal && /css-import$/.test(e.kind)).map((e) => e.from);
    const findings = [];
    if (!terminal) findings.push("the entry record declares no cascade.terminal");
    else if (!g.tree.isFile(terminal)) findings.push(`the declared terminal ${terminal} is not a file`);
    if (!imports.length) findings.push(`${stylesSource} imports nothing`);
    else if (imports.at(-1).to !== terminal) findings.push(`the last @import of ${stylesSource} is ${imports.at(-1).to}, not the declared terminal ${terminal}`);
    if (importers.length !== 1) findings.push(`the terminal has ${importers.length} importers (${importers.join(", ")}); it must have exactly one`);
    return { terminal, stylesSource, imports: imports.length, last: imports.at(-1)?.to ?? null, importers, findings, pass: findings.length === 0 };
}

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
    const args = process.argv.slice(2);
    const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
    const cmd = args[0];
    const root = resolve(opt("--root") ?? DEFAULT_ROOT);
    if (cmd === "contract") {
        const r = await contract(root);
        console.log(JSON.stringify(r, null, 1));
        process.exit(r.pass ? 0 : 1);
    }
    const dist = resolve(opt("--dist") ?? join(root, "dist"));
    if (cmd === "snapshot") {
        const out = resolve(opt("--out"));
        mkdirSync(out, { recursive: true });
        const entries = snapshotDist(root, dist);
        const manifest = { $schema: "cascade-baseline/1", sha: opt("--sha") ?? null, dist, entries: {} };
        for (const [key, e] of Object.entries(entries)) {
            const name = key.replace(/^\.\//, "").replace(/[/.]/g, "_");
            writeFileSync(join(out, `${name}.seq`), `${e.seq.join("\n")}\n`);
            manifest.entries[key] = { file: e.file, rules: e.rules, sha256: e.sha256, seq: `${name}.seq` };
        }
        writeFileSync(join(out, "manifest.json"), `${JSON.stringify(manifest, null, 1)}\n`);
        console.log(JSON.stringify(Object.fromEntries(Object.entries(manifest.entries).map(([k, v]) => [k, v.rules]))));
        process.exit(0);
    }
    if (cmd === "verify") {
        const baseDir = resolve(opt("--baseline"));
        const manifest = JSON.parse(readFileSync(join(baseDir, "manifest.json"), "utf8"));
        const base = {};
        for (const [key, e] of Object.entries(manifest.entries)) base[key] = { ...e, seq: readFileSync(join(baseDir, e.seq), "utf8").replace(/\n$/, "").split("\n") };
        const now = snapshotDist(root, dist);
        const rows = compare(base, now);
        const listed = opt("--reorders") ? JSON.parse(readFileSync(resolve(opt("--reorders")), "utf8")).reorders ?? [] : [];
        const reports = args.flatMap((a, i) => (a === "--browser" ? [JSON.parse(readFileSync(resolve(args[i + 1]), "utf8"))] : []));
        let ctx = null;
        for (const r of rows) {
            if (r.identical) continue;
            if (r.class !== "reorder") { r.verdict = "RED: content changed"; continue; }
            if (!ctx) { const tree = openTree(root); const { owners } = classOwners(tree); ctx = { tree, recipes: classRecipes(tree), owners }; }
            const j = reorderRisks(base[r.key].seq, now[r.key].seq, ctx.recipes);
            const l = listed.find((x) => x.entry === r.key);
            // P5-F3: a listing names the moved rule set it reviewed. Every moved rule must be
            // in it (else the reorder reaches past the reviewed rung), and every listed rule
            // must have moved (else the listing is stale). Compared as multisets of leaf rules.
            const left = new Map();
            for (const x of l?.moved ?? []) left.set(x, (left.get(x) ?? 0) + 1);
            r.unlistedRules = [];
            for (const x of j.movedRules) { if (left.get(x) > 0) left.set(x, left.get(x) - 1); else r.unlistedRules.push(x); }
            r.staleRules = [...left].flatMap(([x, k]) => Array(k).fill(x));
            if (!l) { r.verdict = `RED: an unlisted reorder (${j.moved} moved rule(s))`; continue; }
            if (!Array.isArray(l.moved)) { r.verdict = "RED: the listing names no moved rule set (P5-F3)"; continue; }
            if (r.unlistedRules.length || r.staleRules.length) { r.verdict = `RED: the reorder is not the listed rung (${r.unlistedRules.length} moved rule(s) unlisted, ${r.staleRules.length} listed rule(s) unmoved)`; continue; }
            coverRisks(j.risks, reports, ctx.tree, ctx);
            const open = j.risks.filter((x) => !x.covered);
            r.listed = l.reason;
            r.judged = { moved: j.moved, swappedPairs: j.swappedPairs, risks: j.risks.length, covered: j.risks.length - open.length };
            r.risks = j.risks;
            r.verdict = open.length ? `RED: ${open.length} swapped pair(s) can change a value and no band spec that reads it ran` : j.risks.length ? "GREEN: listed reorder; every risky pair covered by a band spec that ran" : "GREEN: listed reorder; no swapped pair shares a property on co-occurring classes";
        }
        const stale = listed.filter((x) => !rows.some((r) => r.key === x.entry && !r.identical));
        const ok = rows.every((r) => r.identical || r.verdict?.startsWith("GREEN")) && stale.length === 0;
        console.log(JSON.stringify({ baseline: manifest.sha, verdict: ok ? "GREEN" : "RED", staleListings: stale, entries: rows.map(({ risks, unlistedRules, staleRules, ...x }) => ({ ...x, ...(unlistedRules ? { unlistedRules: unlistedRules.length, staleRules: staleRules.length } : {}) })) }, null, 1));
        // the rule lines, as a listing names them: a route copies UNLISTED lines into `moved`
        for (const r of rows) for (const x of r.unlistedRules ?? []) console.log(`UNLISTED ${r.key} ${JSON.stringify(x)}`);
        for (const r of rows) for (const x of r.staleRules ?? []) console.log(`STALE-RULE ${r.key} ${JSON.stringify(x)}`);
        for (const r of rows) for (const x of r.risks ?? []) {
            console.log(`${x.covered ? "COVERED" : "RISK"} ${r.key} [${x.props.join(",")}] ${x.selectors.join(" × ")} (${x.specificity}; ${x.via.recipe ? `co-occur in ${x.via.recipe}` : `share ${x.via.shared}`})${x.covered ? ` ← ${x.evidence.map((e) => `${e.spec} reads ${e.reads}`).join("; ")}` : ""}`);
            for (const f of x.refuted ?? []) console.log(`  REFUTED by ${f.spec} (reads ${f.reads}): ${f.newFailures.length} new failure(s) ${f.newFailures.slice(0, 3).join(" | ")}`);
            if (!x.covered && x.namedOnlyTheClass?.length) console.log(`  not evidence (name the class, never the property): ${x.namedOnlyTheClass.join(", ")}`);
        }
        process.exit(ok ? 0 : 1);
    }
    console.error("usage: cascade.mjs contract|snapshot|verify …");
    process.exit(2);
}
