// BB.W-PAYLOAD-DEFER — the shared transitive-import walker (the critical-path leaf).
//
// Extracted VERBATIM from proof-vueuse-free-root.mjs's inline walk (AU.W3) so the
// vueuse-free-root gate AND the profile:budget critical-path-weight arm consume ONE
// walker (the no-second-copy discipline). The two gates MUST walk IDENTICALLY — a
// drift in the comment-strip or edge-follow between them is the §Triumvirate
// diagnostic-loop suspect, so the walk lives here once.
//
// The walk: a comment-stripped transitive relative-import traversal from an ENTRY
// module (following relative re-exports + extracting <script> from .vue), surfacing
// the FIRST module whose source matches a caller-supplied specifier pattern (a bare
// `@vueuse/*` reach for the vueuse gate; the WebGL substrate / GL shader / value.js
// color-leaf reaches for the critical-path arm). Only RELATIVE edges are followed
// (the eager source graph the consumer's bundler walks) — a bare-specifier import
// (a peer) is a LEAF, surfaced by the pattern, never traversed.

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// Strip block + line comments to spaces (newlines preserved) — the false-witness
// discipline (a commented `// import … "@vueuse/core"` is not a real reach).
export function stripComments(text) {
    let out = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            for (let j = i; j < stop; j++) out += text[j] === "\n" ? "\n" : " ";
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            const nl = text.indexOf("\n", i);
            const stop = nl === -1 ? text.length : nl;
            for (let j = i; j < stop; j++) out += " ";
            i = stop;
        } else {
            out += text[i];
            i++;
        }
    }
    return out;
}

// Pull the <script> blocks out of a .vue SFC (so its imports join the graph).
export function vueScript(source) {
    let body = "";
    for (const m of source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))
        body += `${m[1]}\n`;
    return body;
}

export function resolveModulePath(fromFile, specifier) {
    if (!specifier.startsWith(".")) return null; // only follow relative graph edges
    const base = resolve(dirname(fromFile), specifier);
    const candidates = [
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.js`,
        `${base}.mjs`,
        `${base}.vue`,
        join(base, "index.ts"),
        join(base, "index.tsx"),
        join(base, "index.js"),
        join(base, "index.mjs"),
        base,
    ];
    return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

// The import/export edge matcher — covers static `import … from`, `export … from`,
// dynamic `import("…")`, and bare side-effect `import "…"`. Shared by both gates so
// the edge-follow semantics never diverge.
const EDGE_RE =
    /(?:import|export)\s+[^"';]*?from\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g;

/**
 * Walk the transitive relative-import graph from `entry`. For each visited module
 * (comment-stripped; .vue → <script>-extracted), the caller-supplied `match(source)`
 * is consulted FIRST — a truthy return surfaces a HIT (the leaf reach) with the path
 * that led there. If no module matches, returns null.
 *
 * `match` is `(source: string) => { specifier: string } | string | null` — the
 * vueuse gate matches a `@vueuse/*` regex; the critical-path arm matches the
 * heavy-leaf specifier/symbol set.
 *
 * @returns {{ module: string, specifier: string, path: string[] } | null}
 */
export function findReach(entry, match) {
    const seen = new Set();
    const stack = [{ file: entry, path: [entry] }];
    while (stack.length) {
        const { file, path } = stack.pop();
        const resolved = resolve(file);
        if (seen.has(resolved) || !existsSync(resolved)) continue;
        seen.add(resolved);

        let source = readFileSync(resolved, "utf8");
        if (resolved.endsWith(".vue")) source = vueScript(source);
        source = stripComments(source);

        // any caller-pattern reach in THIS module is a hit
        const hit = match(source);
        if (hit) {
            const specifier = typeof hit === "string" ? hit : hit.specifier;
            return { module: resolved, specifier, path };
        }
        // follow relative import/export edges
        for (const m of source.matchAll(EDGE_RE)) {
            const spec = m[1] ?? m[2] ?? m[3];
            if (!spec) continue;
            const target = resolveModulePath(resolved, spec);
            if (target) stack.push({ file: target, path: [...path, target] });
        }
    }
    return null;
}

/**
 * Collect EVERY reachable module file path from `entry` (the comment-stripped
 * relative graph). Used by the critical-path arm to scan the whole eager graph for
 * a set of heavy-leaf reaches at once (rather than short-circuiting on the first),
 * so the artefact records all of them.
 *
 * @returns {string[]} absolute file paths, deduped, in discovery order
 */
export function collectReachable(entry) {
    const seen = new Set();
    const order = [];
    const stack = [resolve(entry)];
    while (stack.length) {
        const file = stack.pop();
        const resolved = resolve(file);
        if (seen.has(resolved) || !existsSync(resolved)) continue;
        seen.add(resolved);
        order.push(resolved);

        let source = readFileSync(resolved, "utf8");
        if (resolved.endsWith(".vue")) source = vueScript(source);
        source = stripComments(source);
        for (const m of source.matchAll(EDGE_RE)) {
            const spec = m[1] ?? m[2] ?? m[3];
            if (!spec) continue;
            const target = resolveModulePath(resolved, spec);
            if (target) stack.push(target);
        }
    }
    return order;
}
