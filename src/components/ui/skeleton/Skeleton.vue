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
      'rounded-input bg-muted',
      variant === 'pulse' && 'animate-pulse',
      variant === 'shimmer' && 'skeleton-shimmer',
      props.class,
    )"
  />
</template>

<style scoped>
/* Sliding gradient sweep. Compositor-friendly: animates `transform` on an
 * absolutely-positioned `::after` rather than `background-position` on the
 * host (transform composites to GPU; background-position runs on main
 * thread). K.WP P1-4: 18 simultaneous shimmer skeletons on /aurora pushed
 * TBT to 120ms vs 10ms baseline; transform-only keyframe eliminates that
 * main-thread cost. Honors reduced-motion. */
.skeleton-shimmer {
    position: relative;
    overflow: hidden;
}

.skeleton-shimmer::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        transparent 0%,
        color-mix(in srgb, var(--muted-foreground) 30%, transparent) 50%,
        transparent 100%
    );
    transform: translateX(-100%);
    animation: skeleton-shimmer-slide 1.5s linear infinite;
    will-change: transform;
}

@keyframes skeleton-shimmer-slide {
    to {
        transform: translateX(100%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer::after {
        animation: none;
    }
}
</style>
