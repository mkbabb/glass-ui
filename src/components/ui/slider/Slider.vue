<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class']
  /** 'standard' = glass track + circular thumb; 'spectrum' = tall track + bar thumb; 'timeline' = glass scrub track */
  variant?: 'standard' | 'spectrum' | 'timeline'
}>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props
  // Timeline variant: contain thumb within track bounds by default
  if (v.value === 'timeline' && !delegated.thumbAlignment) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const v = computed(() => props.variant ?? 'standard')
</script>

<template>
  <SliderRoot
    :class="cn(
      'relative flex w-full touch-none select-none items-center',
      props.class,
    )"
    v-bind="forwarded"
  >
    <SliderTrack
      :class="cn(
        'slider-track relative w-full grow overflow-hidden rounded-full',
        v === 'spectrum' ? 'h-6 bg-secondary'
          : v === 'timeline' ? 'h-6 bg-foreground/5 [backdrop-filter:var(--glass-blur-subtle)]'
          : 'h-1.5 bg-muted/50',
      )"
    >
      <SliderRange
        :class="cn(
          'absolute h-full',
          v === 'spectrum' ? 'bg-transparent'
            : v === 'timeline' ? 'bg-foreground/7 rounded-full'
            : 'bg-foreground/25',
        )"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      :class="cn(
        'slider-thumb block transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        v === 'spectrum'
          ? 'w-3 h-full rounded-full border-2 border-foreground/40 bg-transparent'
          : v === 'timeline'
            ? 'h-6 w-6 rounded-full bg-foreground/15 border-none shadow-none'
            : 'h-3.5 w-3.5 rounded-full border-2 border-background bg-foreground shadow-sm',
      )"
    />
  </SliderRoot>
</template>
