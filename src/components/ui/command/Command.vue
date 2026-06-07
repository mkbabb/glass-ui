<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: true,
  modelValue: '',
})

const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- AW.W25 — the overlay-band material carve: Command joins the shared
       `glass-floating` substrate every overlay sibling already uses, retiring the
       flat `bg-popover`. -->
  <ComboboxRoot
    data-slot="command"
    v-bind="forwarded"
    :class="cn('glass-floating flex h-full w-full flex-col overflow-hidden rounded-panel text-popover-foreground', props.class)"
  >
    <slot />
  </ComboboxRoot>
</template>
