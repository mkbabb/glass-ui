# BI.W-P090 — ToggleGroup

**Status:** DONE
**Disposition:** retained public pressed-command group

ToggleGroup owns single or multiple pressed-command selection, orientation, disabled
state, and Reka roving focus. Both modes preserve Reka's `role="group"` plus per-item
`aria-pressed` contract. A single-mode ToggleGroup is not rewritten as a RadioGroup;
exclusive form selection remains owned by BI.W-P087.

Current product evidence:

- `src/components/toggle-group/ToggleGroup.vue` forwards the Reka group contract without
  a Glass-authored `radiogroup` override.
- `src/components/toggle-group/ToggleGroupItem.vue` forwards Reka item state without
  `role="radio"` or `aria-checked` synthesis.
- `tests/components/ui/toggle-group/ToggleGroup.test.ts` verifies single and multiple
  `aria-pressed` state, absence of radio semantics, safe constrained alignment, and
  ArrowRight roving focus.
- `demo/stories/forms/toggle.vue` remains the canonical composed story; no duplicate
  ToggleGroup-specific story is required.

The component surface is unchanged. The repair removes only the conflicting semantic
override and leaves public imports, styling, and owner stories intact.
