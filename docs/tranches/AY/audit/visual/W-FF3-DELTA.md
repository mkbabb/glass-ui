# AY.W-FF3 — Fourier-field RENDER REGISTER rebuilt · "far too faint" → fourier-analysis register DELTA

The user's binding verdict (USER-AUDIT-2026-06-10 §B B12): "`/substrates/fourier-field`
sucks — far too faint; look to how fourier-analysis renders the curves; a procedural
variant thereof." W-FF2 LANDED the intensity *mechanism* (the bundle, the intensity
prop, the `/fourier-math` leaf, the dark/light blend fork) but the field still READ as a
faint hairline whisper — a 1.6px stroke at ~0.45 peak floored to ~0.036 effective alpha on
cream, the chronic visible-invisibility in a quieter form. W-FF3 is the REGISTER rebuild:
the field now reads as the **fourier-analysis web renderer's procedural sibling**.

The mechanism is UNCHANGED (the `/fourier-math` seam + the `intensity` prop + the
per-variant bundle stay — settled). This is a first-principles rebuild of the RENDER —
the stroke weight, the glow, the comet body, the rainbow epicycle chain — against the
reference at `~/Programming/fourier-analysis/web/src/components/visualization/lib/canvas-drawing/`
(`trail.ts`: a 3.5px @ 0.9-alpha stroke; `epicycles.ts`: rainbow circles/arms/joint-dots at
0.5/0.75 alpha; `drawTipDot`: a glowing core + white highlight + halo).

## What changed (the register, from first principles)

| Axis | W-FF2 (faint) | W-FF3 (the reference register) |
|------|---------------|--------------------------------|
| trail stroke weight | 1.6 px hairline | **3 / 3.2 px** bold (the reference 3.5) |
| trail peak alpha | 0.55 / 0.45 | **0.92 / 0.88** near-opaque |
| trail floor (÷peak) | 0.10 / 0.08 (~0.036 eff. on cream) | **0.34 / 0.36** — the body survives BOLD in BOTH modes |
| trail body op | additive `lighter` on dark (washed crossings to WHITE) | **`source-over` saturated** in both modes; a bounded ≈0.18 `lighter` SHEEN on dark only |
| comet length | ~16% period frame-buffer (filled at 60fps, read short on mount) | **~0.43 / 0.6 period**, sampled-per-frame (constant on any framerate) |
| epicycle scaffolding | 0.18-of-peak grey ghost | **0.5/0.72-of-peak bold beaded chain** + filled joint dots |
| epicycle color | one analogous second hue | **per-phasor RAINBOW** swept ±150° around the brand hue (the reference signature) |
| comet head | a `shadowBlur` segment only | **a glowing HEAD DOT** — halo + saturated core + white specular highlight |

The render is now a **4-pass phosphor-comet** (Pass 0 rainbow scaffolding · Pass 1 bold
saturated trail body · Pass 1b dark-only phosphor sheen · Pass 2 head glow · Pass 3 the
glowing head dot). Full recipe in `src/components/custom/fourier-field/README.md`.

## The binding pre-edit witness (the BEFORE — captured live on :5199, this wave)

The W-FF3-before captures are the user's "far too faint" truth at honest dims (1280 desktop /
390 mobile, light + dark) — a thin red hairline + ghost-faint grey epicycle circles; the
`final` preset a near-invisible scribble in light mode:

- `W-FF3-before-fourier-field-desktop1280-light.png`
- `W-FF3-before-fourier-field-desktop1280-dark.png`
- `W-FF3-before-fourier-field-mobile390-light.png`
- `W-FF3-before-fourier-field-mobile390-dark.png`
- `W-FF3-before-fourier-hero-recessed-desktop1280-{light,dark}.png` (the auth-shell recessed hero — RG4)

## The AFTER (captured live on :5199 — the device gate's binding)

The `final` preset now reads as a bold, present, graceful red comet sweeping a long arc with
a glowing head; the `hero` carries a rainbow epicycle chain (blue/purple/orange circles) with
real authority — legible in BOTH modes, the user's reference register met:

- `W-FF3-after-fourier-field-desktop1280-light.png`
- `W-FF3-after-fourier-field-desktop1280-dark.png`
- `W-FF3-after-fourier-field-mobile390-light.png`
- `W-FF3-after-fourier-field-mobile390-dark.png`
- `W-FF3-after-fourier-hero-recessed-desktop1280-{light,dark}.png` (the recession SHOWN, not asserted — RG4 closed)

**Captured 2026-06-10** against `tranche/AY` on the live demo (`:5199`) via
`tests-visual/_ff3-capture.spec.ts` (own dims; deleted after capture) + the strengthened
π gate `npm run proof:fourier-field-visibility-live`.

## The gate strengthening (RG2 — the metric binds the NEW register)

W-FF2 RG2 named the `BBOX_SPAN_MIN = 0.25` floor a weak proxy any thin arc clears. W-FF3
extends `tests-visual/fourier-field-visibility.spec.ts` beyond the bbox-span proxy with two
binding metrics (the rationale is written in the spec header — NO bar lowered):

- **arc-length** (`ARC_DIAG_MIN = 0.6`): the painted bbox DIAGONAL — the comet must sweep a
  substantial arc (the rebuilt presets read diag≥1.0; a stub reads ≈0.3).
- **bold-body** (`BODY_MEAN_MIN` raised `0.08 → 1.5`): the mean painted intensity binds the
  BOLD register. The faint W-FF2 hairline measured ~0.35 (clearing the old 0.08 trivially —
  the "far too faint" the user flagged); the rebuilt register reads ≥4.2 light / ≥12 dark.

**Bite proof (verified this wave):** with the genuine W-FF2 faint stub register temporarily
restored, the strengthened gate REDs — `final preset trail body is faint: mean 0.664 (< 1.5)`.
The floor is born-RED against the faint register, GREEN against the rebuilt bold one. The
static `proof:fourier-field-intensity` gate stays GREEN (the mechanism is unchanged).

## Gate status

- `npm run proof:fourier-field-intensity` — **PASS** (mechanism unchanged; the six-field
  bundle + intensity + blend-fork + sort + evalFourier-deleted all hold).
- `npm run proof:fourier-field-visibility-live` — **PASS** (4/4: final-not-a-stub +
  substantial-arc + bold-body + distinct-family, BOTH modes), and BITES the faint register.
- `npx vue-tsc --noEmit` — clean. `tests/components/custom/fourier-field/` smoke — 5/5.
