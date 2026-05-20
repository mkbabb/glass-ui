<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'

/**
 * Skeleton variants — three distinct temporal registers.
 *
 * • `pulse` (default) — the existing 2s Tailwind `animate-pulse`.
 *   Short-wait register: "a small wait, the screen acknowledges".
 *   Compositor-friendly opacity ramp.
 *
 * • `shimmer` — a 1.5s linear translate sweep of a translucent gradient
 *   across the surface. Use when the absence reads as
 *   "data is loading, watch the bar travel".
 *
 * • `breath` (AI.W4-M.3) — a 6s opacity-only breath synced to the
 *   `--animate-ambient-pulse-duration` canon. Use when the wait is
 *   KNOWN-IMMINENT (a few seconds; chart/series substitution). The
 *   slower register reads as "the surface is alive and resolving",
 *   not as "the screen is stuck".
 *
 * The three coexist; consumers pick the register that matches the
 * expected wait shape. PRM retires the breath cycle to the trough
 * (opacity-min) — the surface still reads but no longer cycles.
 */
type SkeletonVariant = 'pulse' | 'shimmer' | 'breath'

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
      variant === 'breath' && 'skeleton-breath',
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

/* AI.W4-M.3 — breath variant. Opacity-only cycle synced to the
 * canon ambient rate (`--animate-ambient-pulse-duration`, 6s
 * default). The cycle moves between `--pulse-aura-opacity-min`
 * (0.55 default — keep the surface read at the trough) and
 * `--pulse-aura-opacity-max` (0.95) so the breath reads as a soft
 * swell rather than a fade-out. Consumes the same canon tokens as
 * `<Pulse variant="aura">` so a skeleton breath beside a Pulse aura
 * cycles in lockstep at the 6s period. Compositor-friendly:
 * opacity-only, no transform / background work. */
.skeleton-breath {
    animation: skeleton-breath-cycle
        var(--skeleton-breath-duration, var(--animate-ambient-pulse-duration, 6s))
        var(--animate-ambient-pulse-easing, var(--motion-ease-apple, ease))
        infinite;
    will-change: opacity;
}

@keyframes skeleton-breath-cycle {
    0%, 100% { opacity: var(--pulse-aura-opacity-min, 0.55); }
    50%      { opacity: var(--pulse-aura-opacity-max, 0.95); }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer::after {
        animation: none;
    }
    .skeleton-breath {
        animation: none;
        opacity: var(--pulse-aura-opacity-min, 0.55);
    }
}
</style>
