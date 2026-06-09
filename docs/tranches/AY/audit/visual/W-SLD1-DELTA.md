# W-SLD1 — Slider standard-thumb design resolution + spectrum round-fallback fidelity — DELTA

**Wave:** AY.W-SLD1 · **Status:** live-verified · **Verdict:** PASS.

**Resolution: (b) REVERT+INVERT-GATE — user-directed per PROMPT-CORPUS:51 standing
preference.** The standard slider thumb is the FULLY ROUNDED iOS knob the user has
re-stated across four tranches ("a FULLY ROUNDED iOS knob continuous with the track,
not pill/offset", PROMPT-CORPUS:51, verbatim and verbatim-restated each tranche). The
AX.W59 integrated-cylinder slim leading CAP — and the `proof:slider-two-only` clause
that gate-locked it by REDDENING a circle — was the two-tranche-old contradiction this
wave closes. The design decision was already MADE by the user (the standing preference);
this wave IMPLEMENTS it and backs it with the live capture.

**Route:** `/forms/slider` (`resolveScene("forms", "slider")`) — the live demo slider
storybook page.
**Surface:** the standard `.slider-thumb` (the round knob) + the spectrum
`.slider-thumb` (the gradient-track squircle).
**Viewports:** 1280×800 · **Schemes:** {light, dark}.
**Device:** Chrome-headless-new, ANGLE→Metal (the real dev-box GPU path), via
`tests-visual/slider-spectrum-fallback.spec.ts` (the single-engine engine-aware π arm,
the `squircle-language.spec.ts` pattern).

---

## What changed (the SFC + gate edits)

- **`Slider.vue` standard `.slider-thumb`** (`:225-254`) — REVERTED to a round knob:
  `width: var(--slider-thumb-size)` + `aspect-ratio: 1` (a square footprint) +
  `border-radius: 50%` (a TRUE CIRCLE), replacing the prior slim cap (`width:
  calc(--slider-thumb-size * 0.46)` / `height: 100%` / `border-radius: var(--radius-pill)`).
  The W-GLASS `--glass-level` legs (the `--glass-blur-quiet`-routed range backdrop, the
  flat `--primary` fill, the `--spring-smooth` press transition) are PRESERVED — the
  geometry edit is surgical over the landed glass-level routing. The knob rides ON the
  continuous `.slider-range` glass fill so the fill flows straight under the knob's
  centre (the value point) — continuous with the track, not a detached floating disc.
  The press squish is now a uniform `scale()` (was `scaleX`).
- **`proof-slider-two-only.mjs` clause (3)** — INVERTED from CYLINDER-CAP to ROUND-KNOB:
  the `isCircle` test (`radius === "50%"`) now REQUIRES the circle (was: reddened it);
  the prior `height: 100%` track-height assertion is replaced by an `aspect-ratio: 1`
  square-footprint assertion (so the 50% paints a circle, not an ellipse); the borderless
  + `.slider-range` backdrop-filter checks are retained. The KEYSET, ORPHAN-SCAN, and
  SQUIRCLE-SPECTRUM clauses are untouched (the two-only cardinality is settled).
- **`Slider.vue` spectrum round-fallback** (`:313`, D2 fix) — lifted off the bare
  `border-radius: var(--radius-lg)` (a hard 10px = a rounded RECT on a ~17.6×24 box) to
  `border-radius: calc(var(--slider-thumb-size, 1rem) * 0.7)` — a generous radius
  proportional to the box (11.2px on md = ~0.64× the box WIDTH), so the fallback reads
  squircle-adjacent on the ~35% of engines without `corner-shape`. The `@supports
  (corner-shape: superellipse(2))` PE tier (`:322-326`) stays the superset that REFINES
  the curve, never the base.

---

## Captured own-surface PNGs (real on-disk, ≥1024 B, `\x89PNG`)

| capture | light | dark |
|---|---|---|
| standard ROUND KNOB (the resolution) | `W-SLD1-standard-resolved-light.png` | `W-SLD1-standard-resolved-dark.png` |
| spectrum squircle (D2 fidelity) | `W-SLD1-spectrum-light.png` | `W-SLD1-spectrum-dark.png` |

The own-surface set carries the `W-SLD1-standard-resolved-light.png` AND
`W-SLD1-standard-resolved-dark.png` pair the `proof:live-verified-ledger:ay` own-surface
+ {light,dark} floor requires.

The standard PNGs show the circular knob sitting on the continuous fill at the value
edge (the iOS continuous feel). The spectrum PNGs show the rounded-square superellipse
silhouette over the LCH/hue gradient (the iOS color-picker idiom).

---

## Paired-π readback (the binding numbers, NOT a grep)

Read live off the computed style on the chromium engine (single-engine, engine-aware —
the `border-radius` value is the cross-engine fallback truth even on a supporting
engine; the round `border-radius` is the BASE the `@supports` block only refines):

| scheme | engine `corner-shape` supported | STD knob box | STD knob `border-radius` (effective) | SPECTRUM box | SPECTRUM `border-radius` (effective vs 0.55× floor) | SPECTRUM `corner-shape` |
|---|---|---|---|---|---|---|
| light | true | 16×16 (1:1) | `50%` → 8px ≥ 7.2px (circle) | 17.6×24.0 | `11.2px` ≥ floor 9.7px | `squircle` |
| dark  | true | 16×16 (1:1) | `50%` → 8px ≥ 7.2px (circle) | 17.6×24.0 | `11.2px` ≥ floor 9.7px | `squircle` |

- **Standard knob**: `border-radius: 50%` over a square 16×16 footprint → a TRUE CIRCLE
  (the resolution (b) round iOS knob). The effective 8px radius ≥ the 45%-of-box circle
  floor (7.2px).
- **Spectrum**: on the supporting chromium engine the PE tier paints `corner-shape:
  squircle` (= `superellipse(2)`); the round fallback `border-radius: 11.2px` is the
  cross-engine truth, ≥ the 0.55×-box-width squircle-adjacent floor (9.7px) AND
  materially above the old 10px `--radius-lg` rounded-rect — the D2 hole is closed.

---

## Corpus ↔ SFC ↔ gate alignment (the one-story line, §6 condition 5)

PROMPT-CORPUS:51 ("a FULLY ROUNDED iOS knob continuous with the track, not pill/offset"),
`Slider.vue`'s standard `.slider-thumb` (`border-radius: 50%` over `aspect-ratio: 1`,
riding the continuous glass `.slider-range` fill), and `proof:slider-two-only`'s
ROUND-KNOB clause (REQUIRES `border-radius: 50%` + a square footprint) now name the SAME
shape — the fully-rounded continuous iOS knob. AUDIT-LEDGER row 9 reads DONE with the
resolution branch (b) recorded. No "integrated cylinder cap" survives anywhere alongside
the reverted knob.

---

## Gate evidence

- `proof:slider-two-only` — **PASS** (the inverted ROUND-KNOB clause requires the 50%
  circle; KEYSET + ORPHAN-SCAN + SQUIRCLE-SPECTRUM green). Output: `std knob radius: 50%
  (aspect-ratio 1, circle true)`.
- `tests-visual/slider-spectrum-fallback.spec.ts` — **PASS** (2/2 on
  `chromium-headless-new`; both schemes assert the TRUE-CIRCLE standard knob AND the
  engine-aware spectrum squircle/round-fallback ≥ 0.55× floor).
- `npx vue-tsc --noEmit` — clean over the slider surface (the 2 unrelated in-flight
  `goo-blob` errors are a sibling lane's, out of this wave's scope).
- `proof:live-verified-ledger:ay` — GREEN with the `W-SLD1` row backed by this DELTA →
  the own-surface light+dark PNGs + the `"W-SLD1"` allowlist entry.

**Verdict: PASS.** The slider standard-thumb design intent is RESOLVED on the record by
resolution (b) revert+invert-gate, user-directed per PROMPT-CORPUS:51, anchored by the
live capture. The corpus, ledger, gate, and SFC tell ONE story.
