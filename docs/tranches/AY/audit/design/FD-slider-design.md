# FD-slider-design — the W-SLD1 as-built vs the clarified slider standard

**Lane**: FD-slider-design (frontend-design audit; implementation HALTED) · **Date**: 2026-06-09
**Surface**: `http://localhost:5199/forms/slider` (live, chromium, 1280×900 @2x, light+dark)
**Binding standard** (the user's verbatim words, USER-DECISIONS-2026-06-09 addendum):

> "our slider should be of two forms — a continuous rounded cylinder (thumb integrated into a
> thick track that appears as one continuous piece) and our spectrum slider, as seen in value.js"

**Reference corpus read in full**: `AY.W-SLD1.md` + `W-SLD1-DELTA.md` + its 4 PNGs;
`src/components/ui/slider/Slider.vue` + `index.ts` (sliderVariants tokens);
`scripts/proof-slider-two-only.mjs` clause (3); value.js
`color-picker/controls/ComponentSliders.vue` (the native spectrum register) +
`panes/ConfigSliderPane.vue` (a glass-ui `variant="spectrum"` consumer).

---

## VERDICT

**Standard form: DETACHED FLOATING KNOB — the W-SLD1 (b) revert OVER-SHOT.**
**Spectrum form: ON-REGISTER vs value.js — and it already embodies the exact containment law the standard is missing.**

---

## The measured geometry (live π readback, both schemes identical)

| size | track height | thumb box | protrusion per side | thumb÷track |
|---|---|---|---|---|
| sm | 4px | 12×12 circle | 4px | **3.0×** |
| md | 6px | 16×16 circle | 5px | **2.67×** |
| lg | 12px | 24×24 circle | 6px | **2.0×** |
| spectrum md | 24px | 17.6×24 squircle | **0px** | **1.0×** |

Thumb `border-radius: 50%`, `aspect-ratio: 1`, bg = `--primary` (same ink as the fill);
range fill carries the W52 glass material (`blur(10px) saturate(1.05) brightness(1.02)` +
rim + under-shadow). Spectrum thumb: transparent body, 2px `--background` border,
`corner-shape: squircle`, 11.2px round fallback.

## 1. The standard thumb reads as a knob ON a wire, not a cylinder

`FD-slider-standard-zoom-{light,dark}.png`. A 16px ball on a 6px wire is the canonical
Material/shadcn knob-on-a-track register — the exact opposite pole of "thumb integrated
into a thick track that appears as one continuous piece." The knob bulges 5px past the
track on each side (2.67× the track height; the sm rung is worse at 3×). Nothing about
the silhouette says "one piece": the eye parses BALL, then WIRE.

Two mitigations are real but insufficient:

- **Same-ink color**: thumb bg = range fill = `--primary`, so knob+fill merge into one
  dark mass at the value point (light mode reads as a lollipop, not two materials). Color
  continuity cannot rescue geometric discontinuity — the bulge betrays it instantly.
- **The DELTA's prose** ("the knob rides ON the continuous fill … not a detached floating
  disc") claims continuity the geometry does not paint. A 2.67× protrusion IS the
  detached-disc geometry, whatever the comment says. Gate-green (`isCircle` passes,
  `proof:slider-two-only` GREEN, ledger GREEN) and visually off-standard — the exact
  gap this lane exists to name.

The W-SLD1 (b) revert satisfied the "FULLY ROUNDED" half of PROMPT-CORPUS:51 and
inverted the "continuous with the track" half. The addendum's suspicion ("the W-SLD1 (b)
knob revert may OVER-shoot if its knob reads detached") is CONFIRMED by the capture.

## 2. The thin track wastes the glass it carries

The 6px md track also fails the "THICK track" half of the standard outright — and it
makes the W52 liquid-glass range fill (backdrop blur, rim catch-light, under-shadow,
`--glass-level` routing — all live in the computed style) **sub-perceptual**. There is
real glass machinery painting on a 6px-tall sliver where no eye can read blur or rim
curvature. The component's most distinctive material is invisible at the scale it ships
at. A 16–24px capsule would let the glass actually read — the cylinder register isn't
just the user's ask, it's where this component's own identity becomes visible.

## 3. Hover reinforces detachment

`FD-slider-standard-hover-light.png` — hover/held adds an outer halo ring
(`0 0 0 4px var(--surface-tint-8)`) AROUND the ball, the classic detached-knob
affordance grammar. On an integrated cylinder the affordance wants to live IN the
surface (specular brightening, the `.glass-specular-track` gleam already wired on the
thumb) rather than ringing a satellite.

## 4. The spectrum form: register MATCHED

`FD-slider-spectrum-zoom-{light,dark}.png` vs value.js `ComponentSliders.vue`
(`h-6` 24px gradient `rounded-full` capsule + `w-3 h-full rounded-full border-2
bg-transparent` thumb): glass-ui ships the same register — a tall gradient capsule with
a hollow, light-bordered window thumb at FULL track height, zero protrusion. The
silhouette delta (17.6px-wide squircle vs value.js's slim 12px pill) is a deliberate
iOS-color-picker refinement, defensible and arguably better (more finger, same window);
the squircle PE tier + generous 11.2px fallback is honest cross-engine work. value.js's
own `ConfigSliderPane.vue` already consumes glass-ui `variant="spectrum"`, so the two
repos converge here. **No build delta owed on the spectrum form.** Minor watch item: the
dark-scheme border flips to near-black `--background` (`rgb(17,15,14)`) over the vivid
gradient — it still reads (the capture confirms), darker but legible; value.js pins a
light border in both schemes. Taste call, not a defect.

## 5. The page prose over-claims

The story page subtitle says "standard (continuous rounded iOS knob)" — words asserting
the continuity the geometry lacks. Same for the `Slider.vue` comment block ("not a
detached floating disc"). Build phase updates both with the geometry fix.

---

## The precise delta the build phase owes (standard form only)

The spectrum thumb already obeys the law the standard needs: **the thumb is inscribed in
the track**. Converge the standard onto the same containment:

1. **Thicken the track to the cylinder register** — `--slider-track-height` rises to
   ≈ the control height (md ≈ 16–24px; the spectrum's `1.5 × thumb-size` = 24px register
   is the natural sibling). The glass fill becomes legible at this scale.
2. **Inscribe the knob** — thumb diameter ≡ track height (or track height − 2×inset for
   an iOS-style 1–2px reveal of fill around the ball): `height: 100%`-equivalent,
   `aspect-ratio: 1`, `border-radius: 50%` retained. Protrusion = 0. The ball-bearing-
   inside-the-cylinder reading — round-ended, integrated, ONE piece.
3. **`thumbAlignment: 'contain'`** for the standard form once inscribed (the spectrum
   already sets it) so the knob never overhangs the capsule's rounded ends.
4. **Re-token the size rungs** so `--slider-thumb-size ≤ --slider-track-height` at every
   rung (currently 12/4, 16/6, 24/12 — all inverted).
5. **Affordance moves in-surface** — keep press-scale + specular gleam; the outer halo
   ring may stay for focus-visible (a11y) but hover should read as the knob/fill
   brightening, not a satellite ring.
6. **Prose currency** — story subtitle, `Slider.vue` comments, `index.ts` JSDoc,
   PROMPT-CORPUS:51 phrasing, and the gate clause (below) all restate the integrated-
   continuous geometry.

## The isCircle clause — THIRD restatement (lock geometry, not a circle)

The bare `isCircle = radius === "50%"` (proof-slider-two-only.mjs:308) is necessary but
NOT sufficient — a 16px ball on a 6px wire passes it while violating the standard. The
clause must become a CONJUNCTION:

- **ROUND-ENDED**: `border-radius: 50%` + `aspect-ratio: 1` REQUIRED (restatement 2's
  inversion holds — the circle stays mandatory);
- **TRACK-HEIGHT-MATCHED**: the thumb box resolves to the track height (token-level:
  `--slider-thumb-size` ≡ `--slider-track-height` − 2×inset, inset ≤ 2px, per size rung);
- **ZERO-DETACHMENT**: no size rung where thumb-size > track-height — the knob never
  paints outside the capsule (protrusion ≤ 0; the wire-and-ball geometry REDS).

Full text recorded as §RE-GROUND 2 in `AY.W-SLD1.md` (the binding spec amendment).

---

## Design-lens scorecard (the slider page as a surface)

- **Distinctiveness**: the spectrum capsule is genuinely distinctive (the gradient
  cylinder + squircle window is an identity); the standard slider is currently generic —
  indistinguishable from stock shadcn. The fix above is also the distinctiveness fix.
- **Affordance**: both forms are findable and obviously draggable; the standard's halo
  grammar is borrowed rather than owned.
- **Motion**: press-give on `--spring-smooth` is correct per the §6 doctrine; subtle,
  coherent.
- **Composition/typography**: the story page itself (section-label mono caps, value
  readouts in tabular-nums, the variant×size matrix) is clean and well-stepped.

## Captures (this lane's, in this directory)

| capture | light | dark |
|---|---|---|
| full page | `FD-slider-asbuilt-full-light.png` | `FD-slider-asbuilt-full-dark.png` |
| standard zoom (the detached knob) | `FD-slider-standard-zoom-light.png` | `FD-slider-standard-zoom-dark.png` |
| standard hover (halo ring) | `FD-slider-standard-hover-light.png` | `FD-slider-standard-hover-dark.png` |
| spectrum zoom (the matched register) | `FD-slider-spectrum-zoom-light.png` | `FD-slider-spectrum-zoom-dark.png` |
