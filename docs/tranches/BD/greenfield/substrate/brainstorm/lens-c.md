# Substrate greenfield — LENS C: audacious cartoon-technicolor PUNCH

> The GPU SUBSTRATE base — the shared canvas lifecycle every Band-A viz mounts on
> (`createGpuSubstrate` / `createWebGPUCanvas` / `createWebGLCanvas` /
> `createCanvasLifecycle`, the WebGPU→WebGL2 picker, the offscreen-park + PRM-freeze).
> **DEFT, fit-and-mostly-fixed infra. This lens VALIDATES + HARDENS the lifecycle and
> RE-FRAMES its one missing register — the REVEAL — as a first-class cartoon BLOOM, not a
> silent re-measure.** Survival of the fittest: keep the demand-gate, the suspend-Set, the
> shared-device warm, the circuit-breaker, the poison-clone; REFINE the acquire margin + the
> born-skipped re-measure; RE-INVENT only the reveal-moment from a hidden mechanical resize
> into the substrate's one visible, weighted, punchy gesture.

---

## 0. SOURCE-VERIFY (grepped + live, not cited from memory)

Every composable the brief names EXISTS and was read in full:

| Cited symbol | File | Verified |
|---|---|---|
| `createGpuSubstrate` / `supportsWebGPU` / `GpuBackend` | `src/composables/glass/webgpu/useGpuSubstrate.ts` | ✓ the picker + `freshCanvasForFallback` poison-clone |
| `createWebGPUCanvas` / `WEBGPU_ACQUIRE_TIMEOUT_MS=6000` / `acquireSharedDevice` | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | ✓ shared-device warm + validation-probe gate |
| `WebGPUInitError` / `isSoftwareWebGPUAdapter` | `src/composables/glass/webgpu/webgpuDevice.ts` | ✓ typed init-failure leaf |
| `createCanvasLifecycle` / `N_RESTORE_STORM=3` / `RESTORE_DEBOUNCE_MS=100` | `src/composables/glass/webgl/createCanvasLifecycle.ts` | ✓ suspend-Set + CV-park + PRM re-monitor + circuit-breaker |
| `createWebGLCanvas` / `probeWebGL2Renderer` / `canvasCanHostWebGL2` | `src/composables/glass/webgl/useWebGLCanvas.ts` | ✓ WebGL2 backend + poison-probe |
| `useIntersectionPause` (`PausableRuntime`) | `src/composables/motion/useIntersectionPause.ts` | ✓ the IO/`off-screen-io` fallback driver |
| `useGpuSubstrate` consumers | `aurora/runtime.ts`, `goo-blob/useMetaballRenderer.ts`, `goo-dot-matrix`, `fourier-field`, `concentric`, `paper-grid`, `constellation` | ✓ all compose `createGpuSubstrate(canvas, {setupWGPU, setupGL, contextAttrs})` |

There is **no `useGpuSubstrate.ts`-named hook** — the public symbol is `createGpuSubstrate` (imperative). The brief's `useWebGPUCanvas`/`useGpuSubstrate`/`createCanvasLifecycle` names map to `createWebGPUCanvas`/`createGpuSubstrate`/`createCanvasLifecycle`. **`preserveDrawingBuffer: false` is set in all three live consumers** (goo-blob:329, goo-dot-matrix:379, aurora/runtime.ts) — no consumer enables readback; gates use `locator.screenshot()` (goo-blob/RESEARCH.md:194), NOT `getImageData`.

### Live inspection (Chrome, localhost:5173, this Apple Metal-3 host) — the DECISIVE findings

| Probe | Result | Verdict |
|---|---|---|
| `/substrates/aurora` first canvas, t=0–3s | **`bufW/H = 300×150`** while `cssW/H = 1152×1585` | the 300×150 hang IS reproducible during the acquire window |
| `navigator.gpu.requestAdapter()` cold | **5562 ms** (then device 216ms, `apple/metal-3`) | the comment claims "~3478ms"; LIVE is **5562ms** — the 6000ms ceiling has **~440ms of margin**, a coin-flip |
| `/substrates/aurora` first canvas, t=3s+ | resized to `1728×2378` (DPR2, clamped) then a re-query caught it BACK at `300×150` | a re-arm RACE: the surface flickers size during the slow acquire |
| `/substrates/aurora` 2nd canvas (`top:854`, below fold, `content-visibility:auto` ancestor) | **`300×150` forever** | the **born-skipped reveal-trap is LIVE** — the lifecycle's CV re-measure is not reaching this canvas |
| `/substrates/blob` | backend resolved **`webgl2`** (FELL from WebGPU), canvases correctly 1536²/1126² | the picker **falls to webgl2 live on some loads** — the dot-flow delta's observation reproduced; backend is NON-DETERMINISTIC across routes/loads |
| `/substrates/blob` hero | screenshot: **flat cream, NO visible metaball** behind the "GooBlob" type | the stuck/under-resolved canvas reads as a blank field — the §3 colorful-field-behind-glass mandate is VIOLATED by the very substrate that should feed it |

**The substrate is fit but has FOUR live wounds**: (1) the 5562ms acquire vs 6000ms ceiling is a near-miss; (2) a re-arm size-RACE during the slow acquire; (3) the born-skipped below-fold canvas never re-measures (the reveal-trap the prior fix was supposed to close is STILL open for the 2nd-canvas-on-a-page case); (4) no readback contract. This lens HARDENS all four AND re-casts the reveal as the substrate's signature cartoon gesture.

---

## 1. THE LENS — what "cartoon-technicolor PUNCH" means for an INVISIBLE base

The substrate paints no pixels of its own — it is the stage the viz dances on. So the lens
is NOT "make the lifecycle gaudy." It is: **the ONE moment the substrate is perceptible — the
moment a viz first appears, or RE-appears on scroll-reveal, or wakes from a parked state — is
the moment to apply FLOW & PUNCH.** Today that moment is a silent mechanical `canvas.width = …`
resize: the buffer pops from 300×150 to full-res with no anticipation, no weight, no arc — a
hard cut, the antithesis of the 1940s technicolor register. Worse, on the slow-acquire host it
is a 3–6 second BLANK then a hard pop (the live finding). That is the substrate's cartoon
crime: **the entrance has no grace.**

**The boldest reframing: the substrate owns a REVEAL CHOREOGRAPHY, not a resize.** When a viz
surface first paints (cold arm) OR re-enters (scroll-reveal from content-skipped) OR wakes
(un-park), the substrate orchestrates a **bloom-in** of the canvas element itself — a
compositor-only `scale`/`opacity`/`filter:blur` squish-grow on the `<canvas>` DOM node, driven
by `--ease-cartoon-punch` (the §L2 anticipate-dip → 22% overshoot → settle curve that already
ships), scaled by `--motion-weight` — while the GL/WGSL backing resolves underneath. The
canvas does not POP into existence; it **anticipates (a beat of held-small), then squishes
up past full, then settles** — the exact §L10 control-center entrance, applied to the viz
plane. This is pure §L7-safe transform/opacity/own-`filter` (never `backdrop-filter`), it
costs the compositor nothing, it is PRM-carved to an instant fade, and it transforms the
substrate's ugliest live moment (the blank-then-pop) into its most ALIVE one.

This is **deft, not a fork**: the substrate already OWNS the arm/reveal/wake seams
(`lifecycle.arm()`, the CV `onContentVisibilityAutoStateChange`, `resume()`/`wake()`). The
reveal-choreography is a thin CSS-class toggle the lifecycle drives at those EXACT existing
seams — zero new scheduling, zero new observer, reusing the shipped `--ease-cartoon-punch` +
`--motion-weight` + `.glass-reveal`/`useLiquidFlex` grammar.

---

## 2. THE DESIGN — five hardenings + one re-invention, all DEFT unions

### H1 (HARDEN, blocking) — the acquire-margin is a near-miss: make the FALL fast, not the timeout generous

**Live wound:** `requestAdapter` cold = **5562ms** on a healthy Metal-3 host; the ceiling is
6000ms. ~440ms of margin. A slightly colder GPU process (a fresh tab after a sleep, a
contended host) blows past 6000 → false-timeout → silent permanent WebGL2 (the masked-Safari
class the comment itself warns of). Raising the ceiling to 8000ms is the WRONG fix — it
lengthens the blank-canvas window to 8s.

**The deft fix — DECOUPLE first-paint from device-acquire.** The substrate should not make the
user stare at a blank 300×150 canvas for 5.5s waiting on WebGPU. Instead:

1. **Build the WebGL2 net FIRST, arm it, paint frame 0 immediately** (synchronous, <16ms), THEN
   race the WebGPU acquire in the background. On WebGPU success, hot-swap the backend
   (dispose the WebGL2 net, stand up WebGPU on a fresh clone) — the viz never blanks, the
   user sees a painted field in one frame, and the WebGPU upgrade arrives invisibly. This
   **inverts the current optimistic-WebGPU-then-fall** into **paint-now-WebGL2-then-upgrade**.
   The 6000ms ceiling becomes a non-event: a slow acquire just means the upgrade lands late,
   never a blank.
2. **OR (simpler, lower-risk union): keep the WebGPU-first order but paint a CARTOON
   SKELETON during the acquire** — the canvas DOM node carries a CSS `--substrate-warming`
   class that paints a §3-colorful-field placeholder (a slow `--ease-cartoon-punch` breathing
   conic-gradient in the consumer's `--glass-accent` hue, compositor-only) so the acquire
   window reads as a *living warm field*, not a dead 300×150 grey. The skeleton crossfades out
   when the real frame 0 lands.

**Recommendation:** option 1 (paint-now-WebGL2-then-upgrade) is the boldest and kills the
blank window dead, but it doubles the context cost transiently (WebGL2 + WebGPU) — risky under
the ~8-context cap with N viz. Option 2 (cartoon warming skeleton) is the DEFT KISS union: it
keeps the shipped picker order byte-untouched, adds ONE CSS class + one consumer-supplied hue,
and turns the acquire window into a §3-mandate-satisfying living field. **Ship option 2; spike
option 1 as a stretch.** Either way, **drop the ceiling back to a measured-margin value**
(`5562ms × 1.5 ≈ 8500ms` if we keep the blank, OR keep 6000ms once the skeleton hides the
window — the skeleton makes the exact ceiling cosmetic).

### H2 (HARDEN, blocking) — the re-arm SIZE-RACE during slow acquire

**Live wound:** the first aurora canvas was caught at `1728×2378` then BACK at `300×150` on a
later query — a re-arm race: while `armAsync` awaits the 5.5s device, a `resize()` or a
re-mount writes the buffer, then the late-arming path re-runs `buildContext`→`resize` against a
stale measurement, or a second `armAsync` (StrictMode / HMR / the thumbnail bake that logs
`device not acquired`) re-enters. The `acquiring` promise guard in `armAsync` prevents
re-entry of the SAME handle, but the **thumbnail-bake abort** (`[Aurora] thumbnail bake
aborted: device not acquired`, live console) proves a second consumer path touches the same
canvas mid-acquire.

**The deft fix:** make `resize()` the SINGLE source of truth for the backing, gated on a
**measured-box-is-real** guard. `resizeBacking` already reads `canvas.clientWidth ||
config.geometry.canvasSize` — but the fallback `geometry.canvasSize` is what FREEZES the
backing at a non-300×150 default, masking the real bug. **HARDEN the lifecycle's `arm()` to
NOT call `resize()` until `clientWidth > 0`** (a laid-out box): if the box is zero (content-
skipped / pre-layout), arm the schedule but DEFER the first `resize()` to the CV-reveal or a
`requestAnimationFrame`-coalesced re-measure. This is the structural cure for BOTH the race AND
the born-skipped trap (H3): a canvas never writes a backing from an un-laid-out box.

### H3 (HARDEN, blocking) — the BORN-SKIPPED 2nd-canvas-on-a-page reveal-trap is STILL OPEN

**Live wound:** the 2nd aurora canvas (`top:854`, below fold, `content-visibility:auto`
ancestor) is stuck at `300×150` **forever** — the prior fix's "reveal re-measure" did NOT
reach it. The lifecycle's `onContentVisibilityAutoStateChange` DOES re-measure on
skipped→visible (`createCanvasLifecycle.ts:241-243`), and `resume("off-screen")` re-measures —
BUT the live evidence shows the 2nd canvas never fires it (it scrolled into view in my probes
yet stayed 300×150). Likely cause: the CV host is `canvas.parentElement` (the `aurora-root`
div), but the `content-visibility:auto` is on a HIGHER ancestor (the route stage), so the
`contentvisibilityautostatechange` event fires on the WRONG element and the listener bound to
`canvas.parentElement` never hears it. The lifecycle binds CV to `canvas.parentElement` ONLY
(`bindContentVisibility` → `canvas.parentElement`).

**The deft fix:** bind the CV listener to the **nearest `content-visibility:auto` ancestor**,
not the immediate parent. Walk up from the canvas, find the element whose computed
`content-visibility` is `auto`, bind there (the event does NOT bubble to where the listener
sits today). FALLBACK belt-and-braces: a single shared `IntersectionObserver` (the
`useIntersectionPause` path, already wired by consumers via `off-screen-io`) that on
`isIntersecting → true` ALSO triggers a `resize()` re-measure — so even if the CV ancestor walk
misses, the IO reveal catches the born-skipped canvas. **This unifies the reveal-re-measure
across BOTH detectors** (CV + IO), closing the trap structurally — exactly the AX.W16 F6
two-detector discipline the lifecycle already embraces for park, extended to reveal.

### H4 (HARDEN) — the readback / `preserveDrawingBuffer` contract

**Finding:** all three live consumers set `preserveDrawingBuffer: false`; gates read pixels via
`locator.screenshot()` + pngjs (compositor readback), NOT `gl.readPixels`/`getImageData` (which
return zeros without preservation — the "all-zero readback" the dot-flow delta found IS the
expected, correct behaviour, NOT a substrate defect). So `preserveDrawingBuffer:false` is
CORRECT for live (preservation forces a non-double-buffered slow path + a memory cost). **The
substrate should NOT enable it globally.** Instead: expose a **`mode:"capture"` already-present
seam** that flips `preserveDrawingBuffer:true` for the capture/thumbnail path (the aurora
DESIGN.md:185 contract: "capture-only by default"). HARDEN: the picker's `contextAttrs` should
**auto-enable `preserveDrawingBuffer` when `mode:"capture"`** so a capture consumer never has to
remember it, and **document that live π gates MUST use compositor `screenshot()`** not
`readPixels` (the all-zero is a feature, not a bug). This is a one-line union in
`buildWebGL2`/`createWebGPUCanvas` (OR-in `preserveDrawingBuffer: options.mode==='capture'`),
zero new surface.

### H5 (VALIDATE — keep, do NOT touch) — the genuinely-fit machinery

These survive the interrogation **untouched** (survival of the fittest — keep what is fit):
- the **demand-gate** (`shouldContinue()` → park; `wake()` re-arms): a calm/frozen viz attaches
  zero frames. FIT.
- the **three-reason suspend Set** (`tab-hidden`/`off-screen`/`off-screen-io`/`manual`), each
  cleared only by its owner: structurally correct, the F6 one-writer-per-reason invariant
  holds. FIT.
- the **shared-device warm** (`acquireSharedDevice` — pay the cold acquire ONCE per page, N
  contexts share it): exactly the standard WebGPU pattern; without it the 5562ms cost would be
  paid N times. FIT — and the H1 skeleton hides even the single payment.
- the **device-loss self-heal + circuit-breaker** (`N_RESTORE_STORM=3`/`T=2000ms`/debounce
  100ms): the Safari eviction-storm cure. FIT.
- the **poison-clone** (`freshCanvasForFallback` swaps ONLY when `canvasCanHostWebGL2` is
  false): the one-context-type rule handled exactly; the "don't orphan the consumer's captured
  ref" guard is the blurry-viz fix. FIT.
- the **PRM live re-monitor** (`matchMedia('change')` → one static frame on un-reduce): the
  §L5 freeze. FIT.

### RE-INVENT (the bold move) — the REVEAL CHOREOGRAPHY (§1)

The substrate gains ONE new responsibility: **drive a cartoon bloom-in on the canvas DOM node at
the arm/reveal/wake seams.** Mechanism (all DEFT reuse, zero new scheduler):

- a `--substrate-reveal-t` per-canvas scalar + a `.substrate-reveal` recipe class the
  lifecycle toggles at: cold `arm()` (first paint), CV/IO reveal (scroll-back), `resume()`
  un-park.
- the recipe composes the SHIPPED grammar: `transform: scale()` squish-grow on
  `--ease-cartoon-punch` (anticipate-dip → 22% overshoot → settle) + `opacity` fade +
  `filter: blur()` settle (the `.glass-reveal` blur-settle, on the canvas's OWN filter —
  §L7-safe, never `backdrop-filter`), depth scaled by `--motion-weight` (rest `0.62`,
  pushed toward `1` for a viz HERO entrance).
- **volume-preserving squish** (`useLiquidFlex` X·Y≈1) so the bloom reads as liquid weight,
  not a uniform zoom — the T10 grace-calibrated ≈0.88 anticipation depth.
- PRM → instant `opacity` fade, zero transform (the §L5 cascade via `--motion-weight: 0`).
- §L7 cross-engine: transform/opacity/own-`filter` ONLY → identical in Chrome + WebKit; the
  paint-cost fence is honored (a ONE-SHOT transition at the reveal seam, never a steady-state
  loop — the canvas's per-frame GL paint is untouched).

This turns the substrate's worst live moment (blank → hard 300×150 pop) into its signature: a
viz field that **anticipates, squishes up past full, and settles into place with real weight** —
the §3 colorful-field-behind-glass arriving with FLOW & PUNCH instead of a mechanical resize.

---

## 3. CROSS-ENGINE (Chrome + Safari) — the substrate's engine-parity contract

- **WebGPU is Safari-26+/Metal-real**: on this very Apple host the live acquire SUCCEEDED
  (`apple/metal-3`) but at 5562ms — so the H1 warming-skeleton is what makes WebGPU-on-Safari
  *feel* instant. Where WebGPU is absent/hung (older Safari, the `isSoftwareWebGPUAdapter`
  SwiftShader class), the picker falls to WebGL2 — VALIDATED live on `/substrates/blob` (it
  resolved `webgl2`), no flash, no per-frame flood (the validation-probe gate works).
- **the all-zero readback is correct cross-engine**: `preserveDrawingBuffer:false` →
  `readPixels` zeros in BOTH engines; gates use compositor `screenshot()` (H4). Not a defect.
- **the reveal choreography is compositor-only** → byte-identical Chrome/WebKit (the
  acceptance is a paired-engine π frame-series of the bloom, never single-engine).
- the §L7 floor (`@supports`/PRM/no-`backdrop-filter:url`) is INHERITED by every viz that
  mounts the substrate — the substrate is the §L7-arm HOME for the viz suite (design.md:187).

---

## 4. THE A11Y / PRM CARVE

- the lifecycle's PRM re-monitor already paints ONE static frame then parks under
  `reduce` — KEEP. The reveal choreography collapses to an instant `opacity` fade under
  `--motion-weight: 0` (the §L5 cascade), no squish, no overshoot, no blur-settle.
- `prefers-reduced-transparency` does NOT touch the viz (a viz is a content field, not a
  transmissive glass layer) — but a viz consumer SHOULD honor it by falling to its
  `auroraFallbackGround` static-mesh where one exists.
- the WCAG-2.2.2 pause + offscreen-park + PRM-freeze are the suite floor the substrate
  threads through every consumer (design.md §L7 dot-flow note) — VALIDATED present.

---

## 5. DELTA-ASSAY SEED (for the synth/delta phase)

| Item | Current | This lens | Action |
|---|---|---|---|
| acquire ceiling | 6000ms, live cold=**5562ms** (440ms margin) | warming-skeleton hides the window; ceiling cosmetic | **HARDEN** (H1) — `BD.W-SUBSTRATE-WARM-SKELETON` |
| arm `resize()` from un-laid-out box | writes backing off `clientWidth||fallback` | gate `resize()` on `clientWidth>0`; defer to reveal | **HARDEN** (H2) — fold into the lifecycle `arm()` |
| born-skipped 2nd-canvas reveal | CV bound to `canvas.parentElement`, MISSES higher CV ancestor → stuck 300×150 LIVE | bind CV to nearest `content-visibility:auto` ancestor + IO-reveal re-measure | **HARDEN** (H3, blocking) — `BD.W-SUBSTRATE-REVEAL-REMEASURE` |
| readback / `preserveDrawingBuffer` | `false` everywhere; gates use `screenshot()` | auto-enable on `mode:"capture"`; document the all-zero is correct | **REFINE** (H4) — one-line OR-in |
| demand-gate / suspend-Set / shared-warm / circuit-breaker / poison-clone / PRM | all FIT | keep byte-untouched | **VALIDATE** (H5) |
| the reveal MOMENT | silent mechanical resize / blank-then-pop | cartoon bloom-in (squish-grow on `--ease-cartoon-punch`×`--motion-weight`, §L7-safe, PRM-carved) | **RE-INVENT** (§1) — `BD.W-SUBSTRATE-REVEAL-BLOOM` |

**No parallel fork. No legacy.** Every hardening is a thin union on the SHIPPED lifecycle
seam, reusing `--ease-cartoon-punch` + `--motion-weight` + `.glass-reveal`/`useLiquidFlex` +
the AX.W16 two-detector park discipline. The substrate stays the single-bootstrap home
(`proof:gpu-substrate-single` clause A); the picker stays the one fall-decision; the
backend handle stays byte-identical across WebGPU/WebGL2 so every consumer's wiring is
untouched.

**Convergence estimate for THIS lens: ~70%** — the substrate is fit (H5 validates the spine),
but THREE live wounds (H1 acquire-margin, H2 size-race, H3 born-skipped-trap) are real and
born-RED reproducible on this host, and the reveal-bloom re-invention is the bold,
high-value, low-risk union the synth should carry forward.
