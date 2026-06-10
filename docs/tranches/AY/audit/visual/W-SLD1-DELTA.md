# W-SLD1 — Slider standard-thumb CONTINUOUS-ROUNDED-CYLINDER + spectrum round-fallback fidelity — DELTA

**Wave:** AY.W-SLD1 (+ §RE-GROUND-2 cylinder correction, BUILD phase) · **Status:** live-verified (gate-green; the inscribed-cylinder form awaits the user's one-line ratification — RG3-B rider) · **Verdict:** PASS (gate) / judgment-pending (user-hinge).

**Resolution: the CONTINUOUS ROUNDED CYLINDER (the user's verbatim 2026-06-09 standard).**
The standard form is a round knob INSCRIBED into a thick glass capsule so the whole reads
as ONE continuous piece — a ball-bearing seated in the cylinder, never a knob on a wire.
This supersedes the prior (b)-revert reading: that revert OVER-SHOT to a DETACHED FLOATING
KNOB (the §RE-GROUND-2 live measurement: a 16px knob on a 6px track protruded ~2.67× the
track height — the Material/shadcn knob-on-a-wire register, the opposite pole of "one
continuous piece"). The user's verbatim words bind the geometry:

> "our slider should be of two forms — a continuous rounded cylinder (thumb integrated
> into a thick track that appears as one continuous piece) and our spectrum slider, as
> seen in value.js"

"Fully rounded" AND "continuous" are a CONJUNCTION — a round knob that bulges past a thin
track satisfies only the first half and inverts the second. The cylinder correction
satisfies both.

**Route:** `/forms/slider` (`resolveScene("forms", "slider")`).
**Surface:** the standard `.slider-thumb` (the inscribed round knob in the thick cylinder)
+ the spectrum `.slider-thumb` (the gradient-track squircle).
**Viewports:** 1280×800 · **Schemes:** {light, dark}.
**Device:** Chrome-headless-new, ANGLE→Metal, via `tests-visual/slider-spectrum-fallback.spec.ts`.

---

## What changed (the cylinder correction)

- **`src/components/ui/slider/index.ts` size rungs** — the track THICKENS to inscribe the
  knob: `--slider-track-height` = `--slider-thumb-size + 4px` (a 2px inset reveal each
  side). Rungs: `sm 12px/8px`, `md 20px/16px`, `lg 28px/24px` — thumb ≤ track at EVERY
  rung (was inverted: 4/12, 6/16, 12/24, the knob protruding far past a thin wire).
- **`src/components/ui/slider/Slider.vue` standard `.slider-thumb`** — the round knob
  (`border-radius: 50%` + `aspect-ratio: 1`) is unchanged in shape but now SEATED inside
  the thick track (protrusion 0). `thumbAlignment: 'contain'` is applied to BOTH recipes
  (was spectrum-only) so the inscribed knob never overhangs the capsule's rounded ends.
  The W-GLASS `--glass-level` legs (the `--glass-blur-quiet` range backdrop, the
  `--spring-smooth` press transition) are PRESERVED — the geometry edit is surgical over
  the landed glass-level routing. The `.slider-range` glass fill spans the full thick-track
  height (one continuous cylinder). The stale `scaleX` comment is fixed to "uniform
  `scale()` press-give" (RG3-D).
- **`scripts/proof-slider-two-only.mjs` clause (3)** — the THIRD isCircle restatement
  (§RE-GROUND-2): the clause now locks the CONJUNCTION, not a bare shape test —
  **round-ended** (`border-radius: 50%` + `aspect-ratio: 1` + no border paint) ∧
  **track-height-matched ∧ zero-detachment** (a NEW per-rung parse: at every size rung
  `--slider-thumb-size` ≤ `--slider-track-height`, the knob inscribed) ∧ the
  `.slider-range` `backdrop-filter` (the continuous glass cylinder). The header prose +
  console banner are de-narrated off the abrogated AX.W59 cylinder cap (RG3-C).
- **`Slider.vue` spectrum round-fallback** — already lifted off bare `--radius-lg` by
  W-GLASS to `calc(var(--slider-thumb-size, 1rem) * 0.7)` (11.2px on md = ~0.64× the box
  width) — the D2 fidelity hole is closed; this wave verifies it via the π readback.

---

## Captured own-surface PNGs (real on-disk, ≥1024 B, `\x89PNG`) — RG3-A padded recapture

| capture | light | dark |
|---|---|---|
| standard INSCRIBED CYLINDER (the resolution) | `W-SLD1-standard-resolved-light.png` | `W-SLD1-standard-resolved-dark.png` |
| spectrum squircle (D2 fidelity) | `W-SLD1-spectrum-light.png` | `W-SLD1-spectrum-dark.png` |

RG3-A: the recapture uses a PADDED clip off `boundingBox()` (the prior leaf-section
screenshot AMPUTATED the lower third of the floating knob). The standard PNGs now show the
FULL silhouette: the round knob seated INSIDE the thick continuous capsule, the fill
flowing under it at the value point — ONE continuous piece, zero protrusion. The spectrum
PNGs show the rounded-square superellipse window thumb over the LCH/hue gradient (the
value.js color-picker idiom).

---

## Paired-π readback (the binding numbers, NOT a grep)

| scheme | corner-shape supported | STD knob box | STD `border-radius` | STD inscribed (rungs, thumb ≤ track) | SPECTRUM box | SPECTRUM `border-radius` (vs 0.55× floor) | SPECTRUM `corner-shape` |
|---|---|---|---|---|---|---|---|
| light | true | 16×16 (1:1) | `50%` → 8px circle | sm 8≤12 · md 16≤20 · lg 24≤28 ✓ | 17.6×24.0 | `11.2px` ≥ floor 9.7px | `squircle` |
| dark  | true | 16×16 (1:1) | `50%` → 8px circle | sm 8≤12 · md 16≤20 · lg 24≤28 ✓ | 17.6×24.0 | `11.2px` ≥ floor 9.7px | `squircle` |

- **Standard**: a TRUE CIRCLE knob inscribed in the thick capsule (thumb ≤ track at every
  rung → protrusion 0, the continuous cylinder). The OLD geometry (md 16px knob on a 6px
  track = 2.67× protrusion) is gate-forbidden.
- **Spectrum**: `corner-shape: squircle` on the supporting engine; the round fallback
  `11.2px` is the cross-engine truth, ≥ the 0.55× squircle-adjacent floor.

---

## Corpus ↔ SFC ↔ gate alignment (the one-story line, §6 condition 5)

PROMPT-CORPUS:51 (now "a CONTINUOUS ROUNDED CYLINDER — thumb integrated into a thick
track"), `Slider.vue`'s standard `.slider-thumb` (the inscribed knob in the thick track),
the index.ts size rungs (thumb ≤ track), and `proof:slider-two-only`'s clause-3 CONJUNCTION
(round-ended ∧ inscribed ∧ thick-track) now name the SAME shape — the inscribed continuous
cylinder. AUDIT-LEDGER row 9 reads DONE with the cylinder correction recorded. No "floating
knob" and no "integrated cylinder CAP" survive anywhere.

---

## RG3-E — the allowlist claim, corrected

The prior DELTA CLAIMED a `"W-SLD1"` `VISUAL-ALLOWLIST.json` entry that was NOT present
(the cardinal-lesson micro-inflation: a false artifact claim). The engine does NOT require
the allowlist entry for a `live-verified` row (only `complete`-status rows are
allowlist-deepened — `proof-live-verified-ledger.mjs`). The append is RECOMMENDED (it makes
the claim true and deepens the row to own-surface depth) and is REPORTED as a shared-file
delta for the orchestrator (VISUAL-ALLOWLIST.json is a co-write-merged shared file).

## RG3-B — the user-hinge rider

The §RE-GROUND-2 cylinder correction implements the user's VERBATIM standing words — the
defensible branch. Per §6 condition 1, the JUDGED half wants the user's eye on the
CYLINDER-CORRECTED capture (the prior (b) self-served verdict ruled on a form that
over-shot). The row carries the gate-green / judgment-pending rider until the user ratifies
the inscribed cylinder against `W-SLD1-standard-resolved-{light,dark}.png` (one line, not a
third engineering iteration).

---

## Gate evidence

- `proof:slider-two-only` — **PASS** (clause-3 conjunction: round-ended + per-rung
  inscribed + continuous-glass; KEYSET + ORPHAN-SCAN + SQUIRCLE-SPECTRUM green). Output:
  `knob inscribed (rungs): sm 0.5rem≤0.75rem, md 1rem≤1.25rem, lg 1.5rem≤1.75rem`.
- `tests-visual/slider-spectrum-fallback.spec.ts` — **PASS** (2/2 on `chromium-headless-new`).
- `npx vue-tsc --noEmit` — exit 0.
- `proof:live-verified-ledger:ay` — GREEN with the `W-SLD1` row backed by this DELTA → the
  own-surface light+dark PNGs.

**Verdict: PASS (gate).** The slider standard form is the continuous rounded cylinder — the
user's verbatim standard — anchored by the live recapture; the user-hinge ratification of
the inscribed form is the named rider (RG3-B).
