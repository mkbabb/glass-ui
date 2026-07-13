# FourierField

A Fourier epicycle field on a Canvas2D surface — the sibling render-background to
`Aurora` and `Blob`. A seeded elliptic spectrum reconstructs a slow,
never-repeating closed curve via the inverse DFT; a glowing comet trail chases the
curve's head, and (in the `hero` preset) nested epicycle circles draw underneath
in a harmonious second hue. It composes the `useCanvas2D` substrate, so it
inherits the offscreen / tab-hidden / reduced-motion freeze for free.

```vue
<FourierField
    variant="hero"
    :color="'var(--primary)'"
    :color-resolver="defaultBlobColorResolver"
    :seed="route.path"
    :intensity="0.7"
/>
```

## The model — a seeded generative curve, not a glyph tracer

The field is a **rotating-vector epicycle trace** (the "drawing with circles"
canon — 3Blue1Brown / The Coding Train): a sum of phasors `c_k·exp(2πi·k·t)` whose
tip-to-tail chain traces a closed curve via the inverse DFT. But unlike a literal
SVG-glyph tracer, `makeEllipticSpectrum` emits a **seeded generative spectrum** — a
dominant counter-rotating pair of unequal magnitude (a tilted ellipse) plus a few
smaller higher-order harmonics with a `1/order` falloff. That is the right choice
for an ambient per-page background: a literal glyph would read as content, not
chrome, and a never-repeating elliptic spectrum reads as living texture. The
`seed` prop is the uniqueness key — one component renders N unique fields.

The pure math (`positionsAt` / `partialSumAt` / `dftFromPoints` / `comp` /
`makeEllipticSpectrum`) is single-sourced in `math.ts` (lifted from the sibling
`fourier-analysis` `evaluators`/`bases` leaves) and ships separately on the
`@mkbabb/glass-ui/fourier-math` subpath, so a math-only consumer imports it
without dragging the component.

### `partialSumAt` — the truncated-summation curve point (the studio's N-axis)

`partialSumAt(components, t, maxTerms?)` returns the SINGLE curve point of the
inverse-DFT summation truncated at the first `maxTerms` phasors
(`Σ_{k<maxTerms} c_k·exp(2πi·k·t)`). It is `positionsAt` read at its final tip,
on the SAME truncation axis `positionsAt`'s `maxCircles` arg drives —
`maxCircles` reads the whole chain truncated, `partialSumAt` reads only its
endpoint. Sweeping `t` over `[0,1)` and joining the points traces the partial-sum
CURVE; at `maxTerms = 1` a single ellipse, growing toward the full reconstruction
as `maxTerms` climbs (the "watch it sum" reference idiom the fourier studio
drives off an N-harmonics slider). `maxTerms` omitted (or `≥ components.length`)
is the full reconstruction.

### The injected `clock` seam — controllable `t` (the studio transport)

`clock?: () => number` is an OPTIONAL prop: a getter returning the loop parameter
`t ∈ [0,1)`. When BOUND, the render reads `clock()` (a controllable clock —
pause/scrub/speed, as the fourier studio's play transport drives it); when ABSENT
(the ambient face), the autonomous `(now / durationMs) % 1` frame-time loop is the
DEFAULT. `freeze` / `prefers-reduced-motion` still short-circuit to the
deterministic `frozenT` regardless. The seam is purely additive — the ambient
`variant`/`harmonics`/`epicycle*` bundle is unchanged.

### DC-suppression-free by construction

The fourier-analysis teaching figure drops the `index===0` (DC) phasor to a small
centre-marker — a frequency-0 term would render a figure-sized stationary disc.
`makeEllipticSpectrum` emits NO `index 0` term (the spectrum starts at `±1`), so
the field is **DC-suppression-free by construction** — a deliberate
generative-model property, not a missing guard.

## The render model (the fourier-analysis renderer's procedural sibling)

`variant` is a configuration **BUNDLE**, not a recolour of one curve. Each preset
carries a render bundle the passes read, scaled by the ONE outer `intensity` prop.
The register is the **fourier-analysis web renderer's procedural sibling** (W-FF3):
a PRESENT stroke weight, a real phosphor glow with a glowing comet head, the comet
body toward ~1/3–1/2 of the period — legible in BOTH modes (the prior register read
"far too faint": a 1.6px hairline at ~0.45 peak floored at ~0.036 effective alpha on
cream, a sub-perceptible whisper).

| Field | Role | hero | final |
|-------|------|------|-------|
| `peakAlpha` | comet-trail peak (head segment) — near-opaque, not a hairline | 0.92 | 0.88 |
| `trailWidth` | trail stroke weight (px) — the reference's bold ≈3px, not 1.6 | 3 | 3.2 |
| `headGlowAlpha` | head-glow alpha — the STRONGEST layer (> peakAlpha) | 0.95 | 0.92 |
| `headGlowBlur` | head-glow `shadowBlur` radius (px) | 18 | 16 |
| `headDotRadius` | the glowing comet HEAD dot radius (px) — the leading mark | 5 | 4.5 |
| `epicycleRatios` | scaffolding alpha ÷ peak (hero only) — PRESENT, not a ghost | `{circle: 0.5, arm: 0.72}` | `{0, 0}` |
| `epicycleWidths` | circle/arm stroke weights (px) — a bold beaded chain | `{2.4, 2}` | `{0, 0}` |
| `epicycleRainbow` | paint the chain as a rainbow across the spectrum (hero only) | `true` | `false` |
| `trailFadeExp` | trail persistence exponent — SOFT, never quadratic | 1.35 | 1.45 |
| `trailFloor` | min trail alpha ÷ peak — the body survives BOLD (≈0.35, not 0.08) | 0.34 | 0.36 |

The render is a **4-pass phosphor-comet** (the fourier-analysis / oscilloscope register):

- **Pass 0 — the epicycle scaffolding** (hero only). The rotating circles + arms +
  filled joint dots draw BELOW the comet off an amplitude-descending sorted
  spectrum (the largest circles first). Each phasor takes its own hue from a rainbow
  swept across a WARM-ANCHORED band around the consumer's base hue (`base − 30°` at
  the chain root climbing to `base + 70°` at the tips — toward gold/orange; the
  fourier-analysis chained-rainbow signature, kept harmonious AND warm-leaning), at
  a PRESENT ≈0.5/0.72-of-peak weight — not the prior 0.18 ghost. `source-over` —
  scaffolding is structure, not bloom. The band is warm-biased so the hero field's
  SAMPLED MEAN leans warm (r>b): the prior symmetric `±150°` sweep ran the chain
  into the blue half and dragged the mean cool, losing the warm lean the consumer
  hero register expects (BA.W-FOURIER-STUDIO R5-11).
- **Pass 1 — the comet trail body.** A bold ≈3px `source-over` stroke in BOTH modes
  (the reference register), saturated at the consumer's hue — the prior additive
  `lighter` BODY washed every crossing toward white at the bold peak. The trail is
  REBUILT each frame by sampling the curve BACK along the period over a fixed arc
  (≈0.43 hero / 0.6 final), so the comet length is constant on any framerate (not a
  frame ring-buffer that fills at 60fps and reads short on a fresh mount). The
  persistence is a SOFT `age^trailFadeExp` floored HIGH at `peak·trailFloor` (≈0.35)
  — the body has real presence in BOTH modes (the light-mode floor fork).
- **Pass 1b — the dark-mode phosphor sheen.** On the dark ink ground a SUBTLE
  additive `lighter` overlay (bounded ≈0.18 alpha) on the youngest third of the
  trail brightens the comet's leading edge (the oscilloscope glow) WITHOUT washing
  the saturated body to white. Dark-only (`globalCompositeOperation = isDark ?
  "lighter" : "source-over"`) — the additive op blows the hue out on cream.
- **Pass 2 — the head glow** (head-forward: `headGlow > peak`). A bold core under a
  `shadowBlur` bloom on the youngest segments. `source-over` — the head stays the
  saturated hue.
- **Pass 3 — the comet HEAD DOT** (the fourier-analysis glowing tip): a soft halo
  ring, a saturated core, a white specular highlight. The mark the eye locks onto —
  the curve has a definite leading point, not a fade-to-nothing.

The `lighter` op is the Canvas2D **2D-context** compositing op — universally
supported, no Safari quirk, no `@supports` gate, no fallback rung. This is
DIFFERENT from the W52 glass-material `plus-lighter` choice, which composites a CSS
`mix-blend-mode` against the page backdrop (the Safari-quirky path); the
fourier-field composites WITHIN its own canvas, which has no such quirk.

## The intensity prop (the Aurora `opacityCeiling` shape)

`intensity?: number` (default `1`, clamped `[0, 2]`) is the outer loudness
envelope — the verbatim Aurora `opacityCeiling` seam shape, applied at the PAINT
layer (a per-LAYER `globalAlpha` multiply, not a uniform CSS opacity, because the
field's loudness is per-layer: head vs trail vs scaffolding). `intensity = 1` is
the bundle's resting loudness; a hero recesses behind a glass card at `≈0.7`, and
the `~2` ceiling lets a feature hero overdrive without runaway. A consumer/deck
tunes loudness from ONE prop — never a magic-number patch in the component.

## The harmonic LOOM (BD.W-FOURIER-LOOM — §2a/§2b/§3b)

The field is not a diagram floating over dead cream — it is a living LOOM that
LIGHTS its own warm ground, with a head bead that squashes-and-stretches and a
chain inked with a cel-shadow. Three orthogonal mechanisms, all in this module:

- **§2a — the comet is lit by the GPU head quad (BI.W-FOURIER-RIBBON).** The head's
  halo + saturated core + white specular is painted by the ribbon's HEAD layer (an
  instanced quad running the exact `headAniso` 3-layer SDF) — the comet lights the
  field on the compositor, ON the GPU. The prior per-frame `--ff-head-xy`/`--ff-head-hue`
  `setProperty` restyle bridge (a `headUnit()` CPU derive handed to a CSS phosphor-bloom
  SPRITE) is RETIRED: it paid a style recalc every frame and had ZERO live consumer (no
  CSS read the vars). No per-frame CSS restyle survives.
- **§2b — the squash-and-stretch head (the one new shader math).** The round head
  SDF becomes a volume-preserving anisotropic ellipse off the local travel tangent
  `T` (derived in-shader from `curveSamples[0]` vs `[1]` — the SAME evaluator on
  both engines, so the anisotropy is parity-safe by construction). The tangent
  extent scales `1 + k·ŝ`, the normal extent `1/(1 + k·ŝ)`; a cusp (`s ≤
  FOURIER_TANGENT_EPS`) falls back to the last stable tangent identically across
  WGSL/GLSL/CPU. `config.squashGain` carries a small non-zero library default
  (cartoon-weight at rest); a consumer vivid preset turns it to 11.
- **§3b — the cel-shadow + the fat rope.** A second darker ink copy of the rope +
  chain, offset opposite the head travel (`−T`), painted UNDER the lit chain;
  `config.celGain` gates it (small non-zero default; vivid preset floors it UP).
  The fat two-tone rope + louder scaffold are a DEMO `FOURIER_PRESET_VIVID`
  (presets-in-consumers — `trailWidth`/`trailFloor`/`intensity`/`epicycle*`), never
  a src-token edit; `WARM_IDENTITY_PALETTE` + the render `* 0.7` default stay frozen.

The clock flick-settle is a bounded-overshoot SPRING (ζ ≈ 0.62), not the stiff
exponential decay it replaces — the iOS fling / liquid-weight register. The math
leaf (`math.ts`) is byte-frozen throughout.

## Relation to the fourier-analysis teaching figure

The fourier-field is the fourier-analysis web renderer's **procedural sibling** —
it adopts that renderer's visual authority (the bold stroke, the rainbow epicycle
chain, the glowing comet head) while staying recessive brand-keyed chrome rather
than a foreground teaching figure. Two deliberate alignments + two divergences:

- **Adopted (W-FF3):** the `hero` epicycle chain is a per-phasor RAINBOW — swept
  across a warm-anchored band around the consumer's base hue (`base − 30°` →
  `base + 70°`; the reference sweeps `hsl((1−t^0.6)·300)`), so the chain reads
  colorful and present while staying harmonious with the brand hue AND keeping the
  field's sampled mean warm. The comet trail rides the consumer's ONE hue (the
  curve is the brand mark); the rainbow is the scaffold.
- **Diverged:** no grey source-contour ghost path (the spectrum IS the curve — there
  is no source to overlay), and the field recedes behind content via `intensity`
  (the reference figure is foreground). The `final` preset is monochromatic
  trail-only — the deliberate quiet contrast to the `hero` rainbow.

## Props

| Prop | Type | Default | Role |
|------|------|---------|------|
| `variant` | `"hero" \| "final"` | `"hero"` | the configuration bundle |
| `color` | `string` | — (required) | base hue; a `var()`/`light-dark()` token resolves against the host |
| `colorResolver` | `ColorResolver` | — (required) | resolves a concrete color to a gamma-sRGB `[r,g,b]` triple |
| `seed` | `string` | `""` | the per-instance uniqueness key |
| `freeze` | `boolean` | `false` | paint ONE static deterministic best-frame (the capture lever) |
| `intensity` | `number` | `1` | the outer loudness envelope (clamped `[0, 2]`) |
| `clock` | `() => number` | — (optional) | injected controllable clock returning `t ∈ [0,1)`; absent → the autonomous frame-time loop (the ambient default) |

The `color` re-resolves on a color change AND on a dark-mode toggle (a `var()`
token resolves differently under `.dark`); the resolve is hoisted onto that watch,
so the per-frame render reads a cached `rgb()` triple — zero color allocation in
the rAF body.

## Research

The intensity model + the render recipe are research-backed by
`docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` (the executed SOTA
research: the epicycle/DFT canon, the phosphor multi-pass register, the
Canvas2D-vs-WebGPU render-path verdict, and the per-hero consumption story).

## Substrate (BB.W-VIZ-SUITE — DO NOT MIGRATE now)

FourierField renders on the **Canvas2D** substrate (`useCanvas2D` over the ONE
`createCanvasLifecycle` leaf; `composables/math.ts` carries the DFT epicycle math). It is a
first-class member of the procedural-animation suite (`src/components/custom/PROCEDURAL-SUITE.md`)
but is **NOT migrated to WebGPU in BB.W-VIZ-SUITE**: a few-to-dozens of phasors is the RIGHT
tool for `ctx.stroke`, and the DFT math is already GPU-agnostic ("WebGPU-first WHEN POSSIBLE"
gives the latitude). Booked successor **W-FOURIER-GPU** — trigger: the harmonic density scales
to thousands of phasors, where GPU line-instancing wins over `ctx.stroke`. Recorded in the
parity table as a `no-migrate` row with this reason (the user's "cover the extant items too").
