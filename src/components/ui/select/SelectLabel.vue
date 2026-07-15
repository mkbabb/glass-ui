<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel, type SelectLabelProps } from 'reka-ui'
import { cn } from '../../_shared/class-names'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <!-- AX.W50 D17 — the section label reads the family SECONDARY rung
       (`text-dropdown-secondary`), resolving the witness-2 scale contradiction (the
       label role now matches the Combobox/Command group-heading scale family-wide). -->
  <SelectLabel :class="cn('py-1.5 pl-8 pr-2 text-dropdown-secondary font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>
