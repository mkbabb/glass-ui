# GRAPH ADJUDICATIONS — batch rulings

Each batch of the component graph was viewed thrice: two benches told to assume the graph STRUCTURE is
wrong, and an adjudicator that proves or disproves each finding independently. Batch sizes are bespoke
to the graph's own clusters, not arbitrary slices.

**Owed: NOTHING** (struck 2026-07-28 per VALIDATION CURE-7 — the `cluster-dock`/`cluster-pairs`
adjudications completed and are SUPERSEDED in substance by `DAG-RULINGS.md` §2/§3/§3a; journal-only).


---

## ADJUDICATION — batch `giants` (aurora, blob, fourier-field, constellation, timeline, handmark)

Independent re-measurement at HEAD `0371836d`. Path-resolving extractor written from scratch: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/jury-giants-edges.mjs` (resolves each specifier against `dirname`, tests the `src/components/<name>` prefix, scans `.ts/.vue/.css`, skips comment lines, includes `import()` and `@import`).

### THE CORRECTED GRAPH — both benches wrong, in opposite directions

```
comp->comp edge SITES: 40 | distinct ordered pairs: 30
_shared edge SITES:   264 | distinct pairs: 47
connected nodes (deg>0): 32
clusters: 36 | singletons: 30 | singleton LOC: 15577 (27.5% of 56676)
  19 members  19717 LOC : button carousel configurator dock dropdown-menu easing fading-scroll
                          input label labeled-field number-field popover search select slider
                          switch tabs timeline tooltip
   3 members  17473 LOC : aurora blob fourier-field
   3 members    647 LOC : card header-ribbon surface
   3 members   1077 LOC : data-table skeleton table
   2 members    623 LOC : chip tags-input
   2 members   1562 LOC : command dialog
2-cycles: dock <-> dropdown-menu        SCCs(>1): [["dock","dropdown-menu"]]
```

DAG.md §1 / EXEC-STATE's "56 clusters, 53 singletons, 43,929 LOC (78%), only three clusters have any edge" is **STRUCK**. The isolated share is **27.5%**, not 78%. The primary cluster is **19 nodes / 19,717 LOC**, not 5 / 10,655.

---

## BENCH A — verdicts

**GIANTS-G1 · PARTIAL.** The bug is PROVEN exactly as stated: `dag3.mjs:109` requires a trailing slash, so barrel imports are invisible; it also captures a component's *own* subdirectories (`dag-deterministic.json` gives `aurora.importsComponents: ["composables","constants"]`, `blob: ["shaders"]`, `typewriter: ["utils"]` — none are components). `_shared` is excluded from `nodes` while carrying **264 edge sites / 47 distinct pairs**. A's **32 connected nodes is CONFIRMED** — my independent extractor lands on 32 exactly. A's **"108 component→component edges" is DISPROVEN**: 40 sites / 30 distinct ordered pairs excluding `_shared`. A's "aurora has two real src consumers reported as zero" is PROVEN (blob, fourier-field).

**GIANTS-G2 · PROVEN, and understated.** `blob/composables/useMetaballRenderer.ts:8`, `fourier-field/composables/{fourierFieldGLSetup.ts:20, fourierFieldWGPUSetup.ts:15, useFourierField.ts:36}` all deep-link `"../../aurora/constants/budget"`. Four sites, no barrel. **Correction to A's remedy:** `src/composables/glass/webgl/backingSize.ts` does *not* import `resolveBudgetDpr` — it only names it in a comment, so "where DPR policy already lives" is unfounded. **Additional finding neither bench made:** `AV_MAX_BLOBS`, `AV_LOOP_DURATION_MIN_S`, `AV_LOOP_DURATION_MAX_S` have **zero references anywhere in `src/`** outside their own declaration and jsdoc — dead exports in a 74-line file.

**GIANTS-G3 · PROVEN, and understated.** `dist/handmark.js:4` is a bare top-level `import … from "@mkbabb/pencil-boil"`, declared `optional: true` in `peerDependenciesMeta`. Zero dynamic arms in `src/components/handmark`. Masked locally by `devDependencies["@mkbabb/pencil-boil"] = "0.9.2"`. **A stopped one node short — the same defect is in its own batch:** `dist/blob.js` statically imports the optional `@mkbabb/keyframes.js` (`import { SpringProgress as z } from "@mkbabb/keyframes.js"`). Full census of optional peers statically imported in `dist/`: `pencil-boil` → `handmark.js`; `keyframes.js` → `blob.js dock.js drawer.js useSpring-*.js useDragMorph-*.js useAnimatedNumber-*.js`; `@vueuse/core` → 6 chunks. This is a class, not an instance.

**GIANTS-G4 · PROVEN.** `GlassTimeline.vue:2-4` statically imports all three variants; `index.ts` exports `GlassTimeline` only; `dist/timeline.js:6` imports `./popover-758jVIhN.js` unconditionally (6,984 B against 17,371 B). All three variants are live in demo (one story each). The union is real and the cost is unconditional.

**GIANTS-G5 · PARTIAL — the split ground survives, the scope does not.** PROVEN: two distinct shader *programs*, both static, chosen by runtime ternary (`glSetup.ts:165`; `wgpuSetup.ts` `getConfig().source === "image"` → `AURORA_IMAGE_WGSL`); zero dynamic imports in aurora; `dist/aurora.js` = 202,687 B vs blob 103,031 / fourier 44,422 / constellation 21,076 / handmark 23,821 / timeline 17,371.

**DISPROVEN — the "painterly-medium arm (1,946 LOC)" is not a second engine.** `aurora.frag.ts` concatenates `AURORA_BRUSH_GLSL` + `AURORA_MEDIUMS_{PRE,POST}_BRUSH_GLSL` into **one** `FRAGMENT_SRC` routed by a `uniform int uMedium` (`if (uMedium == 1) … else if (uMedium == 7) …`). `IMAGE_FRAGMENT_SRC` carries **no** `uMedium` at all. A single uniform-branched program cannot be split into a subpath without rewriting the shader — A prescribed an untested cure (Rule 6). The mediums are also exercised: demo presets select `smooth`, `oil-pastel`, `watercolor`, `oil`. **What survives: the image engine (1,005 LOC, separate program, separate WGPU pipeline, separate texture-upload machinery) is separable; the mediums are not.**

**GIANTS-G6 · PROVEN (localised, not cured — as A itself concedes).** `src/composables/glass/webgpu/` exports device/canvas/status only — no pipeline API. Raw WebGPU call *lines*: aurora `wgpuSetup.ts` **24**, fourier `fourierFieldWGPUSetup.ts` **25**, blob `wgpuSetup.ts` **12** (A's 26/27/13 is off by the same one-line delta in each; substance unaffected). Spec bitflag re-declarations: **15** across four files, exactly as claimed.

**GIANTS-G7 · PROVEN.** `blobPullMapping` has **zero call sites**. Its only four references are `src/index.ts` (barrel), `tests/public-surface.spec.ts` (surface assertion), and two prose mentions in `usePointerVelocityField.ts`. Vacuity. The other three each have exactly one src consumer; `snapshotField` has three and is correctly module-level.

**GIANTS-G8 · PROVEN.** Five root files repeat `constellation`; `constellationField.ts:35 export type * from "./constellationTypes"` creates a dual path used inconsistently *inside the node* — `Constellation.vue:3` imports `ConstellationProps` from `./constellationField` while `index.ts` imports it from `./constellationTypes`. 49 re-exported symbols against 25 props, 2,452 LOC, 2 demo stories, 0 consumers.

**GIANTS-G9 · PROVEN.** `rendererStatus.ts:1` declares four engines, three of which are not WebGPU; 14 import sites across aurora/blob/fourier-field/constellation reach it through `composables/glass/webgpu/`, including canvas2d-only constellation.

---

## BENCH B — verdicts

**B2-01 · PARTIAL, and B repeated the bug it diagnosed.** The extractor defect is PROVEN. **B's corrected numbers are DISPROVEN, and its prescribed regex `from "\.\./([a-z0-9-]+)(?:/|")` is still blind to two-level imports** — which is why B missed `blob→aurora`, `fourier-field→aurora` and `dock→search`. B: 27 edges / 39 clusters / 34 singletons / 33,619 LOC (59%) / 18-member primary. Measured: **30 distinct pairs (40 sites) / 36 clusters / 30 singletons / 15,577 LOC (27.5%) / 19-member primary (19,717 LOC)**. Rule 6 violation — cure prescribed, not tested.

**B2-02 · PARTIAL.** `timeline → popover` (`ContinuousMarkers.vue:6`) PROVEN; timeline is in the 19-node primary cluster. **"aurora, blob, fourier-field, constellation, handmark are true singletons" is DISPROVEN** — aurora/blob/fourier-field are a 3-member cluster (17,473 LOC). Only **constellation and handmark** are true isolated singletons in this batch. The batch premise is wrong for **four** of six, not one.

**B2-03 · PROVEN, verbatim.** `dag-deterministic.json`: `aurora.cssClasses` contains `"catch"` and `"then"`; `handmark.cssClasses` contains `"join"` and `"map"`; tokens include `--armed`, `--clip`, `--dashoffset`, `--interactive` (BEM tails). **`fourier-field.tokens === ["--interactive"]`** — and independently confirmed 100% phantom: the only `var()` in fourier-field source is `var(--token)`, a doc placeholder. *Scope note for the record:* the `MIN=4` degenerate guard already nulled the class space for blob (3), constellation (2) and fourier-field (3), so the contamination inflates but does not cross the ≥0.34 CSS headline in this batch's direction.

**B2-04 · PARTIAL.** `src/components/PROCEDURAL-SUITE.md` (79 lines, loose beside `index.ts`) PROVEN; chassis-consumer set is exactly aurora/blob/constellation/fourier-field PROVEN; `watercolor-dot` exists and is correctly outside it (CSS/SVG only). **"Zero component→component edges among them, correctly" is DISPROVEN** by the four `aurora/constants/budget` sites — the module has a leak inward at its centre, which is the opposite of B's reading.

**B2-05 · PROVEN.** Consumer sets are disjoint; `rendererStatus` is the substrate-agnostic contract under a `webgpu/` path.

**B2-06 · PROVEN.** `useCanvas2D.ts:267 export const useCanvasLifecycle = useCanvas2D;`, re-exported twice, zero consumers, and the only reference is `tests/public-surface.spec.ts` asserting it exists — a Rule-4 violation certified by a Rule-7 self-passing gate.

**B2-07 · PROVEN.** `ScrubberTimeline.vue` `<style scoped>` declares `.glass-track`, `.glass-fill`, `.glass-thumb-seat`, `.glass-thumb`; `.glass-track-well` is composed only by `Slider.vue` and `Progress.vue`; `@utility glass-fill` exists at `src/styles/glass/surfaces.css`. Three independent private rails: `.glass-track` / `.segmented-track` / `.continuous-track`. (Scoping prevents runtime collision; the namespace squat is the defect.)

**B2-08 · PROVEN, census corrected.** Vue-importing files per `composables/`: aurora 3/16, blob 4/12, fourier-field 1/4, constellation 1/2, **handmark 1/1** (`useHandMark.ts:1 import { computed, ref, type Ref } from "vue"` — B's 0/1 is wrong). **10 of 35**, not 9. `aurora/constants/` holds `renderMode.ts` with a live WebGL device probe `isSoftwareWebGLRenderer()` and `resolveRenderMode()`.

**B2-09 · PARTIAL.** WGSL: **PROVEN** — `if (vi == 1u) { p = vec2<f32>(3.0, -1.0); }` appears verbatim in `aurora.wgsl.ts`, `aurora-image.wgsl.ts`, `blob/shaders/metaball.wgsl.ts` (fourier's `vs_main` is genuinely different — it takes `instance_index`). Bitflags: **PROVEN** (15). Existing chunk home: **PROVEN** (`OETF_WGSL`, `FBM_ROT_WGSL`, `OKLCH_MATRICES_WGSL`, `PALETTE_RAMP_WGSL`, + 5 GLSL twins). **"GLSL twins" is PARTIAL** — `aurora.vert.ts` and `metaball.vert.ts` are semantically identical but textually distinct (`aPos` vs `aPosition`; `aPos*0.5+0.5` vs `0.5*(aPosition+1.0)`). Fold them, but do not call it byte-copy. B's `uniformBridgeWGPU` non-duplication note is CONFIRMED.

**B2-10 · PROVEN in substance, framing corrected.** The duplicate `FourierFieldProps` at `index.ts:38-53` and the drift are both PROVEN: `FourierField.vue:46` ends "When absent, `color`/`config.palette` is used." — absent from `index.ts:44`; `.vue:48` "warm 2-stop palette" vs `index.ts:45` "warm palette". **B's "justified by a claim that is false" is wrong** — "an SFC cannot export its inline `defineProps` type" is literally *true*. The defect is the inline-ness, and the fix is a named interface, exactly as constellation and handmark already do.

**B2-11 · PROVEN.** The shim comment admits its purpose; `Constellation.vue:3` imports from `constellationField` while `Constellation.vue:35` documents `constellationTypes.ts`.

**B2-12 · PROVEN.** `grep aurora-canvas--armed src demo` returns exactly one binding and no rule; the only other hits are two assertions in `Aurora.init-error.test.ts`. The painting class `.aurora-canvas-layer--armed` is bound one element up and has a rule.

**B2-13 · PROVEN.** Five `constellation*` root files + two `constellation*` composables against handmark's zero-repeat neighbour; `fourierFieldGLSetup/fourierFieldWGPUSetup` against aurora/blob's stripped `glSetup/wgpuSetup`; `aurora-mediums.wgsl.ts` beside `mediums.glsl.ts` in one directory.

**B2-14 · PARTIAL — remedy DISPROVEN.** File sizes PROVEN (`resolveBlobSurface.ts` is 10 lines; handmark `composables/` = 1 file; constellation `composables/` = 2). **The prescription is refuted:** `resolveBlobSurface` has **two** call sites — `uploadBlobUniforms.ts` (GL) and `uniformBridgeWGPU.ts` (WGPU) — so it clears the ≥2-site overfitting bar and is precisely the one bounded decision shared by both backends. B named `blobSimulation.ts` as "its caller"; that file exists and **does not call it**. Keep the leaf; collapse the directories.

**B2-15 · CONFIRMED, all five.** Zero test files under `src/` (`find` returns 0). `rendererStatus` honesty confirmed. `uniformBridgeWGPU` non-duplication confirmed. `freehand.ts` live: `ink.ts:177` branches `b.ribbon === "hull"`, set on four brushes in `brush.ts`. `files: ["dist"]` — READMEs do not ship.

---

## TERMINAL GRAPH RULING

### Nodes

| node | ruling | ground |
|---|---|---|
| **aurora** | **SPLIT-INTO-`aurora` + `aurora-image`** | wrong-grain — two distinct shader programs, both static, one runtime ternary; 202,687 B, 2× the next giant. The `uMedium`-routed mediums stay in `aurora`: one program, not separable. |
| **blob** | **KEEP-THIN** | correct-as-is at the node; two defects to clear — the `aurora/constants/budget` leak and the optional-peer static import of `@mkbabb/keyframes.js` in `dist/blob.js`. |
| **fourier-field** | **KEEP-THIN** | correct-as-is; strike the duplicated `FourierFieldProps` (one declaration, `types.ts`), the `budget` leak, and the phantom-only token vector's cause. |
| **constellation** | **SPLIT-INTO-`constellation` (SFC) + headless field engine** | wrong-grain — 49 re-exported symbols, 25 props including a `(ctx, field, now) => void` render escape hatch; the barrel already ships the engine, so name it. Directory also wrong-home (module-name repetition + dual type path). |
| **timeline** | **SPLIT-INTO-`scrubber` + `segmented` + `continuous`; DELETE `GlassTimeline`** | wrong-grain — a `variant` string discriminator over three structurally unrelated widgets, 14 props of which none apply to all three, and an unconditional `popover` chunk in `dist/timeline.js` paid by scrubber consumers. No dispatcher survives as a fourth entry. |
| **handmark** | **KEEP** | correct-as-is structurally (already stripped, zero name repetition, `freehand.ts` live). One S0 to clear: `@mkbabb/pencil-boil` must become a **required** peer for `./handmark` — the import graph, not the prose, is the contract. |

### Edges

| edge | ruling | what breaks |
|---|---|---|
| `blob → aurora` (`useMetaballRenderer.ts:8`) | **SEVER-VIA-`composables/glass/webgl/budget.ts`** | Nothing. Move `AV_DPR_MAX`, `clampBudget`, `resolveBudgetDpr`; leave `resolveAuroraWashDpr` + `AV_MAX_COLORS` in aurora; **delete `AV_MAX_BLOBS`, `AV_LOOP_DURATION_MIN_S`, `AV_LOOP_DURATION_MAX_S`** (zero references). Clean break, no re-export. |
| `fourier-field → aurora` (×3) | **SEVER-VIA-** same leaf | Same. These four sites are the entire 3-member cluster; severing them dissolves it and makes the procedural suite honestly chassis-fused. |
| `timeline → popover` (`ContinuousMarkers.vue:6`) | **KEEP, on the continuous subpath only** | Earned by the continuous variant; illegitimate only because the union forces it on scrubber and segmented consumers. The split severs it without touching popover. |
| `constellation → _shared/class-names` | **KEEP** | Correct sharing. |
| aurora/blob/fourier-field → `glass/webgpu/rendererStatus` | **INVERT the path: MOVE-TO-`src/composables/glass/rendererStatus.ts`** | 14 import sites update. No shim. Canvas2d-only constellation stops importing its status contract from a WebGPU directory. |

### The cycle

**Not in this batch.** The one SCC in the library is `dock ↔ dropdown-menu` (`dock → dropdown-menu` and `dropdown-menu → dock`), confirmed by Tarjan over the corrected directed graph. Route to the primary-cluster seat. This batch's node set contains **no cycle** — the corrected `aurora ← blob`, `aurora ← fourier-field` edges are unidirectional and are severed above.

### Directory shape afterwards

```
src/components/procedural/            # names the module in the tree; retires the loose
                                      # src/components/PROCEDURAL-SUITE.md
  aurora/          Aurora.vue index.ts types.ts presets.ts renderMode.ts
                   engine/  { glSetup, wgpuSetup, uniformBridge, uniformBridgeWGPU, frameLoop, runtime }
                   color/   { color, atoms, atoms-fields }
                   shaders/ { main.frag, main.vert, main.wgsl, mediums.glsl, brush.glsl,
                              mediums.wgsl, flow.glsl, tonemap.glsl, composition.glsl,
                              vangogh, metal, oil-modes }
                   composables/ { useAurora, useCursorInteraction, configSource }   # vue-reactive only
                   cursorMapping.ts                       # colocated from pointerFieldMappings
  aurora-image/    engine/ { setup, uniformBridgeWGPU, textureUpload, source }
                   shaders/ { image.frag, image.wgsl }
  blob/            (constants/ shaders/ as today) composables/ = vue-reactive only;
                   engine/ { glSetup, wgpuSetup, uniformBridgeWGPU, uploadUniforms,
                             blobSimulation, resolveSurface, satelliteKinematics, easing }
  fourier-field/   types.ts (the ONE FourierFieldProps)  shaders/ { compute.wgsl, main.glsl,
                   render.wgsl, ribbon }  engine/ { glSetup, wgpuSetup }  composables/ { useFourierField }
                   leanMapping.ts
  constellation/   Constellation.vue index.ts types.ts constants.ts
                   field/ { index.ts (absorbs createConstellationField), well.ts, render.ts,
                            interaction.ts }
                   composables/useConstellation.ts   wellMapping.ts
                   # DELETE `export type *` at constellationField.ts:35 — one type home, ~7 sites repointed

src/components/timeline/  →  three siblings, no dispatcher
  timeline-scrubber/   { ScrubberTimeline.vue, index.ts }   # classes renamed out of the
                       #  `glass-` namespace: .scrub-channel .scrub-fill .scrub-head-seat .scrub-head
                       #  — or composed onto the shared `.glass-track-well`
  timeline-segmented/  { SegmentedTimeline.vue, index.ts }
  timeline-continuous/ { ContinuousTimeline.vue, ContinuousRail.vue, ContinuousMarkers.vue, index.ts }
  timeline/geometry.ts, timeline/types.ts   # the shared math, imported by all three

src/components/handmark/  unchanged shape; composables/useHandMark.ts → handmark/useHandMark.ts
                          (the root already holds 8 peers; a 1-file composables/ is sand)

src/composables/glass/
  rendererStatus.ts                # lifted out of webgpu/ — 4 engines, only one is WebGPU
  webgpu/{ useWebGPUCanvas, useGpuSubstrate, webgpuDevice, webgpuCanvasTypes, gpuFlags.ts }
                                   # gpuFlags.ts = the 15 re-declared spec bits, one home
  webgl/{ backingSize, createCanvasLifecycle, budget.ts }   # the severed DPR policy
  procedural/{ color.wgsl, color.glsl, prng, stage.ts }     # stage.ts = FULLSCREEN_TRI_WGSL
                                                            #   + FULLSCREEN_TRI_VERT_GLSL
  motion/pointer/pointerFieldMappings.ts → keeps snapshotField + shared field constants only;
                 DELETE blobPullMapping (vacuity) + its assertion in tests/public-surface.spec.ts
  canvas2d/useCanvas2D.ts:267 → DELETE `useCanvasLifecycle` alias + both re-exports + the gate string
```

**Test displacement:** already satisfied — `find src -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*'` returns **0**. Every rename above must carry its `tests/` twin to the isomorphic path in the same commit.

**Born-RED gate the batch earns (one, not a family):** resolve every one of the 72 export-map subpaths in a clean install with **only the non-optional peers present**. It fails at HEAD on `./handmark`, `./blob`, `./dock`, `./drawer` and the `@vueuse/core` chunks — which is what makes it a gate.
---

## ADJUDICATION — batch `mid` (12 nodes)

### 0. INDEPENDENT RE-MEASUREMENT (my own resolver, not either bench's)

`scratchpad/ADJ-edges.mjs` — comment-blind, normalises every relative specifier against its own file's directory, maps the result to `src/components/<name>/`, filters against the component set. Output:

```
EDGES 30
CLUSTERS 36 singletons 30 singletonLOC 15577
  CL 19 19717  button carousel configurator dock dropdown-menu easing fading-scroll input label
               labeled-field number-field popover search select slider switch tabs timeline tooltip
  CL  3 17473  aurora blob fourier-field
  CL  3  1077  data-table skeleton table
  CL  3   647  card header-ribbon surface
  CL  2   623  chip tags-input
  CL  2  1562  command dialog
zero code-consumers: 41 of 62
```

Reproduces both benches exactly and independently. **The handed headline is refuted.** `dag3.mjs:109` emits 12 "edges", of which 5 (`aurora→composables`, `aurora→constants`, `blob→shaders`, `fourier-field→shaders`, `typewriter→utils`) are the components' own subdirectories — precision **7/12**, recall **7/30** (Bench A's 6/11 is an arithmetic slip; substance unaffected).

**Consequence for this batch's own premise:** it was dispatched as "isolated singletons". **Five of the twelve are not singletons** — `easing` (4 out-edges), `tabs` (2), `configurator` (2), `search` (1 in-edge from dock), `data-table` (2). Seven remain genuine singletons: typewriter, sortable-list, pager-dots, drawer, completion-seal, toast, watercolor-dot.

12 of the 30 true edges touch this batch. **This batch does not contain the cycle** — `dock→dropdown-menu→dock` is the only directed cycle and both endpoints are outside it. `dock→search` is one-way.

---

### 1. BENCH A

| id | verdict | establishing evidence |
|---|---|---|
| **G-1** | **PROVEN** | Reproduced above under an independent resolver. Correction: precision 7/12 not 6/11; recall 7/30. `dag-clusters.json` §clusters must be retracted with `DAG.md` §0/§1/§2. |
| **G-2** | **PROVEN**, one consequence **PARTIAL** | `useSelectionGroup.ts:13` imports `"../../../components/tabs/composables/useTabRovingFocus"` — `grep -rn 'components/' src/composables` returns **exactly this one line**: the sole composables→components import in `src/`. Its only src consumer is `dock/DockLayerGroup.vue:102`. `SegmentedTabs.vue` re-composes the parts by hand (`:214` indicator, `:270` select, `:295` roving). `grep -rn scrollIntoView src/components/tabs/` → **ZERO**; `useSelectionGroup.ts:183` fires it on every select. Third fork PROVEN: `PagerDots.vue:220 stepTo` carries the identical wrap idiom `(from + dir*step + n*step) % n` (`useTabRovingFocus.ts:126`), and `grep -nE 'rtl\|direction\|dir=' src/components/pager-dots/` returns only `PagerDots.vue:457 flex-direction: column` against `useTabRovingFocus.ts:169-171`'s RTL arm — **the RTL defect is live and real**. **PARTIAL only on the tabs consequence:** `grep -n 'overflow' src/components/tabs/styles/*.css` returns **nothing**, so the segmented strip does not scroll and "a tab past the fold never recenters" is unestablished. The three forks and the RTL divergence stand. |
| **G-3** | **PROVEN** | `DrawerTitle.vue:17` ≡ `DialogTitle.vue:15` (`cn('text-subheading leading-none tracking-tight', props.class)`, same reka primitive); `DrawerDescription.vue:17` ≡ `DialogDescription.vue:14`. Scrim block `DrawerOverlay.vue:21-33` vs `ModalOverlay.vue:58-72` — same anchor ref, same `{immediate:true, flush:"post"}`, same `anchor?.parentElement ?? null`, same dispose-if-still-mine guard; deltas are the context identifier and `onBeforeUnmount`/`onScopeDispose`. `dialogStageContext.ts:4-7` is exactly `{wrapperEl, scrimEl}`; `drawerSnapContext.ts:32,34` carries both plus snap state — strict subset confirmed. `grep -rln HtmlHTMLAttributes src/` → 6 files, **all** under `drawer/`. |
| **G-4** | **PROVEN** | `SearchBar.vue` 83 lines, imports `vue`/`@lucide/vue`/`../_shared/{class-names,axes}`/`./searchVariants` — **zero** from `./composables`. Engine = 243+149+34 = **426 LOC**. Only consumer anywhere in `src`: `dock/composables/useDockSearch.ts:53`. `command/Command.vue:2` takes reka's `ComboboxRoot` — two ranking laws confirmed. |
| **G-5** | **PROVEN** | `EasingConfigurator.vue` 62 lines, six pass-through props + one `defineModel`, template is exactly the two wrappers. `:14` is the only easing→configurator edge. My census: configurator's **sole** real code consumer is this file. `package.json:332,368`; `src/index.ts:140`. |
| **G-6** | **PARTIAL** | Shim PROVEN: `prng.ts:7` re-exports, comment at `:5-6` self-confesses "so the existing named surface … is byte-identical"; `index.ts:7` republishes onto the subpath. **DISPROVEN as written:** "Zero consumers reach `mulberry32`/`hashString` through watercolor-dot" — `useWatercolorBlob.ts:2` and `WatercolorDot.vue:4` both do. The correct claim is *zero **external** consumers*; six external sites hit the leaf directly. |
| **G-7** | **PROVEN** | `use-toast.ts:50` `const toasts = ref<QueuedToast[]>([])` at module scope; `:53-57` action union; `:59` `dispatch` switch. `find src -name 'use-*.ts'` → **exactly one file**. (Minor: `REMOVE_TOAST` has two assignments, not one.) |
| **G-8** | **PROVEN**, cause restated | `data-table.propCount = 0`; `DataTableProps<T = any>` declares **20** props (not 21) at `types.ts:45-92`, consumed at `DataTable.vue:30`. Real cause: `dag3.mjs:63`'s `interface\s+\w*Props\w*\s*(?:extends[^{]*)?\{` cannot cross the **generic parameter list** `<T = any>` — not "props from an external interface". `deck` is the only other zero. Composables-space contamination PROVEN: `tabs.composables` = 6 members, 3 of them tabs' own; `search.composables` and `sortable-list.composables` each carry a `composables/types` that are two unrelated private files — the v2 name-collision artifact, masked only by the `MIN=4` guard. |
| **G-9** | **PROVEN**; `nodesAffected` **wrong** | `DockTrigger.vue:11` forward; `DropdownMenuContent.vue:11,63,71-72` reverse, cargo = `:data-glass-dock-portal` + `:data-glass-dock-owner`; `SelectContent.vue:32,70,98-99` byte-identical; `Popover.vue:8`; `Slider.vue:12` **plus** `:13 useDockHold` (slider's leak carries behaviour, not just attributes — the finding understates it). `nodesAffected: ["drawer","tabs"]` is a mislabel: neither node appears in the evidence. |

---

### 2. BENCH B

| id | verdict | establishing evidence |
|---|---|---|
| **MID-G1** | **PROVEN** | Same as G-1; reproduced independently. Note: `grep` finds **zero** `@/components/<name>` specifiers in `src/` — only the relative form matters. |
| **MID-G2** | **PROVEN** | My code-only census: **41 of 62** zero (det says 42). Style-aggregation false positives confirmed for all five named: `configurator`/`drawer`/`toast`/`completion-seal`/`tabs` show `srcConsumerCount:1` where the entry is `src/styles/index.css` or `src/styles/transitions.css`. `drawer`, `toast`, `completion-seal` are truly zero. |
| **MID-D1** | **PROVEN** | Subsumed by G-3. |
| **MID-D2** | **PROVEN** | `styles/utilities/components.css:12` `.input-bar` — 1px `--glass-border-floating`, `--glass-bg-floating`, `--glass-blur-floating`, `--control-pill-h`, `--radius-control`. `_shared/field/field-control.css:2` `.field-control` — 1.5px `--control-surface-border`, `--control-surface-bg`, `--glass-cell-backdrop-filter`, `--control-h-md`. Consumer sets are **disjoint**: `.field-control` → Input, Textarea, NumberFieldInput, TagsInput, LabeledField, number-field/styles.css; `.input-bar` → SearchBar.vue:4 and `dock/styles/search.css:42`. `input/types.ts:22` `type?: "email"\|"password"\|"search"\|…`. Two field-chrome recipes for one control, one of them global and one colocated. |
| **MID-D3** | **PROVEN** | Subsumed by G-5. |
| **MID-D4** | **PROVEN** (all 3) | `tabs/constants.ts` is 15 lines, wholly `export {…} from "../../composables/motion/morph/useSelectionIndicator"` with the comment at `:7-8` conceding it exists so consumers "keep their `../constants` import". `watercolor-dot/prng.ts:7`. `search/searchVariants.ts:36-37` — and `SearchBar.vue:33` imports `controlSizeClass` *through* it rather than from `_shared/control-size`. |
| **MID-D5** | **PROVEN** | `src/components/` is flat. `tests/` carries three shapes; `tests/components/ui/{data-table,dialog,slider,…}` and `tests/components/custom/{tabs,drawer,search,configurator,typewriter,…}` encode a taxonomy `src/` does not have. `typewriter` is tested in **both** trees. `tests/configurator-recursion.spec.ts` sits at the tests root. `completion-seal` → **zero** test files. |
| **MID-D6** | **PROVEN** | `searchVariants.ts:13-17` — `inline:""`, `floating:""`, `bare:"border-none bg-transparent p-0 rounded-none"`; the comment at `:9` states floating "is the same recipe as `inline`". Both `SearchVariant` and `searchFieldVariants` are published (`search/index.ts:5-6`). |
| **MID-D7** | **PROVEN** | `ToastAction.vue:22` carries four `group-[.destructive]:` utilities. `Toast.vue:109` puts `group` on the root; `:116` applies **`feedback-tone-destructive`**, never `.destructive`. Repo-wide `grep 'group-\[\.destructive\]'` → 2 hits, this line and a `ToastClose.vue:31` comment recording the same residue's prior deletion. The selector cannot match. |
| **MID-D8** | **PROVEN, exactly** | `typewriter/index.ts:3-7` four bare `export *`; enumerated re-exports = **25** symbols including `QWERTY_MAP`, `pickTypoChar`, `sleep`, `randomInRange`. |
| **MID-D9** | **PROVEN** | `wc -l` on `search/`: 562 total (B said 569), engine 426, SFC 83. Sole consumer `useDockSearch.ts:53`. |
| **MID-D10** | **PROVEN** | `ToastTitle.vue` 17 lines / `ToastDescription.vue` 17 lines, each one `cn()` string over a reka primitive, each with an exported props interface and a barrel entry. |
| **MID-D11** | **PROVEN** | `grep -rl '\bglass-reveal\b' src/components/` → dialog, dropdown-menu×2, popover, select, toast×2, tooltip = **6 components, 8 files**, register in `styles/glass/reveal.css` + `styles/transitions.css`. Zero import edges among them in the corrected graph. |
| **MID-D12** | **PROVEN** | `sortable-list/composables/` = dragController, dropResolver, ghostRenderer, touchGate, transitionTiming, types, useSortable — **1 of 7** is a composable; `context.ts` sits at root. `search/composables/` = 1 of 4. Root-level composables: `configurator/useConfiguratorState.ts`, `watercolor-dot/useWatercolorBlob.ts`, `toast/use-toast.ts`. |
| **MID-D13** | **PARTIAL** | Files exist as listed (**17**, not 14). The collision is real and is the sharpest instance: `src/composables/motion/morph/useDragMorph.ts` exists. **DISPROVEN sub-claim:** "imported by `SegmentedTabs.vue` alongside it" — the SFC imports `useTabDragMorph`; the shared `useDragMorph` is imported at `useTabDragMorph.ts:7`, one layer down. **The remedy overreaches.** Stripping `typewriter/composables/useTypewriter.ts` or `completion-seal/composables/useCompletionSeal.ts` yields `use.ts`. The workable rule (index.ts checked for each): **a file named for its own public export is exempt, exactly as SFC filenames are.** `useTypewriter`, `useEasingPicker`, `useCompletionSeal`, `useWatercolorBlob`, `useConfiguratorState`, `useFuzzySearch`, `useSortable` are all in their barrels — exempt. `useTabDragMorph`, `useTabResponsive`, `useTabRovingFocus`, `useDataTableResponsive`, `useDataTableRowIdentity` are **private** (absent from `tabs/index.ts`, `data-table/index.ts`) — they strip. |
| **MID-D14** | **PROVEN** | `find src -name 'use-*.ts'` → exactly `src/components/toast/use-toast.ts`. |
| **MID-D15** | **PROVEN** (all 3) | `drawer/styles.css:314` `.glass-drawer-snap-rule` — grep across `src/`, `demo/`, `tests/` returns only the definition and its own comment. `tabs/styles/segmented.css:151-157` — seven-line comment; `segmented-indicator--anchor` exists nowhere else. `completion-seal/constants.ts:80-81` — grep returns only the two definition lines; neither is in `completion-seal/index.ts` either. |
| **MID-D16** | **PROVEN** | `DrawerHeader.vue:19` and `DrawerFooter.vue:19` each re-declare `[--overlay-pad-inline:1rem] [--overlay-pad-block:calc(…*1.272)]` plus a third derived token, with the same verbatim justification at `:11-15`. `Toast.vue:109` declares its ladder once on the root — the contrast holds. |
| **MID-D17** | **PARTIAL** | **PROVEN:** no `watercolor-dot` slug in `demo/stories/manifest.ts`, no `demo/stories/**/watercolor-dot*.vue`; the component appears only in `blob.vue`, `foundations/colors.vue`, `CatalogLanding.vue`. **PROVEN:** `WatercolorDot.vue:241` says the silhouette "is traced by the `.watercolor-ghost-stroke` SVG `<ellipse>` `stroke-dasharray` overlay" while `:273` ships `border-style: dashed` — and `:185-191` *contradicts it in the same file* ("never an ellipse, never a dashed rectangle"). Two comments, one stale. **DISPROVEN:** `easing/README.md` does **not** claim an `/easing` route — `:97` correctly names `demo/stories/motion/curve-gallery.vue`. The `/easing` strings are the package subpath (`package.json:368`), which resolves. `EasingConfigurator.vue:11`'s "both on /easing" reads the same way. |

---

### 3. TERMINAL GRAPH RULING — batch `mid`

#### Nodes

| node | LOC | ruling | ground |
|---|---|---|---|
| **typewriter** | 1418 | **KEEP-THIN** | wrong-grain. Four `export *` → four symbols (`TypewriterText`, `useTypewriter`, `TypewriterOptions`, `TypewriterWord`). `sleep`/`randomInRange` **MOVE-TO** `src/composables/` — library-generic, not a typewriter's. |
| **sortable-list** | 1140 | **KEEP** | correct-as-is; wrong-home internally. 5 non-composables leave `composables/` for module root. |
| **easing** | 988 | **SPLIT** — DELETE `EasingConfigurator.vue`, KEEP `EasingPicker` | vacuity. 62 lines, zero logic, six pass-throughs. |
| **pager-dots** | 846 | **KEEP-THIN**, roving machine **MERGE-INTO** `useSelectionGroup` | superfluity + live defect. Third fork of one machine; the RTL arm is missing, so `ArrowRight` in a `dir="rtl"` document advances the pager forward and the tab strip backward. |
| **data-table** | 794 | **KEEP** | correct-as-is. Its `propCount:0` is a measurement bug, not an API fact — 20 props, outranking dialog(17)/tags-input(17)/slider(16). |
| **drawer** | 1625 | **SPLIT** — DELETE `DrawerTitle`/`DrawerDescription`; **MERGE-INTO** dialog the scrim seam; KEEP `Drawer`/`DrawerContent`/`useDrawerSnap` | superfluity at the shell, correct-as-is at the physics. **This is the ruling on `dialog~drawer` reka 0.80: the shell folds, the detent engine (492+224 LOC) does not.** `DialogStageContext` is `Pick<DrawerSnapContext,'wrapperEl'|'scrimEl'>` and dies as a separate type. |
| **configurator** | 1534 | **DEMOTE-TO-DEMO** | wrong-home. 63.9% comment, 19 props, 9 demo consumers, and after the `EasingConfigurator` cut **zero** library consumers. Its only reason to sit in `src/` was the edge being severed. Breaks: the `./configurator` subpath and `src/index.ts:140`. |
| **tabs** | 1427 | **KEEP-THIN** + edge INVERT | wrong-home. `useTabRovingFocus` **MOVE-TO** `src/composables/motion/morph/useRovingFocus.ts`; SegmentedTabs consumes `useSelectionGroup` instead of re-composing its three parts. DELETE `constants.ts` (shim) and `segmented.css:151-157` (comment for absent code). |
| **search** | 569 | **SPLIT** — engine **MOVE-TO** `src/composables/search/`; `SearchBar` **KEEP-THIN** | wrong-grain. 426 of 562 LOC are a DOM-free ranking algorithm on a component subpath whose own SFC never calls it. DELETE `searchVariants.ts` — vacuity, a 3-value public enum where 2 arms are `""`; `bare` is a boolean. |
| **completion-seal** | 565 | **KEEP-THIN** | superfluity. DELETE `constants.ts:80-81` (documentation wearing code). D12-INSUFFICIENT: zero test files — write one. |
| **toast** | 568 | **KEEP-THIN** | superfluity + wrong-home. `use-toast.ts` → `composables/queue.ts`; four named functions replace the action union + dispatcher; the module-scope store is process-global state living under `components/`. DELETE `ToastTitle`/`ToastDescription` (class strings into the recipe). DELETE `ToastAction.vue:22`'s four `group-[.destructive]:` utilities — they can never match. |
| **watercolor-dot** | 513 | **KEEP-THIN** | superfluity. DELETE `prng.ts:7` and `index.ts:7`'s `mulberry32`/`hashString` — a legacy shim under a no-shims law, publishing a PRNG on a decorative dot's subpath. `randomRadii`/`radiiToCSS` fold into `useWatercolorBlob.ts`, their only consumer. Fix the stale `:241` comment. |

#### Edges

| edge | ruling | what breaks |
|---|---|---|
| `easing → configurator` | **SEVER-VIA-DELETE** (`EasingConfigurator.vue`) | nothing in `src`; a consumer wanting the seated register writes 8 lines of template. This is the sole obstacle to the configurator demotion. |
| `easing → {button, select, slider}` | **KEEP** | ordinary composition — a curve editor built from house controls. |
| `tabs → {select, tooltip}` | **KEEP** | the responsive mobile collapse + label affordance. Legitimate. |
| `configurator → {fading-scroll, label}` | **SEVER-VIA-DEMOTION** | both edges leave `src/` with the node. |
| `data-table → {table, skeleton}` | **KEEP** | correct layering: a composite over primitives. |
| `dock → search` | **SEVER-VIA-MOVE** (engine to `src/composables/search/`) | nothing — `useDockSearch.ts:53` re-points one specifier and stops reaching sideways into a sibling component's private directory. |
| `composables/motion/morph → components/tabs` | **INVERT** | the only composables→components import in `src/`. Moving `useTabRovingFocus` up is safe: it imports `vue` only, so the `/motion-core` engine-free fence is unaffected (`motion/core/index.ts:98-104` already relies on that property). |
| `useSelectionGroup → SegmentedTabs` (missing) | **ADD** | tabs currently re-composes the engine's three parts by hand and drops the `scrollIntoView` recenter. |
| `glass-reveal` CSS register (dialog·dropdown-menu·popover·select·toast·tooltip) | **NAME IT** as a non-import edge type | six components share one enter/exit contract with zero import edges; a future reduction pass will otherwise treat them as unrelated singletons. |
| `.input-bar` ↔ `.field-control` | **SEVER-VIA-PRIMITIVE** — fold `.input-bar` into `.field-control` as a `[data-chrome="bar"]` arm under `_shared/field/` | deletes a global recipe from `styles/utilities/components.css`; re-points `SearchBar.vue:4` and `dock/styles/search.css:42`. |

#### Cycle

**Not in this batch.** `dock → dropdown-menu → dock` is the graph's only directed cycle; both endpoints sit outside these 12 nodes. `dock → search` is one-way and is severed by the engine move, not by inversion. Recorded for the owning batch: the reverse arm's entire cargo is two data attributes, and the same inward leak recurs in `select`, `popover` and `slider` — `slider` additionally takes `useDockHold`, so its leak is behavioural, not decorative. The fix is one generic portal-owner context with no dock identifier in the type; it removes the cycle and three leaks at once.

#### Directory shape afterwards

```
components/typewriter/       TypewriterText.vue · types.ts · composables/useTypewriter.ts
                             utils/{keyboard,pausePatterns,timing,typoStateMachine,graphemes}.ts   (unexported)
components/sortable-list/    SortableList.vue · SortableItem.vue · SortableHandle.vue
                             {dragController,dropResolver,ghostRenderer,touchGate,transitionTiming,types,context}.ts
                             composables/useSortable.ts
components/easing/           EasingPicker.vue · constants.ts · composables/useEasingPicker.ts
components/pager-dots/       PagerDots.vue · window.ts · constants.ts · composables/useWorm.ts
components/data-table/       DataTable.vue · types.ts · styles.css
                             composables/{useResponsive,useRowIdentity}.ts
components/drawer/           Drawer.vue · DrawerContent.vue · DrawerHeader.vue · DrawerFooter.vue
                             DrawerOverlay.vue · constants.ts · styles.css · composables/{snapContext,useSnap}.ts
components/tabs/             SegmentedTabs.vue · composables/{useDragMorph→audit,useResponsive}.ts
                             styles/{drag,segmented}.css
components/search/           SearchBar.vue                                     ← 83 lines, that is all
components/completion-seal/  CompletionSeal.vue · constants.ts · styles.css · composables/useCompletionSeal.ts
components/toast/            Toast.vue · Toaster.vue · ToastAction.vue · ToastClose.vue
                             composables/queue.ts
components/watercolor-dot/   WatercolorDot.vue · useWatercolorBlob.ts
composables/search/          {index,useFuzzySearch,types}.ts                   ← moved out of components/
composables/motion/morph/    useRovingFocus.ts                                 ← moved out of components/tabs/
demo/chassis/configurator/   Configurator.vue · ConfiguratorLayer.vue · ConfiguratorRow.vue · size.ts · state.ts · styles.css
```

**Module-name stripping**, applied under the corrected rule (a file named for its own *public* export is exempt, as SFC filenames are): `tabs/composables/useTab{Responsive,RovingFocus,DragMorph}` → `use{Responsive,…}` (all three private); `data-table/composables/useDataTable{Responsive,RowIdentity}` → `use{Responsive,RowIdentity}` (both private); `pager-dots/pagerWindow.ts` → `window.ts`; `pager-dots/composables/usePagerWorm.ts` → `useWorm.ts`; `search/searchVariants.ts` → deleted outright; `drawer/composables/{drawerSnapContext,useDrawerSnap}` → `{snapContext,useSnap}`. `useTypewriter`, `useEasingPicker`, `useCompletionSeal`, `useWatercolorBlob`, `useSortable`, `useFuzzySearch` stay — each is its barrel's exported name. Where stripping produces a collision, `tabs/composables/useTabDragMorph` → `useDragMorph` against `composables/motion/morph/useDragMorph.ts`, the collision is the audit trigger: settle whether the local wrapper should exist before renaming it.

**Test displacement:** collapse to `tests/components/<component>/`, isomorphic to `src/`. Delete `tests/components/ui/` and `tests/components/custom/` — they encode shadcn's taxonomy, which `src/` does not have. Merge `tests/components/typewriter.contract.test.ts` with `tests/components/custom/typewriter/TypewriterText.contract.test.ts`. Move `tests/configurator-recursion.spec.ts` out of the tests root and into the demo's tree with the node. Write the missing `completion-seal` suite.

**Retract before any reduction wave is scoped:** `DAG.md` §0/§1 (the edgeless headline), §2 (cluster counts), §4.3's 42-row list, and `EXEC-STATE.md`'s "Lead-verified facts" row that repeats them. `dag3.mjs` needs three fixes, not one: the specifier resolver (`:107`, `:109`), the composables-space qualifier (`:97` — exclude specifiers resolving inside the owning directory), and the generic-parameter-tolerant props parse (`:63`), with `propCount` returning `null` rather than `0` when the parse fails.
---

# ADJUDICATION — batch SMALL (35 nodes)

Verifier: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/adj.mjs` (resolves every `./`/`../` specifier against the **importing file's** dir, maps to component root, types each edge barrel-vs-deep, unions `_shared`, finds cycles). HEAD `0371836d`.

## 0. THE AUTHORITATIVE GRAPH — both benches right that the published one is wrong, neither right about the replacement

| figure | published (DAG.md §0–2, EXEC-STATE) | Bench A | Bench B | **measured** |
|---|---|---|---|---|
| component→component edges | 12 (5 phantom → 7 real) | 27 | 30 | **30** (17 barrel, 13 deep) |
| clusters (component-only) | 56 | 39 | — | **36** |
| singletons | 53 | 34 | — | **30** |
| largest cluster | 5 (10,655 LOC) | 18 | — | **19** |
| clusters (+`_shared`, `cn` excluded) | — | — | 11 | **21** |
| singletons (+`_shared`) | — | — | 10 | **18** |
| largest (+`_shared`) | — | — | 52 | **38** |
| cycles | 1 | 1 | 1 | **1** — `dock→dropdown-menu→dock`, both arms deep |

`_shared` fan-in: `class-names` 42 · `axes` 22 · `primitive` 18 · `selection` 7 · `resolveSurfaceClass` 6 · `floating`/`useMotionAxis`/`interaction` 5 · `field/fieldControl` 4 · `field/field-control.css` 4 · `control-size` 4 · `disclosure` 2 · `valueDomain` 2 · `menuRowClass` 1.

**The "nearly edgeless" headline is dead.** 53 singletons → 30; largest cluster 5 → 19.

---

## 1. BENCH A

**SMALL-G1 — PROVEN, edge set short by 3.** `rg -oN 'from "\.\./([a-z-]+)/' src/components/checkbox` → empty; `rg -oN 'from "\.\./[^"]+"'` → `../_shared/primitive`, `../_shared/selection`. All 20 named edges verified at the cited lines. A's 27 misses three **deep** `../../` hops: `blob→aurora` (`blob/composables/useMetaballRenderer.ts` → `../../aurora/constants/budget`), `fourier-field→aurora` (same import, 3 files), `dock→search` (`dock/composables/useDockSearch.ts` → `../../search/composables`). A's 39/34/18 reconciles *exactly* with its own short set (those 3 edges fuse `{aurora,blob,fourier-field}` and pull `search` in: −3 clusters, −4 singletons → 36/30/19). Arithmetic sound, extraction incomplete.

**SMALL-G2 — PROVEN.** 46 component dirs edge into `_shared`; all 28 named batch members confirmed with their exact registers. `_shared` cannot be a node under `[a-z-]+`.

**SMALL-G3 — PROVEN.** Typed at HEAD: all 13 deep edges are what the old regex could see; all 17 barrel edges were invisible. "The edges are LEAKS INWARD" is the regex describing itself. The cycle's two arms are `dock/DockTrigger.vue` → `../dropdown-menu/DropdownMenuTrigger.vue` and `dropdown-menu/DropdownMenuContent.vue` → `../dock/composables/dockContext` — both deep, both faults.

**SMALL-G4 — PROVEN, and the census is worse than A states.** Confirmed false non-zeros from CSS `@import`: `metric`, `scroll-progress-rim`, `instrument-chassis`, `header-ribbon`, `dark-mode-toggle`, `drawer`, `completion-seal`, `card` = `["src/styles/index.css"]`; `toast` = `["src/styles/transitions.css"]`. `infinite-scroll` = `["src/composables/sidebar/useLazyLoader.ts"]` — that file's only mention is **line 8, inside a JSDoc comment**. `button` reports `["src/styles/index.css"]` and misses 4 real code consumers. A **missed `chip`**: DAG reports `["src/styles/glass.css"]` (a CSS import) *and* drops the real consumer `tags-input/TagsInputItem.vue` — both errors in one cell. False zeros confirmed in-batch: `label` 0→3, `switch` 0→2, `table` 0→1, `skeleton` 0→1, `tooltip` 0→1, `fading-scroll` 0→1, `input` 1→3.

**SMALL-G5 — PROVEN.** `ls -d src/components/{composables,shaders,utils,constants}` → all absent. 5 of 12 recorded edges are phantom.

**SMALL-G6 — PROVEN.** `rg -n "from ['\"]\./['\"]" src/components` returns exactly two: `alert/Alert.vue:4`, `badge/Badge.vue:3`. Both barrels export the SFC and define the variants function.

**SMALL-G7 — PROVEN.** 20 `@import "../components/…"` statements (19 in `src/styles/index.css`, 1 in `glass.css:64`) vs 18 `<style src=>` SFCs. `_shared/field/field-control.css` is `<style src>`-imported by 4 SFCs (`Input.vue:57`, `Textarea.vue:56`, `TagsInput.vue:64`, `NumberFieldInput.vue:37`); `_shared/disclosure/disclosure.css` by 2.

**SMALL-G8 — PARTIAL; census short by 11.** Detector (≤22 lines, ≤1 declared prop) over all SFCs → **27**, not 16. A's 9 in-batch is missing `metric/MetricStack.vue`(14), `tags-input/TagsInputItemText.vue`(18), `paper-backdrop/PaperBackdrop.vue`(18). **The `table-cell` sub-claim is half wrong:** A asserts "there is no house `.table-cell`" — `@utility table-cell` exists at `src/styles/utilities/btn.css:95`. See B-07.

**SMALL-G9 — PROVEN.** LabeledField 121 / Input 47 / Select 61 / Slider 51 / Switch 52. Divergent omit lists confirmed. `labeled-field` is the batch's largest fan-out (5 barrel edges) and the published graph calls it isolated.

**SMALL-G10 — PROVEN.** `find src/components/deck -type f` → 5 files, **zero `.vue`**. `deck/index.ts:16` states it in-file.

**SMALL-G11 — PROVEN.** 18-line SFC; `@utility paper-underpaint` at `paper.css:99`. Export-map inversion measured exactly: subpath **present** for `paper-backdrop`, **absent** for `tags-input, accordion, avatar, radio-group, table, checkbox, alert, skeleton, input, textarea`.

**SMALL-G12 — PROVEN.** `rg -n 'body.style.overflow' src` → only `ExpandableContainer.vue:77,78,89`. `rg -n FocusScope src` → `src/index.ts:113` (comment), `dialog/placement.css:7` (comment), and this file alone at runtime.

**SMALL-G13 — PARTIAL; the focus half is DISPROVEN as stated.** 12 `cursor: not-allowed` arms across 5 selector idioms: **PROVEN**. `pointer-events` divergence **PROVEN** (`toggle-group:89`, `button:153`, `tabs/segmented.css:201` have it; `checkbox:52`, `switch:33`, `radio-group:87`, `field-control.css:91` do not). `tags-input:68` sets cursor with **no opacity**: PROVEN. Forced-colors: 8 component blocks + 3 shared sheets: PROVEN.
**Refuted:** A writes "toggle-group/styles.css has NO focus-visible rule" as a defect — `ToggleGroupItem.vue:41` composes `focus-ring`, which is the *correct* answer, not a gap. Measured composition matrix:

| | `.focus-ring` | `.tap-squish` | own PRM arm |
|---|---|---|---|
| checkbox | ✓ `Checkbox.vue:37` | ✓ | **✗** |
| toggle-group | ✓ `ToggleGroupItem.vue:41` | ✓ | — |
| button | ✓ | ✓ | — |
| switch | **✗** `Switch.vue:38` = `'switch tap-squish'` | ✓ | ✓ |
| radio-group | **✗** | **✗** | ✓ |
| chip | ✓ `chipVariants.ts:6` | **✗** (no press at all) | — |

Two of four hand-roll, not three — and the *cause* is structural, not sloppiness: switch paints on `.switch__track` and radio-group on `.radio-group__face`, **descendants the host utility cannot reach**. Any remedy that says "just compose `.focus-ring`" is untested and wrong (Rule 6).

---

## 2. BENCH B

**B-01 — PARTIAL.** Regex diagnosis PROVEN; edge count **30 exactly right**. Two errors: the phantom count is **5, not 4** (B lists five and says four; "⇒ 8 real edges" should be 7). And **the 11-cluster / 52-node / 10-singleton result is not reproducible** — unioning component imports + `_shared` with `class-names` excluded gives **21 clusters, largest 38, 18 singletons**. B's 10 singletons are a strict subset of my 18; B additionally fused `completion-seal, constellation, dark-mode-toggle, handmark, pager-dots, sortable-list, typewriter, watercolor-dot`, which no `_shared` edge supports. Headline direction PROVEN, figure DISPROVEN.

**B-02 — PROVEN, S0.** `./styles.css` → `dist/component-styles.css`. Transitive resolution: **4 files, 68,933 bytes** vs `./styles` → **112 files, 327,040 bytes**. Occurrences (component-entry / full cascade): `.button` **0/29** · `.focus-ring` 0/2 · `.tap-squish` 0/3 · `.control-surface` 0/4 · `.glass-wash` 0/29 · `.glass-control-edge` 0/1 · `.metric-cell` 0/8 · `.scroll-progress-rim` 0/22 · `.instrument-chassis` 0/11 · `.header-ribbon` 0/12 · `.glass-reveal` 0/19. `scripts/gen-component-styles.mjs:35-39` MEMBERS folds exactly `track-well.css`, `value-marks.css`, `glass-ui.css`. `Button.vue` has no `<style>` block. **The advertised component-paint entry ships zero Button paint.**

**B-03 — PROVEN** (see G4). B's `labeled-field` correction is right and `labeled-field/types.ts:1-4` confirmed.

**B-04 — PROVEN.** `glass-control-edge`: 6 hits repo-wide, 4 of them the definition + comments, **2 application sites** — `Checkbox.vue:37`, `SelectTrigger.vue:47`. `field-surfaces.css:80` carries the "DRY bar cleared by construction" prose for a ≥8-consumer claim. Component-entry occurrences: 0.

**B-05 — PARTIAL.** The re-typing is real but not "verbatim": `.tap-squish` (`base.css:200-225`) transitions **5** properties + `scale`; `radio-group/styles.css:43-48` transitions **4** + `scale`, missing `color`/`opacity`. Same `--duration-fast`, `--ease-standard`, `--transition-liquid-spatial` on the scale leg, same `--scale-press`, same PRM reset: that is a re-implementation. Three 44px mechanisms **PROVEN**: `checkbox__seat` pseudo (`styles.css:23-31`), `switch` `min-inline-size/min-block-size: var(--touch-target, 2.75rem)` (`:12-13`), `radio-group` `--radio-seat` + negative margin (`:4-5,21-23`). Coverage matrix corrected above — B has `switch: focus-visible local` right, `radio-group: tap-squish NO` right, `chip: no press` right.

**B-06 — PROVEN.** `checkbox/styles.css:16-20` transitions 4 properties; `grep -rn prefers-reduced-motion src/components/checkbox/` → nothing. Only triad member without one.

**B-07 — PROVEN on vacuity, PARTIAL on shadowing.** 8 SFCs / 177 lines / 0 CSS files; bodies verified verbatim shadcn. `Table.vue:9-12` declares `role/ariaLabel/ariaColCount/ariaRowCount` and re-binds all four at `:24-27` onto the element already carrying `v-bind="attrs"` at `:21`: PROVEN.
**Shadowing is undecided as B states it, and the truth is worse:** the shipped cascade carries **both forms of the same name** — a compiled core rule `.table-cell{display:table-cell}` from `dist/styles/components.css`, and an *unprocessed* `@utility table-cell{padding-inline;padding-block}` from `dist/styles/utilities/btn.css`. A consumer who does not run Tailwind over dist gets A's reading (padding never applies, `display:table-cell` on a `<td>` is a no-op); a consumer who does gets B's. `.table-cell` resolves to two different things depending on the consumer's build. That collision alone convicts.

**B-08 — PROVEN** (= G11).

**B-09 — PROVEN.** `fieldControl.ts:41-44` returns `forwardedAttrs` = attrs minus `aria-invalid`; `Input.vue:44` spreads `{...forwardedAttrs, ...nativeProps}`. `Input.vue:27-40` re-declares 13 natives of which only `disabled`, `readonly` (read at `fieldControl.ts:20-23`) and `type` (union narrowing) do work.

**B-10 — PROVEN, with one correction.** `src/forms.ts:6-7` claims root-barrel re-exports "remain in place"; `grep 'components/input\|components/textarea' src/index.ts` → **nothing** (only `:129 ./components/tags-input`). Documented dual path that does not exist. `defineModel` already in 8 components. **Correction:** vueuse reach in `src/components` is **4** files not 3 — `dock/DockCrossfade.vue:2` (`useMediaQuery`) is a fourth; `dock` is separately off the root barrel (`grep 'components/dock' src/index.ts` → nothing), so the quarantine argument survives.

**B-11 — PROVEN** (= G10).

**B-12 — PROVEN.** All named collisions verified on disk.

**B-13 — PROVEN.** 5 API arms: `alert/index.ts:24,32`, `badge/index.ts:36,47`, `chip/chipVariants.ts:24,37`, `search/searchVariants.ts:24,32`, `typewriter/types.ts:12`. `_shared/class-names.ts:8` is a TS index-signature parameter name, correctly not counted.

**B-14 — PROVEN.** 9 files carry single-quoted imports against the tree's double-quote norm (verified per file). `rg 'class-variance-authority|cva\('` → none, while `alert/index.ts:7` is a 300-char `BASE` with `TONE`, and `badge/index.ts:5` a `BASE` with `VARIANT`. Self-barrel cycles confirmed (= G6).

**B-15 — PROVEN.** `field/field-control` = {input, textarea, tags-input, number-field}; `control-size` = {input, search, switch, textarea}; `src/forms.ts` exports {input, textarea} while its own comment names a four-member register; `selection` = {accordion, checkbox, command, dropdown-menu, radio-group, select, toggle-group}. Four incompatible partitions, measured.

**B-16 — PROVEN both ways.** `find src -name '*.md'` → **28**. `find src \( -name '*.test.*' -o -name '*.spec.*' -o -name '__tests__' \)` → **0**. `package.json files: ["dist"]`. The tests-in-`src` edict is clean; nothing to displace.

---

## 3. TERMINAL GRAPH RULING — batch SMALL

### Nodes

| node | ruling | ground |
|---|---|---|
| **paper-backdrop** | **DELETE** (+ its export subpath) | superfluity — `@utility paper-underpaint` (`paper.css:99`) is the facility; 18-line SFC adds `aria-hidden` |
| **deck** | **MOVE-TO** `src/composables/deck/` | wrong-home — 0 `.vue`; `/deck` subpath unchanged; component census → **61** |
| **expandable-container** | **MERGE-INTO-dialog** as `placement="fullscreen"` | superfluity — a fourth overlay; sole runtime `FocusScope` and sole `body.style.overflow` writer in `src` |
| **table** | **SPLIT-INTO** `{Table, TableEmpty}` + `table/styles.css` | wrong-grain — delete 6 sand SFCs; descendant selectors as every other component; delete 4 ceremony props |
| **labeled-field** | **SPLIT** — KEEP `LabeledField`, **DELETE** `Labeled{Input,Select,Slider,Switch}` | superfluity — the slot already exposes `controlId/labelledBy/describedBy/errorId/required`; −211 LOC, −4 edges |
| **alert** | **KEEP-THIN** | self-barrel cycle → `alert/variants.ts`; delete `AlertTitle`/`AlertDescription` (sand) into the register; `BASE`/`TONE` → `@utility`; drop `className`; reformat |
| **badge** | **KEEP-THIN** | identical to alert |
| **input** · **textarea** | **KEEP-THIN** | −10/−9 ceremony props; `useVModel`→`defineModel`; rejoin root barrel, delete `./forms` |
| **carousel** | **KEEP-THIN** | `interface.ts`→`types.ts`; `createInjectionState`→house `createContext`; delete `./carousel` quarantine; reformat |
| **chip** | **KEEP-THIN** | `chipVariants.ts`→`variants.ts`; **MOVE** `accent-tone.css` → `src/styles/` (cascade home is already `glass.css:64`, JS half already `composables/color/`); drop `className`; add press |
| **checkbox** | **KEEP-THIN** | add the missing PRM arm; **SEVER-VIA-`_shared/control`** |
| **switch** · **radio-group** | **KEEP-THIN** | **SEVER-VIA-`_shared/control`** — see edges |
| **number-field** | **KEEP-THIN** | delete `NumberFieldContent.vue` (sand) |
| **tags-input** | **KEEP-THIN** | delete `TagsInputItemText.vue` (sand) |
| **metric** | **KEEP-THIN** | delete `MetricStack.vue` (sand); `coalesce-metric.ts`→`coalesce.ts` |
| **dark-mode-toggle** | **KEEP-THIN** | `dark-mode-toggle.css`→`styles.css` |
| **toggle-group** | **KEEP** | correct-as-is — the triad's reference composition; `toggleGroupContext.ts`→`context.ts` |
| **infinite-scroll** | **KEEP-THIN** | 0 real consumers; foreign shadcn spinner string → house register |
| **header-ribbon**, **instrument-chassis**, **scroll-progress-rim**, **status-dot** | **KEEP-THIN** | correct-as-is; each is 0-src-consumer *and* absent from `./styles.css` — a paint defect, not a node defect |
| **button**, **label**, **tooltip**, **skeleton**, **fading-scroll**, **accordion**, **collapsible**, **separator**, **avatar**, **progress**, **animated-digit** | **KEEP** | correct-as-is |

No node in this batch is DEMOTE-TO-DEMO. Consumer count moved nothing: the three deletions are granted on **vacuity** (`table` wrappers) and **superfluity** (`paper-backdrop`, the four `Labeled*`, `expandable-container`).

### Edges (13 in-batch, all barrel)

| edge | ruling | what breaks |
|---|---|---|
| `carousel→button`, `number-field→button`, `easing→button` | **KEEP** | nothing — button is the real hub (4 src, 50 demo) |
| `tags-input→chip` | **KEEP** | nothing |
| `header-ribbon→surface` | **KEEP** | nothing |
| `configurator→label`, `configurator→fading-scroll` | **KEEP** | nothing |
| `data-table→table`, `data-table→skeleton` | **KEEP** | `DataTable.vue:14-20` drops from 7 imports to 2 when `table` collapses |
| `tabs→tooltip` | **KEEP** | nothing |
| `labeled-field→label` | **KEEP** | nothing — the id/aria wiring at `LabeledField.vue:21-29` is real |
| `labeled-field→{input,select,slider,switch}` | **SEVER** (delete the wrappers) | 14 demo stories re-author to `<LabeledField><template #default="s">`; `labeled-field` leaves the 19-node cluster |
| `checkbox/switch/radio-group/toggle-group → _shared/{primitive,selection,class-names}` | **SEVER-VIA-`_shared/control`** | new register owns press, focus, 44px floor, disabled and one PRM arm, **relaying to a `[data-control-face]` descendant** — that relay is the load-bearing part; the three local re-typings exist because the painted surface is not the host. Three thin shells keep only geometry + role. Untested claim explicitly *not* made: that a host-only `.focus-ring` suffices. |

### The cycle

**Not in this batch.** Verified at HEAD nonetheless: `dock→dropdown-menu→dock` is the graph's **sole** cycle at 30 edges as it was at 12. Both arms are deep: `dock/DockTrigger.vue:11` reaches past dropdown-menu's barrel to an SFC; `dropdown-menu/DropdownMenuContent.vue:11` reaches into `dock/composables/dockContext`. Two faults, not one edge plus one dependency. Ruling belongs to the dock batch.

### Directory shape afterwards

```
src/components/
  alert/       {Alert.vue, variants.ts, styles.css, index.ts}      # −2 SFCs, cycle broken
  badge/       {Badge.vue, variants.ts, styles.css, index.ts}      # cycle broken
  chip/        {Chip.vue, variants.ts, types.ts, index.ts}         # accent-tone.css → src/styles/
  table/       {Table.vue, TableEmpty.vue, styles.css, index.ts}   # −6 SFCs
  labeled-field/ {LabeledField.vue, types.ts, index.ts}            # −4 SFCs
  metric/      {Metric.vue, coalesce.ts, styles.css, index.ts}     # −1 SFC
  number-field/{NumberField*.vue −Content, context.ts, …}
  toggle-group/{ToggleGroup*.vue, context.ts, styles.css, index.ts}
  dark-mode-toggle/{DarkModeToggle.vue, styles.css, index.ts}
  _shared/control/{index.ts, control.css}                          # NEW: press·focus·44px·disabled·PRM
  _shared/{disclosure/{context.ts,styles.css}, field/{control.ts,control.css,surfaces.css}, feedback/tone.css, menu/rowClass.ts}
  (deleted) paper-backdrop/ expandable-container/
src/composables/deck/{useDeck.ts, useDeckKeyboard.ts, constants.ts, index.ts}
src/styles/accent-tone.css                                        # from chip/
src/styles/utilities/table.css                                     # table-cell/table-head out of btn.css, renamed off the Tailwind core name
docs/components/<name>.md × 28                                     # every README/DESIGN out of src/
```

**Module-name stripping applied:** `chipVariants→variants` · `coalesce-metric→coalesce` · `toggleGroupContext→context` · `dark-mode-toggle.css→styles.css` · `carousel/interface→types` · `disclosure-context→context` · `feedback-tone→tone` · `field-control→control` · `fieldControl→control.ts` · `field-surfaces→surfaces` · `menuRowClass→rowClass`. PascalCase sub-SFCs keep their distinct names (Vue registration).

**Test displacement: none owed.** `find src \( -name '*.test.*' -o -name '*.spec.*' -o -name '__tests__' \)` → 0. The edict is already clean; do not book a wave for it.

**Two S0s escape this batch and must be booked library-wide, not per-node:** (1) `./styles.css` ships zero paint for button and 10 other named registers — derive `gen-component-styles.mjs` MEMBERS from `src/styles/index.css`'s own `@import` members or delete the entry; (2) every count in `DAG.md §0–§2` and `EXEC-STATE.md` "Lead-verified facts" is void until `dag3.mjs` is regenerated — patch the generator, not the numbers.