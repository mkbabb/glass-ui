# BC viz research — `concentric`

> Per-viz SOTA re-modernization research (BC iteration 1d). RESEARCH ONLY — no `src/` edits.
> Author: per-viz research agent. Date: 2026-06-18.

## 0. The defect (verbatim) + the root cause

USER-DEFECTS.md §E:

> `/substrates/concentric`: awful → must display **concentric ELLIPSOID LINES that form
> distinct WAVES** (not noise).

And the cross-cutting §E mandate that binds every viz:

> **WebGPU is present EVERYWHERE (as long as it works on Safari) — ALL animations use it.
> NO FALLBACKS. EVER. No canvas anywhere.** … **REMOVE the teal-on-navy reference entirely.**

### Root cause (read from source, not inferred)

The math is RIGHT; the *rendering* is wrong. `composables/ringField.ts:85` computes a
perfectly good radial-Fourier field `f(p,t) = Σⱼ Σᵢ Aᵢ·sin(kᵢ·‖p−cⱼ‖_e − ωᵢ·t + φᵢ)`. But
the shader (`shaders/concentric.wgsl.ts:130-146`, `shaders/concentric.glsl.ts:109-118`) maps
that field value **straight through a smooth OKLCh palette ramp**:

```wgsl
let raw = sampleRingField(p, t);
let v   = clamp(0.5 + raw * u.norm.x, 0.0, 1.0);   // field → [0,1]
let lin = samplePaletteLin(v);                      // smooth color ramp
```

A smooth field mapped through a smooth ramp is a **smooth color blur** — a low-frequency
cloud that reads as NOISE, never as lines. There is no isoline extraction, no thresholding,
no constant-width stroke. The five-octave Phillips ladder (`buildRingLadder`,
`ringField.ts:116`) *adds* high frequencies on top, which makes the blur busier — exactly the
"noise" the user sees. The ellipsoidal norm IS present (`ellipsoidalRadius`,
`ringField.ts:68`) so the latent geometry is elliptical; it just never paints as lines.

**The fix is a rendering change, not a math rewrite**: extract the *isolines* of the field
(or of a single clean radial phase) as thin antialiased strokes via the gradient-normalized
distance-to-isoline (Inigo Quilez, *Distance Estimation*), and DROP the multi-octave Phillips
noise stack for a small set of CLEAN low-frequency ring families whose interference reads as
*distinct beating waves* (the cymatics / contour-line aesthetic). This is the literal user
ask: "concentric ellipsoid LINES that form distinct WAVES."

### Secondary defects to fold in (from §E + the demo)

- **teal-on-navy is a library-adjacent demo default.** `demo/stories/substrates/presets.ts:64`
  ships `CONCENTRIC_PRESET_THEME` with `background: { L:0.12, C:0.03, h:255 }` (deep indigo)
  and an aqua palette, and `concentric.vue:21` defaults `useTheme = true` — so the live demo
  shows teal-on-navy by DEFAULT. The user said remove it ENTIRELY. The demo default must flip
  to the warm-cream identity; teal-on-navy may survive ONLY as a non-default named preset (or
  be deleted). The library `WARM_IDENTITY_PALETTE` (`constants.ts:53`) is already correct and
  is the right default.
- **"WebGPU everywhere, no fallback" tension.** The WebGL2 GLSL fallback (`concentric.glsl.ts`)
  is currently the parity path. The §E mandate says NO fallbacks where Safari is capable. See
  §4 — the resolution is to keep the substrate's *picker* (WebGPU is now Baseline incl. Safari
  26+, so the WebGPU path is taken on every modern engine), keep the GLSL twin ONLY as the
  graceful degrade for the genuinely-absent tail, and never SHIP the demo on the fallback.
- **No configurator.** The demo (`concentric.vue`) has only a two-state theme `Switch` and a
  pause toggle — not the "full configurator on the RIGHT on desktop" the §E mandate requires
  for every substrate page. The `ConcentricConfig` schema (`constants.ts:28`) already exposes
  every axis; the demo just never drives them.
- **No pointer interaction.** `config.interactive` (`constants.ts:42`) is declared but unwired
  — there is no pointer-velocity field consumption, no "rings warp toward cursor."

---

## 1. The SOTA technique (cited)

### 1.1 The line is the point — gradient-normalized distance to the zero-isoline

The canonical technique for turning an implicit field `f(x)` into **thin, constant-width,
antialiased lines** is Inigo Quilez's *Distance Estimation*
([iquilezles.org/articles/distance/](https://iquilezles.org/articles/distance/)). A first-order
Taylor expansion around a point `x` near the isoline gives `f(x+e) ≈ f(x) + ∇f(x)·e`, so the
screen-space distance to the nearest `f = 0` crossing is:

```
de ≈ |f(x)| / |∇f(x)|
```

This *normalizes out* the field's local slope, so the stroke is the same pixel-width
everywhere (without it, the contour is fat where the field is flat and razor-thin where it is
steep — IQ's "uneven thickness" problem). His exact rendering snippet (fetched verbatim from
the article):

```glsl
float color( vec2 x ) {
  float v = f( x );
  vec2  g = grad( x );
  float de = abs(v) / length(g);
  float eps = /* size of a pixel */;
  return smoothstep( 1.0*eps, 2.0*eps, de );   // constant-thickness AA outline
}
```

This is *the* primitive for the whole viz. Each ring/wave is an isoline of a clean radial
phase; the strokes are `smoothstep(thickness, thickness+aa, de)` over the gradient-normalized
distance. (Sources: [IQ Distance Estimation](https://iquilezles.org/articles/distance/);
the companion gradient-perpendicular-to-isoline reasoning is in
[IQ normals-of-an-SDF](https://iquilezles.org/articles/normalsSDF/).)

### 1.2 Two viable line operators — and which to pick

**(a) The `sin → abs → smoothstep` band (the Shadertoy idiom).** The common community pattern
([Shadertoy "antialiasing concentric rings" WsX3Rl](https://www.shadertoy.com/view/WsX3Rl);
[GLSL shader lab](https://blakecrosley.com/blog/glsl-shader-lab)) is:

```glsl
float wave  = sin(radius * k - omega * t + phase);  // [-1,1]
float band  = smoothstep(t0 - aa, t0 + aa, abs(wave)) ;  // thin line at each crest
```

`abs(sin)` is 0 at every crest/trough, so thresholding it near 0 draws a thin line at every
ring. This is cheap and reads as rings, but the line WIDTH is NOT constant — `abs(sin)` has the
same slope everywhere in *phase* but the *radial* slope is `k`, so as `k` grows the rings get
thinner (the IQ "uneven thickness" issue across octaves). Good enough for a single frequency.

**(b) The gradient-normalized isoline (the IQ rigorous path) — PICK THIS.** Because the ring
field is a sum of sinusoids, its gradient is available *analytically in closed form* (a sum of
cosines — no `fwidth`, no numerical central-difference, no second field eval). For the single
radial phase `θ = k·r − ω·t + φ` whose isolines are the rings:

```
phase(p)   = k · ‖p − c‖_e − ω·t + φ
∇phase(p)  = k · ∇‖p − c‖_e = k · ( (dx/a²) , (dy/b²) ) / ‖p − c‖_e
```

The "draw a line at every ring crest" version uses the *wrapped* phase distance: let
`s = sin(phase)`; then `∂s/∂p = cos(phase)·∇phase`, and
`de = |s| / |cos(phase)·∇phase| = |sin(phase)| / (|cos(phase)|·|∇phase|)`. Near a crest
`cos ≈ ±1`, so `de ≈ |sin(phase)| / |∇phase|` — a constant-pixel-width ring at every crest, for
free, with NO derivative built-ins. This is the rigorous, parity-clean path (the JS evaluator
can compute the exact same analytic gradient, so the round-trip gate stays exact).

**`fwidth` as the universal fallback.** Where an analytic gradient is awkward (e.g. when
summing many ring families into ONE composite line layer), WGSL's `fwidth(v) = |dpdx(v)| +
|dpdy(v)|` gives the screen-space derivative directly:
`band = 1.0 - smoothstep(0.0, fwidth(v)*1.5, abs(v))`. `fwidth`/`fwidthCoarse` are fully
supported in WebGPU on every engine incl. Safari/Metal (only `fwidthFine` is excluded in
WebGPU Compatibility Mode — we use the plain `fwidth`)
([WGSL derivatives reference](https://webgpu.rocks/wgsl/functions/derivative/);
[WGSL §16 builtins, w3.org/TR/WGSL](https://www.w3.org/TR/WGSL/);
[webgpufundamentals compat-mode](https://webgpufundamentals.org/webgpu/lessons/webgpu-compatibility-mode.html)).
**Design choice:** analytic gradient for the per-family ring lines (exact, parity-clean);
`fwidth` only as the safety clamp on the final composite.

### 1.3 The "distinct waves" — clean low-frequency ring families, NOT a Phillips noise ladder

The user wants *distinct waves*, not a busy field. The current 5-octave Phillips spectrum
(`buildRingLadder`, `ringField.ts:116`, decreasing λ × 0.62 per octave, energy-realistic
falloff) is the WRONG generator for LINES — it's a turbulence model for a *surface*, and its
high-octave fine rings smear into the noise the user complains about. Phillips/Tessendorf
energy spectra are designed to make an ocean *surface heightfield* look natural
([Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001](https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2004.pdf)),
not to produce clean contour lines.

The SOTA for "concentric lines that beat into distinct waves" is **a small set of clean,
low-frequency ring families crossing into moiré/interference** — the cymatics / Chladni
standing-wave aesthetic
([modern-physics.org/cymatics](https://modern-physics.org/cymatics/);
[Chladni modal analysis](https://www.researchgate.net/publication/344416410_Modal_Analysis_of_Chladni_Plate_Using_Cymatics))
and the topographic-contour-line aesthetic
([Topographic Line Art with WebGL — Dietcode](https://dietcode.io/p/topographic/)). The
generator should be:

- **2–4 ring FAMILIES** (one per center `cⱼ`), each a SINGLE clean radial frequency (or 2
  harmonics max), with slightly different wavelengths so they BEAT — `λ₁ ≈ 0.18`, `λ₂ ≈ 0.21`
  → a low-frequency moiré envelope (`Δk` small) that reads as broad sweeping waves. This is
  literal wave interference: two ring sources at slightly different wavenumbers produce a
  beat pattern whose envelope wavelength is `2π/Δk` — the "distinct waves" gestalt.
- **The ring TRAVEL** keeps the deep-water dispersion `ω = √(g·k)` (Tessendorf) for the
  outward ripple animation — that part is correct and shared with the dot-flow-field (the suite's
  ONE dispersion law). The math VOCABULARY stays; the GENERATOR (Phillips ladder → clean
  beating families) and the RENDER (palette ramp → isoline strokes) change.
- **Optional contour banding** (the topographic look): instead of (or layered under) the
  traveling rings, draw the isolines of the *static* interference envelope at evenly-spaced
  field levels — `de = |fract(f·N + 0.5) − 0.5| / |∇f·N|` (the contour-line operator). This
  gives the "elevation map" reading the Dietcode reference shows.

### 1.4 The ellipsoidal anisotropy (the "ellipsoid lines")

The user wants ellipsoid lines specifically. `ellipsoidalRadius` (`ringField.ts:68`) already
implements `‖p−c‖_e = √((dx/a)² + (dy/b)²)` with axis ratio `(a,b)`. Default `[1, 0.62]`
(`constants.ts:75`) reads as tilted ellipses (the 3D-disc-seen-at-an-angle depth implication).
This is correct and KEPT. Two refinements:

- **Per-family axis + rotation.** Add an optional rotation `α` per center so families tilt at
  different angles, making the interference read as crossing elliptical wave fronts (the
  `‖·‖_e` is computed in the family's rotated frame: `R(−α)·(p−c)` then the scaled norm). This
  is the "ellipsoid lines that form distinct waves" — two elliptical families at different
  tilts cross into rich moiré.
- **The aspect correction stays** (`fs_main` widens domain-x by canvas aspect,
  `concentric.wgsl.ts:126`) so the base rings are circular before the axis ratio tilts them.

---

## 2. The WGSL-first kernel (the design)

### 2.1 Shape class + substrate (UNCHANGED — reuse)

Concentric stays a **pure fullscreen fragment pass** (the aurora shape-class): a
full-screen-triangle `vs_main` (NDC corners `(-1,-1),(3,-1),(-1,3)`, no vertex buffer) + an
`fs_main` that evaluates the field and renders the lines. NO compute pass, NO particles, NO
storage buffer — so it composes `createGpuSubstrate` (`useGpuSubstrate.ts`) over the ONE
`createCanvasLifecycle` leaf exactly as today. **Do NOT fork the lifecycle.** The existing
`concentricWGPUSetup.ts` / `concentricGLSetup.ts` plumbing (one command encoder, one render
pass, `draw(3,1,0,0)`, premultiplied-alpha blend) is correct and reused; only the WGSL/GLSL
shader BODY and the uniform table change.

### 2.2 The fragment kernel (per pixel)

The kernel evaluates the field, derives the analytic gradient, extracts ring-crest isolines as
strokes, and composites. Pseudocode (WGSL-shaped, transcribed from the ONE JS evaluator):

```wgsl
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let aspect = max(u.norm.y, 1e-4);
  let p = vec2<f32>(in.uv.x * aspect, in.uv.y);   // aspect-corrected domain
  let t = u.u0.x;

  var ink = 0.0;          // accumulated line coverage [0,1]
  var tint = 0.0;         // accumulated field value for the palette (envelope hue)
  let lineW = u.line.x;   // base stroke half-width (px-space, after norm)
  let aa    = u.line.y;   // AA softness

  for (var j = 0; j < centerCount; j = j + 1) {
    let fam = u.centers[j];                 // (cx, cy, weight, rotAlpha)
    // rotate + ellipsoidal radius in the family frame
    let r   = ellipsoidalRadiusRot(p, fam.xy, axisA, axisB, fam.w);
    // ONE-or-TWO clean radial frequencies per family (NOT 5 Phillips octaves)
    for (var i = 0; i < ringCount; i = i + 1) {
      let rc    = u.rings[i];               // (amplitude, wavelength, phase, _)
      let k     = TAU / max(rc.y, 1e-4);
      let omega = sqrt(RING_GRAVITY * k) * speed;
      let phase = k * r - omega * t + rc.z;
      let s     = sin(phase);
      // analytic |∇phase| = k · |∇r| (r is the ellipsoidal radius → closed form)
      let gradMag = k * ellipsoidalGradMag(p, fam.xy, axisA, axisB, fam.w, r);
      // gradient-normalized distance to the nearest crest (IQ distance estimation)
      let de    = abs(s) / max(abs(cos(phase)) * gradMag, 1e-4);
      let line  = 1.0 - smoothstep(lineW, lineW + aa, de);
      ink  = max(ink, line * fam.z * rc.x);          // brightest-wins union of lines
      tint = tint + s * fam.z * rc.x;                // the beating envelope → hue
    }
  }

  // map the envelope value through the warm-cream OKLCh ramp (the ONE color source)
  let v   = clamp(0.5 + tint * u.norm.x, 0.0, 1.0);
  let lin = samplePaletteLin(v);
  let rgb = clamp(linearToSrgb(lin), vec3(0.0), vec3(1.0));

  // the LINE carries the ink; the field is a faint wash behind it (or transparent)
  let alpha = clamp(ink, 0.0, 1.0);             // line-driven alpha → page reads through troughs
  return vec4<f32>(rgb * alpha, alpha);          // premultiplied
}
```

Key differences from HEAD:
- The field value `tint` only chooses the *hue along the beat envelope*; it never paints by
  itself. The visible mark is `ink` — the union of thin isoline strokes (`max` = brightest
  ring wins, so crossing families read as a moiré lattice of bright lines).
- The analytic gradient `|∇phase| = k·|∇r|` is closed-form (no `fwidth`, no second eval), so the
  JS round-trip gate stays exact.
- `ringCount` drops from 5 to 1–2 per family (clean low frequencies); `centerCount` 2–4.

### 2.3 The shared color chunk (UNCHANGED)

The palette ramp still splices `procedural-color.wgsl.ts` (`OETF_WGSL`, `OKLCH_MATRICES_WGSL`)
for the WGSL primary and `procedural-color.glsl.ts` for the GLSL twin — the ONE color source,
so no cross-backend drift. The warm-cream `WARM_IDENTITY_PALETTE` (`constants.ts:53`) is the
default tint family. (Refs: PROCEDURAL-SUITE.md §"shared WGSL/GLSL color chunk".)

### 2.4 The uniform table (extend the typed-struct SoT)

`uniformBridgeWGPU.ts` is the typed-struct source-of-truth (the std140↔WGSL alignment trap
closed by ONE layout declaration). Extend it additively:
- `centers` row gains `.w = rotAlpha` (already a vec4 — the 4th lane is currently `_pad`, so
  ZERO byte-layout change).
- add a `line: vec4<f32>` lane: `(lineHalfWidth, aaSoftness, contourLevels, mode)` where `mode`
  selects {traveling-rings · static-contour · both}.
- `ringCount` default drops to 1–2; `MAX_RINGS` cap (8) stays for headroom.
This is an additive uniform widen — the bridge's "ONE layout declaration" discipline is
preserved (`uniformBridgeWGPU.ts:18-28`).

---

## 3. The WebGL2 fallback (where, and why)

WebGPU is **Baseline Newly-Available** as of 2025 — it ships by default in Chrome/Edge 113+,
Firefox 141+, and **Safari 26+** (macOS Tahoe 26, iOS/iPadOS 26, visionOS 26), enabled by
default ([caniuse WebGPU](https://caniuse.com/webgpu);
[WebKit — WWDC25 Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/);
[WebGPU hits critical mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/)).
So the user's "WebGPU everywhere incl. Safari, no fallback" is SATISFIABLE — the WebGPU primary
is taken on every current engine, Safari included.

**The fallback is kept ONLY for the genuinely-absent tail and NEVER demoed.** Per
PROCEDURAL-SUITE.md and `proof:gpu-substrate-single` clause B, the WebGL2 GLSL twin
(`concentric.glsl.ts`) is the graceful path for the ~5-10% that genuinely lack WebGPU (Linux
Firefox without the flag, pre-A12 iPhones on old iOS, flagged Firefox-Android). It is NOT
retired (clause B machine-blocks a premature retirement until the tail closes). It is a pure
fragment field — the SAME math, SAME OKLCh ramp — so parity stays **`verified`** (only
rasterizer sub-pixel drift, within the mean ΔE ≤ 2.0 / p99 ≤ 5.0 bar). The line-render change
must be transcribed into BOTH shaders line-for-line; the round-trip gate (`proof:concentric`
clause 3) keeps them in lockstep.

**The "no canvas anywhere" reading.** The user means "no Canvas2D viz" — concentric was never
Canvas2D; it is a GPU fragment pass on both backends. No change needed; the `<canvas>` ELEMENT
is the GPU surface (WebGPU `context.configure` / WebGL2 `getContext('webgl2')`), not a 2D
drawing context. This is compliant.

So: **WebGL2 fallback = `concentric.glsl.ts`, present but never the demoed/default path, kept
only until the genuine-absence tail closes (gated by `proof:gpu-substrate-single` clause B).**
Not `NONE` — Safari 26+ is covered by the WebGPU primary, but the older-tail fallback is the
honest graceful-degrade the suite discipline requires.

---

## 4. The configurator (the full tunable surface, controls-on-the-RIGHT)

The §E mandate: every substrate page gets a FULL configurator, controls on the RIGHT on
desktop, in a rounded card, with the giant-hero-shrinks-on-scroll header. `ConcentricConfig`
(`constants.ts:28`) already declares the schema; the demo just never drives it. The
configurator (a `useConfiguratorState<ConcentricConfig>`, AZ.W-HIERARCHY vocabulary) exposes:

| axis | control | range / note |
|---|---|---|
| **ring families** (`centers.length`) | stepper / +– | 1–4 — each a ring SOURCE; ≥2 → interference beats |
| **per-family position** (`centers[j].x/y`) | 2D pad / two sliders | domain `[-1,1]²` (or drag the source dot on the canvas) |
| **per-family weight** (`centers[j].weight`) | slider | 0–1 (a far family is fainter) |
| **per-family tilt** (`centers[j].rotAlpha`, NEW) | slider | 0–π — crossing elliptical fronts |
| **ring count per family** (`ringComponents.length`) | stepper | 1–2 clean freqs (NOT the 5-octave ladder) |
| **base wavelength** (`ringComponents[i].wavelength`) | slider | 0.10–0.35 — ring spacing (smaller = tighter rings) |
| **beat detune** (Δλ between families, NEW derived knob) | slider | 0–0.06 — the moiré envelope wavelength (the "distinct waves" dial) |
| **axis ratio** (`axisRatio`) | two sliders / aspect | `(a,b)` — the ellipsoid tilt; `[1,0.62]` default |
| **speed** (`speed`) | slider | 0–1.5 — scales `ω` (ring travel) |
| **line width** (NEW `line.x`) | slider | 0.5–4 px — the stroke thickness |
| **line softness** (NEW `line.y`) | slider | 0.5–3 px — AA edge |
| **render mode** (NEW `line.w`) | segmented tabs | traveling-rings · static-contour · both |
| **contour levels** (NEW `line.z`) | slider | 4–24 — for the topographic-contour mode |
| **palette** (`palette`) | OKLCh stop editor / preset chips | warm-cream default; presets-in-consumers |
| **background** (`background`) | ColorSwatch + transparent toggle | default transparent (reads over the page) |
| **interactive** (`interactive`) | switch | pointer warps the rings (see §6) |
| **paused** (WCAG 2.2.2) | switch / DockBackgroundToggle | parks the loop |
| **reduced-motion** | (auto) | one static frame then park |

The configurator is a `<Configurator>` on the RIGHT in a rounded panel (the §E
"controls-on-the-right + rounded" requirement), the canvas filling ONE card with the procedural
animation behind it (the §C "ONE card with the aurora or a procedural animation" idiom — not
the double-card-with-grid). `cloneMode: "commit-on-write"` (a single surface; a preset switch
is a clean reset — the library default, matching the README's stated rationale).

---

## 5. The comprehensive demo suite (stories / states)

The §C/§E standard: one giant audacious hero header that shrinks on scroll, the subpath shown
explicitly (`@mkbabb/glass-ui/concentric`), the body in ONE card with the live procedural
animation, the configurator on the right, sections delimited. The demo stories/states:

- **Hero / default** — the warm-cream identity rings over transparent, the DEFAULT (teal-on-navy
  is GONE as a default per §E). Giant `text-display-*` "Concentric" header that shrinks on
  scroll, subpath in a Fira-Code code block.
- **Distinct-waves showcase** — 2 ring families at a small beat detune, traveling outward — the
  literal user ask ("ellipsoid lines forming distinct waves"). The headline state.
- **Single-family rings** — one center, clean concentric ellipses (the simplest reading; the
  ellipsoid-tilt demo, axis ratio slider live).
- **Moiré-lattice** — 3–4 families at different tilts crossing into a rich interference lattice.
- **Topographic-contour mode** — static elevation contour lines of the interference envelope
  (the Dietcode reference look); `render mode = static-contour`, contour-levels slider live.
- **Pointer-reactive** — `interactive: true`, the rings warp toward the cursor (a transient
  ring center follows the pointer — see §6). Touch + mouse.
- **Palette tour** — warm-cream default + ≥2 named presets (the section-color ramp, a cool
  preset) showing presets-in-consumers; NO teal-on-navy default.
- **Reduced-motion** — PRM on → ONE static frame, the rings frozen (the substrate's live-PRM
  freeze; the field is a still contour map, legible at rest).
- **Paused (WCAG 2.2.2)** — `DockBackgroundToggle` parks the loop; the frozen frame stays
  crisp lines.
- **Configurator-driven** — every axis from §4 wired live, controls on the right.
- **Dual-backend parity** — (test, not a user story) the WGSL primary and GLSL fallback render
  the same frame within the ΔE bar (`proof:gpu-substrate-single` clause F).

---

## 6. The cursor / touch interaction model (velocity + acceleration)

Reuse the shared `usePointerVelocityField` (`src/composables/motion/usePointerVelocityField.ts`,
BB.B4 W-VIZ-POINTER) — it was minted EARLY exactly so the born-WebGPU viz chain
(W-GPU-SUBSTRATE → W-FLOWFIELD → W-CONCENTRIC) consume it at birth (per its header comment).
It owns NO own rAF — it is a PUSH-API the renderer FEEDS via `tick(deltaMs)` from inside the
existing `createCanvasLifecycle` frame callback (the one-loop / `proof:offscreen-pause`
discipline). It exposes position + smoothed-position + derived **velocity** + derived
**acceleration** (the second derivative) + a flick **burst** — all in normalized-host units per
second (frame-rate independent), with the PRM `tick(0)` freeze.

The concentric mapping (`config.interactive`, `constants.ts:42`):

- **Position → a transient ring family.** The cursor injects a fading additional center `c_p`
  at the smoothed pointer position (a 3rd/4th family), so the rings locally bend toward the
  cursor — a pond-ripple "drop a stone" reading. The transient family's weight decays when the
  pointer leaves (`active` ref).
- **Velocity → wave-front stretch.** The pointer velocity vector anisotropically stretches the
  transient family's ellipsoidal axis along the travel direction (fast drag → elongated wave
  front trailing the cursor). This reads as the rings being "dragged."
- **Acceleration → frequency push (the accel term).** A sharp pointer acceleration (a flick
  start) momentarily raises the transient family's wavenumber `k` (a frequency-shift impulse) —
  the rings briefly tighten where the user "pushes." This is the distinctive use of the second
  derivative the relay names (distinct from steady-drag velocity).
- **Burst → an expanding ripple.** A fast flick injects a `burst` that spawns ONE outward-
  traveling ring pulse from the release point (a phase impulse on `c_p` decaying over ~1s) —
  the "throw a stone" gesture. The burst decays per `burstDecay`.
- **PRM** → `tick(0)` freeze: the pointer write is skipped, velocity/accel/burst snap to zero,
  the rings stay still (accessibility absolute).
- **Touch** → identical (the pointer field is pointer-event based, so touch-drag and mouse-move
  are the same path; `touch-action: none` on the interactive canvas wrapper).

The pointer data feeds the uniform buffer each frame (the transient `c_p` center + its
stretched axis + its `k` push become a packed center row / line lane), so the GPU sees it as
just another ring family — no special-case kernel branch.

---

## 7. Discipline checklist (the binding fences)

- **ONE lifecycle leaf** — `createGpuSubstrate` over `createCanvasLifecycle`; ZERO scheduling
  re-fork. (UNCHANGED — reuse `useConcentric` / `concentricWGPUSetup` / `concentricGLSetup`.)
- **ONE math source** — `ringField.ts` is the pure JS evaluator; the WGSL `fs_main` and GLSL
  fragment transcribe it line-for-line (incl. the new analytic gradient + isoline operator).
  `proof:concentric` clause 3 round-trips them.
- **Warm-cream identity default** — `WARM_IDENTITY_PALETTE` (`constants.ts:53`) is the library
  default; **teal-on-navy is REMOVED as a default** (`presets.ts:64` + `concentric.vue:21` flip
  to warm-cream; teal-on-navy survives only as a non-default named preset or is deleted).
  `proof:concentric` clause 5 (no teal/navy/violet literal in `constants.ts`) stays GREEN.
- **Presets-in-consumers** — named themes live in `demo/stories/substrates/presets.ts`, never a
  library token.
- **keyframes.js for choreography** — the start/transition/end/restart of the *animation* (the
  hero shrink, a preset cross-fade, a pause settle) ride the ONE keyframes.js clock via the
  existing spring/motion registers; the ring TRAVEL is the shader's `ω·t` (the per-frame time
  base from the lifecycle leaf — ONE clock). No second timeline.
- **Real cited math** — IQ distance-to-isoline + Tessendorf dispersion + cymatics/Chladni
  interference + the contour-line operator. No arbitrary noise (the Phillips noise stack is
  DROPPED for clean beating families — the noise was the defect).
- **No CLAUDE.md / src edit here** — research only.

---

## 8. Summary of the change (what the implementation wave does)

1. **Render**: replace the smooth-field→palette map with the IQ gradient-normalized
   distance-to-isoline stroke render — thin bright antialiased ring/contour LINES. (Both WGSL
   + GLSL, transcribed in lockstep.)
2. **Generator**: drop the 5-octave Phillips noise ladder for 1–2 clean low-frequency rings per
   family + 2–4 families at small beat-detune / different tilts → distinct beating waves.
3. **Anisotropy**: add per-family rotation `rotAlpha` (reuse the spare `centers[j].w` lane) for
   crossing elliptical wave fronts.
4. **Uniforms**: additively widen the typed-struct SoT with a `line` vec4 (width/AA/levels/mode)
   — no byte-layout break.
5. **Configurator**: wire the full `ConcentricConfig` surface (§4), controls on the RIGHT, ONE
   card with the live animation, hero-shrinks-on-scroll.
6. **Interaction**: consume `usePointerVelocityField` (position→transient center, velocity→
   stretch, acceleration→frequency push, burst→ripple); PRM-frozen.
7. **Demo**: flip the default to warm-cream identity; teal-on-navy removed as default; full
   story suite (§5).
8. **Parity**: keep the WebGL2 GLSL fallback (Safari 26+ rides the WebGPU primary; fallback for
   the genuine-absence tail only, gated by `proof:gpu-substrate-single` clause B); transcribe
   the new render into it; round-trip stays exact.

---

## Sources

- [Inigo Quilez — Distance Estimation (the gradient-normalized distance-to-isoline; `de = |f|/|∇f|`, `smoothstep` constant-width AA)](https://iquilezles.org/articles/distance/)
- [Inigo Quilez — Normals of an SDF (gradient ⊥ isolines)](https://iquilezles.org/articles/normalsSDF/)
- [Inigo Quilez — 2D distance functions (opRound / SDF stroke)](https://iquilezles.org/articles/distfunctions2d/)
- [Shadertoy — antialiasing concentric rings (WsX3Rl) — the `abs(sin)`+smoothstep band idiom](https://www.shadertoy.com/view/WsX3Rl)
- [GLSL shader lab — sin→abs→smoothstep ring thresholding](https://blakecrosley.com/blog/glsl-shader-lab)
- [Topographic Line Art with WebGL — Dietcode (the contour-line aesthetic SOTA)](https://dietcode.io/p/topographic/)
- [Tessendorf — Simulating Ocean Water (deep-water dispersion `ω=√(gk)`, Phillips spectrum)](https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2004.pdf)
- [Cymatics / standing-wave interference (the distinct-waves aesthetic)](https://modern-physics.org/cymatics/)
- [Chladni modal analysis — concentric standing-wave nodes](https://www.researchgate.net/publication/344416410_Modal_Analysis_of_Chladni_Plate_Using_Cymatics)
- [caniuse — WebGPU (Baseline Newly Available 2025)](https://caniuse.com/webgpu)
- [WebKit — WWDC25: WebGPU in Safari 26 beta (enabled by default macOS/iOS/iPadOS/visionOS 26)](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- [WebGPU hits critical mass — all major browsers ship it](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/)
- [WGSL derivatives reference — fwidth/dpdx/dpdy](https://webgpu.rocks/wgsl/functions/derivative/)
- [WGSL spec §16 builtins (w3.org/TR/WGSL)](https://www.w3.org/TR/WGSL/)
- [webgpufundamentals — Compatibility Mode (fwidthFine excluded, fwidth/fwidthCoarse OK)](https://webgpufundamentals.org/webgpu/lessons/webgpu-compatibility-mode.html)
- file:src/components/custom/concentric/composables/ringField.ts:68,85,116 (the math source)
- file:src/components/custom/concentric/shaders/concentric.wgsl.ts:130-146 (the smooth-field→palette defect)
- file:src/components/custom/concentric/shaders/concentric.glsl.ts:109-118 (the GLSL twin defect)
- file:src/components/custom/concentric/constants.ts:28,53,75 (the schema + warm-identity default)
- file:src/components/custom/concentric/composables/uniformBridgeWGPU.ts:18-28 (the typed-struct SoT)
- file:demo/stories/substrates/presets.ts:64 + demo/stories/substrates/concentric.vue:21 (the teal-on-navy demo default to remove)
- file:src/composables/motion/usePointerVelocityField.ts (the shared pointer-physics field to consume)
