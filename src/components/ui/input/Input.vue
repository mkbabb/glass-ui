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
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '../../../utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" v-bind="$attrs" :class="cn('input-pill text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium', props.class)">
</template>
