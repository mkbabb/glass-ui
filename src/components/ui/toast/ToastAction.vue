<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ToastAction, type ToastActionProps } from 'reka-ui'
import { cn } from '../../_shared/class-names'

interface Props extends ToastActionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastAction
    v-bind="delegatedProps"
    :class="
      cn(
        // AX.W51 D18 — the 32px toast-action height rides the ONE `--ui-scale`
        // comfort axis inline (a single-consumer rung, scaled without minting a
        // dedicated token per the no-overfit discipline).
        'focus-ring inline-flex h-[calc(2rem*var(--ui-scale))] shrink-0 items-center justify-center rounded-button border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-disabled group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground',
        props.class,
      )
    "
  >
    <slot />
  </ToastAction>
</template>
