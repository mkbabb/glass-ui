# W43 — Fourier-field SOTA research (the per-hero background substrate, pulled up + executed NOW)

**Lane** W43-fourier-sota (research) · **Status** EXECUTED 2026-06-09 (the pull-up ran NOW; source-grounded
against `FourierField.vue`/`math.ts` + the sibling `fourier-analysis` canvas-drawing leaves at HEAD, web SOTA
refreshed) · **Pulled up** per USER-DEFECTS pass-3 (the W43 SOTA research is no longer mid-tranche — "execute
it NOW, not mid-tranche") · **Target wave** `AX.W43-fourier-field-first-class.md` (the intensity model + full
citizenship) · **Downstream consumer** `W60` (the page-redesign container-layer — each hero gets a UNIQUE
aurora / constellation / fourier background per P7/Q9) · **HEAD** the AX line; the fourier-field present at
`src/components/custom/fourier-field/` on the `useCanvas2D` substrate.

> Research artefact. Writes no `src`. The recipe + the intensity prop + the W43/W60 consumption story below
> fold into W43's spec drive + the research-backed README. The deferral rationale in the W43 spec (§7) is
> SUPERSEDED by the pass-3 pull-up: the GPU-substrate dependency that motivated deferral (W07/W14) does NOT
> gate the Canvas2D render the §24-lift already ships — the research lands NOW on the Canvas2D parity-floor,
> and the WebGPU axis is recorded as a future additive enhancement, not a now-blocker (see §5).

---

## 0. TL;DR — the SOTA recipe + the verdict

The fourier-field is a **rotating-vector epicycle trace** — the "drawing with circles" canon
(3Blue1Brown / The Coding Train): a sum of phasors `c_k·exp(2πi·k·t)` whose tip-to-tail chain traces a closed
curve via the inverse DFT, with a fading comet trail chasing the head. glass-ui's implementation is already
SOTA-shaped on the MATH axis (the `evalFourier` / `positionsAt` epicycle chain is lifted verbatim from the
fourier-analysis sibling's `evaluateFourier` / `fourierPositionsAt`). The SOTA gap is NOT the math — it is the
**rendering recipe** (the gleam/glow/trail compositing) and the **per-hero background-substrate intensity
model**. The verdict, axis by axis:

1. **Math / generative model** — KEEP. The seeded-elliptic-spectrum (`makeEllipticSpectrum`) is the correct
   model for an AMBIENT background (a never-repeating generative curve, not a literal traced glyph). It is the
   sibling-repo math, single-sourced. The SOTA refinement is sorting + the per-variant harmonic budget, below.
2. **Rendering / compositing** — REPLACE the flat `globalAlpha` stroke with the **3-pass phosphor-comet recipe**
   (outer-glow / mid-bloom / sharp-core) under `lighter` additive blend on a dark ground and source-over on
   cream — the oscilloscope/CRT-vector look the SOTA names. This is what turns the 0.24-whisper into a
   signature mark, and it is the rendering half of W43's intensity bundle.
3. **Render path** — Canvas2D is the CORRECT default for ≤~64 phasors + a ≤200-point trail (the field's actual
   budget). WebGPU is NOT warranted at this scale (the GPU win starts at 10³–10⁶ points). Record WebGPU as a
   future additive enhancement; do NOT swap the shipped render.
4. **Intensity model** — the per-hero background substrate wants ONE outer-envelope `intensity` scalar (the
   Aurora `opacityCeiling` shape) over the per-variant peak/glow/trail BUNDLE. W43 ships exactly this. The
   recipe below specifies the bundle fields + their SOTA-grounded defaults.
5. **W60 consumption** — each hero binds ONE of `{aurora, constellation, fourier-field}` as its unique
   full-page background behind a GLASSY hero card (P7/Q9). The fourier-field's `variant` + `intensity` + `color`
   + `seed` are the four knobs W60 wires per hero; the `seed` is what makes every fourier hero unique without a
   second component.

---

## 1. The epicycle / DFT visualization canon (axis a — the SOTA aesthetic)

### 1.1 The mechanism (3Blue1Brown / The Coding Train)

The canonical "drawing with circles": any closed 2D curve sampled as a sequence of complex points `z_n = x_n +
i·y_n` decomposes under the DFT into frequency components `c_k`. Each `c_k` is a **rotating vector** (an
epicycle) — `|c_k|` is the circle radius (amplitude), `k` is the integer rotation speed (frequency), `arg(c_k)`
is the starting phase. Stacked **tip-to-tail** and advanced by `t`, the final tip traces the original curve. The
three canonical references converge on the same algorithm:

- **The DFT step** — sample N points along the path, treat as complex, `c_k = (1/N)·Σ z_n·exp(−2πi·k·n/N)`.
- **Sort by amplitude DESCENDING** — the largest circles drawn first, so the chain converges to the shape
  fastest and the visual hierarchy reads (big slow phasors dominate, small fast ones add detail). *This sort is
  the ONE SOTA refinement glass-ui's chain does not yet do* (it draws in spectrum-emission order — see §1.3).
- **Per-frame chain** — place `c_0` at origin, each epicycle's tip is the next's center; advance every angle by
  `2π·k·t`; the head is the last tip.
- **The traced trail** — store the head each frame, connect consecutive heads, optionally fade older segments.

Sources: [The Coding Train #130](https://thecodingtrain.com/challenges/130-drawing-with-fourier-transform-and-epicycles/),
[3Blue1Brown — Fourier series](https://www.3blue1brown.com/lessons/fourier-series/),
[myFourierEpicycles](https://www.myfourierepicycles.com/),
[drawing_SVGs_with_DFT](https://github.com/eileengarip/drawing_SVGs_with_DFT).

### 1.2 The aesthetic register — phosphor / oscilloscope-vector

The SOTA *look* for an epicycle trace as ambient chrome is the **CRT-vector / oscilloscope phosphor** register:
a bright moving head, a glowing comet trail that decays with persistence, faint rotating-circle "scaffolding"
underneath. The rendering literature is unanimous on the technique:

- **Multi-pass glow** — draw each bright shape in 3 passes: a WIDE DIM outer glow, a MID-WIDTH bloom, a SHARP
  BRIGHT core — "simulating the look of a real phosphor beam"
  ([libretro phosphor-trail thread](https://forums.libretro.com/t/has-there-ever-been-written-a-phosphor-trail-glow-shader/485),
  [Phaser RetroZone](https://phaser.io/news/2026/03/retrozone-open-source-retro-display-engine-phaser)).
- **Additive blend for the glow** — overlapping glow passes ADD light (`output = src + dst`) instead of
  occluding, so crossings of the trail bloom brighter; `ctx.globalCompositeOperation = "lighter"` is the
  Canvas2D additive op ([three.js additive thread](https://discourse.threejs.org/t/additive-blending-on-transparent-canvas/21630),
  [LearnOpenGL ES additive](https://www.learnopengles.com/tag/additive-blending/)).
- **Persistence decay** — the trail body fades with age; the SOTA decay is a SOFT exponent, not a hard quadratic
  (a quadratic kills the body — the exact 0.24-build defect W43 names).

### 1.3 The glass-ui SPECIFIC fit + the two refinements

glass-ui's field is NOT a literal-glyph tracer (it does not DFT a logo) — it is a **seeded generative ambient
curve**. That is the RIGHT choice for a per-hero background (a literal glyph would read as content, not chrome;
a never-repeating elliptic spectrum reads as living texture). Two SOTA refinements the recipe folds:

- **(R1) Sort the spectrum by amplitude descending before drawing the epicycle chain.** `makeEllipticSpectrum`
  emits `[+1, −1, +2, −2, +3, −3, …]` (emission order, NOT amplitude order). The epicycle scaffolding reads
  cleaner and the chain converges visually if the circles are drawn largest-first. A one-line
  `spectrum.sort((a,b) => b.amplitude - a.amplitude)` after `buildSpectrum` (or a sorted copy for the draw
  pass — keep the reconstruction order intact since the SUM is order-independent). LOW-RISK, high-polish.
- **(R2) The trail is the SIGNATURE, not the scaffolding.** On an ambient background the rotating circles are
  *optional faint scaffolding* (hero only, very low alpha); the COMET TRAIL + HEAD GLOW carry the brand mark.
  The intensity bundle must weight the trail/head ABOVE the epicycles (the W43 `headGlowAlpha` strongest-layer
  rule + the `epicycleRatios` below-the-outline rule).

---

## 2. The implementable RENDERING recipe (the W43 intensity-model half)

This is the concrete paint recipe W43 Arm-A lands in `FourierField.vue`'s `render()`. It REPLACES the flat
`OUTLINE_PEAK_ALPHA * age * age` stroke. Every magnitude is a per-variant BUNDLE field (J §6.3 "the variant IS
the bundle") scaled by the ONE outer `intensity` prop.

### 2.1 The compositing model — additive glow, source-over core

```
// resolved per color/dark watch (NOT per frame — the zero-alloc hoist):
//   outlineRgb, epicycleRgb (the [r,g,b] + the hue-shifted second hue)
// resolved per variant (the bundle), scaled by `intensity`:
//   peak = preset.peakAlpha * intensity
//   headGlow = preset.headGlowAlpha * intensity   (the STRONGEST layer)

c.clearRect(0,0,w,h);

// ── Pass 0 (hero only): epicycle scaffolding — faint, BELOW the outline.
//    sorted-descending spectrum (R1); alpha = peak * epicycleRatios.{circle,arm}
//    drawn source-over (scaffolding does not bloom).

// ── Pass 1: the comet TRAIL body — additive glow.
c.globalCompositeOperation = isDark ? "lighter" : "source-over";
//   isDark → "lighter" (additive phosphor bloom on the ink ground;
//            crossings brighten — the oscilloscope look)
//   light  → "source-over" (additive over cream blows out to white; a
//            normal alpha stroke keeps the warm hue legible)
for each trail segment i:
    age = i/(len-1)                       // 0 oldest … 1 head
    a = peak * pow(age, trailFadeExp)     // SOFT exponent ≈1.4, NOT age*age
    a = max(a, peak * trailFloor)         // the body survives — never dies to 0
    c.globalAlpha = a
    stroke segment   // lineWidth 1.6, round cap/join

// ── Pass 2: the HEAD GLOW — the strongest layer, sharp core + shadow bloom.
c.shadowColor = outlineRgb
c.shadowBlur = headGlowBlur               // ~14–18px, per variant
c.globalAlpha = headGlow                  // > peak — head-forward
c.lineWidth = 2
stroke the last ~4 trail points
c.shadowBlur = 0; c.globalCompositeOperation = "source-over"; c.globalAlpha = 1
```

**Why the blend forks on dark/light (the cardinal Safari-safe lesson):** `lighter` (additive) over a dark ink
ground is the phosphor look — light accumulates, trail crossings bloom. Over the warm-cream ground additive
blows the trail to white and kills the hue (the same `screen`-over-cream defect W52 names for the glass
material). So the field reads additive on ink, plain-alpha on cream — driven off the `isDark` watch the
component already owns. **The Safari-safe distinction (load-bearing — do NOT conflate with W52's blend
choice):** the field uses `ctx.globalCompositeOperation = "lighter"` — the **Canvas2D 2D-context compositing
op**, universally supported across every engine since the Canvas2D spec shipped (no Safari quirk, no
`@supports` gate, no fallback rung needed). This is DIFFERENT from W52's `plus-lighter` choice — W52 composites
a CSS `mix-blend-mode` against the page backdrop (the Safari-quirky path that needs the HDR-clamp + an
un-blended fallback), whereas the fourier-field composites WITHIN its own canvas via the 2D drawing context,
which has no such quirk. (Corroboration: Safari 26.4, March 2026, added the `lighter` operator even for
SVGFECompositeElement — the additive op is first-class across the platform; the Canvas2D `"lighter"` predates
that by a decade.) The 2D-context `"lighter"` is the device-free-safe path; no fallback rung is required.

### 2.2 The per-variant BUNDLE fields (extends `VariantPreset`)

| Field | Type | Role | hero | final |
|-------|------|------|------|-------|
| `peakAlpha` | number | comet-trail peak (replaces `OUTLINE_PEAK_ALPHA`) | **0.55** | **0.45** |
| `headGlowAlpha` | number | head-glow alpha — the STRONGEST layer | **0.62** | **0.50** |
| `headGlowBlur` | number (px) | head-glow shadow-blur radius | **16** | **14** |
| `epicycleRatios` | `{circle,arm}` | scaffolding alpha ÷ peak (hero only) | `{0.18, 0.30}` | `{0,0}` (off) |
| `trailFadeExp` | number | trail persistence exponent (soft, not quadratic) | **1.4** | **1.5** |
| `trailFloor` | number | min trail alpha ÷ peak — the body survives | **0.10** | **0.08** |

The §7.1 user-ratified targets (hero head-glow ≈0.55, trail head ≈0.35; final ≈0.45) are the RATIFIED anchors;
the table above resolves them into the full bundle — note `headGlowAlpha` sits ABOVE `peakAlpha` (head-forward)
and the trail HEAD (peak·1.0 = the youngest segment) lands at hero ≈0.55 with the head-glow lifting the last 4
segments to ≈0.62. The "trail head ≈0.35" ratify is the value AFTER the `intensity` default ride at a recessed
hero loudness — record both readings in the W43 audit so the gate measures the right one.

### 2.3 The `intensity` prop — the Aurora `opacityCeiling` shape

`intensity?: number` (default `1`), clamped `[0, ~2]`, SCALES the resolved `peakAlpha` / `headGlowAlpha`. This
is the verbatim Aurora seam shape — `Aurora.vue:83-104` clamps `opacityCeiling` to `[0,1]` and threads it as
`--aurora-opacity-ceiling` (a CSS var) onto the outer compositing envelope (`:156, :207, :216`). The
fourier-field's `intensity` is the same outer envelope, but applied at the PAINT layer (the `globalAlpha`
multiply) rather than a CSS `opacity` — because the field's loudness is per-LAYER (head vs trail vs scaffolding),
not a uniform element opacity. A consumer/deck tunes loudness from ONE prop or a token; never a magic-number
patch in the component (J §6.2). The clamp upper bound `~2` lets a hero push the field brighter than the
recessed default without an unbounded runaway.

---

## 3. The render-loop ZERO-ALLOCATION hoist (the perf axis)

The current loop re-resolves color PER FRAME (`FourierField.vue:212-222`): `colorResolver(resolvedColor.value)`
+ `cssToOklch` + `deriveHue` + `oklchToGammaRgb` every frame — allocations + an OKLCh round-trip 60×/s for a
value that only changes on a color/dark toggle. The SOTA substrate discipline (GooBlob/Aurora parity): resolve
the `[or,og,ob]` outline triple + the `[er,eg,eb]` epicycle second-hue ONCE in the existing color/dark watch
(`:311-322`), cache them in refs, and have `render()` read the cached strings. The watch already fires on the
exact two triggers (`color` change + `isDark` flip) — the hoist is a pure move of the resolve block from the
rAF body into the watch callback. Zero color allocation per frame; the gate's `proof:fourier-field-intensity`
static-no-alloc clause asserts the paint reads a cached triple, not a per-frame `colorResolver` call.

---

## 4. The render-path decision — Canvas2D vs WebGL2 vs WebGPU (axis b + c)

### 4.1 The verdict — Canvas2D is correct AT THIS SCALE

The fourier-field's actual budget: ≤~64 phasors (`positionsAt` chain), a ≤200-point trail, ~4 head-glow
segments. That is a **few hundred line segments per frame** — trivially Canvas2D. The concrete 2026 crossover
(re-confirmed at execution): **Canvas2D becomes the render bottleneck only at ~2500 drawn objects per frame**,
where WebGPU compute starts to pull ahead (a WebGPU physics sim holds 14k objects in a 16ms budget where
Canvas2D stalls at ~2.5k). The fourier-field's few-hundred-segment budget is an **order of magnitude below
even the Canvas2D bottleneck**, two orders below the WebGPU-worth-it line. The headline WebGPU/compute win
(storage-buffer harmonic sums, in-place compute without ping-pong) is real but starts at **10³–10⁶ points** —
the `ChartGPU` "1M-points-at-60fps / 35M-at-72fps" regime, the FFT-ocean-simulation regime — orders of
magnitude above this field. WebGPU here would be substrate-without-a-reason: more code, a parity-floor
fallback to maintain, and a WebGPU-vs-Canvas2D blend-mode divergence to reconcile, for zero perceptible gain
at a few-hundred-segment budget. The shared `useCanvas2D` substrate already gives the field the
offscreen/tab-hidden/reduced-motion park-freeze for free.

Sources: [webgpufundamentals — compute basics](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html),
[Ping-Pong WebGL → compute](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2),
[ChartGPU million-point charts](https://www.webgpu.com/showcase/chartgpu-webgpu-charts/),
[WebGPU IO2023](https://developer.chrome.com/blog/webgpu-io2023).

### 4.2 The future additive-enhancement note (NOT now)

IF the field ever scales to a literal high-harmonic glyph tracer (a logo DFT at 500+ epicycles) OR a
multi-curve field, the SOTA upgrade path is the W07/W14 GPU substrate: compute the harmonic sum on the GPU via
a `var<storage,read>` coefficient array (the W07 dynamic-index + f32-cast unblock is exactly the enabling
lesson), and render the trail as an instanced/strip draw on `createGPUCanvas`
(`src/composables/glass/createGPUCanvas.ts` exists at HEAD). This is recorded as a future additive enhancement
behind the Canvas2D parity-floor — NEVER a regression of the shipped render. The pull-up does NOT block on it;
the GPU substrate dependency in the original W43 deferral rationale dissolves once we accept Canvas2D as the
correct render at this scale.

### 4.3 The shared optimized primitives the field DOES compose (axis c)

- `useCanvas2D` (the substrate — dpr-clamp, rAF, the full park machinery) — COMPOSED, do not re-roll.
- The shared `/color` OKLCh core (`cssToOklch` / `deriveHue` / `oklchToGammaRgb` / `ColorResolver`) — COMPOSED;
  the epicycle second hue is a `deriveHue("analogous", epicycleHueShift)` shift off the outline hue, single-source.
- The single-source PRNG (`src/utils/prng.ts` — `mulberry32` + `hashString`) — COMPOSED; NO private fork. The
  `/prng` subpath stays keep-book until ≥2 external consumers (J.W8 / W29).
- The single-source MATH (`fourier-field/math.ts`, lifted from the sibling `evaluators`/`bases`) — single-copy.

---

## 5. The fourier-analysis sibling visualization suite (axis d — the ≥2nd-external-consumer candidate)

Read `/Users/mkbabb/Programming/fourier-analysis/web/src/`. What it ships + what fourier-field should align with:

- **`lib/evaluators.ts`** — `evaluateFourier` (the complex sum), `evaluateChebyshev`/`evaluateLegendre`
  (Clenshaw recurrence for polynomial bases). glass-ui's `evalFourier` is the VERBATIM port of `evaluateFourier`
  (the math comment in `math.ts:5-6` cites it). ALIGNED — single math model, two repos.
- **`lib/bases.ts`** — `fourierPositionsAt` (the epicycle chain) = glass-ui's `positionsAt`, verbatim. The
  sibling ALSO carries a `evaluateBasis` dispatch over fourier/chebyshev/legendre — glass-ui needs ONLY the
  fourier arm (the ambient field is fourier-only), so glass-ui correctly does NOT port the polynomial bases.
- **`composables/useFourierMorph.ts`** — a keyframes.js-driven morph between two shapes (settle-out → cross-fade
  → settle-in over a harmonic-level ladder). This is the sibling's HEADLINE viz technique: morph one glyph into
  another by degrading both to low harmonics, lerping the point arrays, then resolving. **glass-ui's field does
  NOT morph between glyphs** — it is an ambient generative curve, a DIFFERENT use case. The morph is a future
  candidate ONLY if a consumer needs a shape-to-shape transition (not the ambient-background case W43/W60 serve);
  record as keep-book, do NOT port speculatively.
- **`lib/svg-fourier.ts` / `lib/svg-contours.ts`** — the DFT-FROM-SVG pipeline (extract contour points from an
  SVG, sample, DFT into components, smooth via Catmull-Rom). This is the "draw a literal glyph" path. glass-ui
  deliberately does NOT do this (generative ambient, not literal trace) — but it is the exact substrate a future
  "trace this logo as a hero background" feature would compose. Keep-book.
- **`components/visualization/lib/canvas-drawing/` — the canonical render decomposition + the EXACT in-repo
  alpha ratios** (the most directly-implementable axis-d reference; the W43 implementer + README anchor the §2.2
  bundle defaults against these). Read verbatim at HEAD:
  - `epicycles.ts` — `drawEpicycleCircles`: circle stroke at `0.5·epicycleAlpha`, arm at `0.75·epicycleAlpha`,
    center-dot at `0.75·α`, endpoint-dot at `0.6·α`; `epicycleAlphaFromScale = 0.65 → 1.0` (hover-grow);
    `BASE_EPICYCLE_SCALE=0.38` / `HOVER_EPICYCLE_SCALE=0.55`. The **DC-term-suppression** technique: an
    `index===0` phasor (frequency 0) would render a figure-sized stationary disc — fa drops it to a small
    centre-marker (`max(5.5, lineWidth·1.5)`) and keeps only its arm. glass-ui's `makeEllipticSpectrum` emits
    NO `index 0` term (the spectrum starts at `±1`), so the field is DC-suppression-FREE by construction —
    note it in the README as a deliberate generative-model property, not a missing guard. `drawTipDot` — the
    SOTA head: a pulsing radial glow (`r≈20`, `0.2 + 0.1·sin(now/300)` alpha) + a solid dot + a white
    highlight. glass-ui's `shadowBlur` head-glow is the lighter background-variant of this; the
    `headGlowBlur≈14–18` (§2.2) is the analogous bloom radius.
  - `trail.ts` — `TrailManager` strokes the path at `lineWidth 3.5` / `globalAlpha 0.9`, round cap/join, over a
    precomputed `Float64Array` (`TRAIL_RESOLUTION=1200`). glass-ui's ring-buffer trail is the recessive
    chrome-variant (`lineWidth 1.6`, age-decayed); the fa `0.9` flat-alpha is the FOREGROUND-figure value — the
    background field's softer per-segment decay (§2.1) is the correct register, NOT a regression.
  - `ghost-path.ts` (`rgba(150,150,150,0.2)` source-contour overlay) + `transforms.ts` `spectrumColor` =
    `hsl((1−t^0.6)·300, 85%, 55%)` (the per-phasor FOREGROUND rainbow) — both N/A to glass-ui: no source contour
    (the spectrum IS the curve), and the background keys off ONE brand hue + an analogous scaffold shift, NOT a
    per-phasor rainbow. glass-ui correctly diverges here; record WHY in the README (foreground teaching-figure
    vs recessive brand-keyed chrome).

**The cross-repo consumer story:** fourier-analysis is the candidate ≥2nd-EXTERNAL consumer of a `/fourier-field`
or a shared `/fourier-math` surface IF the math leaf is ever promoted out of `math.ts` into a shared subpath.
Today the math is single-COPIED (the sibling's `evaluators`/`bases` and glass-ui's `math.ts` are independent
verbatim ports, not a shared dependency) — which is fine at 2 repos. The substrate-with-consumer bar for a
SHARED `/fourier-math` subpath is unmet until the sibling actually imports glass-ui's leaf; keep-book, do not
mint a speculative shared-math subpath now.

---

## 6. W43 + W60 consumption — how the field becomes a UNIQUE per-hero background

### 6.1 W43 (this wave) ships the LIBRARY substrate

W43's deliverable, grounded by this research:
- The per-variant intensity BUNDLE (§2.2) replacing `OUTLINE_PEAK_ALPHA` (no compat alias).
- The 3-pass phosphor-comet render (§2.1) + the dark/light blend fork (Safari-safe — `lighter` is a 2D op).
- The `intensity` prop (§2.3, the Aurora `opacityCeiling` shape).
- The R1 amplitude-descending sort + the R2 trail-is-signature weighting (§1.3).
- The zero-alloc color hoist (§3).
- Full citizenship: README (research-backed, this doc deepens it), api seat, demo story, mount-smoke, the
  already-landed `/fourier-field` subpath.

### 6.2 W60 (page-redesign) consumes it as a UNIQUE per-hero background

The user directive (P7/Q9, pass-3): "/foundations/intro + other HERO items should have aurora OR constellation
OR fourier-field — each hero a UNIQUE one — in the TRUE background of the WHOLE page; the hero item GLASSY to
demonstrate the glass card." W60 wires the field per hero with FOUR knobs:

```vue
<!-- a hero whose unique background is the fourier-field -->
<div class="hero-page">
    <FourierField
        variant="hero"
        :color="'var(--primary)'"
        :color-resolver="defaultBlobColorResolver"
        :seed="route.path"            <!-- the per-hero UNIQUENESS key -->
        :intensity="0.7"              <!-- recessed loudness behind the glass card -->
    />
    <GlassCard class="hero-card glass-floating"> <!-- P7/Q9: the GLASSY hero over the field -->
        ...hero content...
    </GlassCard>
</div>
```

- **`seed`** is the uniqueness key — each hero passes a distinct seed (the route path, a hero id), so the
  elliptic spectrum differs per hero with ZERO new component. ONE fourier-field component → N unique fields. This
  is precisely why the seeded-generative model (not a literal-glyph tracer) is the right SOTA choice for a
  per-hero background: uniqueness is free.
- **`variant`** picks the family member (hero = warm/bright/epicycles-on for a feature hero; final =
  cool/denser/quiet for a closing or chrome surface).
- **`color`** binds the per-hero hue (a `var(--primary)` token resolves against the host, retints on dark).
- **`intensity`** recesses the field behind the glass card — the loudness knob that keeps the hero CARD legible
  (the W55 adaptive-over-light legibility precept + the AX cardinal no-occlusion gate). A hero card at
  `.glass-floating` over a `intensity≈0.7` field is the legible-but-alive composition Q9 names.

The three-substrate rotation (aurora / constellation / fourier-field) is the per-hero variety the user wants:
W60 assigns one substrate per hero, the fourier-field being the third member, sibling-parity with the other two
(all three compose the same park-freeze lifecycle, all three take `color` + a resolver, all three sit
`z-index:0` behind content with `pointer-events:none`). The glass card on top DEMONSTRATES the glass over the
rich background — the whole point of P7/Q9.

---

## 7. SOTA recipe summary (the one-screen extract for the W43 implementer + README)

1. **Math** — KEEP the seeded-elliptic-spectrum inverse-DFT epicycle chain (sibling-repo math, single-sourced).
   ADD: sort the draw-pass spectrum amplitude-descending (R1).
2. **Render** — 3-pass phosphor comet: faint epicycle scaffolding (hero only, below) → additive-glow trail body
   (soft `age^1.4` decay + a floor, `lighter` on dark / source-over on cream) → sharp head glow (the STRONGEST
   layer, shadow-blur bloom). REPLACE the flat `globalAlpha * age * age`.
3. **Bundle** — the per-variant `{peakAlpha, headGlowAlpha, headGlowBlur, epicycleRatios, trailFadeExp,
   trailFloor}` (defaults in §2.2). DELETE `OUTLINE_PEAK_ALPHA`, no alias.
4. **Intensity** — ONE outer `intensity?:number` (default 1, clamp `[0,~2]`) scaling the resolved peak/glow —
   the Aurora `opacityCeiling` shape at the paint layer.
5. **Perf** — hoist the color resolve onto the existing color/dark watch; zero color alloc per frame.
6. **Path** — Canvas2D is correct at this scale; WebGPU recorded as a future additive enhancement behind the
   Canvas2D parity-floor, NOT a now-blocker (the pull-up dissolves the deferral).
7. **Consumption** — W60 wires `variant` + `color` + `seed` (the uniqueness key) + `intensity` (the recessed
   loudness) per hero; the seeded-generative model makes every fourier hero unique with one component, behind a
   glassy hero card (P7/Q9).

---

## Sources

- [The Coding Train #130 — Drawing with Fourier Transform and Epicycles](https://thecodingtrain.com/challenges/130-drawing-with-fourier-transform-and-epicycles/)
- [3Blue1Brown — But what is a Fourier series?](https://www.3blue1brown.com/lessons/fourier-series/)
- [myFourierEpicycles — draw your own](https://www.myfourierepicycles.com/)
- [drawing_SVGs_with_DFT (SVG → DFT → epicycles)](https://github.com/eileengarip/drawing_SVGs_with_DFT)
- [Drawing-to-Fourier (3B1B-inspired, 1000+ circles fast)](https://github.com/Fatcatcreate/Drawing-to-Fourier)
- [libretro — phosphor trail/glow shader thread](https://forums.libretro.com/t/has-there-ever-been-written-a-phosphor-trail-glow-shader/485)
- [Phaser RetroZone — CRT / phosphor vector rendering](https://phaser.io/news/2026/03/retrozone-open-source-retro-display-engine-phaser)
- [three.js — additive blending on transparent canvas](https://discourse.threejs.org/t/additive-blending-on-transparent-canvas/21630)
- [LearnOpenGL ES — additive blending](https://www.learnopengles.com/tag/additive-blending/)
- [WebGPU Fundamentals — compute shader basics](https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html)
- [Ping-Pong WebGL → Compute Shader (storage buffers)](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2)
- [ChartGPU — WebGPU charts at a million points (1M@60fps / 35M@72fps; Canvas2D bottleneck ~2.5k objects)](https://www.webgpu.com/showcase/chartgpu-webgpu-charts/)
- [ChartGPU — Show HN (the 2026 Canvas2D-vs-WebGPU crossover discussion)](https://news.ycombinator.com/item?id=46706528)
- [WebGPU: Unlocking modern GPU access (Chrome IO2023)](https://developer.chrome.com/blog/webgpu-io2023)
- [MDN — CanvasRenderingContext2D.globalCompositeOperation (the 2D-context `lighter` additive op)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
- [WebKit Features for Safari 26.4 — `lighter` operator first-class (corroboration; the Canvas2D op predates it)](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)
- glass-ui sibling (read VERBATIM at HEAD): `/Users/mkbabb/Programming/fourier-analysis/web/src/lib/{evaluators,bases,svg-fourier,svg-contours}.ts` + `composables/useFourierMorph.ts` + `components/visualization/lib/canvas-drawing/{epicycles,trail,ghost-path,transforms}.ts`
