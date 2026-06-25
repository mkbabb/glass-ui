# GPU-only architecture — the dual-GPU-backend SELECTOR + the Canvas2D/CSS/swraster purge (BD viz-fleet2, the crux)

**Lane** BD viz-fleet2 / architecture · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/composables/glass/webgpu/{useGpuSubstrate,useWebGPUCanvas,webgpuDevice}.ts` · `webgl/{useWebGLCanvas,createCanvasLifecycle}.ts` · `canvas2d/*` · `aurora/constants/renderMode.ts` · `aurora/composables/auroraFallbackGround.ts` · `useGlassRenderer.ts` + its live `GlassPanel.vue`/`DockGooFilter.vue` consumers ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. THIS is the BINDING artifact for the crux GPU-only policy.

> **Supersedes / reconciles** the two viz-arch siblings on the ONE point they DEFERRED. `arch/no-fallback-policy.md` + `arch/gpu-substrate-unify.md` recommended **Reading 2 (keep the try-then-rebuild picker + the swraster guard + auroraFallbackGround on an allowlist)**. The user mandate ("no legacy / architectural-transposition-for-elegance / no-workaround / KISS") and the `VIZ-BAND-PLAN.md §D1` consensus push HARDER: the runtime try-then-rebuild **chain** + the `freshCanvasForFallback` **canvas-clone** are themselves the workaround to eliminate. This doc resolves to the **elegant transposition** (adapter-probe-BEFORE-getContext selector) and OVERTURNS the conscious-keep of the swraster/css ground. Where this contradicts the two siblings, THIS wins — they are correct on the *de-overload* (WebGL2 is a co-equal GPU backend, not a fallback) and on the *delete list*; they were too conservative on the *picker shape* and the *no-GPU floor*.

---

## 0. TL;DR — the two-sentence policy

> **WebGPU and WebGL2 are TWO CO-EQUAL GPU BACKENDS chosen by a SELECTOR — `requestAdapter()` probes FIRST (before any `getContext`), the best GPU backend is picked ONCE, and that single `getContext` arms. There is NO runtime fall-CHAIN, NO canvas-clone, NO Canvas2D, NO CSS/software-raster ground.** A host with no usable GPU adapter is OUT OF SUPPORT for live motion and is served ONE inert non-animated placeholder — that is the honest answer to "no GPU," not a forbidden fallback.

The mandate words — *"WebGPU or WebGL2 — ZERO Canvas2D, NO fallbacks, NO legacy, architectural-transposition for elegance/simplicity, no workarounds, Safari-first"* — resolve EXACTLY here: the `or` permits two GPU backends; "no fallbacks" forbids the CPU tier (Canvas2D + CSS/swraster ground) AND the runtime fall-chain workaround; "Safari-first" mandates the WebGL2 backend (Safari WebGPU is 26+, WebGL2 is universal) so WebGL2 is NOT optional; "no workarounds" kills the `freshCanvasForFallback` canvas-clone.

---

## 1. The de-overload — "no fallbacks" hits FOUR things, binds three (the load-bearing distinction)

The trap is "fallback" as one word. It has FOUR distinct referents in this substrate; the mandate binds three:

| # | "fallback" referent | verdict | why |
|---|---|---|---|
| 1 | **WebGL2-as-backend** (the SAME viz rendered on the GLSL pipeline) | **ALLOWED — a co-equal GPU backend** | both are programmable GPU shader pipelines; OKLab output byte-equivalent (`proof:gpu-substrate-single` ΔE mean≤2.0/p99≤5.0, below the ≈2.3 JND). It is a second *rendering*, not a degraded *tier*. Safari-first MANDATES it. |
| 2 | **the runtime fall-CHAIN** (try-WebGPU → catch → dispose → `freshCanvasForFallback` clone → rebuild-WebGL2) | **FORBIDDEN — the workaround to transpose away** | the chain + the canvas-clone exist ONLY because the picker decides AFTER `getContext("webgpu")` poisons the canvas. A pre-getContext adapter-probe removes the chain entirely (§3). "No workarounds" lands here. |
| 3 | **Canvas2D viz substrate** (`useCanvas2D`, the CPU rasterizer) | **FORBIDDEN — DELETE** | the literal "ZERO Canvas2D"; 0 runtime callers at HEAD. |
| 4 | **the CSS / software-raster no-GPU ground** (`auroraFallbackGround` 2D-raster + the swraster guard + the layered-gradient stack) | **FORBIDDEN as a viz path — PURGE; replace with ONE inert placeholder** | a CPU-rastered "static image of the field" IS a degraded representation; the mandate's "no fallbacks / no legacy" overturns the siblings' conscious-keep. §5. |

**Recording this four-way de-overload IS half the policy.** A future agent reading "no fallbacks" literally would otherwise either (a) rip out the WebGL2 backend (crash Safari + the ~5-10% tail + every headless π to black) or (b) keep the canvas-clone chain (the very workaround). The gate (`proof:gpu-only-spine` G5) machine-locks the de-overload so neither drift is possible.

---

## 2. Squaring "NO fallbacks" with "Safari-absolute" — the resolution

These read as a contradiction only if "WebGL2" is mis-classified as a fallback. The squaring:

- **WebGL2 is a GPU BACKEND, not a fallback.** It runs on the GPU rasterizer; only Canvas2D runs on the CPU. So "WebGL2 for Safari" is not "fall back to a lesser tier" — it is "select the GPU backend Safari ships." Safari WebGPU shipped 26+ (Metal, no flags); WebGL2 is universal (~98%+). A `requestAdapter()`-null Safari (pre-26, or a locked-down config) selects WebGL2 on the SAME GPU. No degrade.
- **The Safari goo fence is co-equal, not a fallback.** The metaball/goo path on Safari uses the regular SVG `feGaussianBlur`+`feColorMatrix` filter in **sRGB** (`color-interpolation-filters="sRGB"` — `DockGooFilter.vue` already speaks this), because Safari's `backdrop-filter` + linearRGB filter chain has the known compositing bug. This is a per-engine CORRECT rendering, not a quality tier.
- **The selector makes both backends FIRST-CLASS.** Picking at init (not falling at runtime) means a Safari host that selects WebGL2 gets a clean WebGL2 arm with zero WebGPU-poison residue — no clone, no rebuild, no thrown-and-caught init. The dual-backend authoring (two `setup` callbacks: `setupWGPU` WGSL + `setupGL` GLSL) STAYS — it is the price of two GPU backends, and it is the Safari-first guarantee. We do NOT collapse to WebGL2-only (would cut the WebGPU SOTA + compute the dot-suite/lava-field want) NOR WebGPU-only (would black-out Safari-pre-26 + the tail + headless).

**Net:** "no fallbacks" and "Safari-absolute" are the SAME statement — pick the best GPU backend per host, no CPU tier beneath. The selector is what makes them one.

---

## 3. The ELEGANT transposition — adapter-probe-BEFORE-getContext, the chain evaporates

### 3a. Why the current picker NEEDS the chain + clone (the workaround root)

The HEAD `createGpuSubstrate` (`webgpu/useGpuSubstrate.ts`) decides the backend by ATTEMPTING WebGPU and catching failure:

1. `armAsync()` calls the WebGPU leaf's `armAsync()` → `acquireDevice()` (`requestAdapter` → `requestDevice`) → `buildContext()` which calls **`canvas.getContext("webgpu")`** → `setup()` → a one-shot validation probe draw.
2. On ANY failure it `catch`es, `dispose()`s the WebGPU leaf, and calls `fallToWebGL2()`.
3. **The poison:** `getContext("webgpu")` already ran in step 1, so the canvas is locked to the `webgpu` context type forever — `getContext("webgl2")` on it returns `null`. Hence `freshCanvasForFallback()` must **clone the canvas, copy its attrs/class/style, and `replaceChild` it in the DOM** so the WebGL2 net can acquire a context.

The `freshCanvasForFallback` clone (≈30 LOC + the DOM-swap correctness burden: aria/layout/ref re-acquisition) + the `fallToWebGL2` rebuild + the dual-leaf `webgpu`/`webgl2` both-held state + the `onBackendFallback` diagnostic + the optimistic-then-actual `backend` field are ALL artifacts of deciding AFTER the poison. They are the workaround.

### 3b. The transposition — select on the adapter, getContext ONCE

The keystone fact (grounded in `webgpuDevice.ts`): **`requestAdapter()` does NOT poison the canvas — only `getContext("webgpu")` does.** And the software-adapter classifier `isSoftwareWebGPUAdapter(adapter)` ALREADY operates on the adapter object, before any context. So the selector lifts the adapter-probe OUT of the leaf and ahead of getContext:

```
selectGpuBackend(options): Promise<"webgpu" | "webgl2" | "none">
  if !navigator.gpu || !options.setupWGPU      → "webgl2"      // no WGSL path / no platform
  adapter = await navigator.gpu.requestAdapter(options.adapterOptions)
  if adapter == null                            → "webgl2"      // headless / blocklisted / pre-26 Safari
  if isSoftwareWebGPUAdapter(adapter)           → "webgl2"      // SwiftShader/llvmpipe → the GL guard's twin
  // (optional: keep the adapter alive + pass it down so requestDevice doesn't re-probe)
  → "webgpu"                                     // a real Metal/Vulkan/D3D adapter

createGpuSubstrate(canvas, options):
  backend = await selectGpuBackend(options)      // the ONE decision, pre-getContext
  if backend == "webgpu"  → leaf = createWebGPUCanvas(canvas, …, preAcquiredAdapter)
  else                    → leaf = createWebGLCanvas(canvas, …)   // canvas UN-POISONED
  leaf.arm()                                     // ONE getContext on this backend, no chain
```

What EVAPORATES (the no-legacy delete — ~120 LOC):
- `freshCanvasForFallback` (the canvas-clone + DOM-swap) — **GONE.** The WebGL2 backend acquires the original, never-poisoned canvas.
- `fallToWebGL2` (the dispose-rebuild-rearm runtime chain) — **GONE.** There is no fall; there is a selection.
- the dual-held `webgpu`/`webgl2` both-non-null state + the `(webgpu ?? webgl2)` delegation fan-out — **collapses to ONE live leaf.**
- the optimistic-then-actual `backend` field semantic — **GONE.** `backend` is resolved BEFORE the leaf is built; it is correct from frame 0.
- `onBackendFallback` (the "the insurance fired" diagnostic) — **GONE / renamed** to a plain `backend`-readout (a SELECTION is not an error-recovery event; if telemetry wants the chosen backend it reads `handle.backend`).

What STAYS:
- the two `setup` callbacks (the two GPU backends — Safari-first).
- `createCanvasLifecycle` BYTE-UNTOUCHED (the schedule core: demand-gate, suspend-Set, offscreen-park, live-PRM, the device-loss self-heal). The selector touches ONLY the picker.
- `isSoftwareWebGPUAdapter` (now the selector's classifier, not the leaf's post-arm reject) — the same software-adapter intelligence, MOVED EARLIER.
- the WebGPU `device.lost` self-heal INSIDE the WebGPU leaf (a real Metal device that TDR-times-out mid-run re-acquires a fresh device on the SAME webgpu context — this is device-restore, NOT a backend switch, so it does not re-introduce a chain).

### 3c. The one honest cost — `createGpuSubstrate` becomes async-only at the seam

The selector's `requestAdapter()` is async and must complete before getContext, so the synchronous `arm()` twin (which today arms the WebGL2 net immediately) cannot pick the backend synchronously. The clean consequence: **the substrate seam is `armAsync()`-only** (a viz `await`s the selection, then the loop runs). The current `arm()` synchronous-paint-without-await affordance retires (clean break) — every viz already calls `armAsync` in its lifecycle wiring; the sync `arm` was a parity convenience, not a load-bearing path. A consumer that must paint a frame before the adapter resolves shows the §5 inert placeholder until `armAsync` resolves (one paint cycle on a real GPU host; the placeholder is the no-GPU floor anyway). This is the SAME async-prelude-before-arm pattern `useCanvas2D` and `useWebGPUCanvas` already own — no new idiom.

---

## 4. The DELETE list — Canvas2D substrate + the dead probe (pure removal, 0 callers)

| path | LOC | reason |
|---|---|---|
| `src/composables/glass/canvas2d/useCanvas2D.ts` | 321 | dead substrate, 0 runtime callers |
| `src/composables/glass/canvas2d/resolveCanvasColor.ts` | 95 | dead probe (all consumers left Canvas2D) |
| `src/composables/glass/canvas2d/index.ts` | 16 | the dead dir barrel |
| `src/subpaths/canvas.ts` + the `./canvas` `package.json` export | 1 | the `/canvas` subpath (clean break, no alias — `no-backwards-compat`) |
| `src/api/types-extra.ts` Canvas2D type re-exports | ~10 | `Canvas2DFrame`/`Handle`/`Options`/`SuspendReason` |
| `tests/composables/glass/canvas2d/*.test.ts` | — | tests of the deleted modules |

**Coordinated unwind:** `glass/index.ts` drops the `useCanvas2D`/`useCanvasLifecycle`/`resolveCanvasColor` re-export block; `proof:subpath-enumeration` count −1 (update the CLAUDE.md trailing figure); retire gates `proof:canvas2d-substrate` + `proof:resolve-canvas-color`; re-point (not retire) `proof:webgl-substrate-single` clause (e) (drop the Canvas2D arm, WebGL2/WebGPU clauses stay) + `proof:constellation-substrate-single` (re-point SUBSTRATE-EXISTS onto `useGpuSubstrate`). Disposition register: `book→retired`, `retiredBy: BD.W-GPU-ONLY-SPINE`, successor `createGpuSubstrate` / the two GPU backends.

---

## 5. The no-GPU env — what breaks, and the honest answer (OVERTURNS the siblings' conscious-keep)

The genuinely GPU-less env (no usable WebGPU adapter AND no WebGL2 — no drivers, forced-software, the most locked-down headless) is where "no fallbacks" bites hardest. THREE HEAD mechanisms live here; all THREE PURGE:

- **`auroraFallbackGround.ts`** (369 LOC) — the `getContext("2d")` `putImageData` that bakes `sampleAuroraField`'s static composite into a `data:` URI CSS background. **DELETE.** It is a CPU raster of the field = a degraded representation = the mandate's "no fallbacks / no legacy" target. The siblings kept it as a "conscious floor"; the user mandate overturns that.
- **The swraster guard** (`renderMode.ts` `isSoftwareWebGLRenderer` + `resolveRenderMode` + the `webgl|css|auto` mode machine) — **DELETE the `css`-ground branch.** BUT see §5a — the software-DETECTION intelligence is not all deleted; the WebGL software-rasterizer must still NOT arm a full-viewport GL loop (the proven page-hang). It is repurposed into the selector's "none" verdict, not a CSS ground.
- **The layered-`radial-gradient` SSR stack** — **DELETE** as a "looks like the viz" placeholder; what replaces it is §5b's single inert placeholder.

### 5a. The page-hang is a SELECTOR concern, not a fallback (the safety circuit-breaker survives, transposed)

A software WebGL2 rasterizer arming a full-viewport per-composite loop STARVES pointer input and HANGS the page (the proven N.W5 hang — only NOT creating the GL surface cures it). This is real and must not regress. The transposition: the selector's `selectGpuBackend` returns **`"none"`** when BOTH (a) no real WebGPU adapter AND (b) the WebGL2 context reports a software rasterizer (`UNMASKED_RENDERER` SwiftShader/llvmpipe — the existing `isSoftwareWebGLRenderer` read, lifted into the selector). A `"none"` host arms NO render loop — it gets the §5b placeholder. So the circuit-breaker survives as a SELECTION outcome ("no usable GPU → don't arm"), NOT as a CSS-ground fallback. This is the clean re-expression: the guard was always "don't arm the hanging surface"; the selector says it once, up front.

### 5b. The replacement — ONE inert, non-animated placeholder (honest per "no fallbacks")

A `"none"` host is served ONE static placeholder: a CSS gradient block reading the viz's resting palette stops (a `linear-gradient`/`radial-gradient` of the brand-ramp, zero canvas, zero raster, zero animation). This is categorically NOT a fallback viz — it is the "this host cannot run live motion" honest floor, the same class as an `<img>` poster behind a `<video>`. It is a few CSS lines per viz family (or ONE shared `<VizPlaceholder :stops>` primitive — ≥2-consumer-clean across the 10 viz). No `getContext` of any kind. The `prefers-reduced-motion` one-static-frame path is DISTINCT and stays inside the GPU leaf (a reduced-motion host with a GPU paints one real GPU frame then parks — it is NOT a `"none"` host).

### 5c. The cross-repo ask — the headless-AA certification the swraster ground served

`auroraFallbackGround` + `tests-visual/aurora-swraster.spec.ts` exist primarily so **speedtest's headless CI can certify text-on-aurora AA contrast without a real GPU** (the BB.W-AURORA-SWRASTER certify-grade ground). Deleting the ground deletes that mechanism. The certification must move — a **cross-repo coordination ASK** (foreign-tree fence — speedtest's edit, never ours), with TWO offered paths:
1. **Palette-derived floor (recommended):** certify the AA contrast against the viz's PALETTE STOPS directly (the worst-case darkest/lightest stop the text overlays), with no rendered ground at all — a pure-data floor that needs no GPU and no raster. This is more robust than sampling a CPU approximation of the field.
2. **Real-GPU capture:** the certification runs on the W-REFLECT-style Metal-GPU live capture the tranche already uses for binding π (the real field, the real contrast).

Book to the BD cross-repo asks relay (`docs/tranches/BD/.../asks-*`): *"speedtest headless-AA-certification — re-derive off palette stops OR a real-GPU capture; the swraster CPU ground retires at BD.W-GPU-ONLY-SPINE."* Retire `proof:aurora-swraster` + `tests-visual/aurora-swraster.spec.ts` with the path.

---

## 6. `useGlassRenderer` Snell-bake — a MIGRATE, not a delete (it is LIVE)

`useGlassRenderer.ts` bakes a Snell's-law displacement map + a Fresnel specular map via `getContext("2d")` `ImageData`, `toDataURL()`s them into an SVG `<feImage href>`, and `GlassPanel.vue` (`createGlassFilter`, line 119, LIVE) + `DockGooFilter.vue` consume them as the `feDisplacementMap` source for `backdrop-filter: url(#…)`.

- This is **glass-DECORATION (the refractive lens texture bake), NOT a viz render path** — a one-shot static texture, not an animation. The siblings flagged it "keep-and-flag."
- Under the strict "ZERO `getContext("2d")`" mandate it still must go. **MIGRATE → the W-LENSING crossed CSS-gradient squircle encoding** (`f(x)=⁴√(1-(1-x)⁴)`, the horizontal-R + vertical-G crossed-gradient SCREEN-composited — already shipped as `.glass-lens` in `src/styles/glass/`). The displacement profile is ALREADY expressible as pure CSS gradients there; the Canvas2D bake is the legacy path the lens band moved off.
- **Verdict: fold `GlassPanel`/`DockGooFilter` onto the `.glass-lens` CSS-gradient `data:` URI** (audit whether they can drop `useGlassRenderer` entirely; if the crossed-gradient covers the profile, DELETE `useGlassRenderer` too — likely, given `.glass-lens` already encodes the squircle). This is a SEPARATE wave from the viz spine (it is glass-decoration, not viz substrate) — book `BD.W-LENS-RASTER-PURGE`, sequenced with the W-GLASS-IOS27 lensing-deepen work (shared file surface). It does NOT block the viz GPU-only spine.

---

## 7. The `.wgsl` ↔ `.glsl` twin maintenance burden — KEEP (collapsing it would BREAK Safari-first)

The dual-backend authoring means every shader-bearing viz carries a WGSL body AND a GLSL body (e.g. `aurora.wgsl.ts` + `aurora.frag.ts`, `metaball.wgsl.ts` + `metaball.frag.ts`). The question: keep both, or collapse to one?

- **KEEP the twins. They are NOT redundant — they are the two GPU backends.** The GLSL arm IS the Safari/WebGL2 path; deleting it = WebGPU-only = Safari-pre-26 + the tail + headless black-out. Collapsing to WGSL-only violates Safari-first; collapsing to GLSL-only forfeits the WebGPU compute the dot-suite/lava-field/storage-buffer-phasors want. The twin pair is structural.
- **The maintenance burden is REAL but DRY-mitigated by the shared field chunks** (`VIZ-BAND-PLAN.md §D2` / `wave-math-shared.md`): the duplicated SURFACE (noise basis, curl flow, Gerstner wave, OKLCh color) is hoisted into `field/{noise,wave,flow,color}.{glsl,wgsl}.ts` shared chunks (the AV.W2 `procedural-color` precedent), so the twin divergence shrinks to the per-viz `hostField` protagonist + the backend-specific boilerplate (vertex stage, uniform packing). The `proof:gpu-substrate-single` parity table (ΔE mean≤2.0/p99≤5.0 per viz row, on-disk capture pairs) is the machine-lock that the twins stay byte-equivalent — a drift reds.
- **A future single-source-shader transpiler (WGSL→GLSL or a common IR) is BOOKED, not built** — it is a large net-new capability with its own ≥2-consumer + correctness bar; the shared-chunk DRY is the KISS answer for BD. Recorded as a deferred-with-trigger (fires if the twin divergence exceeds a maintenance threshold).

---

## 8. The precept-inversion (binding, no-legacy) — what overturns

The GPU-only spine OVERTURNS prior BB/BC precepts that codified the fallback-as-floor model. The inversions (machine-locked at the BD close):

- **`proof:gpu-substrate-single` clause B** (the fallback-retire machine-BLOCK — it asserts the Canvas2D/WebGL2 fallback pair stays as a parity reference) → **INVERT.** The WebGL2 arm survives as a co-equal GPU backend (parity stays), but the "Canvas2D fallback as a retained floor" clause is RETIRED; the new `proof:gpu-only-spine` G-clauses replace it.
- **`W-VIZ-FALLBACK-RETIRE-WATCH`** (the union wave watching that fallbacks are not prematurely retired) → **RETIRE.** Its premise (the fallback pair is a load-bearing reference) is overturned; it inverts to "purge-Canvas2D-and-the-CPU-ground."
- **`PROCEDURAL-SUITE.md` "DO NOT MIGRATE"** prose (the stale instruction that the Canvas2D paths are kept) → **CORRECT** to the GPU-only reality (the paths are already GPU; the Canvas2D substrate deletes).
- **CLAUDE.md sections:** §"The Canvas2D substrate is single-source (BB.W-CANVAS-UNIFY)" RETIRES (substrate deleted); §"The software-raster guard + the luminance-faithful headless fallback (BB.W-AURORA-SWRASTER)" RETIRES (ground deleted, cert moved); §"The WebGPU substrate is the THIRD thin backend … the WebGL2 fallback is NOT retired … the graceful path for the ~5-10% tail" RE-AUTHORS to "TWO co-equal GPU backends selected at init" (drop "third"/"fallback"/"graceful path"/"~5-10% tail" framing).
- **Per-viz "WebGL2 fallback" prose** across the 6 GPU viz + `useGpuSubstrate.ts` header + the PROCEDURAL-SUITE "parity status `degraded`" rows → **rename `fallback`→`backend`** suite-wide (the GPU↔GPU pair is co-equal, never a degrade).

---

## 9. The wave + the gate (the executable spine)

**Wave `BD.W-GPU-ONLY-SPINE`** (viz-arch band, FIRST — the per-viz redevelopment + the new viz consume the clean dual-backend selector):
- **Builds:** the §3 selector transposition (adapter-probe-before-getContext; delete `freshCanvasForFallback`/`fallToWebGL2`/the dual-held state/`onBackendFallback`; `armAsync`-only seam); §4 Canvas2D delete; §5 swraster/css-ground purge + the §5b inert placeholder + the §5a "none"-verdict circuit-breaker; the §8 precept-inversion + prose reconcile; the disposition flip; the §5c cross-repo ask booked. (`BD.W-LENS-RASTER-PURGE` §6 is a SEPARATE glass-decoration wave, not this spine.)
- **Gate `proof:gpu-only-spine`** (device-free, `ci`):
  - **G1** — `canvas2d/` dir + `useCanvas2D`/`resolveCanvasColor` + `subpaths/canvas.ts` + the `/canvas` export DEFINITION-ABSENT (no-survivor floor).
  - **G2** — ZERO `getContext("2d")` ANYWHERE in `src/components/custom/*/composables/**` + the shader trees + `aurora/composables/**` (the swraster ground gone) — NO allowlist (the siblings' two-survivor allowlist RETIRES; `useGlassRenderer` migrates per §6, `auroraFallbackGround` deletes per §5). A NEW or surviving viz/aurora `getContext("2d")` reds.
  - **G3** — the picker is a SELECTOR not a CHAIN: `freshCanvasForFallback`/`fallToWebGL2`/`onBackendFallback` DEFINITION-ABSENT; `selectGpuBackend` resolves the backend BEFORE any `getContext`; exactly ONE leaf is live post-arm (no dual-held state).
  - **G4** — `createCanvasLifecycle` byte-untouched (the schedule core; the spine touches ONLY the picker).
  - **G5** — the four-way de-overload (§1) + the dual-backend + the no-GPU "none"→inert-placeholder policy is RECORDED in this doc + the disposition register (a future agent cannot re-introduce the chain reading "no fallbacks" literally, nor rip out the WebGL2 backend).
  - **G6** — the swraster page-hang circuit-breaker survives as the selector's `"none"` verdict (a software WebGL rasterizer arms NO loop) — a self-test bite proves a synthetic software-renderer host selects `"none"` + arms zero render loop.
  - **G7** — a self-test bite per clause (synthetic viz `getContext("2d")` reds G2; a re-minted `useCanvas2D` reds G1/G3; a re-introduced canvas-clone reds G3).
- **No `proof:ba-gestalt`** — the spine changes ZERO live pixels on a real-GPU host (every viz already paints WebGPU/WebGL2; the deleted substrate + ground had no real-GPU consumer). The per-viz redevelopment waves carry the gestalt verdicts. The ONE pixel delta — a no-GPU host now shows the inert placeholder instead of the CPU-raster ground — is asserted by the §5b placeholder unit, not a gestalt capture (no real GPU = no gestalt anyway).

---

## 10. Summary deltas (for the roster)

- **POLICY: a dual-GPU-backend SELECTOR** — `requestAdapter()` probes BEFORE `getContext`, the best backend is picked ONCE, that single getContext arms. NO runtime fall-chain, NO `freshCanvasForFallback` canvas-clone, NO Canvas2D, NO CSS/swraster ground. (~120 LOC of workaround evaporates.)
- **"No fallbacks" ⊕ "Safari-first" resolve to ONE statement** — WebGL2 is a co-equal GPU backend (the Safari path), not a fallback; the CPU tier (Canvas2D + CSS/swraster) is the forbidden thing. The four-way de-overload is gate-recorded.
- **The transposition keystone:** `requestAdapter()` does NOT poison the canvas; only `getContext("webgpu")` does. Probe the adapter (+ `isSoftwareWebGPUAdapter`) first, decide, then getContext once on the un-poisoned canvas. The seam becomes `armAsync`-only.
- **DELETE:** `useCanvas2D`+`resolveCanvasColor`+`/canvas` (0 callers) · `auroraFallbackGround` (the CPU ground) · the swraster `css`-ground branch · the chain/clone state. **OVERTURNS** the siblings' allowlist conscious-keep.
- **No-GPU env = OUT OF SUPPORT for live motion** — served ONE inert non-animated CSS-gradient placeholder (the honest floor, zero canvas). The page-hang circuit-breaker survives as the selector's `"none"` verdict (don't arm a software-WebGL loop).
- **`useGlassRenderer` Snell-bake = MIGRATE** (it is LIVE in GlassPanel) → the `.glass-lens` crossed-CSS-gradient squircle; a separate `BD.W-LENS-RASTER-PURGE` glass-decoration wave, not the viz spine.
- **The `.wgsl`↔`.glsl` twins KEEP** (collapsing breaks Safari-first); DRY-mitigated by the shared `field/` chunks + the parity table; a single-source transpiler is BOOKED not built.
- **Cross-repo ASK:** the speedtest headless-AA cert moves off the swraster ground → palette-derived floor (recommended) or real-GPU capture; book to the BD asks relay.
- **Precept-inversion:** override `proof:gpu-substrate-single` clause B + retire `W-VIZ-FALLBACK-RETIRE-WATCH` + correct `PROCEDURAL-SUITE.md` "DO NOT MIGRATE" + re-author the three CLAUDE.md fallback sections + rename `fallback`→`backend` suite-wide.
- **Wave `BD.W-GPU-ONLY-SPINE`** + `proof:gpu-only-spine` (G1-G7) lock it; no `proof:ba-gestalt` (zero real-GPU-pixel delta).
