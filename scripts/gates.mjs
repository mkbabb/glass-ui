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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { argv } from "node:process";
import { fileURLToPath } from "node:url";
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
    {
        id: "profile:budget",
        cmd: "profile:budget",
        tags: ["local", "ci", "release"],
        // In CI the `build` step already ran; skip the re-build inside the budget
        // gate (the env the hand-mirror carried — now single-sourced into emit-ci).
        env: { GLASS_UI_BUDGET_SKIP_BUILD: "1" },
    },
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
        id: "proof:dock-opacity-lockstep",
        cmd: "proof:dock-opacity-lockstep",
        tags: ["local", "ci", "release"],
        note: "AU.W2 — the SAME-TOKEN string-match that the dock fade opacity rides --dock-motion-resize. The PERCEPTUAL frame-origin truth is now proof:dock-animation-live (the live-rAF box-vs-child lead/lag gate); the AX.W01 single-scalar --dock-morph-t morph retired the VT/FLIP fork that the prior proof:dock-motion-parity + proof:dock-motion-single-source static gates policed.",
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
        id: "proof:dock-region-model",
        cmd: "proof:dock-region-model",
        tags: ["local", "ci"],
        note: "AX.W45 — the dock three-region morph + H/V proportion parity + --dock-scale mobile multiplier + glyph ownership + <DockSeparator>. Device-free SOURCE-STRUCTURE arm (runs + hard-REDs on EVERY runner; the PAINTED render — persistent slot in both states on one spring, the 1.5×-in-lockstep mobile scale, the axis-aware separator — is the W00 π live audit). Asserts: GlassDock emits a `#persistent` slot region (`.dock-persistent` guarded by `$slots.persistent`, NOT in the inert two-pane crossfade); the vertical dock reads `var(--dock-layer-gap)` (NOT a hardcoded `gap: 0.25rem`); the coarse block sets ONE `--dock-scale: var(--dock-mobile-scale)` (NOT two floor blocks) with the density geometry `calc(* --dock-scale)`-threaded + a `max(…)` WCAG clamp; `.dock-icon-button > svg` reads `--dock-icon-glyph: calc(1.25rem * --dock-scale)`; DockSeparator exists + reads useOptionalDockContext + is barrel-exported + paints PERPENDICULAR (horizontal rule in a column dock, full-row section-break in a grid dock); the DK2 `--dock-control-{hover,active}-bg` four-state pair (pickers off the opaque --muted); the DK8 `--dock-layer-rail-bg` + the axis-aware indicator (translateY default, .vertical-group translateX); zero demo raw `<div class=dock-separator>` sites. Bite: keep the binary two-pane template → persistent RED; hardcode the vertical gap → parity RED; re-add a floor block → scale RED; drop the > svg rule → glyph RED; un-export DockSeparator → primitive RED.",
    },
    {
        id: "proof:dock-perfection",
        cmd: "proof:dock-perfection",
        tags: ["local", "ci"],
        note: "AX.W45-TUNE — the dock-perfection close (the TUNE+re-point layer on the settled W45 structure). Device-free SOURCE arm: Q1 the collapsed-pill floor tokens (--dock-collapsed-summary-min-size + --dock-collapsed-padding) minted + a symmetric min-block-size on the collapsed summary (a tight squircle, not a full-row stub); C2 --dock-tile-pad threaded through --dock-scale in every density rung; Q3 the dock hover reads a real GLASS register (--dock-control-hover-bg off --glass-bg-resting + --scale-hover-dock on all 4 members); C4 the dock-control REST specular default-off (rest intensity 0, the keyframes I.W6 19→0 tracks) + all 4 members in the specular ::before family + the 22% small-tile gleam; C5 the selected/active state reads GLASS (--dock-control-active-bg off --glass-bg-floating, the gleam held lit on .is-active/[aria-pressed]); C7 the vertical three-region body is STRUCTURAL (.dock-layer--vertical-body, not a bare <slot/>); C1 the demo DockIconButton glyphs drop their explicit size so --dock-icon-glyph paints. The π live DELTA (W45-DELTA.md — Q1 geometry + Q3 hover rest-vs-hover readback) is the binding close. Bite: revert a token/register → the matching witness REDs.",
    },
    {
        id: "proof:dock-unify",
        cmd: "proof:dock-unify",
        tags: ["local", "ci"],
        note: "AX.W61 — the unified dock nav-pattern contract (home-left #persistent + nav + <DockSeparator>, ONE GlassDock root) + the Q1 collapsed-floor --dock-scale thread + the glass-first selected control. Device-free SOURCE arm: F1 --dock-collapsed-padding threads --dock-scale + both floor tokens below the expanded values; F2 the symmetric collapsed-summary min-block-size; F3 --dock-control-active-bg is a --glass-bg-* tier (NOT --surface-tint-N) AND active != hover; F4 the W61-owned showcase docks compose <GlassDock>+<DockSeparator> with zero raw-class separators + home-left #persistent (shell docks tracked pendingW40); F5 CLAUDE.md records the contract. The W00 π live arm (W61-DELTA.md) is the binding close. Bite: re-point active to surface-tint-12 → F3 RED; flat padding literal → F1 RED; a raw-class separator → F4 RED.",
    },
    {
        id: "proof:dock-css-carve",
        cmd: "proof:dock-css-carve",
        tags: ["local", "ci"],
        note: "AX.W06 — the dock.css → src/styles/dock/ carve: dock.css is a thin @import root over the cohesive dock/{shell,morph,density,layers,layer-group,overflow}.css partials (each < 500 lines, the no-god-module budget), the shared four-state :where() contract stays, and index.css's import order is preserved. Bite: a partial grows past 500, or a control rule leaks back into dock.css → RED.",
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
        note: "AV.W3 — the W3-lifted/adopted motion composables (useCountup/vReveal/useStagger*/useLayerTransition) consume the keyframes LIGHT tier only (no value.js edge, no loadAnimationEngine/animate/CSSKeyframesAnimation). Sibling of proof:blob-value-free",
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
        id: "proof:aurora-oklch-interp",
        cmd: "proof:aurora-oklch-interp",
        tags: ["local", "ci"],
        note: "AW.W5.1 — the in-shader OKLCh palette interpolation: the spliced OKLCH_MATRICES_GLSL match value.js to 1e-6, the turns-domain interpolateHue port matches value.js to 1e-6 (ANTIPODE 30→210 + warm→cool-longer 30→250 seeded as named rows — the radians-native trap diverges 180° at the antipode), the OKLab-rectangular midpoint holds chroma above linear-mix, the OKLCh hue-arc holds chroma on the antipodal pair. Bite: revert samplePalette to linear mix() → midpoint REDs; PI/+TAU radians port → antipode REDs",
    },
    {
        id: "proof:aurora-derive-gamut",
        cmd: "proof:aurora-derive-gamut",
        tags: ["local", "ci"],
        note: "AW.W5.2 — every stop of every (harmony × lightnessEasing × chromaEasing × temperature) over a neon-seed matrix is in sRGB after gamutMapStop (no over-1 escape reaches the bake); deriveScene returns an in-gamut palette + composed rule-of-thirds nuclei for every mood. Bite: remove gamutMapStop from a derive branch → an over-1 neon stop REDs",
    },
    {
        id: "proof:aurora-tensor-field",
        cmd: "proof:aurora-tensor-field",
        tags: ["local", "ci"],
        note: "AW.W4.1 — the structure-tensor / ETF orientation keystone: structureTensorField() carries the Sobel→2x2 tensor→closed-form eigen-decomposition (the principal-angle atan2 + coherence A), the MINOR eigenvector is the edge TANGENT (its perpendicular), the uFlowPattern==5 (tensor) flow branch + the bestOil uStrokeOrient==1 switch are present, and uStrokeOrient is threaded shader→glSetup→bridge→STROKE_ORIENT_ID. The painterly.test.ts arm asserts the eigen-math against a synthetic gradient field. Bite: swap the minor eigenvector for the MAJOR (the gradient/normal) → the orientation assertion REDs",
    },
    {
        id: "proof:aurora-impasto-relight",
        cmd: "proof:aurora-impasto-relight",
        tags: ["local", "ci"],
        note: "AW.W4.2 — the faked fixed-RGB rim (vec3(0.18,0.15,0.11)) is RETIRED from paintOver; paintOver accumulates an inout float height, relightImpasto derives a normal from dFdx/dFdy(height) + applies diffuse + Blinn specular from the movable uLightDir/uLightColor in LINEAR before aces(); the light uniforms are threaded shader→glSetup→bridge. Bite: restore the fixed rim → RED",
    },
    {
        id: "proof:aurora-vangogh-preset",
        cmd: "proof:aurora-vangogh-preset",
        tags: ["local", "ci"],
        note: "AX.W13 (re-authored born-RED) — van-Gogh is a FIRST-CLASS body, NOT a `return mediumOil(...)` passthrough: (1) union+id+dispatch, (2) mediumVangogh composes a vangogh StrokeProfile (not mediumOil), (3) the comma/crescent strokeShape (type==4) + the MEDIUM_VANGOGH profile case, (4) SPARSE density gates + full-height impasto (impastoFloor=1.0), (5) the energy grade is a PROFILE field (energyGrade=1.0 + bestOil(energyGrade) param), NOT a buried `if(uMedium==5)` branch, + the OKLCh per-stroke jitter. Bite: revert to `return mediumOil(...)` → (2) RED; re-bury the energy grade as `if(uMedium==5)` in bestOil → (5) RED",
    },
    {
        id: "proof:aurora-oilpastel-medium",
        cmd: "proof:aurora-oilpastel-medium",
        tags: ["local", "ci"],
        note: "AX.W13 (re-authored born-RED) — oil-pastel and dry-crayon are SEPARATE bodies sharing the SUBSTRATE, not the dispatch body: (1) mediumOilPastel is a distinct function, (2) uMedium==4→mediumCrayon + uMedium==6→mediumOilPastel (DIFFERENT bodies), (3) oil-pastel deposits via the brush engine off its own profile, (4) dry crayon stays the tooth-multiply with NO sheen/burnish (the burnish film is oil-pastel's signature) + keeps OKLCh broken color + the tensor orientation, (5) oil-pastel + crayon are first-class mediums (MEDIUM_ID 6 + 4); the strokeMode:\"crayon\" peer-route is REMOVED; dist/aurora.js inside the governor ceiling. Bite: re-point uMedium==6→mediumCrayon → (2) RED; give crayon a burnish film → (4) RED; restore strokeMode:\"crayon\" → (5) RED",
    },
    {
        id: "proof:aurora-stroke-composite",
        cmd: "proof:aurora-stroke-composite",
        tags: ["local", "ci"],
        note: "AX.W13 (new born-RED) — paintOver composites in OKLab on the painterly stroke mediums (a paintOverOklab L,a,b lerp via linOklab/oklabToLinearSrgb, gated by isPainterlyStroke = uMedium 3|5|6), NOT a bare linear mix(col,c,alpha); the within-stroke modulation perturbs HUE(.z)+CHROMA(.y) in OKLCh (oklabToOklch→oklchToOklab), gated by uBrokenColor, NOT value-only; the OKLab/OKLCh matrices are single-sourced from the shared procedural-color chunk (OKLCH_MATRICES_GLSL splice + linOklab) with NO inline matrix in brush.glsl.ts; the smooth pole keeps the linear-mix fallback. Bite: revert paintOver to a bare linear mix → (1) RED; revert the modulation to value-only → (2) RED; inline an Ottosson matrix in brush.glsl.ts → (3) RED",
    },
    {
        id: "proof:aurora-painterly-statistics",
        cmd: "proof:aurora-painterly-statistics",
        tags: ["local", "ci"],
        note: "AX.W13 (new born-RED; π-lane fail-CLOSED, HARDENING §G #16) — the operationalized 'stunning' bar: a real-GPU readback of the van-Gogh / oil-pastel / crayon / oil mediums at t=1 asserts (a) van-Gogh atomicity gap-fraction above a floor (discrete dabs, not a coverage smear), (b) no-flat-fills local density variance per painterly medium, (c) van-Gogh OKLab overlap-not-grey (mean chroma above the muddy-grey threshold), (d) the four media pairwise MEASURABLY distinct (no passthrough/shared-body collapse), against the public-domain Starry Night crop fixture. Device-absent → befitting-silent SKIP; a PRESENT-GPU passthrough/shared/linear-mix render → FAIL. Bite: a passthrough van-Gogh measures zero gap-fraction + grey overlap + two-media-identical → RED",
    },
    {
        id: "proof:aurora-atoms-roundtrip",
        cmd: "proof:aurora-atoms-roundtrip",
        tags: ["local", "ci"],
        note: "AW.W6 — resolveAtoms is a PURE TOTAL mapper over the ≤7 Tier-1 atoms (seed/harmony/mood/medium/textureAmount/motion/zones): a fuzz over the full atom-combination matrix (incl. out-of-range inputs) yields a valid in-range AuroraConfig respecting every budget.ts cap, AND resolveAtoms(DEFAULT_ATOMS) deep-equals DEFAULT_AURORA_CONFIG (the wispy-sky default survives the new door). Bite: change a DEFAULT_ATOMS value (default ≠ wispy-sky) → RED; OR remove a budget clamp so a vivid×6-zone combination overflows → RED",
    },
    {
        id: "proof:aurora-wgsl-equivalence",
        cmd: "proof:aurora-wgsl-equivalence",
        tags: ["local", "ci"],
        note: "AW.W7a + AX.W11 — the WGSL color/noise twin (OETF_WGSL + OKLCH_MATRICES_WGSL + FBM_ROT_WGSL + PALETTE_RAMP_WGSL) matches its GLSL twin to 1e-6 via the hand-transcribed WGSL→TS ports asserted against the EXISTING GLSL oracle (metaball-color.glsl-port.ts; never a new oracle) over the asymmetric witness #3a7bd5 AND the samplePaletteRamp across huePath modes (flat OKLab-rect + the OKLCh hue-arc) at t∈{0.25,0.5,0.75}, AND aurora.wgsl.ts SPLICES the shared chunk's WGSL exports (incl. PALETTE_RAMP_WGSL + samplePaletteRamp + the huePath:f32 uniform) rather than re-authoring/flat-lerping the ramp. Bite: perturb a WGSL matrix/OETF constant → the 1e-6 equivalence REDs; re-author the WGSL OETF inline OR revert samplePalette to the flat oklabToLinearSrgb(mix(labA,labB,f)) → the splice arm REDs",
    },
    {
        id: "proof:aurora-noise-hash-equivalence",
        cmd: "proof:aurora-noise-hash-equivalence",
        tags: ["local", "ci"],
        note: "AX.W12 — the NET-NEW painterly noise basis (Jarzynski PCG2D integer-bit hash + 2D simplex gradient noise) lives ONCE in procedural-color.glsl.ts as a GLSL twin (PCG_HASH_GLSL) + WGSL twin (PCG_HASH_WGSL); the hand-transcribed TS port (noise-hash.glsl-port.ts — certified bit-identical integer pipeline: GLSL uint/WGSL u32 wrap mod 2^32, floatBitsToUint/bitcast reinterpret the same IEEE-754 bits) matches frozen 1e-6 oracle witnesses, AND BOTH aurora.frag.ts + aurora.wgsl.ts SPLICE the chunk twin (import + ${...} interpolation) rather than re-authoring the hash inline. Bite: perturb a PCG constant (1664525u/1013904223u) or the simplex F2/G2 → the 1e-6 equivalence REDs; re-author the pcg2d/gnoise body inline in either shader → the splice/no-inline arm REDs",
    },
    {
        id: "proof:aurora-backend-fallback",
        cmd: "proof:aurora-backend-fallback",
        tags: ["local", "ci"],
        note: "AW.W7b — the WebGL2 single-pass fragment shader is the DECLARED zero-regression fallback; resolveRenderModeAsync drops a null adapter AND an isFallbackAdapter software adapter to webgl (NOT webgpu), runtime.ts routes to createGPUCanvas only when a device is present (else createWebGLCanvas), the WGSL twin draws the single-pass aurora, and useAurora runs the probe behind the deferred first-paint schedule. Bite: break the WebGL2 fallback route (probe always returns webgpu / accepts a fallback adapter) → RED",
    },
    {
        id: "proof:webgpu-substrate-single",
        cmd: "proof:webgpu-substrate-single",
        tags: ["local", "ci"],
        note: "AW.W7b — the WebGPU substrate-binary gate (the proof:webgl-substrate-single by-irrelevance hole): the navigator.gpu device acquisition is confined to the sanctioned sites (renderMode.ts probe via requestAdapter→requestDevice + createGPUCanvas.ts swapchain), NO baked aurora pass-count/rgba16float/Kuwahara-sector-count in EITHER substrate (createCanvasLifecycle/createGPUCanvas), and aurora.wgsl.ts SPLICES the shared procedural-color WGSL chunk. Bite: bake passCount=4/rgba16float into createGPUCanvas → RED; add a 2nd navigator.gpu acquisition → RED; re-author the WGSL OETF inline → RED",
    },
    {
        id: "proof:aurora-interaction-prm",
        cmd: "proof:aurora-interaction-prm",
        tags: ["local", "ci"],
        note: "AW.W8 — every interactive axis (cursor-as-light, velocity-burst, scroll, the WebGPU wake) routes through the MASTER TEMPO SCALAR (masterTempo() → 0 under getReducedMotion()); the tempo scales the integrated cursor advance (the step), NEVER uTime; injectCursorVelocity (the cursor write-path, which fires from the off-rAF-loop pointermove listener) EARLY-OUTS on canvasHandle.reducedMotion; NO parallel matchMedia (the substrate owns PRM); the wake advect pass gates the splat by uTempo (dt-fed, never uTime); interaction-prm.test.ts asserts tempo=0 freezes the velocity+burst. Bite: detach an axis from the tempo scalar / let the pointermove handler write without the reducedMotion early-out → RED",
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
        id: "proof:story-language",
        cmd: "proof:story-language",
        tags: ["local"],
        note: "AX.W58 — the demo storybook (demo/stories/**) carries zero internal META-LANGUAGE in prose OR code-comments (a demo visitor reads WHAT a component does + WHEN to reach for it, not the library's dev history). FORBIDDEN: a tranche/wave/defect code (\\b[A-Z]{1,2}\\.W\\d), the word 'tranche', a proof:* gate name, a 'muster <Letter>' code, a WCAG citation in prose (WCAG 2.2.2 / WCAG-AA / WCAG 1.4.11), and the named impl-note signatures (ref-counted, provide-inject, inheritAttrs, binary-consumer, overfitting, #collapsed slot). Live forward refs to real public names (a --token, a <Component>, a /subpath) stay green. Bite: re-inject one 'AX.W17' or 'WCAG 2.2.2' or 'proof:foo' into any demo/stories SFC → RED.",
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
        id: "proof:demo-radial-calm",
        cmd: "proof:demo-radial-calm",
        tags: ["local", "ci"],
        note: "AX.W57 — P6 pulse-aura calm + P7 demo hero-radial → Aurora. Device-free SOURCE scan: tokens.css ships --pulse-aura-strength ≤ 0.25 + --pulse-aura-breath-max ≤ 0.5 and the pct/num twin is collapsed out of Pulse.vue (A); each of the four Class-A hero files (hero/intro/paper-glass/auth-shell) imports + renders <Aurora> and carries ZERO hand-rolled radial-gradient( (B); no non-allowlisted demo story carries a > 30%-alpha full-bleed radial (C). Bite: raise --pulse-aura-strength to 0.55 → A reds; re-add a radial to a hero or drop its <Aurora> → B reds; add a loud full-bleed radial to a non-keep story → C reds",
    },
    {
        id: "proof:gate-detrap",
        cmd: "proof:gate-detrap",
        tags: ["local"],
        note: "AX.W63 — the /compositions/gate-pattern DE-TRAP (the pass-3 Q8 BLOCKER: the demo opened a full-viewport non-dismissable modal ON MOUNT and locked the visitor out). Device-free SOURCE scan: gate-pattern.vue has NO `open = ref(true)` on-mount open (A); the gate demonstration renders inside a bounded glass-card preview frame (<Card> / .glass-card, the W54 glass-first default) (B); an explicit on-page <Button> opens the modal demo on demand (`open.value = true` handler — the visitor controls the preview, the page stays reachable) (C); the suppression idiom is PRESERVED (`:show-close=\"false\"` + the three @escape-key-down/@interact-outside/@pointer-down-outside .prevent still present — the demo still TEACHES the non-dismissable pattern) (D); the gate-pattern manifest blurb carries no \\b[A-Z]{1,2}\\.W\\d tranche code (E). The not-trapped PAINTED truth rides the π live arm (the visitor reaches the page). Bite: re-add open=ref(true) → A reds; drop the glass-card frame → B reds; remove the trigger Button → C reds; strip a @*.prevent / :show-close → D reds (over-correction guard); re-inject a tranche code into the blurb → E reds",
    },
    {
        id: "proof:font-canon",
        cmd: "proof:font-canon",
        tags: ["local", "ci"],
        note: "AV.W10 · AX.W22 demoted to NECESSARY-only static pre-check (the SUFFICIENT live truth is proof:font-cascade-live). Every NAMED font-family in the demo tables (defaults.ts FONT_OPTIONS + DEFAULT_CONFIG.font), the demo presets, and the library --font-stack-* tokens resolves to a shipped @font-face (parsed from fonts.css + demo.css + typography.css) OR a generic/system keyword; a var(--font-stack-*) chain alias is skipped (it resolves to the canonical --font-stack-text, itself checked). Bite: re-add a non-shipped face (Fraunces) / point --font-stack-text at a non-shipped face → RED",
    },
    {
        id: "proof:font-cascade-live",
        cmd: "proof:font-cascade-live",
        tags: ["local", "ci"],
        note: "AX.W22 — the font-register reconciliation gate (the library DEFAULT register == the rendered register; one brand voice, no preset opt-out, no serif body). Device-free STRUCTURE arm (runs + hard-REDs on EVERY runner): tokens.css §0 single-sources --font-stack-text (Plus Jakarta) with --font-stack-display aliasing it + --font-stack-serif GONE; theme.css bridges --font-text + folds the --font-serif bridge onto --font-stack-text; typography.css body{} reads var(--font-text) + the ladder re-grounds + the WONK/SOFT machinery (--font-display-variation-settings/--font-display-weight) is excised; the brand-uniform-sans preset + --font-brand-sans are gone; DELETION proof — src/fonts/fraunces/ + the Fraunces @font-face + the index.html data-typography-preset + the demo.css --font-brand-sans + the configurator Fraunces option are all gone, and .cm-serif (the DISTINCT math voice) survives non-Fraunces. π-lane RENDER arm (fail-CLOSED when the tests-visual workspace is present; font-cascade-live.spec.ts): loads the demo, awaits document.fonts.ready, reads getComputedStyle on body/.text-display-*/.fira-code/.text-admin-label, asserts the resolved face IS the brand register (document.fonts.check + a canvas width-fingerprint vs a serif control to defeat the metric-matched-fallback silent-pass), and BITES on a Georgia --font-text override. Bite: re-point --font-stack-text at a serif → STRUCTURE 1 RED; restore the preset attr → STRUCTURE RED; a serif-first computed body family → RENDER RED.",
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
        note: "AV.W14 — every InjectionKey<T> context that hand-rolls a strict-or-optional triplet collapses onto the canonical createStrictContext/createOptionalContext pair (dock/dock-layer = strict+optional, toggle-group/configurator = optional, sortable = strict; goo-blob BLOB_CONFIG_KEY is an allowlisted // di-default: external-provide key); the strict-vs-optional matrix matches; mulberry32/hashString defined exactly once (src/utils/prng.ts). Bite: re-inline a hand-rolled inject()+throw triplet → RED",
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
        note: "AW.W17 — the useCanvas2D park/freeze/dispose contract (the Canvas2D substrate paralleling useWebGLCanvas). Asserts the suspend Set gates isRunning() (a tab-show cannot lift an off-screen suspension), reduced-motion paints ONE static frame then parks, document.hidden parks, dispose() is idempotent. AX.W37 re-pointed the rename createCanvas2D→useCanvas2D inside the test (the /canvas-published contract name)",
    },
    {
        id: "proof:resolve-canvas-color",
        cmd: "proof:resolve-canvas-color",
        tags: ["local", "ci"],
        note: "AX.W37 — resolveCanvasColor, the shared light-dark()→rgb() probe-span resolver for a Canvas2D strokeStyle/fillStyle write. A readback test: a bare --token / light-dark() / color-mix() value resolves to a canvas-valid rgb()/rgba() (NOT the raw, silently-Canvas2D-REJECTED token that paints black); the resolved color FLIPS light↔dark; the transient probe is appended-into-then-removed-from `el` with the host's own inline style untouched (token READER, not writer); SSR/no-DOM falls back befitting-silent (returns the input, never throws). Born-RED at HEAD (the helper did not exist). The TRUE light/dark rgb() paint readback is the π-lane VISUAL-TRUTH audit. Bite: hand a light-dark() token straight to strokeStyle without the resolver → black",
    },
    {
        id: "proof:text-highlight",
        cmd: "proof:text-highlight",
        tags: ["local", "ci"],
        note: "AX.W37 — VERIFIES (does not re-ship, §4 note 12) the useTextHighlight re-home onto /motion-core + the already-landed FuzzySearch CSS.highlights retirement. HOME: useTextHighlight imports from composables/motion/core (NOT /dom — the clean MOVE, no /dom re-export survives). ZERO-MARK: setFromMatches registers Ranges under the named Highlight with ZERO <mark> DOM mutation (the container text node is left UNSPLIT, no element child). FALLBACK: no CSS.highlights → befitting-silent no-op. Born-RED on the /motion-core home assertion until re-homed. Bite: leave it on /dom → the home import reds; split a <mark> wrapper → ZERO-MARK reds",
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
    {
        id: "proof:gate-script-parity",
        cmd: "proof:gate-script-parity",
        tags: ["local", "ci"],
        note: "AX.W00 — the proof-script ↔ package.json BIJECTION meta-gate. Asserts (A) no orphan proof-*.mjs (every file is registered, modulo the finite owner-attributed KNOWN_ORPHANS AW baseline), (B) no dangling proof:* reference (every referenced .mjs exists, modulo KNOWN_DANGLING), (C) every gates.mjs row cmd resolves to a real package.json script. Device-free FS/JSON. Bite: drop a proof:* registration whose .mjs exists + is not allowlisted → RED (orphan); add a gates.mjs row with a ghost cmd → RED.",
    },
    {
        id: "proof:substrate-paints-color",
        cmd: "proof:substrate-paints-color",
        tags: ["local", "ci"],
        note: "AX.W00 — the SHARED substrate-paints-non-black readPixels primitive (W07 aurora + W08 blob compose it). The behavioral truth lives in the tests-visual π workspace spec (substrate-paints-color.spec.ts): renders aurora DEFAULT + each preset at t=1 (maxChannel>0 interior floor) + blob BLOB_CONFIG_DEFAULTS over N frames (LOOSE non-flood opaque-fraction band 0.10–0.70). FAIL-CLOSED when the π workspace is installed; befitting-silent SKIP only on a zero-dep runner (device absent). Bite: black the aurora clearColor → RED (maxChannel==0); flood the blob → RED.",
    },
    {
        id: "proof:liquid-glass-material",
        cmd: "proof:liquid-glass-material",
        tags: ["local", "ci"],
        note: "AX.W52 D19 — the liquid-glass material-CORE gate (the bloom-kill + edge-strengthening arm). Device-free SOURCE + token-resolution arm (the PAINTED render is the W00 π live audit, NEVER a text gate alone — the cardinal lesson: W09 shipped headless-green over a still-blooming surface). Asserts: the `.glass-material::before` is a BOUNDED `circle var(--glass-specular-size,36%)` gleam (NOT the unbounded full-plate disc) on BOTH background + mask; the blend is `plus-lighter` (NOT `screen`); the intensity drives layer `opacity` (NOT a per-stop hsl() alpha — the Chromium `@property`-in-hsl-alpha=0 trap); `--glass-specular-size` minted; the cohort at/below the W52 ceiling (light hover ≤ 0.10 / active ≤ 0.16, dark ≤ 0.08/0.12, rest 0); the floating/overlay saturate ≤ 1.2; the curvature overlay warm-cream-on-`--glass-curvature-intensity` (NOT pure-white) with a SOFTER dark arm (lower intensity, not byte-identical); the dock `ellipse at 30% 30%` 18% corner radials demoted; the Card specular=\"full\" override re-derived down (hover ≤ 0.18 / active ≤ 0.26); and `-webkit-backdrop-filter` present in the built dist/glass-ui.css (the Safari prefix; device-absent SKIP for that clause only on a pre-build tree). Bite: re-introduce `circle at X Y, … transparent 55%` or `mix-blend-mode: screen` on the ::before → RED; bump the cohort/saturate above ceiling → RED; re-pure-white the curvature or strip the dist prefix → RED.",
    },
    {
        id: "proof:tabs-unified",
        cmd: "proof:tabs-unified",
        tags: ["local", "ci"],
        note: "AX.W53 — the SegmentedTabs unification gate. Device-free SOURCE arm (always gates): ONE Tabs family (SegmentedTabs.vue; BouncyToggle/BouncyTabs/UnderlineTabs/useBouncySlider + the standalone responsive-tabs/ dir all DELETED), the three-value `variant` axis (segmented DEFAULT · pill · underline), the indicator glides on `--spring-snappy` (NOT --spring-bouncy) + squishes on a volume-preserving `scale: var(--stretch) calc(1/var(--stretch))` capped LOW by `--tab-indicator-max-stretch` (≤ 1.10, PRM-gated), the ARIA-role-per-variant contract (underline=tablist/tab+aria-selected; segmented/pill=group+aria-pressed), the multi-select + responsive props, the api/index.ts type re-sync, the retired ./responsive-tabs subpath, and the deletion-proof grep (NO live Bouncy*/UnderlineTabs/ResponsiveTabs import/tag/export across src+demo). PLUS a fail-CLOSED π LIVE arm (the indicator GLIDES + the --stretch exceeds 1 mid-travel on /navigation/tabs — when the Playwright workspace is present a non-animating indicator is a hard RED). Bite: re-introduce a Bouncy* export/tag → deletion-proof RED; remove the squish token → squish clause RED; route travel through --spring-bouncy → register RED.",
    },
    {
        id: "proof:dock-animation-live",
        cmd: "proof:dock-animation-live",
        tags: ["local", "ci"],
        note: "AV.W9.4 + AW.W2; AX.W00 PROMOTED fail-open SKIP → fail-CLOSED. The dock BEHAVIORAL motion gate: deterministic-drive (forced FLIP arm via removed startViewTransition + real page.hover) samples the dock-root box geometry AND a representative child opacity on ONE rAF timeline (lead/lag ≤ 1 frame). PLUS the AX.W00 device-free TOKEN-PEAK secondary (--spring-dock linear() peak ≤ the published (0.32,0.7) ~+4.6% baseline) which reds on EVERY runner. The live-rAF arm lives in the tests-visual π workspace (dock-animation-live.spec.ts); fail-CLOSED when the workspace is present. Bite: retune --spring-dock bouncier → token-peak RED; desync the box/child clock → live RED.",
    },
    {
        id: "proof:dock-orchestrator-single",
        cmd: "proof:dock-orchestrator-single",
        tags: ["local", "ci"],
        note: "AX.W02 — ONE morph engine per dock. Device-free STRUCTURE arm: GlassDock builds exactly 1 useDockMorphOrchestrator + provides the morph context, DockLayerGroup injects the OPTIONAL context and defers (registerGroup) with its SINGLE useLayerTransition gated standalone-only. π-lane RUNTIME arm (fail-CLOSED when the workspace is present; dock-orchestrator-single.spec.ts): a simultaneous collapse + pane-swap on the /navigation/dock-layers nested showcase samples the dock-root box AND the nested pane-stack on ONE --dock-morph-t timeline (both onset ≤ 1 frame from the scalar; engineCount == 1). Bite: re-add an unconditional useLayerTransition to the nested path → STRUCTURE RED; drive the stack on a second clock → RUNTIME RED.",
    },
    {
        id: "proof:dock-hold-contract",
        cmd: "proof:dock-hold-contract",
        tags: ["local", "ci"],
        note: "AX.W03 — the host-native keepDockOpen hold. Deterministic, browser-FREE @vue/test-utils MOUNT gate (dock-hold-contract.test.ts) that BITES in CI: mounts <GlassDock><Slider/></GlassDock>, dispatches a real pointerdown on the resolved [data-slot=slider] host, and asserts keepOpen() fired + data-held painted on BOTH the dock root and the slider root; a window pointerup releases + clears; a touchstart arm drives the SAME single acquire (no parallel path). Replaces the fail-open detectSliderHold SKIP carved out of proof:dock-layering-polish (which exited 0 with no harness, so the broken contract shipped GREEN 3.4.0→3.6.0). The π-lane (Playwright + frontend-design) owns the LIVE visual-truth half. Bite: re-route the hold through a reka <SliderRoot> template @pointerdown (the dropped forwarding binding) → mount RED; orphan the native useDockHold listener → mount RED.",
    },
    {
        id: "proof:dock-wrap-content-driven",
        cmd: "proof:dock-wrap-content-driven",
        tags: ["local", "ci"],
        note: "AX.W04 — `overflow=\"wrap\"` is CONTENT-driven intrinsic flex-wrap, not a viewport @media. Device-free SOURCE arm (runs + hard-REDs on EVERY runner): the magic-640 `@media` snap-back governing `.dock-overflow-wrap` is GONE, the `--dock-overflow-bp` token is deleted, the wrap recipe carries always-on `flex-wrap: wrap` + a valid `max-inline-size: var(--dock-max-inline-size)` cap over the base shrink-wrap (NOT the INVALID `min(max-content, …)` — math functions reject the `max-content` intrinsic keyword, so that form computes the property to its initial `none` and the cap silently drops; the SOURCE arm BITES on a `min(max-content` regression), the radius unifies onto `--dock-card-radius` (the bare `--radius-2xl` literal is gone) morphing off `--dock-expand-t`, the `--shadow-dock-wrap` card-tier token + the scalar-driven floating-tier box-shadow lift, the GlassDock.vue `orientation !== 'vertical'` horizontal-only guard, and the struck false `proof:dock-layering-polish` wrap-reflow doc-rot (`wrap reflow|morphing.*wrap` grep = 0). π-lane RUNTIME arm (fail-CLOSED when the workspace is present; dock-wrap-content-driven.spec.ts): mounts the demo wrap dock at a ≥640px viewport and asserts computed `flex-wrap === 'wrap'`, `rowCount >= 2`, `dock.right <= innerWidth` (no viewport bleed), and no vertical `.dock-overflow-wrap`. Bite: re-add the @media-640 nowrap snap-back → SOURCE RED; restore the invalid `min(max-content, …)` cap → SOURCE RED + live rowCount:1 RED; raise the cap above content width → live rowCount:1 RED.",
    },
    {
        id: "proof:slider-two-only",
        cmd: "proof:slider-two-only",
        tags: ["local", "ci"],
        note: "AV.W11 (re-registered AX.W23; design-reconciled AX.W59) — the slider two-only cardinality + DESIGN LOCK. <Slider> ships EXACTLY {standard, spectrum} with the AX.W59 looks: (1) KEYSET — sliderVariants lists exactly those two keys; (2) ORPHAN-SCAN — Slider.vue scoped CSS carries no [data-variant=X] for X ∉ keyset; (3) CYLINDER-CAP — the standard thumb is the integrated-cylinder leading CAP (clean break off the prior 50%-circle ROUNDED-KNOB clause): a pill radius (var(--radius-pill), NOT 50% — the floating-circle tell), height:100% (track-height, the fill's leading edge not a floating disc), no border: paint, AND the .slider-range fill carries a backdrop-filter (the glass cylinder material); (4) SQUIRCLE-SPECTRUM — the spectrum thumb is the track-height squircle: corner-shape:var(--corner-shape-thumb) ONLY inside @supports (corner-shape: superellipse(2)) (the Chrome-139 PE tier; var() is not @supports-evaluable so the gate tests the literal feature) over a border-radius round contract, height:100%. Bite: re-add a removed variant key → (1) RED; restore a removed scoped block → (2) RED; revert the standard thumb to a 50% floating circle / strip the fill backdrop-filter → (3) RED; drop the spectrum corner-shape, leak it outside the @supports gate, or float the squircle off the track height → (4) RED.",
    },
    {
        id: "proof:carousel-glass-atoms",
        cmd: "proof:carousel-glass-atoms",
        tags: ["local", "ci"],
        note: "AX.W23 — the carousel dot rail RENDER assertion (reads the emitted dist/glass-ui.css, not a source string). TWO clauses (AX.W19 pruned the custom/glass-carousel composite + its former clauses C FOUR-STATE / D CHROME-SUBSTRATE): (A) DOT-CONTRAST — the emitted .carousel-dot::before inactive fill is color-mix(in srgb, var(--foreground) N%) whose RESOLVED color clears ≥3:1 (WCAG 1.4.11) against the composited bg-card/30 dark card in BOTH schemes (born-RED on HEAD's bg-muted-medium ~1.2:1); (B) NO-DEAD-CLASS — CarouselDots carries no scale-[var(--x)] var-in-arbitrary non-emit AND the active emphasis emits a REAL scoped .carousel-dot[data-active]::before width|height morph. NOTE reads dist/ → run after build. Bite: revert the dot to bg-muted-medium → (A) RED; re-add scale-[var(--x)] or drop the [data-active] morph → (B) RED.",
    },
    {
        id: "proof:deck-progress-rail",
        cmd: "proof:deck-progress-rail",
        tags: ["local", "ci"],
        note: "AX.W24 — the deck-position rail gate, UPGRADED string-scan → render assertion. Device-free STRUCTURE arm (runs on EVERY runner): the `.glass-progress-rail` recipe FEEDS --progress-fill/--progress-track from --progress-rail-fill/--progress-rail-track (the F1 cascade-correct token-feed, NOT a `background:` that loses to the @layer utilities `bg-primary`) + uses an INSET glow (the F2 fix, not the eaten OUTSET shadow); ProgressDefault.vue reads the tokens at SOURCE + carries NO bg-primary/bg-secondary utility; DeckProgress composes <Progress> with no chrome/math; the /deck namespace stays RESERVED (no deck.ts subpath, no ./deck export) while ./deck-progress IS published. π-lane RENDER arm (fail-CLOSED when the tests-visual workspace is present; deck-progress-rail.spec.ts): mounts the live deck-progress story under a `:root { --progress-rail-fill: <distinct green> }` override and asserts via getComputedStyle (a) the override hue WINS the indicator background-color (the cascade fix — RED at HEAD where it painted --primary), (b) an `inset` box-shadow glow renders, (c) the rail reads as the hairline --progress-rail-h. Bite: re-add bg-primary to ProgressDefault → STRUCTURE 2 + RENDER (a) RED; re-author the glow OUTSET → STRUCTURE 1 + RENDER (b) RED; squat /deck → STRUCTURE 4 RED.",
    },
    {
        id: "proof:squircle-language",
        cmd: "proof:squircle-language",
        tags: ["local", "ci"],
        note: "AX.W56 — the corner-SHAPE token axis + the rounded-vs-squircle POLICY. Device-free SOURCE arm (runs + hard-REDs on EVERY runner): theme.css mints --corner-k-{squircle:2,soft:1.7,sharp:2.4} (the superellipse-k primitives; squircle == superellipse(2) == n=4) + the semantic --corner-shape-{card:round,pill:round,panel:round,bigdock:superellipse(var(--corner-k-squircle))} POLICY aliases; the big-dock dock.css site reads `corner-shape: var(--corner-shape-bigdock)` (the bite — NOT a bare squircle keyword) ONLY inside `@supports (corner-shape: superellipse(2))` (no leak onto the un-gated base) over a `border-radius` round fallback; glass.css carries NO corner-shape on .glass-card/.glass-btn/.btn-pill (the AW.W23 inversion RE-HOMED — cards stay round). π render arm (fail-CLOSED when the tests-visual workspace is present; squircle-language.spec.ts): getComputedStyle(...).cornerShape readback === superellipse(2) on the big-dock card shell on a Chrome-139 engine (or the round fallback on a non-supporting engine), a card stays round. Bite: re-hardcode `corner-shape: squircle` on the big-dock → BIGDOCK-READS-TOKEN RED; re-add a squircle to .glass-card → CARD-REHOMED RED; leak the decl outside @supports → SUPPORTS-GATE-INTACT RED; flip --corner-shape-card to a superellipse → POLICY-CARD-ROUND RED.",
    },
    {
        id: "proof:glass-level",
        cmd: "proof:glass-level",
        tags: ["local", "ci"],
        note: "AX.W54 — the glass-first ROOT gate (the --glass-level scalar arm + the G-1 cohesion arm). Device-free SOURCE: @property --glass-level threads BOTH ladders (level=1 byte-identical by construction); the opaque escape + the a11y brackets ride the ONE level path; the four divergent recipes (SegmentedTabs track+indicator, ui Tabs indicator, Alert, TagsInput) + the two recipe divergences (.input-pill blur(1px), --glass-bg-dock flat-srgb) are reconciled onto the one model; Button default = glass; Card carries the opaque rung. The PAINTED level=1 byte-identity + the mounted glass backdrop-filter is the W00 π live audit. Bite: detach a rung from the level, restore a solid chrome/content surface off the allowlist → RED.",
    },
    {
        id: "proof:glass-one-model",
        cmd: "proof:glass-one-model",
        tags: ["local", "ci"],
        note: "AX.W54 — G-1 of the GOLDEN done-definition: glass cohesion MEASURED, not asserted (the --one-model arm of proof:glass-level). No ui/ chrome-or-content surface paints a solid bg-{card,background,muted,secondary,primary} without the glass tier or the named .glass-opaque escape; the legibility allowlist (avatar/label/separator/skeleton/table/data-table/badge) is exempt. Bite: re-introduce a solid chrome surface off the allowlist → RED.",
    },
    {
        id: "proof:storybook-complete",
        cmd: "proof:storybook-complete",
        tags: ["local", "ci"],
        note: "AX.W18 — the storybook export→story totality gate (the third IA triad member with storybook-ia + no-orphan-demo-route): every public component-export surface is DEMONSTRATED by ≥1 story (the export→story map is total). Bite: a public export with no story → RED.",
    },
    {
        id: "proof:demo-dock-nav",
        cmd: "proof:demo-dock-nav",
        tags: ["local", "ci"],
        note: "AX.W40 — the demo-shell dock-nav coherence (SidebarDock + BottomDock adopt the W61 unified nav-pattern: home-left #persistent + <DockSeparator>, zero raw-class separators, the 12-category nav). Bite: a raw-class separator or a missing home anchor in a shell dock → RED.",
    },
    {
        id: "proof:aurora-fill-resize",
        cmd: "proof:aurora-fill-resize",
        tags: ["local", "ci"],
        note: "AX.W18/Q2 — the aurora black-bar root fix: the runtime resize() measures the laid-out border-box via getBoundingClientRect() (NOT the content-visibility-skip-degenerate canvas.clientWidth/Height that sized a 1px sliver buffer stretched as a black band), + the .aurora-root contain-intrinsic-size reserves a non-zero block fallback. Bite: revert resize() to clientWidth/clientHeight → RED.",
    },
    {
        id: "proof:page-redesign",
        cmd: "proof:page-redesign",
        tags: ["local", "ci"],
        note: "AX.W60 — G-8 of the GOLDEN done-definition: every page demonstrates glass over a rich background. Device-free SOURCE arm (the PAINTED render is the W00 π live audit): StoryHero.vue composes a glass <Card> + the five substrates behind it (-z-10); the Story manifest carries background?: over the paper|grid|aurora|constellation|fourier union; the .story-bg-grid blueprint recipe (light+dark adaptive); StoryPage hosts StoryHero reading the active story's background; the four heros (intro/hero/paper-glass/auth-shell) carry NO surviving inline <Aurora> fork; each HERO declares a UNIQUE substrate (intro=aurora, hero=constellation, paper-glass=paper, auth-shell=fourier). Bite: drop <Card> from StoryHero → glass-container RED; remove the background field → RED; re-inject an inline <Aurora> into a hero → no-fork RED; two heros same substrate → unique RED.",
    },
    {
        id: "proof:adaptive-glass",
        cmd: "proof:adaptive-glass",
        tags: ["local", "ci"],
        note: "AX.W55 — the adaptive-over-light glass legibility gate (the SEPARATE --glass-tint-* axis paired with W54's --glass-level). Asserts the over-light tint hook lifts --glass-tint-strength adaptively so the MAXIMAL glass default reads legible over a light substrate (the G2 over-light surface, incl. the dock); zero new compositing seam. Bite: detach the adaptive tint hook / drop the over-light darken → RED.",
    },
    {
        id: "proof:dark-semantic-contrast",
        cmd: "proof:dark-semantic-contrast",
        tags: ["local", "ci"],
        note: "AX.W44 — the dark-mode semantic-token contrast gate (token-first, dark-arm-only). Asserts the success/warning/info/destructive foreground+surface tokens clear the WCAG AA contrast floor in the .dark arm. Bite: a dark semantic token below the floor → RED.",
    },
    {
        id: "proof:glass-material-demo",
        cmd: "proof:glass-material-demo",
        tags: ["local", "ci"],
        note: "AX.W48 — the glass-material DEMO-ROUTE falsifier (the demo twin of proof:glass-material-unified/-sota, which pass green over a broken demo). Asserts the SFC BINDS the seams it narrates: useSpecularTracking composed (the moving catch-light is live), a non-zero --glass-tint-strength companion (the color-mix bites), zero glass-btn token + a real <Button variant=glass>, the rim on/off device. Bite: strip useSpecularTracking / zero the tint strength → RED.",
    },
    {
        id: "proof:blob-live-truth",
        cmd: "proof:blob-live-truth",
        tags: ["local", "ci"],
        note: "AX.W46 — the GooBlob live-truth gate (the blob reads as a contained lit droplet, hover responds, moods resolve — not skeuomorphic/broken). Device-free SOURCE arm + a fail-CLOSED π blob render/mood arm. Bite: regress the mood resolution / the lit-droplet material → RED.",
    },
    {
        id: "proof:live-verified-ledger",
        cmd: "proof:live-verified-ledger",
        tags: ["local", "ci"],
        note: "AX.W62 Gate 1 (cardinal forcing function) — a PROGRESS wave-row whose STATUS cell is `live-verified` REDs unless a matching audit/visual/W<NN>-DELTA.md references ≥1 REAL on-disk PNG (the SOURCE arm rejects prose/section-markers); any `(DEVELOPED)` modifier in a status cell REDs (the retired inflation-vehicle vocabulary). Self-proving: a synthetic DELTA-less live-verified row is flagged every run. Also the .githooks/commit-msg local bite. Bite: flip a row to live-verified with no .png → RED; write `(DEVELOPED)` in a status cell → RED.",
    },
    {
        id: "proof:consumer-staleness",
        cmd: "proof:consumer-staleness",
        tags: ["local", "ci"],
        sibling: true,
        note: "AX.W62 Gate 3 (reverse cross-repo) — every present-consumer `import … from \"@mkbabb/glass-ui[/sub]\"` resolves against the CURRENT surface: the subpath is a published exports key (retired /responsive-tabs → RED) and each named import is on that subpath's flat dist d.ts export set (deleted BouncyTabs/UnderlineTabs → RED). Absent siblings skip (registry-default; CI-green). The named arm needs a built dist (build is the predecessor). Born-RED on the speedtest tab-family imports — discharged by the W34 consumer bump. Bite: a consumer importing a deleted symbol / retired subpath → RED.",
    },
    {
        id: "proof:disposition-live",
        cmd: "proof:disposition-live",
        tags: ["local", "ci"],
        sibling: true,
        note: "AX.W62 Gate 5 (deferral re-evaluation) — parses docs/tranches/AX/audit/DISPOSITION-REGISTER.json; a book/archived row whose `min-consumers` trigger now re-evaluates MET (≥n distinct present consumers grep the pattern) while unresolved REDs the close. Self-proving: a synthetic always-MET book row is flagged every run. Catches LATE-1 (trigger met, ignored) + LATE-3 (never re-checked). Bite: seed a met-trigger book row → RED; resolve it or the trigger un-METs → green.",
    },
    {
        id: "proof:gen-ci-fresh",
        cmd: "proof:gen-ci-fresh",
        tags: ["local", "release"],
        note: "AX.W62 Gate 4 (ci.yml drift kill) — asserts .github/workflows/ci.yml is byte-identical to `gates.mjs --emit-ci` (the ci-tagged set is the single source; ci.yml is a GENERATED artefact). A ci.yml meta-step (not ci-tagged here, to avoid double-render); in the RELEASE set so a drifted ci.yml refuses to publish. Bite: hand-edit ci.yml or add a ci gate without re-emitting → RED.",
    },
    {
        id: "gates:verify-ci",
        cmd: "gates:verify-ci",
        tags: ["release"],
        note: "AX.W62 — the cheap pre-check superseded by proof:gen-ci-fresh's byte-match; kept in the RELEASE set as the fast set-equality drift detect. A ci.yml meta-step (allowlisted in verifyCi's CI_META_STEPS).",
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
    const CI_META_STEPS = new Set(["gates:verify-ci", "proof:gen-ci-fresh"]);
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

/**
 * Render the `.github/workflows/ci.yml` content from the ci-tagged manifest set
 * — the single source of truth. Each ci gate becomes one `- name:` step (the
 * per-step Actions-UI view the team wanted; option (a), never the collapse), in
 * manifest order, followed by the two drift-check meta-steps. Per-gate
 * documentation stays in the manifest `note` (duplicating it here would be the
 * exact drift this generator kills), so the YAML is a clean generated artefact.
 *
 * RED-NAMING (the W62 forcing function): a ci-tagged gate whose backing
 * `scripts/*.mjs` is absent on disk THROWS, naming it — never a silent skip. So
 * a dangling gate can no longer ride into a generated ci.yml and crash the
 * runner; its fix-or-retire is forced at emit time.
 */
export function renderCiYaml() {
    const ciGates = gatesFor("ci");
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const missing = [];
    for (const g of ciGates) {
        const script = pkg.scripts?.[g.cmd] ?? "";
        const m = script.match(/scripts\/([\w.-]+\.mjs)/);
        if (m && !existsSync(resolve(ROOT, "scripts", m[1]))) missing.push(g.cmd);
    }
    if (missing.length) {
        throw new Error(
            `[gates --emit-ci] refusing to emit: ${missing.length} ci-tagged gate(s) have no backing script on disk:\n` +
                missing.map((c) => `  - ${c} (${pkg.scripts?.[c] ?? "no npm script"})`).join("\n") +
                `\nFix-or-retire these (the gate owner / W25 / W27a) before ci.yml can be generated.`,
        );
    }
    const I = " ".repeat(12); // `- name:` step indent (matches the repo style)
    const L = [];
    L.push("# GENERATED by `node scripts/gates.mjs --emit-ci` (npm run gates:emit-ci) — DO NOT EDIT BY HAND.");
    L.push("# The ci-tagged gate set in scripts/gates.mjs is the single source of truth; per-gate");
    L.push("# documentation lives in that manifest's `note` field. A drift between this file and the");
    L.push("# manifest fails closed via proof:gen-ci-fresh (byte-match) — so the CI mirror can never");
    L.push("# silently fall behind the gate set again. To change CI: edit the manifest, re-emit, commit.");
    L.push("");
    L.push("name: ci");
    L.push("");
    L.push("on:");
    L.push("    pull_request:");
    L.push("        branches: [master]");
    L.push("    push:");
    L.push("        branches: [master]");
    L.push("");
    L.push("jobs:");
    L.push("    gates:");
    L.push("        runs-on: ubuntu-latest");
    L.push("        steps:");
    L.push("            - uses: actions/checkout@v4");
    L.push("            - uses: actions/setup-node@v4");
    L.push("              with:");
    L.push("                  node-version: 24");
    L.push("            - run: npm ci");
    for (const g of ciGates) {
        L.push(`${I}- name: ${g.id}`);
        if (g.env) {
            L.push(`${I}  env:`);
            for (const [k, v] of Object.entries(g.env))
                L.push(`${I}      ${k}: ${JSON.stringify(String(v))}`);
        }
        L.push(`${I}  run: npm run ${g.cmd}`);
    }
    // The two drift-check meta-steps (NOT manifest gates — they verify the mirror).
    L.push(`${I}- name: gates:verify-ci`);
    L.push(`${I}  run: npm run gates:verify-ci`);
    L.push(`${I}- name: proof:gen-ci-fresh`);
    L.push(`${I}  run: npm run proof:gen-ci-fresh`);
    return L.join("\n") + "\n";
}

/** Write the generated ci.yml to disk. */
function emitCi() {
    const yaml = renderCiYaml();
    const ciPath = resolve(ROOT, ".github/workflows/ci.yml");
    writeFileSync(ciPath, yaml);
    console.log(
        `[gates --emit-ci] wrote ${ciPath} (${gatesFor("ci").length} ci gates + 2 meta-steps).`,
    );
}

// Run-as-main guard — gates.mjs is also IMPORTED (proof:gen-ci-fresh consumes
// renderCiYaml), so the CLI dispatch must not fire on import.
const isMain = Boolean(argv[1]) && resolve(argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
    const arg = argv[2];
    if (arg === "--run") runMode(argv[3]);
    else if (arg === "--verify-ci") verifyCi();
    else if (arg === "--emit-ci") emitCi();
    else if (arg === "--list") {
        const mode = argv[3] ?? "local";
        console.log(
            gatesFor(mode)
                .map((g) => g.cmd)
                .join("\n"),
        );
    } else {
        console.error(
            "usage: gates.mjs --run <local|ci|release> | --verify-ci | --emit-ci | --list <mode>",
        );
        process.exit(2);
    }
}
