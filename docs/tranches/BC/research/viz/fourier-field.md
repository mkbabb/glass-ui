# BC viz research — fourier-field (WebGPU-first, ONE view, full configurator + comprehensive demo)

> RESEARCH ONLY. Zero src/ edits. This is the SOTA + design dossier the BC fourier-field
> implementation wave consumes. Every claim cites a URL or a `file:line`.

## 0. The mandate (verbatim) + the verdict it overturns

USER-DEFECTS.md §E (`docs/tranches/BC/audit/USER-DEFECTS.md:55`):

> FOURIER: **totally duplicative — several fourier views → ONE view**.

USER-DEFECTS.md §E header (`docs/tranches/BC/audit/USER-DEFECTS.md:51`):

> **WebGPU is present EVERYWHERE (as long as it works on Safari) — ALL animations use it. NO FALLBACKS. EVER.** No canvas anywhere.

These two lines OVERTURN the prior verdict. At HEAD the fourier-field is the lone "DO NOT
MIGRATE (now)" row in `PROCEDURAL-SUITE.md` (`src/components/custom/PROCEDURAL-SUITE.md:70`,
README `src/components/custom/fourier-field/README.md:183-192`): the booked successor
W-FOURIER-GPU gated migration behind "harmonic density scales to thousands of phasors". The
user has now made the trigger UNCONDITIONAL — WebGPU everywhere where Safari is capable, no
Canvas2D. So BC fires W-FOURIER-GPU early AND collapses the view duplication.

Two binding deliverables:
1. **ONE view.** The 4 demo files + 2 manifest rows collapse to ONE `<FourierField>` view + ONE
   manifest row (the studio IS the field — there is no separate ambient/foreground split).
2. **WebGPU primary, no Canvas2D.** The renderer moves off `useCanvas2D` onto `createGpuSubstrate`
   (the WebGPU-first picker). WebGL2 fallback ONLY where WebGPU is genuinely absent (the ~5-10%
   tail — Linux Firefox, pre-A12 iPhones); Safari 26+ is capable, so NO Safari fallback.

## 1. The duplication census (the "several fourier views" the user counted)

At HEAD the fourier surface is spread across SEVEN files + TWO manifest rows:

| file | role | disposition under "ONE view" |
|---|---|---|
| `src/components/custom/fourier-field/FourierField.vue` | the primitive (thin SFC) | **KEEP** — the ONE primitive, re-pointed onto the GPU substrate |
| `src/components/custom/fourier-field/composables/useFourierField.ts` | the ~475L Canvas2D renderer | **REPLACE** the Canvas2D body with the GPU-substrate renderer (keep the composable shell) |
| `src/components/custom/fourier-field/math.ts` | the pure DFT/epicycle math | **KEEP** — this is the ONE math source the WGSL transcribes |
| `src/components/custom/fourier-field/presets.ts` | the `hero`/`final` variant bundles | **FOLD** — the two variants collapse into config presets (no `variant` enum recolour split) |
| `demo/stories/substrates/fourier-field.vue` | the AMBIENT story (3 sections: two-presets, injected-color, freeze) | **RETIRE** (clean break) — its content folds into the ONE studio view |
| `demo/stories/substrates/fourier-studio.vue` | the FOREGROUND studio story | **BECOMES** the ONE view (renamed/merged to `fourier-field.vue`) |
| `demo/stories/substrates/FourierStudioStage.vue` | the studio's Canvas2D teaching stage | **FOLD** into the ONE `<FourierField>` (the field IS the teaching stage now — no separate stage component) |
| `demo/stories/substrates/fourier-paths.ts` | the shape-trace DFT library (ℱ/heart/star) | **KEEP** — feeds the source configurator axis |

Manifest rows (`demo/stories/manifest.ts:272` `fourier-field` + `:289` `fourier-studio`) →
**ONE row** (`fourier-field`, "Fourier Field" with the studio's interactive copy). The
`background:"fourier"` ambient-field usage on OTHER routes (`manifest.ts:730`,
`StoryHero.vue`, `dock-layer-contexts.ts`) STAYS — the ambient-background role is a separate
consumer of the primitive, not a duplicate VIEW. The "ONE view" mandate is about the
fourier's OWN demo page, not its background re-use elsewhere.

**Why the ambient vs foreground split was the duplication.** BA.W-FOURIER-STUDIO
(`fourier-studio.vue:1-22`) deliberately created TWO registers: the ambient recessive
`<FourierField>` (background chrome) and a foreground teaching `<FourierStudioStage>`. The
studio view (`fourier-studio.vue:392-413`) then RE-EMBEDS the ambient field at the bottom "same
clock, recessive register" — so the studio page shows the field TWICE (the stage + the ambient
companion), and the separate `fourier-field.vue` page shows it a THIRD way (hero/final presets).
That is literally three fourier views the user saw. The collapse: ONE `<FourierField>` that IS
both the ambient background and the interactive teaching surface — the epicycle chain, the
assembling partial-sum curve, the comet head, and the configurator transport all on ONE GPU
surface. No `FourierStudioStage`, no ambient-companion re-embed.

## 2. The SOTA — the canonical math (cited)

### 2.1 The complex Fourier series / epicycle reconstruction (the canon)

The "rotating circles drawing a path" is the **complex Fourier series**: a periodic curve
`f(t)` (period 1) is `f(t) = Σ_k c_k · exp(2πi·k·t)` where the complex coefficient
`c_k = ∫₀¹ f(t)·exp(−2πi·k·t) dt`. Each term `c_k·exp(2πi·k·t)` is a vector of length
`|c_k|` rotating at integer frequency `k`; stacked tip-to-tail they trace `f(t)` — the
epicycle chain. (3Blue1Brown, "But what is a Fourier series?",
https://www.3blue1brown.com/lessons/fourier-series/ ; The Coding Train / myFourierEpicycles,
https://www.myfourierepicycles.com/ .) This is EXACTLY what `math.ts` ships:
`positionsAt` (`math.ts:41-60`) stacks the chain `cx += c.re·cos − c.im·sin; cy += c.re·sin +
c.im·cos` per phasor; `partialSumAt` (`math.ts:78-95`) reads the final tip (the curve point);
`dftFromPoints` (`math.ts:113-142`) is the forward DFT `c_k = (1/N)Σ_n (x_n+iy_n)·exp(−2πi·k·n/N)`.
The signed-frequency order `0,+1,−1,+2,−2,…` (`math.ts:117-123`) is the epicycle ordering
(big low-order phasors first).

### 2.2 Elliptic Fourier descriptors (the closed-contour grounding)

The closed-curve case is the **elliptic Fourier descriptors** of Kuhl & Giardina, "Elliptic
Fourier Features of a Closed Contour", Computer Graphics and Image Processing 18 (1982) 236–258
(https://www.sciencedirect.com/science/article/abs/pii/0146664X8290034X ;
https://www.semanticscholar.org/paper/17a3a7735cafe32d337e7b8ed17dfa4ff0f09680 ). The x and y
coordinates are reconstructed independently in the frequency domain where each harmonic is an
ELLIPSE; the maximum order N sets the reconstruction fidelity. The complex-coefficient form
in §2.1 is the equivalent rectangular packing (a `+k`/`−k` counter-rotating pair = one tilted
ellipse). `makeEllipticSpectrum` (`math.ts:171-201`) is the GENERATIVE inverse: it MINTS an
elliptic spectrum (a dominant `+1`/`−1` pair of UNEQUAL magnitude = a tilted ellipse,
`math.ts:179-187`, plus `1/order`-falloff harmonics) rather than fitting one to an input
contour — the right model for ambient chrome (a literal glyph reads as content, not texture;
README `fourier-field/README.md:20-30`).

### 2.3 Arc-length resampling (the shape-trace fidelity floor)

A closed contour fed to `dftFromPoints` must be UNIFORMLY sampled in the parameter, else the
DFT sees a non-uniform signal and the reconstruction wobbles. The SOTA is arc-length
re-parametrization: `Δs = L/(N−1)`, resample by linear interpolation between adjacent points
(arxiv 2303.15205 "On canonical parameterizations of 2D-shapes",
https://arxiv.org/pdf/2303.15205 ). `fourier-paths.ts` already does this for the star
(`fourier-paths.ts:97-126` — cumulative arc length then walk it); the heart + ℱ glyph are
sampled parametrically/from the traced glyph (`fourier-paths.ts:69-81`, `:142-143`). KEEP this
leaf; the WGSL never sees raw points — it sees the resulting `BasisComponent[]` spectrum.

### 2.4 The render SOTA — GPU thick-polyline instanced rendering

The HEAD render is Canvas2D `ctx.stroke` (`useFourierField.ts:356-370`). The WebGPU SOTA for
thick anti-aliased polylines is **instanced line-segment rendering**: for a polyline of N
points draw N−1 instances, each instance a quad (two triangles) covering one segment + half
the join geometry on each end; a `lineCoord` varying gives the radial distance from the line
center so the fragment shader can SDF-antialias the stroke and round the caps/joins (Ricky
Reusser, webgpu-instanced-lines, https://github.com/rreusser/webgpu-instanced-lines ; Matt
DesLauriers, "Drawing Lines is Hard", https://mattdesl.svbtle.com/drawing-lines-is-hard ; the
SDF-merge corner technique, https://randygaul.github.io/graphics/2025/03/04/2D-Rendering-SDF-and-Atlases.html ;
Red Blob Games, SDF antialiasing, https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/ ).
Round caps/joins = "joins stretched around to form a cap" (Reusser). This is materially better
than a GL point-list (point-size is driver-capped, non-uniform, no per-vertex size control —
the flow-field render note, `flow-field.render.wgsl.ts:10-14`) — and crucially gives the BOLD
3px stroke + the glowing comet head the README register demands
(`fourier-field/README.md:79-90`) with crisp GPU AA, not the Canvas2D `shadowBlur` hack
(`useFourierField.ts:402-403`).

### 2.5 The WebGPU/WGSL Baseline status (the mandate-citation)

- **WebGPU is Baseline Newly Available (January 2026)** — stable + widely supported across
  Chrome 113+, Firefox 147+, and Safari 26+ on macOS/iOS/iPadOS/visionOS. (WebGPU browser
  support 2026, https://webo360solutions.com/blog/webgpu-browser-support/ ; gpuweb
  Implementation Status, https://github.com/gpuweb/gpuweb/wiki/Implementation-Status .)
- **Safari 26.0 ships WebGPU enabled by default** for macOS, iOS, iPadOS, and visionOS
  (released 2025-09-15): *"WebGPU has been enabled in Safari Technology Preview for over a year,
  and is now shipping in Safari 26.0 for macOS, iOS, iPadOS, and visionOS."* WGSL is the shading
  language, *"a new language that is verifiably safe for the web"*; compute shaders are
  supported. (WebKit Features in Safari 26.0,
  https://webkit.org/blog/17333/webkit-features-in-safari-26-0/ .)
- **CAVEAT (Safari WebGPU maturity).** Safari's WebGPU is new (shipped Sept 2025). The known
  field risk is the §H defect: "NONE of this works on Safari — it rapidly FLASHES the screen"
  (`USER-DEFECTS.md:74-75`). That flash is almost certainly the CSS liquid-morph path
  (backdrop-filter / mix-blend), NOT WGSL — but the fourier WGSL MUST be tested live on Safari
  26+ (the `device.lost` self-heal in `useWebGPUCanvas.ts:23-30` is the safety net; the
  `pushErrorScope`/`uncapturederror` bracket surfaces a validation error deterministically
  rather than a silent flashing canvas). Verdict: WebGPU primary on Safari 26+, NO Safari
  fallback (the mandate); the WebGL2 path exists ONLY for the genuinely-absent tail.

## 3. The WGSL-first approach (compute + instanced-line render, the ONE-math-source contract)

The fourier-field is a FRAGMENT-light, GEOMETRY-driven viz (a curve + an epicycle chain), so it
does NOT follow the aurora fullscreen-fragment shape. It follows the **flow-field two-pass
shape** (`flow-field.compute.wgsl.ts` + `flow-field.render.wgsl.ts`): a compute pass that
evaluates the math into a storage buffer, then an instanced-line render pass that draws the
geometry from that buffer. This is the GPU-line SOTA (§2.4) mapped onto the canvas patterns.

### 3.1 The ONE math source (the no-fork contract — `proof:flow-field` clause-3 precedent)

`math.ts` STAYS the single source. The compute kernel transcribes `positionsAt`/`partialSumAt`
LINE-FOR-LINE (the `flowField.ts ↔ FLOW_FIELD_COMPUTE_WGSL` precedent,
`flow-field.compute.wgsl.ts:7-9`). The spectrum (`BasisComponent[]`) is computed CPU-side
(JS) — `makeEllipticSpectrum` / `dftFromPoints` run once per source-swap on the CPU and the
coefficients upload as a uniform/storage table; the WGSL does the per-frame summation, never
the spectrum mint. A `proof:fourier-field` clause round-trips `positionsAt(spectrum, t, n)`
(JS) against the WGSL `epicycleChainTip(...)` at a fixed `(spectrum, t, n)` sample set — the
ΔE-equivalent of the math round-trip (a numeric position-delta bar, since this is geometry not
color).

### 3.2 The compute pass — `fourier-field.compute.wgsl.ts`

`@compute @workgroup_size(64)` over the curve-sample buffer (M samples around the period, e.g.
512). Each invocation `i` computes the partial-sum curve point at `t_i = (head_t − arc·i/M) mod 1`
truncated to N harmonics — i.e. the M trail/curve samples back along the period from the head
(the HEAD-relative arc the comet body needs, `useFourierField.ts:339-346`, now on the GPU). The
uniform table carries the coefficients `(re_k, im_k, index_k, _pad)` per phasor (≤ MAX_PHASORS,
e.g. 64 — comfortably covers the ℱ-glyph's ~160-term spectrum truncated to N; for N>64 a
storage buffer, but 64 is the configurator ceiling). The kernel:

```wgsl
// Uniforms: head_t, harmonicCount N, sampleCount M, trailArc, phasorCount
// phasors: array<vec4<f32>>  // (re, im, freqIndex, _pad) per phasor, CPU-minted
fn partialSumAt(t: f32, n: i32) -> vec2<f32> {
  var c = vec2<f32>(0.0, 0.0);
  for (var k = 0; k < MAX_PHASORS; k = k + 1) {
    if (k >= n || k >= phasorCount) { break; }
    let ph = u.phasors[k];
    let angle = TAU * ph.z * t;        // 2π·index·t
    let cs = cos(angle); let sn = sin(angle);
    c = c + vec2<f32>(ph.x*cs - ph.y*sn, ph.x*sn + ph.y*cs);
  }
  return c;                            // transcribes math.ts:78-95 EXACTLY
}
@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x; if (i >= u.sampleCount) { return; }
  let t = fract(u.head_t - u.trailArc * f32(i) / f32(u.sampleCount));
  curveSamples[i] = vec4<f32>(partialSumAt(t, u.harmonicN), f32(i)/f32(u.sampleCount), 0.0);
}
```

A SECOND tiny compute (or the same kernel's first K invocations) writes the EPICYCLE CHAIN tips
`positionsAt(spectrum, head_t, k)` for k=0..N into a `chainTips` buffer (the chain the render
pass draws as circles+arms). Both are pure `f(coefficients, head_t, N)` — deterministic, no
clock state in the kernel (the `head_t` arrives as a uniform from the ONE keyframes.js clock,
§6). This is the SAME determinism the morph-showcase SVG-goo needs (CLAUDE.md §morph M5).

### 3.3 The render pass — `fourier-field.render.wgsl.ts` (instanced lines)

Instanced line rendering (§2.4): the curve is M−1 segment instances reading `curveSamples` by
`instance_index`; each instance is a quad sized by the per-vertex stroke width with a `lineCoord`
varying; the fragment shader SDF-antialiases (round caps/joins) and reads the AGE (the
`curveSamples[i].z` 0..1) to apply the comet trail fade `peak·pow(age, fadeExp)` floored at
`peak·trailFloor` (the README persistence model, `fourier-field/README.md:89-90`,
`useFourierField.ts:362-364`) — now a per-fragment alpha, not a per-segment `globalAlpha`. A
SECOND instanced-line pass draws the epicycle chain (arms) + an instanced-quad pass for the
orbit circles (a ring SDF) + the joint dots — all from `chainTips`. A final small pass draws
the comet HEAD DOT (the soft halo + saturated core + white specular, `useFourierField.ts:415-440`)
as one instanced quad with a radial SDF. Color rides the SHARED `procedural-color.wgsl.ts` OKLCh
ramp (the ONE color source, `flow-field.render.wgsl.ts:17-19`,
`PROCEDURAL-SUITE.md:80-89`) — the rainbow epicycle palette (`useFourierField.ts:149-166`) is a
hue-sweep over that ramp, NOT a second color path. Premultiplied-alpha blend over the
transparent clear (the flow-field model, `flow-field.render.wgsl.ts:9`,
`flow-field.render.wgsl.ts:151-152`) — and CRUCIALLY this kills the `lighter` additive-on-cream
hue-blowout the Canvas2D path fought (`useFourierField.ts:380`, README `:113-129`): GPU
premultiplied blend keeps the saturated hue in both modes by construction.

### 3.4 The uniforms (the typed-struct source-of-truth)

A `uniformBridgeWGPU.ts` (the concentric/flow-field precedent — `concentric/composables/uniformBridgeWGPU.ts`,
`dot-flow-field/composables/uniformBridgeWGPU.ts`) packs ONE layout used by both passes:
`head_t`, `harmonicN`, `epicycleArmN`, `showEpicycles`, `sampleCount`, `trailArc`, `trailWidth`,
`peakAlpha`, `headGlowAlpha`, `trailFadeExp`, `trailFloor`, `phasorCount`, `intensity`, `aspect`,
the palette stops (linear-sRGB rgb + pad, ≤4), and the phasor table (re,im,index,pad ≤ MAX_PHASORS).
Explicit vec4-lane packing so the array stride is the natural 16 bytes (no std140 trap —
`flow-field.compute.wgsl.ts:13-15`).

### 3.5 Substrate composition (NO new lifecycle leaf — the binding discipline)

The renderer composes `createGpuSubstrate(canvas, { setupWGPU, setupGL })`
(`useGpuSubstrate.ts:87-143`) — the WebGPU-first picker over the ONE `createCanvasLifecycle`
leaf (`PROCEDURAL-SUITE.md:24-26`). It re-implements ZERO scheduling: offscreen-pause,
content-visibility park, live-PRM one-static-frame-then-park, device.lost self-heal all come
from the leaf for free (`useWebGPUCanvas.ts:5-30`). The `useFourierField.ts` composable shell
stays (the colocation symmetry); its Canvas2D body is replaced by the `createGpuSubstrate`
wiring (the `useDotFlowField.ts:62-90` model). The `clock`/`freeze`/`color`/`colorResolver`
seams are preserved verbatim — the public prop surface does not change.

## 4. The WebGL2 fallback (ONLY where WebGPU is genuinely absent)

Per the mandate (no Safari fallback — Safari 26+ is capable). The `setupGL` arm is the
~5-10% tail (Linux Firefox, pre-A12 iPhones, flagged Firefox-Android,
`PROCEDURAL-SUITE.md:54`). The WebGL2 fallback is the SAME instanced-line technique in GLSL
(WebGL2 has `gl_InstanceID` + `ANGLE_instanced_arrays` baked in core) reading the SAME
CPU-minted phasor table and stepping the SAME `partialSumAt` evaluator (the
`flow-field.glsl.ts` CPU-step precedent, `dot-flow-field/shaders/flow-field.glsl.ts`). Parity
is the bounded numeric position-delta + the OKLab ΔE bar mean≤2.0/p99≤5.0
(`PROCEDURAL-SUITE.md:56-60`) — the same `flow.glsl.ts ↔ flow-field.compute.wgsl.ts` shared-basis
discipline. The fallback is NOT retired (clause B blocks premature retirement,
`PROCEDURAL-SUITE.md:99-101`); it is just NEVER reached on a capable engine. NOTE: because the
phasor SUMMATION is cheap CPU-side for ≤64 phasors, a degenerate fallback could compute the
curve points on the CPU and feed a small vertex buffer — but the instanced-line GLSL path is
the byte-parity choice (one technique, two backends).

## 5. The configurator (controls on the RIGHT on desktop — the §E mandate)

USER-DEFECTS §E (`USER-DEFECTS.md:52`): "ALL configurators: controls on the RIGHT on desktop".
The `<Configurator>` shell already does the stage/controls split (`fourier-studio.vue:259-388`);
BC's chassis wave ensures controls-right. The configurator IS the existing studio's, refined to
the AZ.W-HIERARCHY vocabulary (`PROCEDURAL-SUITE.md:39-40`). The tunable axes (the full
configurator the user wants), with `useConfiguratorState<FourierFieldConfig>` per-preset:

| axis | type | range / values | what it does | source today |
|---|---|---|---|---|
| **source** | select | `elliptic-generated` · `ℱ wordmark` · `heart` · `star` (+ custom-trace booked) | the spectrum: a generated elliptic spectrum OR a curated shape's forward DFT | `fourier-studio.vue:75-79`, `fourier-paths.ts:141-145` |
| **harmonics (N)** | slider | 1 .. min(spectrum.length, 64) | TRUNCATE the partial sum — watch the curve assemble term by term | `fourier-studio.vue:335-345`, `math.ts:78-95` |
| **show epicycles** | toggle | bool | draw the rotating chain (orthogonal to N) | `fourier-studio.vue:347-358` |
| **epicycle arms** | slider | 1 .. N | how many chain arms to draw (≤ N) | `fourier-studio.vue:359-373` |
| **color** | ColorSwatch / select | `--viz-fourier` (warm) · `--viz-chebyshev` (cool) · `--viz-legendre` (violet) + custom | the curve hue (library viz palette; warm-cream default) | `fourier-studio.vue:69-73` |
| **rainbow chain** | toggle | bool | paint the epicycle chain as a warm-anchored hue sweep vs one analogous hue | `useFourierField.ts:149-166`, README `:96-104` |
| **trail arc** | slider | 0.15 .. 1.0 (fraction of period) | comet body length | `presets.ts:65` (`trailLength`), `useFourierField.ts:339` |
| **trail width** | slider | 1 .. 6 px | stroke weight | `presets.ts:71` |
| **intensity** | slider | 0 .. 2 | outer loudness envelope (per-layer alpha multiply) | `useFourierField.ts:70`, README `:131-139` |
| **harmonic scale** | slider | 0.05 .. 0.4 | character of the generated elliptic spectrum (smooth ellipse → crinkled) | `math.ts:175`, `presets.ts:63` |
| **(transport) play/pause** | toggle | — | the WCAG-2.2.2 pause via `DockBackgroundToggle` (or the W-DEMO-AFFORDANCES play register) | `fourier-studio.vue:301` |
| **(transport) scrub** | GlassTimeline | 0..1 | scrub `t` directly | `fourier-studio.vue:302-309` |
| **(transport) speed** | select | 0.25× · 0.5× · 1× · 2× | clock speed | `fourier-studio.vue:310-319` |

The `hero`/`final` `variant` enum (`presets.ts:60-101`) is RETIRED as a public axis — it folds
into config presets: `Ambient ellipse` (= hero: epicycles on, few harmonics), `Dense
reconstruction` (= final: epicycles off, dense), `Brand mark ℱ`, `Summing harmonics` (the
existing studio presets, `fourier-studio.vue:95-144`). One engine, config-presets — the
"variant IS the bundle" idiom (presets.ts:1-5) now expressed as configurator presets, not a
prop enum recolour. (MIGRATION row: the `<FourierField variant="hero|final">` prop → a config
preset; for the AMBIENT-background consumers `manifest.ts:730`/`StoryHero.vue` a thin default
preset preserves the look.)

## 6. The interaction model (cursor/touch + velocity/acceleration) + the ONE clock

### 6.1 The clock (keyframes.js, ONE clock — the choreography)

The mandate: "Leverage keyframes.js + value.js" (`USER-DEFECTS.md:81`). The single loop
parameter `head_t ∈ [0,1)` is driven by ONE clock. Today it's `useRAFLoop` advancing a `t` ref
(`fourier-studio.vue:179-191`) feeding the injectable `clock` getter (`FourierField.vue:51-57`).
BC routes the start/transition/end/restart CHOREOGRAPHY through keyframes.js (the house spring/
keyframe runtime, `@mkbabb/keyframes.js`): a `SpringProgress`/keyframe timeline drives `head_t`
so a source-swap (ℱ → heart) MORPHS the head position with a settle, a pause is a spring freeze,
a scrub re-seats velocity-continuous (the iOS interruptible contract, CLAUDE.md
W-PRESS-UNIFY). ONE clock for the field + the transport (no second rAF — the
`proof:offscreen-pause` discipline, `usePointerVelocityField.ts:6-17`). `freeze` /
reduced-motion still short-circuit to the deterministic `frozenT` (`useFourierField.ts:263-268`).

### 6.2 The pointer interaction — SCRUB the reconstruction (the assignment's named axis)

The assignment pins: "the pointer interaction (scrub the reconstruction)." The model composes
`usePointerVelocityField` (`src/composables/motion/usePointerVelocityField.ts`) — the shared
viz-pointer-physics reader (position + VELOCITY + ACCELERATION + flick BURST) the viz family
reads, FED via `tick(delta)` from inside the GPU substrate's frame callback (the no-own-rAF
push-API, `usePointerVelocityField.ts:6-17`). The fourier mapping:

- **Pointer X → scrub `head_t`.** Hovering/dragging across the field SCRUBS the reconstruction:
  the cursor's normalized-host X maps to the loop parameter, so dragging left↔right rewinds and
  fast-forwards the epicycle chain (the curve assembles/disassembles under the finger). This is
  the "scrub the reconstruction" interaction — direct, no transport needed.
- **Pointer VELOCITY → clock momentum.** A fast flick across the field injects a `burst`
  (`usePointerVelocityField` burst term) that the clock spring reads as a momentum impulse —
  the chain spins forward and DECAYS back to the ambient speed (the iOS fling-and-settle feel),
  velocity-continuous via the keyframes spring re-seat.
- **Pointer ACCELERATION → epicycle "push".** The accel term (the second derivative,
  `usePointerVelocityField.ts:22-25`) modulates the epicycle chain's amplitude/glow — a sharp
  push (high accel) blooms the head glow + briefly swells the chain radii (a sub-perceptual
  `1.04` cap, the `useLiquidFlex` LOW-cap register), a steady drag does not. This is the accel
  term the relay names being read by a real consumer.
- **Touch parity.** `usePointerVelocityField` is pointer-event based (pointer = mouse + touch),
  so a touch drag scrubs identically; the burst/accel read the same normalized derivatives.
- **PRM freeze.** Under `prefers-reduced-motion: reduce` the field is the deterministic
  `frozenT` and `tick(0)` snaps velocity/accel/burst to zero (`usePointerVelocityField.ts:30-36`)
  — the field is still, the scrub still WORKS (the pointer X→head_t mapping is a position read,
  not motion), but the momentum/swell dynamics are off (the gesture confirms, the physics off).

This makes `usePointerVelocityField` consumer #N (it was minted for the flow/concentric viz;
fourier is a clean additional binary consumer — strengthens its ≥2-consumer bar).

## 7. The comprehensive single-demo suite (the ONE view, all stories on it)

ONE manifest row → ONE `<FourierField>` view that COMPREHENSIVELY demonstrates the primitive (the
"comprehensive demo suite" mandate). The page uses the BC standard chassis: an audacious LARGE
hero header that SHRINKS on scroll, the subpath `/fourier-field` explicitly defined in the
masthead (`USER-DEFECTS.md:52`), the body in ONE card (not the double-card-with-grid idiom,
`USER-DEFECTS.md:26`), configurator controls on the RIGHT (`USER-DEFECTS.md:52`). The demo
STORIES/STATES it must cover (each a section/state on the ONE page):

1. **The live studio** — the ONE `<FourierField>` over its configurator (controls right): drag N
   and watch the curve assemble; toggle epicycles; pick a source (elliptic / ℱ / heart / star);
   pick a color; play/pause/scrub/speed transport.
2. **Assembling sum (N sweep)** — the headline state: N=1 (single ellipse) climbing to full
   reconstruction, the "watch it sum" reference idiom (`fourier-studio.vue:9`, README `:38-49`).
3. **Epicycle chain on/off** — the rotating circles + arms + joint dots vs the bare curve
   (orthogonal to N, `fourier-studio.vue:347-358`).
4. **Shape trace** — the ℱ wordmark / heart / star drawn by their own forward DFT
   (`fourier-paths.ts`, the brand tie-in).
5. **Rainbow chain vs single hue** — the warm-anchored hue sweep over the chain
   (`useFourierField.ts:149-166`).
6. **Injected color** — the warm-cream library default + the `--viz-*` palette (warm/cool/violet)
   + a custom ColorSwatch; re-resolves on a dark-mode toggle (the `fourier-field.vue:64-91`
   injected-color story folds in).
7. **Freeze (capture lever)** — ONE static deterministic best-frame, no animation (the
   `fourier-field.vue:93-111` freeze story folds in; also the PRM/offscreen auto-freeze).
8. **Pointer-scrub** — the cursor scrubs the reconstruction; a flick spins-and-settles; PRM
   keeps the scrub, drops the momentum.
9. **Ambient-background register** — the SAME field at low `intensity` as recessive page chrome
   (the `background:"fourier"` role, `manifest.ts:730`) — shown as ONE state, NOT a second
   re-embedded view (the duplication the collapse kills).
10. **Both modes** — light (warm-cream, source-over-equivalent) + dark (the phosphor sheen)
    composited correctly via premultiplied-alpha (§3.3).
11. **The WebGPU backend badge** — the resolved backend (`webgpu` on a capable engine) surfaced
    so the demo proves the migration (the `DotFlowFieldHandle.backend` precedent,
    `useDotFlowField.ts:32-33`).

## 8. The fences (the BC discipline, restated)

- **ONE math source.** `math.ts` is the single source; the WGSL transcribes `partialSumAt`/
  `positionsAt` line-for-line; the spectrum is CPU-minted (`makeEllipticSpectrum`/`dftFromPoints`).
  A `proof:fourier-field` round-trip locks the JS↔WGSL parity (the `proof:flow-field` clause-3
  precedent).
- **ONE color source.** The shared `procedural-color.wgsl.ts` OKLCh ramp; the rainbow chain is a
  hue-sweep over it, no second color path (`PROCEDURAL-SUITE.md:80-89`).
- **ONE lifecycle leaf.** `createGpuSubstrate` over `createCanvasLifecycle`; ZERO scheduling
  re-fork; the WebGPU/WebGL2 backends are the SAME handle surface (`useGpuSubstrate.ts:67-80`).
- **ONE clock.** keyframes.js drives `head_t`; no second rAF; `usePointerVelocityField` is FED
  by the substrate frame (`usePointerVelocityField.ts:6-17`).
- **Warm-cream identity default; presets-in-consumers.** The library default is the warm viz
  palette; teal-on-navy is a CONSUMER preset, never a library token (`PROCEDURAL-SUITE.md:42-44`;
  the user's "REMOVE the teal-on-navy reference entirely", `USER-DEFECTS.md:60`). NOTE: the HEAD
  `fourier-field.vue:22-23` color presets include a literal Teal `oklch(0.68 0.12 195)` — that
  demo-local Teal is RETIRED with the page (clean break).
- **WebGPU everywhere on Safari; no fallback where capable.** WebGL2 is the genuinely-absent
  tail ONLY (§4); Safari 26+ runs the WGSL primary (§2.5).
- **GL/WGSL fence.** The WGSL is the new primary (this IS the migration); the prior "GL shader
  fence" that protected `.frag` files does not apply — there is no prior fourier `.frag` (HEAD
  was Canvas2D). The Canvas2D renderer body is REPLACED, not fenced.

## 9. Open risks + booked successors

- **Safari WGSL live-verify (the §H flash).** MUST capture live on Safari 26+ — the
  `device.lost` self-heal + `pushErrorScope` bracket (`useWebGPUCanvas.ts:23-30`) is the safety
  net, but the binding evidence is a live Safari capture (the W-REFLECT3 π / `proof:ba-gestalt`
  substrate verdict). If the flash reproduces on the WGSL path (unlikely — it's the CSS-morph
  path per §H), the fallback for Safari is NOT the answer (mandate); the answer is the WGSL fix.
- **MAX_PHASORS ceiling.** 64 phasors via uniform table covers the configurator N≤64 ceiling +
  the ℱ-glyph truncated. A custom-trace source needing >64 terms is booked to a storage-buffer
  widen (cheap; the flow-field already uses a storage buffer for particles).
- **Custom trace input (draw-your-own).** The myFourierEpicycles "draw your own" facility
  (https://www.myfourierepicycles.com/) is a booked successor — a pointer-drawn closed path fed
  through `dftFromPoints` live. Today the curated ℱ/heart/star set covers the demo.
- **The `fourier-math` subpath.** `math.ts` ships on `/fourier-math` (README `:33-36`); KEEP —
  the WGSL transcription does not change the JS math export surface.
