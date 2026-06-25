# BD viz — substrate architecture audit + the consolidated GPU-only substrate design

**Mandate (binding):** every web facility renders via **WebGPU or WebGL2** — ZERO Canvas2D
(`getContext("2d")`), **NO fallbacks**, no legacy, no quick workarounds. The transposition is
for elegance/simplicity/performance — fewer, sharper primitives.

**Companion docs:** `gpu-only-conflict.md` (the conflict surface + delete manifest) and
`no-legacy-hunt.md` (the line-item legacy ledger) already enumerate the *deletes*. THIS doc owns
the **architecture decision** the others flag for the orchestrator: is `useGpuSubstrate` the clean
ONE substrate, is WebGL2 a forbidden "fallback" or an allowed GPU path, and what is the elegant
consolidated shape.

---

## 1. The substrate stack AS-IS (the inventory + line counts)

| File | LOC | Role | Mandate status |
|---|---|---|---|
| `webgl/createCanvasLifecycle.ts` | 362 | Backend-AGNOSTIC lifecycle core: the 4-reason suspend `Set`, the rAF tick/wake demand gate, the document-visibility owner, the content-visibility offscreen-park, the live-PRM re-monitor, the Safari context-loss circuit-breaker. NO `getContext` of any kind. | **CLEAN — keep verbatim.** This is the elegant primitive the whole consolidation rests on. |
| `webgl/useWebGLCanvas.ts` | 234 | WebGL2 backend: `getContext("webgl2")` + `webglcontextlost/restored` self-heal + `ResizeObserver` + the `probeWebGL2Renderer()` single bootstrap. Composes the leaf. | **CLEAN — keep.** A GPU backend, not a Canvas2D one. |
| `webgpu/useWebGPUCanvas.ts` | 442 | WebGPU backend: async `requestAdapter→requestDevice→configure` prelude (`armAsync`), `device.lost` self-heal, the validation-probe + software-adapter guard, `getPreferredCanvasFormat`. Composes the leaf. | **CLEAN — keep.** The WebGPU bootstrap single-source. |
| `webgpu/webgpuDevice.ts` | 86 | `WebGPUInitError` typed signal + `isSoftwareWebGPUAdapter` classifier (carved off the bootstrap so the no-god-module census holds). | **KEEP** (depends on §3 decision — see the software-adapter guard discussion). |
| `webgpu/useGpuSubstrate.ts` | 310 | The PICKER: try-WebGPU-then-rebuild-WebGL2. Holds a dual-`setup` contract (`setupWGPU` + `setupGL`), `fallToWebGL2`, `freshCanvasForFallback` (the canvas-poison clone), `onBackendFallback`. | **RE-AUTHOR — the heart of the decision (§3).** |
| `canvas2d/useCanvas2D.ts` | 321 | Canvas2D backend over the leaf. **ZERO runtime call sites** (the viz tree migrated off it). | **DELETE wholesale.** |
| `canvas2d/resolveCanvasColor.ts` | 95 | `light-dark()`→`rgb()` resolver for Canvas2D `fillStyle`. Only consumer: the barrel re-export. | **DELETE.** |
| `canvas2d/index.ts` | 16 | The Canvas2D dir barrel. | **DELETE.** |

**The two residual live `getContext("2d")` data-texture bakes** (NOT render loops — see `gpu-only-conflict.md` §A):
`useGlassRenderer.ts:55,98` (the GlassPanel/DockGooFilter displacement-map bake) and
`auroraFallbackGround.ts:346` (the software-raster luminance ground). Both addressed in §4.
`useGlassBackdropLuminance.ts:316`'s `getContext("2d", {willReadFrequently})` is a backdrop
**sampler** (reads pixels off a known background `<canvas>`, paints nothing) — see §4.3.

**Consumer reality (grep-verified):** `useCanvas2D(` / `useCanvasLifecycle(` have **zero** runtime
call sites in `src/`. Every viz (aurora, blob, fourier-field, constellation, concentric,
paper-grid, dot-flow-field, dot-matrix, goo-dot-matrix) composes `createGpuSubstrate` or
`createWebGLCanvas`. The Canvas2D substrate is dead-but-published cargo.

**Dual-arm shape:** 20 `*.wgsl.ts`/`*WGPUSetup.ts` files vs 5 `*GLSetup.ts`/`*.glsl.ts` "fallback"
arms. Most viz are WebGPU-primary; each hands the picker BOTH a WGSL and a GLSL `setup`.

---

## 2. The decision: is `useGpuSubstrate` the clean ONE substrate?

**Almost — but not in its current shape.** It is the right *idea* (one uniform handle, the
viz wires its lifecycle substrate-agnostically) wrapped in the wrong *mechanism* (a runtime
try-then-rebuild fallback chain the mandate forbids). The consolidation keeps the idea and
deletes the mechanism.

The architecture already has the elegant primitive: **`createCanvasLifecycle` is the ONE
substrate.** WebGL2 and WebGPU are two thin *context backends* over it, each ~200-440 lines of
purely backend-specific concern (context acquisition + that backend's loss/restore robustness).
That layering is correct and stays. The conflict is entirely in the PICKER's runtime-fallback
behaviour, not in the two-backend split.

---

## 3. THE CORE QUESTION — WebGL2: forbidden "fallback" or allowed GPU path?

This is the decisive call. I resolve it definitively:

### Verdict: WebGL2 is an ALLOWED GPU path. The forbidden thing is the runtime FALLBACK CHAIN.

The mandate's enumeration is "WebGPU **or** WebGL2" — WebGL2 is named as an *acceptable backend*,
co-equal with WebGPU, not a degrade tier. The forbidden classes are explicit: Canvas2D, "no
fallbacks, no graceful-degrade, no dual-path." So the bite lands on the *mechanism* — the
`try { WebGPU } catch { dispose; clone-poisoned-canvas; rebuild WebGL2; arm }` runtime chain — not
on WebGL2 itself. A device-time **selection** between two GPU backends is not a fallback; a
runtime **try-fail-rebuild-on-a-cloned-canvas** is.

This reconciles the apparent contradiction in the companion docs (Reading 1 vs Reading 2): the
answer is **Reading 1's mechanism with Reading 2's backend set.** ONE backend is *selected per
device at construction* (no try-rebuild, no canvas clone, no `onBackendFallback`, no two live
leaves), but the backend SET stays {WebGPU, WebGL2} (both are GPU; WebGL2 is not deleted).

### Why selection-not-fallback is the elegant transposition

The current picker carries three workarounds that ONLY exist to serve the runtime fall:

1. **`freshCanvasForFallback`** — clones the WebGPU-poisoned canvas because the HTML
   one-context-type rule forbids `getContext("webgl2")` after `getContext("webgpu")` on the same
   element. This is a literal workaround (`no-legacy-hunt.md` S1 names it). It vanishes when the
   backend is decided BEFORE any `getContext` is called.
2. **The dual `setup` contract** (`setupWGPU` + `setupGL`) — every viz authors and ships two
   shader pipelines so the picker can swap at runtime. Decide the backend first and a viz hands
   the substrate exactly ONE `setup`.
3. **The validation-probe + software-adapter guard + `onBackendFallback`** — the apparatus that
   detects a lying adapter mid-arm and rebuilds. With selection-before-acquire, the probe is no
   longer load-bearing for a *fallback* (there is none); it degrades to a simple "this backend
   failed → surface `onInitError`, paint nothing" (mandate-compliant: a host with neither GPU
   backend does not get the viz).

### The selection rule (deterministic, at construction, BEFORE any getContext)

```
selectBackend(setupWGPU?, setupGL?):
  if supportsWebGPU() AND setupWGPU provided  → "webgpu"
  else if setupGL provided                    → "webgl2"
  else                                         → throw (a viz must provide ≥1 GPU setup)
```

`supportsWebGPU()` is the cheap presence check (`"gpu" in navigator`). The HONEST risk it carries
(a `navigator.gpu` that exists but whose `requestAdapter()` returns null — headless / SwiftShader /
blocklisted) is what the old fallback chain existed to catch. Under the mandate that host simply
**does not paint the viz** (NO fallback). But we can do better than a black void WITHOUT a
fallback: see §3.1.

### 3.1 The no-fallback no-black-void reconciliation

A genuine concern: "selection, no fallback" means a `navigator.gpu`-present-but-adapter-null host
arms WebGPU and gets nothing (the BB disease the picker was built to cure). The elegant resolution
is **async selection, still single-backend, still no canvas clone:**

`armAsync()` does the WebGPU adapter request FIRST (before `getContext`), and the backend is chosen
on the RESULT, not on the presence check:

```
armAsync():
  if attemptWebGPU:
    adapter = await navigator.gpu.requestAdapter(opts)   // no getContext yet — canvas un-poisoned
    if adapter AND not isSoftwareAdapter(adapter):
      backend = "webgpu"; getContext("webgpu"); configure; setupWGPU; arm
      return
    // adapter null / software → fall THROUGH to webgl2 on the SAME un-poisoned canvas
  if setupGL:
    backend = "webgl2"; getContext("webgl2"); setupGL; arm
  else:
    onInitError(no-gpu); paint nothing
```

This is the key insight: **the canvas is only poisoned by `getContext("webgpu")`, and we now defer
that call until AFTER the adapter resolves.** So the adapter-null host selects WebGL2 *on the
original, never-poisoned canvas* — `freshCanvasForFallback` is **deleted**, no clone, no swap. There
is still exactly ONE backend live at any moment (never two leaves), ONE `setup` runs, and the
"don't crash to black" property survives as a property of *selection order*, not of a fallback
chain. The viz authors two `setup`s only for the rare both-paths-shipped case; a WebGPU-only viz
ships only `setupWGPU` (and an adapter-null host gets `onInitError`, which is mandate-correct).

> **This is the architectural-transposition the user wants:** the same "never black" robustness, but
> as an emergent property of *deferring `getContext` past the adapter probe* — not a try-catch-clone
> fallback subsystem. The canvas-poison workaround, the dual-leaf-held-live state, `fallToWebGL2`,
> and `onBackendFallback` all evaporate. ~120 LOC of workaround deleted; the handle surface is
> unchanged for every consumer.

**Naming:** rename `useGpuSubstrate` → drop the "fallback/insurance/~5-10% tail" framing in its
header; rename `onBackendFallback` away (delete it). The handle (`armAsync`/`arm`/`suspend`/`resume`/
`wake`/`renderAt`/`dispose`/`reducedMotion`/`backend`) is byte-identical — consumers don't change.

---

## 4. The residual `getContext("2d")` sites — migration targets

### 4.1 `auroraFallbackGround.ts` (the software-raster luminance ground) — DELETE
A Canvas2D raster AND the literal "css fallback." Delete the file + the `Aurora.vue` `"css"`
substrate branch + `resolveRenderMode`'s `"css"` resolution + `renderMode.ts`'s software-raster
guard + `forceWebGLUnderSoftwareRaster`. Aurora arms the consolidated substrate or it does not
paint. The `renderMode` prop (`webgl|css|auto`) RETIRES (clean break). The certification rationale
(speedtest headless AA contrast off a 2D ground) is a **cross-repo ask** — book it to a real-GPU
capture or a palette-derived floor (see `gpu-only-conflict.md` §C2; foreign-tree fence).

### 4.2 `useGlassRenderer.ts` displacement-map bake (`:55,98`) — MIGRATE to CSS-gradient encoding
The Snell-law displacement/normal map is currently a one-shot 2D `ImageData` bake feeding an SVG
`feDisplacementMap`. **It is NOT a render loop** and is arguably texture-authoring, but the mandate
says zero `getContext("2d")` with no exception. The elegant transposition already exists: W-LENSING
encodes the SAME squircle bevel profile (`f(x)=⁴√(1-(1-x)⁴)`, Snell n₂=1.5) as a **crossed
R/G CSS gradient** (horizontal R-channel + vertical G-channel, screen-composited). Re-express the
displacement map as that pure-CSS gradient data-URI — the canvas bake disappears entirely, no GPU
pass needed. (Fallback option if the CSS encoding is insufficient: an offscreen WebGL2/WebGPU
render-to-texture pass — but the CSS encoding is preferred, zero new GPU context.)

### 4.3 `useGlassBackdropLuminance.ts:316` (`getContext("2d", {willReadFrequently})`) — DECISION NEEDED
This is a backdrop **sampler** (`drawImage` a known background `<canvas>` into a downsampled
canvas, `getImageData` to read average luminance for the adaptive-glass observer). It paints NO
visible surface — it is a read-only pixel probe. Strictly it IS a `getContext("2d")`. Two honest
readings:
- **Literal:** delete the 2D path; read luminance via a WebGL2/WebGPU 1×1 reduction pass or
  `copyExternalImageToTexture` + readback. Heavier, more code.
- **Charitable:** a read-only luminance probe of an EXISTING surface is not "a facility rendering
  via Canvas2D" — it renders nothing. Exempt it as a measurement tool (like `OffscreenCanvas`
  readback), the way `watercolor-dot`'s pure-SVG path is exempt.

**Recommendation: charitable** (it paints zero pixels; a GPU reduction pass for one luminance
scalar is the workaround, not the elegance). Flag for the orchestrator. NOT a viz-suite concern.

---

## 5. The consolidated substrate — the proposed elegant shape

**ONE lifecycle leaf + TWO context backends + ONE selecting picker.** No Canvas2D, no fallback
chain, no canvas clone.

```
createCanvasLifecycle.ts   ← the substrate (unchanged) — schedule/park/PRM/loss-breaker, no getContext
  ├── useWebGLCanvas.ts    ← WebGL2 context backend (unchanged) — getContext("webgl2") + loss/restore
  └── useWebGPUCanvas.ts   ← WebGPU context backend (unchanged core) — async device + device.lost
useGpuSubstrate.ts → renamed/re-authored: SELECTS one backend (adapter-probe-then-getContext),
                     ZERO fallToWebGL2 / freshCanvasForFallback / onBackendFallback / dual-leaf.
                     Same uniform handle. ~120 LOC lighter.
```

**Deletes (this wave's substrate scope):**
- `canvas2d/` dir wholesale (`useCanvas2D`, `resolveCanvasColor`, `index`).
- `subpaths/canvas.ts` + `package.json` `/canvas` export + `glass/index.ts` Canvas2D barrel block
  + `api/{index,types-extra}.ts` Canvas2D type re-exports (clean break, no alias — MIGRATION row).
- In `useGpuSubstrate.ts`: `freshCanvasForFallback`, `fallToWebGL2`, `onBackendFallback`, the
  dual-leaf `webgpu`+`webgl2` simultaneous holding, the "invisible insurance / ~5-10% tail" header.
- `auroraFallbackGround.ts` + the aurora `"css"` mode + `renderMode.ts` software-raster guard
  (§4.1).

**Migrates:** `useGlassRenderer.ts` displacement bake → CSS-gradient encoding (§4.2).

**Keeps (mandate-clean):** `createCanvasLifecycle.ts`, `useWebGLCanvas.ts`, `useWebGPUCanvas.ts`
core, the device-loss self-heal (a GPU-context robustness, not a fallback), the Safari
circuit-breaker (a storm bound, not a fallback), `webgpuDevice.ts` (the typed init signal +
software-adapter classifier still gate WebGPU selection in §3.1).

**Gate reconciliation:**
- `proof:canvas2d-substrate`, `proof:resolve-canvas-color`, `proof:aurora-swraster` → RETIRE with
  their deleted paths.
- `proof:webgl-substrate-single` clause-e (the `useCanvas2D` composes-the-leaf bite) → drop the
  Canvas2D arm; WebGL2/WebGPU clauses stay GREEN.
- `proof:gpu-substrate-single` → re-author: drop clause-B's "WebGL2 fallback PRESERVED, NOT
  retired" framing (it's a co-equal backend, not a fallback); drop the parity-table dual-arm
  policing where a viz collapses to a single backend; KEEP the "ONE WebGPU bootstrap / ONE WebGL2
  bootstrap / both compose the leaf / no baked viz choices" clauses (still true and valuable).
- `proof:constellation-substrate-single` → re-point its SUBSTRATE-EXISTS assert off `useCanvas2D`
  onto `useGpuSubstrate`/`useWebGLCanvas` (constellation renders GL; the gate text is stale).
- A new `proof:no-canvas2d` census: ZERO `getContext("2d")` in `src/` except the §4.3 exempt
  sampler (if charitable) — the standing tripwire.

---

## 6. Open decisions for the orchestrator

1. **§3.1 async-selection vs sync presence-check selection.** Recommend **async** (probe the
   adapter before `getContext`, select on the result) — it deletes the canvas-poison clone AND
   keeps "never crash to black" without a fallback chain. The only cost: the WebGPU path is one
   `await requestAdapter()` before first paint (it already was — `armAsync` always awaited it).
2. **§4.2 displacement bake** — CSS-gradient encoding (preferred) vs WebGL2 RTT vs
   treat-as-exempt-texture-authoring.
3. **§4.3 backdrop-luminance sampler** — literal (GPU reduction pass) vs charitable (read-only
   probe exempt). Recommend charitable.
4. **§4.1 W-AURORA-SWRASTER certification** — cross-repo ask to speedtest (real-GPU capture or
   palette-derived AA floor). Foreign-tree fence — book to the BD cross-repo relay.
