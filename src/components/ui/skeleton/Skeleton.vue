<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'

type SkeletonVariant = 'pulse' | 'shimmer'

const props = withDefaults(
  defineProps<{
    variant?: SkeletonVariant
    class?: HTMLAttributes['class']
  }>(),
  { variant: 'pulse' },
)
</script>

<template>
  <div
    :class="cn(
      'rounded-md bg-muted',
      variant === 'pulse' && 'animate-pulse',
      variant === 'shimmer' && 'skeleton-shimmer',
      props.class,
    )"
  />
</template>

<style scoped>
/* Sliding gradient sweep. Composes shimmer-sweep keyframe from
 * src/styles/animations.css (same -200% → 200% background-position
 * direction). Honors reduced-motion. */
.skeleton-shimmer {
    background: linear-gradient(
        90deg,
        var(--muted) 25%,
        color-mix(in srgb, var(--muted-foreground) 30%, transparent) 50%,
        var(--muted) 75%
    );
    background-size: 200% 100%;
    animation: shimmer-sweep 1.5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer {
        animation: none;
    }
}
</style>
