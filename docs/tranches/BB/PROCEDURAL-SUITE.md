# The procedural-animation suite — the FAMILY doc (all seven viz, WebGPU-first)

> This is the BB-tranche AUTHORING copy of the suite family doc. The SHIPPED home is `src/components/custom/PROCEDURAL-SUITE.md` (authored by W-VIZ-SUITE's doc rider, finalized at W-CONCENTRIC). This copy is the spec-phase reference; the two stay in sync.

glass-ui has ONE procedural-animation SUITE — a documented FAMILY of seven members that share ONE lifecycle leaf, ONE shared discipline, and the cited-SOTA-math bar. The user's explicit ask (2026-06-16): "the procedural-animation should cover: the blob, aurora, constellation, fourier field, etc, too — extant items, too." So this doc treats EVERY member as first-class — the two new viz AND the five extant ones — with a per-member capability + substrate + migration verdict. No extant member is silently omitted; the non-migrators carry their reason + the booked trigger.

The family is **WebGPU-first where the platform allows it** (June 2026: WebGPU is Baseline-Newly-Available — Chrome/Edge 113+, Safari 26+ / the whole Apple-26 line, Firefox 141+ Windows / 145+ macOS-ARM; the two real holes — Linux Firefox + pre-A12 iPhones, the ~5-10% WebGL2-fallback tail). The user's directive: "ALL of our visualizations, from fourier to aurora, should be WebGPU first when possible." The "when possible" is load-bearing — it keeps Canvas2D the right tool for fourier-field / constellation today.

The family register: small marks, real depth, a flowing wave-warped field over a dark ground, subtle + sophisticated — the "Claude co-work" aesthetic (`docs/tranches/BB/audit/viz-ref/dot-flow-field-reference.jpg`). Luminous translucent grounds behind glass cards — glass POPs over a live field.

## The shared substrate — ONE lifecycle leaf, three thin backends

```
                       createCanvasLifecycle            ← the ONE leaf (267L; backend-AGNOSTIC)
                       (the demand-driven scheduling + offscreen-park + live-PRM-freeze)
                              │   │   │
          ┌───────────────────┘   │   └───────────────────┐
   useWebGLCanvas            useWebGPUCanvas           useCanvas2D
   (WebGL2 backend,          (WebGPU backend,          (Canvas2D backend,
    the fallback)             born-first; NEW)          fourier/constellation)
          │                        │                        │
          └────────────────────────┴────────────────────────┘
                           useGpuSubstrate
                  (the transparent feature-detect picker:
                   navigator.gpu ? useWebGPUCanvas : useWebGLCanvas;
                   a UNIFORM handle shape — the viz wiring is substrate-agnostic)
```

- **`createCanvasLifecycle`** (`src/composables/glass/webgl/createCanvasLifecycle.ts`) — the ONE leaf. It owns the demand-driven rAF tick/wake, the suspend `Set` (the four-key `CanvasSuspendReason` union: `tab-hidden | off-screen | off-screen-io | manual`), the `visibilitychange`/`document.hidden` owner, the `contentvisibilityautostatechange` offscreen-park, and the LIVE `prefers-reduced-motion` re-monitor (one static frame then park, re-arms on un-reduce). The ONLY backend-specific seam is `buildContext`/`resize`/`bindContextEvents`.
- **`useWebGLCanvas`** (`webgl/useWebGLCanvas.ts`, the WebGL2 thin backend; the exemplar) — the WebGL2 fallback path. NOT retired (the ~5-10% tail).
- **`useWebGPUCanvas`** (`webgpu/useWebGPUCanvas.ts`; W-GPU-SUBSTRATE lands it) — the THIRD thin backend, born WebGPU-first. It re-implements ZERO scheduling; it threads only the WebGPU-specific concerns: the ASYNC device-acquisition prelude (`armAsync` — `navigator.gpu.requestAdapter()` → `adapter.requestDevice()` → `context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "premultiplied" })` → the consumer `setup` → the leaf's sync `arm()`), the DPR-aware backing-store `resize`, and the `device.lost` self-heal (the WebGPU twin of `webglcontextlost`/`restored`; re-acquire unless `reason === "destroyed"`).
- **`useCanvas2D`** (`canvas2d/useCanvas2D.ts`) — the Canvas2D thin backend (fourier-field + constellation compose it).
- **`useGpuSubstrate`** (`webgpu/useGpuSubstrate.ts`; W-GPU-SUBSTRATE lands it) — the transparent picker. `const supportsWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;` → returns a UNIFORM handle (`arm`/`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/`reducedMotion`). A viz authors TWO `setup` callbacks (one WGSL-pipeline, one GLSL-program); the picker selects; everything downstream is substrate-agnostic.

## The per-viz capability + migration table (ALL SEVEN members, first-class)

| viz | subpath | substrate primary / fallback | configurator | palette source | WebGPU-migration verdict | rank | sub-wave / reason |
|---|---|---|---|---|---|---|---|
| **aurora** | `/aurora` | WebGPU `aurora.wgsl` / WebGL2 `aurora.frag.ts` (405L, 0 textures / 0 derivatives) | `useConfiguratorState<AuroraConfig>` per-preset | ColorResolver (`composables/color.ts`, `uniformBridge.ts`) | **MIGRATE** — the cleanest port (pure fbm/OKLCh fullscreen); WGSL primary lands, `.frag` stays the WebGL2 fallback | **1** | **W-AURORA-WGPU** (this band) |
| **goo-blob** | `/goo-blob` | WebGPU `metaball.wgsl` / WebGL2 `metaball.frag.ts` (417L, SDF smin + 2 live `fwidth()` @ 266/364) | demo studio per-preset | injected ColorResolver (`uploadBlobUniforms.ts`) | **MIGRATE** — clean SDF port; the two `fwidth()` AA/Toksvig sites transcribe to WGSL fragment-stage `fwidth()` (the ΔE drift suspects) | **2** | **W-GOOBLOB-WGPU** (this band) |
| **dot-flow-field** | `/dot-flow-field` | WebGPU compute+instanced (NEW) / WebGL2 transform-feedback / Canvas2D fallback | `useConfiguratorState<FlowFieldConfig>` commit-on-write (demo studio per-preset) | ColorResolver | **BORN WebGPU-first** — the compute-particle path is materially better on WebGPU (per-particle size/density the reference needs) | **3** | **W-FLOWFIELD ≡ W-VIZ-DOTFIELD** (this band) |
| **concentric** | `/concentric` | WebGPU fragment (NEW; `surface`) / compute+instanced-line (`rings`) / WebGL2 GLSL fallback | `useConfiguratorState<ConcentricConfig>` commit-on-write (demo studio per-preset) | ColorResolver | **BORN WebGPU-first** — fullscreen fragment, the aurora shape-class | **4** | **W-CONCENTRIC ≡ W-VIZ-CONCENTRIC** (this band) |
| **fourier-field** | `/fourier-field` | **Canvas2D** (`useCanvas2D`; `math.ts` DFT epicycle math) | demo studio per-preset (`fourier-studio.vue`) | ColorResolver | **DO NOT MIGRATE (now)** — a few-to-dozens of phasors is the RIGHT tool for `ctx.stroke`; the DFT math is already GPU-agnostic. "When possible" gives latitude | — | **W-FOURIER-GPU** (booked; trigger: harmonic density scales to thousands of phasors → GPU line-instancing wins) |
| **constellation** | `/constellation` | **Canvas2D** (`useCanvas2D`; node/edge proximity-graph lattice) | (substrate-agnostic) | ColorResolver | **DO NOT MIGRATE (now)** — Canvas2D handles the current node count fine; `proof:constellation-substrate-single` is substrate-agnostic | — | **W-CONSTELLATION-GPU** (booked; trigger: a much denser lattice → the dot-flow-field advection compute pass generalizes to constellation's nodes) |
| **watercolor-dot** | `/watercolor-dot` | **SVG/CSS only — NO drawing context** (`<filter>` feDisplacementMap + seeded prng; `useWatercolorBlob.ts` pure geometry) | (none — a decorative dot) | per-instance prng + color | **PERMANENTLY OUT** — mounts ZERO drawing context; a GPU context for one decorative dot is a regression against the ~8-context-per-page cap | — | NEVER a wave — the canonical "mark NOT to migrate, with the reason" case |

The migration ORDER is `aurora (1) → goo-blob (2) → dot-flow-field (3) → concentric (4)` — the two cleanest fragment ports first (establishing the shared-WGSL-chunk + the calibrated ΔE bar), then the two new viz born onto the proven substrate. The three non-migrating viz are recorded WITH the reason + the booked trigger — the user's "cover the extant items too" is satisfied by the explicit verdict per member, not by a forced migration.

## The shared discipline (stated ONCE — every canvas-bearing member inherits it for free)

Every canvas-bearing member (all but watercolor-dot) honors the shared discipline — INHERITED from the ONE leaf, NOT re-implemented per viz:

- **Offscreen-pause.** The four-reason suspend `Set` (`tab-hidden | off-screen | off-screen-io | manual`) + the F6 `off-screen-io` IntersectionObserver split + the `contentvisibilityautostatechange` content-visibility park. A parked rAF attaches ZERO frames (`proof:offscreen-pause`).
- **Live-PRM freeze (one static frame then park).** The leaf's live `matchMedia("(prefers-reduced-motion: reduce)")` `change` re-monitor: under reduce the loop draws ONE static frame then parks, re-arms on un-reduce. A CSS reset cannot reach the rAF — this is the JS gate. The compute-particle path freezes the advection (the static frame shows the seeded streamlines at the frozen t).
- **Consumer-owned DPR.** The leaf does NOT bake DPR; each viz's `resize` owns the `clientWidth * dpr` backing-store policy.
- **Tab-hidden park.** The `document.hidden` `visibilitychange` owner (ONE writer of `tab-hidden`).
- **One GL context per route.** The substrates band clusters live GL on disjoint routes; a story self-stages ONE context (the `rail.vue` / `DockStage` precedent). The new viz stories each self-stage their own single context.
- **Configurator-driven.** The tunable surface is a `useConfiguratorState<Config>` studio inheriting the AZ.W-HIERARCHY configurator hierarchy vocabulary (the `--configurator-section-*` rungs — section weight / label register / control rhythm; no per-studio hand-tuning). The library DEFAULT cloneMode is `commit-on-write` (a single-surface viz a preset switch cleanly resets); the DEMO studios use `per-preset` (a named editable baseline the user tunes + returns to — the aurora/blob/fourier model).
- **Warm-identity default + presets-in-consumers.** The library default palette is neutral/warm-cream-identity (warm-cream → warm-amber, the foreground family; resolved via the ColorResolver / `src/composables/color` seam + value.js OKLCh helpers). Named themed presets (teal-on-navy, ppmycota-purple, violet-legendre) live in CONSUMERS, NEVER a library token.
- **The WebGPU/WebGL2 parity bar.** A migrated viz's `.wgsl` primary + `.frag`/`.glsl`/Canvas2D fallback render byte-EQUIVALENTLY (not byte-identical — two rasterizers differ sub-pixel), verified via the `renderAt` capture-pair (a deterministic frame, same t + config, readback via `copyTextureToBuffer`→`mapAsync` (WebGPU) + `readPixels` (WebGL2), a bounded OKLab ΔE). The threshold is CALIBRATED against the aurora migration (the first, cleanest) and recorded as a gate fact (the starting bar: mean ΔE ≤ 2.0, p99 ≤ 5.0; the empirical value recorded by the agent). This is the SAME deterministic-capture discipline `profile:aurora` uses (renderAt→readback is the GPU floor under headless Chrome).
- **The WebGL2 fallback is permanent (NOT retired).** The picker feature-detects `navigator.gpu` and degrades gracefully. Both paths stay until the ~5-10% tail (Linux Firefox stable, pre-A12 iPhones, flagged Firefox-Android) closes — TRACKED via the WebGPU Implementation-Status wiki, not assumed. `proof:gpu-substrate-single` clause B machine-blocks a deleted-fallback green.
- **Cited-SOTA math.** Tessendorf *Simulating Ocean Water* (SIGGRAPH 2001) sum-of-sinusoids + deep-water dispersion `ω=√(g·k)`; Gerstner / trochoidal cresting (GPU Gems Ch.1, Finch — the steepness normalization `Q_h = Q/(k_h·A_h·H)`); Bridson *Curl-Noise for Procedural Fluid Flow* (SIGGRAPH 2007) divergence-free `v=(∂ψ/∂y,−∂ψ/∂x)`; Fourier-series synthesis; the DFT epicycle math. Real math, named + cited; no arbitrary noise.

## The shared math vocabulary (ONE Fourier-series ladder, two surfaces)

The new viz speak ONE math vocabulary — a truncated Fourier-series bank with the deep-water dispersion `ω=√(g·k)`:

- **dot-flow-field** traces the STREAMLINES (level-sets) of a divergence-free curl of a directional-wave Fourier potential `ψ(p,t) = Σ A_k·sin(κ_k·(D_k·p) − ω_k·t + φ_k) + turbulence·fbmCurl(p + panSpeed·t)`; the flow `v = (∂ψ/∂y, −∂ψ/∂x)` is divergence-free by construction (Bridson), so the dots ride wave crests + troughs without bunching. Particles are streamline-seeded (Poisson-disk seed scatter → forward-Euler trace), advected in the compute pass, respawned at the edge.
- **concentric** traces the CONTOURS of a radial height field — the radial twin: `z(r,t) = Σ A_h·sin(k_h·r − ω_h·t + φ_h)` with the `1/h^p` falloff, the Gerstner radial pinch (`r' = r − Q·A·cos Φ`, the steepness-normalized crest), and the disc rotated about X by a rake α + perspective-projected (the user's "3D-rendered-to-2D"). Two registers off ONE `math.ts` leaf: `variant="surface"` (the pure-fragment ellipsoidal-norm interference field, the aurora shape-class) + `variant="rings"` (the instanced raked line strokes, the geometric "concentric circles in 3D").

The dot-flow-field is the radial-twin's vector-field sibling; both are the Fourier-series family the existing fourier-field already teaches (its inverse-DFT epicycle sum). ONE engine family, multiple surfaces.

## The WebGPU-first migration roadmap

```
SHIPPED in this band (BB):
  aurora        → W-AURORA-WGPU    (aurora.wgsl primary;   aurora.frag the WebGL2 fallback)
  goo-blob      → W-GOOBLOB-WGPU   (metaball.wgsl primary; metaball.frag the WebGL2 fallback)
  dot-flow-field → W-FLOWFIELD      (born WebGPU-first; WebGL2 transform-feedback / Canvas2D fallback)
  concentric    → W-CONCENTRIC     (born WebGPU-first; GLSL fallback)

BOOKED successors (trigger-gated, NOT this band):
  fourier-field → W-FOURIER-GPU       (trigger: thousands of phasors → GPU line-instancing wins)
  constellation → W-CONSTELLATION-GPU (trigger: a much denser lattice → the advection compute pass generalizes)
  goo-blob color → the 4.x per-satellite derived-shade (BA-VJS-5 / C-1; the GL color-seam fence not widened in this band)
  a .frag/.glsl WebGL2-fallback RETIREMENT (GATED: forbidden until the ~5-10% tail closes; clause B machine-blocks a premature retire)

PERMANENTLY OUT (never a wave):
  watercolor-dot (mounts ZERO drawing context; the canonical "mark NOT to migrate, with the reason" case)
```

## The gate — `proof:gpu-substrate-single` (the dual-substrate parity lock)

A SUPERSET of `proof:webgl-substrate-single` (born-RED on the new WebGPU clauses; every WebGL2/Canvas2D clause stays GREEN). The clause set (each falsifiable, each with a self-test bite):

- **A** — ONE WebGPU bootstrap (`navigator.gpu.requestAdapter` + `getContext("webgpu")` + `context.configure(` in EXACTLY `useWebGPUCanvas.ts`; a viz calling `navigator.gpu` directly REDs).
- **B** — ONE WebGL2 fallback bootstrap PRESERVED (a deleted-WebGL2-substrate synthetic REDs — the fallback is load-bearing for the tail).
- **C** — both backends compose the ONE leaf, no re-fork (the composition-plus-fork synthetic — imports the leaf AND re-inlines a `new Set<>` + rAF loop — REDs).
- **D** — no baked viz choices in the WebGPU substrate (no aurora/blob/flow-field import, no hard-coded DPR, no viz uniform names).
- **E** — the WebGPU scheduling + `device.lost` self-heal present (a substrate missing `device.lost` handling REDs — the blank-surface-forever risk).
- **F** — the PARITY TABLE (`docs/tranches/BB/audit/gpu-parity-table.md`) is declared + consistent: every `.wgsl`/`.frag` path RESOLVES ON DISK (a `verified` row pointing at a missing file REDs); every `verified` row has a paired pixel-parity capture + a recorded OKLab ΔE within the calibrated threshold; the THREE non-migrating viz carry a `no-migrate` row with a non-empty reason (so the family table cannot silently omit an extant member).
- **G** — the consumer-#2 usability assert (`tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` exists).

Plus the per-viz born-RED gates `proof:flow-field` + `proof:concentric` + their binding Playwright π (the field ANIMATES; PRM FREEZES it to ONE static frame; the dots/rings RENDER + the field reads as ribbons/interference, not a grid; the WebGPU↔WebGL2 parity holds within the calibrated band) + the `proof:ba-gestalt` substrates-band verdict (the gestalt close decision — a wave whose per-mechanism gates pass but whose field reads as a grid closes `complete_with_misses`, not `complete`).
