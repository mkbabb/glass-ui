<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SearchIcon } from "@lucide/vue"
import { ComboboxInput, type ComboboxInputEmits, type ComboboxInputProps, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
  placeholder?: InputHTMLAttributes['placeholder']
}>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3"
  >
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <ComboboxInput
      data-slot="command-input"
      :class="cn(
        // AX.W51 D18 — the filter-input HEIGHT reads the shared `--dropdown-input-height`
        // register (= W51's `--control-h-md`, unifying the Combobox h-10 / Command h-11
        // split onto ONE comfort-scaled register).
        // AX.W50 D17 — the font reads the family PRIMARY rung (`text-dropdown`).
        'placeholder:text-muted-foreground flex h-[var(--dropdown-input-height)] w-full rounded-input bg-transparent py-3 text-dropdown outline-hidden disabled:cursor-not-allowed disabled:opacity-disabled aria-invalid:text-destructive aria-invalid:placeholder:text-[color-mix(in_srgb,var(--destructive)_60%,transparent)]',
        props.class,
      )"

      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </ComboboxInput>
  </div>
</template>
