# BI.W-P087 — RadioGroup

**Status:** DONE
**Disposition:** retained public exclusive-selection control

RadioGroup owns one-of-N form selection. Reka remains the behavior authority for the
radiogroup/radio roles, required state, controlled value, roving focus, keyboard
selection, disabled items, and native form value; Glass owns the item presentation.

Current product evidence:

- `src/components/radio-group/RadioGroup.vue` and `RadioGroupItem.vue` forward the Reka
  root/item contracts without a second selection state.
- `tests-visual/radio-fix.spec.ts` exercises live pointer selection, release of the prior
  item, Arrow-key movement/selection, `aria-checked`, visible state, and coarse targets.
- `demo/stories/forms/checks.vue` and `demo/stories/forms/label.vue` are the live owner
  compositions; no split RadioGroup story or duplicate contract matrix is required.

ToggleGroup is not a RadioGroup alias. Exclusive form choices use this family; pressed
commands use ToggleGroup.
