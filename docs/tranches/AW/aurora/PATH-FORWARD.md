# Aurora — the path forward (the AW painterly perfection plan)

The concrete plan to make the aurora *stunning*: genuinely painterly oil-pastel + a
van-Gogh atomic-brushstroke variant, a full-OKLCh color pipeline with a derive-color
front door, a simplified intuitive option set, the WebGPU evaluation with Baseline
dates, the interactivity, and the performance budget. Synthesized from the 32-agent
SOTA research fan (`docs/tranches/AW/audit/research/aurora-partial.md` + the 32 cited
briefs). This is tranche-development — it plans the AW aurora waves, it writes no
`src/`. Grounded against glass-ui HEAD `afdc485`.

---

## 0. Where the aurora already is (the baseline the plan builds on)

The aurora is **not a blank slate, and not a mesh gradient** — it is already a
sophisticated single-pass painterly engine. Reading the live shader set, the baseline
is strong, which is precisely what sharpens where the real gaps are:

- **Composition** — a multi-nuclei softmax-Gaussian field with per-nucleus anisotropy
  (elongation + angle), over a CPU-baked palette LUT
  (`composition.glsl.ts:20-59`, `:9-17`). Quilez canonical **double domain-warp** +
  cellular/hybrid modes + a cursor swirl (`aurora.frag.ts:206-247`). This already
  exceeds the Stripe/OpenAI mesh-gradient substrate on *richness*.
- **Mediums (4 peers)** — watercolor (luma-gradient wet-edge + granulation),
  pastel (anisotropic fBm tooth), crayon (anisotropic tooth-multiply — a peer medium,
  `uMedium==4`), oil (4-layer curved-spine brushstroke SDF) (`mediums.glsl.ts`).
- **Brush** — a genuine curved swept-stroke SDF with quadratic-bulge spine,
  bristle-ragged edges, end-cap blobs, impasto rim/shadow, best-of-9-neighbor cell
  placement, and broken-color jitter (`brush.glsl.ts`).
- **Color science** — full OKLCh authoring through value.js's Ottosson core, a shipping
  `deriveAurora(seed, {harmony})` one-color→N-stop generator with per-stop
  gamut-mapping (`color.ts:152-200`, `:250-262`). The render pipeline is correct:
  linear-light compose → ACES tonemap → mandatory `linearToSrgb` OETF → 1-LSB IGN
  dither in display space (`aurora.frag.ts:330-343`), machine-locked by
  `proof:aurora-space-gamma`.
- **Substrate** — `useWebGLCanvas` (WebGL2) with offscreen-park, content-visibility
  pause, tab-backgrounded pause, live `prefers-reduced-motion` freeze, DPR clamp at 2×
  (`budget.ts:22`), and a CSS-gradient fallback (`renderMode.ts`).

So the four real gaps, each named precisely:

1. **Brushwork is procedural-grid SDF, not flow-guided from the image's own
   structure.** `bestOil` places strokes on a jittered grid and orients them off the
   *hand-authored* `flowField` (`brush.glsl.ts:188`, `flow.glsl.ts:6`). Real Van Gogh
   strokes *follow the forms* — they hug the color masses and swirl with the value
   gradient. The README itself names this gap (`README.md:273-275`). This is the single
   biggest fidelity lever, and it's the structure-tensor / edge-tangent-flow technique.

2. **Color interpolation is linear-sRGB, not OKLCh.** The palette is baked to linear
   CPU-side (`color.ts:42`) and `samplePalette` mixes the stops with a plain linear
   `mix()` (`composition.glsl.ts:16`) — so distant-hue gradient midpoints desaturate
   toward grey (the classic muddy-midtone artifact). Broken-color (`brokenColorJitter`,
   `aurora.frag.ts:276`) jitters via a YIQ-style sRGB rotation matrix, not OKLCh; so
   does saturation (`saturate3`, `:284`). The `OKLCH_MATRICES_GLSL` chunk is *already
   authored and 1e-6-verified* (`procedural-color.glsl.ts:73-134`) — aurora simply does
   not splice it. The single highest-leverage low-cost color win sits ready.

3. **The crayon/oil-pastel mode is a tooth-multiply, not painterly.** `mediumCrayon`
   (`mediums.glsl.ts:75`) is anisotropic noise × base color — it reads as a *textured
   gradient*, not oil-pastel. The user explicitly wants this "genuinely
   oil-pastel-redolent." The stroke machinery is deliberately bypassed for crayon.

4. **No WebGPU path.** Aurora is WebGL2-only (`runtime.ts`); the only `.wgsl` in the
   tree is `glassShader.wgsl` (a different surface). DESIGN.md invariant 8 bans
   multi-pass — which is exactly the constraint that blocks structure-tensor flow,
   anisotropic Kuwahara, and per-stroke compute. The README already anticipates the
   WebGPU branch relaxing this (`README.md:205`).

---

## 1. The painterly engine — oil-pastel + van-Gogh atomic brushstrokes

The headline. Make the brushwork read as *genuine paint*, not procedural texture. Four
techniques compose into the painterly engine, with one keystone they all consume.

### 1a. The keystone — structure-tensor / edge-tangent-flow (ETF) orientation field

Every painterly upgrade wants the *same* input: a per-pixel orientation + anisotropy
field derived from the color field's own gradient. The canonical NPR construction
(Kyprianidis & Kang, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*,
CGF 2009; Heckel, *On Crafting Painterly Shaders*, 2024) is:

1. Sobel-derivative the base color field (`sampleBase`, which aurora already
   finite-differences for the watercolor edge mask, `mediums.glsl.ts:29-32`) →
   `Gx`, `Gy`.
2. Form the structure tensor `J = [[Gx·Gx, Gx·Gy],[Gx·Gy, Gy·Gy]]`, Gaussian-smooth
   the three channels.
3. Eigen-decompose: the **minor-eigenvector** is the edge-tangent direction (the
   stroke direction); `A = (λ1−λ2)/(λ1+λ2)` is the **coherence/anisotropy**
   (how directional the neighbourhood is).

Strokes oriented along the minor eigenvector *hug the color zones* — the difference
between "strokes laid over a gradient" and "brushwork that follows the form," which is
the visual signature of real Van Gogh. The Starry Night brushwork is measurably a
turbulent flow field (Kolmogorov −5/3 at large scale, Batchelor at small scale, with
*stroke size tracking local luminance/energy*; arXiv:2310.03415, *Hidden Turbulence in
van Gogh's The Starry Night*, 2024), so the orientation field plus energy-graded stroke
length is what makes a variant *congruent to real Van Gogh* rather than a generic swirl.

A single-pass WebGL2 approximation is possible (small fixed-tap neighborhood estimate of
the gradient); the smoothed multi-tap form is a WebGPU/multi-pass wave. This is the
dependency root for everything below — **land it first**.

### 1b. The van-Gogh variant — energy-graded atomic strokes

A first-class `medium: "vangogh"` (not the current "oil + swirl preset"). It composes:

- **Direction from the ETF field (1a)**, not the global flow pattern — strokes hug the
  zones.
- **Energy-graded density + length**: modulate stroke length and layer density by local
  luminance of `sampleBase` — big confident strokes in bright/energetic passages, short
  fine dabs in the darks (the Kolmogorov/Batchelor congruence; coherence `A` drives
  length so flat zones get stubby dabs, coherent zones get long strokes).
- **Atomic per-stroke variation** — OKLCh per-stroke pigment jitter (small ΔL, Δh, ΔC
  seeded per cell), reusing the existing `brokenColorJitter` seam moved into OKLCh.
- **Real impasto** (1c) for depth.

Reuses `bestOil`'s placement and `curvedStroke`'s SDF (`brush.glsl.ts`) — only the
direction source, the energy grading, and the color space change. No subject matter —
the "source image" is the generated nuclei field, so strokes trace its iso-bands.

### 1c. Real impasto — height field → normal → relit, not a faked rim

Today impasto is a fixed-RGB edge rim under a phantom upper-left light
(`brush.glsl.ts:173-178`) — it never moves, never accumulates between strokes, never
responds to color. The SOTA model (IMPaSTo, Baxter/Wendt/Lin NPAR 2004; the
differentiable-stroke-planning height-field formulation, arXiv:2604.02752; Sharma's
*A Van Gogh Inspired 3D Shader Methodology*, TAMU) is:

1. Accumulate a per-pixel **paint height** across the stroke layers (coverage ×
   per-layer thickness, perturbed by the existing bristle/streak fBm for ridges and
   grooves; canvas tooth becomes the base height).
2. Derive a surface normal from the height gradient (`dFdx`/`dFdy`, already in-pattern
   — `fwidth` is used for AA).
3. Light it with diffuse + Blinn specular from a movable `uLightDir`, in linear light
   *before* `aces()`. Thin strokes inherit canvas roughness; thick impasto overrides it.

This makes impasto catch a raking light — the difference between flat color and
physically-raised pigment. The light direction becomes a gorgeous interactive axis
(cursor-as-light, see §5). It **retires the fixed-rim hack** rather than adding to it.

### 1d. Genuine oil-pastel — deposition + scumble + waxy film

Rework `mediumCrayon` from a tooth-multiply into a pigment-on-tooth deposition model
(Mont Marte / oil-pastel material references; the Kuwahara family for the flatten):

- **Tooth-occlusion deposition** — pigment deposits on tooth peaks, skips valleys
  (light pressure shows paper, heavy fills it), reading the shared paper-height field.
- **Scumble** — a broken upper layer (coverage < 1) letting the lower color show
  through, the signature oil-pastel move the current crayon half-does.
- **Waxy specular film** — a low-roughness broad-lobe sheen that *grows with layer
  count* (burnish), distinct from oil's sharp impasto glint.
- Oriented along the ETF field (1a), with OKLCh broken color.

The optional finishing operator is an **anisotropic Kuwahara** pass (8-sector
elliptical kernel, polynomial weights η≈0.1/λ≈0.5, squeezed along the ETF tensor) that
flattens the field into directional painterly facets that preserve edges — the
canonical "make a gradient read as oil paint" filter. It's multi-pass, so it ships on
the WebGPU branch and degrades to no-op on WebGL2.

### 1e. Pigment mixing where strokes overlap (optional fold)

Overlapping strokes currently composite with linear `mix()` (`brush.glsl.ts:182`), so
complementary hues muddy toward grey. Spectral Kubelka-Munk mixing (spectral.js,
**MIT** — *not* Mixbox, which is CC-BY-NC) makes blue+yellow→green like real pigment.
Gate it behind a `pigmentMix` flag (the smooth/atmospheric pole stays linear for cost);
apply only to the painterly mediums. This is the "looks like wet paint" vs "looks like a
blend" fold.

**Technique citations:** Kyprianidis & Kang, anisotropic Kuwahara CGF 2009
(`kyprianidis.com/p/pg2009/`); Heckel, *On Crafting Painterly Shaders* (2024,
`blog.maximeheckel.com/posts/on-crafting-painterly-shaders/`); Hertzmann, *Painterly
Rendering with Curved Brush Strokes of Multiple Sizes*, SIGGRAPH 1998; *Hidden
Turbulence in The Starry Night*, arXiv:2310.03415 (2024); IMPaSTo, NPAR 2004;
Differentiable Stroke Planning, arXiv:2604.02752; spectral.js
(`github.com/rvanwijnen/spectral.js`). All accessed 2026-06-06.

---

## 2. The full-OKLCh color pipeline + derive-color variant

The render pipeline's linear/gamma plumbing is *correct and locked* — don't touch it.
The gap is that interpolation, hue, and saturation happen in linear-sRGB instead of
OKLCh. The matrices are already written.

### 2a. In-shader OKLCh interpolation (the lowest-cost, highest-value color win)

Splice `OKLCH_MATRICES_GLSL` (`procedural-color.glsl.ts:73`) into aurora and rewrite
`samplePalette` (`composition.glsl.ts:9-17`) to interpolate in OKLab/OKLCh — lerp L and
C, interpolate H along the shorter arc — instead of the linear `mix()`. Keep the CPU
bake for the LUT *endpoints*; interpolate perceptually *between* them. This kills the
muddy-midtone class on warm↔cool ramps with zero new payload (the chunk is authored and
goo-blob-proven). Carry the same OKLCh into `brokenColorJitter` (h/C jitter at fixed L —
broken color is *hue* variation at constant value, which only OKLCh makes perceptually
true) and `saturate3`.

**Hue-path control.** Interpolation in OKLCh has a *direction* — `shorter` (default),
`longer`, `increasing`, `decreasing` (MDN `<hue-interpolation-method>`). For an animated
palette drift, `increasing` never flips at the 180° boundary the way `shorter`/`longer`
do. Expose `huePath` as one atom — it's how you get a deliberate rainbow sweep without
crossing grey. Note the OKLab-vs-OKLCh nuance: interpolate *ramps* in OKLab (straight
perceptual line, no hue detour through out-of-gamut); reserve the OKLCh hue-arc for
deliberate rainbow travel (Ottosson; Tailwind #14955 switched OKLCH→OKLab for gradient
interpolation for exactly this reason).

### 2b. The derive-color variant (the "atoms of control" front door)

`deriveAurora` already turns one seed into a palette. Extend it:

- **More harmonies** — add `split-complementary` and `tetradic` to the `AuroraHarmony`
  union (`color.ts:110`); both are clean angle sets the existing `deriveHue` switch
  hosts (split-comp = anchor + 150/210; tetrad = anchor + 90/180/270).
- **Eased L/C journeys** — replace the single linear chroma falloff (`color.ts:193`)
  with selectable easing (a **bell** chroma curve — peak in the mids, desaturated
  extremes — reads far more natural than linear; Adobe Leonardo / OKLCh ramp tooling).
- **Temperature coupling** (the painterly-congruence axis) — couple a
  warm-as-it-lightens / cool-as-it-darkens hue delta onto every harmony (the
  single most-cited painting rule; lights shift warmer, shadows cooler). This is what
  makes the oil/pastel modes read as *mixed paint* rather than stamped hue.
- **`deriveScene(seed, mood)`** — one seed + a mood word (`atmospheric` | `painterly` |
  `vivid` | `muted`) → not just the palette but a nuclei layout + medium + motion
  preset. The "give me one stunning backdrop" door, layered over the full schema.

Keep the existing `gamutMapStop` guard verbatim — it's already best-practice (adaptive-L0
through value.js's Ottosson core). All additive on `DeriveAuroraOptions` with current
behavior as the default branch — no break to the shipped `deriveAurora` signature.

**Citations:** Ottosson, Oklab (`bottosson.github.io/posts/oklab/`) + gamut clipping;
Aras Pranckevičius, *Optimizing Oklab gradients* (the precompute-keys pattern aurora
already follows); meodai/pro-color-harmonies (adaptive harmony + muddy-zone avoidance);
Baudisch / Gamblin (warm-light/cool-shadow temperature). Accessed 2026-06-06.

---

## 3. The simplified option set — the few intuitive knobs

The config is ~28 fields (`presets.ts:68-106`); the configurator exposes nearly all of
them across six tabs — a surface for *an author tuning a shader*, not *a consumer
choosing a backdrop*. The fix is a **two-tier "atoms of control" model**: a thin
consumer surface over the full author schema. Nothing is removed from `AuroraConfig` —
the simplification is in the *presented* surface and a pure `resolveAtoms()` mapper.

**Tier 1 — the atoms (≤7 knobs, the consumer door):**

1. **Seed color** (one OKLCh/hex) → drives `deriveAurora`.
2. **Harmony** (analogous · complementary · triad · split-comp · tetrad · mono).
3. **Mood / energy** (calm ↔ vivid) → one slider fanning to `saturation` + `warpAmount`
   + `valueVariance` + breath together.
4. **Medium** (smooth · watercolor · pastel · oil-pastel · van-gogh).
5. **Texture amount** (0..1) → the medium's dominant texture knob
   (`strokeAmount`/`wetEdge`/`canvasGrain` per medium).
6. **Motion** (still · breathing · drifting) → the four motion fields.
7. **Zones** (2–6) → nuclei count, auto-arranged on a rule-of-thirds/golden prior,
   hand-tunable in an "Advanced" disclosure.

**Tier 2 — Advanced:** the current full surface, collapsed by default (progressive
disclosure — show essentials, reveal complexity on demand). `resolveAtoms(atoms) →
AuroraConfig` is a pure, testable function; no shader change.

**Keep the wispy-sky default.** `DEFAULT_AURORA_CONFIG` (`presets.ts:148`) is the
`medium:"smooth"` atmospheric pole every wave leaves untouched — it's the canonical
default the user asked to preserve.

**Citations:** progressive disclosure (UXPin); the Stripe/paper.design two-tier control
surface (gradient-stripe README; shaders.paper.design/grain-gradient). Accessed
2026-06-06.

---

## 4. The WebGPU evaluation — adopt now or stage?

**Verdict: stage it, WebGPU-first with the WebGL2 fragment shader as a tested fallback —
land the substrate seam early but gate the painterly multi-pass waves behind it.** The
single architectural reason to adopt WebGPU here is that the painterly headline
(structure-tensor flow, anisotropic Kuwahara, per-stroke compute) is *multi-pass*, which
the single-pass WebGL2 fragment shader fundamentally cannot do — not a perf chase.

**Baseline dates (the load-bearing facts):**

- WebGPU ships by default in **all four major browser engines as of 25 November 2025**
  (Safari 26 on macOS Tahoe / iOS 26 was the last engine; Chrome/Edge 113+ since May
  2023; Firefox 141 Windows / 145+ Apple-Silicon; web.dev, 2025-11-25).
- It is **production-deployable in 2026 but not yet "Baseline widely available"** — the
  ~30-month all-engines mark has not passed, and parity is incomplete (Firefox
  Linux/Android in progress, Chrome Android needs 121+, Intel Macs partial). Reach is
  ~95% WebGPU / 5% WebGL2 with the fallback (web.dev; WebGPU.com critical-mass; Progosling
  2026-01 adoption checklist). All accessed 2026-06-06.

**The migration shape is low-risk because the substrate already isolates the backend.**
`useWebGLCanvas.ts:267` is the *one* `getContext("webgl2")` line; the entire lifecycle
(suspend set, offscreen-park, PRM monitor, resize, dispose) is API-shaped, not
GL-shaped, and the consumer seam is hooks (`setup(gl) → {frame, shouldContinue, resize,
time, teardown}`), not raw GL. A `createGPUCanvas` sibling returns the same hook shape
over a `GPUDevice`. `resolveRenderMode` (`renderMode.ts:31`) already does mount-time
tiering — add `"webgpu"`, probe `navigator.gpu.requestAdapter()`, fall back to WebGL2,
then the CSS placeholder floor.

**Decisions:**

- **Hand-written WGSL, not Three.js/TSL.** TSL gives write-once dual-backend, but pulls
  in Three.js — a heavy dependency the aurora's zero-dep, peer-disciplined posture does
  not carry (DESIGN.md §2.8). The GLSL→WGSL transcription is largely mechanical
  (`fwidth`→`dpdx/dpdy`, uniform arrays→a std140 struct, `gl.uniform*`→`writeBuffer`).
- **Single-source the GPU math before the second copy ships.** Make
  `procedural-color.glsl.ts` emit (or twin) a WGSL chunk gated by a CPU-equivalence test,
  mirroring how AV.W2 converged the OETF — pre-empts the AV.W1 divergence-bug class.
- **Fragment path, not compute, for the base field.** For a full-screen procedural
  backdrop the WGSL *fragment* path is the right target (faster than compute, dodges
  Safari's compute-shader limitations); compute is reserved for the structure-tensor
  pass and an optional per-stroke buffer.

So: ship the OKLCh color (§2), the derive-color front door (§2b), the simplified options
(§3), and the single-pass painterly approximations on **WebGL2 now**; stage the
structure-tensor multi-pass, anisotropic Kuwahara, and per-stroke compute on the
**WebGPU branch**, WebGL2 staying the universal fallback.

**Citations:** web.dev WebGPU support (2025-11-25); WebGPU.com critical-mass; Chrome
from-WebGL-to-WebGPU; WGSL spec (W3C); Heckel, *Field Guide to TSL and WebGPU* (2025-10).
Accessed 2026-06-06.

---

## 5. Interactivity — beyond the cursor swirl

Today interaction is cursor-swirl only — the pointer rotates the warp and bends the flow
(`aurora.frag.ts:229-244`, `flow.glsl.ts:35-49`), stateless and instantaneous. The SOTA
move is *stateful*: the pointer leaves a wake that advects and decays.

- **Cursor as light** (cheap, ships with the impasto wave §1c) — reuse the cursor seam
  to drive `uLightDir`, so the impasto catch-lights track the pointer and the relief
  reads tactile; a slow auto-orbit when idle.
- **Velocity-reactive flow** — extend `cursorModel.ts` with pointer/scroll *velocity*
  (it's position-only today); a fast flick injects a transient swirl-burst that eases
  out over ~1s, distinct from the steady attraction.
- **Stateful wake** (the WebGPU/feedback wave) — one ping-pong velocity texture; the
  pointer writes a Gaussian splat (delta-tracked, Pavel Dobryakov's stable-fluids
  pattern) that self-advects and dissipates, biasing the flow. The cursor leaves
  lingering eddies, not an instantaneous swirl. Click → a radial ripple impulse.
- **Scroll coupling** — bind palette/breath progress to scroll (the `useScrollProgress`
  motion composable already exists).

**Accessibility is binding.** Every interactive/parallax axis must honor `prefers-
reduced-motion` (WCAG 2.3.3) — the substrate already freezes to one static frame under
PRM; the new stateful field and any parallax must hook the *same* gate, and the
`DockBackgroundToggle` (WCAG 2.2.2) pause must stop it too. Design for one master tempo
scalar that PRM (and a `breathIntensity` knob) dials toward stillness.

**Citations:** Pavel Dobryakov WebGL-Fluid-Simulation (delta-tracked splat); Bridson
2007 (procedural vortex); MDN `prefers-reduced-motion`; WCAG 2.3.3/2.2.2. Accessed
2026-06-06.

---

## 6. The performance budget

The aurora is fill- and ALU-bound on mobile; the DPR clamp at 2× (`budget.ts:22`) is the
only resolution lever today. The plan keeps the budget envelope intact and extends it.

**The hot path:** `domainWarp` calls `fbm` 4× (the Quilez double-warp), each up to 5
octaves; `sampleBase` re-runs the *entire* warp + nuclei field, and it's called once per
stroke cell inside `bestOil` — up to ~9 neighbors × 4–5 layers ≈ 40+ full-field
recomputes per fragment in oil mode (`brush.glsl.ts:220`). This is the single biggest
cost and the reason oil mode forces the DPR cap.

**Levers, cheapest-highest-ROI first:**

- **`renderScale` under the DPR clamp** — a sub-1.0 render scale (≈0.85 on
  coarse-pointer/low-budget) is quadratic fill savings, invisible on a soft field.
- **Field-bake hoist** — even on WebGL2, hoist the single `domainWarp`+`nucleiField`
  result so `sampleBase`/`bestOil` stop recomputing it dozens of times per fragment.
  Lets oil mode run at full DPR and unblocks richer brush passes within budget.
- **Derivative-fBM warp** — the IQ analytic-derivative form (`morenoise`) holds apparent
  detail at 3–4 octaves where it now needs 5, and gives a free analytic gradient for
  curl flow and the structure tensor.
- **Palette LUT texture (1D 256×1)** — bake the OKLCh-interpolated ramp into a texture so
  `samplePalette` is one `texture()` tap, not a loop; banding stays closed by the IGN
  dither.
- **Half-res FBO + bilinear upsample** (the WebGPU/multi-pass infra) — render the heavy
  field at half resolution, upsample; near-lossless on a soft field, 4× fill cut on the
  heavy pass.

**The substrate contracts extend to every new path.** The offscreen-park
(`proof:offscreen-pause`), PRM freeze, and `DockBackgroundToggle` pause must reach the
compute/multi-pass dispatch — a parked rAF must skip compute too. The `/aurora` subpath
is a standalone ~16 KiB-gzip chunk today; the WGSL + compute pipeline grows it — size it
against the published subpath budget (`profile:budget`). Keep the budget tokens
(`budget.ts`) as the single CPU-side ceiling source.

**Citations:** WebGL Fundamentals (resizing/DPR); IQ fBm with derivatives (`morenoise`);
Aras, *Optimizing Oklab gradients* (LUT precompute); LearnOpenGL Framebuffers (half-res).
Accessed 2026-06-06.

---

## 7. Sequencing

The dependency graph, ordered so nothing blocks on WebGPU ubiquity and the cheap wins
ship first:

```
        ┌─ AW.W·color   (OKLCh in-shader interp + broken-color + hue-path)   ── WebGL2 now
 color ─┤
        └─ AW.W·derive  (derive-color: harmonies, easing, temperature, scene) ── WebGL2 now, pure TS

options ─ AW.W·atoms    (resolveAtoms + collapsed Advanced surface)           ── WebGL2 now, pure TS

         ┌─ AW.W·tensor (structure-tensor/ETF field — THE keystone)
painterly┤   ├─ AW.W·vangogh   (energy-graded atomic strokes)      ┐
         │   ├─ AW.W·impasto   (height→normal→relit light)         ├─ consume the tensor
         │   ├─ AW.W·oilpastel (deposition + scumble + waxy + Kuwahara) ┘
         │   └─ AW.W·pigment   (Kubelka-Munk overlap, optional fold)
         │
 webgpu ─┴─ AW.W·webgpu (createGPUCanvas + WGSL parity + multi-pass) ── stages the heavy half

interact ─ AW.W·interactive (cursor-as-light, velocity, stateful wake) ── builds on impasto + webgpu

  docs  ─ AW.W·readme  (the research-backed README — this plan's consumer face)
```

**Color (`AW.W·color`, `AW.W·derive`), options (`AW.W·atoms`), and the single-pass
painterly approximations land on WebGL2 immediately** — biggest visible win for least
code, no new substrate. **The structure-tensor keystone is the dependency root** for the
van-Gogh/impasto/oil-pastel/Kuwahara waves; a single-pass approximation ships on WebGL2,
full quality on WebGPU. **WebGPU is the hinge wave**, staged not rushed — gated behind the
capability probe, WebGL2 the universal fallback, CSS the floor.

---

## Headline + the 5 highest-value adopts

**Headline:** the aurora is already a sophisticated single-pass painterly engine, not a
mesh gradient — so the path to *stunning* is not a rewrite but four targeted folds over a
strong baseline: derive stroke orientation from the color field's own **structure tensor**
(so brushwork hugs the forms like real Van Gogh), move color into **OKLCh in-shader**
(the matrices already sit unused in the repo), collapse the 28-field surface to **~7
intuitive atoms**, and **stage WebGPU** as the multi-pass substrate for the heavy
painterly passes — with the cheap, transformative color and options wins shipping on
WebGL2 today.

**The 5 highest-value adopts:**

1. **In-shader OKLCh palette interpolation** — splice the already-authored,
   1e-6-verified `OKLCH_MATRICES_GLSL` and replace the linear `samplePalette` mix; kills
   muddy midtones with zero new payload. *Lowest cost, highest immediate visible win.*
   (Kyprianidis/Ottosson; Aras Pranckevičius.)

2. **Structure-tensor / ETF stroke orientation** — derive stroke direction from the
   gradient of the color field, not the hand-authored flow pattern; the single biggest
   "genuinely painterly / congruent to real Van Gogh" lever and the keystone every
   painterly wave consumes. (Kyprianidis & Kang CGF 2009; Heckel 2024.)

3. **Van-Gogh atomic-stroke variant** — a first-class `vangogh` medium: ETF-oriented,
   energy-graded (length/density by local luminance per the Starry Night turbulence
   cascade), OKLCh per-stroke variation, real impasto — atomic directional brushwork, no
   subject matter. (arXiv:2310.03415; Hertzmann 1998.)

4. **Real impasto (height → normal → relit)** — retire the faked fixed-RGB rim for an
   accumulated paint-height field lit by a movable directional source; thick paint that
   catches a raking light, with the light as an interactive axis. (IMPaSTo NPAR 2004;
   arXiv:2604.02752.)

5. **Simplified atoms + derive-color front door** — `resolveAtoms()` collapsing 28 fields
   to ~7 intuitive knobs, plus `deriveAurora` extended with split-complementary/tetradic
   harmonies, eased chroma, and warm/cool temperature coupling — "one seed → a stunning
   backdrop." (pro-color-harmonies; progressive disclosure; Baudisch/Gamblin temperature.)

All five except the WebGPU multi-pass half ship on WebGL2 today; WebGPU stages the
heavy painterly passes behind a capability probe with WebGL2 as the tested fallback.
