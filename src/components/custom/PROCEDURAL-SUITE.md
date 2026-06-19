# The procedural-animation suite (BB.W-VIZ-SUITE)

glass-ui ships ONE procedural-animation SUITE — a documented FAMILY of seven members
sharing ONE lifecycle leaf, ONE shared discipline, and ONE cited-SOTA math vocabulary. This
is the family home: it documents EVERY member as a first-class citizen (the user's explicit
"the procedural-animation should cover: the blob, aurora, constellation, fourier field, etc,
too — extant items, too"), states the shared discipline ONCE, and records the per-viz
capability + WebGPU-migration verdict. Each viz's OWN per-dir `README.md` carries a
"Substrate" section with its local substrate/parity/migration status; this doc is the index.

## The nine members

| viz | subpath | what it is |
|---|---|---|
| **aurora** | `/aurora` | procedural painterly gradients — a multi-nuclei fbm/OKLCh fullscreen composition |
| **goo-blob** | `/goo-blob` | a WebGL2 metaball droplet on the SDF `smin` substrate, with orbiting satellites |
| **dot-flow-field** | `/dot-flow-field` | curl-noise flow field traced by advected particles over a Gerstner/Tessendorf wave potential |
| **concentric** | `/concentric` | a radial Fourier ring-interference field — concentric ellipsoid rings beating into moiré |
| **paper-grid** | `/paper-grid` | a liquid AA-grid — a Golus derivative-AA two-tier grid on a Bridson curl-warped UV sheet (BORN WebGPU-first — fullscreen fragment, the aurora/concentric shape-class; the fallback is the SAME pure fragment → parity `verified`) |
| **dot-matrix** | `/dot-matrix` | a Fibonacci phyllotaxis dot-SPHERE — fine warm-cream dots on a sphere surface, depth-shaded into a translucent dot-shell, slowly rotating (BORN WebGPU-first — instanced billboard quads + the crisp fwidth SDF circle; the WebGL2 fallback is the SAME instanced billboards → parity `verified`; the goo-blob sibling, register **a** — the goo+dot HYBRID register **b** reuses this rasterizer) |
| **fourier-field** | `/fourier-field` | a reconstructing elliptic Fourier curve — an inverse-DFT closed curve with nested epicycles |
| **constellation** | `/constellation` | a drifting proximity-graph node/edge lattice |
| **watercolor-dot** | `/watercolor-dot` | a CSS/SVG `feDisplacementMap` seeded blob (a decorative mark — NO drawing context) |

## The shared discipline (stated ONCE — every canvas-bearing member inherits it for free)

- **ONE lifecycle leaf** — `createCanvasLifecycle` owns the demand-driven scheduling +
  offscreen-park + live-PRM-freeze; each member composes a thin backend
  (`useWebGPUCanvas` / `useWebGLCanvas` / `useCanvas2D`), re-implementing ZERO scheduling.
- **Offscreen-pause** — the 3-reason suspend `Set` + the F6 `off-screen-io`
  IntersectionObserver split + the `contentvisibilityautostatechange` content-visibility
  park. A parked rAF attaches ZERO frames (`proof:offscreen-pause`).
- **Live-PRM freeze (one static frame then park)** — the leaf's live
  `matchMedia("(prefers-reduced-motion: reduce)")` `change` re-monitor: under reduce the
  loop draws ONE static frame then parks, re-arms on un-reduce. A CSS reset cannot reach the
  rAF — this is the JS gate.
- **Consumer-owned DPR** — the leaf does NOT bake DPR; each viz's `resize` owns the
  `clientWidth * dpr` backing-store policy.
- **One GL context per route** — the substrates band clusters live GL on disjoint routes;
  a story self-stages ONE context (the `rail.vue` / `DockStage` precedent).
- **Configurator-driven** — the tunable surface is a `useConfiguratorState<Config>` studio
  inheriting the AZ.W-HIERARCHY configurator hierarchy vocabulary.
- **Warm-identity default + presets-in-consumers** — the library default palette is
  neutral/warm-cream-identity (resolved via the ColorResolver / `src/composables/color` +
  value.js); named themed presets (teal-on-navy, ppmycota-purple) live in CONSUMERS, never
  a library token.
- **Cited-SOTA math** — Tessendorf/Gerstner sum-of-sines · Bridson curl-noise · Fourier
  series · DFT epicycles. Real math, named + cited; no arbitrary noise.

## The WebGPU-first dual-substrate

The suite is WebGPU-FIRST where the platform allows it (the June-2026 Baseline-Newly-
Available fact). A NEW `useWebGPUCanvas` backend composes the SAME `createCanvasLifecycle`
leaf the WebGL2 and Canvas2D backends already compose (the THIRD thin wrapper, ZERO
scheduling re-fork); `useGpuSubstrate` is the transparent feature-detect picker. The WebGL2
substrate is NOT retired — it becomes the graceful fallback for the ~5-10% tail (Linux
Firefox, pre-A12 iPhones, flagged Firefox-Android). Both paths render byte-equivalently
(a bounded OKLab ΔE capture-pair per migrated/new viz, on disk); the bar is **mean ΔE ≤ 2.0,
p99 ΔE ≤ 5.0** (perceptual-just-noticeable ≈ 2.3, SwiftShader-vs-GPU rasterizer drift well
below). `proof:gpu-substrate-single` machine-locks the no-second-fork + no-deleted-fallback
+ parity-resolves discipline; the machine-read parity table is
`docs/tranches/BB/audit/gpu-parity-table.md`.

## The per-viz capability + migration table (ALL NINE members, first-class)

| viz | substrate (HEAD) | configurator | palette source | WebGPU-migration verdict | rank | sub-wave / reason |
|---|---|---|---|---|---|---|
| **aurora** | WebGL2 (`aurora.frag.ts`, 405L, 0 textures/0 derivatives) + the `aurora.wgsl.ts` primary | `useConfiguratorState<AuroraConfig>` per-preset | ColorResolver (`composables/color.ts`, `uniformBridge.ts`) | **MIGRATED** — the cleanest port (pure fbm/OKLCh fullscreen); the WGSL primary landed, `.frag` is the byte-untouched WebGL2 fallback | **1** | **W-AURORA-WGPU** |
| **goo-blob** | WebGL2 (`metaball.frag.ts`, 417L, SDF smin + 2 `fwidth()` sites) + the `metaball.wgsl.ts` primary | demo studio per-preset | injected ColorResolver (`uploadBlobUniforms.ts`) | **MIGRATED** — clean SDF port; the two `fwidth()` AA/Toksvig sites transcribed to WGSL fragment-stage `fwidth()` | **2** | **W-GOOBLOB-WGPU** |
| **dot-flow-field** | NEW — WebGPU compute+instanced primary, Canvas2D point-cloud fallback | `useConfiguratorState<FlowFieldConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — the compute-particle path is materially better on WebGPU (per-particle size/density the reference needs); fallback `degraded` | **3** | **W-FLOWFIELD** |
| **concentric** | NEW — WebGPU fragment primary, GLSL fallback | `useConfiguratorState<ConcentricConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — fullscreen fragment, the aurora shape-class; the fallback is the SAME pure fragment field → parity `verified` | **4** | **W-CONCENTRIC** |
| **paper-grid** | NEW — WebGPU fragment primary, GLSL fallback | `useConfiguratorState<PaperGridConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — fullscreen fragment (Golus derivative-AA grid on a Bridson curl-warped UV); the fallback is the SAME pure fragment → parity `verified` | **5** | **W-VIZ-PAPERGRID** |
| **dot-matrix** | NEW — WebGPU instanced-billboard primary, WebGL2 instanced-billboard fallback | `useConfiguratorState<DotMatrixConfig>` commit-on-write | ColorResolver | **BORN WebGPU-first** — instanced billboard quads + the crisp fwidth SDF circle (the Fibonacci phyllotaxis dot-sphere, depth-shaded); the fallback is the SAME instanced billboards → parity `verified`; the goo-blob sibling that the goo+dot HYBRID reuses | **6** | **W-VIZ-DOTMATRIX** |
| **fourier-field** | **Canvas2D** (`useCanvas2D`; `math.ts` DFT epicycle math) | demo studio per-preset (`fourier-studio.vue`) | ColorResolver | **DO NOT MIGRATE (now)** — a few-to-dozens of phasors is the RIGHT tool for `ctx.stroke`; the DFT math is already GPU-agnostic. "WebGPU-first WHEN POSSIBLE" gives latitude | — | **W-FOURIER-GPU** (booked; trigger: harmonic density scales to thousands of phasors → GPU line-instancing wins) |
| **constellation** | **Canvas2D** (`useCanvas2D`; node/edge proximity-graph lattice) | (substrate-agnostic) | ColorResolver | **DO NOT MIGRATE (now)** — Canvas2D handles the current node count fine; `proof:constellation-substrate-single` is substrate-agnostic | — | **W-CONSTELLATION-GPU** (booked; trigger: a much denser lattice → the dot-flow-field advection compute pass generalizes to constellation's nodes) |
| **watercolor-dot** | **SVG/CSS only — NO drawing context** (`<filter>` feDisplacementMap + seeded prng; `useWatercolorBlob.ts` pure geometry) | (none — a decorative dot) | per-instance prng + color | **PERMANENTLY OUT** — mounts ZERO drawing context; a GPU context for one decorative dot is a regression against the ~8-context-per-page cap | — | NEVER a wave — the canonical "mark NOT to migrate, with the reason" case |

The migration ORDER was `aurora (1) → goo-blob (2) → dot-flow-field (3) → concentric (4)` —
the two cleanest fragment ports first (establishing the shared-WGSL-chunk + the calibrated
ΔE bar), then the two new viz born onto the proven substrate. The three non-migrating viz
are recorded WITH the reason + the booked trigger — NOT silently omitted (the user's "cover
the extant items too" is satisfied by the explicit verdict per member, not by a migration).

## The shared WGSL/GLSL color chunk (no cross-backend drift)

The parity-critical color seam — the sRGB OETF + the Ottosson OKLCh matrices + the FBM
rotation + the OKLab-rectangular palette ramp — is ONE source per backend:
`src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the GLSL fallbacks splice
it) and `src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts` (the WGSL
primaries splice it). The two are byte-identical numerics (the same value.js Ottosson
constants written as the same transposed columns), so the color math can NEVER drift between
a WGSL primary and its GLSL fallback — the parity-ΔE bar measures the two paths against ONE
math.

## Named successors

- **W-FOURIER-GPU** — FourierField migrates to a WebGPU instanced-line-segment path IF the
  harmonic density scales to thousands of phasors. Today Canvas2D is the RIGHT tool.
- **W-CONSTELLATION-GPU** — Constellation migrates to a WebGPU compute-particle lattice IF a
  much denser lattice is wanted (the dot-flow-field advection compute pass generalizes).
- **The per-satellite derived-shade blob color** (BA-VJS-5 / C-1) — booked to a 4.x point
  release; the GL color-seam fence is NOT widened.
- **A `.frag`/`.glsl` WebGL2-fallback RETIREMENT** — booked but GATED: forbidden until the
  ~5-10% tail closes. `proof:gpu-substrate-single` clause B machine-blocks a premature
  retirement.
- **watercolor-dot** — PERMANENTLY out (a CSS/SVG primitive mounting ZERO drawing context).
