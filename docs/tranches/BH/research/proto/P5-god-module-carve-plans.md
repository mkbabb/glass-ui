# P5 — GOD-MODULE CARVE PLANS (unblocks B2.4/B2.5 + demo splits)

Read-only research; prototype + report under `proto/`. Repo `/Users/mkbabb/Programming/glass-ui` @ `tranche/BG`, 4.2.0 → BH 5.0.0.
Evidence: `proto/shader-exemption-probe.mjs` + `proto/shader-exemption-report.json` (ran clean).

---

## 0. THE DECISIVE BG-INTERLEAVE FACT (changes the framing of this whole pass)

The synthesis assigns the src god-module carves to BH bands B2.4/B2.5. **But the BG-WS4 SPEC ALREADY ENUMERATES carves for 8 of the 12 carve targets**, and BG **DELETES** a 9th. Verified in `docs/tranches/BG/converge/BG-WS4-components-demo-encapsulation/SPEC-pass2-converged.md:195` + `SPEC-pass1.md:215` + the `BG.W-DEAD-COMPOSABLE-CUT` rows. So the honest disposition per file is **CARVE-OWNER: BG vs BH**, not "BH carves all 12".

| File | L | BG owns the carve? | BH role |
|---|---|---|---|
| GlassDock.vue | 712 | **BG WS2** (`SPEC-pass1.md:215` "GlassDock.vue→WS2") | consume/verify |
| createCanvasLifecycle.ts | 696 | **BG WS4** ("post-WS5 re-measure", `SPEC-pass2-converged.md:195`) | consume/verify |
| useWebGPUCanvas.ts | 607 | **BG WS4** (same line) | consume/verify |
| useDockFission.ts | 605 | **BG WS2** (`SPEC-pass1.md:215`) | consume/verify |
| CarouselContent.vue | 578 | **NO** — absent from every BG spec | **BH CARVES** |
| useDockContextSilhouette.ts | 552 | **BG DELETES** (`BG.W-DEAD-COMPOSABLE-CUT`, WS2-coord, DEFINITION-ABSENT) | **no carve — verify deleted** |
| useGlassBackdropLuminance.ts | 543 | **BG WS4** (→`ambientHueHistogram.ts`+`wcagLuminance.ts`) | consume/verify |
| useBlobSatellites.ts | 534 | **BG WS5** (`SPEC-pass1.md:215`) | consume/verify |
| SegmentedTabs.vue | 513 | **BG WS4** (→`useTabRovingFocus.ts`+`useTabResponsive.ts`) | consume/verify |
| PagerDots.vue | 510 | **NO** — absent from every BG spec | **BH CARVES** |
| useGooDotMatrix.ts | 509 | **BG WS5** (`SPEC-pass1.md:215`) | consume/verify |
| useBloomUp.ts | 508 | **NO** — absent; overfitting-audit first | **BH CARVES/AUDIT** |
| api/index.ts | 506 | n/a — **DELETED by B2.2** (api-fold) | delete, not carve |

So BH genuinely owns **3 carves** (CarouselContent, PagerDots, useBloomUp), **1 delete-verify** (useDockContextSilhouette), **1 fold-delete** (api), and **7 consume-and-verify** where BG carves. The carve plans below give the **target leaf shape** for ALL of them — for the BG-owned ones the plan is the shape BH asserts BG's carve matches (the gate FOLLOWS the composition into the leaf, the `proof:webgl-substrate-single` precedent the BG spec cites). The plans use the byte-fence discipline (public barrel surface unchanged; carved leaves are colocated internal siblings, reader-gates re-pointed into the leaf).

---

## 1. SHADER-EXEMPTION GLOB (prototype RAN — `shader-exemption-report.json`)

```
glob:    src/**/*.{wgsl,glsl,frag,vert}.ts
regex:   /\.(wgsl|glsl|frag|vert)\.ts$/
```

**Evidence (ran):**
- 44 shader-literal files total; **exactly 3 exceed 500L** — `metaball.wgsl.ts` 530, `flow-field.glsl.ts` 518, `metaball.frag.ts` 511 — and these are EXACTLY the 3 the synthesis names (`assert_exactly_three_shaders_over_500: true`, `assert_three_match_expected: true`).
- The suffix glob ALSO catches `composables/glass/wave/waveField.glsl.ts` (152L) + `waveField.wgsl.ts` (146L) — NOT in a `shaders/` dir but **genuine single shader-string literals** (`export const WAVE_FIELD_GLSL = /* glsl */ \`…\``, `waveField.glsl.ts:13`). Correctly exempt; both under 500 so they never touched the god-module count anyway. (My probe's `assert_no_overmatch` heuristic was dir-based and wrongly flagged these; the suffix glob is the correct, broader test — every `.{wgsl,glsl,frag,vert}.ts` file in the repo is a single cohesive shader string by the splice-chunk convention.)
- **No non-shader source file uses any of the 4 suffixes** — zero false exemptions of real logic.
- Residual >500L after exemption = the **13 non-shader god-modules** (the 12 carve/delete targets above + nothing else). The exemption is necessary AND sufficient: without it `proof:no-god-module` reds 3 cohesive shaders; with it the gate's residual set == the carve set exactly.

**`proof:no-god-module` patch:** add the suffix-glob to the gate's IGNORE set (a `EXEMPT_SUFFIX_RE = /\.(wgsl|glsl|frag|vert)\.ts$/` skip in the file walk), plus a self-test bite asserting a synthetic 600L `*.frag.ts` is exempt AND a synthetic 600L `*.ts` is flagged. Concurrent-safe with BG (the ratchet gate is BG-untouched).

---

## 2. SRC CARVE PLANS (symbol-level)

### 2.1 createCanvasLifecycle.ts 696 → 3 leaves (BG WS4 owns; BH verifies)
Public surface KEPT: `createCanvasLifecycle`, `sizeBacking`, `BackingSize`, `DprPolicy`, `CanvasFrameHooks`, `CanvasLifecycleOptions`, `CanvasLifecycleHandle`, `CanvasSuspendReason`, `N_RESTORE_STORM`/`T_RESTORE_STORM_MS`/`RESTORE_DEBOUNCE_MS`. Three cohesive cut lines:
- **`lifecycle/sizeBacking.ts`** ← `sizeBacking()` + `BackingSize` + `DprPolicy` (`:37-123`). PURE function, zero closure deps — the cleanest extraction; ~90L. Re-export the types from the composer for the byte-fence.
- **`lifecycle/contextBreaker.ts`** ← the Safari context-loss circuit-breaker: `N_RESTORE_STORM`/`T_RESTORE_STORM_MS`/`RESTORE_DEBOUNCE_MS` (`:264-266`) + the loss-window state machine + debounce (`:560-618`, the `lossTimestamps`/`breakerTripped`/`clearRestoreTimer` cohort). Extract as a factory `createContextBreaker()` returning `{ recordLoss(), scheduleRebuild(fn), reset(), get tripped() }`; `arm()`'s `bindContextEvents` closure calls it. ~70L.
- **`lifecycle/parkDetectors.ts`** ← the three offscreen-park owners: the CV-host finder + bind/unbind (`findCvHost`/`bindContentVisibility`/`onContentVisibilityAutoStateChange`, `:362-447`), the IO park (`bindIntersectionPark`/`unbindIntersectionPark`, `:487-524`), the visibility owner (`onVisibilityChange`, `:362-368`). Extract as a factory `wireParkDetectors({ canvas, suspend, resume, resize, wake, getArmed, getHooks, composeIO, rootMargin })` returning `{ bindAll(), unbindAll() }`. ~150L. (These close over the scheduler, so the factory takes the scheduler's `suspend/resume/resize/wake` + `armed`/`hooks` getters.)
- **Stays in `createCanvasLifecycle.ts`** (the composer, ~280L): the suspend `Set` + `tick`/`wake`/`suspend`/`resume`, the PRM `matchMedia` monitor, `presize` + the leaf RO, `revealBloom`, `arm`/`renderAt`/`dispose`, the returned handle.
- **BG DEP:** BG WS5 re-measures the size-unify path → carve AFTER WS5 closes (the BG spec's "post-WS5 re-measure" note). Reader-gates: `proof:offscreen-pause`, `proof:webgl-substrate-single`, `proof:gpu-substrate-single` FOLLOW into the leaves.

### 2.2 useWebGPUCanvas.ts 607 → 1 leaf (BG WS4 owns; BH verifies)
Precedent SET: `webgpuDevice.ts` already carved out (`WebGPUInitError`, `isSoftwareWebGPUAdapter`, imported `:49`). The 607L is the second drain.
- **`webgpu/acquireSharedDevice.ts`** ← the PROCESS-SHARED device warm: `sharedDevicePromise` (`:123`), `acquireSharedDevice()` (`:146-200`), `withAcquireTimeout()` (`:92-109`), `WEBGPU_ACQUIRE_TIMEOUT_MS` (`:82`), `supportsWebGPU()` (`:61-67`), `__resetSharedGpuDeviceForTest()` (`:135`). One cohesive unit — the "one device, many contexts" memo + its timeout race + capability probe. ~120L. Public re-exports (`supportsWebGPU`, `WEBGPU_ACQUIRE_TIMEOUT_MS`, `__resetSharedGpuDeviceForTest`) preserved via re-export from `useWebGPUCanvas.ts`.
- **Stays (~300L):** `createWebGPUCanvas` + `buildContext` + `probePipeline` + `onUncapturedError` + `acquireDevice`/`wireDeviceLoss` (the per-canvas concerns) + `armAsync` + the handle/options types. Drops well under 500.
- **BG DEP:** none structural; concurrent-safe. Gate `proof:gpu-substrate-single` clause A (single-bootstrap: `navigator.gpu`/`requestAdapter` stay reachable) FOLLOWS into the acquire leaf — the leaf is the new single-bootstrap home, already the pattern `webgpuDevice.ts` set.

### 2.3 useGlassBackdropLuminance.ts 543 → 2 leaves (BG WS4 owns: `ambientHueHistogram.ts`+`wcagLuminance.ts`)
Public surface KEPT: `useGlassBackdropLuminance`, `GlassBackdropBucket`, `UseGlassBackdropLuminanceOptions`, `UseGlassBackdropLuminanceControls`.
- **`glass/ambientHueHistogram.ts`** ← the BE.W-AMBIENT-TINT hue-histogram cohort: `AMBIENT_HUE_BUCKETS`/`AMBIENT_HUE_L`/`AMBIENT_HUE_C`/`AMBIENT_NULL_MASS` (`:130-140`), `HueHistogram` (`:151`), `makeHueHistogram()` (`:164`), `accumulateHuePixel()` (`:179`), `resolveAmbientHue()` (`:208`). Pure functions — a free-rider feature cleanly separable. ~100L. (Matches BG's named leaf exactly.)
- **`glass/wcagLuminance.ts`** ← the WCAG relative-luminance helpers: `linearize()` (`:230`), `relLuminance()` (`:236`), `parseRgb()` (`:241`), `SampleResult` (`:143`). Pure. ~40L. (Matches BG's named leaf.)
- **Stays (~280L):** the `useGlassBackdropLuminance` reactive observer (rAF-throttle, IntersectionObserver gate, PRM monitor, `resolveSourceCanvas`/`isCanvas`/`SAMPLE_DOWNSAMPLE`, the bucket-write).
- **BG DEP:** none; concurrent-safe. Gate `proof:adaptive-observer` FOLLOWS into the leaves.

### 2.4 useBlobSatellites.ts 534 → 1 leaf (BG WS5 owns; BH verifies)
Public surface KEPT: `useBlobSatellites`, `BlobSatelliteSystem`. The file is mostly pure orbit math + one big reactive manager.
- **`goo-blob/composables/blobSatelliteOrbit.ts`** ← the pure orbit/envelope math: `randRange`/`clamp01`/`lerp` (`:26-38`), `createSatellite()` (`:38`), `setPhase()` (`:92`), `orbitPos()` (`:103`), `randomizeOrbit()` (`:128`) + the `ORBIT_RANDOM_*`/`SAT_WOBBLE*` envelope constants. Stateless given an rng — clean. ~140L.
- **Stays (~370L):** `useBlobSatellites()` — the reactive manager (`internals`/`sources` arrays, `syncOrbitRadius`/`syncCount`/`tick`, the smin-band worst-case widen).
- **BG DEP:** BG WS5 (viz) → carve after WS5. Gate `proof:blob-render`/`proof:goo-redress` FOLLOW.

### 2.5 useGooDotMatrix.ts 509 → 1 leaf (BG WS5 owns; BH verifies)
Public surface KEPT: `useGooDotMatrix`, `UseGooDotMatrixOptions`, `GooDotMatrixHandle`.
- **`goo-dot-matrix/composables/gooDotGrid.ts`** ← the dot-grid output stage + the SDF-field-splice helpers + `breathPulse()` (`:70`) + `MID_MERGE_CLOCK_MS` (`:77`) + the per-frame uniform-pack (`packGooDotUniforms`) the renderer calls. ~150L. (The renderer body composes `useGpuSubstrate` + `useBlobMood`/`useBlobPointer`; the dot-grid math is the separable leaf.)
- **Stays (~360L):** `useGooDotMatrix()` renderer wiring.
- **BG DEP:** BG WS5. Gate `proof:gpu-substrate-single` (goo-dot row) FOLLOWS.

### 2.6 SegmentedTabs.vue 513 → 2 leaves (BG WS4 owns: `useTabRovingFocus.ts`+`useTabResponsive.ts`)
Public component surface KEPT (props/emits unchanged). Two script-cohesion cut lines (the SFC template stays):
- **`tabs/composables/useTabRovingFocus.ts`** ← the WAI-ARIA roving-tabindex contract: `rovingTabindex()` (`:310`), `focusEnabled()` (`:315`), `focusEdge()` (`:330`), `onStripKeydown()` (`:345`) + the axis-derived arrow logic. ~70L. (Matches BG's named leaf; NOT gated on `:draggable` per the BG spec note.)
- **`tabs/composables/useTabResponsive.ts`** ← the responsive collapse-to-Select branch: the `SegmentedTabsResponsive` resolution, `onMql()` (`:184`), `onMobileUpdate()` (`:285`), the breakpoint MediaQueryList wiring. ~60L. (Matches BG's named leaf.)
- **Already-delegated (KEEP):** `useTabIndicator` (indicator/squish, `:209`), `useTabDragMorph` (`:225`). The `animatePress`/`readToken`/`pillHoverClass` stay inline (small, component-local).
- **BG DEP:** none structural; BG WS4 owns. Gate `proof:tabs-std`/`proof:control-tokens` FOLLOW.

### 2.7 GlassDock.vue 712 → 2-3 leaves (BG WS2 owns; BH verifies)
Already heavily delegated (`useDockShellProps`, `useDockMorphWindow`, `useDockFission`, `useGlassBackdropLuminance`, `useDockState`, `useDockMorphOrchestrator`, `useDockItemDrag`, `useDockClickIntegrity`). The residual script:
- **`dock/composables/useDockTouchGate.ts`** ← the touch-gate machine: `shouldGateTouch()` (`:278`), `onTouchStart/Move/End` (`:296-312`). ~50L. (`useTouchGate` is the dom leaf it composes; this is the dock-specific gate policy.)
- **`dock/composables/useDockFissionWiring.ts`** ← the fission wiring glue: `dockCenter()` (`:392`), `registerSplittablePieces()` (`:399`), `split`/`merge`/`toggleSplit` (`:494-502`), `DRAG_SPLIT_THRESHOLD_PX` (`:479`), `onDockPointerDown/Up` (`:482-489`). ~110L. (Composes `useDockFission`; this is the dock-root's binding to it.)
- **Fold remaining `onDockPointerMove` (`:460`) into the existing `useDockItemDrag.ts`** (the drag axis already lives there).
- SFC drops to template + composable wiring (<500).
- **BG DEP:** HIGH — BG WS2 owns dock heavily. Carve AFTER WS2. Gates `proof:dock-morph-family`/`proof:dock-morph-insitu`/`proof:dock-unify` FOLLOW.

### 2.8 useDockFission.ts 605 → 1 leaf (BG WS2 owns; BH verifies)
Public surface KEPT: `useDockFission`, `DockSplitContext`, `DockSplitVector`, `DockSplitPlacement`, `DockSplitSquishPeak`, `DockSplitSignature`, `DOCK_SPLIT_SIGNATURES`, `PLACEMENT_VECTOR`, the piece-registration/handle/options/return types.
- **`dock/composables/dockFissionGeometry.ts`** ← the placement/silhouette geometry: `PLACEMENT_VECTOR` (`:80`), `DOCK_SPLIT_SIGNATURES` (`:118`), `placementVector()` (`:296`), `writePieces()` (`:348`) + the piece-position math (the stateless transform from t→per-piece transform). ~180L. The constant tables + the pure geometry move; the spring/animation drive (`ensureSpringRunning`/`disposeSpring`/`seatSync`/`split`/`merge`) stays.
- **Stays (~420L):** the fission engine reactive core.
- **BG DEP:** BG WS2. Gate `proof:dock-fission`/`proof:dock-morph-family` FOLLOW.

### 2.9 useDockContextSilhouette.ts 552 → **NO CARVE — BG DELETES IT**
**Evidence:** `BG.W-DEAD-COMPOSABLE-CUT` (`SPEC-pass3-converged.md:214`, `SPEC-pass4-converged.md:147`): "`useDockContextSilhouette.ts`(WS2-coord) DEFINITION-ABSENT". Confirmed on disk: **zero live imports** (`grep import.*useDockContextSilhouette src/ demo/` = NONE — the only reference is a PROSE COMMENT in `demo/stories/dock/examples/AppSwitcher.vue:3`), **not on any barrel** (`dock/index.ts`/`src/index.ts` clean). BH must NOT plan a carve. BH role: VERIFY the file is DEFINITION-ABSENT post-BG-WS2 and reconcile the stale `AppSwitcher.vue:3` comment if BG didn't. (`detachVector`/`diffSilhouetteSlots` `:524-539` are exports but consumer-less — they die with the file.)

### 2.10 CarouselContent.vue 578 → **BH CARVES** (1 leaf)
NOT in any BG spec → BH owns. The goo-barbell engine is ALREADY shared (`useGooMorph(tokenPrefix:"carousel-goo")`, `:24`) — DRY done at the engine level. The residual is the embla-wiring + barbell geometry.
- **`ui/carousel/composables/useCarouselWorm.ts`** ← the embla scroll/select wiring + barbell geometry: `slideStep()` (`:66`), `centerOf()` (`:90`), `restSize()` (`:101`), `setWormGeometry()` (`:122`), `markUserDriven`/`onUserGesture`/`markTraveling`/`onSelect`/`onScroll`/`syncCount`/`bind` (`:143-228`). ~180L. The SFC keeps template + the `useGooMorph` + `useCarouselWorm` wiring.
- **BG DEP:** none (carousel absent from BG defect ledger — confirmed `lane-gamma:199`). Concurrent-safe. New gate: a thin `proof:carousel-worm` reader-gate FOLLOWS into the leaf (or extend `proof:colocation`).

### 2.11 PagerDots.vue 510 → **BH CARVES** (1 leaf)
NOT in any BG spec → BH owns. Like CarouselContent, the goo engine is shared (`useGooMorph`, `:6`). DRY note: PagerDots + CarouselContent share `centerOf`/`restSize`/barbell-geometry — a SECOND-order DRY fold of the barbell geometry into a shared `motion/gooBarbellGeometry.ts` is a candidate IF a 3rd consumer lands (J-inv-10 ≥2 bar already met by these two; recommend a shared geometry leaf).
- **`pager-dots/composables/usePagerWorm.ts`** ← the windowing oracle + worm geometry: `centerOf()` (`:118`), `restSize()` (`:142`), `setDot`/`setGooDot` (`:89-97`), `select()` (`:218`), the `pagerWindow` windowing logic. ~170L. (`PagerWindow`/`PagerDotsProps` types stay on the barrel — they're published via `/api` `:213`/`:202`, which the api-fold re-homes to `/pager`.)
- **BG DEP:** none. **BD "liquid-weight" goo-morph dots** — the BD tranche already landed `useGooMorph`; no BG/BD live ownership conflict (verified `useGooMorph` is shipped, both consume it). Concurrent-safe.

### 2.12 useBloomUp.ts 508 → **BH AUDIT-THEN-CARVE**
NOT in any BG spec. Synthesis flags overfitting-audit first. Quick read: exports `useBloomUp` + `BloomUpPreset`/`UseBloomUpOptions`/`UseBloomUpReturn`; the `AppSwitcher.vue:3` comment names it as the AppSwitcher engine. **Action:** run the overfitting audit (`docs/audits/overfitting-audit.md`) — count live consumers. If ≥2 → carve the keyframe/field-resolution helpers (`resolveField` `:199`, `resolveHue` `:217`, `clampStrength`/`prefersReducedMotion` `:178-187`, `AMBIENT_STRENGTH_CEILING` `:176`) → `motion/bloomUpField.ts` (~120L), renderer stays. If 1 consumer (only AppSwitcher) → MOVE the whole file into `custom/dock/composables/` (or AppSwitcher's owner) per the J-inv-10 colocation rule, THEN split if still >500. Decision blocked on the audit count (out of read-only scope to assert here, but the AppSwitcher-only signal suggests single-consumer → relocate).

### 2.13 api/index.ts 506 → **DELETED (not carved)** — B2.2 api-fold
Confirmed pure re-export aggregator (`:31-340`, every line `export type {…} from "../components/…"`). Dies with the api-fold; the 1 demo consumer (`paper-texture.vue`) migrates to owning subpaths. NOT a carve. The `PagerWindow`/`PagerDotsProps`/`SegmentedTabs`/etc. types it re-exports already live on their component barrels (per §2 of lane-gamma). Note `proof:no-god-module` loses this entry at the api-fold — the residual god-module count drops 13→12 then the 12 carves drain it to ∅.

---

## 3. DEMO GOD-MODULES — BG-WS4 OWNS; BH CONSUMES (no parallel split)

Per `lane-delta:210` ("WS4 = DIRECT: demo chassis consolidate · >500 splits · colocation-gate") and the BG-WS4 spec, **every demo god-module is BG-owned**. BH's role is RE-SHAPE onto the post-WS4 tree (`lane-delta:217` "consume its splits, don't re-split"). Per-file ownership (from the BG specs):

| Demo file | L | BG owner | Note |
|---|---|---|---|
| `stories/manifest.ts` | 1236 | **BG WS4** `BG.W-MANIFEST-COLOCATE` | **DIVERGENCE FLAG ↓** — BG FOLDS the 4 parallel maps onto the `s()` row but KEEPS `manifest.ts` ("a row-per-page is defensible"; `SPEC-pass1.md:119`). BG does NOT split into `rows/<category>.ts` the way lane-δ5 wanted. BH-δ5 must DECIDE: accept BG's folded single-file manifest, OR (if still >500 post-fold) do the row-split as a re-shape consuming BG's fold. Not a parallel fork — sequence after WS4. |
| `dock/liquid-playground.vue` | 930 | **BG WS2/WS6** (dock) | `lane-delta:164` target shape: `index.vue` + `parts/{BloomDemo,IslandFissionDemo,PlayerScrubDemo,FacetRail}.vue` + `constants.ts`. BH consumes WS2's split. |
| `substrates/blob.vue` | 870 | **BG WS5** `BG.W-VIZ-STUDIO-ADOPT` (`SPEC-pass1.md:213`) | re-homed onto VizStudio. BH consumes. |
| `layout/AppShell.vue` | 860 | **BG WS1** (routing + morph-stage; `lane-delta:213`) | BG pass2 DROPS the `timeline-scope` edit as cargo-cult — the AppShell god-module split itself is WS1's routing scope. BH consumes. |
| `substrates/constellation.vue` | 759 | **BG WS5** `BG.W-VIZ-STUDIO-ADOPT` | VizStudio adopt. BH consumes. |
| `dock/overview.vue` | 680 | **BG WS2** (dock stories; `lane-delta:211`) | BH consumes. |
| `display/card.vue` | 562 | **BG WS4** (display / framing-chassis) | BH consumes. |
| `aurora/presets.ts` | 588 | **BG WS5/WS4** | `lane-delta:170`: folds to `substrates/aurora/constants.ts`, split-by-preset-family if still >500. The orphaned `stories/aurora/` dir folds into `stories/substrates/aurora/` (lane-δ4/δ6). BH consumes WS5's viz work + does the dir-fold. |

**No demo god-module is uncovered by BG.** The ONE thing BH-δ owns outright is the **per-story-DIR move + the `import.meta.glob("./*/*.vue")` → `./*/*/index.vue` migration** (`lane-delta:154`, the #1 gotcha — a per-story-dir restructure silently renders `MissingStory`→null), which BG-WS4 does NOT do (BG keeps the flat `<cat>/<id>.vue` glob). That glob-migration + the manifest row-split (if pursued) are BH-δ5/δ6, strictly AFTER WS4, with a **runtime route-walk** as the binding evidence (grep insufficient).

---

## 4. SUMMARY OF RESOLVED FACTS

1. **Shader exemption glob `src/**/*.{wgsl,glsl,frag,vert}.ts`** is necessary AND sufficient — catches all 44 shader-literal files, exactly 3 >500L (metaball.wgsl/frag, flow-field.glsl), zero non-shader false-exemptions; `waveField.{glsl,wgsl}.ts` correctly caught (genuine single-string literals, <500). Residual-after-exemption == the 13 non-shader carve/delete targets exactly. Prototype RAN (`shader-exemption-report.json`).
2. **BG already owns 8 of the 12 carves + DELETES a 9th.** BH genuinely owns only 3 carves (CarouselContent→`useCarouselWorm`, PagerDots→`usePagerWorm`, useBloomUp→audit-then-`bloomUpField`/relocate), 1 delete-verify (useDockContextSilhouette = DEFINITION-ABSENT, BG.W-DEAD-COMPOSABLE-CUT, zero live imports), 1 fold-delete (api). The carve plans give the target leaf shape the gates assert (gate FOLLOWS the composition into the leaf).
3. **`useDockContextSilhouette.ts` is dead** — zero live imports (only a stale `AppSwitcher.vue:3` comment), not on any barrel; BG deletes it. NO carve.
4. **All 7 demo god-modules are BG-WS4/WS2/WS5/WS1-owned.** BH consumes, never re-splits. ONE divergence: BG keeps `manifest.ts` (folds parallel maps, no row-split) — BH-δ5 reconciles. BH owns the per-story-dir glob-migration (`./*/*/index.vue`), strictly after WS4, route-walk-evidenced.
5. **PagerDots + CarouselContent already share `useGooMorph`** — engine DRY done; only barbell geometry is component-local (a 2nd-order `motion/gooBarbellGeometry.ts` fold is a recommended-but-optional consolidation).
