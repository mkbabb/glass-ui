# BI.W-P095 — Select

**Status:** DONE
**Disposition:** retained public single-value listbox with one vertical scroll owner

Select retains its Reka-backed compound anatomy, controlled/uncontrolled value and open
state, keyboard/typeahead behavior, option semantics, portal positioning, collision
handling, and current transient-overlay material.

The product contract is now exact:

- `SelectTrigger.size` is `"sm" | "default"`; the consumerless `"display"` and
  `"audacious"` font-rung spellings are removed with no alias.
- `SelectContent` owns the bounded, clipped overlay plate.
- `SelectViewport` is the sole vertical scroll owner. Scroll buttons remain private
  content anatomy and continue to operate against Reka's viewport.

Evidence:

- `src/components/select/SelectTrigger.vue` contains only the two used control heights.
- `src/components/select/SelectContent.vue` clips the bounded content and marks the
  vertically scrollable viewport explicitly.
- `src/components/_shared/field-surfaces.css` ships the content bound without creating a
  second scrollport.
- `tests/components/select.contract.test.ts` verifies the public size union and exact
  one-scroll-owner structure.

Existing Select surface/material changes, public compound parts, listbox semantics, and
consumer compositions remain unchanged.
