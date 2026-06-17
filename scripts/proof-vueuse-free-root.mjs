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

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BB.W-PAYLOAD-DEFER — the transitive-import walk is now the SHARED leaf
// (scripts/lib/critical-path-walk.mjs), consumed identically by this gate AND the
// profile:budget critical-path-weight arm (the no-second-copy discipline). The
// comment-strip + .vue-<script>-extract + relative-edge-follow live there once.
import { findReach } from "./lib/critical-path-walk.mjs";

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

// Walk the transitive relative-import graph from ENTRY; return the first reach to
// @vueuse with the path that led there, or null. The walk (comment-strip + .vue
// <script>-extract + relative-edge-follow) is the SHARED leaf; this gate supplies
// only the @vueuse specifier matcher.
function findVueuseReach(entry) {
    return findReach(entry, (source) => {
        for (const m of source.matchAll(VUEUSE_RE)) {
            return { specifier: m[1] ?? m[2] };
        }
        return null;
    });
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
