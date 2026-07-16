# BI.W-P075 — Progress single-owner contract

**Status:** IMPLEMENTED — NATIVE VALUE-MARK ACCEPTANCE PENDING

## Product contract

`Progress` is the sole public and runtime owner of progress geometry. It preserves
Reka's accessible progressbar semantics and exposes six small axes:

- `modelValue` and `max` use one numeric domain for ARIA, fill geometry, and marks.
- `variant` selects `default`, `gradient`, or `liquid` paint without introducing a
  second value owner.
- `marks` adds optional, decorative, sorted interior checkpoints in that same domain.
- `indeterminate` (or a null `modelValue`) removes the numeric ARIA value and renders
  the loading state consistently for every paint variant. A non-empty `marks` input is
  rejected through the component's existing contract signal because unknown progress
  has no truthful numeric checkpoints.
- `status="default|error"` communicates failure without replacing or promoting the
  current numeric value to completion.
- `orientation="horizontal|vertical"` transposes the same fill and mark geometry.

The root retains logical value geometry in RTL. Gradient lifecycle paint and reduced-
motion behavior remain internal details; they do not alter the value contract.

## Shipped

- Folded default, gradient, and liquid rendering into one `ProgressRoot`, one
  `ProgressIndicator`, and one marks layer in `Progress.vue`.
- Deleted the three private renderer SFCs. They were dispatcher implementation
  details, never public components.
- Kept the existing public component, variant names, props, CSS tokens, and shared
  `valueDomain` normalization.
- Made determinate/indeterminate semantics identical across all variants while
  preserving gradient lifecycle paint, liquid fill paint, ARIA, RTL, and mark
  continuity.
- Replaced root utility styling with typed state attributes and colocated CSS; added
  vertical, error, and reduced-motion paint without another value owner.
- Removed the unused `glass-progress-rail` restyle utility; consumers retain the
  component's token surface for local sizing and tint.

## Verification

`tests/components/ui/progress/Progress.test.ts` covers all variants, arbitrary maxima,
sorted and deduplicated marks, RTL, gradient lifecycle/crescendo, numeric-free
indeterminate states for every variant, and explicit indeterminate/marks refusal.

No proof scripts, receipt machinery, or browser automation are part of the product
slice.
