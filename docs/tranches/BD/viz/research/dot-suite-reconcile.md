# Dot-suite reconcile — the THREE dot vizzes → ONE configurable dot-matrix engine (the decision)

**Lane** BD viz-research / dot-suite-reconcile · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/{dot-flow-field,dot-matrix,goo-dot-matrix}/**` at HEAD +
the BD viz audit (`audit/substrate-consolidation.md`, `audit/gpu-only-conflict.md`, `audit/no-legacy-hunt.md`) +
the sibling research (`research/dotmatrix-image.md`, `research/blob.md`, `research/aurora.md`) ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. The deliverable is the CONSOLIDATION ARCHITECTURE DECISION:
unify or keep distinct, and the no-legacy/KISS/DRY shape.

> This doc is the **architecture verdict**; `research/dotmatrix-image.md` is the IMAGE-redesign chapter (the new
> `target="texture"`/`shape="cloud"` capability) and already endorses unification (§5, idea I6). This doc DECIDES
> it, grounds it in the measured duplication, draws the leaf boundary, and sequences the migration. The two are
> companion — read together.

---

## 0. Decision (TL;DR)

**UNIFY the three dot vizzes into ONE `<DotMatrix>` primitive** with two orthogonal axes —
**`projection: "grid" | "sphere"`** (the lattice topology) and **`target` / `shape`** (the per-dot scalar driver `T`) —
over ONE shared instanced-billboard + `fwidth`-SDF-circle rasterizer. Clean break, no aliases (the no-legacy law).

The three are the SAME rasterizer over different scalar drivers. They already share `createGpuSubstrate`,
`usePointerVelocityField`, `procedural-color`, the `fwidth` SDF circle, the OKLCh ramp, and — measured below — a
near-identical per-dot vertex/fragment shape. Keeping three dirs, three composables, three shader pairs, three
constants schemas, three caps, and three round-trip parity gates is the exact DRY/KISS violation the BD congruence
bar (`ORCHESTRATOR-NOTES.md`) hunts. The unification is the W-PRUNE-CONSOLIDATE no-dual-path discipline applied to
the dot family.

**The fence that makes it safe (not a god-component):** unify the high-duplication surface (rasterizer + target
field + pointer + substrate + color + caps + parity), keep the LATTICE BUILDERS pluggable (`gridLattice` vs
`sphereLattice` — genuinely different geometry, the one place two code paths legitimately diverge). This is the
goo-dot-matrix's own already-shipped discipline ("ONE field, ONE rasterizer; the lattice math is the per-register
delta") generalized to the family.

**Sequencing:** OPTION A — ship the unify FIRST (the rasterizer/target/projection consolidation), then the image-
target capability lands ON the unified primitive (no double-migration). The two are one band, two waves:
`W-DOT-UNIFY` (the fold) → `W-DOT-IMAGE` (the new `texture`/`cloud`/`glyph` targets). See §6.

---

## 1. The measured duplication (the DRY case, grounded — not asserted)

The three dirs at HEAD (`wc -l` over `*.ts` + `*.vue`):

| viz | total LOC | composables | shaders | what is genuinely unique |
|---|---|---|---|---|
| **dot-flow-field** | 2120 | flowField · uniformBridgeWGPU · useDotFlowField · useFlowParticles | flow-field.{compute.wgsl, render.wgsl, glsl} | the anchored 2D grid + the Gerstner sweep driver |
| **dot-matrix** | 1589 | dotMatrixField · uniformBridgeWGPU · useDotMatrix · useDotSphere | dot-matrix.{wgsl, glsl} | the Fibonacci 3D lattice + the spin matrix + depth-fade |
| **goo-dot-matrix** | 1358 | gooDotLattice · gooDotSetup · uniformBridgeWGPU · useGooDotMatrix | goo-dot.{frag, wgsl} | the `sceneDistG` SDF target (already IMPORTED from goo-blob, not re-forked) |

**Shared-symbol census (grep over the three dirs, occurrence count):**

```
 25  createGpuSubstrate        ← all three pick the SAME substrate
 22  sceneDistG                ← hybrid imports goo-blob's field (already DRY)
 18  usePointerVelocityField   ← all three feed the SAME pointer field tick(delta) from frame
 16  uniformBridgeWGPU         ← three near-identical std140/WGSL uniform packers
 15  fibonacciDot              ← hybrid imports dot-matrix's sphere lattice (already DRY)
 10  procedural-color          ← all three read the ONE OKLCh ramp
  5  flow.glsl (curlFBM)       ← shared Bridson curl chunk
  5  createCanvasLifecycle     ← the ONE lifecycle leaf
```

**The render shaders are structurally the same.** A `grep -c` for `fwidth|smoothstep|instance_index|@vertex|@fragment`
+ billboard/circle tokens returns **11 / 14 / 9** hits across the three `.wgsl.ts` render shaders — each is an
instanced-billboard vertex stage that places a quad + a fragment stage that draws the `fwidth`-AA SDF circle tinted
by the palette. The ONLY material delta between them is **how the per-instance position + the per-dot `v` scalar are
computed** (the swept-wave height vs the sphere depth-fade vs the SDF thickness) — which is exactly the
`projection × target` axis the unification factors out.

**The verdict the numbers force:** ~5067 LOC across three dirs, with the cross-imports already proving the family
WANTS to be one (the hybrid literally imports `sceneDistG` AND `fibonacciDot` from its siblings — the seams are
already drawn, just not collapsed). Three `uniformBridgeWGPU.ts`, three constants schemas with the SAME
`{palette, background, interactive, respectReducedMotion, dotSize}` core, three `useDot*` composables with the SAME
substrate-pick + pointer-feed + pause/resume/wake/renderAt handle. The consolidation removes ~2 of 3 copies of every
shared concern.

---

## 2. The mental model — they are ONE concept

The user's mental model is ONE: **"a grid of dots that shows a shape / image."** The three shipped vizzes are three
*instances* of that one idea:

- **dot-flow-field** = dots showing a swept WAVE (the shape is `waveBand(height)`).
- **goo-dot-matrix** = dots showing a metaball BLOB (the shape is `thickness(sceneDistG)`).
- **dot-matrix** = dots ON a sphere SURFACE (the shape is the sphere itself; the "image" is the depth-shell).

There is no user-facing reason these are three components. The `<DotMatrix>` primitive with `projection` +
`target`/`shape` axes IS the user's mental model expressed as one API. The image redesign (`dotmatrix-image.md`) makes
this acute: "tessellate dots to show arbitrary images" is the SAME rasterizer over a NEW driver (a texture / a cloud
fbm), so a fourth viz would be a fourth copy of the same rasterizer — the unification is the only KISS answer to the
user's own headline ask.

---

## 3. The consolidated architecture — one rasterizer, two axes, pluggable lattice

### 3.1 The layer boundary (what unifies, what stays pluggable)

```
<DotMatrix
  projection="grid|sphere"          ← the lattice topology axis
  target="generative|texture|sdf|glyph"
  shape="wave|blob|cloud"           ← (target=generative) the generative-shape sub-axis
  :config                           ← the ONE DotMatrixConfig (the merged schema)
  v-model:paused
/>
```

```
useDotMatrix(canvasRef, options)            ← ONE composable
  ├─ createGpuSubstrate(...)                 SHARED — the WebGPU-first/WebGL2 substrate select
  ├─ usePointerVelocityField(...)            SHARED — fed tick(delta) from the renderer frame
  ├─ resolvePalette() → procedural-color     SHARED — the ONE OKLCh ramp
  ├─ lattice = buildLattice(projection)      PLUGGABLE — gridLattice | sphereLattice (pure builders)
  ├─ target  = resolveTarget(target, shape)  PLUGGABLE — the T(uv,t) source (wave|blob|cloud|texture|sdf|glyph)
  └─ dotRasterizer(lattice, target, ...)     SHARED — instanced billboard + fwidth SDF circle, ONE per backend
```

- **SHARED (unify — the high-duplication surface):**
  - **the rasterizer** — instanced billboard quads + the `fwidth`-smoothstep SDF circle fragment (the ONE AA canon).
    ONE `dot-rasterizer.wgsl` + ONE `dot-rasterizer.glsl`, parameterized by the lattice anchor + the per-dot `v`.
  - **the substrate pick** — `createGpuSubstrate` (post-audit: device-time *selection*, not a runtime fallback chain
    — see §5).
  - **the pointer** — `usePointerVelocityField`, fed `tick(delta)` from the renderer frame (no own rAF).
  - **the color seam** — `procedural-color.{wgsl,glsl}.ts` OKLCh ramp.
  - **the per-dot modulation** — `opacity/radius/tint/jitter` read the per-dot `v` (`dotmatrix-image.md` §3.3).
  - **the lifecycle handle** — `{pause, resume, wake, renderAt, dispose, backend, reducedMotion}` (identical today).
  - **the uniform bridge** — ONE `uniformBridgeWGPU.ts` (the three are near-identical std140/WGSL packers).
  - **the caps + the round-trip parity gate** — ONE `proof:dot-matrix` over the merged math.

- **PLUGGABLE (keep separate — the genuinely-different geometry, the no-god-path mitigation):**
  - **`gridLattice(index, cols, pitch)`** — the deterministic 2D anchored grid (`gridOrigin`, already shared between
    dot-flow + hybrid). Feeds a 2D anchor `o` the target field samples at.
  - **`sphereLattice(i, N)`** — the Fibonacci phyllotaxis 3D position (`fibonacciDot` + `spinMatrix` + `facingFade`).
    Feeds a 3D anchor + a depth-facing scalar.
  - **`resolveTarget(...)`** — the `T(uv,t)` discriminated union (`wave` = `waveBand(sampleHeight)` · `blob` =
    `thickness(sceneDistG)` · `cloud` = `smoothstep(fbm(curlWarp))` · `texture`/`sdf`/`glyph` — the new ones).

Each pluggable leaf is a PURE function of `(index/uv, t)` — node-testable, transcribed JS↔WGSL↔GLSL, round-tripped
at a fixed sample set (the suite's transcription-drift discipline). The shader assembles the chosen lattice builder +
the chosen target into the one rasterizer at construction (a `#define`/template splice, the aurora-medium precedent),
so there is no runtime branch storm in the hot path — the variant is baked per-mount.

### 3.2 The mapping (old → new — the clean-break fold)

| current viz / subpath | becomes | the driver |
|---|---|---|
| `<DotFlowField>` `/dot-flow-field` | `<DotMatrix projection="grid" target="generative" shape="wave">` | `waveBand(sampleHeight)` — now ONE target preset |
| `<GooDotMatrix>` `/goo-dot-matrix` | `<DotMatrix projection="grid" target="sdf" sdf="metaball">` (≡ `shape="blob"`) | `thickness(sceneDistG)` — the SDF target |
| `<DotMatrix>` (sphere) `/dot-matrix` | `<DotMatrix projection="sphere">` | the Fibonacci 3D lattice + depth-fade — a PROJECTION variant |
| **(new)** image / cloud / glyph | `<DotMatrix target="texture">` / `shape="cloud"` / `target="glyph"` | a NEW target on the SAME primitive — NOT a fourth viz |

The subpath consolidates onto **`/dot-matrix`** (the name the user's mandate uses — "a dot-matrix facility"), absorbing
`/dot-flow-field` + `/goo-dot-matrix`. Three MIGRATION rows (one per retired subpath). The default
`projection="grid" target="generative" shape="wave"` reproduces dot-flow byte-near; `projection="sphere"` reproduces
dot-matrix; `target="sdf" sdf="metaball"` reproduces the hybrid.

### 3.3 The merged config schema (the three constants collapse)

The three `*Config` interfaces share the core `{ dotSize, palette, background, interactive, respectReducedMotion }`.
The merged `DotMatrixConfig` is:

- **common:** `dotSize`, `baseOpacity`, `minScale`/`maxScale` (the grow/shrink range, `maxScale·dotSize ≤ 0.5·pitch` —
  the "stays a dot matrix" fence), `palette`, `background`, `interactive`, `pointerMode`, `respectReducedMotion`,
  `cartoonShadow` (the new blob-redev ask, §4).
- **`projection`-gated:** grid → `gridPitch`/`displaceAmp`/`springK` · sphere → `dotCount`/`radius`/`depthFade`/
  `rotationSpeed`/`axisTilt`/`spheres`/`breathing`/`parallax`.
- **`target`-gated:** generative → `shape` + the wash/flow knobs (`waveBandCenter`/`waveBandWidth`/`curlStrength`/
  `coherence`/`washDirection`/`washSpeed`/`feather`) · texture → `source: ImageBitmap | HTMLCanvasElement` + downsample/
  contrast · sdf → the SDF picker + params · glyph → the text/atlas source.

A discriminated union keyed on `projection` + `target` (TS narrows the gated fields). The studio (`useConfiguratorState<DotMatrixConfig>`)
shows only the rungs the current axes enable (§6 of `dotmatrix-image.md`).

---

## 4. The new capabilities the unification ENABLES (not just a refactor)

The unification is the prerequisite that makes the user's headline asks cheap:

- **Arbitrary-image tessellation** (`target="texture"`) — the dot grid halftones an uploaded image. ONE new target
  on the unified rasterizer, not a fourth viz. (`dotmatrix-image.md` §3.2 + I3.)
- **"Washes over naturally"** (`shape="cloud"` + the curl-warped wash front) — the aurora field math thresholded into
  dots, the coverage front perturbed by `curlFBM` so the shape ENTERS and CROSSES, never a global fade.
  (`dotmatrix-image.md` §4 + I2/I4.)
- **The cartoon-shadow dot register** (`cartoonShadow` axis) — the user's blob-redev "cartoon-shadow or not" ask
  generalizes to the dot field (a second offset/darkened billboard pass — the `--shadow-cartoon-*` identity applied to
  the dots; native, no filter, Safari-safe). One axis on the one primitive, not a per-viz re-paste.
- **Image-on-sphere** (`projection="sphere"` + `target="texture"`) — a halftone earth / a logo on the spinning
  dot-globe. The synthesis the three-viz split could never express (the sphere had no target axis); the pluggable-
  lattice + shared-target boundary makes it free. (`dotmatrix-image.md` I12.)
- **Cursor-paint reveal** (the cursor as a moving coverage source) — sweep the pointer to paint the image in. ONE
  pointer wiring (already shared) serving all projections/targets. (`dotmatrix-image.md` I7.)

None of these is reachable with three frozen vizzes without a fourth copy of the rasterizer. The unification is the
architecture that turns each into a ONE-axis addition.

---

## 5. The GPU-only / no-fallback reconciliation (the BD mandate, per the substrate audit)

The substrate audit (`audit/substrate-consolidation.md` §3) resolved the mandate: **WebGL2 is an ALLOWED GPU path**;
the forbidden thing is the runtime **try-WebGPU-fail-clone-canvas-rebuild-WebGL2** fallback CHAIN. The dot-suite
inherits this verbatim:

- The unified `useDotMatrix` hands the substrate ONE `setup` for the SELECTED backend (chosen at construction via
  `selectBackend` / `armAsync`-first adapter request — no canvas clone, no dual live leaf, no `onBackendFallback`).
- It STILL ships a WGSL primary + a GLSL arm per shader (both are GPU; WebGL2 is co-equal, not a degrade tier) — but
  the dot-suite's arms collapse from **three** WGSL+GLSL pairs to **ONE** rasterizer pair × the spliced lattice/target,
  so the dual-arm surface SHRINKS, not grows.
- **ZERO Canvas2D.** The dot-flow WebGL2 fallback ALREADY retopologized off Canvas2D to a pure fullscreen fragment
  dot-lattice (BC.W-VIZ-DOTFLOW); the unified rasterizer keeps that — the fragment-dot-lattice generalizes to the
  arbitrary `T` for free (swap `waveBand(sampleHeight)` → `T(uv,t)`). No `getContext("2d")`, no `getImageData` raster.
  The image `target` is a GPU texture upload (`ImageBitmap` → `copyExternalImageToTexture` / `texImage2D`), the
  mandate-honored path.

So the unification + the GPU-only mandate are the SAME direction: fewer, sharper primitives — one rasterizer, one
substrate select, one color seam, one parity gate, zero Canvas2D.

---

## 6. Sequencing — unify-first, then image (OPTION A)

`dotmatrix-image.md` §10-Q1 flagged the order. The verdict: **unify FIRST** so the new image/cloud/glyph targets land
on the unified primitive (no double-migration). Two waves, one band:

1. **`W-DOT-UNIFY`** — collapse the three dirs → ONE `/dot-matrix` with `projection × target` axes; the rasterizer +
   substrate + pointer + color + uniform bridge + caps + parity unify; `gridLattice`/`sphereLattice`/`resolveTarget`
   stay pluggable; the existing three behaviors reproduce byte-near via the target presets (`shape="wave"` ≡ dot-flow,
   `projection="sphere"` ≡ dot-matrix, `target="sdf"` ≡ hybrid). Clean-break the two retired subpaths (MIGRATION rows).
   Machine-locked by `proof:no-dual-path` (three dot rasterizers → one; zero third rasterizer survives) + the merged
   round-trip parity + the binding π (each reproduced behavior reads byte-near its predecessor, both modes).
2. **`W-DOT-IMAGE`** — the NEW targets on the unified primitive: `target="texture"` (GPU-upload halftone),
   `shape="cloud"` (aurora-field-thresholded wash), the curl-warped wash front, `cartoonShadow`, the cursor-paint
   reveal, the keyboard surface. Machine-locked by `proof:viz-image-dotmatrix` (the image-fidelity / wash / stays-a-
   dot-matrix bars) — `dotmatrix-image.md` §8.

The unify is the W-PRUNE-CONSOLIDATE cleanup; the image is the user's headline feature. A → B avoids building the new
target twice (once on the old chassis, once on the unified one).

---

## 7. The honest case AGAINST / the residual risk (recorded, with the mitigation)

- **The sphere is genuinely different geometry.** Folding a 3D phyllotaxis + spin-matrix lattice under the same prop as
  a 2D anchored grid risks a god-component with two disjoint hot paths (the substitution trap). **Mitigation:** the
  lattice BUILDER stays a pluggable pure leaf (`gridLattice` vs `sphereLattice`); only the rasterizer + target + pointer
  + substrate + color unify. The shader splices the chosen builder at construction (per-mount, not a runtime branch).
  This is the goo-dot-matrix's own already-proven discipline — it is NOT a new risk, it is the existing pattern
  generalized.
- **The texture target needs the instanced path on both backends** (a per-dot size from a sampler wants the billboard,
  the fullscreen-fragment can't size). **Mitigation:** the generative/sdf sources work in BOTH topologies; the texture
  source is instanced-only — a recorded per-target capability, not a god-path. The fallback fragment-dot-lattice covers
  the no-WebGPU tail for the generative/sdf targets (the common case).
- **The migration is a large refactor** (3 → 1, ~5067 LOC touched). **Mitigation:** it is MECHANICAL (the seams are
  already drawn — the hybrid already imports `sceneDistG` + `fibonacciDot`; the constants already share a core; the
  composables already share the substrate-pick + pointer-feed). The round-trip parity gate + the byte-near π per
  reproduced behavior are the safety net. The unify-first sequencing keeps the new feature off the refactor's critical
  path.

**Net:** the case-for (one mental model, ~2/3 duplication removed, the congruence bar, the new capabilities become
one-axis additions, GPU-only-aligned) dominates the case-against (one genuinely-different lattice, mitigated by the
pluggable-builder boundary the family already uses). **DECISION: UNIFY.**

---

## 8. Cross-viz coordination (what this binds)

- **CONSUMES** (unchanged, now from ONE primitive): the shared `flowField.ts` Gerstner sweep + the `curlFBM` chunk
  (the cloud wash) + the goo-blob `sceneDistG` SDF (the blob target — coordinate with `research/blob.md` so
  `sceneDistG` stays the ONE field source both the blob viz AND the blob target read) + the dot-matrix `fibonacciDot`
  lattice (the sphere projection) + `procedural-color` + `usePointerVelocityField`.
- **ALIGNS** with `research/aurora.md` (the cloud/wave targets ARE aurora's field math in a dot render — keep the math
  source-shared so a tune to one tunes both) + `research/papergrid-warp.md` + `research/concentric-levelset.md` (the
  SHARED wave-math mandate the user names — `curlFBM` + the Gerstner sweep are the ONE perturbation engine across
  dot-matrix, paper-grid, and concentric; the dot-suite is one consumer of that shared engine).
- **BOOKS** `W-DOT-UNIFY` (the fold) → `W-DOT-IMAGE` (the new targets) as the two-wave dot band; coordinate the
  `sceneDistG` single-source fence with the blob redev (`research/blob.md`).
- **SUPERSEDES** the PROCEDURAL-SUITE.md three separate dot-viz rows → ONE `dot-matrix` row with the axes (a
  doc-reconcile in `W-DOT-UNIFY`).
