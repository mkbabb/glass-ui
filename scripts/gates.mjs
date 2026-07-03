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

import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { argv } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";

/**
 * The manifest. `cmd` is the npm script; `tags` selects the aggregates it
 * belongs to; `sibling: true` means it walks a sibling checkout (so it is
 * skipped-by-policy when no sibling is present — never a hard failure on a
 * clean runner, per constellation.resolveSibling). `note` documents intent.
 *
 * LIVE-VERIFICATION GATES ARE `local`-ONLY (the cardinal-lesson architecture,
 * AX close). The 11 gates that `spawnSync(PW_BIN …)` a Playwright run against
 * tests-visual (aurora-painterly-statistics, font-cascade-live,
 * substrate-paints-color, tabs-std, dock-animation-live,
 * squircle-language, glass-material-demo, blob-live-truth) need a REAL browser
 * binary + a running demo dev server + (for the GPU readbacks) a real GPU — none
 * of which a clean CI runner has. Their own notes name the LOCAL orchestrator /
 * dev-Mac Metal run as "the binding close". So they carry `local` only, matching
 * the `release` set (which excludes them and published 3.9.0 green). CI does NOT
 * re-execute them headless under SwiftShader; instead the STATIC
 * `proof:live-verified-ledger` (ci) enforces that every live-verified wave has a
 * captured on-disk DELTA (.png + π readback) — that ledger is the CI-side proof
 * the live-verification HAPPENED. This is alignment with the cardinal lesson, not
 * a weakening of it.
 *
 * THE `--run pi` VISUAL-π RUNNER (BB.W-VISUAL-RUNNER). The ~22-gate subset above
 * is NOT the whole binding-π suite: the workspace carries ~79 non-private
 * `tests-visual/*.spec.ts` (every BA-wave readback — surface-axis, menu-glass,
 * dark-material, glass-cal, feedback-tone, no-gray, …), of which the other ~57 ran
 * NOWHERE automated. `node scripts/gates.mjs --run pi` (the `gates:pi` npm script)
 * is the ONE command that spawns the FULL ENROLLED set — the non-private glob MINUS
 * the declared EXCLUDE allowlist (`tests-visual/pi-runner-manifest.mjs`,
 * computed-from-disk, no hand-list) — over BOTH Playwright projects
 * (chromium-headless-new desktop + coarse-touch mobile) against the `:5199` demo
 * origin the config defaults, served-app-sentinel fail-closed. `--run pi` is a
 * spec-runner MODE (not a gate-tag aggregate): it is `local`-tagged ONLY (a real
 * browser + demo + GPU), the same carve-out as the live-π gates. The split is the
 * cardinal-lesson architecture: CI proves the suite is ENROLLED + the runner is
 * invokable (the headless `proof:visual-runner` `ci` arm — every committed
 * non-private spec is enrolled-or-excluded-with-rationale, the orphan-class fix);
 * the LOCAL real-device `--run pi` GREEN proves the PIXELS painted (the close-leg).
 */
export const GATES = [
    { id: "typecheck", cmd: "typecheck", tags: ["local", "ci", "release"] },
    {
        id: "test",
        cmd: "test",
        tags: ["local", "ci", "release"],
        note: "AX — promoted to the RELEASE set: prepublishOnly ALSO runs it, but that fails LATE (after the gate matrix passes + the publish starts), so a stale unit test blocked the 3.9.0 publish at the publish step. The gate matrix now runs it early — a stale test fails the release BEFORE the publish attempt.",
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
        id: "proof:dist-css",
        cmd: "proof:dist-css",
        tags: ["local", "ci", "release"],
        note: "GC2 — the dist/styles CSS parse + url()-safety gate. (a) lightningcss parses every dist/styles/**/*.css with errorRecovery:false — catches the comment-injection unterminated-string class (the 4.0.0 bug: prose-mention of @source matched before the real at-rule, injecting a comment-close that orphaned an apostrophe as a live unterminated string). (b) every url() token must resolve to data:/#/http — catches the bundler-hostile relative-url class (the glass-refract split url('HEAD') 28 url('TAIL') where TAIL starts with a bare quote, mis-resolved as a file path by consumer bundlers). Pure function of dist/; runs post-build on every runner.",
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
        note: "AX.W45-TUNE — the dock-perfection close (the TUNE+re-point layer on the settled W45 structure). Device-free SOURCE arm: Q1 the collapsed-pill floor tokens (--dock-collapsed-summary-min-size + --dock-collapsed-padding) minted + a symmetric min-block-size on the collapsed summary (a tight squircle, not a full-row stub); C2 --dock-tile-pad threaded through --dock-scale in every density rung; Q3 the dock hover reads a real GLASS register (--dock-control-hover-bg off --glass-bg-resting + --scale-hover-dock on all 4 members); C4 the dock-control REST specular default-off (rest intensity 0, the keyframes I.W6 19→0 tracks) + all 4 members in the specular ::before family + the 22% small-tile gleam; C5 the selected/active state reads GLASS (--dock-control-active-bg off --glass-bg-floating, the gleam held lit on .is-active/[aria-pressed]); C7 the dock body is the UNIFIED .dock-layers full/summary morph region for BOTH orientations (no orientation-split vertical-body — AZ.W-DOCK-TAXONOMY); C1 the demo DockIconButton glyphs drop their explicit size so --dock-icon-glyph paints. The π live DELTA (W45-DELTA.md — Q1 geometry + Q3 hover rest-vs-hover readback) is the binding close. Bite: revert a token/register → the matching witness REDs.",
    },
    {
        id: "proof:dock-unify",
        cmd: "proof:dock-unify",
        tags: ["local", "ci"],
        note: "AX.W61 — the unified dock nav-pattern contract (home-left #persistent + nav + <DockSeparator>, ONE GlassDock root) + the Q1 collapsed-floor --dock-scale thread + the glass-first selected control. Device-free SOURCE arm: F1 --dock-collapsed-padding threads --dock-scale + both floor tokens below the expanded values; F2 the symmetric collapsed-summary min-block-size; F3 --dock-control-active-bg is a --glass-bg-* tier (NOT --surface-tint-N) AND active != hover; F4 the W61-owned showcase docks compose <GlassDock>+<DockSeparator> with zero raw-class separators + home-left #persistent (shell docks tracked pendingW40); F5 CLAUDE.md records the contract. The W00 π live arm (W61-DELTA.md) is the binding close. Bite: re-point active to surface-tint-12 → F3 RED; flat padding literal → F1 RED; a raw-class separator → F4 RED.",
    },
    {
        id: "proof:dock-rail-hairline",
        cmd: "proof:dock-rail-hairline",
        tags: ["local", "ci"],
        note: "AZ.W-DOCK-RAIL — the in-dock switcher-rail hairline register. Device-free SOURCE arm (the π /dock/layers readback is the binding visual truth, W-DOCK-RAIL-DELTA.md): W1 the rail TabsIndicator render does NOT inherit the baked bg-(--glass-bg-quiet) [backdrop-filter] plate (TabsIndicator.vue gates it behind surface?:boolean; the rail binds :surface=false) AND .dock-layer-tab-indicator reads --dock-layer-rail-active (the glass-floating register, never --glass-bg-quiet); W2 --dock-layer-rail-bg resolves transparent (no --surface-tint plate), no rounded-plate background, the single border-right hairline on --dock-layer-rail-divider, no rail pseudo-element plate fill; W3 a .dock-layer-rail .dock-layer-tab svg rule floors width >=14px AND flex-shrink:0 (the 4px-sliver kill). Bite: re-bake the plate → W1 RED; re-point rail-bg to a surface-tint → W2 RED; drop the svg floor → W3 RED.",
    },
    {
        id: "proof:dock-no-scale-pop",
        cmd: "proof:dock-no-scale-pop",
        tags: ["local"],
        note: "AZ.W-DOCK-FLICKER — the collapse-onset scale-pop + FLIP-thrash gate. W1 scale-guard source witness (.collapsed:hover scale scoped :not([data-morphing])), W2 wired-hysteresis source witness (useDockState getBoundingClientRect recheck + intent dwell referenced on enter/leave), W3 live real-mouse collapse-onset SCALE-pop assert on the still-wide box, W4 live cursor-at-edge no-flip assert, + the C2 baseline self-test bite. LIVE arm (real cursor for CSS :hover + the aurora visibility-park) → local-only like the other dock-animation-live gates; born-RED on both source and live at HEAD.",
    },
    {
        id: "proof:dock-tap-integrity",
        cmd: "proof:dock-tap-integrity",
        tags: ["local"],
        note: "R5-TAP (R5-3) — the collapsed-tap + hover-approach MORPH-RACE click-integrity gate. W1 source (useDockClickIntegrity identity scope + morph-settle window + the no-witnessed-press AT pass-through, wired @pointerdown.capture + @click.capture on the GlassDock root), W2 born-RED via git-show, W3 LIVE real-input replay on /dock/overview (touch tap activates no full-layer control; approach-click mid-morph activates none; the settled click reaches the control) + the R5-tap-race-baseline self-test. Local-only (real cursor + CDP touch); retires the slides interim arms; the expanded ref stays exposed.",
    },
    {
        id: "proof:dock-taxonomy",
        cmd: "proof:dock-taxonomy",
        tags: ["local", "ci", "release"],
        note: "AZ.W-DOCK-TAXONOMY (H2 arm-a) — ONE GlassDock on ONE orientation axis. Device-free static src-scan: T1 no live variant=rail/instrument-strip call-site, T2 the CLOSED rail-noun allowlist ({.dock-layer-rail, DockRail-reserved} — a new rail-named construct REDs), T3 no vertical alwaysExpanded force-pin (a vertical dock collapses/morphs height), T4 ONE DockProps shape (no variant discriminant). Born-RED executed on T1+T2. Bite: re-introduce variant=rail or a third rail noun → RED.",
    },
    {
        id: "proof:dock-decompose",
        cmd: "proof:dock-decompose",
        tags: ["local", "ci", "release"],
        note: "BG.W-DOCK-DECOMPOSE — the GlassDock.vue god-SFC decomposition gate (KS-DOCK 4.4; the concrete realization of the spec's proof:dock ratchet-drain + colocation + single-writer arms). D1 ratchet-drain: GlassDock.vue ≤ 500 lines AND its proof:no-god-module RATCHET baseline #2 row is drained. D2 colocation: the two carved leaves (composables/useDockTouchGate.ts + composables/useDockFissionWiring.ts) exist AND GlassDock.vue imports both. D3 single-writer: zero --dock-morph-t/--dock-morph-v write in the SFC or either carved gesture leaf (the collapse morph scalar stays the orchestrator's, dockMorphContext). Pure FS, device-free (paint-class H, byte-identical paint). Born-RED on HEAD (707>500 + leaves absent + row present) → GREEN on the carve + a 6-bite self-test (each synthetic sabotage REDs its clause; the comment-mention fence does NOT flag).",
    },
    {
        id: "proof:encapsulation",
        cmd: "proof:encapsulation",
        tags: ["local", "ci"],
        note: "The colocated-leaf encapsulation gate — covers BOTH the BG.W-BLOB-KINEMATICS-LEAF ratchet #10 arm (E1-E4) AND the BG.W-COLOCATE WS4 carve fold (ratchet #3/4/9/13). BLOB arm (F9 kinematics carve; ratchet-drain row 10): E1 ratchet-drain (useBlobSatellites.ts ≤ 500 lines AND its proof:no-god-module RATCHET row drained) · E2 colocation (composables/satelliteKinematics.ts exists + exports createSatellite/orbitPos/randomizeOrbit + the driver imports all three) · E3 stateless-leaf (no SpringProgress/keyframes fork, no mulberry32/hashString rng ownership, no vue reactivity, no module-level mutable state) · E4 single-definition (the three fns live in the leaf AND are DEFINITION-ABSENT from the driver). COLOCATE arm (WS4 carve fold; ratchet #3/4/9/13): C1 ratchet-drain (host ≤ 500 lines AND its proof:no-god-module row drained) · C2 colocation (each carved leaf exists + exports its symbols + the host imports it back) · C3 single-definition (the carved symbol is DEFINITION-ABSENT from the host, no dual-path copy) — over the 4 carves createCanvasLifecycle→{backingSize,visibility}, useWebGPUCanvas→{webgpuDevice(+timeout),webgpuCanvasTypes}, useGlassBackdropLuminance→ambientHueHistogram, SegmentedTabs→{useTabResponsive,useTabRovingFocus}. Pure FS, device-free (paint-class H, byte-identical paint). Born-RED on HEAD → GREEN + a 16-bite self-test (9 blob + 7 colocate; each synthetic sabotage REDs its clause, comment-mention fences do NOT flag).",
    },
    {
        id: "proof:dock-contextual-layers",
        cmd: "proof:dock-contextual-layers",
        tags: ["local", "ci", "release"],
        note: "AZ.W-DOCK-CONTEXT — the page-driven contextual dock-layer seam (E3G-7 / R3-14). Device-free static src-scan: the CONTEXT_LAYER_MAP route-keyed manifest (>=3 IA contexts), useContextualDockLayers reads route.meta.categoryId (a general indexed read, no if-chain), BOTH shell docks RENDER the seam through DockLayerGroup (not import-only). The live per-route swap is the local-only π half, ledger-backstopped. Bite: hardcode a 2-route special case / drop a shell render → RED.",
    },
    {
        id: "proof:morph-showcase",
        cmd: "proof:morph-showcase",
        tags: ["local", "ci", "release"],
        note: "AZ.W-MORPH-SHOWCASE (H4) — the V↔H liquid dock morph. Device-free M1-M5: useLiquidFlex (the W-LIQUID substrate, scalar→size+volume-preserving squish, 2 consumers: the dock orientation morph + the tab indicator byte-identical), useDockOrientationMorph on ONE SpringProgress(DOCK_SPRING) writing --dock-morph-t (deterministic, interruptible, PRM pin()), the CSS SVG-goo bridge scalar-bound (M5 — REDs on a free-running mount). HG5 DECIDED MECHANICALLY: arm-a missed the 4×-throttle budget (p50 13.7-15.1ms) → arm-c View-Transitions crossfade SHIPPED (p50 7.7-8.1ms); the teardrop is the perf-gated preview, BOOKED. Bite: free-run the bridge clock / fork a second morph engine → RED.",
    },
    {
        id: "proof:dock-fission",
        cmd: "proof:dock-fission",
        tags: ["local", "ci", "release"],
        note: "BE.W-DOCK-FISSION — the n-ary detach orchestrator (the user's #1 defect: the island WAIST — the rest state is ONE glass pill, goo OFF; the split CARVES it). Device-free SOURCE arm (F1-F6 + the goo mount; born-RED→GREEN, the comment-strip pure-detector house pattern + a 5-bite self-test proven every run). The BINDING painted truth is the π readback tests-visual/dock-fission.spec.ts + the W-DOCK-FISSION-DELTA (the per-context detach frame-series — search blooms radially, media peels laterally, nav merges inward — the seam-tension resist+snap, the PRM single-paint, box-INVIOLATE deltaW=deltaH=0, both modes — the orchestrator's, NOT this gate alone per the BC anti-disease law: no source-green close). F1 the n-ary detach rides ONE SpringProgress writing --dock-split-t off DOCK_SPRING/--spring-dock (no new spring family — assert the import + NO bespoke spring constant minted); F2 bidirectional re-merge (split() AND merge() flip the ONE target 1/0 — not split-only); F3 the PER-CONTEXT goo-SIGNATURE is descriptor-driven (DOCK_SPLIT_SIGNATURES carries radial/lateral/inward-merge AND the orchestrator READS the signature — NOT a hardcoded `context === 'search'` switch); F4 POINTER-REACTIVE SEAM-TENSION (the --seam-tension scalar off usePointerVelocityField FED from INSIDE the driver loop via field.tick() — NO second rAF, the cap present); F5 PRM=instant (prefersReducedMotion() sync-seat + field.tick(0)); F6 compositor-only (fission-bridge.css animates NO layout property — leans on proof:no-layout-animation). A CONSUMING seam BESIDE the morph engine — dockMorphContext/DOCK_SPRING byte-untouched (the box-inviolate fence, the useDockSearch precedent). Bite: a second bespoke spring clock → F1; a uni-directional fission → F2; a hardcoded per-context switch → F3; a second rAF for the field → F4; a piece animating a layout axis → F6.",
    },
    {
        id: "proof:dock-gallery",
        cmd: "proof:dock-gallery",
        tags: ["local", "ci"],
        note: "BE.W-LIQUID-MORPH / audit §W10 — the dock-gallery RE-HOST onto the real library primitives + the ONE demo chassis (born-RED→GREEN; the comment-strip pure-detector house pattern + a 6-bite self-test proven every run). Kills the facsimile gallery: the 7 tiles were CSS-transition facsimiles that used NONE of the engine + re-pasted the tile chassis (bg/stage/caption/label/hint) + the glass-plate triplet + an `--ex-spring: cubic-bezier(0.34, 1.32, …)` overshoot bezier 5-10× (a 2nd motion authority off the shipped --spring-* register), and the Dynamic Island Call GREW DOWNWARD (the opposite of a split). Device-free SOURCE arm (tags local+ci); the BINDING painted truth — each tile morphs on the real engine over the live field, both modes — is the W-GESTALT-ROSTER-BE gallery π rows (no source-green close). G1 the ONE <DockExampleTile> chassis exists + declares --ex-spring off the SHIPPED --spring-* register (NO bespoke cubic-bezier overshoot) + exposes the [data-glass-field] stage + the PRM block ONCE, every example composes it (the duplication dead); G2 EVERY examples/*.vue COMPOSES a real engine (imports useBloomUp OR useDockFission — a CSS-only facsimile reds) + composes <DockExampleTile> (no re-pasted chassis); G3 the Dynamic Island Call is an ACTUAL fission (useDockFission + DOCK_SPLIT_SIGNATURES + registerPiece + the .dock-fission-bridge/.dock-fission-piece recipe — a downward-grow facsimile reds); G4 COMPOSITOR-ONLY demo-scoped (no example/tile <style> animates a reflow property via transition/transition:all/@keyframes — the max-block-size/-webkit-line-clamp/inline-size facsimile transitions red; the down-payment on the W11 proof:no-layout-animation→demo widening); G5 ONE shared <DockStage> + ONE <DockGooFilter> mount for the route + NO example re-mints --ex-spring: cubic-bezier(...). Bite: a CSS-only tile → G2; a downward-grow Call → G3; a transition: max-block-size / transition: all / a @keyframes width → G4; a 2nd DockStage / a bespoke spring → G5. Composes (does not re-implement) proof:no-layout-animation + proof:glass-cohesion.",
    },
    {
        id: "proof:motion",
        cmd: "proof:motion",
        tags: ["local", "ci", "release"],
        note: "BG.W-DEAD-COMPOSABLE-CUT (F5 Motion) — the dead-composable cut is COMPLETE: useHaptic/useCelebrationBurst/useVizChoreography/useLiquidMorph/useDockContextSilhouette are DEFINITION-ABSENT, useMorphField() GUTTED to morphSignatures.ts (MORPH_SIGNATURES + the 3 signature types kept on the root barrel), jubilance.css + morph-field.css deleted, liquid-morph.css MOVED to demo/ (god-module baseline #1 drained), the 3 lying consumer-evidence docs + the 4 retired subject-gates deleted. M1 no-surviving-import over the src/+demo/ corpus · M2 paired-CSS-out-of-src + cascade/partition unwired · M3 MORPH_SIGNATURES on morphSignatures.ts + the barrel · M4 evidence docs gone · M5 NAME-COLLISION FENCE (proof:liquid-morph, the DISTINCT BC dock-morph teardrop gate, untouched) · M6 retired gates gone. Device-free + a self-test bite that re-plants a dead composable and asserts the detector flags. Bite: any dead composable re-added / paired CSS back in src/ / a lying evidence doc restored / a retired gate resurfacing → RED. EXTENDED IN PLACE by BG.W-MOTION-SPINE with two clause families: S1 (the ONE FLIP/morph runner — useElementMorph.ts is the SOLE owner of the rAF/ElementMorph runner + lockSpatialTransition + the hoisted asElement; useLiquidReveal + useDockCtaReceive COMPOSE it and own NO second runner; useBloomUp fold BOOKED) + S2 (the press-tower collapse — useLiquidPress exposes the squish?:boolean toggle over useSpringPress so ONE wrapper serves both press registers; Button.vue KEEPS the direct useSpringPress composition + the byte-identical --glass-btn-press-t drive, WATCH-3 / the proof:button-glass B2 fence) + a 2nd self-test bite that re-forks the rAF/ElementMorph runner into a bloom wrapper and asserts the runner-single clause flags it.",
    },
    {
        id: "proof:metaball-bridge2",
        cmd: "proof:metaball-bridge2",
        tags: ["local", "ci", "release"],
        note: "BE.W-METABALL-BRIDGE2 — the N-seam stretch-and-snap goo bridge + the neck specular-sweep FLOOR (born-RED→GREEN; the comment-strip pure-detector house pattern + a 6-bite self-test). EXTENDS the morph-bridge.css two-plate merge into fission-bridge.css (a SIBLING file — the BB V↔H two-plate path is byte-untouched, proof:morph-showcase/proof:dock-morph-insitu stay GREEN by construction). Device-free SOURCE arm (B1-B6 + the BB fence). The BINDING painted truth is tests-visual/metaball-bridge2.spec.ts + the W-METABALL-BRIDGE2-DELTA (the N-seam frame-series each piece budding off ONE liquid neck, the snap-back overshoot, the neck specular-sweep ridge, the Safari webkit floor, the PRM single-paint, both modes — NOT this gate alone). B1 the per-seam --neck-t exists N-generalized (a clip-path: inset() on var(--neck-t) scoped to .dock-fission-piece, NOT the BB two-named-plate --vertical/--horizontal literal); B2 the snap-back recoil rides useLiquidFlex ('tanh' capped LOW ≤1.08, --stretch scale-only — no animated layout property); B3 the neck specular-sweep FLOOR reads the SHARED --specular-*/--glass-specular-core/plus-lighter cohort (a --neck-specular-angle conic — NOT a second specular fork / neck-local --mouse-x/y writer) AND is WIRED (the orchestrator WRITES --neck-specular-angle off the spring loop as f(--neck-t) — not a dead CSS fallback); B4 compositor-only + goo-OR-glass (the REGULAR filter: url(#…), NOT backdrop-filter: url(); swapped at --neck-break); B5 ONE scalar ONE spring (--neck-t written by the JS orchestrator off the SpringProgress loop, no second @keyframes clock; DOCK_SPRING read not re-tuned); B6 the PRM carve zeroes --dock-bridge-opacity + kills neck paint (incl. the ripple/splash bridge pseudo-elements). B7 (BE.W-DOCK-JUBILANCE the sited FLOOR delights) the FISSION RIPPLE — a .dock-fission-bridge::before warm-cream specular ring on transform: scale(f(--dock-split-t)) reading --glass-specular-core + plus-lighter (no new color, no animated radius/width) — + the MERGE-SPLASH gold-coalesce — a .dock-fission-bridge::after one-shot earned-gold flash reading --color-gold (the Q2 earned-gold, NOT a --viz-*/--chart-* phase spectrum) + the --metal-glow-* catch-light, GATED to [data-merging] (the orchestrator's reverse-fission direction signal — no false-flash on split). Bite: a two-named-plate literal → B1; a recoil animating inline-size/inset → B2; a forked --mouse-x/y specular → B3; a backdrop-filter:url neck → B4; a second @keyframes neck clock → B5; a missing PRM block → B6; a phase-spectrum splash / a ripple animating a layout radius / a merge-splash with no [data-merging] gate → B7.",
    },
    {
        id: "proof:blob-page",
        cmd: "proof:blob-page",
        tags: ["local"],
        note: "AZ.W-BLOB-PAGE — the TRUE blob-page live π gate (3 bites): SWATCH-EDGE-CRISP (the device-px linearRGB/6-octave/stitch filter — black-swatch fling-specks <=3; the old filter read 7-21), SATELLITES-SEPARATE (silhouette CV >=0.04 over an orbit cycle + containment + orbitRadius>bodyRadius), HERO-FIRST IA. The GL renderer is REFUTED-CLOSED (C6-1/F2-R3-9). Loads :5199 — local-only, ledger-backstopped. Bite: revert the filter / the orbit / the IA order → RED.",
    },
    {
        id: "proof:blob-page-fence",
        cmd: "proof:blob-page-fence",
        tags: ["local", "ci", "release"],
        note: "AZ.W-BLOB-PAGE §X (the HC-GATESPEC MANDATORY split) — the device-free GL-fence diff-witness: the refuted-closed GL renderer file set is UNTOUCHED by the blob-page wave's own commit (git-scoped to the feat(AZ): blob-page subject; W-BLOB-STUDIO's authorized shader edits ride a distinct commit). Bite: a shader edit in the blob-page commit → RED.",
    },
    {
        id: "proof:motion-demo",
        cmd: "proof:motion-demo",
        tags: ["local", "ci", "release"],
        note: "AZ.W-MOTION-SUITE — the robust /motion demo source arm: the FULL curve canon enumerated (the value.js ease family + the keyframes curves + steps + the editable bezier), the springs page on SPRING_PRESETS (zero local closed-form spring forks — the drift kill), the scroll/VT facilities demoed, ppmycota purple DEMO-LOCAL only (never a library token). The π half rides tests-visual/motion-demo.spec.ts (local-only). Bite: re-fork a spring / drop a canon family / mint the purple into src → RED.",
    },
    {
        id: "proof:motion2",
        cmd: "proof:motion2",
        tags: ["local", "ci", "release"],
        note: "AZ.W-MOTION2 (R7) — the curve gallery REDRESS source arm: the THICK non-scaling stroke, the dead --surface-tint-1/-2 BUG killed (negative-predicate), the underline panel-nav picker, the 1:1 keyframes isomorphism census (vs the LIVE EASING_GROUPS authority: CSS keywords + smooth-step-3 + linear() + springs-own-family + hyphen names), the calm-substrate + muted-lift witnesses. The π half rides tests-visual/motion2.spec.ts (local-only). Bite: re-introduce a dead tint / thin the stroke / pill the picker / drop a canon item / un-mint the purple → RED.",
    },
    {
        id: "proof:dock-sections",
        cmd: "proof:dock-sections",
        tags: ["local", "ci", "release"],
        note: "BA.W-DOCK-SECTIONS — the tripartite SECTION-GROUPING gate, SPLIT at BC.W-DOCK-STACK-RAIL. The RAIL clauses (S2 the --dock-rail-seam-offset seat · S3 the chip-retract · S5 the DockRail+FadingScroll overflow · S6 the demo chip-fan gutter) are RETIRED — the divider-carousel they policed (DockRail.vue / rail-extend.css / the --dock-rail-seam-offset seam-locator / the .dock-hairline chip strip) is DEFINITION-ABSENT (clean break, no alias) and their concern is re-pointed to the named successor proof:dock-stack-rail (its S1 asserts the retire; its S2-S6 own the new macOS hover-expand <DockStack> seat/fan/overflow/topology). What REMAINS valid + gates here is the SECTION-GROUPING (orthogonal to the rail rebuild — it groups the dock's already-in-flow controls on the display:contents box-INVIOLATE chassis): S1 the declarative tripartite descriptor renders descriptor-DRIVEN (a <DockSection> v-for over the `sections` prop, the `kind` switching the rail-core|section|nav zone demarcated by <DockSeparator>, composing the existing registry — NOT a hardcoded three-element literal); S4 BOTH shell docks render <DockSection :sections> (the third-rail census). A born-RED grouping self-test bites every run (S1 hardcoded-literal / S4 no-adoption mutations each flag). Bite: drop the descriptor-driven v-for/kind/separator-compose -> S1 RED; drop <DockSection> from either shell -> S4 RED.",
    },
    {
        id: "proof:dock-morph-insitu",
        cmd: "proof:dock-morph-insitu",
        tags: ["local", "ci", "release"],
        note: "BA.W-DOCK-MORPH-INSITU — the in-situ shell-dock V↔H orientation morph + the layering/contextual switch + the BA-VJS-1 nested-measure fix (R8-2 coverage gap: the morph HOLDS on the showcase, the user wants it IN the shell). Device-free SOURCE arm (the BINDING visual truth is the π SHELL DELTA tests-visual/dock-morph-insitu.spec.ts + W-DOCK-MORPH-INSITU-DELTA.md — the in-situ V↔H frame-series t=0/.25/.5/.75/1 both directions occluded at the midpoint, the in-situ layering switch live, the BA-VJS-1 four-cycle from:40→to:≈242 non-zero every cycle, the §7 4×-throttle perf re-run — PLUS the proof:ba-gestalt dock-surface holistic verdict, BA inv-4). M1 AppShell binds useDockOrientationMorph (the AZ driver, consumer #2) + the shell handler reaches its toggle/morphTo/pin + BOTH shell docks carry the morph control + NO second morph engine/clock on the shell path (the no-second-engine floor); M2 bidirectional on the ONE --dock-morph-t scalar + no clip-path interpolation across the topology flip (AX.W42 fold-7 NO-GO) + the §7 startViewTransition crossfade is the shipped default; M3 the layering/contextual switch is exercised in-situ (useContextualDockLayers + railContext + DockSection + DockRail wired ON BOTH shell docks against W-DOCK-SECTIONS's chassis, not story-only); M4 the teardrop-vs-crossfade ship decision rides the recorded §7 perf number (the DELTA carries the p50 + over-16.7ms fraction + the shipped register — the mechanical fall, the NUMBER decides); M5 the BA-VJS-1 nested-group measure ORDERS the inner target ahead (the onSwap rAF measure composes the nested registered target's max-content into the OUTER `to` via nestedTargetsWithin/forceNestedMaxContent — the inner is forced to its own span before the outer shrink-wrap reads it) AND DOCK_SPRING is byte-untouched (response:0.32 dampingFraction:0.7 — the value.js letter's explicit spring fence; a spring re-tune to mask the to:0 REDs). Bite: drop the driver bind / add a second morph engine / clip-path morph across the flip / drop the VT default / unwire the in-situ layering / drop the perf number from the DELTA / re-tune DOCK_SPRING chasing the to:0 → RED.",
    },
    {
        id: "proof:shell-hold",
        cmd: "proof:shell-hold",
        tags: ["local", "ci", "release"],
        note: "BA.W-SHELL-HOLD (FD-FS-4) — the demo shell HOLDS the page. Device-free source witness (S1): the railContext `set` on BOTH shell docks (SidebarDock.vue + BottomDock.vue) gates its router.push behind a user-activation guard (an equality short-circuit against the get-resolved value, or an @advance latch) — no longer the unconditional v-model-echo push. The detector asserts the POSITIVE (the set body references the guard AND every router.push is reachable only through it) and reds a push placed BEFORE the guard (a smuggle). The binding live truth (P1 — every drift route holds >=3s with no input + a scripted chip click still navigates) rides tests-visual/shell-hold.spec.ts (local-only). NOTE: the diagnosed v-model echo does NOT reproduce at HEAD (the `set` is never invoked on mount/reconcile in Vue 3.5 — instrumented); the guard lands as the correctness floor W-DOCK-SECTIONS inherits. Bite: revert either set to the unconditional push, or add a push before the guard -> RED.",
    },
    {
        id: "proof:shell-identity",
        cmd: "proof:shell-identity",
        tags: ["local", "ci"],
        note: "AZ.W-SHELL-IDENTITY — the demo-shell home region: the F wordmark IS the Foundations entry (the Compass dup dropped), demarcated by DockSeparator, 2rem, optically centered by the MEASURED ink-lean nudge (the +-0.5px acceptance band re-probed live — never a hardcoded value alone), the proper glass hover register. Bite: re-add the Compass dup / drop the separator / break the band → RED.",
    },
    {
        id: "proof:blob-studio",
        cmd: "proof:blob-studio",
        tags: ["local"],
        note: "AZ.W-BLOB-STUDIO — the studio live π: stage-fill (pi>=0.55 of the stage, centered), the circular merge-bridge menisci, the geometry/satellites live knobs (orbit→max separates 5-7 components), the two-rung gel-dome shadow (ambient+contact, token-first, dark re-resolution). The uBackdrop refraction closed CONDITIONS-UNMET (the enamel stands; the user conditional honored). Local-only, ledger-backstopped.",
    },
    {
        id: "proof:blob-studio-config",
        cmd: "proof:blob-studio-config",
        tags: ["local", "ci"],
        note: "AZ.W-BLOB-STUDIO — the studio configurator source arm: the design-hierarchy grouped sections, smoothK surfaced 0.02-0.16, the studio seeds 0.06 over the library default 0.05 (the IDENTITY-PRESERVED guard — the louder default pushed the lean-centroid past the 0.10 ceiling). Bite: flatten the hierarchy / drop a knob → RED.",
    },
    {
        id: "proof:shell-config",
        cmd: "proof:shell-config",
        tags: ["local", "ci"],
        note: "AZ.W-SHELL-CONFIG — the gear configurator source arm: the FAB SheetTrigger DELETED, the gear opens the re-framed glass-ui demo Configurator (the PresetEditor surface), the Appearance section LEADS with the dark Switch at TOP (R4-3), the --glass-level/--ui-scale/PRM axes thread types→defaults→css-writers→store (the scale axis writes GLOBAL --ui-scale; --dock-scale derives). Bite: resurrect the FAB / sink the dark switch / write --dock-scale directly → RED.",
    },
    {
        id: "proof:adaptive-glass-live",
        cmd: "proof:adaptive-glass-live",
        tags: ["local"],
        note: "AZ.W-ADAPTIVE-AUTO G1 — the BINDING in-situ 4.5:1 + ΔL-silhouette π readback over the enrolled dock + content-glass routes, NO injected ancestor bucket (closes the C5-4 blind spot). Loads :5199 → LIVE_VERIFIED_LOCAL_ONLY; CI grace-skips, backstopped by proof:live-verified-ledger over the W-ADAPTIVE-AUTO DELTA. Bite: revert the self-engage → ΔL<0.08 RED.",
    },
    {
        id: "proof:adaptive-observer",
        cmd: "proof:adaptive-observer",
        tags: ["local", "ci", "release"],
        note: "AZ.W-ADAPTIVE-AUTO G2 — the useGlassBackdropLuminance sampled observer: writes --glass-backdrop-luma + the bucket, rAF-throttled ≤4Hz on the composed substrates (useRAFLoop/useIntersectionPause/useResizeObserver + resolveTokenColor, no hand-rolled rAF), PRM-collapses the live loop, demo-private path-B no-overfitting bar (the dock binary consumer #1 + the evidence-doc trigger).",
    },
    {
        id: "proof:register-ios",
        cmd: "proof:register-ios",
        tags: ["local", "ci"],
        note: "AZ.W-REGISTER-IOS — the de-red'd iOS-glassy interactive register (born-RED, H1 arm-a). Device-free SOURCE arm: the rail active bar reads --dock-selected-accent (a translucent foreground luminance-lift, never --primary/brand solid), the active glyph stays --foreground warm-ink, the dock-control :active reads --dock-control-press-bg, and the surviving-red allowlist is a MACHINE-CHECKABLE NEGATIVE PREDICATE (no interactive-state rule across src/styles/** + demo/** reads var(--viz-fourier)/--demo-nav-accent). The PAINTED truth is the π arm (tests-visual/register-ios.spec.ts). Bite: re-introduce a brand-red on any interactive register → RED.",
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
        id: "proof:hierarchy",
        cmd: "proof:hierarchy",
        tags: ["local", "ci"],
        note: "AZ.W-HIERARCHY — the canonical section-heading rung + the Configurator hierarchy vocabulary: (a) no enrolled story h2 off-canon, (b) StorySection exposes the text-subheading h2 register, (c) the THREE Configurator tokens (--configurator-section-size/-weight on the section label; --configurator-preset-row-weight as SPATIAL padding/gap, never a font-weight). The π readback (local-only) binds the resolved 20.4px + no child>parent. Bite: re-roll an off-canon caption / drop a token / consume the preset token as font-weight → RED.",
    },
    {
        id: "proof:suffuse",
        cmd: "proof:suffuse",
        tags: ["local", "ci"],
        note: "AZ.W-SUFFUSE — the design-language suffusion source gate: the D2 hero display-h1 on the starved substrate pages (StoryHero heroTitle), the D3 one-color-event map (--motion-accent on the motion band; the last two --viz-fourier strays re-pointed), the D4 thin-spot underlays, the motion-suffusion reveal discipline (PRM-guarded). Each suffusion item carries its restraint counter. The BA.W-SUFFUSE2 carve extended the one-color-event LEDGER to the newly-popped band surfaces (forms/containers/data/navigation + the display/badge + slider/select reference register) and made the ppmycota fence comment-blind. Bite: a second color event on a one-event surface / a PRM-unguarded cascade → RED.",
    },
    {
        id: "proof:suffuse2",
        cmd: "proof:suffuse2",
        tags: ["local", "ci"],
        note: "BA.W-SUFFUSE2 — the per-category color identity spread within proportion (born-RED → GREEN). The device-free SOURCE arm; the BINDING painted truth is the π readback tests-visual/suffuse2.spec.ts + the W-SUFFUSE2 DELTA + the proof:ba-gestalt verdict. W1 each enrolled category (forms→3 teal, containers→2 blue, data→9 slate, display→5 amber, navigation→12 indigo) carries its ONE --section-color-N on the THREE register sites — the tinted eyebrow (--section-label-accent) + the border-l-[3px] accent rail + the focal <IconChip :section> — all on the SAME mapped stop (the per-category MAP recorded as gate facts so a future agent cannot smuggle a fourth hue) + the W-ICON-CHIP W4 floor (no inline template-literal color-mix(in srgb, var(--section-color-${...}) chip paste outside icon-chip/). W2 the StoryPage content chrome <h1> (variant==='page') resolves to text-title (the POSITIVE next-√φ rung above the section <h2> text-subheading — the W-STAGE-applied literal diff, HS-2). W3 every /motion/*.vue references --motion-accent + no --viz-fourier/--demo-hue warm-red on a motion paint channel (the channel-swap-evasion guard) + the motion-violet stays demo-local (no --motion-accent declared in src/styles/ — the ppmycota HARD fence). Bite: drop a register site / use a different stop per site / re-paste the inline chip recipe / regress the h1 rung / re-introduce warm-red on motion / leak --motion-accent into the library → RED.",
    },
    {
        id: "proof:colocation",
        cmd: "proof:colocation",
        tags: ["local", "ci"],
        note: "AY.W-COLOCATE — the feature-dir colocation convention over every README-bearing complex feature-dir (DERIVED, currently aurora/constellation/dock/fourier-field/goo-blob/handmark/tabs): composables under composables/, magic-number/config consts in constants.ts, shaders/skeletons co-located, README present, + the design-idioms home doc. Bite: move a composable to the package root, delete a constants.ts, inline a magic-number, or delete a target README → RED. BH.B2.4a — + the CARVE-LEAF clause: the three god-module carves (CarouselContent->useCarouselWorm, PagerDots->usePagerWorm, useBloomUp->bloomUpField) live as colocated leaves IMPORTED BACK by their host (the gate FOLLOWS the composition into the leaf); born-RED if a leaf is absent / not exported / not imported, + a 4-bite self-test. Bite: delete a carved leaf, sever its host import, or drop the export -> RED.",
    },
    {
        id: "proof:alias-codemod",
        cmd: "proof:alias-codemod",
        tags: ["local", "ci", "release"],
        note: "BH.B2.0 — the @glass source-alias depth-decouple lock. Asserts the 3-plane @glass alias is wired (tsconfig paths + vite resolve.alias + vitest resolve.alias) AND zero deep-relative (../)+src/ import/export SPECIFIERS survive in demo/ + tests/ (719 rewrites; fs-path literals stay relative by construction). Born-RED on HEAD (alias absent + 719 specifiers) -> GREEN after the codemod. Self-test bite: the SPECIFIER detector must flag a synthetic deep-relative src import and must NOT flag an fs-path literal / already-aliased / non-src relative import. Bite: re-introduce a ../src/ import in demo or tests, or drop a plane's alias -> RED.",
    },
    {
        id: "proof:subpath-classify",
        cmd: "proof:subpath-classify",
        tags: ["local", "ci"],
        note: "BH.B2.1-mech — the fail-CLOSED subpath-classification mechanism that re-derives the published-subpath surface from ONE explicit classification (scripts/lib/subpath-policy.mjs) feeding BOTH the vite entry map (libraryEntryMap()) AND the generator (scripts/regen-exports.mjs), so the entry NAME set and the export key set can never drift from two hand-lists. The binding evidence is THREE RAN cases (the regen spawned as a subprocess, exit code + machine report asserted): C1 real (--json) -> exit 0 AND fail-closed PASS AND symbol-fidelity 0-fail AND EXACT_REPRODUCTION (regen reproduces package.json exports + typesVersions with zero add/drop/mismatch); C2 --inject-unclassified -> exit 1 (the fail-CLOSED teeth — a synthetic unclassified BG-added dir is a HARD ERROR, never a silent publish); C3 --break-fidelity -> exit 1 (the fidelity teeth — a hand-mapped source that vanished MUST flag). Plus the STRUCTURAL single-source assert: the policy module exports the three classification maps + the entry-map/emit helpers, and libraryEntryMap() name set === buildEntrySet() entry name set. Bite: drop a policy map/helper export, let the regen go fail-OPEN, or sever the single-source identity -> RED.",
    },
    {
        id: "proof:claude-structure-sync",
        cmd: "proof:claude-structure-sync",
        tags: ["local", "ci"],
        note: "BA.W-HYGIENE (P-5) — the CLAUDE.md §Structure custom/ enumeration ≡ disk drift gate: the dir-named lines under the custom/ header equal `ls src/components/custom/` (set-equality both directions, minus index.ts/non-dirs) AND the declared count equals the disk count (DERIVED, not a literal). Folds the P-4 on-disk-but-untracked visual-png integrity assert (every un-ignored docs/tranches/*/audit/visual png is git-tracked). Bite: add/remove a custom/ dir without re-syncing the doc + count, or leave an un-ignored visual png untracked -> RED.",
    },
    {
        id: "proof:deck-progress-rail",
        cmd: "proof:deck-progress-rail",
        tags: ["local"],
        note: "AX.W24 (re-wired BA.W-HYGIENE scope 10) — the KEPT .glass-progress-rail recipe (cascade-correct --progress-fill/track token-feed + inset glow) over <Progress> + ProgressDefault token-read + the /deck reserved guard (the DeckProgress wrapper/subpath RETIRED, PRUNE-LEDGER R2). The recipe SURVIVES on master with the slides consumer; re-wired into the local set off its orphaned (script-present, gates-row-absent) state. Bite: drop the recipe's token-feed, repaint a bg-primary util, un-retire the wrapper, or squat the /deck namespace -> RED.",
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
        id: "proof:ay-w0-reground",
        cmd: "proof:ay-w0-reground",
        tags: ["local"],
        note: "AY.W0 — re-ground meta-gate (AUDIT-LEDGER.md RE-GROUNDED to HEAD; 3 landed SHAs 45cfb79/a730782/7952cd1 ancestor-reachable; no bare stale label on a shipped+gated row; every numbered row closed-vocab + evidenced). Bite: re-introduce a bare UNADDRESSED on a row whose evidence still ships → RED naming the row.",
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
        id: "proof:constellation-spine",
        cmd: "proof:constellation-spine",
        tags: ["local"],
        sibling: true,
        note: "BB.W-SPINE-CONSTELLATION — the cross-repo coherent-latest spine gate (born-RED, tagged [\"local\"]; the proof:ba-gestalt born-RED → promote model). Walks every constellation member's package.json (the hub + 4 leaves + 7 enrolled consumers + the WASM-leaf caret arm; the 3 independent-node services explicitly NOT enrolled) and asserts the 8 clauses (§6 BB-AMENDMENT-constellation-modernize.md): C1 value singleton IDENTITY (glass-ui value peer ⊇ kf value dep + every member admits the coherent 0.13.0 floor, pre-1.0 lockstep) · C2 no @mkbabb multi-major `||` (the value ^0.13.0||^1.0.0 pre-guard bridge the ONLY sanctioned exception) · C3 no dist-tag/star/next on @mkbabb or shared singleton · C4 no stale-lineage glass-ui cap (every consumer admits ^4.x) · C5 no ancient major (TS ^6/vite ^8/vue-tsc ^3) · C6 the registry-consumer probe discipline recorded (dependency-order-book.md, cross-refs W-LINEAGE-PROBE) · C7 the WASM-leaf family-caret arm + the csp divergent-publisher provenance fence (csc411 wasm crate, never muster/csp-wasm) · C8 the born-RED value ^1.0.0 pre-guard (the hub admits ^1 so value's DECIDED 1.0.0 cut cannot re-strand). SIBLING (walks foreign trees; absent members skip gracefully). BORN-RED at HEAD: the hub is bumped but the 7 enrolled consumers still cap glass-ui at ^3.x (C4) + the TS5/Vite7 trio + playground vite-6 (C5) — RED until the Batch-5 fleet adopt (W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE), the single authorized verdict-flipper that PROMOTES it to the close set. Bite: re-introduce a @mkbabb union / a star / a stale glass-ui cap / an ancient major REDs the census.",
    },
    {
        id: "proof:close-battery-parity",
        cmd: "proof:close-battery-parity",
        tags: ["local"],
        note: "BB.W-CLOSE-BATTERY — the full-set close-battery lock (born-RED → GREEN at the close-path wiring). Asserts the close/release path runs `gates.mjs --run full` (the deduped union local ∪ ci ∪ release) siblings-absent BEFORE the irreversible tag, NOT `--run local`/`--run release` alone (the BA over-claim: `ci ⊂ local` carried 18 reds AND the close never ran the union). 4 clauses: C1 the `--run full` union mode exists + is the deduped union; C2 release.sh runs `--run full`; C3 release.yml runs `--run full`; C4 the `proof:full` script + the CLAUDE.md close-battery canon. + the self-test bite (a synthetic `--run local`-only close path MUST flag). DEVICE-FREE meta-gate (imports gatesFor — it cannot be in the set it walks); `local`-tagged (the proof:gate-manifest-sound precedent), promoted to the close set by the BB close. Bite: re-point the release path to `--run local`/`--run release`, or narrow the full union → RED.",
    },
    {
        id: "proof:ship-attestation",
        cmd: "proof:ship-attestation",
        tags: ["ci", "release"],
        note: "BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — Arm B, the tag-push BYPASS-CLOSER. The maintainer's publish path is `git tag && git push` -> release.yml (ubuntu/SwiftShader) -> `gates.mjs --run full` -> `npm publish`, which BYPASSES release.sh's Mac-only ship-block. Registered ['ci','release'] so `--run full` runs it on every tag-push publish; DEVICE-FREE — re-applies the BG band grammar to the per-region pixel DIGEST embedded in docs/tranches/BG/SHIP-ATTESTATION.json + RECOMPUTES the surfaceHash (surface-closure.mjs SOURCE bytes + the transitive paint-closure file LIST) at HEAD; REDs on absent/stale/FAIL-verdict/software-raster/webkit-fail. The attestation is written ONLY by `release.sh --run ship` (Arm A, runShip) on a real Mac/Metal GPU. Born-RED on HEAD (no ceremony has run — the tag-blocker); a 7-leg structural subprocess self-test proves the verdict GREENs on a fresh valid attestation + REDs on each forgery. Bite: absent/stale/re-stamped/software-raster/FAIL-verdict -> RED.",
    },
{
        id: "proof:no-layout-animation",
        cmd: "proof:no-layout-animation",
        tags: ["ci"],
        note: "BB.W-CARD-COMPOSITE (mint) + BB.W-MOTION-CANON (extend) — the compositor-only architectural lock, library-wide (motion-canon P5/P6). Device-free SOURCE arm: scans the WHOLE @keyframes corpus AND every transition/transition-property declaration AND the Vue <Transition> recipe classes (*-enter-active/-leave-active/-enter-from/-leave-to) across src/styles/*.css + every SFC <style>, FORBIDDING any animation of a layout-triggering property (padding*/margin*/font-size/width/height/inline-size/block-size/top/left/right/bottom/inset*/grid-template-*/grid-auto-*/flex-basis/line-height/border-*-width/gap) under ONE shared reflow set, permitting ONLY compositor-safe channels (transform/translate/scale/rotate/opacity/filter/clip-path/paint props/--* customs). A transition: all / transition-property: all reds (the un-scopable-all bite). PLUS the universal-PRM-carve assertion (P6): the a11y-overrides.css carve restricts transition-property to the non-spatial set library-wide AND the transitions.css recipe-local carve drops transform under prefers-reduced-motion. Born-RED at HEAD on CardHeader.vue (keyframe arm, CLS 1.03) → GREEN after the 3-lane re-expression; the transition/<Transition>/PRM arms born-RED via a synthetic in-corpus probe + 3 self-test bites → GREEN at close. NARROW, NAMED, file-scoped, CLS-bounded ALLOWLISTS: the keyframe collapsible-open/close height reveal + the 15 pre-existing transition legs (the discrete-reclaim register: reka collapse/grid-template-rows/HeaderRibbon/drawer-grip; the SIZE/MORPH-indicator + fill-grow registers BOOKED to their owning families' compositor rewrites). Plus MC1-MC6 source asserts (canon-doc P1-P6 submodule-aware skip-by-policy on CI, the §6 SIZE/MORPH row + [SPATIAL]/[EFFECTS] labels, the useLiquidFlex.sizeStyle settled-footprint record). The binding CLS measure is the π/DELTA arm, never this gate alone. Bite: re-add font-size/padding/grid-template-rows to ANY keyframe OR a NEW transition: width/padding off the named allowlist OR a <Transition> class animating a layout property → RED.",
    },
    {
        id: "proof:css-critical",
        cmd: "proof:css-critical",
        tags: ["ci"],
        note: "BB.W-CSS-CRITICAL — the render-blocking /styles split gate (born-RED at HEAD → GREEN on the build emit). SOURCE/BUILD arm — reads the BUILT dist/styles/*.css (carries the build dependency, like proof:emission/profile:budget; ci-tagged so it runs in the CI battery where the build precedes it, NOT under proof:all/--run local which does not build). Four witnesses: W1 the split is published (./styles/critical + ./styles/deferred resolve to emitted dist/styles/{critical,deferred}.css; the ./styles union still resolves index.css); W2 the union is byte-complete (critical ∪ deferred ≡ the monolith partition set — every partial/fold in EXACTLY ONE bucket, the SFC-fold + components.css + @source in DEFERRED, no leak into critical); W3 the critical subset under CRITICAL_GZIP_CEILING (110000); W4 the CRITICAL_PARTITION manifest (src/styles/critical-partition.mjs) is the SOLE partition source. The BINDING perf truth is the FOUC-safe π + the W-LIGHTHOUSE render-block floor. Bite: drop a subpath, leak a fold into critical, breach the ceiling, or fork a src critical block → RED.",
    },
    {
        id: "proof:lighthouse",
        cmd: "proof:lighthouse",
        tags: ["local"],
        note: "BB.W-LIGHTHOUSE — the never-owned PERFORMANCE axis, owned with a binding gate. A per-surface score FLOOR (perf/a11y/CLS/TBT, mobile+desktop) over the PRODUCTION vite-preview build of the demo SPA (scripts/lighthouse/) + a minimal bare-consumer harness. Born-RED: the floor (scripts/lighthouse/floor.baseline.json) is PROVISIONAL at the pre-fix baseline; the orchestrator re-pins at the post-fix achieved numbers (`--rebaseline`) after the Batch-3 perf fixes land. DEVICE-BOUND (a real Chrome + Lighthouse) — local-only so it never blocks headless CI; skips-by-policy (exit 0) when LH/Chrome absent. The preview port is the distinct :5388/:5389 (NOT a reserved :5199/:5173/:5175) via GLASS_UI_LIGHTHOUSE_URL ?? (the default lives in scripts/lighthouse/protocol.mjs, off the gate-manifest-sound clause-4 scan).",
    },
    {
        id: "proof:perf-producer",
        cmd: "proof:perf-producer",
        tags: ["local", "ci", "release"],
        note: "BB.W-PERF-PRODUCER — the value.js A′ perf-producer cluster dispositioned producer-side. Device-free SOURCE arm (the π headed-GPU runtime readback is tests-visual/perf-producer.spec.ts). W1 A′-4: .glass-dock morph root carries `contain: layout style paint` (the --dock-morph-t restyle-scope narrowing; `size` excluded so the shrink-to-fit pill survives) + useLayerTransition exposes `morphing` + `deferReposition(cb)` (the reka Popper re-position deferred off the Vue flush; the FLIP measure untouched; DOCK_SPRING byte-unchanged). W2 A′-6: --dock-icon-glyph rides the per-density --dock-layer-height (the --dock-icon-glyph-ratio + WCAG floor). W3 A′-1: GooBlob ships EXACTLY ONE <canvas> + the guard + onUnmounted dispose + the value.js demo-double-mount routed BY NAME. W4 A′-5: AV_AURORA_DPR_MAX (1.5) < AV_DPR_MAX (2); the aurora wash sub-cap, the focal goo-blob keeps 2×; aurora.frag/metaball.frag byte-unchanged. Born-RED on all 4 at HEAD; GREEN at close.",
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
    // proof:no-value-default RETIRED at the AY close — it asserted the AU.W7
    // required-injected colorResolver DI that AY.W-BLOB3 deliberately STRIPPED
    // (the speculative-DI-without-2nd-consumer retire, RESEARCH OPEN-3,
    // user-ratified). proof:blob-value-free remains the live truth gate for the
    // value.js-free invariant.
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
        tags: ["local"],
        note: "AX.W13 (new born-RED; π-lane fail-CLOSED, HARDENING §G #16) — the operationalized 'stunning' bar: a real-GPU readback of the van-Gogh / oil-pastel / crayon / oil mediums at t=1 asserts (a) van-Gogh atomicity gap-fraction above a floor (discrete dabs, not a coverage smear), (b) no-flat-fills local density variance per painterly medium, (c) van-Gogh OKLab overlap-not-grey (mean chroma above the muddy-grey threshold), (d) the four media pairwise MEASURABLY distinct (no passthrough/shared-body collapse), against the public-domain Starry Night crop fixture. Device-absent → befitting-silent SKIP; a PRESENT-GPU passthrough/shared/linear-mix render → FAIL. Bite: a passthrough van-Gogh measures zero gap-fraction + grey overlap + two-media-identical → RED",
    },
    {
        id: "proof:aurora-atoms-roundtrip",
        cmd: "proof:aurora-atoms-roundtrip",
        tags: ["local", "ci"],
        note: "AW.W6 — resolveAtoms is a PURE TOTAL mapper over the ≤7 Tier-1 atoms (seed/harmony/mood/medium/textureAmount/motion/zones): a fuzz over the full atom-combination matrix (incl. out-of-range inputs) yields a valid in-range AuroraConfig respecting every budget.ts cap, AND resolveAtoms(DEFAULT_ATOMS) deep-equals DEFAULT_AURORA_CONFIG (the wispy-sky default survives the new door). Bite: change a DEFAULT_ATOMS value (default ≠ wispy-sky) → RED; OR remove a budget clamp so a vivid×6-zone combination overflows → RED",
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
        tags: ["local", "ci", "release"],
        note: "AV.W12 — no silent error-swallow in src/: every catch re-throws or carries a '// fail-explicit:' sentinel, and no '?? reactive(' masking default-synthesis on a required dependency. Bite: strip a befitting sentinel or re-inject '?? reactive(BLOB_CONFIG_DEFAULTS)' → RED. AY.W-LEG1 — promoted local→ci+release (the third band-dependency static gate; already GREEN, no carve needed) so proof:tag-parity stops flagging it.",
    },
    {
        id: "proof:no-god-module",
        cmd: "proof:no-god-module",
        tags: ["local", "ci"],
        note: "no src/ .ts/.vue file > 500 lines (excludes __tests__/); warns at 300. THE RATCHET: `RATCHET_BASELINES` grandfathers a known over-bound file at its frozen count (a reported fact, not a violation) so the gate is CI-GREEN before its carve while reddening any GROWTH past the baseline, any NEW file past 500 with no row, AND any stale row (a file that shrank under bound must drop its row — the ratchet only drains). Close state: violations==[] AND baselines drained to ∅. Bite: append a line to a grandfathered file (past its baseline) or push a fresh file past 500 → RED.",
    },
    {
        id: "proof:deps-currency",
        cmd: "proof:deps-currency",
        tags: ["local", "ci"],
        note: "BH.B5a-deps-currency — the build-infra god-module carve + the deps/shadcn-vue verdict. Splits vite.style-assets.ts (566L, uncovered by proof:no-god-module which walks src/ only) into three cohesive sub-plugins the orchestrator composes IN ORDER byte-identically: vite.style-fold.ts (copy+SFC-fold+font-inline+webkit), vite.utility-emit.ts (P9 component-utility rules), vite.critical-split.ts (BB.W-CSS-CRITICAL partition). S1 orchestrator <=200L; S2 the three sub-plugins exist + each <=500L; S3 each exports its fns; S4 publishStyleAssets stays exported + both vite configs import it (plugin surface unchanged); S5 the orchestrator imports all three + re-defines no carved body (real carve, not a copy). D1 docs/canon/deps-currency.md records the currency posture AS a markdown table + the shadcn-vue verdict (keep components.json for `add`, no `shadcn-vue update`, baseColor slate->stone); D2 components.json baseColor off slate. Device-free pure-FS (paint-class H, byte-identical build). Born-RED on HEAD (575L god-module + sub-plugins absent + baseColor slate + doc absent) -> GREEN + an 11-bite self-test.",
    },
    {
        id: "proof:composable-return-types",
        cmd: "proof:composable-return-types",
        tags: ["local", "ci"],
        note: "the carve-parity gate. Locks named Use<Name>Return interfaces on the carved composables (incl. useMetaballRenderer), the BARREL-PARITY snapshot (the goo-blob/constellation/dock-composables barrels each re-export the exact expected symbol set — a god-module carved into a free-function family has no Use*Return to lock, so the barrel symbol set IS its public shape; a dropped/renamed re-export reddens), the aurora GLSL recompose STRING-PARITY (the composed AURORA_MEDIUMS_{PRE,POST}_BRUSH_GLSL hashes to the carve-commit snapshot — the template join is byte-identical), plus the twin-line @utility DRY + the useTokenColor resolver seam + the DO-NOT-SPLIT rationale on the lone keep-whole surface. Bite: drop a barrel re-export / a Return interface / drift a moved GLSL byte → RED.",
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
        id: "proof:az-reflect",
        cmd: "proof:az-reflect",
        tags: ["release"],
        note: "AZ.W-CLOSE clause 10 — THE REFLECTION BAR (the user edict 2026-06-11: the tranche is complete only when every surface holds a reflection-audit PASS). Reads the operative (LAST) verdict of each docs/tranches/AZ/audit/reflect/<surface>.md record across the 9-surface roster + asserts >=1 cited capture on disk + the roster census closure (an off-roster record REDs). A FAIL record = mid-triumvirate = the close cannot start. Born-RED witnessed on the post-redress pre-re-stamp tree (4 FAILs flagged); self-test: synthetic FAIL + capture-less PASS + re-stamp-supersedes all behave. Release-only (the close witness, not a per-push gate).",
    },
    {
        id: "proof:az-final",
        cmd: "proof:az-final",
        // RETIRED from the release set at the BA cut (the au-final/ay-final precedent):
        // its STAGED-OR-CUT clause guarded the AZ->3.13.0 staging window, fulfilled-and-
        // superseded the moment the cut ran; BA is the successor tranche
        // (proof:ba-final is its close gate). The other release gates carry the
        // release-quality coverage. Kept here untagged for the historical record;
        // bite-runnable via `npm run proof:az-final`.
        tags: [],
        note: "AZ.W-CLOSE — the AZ terminal-close meta-gate (release-only, NOT ci). 10 clauses: FINAL-EXISTS+per-wave-citation, R3-CLOSURE (the 15-item matrix read with the headless-trap pi-backed-status arm), BUDGET-REBASELINED, NO-OPEN-LIVE-PENDING, CARDINAL (az/ay/ax ledgers + disposition register), RUNNER-TRUTH-BY-EXECUTION (the runtime gates re-run under GLASS_UI_SYNTH_DEVICE_ABSENT=1 and must exit 0 WITH a printed skip line — never grep), ZERO-ORPHANS, STAGED-OR-CUT (3.10.1+changeset | 3.13.x+CHANGELOG), CLEAN-TREE, THE-REFLECTION-BAR (proof:az-reflect). Born-RED witnessed on the authoring tree (FINAL absent + 4 mid-triumvirate reflections).",
    },
    {
        id: "proof:ba-final",
        cmd: "proof:ba-final",
        tags: [],
        note: "BA.W-CLOSE — the BA terminal-close meta-gate. RETIRED from the release set at the BC cut (4.1.0), mirroring the au/ay/az-final precedent: its C8 STAGED-OR-CUT clause guarded the BA→4.0.0 staging window, which is fulfilled-and-superseded (4.0.0 published; BC is the successor tranche, and the BC cut gates + proof:ba-gestalt carry the release-quality coverage). Kept untagged for the historical record; bite-runnable via `npm run proof:ba-final`. (Was release-only, NOT ci; the proof:az-final successor.) 9 clauses: C1 FINAL-EXISTS+per-wave-citation, C2 THE-GESTALT-BAR (proof:ba-gestalt operative-PASS — the P-1 structural fix made the close gate; REPLACES the AZ per-mechanism proof:az-reflect reflection-matrix clause, BA inv-4: the close CANNOT assert a surface PASS the gestalt gate marks FAIL), C3 BUDGET-REBASELINED, C4 NO-OPEN-LIVE-PENDING (`(DEVELOPED)` stays RETIRED), C5 CARDINAL (ba/az/ay/ax ledgers + disposition register completeness + BOOK-trigger re-eval), C6 RUNNER-TRUTH-BY-EXECUTION (the BA runtime gates re-run under GLASS_UI_SYNTH_DEVICE_ABSENT=1, exit 0 WITH a printed skip line — never grep; the BA waves are overwhelmingly device-free comment-strip detectors, the painted truth read via C2's gestalt verdict), C7 ZERO-ORPHANS, C8 STAGED-OR-CUT (3.13.0+changeset | 4.0.0+changeset-consumed+CHANGELOG '## 4.0.0' — the H4 4.0.0, atlas register-D two grounds; the silent-bump RED), C9 CLEAN-TREE (docs/precepts allowlist). Born-RED witnessed on the authoring tree (C1 RED: FINAL absent; C8 RED: no changeset staged). The pure-detector-with-injected-IO architecture (each clause unit-falsifiable).",
    },
    {
        id: "proof:ay-final",
        cmd: "proof:ay-final",
        // RETIRED from the release set at the 3.13.0 cut (the au-final precedent):
        // its clause-8 STAGED-OR-CUT guarded the AY->3.10.x staging window, which
        // closed when 3.10.1 published; the AZ close gate (proof:az-final) carries
        // the release-coherence coverage. Kept untagged for the historical record.
        tags: [],
        note: "AY.W-CLOSE1 — the AY terminal-close meta-gate (release-only, NOT ci). 8 clauses: FINAL-EXISTS+per-wave-citation, INHERITANCE-CROSSWALK, BUDGET-REBASELINED, NO-OPEN-LIVE-PENDING, CARDINAL-GATE-GREEN both arms + REGISTER-COMPLETE, SQUIRCLE-DECIDED-ONCE, ZERO-ORPHANS, STAGED-NOT-PUBLISHED + CLEAN-TREE. Born-RED-able (12 synthetic violations proven). The DEV-meta analogue of proof:au-final.",
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
        id: "proof:route-confounder",
        cmd: "proof:route-confounder",
        tags: ["local", "ci", "release"],
        note: "BG.W-ROUTE-TRANSITION — the route swap is ONE bare keyed atomic mechanism. Device-free SOURCE scan over AppShell.vue (comment-stripped) + transitions.css: the FOUR confounders ABSENT (the fade-slide <Transition>, the useBloomUp/section-landing-skeleton route-bloom, the dataset.categorySwitch VT no-op, the Skeleton/route.matched.length branches) AND the bare keyed <component :is :key=route.path class=route-enter> + the .route-enter @keyframes gl-route-enter PRESENT. 7-bite self-test (each deleted mechanism flags, a clean tree passes, the comment-strip is load-bearing). Bite: re-introduce any confounder or drop the swap → RED",
    },
    {
        id: "proof:route-single-root",
        cmd: "proof:route-single-root",
        tags: ["local", "ci", "release"],
        note: "BG.W-ROUTE-TRANSITION (re-scoped hygiene) — under the bare keyed swap the Vue 'non-element root' <Transition> warning cannot fire, so this asserts every ROUTED SFC (manifest rows + SectionLanding + NotFound) has an ELEMENT root that can carry the .route-enter on-mount entrance class (flags a text-only / interpolation-only / empty / teleport-only root). 7-bite self-test incl. the planted text-root flag. Bite: a routed module with a non-element root → RED",
    },
    {
        id: "proof:no-paper-field",
        cmd: "proof:no-paper-field",
        tags: ["local", "ci", "release"],
        note: "BG.W-FIELD-AURORA (M2) — the `.paper-field` CSS plane is RETIRED onto the ONE recessive shell <Aurora> (a vividness:0 painterly field), SURGICALLY: the grain register SURVIVES. Comment-blind SOURCE arms — W1 the `.paper-field` recipe/`@keyframes field-cel-drift` ABSENT from paper.css, W2 the field props (`field`/`fieldHue`/`fieldIntensity`/`fieldStyle`) ABSENT from PaperBackdrop.vue, W3 the `@property --field-h-raw`/`--field-intensity` regs ABSENT from property-regs.css, W4 the grain register PRESENT (`.paper-underpaint`/`.paper-grain-overlay::after` + `--paper-grain-tooth` + the PRT opacity:0 grain rule — the blind-delete trap), W5 the BG.W-PAPER-GRAIN-OPTIN demote (advisory until wave 2.5 flips GRAIN_OPTIN_ACTIVE). 5-bite --self-test (each absence/presence detector has teeth). Bite: a `.paper-field` rule/keyframes survives → W1 RED; a blind delete orphans the grain → W4 RED",
    },
    {
        id: "proof:focal-complete",
        cmd: "proof:focal-complete",
        tags: ["local", "ci", "release"],
        note: "BG.W-FIELD-AURORA (M2) — the route-FOCAL enumeration is CONSISTENT (NOT the runtime one-GL law — the close hinges on the LIVE monotonic-GL capture). C1 router.ts threads `isFocalRoute` into `meta.focal` for the story routes AND the section landings, C2 SELF_STAGES_GL ⊇ the committed grep of `<DockStage` over the routed SFCs (a SELF-STAGE route mounting GL outside `background` MUST be enrolled — the silent shell+DockStage=2-GL drift is closed), C3 the resolver is TOTAL (GL_BG_KINDS carries the 4 full-bleed GL kinds, every GL-kind row resolves focal by construction). --self-test planted bite: drop a DockStage route from SELF_STAGES_GL → C2 RED. Bite: add a DockStage route without enrolling it → C2 RED",
    },
    {
        id: "proof:category-card-warm",
        cmd: "proof:category-card-warm",
        tags: ["local"],
        note: "BG.W-CATEGORY-CARD-WARM (USER-REPORTED 2026-06-29) — the category-landing (`SectionLanding`) bento cards must read as WARM LIQUID GLASS, never the 'awful metallic wash'. A category route is NON-focal (no live recessive shell aurora), so a translucent `glass-resting` bento card otherwise sits over a flat grid/paper wash → a silver/metallic sheen. Device-free SOURCE arms: W1 the bento WARM field present (`.section-bento::before` `oklch()`-radial keyed off `--bento-field-h`), W2 the DARK warm-EMBER arm (`.dark .section-bento::before` low-L L<0.5 + chroma kept on every stop — the luminous-dark glow, never charcoal), W3 NO flat/gray backdrop (warm-clamped `clamp(25,…,95)` + every light+dark `oklch()` stop carries chroma), W4 the card transmits warm by construction (the `--bento-field-h-raw` bind off the ONE `warmFieldHue` source + the `SectionPreviewCard` plate is `glass-resting`). 9-bite --self-test (a flat-gray field / a missing dark arm / a missing field each RED). The binding paint (cards read WARM, ZERO metallic, both engines/both modes on /forms + /display + /data) rides the BG gestalt roster. Bite: replace the field with a gray `oklch(L 0 h)` → W3 RED; drop the `.dark` arm → W2 RED",
    },
    {
        id: "proof:field-accent-reconcile",
        cmd: "proof:field-accent-reconcile",
        tags: ["local", "ci", "release"],
        note: "BG.W-FIELD-ACCENT-RECONCILE (M3, class H) — the duplicate warm-projection (warm-field.ts ≡ aurora-hero.ts) folded onto ONE source. W1 hue-PARITY ε0.5° (the 13 SECTION_COLOR_OKLCH degrees == the OLD warm-field SECTION_HUE_DEG literal table — the fold doesn't shift a hue; measured 0.0000°), W2 single-source (aurora-hero.ts EXPORTS warmProjectHue+SECTION_COLOR_OKLCH+sectionHueDeg; warm-field.ts is a thin adapter, NO own projectWarm/SECTION_HUE_DEG/clampWarm/warmFieldHueMap dup), W3 2-consumer (AppShell.vue + SectionLanding.vue call warmFieldHue), W4 the AA recessive precondition + the luminance rewire seam (shellAuroraConfig vividness:0/C≤0.10/L≥0.85 at opacityCeiling 0.5; the shell <Aurora> carries data-glass-field-canvas + useGlassBackdropLuminance auto-discovers it — the binding pixel-AA-both-modes is the live capture). --self-test: a synthetic shifted degree flags W1. Bite: re-fork a projectWarm/SECTION_HUE_DEG in warm-field.ts → W2 RED; shift a section degree → W1 RED",
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
        tags: ["local"],
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
        id: "proof:no-scoped-global",
        cmd: "proof:no-scoped-global",
        tags: ["local", "ci"],
        note: "AZ.R5-5 — zero ':global(' inside any <style scoped> block across src/ + demo/ (the recurring Vue scoped-:global() DROP trap, CSSOM-verified — the rule silently never emits; 3rd production recurrence). The working idiom is the plain-ancestor '.dark .x' form (design-idioms §8). Allowlist EMPTY at birth. Bite: drop a ':global(.dark) .x' into any scoped block → RED.",
    },
    {
        id: "proof:spring-tokens-synced",
        cmd: "proof:spring-tokens-synced",
        tags: ["local", "ci", "release"],
        note: "AV.W14 — the build-pipeline orchestration guarantee: the committed --spring-* block in tokens.css matches the regen-spring-tokens.mjs generator output (the external mutation point is NOT in `build`, so this gate guards the silent-drift gap). Bite: hand-edit one --spring-* value → RED, then run the generator + commit → green",
    },
    {
        id: "proof:animation-coherence",
        cmd: "proof:animation-coherence",
        tags: ["local", "ci", "release"],
        sibling: true,
        note: "AY.W-MOTION — the §6 register guard PROMOTED into CI (was excluded + RED). Widened to the full animated-surface file set (the SURFACE_CSS sheets + named SFC anchors + the *.vue <style> catch-all) + a register-assignment assert (surface→bezier, hover/press→smooth/snappy never bouncy, exit→bezier, morph→dock). The constellation census walks ../speedtest (sibling-skip on a clean runner). Bite: re-add a hardcoded-ms/bare-keyword surface transition, or name --spring-bouncy on a press → RED; a speedtest --ease-apple-spring read → RED.",
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
        id: "proof:constellation-gen",
        cmd: "proof:constellation-gen",
        tags: ["local", "ci"],
        note: "AZ.W-CON-GEN (R5-6) — the constellation generalization, ADDITIVE on the protected quintet: pinnedIndex (stepField/stepWell hold the pin), drawEdges accentIndex, ConstellationPalette accent/edgeFloor/edgeAccentAlpha (+2 tokens both CSS arms), stepPinnedDrift (the autonomous wander inside the single rAF), warpAutoRelease + warpSettled()/pinNode exposes. All default-OFF, byte-compatible. G4 (overlay labels) SPEC'D-NOT-BUILT (the honest book — no second consumer). Bite: flip a default ON / break the quintet → RED.",
    },
    {
        id: "proof:constellation-egg-live",
        cmd: "proof:constellation-egg-live",
        tags: ["local"],
        note: "AY.W-CON2 — the gravity-well egg PERTURBS-THEN-COOLS on the real engine (pi readback: rest 0.160 -> held-peak 0.210 +31% -> cooled within ±6% via the asymmetric WELL_RELEASE_RAMP), NO-SLINGSHOT (maxOob 0px), PRM-suppressed + state-reset-on-edge; a field-is-drifting pre-check guards runner contention. Bite: heat-without-cool / a slung node / a PRM-advancing well -> RED",
    },
    {
        id: "proof:aur2-residue",
        cmd: "proof:aur2-residue",
        tags: ["local"],
        note: "AY.W-AUR2 — the aurora residue strike: the OKLAB/atoms migration claims reconciled (done-strikes verified against the shipped gates) + the derive-color prop sliver wired-or-recorded. Bite: a re-introduced stale migration claim -> RED",
    },
    {
        id: "proof:aurora-arresting",
        cmd: "proof:aurora-arresting",
        tags: ["local"],
        note: "AY.W-AUR-PAINTERLY — the reference-anchored painterly bar on REAL GPU: the van-Gogh hero lands ALL THREE bands (C in [55.67,95.67], A in-band, beta in [-1.85,-1.45] vs the starry-night triple C=70.67/A=0.832/beta=-1.672); oil + oil-pastel hard-assert their ACHIEVED bars with the residual recorded (the T5 anisotropic-Kuwahara successor owns the misses; the bands are never lowered). Bite: a washed-out/garish medium or an off-band slope -> RED; SwiftShader -> SKIP-fail-closed",
    },
    {
        id: "proof:aurora-atoms-render",
        cmd: "proof:aurora-atoms-render",
        tags: ["local"],
        note: "AX.W10 / AY.W-AUR-STUDIO re-skin — the per-atom visible-change device gate over the reka LabeledSelect/LabeledSlider DOM (role=combobox/option + role=slider; the native select/range markup is gone). Bite: a dead/unwired atom measures delta<=floor -> RED; device-absent SKIP",
    },
    {
        id: "proof:aurora-studio",
        cmd: "proof:aurora-studio",
        tags: ["local"],
        note: "AY.W-AUR-STUDIO — the studio-repair composite: dead-select deletion-proof (0x :is-open=false x5) + selects-open pi (medium opens, textured pick reveals the Texture slider) + the 2 re-skinned ledgers flipped fail->pass + atoms-seed-from-preset round-trip (clobber 255.7->41.4) + the served-app sentinel (fail-not-skip on a foreign app). Bite: a re-introduced dead select / re-stale selector / re-clobbering watcher -> RED",
    },
    {
        id: "proof:blob-config",
        cmd: "proof:blob-config",
        tags: ["local"],
        note: "AY.W-BLOB-CONFIG — the blob page config truth: the Configurator adoption (no hand-rolled range strip), the pointerAttraction sign (-1 repels), the stretch axis bites, the live seed/harmony->paletteStops feed, the pause->resume render survives (no strobe-to-charcoal). Bite: a re-dropped sign / a dead feed / a resume wreck -> RED",
    },
    {
        id: "proof:blob3-strip",
        cmd: "proof:blob3-strip",
        tags: ["local"],
        note: "AY.W-BLOB3 — the ColorResolver DI strip deletion-proof: the seam GONE from goo-blob (0 code hits), the renderer re-points to /color (import + resolveColor), the type/default survive for FourierField. Bite: seam-readd OR repoint-removal -> RED (self-test proven)",
    },
    {
        id: "proof:input-invalid-aria",
        cmd: "proof:input-invalid-aria",
        tags: ["local", "ci", "release"],
        note: "AW.W18 + BB.W-INVALID-RING — the aria-invalid destructive ring is ONE register (`--invalid-ring`, the `--focus-ring-shadow` sibling minted ONCE in tokens/scale-paper.css). AW.W18 base PRESERVED (every `.input-pill` invalid rule carries the three-member trigger group + the destructive recipe is intact). BB extension: W1 token-minted-once-the-focus-ring-shadow-way, W2 all four surfaces (.input-pill/SelectTrigger/ComboboxInput/TagsInput) read `--invalid-ring` + a RING-geometry-scoped anti-evasion bite (a fifth inline `0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) …)` re-paste reds; the `8%` bg + `60%` text tint left alone), W3 three-member group where supported, W4 TagsInput fourth-gap arm, + a self-test bite. Born-RED 11 violations on the extension. Bite: drop the [aria-invalid] arm, re-spell the ring recipe inline, or drop a surface's token read → RED",
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
        id: "proof:card-veil",
        cmd: "proof:card-veil",
        tags: ["local", "ci"],
        note: "AZ.R5-7 — the Card surface=veil text-plate gate. (A) SOURCE: @utility veil-surface is BORDERLESS + RIMLESS + FILL-ON-THE-LADDER (color-mix over --glass-bg-quiet through the W55 tint axis — a sanctioned glass register) + the optional --veil-feather mask axis; born-RED via the synthetic boxed fixture. (B) the >=2-consumer muster (the cartoon-consumers mirror). The painted darken rides the adaptive-tint axis. Bite: add a border/shadow to the veil or drop a consumer → RED.",
    },
    {
        id: "proof:glass-panel-tiers",
        cmd: "proof:glass-panel-tiers",
        tags: ["local", "ci"],
        note: "RESTORED at AZ.W-PRUNE2 (the header-ribbon/glass-panel un-prune — the AY census missed the live keyframes consumer): the GlassPanel 5-rung tier contract (svg + fallback arms, both story backdrops). The STORY_CARD path re-pointed to the current IA (display/card.vue). Bite: drop a rung or the fallback arm → RED.",
    },
    {
        id: "proof:metric-core",
        cmd: "proof:metric-core",
        tags: ["local", "ci"],
        note: "AZ.W-METRIC-UNIFY — the ONE Metric value core: coalesceMetric(value, placeholder) (only null/undefined/empty coalesce — a valid 0 renders 0, the zero-value bug killed), all four Metric* SFCs consume it (no per-SFC placeholder redeclaration), the amount→value rename clean-break. Bite: re-inline an amount||placeholder truthy check → RED.",
    },
    {
        id: "proof:gate-script-parity",
        cmd: "proof:gate-script-parity",
        tags: ["local", "ci"],
        note: "AX.W00 — the proof-script ↔ package.json BIJECTION meta-gate. Asserts (A) no orphan proof-*.mjs (every file is registered, modulo the finite owner-attributed KNOWN_ORPHANS AW baseline), (B) no dangling proof:* reference (every referenced .mjs exists, modulo KNOWN_DANGLING), (C) every gates.mjs row cmd resolves to a real package.json script. Device-free FS/JSON. Bite: drop a proof:* registration whose .mjs exists + is not allowlisted → RED (orphan); add a gates.mjs row with a ghost cmd → RED.",
    },
    {
        id: "proof:tag-parity",
        cmd: "proof:tag-parity",
        tags: ["local", "ci"],
        note: "AY.W-LEG1 (the AX.W27a tag-parity meta-assert, NEVER written) — the manifest tags↔aggregate assertion, SEPARATE from the file↔key bijection (proof:gate-script-parity owns that). Asserts every load-bearing STATIC src-scan gate (cmd → scripts/proof-*.mjs, NOT sibling, does NOT spawn a browser) carries `ci`, UNLESS it is a DETECTED Playwright live-verification gate (local-only by the cardinal-lesson architecture, cross-checked against the gates.mjs:30-44 header) OR in the reasoned JUSTIFIED_LOCAL_ONLY allowlist (active-tranche AY meta-gates + the gen-ci-fresh drift meta-step). Born RED against proof:no-legacy-commentary until W-CSS1 promotes it; proof:fail-explicit promoted HERE, proof:no-god-module already ci. Self-proving: a synthetic static-no-ci flags, a synthetic playwright-no-ci does not. Bite: flip a band-dependency static gate back to local-only, or add a new static src-scan gate without ci → RED.",
    },
    {
        id: "proof:no-retired-survivor",
        cmd: "proof:no-retired-survivor",
        tags: ["local", "ci", "release"],
        note: "AY.W-LEG1 (the AX.W27a/b gate NEVER written; the AX corpus falsely claimed it was 'authored W21 / registered W33') — every MIGRATION.md RETIRED claim resolves to ZERO surviving dir/subpath/export/token. A binding-doc retirement lie (L inv 16) — e.g. the AV.W10 metric-cell/metric-stack 'RETIRED' claim that survives at HEAD (speedtest re-adopted them) — is forbidden. Release-blocking (the migration guide is binding). Self-proving: a synthetic RETIRED claim for the LIVE /dock subpath flags. Bite: re-assert a RETIRED claim for a surviving artefact → RED; add an unanchored RETIRED line → RED.",
    },
    {
        id: "proof:var-in-arbitrary-guard",
        cmd: "proof:var-in-arbitrary-guard",
        tags: ["local", "ci"],
        note: "AY.W-LEG1 (the AX.W27a F7 idiom rule, NEVER written) — no shorthand-eligible bare `prop-[var(--x)]` in a :class/CVA-base string where the v4 `prop-(--x)` shorthand applies. The conversions are W-CSS1's §O6 write scope; W-LEG1 owns ONLY this gate (disjoint files). Born RED-with-named-survivors until W-CSS1 lands the conversions. KEEPS stay GREEN: fallback-bearing [var(--x,…)], type-prefixed [length:var(…)]/[background:var(…)], and var() inside an arbitrary [&…] variant selector. Self-proving: a bare h-[var(--x)] flags while the fallback/type/arbitrary-selector keeps do not. Bite: re-inject a bare shorthand-eligible [var(--x)] → RED; flatten a fallback-bearing [var(--x,fallback)] to flag it → the keep-test RED.",
    },
    {
        id: "proof:substrate-paints-color",
        cmd: "proof:substrate-paints-color",
        tags: ["local"],
        note: "AX.W00 — the SHARED substrate-paints-non-black readPixels primitive (W07 aurora + W08 blob compose it). The behavioral truth lives in the tests-visual π workspace spec (substrate-paints-color.spec.ts): renders aurora DEFAULT + each preset at t=1 (maxChannel>0 interior floor) + blob BLOB_CONFIG_DEFAULTS over N frames (LOOSE non-flood opaque-fraction band 0.10–0.70). FAIL-CLOSED when the π workspace is installed; befitting-silent SKIP only on a zero-dep runner (device absent). Bite: black the aurora clearColor → RED (maxChannel==0); flood the blob → RED.",
    },
    {
        id: "proof:liquid-glass-material",
        cmd: "proof:liquid-glass-material",
        tags: ["local", "ci"],
        note: "AX.W52 D19 — the liquid-glass material-CORE gate (the bloom-kill + edge-strengthening arm). Device-free SOURCE + token-resolution arm (the PAINTED render is the W00 π live audit, NEVER a text gate alone — the cardinal lesson: W09 shipped headless-green over a still-blooming surface). Asserts: the `.glass-material::before` is a BOUNDED `circle var(--glass-specular-size,36%)` gleam (NOT the unbounded full-plate disc) on BOTH background + mask; the blend is `plus-lighter` (NOT `screen`); the intensity drives layer `opacity` (NOT a per-stop hsl() alpha — the Chromium `@property`-in-hsl-alpha=0 trap); `--glass-specular-size` minted; the cohort at/below the W52 ceiling (light hover ≤ 0.10 / active ≤ 0.16, dark ≤ 0.08/0.12, rest 0); the floating/overlay saturate ≤ 1.2; the curvature overlay warm-cream-on-`--glass-curvature-intensity` (NOT pure-white) with a SOFTER dark arm (lower intensity, not byte-identical); the dock `ellipse at 30% 30%` 18% corner radials demoted; the Card specular=\"full\" override re-derived down (hover ≤ 0.18 / active ≤ 0.26); and `-webkit-backdrop-filter` present in the built dist/glass-ui.css (the Safari prefix; device-absent SKIP for that clause only on a pre-build tree). Bite: re-introduce `circle at X Y, … transparent 55%` or `mix-blend-mode: screen` on the ::before → RED; bump the cohort/saturate above ceiling → RED; re-pure-white the curvature or strip the dist prefix → RED.",
    },
    {
        id: "proof:tabs-std",
        cmd: "proof:tabs-std",
        tags: ["local"],
        note: "BA.W-TABS — the standardized SegmentedTabs gate (born-RED; SUPERSEDES proof:tabs-unified, retired-with-re-point — R10-2 'totally overhaul and standardize our tabs. No legacy code … the pill variants are good … underline … for paper scenarios … too many types … entirely superfluous. The animations for springs … not smooth enough/too slow'). Device-free SOURCE arm (always gates): ONE engine, TWO materials, ONE orientation axis — `variant` is the TWO-value pill|underline axis (pill DEFAULT, the GLASS material absorbing the retired `segmented`; underline the PAPER material), `orientation` first-class (horizontal|vertical, axis-derived — the R10-2 horizontal-only vertical-slab is structurally impossible), the PILL track rides --glass-bg-quiet + the indicator --glass-bg-floating (the W-REGISTER-IOS selected-reads-as-glass tier, NO --surface-tint gray plate / NO saturated --foreground fill — R10-5 no-gray), the UNDERLINE composes the shared `.paper-ink-mark` register (W-SURFACE-AXIS — 2px --foreground ink, NO plate/blur/glass — the R10-2 oval-blob dead), the indicator glides on --spring-snappy at the CALIBRATED --tab-indicator-duration (=--spring-snappy-duration, the W-GLASS-CAL clock — NOT the generic --duration-normal sub-pixel tail) + squishes volume-preserving (scale var(--stretch) calc(1/--stretch), capped ≤1.10, PRM-gated) RELEASING-AT-ARRIVAL (INDICATOR_RELEASE_AT_ARRIVAL fraction; the fixed mid-glide INDICATOR_RELEASE_MS=60ms timer GONE), the BA-VJS-3 center-correction (the JS slider is center-anchored — offsetLeft+width/2, NOT the raw translateX(offsetLeft) left-edge write valuejs-fold A-5/U21 flagged), the overflow axis + :multi-select prop RETIRED (clean break — overflow is <FadingScroll>'s job, a multi-pressed strip is a ToggleGroup), ui/Tabs OFF the public barrel (the reka substrate stays INTERNAL for the dock-rail consumer DockLayerGroup + :surface=false — the recorded internal-keep arm; the /tabs subpath = SegmentedTabs preserved), proof:tabs-unified retired-with-re-point (the script + the file gone). PLUS a fail-CLOSED π LIVE arm (the pill indicator GLIDES + --stretch exceeds 1 mid-travel AND the underline ::before paints NO plate (≤6px hairline) on /navigation/tabs; the full no-plate/vertical-axis/timing/centering readback is tests-visual/tabs-std.spec.ts). Bite: re-introduce variant=segmented/the overflow axis/:multi-select/a ui/Tabs public-barrel row/INDICATOR_RELEASE_MS/the --duration-normal indicator clock → the matching clause reddens.",
    },
    {
        id: "proof:dock-animation-live",
        cmd: "proof:dock-animation-live",
        tags: ["local", "ci"],
        note: "AV.W9.4 + AW.W2; AX.W00 PROMOTED fail-open SKIP → fail-CLOSED; AY.W-DOCK2 RE-AUTHORED the lockstep witness + CI-promoted. The dock BEHAVIORAL motion gate: deterministic-drive (forced FLIP arm via removed startViewTransition + real page.hover on /dock/overview's data-testid=dock-capture dock) samples the dock-root box geometry AND the LAST ENTERING .dock-layer--full child opacity on ONE rAF timeline. THE BINDING LOCKSTEP WITNESS (AY.W-DOCK2): the last entering child opacity onset trails the box-width onset by ≤ LOCKSTEP_BUDGET_MS (the deliberate macOS-dock reveal-stagger ceiling, window 0.4 + step×5); a regression PAST the stagger REDs. The prior box-vs-scalar onset check was a TAUTOLOGY (the box rides the scalar by construction) and is DEMOTED to a non-binding structural fact. PLUS the AX.W00 device-free TOKEN-PEAK secondary (--spring-dock linear() peak ≤ the published (0.32,0.7) ~+4.6% baseline) which reds on EVERY runner. CI inclusion (AY.W-DOCK2 §F5): the device-free token-peak + structure arms run on the clean CI runner (no π workspace → the live arm grace-SKIPs with exit 0); the live-rAF arm lives in the tests-visual π workspace (dock-animation-live.spec.ts), fail-CLOSED when the workspace is present. The device-free born-RED witness is proof:dock-lockstep-bornred (the pure detector over a synthetic-lag timeline). Bite: retune --spring-dock bouncier → token-peak RED; push the entering child past the stagger budget → live RED.",
    },
    {
        id: "proof:dock-rail-cohesion",
        cmd: "proof:dock-rail-cohesion",
        tags: ["local", "ci"],
        note: "AY.W-DOCK2 (D5) — the DockLayerGroup switcher-rail cohesion gate (one-clock + single-indicator + persistence). Device-free SOURCE arm: (a) the rail <TabsList class=\"dock-layer-rail\"> carries :indicator=\"false\" (single-indicator — born-RED on HEAD where the phantom default <TabsIndicator> double-painted, H-dock §D7 L1); (b) .dock-layer-tab-indicator carries NO --dock-motion-resize (one-clock — the DK7-killed fixed-linear SECOND clock re-pointed onto the --spring-snappy discrete-selection register; born-RED on HEAD); (c) persistence LANDED (rail outside the --full clip) or BOOKED (a BOOKED: AY.W-GOD1 marker + successor near the rail block — formal book, the GlassDock-slot carve rides W-GOD1). The π twin (dock-rail-cohesion.spec.ts) asserts exactly ONE [data-slot=tabs-indicator] under .dock-layer-rail. Bite: drop :indicator=\"false\" → RED; re-add --dock-motion-resize on the rail → RED; remove the BOOKED marker → RED.",
    },
    {
        id: "proof:dock-orchestrator-single",
        cmd: "proof:dock-orchestrator-single",
        tags: ["local"],
        note: "AX.W02 — ONE morph engine per dock. Device-free STRUCTURE arm: GlassDock builds exactly 1 useDockMorphOrchestrator + provides the morph context, DockLayerGroup injects the OPTIONAL context and defers (registerGroup) with its SINGLE useLayerTransition gated standalone-only. π-lane RUNTIME arm (fail-CLOSED when the workspace is present; dock-orchestrator-single.spec.ts): a simultaneous collapse + pane-swap on the /dock/layers nested showcase samples the dock-root box AND the nested pane-stack on ONE --dock-morph-t timeline (both onset ≤ 1 frame from the scalar; engineCount == 1). Bite: re-add an unconditional useLayerTransition to the nested path → STRUCTURE RED; drive the stack on a second clock → RUNTIME RED.",
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
        tags: ["local"],
        note: "AX.W04 — `overflow=\"wrap\"` is CONTENT-driven intrinsic flex-wrap, not a viewport @media. Device-free SOURCE arm (runs + hard-REDs on EVERY runner): the magic-640 `@media` snap-back governing `.dock-overflow-wrap` is GONE, the `--dock-overflow-bp` token is deleted, the wrap recipe carries always-on `flex-wrap: wrap` + a valid `max-inline-size: var(--dock-max-inline-size)` cap over the base shrink-wrap (NOT the INVALID `min(max-content, …)` — math functions reject the `max-content` intrinsic keyword, so that form computes the property to its initial `none` and the cap silently drops; the SOURCE arm BITES on a `min(max-content` regression), the radius unifies onto `--dock-card-radius` (the bare `--radius-2xl` literal is gone) morphing off `--dock-expand-t`, the `--shadow-dock-wrap` card-tier token + the scalar-driven floating-tier box-shadow lift, the GlassDock.vue `orientation !== 'vertical'` horizontal-only guard, and the struck false `proof:dock-layering-polish` wrap-reflow doc-rot (`wrap reflow|morphing.*wrap` grep = 0). π-lane RUNTIME arm (fail-CLOSED when the workspace is present; dock-wrap-content-driven.spec.ts): mounts the demo wrap dock at a ≥640px viewport and asserts computed `flex-wrap === 'wrap'`, `rowCount >= 2`, `dock.right <= innerWidth` (no viewport bleed), and no vertical `.dock-overflow-wrap`. Bite: re-add the @media-640 nowrap snap-back → SOURCE RED; restore the invalid `min(max-content, …)` cap → SOURCE RED + live rowCount:1 RED; raise the cap above content width → live rowCount:1 RED.",
    },
    {
        id: "proof:slider-two-only",
        cmd: "proof:slider-two-only",
        tags: ["local", "ci"],
        note: "AX.W59 + AY.W-SLD1-R3 (the FINAL form, user-directed x3) — the two-recipe cardinality (standard+spectrum) + the THUMB-INVISIBLE contract: the standard slider is ONE continuous glass segment, the base .slider-thumb paints width:0/opacity:0 (NO disc/cap/ring — you pull the TRACK; the reka thumb stays mounted for a11y/drag), keyboard focus rings the TRACK via :focus-within var(--focus-ring-shadow); the spectrum keeps its slim visible bar (0.6x thumb-size per the value.js ref) + the squircle PE tier; + the clause-5 consumer-boundary walk. Bite: a painted standard thumb / a missing track focus ring / a variant=rounded consumer -> RED",
    },
    {
        id: "proof:carousel-glass-atoms",
        cmd: "proof:carousel-glass-atoms",
        tags: ["local", "ci"],
        note: "AX.W23 — the carousel dot rail RENDER assertion (reads the emitted dist/glass-ui.css, not a source string). TWO clauses (AX.W19 pruned the custom/glass-carousel composite + its former clauses C FOUR-STATE / D CHROME-SUBSTRATE): (A) DOT-CONTRAST — the emitted .carousel-dot::before inactive fill is color-mix(in srgb, var(--foreground) N%) whose RESOLVED color clears ≥3:1 (WCAG 1.4.11) against the composited bg-card/30 dark card in BOTH schemes (born-RED on HEAD's bg-muted-medium ~1.2:1); (B) NO-DEAD-CLASS — CarouselDots carries no scale-[var(--x)] var-in-arbitrary non-emit AND the active emphasis emits a REAL scoped .carousel-dot[data-active]::before width|height morph. NOTE reads dist/ → run after build. Bite: revert the dot to bg-muted-medium → (A) RED; re-add scale-[var(--x)] or drop the [data-active] morph → (B) RED.",
    },
    // The malformed cmd-less row that crashed `proof:all` was DELETED here at
    // AZ.W-GATES (D1); both parity meta-gates now pre-pass on well-formed
    // id/cmd so a row like it can never land silently again.
    {
        id: "proof:squircle-language",
        cmd: "proof:squircle-language",
        tags: ["local"],
        note: "AX.W56 — the corner-SHAPE token axis + the rounded-vs-squircle POLICY. Device-free SOURCE arm (runs + hard-REDs on EVERY runner): theme.css mints --corner-k-{squircle:2,soft:1.7,sharp:2.4} (the superellipse-k primitives; squircle == superellipse(2) == n=4) + the SQUIRCLE semantic --corner-shape-{panel,bigdock,dialog,sheet,hero:superellipse(var(--corner-k-squircle))} aliases (the ROUND set card/pill is now STRUCTURAL — the dead --corner-shape-card/-pill `round` no-op knobs were SWEPT at BG.W-DEAD-SWEEP, cards stay round by the CSS `corner-shape:round` default + the CARD-REHOMED clause: glass.css writes no corner-shape on .glass-card/.glass-btn/.btn-pill); the big-dock dock.css site reads `corner-shape: var(--corner-shape-bigdock)` (the bite — NOT a bare squircle keyword) ONLY inside `@supports (corner-shape: superellipse(2))` (no leak onto the un-gated base) over a `border-radius` round fallback; glass.css carries NO corner-shape on .glass-card/.glass-btn/.btn-pill (the AW.W23 inversion RE-HOMED — cards stay round). π render arm (fail-CLOSED when the tests-visual workspace is present; squircle-language.spec.ts): getComputedStyle(...).cornerShape readback === superellipse(2) on the big-dock card shell on a Chrome-139 engine (or the round fallback on a non-supporting engine), a card stays round. Bite: re-hardcode `corner-shape: squircle` on the big-dock → BIGDOCK-READS-TOKEN RED; re-add a squircle to .glass-card → CARD-REHOMED RED; leak the decl outside @supports → SUPPORTS-GATE-INTACT RED; re-mint --corner-shape-card/-pill in ANY form → DEAD-SWEEP NEGATIVE-GUARD RED (a dead-knob resurrection; +3 self-test bites).",
    },
    {
        id: "proof:glass-level",
        cmd: "proof:glass-level",
        tags: ["local", "ci"],
        note: "AX.W54 — the --glass-level SCALAR gate (the level-seam gate). Device-free SOURCE: @property --glass-level threads BOTH ladders at their ONE sites (level=1 byte-identical by construction; the opacity seam → 1, the blur seam → 0 at level:0); the opaque escape (.glass-opaque) + the a11y brackets (prefers-reduced-transparency → 0, prefers-contrast → bounded) ride the ONE level path. The G-1 cohesion arm was folded out into the inventory-complete proof:glass-cohesion (AY.W-GLASS, clean break). Bite: detach a rung from the level seam → RED.",
    },
    {
        id: "proof:glass-cohesion",
        cmd: "proof:glass-cohesion",
        tags: ["local", "ci"],
        note: "AY.W-GLASS — the inventory-complete glass-cohesion gate (SUPERSEDES the 8-file proof:glass-one-model canary, which is REMOVED — clean break). Device-free SOURCE arm: WALKS every component surface that paints a glass plate and asserts each routes a --glass-* tier off the definition-level raw-opaque (background: var(--background|--card)) / literal-blur(<n>px) forbidden set — the legibility allowlist (avatar/label/separator/skeleton/table/data-table/badge) + the dock-shell edge-gleam exemption are the ONLY exempt entries. The Drawer (re-authored onto glass-overlay + the WHC skin), Slider (range routes --glass-blur-quiet, thumb opts into the shared gleam), Notification (glass-floating + ladder shadow), and the specular-opt-in (the moving transition rides the .glass-specular-track::before / :hover/:active scope, NOT the unconditional ::before group — 0 idle keyframes tracks) arms each born-RED at HEAD → GREEN after E1–E6; a self-proving synthetic .glass-x fixture demonstrates the inventory bite every run. The PAINTED render (Drawer/Slider/Notification each a real backdrop-filter blur over a busy backdrop AND each flattening to opaque --card + blur(0) at --glass-level:0) + the idle-track 19→0 DELTA is the π arm (tests-visual/glass-cohesion.spec.ts + the W-GLASS-DELTA capture), never this gate alone. Bite: re-open the opaque Drawer / the Slider literal blur / the glass-wash Notification / the always-on specular transition → RED.",
    },
    {
        id: "proof:substrate-cohesion",
        cmd: "proof:substrate-cohesion",
        tags: ["local"],
        note: "AY.W-COHERE — the SET-LEVEL substrate cohesion gate (the four live substrates AS A SET): G-ACCENT (the blob mood bead C=0.136 inside the comet-anchored warm-red band via the deriveBlobPalette chromaCeiling), G-RECESSION (all FOUR expose the outer-envelope knob; the constellation opacityCeiling BITES — the 0.4-ceiling field paints ≈0.40× the full field's ink, measured by the DARK-ink LUMINANCE DEFICIT not a binary above-threshold COVERAGE count: the recession is an ALPHA effect, so dimmer lattice lines still cross a hairline coverage threshold (~0.93, a false-PASS) while the dark-deficit tracks the alpha faithfully — BD W-CUT reconcile, live-verified darkInkRatio 0.40 on real Metal), G-SHADOW (no 5px-5px stamp; the adaptive --blob-shadow ambient — darkest-cast L 0.780 >= the 0.58 floor). Self-proving. Bite: re-add the stamp / drop the prop / remove the ceiling -> RED",
    },
    {
        id: "proof:component-orphan",
        cmd: "proof:component-orphan",
        tags: ["local", "ci"],
        note: "AY.W-SB1 — the component-orphan institutional gate (route-prune != component-retire): every PUBLISHED custom pkg + flat subpath + root-barrel composable has >=2 non-self consumers OR a docs/consumer-evidence doc. Self-proving. Bite: a 0-consumer publish with no evidence doc -> RED",
    },
    {
        id: "proof:consumer-evidence-live",
        cmd: "proof:consumer-evidence-live",
        tags: ["local", "ci"],
        note: "BH.B4d-evidence-prune-files — the consumer-evidence FORCING gate (kills the write-once-never-read class). Every docs/consumer-evidence/<x>.md is LIVE (a registered scripts/*.mjs gate READS it by path or templated basename) OR an ORPHAN-EXEMPTION (a published custom/ pkg proof:component-orphan keeps via its evidence-doc allowlist — REUSES that gate's own census, DRY) — else DELETE it (no third state). README.md is the policy index, exempt. Self-proving: a synthetic dead-doc name is fed the pure detector each run (must flag). Conservative siblings-absent (in-repo census keeps MORE docs, never wrongly drops a load-bearing one — GREEN-robust on CI). Pruned the dir 60 → 31 at BH.B4d. Bite: a dead evidence doc read by no gate → RED.",
    },
    {
        id: "proof:substrate-staging",
        cmd: "proof:substrate-staging",
        tags: ["local", "ci"],
        note: "AY.W-SB-STAGE — the FD occasional-usage map + the StoryHero read-through seam: G-MAP (declared befitting backgrounds + the liveBackdrop/cardTier seam + StoryBackgroundKind blob) + G-RESTRAINT (forms/feedback/containers declare NONE). Bite: un-declare a substrate bg -> G-MAP reds; declare on a forms row -> G-RESTRAINT reds",
    },
    {
        id: "proof:easter-eggs",
        cmd: "proof:easter-eggs",
        tags: ["local", "ci"],
        note: "AY.W-EGG — the six divined eggs source-witness + per-egg PRM fence (dftFromPoints+F-redraw / konami aurora / cmd+K palette / mascot+404 / eclipse / rail toggle — 21 seams). Self-proving. Bite: drop a seam / unbind mod+k / remove a PRM fence -> RED",
    },
    {
        id: "proof:instrument-scope",
        cmd: "proof:instrument-scope",
        tags: ["local"],
        note: "AY.W-IC1 — the instrument-chassis scope decision executed + machine-locked. Bite: a re-expanded scope -> RED",
    },
    {
        id: "proof:readme-meta-clean",
        cmd: "proof:readme-meta-clean",
        tags: ["local", "ci"],
        note: "AY.W-DOC1 — the README currency gate: the reconciled claims hold (tonemap/architecture/mediums/gate tables; provenance meta stripped; the cite re-grep). Bite: a re-introduced stale claim -> RED",
    },
    {
        id: "proof:convergence-fit-coherent",
        cmd: "proof:convergence-fit-coherent",
        tags: ["local"],
        note: "AY.W-CONVERGE — the per-major-component glass-ui<->slides FIT disposition table is complete + coherent (every major component has a keep/extend/fix verdict feeding L.W-ADOPT). Bite: an undisposed component -> RED",
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
        id: "proof:configurator-glass-atoms",
        cmd: "proof:configurator-glass-atoms",
        tags: ["local", "ci"],
        note: "AX.W38 — the Configurator atoms restyle: the preset chip reads a glass tier (.glass-quiet, not an opaque bg-foreground stamp) + .tap-squish + rounded-pill + focus-ring; the layer trigger + row reset compose the same recipe; the section-reveal animates the fast --spring-snappy register (PRM-gated). Bite: revert a control to the opaque stamp / the slow bezier reveal → RED.",
    },
    {
        id: "proof:aurora-chrome-idiomatic",
        cmd: "proof:aurora-chrome-idiomatic",
        tags: ["local", "ci"],
        note: "AX.W38 — the aurora demo-chrome idiom pass: the AuroraAtomsPanel composes LabeledSelect/LabeledSlider/LabeledField (zero native <select>/<range>), the 7-way medium enum renders one way (LabeledSelect), the short enums stay SegmentedTabs, the Advanced disclosure uses ConfiguratorLayer collapse. Bite: re-inject a native control → RED.",
    },
    {
        id: "proof:aurora-preset-roster",
        cmd: "proof:aurora-preset-roster",
        tags: ["local", "ci"],
        note: "AX.W47 — the aurora preset roster reconcile: VANGOGH (medium:vangogh, strokeOrient:tensor) + OILPASTEL_* + a CRAYON hero are NAMED (Van Gogh / Oil Pastel / Crayon) and baked; the dead strokeMode is dropped; PRESET_META.sub one-sourced off mediumLabel(). Bite: a preset's medium ≠ its label / a dead strokeMode survives → RED.",
    },
    {
        id: "proof:ui-scale",
        cmd: "proof:ui-scale",
        tags: ["local", "ci"],
        note: "AX.W51 — the comfortable library-wide --ui-scale axis (the D18 umbrella; W45/W50 specialize): --ui-scale minted + threaded so components size comfortably; --dock-scale reconciled onto the one --ui-scale axis. SEPARATE from --glass-level (opacity+blur) + --glass-tint-* (legibility). Bite: a component sizing off a hardcoded literal instead of --ui-scale → RED.",
    },
    {
        id: "proof:touch-target",
        cmd: "proof:touch-target",
        tags: ["local"],
        note: "AY.W-SCALE2 — the REAL touch-target runtime gate (the phantom made real): every sub-44 form atom (Switch/Checkbox/Radio/Slider-thumb/TagsInput-delete/MultiSelect-X) paints a composited hit-rect >=44x44 under pointer:coarse via the ONE touch-hit-area utility; fine-pointer non-regression. Fail-CLOSED with device; befitting-SKIP zero-device. Bite: revert a compose -> 16x16 REDs. BB.W-CI-GREEN re-tag (#18): a detected-Playwright :5199 live-π gate cannot run in headless ci — re-tagged ['local'] per the cardinal-lesson architecture (proof:gate-manifest-sound clause-4 detected-Playwright exemption); the live π + the open Switch sub-44 hit-rect source defect rerun under W-VISUAL-RUNNER (Batch 1).",
    },
    {
        id: "proof:webkit-backdrop",
        cmd: "proof:webkit-backdrop",
        tags: ["local", "ci", "release"],
        note: "AY.W-A11Y-PERF O-2 — the build-DIFF gate over the SHIPPED dist (AFTER npm run build): every unprefixed backdrop-filter is webkit-paired same-value (count parity 16/16) + glass.css carries both @supports guards (no-blur fallback + the Safari-17 webkit-only trap). Bite: remove the vite.style-assets injection -> parity breaks",
    },
    {
        id: "proof:nested-backdrop-budget",
        cmd: "proof:nested-backdrop-budget",
        tags: ["local", "ci"],
        note: "AY.W-A11Y-PERF G4 — the first per-frame ceiling gate: the glass-Button-in-Card-in-Dialog stack asserts nested backdrop-filter depth <=4 + contain:paint present + median frame <=16.7ms (measured p50 8.3ms). Bite: revert a contain:paint -> RED",
    },
    {
        id: "proof:dropdown-type-scale",
        cmd: "proof:dropdown-type-scale",
        tags: ["local", "ci"],
        note: "AX.W50 — the uniform dropdown/select/menu type-scale (D17): the dropdown/select/menu item type sizes read ONE unified scale token, not per-component literals. Bite: a divergent menu type size → RED.",
    },
    {
        id: "proof:forced-colors-skin",
        cmd: "proof:forced-colors-skin",
        tags: ["local", "ci"],
        note: "AX.W36 — the forced-colors (Windows High Contrast) glass-language skin: a @media (forced-colors: active) block maps the glass surfaces to system color keywords coherently, riding the W54 --glass-level:0 opaque path (ONE opaque path, no parallel fork). Bite: a glass surface with no forced-colors mapping / a parallel forced-colors recipe → RED.",
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
        note: "AX.W55 — the adaptive-over-light glass legibility gate (the SEPARATE --glass-tint-* axis paired with W54's --glass-level). Asserts the over-light tint hook lifts --glass-tint-strength adaptively so the MAXIMAL glass default reads legible over a light substrate (the G2 over-light surface, incl. the dock); zero new compositing seam. REBASELINED at BA.W-DARK-MATERIAL scope 7: the content-tier self-engage witnesses now assert the recalibrated shape (the unconditional content tiers read --glass-tint-strength-floor, the muted lift gates on the bright bucket — the calm-light gray-slab fix), NOT the prior unconditional full-AA darken. Bite: detach the adaptive tint hook / drop the over-light darken / re-introduce the unconditional full-AA content-tier darken → RED.",
    },
    {
        id: "proof:dark-material",
        cmd: "proof:dark-material",
        tags: ["local", "ci"],
        note: "BA.W-DARK-MATERIAL — the luminous-dark transmissive-material gate (born-RED, H1 arm-a). Device-free SOURCE arm (the PAINTED DARK truth is the π arm tests-visual/dark-material.spec.ts): the dark elevation ladder widened in LOCKSTEP (dark-arm.css + light-dark.css — the page↔card gap card/page relL ≥ 3.5× off the HEAD 4-L collapse, the composited wash→overlay band spans ≥ 1.8×); the dark glass is TRANSMISSIVE (the backdrop-filter saturate/brightness luminosity lift + the dark edge α ≥ 0.16 silhouette, radius UNTOUCHED — W-GLASS-CAL owns it); the dark --glass-tint-* seam LIFTS (a gentle bounded dark-arm strength, the SAME seam — no third fork, the --surface-tint-* in-srgb fence held); dark --primary is CHROMATIC (the legendre-violet house hue, oklab chroma 0.134, --primary-foreground clears 4.5:1); the --surface-tint-* dark arm reads on the deep floor (mixes toward a light ink); the contrast-color() selection inversion is FIXED at the library seam (every --muted-foreground→white lift paired with a --foreground lift — selected ≥ unselected); and the calm-light self-engage is RECALIBRATED (the content tiers read --glass-tint-strength-floor, the full AA gates on the bright bucket — the R9-1 slides gray-slab fix). Bite: revert any dark value / drop the transmissive lift / un-pair the contrast-color lift / restore the unconditional full-AA content-tier darken → RED.",
    },
    {
        id: "proof:surface-axis",
        cmd: "proof:surface-axis",
        tags: ["local", "ci"],
        note: "BA.W-SURFACE-AXIS — the ONE shared {glass·veil·opaque} surface-decoration axis gate (born-RED; IG-B1/GVC-3/FD-4 — the house had the MATERIAL (--glass-level + --glass-tint-* + veil-surface) but THREE surface-axis dialects (Card's full axis, Dialog's binary string, everyone else none)). Device-free SOURCE arm (the PAINTED truth is the π arm tests-visual/surface-axis.spec.ts + the W-SURFACE-AXIS-DELTA capture — each rung translucent-where-glass/solid-where-opaque/frosted-where-veil over the busy backdrop, BOTH modes, over the W-DARK-MATERIAL-corrected dark register): W1 the axis is factored ONCE — the [data-surface=veil|opaque] decoration rules in EXACTLY one seam (src/styles/glass/surface-axis.css) over a base tier (veil reads the shared --glass-bg-quiet + --glass-tint-* ladder, opaque sets --glass-level:0), the Surface union + surfaceClass resolver in EXACTLY one helper (_shared/useSurfaceAxis.ts), AND the anti-evasion bite: ZERO second {glass·veil·opaque} decoration block outside the seam (a consumer wave forking its own axis fails — the DAG §5 second-axis prohibition machine-locked); W2 Surface + surfaceClass published (re-exported from _shared/index.ts, Surface on src/api/index.ts); W3 every one of the nine enrolled surfaces (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/ExpandableContainer/Skeleton) threads the axis (a surfaceClass(…) call or data-surface binding), ExpandableContainer's fullscreen is un-walled (glass-overlay NOT bg-background), Skeleton carries the --skeleton-glass-bg over-glass register; W4 the clean break — DialogContent carries NO binary variant?:'glass'|'opaque' prop AND a surface prop present AND the MIGRATION.md row (no alias, BA inv-7); W5 the control REST tier unified (scope 7 — the --control-surface-* register declared once, .input-pill reads var(--control-surface-bg), the Select default off the glass-wash gray fork — the no-gray control-family seam); W6 the .paper-ink-mark MARK register (scope 8 — the 2px --foreground ink hairline, ≥2 consumers: the math-paper section rail + the W-TABS underline). Bite: fork a second surface axis / re-alias Dialog variant / re-introduce the glass-wash select fork / drop a surface's axis thread → RED.",
    },
    {
        id: "proof:menu-glass",
        cmd: "proof:menu-glass",
        tags: ["local", "ci"],
        note: "BA.W-MENU-GLASS — the glass MENU-ROW + MENU-SECTION register minted on the shared menuItemVariants CVA (born-RED 10/4 -> GREEN; IG-A2/R5-10/DC-EXT-5; the slides DeckSettings hand-built ~120 lines bypassing the CVA). W1 glass-register + element-level oklab-tint hover/highlight + the base flat-fill dropped (accent the explicit escape); W2 the .glass-menu-section mono-caption + --border-hairline recipe; W3 44px floor + >=2 consumers; W4 SelectTrigger font-rung (size display/audacious writes --dropdown-text + --text-dropdown, the trigger+items at ONE scale). The BINDING painted truth is tests-visual/menu-glass.spec.ts + the proof:ba-gestalt menu verdict. Bite: re-introduce a flat bg-accent base hover, drop the section recipe, or desync the trigger/item font scale -> RED.",
    },
    {
        id: "proof:drawer-abrogate",
        cmd: "proof:drawer-abrogate",
        tags: ["local", "ci"],
        note: "BB.W-DRAWER-ABROGATE — the Drawer family re-built on reka DialogRoot + a house SpringProgress snap engine, vaul-vue ABROGATED (born-RED 21 violations → GREEN). vaul-vue@0.4.1 hard-runtime-dep'd @vueuse/core ^10.8.0 — the LONE non-cascade dual against the constellation's 14.3.0 spine. Device-free SOURCE arm (the PAINTED truth is the π arm tests-visual/drawer-* + the W-DRAWER-ABROGATE-DELTA capture, captured at W-REFLECT3 per BA inv-4): W1 NO vaul-vue import survives anywhere in src/**+demo/** AND zero package.json rows (the bite greps the package NAME across all drawer SFCs + the two demo consumers + package.json — a re-introduction in a NEW file reds); W2 the family composes reka — Drawer→DialogRoot, Content→DialogPortal+DialogContent, Overlay→DialogOverlay, index→reka Dialog* house wrappers; W3 the snap settle is ONE new SpringProgress(...).play(...) on the DRAWER_SNAP (response, ζ) register (the drawer's OWN clock — NOT a DOCK_SPRING re-use, the per-spring-clock §6 doctrine) + NO cubic-bezier(.32,.72,0,1) vaul-curve fingerprint + NO setInterval snap loop; W4 mode='live-behind' → reka :modal='false' (no focus trap, no page aria-hidden/inert); W5 the direction ladder is native (BB-2 fold — resolveDefaultSnapPoints READS direction: bottom/top → [0.12,0.5,1], left/right → full-slide; retires the Atlas :snap-points=[] workaround); W6 the LOOK keys re-pointed [data-vaul-*]→[data-glass-drawer-*] (zero vaul keys in drawer.css) + the EMIT↔READ pair holds. The @vueuse-10-dual-gone confirmation rides proof:constellation-spine's clause. Self-test bite (--self-test). Bite: re-add a vaul-vue import or package row, re-introduce the cubic-bezier(.32,.72,0,1) snap transition, import DOCK_SPRING into the drawer, or break the [data-glass-drawer-*] emit↔read pair → RED.",
    },
    {
        id: "proof:card-padding",
        cmd: "proof:card-padding",
        tags: ["local", "ci", "release"],
        note: "BB.W-CARD-PAD — the GOLDEN sqrt-φ/φ card + overlay padding ladder (born-RED→GREEN). At HEAD every Card section was a uniform p-(--card-spacing)=24px on ALL sides (axis ratio 1:1, NO golden relationship) + the header→content gap was a 48px DOUBLE-pad artifact (header pb24 + content pt24) — the heading HUGGED the top because top pad == side pad. The fix lifts the BLOCK axis by sqrt-φ (1.272) over the preserved INLINE anchor (--card-pad-inline = --spacing(6), sm --spacing(4)) so the heading clears the top by ~30.5px against a 24px side; the footer steps by φ (1.618), the intra-header gap tightens by φ² (2.618). CLEAN BREAK: --card-spacing GONE, no alias. C1 the 5-token ladder on Card.vue with the LITERAL 1.272/1.618/2.618 constants IN the calc chains (a flat resolved-rem rebake REDS — the C7 self-test bite); C2 ZERO --card-spacing survives in src/ (clean-break grep, comment-stripped); C3 the Card family consumes the inline-vs-block AXIS SPLIT (Header px-inline+pt-block+pb-0; Content px-inline+pt-section-gap+pb-block; Footer px-inline+pt-footer+pb-block — a uniform p-(--card-pad-*) on any member REDS); C4 no ad-hoc p-N on the enrolled /display/card cards off the card-padding-roster.md allowlist (the scroll-shrink Card-root p-0 + two tight-pane scroll cards p-4 recorded); C5 [arm 2] Dialog/Sheet/Popover/HoverCard/Toast each mint --overlay-pad-inline + --overlay-pad-block (block=inline×1.272) + apply px-(--overlay-pad-inline) py-(--overlay-pad-block) — born-RED until the overlay band merges; C5b --panel-padding-roomy DELETED from the token tree (the dead orphan); C6 ≥2 referencing sites per new token (mint site + read site — a derived rung is load-bearing, declared AND consumed, not a dead orphan); C7 the self-test bite (re-hardcode/re-card-spacing/uniform-pad/ad-hoc-pad each RED their clause through the pure detector). The BINDING painted truth is tests-visual/card-padding.spec.ts (the heading clears the top edge, the top:side ratio ≈ sqrt-φ, the interior gap ≈ section-gap NOT 48px, both modes). Bite: rebake the golden ratio to a flat rem, re-introduce --card-spacing, uniform-pad a Card member, or smuggle an ad-hoc p-N onto an enrolled demo card → RED.",
    },
    {
        id: "proof:dock-morph-family",
        cmd: "proof:dock-morph-family",
        tags: ["local", "ci", "release"],
        note: "BB.W-DOCK-MORPH-FAMILY — the dock-morph REPAIR family (compositor transform + synchronous PRM seat + peak self-reserve + @property scale thread + vertical chrome un-gate; the AZ substrate the BA in-situ wave consumed carried six mechanism defects a-f). Device-free SOURCE arm F1-F6 (the BINDING visual truth is the pi readback tests-visual/dock-morph-family.spec.ts + W-DOCK-MORPH-FAMILY-DELTA.md — the CDP Layout-flat trace, the complete-at-every-frame series, the PRM synchronous-seat before/after against the 10x74 sliver ground, the peak-reserve readback, the scope-scale paint, the VERTICAL chrome-interp frame-series + the PRM vertical block-axis seat, BOTH modes — PLUS the proof:ba-gestalt dock verdict, BB inv-4). F1 the morph animates a COMPOSITOR transform (scale() over a reserved settled to-footprint) NOT a layout property off the live scalar (the per-frame relayout GONE not supplemented); F2 the reveal seats at the settled footprint (asserted via F1 reserve + the pi frame-series); F3 the PRM path seats SYNCHRONOUSLY (dockMorphContext.onSwap + useLayerTransition carry a prefersReducedMotion branch that seats via nextTick post-flush NOT an rAF morph window, composing the BA-VJS-1 nested max-content ordering); F4 DockLayerGroup self-reserves its peak-layer block-size (a MEASURED scrollHeight peak across .dock-layer-item-host panes as min-block-size on the GROUP root, --dock-layer-peak-block-size read-only, re-measured on useResizeObserver — a literal guess REDs); F5 --dock-local-scale threads via inheriting @property (@property --dock-scale + --dock-local-scale, inherits:true default 1 byte-identical at default scale); F6 the VERTICAL collapse-expand chrome interpolates on --dock-expand-t (the derivation orientation-agnostic, a parallel .vertical bg/border interp, padding-inline PINNED + padding-block MORPHING the axis-inverse, the .vertical.shape-card radius arm, the stale ALWAYS-EXPANDED comment GONE, NO re-added transition:padding/background/border-color second-clock, the BB-4 slot transition on --dock-morph-t) + a self-test bite. DOCK_SPRING byte-untouched (none is a clock defect). Born-RED at HEAD (20 violations all 6 clauses), GREEN at close. The pi half is LOCAL-ONLY (real-GPU/CDP dev-box, the AY W-LIVE1 split), backstopped on CI by proof:live-verified-ledger. Bite: keep inline-size:var(--dock-morph-size) -> F1 RED; drop the PRM nextTick seat -> F3 RED; hardcode a min-block-size literal -> F4 RED; drop the @property inherits:true -> F5 RED; leave a :not(.vertical) on a derivation arm / morph padding-inline / re-add a second-clock transition -> F6 RED.",
    },
    {
        id: "proof:on-glass-fg",
        cmd: "proof:on-glass-fg",
        tags: ["local", "ci"],
        note: "BB.W-ON-GLASS-FG (N13) — the surface-aware FOREGROUND register gate (born-RED). Device-free SOURCE arm (the painted AA-over-the-composited-plate truth is the π arm tests-visual/on-glass-fg.spec.ts): the glass-first MAXIMAL default makes a caption/well/track over a TRANSLUCENT content-tier glass plate the common case, where the canvas-calibrated --muted-foreground (= --neutral-5, 'AA vs page') COLLAPSED on its own surface (1.15-3.29:1 measured in dark theme). Four witnesses — W1 the three rungs (--on-glass-muted + -strong, --input-on-glass, --progress-track-on-glass) exist ONCE per mode arm (≤2 declarations, no fork); W2 each rung is DERIVED against the library composite, warm-hued (the BA.W-NO-GRAY OKLab floor at the warm hue), NOT a verbatim slides deck.css literal, + the page-muted KEEP fence (--muted-foreground/-strong stay var(--neutral-5)/var(--neutral-6)); W3 the calm-light content tiers re-point --muted-foreground → --on-glass-muted BESIDE the BA adaptive seam (the THIRD state) AND the @container bright-bucket lift + the overlay-band unconditional lift are byte-UNTOUCHED (the frozen W-DARK-MATERIAL bound — the calm re-point never re-declares --glass-tint-ink/-strength-*); W4 the Input/Textarea wells read --input-on-glass, the Progress default/gradient track reads --progress-track-on-glass, CLAUDE.md + MIGRATION.md carry the canon + the consumer-interim-deletion note. Bite (7 self-test): a 3rd rung declaration (fork) / a deck-literal copy / a non-warm hue / a dropped calm re-point / a seam-token re-declare inside the re-point / an edited bright-bucket lift / a track-revert-to-secondary each RED their clause; the good corpus stays green.",
    },
    {
        id: "proof:aurora-swraster",
        cmd: "proof:aurora-swraster",
        tags: ["local", "ci"],
        note: "BB.W-AURORA-SWRASTER — the headless-safe aurora guard + the luminance-faithful fallback (born-RED→GREEN). At HEAD the aurora WEDGED under a software rasterizer when a consumer pinned mode:\"webgl\"/\"capture\": the software-raster signal was gated on \"auto\" ONLY (renderMode.ts:86 — the forced arm bypassed isSoftwareWebGLRenderer), the runtime armed the live GL2 surface un-probed (runtime.ts), and the CSS placeholder was a FLAT linear-gradient(135deg) band (paletteToCssGradient) whose mean+spatial luminance diverge from the shader's nuclei-field composite — so a headless contrast capture certified the WRONG floor. W1 the software-raster signal is UNIVERSAL: resolveRenderMode runs isSoftwareWebGLRenderer() for ANY WebGL-arming mode (gated `mode !== \"css\"`) BEFORE the `if (mode !== \"auto\") return mode;` short-circuit, with the forceWebGLUnderSoftwareRaster escape (default FALSE — the safe default; a `?? true` default or guard-in-auto-tail REDs the self-test) + the capable pass-through preserved. W2 the runtime wedge catch reuses the SHARED isSoftwareWebGLRenderer predicate (no second probe context — proof:webgl-substrate-single held), computes `wedgeBlocked = !forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer()`, returns the inert handle on the blocked arm (createWebGLCanvas never called), and PRESERVES the onInitError contract (a blanket error-swallow REDs). W3 the fallback ground (auroraFallbackGround.ts) is FIELD-derived (reads config.nuclei + softmaxBeta via nucleiFieldStatic) + reuses the value.js oklchToLinear core (a forked OKLCh bake REDs) + closes its CPU luminance with the SAME linearToSrgb OETF + the PBR-Neutral tonemap, and Aurora.vue threads it into the placeholder under the \"css\" substrate (the flat gradient stays the capable first-frame). The GL-shader fence held (aurora.frag/tonemap.glsl byte-untouched — the tonemap+OETF are MIRRORED CPU-side). The BINDING painted truth is tests-visual/aurora-swraster.spec.ts (the headless mean + per-quadrant luminance within the certify band — faithful Δmean 0.0010/maxQuadΔ 0.0026 vs the flat gradient's 0.1328 — + the SwiftShader no-hang, both modes, NO --use-gl=angle dependency). Bite: an escape defaulting true, the guard buried in the \"auto\" tail, a blanket init-error swallow, a flat-palette-only re-skin (no nuclei read), or a forked OKLCh matrix → RED.",
    },
    {
        id: "proof:phase-palette",
        cmd: "proof:phase-palette",
        tags: ["local", "ci"],
        note: "BB.W-PHASE-PALETTE (N18) — the chassis `complete`-phase ink is a CONSUMER token, not a hardcoded brand metal (born-RED 9 violations at HEAD → GREEN; the W4 CLAUDE.md witness greens on the orchestrator's CLAUDE.md note merge — the W-CARD-PAD/W-ON-GLASS-FG precedent). Device-free SOURCE arm + a synthetic self-test bite (the W1 no-leak negative predicate has teeth — a gold-in-arm is flagged, a fully-demoted arm passes); the BINDING painted truth is the π readback tests-visual/phase-palette.spec.ts + the W-PHASE-PALETTE-DELTA + the proof:ba-gestalt chassis/data-band verdict (W-REFLECT3). W1 the .instrument-chassis[data-phase=complete] arm sets --phase-color: var(--phase-complete-color) + --phase-color-label: var(--phase-complete-color-label) AND carries NO var(--color-gold) directly (the no-leak floor — the bus carries the consumer token, not the ink). W2 --phase-complete-color / --phase-complete-color-label default to var(--color-gold) / var(--color-gold-dark, var(--color-gold)) at the .instrument-chassis root (the back-compat gold floor; the mode-resolved tokens inherit the same .dark/light-dark resolution the hardcoded form did). W3 the WCAG twin pairs 1:1 (both demote or neither). W4 the canon recorded (CLAUDE.md phase-canon + design-idioms chassis row) + the silver structure-twin comments name the warm-gold DEFAULT + the silver/structure SOURCE byte-untouched (the W-NO-GRAY sanctioned exception — comment narration only). CLAUDE.md/design-idioms read RAW (no comment-strip on markdown). Bite: re-add var(--color-gold) inside the complete arm / drop the consumer-token default / drop the WCAG twin / re-point a silver token → RED.",
    },
    {
        id: "proof:button-glass",
        cmd: "proof:button-glass",
        tags: ["local", "ci", "release"],
        note: "BB.W-BUTTON-GLASS — the lit glass button stays legible, springs under the press, and tracks the gleam (born-RED 12 violations @ HEAD → GREEN). The button register minted every iOS-27 liquid-glass token but COMPOSED almost none on the LIT surface, and its two best mechanisms (the W55 adaptive-darken + the moving specular) no-op'd the moment the pointer landed. §0 RE-GROUND DRIFT (recorded): the spec's named deps W-LENSING (useSpecularPointer + .glass-lens/--press-t) + W-LIQUIDHOVER (the tier-root auto-arm) did NOT land at HEAD; this wave CONSUMES the ACTUAL HEAD axes — useSpecularTracking (AX.W09, the ONE position leaf) + .glass-refract (AW.W23, the #glass-refract SVG filter) — the documented auto-arm-not-landed branch, NEVER a fork. B1 the glass-variant hover/active fills (default/glass/primary-audacious) re-point off the RAW --glass-bg-resting/-floating rung tokens onto the element-level oklab-tinted --glass-bg-*-tinted pair surfaces.css mints as `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` (BOTH tint vars — a tint-FREE oklab swap REDs), so the bright-bucket darken + the floor reach the lit fill (the substitution-vs-inheritance trap closed; the :root raw tokens UNTOUCHED). B2 Button.vue composes useSpringPress (response 0.25) driving useLiquidFlex (the reciprocal X/Y squish, .stretch consumed, maxStretch ≤1.08 LOW cap), the CSS `.tap-squish active:scale-(--scale-press-btn)` floor RETAINED (no-JS path), the --glass-btn-press-t typed @property the ONE drive (a useSpringPress-only scale / an uncapped taffy-pull / a removed CSS floor REDs). B3 the gleam consumes the SHARED useSpecularTracking leaf (imported + @pointermove bound) with NO button-local --mouse-x/--mouse-y fork (the DRY single-source). B4 the refraction edge is the `:liquid` → .glass-refract opt-in CONSUMING the existing axis, the press swell on --glass-btn-press-t (NOT a per-frame displacement re-rasterize), the un-gated `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` base preserved as the off-Chromium floor, no button-local feDisplacementMap fork. B5 the calm-CTA fence HOLDS — ZERO ✦/btn-audacious/sparkle-sweep/btn-gold-bg-sweep/--ripple-radius/disco-grain on any button variant or the new recipe; SELF-TEST BITE injects a btn-audacious/✦ revival and asserts B5 REDs (the fence has teeth). Coordinate-only with proof:glass-cohesion (Button stays on its STATE-contrast allowlist, un-edited). The BINDING painted truth is tests-visual/button-glass.spec.ts (the lit-button AA over the synthetic-white bright-bucket plate, the press reciprocal-deform + the --glass-btn-press-t beat, the gleam off the centred 50%, the off-Chromium blur degrade-floor, 0 ✦/btn-audacious, both modes — LOCAL-ONLY real-GPU/CDP, backstopped by proof:live-verified-ledger; the live capture rides W-REFLECT3) + the proof:ba-gestalt glass/CTA verdict. Bite: a raw-token hover/active fill, a tint-FREE oklab swap, a useSpringPress-only scale, an uncapped squish, a removed CSS floor, a button-local --mouse-x/y or feDisplacementMap fork, or a disco revival → RED.",
    },
    {
        id: "proof:control-tokens",
        cmd: "proof:control-tokens",
        tags: ["local", "ci"],
        note: "BB.W-CONTROL-TOKENS — the P2 control-token refinement cluster (born-RED 15 violations @ HEAD 6840a643 → GREEN; speedtest AW v2.1 P2 consume). Device-free SOURCE arm (the comment-strip + pure-detector house pattern, mirrors proof-menu-glass.mjs) + a --self-test bite (8 mutations RED their clause; good corpus clean). The seam: a control a consumer must reach is exposed as a token/prop/published primitive, never an internal a :deep() overrides (Design Axis 2). W1 the toggleVariants `card` arm leads with rounded-card (the p-8 glass-card tile paints 1rem --radius-card, NOT the inherited 10px --radius-button — N11; a stray rounded-button survivor on the card arm OR a wholesale base swap that broke default/outline REDS). W2 the single-select radio semantics threaded on the ONE wrapper (no fork): ToggleGroup.vue routes role=radiogroup GATED on type===single via :role over `as-child` (reka hardcodes role=group on its inner Primitive + its Slot merges child.props OVER $attrs, so a fall-through :role LOSES — the as-child child's explicit role is the override seam, verified @vue/test-utils); ToggleGroupItem.vue injects reka's injectToggleGroupRootContext(null) reading isSingle + the live modelValue, binds role=radio + aria-checked (the live selection, a static literal REDS) + suppresses reka's aria-pressed (invalid on role=radio per axe aria-allowed-attr); the multiple arm keeps reka's role=group/aria-pressed untouched. W3 MetricRow exposes --metric-row-label-align (default left) + --metric-row-icon-color (default inherit; phaseColor seeds it inline for byte-identical back-compat) — both read text-align/color: var(--token, fallback) (a bare var() with no fallback REDS — back-compat erase) + both declared in tokens/scale-paper.css §17 METRIC. W4 the a11y pair: Toaster.vue marks the ToastViewport aria-live=polite (reka carries role=region ONLY — confirmed) + a published <FocusScope> (focus-scope/{FocusScope.vue,index.ts} COMPOSING reka's FocusScope, the /focus-scope subpath, the ui-barrel re-export — a hand-rolled trap REDS, the substrate-single discipline). W5 the no-:deep-needed predicate machine-locked (the tokens read WITH a fallback so a consumer :root/per-row override cascades into the internal; the canonical demo consumer needs no :deep(.metric-row__*) — the precept-2 bar, the wave's reason for being). The BINDING painted truth is tests-visual/control-tokens.spec.ts (the rendered --radius-card corner, role/aria-checked per-type, the consumer label-align cascading in NO-:deep, the Toaster aria-live, both modes × 2 viewports — auto-enrolled in --run pi, the live capture rides W-REFLECT3) + the proof:ba-gestalt chooser-tile/metric-ledger/toast verdict. speedtest AW.W7 R-CONSUME (^4.1.0 + consume-and-delete) is the foreign-tree successor. FocusScope 2nd-consumer booked (the dialog/survey focus-trap by-construction; the a11y-pair completion the documented exception). Bite: drop rounded-card / re-add rounded-button to the card arm / a static aria-checked / drop the aria-pressed suppression / a bare token without fallback / strip the Toaster aria-live / a hand-rolled FocusScope / a consumer :deep(.metric-row__label) → RED.",
    },
    {
        id: "proof:paper",
        cmd: "proof:paper",
        tags: ["local", "ci"],
        note: "BG.W-PAPER-TEXTURE-UNIFY — the ONE warm raster tooth PRIMARY (C≥0.02 at SOURCE); feTurbulence DEMOTED to the @supports-gated relief; feDiffuseLighting RETIRED (born-RED at HEAD → GREEN; device-free SOURCE gate + an 8-bite --self-test). THE DEFECT (KS-PAPER §1.1): the paper tooth was a grey feTurbulence + feColorMatrix saturate=0 speckle whose warmth was BORROWED from the substrate below (multiply); when the universal warm plane retired the tooth desaturated below the C 0.02 warm floor and read metallic-gray — the SVG-noise path the user rejected TWICE (\"disgusting metallic\"), recurred a third time at D-2; feDiffuseLighting is structurally sheen-prone (specular IS the metal). SIX device-free arms (necessary-not-sufficient; the BINDING truth is the live π + the proof:ba-gestalt paper-band verdict): A paper-texture-single — --paper-grain-tooth is the ONE tooth source, the two paper.css utilities + cards.css .paper-texture read it, cards MIGRATED off the grey --paper-clean-texture (the disjoint glass-grain name); B warm FLOOR at SOURCE — every oklch() tooth stop carries C ≥ 0.020 + a warm hue H ∈ [40,110], ≥3 distinct warm stops (a weave, not a flat wash), mean C ≥ 0.020; C feTurbulence DEMOTED — the primary tooth value carries NO feTurbulence + NO lighting primitive, any feTurbulence in paper.css lives ONLY inside an @supports block, feDiffuse/SpecularLighting ABSENT wholesale; D the blend LAW — multiply (light) + a .dark screen arm, NEVER overlay/soft-light (identity on the cream/ink poles); E the anti-pop layering — both utilities layer var(--paper-grain-relief), var(--paper-grain-tooth) (two always-present layers) + --paper-grain-relief defaults none at :root, re-defined INSIDE the @supports block (image never none → image); F the register fence — paper.css NEVER writes --glass-grain-opacity (0.025/0.045, the calm glass whisper is BYTE-UNTOUCHED). Bite: a feTurbulence/lighting primary / a below-floor-chroma or yellow-green tooth stop / an overlay blend / cards reading --paper-clean-texture / a stray always-on feTurbulence / a glass-whisper write / a relief-dropped single-layer utility → RED. The paint judge owns the no-double-warm CEILING + the no-squint std floor + the no-metallic gestalt (paintClass P, rides W-REFLECT).",
    },
    {
        id: "proof:paper-grid",
        cmd: "proof:paper-grid",
        tags: ["local", "ci"],
        note: "BB.W-PAPER-GRID-TEXTURE — the geometric paper-cascade peer + the .paper-grid card-interior register + the additive <Card grid> axis (born-RED 12 violations at HEAD → GREEN, 7 self-test bites). The paper-cascade shipped the ORGANIC turbulence register end-to-end (--paper-clean-texture/--paper-aged-texture + .paper-texture/paper-grain-overlay) but never the GEOMETRIC one — the math/grid brand pillar lived only as the demo-private page-substrate .story-bg-grid an opaque card plate occludes (the dense surfaces contributed 0.0000). FOUR device-free SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring proof-shadow-contract.mjs): W1 the --paper-grid-texture + --paper-grid-texture-size + --paper-grid-opacity peers in scale-paper.css's :root, the texture two-FREQUENCY (a --paper-grid-line minor + --paper-grid-line-major 4×-major rule, not a uniform single line), the ink BITE (a color-mix(... var(--foreground) ...) form, NOT a hardcoded hsl()/oklch()/rgb()/hex — the no-gray/token-first floor); W2 the .paper-grid utility consumes var(--paper-grid-texture) + a PLAIN-ancestor .dark .paper-grid arm (the dark-arm BITE reds a scoped :global(.dark) — the recurring scoped-global-drop trap); W3 the @media (prefers-reduced-transparency: reduce) guard reaches .paper-grid (the paper.css idiom, brace-balanced match); W4 Card threads grid?: boolean default OFF composing 'paper-grid' + :data-grid (the no-regression BITE reds a default-ON, the additive BITE reds a removed grain axis). The seam recorded: the grid rides the HOST background-image (a glass tier already claims ::before specular + ::after grain — a .paper-grid::after would CLOBBER grain), so grain+specular+grid compose. The BINDING painted truth is the π readback tests-visual/paper-grid.spec.ts (grid reads THROUGH ≥JND vs bare 0.0000, both modes, static raster) + the proof:ba-gestalt foundations/display verdict. Bite: drop a peer / use a uniform single-line grid / hardcode the ink hsl() / use a scoped :global(.dark) dark arm / drop the a11y guard / default the grid prop ON / remove the grain axis → RED.",
    },
    {
        id: "proof:display-tracking",
        cmd: "proof:display-tracking",
        tags: ["local", "ci", "release"],
        note: "BB.W-DISPLAY-TRACKING — the √φ display ladder gains a DISPLAY-ONLY proportional negative tracking rung + the Apple-tight ~1.05 leading (born-RED → GREEN; device-free SOURCE arm). The deep-SOTA audit (findings.md:10,37): Apple display type carries −1.5%-of-size tracking (80px→−1.2px) + 84/80≈1.05 leading. T1 --type-tracking-display is a NEGATIVE em in the Apple −1.5% band (−0.010em..−0.020em) read by ALL 8 display @utilities (NOT the shared --type-tracking-tight); T2 --type-leading-display in the 1.04–1.06 band, strictly < HEAD 1.1, read by all 8; T3 the body/caption register (body{}+text-prose/body/small/caption/micro/admin-label) does NOT read the display rung; T4 the heading/title/subheading register does NOT read it; T5 --type-tracking-tight unchanged (-0.025em) + its non-display consumers (text-title/configurator.css/typography/utilities.css/MetricRow.vue) still read it; T6 text-hero poster register byte-untouched (its own --text-hero-leading 0.84/-tracking -0.03em, reads no ladder rung); + the --tracking-display bridge + the pi-spec-wired witness. The π readback (local-only, tests-visual/display-tracking.spec.ts) binds the resolved render: each display rung's getComputedStyle letterSpacing ≈ −1.5%-of-fontSize + lineHeight ~1.05, both modes; the fences hold in the render. Bite: re-point one display @utility back onto --type-tracking-tight / alias --type-tracking-display to the −2.5% shared rung (out of band) / leave the leading at 1.1 / mutate --type-tracking-tight (the substitution-trap bleed) → RED.",
    },
    {
        id: "proof:external-payload",
        cmd: "proof:external-payload",
        tags: ["local", "ci", "release"],
        note: "BH.B1-W1 — the payload-contract gate (born-RED 3 violations → GREEN). Device-free SOURCE gate (reads vite.library.ts + package.json + the src/ import graph; NO build): E1 every peer src JS-imports is in libraryExternal (no BUNDLED peer — the @lucide/vue double-load bug, 39 imports); E2 every libraryExternal entry is a declared peerDependency (no DEAD string — lucide-vue-next renamed @ v1.0, vaul-vue abrogated @ BB.W-DRAWER-ABROGATE). tailwindcss/tw-animate-css are CSS-only peers (E1 does not demand them); perfect-freehand is VENDORED (no leak). + a 3-bite self-test proven every run. The BUILD-side mirror (dist carries no createLucideIcon-* chunk; bundle shrinks downward) is profile:budget's re-baselined arm. Bite: drop @lucide/vue from external / re-add a dead string → RED.",
    },
    {
        id: "proof:drag-morph",
        cmd: "proof:drag-morph",
        tags: ["local", "ci", "release"],
        note: "BB.W-DRAG-MORPH — the pull/drag-to-morph-squish primitive gate (born-RED at HEAD, driven GREEN). Device-free SOURCE arm (D1-D5; the PAINTED truth is the π readback tests-visual/drag-morph.spec.ts + the W-DRAG-MORPH-DELTA capture — the drag frame-series follow~1:1/velocity-squish/fling-to-nearest, the flick-vs-slow snap decision, the PRM no-squish/instant-snap, the keyboard roving, BOTH modes; LOCAL-ONLY, backstopped on CI by proof:live-verified-ledger, rides W-REFLECT3): D1 useDragMorph.ts composes the UNCONSUMED kf Draggable/drag + SpringProgress + useLiquidFlex and owns NO second pointer-velocity sampler / rAF spring integrator (the load-bearing REUSE — wired substrate, not a re-fork; the hand-rolled-velocity/rAF anti-evasion bite), D2 the squish drives useLiquidFlex squishLaw:\"tanh\" via drive() off the live drag position (NOT the click squish(frac) linear path) capped at the live --tab-indicator-max-stretch getter (a hardcoded cap > 1.08 REDs — the anti-taffy-pull fence), D3 the release flings to the NEAREST slot via the NATIVE kf snap (kf 5.1.0 `DragOptions.snap`, wired as `snap: snapTargets.map(t => t.center)` in the `new Draggable({…})` construction — the engine projects decayRest + re-seats toward the nearest declared target) + the KEPT COMMIT-side `nearestTarget`/`nearestValue` resolver + a single-commit `committed` guard (the one-registry discipline; BH.B1-W3 EXCISED the BB-era published-surface `decayRest`+`spring.target`+`commitSnapOnRelease` re-roll — the no-dual-path discipline, a surviving re-roll REDs), D4 the SegmentedTabs draggable?:boolean axis is ADDITIVE (default false; the click select+squishOnTravel path byte-identical — the opt-in bite) with ≥2 binary consumers (SegmentedTabs + DockLayerGroup — two useDragMorph(<…>)( call sites), D5 the roving-tabindex contract lands (a :tabindex binding + a @keydown on the strip) NOT gated behind :draggable (a draggable-only roving REDs — the keyboard contract is every-strip) with the arrow axis derived off isVertical (ArrowRight/Left + ArrowDown/Up + Home/End; a hardcoded horizontal-only set REDs) + an inline self-test bite (a synthetic :draggable-gated tabindex MUST flag — proven every run). The drag is compositor-only (transform: translate, never inline-size/left/top/width — W-MOTION-CANON's proof:no-layout-animation owns the library-wide enforcement); the spring reuses the snappy SPRING_PRESETS row (no new clock — the W-GLASS-CAL spring fence); the GL shader fence + ppmycota hold. Bite: re-fork the pointer-velocity engine / hardcode a cap > 1.08 / drop the single-commit guard / gate the roving on :draggable / hardcode a horizontal-only arrow set → the matching clause reddens.",
    },
    {
        id: "proof:scroll-motion",
        cmd: "proof:scroll-motion",
        tags: ["local", "ci", "release"],
        note: "BB.W-SCROLL-MOTION — the SOTA scroll-driven CHOREOGRAPHY register SOURCE gate (born-RED 0/9 -> GREEN 9/9). Device-free static src-scan (S1-S6; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). The PAINTED page-build/cascade/pin truth is the π arm tests-visual/scroll-motion.spec.ts + the W-SCROLL-MOTION-DELTA capture (the page-build frame-series, the section-cascade scroll-through, the scroll-pinned phase sweep, the PRM single-paint, BOTH modes — LOCAL-ONLY/real-GPU per the AY W-LIVE1 split, backstopped on CI by proof:live-verified-ledger, rides W-REFLECT3), never this gate alone (the AZ P-1 close-class fix). glass-ui owned the native scroll-driven SUBSTRATE (scroll-driven.css scroll()/view() + the --demo-main-progress named timeline + the supportsCssTimeline harden) but composed none of the CHOREOGRAPHY; this wave mints scroll-choreography.css (@import after scroll-driven.css): S1 .scroll-build (the route-enter page-build — @keyframes-on-mount chrome->hero->body coordinated beats, the transform leg on --spring-snappy + --spring-snappy-duration, a coupled opacity leg on --ease-out, an explicit (prefers-reduced-motion: reduce) carve that drops the transform + keeps the fade — P2/P3/P4/P6); S2 .scroll-cascade (the per-child view() timeline section cascade — the implicit stagger NO setTimeout, the coupled transform+opacity build, NO layout property — the proof:no-layout-animation floor); S3 .scroll-pin/.scroll-pin-stage (position: sticky + a named scroll-timeline/timeline-scope --gl-pin, the fixed-stage-advances-time phase sweep, compositor channels only); S4 every recipe under the @media (prefers-reduced-motion: no-preference) + @supports (animation-timeline: …) outer-gate (the vestibular floor); S5 the native scroll-behavior: smooth .smooth-scroll opt-in (PRM-gated) AND the NEGATIVE — package.json carries NO lenis/gsap/locomotive/@studio-freight dep AND no src/demo file imports one or hand-rolls a rAF momentum loop (the no-net-dep fence); S6 the >=2-consumer bar (the registers adopted on >=2 demo surfaces — the J-inv-10 visual-load-bearing floor). The scroll-pin ships the CSS-only register under @supports (timeline-scope) with a correct static-layout fallback — no JS leaf, no net dep (the 2026 universal-support decision; the JS fallback leaf mirroring useScrollProgress is BOOKED only on a material engine-gap reveal per §Triumvirate). Bite: a build on a generic --duration-* / no coupled fade / no PRM carve, a setTimeout cascade or a height/padding keyframe, a static sticky with no timeline link, a recipe outside the PRM gate, a bundled scroll lib or a rAF momentum loop, or <2 consumers -> the matching clause reddens.",
    },
    {
        id: "proof:press-unify",
        cmd: "proof:press-unify",
        tags: ["local", "ci", "release"],
        note: "BB.W-PRESS-UNIFY — the ONE interruptible coupled spring-press gate (born-RED at HEAD → GREEN at the wire). Device-free SOURCE arm (P1-P4; the PAINTED truth is the π readback tests-visual/press-unify.spec.ts + the W-PRESS-UNIFY-DELTA — the press frame-series coupled-within-the-spring-clock, the rapid double-tap mid-flight ABSORB before/after the CSS-restart ground, the PRM-instant zero-transform-frame, the compositor-only cross-check, BOTH modes; LOCAL-ONLY, backstopped on CI by proof:live-verified-ledger, rides W-REFLECT3): P1 the DEAD primitive useSpringPress is BOUND on ≥2 named binary SFCs counting EITHER a direct useSpringPress binding (Button — left inline so proof:button-glass's B2 direct-composition assert stays green) OR a binding via the useLiquidPress wrapper (Card :pressable — the wrapper composes useSpringPress), each binding BOTH the press VALUE (pressStyle / a value-fed scale+press-t) AND the pointer handlers (press/release); an import-without-bind fake consumer does NOT count + useLiquidPress exists, composes useSpringPress, and is published on the /motion barrel (NOT root — the keyframes-bearing SCC-trap). P2 the re-press is INTERRUPTIBLE — useSpringPress re-targets the spring (target.value=1/0, the kf SpringProgress velocity-continuous re-seat) and the CSS .tap-squish:active is the no-JS FLOOR only (not the SOLE press). P3 the press is COUPLED — the useLiquidPress driver feeds BOTH the reciprocal scale leg AND the consumer-named press-var leg; Button couples inline (--glass-btn-press-t + a reciprocal scale) and Card couples via the .glass-press filter:brightness() on --card-press-t; the gleam/brightness leg reads the SAME drive (surfaces.css) and the drives are typed @property (property-regs.css / base.css); the press transform rides the spring's own settle clock, NOT a generic --duration-*. P4 PRM is INSTANT — the driver threads respectReducedMotion (never forced false) → the kf SpringProgress snap, and the CSS .tap-squish:active PRM carve (scale:1 under reduce) stays the floor. + a 4-bite self-test (import-without-bind / scale-only / forced-prm-off / layout-prop MUST each flag, proven every run). The press is compositor-only (scale+filter+the --*-press-t custom property — never a layout prop; W-MOTION-CANON's proof:no-layout-animation owns the library-wide enforcement); no generated --spring-* token edit (the W-GLASS-CAL spring fence); the GL shader fence + ppmycota hold. The J-inv-10 disposition is the WIRE (the demote did not fire) — useSpringPress reaches 2 binaries (Button + Card); the dock control is the booked third (DockIconButton.vue out of this wave's file bounds). Bite: a sub-2-binary press, a CSS-only press as the SOLE path, a scale-only / un-coupled press, a generic --duration-* on the press transform, a forced respectReducedMotion:false, or a layout-property press → the matching clause reddens.",
    },
    {
        id: "proof:lensing",
        cmd: "proof:lensing",
        tags: ["local", "ci", "release"],
        note: "BB.W-LENSING — the refractive-glass tier EVOLVED onto the squircle bevel-profile + the motion-reactive EDGE specular glint (born-RED→GREEN; the comment-strip pure-detector house pattern + a 4-bite self-test proven every run). Device-free SOURCE arm (L1-L6; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). The BINDING painted truth is the π readback tests-visual/lensing.spec.ts + the W-LENSING-DELTA (the refraction ON/OFF over the live aurora, the press lens-swell + edge-glint frame-series, the angle-tracking hover-sweep, the off-Chromium degrade-floor, the PRM snap, BOTH modes — LOCAL-ONLY/real-GPU since backdrop-filter: url() needs a real Chromium GPU, the AY W-LIVE1 split, backstopped on CI by proof:live-verified-ledger, the live capture rides W-REFLECT3) + the proof:ba-gestalt glass/CTA verdict (BB inv-4 — per-mechanism greens do NOT close a visual wave). L1 --glass-refract is a typed INHERITING <number> @property (property-regs.css) driving the lens scale (the consuming --glass-refract-filter is var(--glass-refract)-derived, NOT a bare scale='28' literal). L2 the displacement map is the edge-concentrated squircle crossed-gradient (a HORIZONTAL R + a VERTICAL G gradient SCREEN-composited; the uniform radialGradient placeholder RETIRED) + the --glass-refract-bevel rim knob. L3 the whole lens rides INSIDE @supports (backdrop-filter: url(#…)); no refraction backdrop-filter sits outside the gate (the off-Chromium blur+tint floor preserved). L4 the .glass-lens :active lens-swell couples --glass-refract to the ONE --glass-btn-press-t drive via calc() on the --spring-snappy-duration clock, ZERO layout property animates (the proof:no-layout-animation compositor-only set). L5 useSpecularPointer WRAPS the ONE createSpecularWriter core (the W-LIQUIDHOVER single-source, ALREADY landed), writes --specular-angle DERIVED via atan2 from the core's (x,y) with NO forked getBoundingClientRect/--mouse-x write, exported on /glass. L6 the GL-shader fence holds — the lens is the SVG backdrop-filter url() feDisplacementMap graph, ZERO aurora.frag/metaball.frag/webgl/shaders edit. §0 RE-GROUND DRIFT (recorded in the DELTA): W-LIQUIDHOVER landed FIRST (createSpecularWriter is the single core; useSpecularPointer extends, never forks); the data-URI scale CANNOT be CSS-var()-driven (the §Triumvirate map-fidelity reveal — the squircle PROFILE ships, the runtime scale-reconstruction booked to W-REFLECT3 per the spec's named encoding-successor). Class rename .glass-refract→.glass-lens (clean break, no alias, BB inv-7; MIGRATION row). Bite: a uniform-radial map revival → L2 reddens; a bare scale='<n>' literal → L1; a forked position write in the leaf → L5; a layout property on the press path → L4.",
    },
    {
        id: "proof:glass-accent",
        cmd: "proof:glass-accent",
        tags: ["local", "ci", "release"],
        note: "BB.W-GLASS-ACCENT — the per-INSTANCE chromatic-rim axis (--glass-accent/--glass-accent-strength), the THIRD disjoint glass axis (LEVEL · TINT · ACCENT). Device-free SOURCE (born-RED at HEAD: zero glass-accent across ladder/material/property-regs + the consumer → GREEN): W1 the RIM (the --glass-material-rim inset ring + --glass-border-accent + all 5 rungs reading var(--glass-border-accent)) AND the ::before catch-light CORE (--glass-specular-core, the warm-cream hsl(40 35% 92%) base) each compose color-mix(IN OKLAB, <current rim/core>, var(--glass-accent) var(--glass-accent-strength)) — an in-srgb mix REDs (the brand-overlay fence), a half-accented surface (rim XOR catch-light) REDs, a flat border-color:var(--glass-accent) swap REDs; W2 the @property no-op floor — --glass-accent initial-value:transparent (the NEUTRAL identity) + inherits:true + syntax<color>, --glass-accent-strength initial-value:0% + inherits:true + syntax<percentage> (a non-zero default strength or a non-neutral accent default REDs — the byte-identical-at-0% floor); W3 ≥2 LIVE per-INSTANCE consumers (the demo data-hue swatch grid + the on/off accent device in glass-material.vue, NOT a :root global) + the DISTINCT-not-fork fence (the accent NEVER writes --glass-tint-source/--glass-tint-strength and NEVER tints a plate background — a W55 fork REDs). COMPOSES W-LENSING's ::before catch-light (tints the ONE core color, never a second layer); the rim seam is left clean for W-METAL-SHIMMER's .metal-rainbow-rim. The BINDING visual truth is the pi readback (tests-visual/glass-accent.spec.ts — the accent ON reads the consumer hue at the rim + glint, the accent OFF byte-matches the warm-cream/warm-ink HEAD ground, distinct per-instance hues, both modes; LOCAL-ONLY real-GPU, backstopped by proof:live-verified-ledger, the live capture rides W-REFLECT3) + the proof:ba-gestalt glass-band verdict (BB inv-4 — per-mechanism greens do NOT close a visual wave). --self-test bite: an in-srgb rim mix reds W1, a default strength>0% / a non-neutral accent default reds W2, a :root-global accent / a W55 fork reds W3. Bite: drop the OKLab rim/core mix, drift the neutral-identity default, alias --glass-tint-source as the accent, or tint the plate background → RED.",
    },
    {
        id: "proof:glass-foundation",
        cmd: "proof:glass-foundation",
        tags: ["local", "ci", "release"],
        note: "BE.W5 — the Tier-0 glass-material FOUNDATION tokens the BE liquid-dock band depends on (born-RED at HEAD: the 4 token families ABSENT → GREEN at build; the comment-strip + pure-detector house pattern, mirroring proof-glass-accent.mjs, an --self-test arm proven every run). ADDITIVE — every existing token + consumer byte-untouched. Device-free SOURCE (the visual truth rides the downstream BE.W-* π readbacks + the proof:ba-gestalt verdicts). A1 — `--glass-ambient-hue` (the backdrop hue the glass absorbs, BE.W-AMBIENT-TINT) is WRITTEN by useGlassBackdropLuminance as a FREE rider over the EXISTING 32×32 getImageData loop (exactly ONE getImageData + ONE downsample canvas — a second of either reds the no-2nd-pass fence) via value.js's srgbToOKLab/rawOklabToOklch (the cssToOklch composition path — a hand-rolled rgb→oklch matrix reds, cross-asserts proof:single-color-core), with the gray-null identity (a gray backdrop writes `transparent` — the room tints nothing). A2 — the `--glass-fill-tint`/`--glass-fill-strength` per-instance PLATE-FILL axis (BE.W-TINTED-CHIP) is @property-registered with the typed no-op floor (transparent/0% — the both-modes neutral identity, DISTINCT from the rim `--glass-accent`), AND the composed `--glass-bg-sheet`/`--glass-bg-clear` ride the SHARED mode-aware oklab-tint recipe (byte-isomorphic to `--glass-bg-dialog` — the W55 darken + dark-arm companions reach them per-mode). A3 — `surface=\"clear\"` (BE.W-CLEAR-VARIANT) is the 4th surface-axis member (the `Surface` union + `surfaceClass` map clear→glass-clear) with its MANDATORY legibility scrim (the `.glass-clear` rule carries a `color-mix(in srgb, var(--background) …, transparent)` backdrop-dim whose strength DERIVES from the sampled `--glass-backdrop-luma` — a scrim-less clear plate is FORBIDDEN, the Apple Clear contract; the scrim dims the BACKDROP, never forking the W55 plate-tint cohort — the two axes disjoint), AND `--glass-opacity-clear` (0.58, < dialog 0.68 the Apple-Clear band) / `--glass-opacity-sheet` (0.74, strictly between dialog 0.68 and overlay 0.95). The `--glass-edge-light` MISUSE rule (it is a WHOLE box-shadow LAYER, NEVER nested as a color — `inset … var(--glass-edge-light)` drops the whole box-shadow) is documented at material.css. --self-test bite: a hand-rolled rgb→oklch / a second getImageData reds A1; a non-neutral fill-tint default reds A2; a scrim-less .glass-clear / an opaque clear reds A3.",
    },
    {
        id: "proof:metal-shimmer",
        cmd: "proof:metal-shimmer",
        tags: ["local", "ci", "release"],
        note: "BB.W-METAL-SHIMMER — the brand-metal TRIAD CLOSED (bronze added) + the metal-PARAMETERIZED shimmer sweep (born-RED→GREEN; the comment-strip + pure-detector house pattern, mirroring proof-glass-accent.mjs/proof-no-gray.mjs; a 6-bite --self-test proven every run). Device-free SOURCE arm (M1-M6; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). §0 RE-GROUND DRIFT (recorded in the DELTA): the .1 token+recipe cluster was ALREADY LANDED at HEAD 966720e5 by a fleet predecessor — this wave found+fixed TWO .1 gaps (metal.css was never @import-ed in utilities.css so the partial never compiled; scale-paper.css 519→551 tripped the no-god-module ratchet, rebaselined on the existing BB.W-CARVE4 BOOK). The BINDING painted truth is the π readback tests-visual/metal-shimmer.spec.ts + the W-METAL-SHIMMER-DELTA (the three metals DISTINCT both modes — silver lowest-chroma/bronze real-chroma, the swept ~6s sweep, the border-image RIM, the rainbow rim composing --glass-accent, the PRM-static slide-OFF/gradient-paints — LOCAL-ONLY real-GPU/live-motion, the AY W-LIVE1 split, backstopped on CI by proof:live-verified-ledger, the live capture rides W-REFLECT3) + the proof:ba-gestalt brand-metal/figures verdict (BB inv-4 — per-mechanism greens do NOT close a visual wave; verdict PASS both modes — Au/Ag/Bz read as three distinct brand metals, bronze polished-warm not muddy). M1 the THREE metal quads PARALLEL across the four cascade arms (scale-paper raw+--color-* alias · bridges @theme alias · light-dark() arm · .dark fallback), -deep mode-invariant (omitted from the light-dark + dark arms exactly as gold/silver omit it) — a half-cascade (bronze in scale-paper but skipping the bridge/light-dark/dark-arm, the dead-orphan class) REDs. M2 the bronze hue is a warm-brown METAL (OKLch hue ∈ [48,62]°, distinct from gold ~84° + silver ~255°) with chroma ≥ the W-NO-GRAY STRONG_FLOOR 0.020 (a brand metal on the silver-exception, NOT a neutral) — a low-chroma bronze (a neutral) or a gold/olive-hue bronze REDs. M3 ONE metal-PARAMETERIZED @keyframes metal-shimmer-sweep (PURE background-position, ZERO baked metal color) + the .metal-* recipe resolves its gradient off the --metal-stop-* slots reading --metal-shimmer-color (each .metal-{gold,silver,bronze} SETS the channel marker) — a per-metal keyframe FORK (silver-shimmer-slide) or a baked color in the keyframe body REDs. M4 @keyframes gold-shimmer-slide RETIRED (gone everywhere — keyframe AND consumer, clean break no alias) + .gold-shimmer + --animate-gold-shimmer re-point onto metal-shimmer-sweep with --metal-shimmer-color:gold (the gold READ byte-preserved) — a surviving gold-shimmer-slide REDs. M5 the PRM-static bracket — every metal utility's animation: sits INSIDE @media (prefers-reduced-motion: no-preference) (the .gold-shimmer model) + the static metal gradient is the un-bracketed base (the metal READS for PRM users) — a bracket leak (unconditional animation) or a motion-only utility (no at-rest gradient) REDs. M6 the metal family is CALM — NO disco token (sparkle/✦/--glass-grain-opacity-disco/--ripple-radius/btn-audacious/btn-gold-bg-sweep/--duration-sparkle) + the metal animation reads the slow --duration-metal (≥6s) clock (--duration-seal stays absent — the §0 phantom) — a disco re-introduction or a sub-second metal clock REDs. PLUS a WIRE clause (metal.css @import-ed in utilities.css — the partial compiles into the bundle). Bite: a low-chroma/wrong-hue bronze → M2; a forked silver-shimmer-slide or a baked keyframe color → M3; a surviving gold-shimmer-slide → M4; an unconditional metal animation → M5; a ✦/sub-second clock → M6.",
    },
    {
        id: "proof:glass-depth",
        cmd: "proof:glass-depth",
        tags: ["local", "ci", "release"],
        note: "BB.W-DEEP-GLASS — the OPT-IN deep-glass tier (--glass-depth / --glass-blur-deep-* / .glass-deep / CardTier deep) ABOVE the W-GLASS-CAL calm default (born-RED→GREEN; the comment-strip + pure-detector house pattern, mirroring proof-glass-accent.mjs/proof-glass-cal.mjs; a 6-bite --self-test proven every run). Device-free SOURCE (D1-D5; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut): D1 @property --glass-depth is a typed INHERITING <number> AND the deep recipe (--glass-blur-deep-active-radius / --glass-saturate-deep-active) READS var(--glass-depth) — a baked literal (no var(--glass-depth)) REDs; D2 the deep tier is at the Apple range (--glass-blur-deep-radius ∈ [14,20], --glass-saturate-deep ≥ 1.5) AND STRICTLY DEEPER than the calm floating rung (13px / 1.18) on BOTH axes — a deep radius ≤13px or saturate ≤1.18 REDs; D3 the calm content default is BYTE-UNCHANGED (every base --glass-blur-*-radius primitive retains its W-GLASS-CAL value wash 1/quiet 8/resting 8/floating 13/overlay 13/dock 9, the calm --glass-blur-floating composite intact at saturate(1.18)) AND proof:glass-cal is CROSS-ASSERTED GREEN (a blind un-dial — editing a base primitive to 'reach Apple' — REDs D3 AND proof:glass-cal); D4 the deep tier COMPOSES --glass-level (the deep radius scales var(--glass-level) — the opaque escape + a11y brackets reach the deep plate) AND .glass-deep is a token-substitution DECORATION (re-points --glass-blur-floating: var(--glass-blur-deep), the .glass-opaque precedent — NO competing background/box-shadow recipe; a parallel recipe REDs); D5 the deep tier is OPT-IN (the deep blur appears ONLY in .glass-deep + the CardTier deep branch, NEVER on a base content-tier rule; the Card tier default is NOT deep — making the deepest paint the bare default REDs). The BINDING painted truth is the π readback tests-visual/glass-depth.spec.ts (the .glass-deep plate resolves a LARGER blur + HIGHER saturate than the calm .glass-floating default over the SAME live backdrop, the calm plate's backdrop-filter byte-matches the W-GLASS-CAL value 13px/1.18, the deep plate at --glass-level:0 collapses to blur(0) — the level seam — and the deep plate in the W55 bright bucket still resolves a deep blur, BOTH modes; LOCAL-ONLY real-GPU, the AY W-LIVE1 split — backdrop-filter over a live <canvas> aurora needs a real Chromium GPU, backstopped on CI by proof:live-verified-ledger, the live capture rides W-REFLECT3) + the proof:ba-gestalt glass/CTA verdict (BB inv-4 — per-mechanism greens do NOT close a visual wave; verdict PASS both modes — the deep tier reads as the MAXIMAL iOS-27 liquid glass while the calm surfaces stay calm, the calm default not reverted, the deep tier not a garish over-blur). The deep family is a SEPARATE --glass-blur-deep-* token the calm ladder NEVER reads (tokens/glass-deep.css + glass/deep.css net-new partials, glass.css 505 / ladder.css 510 0-growth). --self-test bite: a baked deep magnitude reds D1; a ≤13px radius / ≤1.18 saturate reds D2; the blind un-dial (floating → 16px) reds D3; a deep blur dropping var(--glass-level) reds D4; a .glass-deep parallel background recipe reds D4; a base content-tier deep leak reds D5. Bite: revert/un-dial a base radius → D3 (AND proof:glass-cal); land the deep tier ≤ the calm floating → D2; hardcode the deep magnitude → D1; fork a parallel deep recipe → D4; apply the deep blur to a base tier / default <Card> to tier='deep' → D5.",
    },
    {
        id: "proof:liquid-reveal",
        cmd: "proof:liquid-reveal",
        tags: ["local", "ci", "release"],
        note: "BB.W-LIQUID-REVEAL — the iOS-27 bloom-from-source liquid open gate (born-RED 26 clauses at HEAD → GREEN). Device-free SOURCE arm (R1-R5; the PAINTED truth is the π readback tests-visual/liquid-reveal.spec.ts + the W-LIQUID-REVEAL-DELTA capture — the bloom frame-series t=0/.25/.5/.75/1 source-origin scale + coupled fade + filter blur-settle for Popover/Dialog/dock-expand, the ≥9-surface rendered enter over the live aurora, the PRM single-paint, BOTH modes; LOCAL-ONLY/real-GPU per the AY W-LIVE1 split, backstopped on CI by proof:live-verified-ledger, rides W-REFLECT3 + the proof:ba-gestalt overlay verdict — never this gate alone, the AZ P-1 close-class fix): R1 useLiquidReveal.ts composes the dormant kf shared-element FLIP (ElementMorph — the core flipShared wraps, the §scope-1 equivalent forward ElementMorph) + springTimingFunction from @mkbabb/keyframes.js (NOT a hand-rolled rAF spring) and writes ONLY transform/opacity/filter on the reveal path (the compositor-only floor — a width/height/top/left/padding/font-size write REDs even with the kf import present; the A'-3 lesson W-MOTION-CANON enforces); R2 the .glass-reveal recipe (glass/reveal.css) AND the .glass-top-layer enter (animations.css) ride --spring-<name> + the matching --spring-<name>-duration (NOT a fixed cubic-bezier + --duration-normal) on the SPATIAL scale/translate channel AND carry the coupled filter blur(4px)→0 decongest (filter on the surface's own pixels so the resting glass-floating plate backdrop-filter survives) — a spring-the-scale-but-generic-duration OR omit-the-blur-settle REDs; R3 each enrolled overlay SFC (Dialog·Popover·Tooltip·HoverCard·DropdownMenu·DropdownMenuSubContent·ContextMenu·ContextMenuSubContent·Combobox·Select) composes .glass-reveal AND NONE retains popover-animate (the POSITIVE + the NEGATIVE — a residual popover-animate alias REDs, BB inv-7 no-legacy) AND popover-animate's bezier zoom-95 @utility body is RETIRED AND the dock-expand bloom beat reads a --dock-reveal filter blur-settle keyed off --dock-expand-t (DOCK-EXPAND-CONSUMER); R4 the recipe's data-[state=closed]/exit leg reads --ease-out (no overshoot), NEVER a --spring-* token (a closing surface must not overshoot past gone — §6/W-MOTION-CANON P2); R5 the PRM carve (CSS + the JS leaf respectReducedMotion) zeroes scale/translate/filter (the vestibular triggers) AND retains the opacity fade (a PRM block that kills the fade is wrong; one that leaves the scale animating REDs); + the inline self-test bite (a synthetic generic-clock recipe MUST flag R2, a synthetic bouncy exit MUST flag R4 — proven every run). The spring clock + the --spring-* linear() tokens + the kf siblings + the Dialog spring useSpringMount drag-dismiss are PRESERVED (the W-GLASS-CAL clock fence held — the wave THREADS, never re-tunes); the GL shader fence + ppmycota hold. Bite: a generic --duration-* on the enter / no coupled blur-settle / a residual popover-animate on an enrolled surface / a --spring-* on the exit / a PRM block that animates scale or kills the fade / a layout-property write on the reveal path → the matching clause reddens.",
    },
    {
        id: "proof:no-dual-path",
        cmd: "proof:no-dual-path",
        tags: ["local", "ci", "release"],
        note: "BB.W-PRUNE-CONSOLIDATE — the superseded-mechanism + half-primitive floor (the SOTA fewer-sharper no-dual-path cut; born-RED demonstrated → GREEN at the symmetric-closed HEAD; the comment-strip pure-detector house pattern + a 9-bite self-test proven every run; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). §0 RE-GROUND DRIFT (recorded in the DELTA): the band's THREE successor waves had ALREADY landed the clean-break cuts themselves, so this is a CONFIRM + GATE + CENSUS with ZERO source edit (the documented 'verified DELETED, not assumed gone' branch). Four device-free SOURCE clauses: D1 popover-animate's bezier zoom-95 @utility is DELETED from animate.css AND no src/components SFC references it as a LIVE class/@apply (the SYMMETRIC closure — a dormant stub OR a broken-reference half-delete both RED; a comment reference is the retirement record, comment-stripped; slide-in-from-side FOLDED onto .glass-reveal's data-side leg, also deleted). D2 the CSS :active scale press cohort is the W-PRESS-UNIFY-recorded no-JS FLOOR (the §6 --spring-smooth register; --scale-press declared ONCE in scale-paper.css) — the floor is KEPT not cut (the §Triumvirate floor-vs-dual-path trap avoided — the detector flags ONLY a redundant duplicate --scale-press literal, NEVER the recorded floor). D3 the static centred-disc specular class is superseded — exactly ONE position-write source (createSpecularWriter, defined once, wrapped by vSpecular/useSpecularTracking/useSpecularPointer; zero hand-rolled --mouse-x setProperty copies in SFCs), the vSpecular tier-root auto-arm bound on ≥2 interactive glass SFCs (the static dead-centre freeze structurally closed), AND the disc CORE (.glass-material::before catch-light) is KEPT (the over-cut bite reds an absent core — W-LENSING refines it, never deletes). D4 the half-primitive census carries a TERMINAL verdict per band-touched leaf (wired with ≥2 binaries cited / retired-with-named-re-trigger with a non-empty rationale+successor / wired-with-booked-second the W-NDA-DECIDE 1.5-consumer terminal pattern) — never shelf-ware, never re-book; a `book` verdict / a wired verdict citing <2 binaries / a blank rationale RED. + the SUPERSEDED_SET rationale bite (a bare entry with empty successor/rationale REDs — the W-DEAD-SWEEP keep-allowlist discipline). The cross-gate no-regression check: proof:liquid-reveal/press-unify/lensing STAY GREEN after the confirm (the retire must not red the successor it serves; logged in the DELTA). NO proof:ba-gestalt of its own (a dead-MECHANISM cut + register-decide changes ZERO paint where the successor already paints — the successor waves carry the gestalt verdict, BB inv-4). The half-primitive DECIDE ledger is docs/tranches/BB/audit/W-PRUNE-CONSOLIDATE-census.md; the per-mechanism before/after grep + the born-RED→GREEN logs + the successor-gates-stay-green cross-check ride W-PRUNE-CONSOLIDATE-DELTA.md (AZ-form freshness header). The GL shader fence + ppmycota + the foreign-tree fence (the kf flipShared/Draggable/springTimingFunction re-exports are READ-ONLY references the band ACTIVATED — recorded, never edited) hold. Bite: a dormant @utility popover-animate stub / a broken-reference consumer against an absent @utility / a re-pointed alias drain / a redundant duplicate --scale-press literal / a second --mouse-x position-write copy / a deleted disc core / a `book` or blank-rationale or sub-2-binary census verdict → the matching clause reddens.",
    },
    {
        id: "proof:demo-design",
        cmd: "proof:demo-design",
        tags: ["local", "ci", "release"],
        note: "BB.W-DEMO-DESIGN — the demo presentation designed to glass-ui's own SOTA standard (born-RED → GREEN; D1-D6 + a 6-bite --self-test). Device-free SOURCE arm over the demo SFCs; the BINDING painted truth is the π readback tests-visual/demo-design.spec.ts + the W-DEMO-DESIGN DELTA + the proof:ba-gestalt per-pane verdicts (rides W-REFLECT3). The flat token tours become DESIGNED specimens, the type pane an editorial specimen, the glass atoms staged over a live field, the demo surfaces alive — CONSUMING the sibling-wave primitives, never a demo-local fork. D1 typography.vue is a SPECIMEN not a label/sample table (focal text-display-audacious/-mega/-hero + the mega/hero/audacious tiers ACTIVATED + the grid-cols-[10rem_1fr] table GONE). D2 colors.vue leads with the rainbow ramp (before the core grid) + .scroll-cascade pop; icons.vue leads with the Pops row + the IconChip :reveal pop-entrance. D3 buttons.vue stages the glass + .glass-btn rows over ShowcaseFrame tier=field (the BG-2 black-plate kill), the opaque atoms on the opaque host. D4 the focal pops compose the IconChip :reveal axis + the body panes the .scroll-cascade register + NO demo-local @keyframes re-implements the pop-entrance/cascade (the anti-fork bite). D5 the incongruence panes redressed (buttons CTA out-presents destructive, notification .feedback-tone rows not 10px dots, fourier-studio ONE blurb no sandwich, reveal through <StorySection>). D6 the house fences hold (git diff src/styles empty, no GL added to a foundations/display static-wash route). Bite: re-introduce the flat table / move the core grid above the rainbow / un-stage the glass rows / inject a demo-local pop-in @keyframes / restore the 10px dots / add GL to a static-wash route → RED. Demo-private (zero src/ paint).",
    },
    {
        id: "proof:border-progress",
        cmd: "proof:border-progress",
        tags: ["local", "ci"],
        note: "BB.W-BORDER-PROGRESS — progress IS the element's border: the masked-conic ring (born-RED 22 violations → GREEN). The library had no primitive where progress is the chrome — the three progress variants are all floating track-and-fill RECTs (the C2 register the user rejects). Device-free SOURCE arm (the BINDING painted truth is the π readback tests-visual/border-progress.spec.ts + the W-BORDER-PROGRESS-DELTA capture + the proof:ba-gestalt verdict — the AZ P-1 source-green/visually-broken close-class): W1 the ring is the BORDER, masked-conic — a conic-gradient mask-composited into the border band (mask-composite: exclude + -webkit-mask-composite: xor of a padding-box from a border-box, the radius-following cut-out) AND NO border-image (the corner-squaring path MEASURED INFERIOR, forbidden) AND NO floating-bar RECT; W2 a registered @property --border-progress-fill <percentage> (inherits:false + initial-value, the safe unregistered fallback) the conic sweep READS so the fill INTERPOLATES; W3 the spectrum is OKLCH/shorter-hue on the EXISTING /color leaf (useBorderSpectrum imports src/composables/color + value.js interpolateHue(\"shorter\"), the // CONSUME(value.js 0.13.0 oklchSpectrum): consume-and-delete marker present, ZERO re-rolled OKLab/sRGB matrix — proof:single-color-core's mirror); W4 the coverage axis (full-ring|bottom-edge through ONE coverage-scoped mask region, NOT a parallel conic-fill recipe) + the 10-14px envelope (--border-progress-width default 12px — the AMENDED A1 thicker band, NOT 6-8px); W5 the milestone emit + PRM-gated data-milestone pulse + the colocation four (composables/ + constants.ts + README.md + the dir) + the /border-progress subpath mirror + the api type publication + the package.json export + the index.css @import. W6 a 7-bite self-test (border-image / no-mask-composite / re-rolled-color / out-of-envelope / no-consume-marker / no-coverage-scope / milestone-not-prm-gated each RED through the pure detector). Subpath-only (off the root barrel — the conic/@property chunk warrants no root re-export). Bite: re-introduce border-image / drop the mask-composite / re-roll the color math / set a 6-8px envelope / drop the consume marker / fork a 2nd bottom-edge recipe / un-PRM-gate the pulse → RED.",
    },
    {
        id: "proof:liquid-fill",
        cmd: "proof:liquid-fill",
        tags: ["local", "ci", "release"],
        note: "BG.W-LIQUID-FILL — the ONE shared liquid-fill register (born-RED → GREEN; fewer-sharper-primitives: ONE glass-cylinder fill recipe, N surfaces). The Slider's warm glass-cylinder fill (the `.slider-range` oklab warm-tint + backdrop blur + unified rim + under-shadow) was a per-site composite; it is factored ONCE into `.glass-liquid-fill` (src/styles/glass/liquid-fill.css) so the Slider RE-READS it and `<Progress variant=\"liquid\">` reads the SAME register. Device-free SOURCE arm (the BINDING painted truth is the π readback + the proof:ba-gestalt glass/feedback verdict, paint-pending on W-REFLECT): W1 the register exists ONCE across the glass cascade (EXACTLY one `.glass-liquid-fill {` block — a second is a fork) + carries the full glass mechanics (the `color-mix(in oklab, …, var(--liquid-fill-tint) …)` warm fill, `--liquid-fill-blur` on BOTH backdrop-filter + -webkit-backdrop-filter, the box-shadow composing --glass-material-rim + --liquid-fill-shadow, border-radius: var(--radius-pill)) + glass.css @imports the partial; W2 Slider RE-READS it — composes the `glass-liquid-fill` class + bridges its --slider-range-bg/-blur/-shadow consumer API onto the register's --liquid-fill-* knobs + NO forked `color-mix(in oklab` fill AND NO inline `backdrop-filter: var(--slider-range-blur` survives in Slider.vue (the dual path dead); W3 Progress gains variant=\"liquid\" — the ProgressVariant union + the dispatcher route + ProgressLiquid.vue composing the class + the barrel export; W4 phase-colour composable, ZERO per-site glass knowledge — ProgressLiquid seeds --liquid-fill-tint off --progress-fill and references NONE of the glass mechanics (backdrop-filter / --glass-material-rim / --glass-blur live in the register) + the ≥2-consumer bar met (Slider #1 + Progress liquid #2 both compose). + a 4-bite self-test (register drops the fill-mix / Slider re-forks the fill / Progress drops the variant / ProgressLiquid leaks a backdrop-filter each RED). Bite: re-fork the fill in a second partial / re-declare the oklab fill on .slider-range / drop the liquid variant / leak glass mechanics into the surface → RED.",
    },
    {
        id: "proof:deck",
        cmd: "proof:deck",
        tags: ["local", "ci"],
        note: "BC.W-DECK — the @mkbabb/glass-ui/deck SIBLING subpath: the full-viewport keyboard-paged aria-live PRESENTATION register (born-RED → GREEN), a clean MOVE of the slides donor's headless core (NOT a re-author, NOT a /carousel fold, NOT a third pagerWindow fork). Device-free SOURCE arm (the BINDING painted truth is tests-visual/deck.spec.ts + the W-DECK-DELTA capture + the proof:ba-gestalt motion-band verdict): D1 the /deck subpath exists as a SIBLING (the colocation set + the subpath mirror + the api DeckCore/DeckMoves publication + the package.json ./deck export + typesVersions[deck]) — a /carousel fold or a root-barrel re-export REDs; D2 the lift is a MOVE — the donor clamp [0,total-1] + the 1-based progress ((index+1)/total*100) + the full move surface preserved; D3 NO third pagerWindow fork — the windowing math is sourced from the ONE pager-dots/pagerWindow.ts leaf (PagerDots imports it), a second `function pagerWindow` definition REDs; D4 useDeckKeyboard is FOCUS-GUARDED — CONTROL_SELECTOR present, Space (`if (onControl) return false`) + digit (`&& !onControl`) reach a focused control's native activation (the C6 fix); D5 <DeckPager> composes <PagerDots pattern=\"group\"> (the deck PRESENTATION aria axis: role=group/aria-current) + the focus-survival watch + the 24px WCAG-2.5.8 hit target ride the composed PagerDots machinery; D6 the liveMessage announcer (`Slide N of M`); D7 --spring-deck = var(--spring-smooth) (an ALIAS, no new spring family) + installDeckSpring consumes keyframes.js springTimingFunction(DECK_SPRING) as the LAZY dynamic import only (the SCC-trap discipline — a static keyframes import on the /deck barrel REDs); D8 a 9-bite self-test (carousel-fold / drifted-clamp / drifted-progress / second-pagerWindow / hijack-all-space / spring-deck-own-curve / static-keyframes-import / on-root-barrel / no-live-message each RED). Publication binary: verify-export-types + proof:resolution prove @mkbabb/glass-ui/deck resolves + typechecks. Discharges the three-tranche deck-subpath disposition book (≥2-consumer bar met by construction — speedtest survey-deck + slides consume-back = two REPOS). Bite: fold into /carousel / drift the donor math / fork a second pagerWindow / un-guard Space / mint --spring-deck as its own curve / add a static keyframes import / re-export off the root barrel → RED.",
    },
    {
        id: "proof:pointer-velocity",
        cmd: "proof:pointer-velocity",
        tags: ["local", "ci", "release"],
        note: "BB.B4 (W-VIZ-POINTER) — usePointerVelocityField, the shared viz-pointer-physics field (pointer position + derived velocity + the ACCEL term), minted EARLY so the born-WebGPU viz consume it at birth (born-RED at the pre-build HEAD → GREEN at the wire). Device-free SOURCE arm (V1-V5; the comment-strip + pure-detector house pattern; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). The BINDING painted truth is the π readback once the born-WebGPU viz read the field (a viz responding to pointer velocity/acceleration), rides W-REFLECT3; this gate is the device-free CI half + the headless math half is tests/composables/motion/usePointerVelocityField.test.ts: V1 usePointerVelocityField.ts is defined + re-exported from the engine-free /motion-core barrel AND the root barrel (vue-only → root-barrel safe per the useLiquidFlex precedent), V2 it owns NO own loop (no requestAnimationFrame/setInterval/setTimeout — a tick(deltaMs)-fed PUSH-API the renderer feeds from its existing canvas-lifecycle loop, the one-loop / proof:offscreen-pause discipline; the raw pointer position is the only event-driven write) AND imports NEITHER @vueuse/core NOR @mkbabb/keyframes.js (the SCC-trap + no-spring-engine fence — the smoothing is a hand-rolled lerp), V3 PRM = tick(0) FREEZE — a SINGLE cached matchMedia('prefers-reduced-motion: reduce') change listener (the AV.W7 substrate pattern, NOT a fresh matchMedia per event) AND tick() freezes to rest under PRM or a zero/negative delta (reduced + deltaMs > 0 guard → reset) AND the position write is PRM-gated (respectPRM && reduced), V4 the ACCEL TERM is real — acceleration is DERIVED as a second derivative (a velocity-delta / dt feeding acceleration.value, eased; a stub accel REDs) and velocity is likewise derived + exposed, V5 the ≥2-consumer bar is met OR docs/consumer-evidence/use-pointer-velocity-field.md names the booked WebGPU-viz binaries (W-FLOWFIELD + W-CONCENTRIC + usePointerVelocityField) with the no-overfitting re-audit/retire clause (the EARLY-publish path). + a 3-bite self-test (a synthetic own-rAF leaf MUST flag V2 / a never-derived accel stub MUST flag V4 / a tick with no PRM-or-zero-delta freeze MUST flag V3 — proven every run). The field writes no DOM style (it feeds the viz uniform upload — the consumer owns the paint, so compositor-only is N/A); the GL shader fence + ppmycota hold; the aurora/blob pointer models (cursorModel.ts/useBlobPointer.ts) are NOT re-pointed (a fold onto the shared field is a booked successor IFF byte-faithful). Bite: fork an own rAF/setInterval/setTimeout loop, import @vueuse or @mkbabb/keyframes, drop the cached-matchMedia PRM listener, omit the tick(0) freeze, stub the accel term, or publish without the consumer-evidence doc → the matching clause reddens.",
    },
    {
        id: "proof:desktop-reserve",
        cmd: "proof:desktop-reserve",
        tags: ["local", "ci", "release"],
        note: "BB.W-DESKTOP-RESERVE (B3) — the wide-axis (desktop) InstrumentChassis dial reserve (born-RED→GREEN; the comment-strip + pure-detector house pattern, mirroring proof-card-padding.mjs; a 6-bite self-test proven every run). Device-free SOURCE arm (D1-D5; carries `ci` so proof:tag-parity stays green + `release` for the 4.1.0 cut). The speedtest AW v3 relay intake item B3 (docs/tranches/BB/coordination/cross-repo-inbound.md §5 :108): a wide-axis chassis RESERVE so the desktop layout reserves its block extent up-front → CLS≈0, SUPERSEDING the speedtest App.vue interim (`.app-chassis-spine > .instrument-dial { min-block-size: var(--chassis-max-block-size) }`, AW.W4.1 / DDR-AW-DESKTOP-RESERVE). THE DEFECT: glass-ui reserved the dial box from frame 0 ONLY on the mobile reflow (the R0G-2 min-height reserve inside @container chassis (max-width: 44.9375rem)); the WIDE box axis had NO library reserve, so a `1fr` meter row collapsed to its pre-hydration <canvas> intrinsic + grew on hydration (desktop-1440 CLS 0.109). THE FIX (token-first, the EXACT disjoint complement of the mobile rung): D1 --instrument-dial-min-block-size-desktop minted ONCE in tokens/offsets.css with its default resolving var(--chassis-max-block-size) — the library guardrail, NOT a baked literal (presets-in-consumers; a flat-rem/px default REDs); D2 .instrument-dial reads min-block-size: var(--instrument-dial-min-block-size-desktop, …) INSIDE @container chassis (min-width: …) and NOWHERE un-gated (a bare/base-level reserve or a viewport @media gate REDs — the reserve is wide-axis-ONLY); D3 the EXACT disjoint complement — the desktop floor px == the mobile ceiling px + 1 (45rem ≈ 720px = 44.9375rem ≈ 719px + 1px; the two container ranges share no width, reserved by exactly ONE branch at every box width — an overlapping floor REDs); D4 CLS-SAFE — the reserve is a STATIC min-block-size in NO @keyframes step + NO transition/transition-property value (an animated reserve REDs — the proof:no-layout-animation discipline asserted locally; a static min-block-size reserve is never an animation target, so proof:no-layout-animation stays GREEN by construction); D5 ≥2 consumers (mint + read — visual-load-bearing). + a 6-bite self-test (a flat-rem default reds D1, an un-gated base reserve reds D2, an overlapping mobile range reds D3, a transitioned min-block-size reds D4, a single-site token reds D5, the good shape passes — the false-witness floor). Born-RED on the reconstructed pre-wave tree (D1/D2/D3/D5 fail, 4 violations; D4 stays green pre-wave — the no-false-positive clause), GREEN after the two edits. The mobile rung is byte-untouched (the disjoint range means no edit to the existing max-width reserve). The BINDING painted truth (the live CLS≈0 capture) + the proof:ba-gestalt chassis-band verdict ride W-REFLECT3 (Batch 7). speedtest consumes this rung on the ^4.1.0 bump + deletes its App.vue interim (foreign-tree fence; byte-equivalent at the default). Bite: a baked-literal default → D1; an un-gated/viewport-gated reserve → D2; an overlapping desktop floor → D3; a transitioned/keyframed min-block-size → D4; a single-site token → D5.",
    },
    {
        id: "proof:gpu-substrate-single",
        cmd: "proof:gpu-substrate-single",
        tags: ["local", "ci"],
        note: "BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — the generalized dual-substrate parity gate, a SUPERSET of proof:webgl-substrate-single (imports its exported detectCanvas2DSingleSource — every WebGL2/Canvas2D clause stays GREEN, the fallback NOT retired). Clause A ONE WebGPU bootstrap (navigator.gpu/getContext(\"webgpu\")/requestAdapter in EXACTLY one src file, useWebGPUCanvas.ts — a viz calling navigator.gpu directly REDs); B ONE WebGL2 fallback bootstrap PRESERVED (a DELETED webgl2 substrate REDs — the ~5-10% tail: Linux Firefox, pre-A12 iPhones); C all THREE backends (WebGPU+WebGL2+Canvas2D) compose the ONE leaf, no re-fork (the W-CANVAS-UNIFY no-fork bite carried into the third backend — composition-PLUS-fork is STILL a fork); D no baked viz choices in the WebGPU substrate (no viz import, no devicePixelRatio DPR, no uniform names, no full-screen-triangle literal — the WGSL pipeline is the consumer's setup); E the device.lost self-heal present (the WebGPU twin of webglcontextrestored), distinguishing reason===\"destroyed\" from a TDR re-acquire; F the machine-read parity table (gpu-parity-table.md fenced json block) — every declared .wgsl/.frag path RESOLVES ON DISK (a verified row pointing at a missing file REDs, the anti-evasion floor), a verified row needs a capture artefact + a recorded OKLab ΔE within the calibrated bar (mean≤2.0/p99≤5.0), the 3 non-migrating viz (fourier-field/constellation/watercolor-dot) carry a no-migrate row with a non-empty reason; G the consumer-#2 usability assert exists (the non-aurora composition test). + 2 self-test bites: a composition-PLUS-fork synthetic REDs, a verified-row-pointing-at-a-nonexistent-.wgsl REDs. Born-RED on the bare tree (no WebGPU bootstrap, no parity table) → GREEN at close; the per-viz migration/new-viz rows flip pending→verified at their serial sub-waves (W-AURORA-WGPU/W-GOOBLOB-WGPU/W-FLOWFIELD/W-CONCENTRIC).",
    },
    {
        id: "proof:dockmorph-cta",
        cmd: "proof:dockmorph-cta",
        tags: ["local", "ci", "release"],
        note: "BB.B2 W-DOCKMORPH-CTA — the external-CTA-MORPHS-INTO-dock receive seam gate (born-RED at HEAD → GREEN; the CONFIRM-OR-BUILD verdict was BUILD a thin composition). The ask (cross-repo-inbound §5): a seam where an EXTERNAL CTA (a button/control OUTSIDE the dock) morphs INTO a dock control — a continuous compositor-flat morph (the iOS bloom-from-source INVERSE), PRM-seats. §0 RE-GROUND: W-DOCK-MORPH-FAMILY's dockMorphContext/dockMorphMeasure + --dock-morph-t own the dock's OWN collapse/expand+V↔H morph (byte-fenced); useLiquidReveal blooms a SURFACE FROM a trigger onto its OWN settled rect (the open). NEITHER expresses an external element morphing onto a FOREIGN dock-control target — a genuine gap. The seam is the reveal's COMPLEMENT: the FORWARD play of the SAME kf ElementMorph substrate (ElementMorph(ctaRect, dockControlRect) driven 0→1), built as a thin CONSUMING leaf useDockCtaReceive BESIDE the dock morph mechanism (no dockMorphContext/DOCK_SPRING edit). Five device-free SOURCE clauses + a self-test bite: R1 src/composables/motion/useDockCtaReceive.ts composes the kf ElementMorph + springTimingFunction from @mkbabb/keyframes.js (NOT a hand-rolled rAF spring) AND writes ONLY transform/opacity/filter on the receive path (the compositor-only floor — a width/height/top/left/padding/font-size write REDs even with the kf import present, the A'-3 lesson W-MOTION-CANON enforces); R2 the byte-fence — the leaf does NOT import dockMorphContext/dockMorphMeasure/DOCK_SPRING (a CONSUMING seam beside the dock morph mechanism, not an orchestrator edit); R3 the same sampled register — the leaf reads springPreset(name) from the shared SPRING_PRESETS table (NOT a hand (response, ζ)), an inline { response: 0.NN, dampingFraction: 0.NN } literal REDs (the W-GLASS-CAL clock fence); R4 PRM seats deterministically — under prefers-reduced-motion the leaf snaps opacity (zero transform/blur frames, NO morph.apply/requestAnimationFrame in the PRM branch) + hands off (onReceived, the gesture completes); R5 the seam is demonstrated (demo/stories/dock/cta-receive.vue composes the leaf with a real <DockIconButton> receive target, NO demo-local morph re-fork) + wired (the /motion barrel re-exports it). + the inline self-test bite (a synthetic leaf that hand-rolls the spring/writes a layout property/imports dockMorphContext MUST flag R1+R2; a still-animating PRM branch MUST flag R4; a demo-local morph re-implementation MUST flag R5 — proven every run). Born-RED verified: with the leaf absent → [R1] does-not-exist. The dock fleet stays GREEN (the new cta-receive.vue is a FEATURE_EXEMPT proof:dock-unify census entry); proof:dock-morph-family/liquid-reveal/no-layout-animation/vueuse-free-root stay GREEN. NO proof:ba-gestalt of its own — the PAINTED bloom frame-series + PRM single-paint ride the binding π at W-REFLECT3 + the proof:ba-gestalt dock verdict (the AY W-LIVE1 LOCAL-ONLY split). The GL/GPU shader fence + ppmycota + the foreign-tree fence (the kf re-exports are READ-ONLY references this seam ACTIVATES) hold. The DELTA is docs/tranches/BB/audit/visual/W-DOCKMORPH-CTA-DELTA.md. Bite: a hand-rolled spring / a layout-property write / a dockMorphContext-or-DOCK_SPRING import / an inline spring literal / a still-animating PRM branch / a demo-local morph re-fork → the matching clause reddens.",
    },
    {
        id: "proof:bloom-up",
        cmd: "proof:bloom-up",
        tags: ["local", "ci", "release"],
        note: "BE.W-BLOOM-UP — the shared-element FLIP where source≠dest + the 4th COLOR channel on the destination field (born-RED at HEAD → GREEN; the audit Tier-1 item 5, the f_009→f_010 betters-claim). THE MOVE: a SMALL source (an album card, the search pill) BLOOMS UP into a LARGE destination (the fullscreen surface, the Places sheet) — the THREE compositor channels (scale/opacity/blur-decongest — the useLiquidReveal bloom) PLUS a 4TH COLOR channel that re-tints the DESTINATION FIELD to the source's dominant album hue, so the bloom CARRIES the color into the surround (the iOS 'the whole world takes on the album's color'). useLiquidReveal ships the 3-channel geometry bloom but touches NO color (the field-warm is the load-bearing iOS move it is paint-blind to). THE VERDICT: BUILD a thin sibling leaf composing the SAME kf ElementMorph + springTimingFunction substrate (no second engine, no new spring family) for the source≠dest case + the 4th channel routed on the FIELD (not the blooming surface — the compositor-only-floor-on-the-surface de-risk). Four device-free SOURCE clauses + 5 self-test bites: W1 src/composables/motion/useBloomUp.ts composes the kf ElementMorph + springTimingFunction from @mkbabb/keyframes.js (NOT a hand-rolled rAF spring) AND writes ONLY transform/opacity/filter on the DESTINATION surface (the compositor-only floor — a width/height/top/left/padding/font-size write on the surface REDs even with the kf import; the --glass-ambient-* custom-property write on the FIELD is not a reflow-set property, not flagged); W2 the 4th color channel exists + is on the FIELD not the surface — the leaf writes the registered @property --glass-ambient-hue/-strength (the BE.W-AMBIENT-TINT cohort) onto destRef's ANCESTOR FIELD (a data-glass-field walk / a `field` option / a resolveField reach), interpolated on the spring curve, reading the source's album hue (the fieldHue param OR getComputedStyle(--glass-ambient-hue) off the SOURCE — the AMBIENT-TINT convergence; proof:single-color-core fence holds via the value.js leaf); a geometry-only bloom (no ambient write) REDs W2, a 4th channel writing --glass-ambient-* onto the BLOOMING surface (dest/el.style) REDs W2 (the compositor-only-floor breach); W3 Safari-safe + PRM-snap + off-root — the decongest rides a regular filter (NOT backdrop-filter:url(), the Safari floor), the PRM branch SNAPS the surface (opacity, NO morph.apply/requestAnimationFrame inside) AND lands the field hue instantly (a color change is not a vestibular trigger), the leaf ships on /motion (keyframes-bearing) and NEVER the root barrel (the SCC-trap; a root re-export REDs); W4 the 3 compositor channels present (morph.apply transform + opacity + filter blur — byte-shape with useLiquidReveal). + the inline self-test bites (a hand-rolled-spring/layout-property leaf REDs W1; a geometry-only bloom REDs W2; a 4th-channel-on-the-surface bloom REDs W2; a root-barrel re-export REDs W3; a still-animating PRM branch REDs W3 — proven every run). EXTEND-vs-NEW: NEW gate; proof:liquid-reveal/no-layout-animation/vueuse-free-root stay GREEN by construction. NO proof:ba-gestalt of its own — the PAINTED bloom frame-series + the field-hue warm across the same frames + the surface-carries-no-hue + the PRM single-paint ride the binding π tests-visual/bloom-up.spec.ts (LOCAL-ONLY/real-GPU, the webkit project enrolled per BE.W-SAFARI-CAPTURE) at W-REFLECT3 + the proof:ba-gestalt bloom verdict (the AY W-LIVE1 split). The GL shader fence + ppmycota + the foreign-tree fence (the kf re-exports are READ-ONLY references this seam ACTIVATES) hold. Bite: a hand-rolled spring / a surface layout-property write / a missing 4th channel / a 4th channel on the blooming surface / a root-barrel re-export / a still-animating PRM branch → the matching clause reddens.",
    },
    {
        id: "proof:card-tier-alpha",
        cmd: "proof:card-tier-alpha",
        tags: ["local", "ci"],
        note: "BB.W-CARD-TIER-ALPHA (B8, routed speedtest ASK-GU-CARD-TIER-ALPHA-PIN) — the per-tier alpha is CANONICAL at the primitive. The library already ships the tier-opacity primitives (--glass-opacity-{wash,quiet,resting,floating,overlay,dock,chassis}); this wave CANONICALIZES them as the NAMED identity register (documented, gated) so a consumer reads the named alpha instead of re-pinning magic numbers (the speedtest register.css --glass-bg-{tier} re-declarations). Device-free SOURCE: T1 each ladder tier + dock + chassis carries the canonical named alpha (light, tokens/glass.css) at the library-identity value; T2 the light ladder is alpha-monotonic; T3 the dark arm (tokens/dark-arm.css) carries the SAME named register, each rung LIFTED over light + monotonic, dock alpha mode-INVARIANT (no dark re-pin); T4 each --glass-bg-{tier} composes its named alpha through the EXACT AX.W54 --glass-level seam at its ONE :root site (the recipe MECHANISM untouched — proof:glass-level stays GREEN by construction); T5 the canonical register + the substitution-vs-inheritance retune seam are RECORDED in both arms (born-RED 3 violations at pre-wave un-canonicalized source); T6 consumer-override-deletes-byte-equivalent (a re-pin to the canonical alpha composes the byte-identical level-1 fill — the deletable no-op proof; a divergent value is a legitimate consumer preset, presets-in-consumers). 5-bite self-test (missing tier / non-monotonic ladder / dark arm not lifting / recipe detached from level seam / dock re-pinned in dark — each MUST flag). The binding π (per-tier composited-fill readback over a busy backdrop, both modes) + the proof:ba-gestalt glass-band verdict ride W-REFLECT3. Bite: change a tier alpha off its canonical value / break ladder monotonicity / detach a --glass-bg site from the level seam / drop the canon-register doc → RED.",
    },
    {
        id: "proof:spa-view",
        cmd: "proof:spa-view",
        tags: ["local", "ci"],
        note: "BB.B7 W-SPAVIEW-CACHE — the published <SpaView :max> bounded view-cache router pane (KeepAlive-is-the-cache/no-fork + :max cap + out-in compositor-only PRM-gated + colocation/publication + a no-fork self-test bite)",
    },
    {
        id: "proof:spring-crisp",
        cmd: "proof:spring-crisp",
        tags: ["local", "ci"],
        note: "B9 NO-OP LOCK: --spring-crisp ABSENT (the >=2-consumer bar UNMET — 1 live speedtest consumer self-hosting a local override). SPRING_PRESETS stays the 5 canonical rows; a future agent cannot slip the token in unaudited (D1-D3 + 2 self-test bites). Flips RED->GREEN-at-mint IF >=2 real surfaces ever land.",
    },
    { id: "proof:aurora-curl-warp", cmd: "proof:aurora-curl-warp", tags: ["local", "ci"], note: "BB.B1 — the OPT-IN Bridson curl-noise flow warp + the shared curlFBM chunk (born-RED→GREEN). The relay §5 B1 .frag arm: aurora's domain warp gains a warpMode:\"curl\" — the divergence-free 2D curl of an fbm potential (Bridson, SIGGRAPH 2007, the SOTA flow-field warp) — as a new uWarpMode==3 branch BESIDE the byte-untouched fbm/cellular/hybrid. THE CARDINAL CONSTRAINT — OPT-IN, DEFAULT BYTE-IDENTICAL: the curl is a new branch gated behind uWarpMode==3 (the default warp paths carry NO curl call) and warpModeFor (the NOISE atom fan-out) NEVER auto-selects curl, so the default config (warpMode:\"fbm\") renders byte-identical and every existing proof:aurora-* gate + the W-AURORA-WGPU parity surface stays green. W1 the shared chunk src/composables/glass/webgl/shaders/flow.glsl.ts exports CURL_FBM_GLSL with a basis-agnostic curlFBM (the (g.y,-g.x) 2D-curl cross-pairing of central-difference partials, calling a host-supplied potentialFBM prototype — the host owns the noise basis, the chunk owns only the curl operator; a pure GLSL string, no value.js import, no uniform decl — the AV.W2 procedural-color.glsl.ts precedent). W2 aurora.frag.ts splices CURL_FBM_GLSL (no forked inline curl), defines potentialFBM against its OWN fbm, and the SOLE curlFBM call is gated behind uWarpMode==3 (every curlFBM call-site counted == the # reachable from a uWarpMode==3 guard; the default fbm/cellular/hybrid branches preserved). W3 the WarpMode union widens +\"curl\", WARP_ID maps curl:3 (the int the .frag dispatches on), AND warpModeFor never returns \"curl\" (the default-unchanged fence). W4 docs/consumer-evidence/curl-fbm.md records the ≥3-consumer booking — consumer #1 LIVE (aurora-curl-warp) + booked #2/#3 (B5 paper-grid-breathe + W-FLOWFIELD). The WGSL arm is the booked procedural tail (aurora.wgsl.ts byte-untouched; warpMode==3 degrades to fbm on WebGPU — never an error, the WebGPU default-smooth parity stays byte-equivalent). + a 6-bite self-test (an inlined basis / a curlFBM call in the default fbm path / a forked inline curl / warpModeFor auto-selecting curl / the union not widened / the evidence doc absent each RED their clause; the good corpus passes — born-RED demonstrated: all 4 witnesses RED on the pre-wave source, 4 violations → GREEN). The binding live-π / WebGPU parity capture rides W-REFLECT3.", },
    {
        id: "proof:nda-decided",
        cmd: "proof:nda-decided",
        tags: ["local", "ci"],
        note: "BB.W-NDA-DECIDE — the founding-chronic TERMINAL-decision lock. The native-drawer-as-asChild row (AT W0-L4 ledger #8, the disposition surface's founding disease) must stay terminally `retired` (or `resolved`) with the full evidence shape — a non-empty rationale (anti-silent-drop), a non-empty successor (the named living destination), a DISCHARGED pendingResolvedBy, and a retiredBy/resolvedBy that resolves to a real docs/tranches/<L>/waves/<id>.md. A flip back to `book`, a blank rationale, an empty successor, a surviving pendingResolvedBy, or a phantom retiredBy REDs the lock — so a future planner cannot re-read the founding prose and re-book a watch on a ghost (the AY.W-NDA §1-D2 hazard the carry realized). Self-proving: every run flags a synthetic disease-state row (book + blank rationale + surviving pending) AND a synthetic retiredBy naming a phantom wave-spec; acceptance is the RED-witness inverse. Born-RED (2 violations at HEAD) → GREEN at the flip. The five-tranche silent ride ENDS — a retired row carries no min-consumers watch.",
    },
    { id: "proof:flow-field", cmd: "proof:flow-field", tags: ["local","ci"], note: "BB.W-VIZ-SUITE.d W-FLOWFIELD — the dot-flow-field source gate: colocation layout + composes useGpuSubstrate (not navigator.gpu direct) + the JS↔WGSL single-math-source round-trip (flowField.ts sampleVelocity transcribed by flow-field.compute.wgsl) + the curlFBM/pointer-velocity consume + the warm-identity default (no teal/navy in library constants) + the story covers the export + a 4-bite self-test. The binding live-π / own-surface DELTA gestalt readback rides W-REFLECT3 (tests-visual/flow-field.spec.ts)." },
    {
        id: "proof:aur-kuwahara",
        cmd: "proof:aur-kuwahara",
        tags: ["local", "ci"],
        note: "BB.W-AUR-KUWAHARA — the DECIDE gate ending the 3-tranche anisotropic-Kuwahara booking (the AY.W-AUR-T5 named-successor the AY EXCISE re-routed the oil/oil-pastel anisotropy + oil-pastel slope residual onto). BUILD branch fired: the SOFT polynomial-weighted anisotropic-Kuwahara finish ships SINGLE-PASS as the OPT-IN medium:'kuwahara' (uMedium==7, default-OFF) — aurora is a PROCEDURAL field, so the operator re-samples sampleBase over the elliptical kernel directly (4 rings x 8 taps), no FBO, off the EXISTING single-pass structureTensorField. W1 the booking is DECIDED-not-ROUTED — the live aurora SOURCE/gate tree (README/DESIGN/RESEARCH/mediums/frag/bridge/presets/arresting) carries ZERO surviving phantom-wave re-book pointer (named-T5-successor / named-successor-kuwahara / staged-or-pending-kuwahara), + the anti-evasion self-test bite: a synthetic re-book string MUST flag the scanner (proven — a planted 'named T5 ... successor' REDs the gate). W2 the decision artefact docs/tranches/BB/audit/W-AUR-KUWAHARA-DECISION.md resolves on disk, names a verdict in {BUILD,RETIRE}, carries the three measured inputs (residual re-measure / multi-pass-cost / single-pass-lever). W3 the BUILD branch landed coherently: the AuroraMedium 'kuwahara' union member + the MEDIUM_ID kuwahara:7 slot + the mediumKuwahara() body + the uMedium==7 guarded-else-if dispatch + the tensor-force + the SOFT variance-weighted blend 1/(1+variance^q) (NOT a hard-argmin pinwheel — the §4.2 anti-regression) + aurora.wgsl.ts BYTE-untouched (a kuwahara config on WebGPU degrades to the smooth core; the kuwahara WGSL is the booked W-AURORA-WGPU-MEDIUMS tail). The smooth default + van-Gogh HERO + oil/oil-pastel mediums are byte-unchanged (opt-in default-OFF). Device-free source-state arm; the binding no-pinwheel orientation-histogram π + the proof:ba-gestalt aurora verdict ride W-REFLECT3. Bite: re-route the residual to AY.W-AUR-T5 anywhere in the live tree -> RED; delete the decision artefact -> RED; remove the mediumKuwahara body/the uMedium==7 dispatch -> RED; a hard-argmin (no soft-blend) -> RED; a kuwahara WGSL body -> RED.",
    },
    {
        id: "proof:aur-metal",
        cmd: "proof:aur-metal",
        tags: ["local", "ci"],
        note: "BG.W-AUR-METAL-FINISH — metal as a MUTUALLY-EXCLUSIVE MEDIUM (uMedium 8/9), dual-ported GLSL+WGSL. M1 ladder widen (AuroraMedium +metal/+metal-gradient, MEDIUM_ID metal:8/metal-gradient:9, kuwahara stays 7, both shader hosts dispatch mutually-exclusively); M2 metal FOLDS (tensor re-plumbs gradient via vec4+packGrad ZERO-new-taps + two-term BRDF streak×crest + coherence gate + height-normal, both backends); M3 the cursor-synth catch crosses to WGSL (reads u.cursor, NO uLightDir); M4 GL fence (guarded else-if smooth-default byte-unchanged, mediumKuwahara/structureTensorField grep-locked, 576-byte struct via cursor.z/.w pad); M5 the achromatic-warm catch fence. Born-RED → GREEN + a 5-bite self-test. Device-free; the binding metal-FOLDS localContrast/cursor-raked-WGSL/no-cold-catch π rides W-REFLECT3 + proof:ba-gestalt aurora.",
    },
    {
        id: "proof:aur-image",
        cmd: "proof:aur-image",
        tags: ["local", "ci", "release"],
        note: "BG.W-AUR-IMAGE-SOURCE — the blurred-image source arm. Device-free SOURCE parse (born-RED→GREEN + 6 self-test bites). I1 ONE shared texture-upload primitive (textureUpload.ts decode + both explicit-flag legs; WebGL2 leaf auroraImageSource.ts + WGPU wgpuSetup.ts route through it; no raw texImage2D/copyExternalImageToTexture outside it); I2 source:'palette'|'image' is a CONSTRUCTION-TIME program permutation (separate compiled programs, no uSource branch); I3 bounded fixed 24-tap zone-blur kernel (3×8, compile-time const loop bound, both backends); I4 one-colour-source proxy (vividness floor source-agnostic + linear-light + shared procedural-color chunk) — the real chromium-vs-webkit capture-pair parity rides W-REFLECT3; I5 palette-default byte-identity (source OPTIONAL, palette programs sampler-free, image WGPU lane is its own 288-byte struct, palette 576 untouched); I6 deriveAurora scheme/lBand luminance option (ASK-GU-AURORA-SCHEME-LUMA) acted-on. The binding photo-dissolves-into-drift π both engines both modes rides W-REFLECT3 + proof:ba-gestalt aurora.",
    },
    {
        id: "proof:precept-current",
        cmd: "proof:precept-current",
        tags: ["local", "ci"],
        note: "BB.W-PRECEPT-SYNC — the design-idioms.md ↔ src/styles/ HOME-MAP consistency gate (born-RED 6 violations @ HEAD → GREEN; the P-5 doc-drift class closed for the one most binding design doc). DERIVED, never a hardcoded file list: it parses the §3 home-map file cells + example tokens LIVE, builds the live recipe census (every @utility name + top-level .recipe class with its def-site, comment-stripped), and reads the cascade @import chain from index.css. THREE falsifiable witnesses + a passing inline self-test (the proof-design-idiom-localization comment-strip + pure-detector house pattern): W1 no DELETED recipe survives as a live §3 example — any example token of recipe-name shape with ZERO def site in src/styles/ REDS (caught btn-audacious/-gold + popover-animate/slide-in-from-side, all deleted at BA.W-GLASS-CAL/BB.W-LIQUID-REVEAL; LIVE-derived, never a hardcoded recipe string; a bare single word in a [data-*]/--token DESCRIPTIVE prose cell is a data/state value, not a recipe — skipped). W2 every shipped SHARED-register idiom file is in a §3 file cell — derived from the cascade-ledger SELF-TAGGING (a top-level index.css partial whose ledger comment self-describes it a shared register/axis/recipe: feedback-tone rung 7a 'tone register', menu rung 11a 'menu-row register'); the glass/* glob covers surface-axis; per-component partials are NOT flagged (the places-an-idiom vs pure-token distinction, the Triumvirate overfitting-trap resolution). W3 every §3 file cell resolves on disk (a glob cell resolves iff its dir exists). The self-test: a SYNTHETIC stale home-map (a btn-audacious example + a missing feedback-tone row) FLAGS both, the refreshed doc flags NEITHER. tags local+ci (static doc/source check, no Playwright). Bite: a deleted-then-still-named recipe / a new shared register with no row / a dangling file cell → RED.",
    },
    { id: "proof:concentric", cmd: "proof:concentric", tags: ["local", "ci"], note: "BD.W-CONCENTRIC-RELIEF — the level-set TOPOGRAPHIC CONTOUR viz source gate (REWRITTEN from the retired radial-Fourier ring engine; no-backwards-compat). L1 the SHARED level-set field source (levelField.ts sampleHeight reads heightField over waveFlow on the shared waveField+curlFBM — no re-forked basis); L2 the ring engine is GONE everywhere (src+manifest+docstrings: a re-introduced sampleRingField/ringField/axisRatio/ellipsoidal* symbol OR 'ellipsoid rings' prose REDs); L3 the byte-frozen contourInk(fN,hw) (WGSL↔GLSL identical IQ contour DE, FED a width param); L4 the pure+OPAQUE finishing layer (alpha=1, tanh hypsometric tone, analytic hillshade at the SHARED HILLSHADE_E epsilon, KEPT samplePaletteLin, ONE color path — no rgb*ink transparent bleed, no uMode color branch); L5 the warm-DIVERGENT identity (no hue ∈ [180,270], multi-bin WARM_IDENTITY_PALETTE — a single-bin amber wash REDs); L6 the device-free JS↔WGSL↔GLSL transcription witness; plus colocation/useGpuSubstrate-compose/WebGL2-fallback-declared/warm-leading-story + an 8-bite self-test. The binding painted-pixel ΔE live-π (tests-visual/concentric-relief.spec.ts, both modes + webkit) is the cardinal device-free-vs-live-GPU split." },
    { id: "proof:strict-freshness-armed", cmd: "proof:strict-freshness-armed", tags: ["local", "ci"], note: "BB.W-DELTA-RESHOOT W4 — the --strict-freshness ARM-BITES self-test (the authored-but-never-invoked clause, ARMED + made load-bearing). proof-live-verified-ledger.mjs:100 has defined STRICT_FRESHNESS = argv.includes('--strict-freshness') since AZ.W-GATES, but ZERO registered gate row / CI job / close script ever passed it — a latent flag that never fired at a real close (the L14 no-op class: arming a flag nothing exercises). This gate runs the ledger as a SUBPROCESS over a synthetic fixture tranche (ZZSTRICT — a stale own-surface DELTA whose declared all-zero surface-hash can never match the real content hash, staged + cleaned up every run) TWICE and asserts the binding differential: ARMED (--strict-freshness) over the stale row exits 1 (the bite fires), BARE exits 0 (graced — the documented backfill window). The exit-code DIFFERENTIAL is the load-bearing witness — a regression that drops --strict-freshness from the close arm makes armed==bare (both 0), the bite silently un-arms, which the differential-load-bearing assertion reds. 4 checks: armed-bites-stale-row (exit 1), bare-graces-stale-row (exit 0), differential-load-bearing (armed≠bare AND armed=1 AND bare=0), armed-bite-is-freshness (the bite names the stale/freshness violation, not an unrelated red). Born-RED witness: the bare arm over the stale row exits 0 — proving the un-armed close is the no-op the audit caught. Pairs with the registered proof:live-verified-ledger:strict close arm (runs --tranche=AY --strict-freshness && --tranche=BB --strict-freshness — the frozen-AY re-shot tracker run AND the active-BB run in ONE named arm, mirroring the :ay/:az/:ba shape, no forked parallel script). The freshness binding cannot silently un-arm again.", },
    {
        id: "proof:crossrepo-asks",
        cmd: "proof:crossrepo-asks",
        tags: ["local", "ci", "release"],
        note: "BB.W-CROSSREPO-ASKS — the cross-repo asks-and-consumes relay gate (born-RED→GREEN; the pure-detector house pattern, mirroring proof-atlas-ab.mjs / proof-claude-structure-sync.mjs). STRUCTURAL/coordination wave — NO π, NO proof:ba-gestalt (zero pixels). Locks the formalized relay docs/tranches/BB/coordination/asks-and-consumes.md: W1 the relay covers EVERY §A3 by-name ask (the no-silent-drop completeness law — the expected ask-set is DERIVED from the live BB-AMENDMENT-crossrepo.md §A3, an amendment-liveness check, NOT a frozen literal; the §A3 token-anchors OKLCH-spectrum-helper/springTimingFunction/KF-OSCILLATOR/AW.W7 must be covered) AND the AW v3 §5 items (A1-A3/C1-C4/B1-B9) each carry a terminal disposition; W2 every ask names a CONSUMER wave that EXISTS in docs/tranches/BB/waves/ (W-BORDER-PROGRESS/W-DECK/W-EASING-PRIMITIVE/W-SPINE-LATEST→BB.W-PEER-SPINE.md fold/W-LINEAGE-PROBE/W-DOCK-MORPH-FAMILY — a phantom consumer reds) + the disposition vocabulary (SATISFIED/BOOKED/NO-OP-WITHDRAWN/AFFIRMED); W3 the §A4-form dep graph + the consume cadence (fold-all→4.1.0 + the per-ask consume-and-delete triggers) + the AZ-form freshness header (glass-ui HEAD sha + the three sibling versions) + the green-handshake state + the mismatch-flagging discipline; W4 the content-only foreign-tree fence (inv-26) by construction — every wave File Bound is UNDER the glass-ui tree (no ../value.js/../keyframes.js/../speedtest/../slides path; a future cross-repo wave editing a sibling directly writes a ../ path the gate reds) + the relay records the fence. + a 4-bite self-test (a synthetic dropped-ask / phantom-consumer / sibling-path / missing-disposition each MUST flag). Bite: drop a §A3 ask, name a phantom consumer wave, add a sibling-tree path to the bounds, or strip the disposition vocabulary → RED.",
    },
    { id: "proof:lineage-probe", cmd: "proof:lineage-probe", tags: ["local", "ci", "release"], note: "BB.W-LINEAGE-PROBE — invariant 11's registry-consumer probe MECHANIZED (the d6-fork lesson made a gate). The SECOND consumer-truth source after the disk import-graph census: L1 the live `npm view @mkbabb/glass-ui versions/dist-tags` probe (OFFLINE-SAFE — pinned-snapshot fallback incl. the 3.11.x/3.12.0 fork-lineage line, never a false-GREEN, the proof:peer-conformance precedent); L2 the prune-row consumer check (a retired subpath/export registry-published OR constellation-consumed yet carrying no recorded fold/subsume/migration line FAILS the close — the d6 silent prune forbidden; reads the MIGRATION.md RETIRED lines + the disposition register `retired` rows, never re-rolling proof:no-retired-survivor's corpus); L3 the constellation-completeness assert (constellation.mjs CONSUMERS enrolls slides + the registry-lineage Connectivity Atlas sci-report/atlas — the blind spot cannot re-narrow); + the synthetic always-live /dock-RETIRED self-test bite. proof:constellation-spine clause 6 asserts dependency-order-book.md records the discipline; THIS gate owns the live probe (the two never re-implement each other). Born-RED at HEAD (corollary un-armed) → GREEN. Bite: a live-consumed prune row with no disposition reds (L2); a dropped d6 consumer reds (L3); the synthetic /dock-RETIRED row must flag (W4)." },
    { id: "proof:doc-override-idiom", cmd: "proof:doc-override-idiom", tags: ["local", "ci"], note: "BB.W-DOC-FRESHEN — the Consumer-wiring CSS example (CLAUDE.md + README.md) overrides the --glass-blur-resting-radius PRIMITIVE (not the composed --glass-blur-resting, which threads * --glass-level + saturate), the cited radius is live-read from glass.css (never a hardcoded number), the two copies are byte-parity, and the override-the-primitive consumer canon is recorded; born-RED on the blur(12px) composite-override form" },
    {
        id: "proof:eyebrow-union",
        cmd: "proof:eyebrow-union",
        tags: ["local", "ci"],
        note: "BB.W-EYEBROW-UNION — the FOUR mono-caption eyebrow recipes union onto ONE register (born-RED→GREEN). The library spoke four dialects of one word (.section-label, @utility text-mono-caption, .glass-menu-section-label, text-admin-label) at three tracking values + two weights. W1 the vocabulary is declared ONCE — `@utility text-mono-caption` is the color-agnostic eyebrow (font-mono + type-caption + uppercase + tracking-CAPS) and `.section-label` COMPOSES it via `@apply text-mono-caption` + the muted ink (no independent re-declaration); W2 text-mono-caption no longer carries the drift (no --type-tracking-wider, no font-weight:500 — reconciled to --type-tracking-caps, color UNBAKED so the 17 text-foreground pairings keep their ink); W3 the menu caption folds — the --menu-section-* knobs DEFAULT to the canon tokens (so the un-overridden .glass-menu-section-label resolves byte-equal to the canon) AND menu.css keeps the --font-mono/--type-caption/--border-hairline/--menu-section-* proof:menu-glass W2 surface; W4 the text-admin-label/section-label double-stack collapsed (35 demo sites — the spec cited 4, HEAD had 4 + 31 micro-tinted breadcrumbs; the §0 RE-GROUND drift, recorded). text-admin-label STAYS a distinct 0.625rem sub-control micro register (a KEEP, not an eyebrow duplicate). The BINDING painted truth is tests-visual/eyebrow-union.spec.ts (the four enrolled surfaces resolve byte-equal font/size/tracking/transform, both modes). Bite: fork a fifth eyebrow recipe, re-introduce the wider-tracking/weight-500 drift, drift the menu knob defaults off the canon, or re-stack section-label+text-admin-label → RED.",
    },
    {
        id: "proof:pager-ring",
        cmd: "proof:pager-ring",
        tags: ["local", "ci"],
        note: "BA.W-PAGER — the unified pager-dots register in a glass ring (born-RED 10→GREEN). W1 .glass-pager-ring in glass/surfaces.css composes the glass-floating recipe (--glass-bg-floating + --glass-blur-floating + --radius-pill, NEVER opaque bg-card) + PagerDots composes it on ring default + dist confirms var(--glass-bg-floating); W2 the CarouselPager counter OFF bg-card composes .glass-pager-ring (the dark rgb(28,25,23) slab dead); W3 ONE register — CarouselDots.vue GONE, <PagerDots> exists, the ring recipe has >=2 composers (dots host + counter), the --pager-dot-* preset tokens declared; W4 the /pager-dots subpath publishes + the adopt-book names the slides DeckPager consumer #2. The BINDING painted truth is tests-visual/pager-ring.spec.ts. Bite: re-introduce bg-card on the counter, un-retire CarouselDots, or drop a ring composer -> RED.",
    },
    {
        id: "proof:icon-chip",
        cmd: "proof:icon-chip",
        tags: ["local", "ci"],
        note: "BA.W-ICON-CHIP — the <IconChip> section-color POP primitive (born-RED -> GREEN; POP-1/POP-2/POP-3; the chip recipe was a hand-rolled inline :style paste copy-pasted across icons.vue/empty-states.vue/auth-shell.vue + the MetricCell glyph-tint, NO owning primitive). Device-free SOURCE arm (the BINDING painted truth is the π readback tests-visual/icon-chip.spec.ts + the W-ICON-CHIP-DELTA capture — the rendered chip byte-faithful to the reference register in BOTH modes + the proof:ba-gestalt verdict): W1 the primitive OWNS the color-mix(... var(--section-color-N)/tone 25% ...) backplate + full-chroma glyph recipe (positive token+25%-stop assert, not a name check); W2 the chip<=glyph ratio is enforced IN the component (the max(... * --icon-chip-glyph-ratio, ...) floor so a tiny size cannot collapse the plate under the glyph — d2 structural); W3 the three axes prop-gated + disco-FREE (duotone fill / smooth-glass bloom referencing NO sparkle-sweep/btn-audacious/disco-grain / reveal composing vReveal + a PRM guard); W4 the four pastes GONE (zero inline color-mix(in srgb, var(--section-color-${...}) outside icon-chip/ — the COMPLETE-consolidation floor); W5 published (./icon-chip export {types,import} + typesVersions + src/subpaths/icon-chip.ts + IconChip/IconChipProps on src/api/index.ts); W6 born >=2 live consumers (icons + empty-states + auth-shell + MetricCell). The chip is the ONE event vehicle so proof:suffuse asserts against one component not N pastes. Bite: re-paste the inline recipe, oversize the plate off the ratio floor, re-introduce a retired disco utility on the bloom, or drop a consumer below 2 -> RED.",
    },
    {
        id: "proof:easing-primitive",
        cmd: "proof:easing-primitive",
        tags: ["local", "ci"],
        note: "BB.W-EASING-PRIMITIVE — the published <EasingPicker>/<EasingConfigurator> on /easing, the boundary law made code (born-RED -> GREEN; the C-3 fold LANDED — the curve-gallery's BezierEditor + StepsEditor were two demo-only interim halves of ONE missing primitive). Device-free SOURCE arm (the BINDING painted truth is the π readback tests-visual/easing-primitive.spec.ts + the W-EASING-PRIMITIVE-DELTA capture — the picker plots the REAL value.js twin over --motion-accent, both modes, the re-parseable readout — + the proof:ba-gestalt motion-band verdict, BA inv-4; a source-green/visually-broken close is the AZ P-1 class). W1 the primitive exists ONCE on /easing (src/components/custom/easing/ with the colocation dir convention — composables/useEasingPicker.ts + constants.ts + README.md), published via src/subpaths/easing.ts + the package.json ./easing exports {types,import} entry + the typesVersions row (the subpath-publication-is-binary invariant — a primitive in src/ that does not PUBLISH fails, the K.WS silent-miss class); W2 THE BOUNDARY LAW holds — useEasingPicker COMPOSES the four value.js curve callables (steppedEase/jumpTerms/bezierPresets/CSSCubicBezier) AND re-implements NEITHER a hand-rolled staircase evaluator (Math.floor/ceil(t*steps)) NOR a cubic-bezier Newton-solver (solveCubicBezier/newtonRaphson/cubicBezier) inline (the curve MATH is value.js's — kf-AFFIRMED: curve MATH = value.js · playback = keyframes.js · the editor = glass-ui); W3 NO FOURTH FORK — the two demo editors are DELETED (curve-gallery/{StepsEditor,BezierEditor}.vue absent, clean break no alias) AND curve-gallery.vue imports <EasingPicker> from the LIBRARY subpath (@mkbabb/glass-ui/easing or src/components/custom/easing), zero re-pasted *Editor.vue fourth fork under the curve-gallery dir (the C-3 discipline); W4 the >=2-consumer bar recorded by construction — curve-gallery (consumer #1) binds the picker in BOTH modes (a mode=\"bezier\" AND a mode=\"steps\" binding — two live in-repo bindings so the bar does not hang on the cross-repo consumer alone) AND PROGRESS + the DELTA record value.js's GradientPane consumer-#2 by name (the cross-repo CONSUME contract, foreign-tree fence — no value.js edit); W5 the canon + boundary law recorded — CLAUDE.md carries the <EasingPicker> /easing section + the boundary law + the C-3 fold DISCHARGED, design-idioms.md homes the editor-on-Configurator idiom (§11), the EasingPicker/EasingConfigurator/EasingPickerMode types publish to src/api/index.ts. The value.js-BEARING /easing leaf ships OFF the value.js-free root barrel (the /motion-curves SCC-trap precedent). Bite: hand-roll the staircase/bezier math inline / leave a demo editor fork survivor / single-mode binding / drop the GradientPane consumer-#2 record / omit the ./easing export → RED.",
    },
    {
        id: "proof:handmark",
        cmd: "proof:handmark",
        tags: ["local", "ci"],
        note: "BA.W-HANDMARK — the d6 hand-voice family RE-LANDED on /handmark (born-RED -> GREEN; A-2 + the C-cargo on ONE wobble engine). Device-free SOURCE arm (the BINDING painted truth is tests-visual/handmark.spec.ts + the W-HANDMARK-DELTA capture — the highlight visibly multiplies against the page behind it, the marks read HAND-made over the paper register, the morphology amplitude scales — + the proof:ba-gestalt verdict): W1 the colocation-shaped family ships (HandMark.vue + brush/geometry/ink/texture/freehand + composables/useHandMark + constants.ts + README, the index barrel exports HandMark/InkMark/BRUSHES, the /handmark subpath mirror, api/index.ts seats HandMarkProps, the B-1 content-node Range measure anchor lives — document.createRange + setEndAfter + baselineFrac); W2 the DEC-8 fold is clean (GlassUnderline + custom/underline/ + src/subpaths/underline.ts GONE, grep-negative import/use survivor in src/+demo/, api no longer exports GlassUnderline* — prose mentions of the retirement allowed); W3 the highlighter's FIVE deltas LIVE (ribbon:'hull' (b) + non-zero taper (c) + cap:'square' (d) in the preset; ink.ts plumbs b.cap onto InkPath.cap (d); the SFC binds :stroke-linecap NOT a hardcoded round (d); the .hm root carries NO isolation:isolate so the multiply reaches the page (e); the band seats LOW off HIGHLIGHT_RISE not the box-middle cy (a)); W4 the morphology is natural+seeded — BD.W-HANDMARK-AUDIT RE-INVENT: naturalUnderlinePoints is a φ-incommensurate fractal value-noise (the seeded-sinusoid + the period constants NATURAL_AMP_FRAC/PERIODS_MIN/PERIODS_MAX are DELETED, no-legacy); geometry.ts carries naturalUnderlinePoints + NOISE_AMP_FRAC (scale-relative amp) + NOISE_OCTAVES/NOISE_F0/NOISE_PHI (the irregular φ-octave spacing); the binding spacing-CV discriminator rides proof:handmark-audit; the SEED RECONCILE — mulberry32 from the HOUSE leaf utils/prng, NEVER from @mkbabb/pencil-boil, the ONE mulberry32 source); W5 the voices differ (BRUSHES carries boil/pencil/crayon distinct rows, the everything-renders-pen no-op dead); W6 the three-underline fence (.paper-ink-mark stays STRAIGHT — no feTurbulence/perturb on its register; CLAUDE.md records the fence + the family). Bite: revert the highlighter to ribbon:'stroke' / re-hardcode stroke-linecap:round / re-add isolation:isolate / import mulberry32 from pencil-boil / leave a GlassUnderline import survivor / wobble .paper-ink-mark -> RED.",
    },
    {
        id: "proof:ba-animate",
        cmd: "proof:ba-animate",
        tags: ["local", "ci"],
        note: "BA.W-ANIMATE — the shipped motion facilities wired onto real demo surfaces (born-RED; the animation-targets lane verdict: 'the substrate is world-class, the consumption is a museum'). Device-free SOURCE arm (the BINDING painted truth is the π arm tests-visual/ba-animate.spec.ts + the proof:ba-gestalt motion-surface whole-page verdict, BA inv-4 — a source-green/visually-still-flat close is the AZ P-1 class this tranche exists to fix). The defect is PURE non-consumption (ANIM-1..ANIM-5): every engine (scroll-driven.css/transitions.css/useCountup/vReveal/useScrollProgress/useStaggerReveal/useIntersectionPause) ships complete+PRM-gated+tested but is a demo-of-itself with ZERO real-surface consumers. This is a WIRING wave — the substrate is fence-locked, never edited. W1 the route page-enter: AppShell's <RouterView v-slot> mount is wrapped in <Transition name='fade-slide'> (a transitions.css recipe, SCOPED to the v-slot block so the morph-stage/dialog <Transition>s don't false-green) — a route change fires ONE coherent page-enter, not a hard-cut nor a per-element cascade; W2 the scroll-progress bar: a .scroll-progress element in the <main> region with --scroll-progress-scroller bound to a named scroll-timeline on <main> (NOT the default root — the route owns scroll), driven by the native scroll() timeline on the compositor; W3 the metric count-up: the metric-cell audacious display figures (text-display-mega/-audacious) carry [data-countup] wired through useCountup on the SETTLE register (easeOutCubic, no overshoot) gated by useIntersectionPause so the tween fires on scroll-into-view not mount-offscreen (the half-wire — [data-countup] with no engine, or an ungated engine — fails); W4 the negative fence (proportion+register): the hero <h1> entrance is on a SETTLE/smooth register never naming --spring-bouncy/--spring-snappy (the §6 'audacious type arrives with gravity not bounce' doctrine), no wired surface declares transition:all or hand-rolls an @keyframes/requestAnimationFrame outside the named recipes. Bite: drop the <RouterView> <Transition> / point the bar at root / half-wire the count-up (no engine or no intersection gate) / bounce the hero title / smuggle a transition:all or hand-rolled @keyframes/rAF onto a wired surface → RED.",
    },
    {
        id: "proof:stage",
        cmd: "proof:stage",
        tags: ["local"],
        note: "BA.W-STAGE — the demo backdrop system (born-RED): every route staged over a per-category background, glassiness demos float over the live field, the dock demos sit over ONE offscreen-paused backdrop, the aurora `breathing` register made honest. Device-free SOURCE arm (the BINDING painted truth is the π arm tests-visual/stage.spec.ts + the proof:ba-gestalt staged-demo whole-page verdict, BA inv-4 — a source-green/visually-flat-void close is the AZ P-1 class this tranche exists to fix). The defect: the storybook was an 80%-blank near-black void (81/101 keyless routes fall to the AppShell flat bg-background), glassiness demos sat over opaque bg-card plates occluding the field (BG-2), the dark grid/paper washes vanished behind the card, the dock demos sat on flat bg-card/40 panels, the aurora breathing register was DEAD (all drift terms zero). W1 every route resolves a NON-EMPTY background kind ∈ {aurora,constellation,fourier,grid,paper} — declared on the s() row OR inherited from the CATEGORY_DEFAULT_BG per-category map (POSITIVE per-row + every-category-has-a-default, not a count-rose check; a single keyless row reds); W2 ShowcaseFrame carries a `field` tier whose tierClass drops the opaque plate (bg-transparent/border-transparent, no bg-card) WHILE resting/quiet KEEP bg-card (the opaque-atom host stays — a blanket-transparent is a regression) AND glass-material.vue uses tier=\"field\" (the BG-2 fix at the chassis); W3 DockStage.vue exists + composes ONE shared <Aurora> (offscreen-paused by construction via the useIntersectionPause + content-visibility seam) + the three dock stories (overview/layers/morph-showcase) reference it with the flat bg-card/40 panels GONE (consumed-by-3 + flat-panel-absence, not file-exists); W4 the aurora breathing MOTION_FIELDS atom carries NON-ZERO nucleiDrift/paletteDrift/warpDrift (perceptible drift, not the dead ±2.5% pulse) AND aurora.frag.ts is byte-untouched (the GL fence held — the fix is the JS motion TABLE, valuejs-fold A-4). The dark grid/paper static-wash recalibration (story-hero.css .dark arm lifted 9%/16%→18%/30% + a warm paper base) + the contained-substrate dark ceiling lift (StoryHero opacityCeiling dark-aware) + the token-tour contrast fields (checkerboard/vivid reference behind translucency swatches) + the W-SUFFUSE2 h1-rung diff (text-heading→text-title) + the W-ANIMATE chassis hooks ([data-scroll-reveal] section stagger + the hero fade-rise on the SETTLE register) are applied on the owned chassis files. Bite: leave a route keyless / drop a category default / re-introduce bg-card on the field tier / drop tier=\"field\" from glass-material / un-consume DockStage from a dock story / leave a bg-card/40 flat panel / zero the breathing drift / edit aurora.frag → RED.",
    },
    {
        id: "proof:fading-scroll",
        cmd: "proof:fading-scroll",
        tags: ["local", "ci"],
        note: "BA.W-FADING-SCROLL — the scroll-state-driven edge-fade gate (born-RED; R8-08 'a fading scroll list… compatible with vertical scrolling too'). Device-free SOURCE arm (the PAINTED at-rest-sharp truth is the π arm tests-visual/fading-scroll.spec.ts + the W-FADING-SCROLL-DELTA capture): the static `.scroll-fade-*` masks (utilities/base.css) feathered BOTH edges UNCONDITIONALLY with zero scroll-state knowledge — at scrollLeft=0 the LEFT edge masked the first card's chrome (the 'Shy' defect), the RIGHT edge masked even with no trailing overflow; the only scroll-aware path was the bespoke binary PresetPickerRow JS trapped in one demo file. The fix is `<FadingScroll>` (subpath /fading-scroll), the dual-path single-writer model (mirrors scroll-driven.css): W1 the native scroll(self) timeline drives a registered --fade-start custom whose animation-range opens at 0..--fade-scroll-width (feathers in only past scroll>0); W2 --fade-end ramps OUT over the last --fade-scroll-width (sharp at the end) + the JS fallback gates on remaining trailing overflow; W3 both axes one primitive (scroll(self inline) for x, scroll(self block) for y); W4 useFadingScroll feature-detect-gates OFF under native scroll() support (no double-feather) writing the SAME customs; W5 the four owned consumers (blob mood row, aurora controls column, SegmentedTabs overflow=scroll, PresetPickerRow) migrated + the bespoke --mask-l/--mask-r/--edge-mask machinery DELETED; W6 the ONLY surviving static .scroll-fade-* references are the named C2/C3 configurator pair (held by W-CONFIG-CHASSIS until the orchestrator's Batch-close retire commit — the W6 invariant flips GREEN automatically when that commit lands). Bite: re-introduce an unconditional both-edge gradient / un-gate the JS fallback (double-feather) / smuggle the static utility into a new strip / re-add the PresetPickerRow bespoke JS → RED.",
    },
    {
        id: "proof:emission",
        cmd: "proof:emission",
        tags: ["local", "ci"],
        note: "BA.W-EMISSION — the PRODUCER-side self-emission gate (born-RED 3/9 -> GREEN 9/9; the valuejs-fold register-B / P9 class). Reads the BUILT dist/glass-ui.css + the /styles cascade (carries the build dependency, like profile:budget — run npm run build first). The BINDING painted truth is the pi arm tests-visual/emission.spec.ts (the bounded dropdown's real computed maxHeight + in-viewport bottom + inner scroll, the md-track geometry, the spectrum thumb <=0.5x track, the seeded ghost silhouette). The dead @source ../components (the .d.ts-only dist/components mirror) re-points to ../*.js (the flat compiled dist/*.js chunks); the Select collision-bound + the Slider size axis move OFF dead arbitrary-bracket utilities into precompiled/scoped CSS that SHIPS. Bite: re-point @source at a non-js mirror, re-introduce a dead bracket geometry class, or drop the select/slider shipped rules -> RED.",
    },
    {
        id: "proof:goo-redress",
        cmd: "proof:goo-redress",
        tags: ["local", "ci"],
        note: "BA.W-GOO-REDRESS — the goo studio's renderer half (born-RED). Two falsifiable SOURCE witnesses (the BINDING visual truth is the pi arm tests-visual/goo-redress.spec.ts): W1 the smin BRIDGE rides the WORST-CASE orbit, not the nominal — the uSmoothK upload scales by orbitWiden = min(1.25, 1 + bridgeGap/nominalBand) with bridgeGap referencing worstOrbitDist = orbitRadius x 1.2 x (1+eccentricity); POS_SCALE held; the uMaxReach pad sums the widened band; AND proof:blob-smin-normalized stays GREEN (the widen cannot green by over-inflating past the calm-lean ceiling). W2 pointer activity WAKES the parked loop — a watch on the pointer active signal reaching the renderer wake handle exists in GooBlob.vue (the first hover repaints same-frame, no accumulated-delta lurch). Bite: drop the worst-case coupling, the POS_SCALE, or the wake watch -> RED.",
    },
    {
        id: "proof:glass-cal",
        cmd: "proof:glass-cal",
        tags: ["local", "ci"],
        note: "BA.W-GLASS-CAL — the blur dial-back + the disco retirement + the per-spring clock (born-RED -> GREEN; the comment-strip pure-detector house pattern). The BINDING visual truth is the pi gestalt readback (tests-visual/glass-cal.spec.ts + W-GLASS-CAL-DELTA.md + the proof:ba-gestalt dock/CTA/chip verdict, BA inv-4 — per-mechanism greens do NOT close a visual wave). BLUR: B1 the six --glass-blur-*-radius primitives each STRICTLY below their pre-wave value (10/12/16/15/11) and within the AV.W7-F2 8-15px band, wash unchanged at 1px (the ~15-20% uniform pull → 8/8/13/13/9; resting pulled 10→8 at BG.W-GLASS-BLUR-PEER to mint the ONE unified 8px material). PEER LOCK (BG.W-GLASS-BLUR-PEER): dock·button·default-Card·menu-row all resolve the SAME blur(8px) RADIUS LEG — --glass-blur-btn aliases --glass-blur-resting, --dock-surface-blur reads --glass-blur-resting, the default-Card reads --glass-blur-quiet, the menu-row binds the quiet tier; the resolver is alias-following + locks only the radius leg (the per-tier saturate/brightness companions are EXCLUDED), with a self-test bite (HEAD floating-13px button + dock-9px dock both RED, the collapsed 8px peer GREEN); the more-glass DEEP register is the hero opt-in only. B2 the @2dppx overlay restore pulled below 24px (the ~20 target); B3 the WRONG AXIS untouched (anti-overreach) — --glass-level + every per-rung saturate()/brightness() companion byte-intact AND the W-DARK-MATERIAL dark-arm.css dark companions preserved (radius-only). DISCO (H2a arm a — gold survives CALM): D1 the recipe family GONE (no @utility btn-audacious / btn-audacious-gold, no @keyframes sparkle-sweep / btn-gold-bg-sweep, no --duration-sparkle / --glass-grain-opacity-disco); D2 no live btn-audacious class consumer in src/ + demo/ (comment-stripped); D3 the dock-tab primary tier collapsed onto the plain glass hover register (no grain/--phase-color radial/[data-phase]::before halo) + the DockTabButton.vue auto-attach removed; D4 toggle-chip on §6 (no duration-150/raw ease-out; a --spring-smooth scale lift); D5 the FENCE held (anti-overreach) — .gold-shimmer + the --glass-specular registers STAY. SPRING CLOCK (Unit 3): S1 the per-spring --spring-<name>-duration vocabulary minted (the analytic 2%-band envelope settle, GENERATED from the SPRING_PRESETS (response,ζ) table — smooth=0.36 snappy=0.34 bouncy=0.69 gentle=0.44 dock=0.28); S2 no --spring-* easing rides a generic --duration-* clock in the swept src/styles files (the anti-recurrence floor). Bite: revert a radius / drop the @2dppx pull / drift --glass-level or a companion / re-introduce @utility btn-audacious / restore the dock phase-grain / restore the chip duration-150 / drop a --spring-*-duration / leave a spring on a generic clock -> RED.",
    },
    {
        id: "proof:glass",
        cmd: "proof:glass",
        tags: ["local", "ci", "release"],
        note: "BG.W-DEEP-GLASS-DECIDE (GA-7) — the F2 Glass family gate, seeded with its FIRST arm `deep-glass-decided` and growing one clause per F2 wave (the family-gate consolidation, R3 taxonomy). ENDS the 5-tranche deep-glass chronic (BB->BC->BD->BE->BF->BG) with a MEASUREMENT, not a 6th re-book: src/styles/tokens/glass-deep.css carries a TERMINAL verdict header (`landed-20px` OR `retired-at-16px-cost-<N>`, NEVER `booked`). The BG decision: RETIRE at 16px — profile:budget is byte-measuring (a 16->20px token bump is delta-0 gzip bytes, per-frame-BLIND), so it can NOT fence a super-linear-past-16px backdrop-filter over the deep tier's live animated backdrops; 16px IS the substrate's ceiling (IDENTITY not debt), the saturate already at the Apple 1.8. The proof:nda-decided terminal-lock shape (comment-strip + pure-detector house pattern; a --self-test arm proven every run): D1 the machine-parseable `DEEP-GLASS-DECIDED:` verdict marker is present exactly ONCE and terminal (a booked/absent/malformed state REDs); D2 ZERO surviving book/booked re-booking prose in glass-deep.css (the anti-6th-re-book fence); D3 verdict/value consistency — the shipped --glass-blur-deep-radius agrees with the verdict (16px retired / 20px landed) so a header can never diverge from the tier that ships. Born-RED at HEAD (no marker + surviving BOOKED tokens) -> GREEN at the decide. The paint arm (IF landed: deeper-reads-warm-cream on hero+dock) is the wave's own non-authoring close. Bite: flip to booked / drop the marker / leave BOOKED prose / bump the radius off the verdict -> RED. + BG.W-GLASS-REGISTER-UNIFY adds two device-free arms: `glass-fill-home` (R9 — the applied `@utility glass-fill` tint-recipe HOME in glass/surfaces.css is declared ONCE, composes the W55 oklab seam over the per-element `--glass-fill-rung`, paints `background: var(--glass-fill)`, and has ≥1 `@apply glass-fill` consumer — the substitution-trap kill; born-RED with no utility → GREEN at the mint) and `safari-blur-var` (the vite.style-assets.ts `bdfDeclRe` webkit-backdrop matcher, extracted + FUNCTIONALLY tested: MUST match `backdrop-filter: blur(var(--x, 8px))` so Safari ≤17 gets the `-webkit-` pair on the `.glass-top-layer` entry, MUST still match 1-level `var()`, MUST NOT match an @supports prelude; born-RED where the single-level `\\([^()]*\\)` value class failed `blur(var())`). + 6 new self-test bites (4 A1 + 2 SW). + BG.W-GLASS-DYNAMICS adds the `glass-dynamics` arm (GD1 the resting NEUTRAL specular hairline as the read-carrier at the demoted blur — an inset warm-cream box-shadow + an opacity `max()` floor on `--glass-specular-rest-hairline`; GD2 the neutral fence — the resting hairline reads the RAW `hsl(40 35% 92%)`, NEVER `--glass-specular-core`/`--glass-accent`/`--glass-backdrop-hue`, prismatic reserved for WS6; GD3 the iOS-27 backdrop-HUE sample seam — `--glass-specular-core` folds `var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%)`, the 2nd chromatic pair, bounded + NEUTRAL by default; GD4 the press-couple soft-gated on the ONE `--glass-btn-press-t` channel, CSS base `--specular-intensity` max() + useSpecularPointer.ts optional `press` fold, no forked press var). Born-RED at HEAD (5 violations) -> GREEN at the edit; + 9 glass-dynamics self-test bites.",
    },
    {
        id: "proof:glass-idiom-factor",
        cmd: "proof:glass-idiom-factor",
        tags: ["local", "ci", "release"],
        note: "BG.W-GLASS-IDIOM-FACTOR — the DRY plate-tint recipe declared ONCE + the reader-census-at-landing net-neutral guard (born-RED -> GREEN; the comment-strip + pure-detector house pattern, mirroring proof-glass-accent.mjs / proof-glass-cal.mjs; a self-test bite proven every run). The five-rung surface ladder (.glass-{wash,quiet,resting,floating,overlay}) each composed the SAME element-level oklab tint INLINE (5 byte-identical color-mix(in oklab, var(--glass-bg-<rung>), var(--glass-tint-source) var(--glass-tint-strength)) pastes). This wave factors the recipe into ONE --glass-plate-tinted declaration (the rim.css --glass-border-rung -> --glass-border-accent indirection pattern, mirrored for the plate background): each rung sets only its own --glass-bg-rung + reads background: var(--glass-plate-tinted). NET-NEUTRAL — a custom property substitutes its var() refs against the SAME element's other customs, so the per-rung bg + the per-element W55 re-points reach the recipe unchanged; the dist is byte-isomorphic. F1 the recipe is DECLARED EXACTLY ONCE across the glass cascade AND composes the W55 oklab tint seam reading the per-rung indirection (a second declaration or a missing one REDs). F2 the 5 ladder rungs each set --glass-bg-rung: var(--glass-bg-<rung>) (the per-rung mapping, resting->resting not a cross-paste) AND read background: var(--glass-plate-tinted); ZERO surviving inline background: color-mix(in oklab, var(--glass-bg-…)) paste in ladder.css. F3 the reader-census-at-landing net-neutral guard — the phantom --glass-warm-zero is ABSENT (the DROPPED work item; a re-introduction REDs) AND the 3-false-claims KEEP tokens stay DECLARED in glass-fx.css (--glass-spine-blur / --glass-spine-opacity, test-pinned by InstrumentChassis.spine-variant.test.ts; --meter-track-stroke, the speedtest useTokenColor consumer extension-point) — an over-prune of a token with 0 in-CSS var() readers but a LIVE off-CSS consumer is the 3-false-delete-claims lesson, and deleting any REDs. The self-test bite (the --self-test arm, run every invocation): a doubled --glass-plate-tinted declaration reds F1; a surviving inline rung paste reds F2; a re-introduced --glass-warm-zero OR a deleted KEEP token reds F3. Bite: re-inline a rung plate paste / fork a second recipe home / re-introduce --glass-warm-zero / delete a KEEP token -> RED.",
    },
    {
        id: "proof:glass-clip",
        cmd: "proof:glass-clip",
        tags: ["local", "ci", "release"],
        note: "BG.W-GLASS-CLIP-DISCIPLINE — the ONE narrowed paint-box clip register + the dock-cast retire (born-RED -> GREEN; the comment-strip + pure-detector house pattern, mirroring proof-glass-idiom-factor.mjs / proof-glass-cal.mjs; a --self-test arm proven every run). The house carried TWO divergent per-class clip DIALECTS — .glass-card (contain: layout style paint) + .glass-btn (contain: paint), both surfaces.css — while the five ladder rungs + the .glass-material GROUP carried NONE. This wave RETIRES the two dialects into ONE contain: paint register on a NARROWED CONTENT + .glass-card + glass-atom selector in material.css, with the OVERLAY BAND (.glass-floating/.glass-overlay — a PopperArrow paints past the rounded corner) + the 4 DOCK CONTROLS (the BA.W-DOCK-GEOMETRY freed cross axis) DELIBERATELY EXCLUDED. It also ABSORBS W-DOCK-CAST-RETIRE — the kinetic .cartoon-cast dock child + the <span class=\"cartoon-cast\"> are deleted (the self-defeating maroon-halo D3 mechanism), a dock-scope PRM --motion-weight:0 carve landing in its place. C1 the ONE clip register is DECLARED EXACTLY ONCE in material.css AND its selector list INCLUDES the content tiers + .glass-card + .glass-btn (a missing register / a second contain: declaration / a missing INCLUDED surface REDs). C2 the per-class dialects RETIRED from surfaces.css (ZERO surviving contain: on .glass-card/.glass-btn — the two-source drift killed). C3 the overlay band + 4 dock controls EXCLUDED (a re-widen onto any of the 6 EXCLUDED selectors REDs — the Popper-arrow-survives + dock-plate-clearance guarantee). C4 a border-radius rides ALONGSIDE the clip (.glass-card -> --radius-card, .glass-btn -> --radius-pill, the material ::before/::after pseudos -> border-radius: inherit; a clip with no radius trims to a SHARP RECT). C5 the DOCK cast is SOURCE-ABSENT — dock/shape.css declares NO .cartoon-cast AND GlassDock.vue carries NO class=\"cartoon-cast\" (atomic; the shared cards.css base rule + its glass-atom/btn-punch consumers UNTOUCHED). C6 the dock-scope PRM carve is PRESENT (.glass-dock { --motion-weight: 0 } under prefers-reduced-motion: reduce). C7 lightningcss-form-aware built-bundle arm — IF dist/styles/glass.css is present, the bare contain: paint substring survived the build (befitting-skip when absent). The paint arm (clip-discipline / /containers, both modes) is the wave's own non-authoring close. Bite: drop the register / leave a surviving dialect / re-widen onto overlay+dock / drop a radius / re-introduce the .cartoon-cast selector or class / drop the PRM carve -> RED.",
    },
    {
        id: "proof:dock-plate-clearance",
        cmd: "proof:dock-plate-clearance",
        tags: ["local", "ci"],
        note: "BA.W-DOCK-GEOMETRY / BG.W-DOCK-CAP-SCROLL-FADE — the control-plate clearance + scroll-port cross-axis un-clip gate. Device-free SOURCE arm (the pi SHELL readback tests-visual/dock-plate-clearance.spec.ts is the binding visual truth, W-DOCK-GEOMETRY-DELTA.md): W1 --dock-control-safe-inset declared in the density cascade AND consumed (padding + background-clip:content-box) so the painted plate x --scale-hover-dock stays STRICTLY inside --dock-layer-height per density rung (the 0px dead-knob barred); W2 the scroll ports pin the cross axis clip + overflow-clip-margin:var(--dock-control-safe-inset) (.dock-scroll-x .dock-layer--full -> overflow-y:clip; .vertical...:not([data-morphing]) -> overflow-x:clip; the honest un-clip, NOT the latent-no-op visible pin CSS Overflow §3 computes to auto), the .dock-scroll-y opt-in is DEFINITION-ABSENT (a capped vertical axis intrinsically scrolls via the unconditional cap-derived shell rule; the overflow=scroll prop retired), AND both shell docks pass no overflow=scroll; W3 the contain:paint audit verdict (a) recorded as a gate fact in shell.css. Bite (--self-test): the visible no-op, a missing clip-margin, a surviving .dock-scroll-y rule, or a re-added shell overflow=scroll -> RED.",
    },
    {
        id: "proof:atlas-ab",
        cmd: "proof:atlas-ab",
        tags: ["local", "ci"],
        note: "BA.W-ATLAS-RECONCILE — the d6-lineage A/B fold (born-RED; the Connectivity Atlas reconciliation). Device-free SOURCE arm (the PAINTED icon-morph-during-flip / storm-dead truth is the pi arm tests-visual/atlas-flip.spec.ts + the ported DarkModeToggle.icon-morph.test.ts 6 asserts + useViewTransition async/PRM/navigate units). W1 onFlipSettled post-flip settle seam on /dark (rAF-coalesced, burst-safe, no VT); W2 the toggleDark forced-reflow deletion (void offsetHeight gone, ~40ms/flip); W3 the data-allow-motion carve (the storm dies AND the icon morph runs; PRM absolute-snap honored); W4 PAPER_WASH_GROUND satisfies Partial<AuroraConfig>; W5 the silver conditional arm recorded (SHIP: the quad mirrors gold's 4-place cascade + the chassis variant=structure consumer #2 + demo) — a quad without consumer #2 reds; W6 the cut-notes BY-NAME tables staged. Bite: drop the seam/carve/quad-consumer pairing -> RED.",
    },
    {
        id: "proof:config-chassis",
        cmd: "proof:config-chassis",
        tags: ["local", "ci"],
        note: "BA.W-CONFIG-CHASSIS — the configurator-chassis-made-whole gate (born-RED 8/9 pre-π; the five fleet lanes + the dark-row + the preset-alpha). Device-free SOURCE arm (the PAINTED truth is the π arm tests-visual/config-chassis.spec.ts + the W-CONFIG-CHASSIS-DELTA capture — the WVR-2/3 source-green/visually-broken close-class this tranche fixes; the AZ gates were headless + missed the 0-width render). W1 the chassis WIDTH CONTRACT (the ConfiguratorRow slot is a definite-width context + the .labeled-field root claims inline-size:100% — the 0px-slider class dies once library-wide, not per-consumer; the percentage track resolves against a definite width); W2 the dark-adaptive --configurator-divider token (a light-dark() arm off --foreground + the dark-arm.css .dark floor, consumed by the section + inter-row rules, NO inline border-border/N divider survives — the 'sections run together' dark defect fixed); W3 the first-class <ColorSwatch> register (component + barrel + /color-swatch subpath, ≥2 consumers — the aurora Seed + DERIVE seed; no raw <input type=color w-full> slab survives); W4 the chip-overflow contract (the DERIVE ToggleGroup WRAPS flex-wrap, MONO never clipped off the ~360px aside); W5 the gear RECOMPOSED on <ConfiguratorLayer>/<ConfiguratorRow> (no hand-rolled <h3 text-xs font-mono> eyebrow, PresetEditorField DELETED, delta.dark + setField('dark') + watch(isDark) absent from store.ts); W6 the dark row on the canonical live <DarkModeToggle> (self-syncing over useGlobalDark, not the desynced <Switch v-model=darkModel> NO-OP); + the alpha-clamp (freezeCfg sets alpha:1 — the Speedtest preview shows the preset COLOR not its 0.26 deployment translucency; the presets.ts runtime baseline untouched). The π arm proves the painted 0px-dead / un-clipped-chip / live-dark-flip / 20.4px-rung / vivid-swatch / dark-divider-step truth, and the configurators+goo gestalt-row PASS is the holistic close (BA inv-4). Bite: re-content-size the slot / re-achromatize the divider token / re-add a raw color slab / single-line the DERIVE group under a hard clip / hand-roll the gear chassis / re-introduce the Switch dark row / drop the freezeCfg alpha clamp → RED.",
    },
    {
        id: "proof:progress-gradient",
        cmd: "proof:progress-gradient",
        tags: ["local", "ci"],
        note: "BA.W-PROGRESS-GRADIENT — the sectioned Progress rebuilt on a SINGLE-FILL gradient paint model (born-RED 0/6; R8-14 'totally broken … should be a proper blended gradient with distinct segments'). Device-free SOURCE arm (the BINDING painted truth is the π arm tests-visual/progress-gradient.spec.ts + the W-PROGRESS-GRADIENT-DELTA capture + the proof:ba-gestalt whole-page verdict — the AZ P-1 source-green/visually-broken close-class this tranche fixes). The four stacked root causes: RC-1 the fill was per-cell with a pill cap on EVERY trailing edge (hard internal steps, N pills end-to-end); RC-2 the seam overlay was a mix-blend-mode:screen band (bright stripes + the dead notch where active→pending screen-of-near-transparent-grey vanished); RC-3 the pending cell was a flat 12%-wash of a --surface-tint-40 neutral (the 4th phase read dead); RC-4 the cells were absolutely-positioned siblings with no element spanning the filled extent (nothing to draw ONE gradient across). The fix: W1 ONE .progress-sectioned-flow fill spans the cumulative filledExtentPct (derived off the same useProgressGeometry cells[] — NO geometry-shape edit) carrying the single front pill cap, the per-cell .progress-sectioned-cell/.progress-sectioned-fill stack GONE; W2 the boundary blend lives in ONE linear-gradient whose hard stop-pairs hold each segment hue crisp + short soft zones blend at the boundaries — no mix-blend-mode:screen, no .progress-sectioned-seam render/selector; W3 the .progress-sectioned-rail routes through --glass-bg-quiet + a --glass-blur-quiet backdrop (the frosted glass meter register, IG-C1) with the recessed-channel inner-shadow groove PRESERVED; W4 the pending remainder carries a faint --cell-color ghost (the demo upload segment re-pointed off --surface-tint-40 to --viz-amber). The measurement layer (useProgressGeometry.ts cells[]/aggregateValue/ProgressSegment mirror) + the modelValue-refusal prop boundary (Progress.vue) are PRESERVED — the re-shape is confined to ProgressSectioned.vue template+<style> + the one-line demo data fix. Bite: re-introduce a per-cell capped fill / a mix-blend-mode:screen seam band / a flat neutral pending wash / drop the --glass-bg-quiet track route → RED.",
    },
    {
        id: "proof:demo-affordances",
        cmd: "proof:demo-affordances",
        tags: ["local", "ci"],
        note: "BA.W-DEMO-AFFORDANCES — the demo's controls unified onto the glass grammar (born-RED→GREEN; the comment-strip pure-detector house pattern, mirroring proof-icon-chip.mjs). Four falsifiable SOURCE witnesses + the BINDING π readback (tests-visual/demo-affordances.spec.ts + the W-DEMO-AFFORDANCES-DELTA capture + the proof:ba-gestalt verdict for the five affected surfaces — the AZ P-1 source-green/visually-broken close-class this tranche fixes; AZ.W-MOTION2 marked complete on the source diff while BOTH the play control + the picker eroded live, R8-16/R8-17). W1 no element in demo/** or any src/styles/** recipe stacks .glass-btn + .btn-pill (class co-occurrence ANY order + a text-bearing-.glass-btn bite — an icon button carrying a text child collapses the same way: the fixed-square primitive wins, contain:paint clips the wrapped label into a ~40px blob, R8-17); the negative-predicate anchor lives in glass/surfaces.css. W2 every demo play/replay control composes <StoryPlayButton> (or the reference <DockIconButton><Play/>), and no U+25B6 ▶ survives as a play affordance in the enrolled stories (curve-gallery/springs/BezierEditor) — the positive register arm catches a play site that drops ▶ but hand-rolls a non-register button. W3 no lone <Button>/<button> is the SOLE direct child of a column-flex (flex flex-col) wrapper across the enrolled trigger stories (toaster/use-global-dark/use-dark-mode-sync) — the implicit align-items:stretch full-width slab, R8-13a; the detector reads the WRAPPER context, not a w-full grep (which would miss the no-class stretch). W4 zero bg-card/60 in the enrolled set (skeleton/notification/springs range cells) — the hand-rolled off-glass plate that reads dead on dark, FD-FS X-2; math-paper.vue:13 (the paper article) + springs.vue:181 (the paper-grain STAGE, bg-background/40) are the declared exceptions. The π readback proves the RENDER: the curve-picker selected chip's resolved background references --glass-bg-floating/--dock-control-active-bg AND selected-plate luminance > unselected (the contrast-color inversion DEAD, structurally a plate not an fg/muted delta), in BOTH modes; the play control renders content-width > the fixed --size-icon-btn square; the lone trigger computes content-width < the parent column. Bite: re-stack .glass-btn+.btn-pill / re-introduce a ▶ play glyph / leave a lone column-flex trigger / smuggle a new bg-card/60 slab into an enrolled story → RED.",
    },
    {
        id: "proof:no-gray",
        cmd: "proof:no-gray",
        tags: ["local", "ci"],
        note: "BA.W-NO-GRAY — the warm-chroma floor gate (born-RED 12/27, R10-5 'a better designed glass system for cards, buttons, etc. No gray.'). Device-free SOURCE arm (the PAINTED warm-not-gray truth is the π arm tests-visual/no-gray.spec.ts): the warm-48 neutral ladder was SPECIFIED warm but RESOLVED achromatic (C 0.0055-0.0155 below the ~0.020 perceptual floor, AND at the yellow-green OKLab hue ~95°, not the foreground's warm 56°). The fix is the WARM-CHROMA FLOOR, chroma-only at constant L (the AA contract preserved, ±0.01 of HEAD): L2 re-saturates the --neutral-* ladder (+ the semantic aliases --secondary/--accent/--border/--muted-foreground) onto the warm identity in BOTH arms (the mid/low-L rungs clear the strong floor C≥0.020 at warm H 62-72°, the gamut-bound L90 chip lifts to a materially-warm C≈0.013); L1 warm-biases the light glass PLATE (--card decoupled off the near-achromatic page onto a warm-cream value so the default Card/Button plate composites C ≥ the plate floor — the G1/G8 gray dead); L3 re-anchors the --glass-border-* warm rim presence. The KEEP-NEUTRAL registers (--warning-foreground, --overlay-scrim-ink, the shadow ink, the page surface) are byte-asserted; the --surface-tint-* in-srgb fence held (the AW.W26 boundary). Bite: revert any warm value below the floor / re-introduce the yellow-green hue / re-achromatize the plate / a lightness-rewrite masquerading as warming / touch a KEEP-NEUTRAL register → RED.",
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
        tags: ["local"],
        note: "AX.W48 — the glass-material DEMO-ROUTE falsifier (the demo twin of proof:glass-material-unified/-sota, which pass green over a broken demo). Asserts the SFC BINDS the seams it narrates: useSpecularTracking composed (the moving catch-light is live), a non-zero --glass-tint-strength companion (the color-mix bites), zero glass-btn token + a real <Button variant=glass>, the rim on/off device. Bite: strip useSpecularTracking / zero the tint strength → RED.",
    },
    {
        id: "proof:blob-live-truth",
        cmd: "proof:blob-live-truth",
        tags: ["local"],
        note: "AX.W46 — the GooBlob live-truth gate (the blob reads as a contained lit droplet, hover responds, moods resolve — not skeuomorphic/broken). Device-free SOURCE arm + a fail-CLOSED π blob render/mood arm. Bite: regress the mood resolution / the lit-droplet material → RED.",
    },
    {
        id: "proof:blob-interaction-prm",
        cmd: "proof:blob-interaction-prm",
        tags: ["local"],
        note: "AW.W10 — wired at AZ.W-GATES (the row had never been registered): the blob pointer-interaction PRM contract, reading the post-AY-shader-split authority via scripts/read-blob-shaders.mjs (metaball-uniforms.glsl.ts carries the relocated uTime/pointer patterns). Bite: drop the PRM freeze from the pointer path → RED.",
    },
    {
        id: "proof:blob-tempo-suppression",
        cmd: "proof:blob-tempo-suppression",
        tags: ["local"],
        note: "AW.W11.c — wired at AZ.W-GATES: the blob tempo-suppression contract, re-pointed to uploadBlobUniforms.ts (the AY carve relocated the uTime upload). Bite: re-inject an unsuppressed tempo channel → RED.",
    },
    {
        id: "proof:blob-config-atoms",
        cmd: "proof:blob-config-atoms",
        tags: ["local"],
        note: "AY.W-BLOB2 — the BlobConfig atom-count CEILING (≤12 top-level atoms). Born-RED at the pre-prune 46 fields; GREEN at the 8-atom bundle. Asserts: the top-level field count ≤ the ceiling, the three deleted derived-but-unread fields (orbitSpeedScale/wobbleScale/mergeRate) are GONE from the CONFIG surface (a deletion-witness — they legitimately survive on MoodParams), and BLOB_CONFIG_DEFAULTS round-trips to a complete BlobConfig (every REQUIRED atom + field has a default, no orphan — OPTIONAL `name?:` levers like BD.W-GOO-CAROUSEL-DECK's `morphT?` are exempt: their absence is the documented derived floor, e.g. morphT-absent → the byte-identical STAGE-1 pure-blob, so a forced default would be a non-default identity). Bite: re-add a deleted field → the count exceeds the ceiling OR the deletion-witness REDs; a REQUIRED atom with no default still REDs.",
    },
    {
        id: "proof:live-verified-ledger",
        cmd: "proof:live-verified-ledger",
        tags: ["local", "ci"],
        note: "AX.W62 Gate 1 / AY.W-CARDINAL-INFRA (cardinal forcing function) — a PROGRESS wave-row whose STATUS cell is `live-verified` (or an allowlisted `complete`) REDs unless a matching audit/visual/W<NN>-DELTA.md references ≥1 REAL own-surface PNG (the SOURCE arm rejects prose/section-markers); any `(DEVELOPED)` modifier in a status cell REDs (the retired inflation-vehicle vocabulary). Self-proving: 7 synthetic rows flagged every run (incl. the BB.W-LEDGER-REPAIR column-order born-RED witness). GATES THE ACTIVE TRANCHE (BB — `--tranche=BB` via the bare `proof:live-verified-ledger` script + the .githooks/commit-msg local bite). The parser reads the wave/status columns BY HEADER NAME, not position (BB.W-LEDGER-REPAIR) — column order is FREE, the BA/BB silent-no-op class (a re-ordered table parsing 0 rows + greening vacuously) cannot recur; escaped-pipe-safe rowCells + a fail-loud-on-no-header fallback. The per-tranche tracker arms (:ax/:ay/:az/:ba) gate the closed tranches. The AX 6-row `complete`-allowlist backlog (W05/W08/W15/W16/W17/W23) is born-RED-on-purpose — the W-DELTA0 owed-DELTA TRACKER (`proof:live-verified-ledger:ax`), NON-blocking, NOT a commit/CI gate (defaulting to AX would be the gate-locks-you-out anti-pattern). Bite: flip an AY row to live-verified with no own-surface .png → RED; write `(DEVELOPED)` in a status cell → RED.",
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
        id: "proof:gate-manifest-sound",
        cmd: "proof:gate-manifest-sound",
        tags: ["local"],
        note: "AZ.W-GATES + BB.W-DEAD-SWEEP — the gate-manifest soundness meta-gate (10 clauses + clean-tree): well-formed id/cmd rows, the parity pre-pass, the NON-:5199 live-demo default sweep (BA.W-GESTALT-GATE widened the URL-string regex; BB.W-DEAD-SWEEP closed the URL-string-only blind spot with a bare-port `?? <port>` arm against the recorded SERVICE_PORT_ALLOWLIST 9337/9347 — a future GLASS_UI_DEMO_URL ?? 5175 bare-port reds), the content-hash freshness model, clause-10 proof:gate-manifested (every package.json proof:* key resolves to a gatesFor() row OR the COMPOSITE_OR_RUNNER allowlist). Device-free; ci-promotable. Bite: a cmd-less row / any non-:5199 live-demo default (URL or bare-port) / an unmanifested proof:* key → RED.",
    },
    {
        id: "proof:visual-runner",
        cmd: "proof:visual-runner",
        tags: ["local", "ci"],
        note: "BB.W-VISUAL-RUNNER — the visual-π ENROLLMENT-SOUNDNESS gate (the headless CI half of the cardinal-lesson architecture, the proof:live-verified-ledger precedent). PURE source/enrollment census — it reads files + the pi-runner-manifest, it NEVER paints a pixel (a GPU-less CI runner cannot render the WebGL2 shaders), so it is a genuine static src-scan gate carrying `ci` (proof:tag-parity classifies it ci-owed; the `--run pi` spawn lives in the gates.mjs RUNNER MODE, never in this gate). FOUR arms: W1 the `gates.mjs --run pi` mode exists (the dispatch case + runPi() + both projects [chromium-headless-new, coarse-touch] + the :5199 config default + the served-app-sentinel fail-closed); W2 every committed non-private `*.spec.ts` is ENROLLED or on the EXCLUDE allowlist with a rationale, COMPUTED-from-disk (no hand-list — the orphan self-test bite reds a synthetic unenrolled spec; a literal enrolled-spec array reds); W3 the `gates:pi` script binds `--run pi` + proof:visual-runner self-registers (+ the ci-tag membership asserted by proof:tag-parity); W4 the LOCAL real-device `--run pi` GREEN + the per-orphan verdict ledger — BORN-RED by design (the suite ran nowhere; the binding paint runs on a real GPU at the W-REFLECT3 (Batch 7) close, NOT in this ci run), reported in facts, NOT a ci-failing violation. So CI proves ENROLLMENT; the local close proves the PAINT. Bite: drop a committed spec off both the enrolled set + the EXCLUDE allowlist → RED; re-hand-list the enrollment → RED; remove the `--run pi` mode → RED.",
    },
    {
        id: "proof:ba-gestalt",
        cmd: "proof:ba-gestalt",
        tags: ["local", "ci", "release"],
        note: "BG.W-PAINT-IS-THE-GATE re-points this oracle to the BG tranche (docs/tranches/BG/audit/reflect/bg-gestalt-roster.md), reads LIVE BG paint, purges the hardcoded REQUIRED_SURFACES set (derived completeness is BG.W-GESTALT-ROSTER-RE-POINT) — LANDED at BG.W-GESTALT-ROSTER-RE-POINT: the roster's `routes` cells are DERIVED-resolved by scripts/lib/surface-closure.mjs routeSeeds; a 2-segment /cat/story token whose demo SFC is absent reds as a [ROUTE-RESOLVES] violation (self-tested: /dock/typoo RED + 'the shell BottomDock' prose GREEN, 16 bites total), and extends the decoder so a RED NAMES the failing region (D5-TOP-BAR via topDelta, D2-METALLIC via the field chroma-ceiling). The roster + 4.2.0 Metal ground-freeze captures land via the non-authoring capture agent (real-paint-protocol §3). BA.W-GESTALT-GATE — the holistic per-surface acceptance gate (the P-1 close-class fix). PROMOTED to the operative close set by BA.W-REFLECT2 (off the born-RED no-tag isolation onto [\"release\"], mirroring the proof:az-reflect/proof:az-final precedent — release-only, NOT ci, so it gates W-CLOSE's full battery + release.sh without breaking per-push CI mid-tranche). The gestalt OR is now the BINDING close decision (the P-1 structural fix landed operatively): W-CLOSE cannot cut while any roster surface holds an open FAIL. A roster of the 8 named W-REFLECT2 surfaces (dock · configurators-goo · aurora · glass-feedback · shell · motion-fourier · dark-register · cross-repo), each owed a whole-page capture in BOTH modes over its real backdrop + a recorded GESTALT verdict ABOVE the per-mechanism π readback. Device-free source/docs detector reading docs/tranches/BA/audit/reflect/ba-gestalt-roster.md; operative-PASS IFF every verdict is PASS AND every declared capture path resolves on disk (the anti-evasion floor — a PASS with a missing capture is the close-class lie the AZ matrix told, forbidden). W-REFLECT2 STATE (2026-06-15): 6/8 PASS (configurators-goo · aurora · glass-feedback · motion-fourier · dark-register · cross-repo flipped on fresh whole-page captures); 2/8 FAIL (dock + shell — the SidebarDock floating-carousel facet chips occlude the page <h1> on desktop StoryPage-chrome routes, the binding ℱ-home-seam topology W-DOCK-SECTIONS booked as an accepted *breadcrumb* tradeoff but the whole-page render shows a full *title* occlusion — the exact P-1 mechanism-green/page-wrong gap). The two FAILs share ONE root → ONE named successor BA.W-SHELL-RAIL-RESEAT (triumvirate); the gate STAYS RED until it lands + the dock/shell reflection records gain a RE-REFLECTION verdict that supersedes the FAIL. LINEAGE: AZ closed `complete` on a 9-surface per-mechanism PASS matrix the user re-opened the SAME DAY (R8) on ≥7 surfaces (precepts P-1, the 6th re-open R3→R8); a per-mechanism π verifies a local ΔL but cannot verify the gestalt the user reads. Bite: flip a verdict to PASS with no on-disk capture → RED; drop a roster surface → RED. — HARDENED at BB.W-GESTALT-GATE2: the desktop-PNG-existence floor (existsSync+size>0) is RETIRED. An operative PASS now demands, per surface, FOUR content-real dimension-correct viewport-faithful captures over a FRESH surface: G1 content+dimension (isRealPng magic-byte+≥1KiB + pngDimensions IHDR ≥320×320), G2 the 16 mobile twins READ + viewport-faithful (direction 2b: derive <surface>-<mode>-mobile-full.png from the declared -desktop- path; a -mobile- IHDR ≥1000px or a -desktop- <1280px reds as fabricated), G3 the per-surface surface-hash freshness header WIRED via the SHARED surfaceHash (scripts/reflect-capture-verify.mjs re-exports the ledger's — ONE createHash in the tree; stale/header-less reds under --strict-freshness, the close arm; NOTEs on the bare arm), G4 the self-test bite rides every run (the proof-live-verified-ledger sibling transposed, no second copy). BB.W-CHIP-GRAZE added the CG2 chipOverField clause (dock+shell: the SidebarDock floating-carousel grazes the form FIELD at narrow-desktop — the title-fix masked it; redressed CSS-only by re-fanning the desktop reach down the rail gutter, library byte-untouched, chipOverField TRUE→FALSE live-measured) + REVOKED the dock/shell roster PASS→FAIL (the P-1 lie). Born-RED G3 + CG2 at BB HEAD on dock/shell/dark-register; W-REFLECT3 (Batch 7, the single authorized verdict-flipper) re-captures + re-stamps to flip GREEN.",
    },
    {
        id: "proof:warm-identity",
        cmd: "proof:warm-identity",
        tags: ["local", "ci", "release"],
        note: "BG.W-COMPOSITED-GESTALT-GATE — the composited-WHOLE dominant-hue paint BATTERY (GA-2, measure the whole not the part). Device-free: reads the bg-gestalt-roster enrolled surface set with the DOMINANT-HUE HISTOGRAM over each row's FIELD probe (chroma-weighted hue family, both modes on BOTH engines — chromium + the derived -safari- WebKit twin) — the sharper twin of ba-gestalt's mean-L box, which is fooled by a warm token composited over an achromatic page reading grey (the greenfield GF1 near-gray Button). Six widened predicates: hueBand (dominant family warm + warmFraction floor — a flat achromatic field is NEUTRAL/not-warm, a cerulean field is COLD/RED, GB-5) + chromaCeiling (D2 metallic) + edgeCast + topBar (D5 composed) + cornerClip + routeNavigates. Device-free GREEN on-edit (kernel + wiring present, route-resolution sound, no PASS-over-not-warm); the operative all-warm is a REPORTED born-RED baseline (the GROUND_EVIDENCE arm proves 6/6 on-disk 4.2.0 Metal captures read NOT warm) that flips per paint-wave via the ANTI-EVASION clause (a roster PASS over a grey/cerulean/metallic/missing composite REDs). The PRIMARY paint gate in the --run full release union; ba-gestalt's roster becomes ONE enrolled surface set in this battery, NOT the sole oracle. ONE colour source (reflect-capture-verify.mjs dominantHue/hueFamily/pngRegionHueHistogram) + ONE decoder + ONE roster parse (imported from proof-ba-gestalt.mjs, DRY). 14-bite self-test born-RED→GREEN; NON-AUTHORING fence (the building agent never flips its own row).",
    },
    {
        id: "proof:bc-fold-ledger",
        cmd: "proof:bc-fold-ledger",
        tags: ["ci", "release"],
        note: "BC.W-FOLD-LEDGER — the no-silent-drop floor (Band 0): every one of the 213 prior-tranche deferral items + the 4 PM verdict matrices + the 31 disposition-register rows lives in docs/tranches/BC/FOLD-LEDGER.json with a DECIDED disposition mapped to a real BC.W-* wave. Device-free doc/JSON gate. F1 (doc<->JSON completeness + 213-count + F1.b band DERIVED from the named wave's on-disk **Band:** header, never transcribed from the doc parenthetical), F2 (decided-destination soundness), F2.b (band-string rejection — an empty or bare `Band N` wave REDs), F3 (no-undecided/no-book), F4 (HELD carries rationale+trigger), F5 (the 10 PM-SYNTHESIS reqs each map to a real Band-0 wave clause), F6 (close runs --run full per-round; a local-only close REDs), F7 (disposition-register reconcile, in-place no-delete). 7-bite self-test. The anti-evasion floor the BB close lacked — a CLOSE oracle (Band 6 + the cut gate on it). Bite: a dropped item / phantom-dest / band-only-dest / book-disposition / bare-HELD → RED. (BG.W-DEFERRED-LEDGER folds extractDocIds/deriveBand/waveSpecExists/clausesHit onto the shared scripts/lib/fold-ledger-core.mjs leaf — the no-clone contract proof:bg-deferred-ledger asserts.)",
    },
    {
        id: "proof:bg-deferred-ledger",
        cmd: "proof:bg-deferred-ledger",
        tags: ["local", "ci", "release"],
        note: "BG.W-DEFERRED-LEDGER — the no-silent-drop machine BUILT (the D11 chronic cured, the disposition machine that was itself the deferred item). DERIVES the 136-item deferred corpus from disk (AX DISPOSITION-REGISTER 31 + BF DEFERRED-CENSUS 32 + BE waves 39 + BF waves 31 + in-src CONSUME/BOOKED 3) and REDs the close on any dropped / undecided / blanket-routed / templated / over-concentrated row. COMPOSES scripts/lib/fold-ledger-core.mjs (the DRY leaf proof:bc-fold-ledger also imports — the no-clone contract) + the THREE BG teeth: F2 charter-match (a BUILD/MET/COORDINATED row never routes to a RETIRE/SWEEP wave; a RETIRE lands in a sweep/decide wave; the dest resolves in the build-map roster), F4 templated-evidence (N rows sharing one evidence skeleton + the placeholder phrase RED), F5 concentration-ceiling (≥24 rows to ONE dest RED). Self-contained (reads only committed BG/AX/BF/BE docs + src markers + docs/tranches/BG/execution/bg-build-map.md); no sibling deps, runs siblings-absent. 9-bite self-test (AX-31-vs-32, de-shadcn-not-a-false-orphan, no-clone, disjoint-namespace, F0-scoped no-orphan, charter-match, templated-evidence, concentration, count-assert), born-RED→GREEN.",
    },
    {
        id: "proof:git-hygiene",
        cmd: "proof:git-hygiene",
        tags: ["local", "ci"],
        note: "BH.B0-W0-scratch-sweep — the repo is disciplined, not dirty. Device-free + git-aware: H1 test-results/ is UNTRACKED (the 3 accidentally-tracked Playwright failure artefacts removed), H2 the DEAD .browserslistrc is GONE (absent on disk + untracked — nothing reads it; Tailwind v4 ignores it), H3 .gitignore carries the three scratch-dir guards (test-results/ · .tmp/ · .playwright/) so a `git add -A` can never re-adopt run scratch, H4 .githooks/commit-msg is ENV-DRIVEN (reads GLASS_UI_ACTIVE_TRANCHE — no hardcoded `--tranche=<LETTER>` literal in an executed line; the comment-stripper ignores the explanatory `--tranche=BB` mention), H5 BD-CONTINUATION-PROMPT.md is RE-HOMED under docs/tranches/BD/. Makes the sweep DURABLE — a re-adopted artefact / re-introduced dead config / removed guard / re-stranded doc / re-hardcoded tranche letter all RED here; + 5 self-test bites (the anti-de-fang floor). On a non-git runner the tracking clauses degrade to skip-by-policy; the fs clauses run everywhere.",
    },
    {
        id: "proof:be-bf-ledger",
        cmd: "proof:be-bf-ledger",
        tags: ["local", "ci", "release"],
        note: "BG.W-BE-BF-LEDGER — the 70-wave BE+BF parity floor (the no-silent-drop oracle for the two tranches BG unioned). BE (39 developed wave-specs) + BF (31) were tranche-DEVELOPED but NEVER executed as their own tranches; their per-wave deliverables must not vanish in the fold. Every one of the 70 BE/BF wave-specs (corpus DERIVED from disk — readdir of docs/tranches/{BE,BF}/waves, never a hand-list) carries ONE DECIDED disposition in docs/tranches/BG/BE-BF-LEDGER.md: LANDED-no-build (the landed-evidence path existsSync — a LANDED claim cannot float free of the file), NEVER-BUILT-names-a-wave (the carry-dest is a real BG.W-* in the embedded BG WAVE REGISTRY, cross-checked against bg-build-map.md), or RETIRE (a non-empty rationale ≥20 chars). L1-L8 device-free + a 7-bite self-test (dropped-row, bad-disposition, landed-phantom-path, phantom-dest, bare-RETIRE, extra-unknown-row, band-only-dest), born-RED→GREEN. Self-contained; runs siblings-absent.",
    },
    {
        id: "proof:meta",
        cmd: "proof:meta",
        tags: ["local", "ci"],
        note: "BG.W-FABLE-DESIGN-ARM (F8.3) — the BG F8 plan/process/ledger FAMILY gate (R3 close taxonomy: proof:build machine · proof:meta plan/process · proof:warm-identity paint; there is NO proof:close). ONE growing clause runner each F8 close wave appends to; this wave SEEDS it + lands the FIRST clause `fable-arm-present` (GA-3 / PE-FABLE — the 2026-07-01 Fable/DesignSync mandate machine-encoded). S1 SCHEMA completeness: every §1 VISUAL row (its `class` cell carries a standalone paint `P` token — `P`/`H/P`/`P (cond)`; a bare `H`/`H→ci` is NOT visual) of docs/tranches/BG/execution/EXECUTION-PROGRESS.md's §1 MASTER TABLE must NAME both its `fableArm` (the Fable design-authoring arm) + its `designSyncSurface` (the DesignSync review card set) in the `fable / designSync` cell, parsed BY HEADER NAME (column-order-free, BB.W-LEDGER-REPAIR precedent) + split on ` / ` (an internal `darken/lift` slash never false-splits). S2 PROVISIONING presence: docs/tranches/BG/canon/fable-design-arm.md (OUT of the src submodule) carries the CLOSE-PRECONDITION (a filed FABLE PASS, NOT the building agent — the non-authoring fence), the USER-GATED DesignSync provisioning + the enforceable-in-both-states fallback; the DIRECTIVE-LEDGER §7b PE-FABLE row names W-FABLE-DESIGN-ARM as owner. Device-free, self-contained (reads only committed BG docs — runs siblings-absent). born-RED→GREEN + a 6-bite self-test (visual-P-dash FLAG · both-arms NO-flag · nonvisual-H-dash NO-flag · half-less FLAG · H/P-dash FLAG · internal-slash NO-flag). The DesignSync project itself is provisioned USER-GATED (no MCP side effect in a device-free gate); the gate locks the SCHEMA + the routing so the mandate cannot silently un-encode.",
    },
    {
        id: "proof:token-manifest",
        cmd: "proof:token-manifest",
        tags: ["local"],
        note: "BG.W-TOKEN-MANIFEST (F8.5) — make the token basis COUNTABLE (D5-FC4). The token basis is uncountable across FOUR consumption channels (`var()`, Tailwind `@theme` utility-gen, the `prop-(--token)` arbitrary shorthand, the JS read surface — getPropertyValue/readNum/readToken/setProperty + template-literal families), so accretion is invisible and every tranche NETS tokens. The STANDING anti-accretion floor: scans every declared CSS custom property under src/styles/ (via scripts/lib/token-manifest.mjs — the pure classifyTokens core), resolves each to its live channel(s) over the LIBRARY src/ + the reference-CONSUMER demo/, emits a build-time manifest token→channels→alive|dead, and FAILS on any ZERO-live-channel token not allowlisted with a rationale (scripts/token-manifest-allowlist.json, EMPTY at land). The scan is channel-PRECISE: a comment-only mention never reads alive (the false-alive class), a `@theme`-only / prop-shorthand-only / JS-literal-only / dynamic-family (`--section-color-${i}`) token reads alive (no false-positive). BORN-RED BY DESIGN on the ~30-50 genuinely-dead HEAD tokens, so it is [\"local\"]-tagged (does NOT block ci/release mid-tranche — the proof:ba-gestalt born-RED precedent); BG.W-GLASS-BASIS-CONSOLIDATE (F2.2) is the authorized flipper — its step-4 dead-token sweep reads THIS manifest, DELETES the set (never allowlists it), flips the gate GREEN + promotes it to the ci/release battery. The always-green channel-aware witness is the sibling proof:token-manifest:self-test.",
    },
    {
        id: "proof:token-manifest:self-test",
        cmd: "proof:token-manifest:self-test",
        tags: ["local", "ci", "release"],
        note: "BG.W-TOKEN-MANIFEST — the always-GREEN channel-aware self-test witness (the load-bearing half the born-RED gate leans on). Runs the PURE classifyTokens core over synthetic in-memory sources: a planted dead token → dead (RED), a `@theme`-only / var()-only / prop-(--)shorthand-only / JS-string-literal-only / dynamic-template-family token → alive (GREEN, no false positive on a build-time channel), a comment-only mention → dead (comments never read as alive). Device-free, siblings-absent; carries ci/release so a regression that de-fangs the channel classifier (a false-alive on a comment, a false-dead on a dynamic family) reds per-push — the born-RED proof:token-manifest gate's mechanism cannot silently un-arm.",
    },
    {
        id: "proof:observer-loop",
        cmd: "proof:observer-loop",
        tags: ["local", "ci"],
        note: "BC.W-PAINT-GATE — the observer-loop READ clause (Band 0, SYNTHESIS req #7): the decorative-observer dead-knob closed. Asserts the glass-backdrop-luma strength token the observer WRITES is READ on the RHS of a var() in the tint-compose chain (a paint-driving read, not just a write). Device-free CSS-parse gate. Born-RED on HEAD write-only (the token is written by useGlassBackdropLuminance, zero CSS rule reads it into the tint) → GREEN when BC.W-ADAPTIVE-RECONCILE (Band 1) closes the loop in CSS. Self-test bites: write-only → RED, loop-closed → GREEN, unrelated-token → RED. The structural witness that BC.W-ADAPTIVE-RECONCILE closed the observer loop.",
    },
    {
        id: "proof:black-bar",
        cmd: "proof:black-bar",
        tags: ["local", "ci", "release"],
        note: "BC.W-BLACK-BAR — the D2 'black bar' retired at ONE token source (Band 1). The card border-top dark-rim becomes a DIRECTIONAL catch-light: --glass-rim-top (bright inset, the lit edge) + --glass-rim-bottom (warm under-shadow grounding the plate); the six --glass-border-* rungs drop from 11-22% to <=5% alpha over --foreground (the perimeter is no longer the silhouette device). Plain per-mode dark pair (never light-dark() round an inset — the inset-shadow trap). Born-RED on the 15 HEAD violations. Bite: an 11%+ border rung / a stripped rim-top / a re-pasted dark top inset / a light-dark()-wrapped inset / the dock box-shadow on the retired ring -> RED.",
    },
    {
        id: "proof:glass-identity",
        cmd: "proof:glass-identity",
        tags: ["local", "ci"],
        note: "BC.W-GLASS-IDENTITY — the warm-cream translucent identity floor, gated BIDIRECTIONALLY (Band 1). The historical grey slab oklab(0.695 0.002 0.006 / 0.536) REDs the calm-light band while warm-cream passes — the monotonic-gate blind spot (postmortem/az.md s2 disease root) closed via the SHARED scripts/lib/paint-arm.mjs paintBand. I1 opacity ladder monotone + warm --card chroma > 0.004 + 4% calm floor; I2 the five unconditional :where() rules point --glass-tint-strength at the floor NOT -aa; I3 the bidirectional bound; I4 no unconditional -aa darken survives. Born-RED if the AZ.W-ADAPTIVE-AUTO 5b72fd9b blanket darken is re-planted.",
    },
    {
        id: "proof:adaptive-reconcile",
        cmd: "proof:adaptive-reconcile",
        tags: ["local", "ci"],
        note: "BC.W-ADAPTIVE-RECONCILE — the observer loop CLOSED (Band 1): --glass-backdrop-luma is READ into the --glass-tint-strength clamp (continuous, bounded [4%..20%, <=24% iOS], knee 0.6). ONE axis (--glass-tint-strength) / ONE driver (the observer) / ONE signal (--glass-backdrop-luma). A1 luma-read, A2 typed @property, A3 continuous + A3-overlay overlay-joins, A4 canvas-threaded, A5 bounded. The discrete @container --glass-backdrop:light bucket retired as the strength driver (kept only as the no-@property degrade fallback). Bite: a decorative-write / unconditional-blanket / overlay-left-behind / luma-less-clamp evasion -> RED.",
    },
    {
        id: "proof:glass-legibility",
        cmd: "proof:glass-legibility",
        tags: ["local", "ci"],
        note: "BC.W-GLASS-LEGIBILITY-MEASURED — iOS-27 more-glass-AND-more-legible, MEASURED both-directions (Band 1): every rung clears 4.5:1 WHILE glassy (grey/opaque/thin all RED — the monotonic blind spot closed). L1/L2 calm+bright per-rung contrast + alpha bound, L3/L4 blur+saturate budget with --glass-saturate-deep-ceiling booking, L5 specular in [0.2,0.5], L6 the .glass-floating overlay alpha clamp (< 0.86, the iOS let-content-through), L7 the per-rung --glass-saturate-{wash,quiet,resting,floating,overlay} knobs minted + read-through <=1.8 (the AX BC-W10 fold).",
    },
    {
        id: "proof:no-shadcn-default",
        cmd: "proof:no-shadcn-default",
        tags: ["local", "ci"],
        note: "BC.W-DESHADCN — the reskin-DNA structural invariant (reka=BEHAVIOR / glass-ui=100%-of-the-MATERIAL): no ui/ component off the legibility allowlist carries a residual shadcn-neutral token (bg-background/border-input/ring-ring/ring-2/ring-offset-*/bare rounded-md/bare shadow-sm) in its visual LEADING layer + the per-component census closure (every ui/ dir on EXACTLY one list). D2 token-vs-utility, D3 allowlist-survivor, D4 census closure, D1 forbidden-token sweep. BORN-RED on the HEAD residuals (button/switch/tags-input/toggle/select-separator) and goes GREEN INCREMENTALLY as the Band-1/3/6 reskin owners (BUTTON-GLASS-IOS, DIALOG-GLASS, CONTROL-SMOOTH, DROPDOWN-FIX) land their re-points — PARTIAL-until-owners-land is the intended structural pressure. proof:glass-cohesion stays authoritative on the bg-opacity axis (overlap defers).",
    },
    {
        id: "proof:glass-prune",
        cmd: "proof:glass-prune",
        tags: ["local", "ci"],
        note: "BC.W-GLASS-PRUNE — the glass system consolidated to Glass CARDS + Glass MATERIALS (the two-family grammar). P5 anti-silent-prune: a retired export/subpath that is registry-published OR constellation-consumed yet carries no recorded fold REDs (the d6 silent-prune forbidden). The binding pre-flight (the registry-consumer probe) FOUND a live external consumer (sci-report/atlas imports /glass-panel @4.0.1) — so the destructive retire is HELD-FOLDED + routed via BC.W-ATLAS-ASK (coordination/ATLAS-BC.md, foreign-tree fence). The D3b disc-core invariant + single-specular source preserved. Bite: re-add a pruned export / a story re-import / a silent-prune-unrecorded-consumer → RED.",
    },
    {
        id: "proof:selection-card",
        cmd: "proof:selection-card",
        tags: ["local", "ci"],
        note: "BC.W-SELECTION-CARD — the I5 <Card variant=\"selection\">, the ONLY new Atlas component (the Card-is-the-only-new-component fence). Composes the BB-BUILT seams: the --glass-accent data-hue rim (A-2) + the .metal-*-border earned shimmer-on-selected (A-3, rim-not-fill) over the warm-cream glass floor — no new sub-system. S1 variant prop/type + data-variant + --glass-accent host write + metal-border compose. Bite: drop the variant / the data-rim / the shimmer-on-select / mint a 2nd new component → RED.",
    },
    {
        id: "proof:dialog-glass",
        cmd: "proof:dialog-glass",
        tags: ["local", "ci"],
        note: "BC.W-DIALOG-GLASS — the glass dialog is actually partially-transparent + glassy (consumes the DESHADCN census). DG1 --glass-bg-dialog warm-translucent fill (no unconditional overlay ink-flip), DG2 the residual shadcn-neutral re-pointed onto the house glass register, DG3 the padding ladder coordinated (no right-4/top-4 corner-jam), DG4 ConfirmDialog opaque → <Dialog surface=glass>. Bite: re-add the opaque ConfirmDialog / the ink-flip / the corner-jam → RED.",
    },
    {
        id: "proof:glass-glow-fix",
        cmd: "proof:glass-glow-fix",
        tags: ["local", "ci"],
        note: "BC.W-GLASS-GLOW-FIX — the Atlas A-8 unbounded radial-halo ROOT defect closed (a library-CSS leak, NOT a viz-math change). Rooted the leak to the unclipped breath-scaled .pulse-aura (Pulse.vue position:absolute inset:0 transform:scale→1.15 with no containment) + the dock morph-bridge radial; the radial extent is bounded at its source so no spurious unbounded halo over-paints any glass/viz surface. Bite: un-clip the breath-scaled aura / un-bound the morph-bridge radial → RED.",
    },
    {
        id: "proof:accent-tone",
        cmd: "proof:accent-tone",
        tags: ["local", "ci"],
        note: "BC.W-ACCENT-TONE — the contrast-floored 3-channel tonal-accent register (one --tone → idle/active/edge/ink via the shipped value.js safeAccentColor /color leaf) + <SelectableChip>. A3 no hand-rolled active-fill color-mix (the toggle-chip data-[state=on] forms retired onto the register), A5 the idle ≥3:1 contrast floor, the no-gray OKLab floor. SelectableChip ships its OWN /selectable-chip subpath leaf (value.js-bearing, off the value.js-free root barrel — the SCC-trap discipline). Bite: a hand-rolled active-fill / an idle <3:1 tone / SelectableChip on the root barrel → RED.",
    },
    {
        id: "proof:motion-one-clock",
        cmd: "proof:motion-one-clock",
        tags: ["local", "ci", "release"],
        note: "BC.W-MOTION-ONE-CLOCK — keyframes.js is the ONE source + clock, made a born-RED gate (the structural answer to the masked-accretion drift). M1 SPRING_PRESETS the single hand-authored (response,ζ) table (regen + curves import it); M2 OFF-SPINE allowlist (the 2 sanctioned hand-rolled seams: usePointerVelocityField lerp + useDragMorph snap — de-allowlisting reds the real file); M3 CLOCK-FENCE whole-corpus sweep (0 live forks; the 8 BB-batch drifts NAMED in the CLOCK_FENCE_PENDING verify-not-edit bridge, each with its downstream owning wave); M4 VIZ-INVERSION (0 viz-owned kf rAF); M5 the §P7 canon + asks-and-consumes book. The KF-OSCILLATOR loop-clock stays BOOKED (absent from kf 4.3.0 dist). Bite: a 2nd register table / a hand-rolled spring integrator off the allowlist / a viz kf rAF → RED.",
    },
    {
        id: "proof:spring-ease",
        cmd: "proof:spring-ease",
        tags: ["local", "ci", "release"],
        note: "BC.W-SPRING-EASE — all springs squishy/quick/coupled-fade + the iOS press register minted. S1 snappy 90%-travel in the clock-fill band [0.55,0.70] (retuned 0.42/0.78 → 0.571, NOT the 0.16 front-load); S2 bouncy overshoot in the Apple band; S3 the `press` row 0.15/0.86 minted + wired (useSpringPress) + the --spring-press/-duration tokens emitted (regen-spring-tokens synced); the `dock` row byte-FROZEN (DOCK-ENGINE consumes --spring-dock); S6 universal-sweep 0 abrupt spatial legs (the PENDING bridge leg-specific). proof:spring-tokens-synced rides it. Bite: a front-loaded snappy / an over-sprung bouncy / a missing press row / a regen-skip drift → RED.",
    },
    {
        id: "proof:affordance-map",
        cmd: "proof:affordance-map",
        tags: ["local", "ci"],
        note: "BC.W-AFFORDANCE-MAP — interaction affordances baked into every interactive element (the 22-row registry), riding the eased springs + the minted press register. The vSpecular affordance contract: a hover lift / press / focus on a front-loaded curve reds; the affordance must read the named spring clock. Bite: an un-mapped interactive element / a raw-curve affordance → RED.",
    },
    {
        id: "proof:tunable-anim",
        cmd: "proof:tunable-anim",
        tags: ["local", "ci", "release"],
        note: "BC.W-TUNABLE-ANIM — the tunable-animation registry (the configurator/EasingPicker exposes the eased curves + affordances). Indexes the one-clock single source; every tunable curve resolves to a named SPRING_PRESETS row, not an inline literal. Bite: an un-indexed tunable / an inline curve in the picker → RED.",
    },
    {
        id: "proof:design-docs-files",
        cmd: "proof:design-docs-files",
        tags: ["local", "ci"],
        note: "BH.B4c-precept-extract-files — the design-doc extraction-files lock. Asserts the 4 glass-ui design docs (design-idioms · motion-canon · tunable-anim · affordance-map) RESOLVE on disk in docs/design/ (the first-class home carved out of the docs/precepts submodule) with their identity H1 (F1 exists+non-trivial, F2 identity). Born-RED on HEAD (docs/design/ absent) → GREEN after extraction; a future doc-slim/CLAUDE-delete/gate-rehome wave cannot silently drop a design doc. Bite: a missing/empty-stub/wrong-identity design doc → RED.",
    },
    {
        id: "proof:core-prompts",
        cmd: "proof:core-prompts",
        tags: ["local"],
        note: "BH.B6-core-prompts — the 3 reusable cleanup prompts + README ↔ STYLE.md self-consistency gate (born-RED 1 violation @ HEAD: RESTRUCTURE-FRONTEND carried the STYLE.md banned word 'robust' → GREEN after the robust→sturdy excision). FOUR witnesses + a passing inline self-test bite: W1 the 4 files exist with content; W2 cross-linked (README links all 3 prompts; each prompt links ≥1 sibling); W3 each prompt cites the binding edicts BY NAME (the 'cite … by name' directive + ≥2 catalog edicts); W4 the self-consistency read — no STYLE.md banned word in any of the 4 files (banned list parsed LIVE from STYLE.md when the precepts submodule is present, with a pinned snapshot fallback so the scan bites submodule-absent; 'leverage' excluded per its mechanical-sense carve). The DIRTY self-test (a planted banned word + a dropped README link) flags W4+W2; the CLEAN synthetic flags neither. repo-local doc/source check, no Playwright. Local-only by design (tranche-staging dispatch prompts — recorded in proof:tag-parity JUSTIFIED_LOCAL_ONLY, the gate-detrap/story-language precedent).",
    },
    {
        id: "proof:split-chars",
        cmd: "proof:split-chars",
        tags: ["local", "ci"],
        note: "BC.W-SPLIT-CHARS — the per-glyph split JS partner useCharStagger + <SplitChars> with --char-index/--char-total + the MANDATORY accessible full-text label (aria) — the engine-free JS partner to the shipped .char-stagger CSS, placed in /motion-core (root-barrel-safe, engine-free), the ≥2-consumer bar. Bite: a split without the accessible full-text label / a non-/motion-core placement / a value.js or engine import on the leaf → RED.",
    },
    {
        id: "proof:motion-presets",
        cmd: "proof:motion-presets",
        tags: ["local", "ci"],
        note: "BC.W-MOTION-PRESETS — the convergence-reveal motion preset (the brand partial-sum-settle; prefers the `gentle` reuse unless measurably distinct, no new engine) + the [data-scroll-reveal] `once` latch reusing the shipped IntersectionObserver unobserve machinery (the continuous default UNTOUCHED — no-double-ownership with BC.W-SCROLL-TRIGGER). Bite: a new engine for the reveal / a re-firing `once` latch / a double-owned [data-scroll-reveal] default → RED.",
    },
    {
        id: "proof:dock-engine",
        cmd: "proof:dock-engine",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-ENGINE — the buttery COMPOSITOR-ONLY dock morph engine (the dock fleet rides it). E1 every morph-geometry/chrome leg (inline-size/block-size/padding/bg/border-color) is JS-driven via the --dock-morph-t/--dock-expand-t scalar, NEVER a generic transition (the interaction transform/scale channel is the KEEP carve). E2 the CONSUME-side JS envelope (computed from the DOCK_SPRING analytic damped-oscillator, NEVER parsing the byte-frozen --spring-dock linear()): midpoint travel >= 0.40, max dead-flat plateau < 0.35 (kills the BB ~16% stall), monotone rise. E3 compositor promotion (will-change:transform) ONLY on armed states (rail hover/active/held + collapsed-hover), NEVER resting (P5). E5 the Atlas A-9 --dock-control-glyph-size knob declared at :root + per [data-density] + coarse (the substitution-vs-inheritance dead-knob closed). Fences: proof:no-layout-animation LOCKED + proof:spring-tokens-synced (dock 0.32/0.7 byte-frozen). Bite: a generic-duration morph leg / a >0.35 plateau / a resting will-change / a missing glyph-knob register → RED.",
    },
    { id: "proof:shell-dock-dry", cmd: "proof:shell-dock-dry", tags: ["local","ci","release"], note: "BG.W-SHELL-DOCK-DRY — the demo shell-dock DRY gate. The two shell docks (SidebarDock/BottomDock) byte-duplicated the shared facet-rail loop (the useContextualDockLayers wire, the railItems map, the SHELL-HOLD railContext writable-computed guard, the arrow-roving onFacetKeydown) + the morph-button wiring (the glass-ui-demo:toggle-dock-morph dispatch); this folds it ONCE into demo/shell/useShellNavDock.ts over two thin SFCs. Device-free FS scan: P1 composable-owns-the-loop, P2 both SFCs consume + carry ZERO inline duplication, P3 composable-⟂-to-the-dock-nav.css responsive swap (no matchMedia/768/orientation — the swap must not fight the 768px breakpoint) + swap-preserved, P4 the mobile off-canvas Sheet trigger preserved. Born-RED on HEAD (composable absent + duplication in both SFCs) → GREEN on the DRY + a 12-assert self-test (7 sabotage bites, each flags its clause). The binding paint is the P1 landing-semantics live π (single-flip + leave-flow→bottom-bar + one CLS-bounded settle across the 768px swap). Bite: leave a railContext computed / a toggle-dock-morph dispatch inline in an SFC → P2 RED; put a breakpoint in the composable → P3 RED; drop the Sheet trigger → P4 RED. Sibling reader gates proof:shell-hold + proof:dock-morph-insitu + proof:dock-contextual-layers FOLLOW the carve into useShellNavDock (same diff)." } ,
    { id: "proof:dock", cmd: "proof:dock", tags: ["local","ci","release"], note: "BG (4.3 W-DOCK-CUT verify) — the F3 dock family gate SEED: D1 useDockContextSilhouette composable ABSENT · D2 its test ABSENT · D3 the dead proof:dock-context FULLY retired (script+row+pkg) · D4 zero live silhouette refs in dock src+stories · D5 the LIVE DOCK_CONTEXT_LABEL/dockContext.ts DI KEPT (anti-over-cut fence). Born-RED on the reconstructed pre-cut base (4 violations) + 12 self-test bites." },
    { id: "proof:dock-consumer-fence", cmd: "proof:dock-consumer-fence", tags: ["local","ci","release"], note: "BG.W-DOCK-CONSUMER-FENCE — the dock never leaks internal-part CSS onto consumer elements (C1 every .dock-layer-family paint/layout rule carries a :where(.glass-dock, .dock-layer-group) dock-root anchor — the consumer-namespace-leak; custom-property-only registers exempt) nor fakes a global gesture to dismiss third-party overlays (C2 no synthetic PointerEvent/MouseEvent dispatch in src/components/custom/dock/**). C3 the two dns-analysis relay regression shapes: a bare consumer .dock-layer sentinel outside a dock stays visible+static, and dismissOpenOverlays is definition-absent. Born-RED on HEAD (23 C1 violations + 7 sentinel leakers + the synthetic dispatch) -> GREEN + a 7-check self-test. Sibling reader proof:dock-opacity-lockstep FOLLOWS the anchor (its comma-pair locators tolerate a leading :where(...))." },
    { id: "proof:dock-story-modularize", cmd: "proof:dock-story-modularize", tags: ["local", "ci"], note: "BG.W-DOCK-STORY-MODULARIZE (A10-SPLIT, COHERENCE FOLD G7 MR-1) — the dock-story protection + cleanup gate. P1 liquid-playground.vue OWNS the ONE dock + TABS facility (GlassDock + DockStack + mode=facets); P2 both orientations (H+V); P3 dock-gallery.vue is the pure BREADTH gallery (0 GlassDock — the dock+tabs facility lives ONLY in the lab, the definitional fact that split the clause); C1 no hardcoded real brand/song/artist names in the gallery rendered content (breadth-caption =attributes + comments excluded); I1 the modularize import-safety (every local dock-story import resolves on disk — 'Gate against broken imports'). CONFIRM+GATE: the content cleanup + examples/ carve pre-landed at BE.W-LIQUID-MORPH, the god-module stories (liquid-playground 930L / overview 680L) are demo-ratchet-exempt (proof:no-god-module scans src/ only) so the modularize is DEFERRED per M11. Device-free pure-FS; born-RED via a 7-bite self-test. Bite: a gutted lab / a dock in the gallery / a re-added real name / a broken import → RED." },
    {
        id: "proof:dock-engine-unify",
        cmd: "proof:dock-engine-unify",
        tags: ["local", "ci", "release"],
        note: "BG.W-DOCK-ENGINE-UNIFY — the ONE useDockSpring factory + the busy-signal single-source. U1 the factory (composables/useDockSpring.ts) is the band's SOLE new SpringProgress site (exactly-one, PRM-armed, LIGHT-surface fence, exports useDockSpring). U2 dockMorphContext CONSUMES it (zero raw new SpringProgress, imports+calls the factory, passes DOCK_SPRING.response/dampingFraction, still writes --dock-morph-t + arms data-morphing). U3 the busy signal is [data-morphing]-single (set/read/clear the attr, NO boolean morphing=ref shadow). The dir-wide raw-spring census is a PROGRESS fact (the 4 sibling morph surfaces drain onto the factory in their own waves). Born-RED at HEAD (factory absent + dockMorphContext raw spring) -> GREEN + a 5-bite self-test. The binding PAINT is proof:dock-engine's live --dock-morph-t envelope + the proof:ba-gestalt dock verdict. Bite: a raw new SpringProgress re-introduced in the orchestrator (U2 dual-path) / a non-PRM-armed or two-spring factory (U1) / a boolean morphing=ref busy shadow (U3) -> RED.",
    },
    {
        id: "proof:dock-arbitrary",
        cmd: "proof:dock-arbitrary",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-ARBITRARY — the dock morphs into ARBITRARY sizes/shapes on the ONE --dock-morph-t clock. A1 the radius+clip-path silhouette is a token lerp (--dock-shape-from/to in dock/shape.css, the single authority; the default no-op lerp = the circle↔pill identity, the arbitrary teardrop/blob is consumer-opt-in per presets-in-consumers); A3 compositor-only (clip-path:inset() on the scalar, no per-frame width/height); A4 the useLiquidFlex --stretch swell capped at 1.08 + zeroed under PRM; A5 V↔H shares the mechanism. Bite: a static border-radius / a per-frame layout leg / an uncapped --stretch → RED.",
    },
    {
        id: "proof:dock-shrink-blur",
        cmd: "proof:dock-shrink-blur",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-SHRINK-BLUR — the shrunken dock is NOT a blurry mess: the resting self-blur (filter:blur) is gated to [data-morphing] so the COLLAPSED pill reads crisp (filter:blur(0px) at rest, sharp glyph+edges), the 3px decongest bloom present only transiently mid-morph. S3 the backdrop 9px byte-frozen; S4 the PRM carve. Bite: an un-gated resting filter:blur / a backdrop-blur change → RED.",
    },
    {
        id: "proof:liquid-morph",
        cmd: "proof:liquid-morph",
        tags: ["local", "ci", "release"],
        note: "BC.W-LIQUID-MORPH — the arbitrary-shape morph is NEVER white, NEVER invisible. M1 the reserve floor max(var(--dock-morph-to), --dock-morph-min) (reserves the SETTLED box, a single layout solve, no --dock-morph-t in the value); M2 the scale floor max(...,0.06); M3 the measure-failure guard (a to:0 worst-case seats at the floor — a visible glass sliver, not a white void); M4 the compositor-only teardrop bridge (clip-path neck, not per-frame width). Bite: a bare reserve / an unfloored scale / a per-frame-width bridge / a missing morphMinFloorPx → RED.",
    },
    {
        id: "proof:aria-orientation",
        cmd: "proof:aria-orientation",
        tags: ["local", "ci", "release"],
        note: "BE.W-ARIA-ORIENTATION-GUARD — SegmentedTabs' aria-orientation is role-conditional (the PagerDots emit-iff-on-allow-listed-role idiom). A1 isUnderline-gated · A2 undefined-drop on the role=group pill arm (Vue drops an undefined-bound attr — the WAI-ARIA-§6.3-prohibited attr GONE on the default render) · A3 the underline (tablist) arm KEEPS the isVertical?'vertical':'horizontal' axis (no over-cut) · A4 the role stays role-per-variant (no laundering the pill to a legal role). Born-RED on HEAD's unconditional :aria-orientation. The RENDERED-DOM proof is tests-visual/aria-orientation.spec.ts. Bite: the unconditional HEAD shape reds A1+A2, the attr deleted on both arms reds A3, a laundered role reds A4.",
    },
    {
        id: "proof:dock-a11y",
        cmd: "proof:dock-a11y",
        tags: ["local", "ci", "release"],
        note: "BE.W11 — de-shadcn the liquid-dock SEMANTICS. The bloom/fission triggers are REAL <button>s (no <div role=button> faking) carrying aria-expanded; the bloomed sheet/player is a labelled role=dialog (NOT an aria-hidden husk) + a polite aria-live open announcer + real focusable controls; only decorative layers (goo blob, eq bars, glyph/album) stay aria-hidden; every interactive control composes .focus-ring (the token ring on the un-filtered layer); the bloom origin is STATE-DRIVEN :inert; the plates route blur through the COMPOSED --glass-blur-floating so the --glass-level a11y brackets reach. Device-free SFC+CSS source detector + self-test bites. Bite: a div role=button trigger / a wholesale aria-hidden content husk / a hardcoded blur(...px) bypass / a missing focus-ring → RED.",
    },
    {
        id: "proof:dock-vertical-clickable",
        cmd: "proof:dock-vertical-clickable",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-VERTICAL-FIX — the VERTICAL dock works + is CLICKABLE (the BB unclickable defect). The two-line root fix (GlassDock visualExpanded, engine byte-untouched); the vertical dock's controls carry real >=44px tap hit-rects. Closes the pre-existing proof:dock-tap-integrity vertical failure. Bite: an inert vertical control / a sub-44 hit-rect → RED.",
    },
    {
        id: "proof:dock-collapsed-both",
        cmd: "proof:dock-collapsed-both",
        tags: ["local", "ci"],
        note: "BC.W-DOCK-COLLAPSED-BOTH — vertical AND bottom dock COLLAPSED states + a few tab items + persistent controls (demo-shell composition over the UNCHANGED library collapse engine: BottomDock a bounded summary window of DockTabButton #collapsed chips; SidebarDock host-conditional collapsible, the mobile Sheet the expand affordance). Bite: a broken collapsed state / a lost persistent control → RED.",
    },
    {
        id: "proof:dock-stack-rail",
        cmd: "proof:dock-stack-rail",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-STACK-RAIL — the macOS hover-expand stack rail, a CLEAN-BREAK rebuild (DockRail/divider-carousel RETIRED → DockStack). Extend-beyond, hover-expand (reusing HOVER_INTENT_MS, not a re-forked state machine), 3-configurable, scrollable, n-stack; the fan-out compositor-only on --spring-dock (the engine clock, ridden not edited), staggered by --dock-stack-stagger, PRM-carved; seats at the dock EDGE via the kept .glass-dock-frame/--dock-rail-extend-length escape. SUPERSEDES proof:rail3 + the rail clauses of proof:dock-sections. Bite: a re-forked collapse machine / a layout-animated fan / a lost extend-beyond → RED.",
    },
    {
        id: "proof:dock-rail-realize",
        cmd: "proof:dock-rail-realize",
        tags: ["local", "ci", "release"],
        note: "BE.W-DOCK-RAIL-REALIZE — the RAIL-AS-HAIRLINE (user defect #4). The standalone vertical glass CAPSULE (.liquid-rail-dock + useLiquidRail, a 2nd dock + a 3rd rail engine) is DELETED wholesale (no legacy); the rail is now a `mode=\"facets\"` RENDER MODE on the shipped <DockStack> — a hairline strip of accent-tinted facet chips fanning in a real dock's gutter, box-INVIOLATE. EXTENDS proof:dock-stack-rail (S1-S6 re-asserted GREEN). R1 the facet mode exists ONCE on DockStack (mode=stack|facets, default stack byte-identical; NO second component). R2 the per-facet --glass-accent FLOOR (each chip writes its own context hue off the per-instance chromatic-rim axis). R3 the fork DEFINITION-ABSENT (useLiquidRail.ts + liquid-rail.css gone, demo.css @import gone, box-INVIOLATE — the .glass-dock-frame escape un-clipped, the fan on the ONE --spring-dock clock, the projection helper PURE). R4 ONE registry — the facet click writes the consumer v-model, no shadow. R5 the CLAUDE.md doc-reconcile (proof:rail3/rail3.spec/--dock-rail-seam-offset/proof:rail-extend GONE; the facet mode documented). Born-RED on the capsule-fork tree (9b301f4a). Bite: a 2nd rail SFC / a flat-fill facet / a surviving useLiquidRail / a re-clipped frame / a stale proof:rail3 CLAUDE.md ref → RED.",
    },
    {
        id: "proof:dock-cockpit",
        cmd: "proof:dock-cockpit",
        tags: ["ci", "release"],
        note: "BC.W-AX-DOCK-COCKPIT — the [data-preset=cockpit] dock preset (cross-repo speedtest-AX A-9): a fixed 2.75rem control floor + --dock-label-ratio beside the density rungs, closing the dock-oversize chronic. The FEATURE_EXEMPT census preserved (proof:dock-unify). Bite: a cockpit preset off the 2.75rem floor / a missing --dock-label-ratio → RED.",
    },
    {
        id: "proof:dock-persistent-cut",
        cmd: "proof:dock-persistent-cut",
        tags: ["local", "ci", "release"],
        note: "BG.W-DOCK-PERSISTENT-CUT (D8) — remove the persistent ℱ brand wordmark + its long-press Fourier-redraw egg atop the SidebarDock (iOS-26 HIG: glass is the floating NAVIGATION layer, never content — the brand vanity the content-first tab bar avoids). Device-free SOURCE arm (pure FS): P1 comment-stripped SidebarDock.vue carries ZERO ℱ-egg tokens (useLongPress/fireRedraw/wordmarkPress/redrawFired/#persistent slot/ℱ glyph U+2131/glass-ui-demo:f-redraw dispatch; a provenance COMMENT does not flag — the strip fence); P2 the `c.id !== \"foundations\"` filter GONE + `!c.reference` survives (Foundations rejoins the roving tablist, one tab-stop); P3 BottomDock.vue's #persistent PanelLeft category-Sheet trigger SURVIVES (the load-bearing mobile nav is not deleted — 'atop BOTH docks' is imprecise, BottomDock has no ℱ); P4 demo/eggs/useLongPress.ts + FRedrawOverlay.vue DEFINITION-ABSENT (zero-consumer leaves); P5 comment-stripped AppShell.vue carries ZERO FRedrawOverlay refs (import/mount + onFRedraw/showFRedraw + the f-redraw listener); P6 demo/eggs/fGlyphPoints.ts SURVIVES (shared with the substrates band's fourier-paths.ts — a co-deletion forbidden). Born-RED on HEAD (the ℱ slot + egg + filter present). Bite: a re-added useLongPress import / a #persistent ℱ slot / a re-added foundations filter / a deleted BottomDock PanelLeft / a surviving egg leaf / an AppShell FRedrawOverlay import / a co-deleted fGlyphPoints → the matching clause RED; a bare comment mentioning ℱ does NOT flag (the strip fence).",
    },
    {
        id: "proof:tabs-ios",
        cmd: "proof:tabs-ios",
        tags: ["local", "ci", "release"],
        note: "BC.W-TABS-IOS — iOS-27 small stadium glass PILLS (not squared, not reka/shadcn-flat). T1 the --radius-tab aliases the ONE --radius-pill source (the px literals + 640px radius bumps DELETED, clean break); T2 the active pill is a distinct lifted glass plate (--glass-bg-floating-tinted + the BLACK-BAR rim-top/-bottom + glass-shadow-floating lift); T3 no dark D2 ring on the track/indicator; T4 the drag engine fence (aria + roving + the cap lockstep const==token in [1.0,1.2]); T5 the active label legible. Reads the DESHADCN census (zero residual shadcn-neutral). Bite: a squared/flat tab / a px-literal radius / a dark ring / a raw untinted plate → RED.",
    },
    {
        id: "proof:liquid-tab",
        cmd: "proof:liquid-tab",
        tags: ["local", "ci", "release"],
        note: "BC.W-LIQUID-TAB — pull an active tab → it MORPHS/squishes/flings to location. L1 draggable default true; L2 the gel cap >=1.12 (1.15 const+token lockstep); L3 no second engine (composes useDragMorph → kf Draggable/SpringProgress/useLiquidFlex + the snappy SPRING_PRESETS row, no local rAF/spring); L4 the CONSUME marker (reads SPRING-EASE snappy); L5 additive a11y (the drag-snap writes the SAME model → same aria flip; the keyboard path byte-identical, WCAG 2.1.1). Compositor-only (translate+scale, proof:no-layout-animation GREEN). Bite: a second spring engine / a gated roving / a layout-animating pull → RED.",
    },
    {
        id: "proof:underline-tune",
        cmd: "proof:underline-tune",
        tags: ["local", "ci", "release"],
        note: "BC.W-UNDERLINE-TUNE — the underline retuned, audacious type, the spring EASED (not abrupt): the indicator glide FILLS its clock (reads the SPRING-EASE eased snappy by name, the indicator-clock half in lockstep — ONE source, springPresets byte-untouched, proof:spring-tokens-synced GREEN). proof:animation-coherence holds. Bite: an abrupt/truncated underline glide / a duplicate curve prescription → RED.",
    },
    {
        id: "proof:virtual-window",
        cmd: "proof:virtual-window",
        tags: ["local", "ci", "release"],
        note: "BC.W-VIRTUAL-WINDOW — the homecoming: the virtualized-section-windowing primitive RETIRED at v1.0 re-minted onto the /virtual subpath (off the value.js-free root barrel — the heavy-DOM-measure leaf, deliberately off-root). VW1 the pure-engine stateless binary (findSectionOffset binary-search byte-identical to the 1000-id linear scan); VW2 the composable full-API house leaf (ResizeObservers route the house composables/dom/useResizeObserver); VW3 the useWindowedStore generation-counter race-guard; VW4 the /virtual subpath published (exports + typesVersions); VW5 >=2 consumers (words + dock-search), off-root, no @tanstack fork. Bite: a vue import in the pure file / a real @tanstack import in src/ → RED.",
    },
    {
        id: "proof:toc-reconcile",
        cmd: "proof:toc-reconcile",
        tags: ["local", "ci", "release"],
        note: "BC.W-TOC-RECONCILE — the 3-way ToC-tracking fork reconciled onto the ONE glass-ui/sidebar + the 3 missing leaves added (useScrollTo / useClickDelegate / useLazyLoader), NO re-mint. useScrollTo.ensureTargetLoaded bridges onto VIRTUAL-WINDOW's useVirtualSectionWindow.ensureTargetWindow; data-toc-id stays canonical (reconcile onto it, not re-invent). The leaves ride the existing /sidebar export. Bite: a second ToC engine / a re-minted windowing / a non-data-toc-id active reader → RED.",
    },
    {
        id: "proof:fuzzy-harden",
        cmd: "proof:fuzzy-harden",
        tags: ["local", "ci", "release"],
        note: "BC.W-FUZZY-HARDEN — glass-ui/search is the canonical client fuzzy pipeline (the VSCode-scorer); HARDEN the dock-composable-ready surface (prefix-cache + multi-token AND + match-index highlighting intact, NO scorer edit — the one-directional fence) + the useAsyncSearch race-guard DECISION (>=2-consumer-OR-BOOK). Bite: a scorer edit / a lost prefix-cache / a missing match-index highlight → RED.",
    },
    {
        id: "proof:customizability-census",
        cmd: "proof:customizability-census",
        tags: ["local", "ci"],
        note: "BC.W-CUSTOMIZABILITY-CENSUS — the 'fully customizable with golden defaults' structural invariant + the per-component EXACTLY-ONE-LIST census {gold|gap|token-only-correct} (a synthetic bare new component reds). C1 no hardcoded control type/height off the --control-* cohort (CONTROL-CUSTOM); C2 overlay golden uniformity — surface axis + φ --overlay-pad on the 6 center-floated pickers, Sheet/Drawer edge-anchored exempt (OVERLAY-UNIFORM); C3 no fork-forced px literal in a compound component (SEARCH-CUSTOM); C4 audacious-type-not-starved (the tunable hero rung — books to BC.W-HERO-AUDACIOUS, Band 5). + CP1 the data-protagonist MetricRow emphasis. A CUT close oracle; born-RED until ALL four threads land (C4 at Band 5). Bite: a bare text-sm/h-N control / an un-threaded picker / a fork-forced px literal → RED.",
    },
    {
        id: "proof:search-custom",
        cmd: "proof:search-custom",
        tags: ["local", "ci"],
        note: "BC.W-SEARCH-CUSTOM — the SearchBar/FuzzySearch first-principles customization + glassify (de-shadcn'd onto the house registers): size/surface/variant axes + token-backed icon/button/result magnitudes + the .glass-menu-row result register + the glass expand modal + the φ overlay-pad ladder + the variant=bare/floating rung DELETING the !important-fighting-CVA escape (flips census C3). Box-inviolate with FUZZY-HARDEN (a READ of fuzzyMatch only). Bite: a glyph px-literal / a surviving !important CVA escape / a non-.glass-menu-row result → RED.",
    },
    {
        id: "proof:metric-hover",
        cmd: "proof:metric-hover",
        tags: ["ci", "release"],
        note: "BC.W-AX-METRIC-HOVER — the cross-repo speedtest-AX value-lift on the existing .metric-badge:hover slots (--metric-badge-hover-translate -2px + scale 1.04 + --shadow-cartoon-sm), compositor-only, reading the corrected glass rungs. Bite: a non-compositor lift / a missing hover value-lift → RED.",
    },
    {
        id: "proof:fourier-decides",
        cmd: "proof:fourier-decides",
        tags: ["local", "ci"],
        note: "BC.W-FOURIER-DECIDES — the cross-repo fourier process leaf: the two BOOK promotion-trigger records (AtomDiff #4, canvas-anchored-overlay #7 — the ≥2-bar genuinely UNMET, evidence + named trigger) + the no-silent-drop handshake. Pairs with BC.W-FOURIER-ASK (disjoint). Bite: a BOOK without a named promotion trigger / a silent drop → RED.",
    },
    {
        id: "proof:tier-class-staleness",
        cmd: "proof:tier-class-staleness",
        tags: ["local", "ci"],
        note: "BC.W-FOURIER-DECIDES (#12 BUILD-as-gate) — extends the shipped proof:consumer-staleness harness to lint a consumer's stale tier-class references. Bite: a stale tier-class consumer reference un-flagged → RED.",
    },
    {
        id: "proof:radio-fix",
        cmd: "proof:radio-fix",
        tags: ["local", "ci", "release"],
        note: "BC.W-RADIO-FIX — radios WORK + proper toggle states (the chronic §F 'radios don't work' killed at ROOT): the @utility touch-hit-area coarse ::before hit-overlay carried pointer-events:auto, intercepting the real pointer before reka's host onClick — flipped to pointer-events:none (the pointer falls through, the 44px WCAG floor stays as pure geometry). Generalized the Slider's local fix to the SHARED utility (Checkbox/Switch/RadioGroupItem/TagsInput/MultiSelect all gain the integrity fix). R1 the checked ring reads var(--control-checked-bg) translucent glass; R2 a legible centre dot (contrast pair); R3 the unchecked --control-ring outline + the focus-ring. Bite: a pointer-events:auto hit-overlay / a same-hue dot / a dropped focus-ring → RED.",
    },
    {
        id: "proof:dropdown-fix",
        cmd: "proof:dropdown-fix",
        tags: ["local", "ci", "release"],
        note: "BC.W-DROPDOWN-FIX — the dropdown trigger NO-SHIFT, aligned, the dot not occluded. D1 SelectContent/DropdownMenuContent align:start (not center); D2 the dot gutter structurally coupled + aria-hidden decorative; D3 the scroller scrollbar-gutter:stable (the no-shift fix is a pure layout reservation, never touches overflow/position/focus) + the .scroll-gutter-stable utility + the CLAUDE.md canon; D4 the min-w-(--reka-select-trigger-width) floor survives. SelectSeparator bg-muted re-pointed (flips the no-shadcn-default select residual). Bite: align:center / a dot without gutter / a non-decorative dot / a missing scroll-gutter → RED.",
    },
    {
        id: "proof:control-smooth",
        cmd: "proof:control-smooth",
        tags: ["local", "ci", "release"],
        note: "BC.W-CONTROL-SMOOTH — kill control lag; square borders → rounded; owns the CLOCK across controls (reads SPRING-EASE's re-timed register + AFFORDANCE-MAP's contract, does NOT re-author springs — the one-clock fence). Owns the toggle-outline / tags-input-ring / switch-thumb reskins per the DESHADCN census (flips those no-shadcn residuals onto .control-surface/.focus-ring). proof:animation-coherence + proof:no-layout-animation hold. Bite: a control-local spring / a lagging transition / a square border / a residual shadcn-neutral control token → RED.",
    },
    {
        id: "proof:config-right",
        cmd: "proof:config-right",
        tags: ["local", "ci", "release"],
        note: "BC.W-CONFIG-RIGHT — all configurators: controls on the RIGHT on desktop (the two-column aside, the LIBRARY Configurator standardized so the Band-4 viz studios CONFORM to it). Reads the BLACK-BAR rim + the PAGE-CHASSIS studio header. Bite: an aside on the left / a single-column desktop configurator → RED.",
    },
    {
        id: "proof:completion-seal",
        cmd: "proof:completion-seal",
        tags: ["ci", "release"],
        note: "BC.W-AX-COMPLETION-SEAL — the cross-repo speedtest-AX hero-scale earned-GOLD completion seal: a one-shot gold-draw mark + 4 @property motion tokens on the /completion-seal subpath, reading the W-PHASE-PALETTE --phase-complete-color/--color-gold (earned-gold, NOT the phase spectrum) + the AX-METAL-GLOW --metal-glow-*. Compositor-only. Bite: a seal off the gold register / a non-compositor draw / a missing @property motion token → RED.",
    },
    {
        id: "proof:webgpu-everywhere",
        cmd: "proof:webgpu-everywhere",
        tags: ["local", "ci"],
        note: "BC.W-WEBGPU-EVERYWHERE — the ONE WebGPU substrate floor every per-viz composes, the anti-BB-disease keystone. THE PICKER FIX: useGpuSubstrate replaced the synchronous presence-only commit with an async try-WebGPU-then-rebuild-WebGL2-SILENTLY shape (on ANY init failure — no adapter / device reject / device-lost / validation throw — it disposes the WebGPU leaf + rebuilds on the lazy WebGL2 net). W1 async picker; W2 typed WebGPUInitError signal (no uncaught 'no GPU adapter' throw, onInitError reserved for genuine post-arm violations); W3 (STANDING) no Canvas2D viz primary — born-RED on constellation/fourier-field/dot-flow, DELIVERED by their per-viz Band-4 waves (flips W3 GREEN at the band close); W7 every assembled WGSL compiles clean (the metaball `var target` WGSL-reserved-word bug — which made GooBlob silently run WebGL2 forever — FIXED → targetL). 28/28 live on Metal: every substrate route paints a non-blank field (blob, pure-black+PAGEERROR at HEAD, now paints). Bite: a sync presence-commit / a bare adapter throw / a WGSL reserved-word identifier / a Canvas2D-primary viz → RED.",
    },
    {
        id: "proof:safari-webgl",
        cmd: "proof:safari-webgl",
        tags: ["local", "ci", "release"],
        note: "BC.W-SAFARI-WEBGL — the WebKit/Safari WebGL2 fallback path PAINTS the same field (no blank, no teal/navy default). Adds the FIRST cross-engine matrix (the scoped headless-WebKit playwright project — same backdrop-filter:url() absence + context-eviction model as Safari; scoped so the chromium-only π corpus does not re-run on WebKit). createCanvasLifecycle stays the engine-agnostic resize/DPR/raf/visibility/dispose leaf. CI proves the WIRING, the local WebKit run proves the PAINT. Bite: a blank WebKit canvas / a Safari-unsafe extension/precision assumption → RED.",
    },
    {
        id: "proof:viz-interaction",
        cmd: "proof:viz-interaction",
        tags: ["local"],
        note: "BC.W-VIZ-INTERACTION — the shared pointer-velocity field every interactive viz reads (usePointerVelocityField, root barrel — pointer position+velocity+decay, rAF-coalesced on the substrate's frame clock, PRM-zeroed) + the gate-blindness cure (the live readback the ba-gestalt/spine-constellation pixel reader extends). Born-RED enforcement net. Bite: a second rAF / a non-PRM-zeroed field / a viz reading a forked pointer model → RED.",
    },
    {
        id: "proof:visual-reconcile",
        cmd: "proof:visual-reconcile",
        tags: ["local", "ci"],
        note: "BC.W-VISUAL-RECONCILE — the cross-band visual reconcile gate over the FIXED Band-1 identity: re-walks the booked proof:lensing (the BB .glass-lens --glass-refract press-swell, booked from Band 7 to here) + the viz-vs-glass coherence. Bite: a viz/glass identity drift / a regressed lensing press-swell → RED.",
    },
    {
        id: "proof:viz-aurora",
        cmd: "proof:viz-aurora",
        tags: ["ci", "local"],
        note: "BC.W-VIZ-AURORA — the aurora reads a living WARM-CREAM painterly wash (the BB aurora-core-dark defect cured) over the WebGPU-first substrate. A1 the dead-static-fall gone (no hardwareConcurrency/saveData css branch — low-core + PRM arm webgl, not css); A2 the preset preview is DEVICE-FREE (BD.W-PRESET-RENDER re-root: usePresetThumbnails paints via auroraFallbackGround — NO eager createAurora({mode:'capture'}), NO renderAt, NO -99999px capture canvas; the PRIOR await-armAsync-before-renderAt assertion was MIS-TRACED — the throw fired at the capture-mode createAurora CALL on no-device hosts, aborting all 13 cards before any renderAt, so an init-reorder fixed nothing; the clean break is no GL device at all); A3 the WGSL primary splices aurora-mediums.wgsl dispatching uMedium 1-7 (the anisotropic-Kuwahara painterly finish ports to WGSL — a real oil read on Safari, NOT smooth degrade; the full Starry-Night STROKE cascade stays the byte-untouched WebGL2 aurora.frag register); A6 warm-cream default, no teal-on-navy; A7 deriveAurora honors avoidHues. Bite: a css-static-fall / a smooth-only WGSL / a teal-on-navy token / a re-introduced capture-mode createAurora bake → RED.",
    },
    {
        id: "proof:gooblob-plain",
        cmd: "proof:gooblob-plain",
        tags: ["local"],
        note: "BC.W-GOOBLOB-PLAIN — the goo-blob reads as a proper LIQUID metaball (the BB blob-broken defect cured), lit-glass surface, warm identity (the live paint arm). The fs_main/main() is re-expressed as a uStage-gated kernel (variant=blob → uStage=1 → the stripped warm-cream floor: SDF circle + smin satellites + fwidth-AA + IGN gamma fill). Bite: a black/broken blob / a non-warm fill → RED.",
    },
    {
        id: "proof:gooblob-plain:source",
        cmd: "proof:gooblob-plain:source",
        tags: ["ci"],
        note: "BC.W-GOOBLOB-PLAIN — the device-free SOURCE floor (the --source arm): the uStage-gated stripped fs_main present in BOTH the WGSL primary + GLSL fallback, the warm-cream identity, the byte-faithful math. CI proves the SOURCE; the bare proof:gooblob-plain proves the PAINT (local). Bite: a missing uStage gate / a forked metaball math → RED.",
    },
    {
        id: "proof:fourier-field",
        cmd: "proof:fourier-field",
        tags: ["local", "ci", "release"],
        note: "BG.W-VIZ-DEMIGRATE — the fourier Canvas2D DE-migration gate: U1 one-view (kept), U2 useCanvas2D + no createGpuSubstrate/setupWGPU-GL/no .wgsl-.glsl, U3 fourierFieldDraw.ts IMPORTS+CALLS math.ts partialSumAt/positionsAt (the ONE evaluator USED not forked), U4 no-variant, U5 warm-cream.",
    },
    {
        id: "proof:viz-constellation",
        cmd: "proof:viz-constellation",
        tags: ["local", "ci", "release"],
        note: "BG.W-VIZ-DEMIGRATE — the constellation Canvas2D DE-migration SOURCE gate (born-RED on the WebGPU HEAD → GREEN at the swap): C1 useCanvas2D + no createGpuSubstrate/no .wgsl-.glsl shaders, C2 the four neutral ctx draw passes (drawEdges/drawNodes/drawPointerWeb/drawRipples + ctx.arc/stroke), C3 render composes the passes, C4 ONE math source (constellationField buildEdges/seedField/stepField), C5 warm-cream no-teal. Bite: a createGpuSubstrate / a surviving .wgsl / a removed or un-called draw pass → RED.",
    },
    {
        id: "proof:viz",
        cmd: "proof:viz",
        tags: ["local", "ci", "release"],
        note: "BG.W-VIZ-RESIZE-ADOPT — viz-resize-UPLOAD-ONLY source gate (born-RED on HEAD → GREEN at the hard-adopt). The ONE backing-store sizer `sizeBacking` (createCanvasLifecycle.ts) measures the LAID-OUT gBCR (never clientWidth) and sizes the backing to round(gBCR × dpr); every one of the 9 procedural viz threads `dprPolicy` + its resize/render closure is UPLOAD-ONLY (no self-measure, no canvas.width= self-size — the leaf owns sizing). V1 one-sizer-gBCR-round · V2 no clientWidth||-self-measure · V3 no canvas.width=-self-size (auroraFallbackGround.ts offscreen-raster EXEMPT) · V4 dprPolicy threaded at all 9 createGpuSubstrate call-sites · V5 sizeAndUpload routes sizeBacking(canvas, dprPolicy)→options.resize(s). Device-free SOURCE arm; the live per-viz backing==round(gBCR×dpr) + meanByte>floor SPA-nav paint on Chrome AND Safari rides the orchestrator real-Metal capture (the cardinal split). Bite: a planted clientWidth||320 / canvas.width= / dprPolicy-less createGpuSubstrate / clientWidth-sizeBacking → RED (--selftest). + BG.W-VIZ-PREVIEW-LIVE (P1-P4): the per-STORY distinct-preview-still source arm — the /substrates bento painted 11 IDENTICAL frozen aurora stills (every card shared the ONE category fieldStill); the cure is a per-story dispatch off the colocated demo/stories/vizPreviewStill.ts registry (11 route entries, each a DISTINCT (pattern,hue,seed) triple → 11 distinct Canvas2D-raster stills) that SectionPreviewCard.vue reads off its route, so per-card pixel-hash differs BY CONSTRUCTION over ZERO live GL contexts. P1 registry≥11-entries · P2 pairwise-distinct-descriptor · P3 card-imports+dispatches-per-route · P4 device-free-2d-raster+memoized (no live GL/WebGPU). Device-free SOURCE arm; the LIVE per-card-pixel-hash paint rides the orchestrator real-device /substrates capture (the cardinal split). Bite: a shared descriptor / <11 entries / a card not importing vizPreviewStill / a GL-arming still → RED (--selftest).",
    },
    {
        id: "proof:viz-dotflow",
        cmd: "proof:viz-dotflow",
        tags: ["local", "ci", "release"],
        note: "BC.W-VIZ-DOTFLOW — the RETOPOLOGIZED dot-flow-field SOURCE gate (born-RED on the bare BB tree → GREEN at the retopology). The cure for the BB dot-flow noise defect (§E: 'does not form waves/shapes, a mess of NOISE; must be SUBTLE, form LARGER + more SWEEPING waves'). The free-advecting particle cloud → an ANCHORED DOT-MATRIX + a restoring spring + brightness-shape modulation; the coherence regime inverted (octaves 6→2-3, λ₀ 2.4→2.5×, curl 0.6→0.12, windSpeed 1.0→0.3); the Canvas2D fallback retired for a pure WebGL2 fragment; the teal-on-navy fabricated reference GONE (warm-cream identity default). The DEVICE-FREE SOURCE arm; the live-GPU gestalt paint (the stable lattice + the ONE sweeping band, both modes) rides tests-visual/flow-field.spec.ts + the DELTA (W-REFLECT3, the cardinal split). F1 (no-advection/no-reseed) is SCOPED to the cs_field brace-span — the compute kernel is now DUAL-MODE (cs_field = the ANCHORED lattice register; cs_flow = the RE-INVENT AURORA-CURRENT register that legitimately forward-Euler advects), so a whole-file advection grep false-trips the legit cs_flow integrator (BD W-CUT reconcile). Bite: re-introduce the high-octave noise regime / a Canvas2D fallback / a teal-navy literal / a reseed-or-advection INSIDE cs_field → RED; the legit cs_flow advection must NOT red.",
    },
    {
        id: "proof:viz-papergrid",
        cmd: "proof:viz-papergrid",
        tags: ["local", "ci", "release"],
        note: "BC.W-VIZ-PAPERGRID — the liquid paper-grid SOURCE gate (born-RED — the viz does not exist on HEAD → GREEN at the build). The cure for the BB paper-grid mess (§E: 'a mess → fix to be evenly spaced + LARGER; the grid LINES must morph + wave in a liquid way; suffuse it throughout the site as a subtle background element'). A static linear-gradient cannot warp — the liquid grid is a per-pixel fragment field: the Ben Golus derivative-AA distance (the crisp-line fix), the IQ domain warp of the UV (the 'liquid'), the Bridson divergence-free curl driving the warp coherently (WHY it's liquid not noise). BORN WebGPU-first — a fullscreen fragment on both backends (no Canvas2D path), the FIRST WGSL curl consumer (mints flow.wgsl.ts). The DEVICE-FREE SOURCE arm; the live-GPU gestalt paint (the crisp evenly-spaced LARGE-cell liquid grid, the pointer bulge, the suffusion, both modes + WebKit) rides tests-visual/paper-grid.spec.ts + the DELTA (W-REFLECT3). BD.W-VIZ-RESPEC RETIRE: the LINE-warp curlWarp + the radial cursorBulge are GONE (clean break, no alias); P3/P4 re-pointed at the SHARED cellTwist/cursorSwirl warp from the waveField leaf (the curlFBM call now lives inside the spliced WAVE_FIELD_{WGSL,GLSL} chunk's cellTwist body, not the paper-grid shader directly) + a no-legacy fence (a re-introduced curlWarp/cursorBulge REDs); the binding numeric round-trip rides proof:wave-field's assertParity. Bite: a static-gradient grid / a Canvas2D path / a waveField leaf dropping curlFBM / a shader dropping the cellTwist warp → RED.",
    },
    {
        id: "proof:dot-matrix",
        cmd: "proof:dot-matrix",
        tags: ["local", "ci", "release"],
        note: "BC.W-VIZ-DOTMATRIX — the Fibonacci phyllotaxis dot-sphere SOURCE gate (born-RED on the bare tree — the dir does not exist → GREEN at the build). A NEW first-class procedural-suite member (the 'fine-dot spheres on dark' reference, §E): a globe of N fine dots on a sphere SURFACE via the Fibonacci phyllotaxis spiral, depth-shaded so it reads as a translucent dot-shell, slowly rotating, pointer-aware. Born WebGPU-first; the WebGL2 instanced-billboard fallback is GPU (NOT a Canvas2D context). The warm-cream identity is the library default; the mono-on-near-black reference is a DEMO preset. The DEVICE-FREE SOURCE arm (clauses 1-5: viz exists once + colocation/publication binary, the phyllotaxis math, useGpuSubstrate-compose, the warm-identity default, the story-covers-export); the on-host PAINT (clause 6, the near-hemisphere depth gradient + meanLum>0 on a WebGPU backend AND an adapter-less host) is the local real-GPU arm backstopped by tests-visual/dot-matrix.spec.ts + the DELTA (the cardinal split). Bite: a Canvas2D context / a non-warm default / a missing phyllotaxis math → RED.",
    },
    {
        id: "proof:teal-navy-purge",
        cmd: "proof:teal-navy-purge",
        tags: ["ci", "local"],
        note: "BC.W-TEAL-NAVY-PURGE — the cross-cutting warm-cream identity census (born-RED on the teal-on-navy disease → GREEN at warm-cream). §E verbatim: 'REMOVE the teal-on-navy reference entirely.' + the stray-blue ('WTF is this blue') hunt. The per-viz gates fence their OWN constants; THIS gate is the UNION enforcer + the demo-default flip + the fabricated-reference deletion + the stray-blue hunt + the live-warm-paint arm. T1 (source, ci) NO library viz-substrate constants (aurora/concentric/dot-flow/fourier/goo-blob/constellation) carries a teal/navy/cool-blue literal (OKLCh hue ∈ [180,270] above the W-NO-GRAY neutral chroma floor, or a blue-dominant hex) in a DEFAULT palette/background; the warm-cream defaults (hue ~28-90) pass; the silver/bronze brand-metal quad + the --chart-*/--viz-* semantic data tokens are OUT OF SCOPE. The library defaults are ALREADY warm — T1 is the FENCE that keeps them warm + catches a future regression. Bite: a teal/navy literal in a viz default → RED.",
    },
    {
        id: "proof:gooblob-meatball",
        cmd: "proof:gooblob-meatball",
        tags: ["local"],
        note: "BC.W-GOOBLOB-MEATBALL — the WGSL fwidth STRUCTURAL fix: the metaball.wgsl fwidth(N) (the Toksvig normal-variance spec clamp) sat INSIDE `if (uLit > 0.5)` AFTER the per-fragment alpha early-return — NON-uniform control flow, which WGSL rejects → the WGSL primary never armed → GooBlob fell to the WebGL2 net forever. RESTRUCTURED: hoisted the normal-derivative `length(fwidth(Nh))` to UNIFORM control flow (top of fs_main, before the alpha early-return, outside uLit/uShadow). + a net-new softShadow2D SDF march SYMMETRIC across WGSL+GLSL (the GLSL diff PURELY additive — the lit-glass/smin/normal/OKLCh math byte-untouched, gpu-substrate-single ΔE-0.0 parity held); uShadow/uShadowSoftness on the spare res.z/res.w lanes; variant=meatball flips uLit/uShadow on. The full LIT liquid metaball now arms via the WGSL primary (not the stripped fallback). The live PAINT arm; bite: a fwidth in non-uniform flow / a broken parity → RED.",
    },
    {
        id: "proof:gooblob-meatball:source",
        cmd: "proof:gooblob-meatball:source",
        tags: ["ci"],
        note: "BC.W-GOOBLOB-MEATBALL — the device-free SOURCE floor (--source): the fwidth(Nh) hoist is provably in uniform control flow (before the alpha early-return, outside uLit), the softShadow2D symmetric WGSL+GLSL, the typed-struct SoT lockstep (WGSL struct + GLSL uniforms + bridge + GL upload + types.ts). CI proves the SOURCE; the bare arm proves the PAINT (local). Bite: an inline-branch fwidth / a missing shadow lane → RED.",
    },
    {
        id: "proof:viz-hybrid",
        cmd: "proof:viz-hybrid",
        tags: ["local", "ci", "release"],
        note: "BC.W-VIZ-HYBRID — the goo-dot-matrix HYBRID viz (the /goo-dot-matrix subpath + colocation dir): composes the EXISTING goo-blob metaball (sceneDistG SPLICED from the metaball source, not re-forked) + the dot-matrix lattice (fibonacciDot IMPORTED), the dot-field fragment-swap register over createGpuSubstrate (no own rAF, the field consumed). WARM identity: BD.W-GOODOT-LIQUID-FIELD Move 3 re-graded the near-mono cream-on-cream core (the old { L:0.92, C:0.03, h:78 } gray-cream) to REAL chroma (C_core ≥ 0.13, the no-gray warm floor); clause 5 re-pointed at the NEW warm-CORE-stop fence (L≥0.5, C≥0.10, h∈[30,100]) — the exact-low-chroma-literal assert retired (it would force back the invisible-separation defect); the binding no-gray ΔL/C measurement is proof:goodot-liquid G3a. Bite: a re-forked metaball/lattice / a Canvas2D-primary / a second rAF / a teal stop → RED.",
    },
    {
        id: "proof:page-prune",
        cmd: "proof:page-prune",
        tags: ["local", "ci"],
        note: "BC.W-PAGE-PRUNE — every demo route earns its place (the PRUNE-LEDGER): the 21-SFC orphan composables/ dir DELETED (zero inbound refs proved), duplicate/dead stories collapsed, paper-backdrop-texture-system → paper-texture (clean break, no slug alias). The ABSENCE arm (a prune paints zero new pixels). Bite: a re-added dead view-source button / a coming-soon fiction / an orphan SFC → RED.",
    },
    {
        id: "proof:demo-copy-prune",
        cmd: "proof:demo-copy-prune",
        tags: ["local", "ci"],
        note: "BC.W-DEMO-COPY-PRUNE — the demo speaks to a DESIGNER, NOT tranche-jargon: D1 zero leaked wave-ID/§-number jargon in the comment-stripped RENDERED copy; D2 the dead view-source SUBSYSTEM (useSourceLoader/useStoryDemo/ToneSwatch/Story.sourceFiles + 4 orphan scaffolds) DELETED; D3 the PRUNE-LEDGER records every cut. Bite: a re-added wave-ID in rendered copy / a re-imported useStoryDemo / a re-added sourceFiles → RED.",
    },
    {
        id: "proof:page-chassis",
        cmd: "proof:page-chassis",
        tags: ["local", "ci"],
        note: "BC.W-PAGE-CHASSIS — every surviving route reads as ONE coherent StoryPage chassis (StoryPage + StoryHero + StoryHeader + SectionPreviewCard — the masthead + section rhythm), NOT a bespoke per-page layout. Reads the Band-1 glass identity + the per-category backgrounds. Bite: a bespoke off-chassis page layout → RED.",
    },
    {
        id: "proof:page-hierarchy",
        cmd: "proof:page-hierarchy",
        tags: ["local", "ci"],
        note: "BC.W-PAGE-HIERARCHY — section delimiting + the design hierarchy suffused on EVERY route, standardized: each named section carries the canonical √φ 20.4px section <h2> rung, consecutive sections are split by a visible hairline (mode `hr`) or sit in their own sub-card (mode `cards`), and NO route carries a second in-body descriptor header (the chassis hero is the ONE descriptor). The recognizable shape on every page: hero <h1> (R1) → section <h2 text-subheading> (R2) → mono eyebrow + blurb (R3/R4). Device-free SOURCE arm; the painted render rides the :5199 capture + tests-visual/page-hierarchy.spec.ts. Bite: a route with a double in-body header / an off-rung section heading → RED.",
    },
    {
        id: "proof:grid-simple",
        cmd: "proof:grid-simple",
        tags: ["local", "ci", "release"],
        note: "BC.W-GRID-SIMPLE — the blurry in-card grid ABROGATED → ONE crisp, evenly-spaced, LARGER, full-bleed page grid (the keyframes.js EditorShell magnitudes). G1 the clean break (no alias): --story-grid-size/--story-grid-color/center-center GONE from story-hero.css; G2 ONE rhythm source --grid-pitch(1rem)/--grid-major(5rem)/--grid-line(3%)/--grid-line-major(11%) in scale-paper.css, the demo .grid-bg reads them, --paper-grid-texture-size unifies onto --grid-pitch (no parallel 28/32px); G3 crisp by construction (hard 0-1px stops, position 0 0, no filter/backdrop-filter); G4 full-bleed .story-hero-bg--bleed (NOT a -z-10 boxed mount read through a blurred wash plate); G5 ONE warm-ink color-mix(--foreground) line, NO teal/navy (the foreground-flip re-tint, no parallel --grid-*-dark family); G6 static by construction, no GL dir/rAF/canvas. SUPERSEDES proof:page-redesign's 4 retired grid clauses (the single-gate grid coverage homes here). Device-free SOURCE + per-clause self-test bites + tests-visual/grid-simple.spec.ts. Bite: re-introduce --story-grid-*, a stray 28/32px pitch, a soft-ramp/center-center grid, or a teal/navy literal → RED.",
    },
    {
        id: "proof:ghost-dashed",
        cmd: "proof:ghost-dashed",
        tags: ["local", "ci"],
        note: "BC.W-GHOST-DASHED — the ONE ghost/empty-slot dashed register + rounded-everywhere-it-should-be: the 6 ad-hoc `border-dashed` forks (three radii, three hosts, three pads) COLLAPSE onto `.ghost-slot` (a dashed-outline plate, --radius-card rounding, calm-muted warm dashed color, translucent host), and everything that SHOULD be rounded IS rounded (the iOS-concentric-corner bar). Device-free SOURCE arm; the render (border-style dashed + radius == --radius-card + warm color, the rounded witnesses non-zero) rides tests-visual/ghost-dashed.spec.ts + the proof:ba-gestalt verdict. Bite: a re-added ad-hoc border-dashed fork / a square placeholder → RED.",
    },
    {
        id: "proof:hero-audacious",
        cmd: "proof:hero-audacious",
        tags: ["local", "ci"],
        note: "BC.W-HERO-AUDACIOUS — the herostudios-grade audacious-type hero pages, per-category icons, each DISTINCT (not a duplicated grey-card grid). APPLIES the existing √φ display ladder (demo-private, zero src/ paint): the front door + the 11 section landings reach the audacious display rung, each category gets a DISTINCT {icon, sectionHue, heroPalette, bgKind} from the ONE CATEGORY_HERO map, the redirect cards compose the shipped <IconChip> (NO re-paste) + an inline preview + the Fira-Code subpath chip, the per-category hue the ONE color event (chip + eyebrow only — title + body stay warm ink, the herostudios restraint). Flips proof:customizability-census C4 GREEN. Device-free SOURCE witnesses + tests-visual/hero-audacious.spec.ts. Bite: a hero capped below the audacious rung / a duplicated icon-less grey slab / a second per-category color event → RED.",
    },
    {
        id: "proof:hero-fit",
        cmd: "proof:hero-fit",
        tags: ["local", "ci"],
        note: "BG.W-HERO-FIT (D10) — bound the hero headline to its viewport on ONE chassis-owned title path (the title-source assert). At HEAD compositions/hero + foundations/intro hand-authored a bare `<h1 class=\"text-display-{hero,mega} max-w-5xl\">` via `:hero-title=\"false\"`, bypassing the chassis fit-cap (244.8px / 157% svh@1440 — the viewport-dominating defect). This wave retires that second lane: the chassis (StoryHero → .story-hero-title[data-hero-scale]) renders EVERY hero <h1> through ONE height-aware fit-cap off the MANDATORY short `displayTitle` (renders `displayTitle ?? title`); the page customizes the title CONTENT (the inline ℱ ornament) via the #title-ornament slot, never by forking the <h1>. auth-shell KEEPS its bespoke display-1 title (the carve fence). SIX device-free SOURCE witnesses (HF1 one-path · HF2 chassis renders displayTitle + ornament slot · HF3 mandatory displayTitle in the manifest rows · HF4 max-w-5xl dropped · HF5 height-aware svh fit-cap + single-source --story-hero-cpl/--story-hero-est-lines · HF6 auth-shell keep-fence) + an 8-bite self-test. Class P — the captured-paint truth (the rendered <h1> block ≤0.62×svh at 375/768/1440/1920, font-size ≥ computed(display-4) at ≥768, no hyphenation@375, a preview card above the fold) is the W-REFLECT3 π. Bite: a re-added :hero-title=false / bare poster <h1> / a dropped svh term / a row losing displayTitle → RED.",
    },
    {
        id: "proof:code-blocks",
        cmd: "proof:code-blocks",
        tags: ["local", "ci"],
        note: "BC.W-CODE-BLOCKS — component names + technical values → ONE Fira Code code register: every component name (<GlassDock>), token (--glass-bg-floating), subpath, px/numeric value reads in ONE consistent Fira-Code treatment — a tinted inline <Code> chip for the inline case, a real multi-line <CodeBlock> glass plate (with a copy affordance) for the import-snippet case. The 3-way fira-code/font-mono/bare-<code> fork collapses onto the ONE <Code>/<CodeBlock> register (display/card.vue's 45 font-mono runs the headline re-author). Device-free SOURCE; the render (consistent chips, the glass-quiet code-block plate over a busy backdrop, the copy affordance) rides tests-visual/code-blocks.spec.ts. Bite: a re-added font-mono/bare-<code> fork on an enrolled surface → RED.",
    },
    {
        id: "proof:separator-fix",
        cmd: "proof:separator-fix",
        tags: ["local", "ci"],
        note: "BC.W-SEPARATOR-FIX — the Separator label-centering rebuilt + the /display/separator page re-authored. THE ROOT was the COMPONENT: the labelled separator was an ABSOLUTE span pinned to the line's own 1px height with a `bg-background` occlusion trick (the text overflowed the 1px box; bg-background cannot occlude the translucent rebuilt material — the line bled through the label). The fix is the architectural transposition: a FLEX split-rule [rule flex-1][label][rule flex-1], the label naturally centered by the flexbox, the rule two warm-ink segments (─── or ───), correct on ANY host; the page demos sit in correctly-padded rounded <Card>s. Device-free SOURCE + tests-visual/separator-fix.spec.ts. Bite: a re-introduced absolute-pinned label / a bg-background occlusion trick → RED.",
    },
    {
        id: "proof:compositions-hero",
        cmd: "proof:compositions-hero",
        tags: ["local", "ci"],
        note: "BC.W-COMPOSITIONS-HERO — /compositions/hero made DISTINCT from the homepage; /foundations/intro three-heroes → ONE; the platitudes + the 'View the source' button pruned. At HEAD /compositions/hero was a near-verbatim clone of the front door (same typing intro + §01/§02/§03 three-claim grid) and the front door stacked THREE display moments. Riding BC.W-HERO-AUDACIOUS's size discipline: the intro collapses to ONE audacious text-display-mega wordmark-hero; /compositions/hero is re-authored as a DISTINCT composition showcase at text-display-hero; the platitudes + 'View source' are gone. Device-free SOURCE witnesses + tests-visual/compositions-hero.spec.ts. Bite: a re-cloned homepage intro on /compositions/hero / a re-stacked three-heroes front door / a re-added view-source button → RED.",
    },
    {
        id: "proof:expandable-part",
        cmd: "proof:expandable-part",
        tags: ["local", "ci", "release"],
        note: "BC.W-EXPANDABLE-PART — the ExpandableContainer ::part()/named-slot chrome-hook seam (the Atlas AR-7 expand-fullscreen seam; no consumer fork). A consumer re-skins OR fully REPLACES the fullscreen-overlay chrome (the corner expand/collapse glyph, the overlay frame) WITHOUT forking the SFC's body-teleport + body-overflow-lock + Escape machinery. The Vue-idiomatic ::part()/slots equivalent: (1) STABLE `data-part` attributes (styled via a PLAIN descendant selector, NOT a :deep() reach), (2) NAMED slots (#expand-trigger/#fullscreen-chrome) for full replacement, each with a today-default fallback (the unfilled-slot no-op floor is byte-identical), exposing ONLY the expand/collapse callbacks (thin wrappers over the SAME v-model:open — no parallel state path). Device-free SOURCE + a self-test bite. Bite: a removed data-part / a :deep()-only reskin path / a parallel state fork → RED.",
    },
    {
        id: "proof:scroll-trigger",
        cmd: "proof:scroll-trigger",
        tags: ["local", "ci", "release"],
        note: "BC.W-SCROLL-TRIGGER — the scroll-state reader (useScrollTrigger + createScrollReader on /motion-core, engine-free vue-only). T2 factored ONCE (useScrollTracker re-points onto it, no fourth scroll+rAF listener); T3 dual-path single-writer (native-timeline-gated, @property --scroll-t registered); T4 progress/direction(8px flip-delta anti-thrash)/velocity(per-second)/onCross. Bite: a second scroll listener / a PRM-gated crossing / an un-debounced direction flip → RED.",
    },
    {
        id: "proof:scroll-chrome",
        cmd: "proof:scroll-chrome",
        tags: ["local", "ci", "release"],
        note: "BC.W-SCROLL-CHROME — the scroll-driven chrome collapse (useScrollChrome composes useScrollTrigger, owns NO second listener). C2 collapseOnScroll default-false (persistent by default); C3 .scroll-chrome compositor-only (transform:scale, 0 reflow); C4 flip-delta/snap-midpoint/velocity-gate/scroll-stop-snap; C5 crisp-blur fence (no backdrop-filter reads --chrome-collapse-t) + never-invisible opacity; C6 PRM discrete-snap. Bite: an always-collapse default / a layout-animating collapse / an opacity-to-zero / a blur-on-collapse → RED.",
    },
    {
        id: "proof:dock-search",
        cmd: "proof:dock-search",
        tags: ["local", "ci", "release"],
        note: "BC.W-DOCK-SEARCH — the dock becomes a fuzzy SEARCH bar: useDockSearch composes the SHIPPED /search VSCode-scorer pipeline (useFuzzySearch — NO re-fork) + GlassDock, so the dock morphs into a command/search surface that filters as you type. Bite: a re-forked scorer / a dock-local search engine → RED.",
    },
    {
        id: "proof:siri",
        cmd: "proof:siri",
        tags: ["local", "ci"],
        note: "BG.W-SIRI-DOCK-CAPABILITY — Siri as a DOCK CAPABILITY via the .glass-dock-frame/#rail escape (box-inviolate), NOT a subpath/api entry. ONE gate 4 arms: E the --siri-island-t-coupled descend scrim (filter: blur() on the route's OWN pixels — never backdrop-filter, OVERSIZED, two dim modes, PRM-carved); S the 4-form √φ island on ONE --siri-island-t scalar, the useSiriDock seam composing useDockSpring (ZERO new SpringProgress) + useLiquidReveal, clip-aperture crossfade, warm under-glow, role=status, box-inviolate; W the demo-private WebGL2 warm-OKLab waveform (no WGSL, push-API level→uLevel); D the integration story off the #rail escape composing the EXISTING useDockSearch + the shipped <SiriDockCapability> + demo-private <SiriWaveform>. + the ruling-4 no-subpath/no-api fences + per-arm self-test bites. The binding PAINT is the proof:bg-gestalt Siri verdict + tests-visual; this gate proves the CAPABILITY structure. Bite: a backdrop-filter scrim / a raw new SpringProgress / a WGSL waveform / a cool teal-navy color event / a re-forked matcher / a published siri subpath → RED.",
    },
    {
        id: "proof:viz-configurator-suite",
        cmd: "proof:viz-configurator-suite",
        tags: ["local", "ci"],
        note: "BC.W-VIZ-CONFIGURATOR-SUITE — the viz STUDIOS conform to ONE VizStudio chassis: controls on the RIGHT (CONFIG-RIGHT two-column aside) + the PAGE-CHASSIS hero header over the warm-cream field, NOT per-studio bespoke chrome. Bite: a bespoke off-chassis studio / an aside on the left → RED.",
    },
    {
        id: "proof:storybook-meta",
        cmd: "proof:storybook-meta",
        tags: ["local", "ci"],
        note: "BC.W-STORYBOOK-META — the storybook META chassis: the AppShell + StoryPage + the section header read as ONE coherent storybook (the meta-level IA, the page-band surface enrolled in the gestalt roster). The LAST page band. Bite: an incoherent meta-chassis / a missing page-band roster row → RED.",
    },
    {
        id: "proof:bp-lazy",
        cmd: "proof:bp-lazy",
        tags: ["ci", "release"],
        note: "BC.W-AX-BP-LAZY — the cross-repo speedtest-AX BorderProgress lazy-chunk: the heavy spectrum/conic ring lazy-loads off the eager path (the profile:budget critical-path-weight floor — the root barrel reaches none of the heavy BorderProgress spectrum eagerly). Bite: the heavy spectrum/conic ring on the eager graph → RED.",
    },
    {
        id: "gates:verify-ci",
        cmd: "gates:verify-ci",
        tags: ["release"],
        note: "AX.W62 — the cheap pre-check superseded by proof:gen-ci-fresh's byte-match; kept in the RELEASE set as the fast set-equality drift detect. A ci.yml meta-step (allowlisted in verifyCi's CI_META_STEPS).",
    },
    {
        id: "proof:no-dead-token",
        cmd: "proof:no-dead-token",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP — the dead-CSS-token floor: every --* declared in src/styles is consumed (var()/Tailwind shorthand/@container style()/typed @property/JS setProperty/Tailwind theme-namespace) OR on a rationale'd KEEP_ALLOWLIST; the named dead set absent from source + (producer-gated) dist. Device-free source detector. Bite: re-add a dead token or a bare-rationale allowlist entry → RED.",
    },
    {
        id: "proof:affordance-contrast",
        cmd: "proof:affordance-contrast",
        tags: ["ci"],
        note: "AW.W13 — the at-rest calm-affordance gate (gold-CTA no-white-flip + glass + disco-retired, input/select border lifted off the 8% floor, standard slider fill lifted, goo-blob var() resolved). Device-free source; decided + registered at BB.W-DEAD-SWEEP (was an AW KNOWN_ORPHANS baseline). Bite: revert any affordance to its too-timid cream → RED.",
    },
    {
        id: "proof:datatable-split",
        cmd: "proof:datatable-split",
        tags: ["ci"],
        note: "AW.W14 — the DataTable god-module split gate (DataTable.vue ≤380 lines + the two colocated composables useDataTableRowIdentity/useDataTableResponsive exist + consumed + barrel API stable). Device-free source; decided + registered at BB.W-DEAD-SWEEP. Bite: re-inline the extracted logic or breach 380 lines → RED.",
    },
    {
        id: "proof:dock-big-dock",
        cmd: "proof:dock-big-dock",
        tags: ["local"],
        note: "AW.W3b — the big-dock card+grid behavioral gate (shape=card finite concentric shell ↔ pill morph on --dock-motion-resize; layout=grid concentric inner tiles; corner-shape squircle @supports-only; alwaysExpanded grid no reflow). Device-π (drives the demo big-dock showcase; SKIPs clean when :5199 unreachable). Decided + registered at BB.W-DEAD-SWEEP. Bite: a stadium shape=card / a discrete pill↔card snap / a grid reflow → RED.",
    },
    {
        id: "proof:dock-lockstep-bornred",
        cmd: "proof:dock-lockstep-bornred",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:motion-suite",
        cmd: "proof:motion-suite",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-smin-normalized",
        cmd: "proof:blob-smin-normalized",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-gradient-unit-length",
        cmd: "proof:blob-gradient-unit-length",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-spec-premult",
        cmd: "proof:blob-spec-premult",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-mood-resolved",
        cmd: "proof:blob-mood-resolved",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:aurora-arresting-ref",
        cmd: "proof:aurora-arresting-ref",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:constellation-tokens",
        cmd: "proof:constellation-tokens",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:glass-material-unified",
        cmd: "proof:glass-material-unified",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:glass-material-sota",
        cmd: "proof:glass-material-sota",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:reka-binding-idiom",
        cmd: "proof:reka-binding-idiom",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:design-md-current",
        cmd: "proof:design-md-current",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:naming-consistency",
        cmd: "proof:naming-consistency",
        tags: ["ci"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the ci aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:dock-items-lag-capture",
        cmd: "proof:dock-items-lag-capture",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:dock-clip-reveal",
        cmd: "proof:dock-clip-reveal",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:dock-layering-polish",
        cmd: "proof:dock-layering-polish",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:demo-dock-nav-runtime",
        cmd: "proof:demo-dock-nav-runtime",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-render",
        cmd: "proof:blob-render",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant). — born-RED at HEAD (the dark/flat blob default); flip owed to the Batch-V blob redress. BD W-CUT RE-CALIBRATION: the satellite-overflow worst-edge ceil 0.6→0.72 — the ceil was set 'just above the observed ≈0.49' (an UNDER-sampled peak; the orbit is time-phased), but BLOB_CONFIG_DEFAULTS' orbit geometry is BYTE-IDENTICAL to the AY-passing state (bodyRadius 0.22 · satelliteRadius 0.082 · orbitRadius 0.17 · eccentricity 0.05 · smoothK 0.05 unchanged; the BD mercury-colony fission is OPT-IN fissionAmp=0-default + the satellite WOBBLE was REDUCED, i.e. CALMER) so the true unchanged-orbit satellite peek ≈0.677, not 0.49 — the ceil now bounds that true peek + headroom; a runaway still reds; the BODY-clip is independently witnessed by COVERAGE_MAX + the centre-vs-corner gradient.",
    },
    {
        id: "proof:blob-integration",
        cmd: "proof:blob-integration",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:constellation-warp-live",
        cmd: "proof:constellation-warp-live",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:constellation-refit-live",
        cmd: "proof:constellation-refit-live",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    {
        id: "proof:blob-warm-default",
        cmd: "proof:blob-warm-default",
        tags: ["local"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant). — born-RED at HEAD (the dark/flat blob default); flip owed to the Batch-V blob redress",
    },
    {
        id: "proof:peer-conformance",
        cmd: "proof:peer-conformance",
        tags: ["release"],
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the release aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant).",
    },
    { id: "audit:stash", cmd: "audit:stash", tags: ["ci"] },
];

/** The gate cmds tagged for a given aggregate, in manifest order. */
export function gatesFor(mode) {
    if (mode === "full") {
        // BB.W-CLOSE-BATTERY — the DEDUPED union of the three tag sets (local ∪ ci ∪
        // release), in manifest order, a row tagged in >1 set running ONCE. This is
        // the close-battery set: the close/release path runs `--run full`
        // siblings-absent before the tag, so a `--run local`-only close (the BA
        // over-claim — `ci ⊂ local` carried 18 reds AND the close never ran the
        // union) is structurally impossible. `proof:close-battery-parity` locks it.
        return GATES.filter((g) =>
            ["local", "ci", "release"].some((t) => g.tags.includes(t)),
        );
    }
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

// ── BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — runShip() (Arm A, Mac-only, FAIL-CLOSED) ──
// The live-Metal ship ceremony release.sh's ship-block calls via `--run ship`. Mac-only
// BY PHYSICS (CI=ubuntu/SwiftShader cannot paint Metal; release.yml runs `--run full`
// = Arm B = proof:ship-attestation, NEVER `--run ship`). FAIL-CLOSED: a skeleton MUST
// exit non-zero (a green skeleton re-creates the source-green/visually-broken trap at
// the META level). The live roster capture + the UNMASKED_RENDERER anti-SwiftShader
// guard (scripts/lib/gl-renderer-probe.mjs, committed) + the per-region DIGEST + the
// webkit.{glass,goo} verdict + the DERIVED surfaceHash (scripts/proof-ship-attestation.mjs
// computeSurfaceHash) -> committed docs/tranches/BG/SHIP-ATTESTATION.json is BG.W-CUT's
// ceremony body; until it lands, runShip refuses to write a green attestation (trap-clean).
async function runShip() {
    if (process.platform !== "darwin") {
        console.error(
            "[gates --run ship] runShip is Mac-only (the live-Metal ship ceremony). CI=SwiftShader " +
                "cannot paint Metal; release.yml runs `--run full` (Arm B = proof:ship-attestation), never `--run ship`.",
        );
        process.exit(2);
    }
    const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? "http://127.0.0.1:5199";
    let served = false;
    try {
        served = (await fetch(DEMO_URL, { signal: AbortSignal.timeout(2000) })).ok;
    } catch {
        served = false;
    }
    if (!served) {
        console.error(
            `[gates --run ship] no served demo at ${DEMO_URL} — run \`npm run demo:serve\` ` +
                "(vite --port 5199) first. Fail-CLOSED (never a silent green).",
        );
        process.exit(2);
    }
    console.error(
        "[gates --run ship] FAIL-CLOSED — the live Metal roster capture + the UNMASKED_RENDERER " +
            "anti-SwiftShader guard + the band re-apply + the committed SHIP-ATTESTATION.json is BG.W-CUT's " +
            "ceremony body (composing scripts/lib/gl-renderer-probe.mjs + scripts/proof-ship-attestation.mjs " +
            "computeSurfaceHash). Arm B (proof:ship-attestation, the device-free bypass-closer registered " +
            "['ci','release']) is the binding tag enforcer and is LANDED. No attestation written (trap-clean).",
    );
    process.exit(1);
}

// ── BB.W-VISUAL-RUNNER — the `--run pi` visual-π runner mode ───────────────────
//
// `pi` is NOT a gate-tag aggregate (it does not pass through gatesFor): it is a
// SPEC-runner mode that spawns the ENROLLED `tests-visual/*.spec.ts` set as ONE
// command — the non-private glob MINUS the declared EXCLUDE allowlist
// (`tests-visual/pi-runner-manifest.mjs`, computed-from-disk), over BOTH Playwright
// projects against the `:5199` demo origin the config defaults, served-app-sentinel
// fail-closed. `local`-tagged ONLY (a real browser + demo + GPU). It reuses the
// canonical `spawnSync(PW_BIN, ["test", …, "--reporter=list,json"])` idiom
// (proof-blob-render.mjs) — the runner resolution across the workspace-local AND the
// hoisted-root node_modules layout, the workspace-absent fail-closed.
const PI_WORKSPACE = resolve(ROOT, "tests-visual");
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the runner
// across BOTH the workspace-local AND hoisted-root layout (else a hoisted install
// false-SKIPs the fail-closed arm — the proof-blob-render.mjs:33-37 idiom).
const PI_PW_BIN =
    [
        resolve(PI_WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PI_PW_PKG =
    [
        resolve(PI_WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;
// The two Playwright projects the config declares (the desktop + the coarse/touch
// mobile viewport the gestalt close needs). Asserted by proof:visual-runner.
const PI_PROJECTS = ["chromium-headless-new", "coarse-touch"];

/** Lazy-load the computed enrollment (the no-hand-list source of truth). */
async function piEnrolledSpecs() {
    const mod = await import(
        pathToFileURL(resolve(PI_WORKSPACE, "pi-runner-manifest.mjs")).href
    );
    return mod.enrolledSpecs();
}

/**
 * `--list pi` — print the ENROLLED visual-π spec set (computed-from-disk), one per
 * line. The runner-mode twin of `--list <gate-mode>` (which lists gate cmds); this
 * lists spec filenames so a human can see exactly what `--run pi` spawns.
 */
async function listPi() {
    const specs = await piEnrolledSpecs();
    console.log(specs.join("\n"));
}

/**
 * `--run pi` — spawn the ENROLLED visual-π set over both Playwright projects against
 * the `:5199` demo origin, served-app-sentinel fail-closed. Fails-closed on the
 * workspace-absent case AND on the first red spec. The `local`-binding real-device
 * run; on a GPU-less runner the workspace-absent path is the only honest exit.
 */
async function runPi() {
    if (!PI_PW_PKG || !PI_PW_BIN) {
        // Genuine device absence — fail-CLOSED with the install hint (NOT a silent
        // green). The binding paint runs on the real device; a GPU-less CI runner
        // does NOT paint the WebGL2 shaders, so it relies on the headless
        // `proof:visual-runner` enrollment-soundness arm instead.
        console.error(
            "[gates --run pi] the tests-visual π workspace has no installed @playwright/test — " +
                "run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo " +
                "dev server, for the rendered-pixel visual-π suite. (The local real-device run is the " +
                "binding paint; CI proves ENROLLMENT via proof:visual-runner, not the pixels.)",
        );
        process.exit(2);
    }
    const specs = await piEnrolledSpecs();
    if (!specs.length) {
        console.error(
            "[gates --run pi] the enrolled visual-π set is EMPTY — the pi-runner-manifest glob " +
                "matched no non-private *.spec.ts. The workspace spec tree moved; fix the manifest.",
        );
        process.exit(1);
    }
    console.log(
        `[gates --run pi] running the enrolled visual-π set (${specs.length} specs) over ` +
            `${PI_PROJECTS.length} projects [${PI_PROJECTS.join(", ")}] against the :5199 demo origin ` +
            `(served-app-sentinel fail-closed).`,
    );
    const args = [
        "test",
        ...specs,
        ...PI_PROJECTS.flatMap((p) => ["--project", p]),
        "--reporter=list,json",
    ];
    const res = spawnSync(PI_PW_BIN, args, {
        cwd: PI_WORKSPACE,
        stdio: "inherit",
        encoding: "utf8",
        env: {
            ...process.env,
            PLAYWRIGHT_JSON_OUTPUT_NAME: resolve(PI_WORKSPACE, ".cache/pi-report.json"),
        },
    });
    if (res.status !== 0) {
        console.error(
            `\n[gates --run pi] FAIL — the visual-π suite did not pass (exit ${res.status}). ` +
                `The served-app-sentinel fails-CLOSED on a foreign app on the port (never a silent skip); ` +
                `a red spec is the binding-truth rot the runner exists to surface.`,
        );
        process.exit(1);
    }
    console.log(`\n[gates --run pi] the enrolled visual-π set PASSED (${specs.length} specs, both projects).`);
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
    L.push("              with:");
    // fetch-depth: 0 — full history so the git-ancestor gates (proof:au-w0-reground
    // et al.) can resolve the historical dock SHAs (a shallow clone fails them).
    L.push("                  fetch-depth: 0");
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
    // `pi` is the SPEC-runner mode (BB.W-VISUAL-RUNNER) — it spawns the enrolled
    // visual-π set, NOT a gatesFor aggregate. It dispatches off the runMode/list
    // branches BEFORE the gate-tag path so `gatesFor("pi")` is never consulted.
    if (arg === "--run" && argv[3] === "ship") runShip();
    else if (arg === "--run" && argv[3] === "pi") runPi();
    else if (arg === "--run") runMode(argv[3]);
    else if (arg === "--verify-ci") verifyCi();
    else if (arg === "--emit-ci") emitCi();
    else if (arg === "--list" && argv[3] === "pi") listPi();
    else if (arg === "--list") {
        const mode = argv[3] ?? "local";
        console.log(
            gatesFor(mode)
                .map((g) => g.cmd)
                .join("\n"),
        );
    } else {
        console.error(
            "usage: gates.mjs --run <local|ci|release|full|pi|ship> | --verify-ci | --emit-ci | --list <mode|pi>",
        );
        process.exit(2);
    }
}
