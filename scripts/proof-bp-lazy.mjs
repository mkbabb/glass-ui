#!/usr/bin/env node
// BC.W-AX-BP-LAZY — BorderProgress eager-graph-safe (proof:bp-lazy).
//
// The born-RED→GREEN device-free eager-graph gate. The speedtest results-card
// consumes `<BorderProgress>` at FIRST PAINT; the value.js OKLCH/shorter-hue
// spectrum walk (the only value.js consumer in the leaf) must NOT ride the eager
// `dist/border-progress.js` chunk a consumer pulls when it imports the subpath. This
// gate locks the payload move — the value.js-bearing walk lives behind a dynamic
// `import()` boundary; `spectrumStops` stays a SYNCHRONOUS export; the `var()` /
// default-ramp fast path is value.js-free + byte-identical.
//
//   BP1 — THE EAGER `/border-progress` GRAPH IS VALUE.JS-FREE. A comment-stripped
//         transitive STATIC-import walk from the subpath entry (following only
//         RELATIVE STATIC edges, NOT dynamic `import()` — a dynamic edge is a
//         code-split point the bundler chunks out, NOT eager) reaches ZERO
//         value.js / `/color`-leaf module. Born-RED on the static-import HEAD
//         (`useBorderSpectrum.ts:18-19` are static value.js + `/color` edges).
//         Bite: a planted top-level `import "@mkbabb/value.js"` back in
//         `useBorderSpectrum.ts` reds.
//   BP2 — `spectrum-walk.ts` IS THE DYNAMIC LEAF, REACHED ONLY BY `import()`.
//         `useBorderSpectrum.ts` references `./spectrum-walk` ONLY via a dynamic
//         `import("./spectrum-walk")` (NOT a static `import … from`), and
//         `spectrum-walk.ts` carries the value.js + `/color` imports. Bite: a static
//         `import { … } from "./spectrum-walk"` in `useBorderSpectrum.ts` reds.
//   BP3 — `spectrumStops` STAYS A SYNCHRONOUS EXPORT. It is exported synchronously
//         (not `async`), keeps its `(stops, samples?, …)` signature. Bite: an
//         `async spectrumStops` reds (the SFC's `computed` cannot await).
//   BP4 — THE `var()` FAST PATH IS VALUE.JS-FREE + BYTE-IDENTICAL. The `var()` /
//         default-ramp branch returns `[...stops]` with NO dynamic-import side
//         effect (it never touches the value.js path). Bite: a `var()` ramp that
//         fires the dynamic import reds (the fast path must not load value.js).
//
// The BINDING measure is the captured payload-delta table
// (docs/tranches/BC/audit/W-AX-BP-LAZY-payload.md) — there is NO pixel paint to
// capture; this wave changes ZERO paint, so it carries NO proof:ba-gestalt verdict.
//
// House style mirrors proof-vueuse-free-root.mjs / proof-border-progress.mjs: ESM
// .mjs, composes the SHARED critical-path-walk.mjs leaf primitives (comment-strip +
// .vue-<script>-extract + relative-resolve — the no-second-copy discipline) with a
// STATIC-ONLY edge walk, a byte-stable JSON artefact, a self-test bite per clause.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
// BC.W-AX-BP-LAZY composes the SHARED walker's exported primitives (the no-second-
// copy discipline) — but walks STATIC-ONLY edges. The shared findReach() follows
// BOTH static and dynamic `import()` edges (the eager-or-not conflation); the eager
// critical-path question this gate asks must NOT traverse a dynamic `import()` (a
// code-split point the consumer's bundler chunks out). So this gate reuses the leaf's
// stripComments / vueScript / resolveModulePath primitives and does the static-only
// traversal locally — it does NOT re-author the walker.
import {
    stripComments,
    vueScript,
    resolveModulePath,
} from "./lib/critical-path-walk.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const d = (p) => resolve(ROOT, "src/components/custom/border-progress", p);
    _cliPaths = {
        ROOT,
        ENTRY: resolve(ROOT, "src/subpaths/border-progress.ts"),
        SHELL: d("composables/useBorderSpectrum.ts"),
        WALK: d("composables/spectrum-walk.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_BP_LAZY_ARTIFACT", "BC-bp-lazy"),
    };
    return _cliPaths;
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// A value.js / `/color`-leaf reach in a module's (comment-stripped) source — a
// `from "@mkbabb/value.js"`, a `from "…/composables/color"`, or a static
// `import … from "@mkbabb/value.js"`. The `/color` index.ts is itself value.js-
// bearing, so reaching it is reaching value.js.
const VALUE_JS_RE =
    /(?:import|export)\s+[^"';]*?from\s*["'](@mkbabb\/value\.js|[^"']*composables\/color)["']|import\s+["'](@mkbabb\/value\.js)["']/;

// STATIC relative edges only — `import … from "./x"` and `export … from "./x"` and a
// bare `import "./x"`. The dynamic `import("./x")` arm is DELIBERATELY EXCLUDED (a
// dynamic edge is a code-split boundary, not eager). The leaf's shared EDGE_RE
// includes the dynamic arm; this gate's question forbids traversing it.
const STATIC_EDGE_RE =
    /(?:import|export)\s+[^"';]*?from\s*["']([^"']+)["']|(?<!\.)\bimport\s+["']([^"']+)["']/g;

/**
 * Walk the transitive STATIC relative-import graph from `entry`, composing the
 * shared leaf primitives (comment-strip + .vue-<script>-extract + relative-resolve).
 * Surfaces the FIRST module whose source matches `match(source)`, or null. Only
 * STATIC relative edges are followed — a dynamic `import("…")` is NOT traversed.
 *
 * @returns {{ module: string, specifier: string, path: string[] } | null}
 */
function findStaticReach(entry, match) {
    const seen = new Set();
    const stack = [{ file: resolve(entry), path: [resolve(entry)] }];
    while (stack.length) {
        const { file, path } = stack.pop();
        const resolved = resolve(file);
        if (seen.has(resolved) || !existsSync(resolved)) continue;
        seen.add(resolved);

        let source = readFileSync(resolved, "utf8");
        if (resolved.endsWith(".vue")) source = vueScript(source);
        source = stripComments(source);

        const hit = match(source);
        if (hit) {
            const specifier = typeof hit === "string" ? hit : hit.specifier;
            return { module: resolved, specifier, path };
        }
        for (const m of source.matchAll(STATIC_EDGE_RE)) {
            const spec = m[1] ?? m[2];
            if (!spec) continue;
            const target = resolveModulePath(resolved, spec);
            if (target) stack.push({ file: target, path: [...path, target] });
        }
    }
    return null;
}

const valueJsMatch = (source) => {
    const m = source.match(VALUE_JS_RE);
    return m ? { specifier: m[1] ?? m[2] } : null;
};

/**
 * THE PURE DETECTOR — takes the two leaf sources (so the self-test can plant
 * synthetic inputs) + an eager-reach result, returns { facts, violations }.
 */
export function detectBpLazy({ shell = "", walk = "", walkExists = false, eagerReach = null }) {
    const violations = [];
    const facts = { bp1: {}, bp2: {}, bp3: {}, bp4: {} };

    // ── BP1 — the eager graph is value.js-free ────────────────────────────────
    facts.bp1 = { eagerReach: eagerReach ? eagerReach.specifier : null };
    if (eagerReach) {
        violations.push(
            `BP1: the eager /border-progress graph reaches value.js (${eagerReach.specifier}) — the OKLCH spectrum walk must ride a dynamic import() boundary, not a static edge`,
        );
    }

    // ── BP2 — spectrum-walk.ts is the dynamic leaf, reached ONLY by import() ───
    const shellHasStaticWalkEdge =
        /(?:import|export)\s+[^"';]*?from\s*["']\.\/spectrum-walk["']/.test(shell);
    const shellHasDynamicWalkEdge = /import\(\s*["']\.\/spectrum-walk["']\s*\)/.test(
        shell,
    );
    const walkHasValueJs = /from\s*["']@mkbabb\/value\.js["']/.test(walk);
    const walkHasColorLeaf = /from\s*["'][^"']*composables\/color["']/.test(walk);
    facts.bp2 = {
        walkExists,
        shellHasStaticWalkEdge,
        shellHasDynamicWalkEdge,
        walkHasValueJs,
        walkHasColorLeaf,
    };
    if (!walkExists)
        violations.push(
            "BP2: composables/spectrum-walk.ts does not exist (the value.js-bearing dynamic leaf)",
        );
    if (shellHasStaticWalkEdge)
        violations.push(
            "BP2: useBorderSpectrum.ts has a STATIC `import … from \"./spectrum-walk\"` — the boundary must be dynamic (a static edge re-drags value.js into the eager chunk)",
        );
    if (!shellHasDynamicWalkEdge)
        violations.push(
            "BP2: useBorderSpectrum.ts does not reach `./spectrum-walk` via a dynamic `import(\"./spectrum-walk\")` boundary",
        );
    if (!(walkHasValueJs && walkHasColorLeaf))
        violations.push(
            "BP2: spectrum-walk.ts must carry the value.js (`@mkbabb/value.js`) + the `/color` leaf imports (the ONLY module in the leaf with a value.js edge)",
        );

    // ── BP3 — spectrumStops stays a SYNCHRONOUS export ────────────────────────
    const exportsSpectrumStops =
        /export\s+function\s+spectrumStops\s*\(/.test(shell);
    const isAsync = /export\s+async\s+function\s+spectrumStops\b/.test(shell);
    const keepsSignature = /function\s+spectrumStops\s*\(\s*stops\b/.test(shell);
    facts.bp3 = { exportsSpectrumStops, isAsync, keepsSignature };
    if (!exportsSpectrumStops)
        violations.push(
            "BP3: useBorderSpectrum.ts does not export a synchronous `spectrumStops` function",
        );
    if (isAsync)
        violations.push(
            "BP3: `spectrumStops` is `async` — it MUST stay synchronous (the SFC's `computed` cannot await; the dynamic boundary lives INSIDE it, not on the signature)",
        );
    if (!keepsSignature)
        violations.push(
            "BP3: `spectrumStops`'s `(stops, …)` signature is not preserved",
        );

    // ── BP4 — the var() fast path is value.js-free + byte-identical ────────────
    // The `var()` branch returns `[...stops]` BEFORE any dynamic-import side effect.
    // We locate the `var(`-screen guard and assert it returns synchronously without
    // touching the import() (the import must appear AFTER the var() return — the
    // concrete-anchor cold path only).
    const varGuard = /if\s*\(\s*[A-Za-z0-9_]*\s*\([^)]*\)\s*\)\s*\{\s*return\s+\[\.\.\.stops\]/.test(
        shell,
    ) || /\.test\([^)]*\)[^{]*\)\s*return\s+\[\.\.\.stops\]/.test(shell);
    // The dynamic import must not appear before the var()-screen returns — narrow the
    // assert to: the import() is reached on the concrete path, and the var() return
    // is present. The structural witness is the `containsVar` short-circuit returning
    // `[...stops]` and the `import(` sitting after it (guarded by the concrete path).
    const varReturnIdx = shell.search(/return\s+\[\.\.\.stops\]/);
    const dynImportIdx = shell.search(/import\(\s*["']\.\/spectrum-walk["']/);
    const varReturnsBeforeDynImport =
        varReturnIdx !== -1 &&
        (dynImportIdx === -1 || varReturnIdx < dynImportIdx);
    facts.bp4 = { varGuard, varReturnsBeforeDynImport };
    if (!(varGuard && varReturnsBeforeDynImport))
        violations.push(
            "BP4: the `var()` fast path does not return `[...stops]` synchronously BEFORE the dynamic import() — a `var()` ramp must NEVER fire the value.js load (the hot path is value.js-free + byte-identical)",
        );

    return { facts, violations };
}

// ── self-test: a synthetic GOOD corpus + the per-clause bites ─────────────────
function selfTest() {
    const goodShell = `import { S } from "../constants";
const containsVar = (stops) => stops.some((s) => /var\\(/.test(s));
export function spectrumStops(stops, samples = S, onUpgrade) {
    const count = Math.max(2, Math.round(samples));
    if (containsVar(stops)) { return [...stops]; }
    if (onUpgrade) {
        void import("./spectrum-walk").then(({ walkConcreteSpectrum }) => {
            onUpgrade(walkConcreteSpectrum(stops, count));
        });
    }
    return [...stops];
}`;
    const goodWalk = `import { interpolateHue } from "@mkbabb/value.js";
import { cssToOklch, oklchStopToHex } from "../../../../composables/color";
export function walkConcreteSpectrum(stops, count) { return []; }`;
    const good = { shell: goodShell, walk: goodWalk, walkExists: true, eagerReach: null };
    const baseGreen = detectBpLazy(good).violations.length === 0;

    const bites = [];
    // BP1 bite — a static value.js edge in the SHELL surfaces as an eager reach.
    bites.push({
        name: "bp1-static-valuejs-edge",
        red:
            detectBpLazy({
                ...good,
                eagerReach: { specifier: "@mkbabb/value.js" },
            }).violations.length > 0,
    });
    // BP2 bite — a STATIC import from ./spectrum-walk in the shell reds.
    bites.push({
        name: "bp2-static-walk-edge",
        red:
            detectBpLazy({
                ...good,
                shell:
                    `import { walkConcreteSpectrum } from "./spectrum-walk";\n` +
                    good.shell,
            }).violations.length > 0,
    });
    // BP2 bite — spectrum-walk.ts without value.js reds.
    bites.push({
        name: "bp2-walk-no-valuejs",
        red:
            detectBpLazy({ ...good, walk: "export function x() {}" }).violations
                .length > 0,
    });
    // BP3 bite — an async spectrumStops reds.
    bites.push({
        name: "bp3-async-export",
        red:
            detectBpLazy({
                ...good,
                shell: good.shell.replace(
                    "export function spectrumStops",
                    "export async function spectrumStops",
                ),
            }).violations.length > 0,
    });
    // BP4 bite — the dynamic import fired BEFORE the var() return reds.
    bites.push({
        name: "bp4-import-before-var-return",
        red:
            detectBpLazy({
                ...good,
                shell: good.shell.replace(
                    "    const count = Math.max(2, Math.round(samples));",
                    '    void import("./spectrum-walk");\n    const count = Math.max(2, Math.round(samples));',
                ),
            }).violations.length > 0,
    });
    // BP2 bite — the dynamic boundary missing entirely reds.
    bites.push({
        name: "bp2-no-dynamic-boundary",
        red:
            detectBpLazy({
                ...good,
                shell: good.shell.replace(/void import\([\s\S]*?\}\);/, ""),
            }).violations.length > 0,
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const shell = stripComments(read(P.SHELL));
    const walk = stripComments(read(P.WALK));
    const walkExists = existsSync(P.WALK);

    // BP1 — the live eager-graph walk (STATIC edges only).
    const eagerReach = findStaticReach(P.ENTRY, valueJsMatch);

    const { facts, violations } = detectBpLazy({ shell, walk, walkExists, eagerReach });
    if (eagerReach) {
        const rel = (p) => p.slice(P.ROOT.length + 1);
        facts.bp1.path = eagerReach.path.map(rel);
    }

    // the self-test bites
    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push("self-test: the GOOD corpus did not green (detector over-strict)");
    if (biteFailures.length > 0)
        violations.push(`self-test bite(s) did not RED: ${biteFailures.join(", ")}`);
    facts.selfTest = { baseGreen: st.baseGreen, allBite: biteFailures.length === 0, bites: st.bites };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:bp-lazy",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log("proof:bp-lazy — BorderProgress eager-graph-safe (BC.W-AX-BP-LAZY)");
    console.log(`  BP1 eager graph value.js-free      : ${yn(!eagerReach)}  ${eagerReach ? `(reaches ${eagerReach.specifier})` : ""}`);
    console.log(
        `  BP2 spectrum-walk is the dynamic leaf: ${yn(
            facts.bp2.walkExists &&
                !facts.bp2.shellHasStaticWalkEdge &&
                facts.bp2.shellHasDynamicWalkEdge &&
                facts.bp2.walkHasValueJs &&
                facts.bp2.walkHasColorLeaf,
        )}`,
    );
    console.log(`  BP3 spectrumStops stays synchronous : ${yn(facts.bp3.exportsSpectrumStops && !facts.bp3.isAsync && facts.bp3.keepsSignature)}`);
    console.log(`  BP4 var() fast path value.js-free   : ${yn(facts.bp4.varGuard && facts.bp4.varReturnsBeforeDynImport)}`);
    console.log(`  self-test bites RED                 : ${yn(facts.selfTest.allBite && facts.selfTest.baseGreen)}`);

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
