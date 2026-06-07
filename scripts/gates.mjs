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
    {
        id: "test",
        cmd: "test",
        tags: ["local", "ci"],
        note: "release runs it via prepublishOnly",
    },
    { id: "build", cmd: "build", tags: ["local", "ci", "release"] },
    {
        id: "verify-export-types",
        cmd: "verify-export-types",
        tags: ["local", "ci", "release"],
    },
    { id: "profile:budget", cmd: "profile:budget", tags: ["local", "ci", "release"] },
    {
        id: "proof:package",
        cmd: "proof:package",
        tags: ["local", "ci", "release"],
        sibling: true,
        note: "keyframes peer",
    },
    { id: "proof:theme", cmd: "proof:theme", tags: ["local", "ci", "release"] },
    {
        id: "proof:components-css",
        cmd: "proof:components-css",
        tags: ["local", "ci", "release"],
    },
    {
        id: "proof:consumers:static",
        cmd: "proof:consumers:static",
        tags: ["local", "ci", "release"],
        sibling: true,
    },
    {
        id: "proof:consumers:build",
        cmd: "proof:consumers:build",
        tags: ["local"],
        sibling: true,
        note: "walks sibling builds; local-only",
    },
    {
        id: "proof:runtime",
        cmd: "proof:runtime",
        tags: ["local"],
        sibling: true,
        note: "walks sibling builds; local-only",
    },
    {
        id: "proof:resolution",
        cmd: "proof:resolution",
        tags: ["local", "ci", "release"],
        sibling: true,
    },
    {
        id: "proof:phantom-classes",
        cmd: "proof:phantom-classes",
        tags: ["local", "ci", "release"],
        sibling: true,
    },
    { id: "proof:vt-names", cmd: "proof:vt-names", tags: ["local", "ci", "release"] },
    {
        id: "proof:dock-motion-parity",
        cmd: "proof:dock-motion-parity",
        tags: ["local", "ci", "release"],
        note: "AT.W6-dock-c (W8 re-pinned) — dock VT/FLIP timing-parity static gate; the shared source is now var(--spring-dock) (AU.W8)",
    },
    {
        id: "proof:dock-motion-single-source",
        cmd: "proof:dock-motion-single-source",
        tags: ["local", "ci"],
        note: "AU.W8 — the dock FLIP single-frame-origin gate: the layer ref-swap (→opacity) and the width set (→morph) share ONE rAF origin; the perceptual sibling of the string-match proof:dock-opacity-lockstep (the perceptual settle-probe is delegated DOWNSTREAM to the slides deck Playwright — no playwright dep here, KISS)",
    },
    {
        id: "proof:dock-opacity-lockstep",
        cmd: "proof:dock-opacity-lockstep",
        tags: ["local", "ci", "release"],
        note: "AU.W2 (DEMOTED W8 → 'syntactic') — the SAME-TOKEN string-match that the dock fade opacity rides --dock-motion-resize (a 0-frame token settle). The PERCEPTUAL frame-origin sibling is proof:dock-motion-single-source (W8).",
    },
    {
        id: "proof:dock-a11y-contract",
        cmd: "proof:dock-a11y-contract",
        tags: ["local", "ci"],
        note: "AU.W8 — the reka-Tabs dock rail APG contract: role=tablist/tab + aria-selected (NOT aria-pressed), roving tabindex (Arrow/Home/End), focus-ring, keepOpen()/release() on tab focus, inactive-pane aria-hidden (8 rendered-attr assertions)",
    },
    {
        id: "proof:dock-vocabulary",
        cmd: "proof:dock-vocabulary",
        tags: ["local", "ci"],
        note: "AU.W8 — the <Role>Dock README convention (ASK-7, re-grounded): four role names + base primitives + canonical useDock* composables + the useTouchGate/DockTabButton re-groundings. Bite: delete a role → RED",
    },
    {
        id: "proof:dock-css-split",
        cmd: "proof:dock-css-split",
        tags: ["local", "ci", "release"],
        note: "AU.W8b — the dock.css monolith split: the five-control family lives in dock-controls.css, the shared :where() four-state contract STAYS in dock.css (the import root), and index.css imports both. Bite: leave a control rule in dock.css → RED",
    },
    {
        id: "proof:design-idiom-localization",
        cmd: "proof:design-idiom-localization",
        tags: ["local", "ci"],
        note: "AU.W8b — scoped styles consume @theme-generated utilities, not text-[var(--…)]/shadow-[var(--…)] arbitrary wraps (the cascade discipline; sole allowlist: TabsTrigger --active-tab-color runtime binding). Bite: re-inject one wrap → RED",
    },
    {
        id: "proof:tailwind-v4-idiom",
        cmd: "proof:tailwind-v4-idiom",
        tags: ["local", "ci"],
        note: "AV.W16 TW8 — EXTENDS proof:design-idiom-localization with the modern-v4 cohesion asserts: (a) zero theme(colors.…) function sites under src/; (b) no <util>-[var(--z|radius|duration|ease-…)] registered-namespace wrap in an SFC where the bridge mints the named utility (allowlisted sanctioned sites); (c) the dock/chassis carry a @container CONTEXT + read @container size variants (portable into a narrow host); (d) @theme scale completeness — every duration/ease-spring/glass-blur/named-shadow primitive in tokens.css has a theme.css bridge OR a justified holdout. Bite: re-inject a theme() call, a z-[var(--z-dock)] wrap, drop a @container context, or add an un-bridged scale rung → RED",
    },
    {
        id: "proof:au-w9-consumers",
        cmd: "proof:au-w9-consumers",
        tags: ["local", "ci"],
        note: "AU.W9 — each W9 fold (prop/subpath/composable) names ≥2 distinct consumer contexts OR carries a correctness/hygiene tag (the overfitting bar), and every cited consumer resolves at HEAD (in-repo relative + cross-repo absolute). BOOKed items are not tallied. Bite: a 1-consumer untagged fold (or drop a real consumer) → RED",
    },
    {
        id: "proof:doc-consistency",
        cmd: "proof:doc-consistency",
        tags: ["local", "ci", "release"],
        note: "AT.W7-dock-c — CLAUDE.md custom-dir + dependency citations resolve at HEAD (doc-rot guard)",
    },
    {
        id: "proof:au-w0-reground",
        cmd: "proof:au-w0-reground",
        tags: ["local", "ci"],
        note: "AU.W0 — formalize+re-ground meta-gate (AU.md/PROGRESS.md exist; 3 dock SHAs ancestor-reachable; zero bundle labels survive; W6-dock-b collision re-lettered)",
    },
    {
        id: "proof:au-w1-design",
        cmd: "proof:au-w1-design",
        tags: ["local", "ci"],
        note: "AU.W1 — design-slice meta-gate (3 slices cite AT.W1 origin + HEAD delta; the W1c registry enumerates the full AU gate fleet with greening waves)",
    },
    {
        id: "proof:strict-templates",
        cmd: "proof:strict-templates",
        tags: ["local", "ci"],
        note: "AU.W3 KEYSTONE — checkUnknownProps:true across the 3 tsconfigs; <GlassDock bogus-prop> is a RED typecheck (the silent-no-op closer); zero @ts-expect-error suppressions",
    },
    {
        id: "proof:peer-optional",
        cmd: "proof:peer-optional",
        tags: ["local", "ci", "release"],
        note: "AU.W3 — peer optionality is a derived fact of the root bundle (optional IFF absent from dist/glass-ui.js & not core-substrate); the dead optionalPeerDependencies field deleted",
    },
    {
        id: "proof:vueuse-free-root",
        cmd: "proof:vueuse-free-root",
        tags: ["local", "ci"],
        note: "AU.W3 — the root barrel transitively imports no @vueuse/core (SOURCE-graph walk from src/index.ts + DIST-floor grep of glass-ui.js)",
    },
    {
        id: "proof:supportsPostTask-wired",
        cmd: "proof:supportsPostTask-wired",
        tags: ["local", "ci"],
        note: "AU.W3 — supportsPostTask is WIRED (>=1 real caller) or DROPPED — no exported orphan (P3)",
    },
    {
        id: "proof:font-axes",
        cmd: "proof:font-axes",
        tags: ["local", "ci"],
        note: "AU.W4 — every variation axis typography.css references (WONK/SOFT) is carried by the shipped display @font-face (parsed from the woff2 fvar) — no silently-inert axis",
    },
    {
        id: "proof:color-acyclic",
        cmd: "proof:color-acyclic",
        tags: ["local", "ci", "release", "sibling"],
        note: "AU.W5 — the /color leaf graph is a DAG (imports value.js only, no component back-import; value.js/src never imports glass-ui)",
    },
    {
        id: "proof:single-color-core",
        cmd: "proof:single-color-core",
        tags: ["local", "ci"],
        note: "AU.W5 — ONE runtime-JS color source (value.js); no glass-ui src re-defines a value.js color primitive; CSS token tier exempt",
    },
    {
        id: "proof:frostShader-deleted",
        cmd: "proof:frostShader-deleted",
        tags: ["local", "ci"],
        note: "AU.W6 — the frostShader.ts orphan is DELETED (file-absence + import-graph, NOT a name-grep — the name form is born-green at HEAD)",
    },
    {
        id: "proof:webgl-substrate-single",
        cmd: "proof:webgl-substrate-single",
        tags: ["local", "ci"],
        note: "AU.W6 — ONE webgl2 bootstrap (useWebGLCanvas); the substrate bakes no aurora quad/DPR/uniforms; the 3-reason suspend model + demand-gate + context-restore present; the consumer-#2 usability assert exists",
    },
    {
        id: "proof:blob-value-free",
        cmd: "proof:blob-value-free",
        tags: ["local", "ci"],
        note: "AU.W7 — the goo-blob/watercolor-dot are value.js-free (two-tier: source-graph + dist) — the injected ColorResolver seam, not a value.js coupling",
    },
    {
        id: "proof:no-value-default",
        cmd: "proof:no-value-default",
        tags: ["local", "ci"],
        note: "AU.W7 — a no-resolver blob mount THROWS naming defaultBlobColorResolver (the loud failure, not a silent gray default)",
    },
    {
        id: "proof:motion-composables-consumer",
        cmd: "proof:motion-composables-consumer",
        tags: ["local", "ci"],
        note: "AV.W3 — each NEW motion composable (useCountup/vReveal) tallies ≥2 RESOLVING-at-HEAD in-repo consumers (demo route + test); the slides DeckNav fork is `pending` (cross-repo, post-publish), not counted. Bite: drop demo/stories/motion/countup.vue (or the test) → RED",
    },
    {
        id: "proof:motion-value-free",
        cmd: "proof:motion-value-free",
        tags: ["local", "ci"],
        note: "AV.W3 — the W3-lifted/adopted motion composables (useCountup/vReveal/useStagger*/useLayerTransition/useGlassCarousel) consume the keyframes LIGHT tier only (no value.js edge, no loadAnimationEngine/animate/CSSKeyframesAnimation). Sibling of proof:blob-value-free",
    },
    {
        id: "proof:blob-space-gamma",
        cmd: "proof:blob-space-gamma",
        tags: ["local", "ci"],
        note: "AU.W7 — DEC-AT-7 seam: the default resolver paints GAMMA (oklchToGammaRgb, not oklchToLinear); a shader linear-flip must close with linearToSrgb (no too-dark)",
    },
    {
        id: "proof:aurora-space-gamma",
        cmd: "proof:aurora-space-gamma",
        tags: ["local", "ci"],
        note: "AV.W1 — aurora's linear LUT pipeline MUST close with a linearToSrgb() OETF before fragColor (the un-converged-sibling of the blob's A5/A2 darkening trap); the call precedes output, not a dead helper",
    },
    {
        id: "proof:shader-shared-source",
        cmd: "proof:shader-shared-source",
        tags: ["local", "ci"],
        note: "AV.W2 — the aurora↔blob shared GLSL convergence: the OETF + the four Ottosson mat3 literals + the FBM_ROT constant live ONCE in procedural-color.glsl.ts (the single source); comment-stripped, NEITHER metaball.frag.ts NOR aurora.frag.ts re-defines a chunk-owned artefact, and both splice it. Bite: re-inline a local linearToSrgb body or a mat3 literal → RED",
    },
    {
        id: "proof:blob-color-equivalence",
        cmd: "proof:blob-color-equivalence",
        tags: ["local", "ci"],
        note: "AU.W7 — the 8-assertion CPU-equivalence: the metaball OKLCh shader-color TS port matches value.js's Ottosson CPU result to 1e-6 (asymmetric witness #3a7bd5 — the exact-matrix trap detector)",
    },
    {
        id: "proof:fail-explicit",
        cmd: "proof:fail-explicit",
        tags: ["local"],
        note: "AV.W12 — no silent error-swallow in src/: every catch re-throws or carries a '// fail-explicit:' sentinel, and no '?? reactive(' masking default-synthesis on a required dependency. Bite: strip a befitting sentinel or re-inject '?? reactive(BLOB_CONFIG_DEFAULTS)' → RED",
    },
    {
        id: "proof:no-god-module",
        cmd: "proof:no-god-module",
        tags: ["local"],
        note: "AV.W13 — no src/ .ts/.vue file > 500 lines (excludes __tests__/); warns at 300. The five named god-modules (aurora.frag, useSortable, Progress.vue, runtime, metaball) split into cohesive sub-modules. Bite: a file grows past 500 → RED. W6 gates-close folds it into the ci aggregate",
    },
    {
        id: "proof:no-legacy-commentary",
        cmd: "proof:no-legacy-commentary",
        tags: ["local"],
        note: "AV.W12 — the api/index.ts + index.ts barrels carry zero tranche-letter ref / 'tranche' word / vN.N.N version-archaeology in their bodies (the audit trail lives in CHANGELOG.md). Bite: re-inject one 'M.W2' or 'v1.7.0' → RED",
    },
    {
        id: "proof:au-final",
        cmd: "proof:au-final",
        tags: [],
        note: "AU.W10 — the close meta-gate. RETIRED from the release set at the 3.3.0 cut: its assertion #5 (STAGED-NOT-PUBLISHED: version stays 3.2.0 + the changeset staged) guarded the AU→3.3.0 staging window, which closes the moment the cut runs. The user authorized the publish; `changeset version` bumped to 3.3.0 and consumed the changeset, so the staging assertion is fulfilled-and-superseded. AV is the successor tranche (proof:av-final is its close gate). The 21 other release gates carry the release-quality coverage. Kept here untagged for the historical record; bite-runnable via `npm run proof:au-final`.",
    },
    {
        id: "proof:liquid-glass-tokens",
        cmd: "proof:liquid-glass-tokens",
        tags: ["local", "ci"],
        note: "AV.W15 — the iOS-26 Liquid Glass token-evolution: --glass-edge-light{,-dark} full-perimeter rim wired onto floating/dock, the quiet rung chains saturate (rung parity), the content-aware under-shadow modifier swaps a heavier rung over text, the three @property --specular-* regs, the moving specular paints STATIC under prefers-reduced-motion + a centred var() fallback, the saturate drops with the blur under reduced-transparency, the feDisplacementMap garnish is @supports-gated PE-only (no url(#…) substrate leak), the AA floors at tokens.css:332/339 survive. Bite: strip a guard or a token → RED",
    },
    {
        id: "proof:storybook-ia",
        cmd: "proof:storybook-ia",
        tags: ["local", "ci"],
        note: "AV.W10 — the demo manifest matches the §1 11-category IA EXACTLY (category order + per-category story-id set) and no row resolves the lazy() MissingStory fallback. Bite: reorder a category off §1, add/drop a story id, or point a row at a nonexistent .vue → RED",
    },
    {
        id: "proof:no-orphan-demo-route",
        cmd: "proof:no-orphan-demo-route",
        tags: ["local", "ci"],
        note: "AV.W10 — bidirectional set-equality: every demo/stories/<category>/<id>.vue ↔ exactly one manifest row (helper dirs/root chassis excluded by the category-scoped walk). Bite: leave an unreferenced .vue (orphan file) or a row → missing file (dangling row) → RED",
    },
    {
        id: "proof:font-canon",
        cmd: "proof:font-canon",
        tags: ["local", "ci"],
        note: "AV.W10 — every NAMED font-family in the demo tables (defaults.ts FONT_OPTIONS + DEFAULT_CONFIG.font), the demo presets, and the library --font-stack-* tokens resolves to a shipped @font-face (parsed from fonts.css + demo.css + typography.css) OR a generic/system keyword. Bite: re-add cm-serif / point --font-stack-serif at a non-shipped face → RED",
    },
    {
        id: "proof:lockfile",
        cmd: "proof:lockfile",
        tags: ["local", "ci", "release"],
        note: "registry-resolution drift guard",
    },
    {
        id: "proof:di-consistency",
        cmd: "proof:di-consistency",
        tags: ["local", "ci"],
        note: "AV.W14 — every InjectionKey<T> context that hand-rolls a strict-or-optional triplet collapses onto the canonical createStrictContext/createOptionalContext pair (dock/dock-layer = strict+optional, toggle-group/glyph-face/configurator = optional, sortable = strict; goo-blob BLOB_CONFIG_KEY is an allowlisted // di-default: external-provide key); the strict-vs-optional matrix matches; mulberry32/hashString defined exactly once (src/utils/prng.ts). Bite: re-inline a hand-rolled inject()+throw triplet → RED",
    },
    {
        id: "proof:no-nested-import",
        cmd: "proof:no-nested-import",
        tags: ["local", "ci"],
        note: "AV.W14 — zero runtime nested import()/require() inside any src/ function body UNLESS the line carries a // lazy-boundary: sentinel (the keyframes loadAnimationEngine HEAVY-tier seam shape); inline type-position import(\"…\") is flagged (hoist to a top-level import type). Structure-lock — the count is zero at HEAD. Bite: add a nested await import() without the sentinel → RED",
    },
    {
        id: "proof:no-test-in-src",
        cmd: "proof:no-test-in-src",
        tags: ["local", "ci"],
        note: "AV.W14 — zero *.{test,spec,test-d} files + zero __tests__/ dirs under src/; all tests live in the top-level tests/ tree mirroring src/ (the glsl-port fixture rides with its tests). Bite: drop a *.test.ts back under src/ → RED",
    },
    {
        id: "proof:spring-tokens-synced",
        cmd: "proof:spring-tokens-synced",
        tags: ["local", "ci", "release"],
        note: "AV.W14 — the build-pipeline orchestration guarantee: the committed --spring-* block in tokens.css matches the regen-spring-tokens.mjs generator output (the external mutation point is NOT in `build`, so this gate guards the silent-drift gap). Bite: hand-edit one --spring-* value → RED, then run the generator + commit → green",
    },
    {
        id: "proof:offscreen-pause",
        cmd: "proof:offscreen-pause",
        tags: ["local", "ci"],
        note: "AV.W7 — the useWebGLCanvas substrate parks its RAF when the host is content-hidden (contentvisibilityautostatechange/F1) OR scrolled offscreen (IntersectionObserver off-screen seam/F4) OR the tab is backgrounded (document.hidden/F4) OR prefers-reduced-motion is live + re-monitored (G1, one static frame then park). A SEAM assertion (reads the visibility/PRM state), not a live-frame gate. Bite: remove the content-visibility hook / the off-screen IO wiring / the matchMedia change re-monitor → RED",
    },
    {
        id: "proof:constellation-substrate-single",
        cmd: "proof:constellation-substrate-single",
        tags: ["local", "ci"],
        note: "AW.W17 — the Constellation lattice lands the AV.W8-gated pair (consumer #1 demo + consumer #2 slides H.W10). THREE asserts: SUBSTRATE-EXISTS (useCanvas2D exports createCanvas2D + carries the same suspend-Set/content-visibility/tab-hidden/live-PRM-re-monitor park machinery as useWebGLCanvas); PRNG-SINGLE-SOURCE (Constellation.vue imports mulberry32/hashString from utils/prng, NOT a private re-roll); ANOMALY-IS-SKIN (zero ncsu/anomaly/Fira Code/accentColor literal in the constellation source — the branded skin reaches the canvas only via the consumer drawOverlay). Bite: re-roll a private mulberry32 → RED; paint an anomaly pass in the source → RED; drop the substrate matchMedia re-monitor → RED",
    },
    {
        id: "proof:canvas2d-substrate",
        cmd: "proof:canvas2d-substrate",
        tags: ["local", "ci"],
        note: "AW.W17 — the useCanvas2D park/freeze/dispose contract (the Canvas2D substrate paralleling useWebGLCanvas). Asserts the suspend Set gates isRunning() (a tab-show cannot lift an off-screen suspension), reduced-motion paints ONE static frame then parks, document.hidden parks, dispose() is idempotent",
    },
    {
        id: "proof:constellation-field",
        cmd: "proof:constellation-field",
        tags: ["local", "ci"],
        note: "AW.W17 — the pure field engine: seedField lays out `count` nodes within bounds (reproducible under a seed), stepField bounces a node off a wall (velocity sign flips) + preserves speed under pointer steering, the four neutral passes paint without throwing",
    },
    {
        id: "proof:input-invalid-aria",
        cmd: "proof:input-invalid-aria",
        tags: ["local", "ci", "release"],
        note: "AW.W18 — the .input-pill invalid-ring selector group honors [aria-invalid=\"true\"] alongside :user-invalid + .user-invalid-fallback, so an app-driven (non-native-validation) form gets the library's destructive ring with NO consumer :deep() re-paint. Two asserts: THREE-MEMBER (every .input-pill invalid rule carries all three trigger surfaces) + RECIPE-INTACT (the ring still resolves var(--destructive) — widened, not replaced). Born RED on HEAD (two of three). Bite: drop the [aria-invalid] arm → RED",
    },
    {
        id: "proof:styling-hygiene",
        cmd: "proof:styling-hygiene",
        tags: ["local", "ci"],
        note: "AW.W20 — the styling assay LOCK. Asserts the named brittle magic-numbers resolve through tokens (the BouncyToggle pill-track trim reads a --bouncy-track-trim token, not a repeated hand-computed rem); the glass-panel/card demo tier-force controls render as <ToggleGroup> with NO surviving raw-<button> tier re-roll (the ToggleGroup bite); useTokenColor carries a public-vs-reference doc block. Bite: re-roll a raw <button class=...border...> tier control → RED; hardcode the pill-track trim back to a literal → RED",
    },
    {
        id: "proof:subpath-enumeration",
        cmd: "proof:subpath-enumeration",
        tags: ["local", "ci", "release"],
        note: "AV.W5.A — the exports↔dist↔libraryEntries surface-invariance gate after the 58 trivial subpath barrels collapsed into src/subpaths/ + the vite batch-resolve. Three asserts: ENUM-COMPLETE (every JS subpath export maps to an existing dist/<name>.js), NO-ORPHAN-CHUNK (every libraryEntries chunk has an exports entry), BATCH-EQUIV (the batch-resolve key set equals the JS subpath publication name-for-name). Bite: drop a src/subpaths/<name>.ts (chunk vanishes) while leaving its export → RED (dangling export)",
    },
    {
        id: "proof:no-orphan-composable",
        cmd: "proof:no-orphan-composable",
        tags: ["local", "ci"],
        note: "AV.W5.B — the composables sub-tree structure-lock: every composable leaf lives in a named domain sub-tree; only index.ts may sit loose at src/composables/ top level (the isMac platform leaf stays keyboard-internal — single-consumer, J inv 10 forbids a one-consumer platform/ sub-tree). Bite: drop a loose useFoo.ts at src/composables/ top level → RED",
    },
    {
        id: "proof:speedtest-boundary",
        cmd: "proof:speedtest-boundary",
        tags: ["local", "ci"],
        note: "AV.W17 — the speedtest-origin ownership lock (SPECIALIZES proof:no-orphan-composable): the ≥2-consumer bar, not the origin, decides ownership. STAY-as-CORE (useYieldToMain, usePrioritizedTask, useViewTransition — genuine consumer or public-export grounding) must keep leaf + barrel export; MOVED→speedtest orphans (useBreakpoint, useIdleReady, useViewportReady, useStagger, useAnimatedNumberMap — zero genuine glass-ui consumer) must be gone (no leaf, no barrel re-export). Bite: re-add a moved orphan leaf/export, or drop a STAY primitive's export → RED",
    },
    {
        id: "proof:shadow-contract",
        cmd: "proof:shadow-contract",
        tags: ["local", "ci", "release"],
        note: "AV.W4.A — the --shadow-cartoon-lg override-contract LOCK. glass-ui ships --shadow-cartoon-{sm,md,lg} as its OWN identity tokens; a consumer retints by OVERRIDING the :root token (re-resolves every .shadow-cartoon-* utility + cartoon-surface site), NOT by re-declaring a dead local orphan. THREE asserts: CHAIN-INTACT (tokens.css raw+alias → theme.css @theme bridge → utilities.css utility → cards.css cartoon-surface consumer); OVERRIDE-RESOLVES (the utility + cartoon-surface read var(--shadow-cartoon-lg), not a literal — the bite); DARK-ARM-ALLOWED (--shadow-color: var(--foreground) flips under .dark, so the color-mix cartoon shadow is token-adaptive by construction — the .dark re-resolution is allowlisted, not a false-RED). Bite: hardcode the .shadow-cartoon-lg utility box-shadow to a literal → RED; OR delete the @theme bridge → RED",
    },
    {
        id: "proof:card-cartoon-consumers",
        cmd: "proof:card-cartoon-consumers",
        tags: ["local", "ci"],
        note: "AV.W4.C — the Card surface=\"cartoon\" ≥2-consumer muster (J inv 10). The cartoon dark arm is token-adaptive BY CONSTRUCTION (cartoon-surface reads only var(--shadow-cartoon-{md,lg}) which ride color-mix(... var(--shadow-color)); no light literal leaks). The gate locks ≥2 DISTINCT resolving consumer contexts (demo story + unit test) so the decoration is not substrate-without-consumer. Bite: drop a consumer to <2 → RED; cite a path that does not resolve at HEAD → RED",
    },
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
    console.log(
        `[gates] running '${mode}' set (${set.length} gates): ${set.map((g) => g.id).join(", ")}`,
    );
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
    const extra = [...ciSteps].filter((c) => !expected.has(c) && !CI_META_STEPS.has(c));
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
    console.log(
        `[gates:verify-ci] ci.yml matches the manifest ci set (${expected.size} gates).`,
    );
}

const arg = process.argv[2];
if (arg === "--run") runMode(process.argv[3]);
else if (arg === "--verify-ci") verifyCi();
else if (arg === "--list") {
    const mode = process.argv[3] ?? "local";
    console.log(
        gatesFor(mode)
            .map((g) => g.cmd)
            .join("\n"),
    );
} else {
    console.error(
        "usage: gates.mjs --run <local|ci|release> | --verify-ci | --list <mode>",
    );
    process.exit(2);
}
