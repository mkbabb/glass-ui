<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from "../../_shared/class-names";
import { coalesceMetric, type MetricValue } from "../../metric/coalesce-metric";

export type MetricBadgeSize = 'sm' | 'md' | 'lg' | 'xl'
export type MetricBadgeLabelPosition = 'inline' | 'stacked'

export interface MetricBadgeProps {
  /** The primary metric. A valid `0` renders `"0"`, never the placeholder. */
  value: MetricValue
  unit?: string
  /** Full annotation slot, rendered as a sibling `<span>` with classnames
   *  `metric-badge__label metric-badge__label--full`. Tracked uppercase,
   *  muted. */
  label?: string
  /** Compact form of `label`, rendered as a SIBLING `<span>` with
   *  classnames `metric-badge__label metric-badge__label--abbr`. When both
   *  `label` and `abbreviation` are set the library renders BOTH siblings;
   *  consumer container-query CSS toggles which is visible (default:
   *  `--full` shown, `--abbr` hidden — see utilities.css). The library
   *  itself never branches on viewport. R2-spec. */
  abbreviation?: string
  /** When set, renders the label slot in `inline` (single row, baseline-
   *  aligned) or `stacked` (column, items flex-start) mode. When unset,
   *  the label slot does not render even if `label`/`abbreviation` carry
   *  values. */
  labelPosition?: MetricBadgeLabelPosition
  /** Color applied to the value when it's non-empty. */
  color?: string
  /** Substitute glyph when value is empty (null / undefined / ""). */
  placeholder?: string
  /** Typographic scale. Defaults to `md`. The ladder reads
   *  sm 11px / md 12px / lg 14px / xl 18px; `xl` is the audacious-poster
   *  rung (`text-mono-prose` value, `text-prose` unit) for hero
   *  placements that need to read at chassis distance. */
  size?: MetricBadgeSize
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<MetricBadgeProps>(), {
  size: 'md',
})

// AZ.W-METRIC-UNIFY — route through the ONE shared value core. `isEmpty` is
// the correct empty signal (null / undefined / ""); a valid `0` is NOT empty,
// so it renders "0", un-muted, with its colour — killing the prior truthy-
// coalesce (`amount || placeholder` + `!amount`) zero-value bug.
const metric = computed(() => coalesceMetric(props.value, props.placeholder))

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
      // BG.W-DESHADCN — off the shadcn `outline-ring` (the deleted `--color-ring`
      // theme bridge) onto the renamed house `--focus-ring-color` token.
      'focus-visible:outline-2 focus-visible:outline-(color:--focus-ring-color) focus-visible:outline-offset-2',
      labelPosition && `metric-badge--label-${labelPosition}`,
      $props.class,
    )"
    :data-size="size"
  >
    <template v-if="showLabel">
      <span
        v-if="label"
        class="metric-badge__label metric-badge__label--full font-mono uppercase text-muted-foreground/80 shrink-0"
        :class="labelClass"
      >{{ label }}</span>
      <span
        v-if="abbreviation"
        class="metric-badge__label metric-badge__label--abbr font-mono uppercase text-muted-foreground/80 shrink-0"
        :class="labelClass"
      >{{ abbreviation }}</span>
    </template>
    <!-- T.W2.T2 — when stacked, amount + unit share row 2 baseline-aligned via
         `.metric-badge__row`; the column flow then lays exactly two rows
         (label / value+unit). Inline mode keeps the flat sibling order so the
         single-row baseline reads unbroken. -->
    <template v-if="labelPosition === 'stacked'">
      <span class="metric-badge__row">
        <span
          class="metric-badge__amount font-semibold tabular-nums tracking-snug truncate transition-colors"
          :class="[amountClass, { 'text-muted-foreground/40': metric.isEmpty }]"
          :style="metric.isEmpty ? undefined : { color }"
        >{{ metric.display }}</span>
        <span
          v-if="unit"
          class="metric-badge__unit font-mono text-muted-foreground shrink-0"
          :class="unitClass"
        >{{ unit }}</span>
      </span>
    </template>
    <template v-else>
      <span
        class="metric-badge__amount font-semibold tabular-nums tracking-snug truncate transition-colors"
        :class="[amountClass, { 'text-muted-foreground/40': metric.isEmpty }]"
        :style="metric.isEmpty ? undefined : { color }"
      >{{ metric.display }}</span>
      <span
        v-if="unit"
        class="metric-badge__unit font-mono text-muted-foreground shrink-0"
        :class="unitClass"
      >{{ unit }}</span>
    </template>
  </div>
</template>

<style scoped>
/* The label weight routes through `--metric-badge-label-weight` so a
   consumer can retint it without a `:deep()` reach — the same token-only
   override pattern the rest of the metric family follows. Default is a fine
   weight (300) — the annotation sits quieter than the value it
   qualifies; consumers wanting the prior medium register set the token
   to 500. */
.metric-badge__label {
    font-weight: var(--metric-badge-label-weight, 300);
}
</style>
