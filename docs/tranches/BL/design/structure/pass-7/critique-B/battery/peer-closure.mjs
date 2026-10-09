#!/usr/bin/env node
// peer-closure.mjs --root <tree> [--entry motion-core] [--out <json>] · critique-B pass 7 · gate-independent.
// Written and hashed BEFORE reading pass-7/B-kit. REGISTRY §P6-8.4: "nothing reachable from ./motion-core imports
// @mkbabb/keyframes.js". The entry map is the tree's own: the scripts/ module exporting `libraryEntryMap(root)`.
// The closure follows VALUE edges only (static import/export-from, side-effect import, literal dynamic import());
// `import type` / `export type` edges are dropped (they do not execute). Specifiers: relative, `@glass/*` -> src/*,
// and `@mkbabb/glass-ui/<sub>` -> that entry's source. Every other bare specifier is a peer/dependency leaf.
// Prints `PEER <entry> <0|1> <chain>` for --entry (default motion-core) and `PEER-ALL` for every entry reaching
// keyframes. Exit 0 when the named entry's closure is keyframes-free, 1 when it is not, 2 on a probe error.
import { readFileSync, existsSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const root = resolve(arg("--root", "."));
const ENTRY = arg("--entry", "motion-core");
const KF = "@mkbabb/keyframes.js";
try {
    const mjs = [];
    (function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
        if (e.name === "node_modules" || e.isSymbolicLink()) continue;
        const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else if (/\.m?js$/.test(p)) mjs.push(p);
    } })("scripts");
    const owner = mjs.find((p) => /export\s+function\s+libraryEntryMap\b/.test(readFileSync(join(root, p), "utf8")));
    if (!owner) throw new Error("no scripts/ module exports libraryEntryMap");
    const { libraryEntryMap } = await import(pathToFileURL(join(root, owner)));
    const map = libraryEntryMap(root);
    const relMap = Object.fromEntries(Object.entries(map).map(([k, v]) => [k, relative(root, v)]));
    const EXT = ["", ".ts", ".vue", ".mts", ".js", ".mjs", "/index.ts", "/index.js"];
    const resolveFile = (base) => { for (const x of EXT) { const p = base + x; if (existsSync(join(root, p)) && statSync(join(root, p)).isFile()) return p; } return null; };
    const scriptOf = (p, t) => p.endsWith(".vue") ? [...t.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n") : t;
    const edges = (p) => {
        const t = scriptOf(p, readFileSync(join(root, p), "utf8")).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
        const out = [];
        for (const m of t.matchAll(/^\s*(import|export)\s+(type\s+)?([^;]*?)\s*from\s*["']([^"']+)["']/gm)) {
            if (m[2]) continue;
            // `import { type A, type B } from` is type-only too
            const clause = m[3];
            const inner = /^\{([\s\S]*)\}$/.exec(clause.trim());
            if (inner && inner[1].split(",").map((s) => s.trim()).filter(Boolean).every((s) => s.startsWith("type "))) continue;
            out.push(m[4]);
        }
        for (const m of t.matchAll(/^\s*import\s*["']([^"']+)["']/gm)) out.push(m[1]);
        for (const m of t.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) out.push(m[1]);
        return out;
    };
    const closure = (start) => {
        const seen = new Map([[start, null]]); const q = [start]; const bare = new Map();
        while (q.length) {
            const p = q.shift();
            for (const s of edges(p)) {
                let tgt = null;
                if (s.startsWith(".")) tgt = resolveFile(join(dirname(p), s));
                else if (s.startsWith("@glass/")) tgt = resolveFile(`src/${s.slice(7)}`);
                else if (s === "@mkbabb/glass-ui") tgt = relMap.index ?? null;
                else if (s.startsWith("@mkbabb/glass-ui/")) tgt = relMap[s.slice(17)] ?? null;
                else { if (!bare.has(s)) bare.set(s, p); continue; }
                if (!tgt) { if (!/\.(css|json|svg|wgsl|glsl)(\?.*)?$/.test(s) && !/\?/.test(s)) bare.set(`UNRESOLVED:${s}`, p); continue; }
                if (!seen.has(tgt)) { seen.set(tgt, p); q.push(tgt); }
            }
        }
        const chain = (f) => { const c = []; for (let x = f; x; x = seen.get(x)) c.unshift(x); return c.join(" > "); };
        return { files: seen.size, bare, chain, seen };
    };
    if (!relMap[ENTRY]) throw new Error(`entry ${ENTRY} not in the tree's entry map (${Object.keys(relMap).length} entries)`);
    const res = {};
    for (const [name, src] of Object.entries(relMap)) {
        if (!src.endsWith(".ts") && !src.endsWith(".vue")) continue;
        const c = closure(src);
        const hit = c.bare.get(KF);
        res[name] = { src, files: c.files, keyframes: hit ? c.chain(hit) : null, unresolved: [...c.bare.keys()].filter((k) => k.startsWith("UNRESOLVED:")) };
    }
    const e = res[ENTRY];
    console.log(`PEER ${ENTRY} ${e.keyframes ? 1 : 0} files=${e.files} src=${e.src}${e.keyframes ? ` chain: ${e.keyframes} > ${KF}` : ""}`);
    if (e.unresolved.length) console.log(`PEER-UNRESOLVED ${ENTRY} ${e.unresolved.join(" ")}`);
    console.log(`PEER-ALL keyframes-bearing entries: ${Object.entries(res).filter(([, r]) => r.keyframes).map(([k]) => k).join(" ") || "-"}`);
    console.log(`PEER-ALL keyframes-free entries: ${Object.entries(res).filter(([, r]) => !r.keyframes).map(([k]) => k).join(" ") || "-"}`);
    if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify(res, null, 1));
    process.exit(e.keyframes ? 1 : 0);
} catch (err) { console.log(`PEER-ERROR ${String(err?.message ?? err).split("\n")[0]}`); process.exit(2); }
