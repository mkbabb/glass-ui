<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'

withDefaults(
  defineProps<{
    amount: string | number | null | undefined
    unit?: string
    /** Color applied to the amount when it's truthy. */
    color?: string
    /** Substitute glyph when amount is empty. */
    placeholder?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    placeholder: '—', // em dash
  },
)
</script>

<template>
  <div
    :class="cn(
      'metric-badge inline-flex items-center justify-center text-center leading-tight shrink-0 overflow-hidden',
      'cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      $props.class,
    )"
  >
    <span
      class="text-mono-micro font-semibold tabular-nums tracking-snug truncate transition-colors"
      :style="amount ? { color } : undefined"
      :class="{ 'text-muted-foreground/40': !amount }"
    >{{ amount || placeholder }}</span>
    <span
      v-if="unit"
      class="text-micro font-mono text-muted-foreground shrink-0"
    >{{ unit }}</span>
  </div>
</template>
