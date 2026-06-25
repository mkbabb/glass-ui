# A-composables-colocation — composable consistency · state/store · colocation (BG forensic audit)

Audit scope: `src/composables/*` (9 sub-trees) + every `components/**/composables/` dir.
Verified against HEAD (4.2.0). Cross-referenced A-dock-arch (deferred — dir restructure is its
scope) + A-component-splits (>500-line component bodies). This audit owns the COMPOSABLE LAYER:
naming/shape conventions, the DI factories, state/one-registry discipline, colocation, and the
**dead-composable / fork** census.

Default-broken skepticism applied: every "the ONE engine" claim was re-checked against real import
graphs. Several did not survive.

---

## FINDINGS

### F1 — The DI factory pattern is EXEMPLARY and fully consistent (the one thing that is right)

`src/composables/context/createContext.ts` mints `createStrictContext<T>(label, outsideError)` +
`createOptionalContext<T>(label)`. Every provide/inject context in the library uses it:

- `dockContext.ts:50` (strict), `dockLayerContext.ts:38` (strict), `dockMorphContext.ts:76`
  (optional), `toggleGroupContext.ts:23` (optional), `sortable-list/context.ts:28` (strict),
  `configurator/density.ts:38` (optional), `drawer/composables/drawerSnapContext.ts:32` (optional).
- 7 factory-minted contexts; ZERO hand-rolled `InjectionKey` + manual-throw triplets survive.
- The ONLY raw `inject(KEY, null)` is goo-blob `BLOB_CONFIG_KEY` (`types.ts:494`) — a DELIBERATE,
  documented external-provide exception (the `config`-prop-wins fallthrough, not a strict/optional
  triplet). `DockLayer.vue:27` correctly composes `useDockLayerGroupContext()`.

Naming: `createContext.ts` exports `{ KEY, provide, use, useOptional }` for strict and
`{ KEY, provide, use }` for optional. Each call site re-exports `provideX`/`useX`/`useOptionalX`
named wrappers (e.g. `dockContext.ts:57-65`). Consistent everywhere.

**This pattern is the model the rest of the composable layer fails to live up to. Keep it; do not
touch it.** (One cosmetic nit: `dockMorphContext.ts:88` names the optional getter
`useOptionalDockMorphContext = ctx.use` while `createOptionalContext`'s `.use` IS the silent-null
shape — correct behaviour, but the `useOptional…` name on an OptionalContext's `.use` is a slight
naming mismatch vs the strict sites where `useOptional…` maps to `.useOptional`. Benign.)

### F2 — Naming/shape convention is consistent

- 46 `Use<Name>Return` interfaces (the reactive-STATE-shape convention) + 11 `Use<Name>Controls`
  interfaces (the imperative-HANDLE-bundle convention, DELIBERATELY suffixed per the documented
  `dom/index.ts:3-9` convention block: `UseResizeObserverControls`/`UseTokenColorControls`/
  `UseIntervalControls`/`UseTimerControls`). Zero `*Result`/`*Handle` strays. This split is
  intentional and documented — not drift.
- `use*` prefix on every reactive composable; the non-`use` exports in the shared tree are all
  legitimately pure (constants `DAMPING`/`SNAP_THRESHOLD`/`SPRING_PRESETS`/`MOTION_CURVES`,
  factories `createScrollReader`/`springPreset`/`motionCurve`, the `vReveal`/`vSpecular`
  directives, feature-detects `supportsScrollTimeline`).
- One-registry discipline is real: `defineModel` on 14 SFCs (consumer-owned selection state, no
  internal shadow) + `readonly()` projections at 24 sites (e.g. `dockLayerContext.ts:32-33` exposes
  `currentLayerId`/`leavingLayerId` as `Readonly<Ref>`, a `<DockLayer>` child write is a compile
  error). `useDockState.ts:89-98` is the canonical state shape (`ref` + derived `computed`, no
  duplicate source). No ad-hoc reactive shadows found in the dock/state cluster.

### F3 — DEAD COMPOSABLES: ~1437 lines of "the ONE engine" that was specced, built, and never wired

The headline finding. Three large composables have ZERO import statements anywhere in `src/` or
`demo/` (verified by bare-symbol grep across `.ts`/`.vue`; the only stray hits are doc/comment
references in `.md`/SFC comments):

| Composable | Lines | Status | Evidence |
|---|---|---|---|
| `dock/composables/useDockContextSilhouette.ts` | **551** | DEAD | NOT in `composables/index.ts`; zero `import`. AppSwitcher.vue:3 comment "AppSwitcher→useDockContextSilhouette as fits" — the plan note was abandoned; AppSwitcher.vue:13,33 uses `useBloomUp` instead. |
| `motion/useLiquidMorph.ts` | **462** | DEAD | NOT in any barrel (`motion/index.ts`/`core/index.ts`/root); zero `import`. Self-describes as "the GENERALIZED liquid framework" — superseded by `useBloomUp` + `useDockFission`, never deleted. |
| `glass/useVizChoreography.ts` | **424** | DEAD | NOT in `glass/index.ts`; zero occurrences outside its own file. Self-describes as "the procedural-viz family's ONE start·transition·end·restart choreography clock" (BC.W-VIZ-CHOREOGRAPHY) — never wired into a single viz. |

These are NOT half-built stubs — each is a complete, documented, ~400-550-line engine. They are the
exact no-legacy / no-dual-path violation the BG cardinal laws forbid: a successor (`useBloomUp`,
`useDockFission`) landed without the predecessor being retired, leaving a dual path where only one
arm is live. `useDockContextSilhouette` is especially damning — A-component-splits flagged it ONLY
as ">500 lines" and proposed splitting it, never noticing it is DEAD and should be deleted whole.

### F4 — The liquid/morph/goo primitive ZOO: 8+ overlapping engines, each "the ONE"

Beyond the dead trio, the LIVE motion-morph family is a thicket of composables whose headers each
claim singularity but which coexist (line counts · live consumers):

| Composable | Lines | "the ONE…" claim | Real consumers |
|---|---|---|---|
| `useLiquidFlex` | 242 | the shared amorphous flex+squish primitive | useDockOrientationMorph, tabs squish, useGooMorph, useMorphField, useLiquidPress, useDragMorph |
| `useMorphField` | 468 | "the ONE blend/morph WELD primitive every morph animation in the library consumes" | GooFilter, useDockFission, useGooMorph (imports `MORPH_SIGNATURES`) |
| `useGooMorph` | 460 | "the ONE goo-morph engine" | CarouselContent, PagerDots, deck demo |
| `useLiquidReveal` | 285 | iOS-27 bloom-from-source | useLiquidMorph (DEAD), useBloomUp |
| `useBloomUp` | 507 | shared-element FLIP source≠dest | AppSwitcher, liquid surfaces |
| `useDragMorph` | 420 | the ONE pull-gesture primitive | tabs, dock rail |
| `useDockCtaReceive` | 349 | external-CTA-morphs-into-dock | (dock CTA seam) |
| `useDockFission` | 604 | the n-ary detach orchestrator | dock |
| `useDockOrientationMorph` | 307 | V↔H driver | morph showcase, shell docks |

`useLiquidFlex` (the genuine shared atom) IS correctly composed by most. But `useMorphField`
("WELD layer, atom B") and `useGooMorph` ("barbell engine") BOTH claim totality, and `useGooMorph`
imports `MORPH_SIGNATURES` from `useMorphField` — they are a 2-layer stack masquerading as two
peers. Three more (`useLiquidReveal`/`useBloomUp`/`useDockCtaReceive`) are near-identical
`ElementMorph` + `springTimingFunction` FLIP wrappers differing only in DIRECTION (1→0 open, 0→1
receive, source≠dest bloom). This is ~3000 lines across 9 files that a first-principles read
collapses to: ONE FLIP/reveal primitive (direction is a param), ONE squish atom (`useLiquidFlex`),
ONE field-weld atom (`useMorphField`), ONE goo projection (`useGooMorph` over the weld). The dock's
own morph (`dockMorphContext` + `useDockFission` + `useDockOrientationMorph`) is a SEPARATE
box-inviolate engine (correctly fenced) — A-dock-arch owns its consolidation.

### F5 — 9× `uniformBridgeWGPU.ts` DRY: the std140→ArrayBuffer packing mechanism copy-pasted 9 times

Every WebGPU viz colocates its own `composables/uniformBridgeWGPU.ts` (aurora 232 · concentric 147
· constellation 196 · dot-flow-field 346 · dot-matrix 318 · fourier-field 240 · goo-blob 327 ·
goo-dot-matrix 151 · paper-grid 176 = **~2133 lines**). The per-viz UNIFORM STRUCT is legitimately
different, but the PACKING MECHANISM (the "field order + byte offsets are ONE declaration" layout
table → `DataView`/`Float32Array` vec4-lane offset arithmetic, the mat3-as-3×vec4 std140 padding,
the `writeColor` helper) is hand-rolled identically each time — the headers even cross-reference
("the aurora migration established this pattern; this is its twin"). ZERO shared layout-builder leaf
exists in `glass/webgpu/` (only `useGpuSubstrate`/`useWebGPUCanvas`/`webgpuDevice`). This is the
classic "deliberate copy because each is a little different" trap — the DIFFERENCE is the data
(the field list), the MECHANISM is identical and should be a `defineUniformLayout(fields)` builder.

### F6 — `useScrollProgress` is the lone scroll reader NOT folded onto the shared `createScrollReader` core

The scroll-reader family is otherwise consolidated onto ONE rAF-coalesced read core
(`motion/scrollReader.ts` `createScrollReader`): `useScrollTrigger.ts:47`, `useScrollChrome.ts:14`,
`useScrollScene.ts:36`, and `sidebar/useScrollTracker.ts:12,200` all compose it (the documented
"no fourth listener" fence). But `useScrollProgress.ts:48-85` STILL hand-rolls its own
`requestAnimationFrame` + `window.addEventListener("scroll")` + `new ResizeObserver` — the
pre-`createScrollReader` outlier (it has a native-CSS-timeline dual-path guard so it is not a
per-frame storm, but it is a second listener path the single-source discipline forbids). 12
consumers depend on it. Note CONTEXT.md defect #4 ("titles no longer scroll-and-shrink") lives in
this exact subsystem — the scroll-reader fragmentation is adjacent to a confirmed live defect.

### F7 — `useScrollPin` + `useScrollScene` are library composables UNREACHABLE by consumers (off every barrel)

`motion/useScrollPin.ts` (141) + `motion/useScrollScene.ts` (225) are NOT exported from
`motion/index.ts` or `motion/core/index.ts` or the root barrel. The only consumer is
`demo/stories/motion/scroll-choreography.vue:25` reaching in via a deep
`../../../src/composables/motion/useScrollPin` relative path. So they are real `src/` composables
that a published consumer cannot import (no subpath, no barrel line). Either they are demo-private
(then they belong under `demo/`, not `src/composables/`) or they are public (then they need a
barrel line). Currently they are neither — orphaned in the public tree.

### F8 — Partial `useResizeObserver` adoption (mild)

5 sites hand-roll `new ResizeObserver` outside the shared `dom/useResizeObserver` leaf where the
shared one would serve: `dockMorphMeasure.ts`, `tabs/useTabIndicator.ts`, `handmark/HandMark.vue`,
`useScrollProgress.ts`, `virtual/useVirtualSectionWindow.ts`. (The 3 substrate-lifecycle leaves —
`createCanvasLifecycle`, `useCanvas2D`, `useGlassRenderer` — legitimately own RO inside the canvas
resize machinery; not flagged.) 11 sites correctly use the shared leaf. Partial-adoption
inconsistency, not a correctness bug.

### F9 — The velocity-sampling axis is forked three ways (mild)

`dom/useDragVelocity.ts` (224, 1 consumer: Slider — its header claims "any pull-to-smear atom" but
only Slider binds it), `motion/usePointerVelocityField.ts` (the viz tick-push field), and the kf
`Draggable` velocity-window inside `useDragMorph`. The `useDragVelocity` header explicitly
distinguishes itself from `usePointerVelocityField` ("the wrong push-API shape") — an honest fork,
but three velocity-windowing implementations is a DRY smell with one single-consumer member.

### F10 — Colocation is otherwise CLEAN

Component-local `composables/` dirs follow the documented idiom (reactive `use*` + pure helper
modules like `atoms.ts`/`glSetup.ts`/`runtime.ts`/`uniformBridge.ts` colocated under the viz dir).
The shared tree (motion/dom/glass/reactive/sidebar/sortable/color/dark/keyboard) holds the genuinely
cross-component primitives. The `infinite-scroll` composable is correctly re-exported from the
shared barrel where it lives next to its component (`composables/index.ts:31`). `useDeck`/
`useDeckKeyboard`/`useDeckSpring` have no internal SFC consumer but are a PUBLIC headless `/deck`
subpath surface (the slides consume-back) — not dead. NO composables found that should move trees,
beyond the demo-private `useScrollPin`/`useScrollScene` question in F7.

---

## ROOT CAUSES

- **RC-1 (the build-then-orphan cadence).** The greenfield/multi-wave method shipped "the ONE
  generalized engine" composables (`useLiquidMorph`, `useVizChoreography`, `useDockContextSilhouette`)
  as ASPIRATIONAL framework abstractions, then the integration waves wired the SIMPLER concrete
  leaves (`useBloomUp`, the per-viz lifecycle, `useDockFission`) and never came back to delete the
  aspirational engine. No gate caught it because the gates assert source-presence + barrel-export
  shape, not "is this composable in the live import graph." The result is dead "the ONE…" engines
  coexisting with the live mechanism — a dual path where one arm never runs.
- **RC-2 (singularity-by-assertion, not by construction).** Each morph composable's HEADER asserts it
  is "the ONE engine," but the assertion is prose. There is no single FLIP/reveal/squish/weld
  primitive set the family was refactored ONTO; instead each wave minted a new "ONE" beside the last.
  The genuine atoms (`useLiquidFlex`, `useMorphField` weld, `createScrollReader`) prove the right
  shape exists — the family just was never collapsed onto them.
- **RC-3 (copy-because-the-data-differs).** The 9× uniformBridge duplication is the canonical mistake
  of copying a MECHANISM because the DATA it operates on differs. The std140 layout arithmetic is
  identical; only the field table changes — exactly what a builder function parameterizes.

---

## PROPOSED WAVES

### BG.W-DEAD-COMPOSABLE-CUT
**Intent:** Delete the three dead "the ONE engine" composables wholesale (no alias, no deprecation).
**Approach:** Remove `useLiquidMorph.ts` (462), `useVizChoreography.ts` (424),
`useDockContextSilhouette.ts` (551) + their type/test files + any orphaned CSS they alone drove
(`liquid-morph.css` survives — it is the static-plate CSS for the live `useBloomUp`/fission surfaces,
NOT driven by `useLiquidMorph`; verify before touching). Reconcile the AppSwitcher.vue:3 stale
plan-comment.
**Files:** `src/composables/motion/useLiquidMorph.ts`, `src/composables/glass/useVizChoreography.ts`,
`src/components/custom/dock/composables/useDockContextSilhouette.ts` (+ `__tests__`), barrels (none
export them — clean), `demo/stories/dock/examples/AppSwitcher.vue` (comment only).
**π bar:** repo-wide grep proves zero live importers pre-cut; build + typecheck green post-cut; no
SFC/demo regresses (none consumed them). Folds the no-legacy chronic.

### BG.W-MORPH-PRIMITIVE-UNIFY
**Intent:** Collapse the FLIP/reveal/receive/bloom morph wrappers onto ONE direction-parameterized
primitive over the `ElementMorph` + `springTimingFunction` substrate; keep `useLiquidFlex` (squish)
+ `useMorphField` (weld) + `useGooMorph` (goo projection over the weld) as the named atoms.
**Approach:** First-principles read: `useLiquidReveal` (open 1→0), `useDockCtaReceive` (forward 0→1),
`useBloomUp` (source≠dest 1→0 + field-color channel) are ONE FLIP with `{ direction, source, dest,
channels }` params. Mint `useElementMorph(opts)` as the single FLIP leaf; the three names become thin
direction-presets over it (or retire to call-site options). Do NOT touch the box-inviolate dock
engine (A-dock-arch owns `dockMorphContext`/`useDockFission`/`useDockOrientationMorph`).
**Files:** `src/composables/motion/{useLiquidReveal,useDockCtaReceive,useBloomUp,useElementMorph}.ts`,
`motion/index.ts`. Coordinate with A-dock-arch on the fission/orientation boundary.
**π bar:** the consolidated leaf drives every existing consumer (carousel/pager/AppSwitcher/dock CTA)
with byte-equivalent paint in both modes; net line reduction ≥40% of the wrapper trio; one FLIP
source. Folds the dual-path chronic.

### BG.W-UNIFORM-LAYOUT-BUILDER
**Intent:** Replace the 9 hand-rolled `uniformBridgeWGPU.ts` packers with ONE shared
`defineUniformLayout(fields)` builder leaf each viz feeds a per-viz field table.
**Approach:** Mint `src/composables/glass/webgpu/uniformLayout.ts` — a typed layout-table → byte-offset
+ `DataView` writer (std140 vec4-lane alignment, mat3-as-3×vec4, the shared `writeColor`). Each viz's
bridge shrinks to its STRUCT FIELD LIST + per-viz pack-call; the mechanism lives once.
**Files:** new `glass/webgpu/uniformLayout.ts`; the 9 `*/composables/uniformBridgeWGPU.ts` rewritten
to feed it; `glass/webgpu/index.ts`.
**π bar:** every viz's WGSL parity (`proof:gpu-substrate-single` ΔE bar) stays green — byte-identical
buffers; ~2133 → ~ shared-leaf + thin tables (target ≥50% reduction). DEFER heavy execution
coordination to a viz-suite sub-wave if A-splits also touches these dirs — flag the overlap.

### BG.W-SCROLL-READER-UNIFY
**Intent:** Fold `useScrollProgress` onto the shared `createScrollReader` core (the last outlier) and
resolve the `useScrollPin`/`useScrollScene` barrel-orphan question.
**Approach:** Re-express `useScrollProgress` as a thin VIEW over `createScrollReader` (keep its native
CSS-timeline dual-path guard as the primary-on-supporting-engine arm; the JS arm composes the shared
reader, not a private listener+rAF+RO). Decide `useScrollPin`/`useScrollScene`: if public, add barrel
lines + subpath; if demo-only, move under `demo/`.
**Files:** `src/composables/motion/{useScrollProgress,useScrollPin,useScrollScene}.ts`, `motion/index.ts`
or `motion/core/index.ts`, `demo/stories/motion/scroll-choreography.vue` (import path).
**π bar:** one scroll-listener source across the family; the scroll-shrink header (CONTEXT.md defect #4)
read by a `createScrollReader` consumer; `useScrollProgress`'s 12 consumers unbroken in both modes.

### BG.W-OBSERVER-VELOCITY-TIDY (low priority)
**Intent:** Route the 5 stray `new ResizeObserver` sites through `useResizeObserver` where the shared
leaf serves, and reconcile the 3-way velocity fork (fold `useDragVelocity` — 1 real consumer — into the
shared velocity surface or honestly scope it).
**Approach:** Mechanical RO substitution (skip the substrate-lifecycle leaves — legitimate). For
velocity: confirm `useDragVelocity`'s ≥2-consumer claim (currently 1: Slider); if unmet, either find
the second binary or demote/inline. No new primitive.
**Files:** `dockMorphMeasure.ts`, `tabs/useTabIndicator.ts`, `handmark/HandMark.vue`,
`virtual/useVirtualSectionWindow.ts`, `dom/useDragVelocity.ts`.
**π bar:** RO count drops to the justified-substrate set; `useDragVelocity` meets ≥2 or is retired.
Folds the J-inv-10 visual-load-bearing check for `useDragVelocity`.
