# AY.W-SCALE2 — DELTA: form-atom touch-hit-area + the REAL touch-target axe gate

**Wave:** W-SCALE2 — the six sub-44 form atoms acquire a ≥44px coarse hit-rect via
ONE shared `@utility touch-hit-area` (the timeline `::before`-halo pattern generalized
to a size-agnostic centred-min-size form); the MultiSelect chip Badge `text-xs`
re-points onto the comfort axis; the phantom `proof:touch-target` becomes a REAL
runtime gate.

**Gate:** `tests-visual/touch-target.spec.ts` at the new `coarse-touch` Playwright
project (PRIMARY readback + axe secondary + non-regression) + the no-new-token /
text-axis source greps + `proof:live-verified-ledger`.

---

## The root fix (the gestalt — decoupled hit-target from visual size)

`src/styles/utilities.css` — NEW `@utility touch-hit-area`: a COARSE-ONLY `::before`
overlay keyed off `var(--touch-target)`, sized with the size-AGNOSTIC centred form
(`min-width/min-height: var(--touch-target)` + `top/left:50%` + `translate:-50% -50%`)
that floors BOTH dimensions at 44px for ANY visual size. The default (fine-pointer)
path declares NO overlay box (no `content`) — the fine-pointer-byte-identical
invariant (STRICTER than the timeline precedent whose `::before` exists at fine
pointer too). A 16px Checkbox stays 16px visually; only its coarse hit-rect grows.

DIVERGENCE-WITH-RATIONALE recorded in the `@utility` doc-comment: the timeline's fixed
symmetric `inset` works only for a KNOWN square dot; our atoms are non-square and not a
known size, so the centred-min-size form is the generalization.

Composed on the SIX atom SFC roots (≥2-consumer satisfaction):
- `Switch.vue:37` SwitchRoot — `relative touch-hit-area`
- `Checkbox.vue:25` CheckboxRoot — `relative touch-hit-area`
- `RadioGroupItem.vue:29` — `relative touch-hit-area`
- `Slider.vue:164` `<SliderThumb>` — `touch-hit-area` + a scoped-CSS guard
  (`.slider-thumb.touch-hit-area::before { pointer-events: none }`) so the 44px
  GEOMETRY satisfies the readback while the pointer falls through to the thumb — the
  drag still tracks (binding-verified, see below). The reka SliderThumb owns the
  value-follow pointer-capture; a `pointer-events: auto` overlay would have broken it.
- `TagsInputItemDelete.vue:19` — `relative touch-hit-area`
- `MultiSelect.vue:152` remove-X Button — `relative touch-hit-area`

`MultiSelect.vue:139` — the selected-chip Badge `text-xs` → `text-[length:var(--control-text-sm)]`
(the Tailwind v4 token-backed font-size idiom; the comfort axis). The TagsInput
text-axis re-point was DROPPED (no `text-sm` literal exists at HEAD).

NO fourth floor token (D4): the utility + every SFC read `var(--touch-target)`. The
only `2.75rem` is the established `var(--touch-target, 2.75rem)` fallback (same shape
as the existing 3-selector coarse block), not a new literal.

---

## The measured runtime DELTA (the cardinal evidence — per-atom hit-rect readback)

`tests-visual/touch-target.spec.ts` at the `coarse-touch` project (390×844,
`hasTouch:true`, `isMobile:true` → `@media (pointer: coarse)` matches), composited
hit-rect (visual box ∪ `::before` halo) per atom:

| atom | route | HEAD (born-RED) | post-wave hit-rect | halo | pass |
|---|---|---|---|---|---|
| Switch | forms/checks | 24×44 | **44×44** | 44×44 | ✓ |
| Checkbox | forms/checks | 16×16 | **44×44** | 44×44 | ✓ |
| RadioGroupItem | forms/checks | 16×16 | **44×44** | 44×44 | ✓ |
| SliderThumb | forms/slider | ~7×track | **44×44** | 44×44 | ✓ |
| TagsInputItemDelete | data/tags-input | 16×16 | **44×44** | 44×44 | ✓ |
| MultiSelectRemoveX | forms/multi-select | 8–12 | **44×44** | 44×44 | ✓ |

All seven cross the 44px floor (the worst HEAD offender — the 8–12px MultiSelect
remove-X — now 44×44).

## Born-RED witness (the gate BITES)

Reverting Checkbox's `touch-hit-area` compose → the readback REDs for that atom:
`✗ Checkbox (forms/checks): hit-rect 16×16 (halo 0×0)` → `WIDTH 16px < 44px`. Restored
after the witness.

## NON-REGRESSION (fine-pointer byte-identical)

A fresh FINE-pointer context (`hasTouch:false`, 1280×800): the Checkbox `::before`
resolves NO overlay (`beforeMinW` < 44, the content is `none`/auto) and the composited
width stays the bare 16px — the coarse overlay does NOT leak to desktop. ✓

## Slider drag binding-verification (no swallowed pointer-capture)

`tests-visual/dock-with-slider-live.spec.ts` — 4/4 passed with the REAL `page.mouse.*`
drag: the drag holds the dock open, `data-held` lit on both dock + slider roots, the
thumb-halo intensified. The `pointer-events: none` guard on the thumb `::before`
preserved the reka SliderThumb's pointer-capture — no silent drag regression.

## axe target-size secondary (best-effort)

The spec attempts an axe-core CDN inject (4s timeout → SKIPs offline). When reachable
it runs `axe.run` scoped to `target-size`-only and asserts 0 violations. The PRIMARY
getComputedStyle readback is the artefact-valid close (the library publish surface
being zero-dep); axe is the corroborating secondary, never the sole bar.

## Captured PNGs (own-surface, ≥2-viewport × {light,dark})

- `W-SCALE2-checks-mobile-light.png` / `W-SCALE2-checks-mobile-dark.png`
- `W-SCALE2-slider-mobile-light.png` / `W-SCALE2-slider-mobile-dark.png`
- `W-SCALE2-tags-input-mobile-light.png` / `W-SCALE2-tags-input-mobile-dark.png`
- `W-SCALE2-multi-select-mobile-light.png` / `W-SCALE2-multi-select-mobile-dark.png`

Captured DELTA JSON: `.cache/touch-target.json` (per-atom `{atom, route, hitRect, pass}`).

## Gate verdicts

- `tests-visual/touch-target.spec.ts` — 2 passed (PRIMARY readback all ≥44 + non-regression)
- born-RED witness — confirmed (revert Checkbox → 16×16 REDs)
- `npm run proof:ui-scale` — GREEN (control-text-sm derives unchanged)
- `npm run proof:slider-two-only` — PASS (Slider touch-hit-area class did not break the two-recipe contract)
- `tests-visual/dock-with-slider-live.spec.ts` — 4 passed (drag still tracks)
- no-new-token + text-axis source greps — PASS
