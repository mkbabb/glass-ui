// gates.mjs — the SINGLE gate manifest (AS.W2, inv-θ / the F3 fix).
//
// Before AS.W2 three hand-curated "gate sets" disagreed: `proof:all` ran 6,
// `ci.yml` ran 11, `release.sh` ran 4 (zero proof:*). So a local `proof:all`
// went GREEN while CI was RED (the aggregate lied), and a tagged release
// re-checked no binding-correctness gate at all (surface/VT-name/phantom drift
// between the last CI run and the tag shipped unguarded). This module is the
// one manifest: every gate tagged `{local, ci, release}` (+ `sibling` where it
// walks a sibling checkout). The three aggregates are FILTERS over it:
//   - `proof:all`   → `node scripts/gates.mjs --run local`   (the local proof set)
//   - `release.sh`  → `node scripts/gates.mjs --run release`
//   - `ci.yml`      → keeps explicit per-step visibility, VERIFIED against the
//                     manifest by `--verify-ci` (drift fails closed).
//
// So local == ci == release is STRUCTURAL, not coincidental.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

/**
 * The manifest. `cmd` is the npm script; `tags` selects the aggregates it
 * belongs to; `sibling: true` means it walks a sibling checkout (so it is
 * skipped-by-policy when no sibling is present — never a hard failure on a
 * clean runner, per constellation.resolveSibling). `note` documents intent.
 */
export const GATES = [
    { id: "typecheck", cmd: "typecheck", tags: ["local", "ci", "release"] },
    { id: "test", cmd: "test", tags: ["local", "ci"], note: "release runs it via prepublishOnly" },
    { id: "build", cmd: "build", tags: ["local", "ci", "release"] },
    { id: "verify-export-types", cmd: "verify-export-types", tags: ["local", "ci", "release"] },
    { id: "profile:budget", cmd: "profile:budget", tags: ["local", "ci", "release"] },
    { id: "proof:package", cmd: "proof:package", tags: ["local", "ci", "release"], sibling: true, note: "keyframes peer" },
    { id: "proof:theme", cmd: "proof:theme", tags: ["local", "ci", "release"] },
    { id: "proof:components-css", cmd: "proof:components-css", tags: ["local", "ci", "release"] },
    { id: "proof:consumers:static", cmd: "proof:consumers:static", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:consumers:build", cmd: "proof:consumers:build", tags: ["local"], sibling: true, note: "walks sibling builds; local-only" },
    { id: "proof:runtime", cmd: "proof:runtime", tags: ["local"], sibling: true, note: "walks sibling builds; local-only" },
    { id: "proof:resolution", cmd: "proof:resolution", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:phantom-classes", cmd: "proof:phantom-classes", tags: ["local", "ci", "release"], sibling: true },
    { id: "proof:vt-names", cmd: "proof:vt-names", tags: ["local", "ci", "release"] },
    { id: "proof:dock-motion-parity", cmd: "proof:dock-motion-parity", tags: ["local", "ci", "release"], note: "AT.W6-dock-c (W8 re-pinned) — dock VT/FLIP timing-parity static gate; the shared source is now var(--spring-dock) (AU.W8)" },
    { id: "proof:dock-motion-single-source", cmd: "proof:dock-motion-single-source", tags: ["local", "ci"], note: "AU.W8 — the dock FLIP single-frame-origin gate: the layer ref-swap (→opacity) and the width set (→morph) share ONE rAF origin; the perceptual sibling of the string-match proof:dock-opacity-lockstep (the perceptual settle-probe is delegated DOWNSTREAM to the slides deck Playwright — no playwright dep here, KISS)" },
    { id: "proof:dock-opacity-lockstep", cmd: "proof:dock-opacity-lockstep", tags: ["local", "ci", "release"], note: "AU.W2 (DEMOTED W8 → 'syntactic') — the SAME-TOKEN string-match that the dock fade opacity rides --dock-motion-resize (a 0-frame token settle). The PERCEPTUAL frame-origin sibling is proof:dock-motion-single-source (W8)." },
    { id: "proof:dock-a11y-contract", cmd: "proof:dock-a11y-contract", tags: ["local", "ci"], note: "AU.W8 — the reka-Tabs dock rail APG contract: role=tablist/tab + aria-selected (NOT aria-pressed), roving tabindex (Arrow/Home/End), focus-ring, keepOpen()/release() on tab focus, inactive-pane aria-hidden (8 rendered-attr assertions)" },
    { id: "proof:dock-vocabulary", cmd: "proof:dock-vocabulary", tags: ["local", "ci"], note: "AU.W8 — the <Role>Dock README convention (ASK-7, re-grounded): four role names + base primitives + canonical useDock* composables + the useTouchGate/DockTabButton re-groundings. Bite: delete a role → RED" },
    { id: "proof:dock-css-split", cmd: "proof:dock-css-split", tags: ["local", "ci", "release"], note: "AU.W8b — the dock.css monolith split: the five-control family lives in dock-controls.css, the shared :where() four-state contract STAYS in dock.css (the import root), and index.css imports both. Bite: leave a control rule in dock.css → RED" },
    { id: "proof:design-idiom-localization", cmd: "proof:design-idiom-localization", tags: ["local", "ci"], note: "AU.W8b — scoped styles consume @theme-generated utilities, not text-[var(--…)]/shadow-[var(--…)] arbitrary wraps (the cascade discipline; sole allowlist: TabsTrigger --active-tab-color runtime binding). Bite: re-inject one wrap → RED" },
    { id: "proof:au-w9-consumers", cmd: "proof:au-w9-consumers", tags: ["local", "ci"], note: "AU.W9 — each W9 fold (prop/subpath/composable) names ≥2 distinct consumer contexts OR carries a correctness/hygiene tag (the overfitting bar), and every cited consumer resolves at HEAD (in-repo relative + cross-repo absolute). BOOKed items are not tallied. Bite: a 1-consumer untagged fold (or drop a real consumer) → RED" },
    { id: "proof:doc-consistency", cmd: "proof:doc-consistency", tags: ["local", "ci", "release"], note: "AT.W7-dock-c — CLAUDE.md custom-dir + dependency citations resolve at HEAD (doc-rot guard)" },
    { id: "proof:au-w0-reground", cmd: "proof:au-w0-reground", tags: ["local", "ci"], note: "AU.W0 — formalize+re-ground meta-gate (AU.md/PROGRESS.md exist; 3 dock SHAs ancestor-reachable; zero bundle labels survive; W6-dock-b collision re-lettered)" },
    { id: "proof:au-w1-design", cmd: "proof:au-w1-design", tags: ["local", "ci"], note: "AU.W1 — design-slice meta-gate (3 slices cite AT.W1 origin + HEAD delta; the W1c registry enumerates the full AU gate fleet with greening waves)" },
    { id: "proof:strict-templates", cmd: "proof:strict-templates", tags: ["local", "ci"], note: "AU.W3 KEYSTONE — checkUnknownProps:true across the 3 tsconfigs; <GlassDock bogus-prop> is a RED typecheck (the silent-no-op closer); zero @ts-expect-error suppressions" },
    { id: "proof:peer-optional", cmd: "proof:peer-optional", tags: ["local", "ci", "release"], note: "AU.W3 — peer optionality is a derived fact of the root bundle (optional IFF absent from dist/glass-ui.js & not core-substrate); the dead optionalPeerDependencies field deleted" },
    { id: "proof:vueuse-free-root", cmd: "proof:vueuse-free-root", tags: ["local", "ci"], note: "AU.W3 — the root barrel transitively imports no @vueuse/core (SOURCE-graph walk from src/index.ts + DIST-floor grep of glass-ui.js)" },
    { id: "proof:supportsPostTask-wired", cmd: "proof:supportsPostTask-wired", tags: ["local", "ci"], note: "AU.W3 — supportsPostTask is WIRED (>=1 real caller) or DROPPED — no exported orphan (P3)" },
    { id: "proof:font-axes", cmd: "proof:font-axes", tags: ["local", "ci"], note: "AU.W4 — every variation axis typography.css references (WONK/SOFT) is carried by the shipped display @font-face (parsed from the woff2 fvar) — no silently-inert axis" },
    { id: "proof:color-acyclic", cmd: "proof:color-acyclic", tags: ["local", "ci", "release", "sibling"], note: "AU.W5 — the /color leaf graph is a DAG (imports value.js only, no component back-import; value.js/src never imports glass-ui)" },
    { id: "proof:single-color-core", cmd: "proof:single-color-core", tags: ["local", "ci"], note: "AU.W5 — ONE runtime-JS color source (value.js); no glass-ui src re-defines a value.js color primitive; CSS token tier exempt" },
    { id: "proof:frostShader-deleted", cmd: "proof:frostShader-deleted", tags: ["local", "ci"], note: "AU.W6 — the frostShader.ts orphan is DELETED (file-absence + import-graph, NOT a name-grep — the name form is born-green at HEAD)" },
    { id: "proof:webgl-substrate-single", cmd: "proof:webgl-substrate-single", tags: ["local", "ci"], note: "AU.W6 — ONE webgl2 bootstrap (useWebGLCanvas); the substrate bakes no aurora quad/DPR/uniforms; the 3-reason suspend model + demand-gate + context-restore present; the consumer-#2 usability assert exists" },
    { id: "proof:blob-value-free", cmd: "proof:blob-value-free", tags: ["local", "ci"], note: "AU.W7 — the goo-blob/watercolor-dot are value.js-free (two-tier: source-graph + dist) — the injected ColorResolver seam, not a value.js coupling" },
    { id: "proof:no-value-default", cmd: "proof:no-value-default", tags: ["local", "ci"], note: "AU.W7 — a no-resolver blob mount THROWS naming defaultBlobColorResolver (the loud failure, not a silent gray default)" },
    { id: "proof:motion-composables-consumer", cmd: "proof:motion-composables-consumer", tags: ["local", "ci"], note: "AV.W3 — each NEW motion composable (useCountup/vReveal) tallies ≥2 RESOLVING-at-HEAD in-repo consumers (demo route + test); the slides DeckNav fork is `pending` (cross-repo, post-publish), not counted. Bite: drop demo/stories/motion/countup.vue (or the test) → RED" },
    { id: "proof:motion-value-free", cmd: "proof:motion-value-free", tags: ["local", "ci"], note: "AV.W3 — the W3-lifted/adopted motion composables (useCountup/vReveal/useStagger*/useLayerTransition/useGlassCarousel) consume the keyframes LIGHT tier only (no value.js edge, no loadAnimationEngine/animate/CSSKeyframesAnimation). Sibling of proof:blob-value-free" },
    { id: "proof:blob-space-gamma", cmd: "proof:blob-space-gamma", tags: ["local", "ci"], note: "AU.W7 — DEC-AT-7 seam: the default resolver paints GAMMA (oklchToGammaRgb, not oklchToLinear); a shader linear-flip must close with linearToSrgb (no too-dark)" },
    { id: "proof:aurora-space-gamma", cmd: "proof:aurora-space-gamma", tags: ["local", "ci"], note: "AV.W1 — aurora's linear LUT pipeline MUST close with a linearToSrgb() OETF before fragColor (the un-converged-sibling of the blob's A5/A2 darkening trap); the call precedes output, not a dead helper" },
    { id: "proof:shader-shared-source", cmd: "proof:shader-shared-source", tags: ["local", "ci"], note: "AV.W2 — the aurora↔blob shared GLSL convergence: the OETF + the four Ottosson mat3 literals + the FBM_ROT constant live ONCE in procedural-color.glsl.ts (the single source); comment-stripped, NEITHER metaball.frag.ts NOR aurora.frag.ts re-defines a chunk-owned artefact, and both splice it. Bite: re-inline a local linearToSrgb body or a mat3 literal → RED" },
    { id: "proof:blob-color-equivalence", cmd: "proof:blob-color-equivalence", tags: ["local", "ci"], note: "AU.W7 — the 8-assertion CPU-equivalence: the metaball OKLCh shader-color TS port matches value.js's Ottosson CPU result to 1e-6 (asymmetric witness #3a7bd5 — the exact-matrix trap detector)" },
    { id: "proof:fail-explicit", cmd: "proof:fail-explicit", tags: ["local"], note: "AV.W12 — no silent error-swallow in src/: every catch re-throws or carries a '// fail-explicit:' sentinel, and no '?? reactive(' masking default-synthesis on a required dependency. Bite: strip a befitting sentinel or re-inject '?? reactive(BLOB_CONFIG_DEFAULTS)' → RED" },
    { id: "proof:no-legacy-commentary", cmd: "proof:no-legacy-commentary", tags: ["local"], note: "AV.W12 — the api/index.ts + index.ts barrels carry zero tranche-letter ref / 'tranche' word / vN.N.N version-archaeology in their bodies (the audit trail lives in CHANGELOG.md). Bite: re-inject one 'M.W2' or 'v1.7.0' → RED" },
    { id: "proof:au-final", cmd: "proof:au-final", tags: ["release"], note: "AU.W10 — the close meta-gate (release-only, NOT ci): --verify-ci green; clean tree minus the 2 documented user-domain entries (inv-θ); AU.FINAL.md cites a green run per wave (W0..W10 incl. W8b) + the deferral register; overfitting zero orphans; the 3.3.0 changeset STAGED not auto-published (publish USER-DOMAIN; package.json stays 3.2.0)" },
    { id: "proof:liquid-glass-tokens", cmd: "proof:liquid-glass-tokens", tags: ["local", "ci"], note: "AV.W15 — the iOS-26 Liquid Glass token-evolution: --glass-edge-light{,-dark} full-perimeter rim wired onto floating/dock, the quiet rung chains saturate (rung parity), the content-aware under-shadow modifier swaps a heavier rung over text, the three @property --specular-* regs, the moving specular paints STATIC under prefers-reduced-motion + a centred var() fallback, the saturate drops with the blur under reduced-transparency, the feDisplacementMap garnish is @supports-gated PE-only (no url(#…) substrate leak), the AA floors at tokens.css:332/339 survive. Bite: strip a guard or a token → RED" },
    { id: "proof:lockfile", cmd: "proof:lockfile", tags: ["local", "ci", "release"], note: "registry-resolution drift guard" },
    { id: "audit:stash", cmd: "audit:stash", tags: ["ci"] },
];

/** The gate cmds tagged for a given aggregate, in manifest order. */
export function gatesFor(mode) {
    return GATES.filter((g) => g.tags.includes(mode));
}

/** Run a tagged subset sequentially; exit nonzero on the first failure. */
function runMode(mode) {
    const set = gatesFor(mode);
    if (!set.length) {
        console.error(`[gates] unknown mode '${mode}' (expected local|ci|release)`);
        process.exit(2);
    }
    console.log(`[gates] running '${mode}' set (${set.length} gates): ${set.map((g) => g.id).join(", ")}`);
    for (const g of set) {
        console.log(`\n[gates] ── ${g.id} ──`);
        try {
            execSync(`npm run ${g.cmd}`, { cwd: ROOT, stdio: "inherit" });
        } catch {
            console.error(`\n[gates] FAIL at '${g.id}' (mode '${mode}')`);
            process.exit(1);
        }
    }
    console.log(`\n[gates] '${mode}' set PASSED (${set.length} gates).`);
}

/**
 * Verify the ci.yml step set matches the manifest's ci-tagged set exactly —
 * so the explicit per-step YAML (kept for Actions-UI visibility) can never
 * silently drift from the manifest. Fails closed on any add/drop.
 */
function verifyCi() {
    const ciPath = resolve(ROOT, ".github/workflows/ci.yml");
    const yaml = readFileSync(ciPath, "utf8");
    const ciSteps = new Set(
        [...yaml.matchAll(/run:\s*npm run ([A-Za-z0-9:_-]+)/g)].map((m) => m[1]),
    );
    const expected = new Set(gatesFor("ci").map((g) => g.cmd));
    // META-STEPS — ci.yml `npm run` lines that are NOT proof gates and so never
    // appear in GATES (the verify-ci meta-step runs the drift check itself). They
    // are allowlisted explicitly: anything ci.yml runs that is neither a ci-tagged
    // gate NOR an allowlisted meta-step is an UNKNOWN step and fails closed (a
    // truly-novel `run: npm run …` line added to ci.yml must be classified here or
    // ci-tagged in the manifest — it can no longer slip through undetected).
    const CI_META_STEPS = new Set(["gates:verify-ci"]);
    const missing = [...expected].filter((c) => !ciSteps.has(c));
    const extra = [...ciSteps].filter(
        (c) => !expected.has(c) && !CI_META_STEPS.has(c),
    );
    if (missing.length || extra.length) {
        console.error("[gates:verify-ci] ci.yml drifted from the gate manifest:");
        for (const c of missing) console.error(`  MISSING from ci.yml: ${c}`);
        for (const c of extra) {
            const known = GATES.some((g) => g.cmd === c);
            console.error(
                known
                    ? `  EXTRA in ci.yml (manifest gate, not ci-tagged): ${c}`
                    : `  UNKNOWN in ci.yml (no manifest gate, not an allowlisted meta-step): ${c}`,
            );
        }
        process.exit(1);
    }
    console.log(`[gates:verify-ci] ci.yml matches the manifest ci set (${expected.size} gates).`);
}

const arg = process.argv[2];
if (arg === "--run") runMode(process.argv[3]);
else if (arg === "--verify-ci") verifyCi();
else if (arg === "--list") {
    const mode = process.argv[3] ?? "local";
    console.log(gatesFor(mode).map((g) => g.cmd).join("\n"));
} else {
    console.error("usage: gates.mjs --run <local|ci|release> | --verify-ci | --list <mode>");
    process.exit(2);
}
