# Dot-flow FAR-SURPASS — the arbitrary-image dot-matrix (W-DOT-IMAGE)

**Lane** BD viz-research / fleet2 / dotflow-surpass · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/components/custom/{dot-flow-field,dot-matrix,goo-dot-matrix}/**`, `src/composables/glass/webgpu/{useGpuSubstrate,useWebGPUCanvas}.ts`, `src/composables/glass/webgl/shaders/{flow,procedural-color}.{glsl,wgsl}.ts`, `goo-blob/shaders/metaball.frag.ts` at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. WRITE the wave-spec-ready shape.

> Read alongside `research/dotmatrix-image.md` (the full 12-idea brainstorm — this fleet-2 doc is the TIGHTENED wave-spec form), `research/dot-suite-reconcile.md` (the D4 unify), `media-analysis.md §B` (the reference frame-read), `VIZ-BAND-PLAN.md` D2/D4 (the binding decisions), and the metallic-aurora sibling (`fleet2/metallic-aurora.md` — the shared `field/` engine + the no-fallback floor are common to both).

---

## 0. TL;DR

The reference (`/tmp/bd-media/frames/dotflow-ref/`) is a **PLAIN subtle dark dot grid behind a UI** — faint, evenly-spaced, near-static. The surpass: the dot grid samples a pluggable **target-coverage field `T(uv,t) ∈ [0,1]`** for per-dot base size + opacity, and the shared wave-math (D2) drives a **curl-warped directional coverage FRONT** (`washPhase`) so any image **washes over naturally** — enters from an edge, crosses organically, never a flat global cross-fade. Four `T` sources: **generative** (blob = metaball SDF · wave = Gerstner band · cloud = curlFBM-warped thresholded fbm), **texture** (uploaded image via `ImageBitmap → copyExternalImageToTexture`/`texImage2D`, **zero Canvas2D**), **sdf** (parametric shape), **glyph** (pre-baked alpha/MSDF — Canvas2D-free).

This lands on the **unified `<DotMatrix>`** (per D4: `target` × `projection` axes, the rasterizer SHARED, the lattice builders pluggable) as the `target="texture"` / `target="generative" shape="cloud"|"blob"` registers — NOT a fourth viz. GPU-only (WebGPU-first / WebGL2 co-equal), warm-cream identity default, compositor-safe, PRM-frozen, one-loop, Safari-first.

**The key realization (already proven at HEAD):** dot-flow-field ALREADY is "an anchored dot grid whose per-dot brightness/size reads a scalar field sampled at the anchor" (`waveBand(sampleHeight(o,t))`, `flowField.ts`). The surpass is the **generalization of that scalar from one hardcoded `waveBand(height)` to an arbitrary `T(uv,t)`** + a temporal WASH. Minimal new substrate; maximal new capability.

---

## 1. The reference deltas (frame-read → falsifiable surpass)

| reference (dotflow-ref) | our SURPASS | the falsifiable bar |
|---|---|---|
| faint evenly-spaced dark dots, ONE size/opacity, static-ish | each dot's **opacity AND radius** read `T` (small+faint where `T≈0`, big+bright where `T≈1`); SUBTLE — stays a fine field | a `T=1` cell resolves radius ≥ 1.4× + opacity ≥ 2× a `T=0` cell, AND `maxScale·dotSize ≤ 0.5·gridPitch` (never a solid blob) |
| flat dotted backdrop, no content | the grid **tessellates to DISPLAY an arbitrary image** (halftone) — blob, wave, cloud, photo, glyph | given `T` = a circle SDF, the coverage-weighted silhouette matches `T` within a named IoU; stop the motion, the shape still reads |
| no motion / global stillness | the shape **washes over naturally** — enters from an edge, crosses; the edge is curl-organic | a π frame-series: the coverage centroid TRANSLATES across the grid (not a uniform global fade); the wash edge is curl-warped (not a straight line) |
| no field math | the cloud/wave targets ARE the aurora/flow field math in a dot render (one math, two renders) | the cloud preset shares the `field/` engine (`curlFBM` + `sampleHeight`); `proof:dot-image` round-trips JS↔WGSL↔GLSL |

---

## 2. The architecture — three layers over the dot-flow chassis

Each layer is a pure `f(uv,t)` sampled per dot, transcribed JS↔WGSL↔GLSL (the suite's round-trip parity anchor).

### 2.1 Layer 1 — the dot lattice (KEEP, the dot-flow `gridOrigin`)

The deterministic anchored grid already shipped: `gridOrigin(index, cols, pitch)` → each dot's origin `o`; a restoring spring eases the live position toward `o + drift`. Permanent lattice (the "tessellate" substrate), no re-seed/wrap. Rendered as instanced billboard quads + the `fwidth` SDF circle (the ONE AA canon, common to all three dot vizzes). Unify-side: the `gridLattice` builder is the `projection="grid"` arm beside `sphereLattice` (`projection="sphere"`) — the genuinely-different geometry stays pluggable (D4 mitigation), the rasterizer SHARED.

### 2.2 Layer 2 — the target-coverage field `T(uv,t) ∈ [0,1]` (the NEW protagonist)

The single generalization: the per-dot scalar driver is no longer the hardcoded `waveBand(height)` — it is a pluggable `T(uv,t)` sampled at the dot anchor. FOUR sources behind ONE `targetMode` discriminated union:

- **`generative`** (the headline — analytic in-shader, the aurora/flow math REUSED):
  - **blob** — `T = thickness(metaballSDF(uv,t))`, the goo-blob `sceneDistG` (`metaball.frag.ts:97`) IMPORTED, not re-forked. Folds the goo-dot-matrix hybrid's SDF-as-target.
  - **wave** — `T = waveBand(sampleHeight(uv,t), center, width)`, the dot-flow-field's CURRENT driver — now ONE source among four (the existing behavior preserved as a target preset, a clean byte-near fold).
  - **cloud** — `T = smoothstep(lo, hi, fbm(curlWarp(uv,t)))`, the shared `curlFBM` domain warp thresholded into a coverage mask. LITERALLY "aurora logic in dot-matrix areas."
- **`texture`** (the uploaded image) — `T` = sampled luminance/alpha of an `ImageBitmap` bound as a GPU texture (`texture_2d<f32>` WGSL / `sampler2D` GLSL via `texImage2D`). **The fence: a GPU upload, NEVER `getContext("2d")`/`getImageData`** (the BD zero-Canvas2D mandate — see §6). A downsample/blur pre-pass keeps the halftone legible.
- **`sdf`** (parametric — circle/rounded-box/star/the metaball) — crisp analytic silhouettes the texture path can't give.
- **`glyph`** (text/icon mask) — a **pre-baked** MSDF atlas or alpha texture (NOT a runtime Canvas2D rasterize — see §6 open-Q). Lowest priority / highest friction; defer if it forces a 2D context.

`T` is THE protagonist. Everything downstream reads it. (D2 fence: `T` is the per-viz `hostField` step of the layered pipeline `warp → hostField → perturb → palette` — steps 1/3/4 SHARED, step 2 the per-viz protagonist.)

### 2.3 Layer 3 — the per-dot modulation (the "fade in/out, grow/shrink slightly")

Each dot reads `T` at its anchor and modulates THREE compositor-safe channels in the instanced vertex/fragment:

```
coverage = T(o, t)                                  // ∈ [0,1], the target
reveal   = washPhase(o, t)                          // §3 — the temporal wash front
v        = coverage · reveal                         // the effective per-dot value
opacity  = baseOpacity + (1 - baseOpacity) · v       // fade in/out
radius   = dotSize · lerp(minScale, maxScale, v)     // grow/shrink (maxScale·dotSize ≤ 0.5·pitch)
tint     = samplePaletteOklch(v)                     // the warm-cream ramp (procedural-color, ONE source)
jitter   = drift(o, t) · (0.5 + 0.5·v)               // sub-cell breathing, livelier where covered
```

The dots stay a FINE FIELD — the `radius` cap (`maxScale·dotSize ≤ 0.5·gridPitch`) is the "grow/shrink **slightly**" fence; the silhouette is painted by COVERAGE, exactly as dot-flow paints by the sweeping band today.

---

## 3. "Washes over naturally" — the curl-warped coverage front (the temporal soul)

Not "fades in" (a global opacity ramp) but **washes over** — the shape ENTERS from somewhere and CROSSES. The dot-flow sweeping band (`waveBand`) is the seed; the full register:

- **`washPhase(o, t)`** — a coverage FRONT `f(t)` (a moving threshold) sweeping across the grid along a wash direction `D`: `reveal = smoothstep(f(t) - feather, f(t) + feather, projection(o, D))`. A dot reveals only once the front passes it. The 1-D analog of `waveBand` lifted to a directional front.
- **Wash-direction sources:** (a) **linear** (a tide from an edge — the wave preset), (b) **radial** (a bloom from a focal — the blob preset), (c) **curl-warped** (the front itself perturbed by the shared `curlFBM` so the edge is organic, not a straight line — the cloud preset, "washes over naturally" verbatim; the `curlFBM` chunk's #4+ consumer per D2).
- **Cross-fade between targets** (configurator/keyboard steps blob→wave→cloud): the OLD coverage washes OUT as the NEW washes IN — a directional dissolve, NOT a hard cut; `T` interpolates in COVERAGE space (a dot whose old+new coverage are both 0 never lights — no flash).

The wash is what makes the dot-matrix feel ALIVE (a wave actually crossing) rather than a slideshow of halftones.

---

## 4. The unify fold (D4 — lands on `<DotMatrix>`, not a 4th viz)

W-DOT-IMAGE is the SECOND of the two-wave dot sequence (per VIZ-BAND-PLAN.md D4): **`W-DOT-UNIFY`** (the three-viz fold → `<DotMatrix>` with `projection: grid|sphere` × `target: generative|texture|sdf|glyph`, the rasterizer SHARED + the lattice builders pluggable) → **`W-DOT-IMAGE`** (the arbitrary-image/cloud-wash TARGETS on the unified primitive). The mapping:

| current viz / new capability | becomes | driver |
|---|---|---|
| dot-flow-field | `<DotMatrix target="generative" shape="wave">` | `waveBand(sampleHeight)` — the existing sweep, ONE target preset |
| goo-dot-matrix | `<DotMatrix target="generative" shape="blob">` (≡ `target="sdf" sdf="metaball"`) | `thickness(sceneDistG)` |
| dot-matrix (sphere) | `<DotMatrix projection="sphere">` | the Fibonacci 3D lattice + depth-fade (a PROJECTION variant) |
| **NEW (this wave)** | `<DotMatrix target="texture">` · `target="generative" shape="cloud"` · `target="glyph"` | the arbitrary image / cloud-wash / glyph — new TARGETS on the SAME primitive |

Clean-break the three subpaths onto `/dot-matrix` with the axes (no aliases — the no-legacy law; MIGRATION row per old subpath: `particleCount → gridPitch` precedent). The W-PRUNE-CONSOLIDATE no-dual-path discipline applied to the dot family.

**Sequencing note (the orchestrator open-Q resolved):** OPTION A — ship the image TARGET on the dot-flow chassis FIRST IF the unify slips, but the spec assumes the unify lands first (so the new target is born on the unified primitive, no double-migration). The wave-spec author binds W-DOT-IMAGE ⟶ depends-on ⟶ W-DOT-UNIFY ⟶ depends-on ⟶ W-FIELD-ENGINE (D2) + W-GPU-ONLY-SPINE (D1).

---

## 5. Configurator + interactivity (the BD per-viz robustness mandate)

The studio inherits the AZ.W-HIERARCHY configurator vocabulary (section weight / label register / control rhythm); a CONSUMER composition (presets-in-consumers). Rungs: **Target** (`<SegmentedTabs>` Generative/Image/SDF/Glyph + the shape sub-picker; for Image an image-drop slot + downsample/contrast); **Dot grid** (`gridPitch`/`dotSize`/`minScale`/`maxScale`/`baseOpacity`/palette `<ColorSwatch>`); **Wash+flow** (direction Linear/Radial/Curl, speed, feather, `curlStrength`, shape-evolution speed); **Motion+interactivity** (still/breathing/washing + cursor-reveal/disturb/flick toggles); **Style** (`projection` Grid/Sphere, cartoon-shadow on/off, `globeMask`, background).

Interactivity — all on the shared `usePointerVelocityField` (fed `tick(delta)` from the renderer frame, NO own rAF), compositor-safe, PRM-gated: **cursor REVEAL** (a moving local coverage source — sweep to paint the image in, a birthdaycolor-grade protagonist move) · **cursor DISTURB** (velocity drags the lattice + flick BURST brightness bloom) · **drag the radial-wash focal** · **keyboard** (the suite's zero-keyboard gap: arrows nudge wash, `[`/`]` step the shape cross-dissolved, `Space` pause (WCAG-2.2.2), digits jump target presets; focus-guarded — the deck-keyboard precedent).

---

## 6. The fences (load-bearing — recorded so the build doesn't drift)

- **Zero Canvas2D (the BD/D1 mandate).** The image source is a GPU texture upload (`ImageBitmap → copyExternalImageToTexture` WGPU / `texImage2D` WebGL2), NEVER `getContext("2d")`/`getImageData`. The dot-flow WebGL2 fallback already retopologized OFF Canvas2D (a pure fragment dot-lattice) — it generalizes to the arbitrary `T` for free. **Open-Q — glyph:** a runtime canvas-rasterize of text IS a Canvas2D path (forbidden); use a pre-baked MSDF/alpha asset OR a GPU render-to-texture glyph pass; if neither is cheap, DEFER the glyph register (it is the lowest-priority idea).
- **It stays a DOT MATRIX (the "slightly" fence).** `maxScale·dotSize ≤ 0.5·gridPitch` — grows/shrinks but NEVER tessellates into a solid fill; the silhouette is a HALFTONE. Gate-clamped.
- **Warm-cream identity default; presets-in-consumers.** Library default palette = the warm-cream `{L:0.92,C:0.03,h:78}` family (mirrors the three siblings' `WARM_IDENTITY_PALETTE`). The generative SHAPE math (blob/wave/cloud) IS the library identity (library presets); COLOR theming (mono-on-near-black, teal/navy reproductions) stays in consumers — a teal/navy literal in the lib config reds the gate.
- **One math source, round-tripped.** `T`'s analytic sources (the Gerstner sweep, the `curlFBM` cloud, the metaball SDF) are pure JS exports the WGSL+GLSL transcribe; `proof:dot-image` round-trips JS↔WGSL↔GLSL at a fixed sample set. The cloud/wave consume the shared `field/` engine (D2, `proof:wave-field-single`) — no re-forked noise basis.
- **One loop · offscreen-park · live-PRM freeze.** Inherited from `createCanvasLifecycle` via `createGpuSubstrate` (`setupWGPU` + `setupGL`, `useGpuSubstrate.ts`); the pointer field is `tick(delta)`-fed (no own rAF). PRM → one static frame then park (the shape held + legible mid-wash).
- **Safari-first / GPU-only (D1).** Every path is pure WGSL/WebGL2 vertex+fragment+texture — all WebKit-native. The texture source needs the instanced path on BOTH backends (a fragment sampler is trivial; per-dot size wants the billboard). No `backdrop-filter:url()`, no Chromium-only compute requirement (the fullscreen-fragment fallback covers the no-WebGPU tail). WebGL2 is a CO-EQUAL backend, not a degrade.
- **Unify keeps the lattice builders separate (the no-god-path mitigation).** Unify the rasterizer + target + pointer + substrate + color (the high-duplication surface); keep `gridLattice`/`sphereLattice` pluggable pure builders (the genuinely-different geometry).

---

## 7. The wave shape (for the DAG author)

- **`W-DOT-IMAGE`** — the arbitrary-image/cloud-wash TARGETS on the unified `<DotMatrix>`. Depends-on: `W-DOT-UNIFY` (the rasterizer fold) ← `W-FIELD-ENGINE` (D2 shared `field/`) ← `W-GPU-ONLY-SPINE` (D1). Consumes: `field/{wave,flow,color}`, `sceneDistG` (blob target), `usePointerVelocityField`, the `fwidth`-SDF rasterizer leaf.
- **`proof:dot-image`** (device-free + the round-trip + self-test bites): (I1) the `T`-driven per-dot radius/opacity (≥1.4×/≥2× at full coverage, the ≤0.5·pitch dot-matrix clamp) · (I2) the curl-warped wash front (centroid translates, edge organic) · (I3) the four target sources resolve + the texture path is `ImageBitmap`/`copyExternalImageToTexture` with NO `getContext("2d")` (the zero-Canvas2D anti-evasion bite) · (I4) the cloud/wave share the `field/` engine (round-trip JS↔WGSL↔GLSL) · (I5) the unify — no third dot-rasterizer survives (`proof:no-dual-path`) · the warm-identity-default + teal/navy-literal-reds bites.
- **Binding π** (`tests-visual/dot-image.spec.ts`, LOCAL real-GPU, rides W-REFLECT3): a known image halftones + reads · a circle SDF target's silhouette matches `T` (IoU) · the wash frame-series (enter-from-edge + cross) · the cloud edge curl-organic · cursor-reveal interaction DELTA · PRM single-frame-held · BOTH modes · the `proof:ba-gestalt` substrates-band verdict (`complete_with_misses` IF the dot-matrix does NOT far-surpass the plain reference — a gestalt judgement re-earned on a fresh capture).
