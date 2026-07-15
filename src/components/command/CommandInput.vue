<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Search } from "@lucide/vue"
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui'
import { cn } from '../_shared/class-names'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
  placeholder?: InputHTMLAttributes['placeholder']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- AX.W51 D18 — the filter-input HEIGHT reads the shared `--dropdown-input-height`
       register (= W51's `--control-h-md`; was h-11), unifying the Combobox/Command
       filter-input register onto ONE comfort-scaled height.
       AX.W50 D17 — the font reads the family PRIMARY rung (`text-dropdown`). -->
  <div class="flex items-center border-b px-3" data-cmdk-input-wrapper>
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="cn('flex h-(--dropdown-input-height) w-full rounded-input bg-transparent py-3 text-dropdown outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled', props.class)"
    />
  </div>
</template>
