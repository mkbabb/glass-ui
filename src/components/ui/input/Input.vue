<script lang="ts">
// AQ.W4 §W4.2 — attr-passthrough contract (generalizes the NumberFieldInput
// contract to the form family). `inheritAttrs:false` + an explicit
// `v-bind="$attrs"` on the rendered `<input>` makes the pass-through a
// guaranteed, single-target contract rather than an implicit fall-through:
// every native `<input>` attribute a consumer sets lands on the focusable
// element.
//
//   <Input>` forwards every native `<input>` attribute to the rendered
//   element. Consumers MUST set `autocomplete` (e.g. `email`,
//   `current-password`, `new-password`, `postal-code`), `inputmode` (e.g.
//   `numeric`, `decimal`, `email`, `tel`), `enterkeyhint` (e.g. `next`,
//   `done`, `search`), and `type` (`text`/`email`/`tel`/`search`/`url`/
//   `password`) per the forms-guide §3 matrix. Do NOT use `type="number"` for
//   ZIP/credit-card — use `type="text" inputmode="numeric"`. The `aria-*`
//   family (`aria-label` / `aria-labelledby` / `aria-invalid` /
//   `aria-describedby` / `aria-errormessage`) and `required` land on the
//   `<input>` too, so the `useUserInvalidAria` bridge and a `<Label for>`
//   binding reach the focusable control directly.
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '../../../utils'
import { type ControlSize, controlSizeClass } from '../_shared/useControlSize'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  // BC.W-CONTROL-CUSTOM — the shared control-size axis. Selects a rung of the
  // `--control-h-*` / `--control-text` cohort (sm→shorter+quieter, default→the
  // golden pill, lg→taller). The magnitudes stay the cohort tokens — a `:root`
  // override still retunes the absolute height/font.
  size?: ControlSize
  // Element-specific <input> attributes typed on the wrapper surface — the
  // forms-guide §3 matrix the header documents (the rest of the native
  // attribute set still falls through via `v-bind="$attrs"`).
  type?: InputHTMLAttributes['type']
  placeholder?: InputHTMLAttributes['placeholder']
  disabled?: InputHTMLAttributes['disabled']
  required?: InputHTMLAttributes['required']
  inputmode?: InputHTMLAttributes['inputmode']
  // `autocomplete` is typed as `string` rather than the full token union — the
  // union is large enough to overflow TS's representable-union budget (TS2590)
  // when widened into the forwarded `elementAttrs` literal.
  autocomplete?: string
  pattern?: InputHTMLAttributes['pattern']
  name?: InputHTMLAttributes['name']
  readonly?: InputHTMLAttributes['readonly']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

// Declared props are extracted from `$attrs`, so forward them explicitly.
const elementAttrs = computed(() => ({
  type: props.type,
  placeholder: props.placeholder,
  disabled: props.disabled,
  required: props.required,
  inputmode: props.inputmode,
  autocomplete: props.autocomplete,
  pattern: props.pattern,
  name: props.name,
  readonly: props.readonly,
}))
</script>

<template>
  <!-- BB.W-ON-GLASS-FG (N13) — the well fill re-points the SHARED control REST register
       (--control-surface-bg) onto the surface-aware --input-on-glass rung (the form-well
       contrast target is the COMPOSITED glass fill, not the canvas). The `.input-pill`
       recipe reads --control-surface-bg, so this re-point is the ONE well register — NOT
       a second well recipe (the no-fork floor; it coordinates with the BA control-surface
       tier rather than forking). A consumer wanting the pristine glass-quiet well
       overrides --control-surface-bg on an ancestor; the on-glass rung auto-flips per mode. -->
  <!-- BC.W-CONTROL-CUSTOM — the bare `text-sm` is dropped (the `.input-pill` recipe
       supplies `font-size: var(--control-pill-text, --control-text)`, so the type
       register reads the cohort, not a static literal). `controlSizeClass(size)`
       re-points the height/font seam per rung. The `file:`-modifier-scoped literal
       is the file-upload sub-element register (exempt from C1); re-pointed onto the
       `--control-text-sm` token so it tracks the cohort under `--ui-scale`. -->
  <input v-model="modelValue" data-slot="input" v-bind="{ ...$attrs, ...elementAttrs }" :class="cn('input-pill [--control-surface-bg:var(--input-on-glass)] file:border-0 file:bg-transparent file:text-(length:--control-text-sm) file:font-medium', controlSizeClass(props.size), props.class)">
</template>
