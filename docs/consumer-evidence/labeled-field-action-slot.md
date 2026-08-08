# LabeledField `#action` slot (kf-G3)

## Artefact path

`src/components/custom/labeled-field/LabeledField.vue` — the additive `#action` slot +
`horizontal?: boolean` axis (the published subpath `@mkbabb/glass-ui/labeled-field`).

## Wave

**BC.W-CONTROL-SMOOTH move C** — the named BUILD home for the AX `kf-G3` deferral
(`ax-undischarged-builds`, HIGH, DECIDED=BUILD; the FOLD-LEDGER re-points the destination
to `BC.W-CONTROL-SMOOTH` — LabeledField is a control-family component, the old `Band 4
controls/reconcile` band-only disposition named a phantom). The REQ-sec20 horizontal
action-slot the AX row booked HIGH and never built.

## What it is

A `<LabeledField>` (and its `LabeledInput`/~~`LabeledSelect`~~ [BK #57, 2026-08-07:
`LabeledSelect` REMOVED from the subpath — an `items` array is a preset and it dragged the
overlay chain; it lives in the demo now, `MIGRATION.md` §8.0.0]/`LabeledSlider`/`LabeledSwitch`
wrappers) gains an `#action` slot + a `horizontal` layout axis so a labeled control can
carry a TRAILING action affordance (a clear / reveal / copy / edit button) beside the
field. KISS: it is a `<slot name="action">` in a flex row, NOT a new component —
LabeledField already owns the label+control layout, this adds the trailing cell.

**Additive + default-OFF:** with NO `#action` slot AND `horizontal=false` the field renders
**byte-identical to HEAD** (the `v-if="$slots.action"` arm never renders, the bare
`v-else` `<slot/>` is the HEAD markup; the `horizontal` modifier class is never added so
the column layout holds). The action button inherits the wave's lag-kill + rounded
register by construction — it composes `transition-control` (the quick 0.12s surface
clock, move A) + `.tap-squish` + `.focus-ring` + the pill radius (move B), so there is no
per-button fork.

## The a11y contract on the action cell (AN.W4 + AM.W0)

- The action button is a real `<button>` host (the demo uses `<Button>`) that MUST carry
  an accessible name — an icon-only action button has no text content, so each demo
  consumer binds `:aria-label` (the AN.W4 SortableHandle/StatusDot "name on the focusable
  element" lesson). An unnamed icon-only action button reds the gate.
- The action button is a SIBLING cell — it is NOT the field's labelling element. The
  `<label for>`→`controlId` association is untouched (the AM.W0 NumberField label-binding
  contract).
- It carries `.focus-ring` (keyboard reach) + `.tap-squish` + the quick clock by
  construction (it inherits move A + move B through `<Button>`).
- On a coarse pointer the action cell clears the 44px WCAG-2.5.5 floor (`size="icon"`
  resolves the `--control-h-md` square, ≥44px under the coarse clamp).

## Consumer proof (re-runnable)

The ≥2-consumer bar (J inv-10): the slot is exercised by **2** demo LabeledField rows —
the canonical horizontal-action cases — in `demo/stories/forms/labeled-field.vue`:

```bash
grep -c '#action' demo/stories/forms/labeled-field.vue
#   → 2  (consumer #1 clear-input + consumer #2 reveal-password)
```

- **consumer #1 — clear-input.** A `Search` LabeledField whose `#action` is an `X` button
  (`aria-label="Clear search"`, `:disabled="!search"`) that empties the field.
- **consumer #2 — reveal-password.** A `Password` LabeledField whose `#action` is an
  `Eye`/`EyeOff` toggle (`:aria-label="revealLabel"`) that flips the inner `<Input>`'s
  `type` between `password` and `text`.

Both are real, interactive, named affordances — not a one-off slot. A one-consumer slot
reds the gate's consumer-bar arm.

## Re-audit proof

Satisfies the `proof:control-smooth` C5 consumer-bar arm (≥2 demo consumers exercise the
`#action` slot, each resolving a non-empty accessible name) while the two
`labeled-field.vue` rows stay present. If either is removed with no replacement, the
verdict returns to "below the ≥2 bar" and the gate's C5 consumer-bar clause reds.

## Cross-references

- `src/components/custom/labeled-field/LabeledField.vue` (the slot + `horizontal` axis +
  the scoped `.labeled-field-row`/`.labeled-field-action`/`--horizontal` layout).
- `demo/stories/forms/labeled-field.vue` (consumer #1 clear-input + consumer #2
  reveal-password — the ≥2 horizontal-action cases).
- `docs/tranches/BC/waves/BC.W-CONTROL-SMOOTH.md` (move C, kf-G3 BUILD).
