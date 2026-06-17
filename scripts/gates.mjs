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
        id: "proof:rail-extend",
        cmd: "proof:rail-extend",
        tags: ["local", "ci", "release"],
        note: "AZ.W-RAIL-EXTEND — the net-new hairline-rail-beyond-dock facility (DockRail). Device-free static src-scan: R1 the hairline composes box-shadow: var(--border-hairline) (no hard 1px solid), R2 the end-icon writes ONE sanctioned seam (consumer v-model:context OR the injected DockLayerGroup active — no internal ref-shadow), R3 the --dock-rail-extend-length beyond-edge overrun rule, R4 the #rail chrome slot renders OUTSIDE .dock-layers (escapes the morph clip — persists on collapse), R5 >=2 live DockRail demo mounts. Born-RED on all five. The runtime truths (beyond-edge + end-icon switch + persist-on-collapse) are the local-only π half in W-RAIL-EXTEND-DELTA.md, ledger-backstopped. Bite: hard-rule the hairline / shadow the seam / drop the extent token / clip the slot / drop a consumer → RED.",
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
        id: "proof:rail3",
        cmd: "proof:rail3",
        tags: ["local", "ci", "release"],
        note: "AZ.W-RAIL3 — the floating-carousel rail (facets OUT of the dock, box INVIOLATE). Device-free static src-scan: R1 the in-dock contextual <DockLayerGroup> GONE from BOTH shell docks (the de-inflation source), R2 the strip writes the consumer v-model:context (no internal ref-shadow), R3 the connective hairline composes box-shadow: var(--border-hairline) (no hard 1px solid) + the --dock-rail-extend-length overrun, R4 the #rail strip renders OUTSIDE the dock containment via the .glass-dock-frame escape (the box-INVIOLATE witness), R5 the strip is a flex carousel of v-for chips with overflow+scroll-snap (not a lone end-icon), R6 the >=2-SHELL-consumer census (SidebarDock+BottomDock). Born-RED on all six. The runtime truths (box-equality G1 <=1px + outside-paint G2 + cycle G3 + no-corpse G4) are the local-only π half in W-RAIL3-DELTA.md (tests-visual/rail3.spec.ts), ledger-backstopped. Bite: restore the in-dock group / shadow the seam / hard-rule the hairline / drop the extent token / collapse to a lone icon / drop a shell consumer → RED.",
    },
    {
        id: "proof:dock-sections",
        cmd: "proof:dock-sections",
        tags: ["local", "ci", "release"],
        note: "BA.W-DOCK-SECTIONS — the tripartite section dock + divider-seam re-seat (the FOURTH rail attempt re-conceived as a TOPOLOGY decision, inv-6; W-RAIL-EXTEND -> R4-RAIL -> W-RAIL3/R6 -> R8-1 each passed a box-inviolate readback while the SEAT regressed to the shell). Device-free SOURCE arm (the BINDING visual truth is the π SHELL DELTA tests-visual/dock-sections.spec.ts + W-DOCK-SECTIONS-DELTA.md — the seam-anchored Y/X within <=2px, the dual-side overrun extent, the flush chip gap, the collapse-retract stub, the box-inviolate <=1px delta on BOTH shell docks both modes — PLUS the proof:ba-gestalt dock-surface holistic verdict, BA inv-4). S1 the declarative tripartite descriptor renders descriptor-DRIVEN (a <DockSection> v-for over the `sections` prop, the `kind` switching the rail-core|section|nav zone demarcated by <DockSeparator>, composing the existing registry — NOT a hardcoded three-element literal); S2 the rail anchors at the SEPARATOR-derived seam offset (--dock-rail-seam-offset, written by GlassDock measuring a <DockSeparator anchor>) and overruns BOTH sides (the symmetric 2x --dock-rail-extend-length extent) — the vertical midline seat (inset-block-start:50% on the SLOT) + the horizontal edge seat GONE (the workaround #4 a static :40%/:120% decoy still fails — the gate requires the seam derivation); S3 the chips fan FLUSH (the connector-as-tether margin GONE) + a PRM-gated collapse-retract rule; S4 BOTH shell docks render <DockSection :sections> (the third-rail census) AND proof:rail-extend box-inviolate stays GREEN; S5 the chip overflow routes through <FadingScroll> (the Batch-2 primitive) with no DUPLICATE hand-rolled scroll-fade mask. proof:rail-extend + proof:rail3 stay GREEN (the box-inviolate + escape-architecture + flex-strip-cyclable R-arms survive the re-seat). Bite: re-seat to a fixed literal -> S2 RED; keep the tether margin -> S3 RED; drop <DockSection> from either shell -> S4 RED; drop <FadingScroll> or add a second scroll-fade -> S5 RED.",
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
        note: "AY.W-COLOCATE — the feature-dir colocation convention over every README-bearing complex feature-dir (DERIVED, currently aurora/constellation/dock/fourier-field/goo-blob/handmark/tabs): composables under composables/, magic-number/config consts in constants.ts, shaders/skeletons co-located, README present, + the design-idioms home doc. Bite: move a composable to the package root, delete a constants.ts, inline a magic-number, or delete a target README → RED",
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
        id: "proof:no-layout-animation",
        cmd: "proof:no-layout-animation",
        tags: ["ci"],
        note: "BB.W-CARD-COMPOSITE — the compositor-safe-keyframes architectural lock. Device-free SOURCE arm: scans the WHOLE @keyframes corpus (src/styles/*.css + every SFC <style>) and FORBIDS any keyframe step animating a layout-triggering property (padding*/margin*/font-size/width/height/inline-size/block-size/top/left/right/bottom/inset*/grid-template-*/grid-auto-*/flex-basis/line-height/border-*-width/gap), permitting ONLY compositor-safe channels (transform/translate/scale/rotate/opacity/filter/clip-path/paint props/--* customs). Born-RED at HEAD on CardHeader.vue (the A'-3 worst-cluster, CLS 1.03 at 4.0.0) → GREEN after the 3-lane re-expression (translateY/scale/scaleY+opacity). A NARROW, NAMED, CLS-bounded ALLOWLIST carries the reka-ui collapsible-open/close height:0↔content-height reveal (a DISCRETE layout reclaim, never a per-scroll-frame storm). Self-proving synthetic padding-keyframe bite. The binding CLS measure is the π/DELTA arm (tests-visual/card-composite.spec.ts), never this gate alone. Bite: re-add font-size/padding/grid-template-rows to ANY keyframe → RED.",
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
        tags: ["release"],
        note: "BA.W-CLOSE — the BA terminal-close meta-gate (release-only, NOT ci; the proof:az-final successor). 9 clauses: C1 FINAL-EXISTS+per-wave-citation, C2 THE-GESTALT-BAR (proof:ba-gestalt operative-PASS — the P-1 structural fix made the close gate; REPLACES the AZ per-mechanism proof:az-reflect reflection-matrix clause, BA inv-4: the close CANNOT assert a surface PASS the gestalt gate marks FAIL), C3 BUDGET-REBASELINED, C4 NO-OPEN-LIVE-PENDING (`(DEVELOPED)` stays RETIRED), C5 CARDINAL (ba/az/ay/ax ledgers + disposition register completeness + BOOK-trigger re-eval), C6 RUNNER-TRUTH-BY-EXECUTION (the BA runtime gates re-run under GLASS_UI_SYNTH_DEVICE_ABSENT=1, exit 0 WITH a printed skip line — never grep; the BA waves are overwhelmingly device-free comment-strip detectors, the painted truth read via C2's gestalt verdict), C7 ZERO-ORPHANS, C8 STAGED-OR-CUT (3.13.0+changeset | 4.0.0+changeset-consumed+CHANGELOG '## 4.0.0' — the H4 4.0.0, atlas register-D two grounds; the silent-bump RED), C9 CLEAN-TREE (docs/precepts allowlist). Born-RED witnessed on the authoring tree (C1 RED: FINAL absent; C8 RED: no changeset staged). The pure-detector-with-injected-IO architecture (each clause unit-falsifiable).",
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
        id: "proof:constellation-freeze-live",
        cmd: "proof:constellation-freeze-live",
        tags: ["local"],
        note: "AY.W-CON3 — the ?freeze deterministic-capture render gate (pi lane, fail-CLOSED): two back-to-back mounts of <Constellation :freeze :seed :drawOverlay> hash BYTE-IDENTICAL (node positions + overlay phase) + frame-1-vs-later-now still + the ?freeze URL auto-derive fires. Bite: a stepped frozen field / a live-now overlay leak / a non-firing hook -> RED",
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
        note: "AX.W56 — the corner-SHAPE token axis + the rounded-vs-squircle POLICY. Device-free SOURCE arm (runs + hard-REDs on EVERY runner): theme.css mints --corner-k-{squircle:2,soft:1.7,sharp:2.4} (the superellipse-k primitives; squircle == superellipse(2) == n=4) + the semantic --corner-shape-{card:round,pill:round,panel:round,bigdock:superellipse(var(--corner-k-squircle))} POLICY aliases; the big-dock dock.css site reads `corner-shape: var(--corner-shape-bigdock)` (the bite — NOT a bare squircle keyword) ONLY inside `@supports (corner-shape: superellipse(2))` (no leak onto the un-gated base) over a `border-radius` round fallback; glass.css carries NO corner-shape on .glass-card/.glass-btn/.btn-pill (the AW.W23 inversion RE-HOMED — cards stay round). π render arm (fail-CLOSED when the tests-visual workspace is present; squircle-language.spec.ts): getComputedStyle(...).cornerShape readback === superellipse(2) on the big-dock card shell on a Chrome-139 engine (or the round fallback on a non-supporting engine), a card stays round. Bite: re-hardcode `corner-shape: squircle` on the big-dock → BIGDOCK-READS-TOKEN RED; re-add a squircle to .glass-card → CARD-REHOMED RED; leak the decl outside @supports → SUPPORTS-GATE-INTACT RED; flip --corner-shape-card to a superellipse → POLICY-CARD-ROUND RED.",
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
        note: "AY.W-COHERE — the SET-LEVEL substrate cohesion gate (the four live substrates AS A SET): G-ACCENT (the blob mood bead C=0.136 inside the comet-anchored warm-red band via the deriveBlobPalette chromaCeiling), G-RECESSION (all FOUR expose the outer-envelope knob; the constellation opacityCeiling BITES — 0.4 ceiling paints 25% ink), G-SHADOW (no 5px-5px stamp; the adaptive --blob-shadow ambient — darkest-cast L 0.780 >= the 0.58 floor). Self-proving. Bite: re-add the stamp / drop the prop / remove the ceiling -> RED",
    },
    {
        id: "proof:component-orphan",
        cmd: "proof:component-orphan",
        tags: ["local", "ci"],
        note: "AY.W-SB1 — the component-orphan institutional gate (route-prune != component-retire): every PUBLISHED custom pkg + flat subpath + root-barrel composable has >=2 non-self consumers OR a docs/consumer-evidence doc. Self-proving. Bite: a 0-consumer publish with no evidence doc -> RED",
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
        tags: ["ci"],
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
        id: "proof:drag-morph",
        cmd: "proof:drag-morph",
        tags: ["local", "ci", "release"],
        note: "BB.W-DRAG-MORPH — the pull/drag-to-morph-squish primitive gate (born-RED at HEAD, driven GREEN). Device-free SOURCE arm (D1-D5; the PAINTED truth is the π readback tests-visual/drag-morph.spec.ts + the W-DRAG-MORPH-DELTA capture — the drag frame-series follow~1:1/velocity-squish/fling-to-nearest, the flick-vs-slow snap decision, the PRM no-squish/instant-snap, the keyboard roving, BOTH modes; LOCAL-ONLY, backstopped on CI by proof:live-verified-ledger, rides W-REFLECT3): D1 useDragMorph.ts composes the UNCONSUMED kf Draggable/drag + SpringProgress + useLiquidFlex and owns NO second pointer-velocity sampler / rAF spring integrator (the load-bearing REUSE — wired substrate, not a re-fork; the hand-rolled-velocity/rAF anti-evasion bite), D2 the squish drives useLiquidFlex squishLaw:\"tanh\" via drive() off the live drag position (NOT the click squish(frac) linear path) capped at the live --tab-indicator-max-stretch getter (a hardcoded cap > 1.08 REDs — the anti-taffy-pull fence), D3 the release projects decayRest + re-targets the NEAREST snap center (spring.target) with a single-commit `committed` guard (the one-registry discipline; the kf source `snap` option not yet on dist — the published-surface interim, the kf snap-option adopt booked), D4 the SegmentedTabs draggable?:boolean axis is ADDITIVE (default false; the click select+squishOnTravel path byte-identical — the opt-in bite) with ≥2 binary consumers (SegmentedTabs + DockLayerGroup — two useDragMorph(<…>)( call sites), D5 the roving-tabindex contract lands (a :tabindex binding + a @keydown on the strip) NOT gated behind :draggable (a draggable-only roving REDs — the keyboard contract is every-strip) with the arrow axis derived off isVertical (ArrowRight/Left + ArrowDown/Up + Home/End; a hardcoded horizontal-only set REDs) + an inline self-test bite (a synthetic :draggable-gated tabindex MUST flag — proven every run). The drag is compositor-only (transform: translate, never inline-size/left/top/width — W-MOTION-CANON's proof:no-layout-animation owns the library-wide enforcement); the spring reuses the snappy SPRING_PRESETS row (no new clock — the W-GLASS-CAL spring fence); the GL shader fence + ppmycota hold. Bite: re-fork the pointer-velocity engine / hardcode a cap > 1.08 / drop the single-commit guard / gate the roving on :draggable / hardcode a horizontal-only arrow set → the matching clause reddens.",
    },
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
        note: "BA.W-HANDMARK — the d6 hand-voice family RE-LANDED on /handmark (born-RED -> GREEN; A-2 + the C-cargo on ONE wobble engine). Device-free SOURCE arm (the BINDING painted truth is tests-visual/handmark.spec.ts + the W-HANDMARK-DELTA capture — the highlight visibly multiplies against the page behind it, the marks read HAND-made over the paper register, the morphology amplitude scales — + the proof:ba-gestalt verdict): W1 the colocation-shaped family ships (HandMark.vue + brush/geometry/ink/texture/freehand + composables/useHandMark + constants.ts + README, the index barrel exports HandMark/InkMark/BRUSHES, the /handmark subpath mirror, api/index.ts seats HandMarkProps, the B-1 content-node Range measure anchor lives — document.createRange + setEndAfter + baselineFrac); W2 the DEC-8 fold is clean (GlassUnderline + custom/underline/ + src/subpaths/underline.ts GONE, grep-negative import/use survivor in src/+demo/, api no longer exports GlassUnderline* — prose mentions of the retirement allowed); W3 the highlighter's FIVE deltas LIVE (ribbon:'hull' (b) + non-zero taper (c) + cap:'square' (d) in the preset; ink.ts plumbs b.cap onto InkPath.cap (d); the SFC binds :stroke-linecap NOT a hardcoded round (d); the .hm root carries NO isolation:isolate so the multiply reaches the page (e); the band seats LOW off HIGHLIGHT_RISE not the box-middle cy (a)); W4 the morphology is natural+seeded (geometry.ts carries naturalUnderlinePoints + NATURAL_AMP_FRAC + PERIODS_MIN/MAX; the SEED RECONCILE — mulberry32 from the HOUSE leaf utils/prng, NEVER from @mkbabb/pencil-boil, the ONE mulberry32 source); W5 the voices differ (BRUSHES carries boil/pencil/crayon distinct rows, the everything-renders-pen no-op dead); W6 the three-underline fence (.paper-ink-mark stays STRAIGHT — no feTurbulence/perturb on its register; CLAUDE.md records the fence + the family). Bite: revert the highlighter to ribbon:'stroke' / re-hardcode stroke-linecap:round / re-add isolation:isolate / import mulberry32 from pencil-boil / leave a GlassUnderline import survivor / wobble .paper-ink-mark -> RED.",
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
        note: "BA.W-GLASS-CAL — the blur dial-back + the disco retirement + the per-spring clock (born-RED -> GREEN; the comment-strip pure-detector house pattern). The BINDING visual truth is the pi gestalt readback (tests-visual/glass-cal.spec.ts + W-GLASS-CAL-DELTA.md + the proof:ba-gestalt dock/CTA/chip verdict, BA inv-4 — per-mechanism greens do NOT close a visual wave). BLUR: B1 the six --glass-blur-*-radius primitives each STRICTLY below their pre-wave value (10/12/16/15/11) and within the AV.W7-F2 8-15px band, wash unchanged at 1px (the ~15-20% uniform pull → 8/10/13/13/9); B2 the @2dppx overlay restore pulled below 24px (the ~20 target); B3 the WRONG AXIS untouched (anti-overreach) — --glass-level + every per-rung saturate()/brightness() companion byte-intact AND the W-DARK-MATERIAL dark-arm.css dark companions preserved (radius-only). DISCO (H2a arm a — gold survives CALM): D1 the recipe family GONE (no @utility btn-audacious / btn-audacious-gold, no @keyframes sparkle-sweep / btn-gold-bg-sweep, no --duration-sparkle / --glass-grain-opacity-disco); D2 no live btn-audacious class consumer in src/ + demo/ (comment-stripped); D3 the dock-tab primary tier collapsed onto the plain glass hover register (no grain/--phase-color radial/[data-phase]::before halo) + the DockTabButton.vue auto-attach removed; D4 toggle-chip on §6 (no duration-150/raw ease-out; a --spring-smooth scale lift); D5 the FENCE held (anti-overreach) — .gold-shimmer + the --glass-specular registers STAY. SPRING CLOCK (Unit 3): S1 the per-spring --spring-<name>-duration vocabulary minted (the analytic 2%-band envelope settle, GENERATED from the SPRING_PRESETS (response,ζ) table — smooth=0.36 snappy=0.34 bouncy=0.69 gentle=0.44 dock=0.28); S2 no --spring-* easing rides a generic --duration-* clock in the swept src/styles files (the anti-recurrence floor). Bite: revert a radius / drop the @2dppx pull / drift --glass-level or a companion / re-introduce @utility btn-audacious / restore the dock phase-grain / restore the chip duration-150 / drop a --spring-*-duration / leave a spring on a generic clock -> RED.",
    },
    {
        id: "proof:dock-plate-clearance",
        cmd: "proof:dock-plate-clearance",
        tags: ["local", "ci"],
        note: "BA.W-DOCK-GEOMETRY — the control-plate clearance + scroll-port cross-axis un-clip gate. Device-free SOURCE arm (the pi SHELL readback tests-visual/dock-plate-clearance.spec.ts is the binding visual truth, W-DOCK-GEOMETRY-DELTA.md): W1 --dock-control-safe-inset declared in the density cascade AND consumed (padding + background-clip:content-box) so the painted plate x --scale-hover-dock stays STRICTLY inside --dock-layer-height per density rung (the 0px dead-knob barred); W2 the scroll ports POSITIVELY pin the cross axis visible (.dock-scroll-x .dock-layer--full -> overflow-y:visible; .vertical.dock-scroll-y -> overflow-x:visible) AND both shell docks pass no overflow=scroll; W3 the contain:paint audit verdict (a) recorded as a gate fact in shell.css. Bite: zero the inset, unpin a cross axis, or re-add the shell overflow=scroll -> RED.",
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
        id: "proof:fourier-studio",
        cmd: "proof:fourier-studio",
        tags: ["local"],
        note: "BA.W-FOURIER-STUDIO — the fourier band split into ambient + FOREGROUND studio (born-RED). Device-free SOURCE arm (the BINDING painted truth is the π arm tests-visual/fourier-studio.spec.ts + the ba-gestalt verdict): partialSumAt math leaf + the additive clock?:()=>number seam on FourierField (freeze/PRM short-circuit intact, presets.ts byte-untouched, aurora-frag fence held); the foreground fourier-studio.vue (Configurator+useConfiguratorState per-preset over a Canvas2D stage; the orthogonal N-harmonics partial-sum · epicycle-visibility · color axes; the visibly-assembling summed curve); the forward-DFT trace-a-shape (fourier-paths.ts ℱ/heart/star → dftFromPoints — the studio's DFT consumer face); a controllable clock (play/pause/scrub/speed off useRAFLoop, no raw rAF); the W-MOTION3 live steps StepsEditor (ARM B demo-only, <EasingPicker> BOOKED to W-EASING-PRIMITIVE); R5-11 the hero rainbow WARM-ANCHORED (base-30°→base+70°, hero leans warm r>b, final cool — the slides fc-fourier G4). Bite: drop the partial-sum axis / collapse the orthogonal axes / break the clock seam / un-warm the hero rainbow / touch aurora.frag → RED.",
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
        note: "AY.W-BLOB2 — the BlobConfig atom-count CEILING (≤12 top-level atoms). Born-RED at the pre-prune 46 fields; GREEN at the 8-atom bundle. Asserts: the top-level field count ≤ the ceiling, the three deleted derived-but-unread fields (orbitSpeedScale/wobbleScale/mergeRate) are GONE from the CONFIG surface (a deletion-witness — they legitimately survive on MoodParams), and BLOB_CONFIG_DEFAULTS round-trips to a complete BlobConfig (every atom + field has a default, no orphan). Bite: re-add a deleted field → the count exceeds the ceiling OR the deletion-witness REDs.",
    },
    {
        id: "proof:fourier-field-intensity",
        cmd: "proof:fourier-field-intensity",
        tags: ["local"],
        note: "AY.W-FF2 — the W43 SOTA fourier-field intensity model (STATIC source gate). Asserts the flat OUTLINE_PEAK_ALPHA + the age*age quadratic body are GONE, the six per-variant bundle fields (peakAlpha/headGlowAlpha/headGlowBlur/epicycleRatios/trailFadeExp/trailFloor) populate both PRESETS, headGlowAlpha>peakAlpha (head-forward), trailFadeExp∈[1,2)+trailFloor>0 (soft, never quadratic), the render reads a CACHED color triple (zero-alloc hoist), the intensity prop carries a [0,2] clamp, the dark/light blend fork + the amplitude-descending sort, and evalFourier is deleted from index.ts+math.ts. SELF-PROVING: the quadratic-decay synthetic line is flagged every run. Bite: restore the constant/quadratic, drop a bundle field, or un-delete evalFourier → RED.",
    },
    {
        id: "proof:fourier-field-visibility-live",
        cmd: "proof:fourier-field-visibility-live",
        tags: ["local"],
        note: "AY.W-FF2 — the phosphor-comet VISIBILITY device gate (the painted-canvas readback the static gate cannot reach). Mounts the real <FourierField> over a white ground for BOTH presets × BOTH modes under freeze; asserts the `final` preset is NOT a corner stub (bbox spans ≥25% of each axis), the trail body reads (mean painted intensity floor), intensity=0.4 recesses below intensity=1, and hero paints more structure than final (distinct family). Fail-CLOSED when Playwright is present; befitting-silent SKIP only on a zero-dep runner. Bite: a corner-stub render / a no-op intensity → RED.",
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
        tags: ["release"],
        note: "BA.W-GESTALT-GATE — the holistic per-surface acceptance gate (the P-1 close-class fix). PROMOTED to the operative close set by BA.W-REFLECT2 (off the born-RED no-tag isolation onto [\"release\"], mirroring the proof:az-reflect/proof:az-final precedent — release-only, NOT ci, so it gates W-CLOSE's full battery + release.sh without breaking per-push CI mid-tranche). The gestalt OR is now the BINDING close decision (the P-1 structural fix landed operatively): W-CLOSE cannot cut while any roster surface holds an open FAIL. A roster of the 8 named W-REFLECT2 surfaces (dock · configurators-goo · aurora · glass-feedback · shell · motion-fourier · dark-register · cross-repo), each owed a whole-page capture in BOTH modes over its real backdrop + a recorded GESTALT verdict ABOVE the per-mechanism π readback. Device-free source/docs detector reading docs/tranches/BA/audit/reflect/ba-gestalt-roster.md; operative-PASS IFF every verdict is PASS AND every declared capture path resolves on disk (the anti-evasion floor — a PASS with a missing capture is the close-class lie the AZ matrix told, forbidden). W-REFLECT2 STATE (2026-06-15): 6/8 PASS (configurators-goo · aurora · glass-feedback · motion-fourier · dark-register · cross-repo flipped on fresh whole-page captures); 2/8 FAIL (dock + shell — the SidebarDock floating-carousel facet chips occlude the page <h1> on desktop StoryPage-chrome routes, the binding ℱ-home-seam topology W-DOCK-SECTIONS booked as an accepted *breadcrumb* tradeoff but the whole-page render shows a full *title* occlusion — the exact P-1 mechanism-green/page-wrong gap). The two FAILs share ONE root → ONE named successor BA.W-SHELL-RAIL-RESEAT (triumvirate); the gate STAYS RED until it lands + the dock/shell reflection records gain a RE-REFLECTION verdict that supersedes the FAIL. LINEAGE: AZ closed `complete` on a 9-surface per-mechanism PASS matrix the user re-opened the SAME DAY (R8) on ≥7 surfaces (precepts P-1, the 6th re-open R3→R8); a per-mechanism π verifies a local ΔL but cannot verify the gestalt the user reads. Bite: flip a verdict to PASS with no on-disk capture → RED; drop a roster surface → RED. — HARDENED at BB.W-GESTALT-GATE2: the desktop-PNG-existence floor (existsSync+size>0) is RETIRED. An operative PASS now demands, per surface, FOUR content-real dimension-correct viewport-faithful captures over a FRESH surface: G1 content+dimension (isRealPng magic-byte+≥1KiB + pngDimensions IHDR ≥320×320), G2 the 16 mobile twins READ + viewport-faithful (direction 2b: derive <surface>-<mode>-mobile-full.png from the declared -desktop- path; a -mobile- IHDR ≥1000px or a -desktop- <1280px reds as fabricated), G3 the per-surface surface-hash freshness header WIRED via the SHARED surfaceHash (scripts/reflect-capture-verify.mjs re-exports the ledger's — ONE createHash in the tree; stale/header-less reds under --strict-freshness, the close arm; NOTEs on the bare arm), G4 the self-test bite rides every run (the proof-live-verified-ledger sibling transposed, no second copy). BB.W-CHIP-GRAZE added the CG2 chipOverField clause (dock+shell: the SidebarDock floating-carousel grazes the form FIELD at narrow-desktop — the title-fix masked it; redressed CSS-only by re-fanning the desktop reach down the rail gutter, library byte-untouched, chipOverField TRUE→FALSE live-measured) + REVOKED the dock/shell roster PASS→FAIL (the P-1 lie). Born-RED G3 + CG2 at BB HEAD on dock/shell/dark-register; W-REFLECT3 (Batch 7, the single authorized verdict-flipper) re-captures + re-stamps to flip GREEN.",
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
        note: "BB.W-DEAD-SWEEP gate-fleet reconcile — manifested into the local aggregate (was a registered-but-unmanifested proof:* key; its script carries the invariant). — born-RED at HEAD (the dark/flat blob default); flip owed to the Batch-V blob redress",
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
    if (arg === "--run" && argv[3] === "pi") runPi();
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
            "usage: gates.mjs --run <local|ci|release|full|pi> | --verify-ci | --emit-ci | --list <mode|pi>",
        );
        process.exit(2);
    }
}
