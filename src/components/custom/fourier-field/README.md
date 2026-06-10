# FourierField

A Fourier epicycle field on a Canvas2D surface — the sibling render-background to
`Aurora` and `GooBlob`. A seeded elliptic spectrum reconstructs a slow,
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

The pure math (`positionsAt` / `comp` / `makeEllipticSpectrum`) is single-sourced
in `math.ts` (lifted from the sibling `fourier-analysis` `evaluators`/`bases`
leaves) and ships separately on the `@mkbabb/glass-ui/fourier-math` subpath, so a
math-only consumer imports it without dragging the component.

### DC-suppression-free by construction

The fourier-analysis teaching figure drops the `index===0` (DC) phasor to a small
centre-marker — a frequency-0 term would render a figure-sized stationary disc.
`makeEllipticSpectrum` emits NO `index 0` term (the spectrum starts at `±1`), so
the field is **DC-suppression-free by construction** — a deliberate
generative-model property, not a missing guard.

## The intensity model (the W43 SOTA render)

`variant` is a configuration **BUNDLE**, not a recolour of one curve. Each preset
carries a six-field intensity bundle the render reads, scaled by the ONE outer
`intensity` prop:

| Field | Role | hero | final |
|-------|------|------|-------|
| `peakAlpha` | comet-trail peak (head segment) | 0.55 | 0.45 |
| `headGlowAlpha` | head-glow alpha — the STRONGEST layer (> peakAlpha) | 0.62 | 0.50 |
| `headGlowBlur` | head-glow `shadowBlur` radius (px) | 16 | 14 |
| `epicycleRatios` | scaffolding alpha ÷ peak (hero only) | `{circle: 0.18, arm: 0.30}` | `{0, 0}` |
| `trailFadeExp` | trail persistence exponent — SOFT, never quadratic | 1.4 | 1.5 |
| `trailFloor` | min trail alpha ÷ peak — the body survives | 0.10 | 0.08 |

The render is a **3-pass phosphor-comet** (the CRT-vector / oscilloscope register):

- **Pass 0 — epicycle scaffolding** (hero only). The rotating circles draw faint,
  BELOW the outline, off an amplitude-descending sorted spectrum (the largest
  circles first, so the chain reads cleanest). `source-over` — scaffolding does
  not bloom.
- **Pass 1 — the comet trail body.** `globalCompositeOperation = isDark ?
  "lighter" : "source-over"`. Additive `lighter` over the dark ink ground is the
  phosphor look (crossings brighten); plain `source-over` over the warm cream
  ground keeps the hue legible (additive over cream blows the trail to white). The
  persistence is a SOFT `age^trailFadeExp` floored at `peak·trailFloor` — the body
  survives, never the quadratic that killed the oldest 80% of the trail. (Caveat:
  the body-survives floor is fully effective on the DARK ink ground; at the lighter
  cream floors the effective trail alpha is ~0.036 final / ~0.055 hero on cream — the
  trail is dimmer over the light backdrop, a deliberate let-the-cream-read tuning.)
- **Pass 2 — the head glow** (the STRONGEST layer, head-forward: `headGlow >
  peak`). A sharp core under a `shadowBlur` bloom on the youngest segments.

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

## Divergence from the fourier-analysis teaching figure

The sibling's foreground figure colours each phasor on a rainbow
(`hsl((1−t^0.6)·300, …)`) and overlays a grey source-contour ghost path. The
fourier-field deliberately diverges: it is **recessive brand-keyed chrome**, not a
foreground teaching figure. It keys off ONE brand hue (the consumer's `color`) + an
analogous scaffold hue-shift, with no per-phasor rainbow and no source-contour
ghost (the spectrum IS the curve — there is no source to overlay).

## Props

| Prop | Type | Default | Role |
|------|------|---------|------|
| `variant` | `"hero" \| "final"` | `"hero"` | the configuration bundle |
| `color` | `string` | — (required) | base hue; a `var()`/`light-dark()` token resolves against the host |
| `colorResolver` | `ColorResolver` | — (required) | resolves a concrete color to a gamma-sRGB `[r,g,b]` triple |
| `seed` | `string` | `""` | the per-instance uniqueness key |
| `freeze` | `boolean` | `false` | paint ONE static deterministic best-frame (the capture lever) |
| `intensity` | `number` | `1` | the outer loudness envelope (clamped `[0, 2]`) |

The `color` re-resolves on a color change AND on a dark-mode toggle (a `var()`
token resolves differently under `.dark`); the resolve is hoisted onto that watch,
so the per-frame render reads a cached `rgb()` triple — zero color allocation in
the rAF body.

## Research

The intensity model + the render recipe are research-backed by
`docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` (the executed SOTA
research: the epicycle/DFT canon, the phosphor multi-pass register, the
Canvas2D-vs-WebGPU render-path verdict, and the per-hero consumption story).
