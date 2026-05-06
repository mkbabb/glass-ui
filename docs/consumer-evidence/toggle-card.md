# Consumer Evidence — `toggleVariants.variant.card`

**Source**: `src/components/ui/toggle/index.ts:15`
**Demo consumer**: `demo/stories/primitives/toggle-card.vue:89`
**Glass-ui wire-or-retire pass**: I.W1.E (per I invariant 11; per H FINAL deferred)
**Verdict**: WIRE (sub-bar; demo is canonical Storybook-as-oracle consumer)

## Verification command (run at HEAD)

```bash
rg -n 'variant=.card.|variant: .card.' src/components/ui/toggle/ src/components/ui/toggle-group/ demo/
```

Expected hits at HEAD: `demo/stories/primitives/toggle-card.vue:89,126,158,167,176` (one demo file; six template-attribute mounts spanning standalone `<Toggle>` and `<ToggleGroup>` compositions).

## Source-of-truth file:line for variant definition

`src/components/ui/toggle/index.ts:15` — the `card` axis-value in the `toggleVariants` `variant` axis. Recipe: `bg-secondary` at rest, glass-medium tier + `shadow-cartoon-sm` + border on `data-[state=on]`. Threaded through `ToggleGroupItem` via the standard reka-ui pass-through.

## Use case

The `card` variant turns toggle items into tier-aware cards (resting on `--secondary`, lifting to glass-medium with cartoon-sm shadow on selection) — the canonical "selected tile" affordance for grouped toggles. The story exercises both the standalone `<Toggle variant="card">` shape and the grouped `<ToggleGroup variant="card">` propagation, covering single-select and toggle-on patterns.

## Notes

H FINAL (β audit row 245) named this variant "may emit evidence doc in a future tranche" — I.W1.E lands the doc per I invariant 11 (sub-bar CVA variants emit evidence docs OR retire; no more "may emit"). Demo file is the canonical consumer per the Storybook-as-oracle convention. If the proof grep fails at any future audit, the verdict reverts to `library-orphan`.
