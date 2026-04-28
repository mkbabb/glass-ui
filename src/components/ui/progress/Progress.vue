<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui'
import { cn } from '../../../utils'

type ProgressVariant = 'default' | 'gradient'

const props = withDefaults(
  defineProps<
    ProgressRootProps & {
      class?: HTMLAttributes['class']
      /**
       * 'default' = bg-secondary rail + bg-primary indicator (back-compat).
       * 'gradient' = rail respects --progress-track CSS variable; indicator
       *              respects --progress-fill. Consumers set the variables
       *              inline (`:style="{ '--progress-fill': linearGradient }"`)
       *              for first-class gradient progress without :deep() hacks.
       */
      variant?: ProgressVariant
    }
  >(),
  {
    modelValue: 0,
    variant: 'default',
  },
)

const delegatedProps = computed(() => {
  const { class: _, variant: _v, ...delegated } = props

  return delegated
})

const rootClass = computed(() =>
  props.variant === 'gradient'
    ? // Rail bg comes from --progress-track (with bg-secondary fallback) so
      // consumers can paint phase-specific track colors without :deep().
      'relative h-4 w-full overflow-hidden rounded-full bg-[var(--progress-track,theme(colors.secondary.DEFAULT))]'
    : 'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
)

const indicatorClass = computed(() =>
  props.variant === 'gradient'
    ? // Indicator background resolves from --progress-fill (with bg-primary
      // fallback). Consumers pass arbitrary CSS values (linear-gradient(...),
      // hex, color-mix, etc.).
      'h-full w-full flex-1 bg-[var(--progress-fill,theme(colors.primary.DEFAULT))] transition-all'
    : 'h-full w-full flex-1 bg-primary transition-all',
)
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="cn(rootClass, props.class)"
  >
    <ProgressIndicator
      :class="indicatorClass"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
