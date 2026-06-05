#!/usr/bin/env node
// AU.W3 — the vueuse-free-root gate (proof:vueuse-free-root).
//
// The v1.0 root barrel (src/index.ts) is the "vueuse-FREE curated surface" — no
// symbol it re-exports may transitively import @vueuse/core (the SCC-trap closure;
// downstream Rollup manualChunks consumers depend on it). At HEAD that invariant
// is RED in the SOURCE graph: index.ts → components → ui → data-table →
// DataTable.vue:3 `import { useElementSize } from "@vueuse/core"`. The dist split
// MITIGATES the bundle case (DataTable lands in its own chunk, so
// `dist/glass-ui.js` is already @vueuse-free) — but the real debt is the ABSENT
// source-graph gate, which this closes.
//
// Two-tier (P6):
//   SOURCE-graph tier — a comment-stripped transitive import walk from
//     src/index.ts (following relative re-exports + extracting <script> from .vue),
//     asserting NO reachable module imports `@vueuse/core` / `@vueuse/*`. RED@HEAD;
//     greens after the DataTable `useElementSize`→in-house `useResizeObserver` swap
//     (the swap must precede this gate going green — the one hard W3 ordering edge).
//   DIST-floor tier — `grep "@vueuse/core" dist/glass-ui.js === 0` (the built
//     root barrel never names the peer literal). Born-green at HEAD (the split).
//
// inv ε / bite-check: re-importing `useElementSize` into any root-reachable .vue
// reddens the SOURCE tier even while the DIST tier passes.
//
// House style mirrors proof-consumers-static.mjs: ESM, lazy paths, comment-strip,
// a byte-stable JSON artefact, fail-closed.

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const VUEUSE_RE = /from\s*["'](@vueuse\/[^"']+)["']|import\(\s*["'](@vueuse\/[^"']+)["']\s*\)/g;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        ENTRY: resolve(ROOT, "src/index.ts"),
        DIST: resolve(ROOT, "dist/glass-ui.js"),
        ARTIFACT: gateArtifactPath("GLASS_UI_VUEUSE_FREE_ROOT_ARTIFACT", "AU-vueuse-free-root"),
    };
    return _cliPaths;
}

// Strip block + line comments to spaces (newlines preserved) — the false-witness
// discipline (a commented `// import … "@vueuse/core"` is not a real reach).
function stripComments(text) {
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
function vueScript(source) {
    let body = "";
    for (const m of source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) body += `${m[1]}\n`;
    return body;
}

function resolveModulePath(fromFile, specifier) {
    if (!specifier.startsWith(".")) return null; // only follow relative graph edges
    const base = resolve(dirname(fromFile), specifier);
    const candidates = [
        `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, `${base}.vue`,
        join(base, "index.ts"), join(base, "index.tsx"), join(base, "index.js"), join(base, "index.mjs"),
        base,
    ];
    return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

// Walk the transitive relative-import graph from ENTRY; return the first reach to
// @vueuse with the path that led there, or null.
function findVueuseReach(entry) {
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

        // any @vueuse reach in THIS module is a violation
        for (const m of source.matchAll(VUEUSE_RE)) {
            return { module: resolved, specifier: m[1] ?? m[2], path };
        }
        // follow relative import/export edges
        for (const m of source.matchAll(/(?:import|export)\s+[^"';]*?from\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|import\s+["']([^"']+)["']/g)) {
            const spec = m[1] ?? m[2] ?? m[3];
            if (!spec) continue;
            const target = resolveModulePath(resolved, spec);
            if (target) stack.push({ file: target, path: [...path, target] });
        }
    }
    return null;
}

function run() {
    const { ROOT, ENTRY, DIST, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // SOURCE-graph tier
    const reach = findVueuseReach(ENTRY);
    facts.sourceReach = reach ? reach.specifier : null;
    if (reach) {
        const rel = (p) => p.slice(ROOT.length + 1);
        violations.push(
            `SOURCE: the root barrel reaches ${reach.specifier} via ${reach.path.map(rel).join(" → ")}`,
        );
    }

    // DIST-floor tier
    if (existsSync(DIST)) {
        const distHits = (readFileSync(DIST, "utf8").match(/@vueuse\/core/g) ?? []).length;
        facts.distHits = distHits;
        if (distHits > 0) {
            violations.push(`DIST: dist/glass-ui.js names @vueuse/core ${distHits}× (the built root barrel must be @vueuse-free)`);
        }
    } else {
        facts.distHits = "(dist absent — run npm run build)";
        violations.push("DIST: dist/glass-ui.js is absent — build before this gate (the dist-floor tier cannot run)");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:vueuse-free-root", facts, violations });

    console.log("proof:vueuse-free-root — the vueuse-FREE root barrel gate (AU.W3)");
    console.log(`  SOURCE reach to @vueuse : ${facts.sourceReach ?? "none ✓"}`);
    console.log(`  DIST @vueuse/core hits  : ${facts.distHits}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
