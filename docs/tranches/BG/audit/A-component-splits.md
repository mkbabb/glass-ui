# BG audit — component/composable >500-line split plan (A-component-splits)

**Scope.** SPEC the colocated-sub-dir split for every `src/` component/composable over 500
lines, flag the 400–500 trend, and for each name the responsibilities → natural seams →
proposed sub-files → warranted-or-not (KISS). The colocation idiom is `proof:colocation`
(`scripts/proof-colocation.mjs`): a README-bearing complex dir gets `composables/`
(every `use*`/`*Context`), a `constants.ts` (no module-scope `const [A-Z_]{3,} = <number>`
outside it), an `if-needed` `shaders/`/`skeleton/`. The gold-standard reference is
`components/custom/aurora/` (`composables/` with `glSetup.ts`/`wgpuSetup.ts`/`frameLoop.ts`
carved off `runtime.ts`, a `constants/` dir with `shaders/`, + DESIGN/README/RESEARCH md).

---

## FINDINGS (HEAD = 998136b, verified)

The structural inventory in CONTEXT.md is accurate. Line counts re-verified
(`wc -l`, 2026-06-25):

| File | LoC | script/style split | Already-carved? |
|---|---|---|---|
| `dock/GlassDock.vue` | 711 | script 523, style 0 | 10 composables imported; fission wiring INLINE |
| `glass/webgl/createCanvasLifecycle.ts` | 695 | n/a | `sizeBacking` + circuit-breaker + IO/CV park all inline |
| `glass/webgpu/useWebGPUCanvas.ts` | 606 | n/a | device-acquire already in `webgpuDevice.ts` |
| `carousel/CarouselContent.vue` | 577 | script 276, **style 218** | composes `useGooMorph`; goo-barbell CSS inline |
| `glass/useGlassBackdropLuminance.ts` | 542 | n/a | hue-histogram + WCAG-luma math inline |
| `goo-blob/composables/useBlobSatellites.ts` | 533 | n/a | constants already in `../constants`; helpers inline |
| `tabs/SegmentedTabs.vue` | 512 | script 387, style 0 | `useTabIndicator`+`useTabDragMorph` carved; keyboard+responsive inline |
| `pager-dots/PagerDots.vue` | 509 | script 222, **style 193** | composes `useGooMorph`; goo-barbell CSS inline (DUP of carousel) |
| `goo-dot-matrix/composables/useGooDotMatrix.ts` | 508 | n/a | `gooDotSetup.ts` carved; 2 per-frame setup closures inline |
| `motion/useBloomUp.ts` | 507 | n/a | 88-line header; cohesive single composable |
| `api/index.ts` | 505 | n/a | pure re-export barrel; `types-extra.ts` sibling exists |

**Two over-500 files are NOT split candidates (KISS — already at their natural floor):**

- **`motion/useBloomUp.ts` (507)** — `507 = 88 header comment + ~330 code + types`. The
  body is ONE cohesive single-concern FLIP composable (the source≠dest bloom + the 4th
  field-hue channel). The rAF `step` loop (L431–462) is its engine, not a seam; the
  pure helpers (`clampStrength`/`resolveField`/`resolveHue`, L186–228 ≈ 40 lines) are
  too small to externalize and tightly read the option shape. **Splitting it is
  contrivance.** It lives in the flat `composables/motion/` barrel (40 files) — there is
  no feature-dir to colonize, and a sub-file beside it for ~40 lines of helpers fails KISS.
  *Recommendation: NO SPLIT.* The only honest reduction is trimming the 88-line header to
  ~25 (the canon lives in CLAUDE.md / motion-canon.md; the file should point, not recite).

- **`api/index.ts` (505)** — a pure types/constants discovery barrel (100%
  `export { … } from "…"` + rationale comments). The no-god-module bound already pushed the
  aurora type group into the `types-extra.ts` sibling (BB.W-CARVE5). It cannot be "split"
  without losing its single-discovery-surface contract; its length is the public API's
  width, not a god-module. **NO SPLIT** — it is a barrel by design (the §Structure
  precedent: barrels stay top-level, SCC-curated).

**Two over-500 files are SHADER template strings — ABSOLUTE no-split (the GL fence):**
`goo-blob/shaders/metaball.wgsl.ts` (529), `dot-flow-field/shaders/flow-field.glsl.ts`
(517), `goo-blob/shaders/metaball.frag.ts` (510), `aurora/constants/shaders/mediums.glsl.ts`
(495) are single GLSL/WGSL programs in a template literal. They are byte-fenced by
`proof:gpu-substrate-single` / `proof:aur-kuwahara` parity gates — splitting a shader breaks
the program AND the byte-identity asserts. They are correctly already under `shaders/`
subdirs (colocation `(c)` satisfied). **Excluded from every wave below.**

### The DRY finding — the goo-barbell CSS is duplicated (carousel ≡ pager-dots)

`CarouselContent.vue` (style 218) and `PagerDots.vue` (style 193) BOTH inline the SAME
goo-barbell scoped CSS — the `bodyA`/`neck`/`bodyB` structure, `scale: var(--stretch, 1)
calc(1/var(--stretch,1))` reciprocal squish, the `--neck-waist`/`--neck-throat` clip-path
recipe, the `@supports not (filter: url(#x))` floor, the PRM `display:none` drop. They share
the `useGooMorph` ENGINE (`composables/motion/useGooMorph.ts`, 460) but NOT the CSS.
There is NO shared partial in `styles/` (verified: no `carousel.css`/`pager-dots.css`).
The precedent for externalizing component recipes is `styles/segmented-tabs.css` — which is
EXACTLY why `SegmentedTabs.vue` has 0 inline style and only 512 script lines. The goo-barbell
SFCs never got that treatment.

### GlassDock fission is the one true inline-mass seam

`GlassDock.vue` (711) already imports 10 composables and is mostly well-decomposed. The
remaining inline mass is the BD.W-DOCK-CORE FISSION WIRING (L341–506, ≈165 lines, 36
declarations): `splitSignature`/`splitPlacement` shallowRefs + watchers, `pieceHandles`,
`dockCenter()`, `registerSplittablePieces()` (the vector getter math L408–435), the
`onDockPointerMove`/`Down`/`Up` drag-to-split state, `split()`/`merge()`/`toggleSplit()`,
and an inline magic-number `DRAG_SPLIT_THRESHOLD_PX = 36` (L479) — which `proof:colocation`
clause (b) would flag if `GlassDock.vue` were a `.ts` (the dock `constants.ts` already holds
8 such consts; this one belongs there). This wiring is a CONSUMING-seam over the already-
external `useDockFission` engine — the SFC re-implements the piece-registration + drag-gate
that has no home. (Per CONTEXT.md the deep dock re-architecture is the A-dock-arch agent's;
this audit notes the split-only mechanical seam, deferred to that wave if it lands first.)

### createCanvasLifecycle has THREE genuine internal seams

`createCanvasLifecycle.ts` (695) is a single-concern lifecycle core, but it carries three
self-contained sub-mechanisms that read NO shared closure state of the scheduler:
1. **`sizeBacking()` + `BackingSize`/`DprPolicy`** (L37–123, ≈90 lines) — a PURE
   CSS-geometry sizer (gBCR + bounded ancestor walk + DPR clamp). Zero scheduler coupling.
2. **the context-loss circuit-breaker** (the `N_RESTORE_STORM`/`T_RESTORE_STORM_MS`/
   `RESTORE_DEBOUNCE_MS` consts L264–266 + the loss-window/debounce/trip logic L560–618)
   — its own bounded state, threaded only through `arm`'s `bindContextEvents`.
3. **the IO/CV park detectors** (`findCvHost`/`bindContentVisibility` L417–447 +
   `bindIntersectionPark` L496–524) — both write the suspend `Set` via the shared
   `suspend`/`resume`, but the binding/finding logic is self-contained.

### useGlassBackdropLuminance has a clean FREE-RIDER seam

`useGlassBackdropLuminance.ts` (542): the BE.W-AMBIENT-TINT hue histogram (L112–221, ≈110
lines — `HueHistogram` struct, `makeHueHistogram`/`accumulateHuePixel`/`resolveAmbientHue`
+ the 4 `AMBIENT_*` consts) is a self-contained sub-concern grafted INTO the per-pixel loop.
The WCAG-luma math (`linearize`/`relLuminance`/`parseRgb`, L229–247) is another pure leaf.
The composable proper (the sample/throttle/IO/PRM wiring) is the core. This is the
"composable beside its math leaves" shape — exactly aurora's `color.ts`/`uniformBridge.ts`.

### useBlobSatellites has a pure-helpers seam

`useBlobSatellites.ts` (533): constants are ALREADY in `../constants` (the colocation `(b)`
clause is satisfied). The remaining mass is (a) pure orbit helpers `createSatellite`/
`setPhase`/`orbitPos`/`randomizeOrbit` + `randRange`/`clamp01`/`lerp` (L26–155, ≈130 lines)
and (b) the `useBlobSatellites` state-machine (the `tick` phase switch, ≈300 lines). The
helpers read no closure — they're a `satelliteKinematics.ts` leaf beside the system.

### useGooDotMatrix has the two-backend setup-closure seam (+ a DRY hit)

`useGooDotMatrix.ts` (508): `gooDotSetup.ts` already holds the one-time resource build. The
remaining mass is `buildWGPUSetup` (L257–356) + `buildGLSetup` (L359–448) — the per-frame
pack+draw closures, ≈195 lines. They duplicate a `resize()` block each (L267–277, L366–377)
that the BD.W-SUBSTRATE-SIZE-UNIFY leaf `sizeBacking` was built to own — this viz never
adopted the `dprPolicy` leaf seam (a DRY/maintenance debt, not a hard bug).

### SegmentedTabs has two extractable script seams

`SegmentedTabs.vue` (512, script 387): `useTabIndicator`+`useTabDragMorph` are carved. The
inline residue is (a) the BB.W-DRAG-MORPH roving-tabindex keyboard contract (L289–371,
`activeIndex`/`rovingTabindex`/`focusEnabled`/`focusEdge`/`onStripKeydown`, ≈80 lines) and
(b) the responsive-collapse state (L170–207, `responsiveCfg`/`breakpoint`/`desktopOptions`/
`stripValue`/`showMobileSelect` + the mql lifecycle, ≈55 lines). Both are colocate-able to
`tabs/composables/` beside the two existing tab composables.

---

## ROOT CAUSES (gestalt, first-principles)

1. **The CSS-recipe externalization precedent was applied unevenly.** `segmented-tabs.css`
   proves the house rule — a component's shared/structural recipe lives in a `styles/`
   partial, not a scoped `<style>` block. The goo-barbell SFCs (carousel + pager) were
   written with inline scoped CSS and the rule was never back-applied, so the SAME barbell
   recipe is duplicated across two files AND inflates both past 500. The fix is the
   precedent, not a new pattern.

2. **A consuming-seam over an engine accretes in the SFC when the engine ships before the
   wiring has a home.** GlassDock's fission, useGooDotMatrix's setup closures, and
   SegmentedTabs' keyboard contract are all "wire the shipped engine" code that grew in the
   host because there was no colocated composable slot — the engine got carved, the wiring
   did not. The colocation idiom already has the answer (a `composables/` neighbor).

3. **A "free rider" sub-concern grafted into a hot loop reads as bloat but is really a
   missing leaf.** `useGlassBackdropLuminance`'s ambient-hue histogram and
   `createCanvasLifecycle`'s circuit-breaker/sizer are self-contained mechanisms that were
   added in-place. Aurora's dir shows the target: small pure leaves (`color.ts`,
   `frameLoop.ts`) beside the composable that orchestrates them.

4. **Two files are at their irreducible floor and must be left alone.** `useBloomUp` (a
   cohesive single composable + an 88-line essay header) and `api/index.ts` (a barrel) hit
   500 by content width, not god-module accretion. Over-splitting them is the contrivance
   the cardinal law forbids. The honest win on `useBloomUp` is header-trim, not file-split.

---

## PROPOSED WAVES

### BG.W-GOO-BARBELL-CSS — externalize the duplicated goo-barbell recipe to one partial
- **Intent.** Kill the carousel≡pager goo-barbell CSS duplication; drop both SFCs under 400.
- **Approach.** Mint `src/styles/motion/goo-barbell.css` (`@import`-ed into `styles/index.css`
  beside `morph-field.css`) carrying the SHARED barbell structure (`.goo-body`/`.goo-neck`
  reciprocal-squish recipe, the `@supports not (filter:url())` floor, the PRM
  `display:none` drop) parameterized on `--goo-body-d`/`--neck-waist` tokens. CarouselContent
  and PagerDots keep ONLY their genuinely-local knobs (the `--carousel-goo-*`/`--pager-*`
  token values, the dark-arm, the cast `::before`) in a slim scoped block, composing the
  partial classes. The `segmented-tabs.css` precedent exactly. No `:deep()` — the shapes are
  the SFCs' own children. The `#carousel-neck-throat`/`#pager-neck-throat` objectBoundingBox
  clipPaths stay inline (per-instance structural defs).
- **Files.** `+styles/motion/goo-barbell.css`, `~styles/index.css`,
  `~carousel/CarouselContent.vue` (style 218→~60), `~pager-dots/PagerDots.vue` (style 193→~55).
- **π/bar.** `tests-visual/{carousel,pager}` goo-morph captures byte-identical both modes
  (the barbell waist/travel reads unchanged); both SFCs <400 LoC; zero duplicated
  `.goo-body`/`--neck-waist` rule across the two scoped blocks.
- **Folds.** The recurring "scoped-CSS where a shared partial belongs" debt.

### BG.W-DOCK-FISSION-WIRE — colocate the fission piece-registration off GlassDock.vue
- **Intent.** Lift the ≈165-line fission wiring out of the SFC into a colocated composable.
- **Approach.** Mint `dock/composables/useDockFissionPieces.ts` (the `useDockFission` SIBLING,
  not an edit to it — box-INVIOLATE): it owns `pieceHandles`, `dockCenter`,
  `registerSplittablePieces` (the vector-getter math), the `onPointerMove/Down/Up`
  drag-to-split state, and exposes `{ split, merge, toggleSplit, isFissioned, onDockPointer* }`.
  GlassDock binds it under `:splittable` and forwards the template handlers. Move
  `DRAG_SPLIT_THRESHOLD_PX = 36` into `dock/constants.ts` (8 consts already there). The SFC
  shell drops to ≈540. **Deferred-coordination note:** if A-dock-arch's re-architecture
  lands first, this seam folds into it (the dock band is its scope per CONTEXT.md); this
  wave is the split-only mechanical extraction when the dock survives mostly as-is.
- **Files.** `+dock/composables/useDockFissionPieces.ts`, `~dock/constants.ts`,
  `~dock/GlassDock.vue`, `~dock/composables/index.ts`.
- **π/bar.** GlassDock <550 LoC; `proof:colocation` green (no inline dock magic-number);
  `proof:dock-*` + the fission split π unchanged; `:splittable` demo byte-identical.

### BG.W-CANVAS-LIFECYCLE-LEAVES — carve the 3 internal seams off createCanvasLifecycle
- **Intent.** Split the lifecycle core's three self-contained sub-mechanisms into leaves;
  the core drops to ≈400 and reads as orchestration only.
- **Approach.** Three `webgl/`-sibling leaves (NOT a feature-dir — these are substrate
  internals): `webgl/sizeBacking.ts` (`sizeBacking`+`BackingSize`+`DprPolicy`, the pure
  sizer), `webgl/contextLossBreaker.ts` (the `N_RESTORE_STORM`/`T_*`/`RESTORE_DEBOUNCE_MS`
  consts + a `createRestoreBreaker()` returning `{ recordLoss, scheduleRebuild, tripped }`),
  `webgl/canvasParkObservers.ts` (`findCvHost`/`bindContentVisibility`/`bindIntersectionPark`
  factories taking the suspend/resume/resize callbacks). `createCanvasLifecycle` composes the
  three. The suspend `Set` + tick/wake + visibility owner STAY in the core (they ARE the
  schedule). Byte-fenced: the substrate-single gates (`proof:webgl-substrate-single`,
  `proof:gpu-substrate-single`) FOLLOW the composition into the leaves (the
  `webgl-substrate-single "asserts follow the composition into the carved leaf"` precedent).
- **Files.** `+webgl/{sizeBacking,contextLossBreaker,canvasParkObservers}.ts`,
  `~webgl/createCanvasLifecycle.ts` (695→~400), `~webgl/useWebGLCanvas.ts` (import re-point),
  `~webgpu/useWebGPUCanvas.ts` (import re-point, the `BackingSize`/`DprPolicy` re-export).
- **π/bar.** `proof:offscreen-pause` + the two substrate-single gates green by construction;
  the WebGL contract test + aurora PRM suite unchanged; core <420 LoC; no leaf >150.

### BG.W-AMBIENT-HISTOGRAM-LEAF — carve the ambient-hue + WCAG-luma math off the observer
- **Intent.** Split `useGlassBackdropLuminance`'s two pure math sub-concerns into leaves.
- **Approach.** Mint `glass/ambientHueHistogram.ts` (the `HueHistogram` struct +
  `makeHueHistogram`/`accumulateHuePixel`/`resolveAmbientHue` + the `AMBIENT_*` consts +
  `SampleResult`) and `glass/wcagLuminance.ts` (`linearize`/`relLuminance`/`parseRgb`). The
  composable keeps the sample/throttle/IO/PRM ORCHESTRATION (≈300 lines) + imports the two
  leaves. The value.js `srgbToOKLab`/`rawOklabToOklch` import moves WITH the histogram leaf
  (the single-color-core fence holds — `proof:single-color-core` follows). This is the
  aurora `color.ts`-beside-`useAurora.ts` shape.
- **Files.** `+glass/{ambientHueHistogram,wcagLuminance}.ts`,
  `~glass/useGlassBackdropLuminance.ts` (542→~330).
- **π/bar.** `proof:single-color-core` + `proof:adaptive-observer` green; the ambient-tint
  π (the per-bucket hue write) unchanged; observer <350 LoC.

### BG.W-BLOB-KINEMATICS-LEAF — carve the pure orbit helpers off useBlobSatellites
- **Intent.** Split the deterministic orbit kinematics (no closure state) into a leaf.
- **Approach.** Mint `goo-blob/composables/satelliteKinematics.ts` (`createSatellite`/
  `setPhase`/`orbitPos`/`randomizeOrbit` + `randRange`/`clamp01`/`lerp`). `useBlobSatellites`
  keeps the `tick` state-machine + the public surface (≈350 lines) + imports the leaf.
  Constants already live in `../constants` (colocation satisfied). KISS-bounded — do NOT
  further split the `tick` phase-switch (it is ONE coherent state machine; the fission/merge/
  emerge phases share the `s`/`now`/`mood` frame and reading them apart is contrivance).
- **Files.** `+goo-blob/composables/satelliteKinematics.ts`,
  `~goo-blob/composables/useBlobSatellites.ts` (533→~360).
- **π/bar.** `proof:blob-render`/`proof:goo-redress` green; the satellite orbit/merge π
  unchanged (deterministic per seed — byte-identical); system <380 LoC.

### BG.W-GOODOT-SETUP-SPLIT — carve the two per-frame setup closures + adopt the leaf sizer
- **Intent.** Split useGooDotMatrix's WGPU/GL setup closures; pay down the duplicated `resize`.
- **Approach.** Mint `goo-dot-matrix/composables/gooDotFrame.ts` (`buildWGPUSetup` +
  `buildGLSetup` as factories taking `{ config, getField, pointer, satellites, resolveFrame,
  dotPush, shouldContinue }`). The composable keeps the field-sim wiring + the handle
  (≈300 lines). WHILE there: route both `resize()` blocks through the BD.W-SUBSTRATE-SIZE-UNIFY
  `dprPolicy` leaf seam (delete the two duplicated `clientWidth || canvasSize` blocks — the
  exact drift `sizeBacking` was built to own; the `composeIntersectionPark` opt-in too).
- **Files.** `+goo-dot-matrix/composables/gooDotFrame.ts`,
  `~goo-dot-matrix/composables/useGooDotMatrix.ts` (508→~300).
- **π/bar.** `proof:gpu-substrate-single` (goo-dot row) green; the field/dot π unchanged;
  composable <320 LoC; zero per-backend `resize()` self-measure block.

### BG.W-TABS-KEYBOARD-LEAF — colocate the roving-tabindex + responsive seams off SegmentedTabs
- **Intent.** Lift the keyboard contract + responsive-collapse out of the SFC.
- **Approach.** Mint `tabs/composables/useTabRovingFocus.ts` (`activeIndex`/`rovingTabindex`/
  `focusEnabled`/`focusEdge`/`onStripKeydown`, taking `{ stripOptions, buttonRefs,
  stripValue, isVertical, select }`) and `tabs/composables/useTabResponsive.ts`
  (`responsiveCfg`/`breakpoint`/`desktopOptions`/`stripValue`/`stripOptions`/
  `showMobileSelect` + the mql lifecycle). SegmentedTabs binds both (the `useTabIndicator`
  sibling pattern). The SFC drops to ≈360 script.
- **Files.** `+tabs/composables/{useTabRovingFocus,useTabResponsive}.ts`,
  `~tabs/SegmentedTabs.vue` (512→~370).
- **π/bar.** `proof:tabs-std` + axe roving-tabindex contract green; the keyboard/responsive
  behavior byte-identical; SFC <400 LoC.

### BG.W-BLOOMUP-HEADER-TRIM — trim the 88-line essay header (NO file split)
- **Intent.** `useBloomUp.ts` is a cohesive composable at its floor; the only honest win is
  the header. Trim L1–88 to ≈25 (intent + the FLIP-inversion fact + the 4th-channel fact),
  pointing at CLAUDE.md / motion-canon.md for the doctrine instead of reciting it.
- **Approach.** Header-only edit; ZERO behavior change; the file drops to ≈445.
- **Files.** `~motion/useBloomUp.ts`.
- **π/bar.** No π — doc-only; `proof:bloom-up` (if present) unchanged; file <460 LoC.
- **Note.** This is the recorded NO-SPLIT decision for the two cohesive over-500 files
  (`useBloomUp`, `api/index.ts`) — both stay single, the gate proves they are not
  god-modules. `api/index.ts` needs no change (a barrel is correct at its public width).

---

## The 400–500 trend (flag, watch — most are at their floor)

| File | LoC | Verdict |
|---|---|---|
| `aurora/composables/runtime.ts` | 499 | Already heavily carved (`glSetup`/`wgpuSetup`/`frameLoop` are siblings); at floor. WATCH. |
| `goo-blob/types.ts` | 494 | A pure type file — at its declaration width; no split. |
| `ui/slider/Slider.vue` | 482 | script 165, **style 294** — the heavy-CSS twin of carousel/pager. Externalize the recessed-track recipe to a `styles/slider.css` partial (no partial today). PROPOSE as a BG.W-GOO-BARBELL-CSS sibling if it crosses 500. |
| `motion/useMorphField.ts` | 468 | Cohesive morph engine; WATCH. |
| `aurora/constants/shaders/aurora.frag.ts` | 466 | Shader — no split (GL fence). |
| `motion/useLiquidMorph.ts` | 462 | Cohesive; WATCH. |
| `motion/useGooMorph.ts` | 460 | The shared barbell engine; cohesive; WATCH. |
| `dock/composables/useDockState.ts` | 454 | Hover-hysteresis + touch state machine; cohesive; WATCH (folds into A-dock-arch). |
| `timeline/ContinuousMarkers.vue` | 444 | WATCH. |
| `constellation/composables/useConstellation.ts` | 442 | `constellation` is a feature-dir; if it crosses 500, carve a `constellationFrame.ts` leaf. WATCH. |
| `goo-blob/composables/useMetaballRenderer.ts` | 429 | WATCH (the field renderer; carve a frame leaf if it crosses). |
| `dock/composables/useDockContextSilhouette.ts` | 551 | **OVER 500 — defer to A-dock-arch** (a dock composable; CONTEXT.md scopes the dock band there). Note here: it carries the same composable-internal-seam shape (a pure projection leaf + the orchestration). |
| `dock/composables/useDockFission.ts` | 604 | **OVER 500 — defer to A-dock-arch.** The fission ENGINE; if the dock survives, carve its spring/neck math into a `fissionGeometry.ts` leaf beside it. |
| `card/Card.vue` | 412 | script 297; the φ-padding ladder + surface-axis. Cohesive; WATCH (do not split a 412 SFC). |
| `dock/DockLayerGroup.vue` | 417 | script 325; WATCH (folds into A-dock-arch). |

**Two dock composables (`useDockFission` 604, `useDockContextSilhouette` 551) are over 500
but DEFERRED to the A-dock-arch agent** per CONTEXT.md's dock-band scoping — flagged here so
the split landscape is complete; their seams (a geometry/projection leaf beside the engine)
mirror the patterns above.
