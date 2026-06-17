# W-MOTION-CANON — DELTA (the codified motion canon + the compositor-only lock extended library-wide)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: docs/precepts/motion-canon.md,src/styles/tokens/scheme-motion.css,src/composables/motion/useLiquidFlex.ts,scripts/proof-no-layout-animation.mjs -->
<!-- surface-hash: 30e9c0db547848d52fe3539515d5381cf90d5402c53151307e445100d73daf5e -->
- **Capture date**: 2026-06-17
- **Branch / base commit**: `tranche/BB` @ `c426ed0b` (round-1 HEAD; this wave's edits in the working tree)
- **Tool**: `node scripts/proof-no-layout-animation.mjs` (the device-free SOURCE gate, extended) + `npm run typecheck` + `npm run proof:animation-coherence` (the REGISTER-tier composer, stays green)
- **Gate**: `proof:no-layout-animation` — EXTENDED in place (NOT a 2nd `proof:motion-compositor`); keyframe-only → keyframe + `transition` + Vue `<Transition>` + universal-PRM-carve, library-wide. Born-RED on the new arms (proven via a synthetic in-corpus probe + the per-arm self-test bites), GREEN at close.

## The charge — codification + enforcement-widening, NOT a re-tune

The motion doctrine was already SOTA-aligned in substance (the §6 easing table, the analytic per-spring clock, the coupled-fade recipes, the universal PRM carve). What was missing: (1) the doctrine was SCATTERED across a token comment + recipe sheets + CLAUDE.md prose with no single artefact to cite; (2) the compositor-only ban had no enforcement on the `transition` surface (the keyframe-only scan missed a `transition: width`/`padding` or a `<Transition>` layout-animating class); (3) `useLiquidFlex.sizeStyle` was a latent layout-animating path the doctrine never named. This wave closes all three. NO spring constant moved; NO recipe re-timed; the spring fence (`scheme-motion.css:182-208`) is byte-untouched.

## §0 RE-GROUND drift (recorded per the §0 mandate)

| anchor | spec said | found at HEAD | action |
|---|---|---|---|
| `scheme-motion.css` §6 table | lines 153-180 | the §6 table is present (the W-DISPLAY-TRACKING display tracking/leading rungs ride lines 54-66, NOT regressed) | annotated additively (SIZE/MORPH row + [SPATIAL]/[EFFECTS] labels); spring curves + per-spring clocks READ-ONLY |
| the SOTA arrival ease | "mint `--ease-expo-out`" (orchestrator prompt) | **ALREADY MINTED** as `--ease-out-expo` (alias → `--motion-ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`), with a canonical+alias row in `curves.ts` MOTION_CURVES, a value.js `easeOutExpo` JS twin, and a `bridges.css` `@theme` bridge | **NO new token** — minting `--ease-expo-out` would (a) be a clean-break/no-alias violation, (b) red `proof:animation-coherence`'s EASING-TABLE-BOUND arm (a `--ease-*` named on a leg must have its canonical/alias row), (c) red `proof:easing-primitive`. The canon NAMES the existing `--ease-out-expo` as the arrival register; the §6 table adds it to the "bold decelerating arrival" row. This is the drift the §0 re-ground exists to catch. |
| the dock-morph `inline-size` lerp (the expected born-RED live witness) | "the in-tree RED witness" | **ALREADY REPAIRED** — W-DOCK-MORPH-FAMILY landed the compositor transform; `layers.css` reserves the settled footprint, "NO per-frame `inline-size` lerp" (lines 43, 57) | the VT-occluded allowlist is EMPTY of the dock-morph entry (as the wave anticipated: "at close this exception is EMPTY"); the transition arm is born-RED via the synthetic self-test + the probe instead |
| `proof:no-layout-animation` exists | W-SCROLL-CARD/W-CARD-COMPOSITE mints it | present + registered (`package.json:614`, `gates.mjs:414`) | EXTENDED in place; NO new key, NO re-registration |

## The doctrine half (W-MOTION-CANON.1)

- **`docs/precepts/motion-canon.md`** (NEW) — the codified P1-P6 principle-set: P1 spring-iff-spatial/bezier-iff-effect (the Material-3 split + the SIZE/MORPH spatial register + the SOTA `--ease-out-expo` arrival ease named, not re-minted), P2 enter-bouncy/exit-no-overshoot, P3 fade-coupled-to-transform, P4 the per-spring clock is mandatory, P5 compositor-only (+ the `useLiquidFlex.sizeStyle` settled-footprint contract), P6 PRM keeps-fade-drops-transform (single-sourced at the library seam). Plus the two ratify-no-re-tune notes (QUICK-IS-ARRIVAL — the ~340ms snappy reads quick because the curve hits ~1.0 by ~120ms; the proportion fence).
- **`scheme-motion.css` §6 table** — additive annotation: each row tagged `[SPATIAL]` (spring) or `[EFFECTS]` (bezier) + ONE new `Size / morph` SPATIAL row (`--spring-dock`/`--spring-snappy`, expressed as a COMPOSITOR transform, never an animated box dimension) + the "bold decelerating arrival" row naming the existing `--ease-out-expo`. The existing rows + the spring curves + the per-spring clocks are byte-untouched (comment balance verified 31/31, the W-DISPLAY-TRACKING + spring tokens intact).
- **`useLiquidFlex.ts`** — the `sizeStyle` JSDoc records the SIZESTYLE-LATENT contract: `sizeStyle` is the settled-FOOTPRINT writer (a one-time reserve), NEVER the per-frame channel — the per-frame channel is `transform`. The primitive logic is byte-untouched (typecheck green).
- **`docs/precepts/README.md`** — indexes the new `motion-canon.md` in the Layout block.

## The enforcement half (W-MOTION-CANON.2) — the gate extension

The keyframe-corpus scanner (W-CARD-COMPOSITE) widened to the FULL surface, ONE shared reflow set:

- **The transition arm** scans `transition`/`transition-property` legs across `src/styles/*.css` + the SFC `<style>` blocks; a leg naming a reflow property reds; a `transition: all`/`transition-property: all` reds (the un-scopable-all bite). Paint (`background-color`/`box-shadow`/`color`/`border-color`) + composite (`transform`/`opacity`/`filter`/`clip-path`) legs pass.
- **The `<Transition>`-class arm** scans the Vue recipe classes (`*-enter-active`/`*-leave-active`/`*-enter-from`/`*-leave-to`); a layout property on an enter/leave class reds. The `transitions.css` recipes (opacity + transform legs) are the GREEN reference.
- **The universal-PRM-carve assertion (P6)** — the discipline is single-sourced at the library seam, not per-recipe (the over-broad trap avoided): the gate asserts the universal `a11y-overrides.css` carve restricts `transition-property` to the NON-SPATIAL set under `prefers-reduced-motion: reduce` (no transform/scale/translate slips through) AND the `transitions.css` recipe-local carve drops `transform: none`. A library shipping transform recipes with neither seam reds.
- **The VT-occluded / named allowlist** — file-scoped + property-scoped, each entry with its `{ file, property, register, reason }`. The dock-morph entry is EMPTY (already repaired). A NEW layout transition off-list reds (the anti-gameability floor; a blanket `transition` exemption is forbidden).

### The canon-conformance matrix (P1-P6 holds-vs-missing at HEAD)

| Principle | HOLDS at HEAD | MISSING (closed by this wave) |
|---|---|---|
| P1 spring-iff-spatial | the §6 register assignment (surface=bezier, transform=spring); `proof:animation-coherence` REGISTER arm | the spatial/effects LABEL + the SIZE/MORPH row + the canon-doc statement (added) |
| P2 enter-bouncy/exit-no-overshoot | `transitions.css` dialog-scale/pop/dropdown (enter spring, exit bezier) | the canon names it (no source change) |
| P3 fade-coupled-to-transform | the `transitions.css` two-leg `transition: opacity …, transform …` recipes | the canon names it (no source change) |
| P4 per-spring clock mandatory | the `--spring-<name>-duration` generated clock; `proof:animation-coherence` DURATION-BAND arm | the canon names P4 (no source change) |
| P5 compositor-only | the keyframe corpus (proof:no-layout-animation, W-CARD-COMPOSITE); the dock-morph compositor repair | the **transition + `<Transition>` enforcement** (the keyframe-only scan missed it) + the `useLiquidFlex.sizeStyle` latent-path record |
| P6 PRM keeps-fade-drops-transform | the `a11y-overrides.css` universal carve + the `transitions.css` recipe-local carve | the **universal-PRM-carve assertion** (the discipline was unenforced — a new transform recipe could ship without it) |

### Born-RED → GREEN log

- **Born-RED demonstration**: a synthetic in-corpus probe (`src/styles/__motioncanon_bornred_probe.css` with `transition: width` + `.x-enter-active { transition: height }`) RED MC3 (`2 transition reflow violation(s): width …; height …`); removed → GREEN restored. The per-arm self-test bites (MC3/MC4/MC5 synthetic detectors) prove the partition bites EVERY run: the transition self-test flags exactly `{width, padding, all}` and passes `{opacity, transform, background-color, box-shadow}`; the `<Transition>`-class self-test flags exactly `{height}`; the PRM self-test flags a transform-keeping carve and passes an opacity/color-restricted one.
- **GREEN at close** (full check roster, all PASS): `W1-no-layout-animation W2-self-test-bite W3-inventory-complete W4-slotted-source-assert W4-slotted-self-test-bite MC1-canon-doc MC2-size-morph-row MC3-transition-arm MC3-transition-self-test-bite MC4-transition-class-arm MC4-transition-class-self-test-bite MC5-prm-carve MC5-prm-self-test-bite MC6-sizestyle-record`.
- **Inventory** (facts): 44 keyframes + **224 transition legs** + **33 `<Transition>`-class legs** scanned; 4 keyframe + 20 transition named CLS-bounded reclaims allowlisted; PRM all-green (`universalNonSpatial:true`, `recipeDropsTransform:true`).

### The transition allowlist — the 15 pre-existing layout-transition legs the new arm surfaced (booked, not silently exempted)

The transition arm surfaced 15 pre-existing layout-`transition` legs across 9 files (all from prior tranches Q/AZ/BA — NONE introduced by this wave; the expected dock-morph witness was already repaired). Each is an audited, file-scoped, rationale-bearing exception — NOT a blanket exemption (a NEW layout transition off-list reds). Three registers:

- **DISCRETE-RECLAIM** (4 legs — bounded, intentional, user-initiated CLS): `btn.css` `.transition-collapse` (`height`, the reka Accordion/Collapsible reveal — the transition twin of the allowlisted collapsible-open/close keyframes); `ConfiguratorLayer.vue` (`grid-template-rows` section reveal, PRM-carved); `HeaderRibbon.vue` (`max-width`/`margin` banner collapse); `drawer.css` `.glass-drawer-grip` (`width` drag-handle intensify).
- **SIZE/MORPH-INDICATOR-BOOKED** (a travelling/grow indicator moved by inline JS box-dimension writes; by P5 SHOULD be a transform — BOOKED to the owning family's compositor rewrite): `segmented-tabs.css` (`width`/`height`/`inset` — the indicator JS-fallback + anchor; SegmentedTabs ratchet-baselined per W-TABS); `dock/layer-group.css` (`width`/`height` rail-active indicator); `PagerDots.vue` (`width`/`height` active-dot elongate); `ScrubberTimeline.vue` (`width`/`height` playhead/marker).
- **FILL-GROW-BOOKED** (a progress/timeline fill growing its width on value update; by P5 SHOULD be `transform: scaleX()` — BOOKED): `ProgressSectioned.vue` (`width`); `ContinuousRail.vue` (`width`/`left`); `SegmentedTimeline.vue` (`width`).

These are GOOD finds owed back to their owning waves (per §Named-successors: "recorded + fixed onto the correct register OR named as a rationale-bearing exception, NEVER suppressed"). The compositor rewrites are the owning families' charge; this wave RECORDS them + locks the floor against NEW ones.

## Gestalt (rides through the governed surfaces — co-recorded at W-REFLECT3)

The doctrine has no own-surface; its gestalt is the "motion reads as ONE language" verdict across the waves it governs (W-LIQUID-REVEAL · W-DRAG-MORPH · W-BUTTON-GLASS · W-PRESS-UNIFY · W-LENSING). The `proof:ba-gestalt` verdict through those governed surfaces is co-recorded with their DELTAs at the W-REFLECT3 reflection (BB inv-4). This wave's binding evidence is the canon-conformance matrix + the gate born-RED→GREEN log above; the gestalt is the governed-waves' to earn.

## Adjacent gate state (not this wave's)

`proof:gate-script-parity` + `proof:gate-manifest-sound` FAIL on round-1 HEAD because sibling waves (W-SCROLL-MOTION, W-PRESS-UNIFY) created untracked orphan gate scripts (`scripts/proof-scroll-motion.mjs`, `scripts/proof-press-unify.mjs`) the orchestrator has not yet registered, plus the expected dirty-tree-during-development state. This wave created NO new gate script (it extended the already-registered `proof:no-layout-animation` in place) and NO new key — the parity/manifest failures are the orchestrator's consolidation concern, not this wave's. `proof:animation-coherence` is GREEN (the §6 annotation revealed no register mis-assignment).
