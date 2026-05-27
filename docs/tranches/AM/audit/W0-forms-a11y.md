# AM.W0.2 — forms-a11y + dock-aria re-derivation

Closes gap 4 (NumberField input-level aria-label, MAJOR) with a code fix and gap 3 (GlassDock aria-allowed-attr contract, MINOR) as a read-only contract finding.

## Gap 4 — NumberField inner-input accessible name (LANDS)

### The gap

`NumberFieldInput.vue` forwarded no aria attributes to its inner element. A consumer who labelled the field (e.g. `aria-label` on the input wrapper) shipped an **unlabelled focusable `<input>`**, because the wrapper's single-root attr fall-through landed the attr on the reka-ui component boundary without a guaranteed contract, and the wrapper offered no explicit accessible-name channel.

### The attr-forwarding chain (verified against reka-ui source)

- `node_modules/reka-ui/src/Primitive/Primitive.ts:44` — `Primitive` sets `inheritAttrs: false` and renders self-closing input tags as `h('input', attrs)` (`:58-59`), so any `$attrs` reaching the Primitive land **directly on the `<input>` DOM node**.
- `node_modules/reka-ui/src/NumberField/NumberFieldInput.vue` — the reka primitive renders that `<Primitive as="input">` as its single root (`:60`, `as: 'input'` default `:14-16`). It does not declare `inheritAttrs:false` itself, so attrs that fall through to it cascade onto its `<Primitive>` root and thence to the `<input>`.

So the fix only needs to put `aria-label` / `aria-labelledby` onto the reka `<NumberFieldInput>` element; reka carries them the rest of the way to the `<input>`.

### The fix — `src/components/ui/number-field/NumberFieldInput.vue`

Mirrors the Slider idiom (`src/components/ui/slider/Slider.vue:163` — `:aria-label="$attrs['aria-label'] as string ?? undefined"` forwarded onto the reka `SliderThumb`). In a `<script setup>` SFC the `inheritAttrs:false` opt-out requires a second plain `<script>` block exporting a default options object.

**Before**

```vue
<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui'
import { cn } from '../../../utils'
</script>

<template>
  <NumberFieldInput data-slot="input" :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled')" />
</template>
```

**After**

```vue
<script lang="ts">
// Opt out of Vue's default attr fall-through so the accessible-name attrs
// land on the inner reka-ui <input> via an explicit forward (below) rather
// than implicitly on this single-root wrapper. Mirrors Slider.vue's
// `:aria-label="$attrs['aria-label']"` idiom (gap 4, AM.W0.2).
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui'
import { cn } from '../../../utils'
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :aria-label="($attrs['aria-label'] as string | undefined) ?? undefined"
    :aria-labelledby="($attrs['aria-labelledby'] as string | undefined) ?? undefined"
    :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled')"
  />
</template>
```

`inheritAttrs:false` makes the channel explicit and prevents the accessible-name attr from being duplicated on a wrapper boundary; the `?? undefined` collapse keeps the attribute absent (rather than `aria-label=""`) when the consumer supplies no name. The existing `data-slot="input"` + `cn()` class behaviour is untouched.

### `NumberField.vue` (root) — no change required

`NumberField.vue` wraps reka `NumberFieldRoot` (a `<div>` grid container) and renders only `<slot />`; the `<NumberFieldInput>` is a consumer-placed slotted child, not an element the root renders. The root therefore cannot relay a label onto an input it does not own. The composition pattern (see `demo/stories/primitives/number-field.vue:25-29`) confirms the consumer authors `<NumberFieldInput />` directly, so the input-level forward is the correct and minimal contract. A root-level `aria-label` would (correctly) describe the group container, not the input; consumers who want the input named set it on `<NumberFieldInput>` or associate a `<Label for>` / `aria-labelledby`.

### Resulting DOM contract

A consumer writing:

```vue
<NumberField v-model="dist" :min="0">
  <NumberFieldContent>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Min distance" />
    <NumberFieldIncrement />
  </NumberFieldContent>
</NumberField>
```

now renders the focusable element as:

```html
<input role="spinbutton" type="text" tabindex="0"
       aria-label="Min distance"
       aria-roledescription="Number field"
       aria-valuenow="…" aria-valuemin="0" aria-valuemax="…" … />
```

The `aria-label` lands on the actual `<input>` (via wrapper forward → reka `NumberFieldInput` → `Primitive` `h('input', attrs)`), so the focusable spinbutton now carries an accessible name. `aria-labelledby` forwards identically for the `<Label for>` / id-reference idiom.

### Typecheck

```
$ npm run typecheck
> vue-tsc --noEmit
EXIT:0
```

`vue-tsc --noEmit` exits 0 with the `inheritAttrs:false` second-script-block + the typed `$attrs` casts. (`npm run build` intentionally NOT run here — the ~6.7 GB type-graph walk is run once by the orchestrator after sibling integration.)

## Gap 3 — GlassDock aria-allowed-attr contract (READ-ONLY finding, no code change)

### Finding

`src/components/custom/dock/GlassDock.vue:270-295` renders its root as a **presentational** `<div class="glass-dock">`. It carries layout/state data attributes (`:data-density`, `:data-held`, `:data-container-name`) and pointer/focus listeners, but **no ARIA role and no `aria-expanded`**.

```
$ grep -rn "aria-expanded" src/components/custom/dock/
(exit 1 — zero matches)
```

The dock's expand/collapse state lives on `expanded` / `visualExpanded` refs that drive CSS classes (`{ expanded, collapsed, pinned, … }`), not an ARIA attribute. The root `<div>` has no interactive role, so `aria-expanded` is **not an allowed attribute** there — axe's `aria-allowed-attr` rule fires exactly when `aria-expanded` is placed on a role that does not permit it.

### Disposition — consumer-authored, contract not forced attribute

The downstream axe `aria-allowed-attr` violation is **consumer-authored**: the consumer placed `aria-expanded` on the presentational dock `<div>`. The library's correct redress is a documented contract, not a forced attribute on a presentational element (which would itself be wrong):

> **GlassDock aria contract.** The `GlassDock` root is presentational (`<div class="glass-dock">`, no role). `aria-expanded` MUST NOT be applied to the root — it has no interactive role and the attribute is disallowed there (`aria-allowed-attr`). `aria-expanded` belongs on the dock **trigger** child — the interactive control (`button`/`role="button"`) that opens/collapses the dock. Consumers that need an expand-state announcement bind `:aria-expanded` to their trigger button (the element the user activates), reflecting the dock's exposed `expanded` state (available via `defineExpose` — `GlassDock.vue:266`).

No edit to `GlassDock.vue`. The standing presentational-root design is correct; AM.W2 docs this contract in CLAUDE.md.

### Slider — confirmed unchanged

`src/components/ui/slider/Slider.vue:160-165` renders its thumbs as reka-ui `<SliderThumb>`, which is a `role="slider"` host — a valid owner of `aria-valuetext` / `aria-valuenow` and `aria-label` (already forwarded via `:aria-label="$attrs['aria-label']"` at `:163`). No Slider change is needed for gap 3.

## Files touched

- `src/components/ui/number-field/NumberFieldInput.vue` — `inheritAttrs:false` + explicit `aria-label`/`aria-labelledby` forward (WRITE).
- `docs/tranches/AM/audit/W0-forms-a11y.md` — this evidence file (CREATE).
- `src/components/ui/number-field/NumberField.vue` — read only; no change required (composition root cannot relay to a slotted input).
- `src/components/custom/dock/GlassDock.vue` — READ-ONLY; contract finding only, no edit.
