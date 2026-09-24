#!/usr/bin/env node
// cascade.mjs — F-4: the cascade contract.
//   contract [--root R]                          source half: the entry record declares a
//                                                 terminal; it is the last @import of the
//                                                 ./styles source and has one importer
//   snapshot --dist D --out DIR [--sha S]        the named baseline: each published CSS
//                                                 entry flattened to its ordered leaf rules
//   verify --baseline DIR --dist D               move-only check: every entry's sequence is
//                                                 identical to the baseline, or exit 1 with
//                                                 the first divergence and its class
// Flattening inlines relative @imports depth-first (layer()/supports()/media wrap the
// inlined sheet), and normalises Vue scope ids, hashed v-bind vars and scoped @keyframes
// suffixes (FD-4) by first appearance, so a pure move reads identical while any reorder
// or content change reads RED.
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_ROOT } from "./lib/tree.mjs";

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
        const ok = rows.every((r) => r.identical);
        console.log(JSON.stringify({ baseline: manifest.sha, verdict: ok ? "GREEN" : "RED", entries: rows }, null, 1));
        process.exit(ok ? 0 : 1);
    }
    console.error("usage: cascade.mjs contract|snapshot|verify …");
    process.exit(2);
}
