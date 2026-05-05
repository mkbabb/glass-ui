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
    /** Typographic scale. Defaults to `md`; `lg` lifts the badge to the
     *  audacious typography rung (`text-mono-small` amount, `text-small`
     *  unit) for hero placements. `xl` jumps to the display-1 tier
     *  (`var(--type-display-1)`) for hero metric tiles. */
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
    case 'lg':
      return 'text-mono-small'
    case 'xl':
      return 'metric-badge-amount-xl'
    default:
      return 'text-mono-micro'
  }
})

const unitClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-micro'
    case 'lg':
      return 'text-small'
    case 'xl':
      return 'text-small'
    default:
      return 'text-micro'
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

<style scoped>
.metric-badge[data-size="xl"] {
  min-height: 4rem;
  padding-block: var(--space-phi-2);
  padding-inline: var(--space-phi-3);
}

.metric-badge-amount-xl {
  font-size: var(--type-display-1);
  line-height: var(--leading-display);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--tracking-tightest);
}
</style>
