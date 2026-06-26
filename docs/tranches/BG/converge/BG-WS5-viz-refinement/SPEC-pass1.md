# BG-WS5 · Viz refinement (the substrate band) — SPEC pass 1

> Verified against HEAD `tranche/BG @823b8c53` (glass-ui 4.2.0). Every cardinal claim below was
> source-confirmed by the synthesis agent, not taken from planning self-reports.

---

## GESTALT GOAL

The viz **runtimes** are sound and warm-by-default. The "/substrates previews broken" gestalt is
**not** a shader-quality problem — it is a **substrate-plumbing** failure that the BD greenfield
specced a cure for and then shipped only half of. Five matched defects compound into the user's
"none of the procedural animations work live":

1. **The leaf sizer `sizeBacking` (BD.W-SUBSTRATE-SIZE-UNIFY G1) has ZERO consumers.** The ONE
   gBCR-ancestor-walk DPR-clamp sizer exists in the leaf but engages only when a `dprPolicy` is
   passed — and `grep dprPolicy src/components/custom = 0`. Every viz self-measures via **31
   `clientWidth || 320` closures across 14 files** (the exact convention the leaf was built to kill).
2. **The intrinsic-size zero-collapse trap.** All 8 non-aurora wrappers ship
   `contain-intrinsic-size: auto none`; aurora alone carries `auto 600px`. Under a
   `content-visibility:auto` skip the box collapses → `clientWidth` reads 0 → `||320` paints a wrong
   **320² square** (or the 300×150 HTML default) → the canvas freezes.
3. **The reveal-bloom entrance is a no-op.** The leaf writes `--substrate-reveal-t` 0→1, but
   `revealBloom` is passed by no viz, no shader/recipe reads the scalar, and a **second** dead
   entrance engine (`useVizChoreography.ts`, 424 LOC, 0 importers, unexported) overlaps it. The
   BD-specced "materialize" never fires.
4. **The KISS regression.** fourier-field + constellation were migrated to the full WebGPU
   dual-stack **against their own recorded DO-NOT-MIGRATE verdict** (PROCEDURAL-SUITE.md:75-76 still
   says Canvas2D), producing a 4-tranche doc↔code↔gate drift and ~2500 LOC of dual-language overhead
   for O(hundreds)-primitive viz far below the ~100k threshold where WebGPU compute earns its cost.
5. **The DRY duplication.** 9× per-viz `uniformBridgeWGPU.ts` (~2133 LOC) + ≥4 `*WGPUSetup.ts`, the
   fullscreen-fragment scaffold byte-structurally identical across aurora/concentric/paper-grid/
   goo-dot.

**The destination:** On `/substrates` the 11 cards show **11 visually-distinct previews** over **≤1
live context**, the hovered card **materializes** with a field-luminance bloom; every viz **sizes its
backing to `round(gBCR × dpr)` on Chrome AND Safari** at the SPA-nav window, parks offscreen, and
recovers below-fold; fourier+constellation render on **useCanvas2D** matching their own verdict; and
the WebGPU fragment scaffold lives **once**. The single perceptible substrate moment (the reveal)
carries iOS-27 liquid weight — an EFFECTS-channel luminance overshoot, canvas rect locked at
`scale(1)`, no box-zoom gutter.

This is a **gestalt transposition, not a patch**: the cure already exists in the leaf — the work is
to make the leaf the **ONE reality** (drop the optional-adopt seam that guaranteed the drift), delete
the three competing sizers + two dead reveal engines + two doc-defying dual-stacks, and factor the
fragment scaffold once. KISS + DRY + NO-LEGACY, end to end.

---

## MECHANISM (the idiomatic approach, concrete)

### M1 · The leaf is the ONE sizer — restore the forcing function (the linchpin)

The root cause is recorded in the leaf's own header: *"the arg is OPTIONAL only so a legacy consumer
that still self-measures keeps compiling during the cut-over."* That optional `?` removed the forcing
function → the cut-over never happened. **Clean break (no-legacy law):**

- `webgl/createCanvasLifecycle.ts:157` `resize: (s?: BackingSize)` → **`resize: (s: BackingSize)`**
  (drop the `?`). Mirror the drop through `useWebGLCanvas.ts`, `useWebGPUCanvas.ts`, `useCanvas2D.ts`
  wrappers. `dprPolicy` becomes **required** at the `createCanvasLifecycle` boundary (not optional) —
  a consumer that does not hand the leaf a DPR policy **cannot compile**. The `sizeAndUpload` legacy
  `else` branch (`createCanvasLifecycle.ts:287-289`) is **deleted** — there is no self-measure path.
- Every viz threads its **existing** DPR budget (`resolveBudgetDpr`, the 2×-focal / 1.5×-wash cap)
  into the `createGpuSubstrate` / `useWebGLCanvas` / `useCanvas2D` call as `dprPolicy` (`number |
  (box)=>number`, the box-aware form already fits goo-blob's policy). `resolveBudgetDpr` stays the
  shared DPR-NUMBER source (a legitimate DRY win — keep it); it moves from being **called inside each
  closure** to being **passed as the policy**.
- Every `*GLSetup` / `*WGPUSetup` / `useMetaballRenderer` **`resize(s)` shrinks to upload-only**:
  `gl.viewport(0,0,s.w,s.h)` / `uploadResolution(s.w,s.h)` / `device.queue.writeBuffer(resolution)`.
  It reads `s.w/s.h/s.dpr` and **measures nothing**. This is the load-bearing second half (RISK R2):
  threading `dprPolicy` WITHOUT rewriting `resize` to read `s` lets the closure overwrite the leaf's
  correct backing → a silent no-op (the headless-green trap). The two edits are **one wave, one viz at
  a time** but neither ships alone.
- **Kill the per-frame `clientWidth` aspect re-reads** (F8 — `concentricGLSetup.ts:125`,
  `fourierFieldWGPUSetup.ts:262-266`, `flowSetupGL.ts:95`, `flowSetupWGPU.ts:308`,
  `concentricWGPUSetup.ts:133`, `useConcentric.ts:151`): aspect is read **from `BackingSize`**
  (`s.w/s.h`), never re-measured inside `frame()`. This closes the per-frame forced-reflow + the
  `aspect = 0/320 = 0` distortion under a CV skip.
- **Delete the three rival sizers:** aurora's own 499-LOC gBCR+double-rAF closure
  (`aurora/composables/runtime.ts`), goo-blob's bespoke `resizeBacking` (`useMetaballRenderer.ts:314`),
  constellation's raw `window.devicePixelRatio` (`useConstellation.ts:222`). The leaf becomes the only
  implementation — aurora **adopts BACK** (the proven logic is already lifted INTO the leaf; aurora is
  not rewritten, its closure is deleted and it reads the leaf `BackingSize`).
- **Offscreen-park via the leaf, not per-viz.** The park-less viz (concentric / fourier / dot-flow
  carry no `useIntersectionPause`) opt into **`composeIntersectionPark: true`** (the leaf's DRY IO
  park); goo-blob + goo-dot **delete** their per-consumer `useIntersectionPause` (the one-writer-
  per-reason invariant — the leaf owns `"off-screen-io"`). One park owner.

**Bar:** `grep "clientWidth ||" src/components/custom = 0`; `grep dprPolicy ≥ 9`; per-viz backing
`== round(gBCR × dpr)` AND aspect-matches-gBCR at the SPA-nav window on **both** engines; the 3
park-less viz attach 0 frames offscreen.

### M2 · The intrinsic-size floor (the matched pair, sequenced FIRST)

The sizer measures against the laid-out box; a content-skipped box must **reserve a real block** so
`clientWidth/gBCR > 0` on first layout. Mint **ONE token** `--viz-intrinsic-block` (default the
aurora-proven **600px**, consumer-retunable) in `tokens/scale-paper.css` and re-point all 8
`auto none` wrappers onto **`contain-intrinsic-size: auto var(--viz-intrinsic-block)`**. Fold the
copy-pasted `block-size:100%; contain:content; contain-intrinsic-size` triplet into ONE shared
`.viz-canvas-host` recipe (declared once, the aurora pattern) so the per-`.vue`-scoped paste dies;
give each host a definite `min-block-size` so `block-size:100%` never resolves 0 against an
auto-height story parent. This is the floor the M1 sizer stands on — sequence it **before**
SIZER-ADOPT-HARD.

**Bar:** no `auto none` survives on a `content-visibility:auto` viz host; mount each viz **below-fold,
scroll into view on the webkit project specifically** (WebKit's weaker CV is where the trap bites),
assert backing ≠ 1px ≠ 300×150 ≠ 320² **AND aspect-matches-gBCR** + non-zero compositor pixels.

### M3 · ONE reveal mechanism — the CSS-filter field bloom (delete the other two)

Three dead reveal paths exist; the no-legacy law forces **one survivor**. The KISS/DRY/GL-fence-safe
choice is the **leaf scalar → CSS `filter` field bloom** — it touches **zero shaders** (the §7
GL-fence holds), the leaf already writes the scalar, and `filter` is a compositor property so the
**canvas rect stays `scale(1)`** (no box-zoom, the BD WAVE-AMENDMENT §2 refuted the box-zoom — a 14%
bare-cream gutter breaks the defined edge):

- Register **`@property --substrate-reveal-t`** `<number>` (already half-wired; the leaf flips 0→1 at
  cold-arm). Add a `.viz-canvas-host` (or `[data-substrate-reveal]`) recipe:
  `transition: --substrate-reveal-t var(--substrate-reveal-duration) var(--ease-cartoon-punch)` +
  `filter: brightness(calc(0.4 + 0.6 * var(--substrate-reveal-t))) saturate(calc(0.7 + 0.3 *
  var(--substrate-reveal-t)))`. Because `--ease-cartoon-punch` is a `linear()` curve that **overshoots
  to 1.22 @70%** before settling to 1.0, the registered-property transition carries `t` past 1 → the
  brightness/saturate **overshoot ≥12% then settle** = the field-luminance bloom, no shader edit.
- The **Band-0 tokens are ALREADY MINTED** (`scheme-motion.css:172 --motion-weight:0.618`,
  `:196 --ease-cartoon-punch`, the PRM carve `:358-363`) — **do NOT re-mint them** (the census
  "never minted" claim is stale). Un-stale the leaf comment (`createCanvasLifecycle.ts:530-531` still
  says "no-op today").
- Flip **`revealBloom: true`** per viz. One-shot: the leaf's `revealFired` guard fires the bloom
  once at cold-arm; an IO/CV re-reveal of an already-seen viz is a silent re-attach → **zero second
  bloom** on scroll-off-and-back. PRM → the leaf sets `--substrate-reveal-t: 1` immediately (the PRM
  arm zeroes `--ease-cartoon-punch` to `--ease-standard` and the transition to an instant fade) →
  **instant settled field, no luminance ramp**.
- **DELETE `useVizChoreography.ts`** (424 LOC, 0 production importers, unexported — J-inv-10 dead
  substrate) + its `tests-visual/viz-choreography.spec.ts`. Two reveal engines collapse to one.

**Rejected alternative (recorded):** threading a `uRevealT` uniform through 9 viz × 2 backends to
ramp luminance per-pixel in-shader — richer, but re-touches every shader against the GL-fence, is 18×
the surface, and the CSS-filter path already satisfies the bar. The field bloom is the EFFECTS-channel
sanctioned overshoot (W-MOTION-CANON P1: color/opacity/luminance is an EFFECTS leg).

**Bar:** paired chromium+webkit compositor frame-series shows entrance field-luminance **overshoot
≥12% then settle**, canvas rect **`scale(1)`**, scroll-off-and-back fires **zero** second bloom,
PRM → instant.

### M4 · De-migrate fourier + constellation to useCanvas2D (honor the recorded verdict)

The cleanest KISS win — it makes a 4-tranche-stale doc TRUE and **deletes** ~2500 LOC. **NOT a
git-revert** (RISK R5 — a naive revert restores the recorded Canvas2D defects: constellation's
low-res `arc()`, fourier's `lighter` hue-blowout). Re-author **crisp DPR-aware** useCanvas2D
renderers that preserve the high-res/premultiplied fixes as Canvas2D equivalents:

- **fourier-field** → `useCanvas2D` over `math.ts` `partialSumAt`/`positionsAt` (the GPU-agnostic DFT
  math STAYS) → `ctx.stroke` epicycle chain + comet trail, DPR-scaled `setTransform`, no `lighter`
  blend (premultiplied compositing equivalent). Delete: `fourierFieldWGPUSetup.ts` (339),
  `fourierFieldGLSetup.ts` (258), `uniformBridgeWGPU.ts` (240), `shaders/*.{compute,render}.wgsl.ts`
  (380), `fourier-field.glsl.ts` (228) = **1445 LOC / 6 files**.
- **constellation** → `useCanvas2D` over `constellationField.ts` (seed/step) +
  `constellationRender.ts` (re-authored crisp node/edge draw, DPR-aware, no low-res arc) +
  `constellationInteraction.ts` (already references the Canvas2D substrate). Delete:
  `constellationWGPUSetup.ts` (267), `constellationGLSetup.ts` (222), `uniformBridgeWGPU.ts` (196),
  `shaders/*.{lines,points}.{wgsl,glsl}.ts` (381) = **1066 LOC / 7 files**.
- **Total: 13 files / 2511 LOC** (clears the ≥9 files + ≥2000 LOC bar). useCanvas2D **composes the
  same `createCanvasLifecycle` leaf** (proof:webgl-substrate-single clause e — NOT a hand-rolled 2D
  loop) and inherits the M1 sizer + M2 floor + M3 reveal for free.
- **Co-revert the gate+doc+budget triangle in the SAME wave:** flip `gpu-parity-table.md` fourier+
  constellation rows `verified` → **`no-migrate`** with reason + booked trigger (the rows already
  carry the reason text); re-point `proof-gpu-substrate-single.mjs:177-179` (the hardcoded "MIGRATED"
  assertion); re-point `proof-constellation-substrate-single.mjs` + the ~6-8 fourier/constellation
  gates; **re-pin DOWN** `profile-bundle.mjs` ceilings (`dist/constellation.js` gzip 13_500 →
  achieved Canvas2D, `dist/fourier-field.js` likewise) — a SHRINK is a WIN, re-pinned in the same
  wave or it RED-floors. Keep both **off the root barrel** (no value.js / GL leaf on
  `dist/glass-ui.js`). Reconcile `PROCEDURAL-SUITE.md` (already says Canvas2D — only the gpu-parity
  drift closes). **Turn the verdict into a GATE** (`proof:proc-suite-substrate` asserts each
  non-migrating viz dir carries no `.wgsl` + no `createGpuSubstrate`) so prose can't be silently
  overridden a fourth time.

### M5 · Per-STORY previews + the one shared live hover-stage (the gallery model)

The dispatch is **category-keyed** (`SectionLanding.vue:49` `categorySpecimen(category.id)` →
substrates `previewKind:"field"` → all 11 cards paint the same `auroraFallbackGround` data-URI). The
landing already mounts **0 live contexts** (the ≤1 bar is met) — the only defect is **sameness**.
Re-key the `#preview` dispatch **per-STORY** (`story.id`), not per-category, and give each card its
**own distinct still**:

- A per-viz device-free still registry `vizPreviewStill(storyId)`. The `field` viz reuse
  `auroraFallbackGround`. The other viz need a distinct still — and **only aurora ships a CPU raster
  today** (RISK R1, the hardest wall). The shippable, ≤1-context path: the landing mounts **ONE
  shared live capture context** that, idle/on-first-paint, renders each viz's single frame
  sequentially → captures a poster (`toBlob`/`toDataURL` **within the render frame**, or a
  `mode:"capture"` context with `preserveDrawingBuffer:true`) → caches the data-URI → **disposes**.
  Each card paints its cached poster (per-card pixel-hash differs by construction — distinct seed/
  preset frames). The **hovered/lead** card promotes the ONE shared live context onto its stage.
- **Avoid** `OffscreenCanvas` + `transferToImageBitmap` to many canvases (Safari **and** Firefox
  readback-jank — Mozilla bug 1788206, Flutter removed it for WebKit/Gecko — violates the Chrome-AND-
  Safari law). Avoid the `usePresetThumbnails` failure mode (the "device not acquired" throw that left
  13 eternal skeletons) — the capture context must be **sequenced after device-acquire**, one at a
  time, disposed between.
- Canvas pixels are read via the **COMPOSITOR** (`locator.screenshot`), never `getImageData` (all-zero
  by the `preserveDrawingBuffer:false` contract). The preview host stays `aria-hidden`/`inert`
  (decorative — never a focus target). PRM → stills only, no live arm.
- **Budget-account** against WS1's shell aurora: the route's ONE live context **is** the shell aurora;
  the bento's shared hover-stage **counts against it**, and substrate routes opt OUT of the shell
  field (`data-route-owns-gl`) to free the cap. ≤1 live GL/WGPU at any instant.

**Bar:** 11 cards → 11 distinct pixel-hashes, ≤1 live context counted on the landing, hovered card
animates, both modes.

### M6 · Factor the WebGPU fragment scaffold ONCE — honestly (sequenced LAST)

After M4 shrinks the dual-stack set, the remaining fragment-field viz (aurora-smooth-core /
concentric / paper-grid / goo-dot-field) share an **identical** scaffold: full-screen-triangle
`vs_main` + `configure(device,format,alphaMode)` + `createRenderPipeline{fs_main}` + `createBindGroup`
+ `createBuffer(uniform)` + `beginRenderPass` + `draw(3)`. **The honest factor (RISK R6 — NOT "9→1
file"):**

- ONE `defineUniformLayout(descriptor)` leaf (the std140/WGSL byte-offset arithmetic + the
  `ArrayBuffer`/`DataView` boilerplate + the `composables/color` oklchToLinear seam ONCE) — the
  per-viz `Uniforms` STRUCT + `pack()` stay per-viz (the structs genuinely differ; a `pack()` over a
  layout descriptor is a ~20-line decl).
- ONE `createFragmentFieldPass({fragmentWGSL, layout, packUniforms})` leaf for the ~4 fullscreen-
  fragment viz (+ its WebGL2 twin). The **instanced** (dot-matrix) and **compute** (dot-flow) shapes
  are NOT factorable to the fragment leaf — keep them as their own leaves; the spec does **not**
  promise their collapse.
- Each kept dual-stack still passes the ΔE parity bar (mean ≤ 2.0 / p99 ≤ 5.0). **Record the per-viz
  dual-stack decision honestly:** the BE.W-VIZ-PARITY-METAL real-Metal cross-backend capture was
  deferred-forever and never produced; for a fragment-only backdrop where the WGSL primary renders
  identically to WebGL2, **WebGL2-only is a defensible clean-break simplification** — surface that
  question per fragment viz (audit-and-decide), but it is OUT OF SCOPE for this pass and BOOKED.
  WebGPU-first is KEPT only where a compute pass earns it (dot-flow-field).

### M7 · The carves + the dot-flow rebuild (colocation + the one genuine rebuild)

- **BG.W-GOODOT-SETUP-SPLIT** — move `buildWGPUSetup` + `buildGLSetup`
  (`useGooDotMatrix.ts:257-459`) into the **already-existing** colocated `gooDotSetup.ts` →
  `useGooDotMatrix.ts` drops under the 500-line bound. Carve the **adopted** (M1) shape — sequence
  after SIZER-ADOPT-HARD so it does not re-touch the file twice (DEFT).
- **BG.W-BLOB-KINEMATICS-LEAF** — carve `useBlobSatellites.ts` (533) orbit/eccentricity/wobble
  kinematics into a colocated `satelliteKinematics.ts` leaf (a stateless math leaf, no `SpringProgress`
  fork). WS4-encapsulation file-carve only — it does NOT own sizer adoption (M1 owns it suite-wide).
- **BG.W-DOTFLOW-REBUILD** — collapse the 8-file/~2700-LOC dot-flow surface (the two-FBO RGBA16F
  GPGPU `flowSetupGL` → `flowSetupGLFlow` split + the compute WGPU + the dead
  `useFlowParticles.ts` re-export shim whose body is one `export {...}` line + a stray
  `clientWidth||320`). Rebuild = **one** coherent advection model: one GL setup + one WGPU compute
  setup + `flowField.ts` math, routed through `sizeBacking`. The **compute pass STAYS WebGPU** (the
  one viz that earns it). Fidelity: "faint at rest (10% structure)" → subtle larger sweeping waves +
  stronger rest contrast, on the liquid-weight spring register.

---

## FILES TOUCHED (by wave)

**M2 · INTRINSIC-SIZE:** `tokens/scale-paper.css` (mint `--viz-intrinsic-block`), a shared
`.viz-canvas-host` recipe home, the 8 wrapper `<style scoped>` blocks (`Concentric.vue:131`,
`Constellation.vue:83`, `DotFlowField.vue:103`, `DotMatrix.vue:103`, `FourierField.vue:249`,
`GooDotMatrix.vue:117`, `GooBlob.vue:300`, `PaperGrid.vue:127`).

**M1 · SIZER-ADOPT-HARD:** `webgl/createCanvasLifecycle.ts` (drop `?`, delete legacy else, require
`dprPolicy`), `useWebGLCanvas.ts`, `useWebGPUCanvas.ts`, `useCanvas2D.ts`; every viz `use*.ts` +
`*GLSetup.ts` + `*WGPUSetup.ts` (thread `dprPolicy`, shrink `resize(s)` to upload-only, kill F8 reads
— 14 files / 31 sites); delete aurora `runtime.ts` gBCR closure, goo-blob `resizeBacking`,
constellation raw `devicePixelRatio`; `composeIntersectionPark:true` on concentric/fourier/dot-flow,
delete goo-blob/goo-dot `useIntersectionPause`.

**M3 · REVEAL-BLOOM:** `tokens/property-regs.css` (`@property --substrate-reveal-t` if not registered),
the `.viz-canvas-host` recipe (`transition` + `filter` legs), `createCanvasLifecycle.ts` (un-stale the
comment), per-viz `revealBloom:true`; **delete** `useVizChoreography.ts` +
`tests-visual/viz-choreography.spec.ts` + `proof-viz-choreography.mjs`.

**M4 · DEMIGRATE:** delete the 13 fourier+constellation dual-stack files; re-author
`useFourierField.ts` + `useConstellation.ts` + `constellationRender.ts` on useCanvas2D; flip
`gpu-parity-table.md` rows; re-point `proof-gpu-substrate-single.mjs`,
`proof-constellation-substrate-single.mjs`, `proof-fourier-field.mjs`, `proof-viz-fourier`,
`proof-viz-constellation`, `proof-constellation-{spine,tokens,gen}.mjs`; re-pin `profile-bundle.mjs`;
reconcile `PROCEDURAL-SUITE.md`; mint `proof-proc-suite-substrate.mjs`.

**M5 · PREVIEW-LIVE:** `SectionLanding.vue` (per-story dispatch), a `vizPreviewStill(storyId)`
registry + the shared capture/hover-stage host, `SectionPreviewCard.vue` (#preview seam — already a
slot), `category-hero.ts`/`category-specimen` (per-story key).

**M6 · SUBSTRATE-FACTOR:** new `src/composables/glass/webgpu/createFragmentFieldPass.ts` +
`defineUniformLayout.ts`; re-point aurora/concentric/paper-grid/goo-dot WGPU+GL setups; collapse
their `uniformBridgeWGPU.ts`.

**M7 · CARVES/REBUILD:** `goo-dot-matrix/composables/{useGooDotMatrix,gooDotSetup}.ts`;
`goo-blob/composables/{useBlobSatellites,satelliteKinematics}.ts`; the dot-flow-field `composables/`
collapse + shim delete.

---

## BG.W-* WAVE BREAKDOWN (sequenced)

| # | Wave | Scope | Depends on |
|---|------|-------|-----------|
| 1 | **BG.W-VIZ-INTRINSIC-SIZE** | M2 — the `--viz-intrinsic-block` token + 8 wrappers + `.viz-canvas-host` fold | — (the floor) |
| 2 | **BG.W-VIZ-SIZER-ADOPT-HARD** | M1 — drop the optional `?` (forcing function), thread `dprPolicy` ≥9, upload-only `resize(s)`, kill 31 closures + F8, delete 3 rival sizers, leaf-park the 3 park-less | 1 |
| 3 | **BG.W-VIZ-DEMIGRATE** | M4 — delete 13 files / 2511 LOC, re-home onto useCanvas2D, gate+doc+budget co-revert, verdict→gate | 2 (inherits leaf sizer) |
| 4 | **BG.W-VIZ-REVEAL-BLOOM** | M3 — CSS-filter field bloom on the leaf scalar, `revealBloom:true`, delete useVizChoreography | 2 |
| 5 | **BG.W-VIZ-PREVIEW-LIVE** | M5 — per-story dispatch + per-viz still + one shared hover-stage | 1,2 (cross-cut WS1/WS4) |
| 6 | **BG.W-DOTFLOW-REBUILD** | M7 — collapse the 8-file surface, one advection model, fix faint-at-rest, delete shim | 2 |
| 7 | **BG.W-VIZ-SUBSTRATE-FACTOR** | M6 — `createFragmentFieldPass` + `defineUniformLayout`, honest per-viz decision | 3 (set shrunk first) |
| 8 | **BG.W-GOODOT-SETUP-SPLIT** | M7 — carve into existing `gooDotSetup.ts`, under 500 | 2 |
| 9 | **BG.W-BLOB-KINEMATICS-LEAF** | M7 — carve `satelliteKinematics.ts` | 2 |

Waves 8/9 fold into the SIZER-ADOPT pass where they touch the same files (DEFT — carve the adopted
shape, don't re-touch). Wave 4 (reveal) and 6 (dotflow) can run parallel to 3/5 once 2 lands.

---

## ACCEPTANCE / REAL-PAINT-π BAR

**The bar is a PAIRED chromium-headless-new + webkit real-paint frame-series — NOT a device-free
gate.** The headless-green/visually-broken trap shipped 3× (BB invented "rides W-REFLECT3";
BD/BE/BF re-committed it); the close oracle `proof:ba-gestalt` reads a stale BC roster blind to the
viz surfaces. **Add the `/substrates` landing + each viz route to the live gestalt roster.** Verify
at the **SPA-nav window** (route-nav, not hard-load — the regression only reproduces on nav). All
pixel reads are **compositor `locator.screenshot`** (live `getImageData`/`readPixels` is all-zero by
the `preserveDrawingBuffer:false` contract).

Per wave:

- **INTRINSIC-SIZE** — `grep "auto none"` on CV-auto viz hosts = 0; mount each viz **below-fold +
  scroll-into-view on the webkit project**, assert backing ≠ 1px ≠ 300×150 ≠ 320² **AND
  aspect-matches-gBCR** + non-zero compositor pixels.
- **SIZER-ADOPT-HARD** — `grep "clientWidth ||" custom = 0`; `grep dprPolicy ≥ 9`; per-viz backing
  `== round(gBCR × dpr)` at the SPA-nav window on **Chrome AND Safari** (assert the resize ignores
  every measurement of its own — not just "no `clientWidth||`"); the 3 park-less viz attach **0
  frames offscreen** (rAF→0). A non-compiling consumer (the dropped `?`) is the structural witness.
- **DEMIGRATE** — both render on useCanvas2D (no `createGpuSubstrate`, no `.wgsl` in either dir);
  ≥2000 LOC + ≥9 files deleted; README ⟷ code ⟷ gpu-parity-table agree; the re-authored Canvas2D
  does **not** restore the recorded defect (constellation crisp DPR arc, fourier no `lighter`
  blowout); bundle ceilings re-pinned DOWN.
- **REVEAL-BLOOM** — paired chromium+webkit frame-series: entrance field-luminance **overshoot ≥12%
  then settle**, canvas rect **`scale(1)`** (no box animation in any frame), scroll-off-and-back fires
  **zero** second bloom (revealFired guard), **PRM → instant** settled, zero luminance ramp.
  `useVizChoreography.ts` DEFINITION-ABSENT.
- **PREVIEW-LIVE** — **11 cards → 11 distinct per-card pixel-hashes**, ≤1 live GL/WGPU context counted
  on the landing (count `getContext('webgl2')` + `requestAdapter`), hovered card animates, both modes,
  PRM → stills only.
- **SUBSTRATE-FACTOR** — ≤1 shared WGPU-fragment-setup leaf; kept parity captures still pass
  (ΔE mean ≤ 2.0 / p99 ≤ 5.0); net LOC reduction; **zero visual change**.
- **DOTFLOW-REBUILD** — non-zero painted pixels at rest, streamline clusters read, stronger rest
  contrast, hovered animates; one GL + one WGPU compute setup; the `useFlowParticles` shim absent.
- **CARVES** — `useGooDotMatrix.ts` < 500; `useBlobSatellites.ts` < 500; `proof:colocation` green.

---

## FOLDED DEFERRED ITEMS

- BD.W-SUBSTRATE-SIZE-UNIFY adoption half (unbuilt) → **SIZER-ADOPT-HARD**.
- BD.W-SUBSTRATE-REVEAL-BLOOM (no-op) → **REVEAL-BLOOM** (token-mint already done — shader/recipe-read
  only; scope SHRANK to the CSS-filter recipe + delete-the-orphan).
- fourier/constellation un-honored no-migrate verdict (WS5-13 / D code-drift) → **DEMIGRATE**.
- category-landing 11-GL frozen-still (P-chronic Class4) → **PREVIEW-LIVE**.
- dot-flow "faint at rest 10%" (Class4) → **DOTFLOW-REBUILD**.
- 3 stale viz gates (`proof-viz-dotflow` over-broad grep, `proof-concentric` ringField→levelField
  rename, `proof-handmark` CLAUDE.md-in-flux dep) → a gate-fix rider on the touching wave, **or hand
  to WS7 DEAD-GATE-SWEEP**.
- usePointerVelocityField (WS5-11) — ADDRESSED at HEAD (no action).
- metallic-aurora (WS5-04) — DEFERRED to BD.W-AUR-METAL-FINISH (trigger un-MET; keep by-name).

**RETIRE-with-rationale (no silent drop):**

- **goo-blob → "blob" rename (WS5-02)** — **RETIRED, kept as `goo-blob`.** The rename is cosmetic;
  `/goo-blob` is a published subpath with the goo-blob/goo-dot-matrix naming symmetry, and a rename is
  a breaking subpath + every-consumer-import change for zero functional gain. Re-book to a dedicated
  clean-break rename tranche only if the user reaffirms. Recorded, not dropped.

---

## OPEN RISKS (must be build-proven before the wave-set is trusted)

- **R1 (PREVIEW-LIVE, hardest)** — only aurora has a device-free CPU still; the other 10 need either a
  cheap CPU raster (costly for metaball-SDF / phyllotaxis / curl-noise) OR a transient capture context
  (which THREW "device not acquired" in `usePresetThumbnails`). The spec's "per-viz still" is
  unfalsified until ONE non-aurora still is build-proven. → **Prototype 2.**
- **R2 (SIZER-ADOPT, two-part edit)** — threading `dprPolicy` WITHOUT rewriting `resize(s)` upload-only
  is a silent no-op; ~25 sites each with a different DPR cap; goo-blob's bespoke path is its own line
  item; the off-by-one (`clientHeight` truncates, `sizeBacking` rounds) is a **cross-engine** axis
  (Safari rounds/clamps differently). → **Prototype 1.**
- **R3 (INTRINSIC-SIZE bar weakness)** — `≠300×150≠1px` is too weak (the `||320` closures pass it via a
  wrong 320² square); the bar MUST be `== round(gBCR×dpr)` AND aspect-matches-gBCR. → folded into
  Prototype 1.
- **R4 (REVEAL-BLOOM, 3 dead paths)** — picking the CSS-filter path requires deleting useVizChoreography
  (kf clock) AND proving the `--ease-cartoon-punch` registered-property transition actually overshoots
  brightness ≥12% on **both** engines (registered-property transition support + `linear()` easing on
  a custom property — verify WebKit interpolates the `@property <number>` through the overshoot). →
  **Prototype 3.**
- **R5 (DEMIGRATE, gate cascade + defect-restore)** — a naive revert restores known-defective
  renderers; ~6-8 gates + 2 parity rows + 2 contradicting docs must co-move. → **Prototype 4.**
- **R6 (SUBSTRATE-FACTOR over-promise)** — "9→1 file" is false; the per-viz structs can't merge; only
  the offset-arithmetic + the ~4 fragment pipelines factor. → **Prototype 5 (spec).**
- **R7 (cross-engine, partially unverified)** — only Chromium was testable in research; the Safari
  gBCR×dpr rounding + WebKit's weaker CV + `/substrates/constellation`'s ~10-canvas context budget are
  genuine second axes. Every viz π carries a **webkit arm**.
