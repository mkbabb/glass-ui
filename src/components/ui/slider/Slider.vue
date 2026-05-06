<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@utils'

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class']
  /** 'standard' = glass track + circular thumb; 'spectrum' = tall track + bar thumb; 'timeline' = glass scrub track */
  variant?: 'standard' | 'spectrum' | 'timeline'
}>()
const emits = defineEmits<SliderRootEmits>()

const v = computed(() => props.variant ?? 'standard')

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props
  // Timeline variant: contain thumb within track bounds by default
  if (v.value === 'timeline' && !delegated.thumbAlignment) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    :class="cn(
      'glass-slider',
      `glass-slider--${v}`,
      'relative flex w-full touch-none select-none items-center',
      props.class,
    )"
    v-bind="forwarded"
  >
    <SliderTrack class="slider-track">
      <SliderRange class="slider-range" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      :aria-label="$attrs['aria-label'] as string ?? undefined"
      class="slider-thumb"
    />
  </SliderRoot>
</template>

<style scoped>
/* ── Shared geometry ── */
.slider-track {
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    border-radius: var(--radius-pill);
    height: var(--slider-track-height, 0.375rem);
    background: var(--slider-track-bg, var(--muted-medium));
}

.slider-range {
    position: absolute;
    height: 100%;
    background: var(--slider-range-bg, var(--surface-tint-25));
}

.slider-thumb {
    display: block;
    width: var(--slider-thumb-size, 0.875rem);
    height: var(--slider-thumb-size, 0.875rem);
    border-radius: var(--radius-pill);
    border: var(--slider-thumb-border-width, 2px) solid
        var(--slider-thumb-border-color, var(--background));
    background: var(--slider-thumb-bg, var(--foreground));
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
    transition: color var(--duration-fast) var(--ease-standard);
}

.slider-thumb:focus-visible {
    outline: none;
}

.glass-slider[data-disabled] .slider-thumb {
    pointer-events: none;
    opacity: 0.5;
}

/* ── Variant: spectrum (tall bg track, thin bar thumb) ── */
.glass-slider--spectrum .slider-track {
    height: var(--slider-track-height, 1.5rem);
    background: var(--slider-track-bg, var(--secondary));
}

.glass-slider--spectrum .slider-range {
    background: transparent;
}

.glass-slider--spectrum .slider-thumb {
    width: var(--slider-thumb-size, 0.75rem);
    height: 100%;
    border-color: var(--slider-thumb-border-color, color-mix(in srgb, var(--foreground) 40%, transparent));
    background: transparent;
    box-shadow: none;
}

/* ── Variant: timeline (glass scrub track, disc thumb) ── */
.glass-slider--timeline .slider-track {
    height: var(--slider-track-height, 1.5rem);
    background: var(--slider-track-bg, var(--surface-tint-6));
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
}

.glass-slider--timeline .slider-range {
    background: var(--slider-range-bg, var(--surface-tint-8));
    border-radius: var(--radius-pill);
}

.glass-slider--timeline .slider-thumb {
    width: var(--slider-thumb-size, 1.5rem);
    height: var(--slider-thumb-size, 1.5rem);
    background: var(--slider-thumb-bg, var(--surface-tint-15));
    border: none;
    box-shadow: none;
}
</style>
