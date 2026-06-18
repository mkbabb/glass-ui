# BC viz-codebase — the CURRENT state of every procedural viz in src/ (deep codebase audit)

**Assignment:** map the actual HEAD state of every viz (aurora, goo-blob, constellation, fourier-field, dot-flow-field, concentric, paper-grid/grid-bg) — files, substrate, interaction wiring, known breakages — against USER-DEFECTS §E + DEFECT-LEDGER D7/D8/D9 + the SOTA targets in `research/procedural-refs.md`. Every finding is grounded to a `file:line` or a measured value. Maps to BC Band 4.

---

## 0 — THE KEYSTONE BUG: the substrate picker crashes ungracefully on adapter-less hosts (D8 root, GROUNDED)

**`src/composables/glass/webgpu/useGpuSubstrate.ts:91`** is the single line that breaks every WebGPU-first viz on a real host:

```ts
const useGpu = supportsWebGPU() && options.setupWGPU != null;
```

`supportsWebGPU()` (`useWebGPUCanvas.ts:50-56`) is a **synchronous PRESENCE check** — `typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null`. It NEVER calls `requestAdapter()`. So the backend is **committed at construction** (line 91, "The decision is made ONCE at construction"). When `navigator.gpu` exists but `requestAdapter()` returns null (headless, SwiftShader, GPU-blocklisted, some VMs, a busy/locked-down host), the picker has ALREADY committed WebGPU, then `armAsync()` reaches `useWebGPUCanvas.ts:243-245`:

```ts
const adapter = await navigator.gpu.requestAdapter(options.adapterOptions);
if (!adapter) {
    throw new Error("[useWebGPUCanvas] no GPU adapter");   // line 245
}
```

and THROWS — with NO fallback to WebGL2, because the backend was committed synchronously. **This is the literal `no GPU adapter` PAGEERROR the BC audit observed on blob / dot-flow / concentric.** WebGPU "present" ≠ adapter available — the presence check IS the bug.

**The four viz on `createGpuSubstrate` (all inherit the bug):**
- `goo-blob` — `useMetaballRenderer.ts:286` (`createGpuSubstrate(canvas, {...})`), armed via `void canvasHandle.armAsync()` at line 343.
- `aurora` — `runtime.ts:222` (`createGpuSubstrate(canvas, {...})`), armed via `armRuntime()` → `canvasHandle.armAsync()` at line 405-410.
- `dot-flow-field` — `useDotFlowField.ts:68` (`createGpuSubstrate`), with a Canvas2D fallback.
- `concentric` — `useConcentric.ts:65` (`createGpuSubstrate`), with a WebGL2-GLSL fallback.

**The lifecycle core itself is sound** (`createCanvasLifecycle.ts`) — the demand-gate, the three-reason suspend Set, the offscreen-park, the live-PRM re-monitor, the `device.lost` self-heal are all correct. The bug is exclusively the PICKER's synchronous presence-commit.

**The FIX (cited SOTA, `research/procedural-refs.md` §0):** the backend choice must be ASYNC + adapter-real. Two correct shapes:
1. **Async probe before commit** — `supportsWebGPUReal()` = `navigator.gpu != null && (await navigator.gpu.requestAdapter()) != null` (cache one probe per page); the picker awaits it before choosing.
2. **Try-WebGPU-then-rebuild-WebGL2** — attempt `armAsync()` inside a `try`; on ANY init failure (no adapter, device-lost-at-birth, validation throw) silently dispose + rebuild on the WebGL2/Canvas2D leaf. This is the more robust shape (catches a device that creates then immediately loses).

The "structural-proxy ΔE-0.0 parity" `proof:gpu-substrate-single` claimed only proved the SAME CPU evaluator matches itself — it NEVER proved the WGSL path paints on a real WebGPU host OR that the fallback fires on an adapter-less one. The BC gate must measure **real on-host meanLum > 0 per viz on BOTH an adapter-less host (the fallback fires) AND a WebGPU host (the primary paints)**.

**The no-fallback reconciliation (the user's "NO FALLBACKS. EVER." vs reality):** WebGPU is Baseline since Jan-2026 (Safari 26+ ships it). So WebGPU is the PRIMARY everywhere; the WebGL2/Canvas2D fallback is the INVISIBLE don't-crash-to-black safety net that fires ONLY when `requestAdapter()` genuinely returns null (the software/headless/old-device tail). The user's intent — "WebGPU everywhere as long as it works on Safari" — is satisfied; the fallback never shows as a "downgrade," it just paints. **But the user ALSO says "no canvas anywhere"** — see §4 (three viz fallbacks are Canvas2D, which IS a canvas violation).

---

## 1 — AURORA — `src/components/custom/aurora/` (30 files; the painterly GL background)

**Substrate:** WebGPU-first via `createGpuSubstrate` (`runtime.ts:222`) — the `aurora.wgsl` primary OR the `aurora.frag` WebGL2 fallback. Inherits the §0 picker bug.

**Files (the cohesive seams):** `Aurora.vue` (the SFC + placeholder cross-fade) · `composables/runtime.ts` (the GL-lifecycle orchestrator, 453 lines) · `composables/useAurora.ts` (the Vue wrapper + deferred-arm scheduler) · `composables/glSetup.ts` / `uniformBridge.ts` / `cursorModel.ts` / `frameLoop.ts` (the WebGL2 seams) · `composables/wgpuSetup.ts` / `uniformBridgeWGPU.ts` (the WGSL seams) · `constants/renderMode.ts` (the adaptive-substrate resolver) · `constants/shaders/aurora.frag.ts` (430 lines, WebGL2 — full painterly) · `aurora.wgsl.ts` (345 lines, WebGPU — SMOOTH CORE ONLY) · `mediums.glsl.ts` (495) / `oil-modes.glsl.ts` (112) / `vangogh-medium.glsl.ts` (258) / `brush.glsl.ts` / `flow.glsl.ts` (95) / `tonemap.glsl.ts` / `composition.glsl.ts` (the WebGL2 medium bodies).

**Interaction wiring:** cursor-attraction via `cursorModel.ts` (`createCursorState` + `advanceCursor`) + `injectCursorVelocity` (`runtime.ts:362`, a PRM-gated velocity-reactive flow write-path). It is the closest thing to the shared velocity model but it is aurora-LOCAL, not `usePointerVelocityField`. **The aurora demo story (`demo/stories/substrates/aurora.vue`) does NOT wire `useCursorInteraction`/`injectCursorVelocity`/`setCursor`** (grep empty) — so the velocity-reactive flow is dead in the demo even though the runtime supports it.

### KNOWN BREAKAGES

- **D9' root (the BLACK VOID on the user's real Chrome): `renderMode:"auto"` collapses to a STATIC "css" placeholder.** `Aurora.vue:106` resolves `resolveRenderMode("auto", ...)`, and `renderMode.ts:121-160` returns `"css"` (the static `paletteToCssGradient`/`auroraFallbackGround` placeholder, NO WebGL arm — `useAurora.ts:256` `if (cssOnly) return`) when ANY low-power signal is present: **`navigator.hardwareConcurrency <= 4`** (line 146-147) OR `prefers-reduced-motion: reduce` OR `connection.saveData`. On a user Chrome with ≤4 logical cores (or a throttled/battery-saver session), aurora renders a STATIC gradient and never animates — the "renders SLOW / dark dead cards" the user reports. The `"css"` placeholder is a flat `linear-gradient(135deg, …)` whose mean luminance can diverge from the real composite. This is a real, common-host downgrade, NOT a true crash — but it reads as broken.
- **The WGSL primary is SMOOTH-ONLY — the painterly register silently vanishes on WebGPU hosts.** `aurora.wgsl.ts` (header lines 14-18, 320-322): "The PAINTERLY mediums (uMedium 1-6: pastel/watercolor/oil/crayon/vangogh/oil-pastel) + the brush SDF + the kuwahara are the WebGL2 fallback's register; the WGSL primary renders the smooth core." So on the user's Chrome / Safari 26 (where WebGPU IS present), aurora paints the SMOOTH gradient core and the van-Gogh / oil / kuwahara mediums are LOST. The painterly look only appears on the WebGL2 fallback (the ~5-10% tail) — the inverse of intended. `aurora.frag.ts:400-401` carries the full `if (uMedium == 1) mediumPastel...` dispatch; `aurora.wgsl.ts` has none.
- **D8 (the adapter-less crash):** inherits §0. On a no-adapter host the picker commits WebGPU and `armAsync` throws `no GPU adapter` — but aurora's `armRuntime()` (`runtime.ts:405-410`) catches it into `onInitError` and the placeholder stays, so aurora degrades to the static gradient rather than crashing the page. Less fatal than blob (which has no placeholder), but still no live field.
- **The WGSL path drops `contextAttrs`.** `runtime.ts:224` passes `contextAttrs:{preserveDrawingBuffer,...}` but those are WebGL2-only; on the WebGPU path the `preserveDrawingBuffer` capture attr is silently ignored — a capture/thumbnail consumer on a WebGPU host gets an empty readback.

### BC SCOPE (first-principles vs robustness)
The aurora MATH is sound (the §0 finding stands: the architecture is sound, robustness is the gap). BC scope: (a) fix the picker (§0); (b) decide the `renderMode:"auto"` low-power gate — under WebGPU-everywhere the `hardwareConcurrency<=4` heuristic is the wrong signal (a 4-core M-series laptop has a fine GPU); the gate should probe the adapter, not the core count, OR be removed entirely now WebGPU is the path; (c) the painterly-medium WGSL port (the booked `W-AURORA-WGPU-MEDIUMS`) so the WebGPU primary carries the full register — otherwise the user's Chrome only ever sees the smooth core. Cross-ref D9'/§E ("aurora TOTALLY broken, renders SLOW; previews NEVER render").

---

## 2 — GOO-BLOB — `src/components/custom/goo-blob/` (the metaball droplet)

**Substrate:** WebGPU-first via `createGpuSubstrate` (`useMetaballRenderer.ts:286`) — `metaball.wgsl` (483 lines) primary OR `metaball.frag.ts` (417) WebGL2 fallback. Inherits the §0 picker bug — **this is the viz that threw the literal `no GPU adapter` PAGEERROR in the audit.**

**Files:** `GooBlob.vue` (the SFC) · `composables/useMetaballRenderer.ts` (the renderer, 384 lines — the SHARED `resolveFrame` simulation advance + the WebGL2 `drawFrame` + the WGSL `frame`) · `useBlobMood.ts` / `useBlobPointer.ts` / `useBlobSatellites.ts` (the simulation systems) · `uploadBlobUniforms.ts` (WebGL2 upload) · `uniformBridgeWGPU.ts` + `wgpuSetup.ts` (WGSL) · `buildMetaballProgram.ts` (WebGL2 program) · `shaders/sdf-body.glsl.ts` (91 lines, the SDF metaball core) · `metaball.frag.ts` / `metaball.wgsl.ts` / `oklch-perturb.glsl.ts` / `watercolor-edges.glsl.ts`.

**The MATH is already SOTA (no rebuild warranted).** `sdf-body.glsl.ts:1-91`:
- IQ-2024 NORMALIZED smin (`sminQuadratic` line 41 + `sminCircular` line 50, `uSmoothK` a real distance-unit blend band, the `k *= 4.0` pre-scale at line 42).
- The ANALYTIC-gradient normal (`sdgCircle` line 31 returns `vec3(d, grad.xy)`; `sminG` line 88 propagates the gradient through the merge — no per-pixel 4-tap finite-difference). This is correct, performant, first-principles metaball SDF.
- Two merge variants config-gated on `uMerge` (quadratic creased / circular wet-fillet).

**Interaction wiring:** `useBlobPointer.ts` is the blob's OWN pointer model — `pointermove` listener (line 95) → smoothed `pointer` position + a spring `velocity` ref (line 37) + a decaying `trail`, fed via `tickDt(dtMs)` by the substrate's single rAF (NO own rAF). It exposes velocity but NOT acceleration, and it is NOT the shared `usePointerVelocityField` (the §0/§8 consumer-bar finding). `GooBlob.vue:183` watches `pointer.active` → `renderer.wake()` (BA.W-GOO-REDRESS, the first-hover-after-park same-frame repaint).

### KNOWN BREAKAGES

- **D8 (the headline "does not render at all"): inherits §0.** On the user's adapter-less Chrome the picker commits WebGPU, `armAsync` throws `no GPU adapter`, and the blob has NO placeholder fallback (unlike aurora) → pure black. This is the user's "TOTALLY broken — does not meatball, does not render at all."
- **D7 (Safari `fwidth` + context-loss flash): the two derivative sites.** `metaball.frag.ts:266` (`float aa = max(fwidth(d), 1e-6)` — the AA-edge half-width) + `:364` (`float nVar = length(fwidth(N))` — the Toksvig normal-variance spec-clamp) are the "most rasterizer-drift-prone lines." Both are mirrored to WGSL (`metaball.wgsl.ts:397, 450`). WebKit is stricter about `precision highp float` derivatives + context-loss churn (the "rapidly FLASHES" = WebGL context lost + re-arm storm). Fix: prefer the WebGPU primary on Safari 26 (Metal — no `fwidth`-derivative variance), explicit `precision highp float` (present), a robust `webglcontextlost`/`restored` lifecycle that re-arms ONCE not a churn loop. The analytic-gradient normal (no 4-tap) already reduces derivative sensitivity — keep it.
- **The "meatball" merge is intact in source** — the breakage is the substrate not arming, NOT the smin. With GPU flags the audit measured blob meanLum 228/chroma 110 (it paints). The user never SAW the merge because the substrate crashed to black on their host.

### BC SCOPE
NOT a first-principles math rebuild. Fix: (a) the picker (§0) so it paints on every host incl. the user's; (b) the Safari context lifecycle (D7); (c) the dot-matrix + goo+dot-matrix hybrid VARIANTS the user wants (`research/procedural-refs.md` §1/§6 — Fibonacci phyllotaxis dot-sphere + Bayer-dithered SDF field, both NEW siblings); (d) wire the shared `usePointerVelocityField` (the velocity+accel ask) OR fold `useBlobPointer` onto it. Cross-ref §E ("the blob is TOTALLY broken — does not meatball; a dot-matrix goo-blob variant is wanted").

---

## 3 — CONSTELLATION — `src/components/custom/constellation/` (the proximity-graph lattice)

**Substrate:** **Canvas2D via `useCanvas2D`** (`useConstellation.ts:15, 187`) — the ONLY viz NOT on a GPU substrate. This is the user's GAP: "the circles are supremely LOW-RES. Totally redesign to WebGPU — NO canvas anywhere."

**Files:** `Constellation.vue` (the SFC) · `composables/useConstellation.ts` (the orchestrator, 448 lines) · `createConstellationField.ts` / `useConstellationPointer.ts` · `constellationField.ts` (the seed/step/refit math) · `constellationDraw.ts` (the Canvas2D draw passes) · `constellationInteraction.ts` · `constellationTypes.ts` · `constants.ts`.

**The "supremely LOW-RES circles" root, GROUNDED:** `constellationDraw.ts:163` draws each node as a Canvas2D `ctx.arc(p.x, p.y, p.r * kVis, 0, Math.PI*2); ctx.fill()` — a CPU-rasterized filled circle. Edges are `ctx.beginPath/moveTo/lineTo/stroke` (line 136-139). The DPR is clamped to 2 (`useConstellation.ts:207-212`), but Canvas2D `arc()` circles still read soft/aliased vs a GPU instanced-point with a crisp SDF disc. There is no anti-aliased disc shader, no DPR-scaled point sprite — just `arc()` fills. The "low-res" is the Canvas2D rasterizer + the lack of a GPU disc primitive.

**Interaction wiring:** rich — `useConstellationPointer.ts` wires ripple-steer + click-warp + held gravity-well, all PRM/capture-gated. A warp spring (`warpTo`), a gravity well (`holdWellAt`/`releaseWell`), node pinning (`pinNode`). The interaction is the MOST developed of any viz — but it's all Canvas2D.

### KNOWN BREAKAGES

- **Not WebGPU (the user's explicit "totally redesign to WebGPU — NO canvas anywhere").** Canvas2D `arc()` circles → GPU instanced points + line-list. The points → DPR-aware instanced billboards with a crisp SDF-AA disc (no `arc()`), the edges → a GPU line-list, all on `createGpuSubstrate` (WebGPU primary + a WebGL2 fallback). This is the cleanest WebGPU re-home of the suite (points + edges are a natural instanced-points + line-list render).
- **Not in a card (page-chassis defect, Band 5 overlap).** `demo/stories/manifest.ts:262` declares `background: "constellation"` (full-page field). The user: "not in a card → every page reuses the giant-hero-text-shrinks-on-scroll + body-in-a-card idiom." This is a page-chassis concern (Band 5) but the constellation viz must support being CONTAINED (it already is host-sized — `Constellation.vue:61` `.constellation` host).

### BC SCOPE
First-principles WebGPU re-home: instanced points (SDF-AA disc, DPR-aware) + line-list edges, KEEP the rich field/warp/well/pin interaction math (transcribe `constellationField.ts` to drive the GPU buffers), on `createGpuSubstrate`. Cross-ref §E ("constellation: broken; circles supremely LOW-RES; totally redesign to WebGPU — NO canvas").

---

## 4 — DOT-FLOW-FIELD — `src/components/custom/dot-flow-field/` (the curl-noise wave field)

**Substrate:** WebGPU-first via `createGpuSubstrate` (`useDotFlowField.ts:68`) — the `flow-field.compute.wgsl` (`@compute @workgroup_size(64)` advection) + `flow-field.render.wgsl` (instanced billboards) primary, **with a Canvas2D `ctx.arc` point-cloud fallback** (`flow-field.glsl.ts` — the "GLSL" name is a colocation marker; the actual fallback is `useCanvas2D`, `useFlowParticles.ts:13-16`). Inherits the §0 picker bug (this threw `no GPU adapter` in the audit) — AND the fallback is a canvas (the "no canvas" violation).

**Files:** `DotFlowField.vue` · `composables/flowField.ts` (229 lines, the analytic ∇⊥ψ evaluator — the SINGLE math source) · `composables/useDotFlowField.ts` (the lifecycle wiring + picker) · `composables/useFlowParticles.ts` (the WGPU compute+render setup + the Canvas2D stepper) · `uniformBridgeWGPU.ts` · `constants.ts` (the default config) · `shaders/flow-field.compute.wgsl.ts` / `flow-field.render.wgsl.ts` / `flow-field.glsl.ts` (the Canvas2D stepper).

**The MATH is correct + cited** (`flowField.ts:1-229`): Tessendorf sum-of-sines wave potential `h(p,t)=ΣA_i·sin(k_i·(D_i·p)−ω_i·t+φ_i)`, `ω_i=√(g·k_i)` deep-water dispersion (`gerstnerVelocity` line 81), divergence-free flow `v=∇⊥h` (line 102), Bridson curl-noise braiding via the shared `curlFBM` (line 169-200). **The defect is the PARAMETERIZATION — it reads as NOISE, not waves.** Grounded over-tunings (`constants.ts:69-84` + `flowField.ts:208-229`) vs the SOTA targets (GPUGems Ch1, `research/procedural-refs.md` §2):

| param | CURRENT (file:line) | TARGET (cited) | why current = noise |
|---|---|---|---|
| octaves | **6** (`constants.ts:69` `buildWaveLadder(35,6)`) | **3-4** | GPUGems: "we limit ourselves to four geometric waves." 6 = noise. |
| wavelength span | **`2.4·0.62^i`** (`flowField.ts:214,226`) → 2.4 down to ~0.21 = **~11:1** | **2:1** (median·{0.5,0.75,1,1.5}) | GPUGems: "half-to-double the median." 11:1 is the fine-octave noise. |
| curlStrength | **0.6** (`constants.ts:77`) | **0.10-0.18** | curl-fbm braiding at 0.6 DOMINATES the clean Gerstner sweep → chaos. The curl is a WHISPER. |
| dotSize | **2.4** (`constants.ts:78`) | **4-6** | tiny dots + dense flow = visual noise. |
| particleCount | **4000** (`constants.ts:25,73`) | **1500-2500** | fewer, larger, longer streamlines read as sweeping. |
| directional spread | **`18 + i·9°`** (`flowField.ts:219`) → ±63° by octave 6 | **±25-35°** | wide spread = braided delta, not coherent sweeping bands. |

**Interaction wiring:** `interactive: false` by default (`constants.ts:82`). NO `usePointerVelocityField` (§8). The demo story does not pass `:interactive`. The velocity+accel ask is dead here.

### KNOWN BREAKAGES
- **"Absolutely awful — a mess of NOISE" (D-ledger §E):** the 6 over-tunings above. The math source (`sampleVelocity`) stays; only the wave ladder + 4 scalars retune to the cited target.
- **D8: inherits §0** (the `no GPU adapter` throw).
- **The fallback is Canvas2D** (a `ctx.arc` point cloud, `flow-field.glsl.ts`) — violates "no canvas anywhere." Under WebGPU-everywhere this fallback should be a WebGL2 transform-feedback path (or the picker's adapter-real probe means the fallback rarely fires — but it is STILL a canvas when it does).
- **teal-on-navy** (`demo/stories/substrates/presets.ts:19-24`, `FLOW_PRESET_REFERENCE`) — the library default IS warm-cream (`WARM_IDENTITY_PALETTE`, `constants.ts:61-66`), but the DEMO preset reproduces teal-on-navy. The user: "REMOVE the teal-on-navy reference entirely." The demo preset must drop teal-on-navy (retint warm-cream/dark-warm), never delete the viz. The reference image (Claude co-work) is SUBTLE fine-dot spheres on dark — the dot-flow should be retuned to subtle sweeping waves, NOT a teal flow.

### BC SCOPE
Retune the 6 params (the math is sound) + drop teal-on-navy + wire velocity/accel + decide the canvas fallback. Cross-ref §E.

---

## 5 — CONCENTRIC — `src/components/custom/concentric/` (the radial-Fourier ring field)

**Substrate:** WebGPU-first via `createGpuSubstrate` (`useConcentric.ts:65`) — `concentric.wgsl` primary + `concentric.glsl.ts` (a true WebGL2 GLSL fallback, NOT Canvas2D — the only viz with a genuine WebGL2 fallback). Inherits the §0 picker bug.

**Files:** `Concentric.vue` · `composables/useConcentric.ts` · `concentricGLSetup.ts` / `concentricWGPUSetup.ts` · `composables/ringField.ts` (the math) · `uniformBridgeWGPU.ts` · `constants.ts` · `shaders/concentric.glsl.ts` (120 lines, WebGL2) / `concentric.wgsl.ts` (WebGPU).

**The "noise-not-lines" root, GROUNDED** (`concentric.glsl.ts:106-118`): the shader evaluates `sampleRingField(p,t)` (the multi-center ellipsoidal radial sum-of-sines — CORRECT, line 70-88) then at line 109-111 maps the field VALUE through `samplePaletteLin(v)` — a **smooth continuous color FILL**, NOT distinct LINES. That's why it reads as a blurry interference blob instead of crisp ellipsoid rings. The ellipsoid math (`ellipsoidalRadius` line 63-67, `axisRatio:[1,0.62]` `constants.ts:75`) and 2-center interference (`DEFAULT_CENTERS` line 66) are already correct — only the RENDER is fill-not-line.

**The TARGET technique** (`research/procedural-refs.md` §3 — Shadertoy/Codrops/numb3r23 fwidth iso-contour):
```glsl
float field = sampleRingField(p, t);
float lines = abs(fract(field * N) - 0.5);   // triangle wave: 0 at iso-line
float w     = fwidth(field * N);              // pixel footprint → resolution-independent AA
float ring  = 1.0 - smoothstep(w, w*2.0, lines*2.0);  // crisp ~1px AA ring stroke
// color the line stroke a single warm-amber on transparent; DROP the 3-stop fill
```
- `N` = ring count, ≈6-10 (current `ringCount` = `buildRingLadder(5)`, `constants.ts:63` → **5, target 6-10** for distinct rings).
- `fwidth`-driven width = always-sharp 1px lines at any zoom.
- KEEP the 2-center interference (moiré beats) but render each family as LINES not fill.

**Interaction wiring:** NO pointer handler at all (`Concentric.vue:69` only exposes `wake`; no `@pointer`/click; `interactive:false` default `constants.ts:79`). The `constants.ts:41` comment says "Pointer adds a transient ring center" but it's not wired. NO `usePointerVelocityField` (§8).

### KNOWN BREAKAGES
- **"Awful → must display concentric ELLIPSOID LINES that form distinct WAVES (not noise)":** the fill-not-line render (line 109-111). Replace the `samplePaletteLin(v)` fill with the `abs(fract)+fwidth` iso-contour stroke; bump ringCount 5→6-10; single warm-amber stroke. Pure fragment-field change (no compute, no particles) so the GLSL + WGSL twins both get the same line extraction — clean parity.
- **D8: inherits §0.**
- **teal demo preset** (`presets.ts:54-58`, the cool aurora-teal ring ramp) — the "WTF is this blue" stray + the teal-on-navy purge applies here too (the demo themes the rings teal; the library default is warm-cream). The user: "WTF is this blue."

### BC SCOPE
The line-extraction render change + ringCount bump + drop the teal/blue demo theme + wire interaction. Cross-ref §E ("concentric awful → ellipsoid LINES forming distinct WAVES"; "WTF is this blue").

---

## 6 — FOURIER — `src/components/custom/fourier-field/` + the DUPLICATE views (the user's "ONE view")

**Substrate:** **Canvas2D via `useCanvas2D`** (`useFourierField.ts:2, 237`) — another canvas (the "no canvas" violation). NOT on a GPU substrate.

**Files:** `FourierField.vue` · `composables/useFourierField.ts` (the renderer) · `math.ts` (the inverse-DFT) · `presets.ts` · `constants.ts`.

**The DUPLICATION (the user's "totally duplicative — several fourier views → ONE view"), GROUNDED in `demo/stories/manifest.ts`:** THREE Fourier surfaces:
1. **`fourier-field`** (`manifest.ts:272`) — the ambient reconstructing elliptic Fourier curve on Canvas2D (`background: "fourier"`).
2. **`fourier-studio`** (`manifest.ts:289`) — the FOREGROUND configurator studio over a Canvas2D stage (the partial-sum N slider + epicycles + shape-trace + clock transport).
3. **`concentric`** (`manifest.ts:349`) — described as "a WebGPU-first **radial Fourier** ring-interference field" (the SAME Fourier-series vocabulary).

So there are THREE routes all teaching Fourier (two Canvas2D, one WebGPU). The user wants ONE view. The cleanest collapse: keep `concentric` as the radial-Fourier visual register (it's already WebGPU-first), and collapse `fourier-field` + `fourier-studio` into ONE foreground studio view (the studio IS the field + the configurator — the ambient `fourier-field` is redundant with the studio's own stage). OR keep the epicycle studio as the single Fourier surface and retire the ambient field. This is a DEMO-MANIFEST + page-chassis decision (Band 4 + Band 5), not a viz-math change.

**Interaction:** `FourierField.vue:89` only sets `pointer-events: none` — no interaction.

### BC SCOPE
Collapse the three Fourier routes to ONE (the studio is the natural keeper); decide fourier-field substrate (Canvas2D → WebGPU if it survives, or retire). The math (`math.ts` inverse-DFT) is sound. Cross-ref §E ("FOURIER: totally duplicative — several fourier views → ONE view").

---

## 7 — PAPER-GRID / GRID-BG — the two parallel static grid systems (the user's "blurry mess → SIMPLE grid + liquid wave")

There are **TWO independent grid systems**, both static CSS `background-image` gradients (no shader, no wave), both "oddly spaced" per the user:

1. **`--paper-grid-*`** (`src/styles/tokens/scale-paper.css:118-134`) — the CARD grid: `--paper-grid-texture-size: 32px` minor + 128px major (×4), `--paper-grid-opacity: 0.08`, color a `color-mix` of `--foreground`. Painted on a card's HOST `background-image` (the `paper-texture` utility). Static 4-gradient stack.
2. **`--story-grid-*`** (`demo/stories/story-hero.css:14-16, 283-298`) — the StoryHero PAGE-bg grid (`story-bg-grid`): `--story-grid-size: 28px`, `--story-grid-color` 7% / `--story-grid-color-strong` 12% (dark: 18%/30%), a 4-gradient stack (minor + ×4 major). Static.

**The user's TWO distinct asks** (USER-DEFECTS §E):
- **(a) "the new grid background is a BLURRY MESS → TOTALLY ABROGATE it. It's a SIMPLE grid — like in keyframes.js. Oddly spaced → consistent + larger, and NOT in the card."** The keyframes.js reference is a clean two-tier graph paper grid (fine 1rem + major 5rem at 3%/11%). glass-ui's 32px/28px sizes + the 0.08/0.07 opacities read "oddly spaced"/blurry. TARGET: re-express as the clean 1rem fine + 5rem major at 3%/11%, evenly spaced, rem-relative.
- **(b) "the PAPER GRID procedural: a mess → evenly spaced + LARGER; the grid LINES must morph + wave in a liquid way; suffuse it site-wide as a subtle background."** Static CSS gradients CANNOT wave — the liquid grid is a SHADER (UV-warp of grid lines via the shared `curlFBM` operator, `research/procedural-refs.md` §4): sample a procedural grid `aa-line(fract(uv·spacing))` warped by `uv += A·curlFBM(uv·freq + t·speed)`, amplitude tiny (`A≈0.01-0.03` of viewport) for a subtle breathe. This is the BOOKED #2 `curlFBM` consumer ("paper-grid-breathe"). Suffuse it site-wide (low opacity, behind content, NOT in a card).

### BC SCOPE
Two waves: (a) abrogate the blurry static grid → the SIMPLE evenly-spaced keyframes.js-style grid (1rem/5rem, 3%/11%, NOT in card); (b) the OPT-IN liquid-wave grid shader (curlFBM UV-warp, subtle, site-wide) — a NEW procedural viz consuming the shared `curlFBM` (satisfies its ≥3-consumer bar). Cross-ref §E (both grid asks).

---

## 8 — CROSS-CUTTING: the velocity/accel interaction bar is UNMET (a gate-paint-blindness defect)

**`usePointerVelocityField`** (`src/composables/motion/usePointerVelocityField.ts`) is published on `/motion-core` + the root barrel + `/api`, minted EARLY (BB.B4) explicitly so "the born-WebGPU viz W-FLOWFIELD + W-CONCENTRIC consume it at birth." **But it has ZERO real consumers:**

```
$ rg -n 'usePointerVelocityField' src/components/custom/dot-flow-field/   → EMPTY
$ rg -n 'usePointerVelocityField' src/components/custom/concentric/       → EMPTY
$ rg -ln 'usePointerVelocityField' src/ demo/  → ONLY src/index.ts, the leaf, /motion-core/index.ts, /api/index.ts (barrels)
```

The ≥2-binary-consumer bar (J-inv-10 / L-inv-8) is UNMET. The consumer-evidence doc (`docs/consumer-evidence/use-pointer-velocity-field.md`) explicitly states: "Once W-FLOWFIELD + W-CONCENTRIC land, the booked proof greps above MUST find the binary consumers; if neither viz materializes, the composable retires." **The greps find nothing — yet `proof:pointer-velocity` is GREEN.**

**The gate is blind by design:** `proof-pointer-velocity.mjs:226-241` — V5 passes if `evidenceExists && evidenceNamesBooked && evidenceHasReaudit` (the DOC names W-FLOWFIELD/W-CONCENTRIC + has a "re-audit"/"retire" clause). It NEVER runs the `rg src/components/custom/dot-flow-field/` grep the doc promises. So the gate greens off the doc PROSE while the actual viz never wired the field. This is the EXACT gate-paint-blindness / source-green-visually-broken class the BC mandate names. (`liveConsumers` is computed but the OR makes the doc-clause sufficient.)

**The viz pointer-interaction state at HEAD:**
- aurora — own `cursorModel` + `injectCursorVelocity` (velocity yes, accel no; not the shared field; demo doesn't wire it).
- goo-blob — own `useBlobPointer` (velocity yes via spring, accel no; not the shared field).
- constellation — own rich ripple/warp/well (Canvas2D; not the shared field).
- dot-flow-field — `interactive:false`, no pointer wiring, no shared field.
- concentric — NO pointer handler at all.
- fourier-field — `pointer-events:none`.

**The user's ask (BC.W-VIZ-INTERACTION):** "every procedural bg responds to cursor/touch with velocity + acceleration." This is structurally UNMET. BC must either (a) actually wire `usePointerVelocityField` into every viz (the velocity perturbation for flow, the dot-repel for the dot-sphere, the ring-phase warp for concentric, fold aurora/blob's own models onto it), OR (b) the gate must enforce the grep (close the blindness). The cleanest: ONE shared pointer-velocity-accel field consumed by all viz, and the gate verifies the real call sites.

**Also UNMET — BC.W-VIZ-CHOREOGRAPHY (the keyframes.js ONE-clock start/transition/end/restart):** the viz arm/fade-in/park ride ad-hoc `scheduleAfterFirstPaint`/`setTimeout` (`useAurora.ts:81-114`), NOT a keyframes.js `SpringProgress`/timeline. The substrate PRM-parks, but the page-enter reveal / route-leave fade choreography is not on the ONE keyframes clock.

---

## 9 — THE "NO CANVAS ANYWHERE" violations (the user's literal directive)

Under "WebGPU everywhere, NO canvas anywhere," three viz still use Canvas2D:
- **constellation** — `useCanvas2D` as its PRIMARY substrate (`useConstellation.ts:187`). The biggest violation — it's never on a GPU path.
- **fourier-field** — `useCanvas2D` as its PRIMARY (`useFourierField.ts:237`).
- **dot-flow-field** — `useCanvas2D` as its FALLBACK (`useFlowParticles.ts:13-16`, `flow-field.glsl.ts` is a Canvas2D stepper despite the `.glsl.ts` name).

Concentric's fallback IS a real WebGL2 GLSL path (`concentric.glsl.ts`) — the only honest non-canvas fallback. aurora's fallback is the WebGL2 `aurora.frag` (also honest) plus the static `"css"` placeholder. goo-blob's fallback is WebGL2 `metaball.frag` (honest).

Under WebGPU-everywhere (Safari 26+ ships it), the fallbacks rarely fire IF the picker probes the adapter correctly (§0). But the user's "no canvas" means: constellation + fourier-field must move OFF Canvas2D as their primary (→ WebGPU instanced points/lines for constellation, → a WebGPU/WebGL2 path or retirement for fourier-field).

---

## 10 — SUMMARY TABLE: per-viz current state + BC scope

| viz | files | substrate (HEAD) | interaction | KNOWN BREAKAGE (grounded) | BC scope |
|---|---|---|---|---|---|
| **aurora** | 30 (Aurora.vue, runtime.ts, useAurora.ts, +shaders) | WebGPU-first (`runtime.ts:222`) + WebGL2 + static "css" | own cursorModel + injectCursorVelocity (demo unwired) | renderMode:"auto"→static "css" on hwConcurrency≤4 (D9' black void); WGSL is SMOOTH-ONLY (painterly lost on WebGPU); §0 picker | fix picker; remove/adapter-probe the low-power gate; port painterly WGSL mediums |
| **goo-blob** | 22 (GooBlob.vue, useMetaballRenderer.ts, sdf-body.glsl.ts) | WebGPU-first (`useMetaballRenderer.ts:286`) + WebGL2 | own useBlobPointer (velocity, no accel) | §0 picker → `no GPU adapter` → pure black (no placeholder); D7 Safari fwidth flash | fix picker; Safari ctx lifecycle; dot-matrix + goo+dot hybrid variants; shared velocity field |
| **constellation** | 11 (Constellation.vue, useConstellation.ts, constellationDraw.ts) | **Canvas2D** (`useConstellation.ts:187`) | rich ripple/warp/well/pin | low-res `ctx.arc()` circles (`constellationDraw.ts:163`); NOT WebGPU; NO canvas | first-principles WebGPU re-home (instanced SDF-disc points + line edges); keep field math |
| **fourier-field** | 5 (FourierField.vue, math.ts) | **Canvas2D** (`useFourierField.ts:237`) | pointer-events:none | DUPLICATE (3 Fourier routes); Canvas2D | collapse 3 Fourier→1; decide substrate/retire |
| **dot-flow-field** | 11 (DotFlowField.vue, flowField.ts, constants.ts) | WebGPU-first (`useDotFlowField.ts:68`) + Canvas2D fallback | interactive:false (unwired) | noise-not-waves (6 over-tunings, `constants.ts:69-84`); §0 picker; Canvas2D fallback; teal-on-navy | retune 6 params; drop teal; wire velocity/accel; fix canvas fallback |
| **concentric** | 11 (Concentric.vue, ringField.ts, concentric.glsl.ts) | WebGPU-first (`useConcentric.ts:65`) + WebGL2 GLSL | NO pointer handler | noise-not-lines (smooth FILL not iso-LINES, `concentric.glsl.ts:109-111`); ringCount 5→6-10; §0; "blue" theme | iso-contour line render (abs(fract)+fwidth); ringCount bump; drop blue; wire interaction |
| **paper-grid** | scale-paper.css (`--paper-grid-*` 32px) | static CSS | none | blurry/oddly-spaced; no wave | SIMPLE keyframes.js grid (1rem/5rem 3%/11%) OR liquid-wave shader (curlFBM UV-warp) |
| **story-grid** | story-hero.css (`--story-grid-*` 28px) | static CSS | none | blurry; in-card on grid pages; no wave | abrogate → simple grid, not in card |
| **substrate picker** | useGpuSubstrate.ts:91, useWebGPUCanvas.ts:50,243 | — | — | sync presence-commit, no async adapter probe, no try-rebuild → `no GPU adapter` crash (D8 keystone) | async adapter-real probe OR try-WebGPU-then-rebuild |
| **usePointerVelocityField** | composables/motion/ (published) | — | — | ZERO consumers; proof:pointer-velocity V5 greens off doc-prose not the grep (gate-blind) | wire into all viz OR enforce the grep |

---

## Sources (this codebase audit)
- `src/composables/glass/webgpu/useGpuSubstrate.ts` (the picker bug, line 91)
- `src/composables/glass/webgpu/useWebGPUCanvas.ts` (supportsWebGPU line 50, `no GPU adapter` line 245)
- `src/composables/glass/webgl/createCanvasLifecycle.ts` (the sound lifecycle core)
- `src/components/custom/aurora/composables/runtime.ts` + `useAurora.ts` + `wgpuSetup.ts` + `constants/renderMode.ts`
- `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` (smooth-only) vs `aurora.frag.ts` (full painterly)
- `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` + `shaders/sdf-body.glsl.ts` + `metaball.frag.ts`/`metaball.wgsl.ts` (fwidth sites)
- `src/components/custom/constellation/composables/useConstellation.ts` + `constellationDraw.ts` (Canvas2D arc circles)
- `src/components/custom/dot-flow-field/constants.ts` + `composables/flowField.ts` + `useFlowParticles.ts` (params + canvas fallback)
- `src/components/custom/concentric/shaders/concentric.glsl.ts` (fill-not-line, line 109-111) + `constants.ts` (ringCount 5)
- `src/components/custom/fourier-field/composables/useFourierField.ts` (Canvas2D)
- `src/styles/tokens/scale-paper.css:118-134` + `demo/stories/story-hero.css:14-16,283-298` (the two grids)
- `demo/stories/manifest.ts:233-357` (the substrate route census, 3 Fourier views)
- `demo/stories/substrates/presets.ts` (teal-on-navy demo presets)
- `scripts/proof-pointer-velocity.mjs:226-253` (V5 gate-blind logic)
- `docs/consumer-evidence/use-pointer-velocity-field.md` (the booked-but-unwired consumers)
- `docs/tranches/BC/research/procedural-refs.md` (the SOTA target params)