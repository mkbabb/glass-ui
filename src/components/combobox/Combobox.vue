<script setup lang="ts">
import { ComboboxRoot, type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits } from 'reka-ui'

// BI.W-MULTISELECT-FOLD — MultiSelect folded onto `<Combobox multiple>` (clean
// break, no alias). reka's ComboboxRoot carries the `multiple` capability natively
// (array v-model + `by` comparison); glass-ui surfaces it first-class: the
// `data-multiple` hook + the forwarded root default-slot state (`open`, `modelValue`)
// let a consumer render chips-in-trigger from the LIVE model via the shared
// glass-chip capsule register (the TagsInput chip register) with no duplicated
// selection state. A single-select `<Combobox>` (multiple unset) is byte-identical.
const props = defineProps<ComboboxRootProps>()
const emits = defineEmits<ComboboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxRoot
    data-slot="combobox"
    :data-multiple="props.multiple ? '' : undefined"
    v-bind="forwarded"
  >
    <template #default="{ open, modelValue }">
      <slot :open="open" :model-value="modelValue" />
    </template>
  </ComboboxRoot>
</template>
