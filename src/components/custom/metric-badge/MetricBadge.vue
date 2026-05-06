<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../utils'

type MetricBadgeSize = 'sm' | 'md' | 'lg' | 'xl'
type MetricBadgeLabelPosition = 'inline' | 'stacked'

const props = withDefaults(
  defineProps<{
    amount: string | number | null | undefined
    unit?: string
    /** Annotation slot rendered before the amount. Tracked uppercase, muted.
     *  When `abbreviation` is also set, consumers typically branch on
     *  viewport and pass exactly one of the two; the template renders
     *  `abbreviation ?? label`. */
    label?: string
    /** Compact form of `label` for tight viewports. Same render slot;
     *  abbreviation wins when both are set. The library does NOT branch on
     *  viewport — that is consumer logic. */
    abbreviation?: string
    /** When set, renders the label slot in `inline` (single row, baseline-
     *  aligned) or `stacked` (column, items flex-start) mode. When unset,
     *  the label slot does not render even if `label`/`abbreviation` carry
     *  values. */
    labelPosition?: MetricBadgeLabelPosition
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

/** Label slot reads one tier below the amount: the schedule annotation sits
 *  quieter than the value it qualifies. `sm` falls off the bottom of the
 *  ladder, so it shares `text-mono-micro` with the amount. */
const labelClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-mono-micro'
    case 'md':
      return 'text-mono-micro'
    case 'lg':
      return 'text-mono-caption'
    case 'xl':
      return 'text-mono-small'
    default:
      return 'text-mono-micro'
  }
})

const showLabel = computed(() =>
  Boolean(props.labelPosition && (props.abbreviation || props.label)),
)
</script>

<template>
  <div
    :class="cn(
      'metric-badge cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2',
      labelPosition && `metric-badge--label-${labelPosition}`,
      $props.class,
    )"
    :data-size="size"
  >
    <span
      v-if="showLabel"
      class="metric-badge__label font-mono uppercase font-medium text-muted-foreground/80 shrink-0"
      :class="labelClass"
    >{{ abbreviation ?? label }}</span>
    <span
      class="metric-badge__amount font-semibold tabular-nums tracking-snug truncate transition-colors"
      :class="[amountClass, { 'text-muted-foreground/40': !amount }]"
      :style="amount ? { color } : undefined"
    >{{ amount || placeholder }}</span>
    <span
      v-if="unit"
      class="metric-badge__unit font-mono text-muted-foreground shrink-0"
      :class="unitClass"
    >{{ unit }}</span>
  </div>
</template>
