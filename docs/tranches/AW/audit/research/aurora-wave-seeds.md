# AW aurora wave seeds

The concrete wave specs that perfect the aurora — each with its **scope**, the **SOTA
technique** it lands (cited), and the **gate** that machine-locks it. Seeded from the
32-agent SOTA research fan and `docs/tranches/AW/aurora/PATH-FORWARD.md`. These are
SEEDS — sizing/gating is finalized at wave planning. Grounded against glass-ui HEAD
`afdc485`. Tranche-development only; writes no `src/`.

The waves cluster into six arcs: **color** (OKLCh + derive), **options** (simplify),
**painterly** (the structure-tensor keystone + the van-Gogh/impasto/oil-pastel waves it
feeds), **WebGPU** (the multi-pass substrate), **interactivity**, and the **README**.

Dependency note: `AW.W1` (OKLCh) and `AW.W2` (derive) are independent and WebGL2-ship
now; `AW.W3` (options) is pure-TS and parallel; `AW.W4` (structure-tensor) is the
keystone that `AW.W5/W6/W7` consume; `AW.W8` (WebGPU) is the hinge that stages the
heavy half of the painterly arc; `AW.W9` (interactivity) builds on impasto + WebGPU;
`AW.W10` (README) lands last (it ships with this tranche but documents the rest).

---

## AW.W1 — In-shader OKLCh color core (the lowest-cost, highest-value win)

**Scope.** Splice the already-authored `OKLCH_MATRICES_GLSL`
(`procedural-color.glsl.ts:73-134`) into the aurora fragment program (today aurora
imports only `FBM_ROT_GLSL` + `OETF_GLSL`, `aurora.frag.ts:29-32`). Rewrite
`samplePalette` (`composition.glsl.ts:9-17`) to interpolate the LUT in OKLab/OKLCh —
lerp L and C, interpolate H along the shorter arc — instead of the linear-sRGB `mix()`.
Keep the CPU bake for the LUT *endpoints*; interpolate perceptually *between* them. Move
`brokenColorJitter` (`aurora.frag.ts:276-282`) off the YIQ-style sRGB `hueShift` matrix
to an OKLCh h/C jitter at fixed L; move `saturate3` (`:284`) into OKLCh. Add a `huePath`
atom (`shorter` | `longer` | `increasing`) so animated palette drift never flips at the
180° boundary.

**SOTA technique.** Perceptually-uniform OKLab interpolation kills the muddy-midtone
grey on warm↔cool ramps; broken color is *hue* variation at constant value, which only
OKLCh makes perceptually true (Ottosson, *Oklab*, `bottosson.github.io/posts/oklab/`;
Aras Pranckevičius, *Optimizing Oklab gradients* — the precompute-keys pattern aurora
already follows; Tailwind #14955 — interpolate ramps in OKLab, reserve the OKLCh hue-arc
for deliberate rainbow travel; MDN `<hue-interpolation-method>`). The matrices are
1e-6-verified and goo-blob-proven — zero new payload.

**Gate.** `proof:aurora-oklch-interp` — assert the spliced matrices match the value.js
Ottosson constants to 1e-6 (extend the `proof:aurora-space-gamma` / `proof:single-color-
core` seam), and a midpoint-chroma assertion (the OKLCh interpolation of a vivid blue→
yellow pair holds chroma above the linear-`mix` midpoint). WebGL2-ships now.

---

## AW.W2 — Derive-color variant: harmonies, easing, temperature, scene

**Scope.** Extend `deriveAurora` (`color.ts:152-200`), all additive on
`DeriveAuroraOptions` with current behavior as the default branch:
- Add `split-complementary` and `tetradic` to the `AuroraHarmony` union (`color.ts:110`)
  and the `deriveHue` switch (`:203`) — split-comp = anchor + 150/210; tetrad = anchor +
  90/180/270.
- Replace the single linear chroma falloff (`color.ts:193`) with selectable
  `lightnessEasing` / `chromaEasing` (`linear` | `sine` | `bell` | bezier); a **bell**
  chroma curve (peak in mids, desaturated extremes) becomes the new default.
- Add `temperatureShift` (0..1): a warm-as-it-lightens / cool-as-it-darkens hue delta
  coupled onto every harmony — the painterly-congruence axis.
- Add `deriveScene(seed, mood)` (`atmospheric` | `painterly` | `vivid` | `muted`) → a
  whole `AuroraConfig` (nuclei layout on a rule-of-thirds prior + medium + motion preset),
  not just the palette. Keep the `gamutMapStop` guard verbatim (`:250`).

**SOTA technique.** Adaptive harmony + muddy-zone avoidance + composable modifiers
(meodai/pro-color-harmonies); eased L/C journeys + bell chroma (Adobe Leonardo / OKLCh
ramp tooling); warm-light/cool-shadow temperature is the single most-cited painting rule
(Baudisch; Gamblin) and the fold that makes oil/pastel read as *mixed paint* not stamped
hue; rule-of-thirds/golden placement for composed (not centered) fields (virtualartacademy
golden-ratio). All accessed 2026-06-06.

**Gate.** `proof:aurora-derive-gamut` — assert every stop of every (harmony × easing ×
temperature) combination over a neon-seed matrix is in-sRGB after `gamutMapStop`
(extend the existing `color-equivalence` canary). Pure-TS, WebGL2-ships now.

---

## AW.W3 — Options simplification: the atoms of control

**Scope.** A `resolveAtoms(atoms) → AuroraConfig` pure mapper (Tier-1 → full config) and
a collapsed "Advanced" disclosure on the configurator. Tier-1 atoms (≤7): **seed**
(→ `deriveAurora`), **harmony**, **mood/energy** (one slider → `saturation` +
`warpAmount` + `valueVariance` + breath), **medium** (smooth · watercolor · pastel ·
oil-pastel · van-gogh), **texture amount** (→ the medium's dominant texture knob),
**motion** (still · breathing · drifting), **zones** (nuclei count, auto-arranged). The
full `AuroraConfig` stays whole as the power-user escape hatch (progressive disclosure).
Keep `DEFAULT_AURORA_CONFIG` — the wispy-sky default — untouched (`presets.ts:148`).

**SOTA technique.** Two-tier control surface — essentials shown, complexity revealed on
demand (progressive disclosure, UXPin; the Stripe/paper.design productized model:
gradient-stripe README, shaders.paper.design/grain-gradient). The ~28-field config is a
shader-author surface; ~7 atoms is the consumer door. Accessed 2026-06-06.

**Gate.** `proof:aurora-atoms-roundtrip` — assert `resolveAtoms` is a total function
(every atom combination produces a valid in-range `AuroraConfig`, every budget cap
respected per `budget.ts`) and that the default atoms resolve to the wispy-sky default.
Pure-TS, WebGL2-ships now.

---

## AW.W4 — Structure-tensor / edge-tangent-flow orientation field (the keystone)

**Scope.** Compute a per-pixel orientation + anisotropy field from the *color field's own
gradient*: Sobel-derivative `sampleBase` (which aurora already finite-differences for the
watercolor edge mask, `mediums.glsl.ts:29-32`), form the structure tensor
`J=[[Gx·Gx,Gx·Gy],[Gx·Gy,Gy·Gy]]`, Gaussian-smooth, eigen-decompose →
`(minorEigenvector, coherence A=(λ1−λ2)/(λ1+λ2))`. Feed it into `flowField`
(`flow.glsl.ts:6`) as a new `flowMode`/`uFlowPattern` "tensor"/"etf" branch and into
`bestOil`'s `flow` arg (`brush.glsl.ts:206-210`), behind a `strokeOrient: "flow" |
"tensor"` switch. A single-pass WebGL2 approximation (small fixed-tap neighborhood) ships
now; the smoothed multi-tap form is an `AW.W8` WebGPU pass. This is the dependency root
for `AW.W5/W6/W7` — **land it first** in the painterly arc.

**SOTA technique.** The canonical NPR stroke-orientation primitive — strokes follow the
minor eigenvector of the smoothed structure tensor, so brushwork hugs the color zones
(Kyprianidis & Kang, *Anisotropic Kuwahara*, CGF 2009, `kyprianidis.com/p/pg2009/`;
Heckel, *On Crafting Painterly Shaders*, 2024; Kang/Lee/Chui ETF, NPAR 2007). The single
biggest "congruent to real Van Gogh" lever; the README names it as the gap
(`README.md:273-275`). Accessed 2026-06-06.

**Gate.** `proof:aurora-tensor-field` — a unit test of the tensor math (a synthetic
gradient field yields the expected eigenvector orientation + coherence within tolerance)
plus a behavioral assertion that `strokeOrient:"tensor"` produces strokes whose mean
orientation tracks the field gradient (not the global flow pattern). WebGL2 single-pass
approximation now; full quality on `AW.W8`.

---

## AW.W5 — The van-Gogh atomic-stroke variant

**Scope.** A first-class `medium: "vangogh"` (retiring the "oil + swirl preset"
approximation). Composes `AW.W4` (ETF direction) + energy grading + OKLCh atomic
variation + `AW.W6` impasto: stroke length & layer density modulated by local luminance
of `sampleBase` (big confident strokes in bright/energetic passages, short dabs in the
darks; coherence `A` drives length so flat zones get stubby dabs); per-stroke OKLCh
pigment jitter (small ΔL, Δh, ΔC seeded per cell, via the `AW.W1` OKLCh broken-color
path); dense short directional strokes painted background→foreground. No subject matter —
the "source image" is the generated nuclei field. Reuses `bestOil` placement + the
`curvedStroke` SDF (`brush.glsl.ts`).

**SOTA technique.** Van Gogh's brushwork is a measurable turbulent cascade — stroke size
tracks local luminance/energy (Kolmogorov −5/3 at large scale, Batchelor at small;
*Hidden Turbulence in The Starry Night*, Physics of Fluids 36 / arXiv:2310.03415, 2024).
Energy-graded ETF-oriented strokes with broken color = congruent-to-real-Van-Gogh
directionality, no subject matter (Hertzmann, SIGGRAPH 1998; Sharma TAMU thesis; *Thinking
Like Van Gogh*, arXiv:2601.10075). Accessed 2026-06-06.

**Gate.** `proof:aurora-vangogh-preset` — a phase/preset-canon test that the `vangogh`
medium resolves its uniforms correctly + a snapshot-bless of the deterministic
`renderAt(t)` bake (the existing thumbnail-bake harness). Depends on `AW.W4`.

---

## AW.W6 — Real impasto: height field → normal → relit lighting

**Scope.** Retire the faked fixed-RGB edge rim (`brush.glsl.ts:173-178`, a phantom
upper-left light). Accumulate a per-pixel **paint height** across the four stroke layers
in `mediumOil` (coverage × per-layer thickness, perturbed by the existing
bristle/streak fBm for ridges/grooves; canvas tooth = base height). Derive a normal via
`dFdx`/`dFdy` of the accumulated height (already in-pattern — `fwidth` is used for AA).
Apply diffuse + Blinn specular from a new movable `uLightDir`/`uLightColor`, in linear
light *before* `aces()`. Thin strokes inherit canvas roughness; thick impasto overrides
it. The light direction becomes an interactive axis (cursor-as-light, `AW.W9`).

**SOTA technique.** Paint as a relit height field is the SOTA impasto model — accumulated
per-stroke height → finite-difference normal → ridge specular for "the characteristic
glossy peaks of thick impasto" (IMPaSTo, Baxter/Wendt/Lin NPAR 2004,
`gamma.cs.unc.edu/IMPASTO/`; Differentiable Stroke Planning, arXiv:2604.02752; LearnOpenGL
Normal Mapping). The difference between flat color and physically-raised pigment.
Accessed 2026-06-06.

**Gate.** `proof:aurora-impasto-relight` — assert the fixed-RGB rim constant
(`vec3(0.18,0.15,0.11)`) is gone from `paintOver` and the height→normal→light path is
present; a snapshot-bless that a `uLightDir` sweep changes the catch-light position
(view/light-dependent, not a baked rim). Lights in linear before the OETF.

---

## AW.W7 — Genuine oil-pastel: deposition + scumble + waxy film (+ Kuwahara finish)

**Scope.** Rework `mediumCrayon` (`mediums.glsl.ts:75-122`) from a tooth-multiply into a
pigment-on-tooth deposition model: tooth-occlusion deposition (pigment on peaks, skips
valleys — light pressure shows paper, heavy fills it, reading the `AW.W6` paper-height
field), a **scumble** broken-upper-layer pass (coverage<1 letting lower color through),
and a **waxy specular film** (low-roughness broad lobe, sheen growing with layer count =
burnish, distinct from oil's sharp glint). Orient along the `AW.W4` ETF field, OKLCh
broken color. Optional finishing operator: an **anisotropic Kuwahara** medium/post-pass
(8-sector elliptical kernel, polynomial weights η≈0.1/λ≈0.5, squeezed along the tensor) —
ships on the `AW.W8` WebGPU branch, no-op on WebGL2.

**SOTA technique.** Oil-pastel material truth — tooth occlusion, scumbling, waxy film
(Mont Marte / oil-pastel-techniques references). Anisotropic Kuwahara is the canonical
"make a gradient read as oil paint" operator — flat directional facets that preserve
edges (Kyprianidis & Kang CGF 2009; Heckel 2024; LYGIA `kuwahara`). Accessed 2026-06-06.

**Gate.** `proof:aurora-oilpastel-medium` — a snapshot-bless of the reworked
oil-pastel `renderAt(t)` bake + a perf assertion that the WebGL2 single-pass path stays
inside the budget (`profile:budget`); the Kuwahara finish is WebGPU-gated and behind a
`profile:budget` entry (it's the expensive operator — LYGIA flags it). Depends on `AW.W4`,
`AW.W6`.

---

## AW.W8 — The WebGPU path: createGPUCanvas + WGSL parity + multi-pass

**Scope.** Lift the backend-agnostic lifecycle out of `useWebGLCanvas.ts` (the one
backend-specific line is `getContext("webgl2")` at `:267`; the suspend set, offscreen-
park, PRM monitor, resize, dispose are all API-shaped) into a shared core; add a
`createGPUCanvas` sibling returning the same `WebGLCanvasFrame`-shaped hooks over a
`GPUDevice`. Extend `resolveRenderMode` (`renderMode.ts:31`) to `webgpu | webgl | css`,
probing `navigator.gpu.requestAdapter()`, WebGL2 the fallback, CSS the floor. Before any
second shader copy ships, make `procedural-color.glsl.ts` emit (or twin) a WGSL chunk
gated by a CPU-equivalence test (mirroring AV.W2's OETF convergence). Port the fragment
pipeline to WGSL (a fragment path, not compute, for the base field; uniform arrays → a
std140 storage struct — lifts the `MAX_NUCLEI 6`/`MAX_STOPS 8` caps). Add the multi-pass
structure-tensor pass (full-quality `AW.W4`), the anisotropic Kuwahara (`AW.W7`), and an
optional per-stroke buffer. Hand-written WGSL — **no Three.js/TSL** (preserves the
zero-dep posture, DESIGN.md §2.8). Every substrate contract (offscreen-park, PRM freeze,
`DockBackgroundToggle` pause) extends to the compute dispatch — a parked rAF skips compute.

**SOTA technique.** WebGPU ships by default in all four engines (Safari 26 was last,
2025-11-25, web.dev); production-deployable in 2026 with WebGL2 fallback (~95%/5%),
though not yet "Baseline widely available." Compute + storage buffers + multi-pass are
exactly what the single-pass WebGL2 fragment shader cannot express — the architectural
reason to adopt WebGPU here, not a perf chase (Chrome from-WebGL-to-WebGPU; WGSL spec;
Heckel TSL field guide — but the *evaluation* is hand-WGSL over TSL's Three.js dependency).
Accessed 2026-06-06.

**Gate.** `proof:aurora-backend-fallback` — force the WebGL2 path, assert it renders the
identical visual contract (the existing single-pass aurora is the declared fallback,
zero-regression); `proof:aurora-wgsl-equivalence` — the WGSL color/noise chunk matches its
GLSL twin to 1e-6 (the AV.W1 divergence-bug-class pre-empt). The hinge wave for the
full-quality painterly half.

---

## AW.W9 — Interactivity: cursor-as-light, velocity, stateful wake

**Scope.** Beyond the stateless cursor swirl (`aurora.frag.ts:229-244`,
`flow.glsl.ts:35-49`): (a) reuse the cursor seam to drive `AW.W6`'s `uLightDir` so the
impasto catch-lights track the pointer (a slow auto-orbit when idle); (b) extend
`cursorModel.ts` (position-only today) with pointer/scroll *velocity* — a fast flick
injects a transient swirl-burst easing out over ~1s; (c) on the WebGPU branch, one
ping-pong velocity texture — the pointer writes a delta-tracked Gaussian splat that
self-advects and dissipates, biasing the flow (lingering eddies, not an instantaneous
swirl), with a click→radial-ripple impulse; (d) scroll coupling via the existing
`useScrollProgress` composable. Every new axis hooks the substrate's PRM freeze + the
`DockBackgroundToggle` pause; one master tempo scalar dials the whole stack to stillness.

**SOTA technique.** Stateful pointer-coupling — the pointer writes into a velocity/dye
field that advects and decays (Pavel Dobryakov's WebGL-Fluid-Simulation delta-tracked
splat; Bridson 2007 procedural vortex). Accessibility is binding: WCAG 2.3.3 (Animation
from Interactions) requires non-essential interaction-motion be reducible; the substrate's
live PRM freeze + the WCAG-2.2.2 `DockBackgroundToggle` already own the gates. Accessed
2026-06-06.

**Gate.** `proof:aurora-interaction-prm` — assert every new interactive/parallax axis
is suppressed under `prefers-reduced-motion: reduce` and the master tempo scalar zeroes
the stateful field (extend the substrate's PRM-freeze contract). Builds on `AW.W6` +
`AW.W8`.

---

## AW.W10 — The research-backed README

**Scope.** The comprehensive consumer-facing README (`README.md`) — what aurora is and
why it is not a mesh gradient, the use cases, the medium modes (including the painterly
engine + the AW direction), the API/options surface, the best practices, the
color/performance notes, the examples + code snippets, the design considerations, and the
full cited references. Cross-links the path-forward (`docs/tranches/AW/aurora/PATH-
FORWARD.md`) for the painterly roadmap. (This wave is DELIVERED with the tranche-seeding
synthesis — the README at `README.md` already reflects this scope; the wave is the audit
that it stays current as `AW.W1–W9` land.)

**SOTA technique.** The README is the research synthesis made consumer-facing — every
technique it cites carries a URL + access date (2026-06-06), per the house "research-
backed READMEs" precept.

**Gate.** `proof:doc-consistency` (the existing doc-currency gate) — assert the README's
file:line anchors, the exported-symbol list, and the medium/option tables match the
shipped surface; no stale claims. WebGL2-ships now (docs-only).

---

## Sequencing summary

| Wave | Arc | Ships on | Depends on | Gate |
|---|---|---|---|---|
| AW.W1 | color | WebGL2 now | — | `proof:aurora-oklch-interp` |
| AW.W2 | color/derive | WebGL2 now (pure TS) | — | `proof:aurora-derive-gamut` |
| AW.W3 | options | WebGL2 now (pure TS) | — | `proof:aurora-atoms-roundtrip` |
| AW.W4 | painterly (keystone) | WebGL2 approx → WebGPU full | — | `proof:aurora-tensor-field` |
| AW.W5 | painterly (van-Gogh) | WebGL2 → WebGPU | W4 | `proof:aurora-vangogh-preset` |
| AW.W6 | painterly (impasto) | WebGL2 | — (pairs W4/W5) | `proof:aurora-impasto-relight` |
| AW.W7 | painterly (oil-pastel) | WebGL2 + Kuwahara on WebGPU | W4, W6 | `proof:aurora-oilpastel-medium` |
| AW.W8 | WebGPU (hinge) | WebGPU (WebGL2 fallback) | — | `proof:aurora-backend-fallback` + `…-wgsl-equivalence` |
| AW.W9 | interactivity | WebGL2 + WebGPU | W6, W8 | `proof:aurora-interaction-prm` |
| AW.W10 | README | docs-only | W1–W9 | `proof:doc-consistency` |

The cheap transformative wins (W1 OKLCh, W2 derive, W3 atoms) ship on WebGL2 immediately.
W4 is the painterly keystone (single-pass approximation now, full quality on W8). W8 is
the hinge that stages the heavy painterly half. Every wave preserves the wispy-sky default
and the locked linear→ACES→OETF→dither pipeline.
