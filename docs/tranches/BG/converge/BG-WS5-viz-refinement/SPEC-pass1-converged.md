# BG-WS5 · Viz refinement (the substrate band) — SPEC pass 1 CONVERGED

> Verified against HEAD `tranche/BG @823b8c53` (glass-ui 4.2.0). Synthesis-confirmed at converge:
> 31 `clientWidth||` closures + 0 `dprPolicy` + 8 `auto none` wrappers + `resize: (s?: BackingSize)`
> optional-`?` (createCanvasLifecycle.ts:157) + 9 `uniformBridgeWGPU.ts` + 4 `*WGPUSetup.ts`
> (concentric/constellation/fourier-field/paper-grid) + `useVizChoreography.ts` ZERO importers +
> `proof:viz-choreography` registered (package.json:1009, gates.mjs:1839) + `--ease-cartoon-punch`
> a real `linear()` overshoot token with a PRM carve (scheme-motion.css:196/361). Every prototype's
> validated mechanism is folded; every critique mustFix is resolved or booked below.
>
> **Convergence state:** 6 of 7 substantive waves carry a build-true validated mechanism + a hardened
> real-paint-π bar. **BG.W-VIZ-SUBSTRATE-FACTOR (M6) is the unconverged frontier** (prototype build=false,
> the factor-vs-DELETE KISS question unresolved) → pass-2. The paired chromium+webkit real-paint π is
> SPECIFIED as the binding acceptance bar for every wave but was UNEXECUTED in pass-1 (all prototypes
> are build/compile-verified only) — that execution is the build-time gate, not a spec-convergence gap,
> but it is the trap that shipped 3× so it is named load-bearing per wave.

---

## BINDING CARDINAL LAWS (every wave below)

liquid-weight/inertia/bounce on ALL motion+transitions+scrolling · gestalt-not-patch (architectural
transposition for elegance/simplicity/perf) · NO legacy (clean breaks, no aliases/shims/dual-paths) ·
KISS + DRY + DEFT (a union, never a bolt-on/fork) · colocate composables with components · break
>500-line files into colocated sub-dirs without contrivance · presets-in-consumers · warm/weighty
iOS-27 identity (12 laws of animation, cartoon-technicolor punch, aristotelian √φ, perfected
glass+paper morphism) · **Chrome AND Safari** · **real-paint-verify is THE bar** (the
headless-green/visually-broken trap shipped 3×) · foreign-tree fence ABSOLUTE (edit ONLY glass-ui).

---

## GESTALT GOAL

The viz **runtimes** are sound and warm-by-default. "/substrates previews broken" is **not** a
shader-quality problem — it is a **substrate-plumbing** failure the BD greenfield specced a cure for
and shipped only half of. Five matched defects compound into "none of the procedural animations work
live":

1. **The leaf sizer `sizeBacking` (BD.W-SUBSTRATE-SIZE-UNIFY G1) has ZERO consumers** — it engages
   only when a `dprPolicy` is passed, and `grep dprPolicy src/components/custom = 0`. Every viz
   self-measures via **31 `clientWidth || 320` closures across 14 files** (the exact convention the
   leaf was built to kill).
2. **The intrinsic-size zero-collapse trap** — all 8 non-aurora wrappers ship
   `contain-intrinsic-size: auto none`; aurora alone carries `auto 600px`. Under `content-visibility:auto`
   skip the box collapses → `clientWidth` reads 0 → `||320` paints a wrong **320² square** (or the
   300×150 HTML default) → the canvas freezes.
3. **The reveal-bloom entrance is a no-op** — the leaf writes `--substrate-reveal-t` 0→1, but no viz
   reads it, and a **second** dead entrance engine (`useVizChoreography.ts`, 424 LOC, 0 importers)
   overlaps it. The BD-specced "materialize" never fires.
4. **The KISS regression** — fourier-field + constellation were migrated to the full WebGPU dual-stack
   **against their own recorded DO-NOT-MIGRATE verdict** (PROCEDURAL-SUITE.md:75-76 still says
   Canvas2D), a 4-tranche doc↔code↔gate drift + ~2500 LOC of dual-language overhead for
   O(hundreds)-primitive viz far below the ~100k WebGPU-compute threshold.
5. **The DRY duplication** — 9× per-viz `uniformBridgeWGPU.ts` (~2133 LOC) + 4 `*WGPUSetup.ts`, the
   fullscreen-fragment scaffold byte-structurally identical across the fragment viz.

**The destination:** On `/substrates` the 11 cards show **11 visually-distinct previews** over **≤1
live context**, the hovered card **materializes** with a field-luminance bloom; every viz **sizes its
backing to `round(gBCR × dpr)` on Chrome AND Safari** at the SPA-nav window, parks offscreen, and
recovers below-fold; fourier+constellation render on **useCanvas2D** matching their own verdict; and
the WebGPU fragment scaffold lives **once** (or is DELETED where it earns nothing — the factor-vs-delete
decision is M6's first step). A **gestalt transposition, not a patch**: make the leaf the ONE reality
(drop the optional-adopt seam that guaranteed the drift), delete the rival sizers + two dead reveal
engines + two doc-defying dual-stacks, and factor/delete the fragment scaffold once.

---

## MECHANISM (validated per prototype, hardened per critique)

### M1 · The leaf is the ONE sizer — restore the forcing function (the linchpin)
**Wave: BG.W-VIZ-SIZER-ADOPT-HARD · prototype build=true, est 80%, critique 58% [refine]**

The root cause is in the leaf's own header: *"the arg is OPTIONAL only so a legacy consumer that still
self-measures keeps compiling during the cut-over."* That optional `?` removed the forcing function →
the cut-over never happened. **Clean break (no-legacy law):**

- `createCanvasLifecycle.ts:157` `resize: (s?: BackingSize)` → **`resize: (s: BackingSize)`** (drop the
  `?`). Mirror through `useWebGLCanvas.ts`, `useWebGPUCanvas.ts`, `useCanvas2D.ts`. `dprPolicy` becomes
  **required** at the `createCanvasLifecycle` boundary. The legacy self-measure `else` branch
  (createCanvasLifecycle.ts:286-289) is **deleted** — there is no self-measure path. The prototype
  CONFIRMED: making `dprPolicy` required reds precisely the 10 non-adopters (9 `createGpuSubstrate`
  callers + useCanvas2D), captured born-RED → GREEN after adoption. vue-tsc 0 errors, vite build clean.
- Every viz threads its **existing** DPR budget (`resolveBudgetDpr`, the 2×-focal / 1.5×-wash cap) into
  the `createGpuSubstrate` / `useWebGLCanvas` / `useCanvas2D` call as `dprPolicy` (`number | (box)=>number`).
  `resolveBudgetDpr` stays the shared DPR-NUMBER source (a DRY keep) — it moves from being **called inside
  each closure** to being **passed as the policy**.
- Every `*GLSetup` / `*WGPUSetup` / `useMetaballRenderer` **`resize(s)` shrinks to upload-only**:
  `gl.viewport(0,0,s.w,s.h)` / `uploadResolution(s.w,s.h)` / `device.queue.writeBuffer(resolution)`.
  It reads `s.w/s.h/s.dpr` and **measures nothing**.
- **Widen the 2D contract (DEMIGRATE precondition).** `Canvas2DFrame.render(ctx, now)` →
  **`render(ctx, now, s: BackingSize)`**; thread `dprPolicy` into the `useCanvas2D` call. This is a
  **compile-only edit at this wave** — useCanvas2D has 0 LIVE render call sites at HEAD (confirmed), so
  it is *validated by paint only when DEMIGRATE exercises it*. Mark it compile-only; do NOT claim it
  paint-proven here (proto1 mustFix #6 / proto4 mustFix #1).

**FOLDED MUSTFIX (proto1):**
- **#2 — the forcing-function gap (TS bivariance).** Dropping the `?` only compile-forces the trivial
  PASS; TS method-bivariance lets a `resize` that **ignores `s`** still compile (the prototype's own KEY
  SURPRISE), so `grep dprPolicy≥9` greens while siblings stay broken. **Mint `proof:viz-resize-upload-only`**
  (source gate, `local`+`ci`): each adopted viz's `resize`/`frame` body carries **no**
  `clientWidth`/`clientHeight`/`getBoundingClientRect`/`devicePixelRatio`/`innerWidth` token (the spec's
  "assert the resize ignores every measurement of its own" bar) + a self-test bite planting a synthetic
  self-measure. The structural compile-forbid is NOT achievable in TS — the source gate + the cross-engine
  paint π are the two-legged enforcement (recorded honestly as a residual).
- **#3 — the double-realloc regression is NOT a no-op.** A leaf `sizeBacking` (clears buffer) then a
  sibling self-measure (re-clears + WINS, staying wrong under CV-skip) runs every RO/wake tick.
  **Therefore SIZER-ADOPT-HARD rewrites EVERY adopted viz's `resize` upload-only ATOMICALLY in this one
  wave — no pass-but-self-measure limbo, no compile-adopted-but-self-measuring sibling.** The
  "compile-adoption is safe interim" LEARNING is CORRECTED: there is no safe interim; the two edits
  (thread `dprPolicy` + rewrite `resize`) ship together per viz, all viz in one wave.
- **#4 — the probePipeline `frameHooks?.resize()` removal.** This is a behavior change on the
  BC.W-SAFARI-WEBGL validation-probe path now depending on `presize()` ordering. **Real WebKit/Metal
  verification is mandatory** (by-inspection insufficient): confirm draw-time-invalid pipelines still
  surface in `popErrorScope` after the removal (the Safari flash path the breaker guards). Carried on the
  wave's webkit π arm.
- **F8 per-frame `clientWidth` aspect re-reads** (`concentricGLSetup.ts:125`, `fourierFieldWGPUSetup.ts:262-266`,
  `flowSetupGL.ts:95`, `flowSetupWGPU.ts:308`, `concentricWGPUSetup.ts:133`, `useConcentric.ts:151`):
  aspect reads **from `BackingSize`** (`s.w/s.h`), never re-measured inside `frame()`. Closes the
  per-frame forced-reflow + the `aspect = 0/320 = 0` distortion under CV-skip.
- **Delete the three rival sizers:** aurora's 499-LOC gBCR+double-rAF closure
  (`aurora/composables/runtime.ts`), goo-blob's bespoke `resizeBacking` (`useMetaballRenderer.ts:314`),
  constellation's raw `window.devicePixelRatio` (`useConstellation.ts:222`). Aurora **adopts BACK** (its
  proven logic is already INSIDE the leaf — its closure is deleted, it reads the leaf `BackingSize`).
- **Offscreen-park via the leaf.** The 3 park-less viz (concentric/fourier/dot-flow) opt into
  **`composeIntersectionPark: true`** (the leaf's DRY IO park, reason `"off-screen-io"`); goo-blob + goo-dot
  **delete** their per-consumer `useIntersectionPause` (one-writer-per-reason). One park owner.

**REAL-PAINT-π BAR (proto1 mustFix #1 — MANDATORY, ABSENT in pass-1):** paired
**chromium-headless-new + webkit** frame-series on concentric (and ≥1 representative per backend) at the
**SPA-nav window** (route-nav, not hard-load), via compositor `locator.screenshot`: per-viz backing
**`== round(gBCR × dpr)` AND aspect-matches-gBCR on BOTH engines**. The Safari gBCR×dpr rounding/clamp is
a genuine second axis (R7). Install the webkit binary / rebuild dist as needed — it is **not optional**.
Device-free bars: `grep "clientWidth ||" custom = 0`; `grep dprPolicy ≥ 9`; the 3 park-less viz attach
**0 frames offscreen**; a non-compiling self-measuring consumer (the dropped `?`) is the structural witness.

### M2 · The intrinsic-size floor (the matched pair, sequenced FIRST)
**Wave: BG.W-VIZ-INTRINSIC-SIZE · the floor M1 stands on**

The sizer measures the laid-out box; a content-skipped box must **reserve a real block** so
`clientWidth/gBCR > 0` on first layout.

- Mint **ONE token `--viz-intrinsic-block`** (default the aurora-proven **600px**, consumer-retunable) in
  `tokens/scale-paper.css`. Re-point **all 8** `auto none` wrappers (Concentric/Constellation/DotFlowField/
  DotMatrix/FourierField/GooDotMatrix/GooBlob/PaperGrid `<style scoped>`) onto
  **`contain-intrinsic-size: auto var(--viz-intrinsic-block)`**.
- Fold the copy-pasted `block-size:100%; contain:content; contain-intrinsic-size` triplet into ONE shared
  **`.viz-canvas-host`** recipe (declared once, the aurora pattern) so the per-`.vue`-scoped paste dies.
- **FOLDED MUSTFIX (proto1 #5) — build the FLOOR, not just the token.** Give each host a load-bearing
  **`min-block-size`** so `block-size:100%` never resolves 0 against an auto-height story parent.
  **Validate `--viz-intrinsic-block` PER HOST CLASS, not one global 600px** — a small framed viz over-reserves
  → first-paint CLS. Full-bleed substrate hosts default 600px; framed/small hosts (gallery cards, the
  preview stage) carry a tighter per-host override. Re-point **all 8** wrappers (not Concentric alone).

**REAL-PAINT-π BAR:** `grep "auto none"` on CV-auto viz hosts = 0; mount each viz **below-fold + scroll
into view on the webkit project specifically** (WebKit's weaker CV is where the trap bites); assert
backing **≠ 1px ≠ 300×150 ≠ 320² AND aspect-matches-gBCR** + non-zero compositor pixels + no first-paint
CLS shift from over-reserve.

### M3 · ONE reveal mechanism — the keyframe-on-filter field bloom (mechanism CHANGED per prototype)
**Wave: BG.W-VIZ-REVEAL-BLOOM · prototype build=true, est 84%, critique 74% [refine]**

**The pass-1 spec mechanism (registered `--substrate-reveal-t` + `transition` on the scalar that `filter`
reads) is REPLACED.** Prototype 3 found the registered-property→`filter` transition does not reliably
repaint cross-engine; the validated, idiomatic, KISS, Safari-safe path is a **one-shot `[data-substrate-reveal]`
attribute + `@keyframes` animating `filter` directly**:

- **`@keyframes substrate-reveal-bloom`** animates `filter: brightness()/saturate()` from a dim floor
  (~`brightness(0.4) saturate(0.7)`) to settle (`brightness(1) saturate(1)`), with
  **`animation-timing-function: var(--ease-cartoon-punch)`** — the band's existing `linear()` overshoot
  curve carries `filter: brightness()` **past 1.0** and the compositor PAINTS the overshoot on BOTH
  engines (prototype measured **+13.3% chromium / +12.5% webkit**, dim-floor ~38%, `scale(1)` locked every
  frame). This is the UNIQUE path to the overshoot bar: **opacity clamps at 1.0; only `filter: brightness`
  can overshoot past 1.0** (proto3 mustFix #6 — record the choice honestly, do NOT enshrine the
  "registered-prop is provably dead" falsification as gospel; it had an artifact-shaped getComputedStyle
  signature).
- **FOLDED MUSTFIX (proto3 #1) — the goo-blob filter collision.** The reveal keyframe must target the
  **CANVAS element**, not `.viz-canvas-host`. `animation-fill-mode` must NOT permanently hold a settle
  filter that clobbers a resting filter — use a fill that **reverts to the canvas's no-resting-filter
  state** post-settle. **Assert (gate): no viz CANVAS carries a resting `filter`.** goo-blob's `drop-shadow`
  stays on its **wrapper** (GooBlob.vue:312/317/339), which is NOT the canvas and NOT `.viz-canvas-host`
  (keep it there). M2's "recipe on `.viz-canvas-host`" language is corrected: **the host owns
  sizing/containment; the canvas owns the reveal filter** (two disjoint concerns).
- **FOLDED MUSTFIX (proto3 #2) — fire-at-first-VISIBLE, not at arm().** `fireRevealBloom()` must NOT run
  inside `arm()` (a viz arming while CV-skipped/below-fold burns its one-shot on an invisible paint and
  never materializes on scroll-in). **Gate the bloom on the first intersection/CV-visible transition**;
  the `revealFired` guard keeps it one-shot. An IO/CV re-reveal of an already-seen viz is a silent
  re-attach → **zero second bloom** on scroll-off-and-back.
- **FOLDED MUSTFIX (proto3 #5) — mint the token.** `--substrate-reveal-duration` is a **named token beside
  the Band-0 motion tokens** (`scheme-motion.css`), not an inline `1100ms` (token-first/consumer-retune
  identity). `--ease-cartoon-punch` + `--motion-weight` are ALREADY MINTED — do NOT re-mint (the census
  "never minted" claim is stale; confirmed at scheme-motion.css:196).
- **PRM:** the `@keyframes animation:` line sits inside `@media (prefers-reduced-motion: no-preference)`;
  the PRM arm sets the settled filter **instantly** (the existing `--ease-cartoon-punch → --ease-standard`
  carve at scheme-motion.css:361) → **instant settled field, no luminance ramp**.
- **FOLDED MUSTFIX (proto3 #3, #4) — complete the dead-engine deletion + un-stale the docs.** Delete
  `useVizChoreography.ts` (424 LOC, 0 importers — confirmed) + `tests-visual/viz-choreography.spec.ts` +
  `scripts/proof-viz-choreography.mjs` + the **`proof:viz-choreography` registration in BOTH
  `package.json:1009` AND `gates.mjs:1839`** (it is tagged `['local','ci']` — leaving it REDs CI) + retire
  `docs/consumer-evidence/use-viz-choreography.md` (a ≥2-consumer ledger for a 0-importer composable).
  **Rewrite the leaf docs to the attr mechanism:** `CanvasLifecycleOptions.revealBloom`
  (createCanvasLifecycle.ts:193-203), the G6 block (526-531), and the "no-op today" comment (629) all
  still describe the dead `--substrate-reveal-t scalar the shader reads` — delete the scalar writes;
  document the one-shot `[data-substrate-reveal]` attr + CSS `@keyframes` path. Closed-tranche BC wave
  docs stay as history.

**Rejected alternative (recorded):** threading a `uRevealT` uniform through 9 viz × 2 backends — richer,
but re-touches every shader against the §7 GL-fence, 18× the surface; the CSS-filter path satisfies the
bar (EFFECTS-channel sanctioned overshoot, W-MOTION-CANON P1).

**REAL-PAINT-π BAR:** paired chromium+webkit frame-series independently reproduces the entrance
field-luminance **overshoot ≥12% then settle** via the **deterministic brightness-filter readback** (NOT
raw 8-bit luma, which quantized webkit's pass to +12.5% against a 12% bar — proto3 #6); canvas rect
**`scale(1)`** every frame (no box animation); scroll-off-and-back fires **zero** second bloom (revealFired
guard); **PRM → instant** settled, zero ramp; `useVizChoreography.ts` DEFINITION-ABSENT.

### M4 · De-migrate fourier + constellation to useCanvas2D (honor the recorded verdict)
**Wave: BG.W-VIZ-DEMIGRATE · prototype build=true, est 86%, critique 73% [refine]**

The cleanest KISS win — makes a 4-tranche-stale doc TRUE and **deletes** ~2500 LOC. **NOT a git-revert**
(R5 — a naive revert restores the recorded Canvas2D defects: constellation's low-res `arc()`, fourier's
`lighter` hue-blowout). Re-author **crisp DPR-aware** useCanvas2D renderers preserving the
high-res/premultiplied fixes as Canvas2D equivalents. Prototype CONFIRMED (build-verified, not
self-reported): vue-tsc 0 errors, vite build EXIT 0, `profile:budget --enforce` EXIT 0,
`dist/constellation.js` raw 42_000→19_685 / gzip 13_500→7_118 (~47% drop), re-pinned DOWN.

- **fourier-field** → `useCanvas2D` over `math.ts` `partialSumAt`/`positionsAt` (the GPU-agnostic DFT math
  STAYS, byte-untouched) → `ctx.stroke` epicycle chain + comet trail, DPR-scaled `setTransform`, no
  `lighter` blend (premultiplied compositing equivalent). Delete: `fourierFieldWGPUSetup.ts` (339),
  `fourierFieldGLSetup.ts` (258), `uniformBridgeWGPU.ts` (240), `shaders/*.{compute,render}.wgsl.ts` (380),
  `fourier-field.glsl.ts` (228) = **1445 LOC / 6 files**.
- **constellation** → `useCanvas2D` over `constellationField.ts` (seed/step, byte-untouched) +
  `constellationRender.ts` (re-authored crisp node/edge draw, DPR-aware, no low-res arc) +
  `constellationInteraction.ts`. Delete: `constellationWGPUSetup.ts` (267), `constellationGLSetup.ts`
  (222), `uniformBridgeWGPU.ts` (196), `shaders/*.{lines,points}.{wgsl,glsl}.ts` (381) = **1066 LOC / 7
  files**. **Total: 13 files / 2511 LOC** (clears ≥9 files + ≥2000 LOC).
- **FOLDED MUSTFIX (proto4 #1) — kill the resolveFrame `clientWidth` self-measure** (`useConstellation.ts:222`)
  in the re-author. It is BOTH a zero-clientWidth-bar violation AND the D6 intrinsic-size-freeze defect
  itself. The Canvas2D consumer **receives CSS dims from the leaf `BackingSize`** via the M1
  `render(ctx, now, s: BackingSize)` widen + threaded `dprPolicy`. **HARD precondition: M1
  (SIZER-ADOPT-HARD, incl. the `render`-signature widen) MUST land before DEMIGRATE** — do NOT land
  DEMIGRATE against HEAD's `clientWidth`-self-measuring useCanvas2D.
- **FOLDED MUSTFIX (proto4 #6) — state the rewrite honestly.** `constellationField.ts`/`math.ts` are
  byte-untouched, but each viz's **render half** (uniform packing + backing-px `scaleX/scaleY`) is
  re-authored to emit **CSS-px draw state**. "Substrate swap, not a renderer rewrite" is true at the file
  level **for the math leaf only**; the resolveFrame/render diff is expected.
- **FOLDED MUSTFIX (proto4 #5) — co-revert BOTH together.** `proof-gpu-substrate-single.mjs:177-179`
  hardcodes one MIGRATED assertion + one NON_MIGRATING set covering BOTH siblings; a constellation-only
  land half-reverts. Sequence both de-migrations as **ONE M4 wave**; co-move both bundle re-pins DOWN in
  the same wave or it RED-floors.
- **Co-revert the gate+doc+budget triangle in the SAME wave:** flip `gpu-parity-table.md` fourier+
  constellation rows `verified` → **`no-migrate`** (rows already carry the reason); re-point
  `proof-gpu-substrate-single.mjs:177-179`, `proof-constellation-substrate-single.mjs`,
  `proof-fourier-field.mjs`, the fourier/constellation viz gates; **re-pin DOWN** `profile-bundle.mjs`
  ceilings; reconcile `PROCEDURAL-SUITE.md`. **Mint `proof:proc-suite-substrate`** (asserts each
  non-migrating viz dir carries **no `.wgsl` + no `createGpuSubstrate`**) so the verdict becomes a GATE —
  prose cannot be silently overridden a fourth time.
- **FOLDED MUSTFIX (proto4 #4) — correct the gate census.** `proof-substrate-cohesion` reads
  `Constellation.vue` + `constellationTypes.ts` (the `opacityCeiling` prop), **NOT** the shaders — it stays
  GREEN with no change (the prototype's "must change" claim was WRONG). Enumerate + **live-verify**
  `proof-constellation-{warp,refit,egg}-live` + `constellation.mjs` + `_reflect-constellation-capture.mjs`
  (field-behavior/substrate-agnostic, likely green but unverified).
- Keep both **off the root barrel** (no value.js / GL leaf on `dist/glass-ui.js`). useCanvas2D **composes
  the same `createCanvasLifecycle` leaf** (proof:webgl-substrate-single clause e — NOT a hand-rolled 2D
  loop) and inherits the M1 sizer + M2 floor + M3 reveal for free.

**REAL-PAINT-π BAR (proto4 #2, #3 — the device-free gate is necessary, NEVER sufficient):** real paired
**chromium-headless-new + webkit** frame-series on `/substrates/constellation` + `/substrates/fourier-field`
at the **SPA-nav window**: backing `== round(gBCR × dpr)`, aspect matches gBCR, **crisp DPR arc (no
low-res), `source-over` edges not blown out (no `lighter`)**, non-zero painted pixels
mounted-below-fold-then-scrolled-in, PRM static, both modes. `proof:viz-constellation` C2 ("substrate
sizes backing by dpr") is NOT the crispness/non-freeze proof — it passes while the canvas sits frozen at
300×150 under CV-skip; the live screenshot is the binding bar. Both render on useCanvas2D (no
`createGpuSubstrate`, no `.wgsl` in either dir); README ⟷ code ⟷ gpu-parity-table agree.

### M5 · Per-STORY previews + CPU-raster stills + ONE shared live hover-stage
**Wave: BG.W-VIZ-PREVIEW-LIVE · prototype build=true, est 88%, critique 72% [refine]**

The dispatch is **category-keyed** (`SectionLanding.vue:49` → substrates `previewKind:"field"` → all 11
cards paint the SAME `auroraFallbackGround` data-URI). The landing already mounts **0 live contexts** (the
≤1 bar is met) — the only defect is **sameness**. Re-key `#preview` dispatch **per-STORY** (`story.id`),
not per-category.

**The still mechanism — Path A VALIDATED (decisively better than the pass-1 "shared capture context"
lean):** CPU-raster each viz's single frame off its **pure math leaf** into a 2D-canvas `toDataURL` still
(the shipped `auroraFallbackGround` shape: pure-CORE + thin-canvas-SHELL) → **ZERO GL/WGPU contexts**.
This falsifies the spec's hardest wall (R1). The prototype confirmed `dot-matrix`'s `dotMatrixField.ts`
(`fibonacciDot`/`spinMatrix`/`applyMat3`/`facingFade`) is already pure+node-testable; the still adds zero
geometry.

- **FOLDED MUSTFIX (proto2 #1, #2, #8) — RECOGNIZABLE is REQUIRED, not polish.** "distinct-but-aurora-looking"
  is the user's exact defect re-skinned. **Compose each viz's OWN pure leaf where one exists** (recognizable-
  by-construction, cheap): fourier-field via `math.ts` `partialSumAt`/`positionsAt` (stroke raster),
  constellation via `constellationField.ts`, dot-flow via `flowField.ts`, dot-matrix via `dotMatrixField.ts`.
  **Do NOT route these to varied-aurora.** Keep the **pure-CORE / canvas-SHELL split for EVERY leaf-backed
  still** so node distinctness AND recognizability are device-free-provable per viz (π hashes within-engine).
- **FOLDED MUSTFIX (proto2 #3) — exploit the DEMIGRATE synergy.** Post-DEMIGRATE, fourier+constellation
  render on useCanvas2D → their device-free still is **their own Canvas2D render at t=0 into an offscreen
  canvas** (faithful, zero re-auth). **Sequence PREVIEW-LIVE after DEMIGRATE for those two stills; book the
  dependency explicitly** (PREVIEW-LIVE depends on 1, 2, AND 3-for-fourier/constellation-stills).
- **FOLDED MUSTFIX (proto2 #4, #5) — the shader-resident viz, per-viz decision (state each).** goo-blob's
  smin-SDF is **shader-only** (`metaball.wgsl.ts`); a `blobField` still is a **NET-NEW second math source**
  — scope + **gate it as an explicit recognizable APPROXIMATION**, do NOT present it as leaf-composed.
  concentric + paper-grid are shader-resident too — each gets EITHER a small re-authored recognizable
  approximation OR an honest varied-field still, **stated per viz** (not silently absorbed by "field").
- **FOLDED MUSTFIX (proto2 #7) — glass-material/glass-panel intentionally stay on a field still** (they are
  glass SURFACE demos, not procedural fields — a field backdrop is honest; a DECISION, not a coincidence).
- **FOLDED MUSTFIX (proto2 #6) — still caching.** Module-level memo: each `storyId` rasters its data-URI
  **ONCE** (not per card mount / per landing visit), or idle/build-time generation. 11 synchronous
  `toDataURL` on landing first-paint is unaccounted main-thread cost — eliminate it.
- **The ONE shared live hover-stage.** The hovered/lead card promotes ONE shared live context onto its
  stage (the only live arm). Sequenced after device-acquire, one at a time, disposed between — avoid the
  `usePresetThumbnails` "device not acquired" throw that left 13 eternal skeletons. **Avoid** `OffscreenCanvas`
  + `transferToImageBitmap` to many canvases (Safari AND Firefox readback-jank — violates Chrome-AND-Safari).
  Canvas pixels read via the **COMPOSITOR** (`locator.screenshot`), never `getImageData` (all-zero by the
  `preserveDrawingBuffer:false` contract). Preview host stays `aria-hidden`/`inert` (decorative). PRM →
  stills only, no live arm.
- **Budget-account against WS1's shell aurora:** substrate routes opt OUT of the shell field
  (`data-route-owns-gl`); the bento's shared hover-stage counts as the route's ONE live context. ≤1 live
  GL/WGPU at any instant.

**REAL-PAINT-π BAR:** **11 cards → 11 distinct per-card pixel-hashes** AND a **per-viz recognizability
assert** for the 5 field viz (not only distinct-hash — proto2 #1); ≤1 live GL/WGPU context counted on the
landing (`getContext('webgl2')` + `requestAdapter`); hovered card animates; both modes; PRM → stills only.

### M6 · Factor OR DELETE the WebGPU fragment scaffold — resolve factor-vs-delete FIRST (sequenced LAST)
**Wave: BG.W-VIZ-SUBSTRATE-FACTOR · prototype build=FALSE, est 80%, critique 57% [refine] — THE
UNCONVERGED FRONTIER → pass-2**

After M4 shrinks the dual-stack set, the remaining fragment-field viz share an identical scaffold. The
prototype's adversarial mandate (falsify the spec's "9→1 file") SUCCEEDED: `concentricWGPUSetup.ts` (174L)
and `paperGridWGPUSetup.ts` (160L) ARE byte-structurally identical scaffolds (deltas: labels, the WGSL
constant, the scratch/pack pair). **But the prototype did NOT build (build=false), and a deeper KISS
question is unresolved — this wave is NOT converged.**

- **FOLDED MUSTFIX (proto5 #1) — EXCLUDE goo-dot from the frame leaf.** The honest fragment-frame-leaf set
  is **THREE: aurora-smooth-core / concentric / paper-grid** (post-M4 `*WGPUSetup.ts` set confirmed). goo-dot
  is two-pass / two-buffer bind group / conditional ground / one-submit — it reuses `defineUniformLayout`
  per-struct + at most a pipeline-build sub-helper, **NOT the frame leaf**. Drop the `(+goo-dot ×2)` / −145
  credit.
- **FOLDED MUSTFIX (proto5 #6, THE GATING QUESTION) — resolve factor-vs-DELETE as M6's FIRST step.** A
  single-uniform fullscreen-triangle pass earns NOTHING from WebGPU over WebGL2 (no compute) — the SAME
  demigrate/KISS logic argues for **DELETING the WGPU fragment path** on concentric/paper-grid (and
  auditing aurora-smooth-core, which carries the WGSL primary register) and factoring the **GL2** scaffold
  instead. "Factor a duplication you might delete" is a KISS smell. **M6 must AUDIT-AND-DECIDE factor-vs-delete
  per fragment viz before building** (strong lean: delete the WGPU path where no compute is earned; KEEP
  WebGPU-first only where a compute pass earns it). This decision was NOT made in pass-1 → pass-2.
- **FOLDED MUSTFIX (proto5 #4) — actually sketch AND COMPILE `createFragmentFieldPass`.** Currently
  prose-only/truncated. Include the corrected signature (`context`, a `blend` default, the explicit
  **single-uniform-buffer constraint** — which is WHY goo-dot is excluded). `buildPassed` MUST be true
  before this wave is trusted.
- **FOLDED MUSTFIX (proto5 #2) — correct the vs_main claim.** concentric uses `vec2<f32>`, paper-grid uses
  `vec2f` — semantically equal, NOT byte-identical. The leaf injects ONE canonical `vs_main`; verify
  `fs_main` name-parity (`VSOut`/`.uv`/`u`, incl. concentric's `i32` lane) per viz when the per-viz
  `vs_main`+struct are dropped (the live R6a edit).
- **FOLDED MUSTFIX (proto5 #3) — correct the color-seam scope.** `oklchToLinear` is imported by **5**
  bridges, not 9, and **aurora is NOT one**. Post-M4 the fragment-leaf group sharing the color writer =
  concentric + paper-grid (**2**). Frame the win as **"write-loop boilerplate factors"**, not "oklchToLinear
  once" (the color math is already single-source in `composables/color`).
- ONE `defineUniformLayout(descriptor)` leaf (std140/WGSL byte-offset arithmetic + `ArrayBuffer`/`DataView`
  boilerplate ONCE) — the per-viz `Uniforms` STRUCT + `pack()` stay per-viz (the structs genuinely differ).
- **FOLDED MUSTFIX (proto5 #5) — the GL2 twin spec M6 demands.** Either factor the GL scaffold
  (`createProgram`/`useProgram`/uniform-location upload/`drawArrays`) in-wave, OR book with a NAMED trigger.
  Do NOT leave the explicit ask half-addressed by silence. (If factor-vs-delete resolves to DELETE-the-WGPU-path,
  the GL2 scaffold factor BECOMES the wave.)

**REAL-PAINT-π BAR (proto5 #7):** bind the parity bar to a REAL paired chromium+webkit frame-series
(R6c). The assembled WGSL module string changes when struct/`vs_main` move into the leaf; the device-free
ΔE gate is a structural proxy only. The BE.W-VIZ-PARITY-METAL real-Metal capture was deferred-forever —
**"zero visual change" is UNFALSIFIED until both engines paint identically.** ΔE mean ≤ 2.0 / p99 ≤ 5.0 on
each kept dual-stack; net LOC reduction.

### M7 · The carves + the dot-flow rebuild (colocation + the one genuine rebuild)

- **BG.W-GOODOT-SETUP-SPLIT** — move `buildWGPUSetup` + `buildGLSetup` (`useGooDotMatrix.ts:257-459`) into
  the already-existing colocated `gooDotSetup.ts` → `useGooDotMatrix.ts` drops under the 500-line bound.
  Carve the **adopted (M1) shape** — sequence after SIZER-ADOPT-HARD so the file is not touched twice (DEFT).
- **BG.W-BLOB-KINEMATICS-LEAF** — carve `useBlobSatellites.ts` (533) orbit/eccentricity/wobble kinematics
  into a colocated `satelliteKinematics.ts` leaf (a stateless math leaf, no `SpringProgress` fork).
  Encapsulation file-carve only — it does NOT own sizer adoption (M1 owns it suite-wide).
- **BG.W-DOTFLOW-REBUILD** — collapse the 8-file/~2700-LOC dot-flow surface (the two-FBO RGBA16F GPGPU
  `flowSetupGL`→`flowSetupGLFlow` split + the compute WGPU + the dead `useFlowParticles.ts` re-export shim
  whose body is one `export {...}` line + a stray `clientWidth||320`). Rebuild = **one** coherent advection
  model: one GL setup + one WGPU compute setup + `flowField.ts` math, routed through `sizeBacking`. The
  **compute pass STAYS WebGPU** (the one viz that earns it — the M6 factor-vs-delete logic does NOT touch
  it). Fidelity: "faint at rest (10% structure)" → subtle larger sweeping waves + stronger rest contrast,
  on the liquid-weight spring register.

  **REAL-PAINT-π BAR:** non-zero painted pixels at rest, streamline clusters read, stronger rest contrast,
  hovered animates; one GL + one WGPU compute setup; the `useFlowParticles` shim DEFINITION-ABSENT.

---

## FILES TOUCHED (by wave) — unchanged from pass-1 except where mustFix added a file

**BG.W-VIZ-INTRINSIC-SIZE:** `tokens/scale-paper.css` (mint `--viz-intrinsic-block` + per-host overrides),
a shared `.viz-canvas-host` recipe home (+ per-host `min-block-size`), the 8 wrapper `<style scoped>` blocks.

**BG.W-VIZ-SIZER-ADOPT-HARD:** `webgl/createCanvasLifecycle.ts` (drop `?`, delete legacy else, require
`dprPolicy`), `useWebGLCanvas.ts`, `useWebGPUCanvas.ts`, `useCanvas2D.ts` (+ widen `render(ctx,now,s)`);
every viz `use*.ts` + `*GLSetup.ts` + `*WGPUSetup.ts` (thread `dprPolicy`, shrink `resize(s)` upload-only,
kill F8 — 14 files / 31 sites, ATOMIC); delete aurora `runtime.ts` gBCR closure, goo-blob `resizeBacking`,
constellation raw `devicePixelRatio`; `composeIntersectionPark:true` on concentric/fourier/dot-flow,
delete goo-blob/goo-dot `useIntersectionPause`; **mint `scripts/proof-viz-resize-upload-only.mjs`**.

**BG.W-VIZ-REVEAL-BLOOM:** `tokens/scheme-motion.css` (mint `--substrate-reveal-duration`),
`tokens/property-regs.css` (drop the dead `@property --substrate-reveal-t` scalar writes), a
`@keyframes substrate-reveal-bloom` + the canvas-targeted `[data-substrate-reveal]` recipe,
`createCanvasLifecycle.ts` (rewrite revealBloom to fire-at-first-visible + un-stale comments
193-203/526-531/629), per-viz `revealBloom:true`; **delete** `useVizChoreography.ts` +
`tests-visual/viz-choreography.spec.ts` + `scripts/proof-viz-choreography.mjs` + the `proof:viz-choreography`
registration in `package.json:1009` AND `gates.mjs:1839` + retire `docs/consumer-evidence/use-viz-choreography.md`.

**BG.W-VIZ-DEMIGRATE:** delete the 13 fourier+constellation dual-stack files; re-author `useFourierField.ts`
+ `useConstellation.ts` (kill the `:222` clientWidth) + `constellationRender.ts` on useCanvas2D; flip
`gpu-parity-table.md` rows; re-point `proof-gpu-substrate-single.mjs:177-179`,
`proof-constellation-substrate-single.mjs`, `proof-fourier-field.mjs`, the fourier/constellation viz gates;
re-pin DOWN `profile-bundle.mjs`; reconcile `PROCEDURAL-SUITE.md`; mint `proof-proc-suite-substrate.mjs`.

**BG.W-VIZ-PREVIEW-LIVE:** `SectionLanding.vue` (per-story dispatch), a `vizPreviewStill(storyId)` registry
(module-memo cache, CPU-raster off pure leaves) + the shared live hover-stage host, `SectionPreviewCard.vue`
(#preview seam — already a slot), `category-hero.ts`/`category-specimen` (per-story key).

**BG.W-VIZ-SUBSTRATE-FACTOR:** new `src/composables/glass/webgpu/createFragmentFieldPass.ts` +
`defineUniformLayout.ts` (THREE fragment viz: aurora/concentric/paper-grid; goo-dot excluded); re-point or
DELETE-WGPU per the factor-vs-delete decision; collapse the shared `uniformBridgeWGPU.ts` write-loops.

**BG.W-DOTFLOW-REBUILD / CARVES:** `goo-dot-matrix/composables/{useGooDotMatrix,gooDotSetup}.ts`;
`goo-blob/composables/{useBlobSatellites,satelliteKinematics}.ts`; the dot-flow-field `composables/` collapse
+ shim delete.

---

## WAVE BREAKDOWN (sequenced)

| # | Wave | Scope | Depends on | Converged? |
|---|------|-------|-----------|-----------|
| 1 | **BG.W-VIZ-INTRINSIC-SIZE** | M2 — `--viz-intrinsic-block` (per-host) + 8 wrappers + `.viz-canvas-host` fold + min-block-size | — (the floor) | yes |
| 2 | **BG.W-VIZ-SIZER-ADOPT-HARD** | M1 — drop `?`, dprPolicy required, ATOMIC upload-only `resize(s)`, widen `render(s)`, kill 31+F8, delete 3 rivals, leaf-park 3, source gate + cross-engine π | 1 | yes (paint-π pending) |
| 3 | **BG.W-VIZ-DEMIGRATE** | M4 — delete 13/2511, re-author crisp useCanvas2D (co-revert BOTH), kill `:222`, gate+doc+budget co-revert, verdict→gate | 2 (incl. render-widen) | yes (paint-π pending) |
| 4 | **BG.W-VIZ-REVEAL-BLOOM** | M3 — keyframe-on-filter on CANVAS, fire-at-first-visible, mint duration token, delete useVizChoreography + 2 gate registrations + evidence | 2 | yes (paint-π pending) |
| 5 | **BG.W-VIZ-PREVIEW-LIVE** | M5 — per-story dispatch, CPU-raster stills off pure leaves (recognizable), per-viz shader-resident decision, module memo, ONE hover-stage | 1, 2, 3 (fourier/constellation stills) | yes (recognizability decision pending) |
| 6 | **BG.W-DOTFLOW-REBUILD** | M7 — collapse 8-file surface, one advection model (one GL + one WGPU compute), fix faint-at-rest, delete shim | 2 | yes |
| 7 | **BG.W-VIZ-SUBSTRATE-FACTOR** | M6 — resolve factor-vs-DELETE FIRST, createFragmentFieldPass (3 viz, goo-dot excluded) + defineUniformLayout, GL2-twin decision, real Metal parity π | 3 (set shrunk first) | **NO — pass-2** |
| 8 | **BG.W-GOODOT-SETUP-SPLIT** | M7 — carve into existing `gooDotSetup.ts`, under 500, carve the adopted shape | 2 | yes |
| 9 | **BG.W-BLOB-KINEMATICS-LEAF** | M7 — carve `satelliteKinematics.ts`, under 500 | 2 | yes |

Waves 8/9 fold into the SIZER-ADOPT pass where they touch the same files (DEFT — carve the adopted shape,
don't re-touch). Waves 4/6 run parallel to 3/5 once 2 lands. Wave 7 waits on a pass-2 build-proof.

---

## ACCEPTANCE / REAL-PAINT-π BAR (THE binding bar — unexecuted in pass-1, named per wave above)

**A PAIRED chromium-headless-new + webkit real-paint frame-series — NOT a device-free gate.** The
headless-green/visually-broken trap shipped 3× (BB invented "rides W-REFLECT3"; BD/BE/BF re-committed it);
the close oracle `proof:ba-gestalt` reads a stale BC roster blind to the viz surfaces. **Add the
`/substrates` landing + each viz route to the live gestalt roster.** Verify at the **SPA-nav window**
(route-nav, not hard-load — the regression only reproduces on nav). All pixel reads are compositor
`locator.screenshot` (live `getImageData`/`readPixels` is all-zero by `preserveDrawingBuffer:false`).
**Install the webkit binary / rebuild dist as needed — this is the trap, it is not optional.** Each
build-true wave is GREEN only when its paired chromium+webkit π (named in its M-section above) runs and
passes.

---

## FOLDED DEFERRED ITEMS

- BD.W-SUBSTRATE-SIZE-UNIFY adoption half (unbuilt) → **SIZER-ADOPT-HARD**.
- BD.W-SUBSTRATE-REVEAL-BLOOM (no-op) → **REVEAL-BLOOM** (mechanism CHANGED to keyframe-on-filter; token-mint
  already done — scope SHRANK to the CSS `@keyframes` recipe + the canvas-attr fire + delete-the-orphan).
- fourier/constellation un-honored no-migrate verdict (WS5-13 / D code-drift) → **DEMIGRATE** + the new
  `proof:proc-suite-substrate` gate.
- category-landing 11-GL frozen-still (P-chronic Class4) → **PREVIEW-LIVE** (Path A CPU-raster).
- dot-flow "faint at rest 10%" (Class4) → **DOTFLOW-REBUILD**.
- 3 stale viz gates (`proof-viz-dotflow` over-broad grep, `proof-concentric` ringField→levelField rename,
  `proof-handmark` CLAUDE.md-in-flux dep) → a gate-fix rider on the touching wave, or hand to WS7
  DEAD-GATE-SWEEP.
- usePointerVelocityField (WS5-11) — ADDRESSED at HEAD (no action).
- metallic-aurora (WS5-04) — DEFERRED to BD.W-AUR-METAL-FINISH (trigger un-MET; keep by-name).

**RETIRE-with-rationale (no silent drop):**
- **goo-blob → "blob" rename (WS5-02)** — **RETIRED, kept as `goo-blob`.** The rename is cosmetic;
  `/goo-blob` is a published subpath with the goo-blob/goo-dot-matrix naming symmetry; a rename is a
  breaking subpath + every-consumer-import change for zero functional gain. Re-book to a dedicated
  clean-break rename tranche only if the user reaffirms. Recorded, not dropped.

---

## OPEN RISKS / RESIDUAL GAPS (the unconverged frontier)

- **R6/M6 — BG.W-VIZ-SUBSTRATE-FACTOR is NOT converged** (prototype build=FALSE, 57% [refine]). The
  factor-vs-DELETE KISS question (delete the WGPU fragment path WebGL2-only where no compute is earned, vs
  factor the WGPU scaffold) is UNRESOLVED; `createFragmentFieldPass` is prose-only and uncompiled; the
  GL2-twin scope is undecided; the real-Metal cross-backend parity capture (BE.W-VIZ-PARITY-METAL,
  deferred-forever) is not produced. → **pass-2 prototype: compile the leaf, decide factor-vs-delete per
  fragment viz, produce the real paired-engine parity capture.**
- **The paired chromium+webkit real-paint π is SPECIFIED but UNEXECUTED for every wave** (all pass-1
  prototypes are build/compile-verified only). This is the build-time gate that closes the
  headless-green/visually-broken trap — it carries a webkit-binary-install / dist-rebuild prerequisite (R7:
  the Safari gBCR×dpr rounding + WebKit's weaker CV + the ~10-context `/substrates/constellation` budget are
  genuine second axes only Chromium was testable against in research).
- **PREVIEW-LIVE shader-resident recognizability** — goo-blob/concentric/paper-grid have no pure leaf; the
  per-viz still decision (a gated recognizable APPROXIMATION — blobField is a net-new math source, must NOT
  be presented as leaf-composed — vs an honest varied-field) must be MADE and stated per viz.
- **SIZER-ADOPT forcing-function** — TS method-bivariance cannot structurally forbid a `resize` that ignores
  `s`; enforcement leans on the new `proof:viz-resize-upload-only` source gate + the cross-engine paint π
  (recorded honestly — the structural compile-forbid was NOT achieved).
- **probePipeline `frameHooks?.resize()` removal** needs real WebKit/Metal verification (popErrorScope still
  surfaces draw-time-invalid pipelines — the Safari flash path) — by-inspection insufficient.
- **The 2D-backend `render(ctx,now,s)` contract is compile-only** until DEMIGRATE exercises it with real
  paint (useCanvas2D has 0 live render call sites at HEAD).
