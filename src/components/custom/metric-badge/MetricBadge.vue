<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../utils'

type MetricBadgeSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    amount: string | number | null | undefined
    unit?: string
    /** Color applied to the amount when it's truthy. */
    color?: string
    /** Substitute glyph when amount is empty. */
    placeholder?: string
    /** Typographic scale. Defaults to `md`. The ladder reads
     *  sm 11px / md 12px / lg 14px / xl 18px; `xl` is the audacious-poster
     *  rung (`text-mono-prose` amount, `text-prose` unit) for hero
     *  placements that need to read at chassis distance. */
    size?: MetricBadgeSize
    class?: HTMLAttributes['class']
  }>(),
  {
    placeholder: '—', // em dash
    size: 'md',
  },
)

const amountClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-mono-micro'
    case 'md':
      return 'text-mono-caption'
    case 'lg':
      return 'text-mono-small'
    case 'xl':
      return 'text-mono-prose'
    default:
      return 'text-mono-caption'
  }
})

const unitClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-micro'
    case 'md':
      return 'text-caption'
    case 'lg':
      return 'text-small'
    case 'xl':
      return 'text-prose'
    default:
      return 'text-caption'
  }
})
</script>

<template>
  <div
    :class="cn(
      'metric-badge cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      $props.class,
    )"
    :data-size="size"
  >
    <span
      class="font-semibold tabular-nums tracking-snug truncate transition-colors"
      :class="[amountClass, { 'text-muted-foreground/40': !amount }]"
      :style="amount ? { color } : undefined"
    >{{ amount || placeholder }}</span>
    <span
      v-if="unit"
      class="font-mono text-muted-foreground shrink-0"
      :class="unitClass"
    >{{ unit }}</span>
  </div>
</template>
