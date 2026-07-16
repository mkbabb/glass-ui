# BI.W-P098 — LabeledField apotheosis — one accessible field composition

**Status:** IMPLEMENTED — native acceptance pending
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Terminal owner:** glass-ui orchestrator

## Intent

LabeledField owns one narrow composition concern: a visible Label, optional visible description,
slotted control, and active error linked by stable IDs. It owns requirement, invalid/disabled state,
and default/horizontal responsive layout. It never paints or reaches into the control.

## Landed disposition

- `/labeled-field` exports `LabeledField` and four thin, typed adapters: `LabeledInput`,
  `LabeledSelect`, `LabeledSlider`, and `LabeledSwitch`. The package root exports none of them.
- All five components share one Label/anatomy owner. The adapters delegate behavior and paint to
  Input, Select, Slider, and Switch and contain no styles of their own.
- The old Tooltip help trigger, hidden-label mode, trailing action slot, label/input class branches,
  and global labeled-field utility block are deleted. Supporting instructions are ordinary visible
  copy rather than hover-only content.
- Description and active error IDs are both included in `aria-describedby`; the active error also
  remains in `aria-errormessage`. Inactive errors emit no region or dangling ID.
- A native/Reka `required` prop and `requirement="required"` converge on one effective boolean used
  by both Label and the actual control. Optional annotation remains explicit and never makes the
  control required.
- Default composition is stacked. `layout="horizontal"` places copy before control in the same DOM
  order and returns to the stack at the narrow viewport. There is no divider or reserve mode.
- Forty-two duplicate ConfiguratorRow → hidden Labeled adapter nests were collapsed to the adapter
  alone. ConfiguratorRow remains only where token metadata/reset is real content. The compact
  Fourier transport keeps a directly named Select instead of reviving hidden-label behavior.
- Blob's raw seed input and Fourier's two raw checkbox rows now use the earned Input/Switch
  adapters; their duplicate row labels and one-off control paint are gone.

## Public contract

`LabeledField` accepts:

- `label: string`;
- `description?: string`;
- `requirement?: "required" | "optional"`;
- `invalid?: boolean` and `disabled?: boolean`;
- `layout?: "default" | "horizontal"`; and
- `errorLive?: "off" | "polite" | "assertive"`.

Its default slot receives `controlId`, `labelledBy`, `describedBy`, `errorId`, `invalid`, `disabled`,
and effective `required`. The error slot renders only while `invalid` is true.

The four adapters add only their underlying control's typed props and model event. They do not add
appearance variants, aliases, forwarding wrappers, or a second field state model.

## Consumer and documentation migration

- The forms story exercises default, description, required, optional, invalid, disabled, direct
  slot composition, all four adapters, horizontal, and narrow behavior with end-user copy.
- Form validation now projects native validity into explicit field state so visible errors and ARIA
  linkage agree; correcting a field clears its own error.
- Aurora, Blob, Fourier Field, Liquid Grid, Springs, Settings, and Configurator consumers use the
  aligned model/open APIs and visible description contract directly.
- The ConfiguratorRow guidance now forbids nesting both concepts solely to repeat a label.
- Migration and design guidance describe visible supporting copy and the stable slot IDs; no help
  trigger, hidden label, or class override is documented.

## Product acceptance

- Every control has one stable accessible name and no duplicate visual label.
- Description and active error text remain visible and correctly linked after reactive rerenders.
- Requirement annotation and native/Reka required semantics cannot disagree.
- Invalid and disabled state reach both field anatomy and control without selector inference or
  fallback classes.
- Input preserves native form attributes; Select preserves disclosure state; Slider preserves
  marks, range, motion, and dock-hold behavior; Switch preserves boolean form behavior.
- Horizontal and narrow layouts retain label-before-control reading order, usable widths, and no
  overflow.
- Source contains no Tooltip, hidden-label, action-slot, deep-control selector, or global
  labeled-field styling path.
- `/labeled-field` declarations and runtime exports contain exactly the five earned components and
  their public prop/slot types; the package root remains free of the family.

## Ordinary validation

- `tests/components/labeled-field.contract.test.ts` owns stable IDs, descriptive/error linkage,
  requirement convergence, invalid/disabled propagation, adapter anatomy, layout, and the absence
  of retired branches.
- `tests/components/slider.contract.test.ts` proves label, description, error message, and invalid
  state reach every semantic thumb without altering Slider behavior.
- `tests/public-surface.spec.ts` owns the exact `/labeled-field` runtime surface and root absence.
- Focused form/control/public-surface run: 7 files, 297 tests passed.
- Source typecheck is green.

## Native visual validation

Use the in-app Browser only; never substitute Playwright. Inspect `/forms/labeled-field` and one
dense Configurator consumer at wide/fine and narrow/coarse viewports in light, dark, and reduced
motion. Review hierarchy, description density, error/disabled distinction, label/control alignment,
focus order, control widths, and narrow stacking. The current in-app Browser runtime exposes no
connected session, so this witness remains pending rather than being fabricated by headless output.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P066 | Label preserves native association, required/optional annotation, and disabled state. |
| BI.W-P067 | Input preserves native value, form, autocomplete, inputmode, invalid, and size semantics. |
| BI.W-P068 | Textarea preserves native value/form semantics and its content/manual/fixed resize contract. |
| BI.W-P093 | Slider preserves marks, semantic thumbs, motion, and dock interaction while accepting field linkage. |
