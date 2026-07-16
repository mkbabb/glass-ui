# BI.W-P086 — Checkbox

**Status:** DONE
**Disposition:** retained public form control

Checkbox is the binary/indeterminate selection control. The wrapper delegates state,
keyboard behavior, disabled/required handling, and native form participation to Reka
while owning the visible checked, indeterminate, focus, disabled, and touch-target
presentation.

Current product evidence:

- `src/components/checkbox/Checkbox.vue` forwards the Reka root contract and renders
  distinct check and indeterminate glyphs.
- `tests/components/ui/reka-binding-idiom.test.ts` verifies checked, unchecked, and
  indeterminate rendered state.
- `tests-visual/touch-target.spec.ts` verifies the shared fine/coarse target contract.
- `demo/stories/forms/checks.vue` and `demo/stories/forms/label.vue` are the live owner
  compositions; no duplicate component-specific story is required.

No further component apotheosis work is owned here. Cross-cut validation messaging and
form composition remain with the shared forms owners.
