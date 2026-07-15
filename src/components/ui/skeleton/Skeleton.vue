<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../_shared/class-names'

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

// BA.W-SURFACE-AXIS — Skeleton's over-glass register (IG-C2). Skeleton is on the
// glass-cohesion allowlist as SANCTIONED-OPAQUE, so its DEFAULT stays the opaque
// `bg-muted` block (back-compat — byte-identical to today). `surface="glass"` is
// the NEW opt-in: in a glass-first system the common case is a skeleton loading
// INSIDE a glass card over a rich substrate, where an opaque block punches a flat
// hole in the frosted plate. The `glass` rung swaps the base to a translucent
// `--skeleton-glass-bg` (a `color-mix(--muted N%, transparent)`) so the plate reads
// through; the shimmer/breath sweeps (which composite correctly) ride on top
// unchanged. `surface` is the {glass·opaque} subset Skeleton supports (veil is a
// text-plate register, not a loading-block one).
type SkeletonSurface = 'glass' | 'opaque'

const props = withDefaults(
  defineProps<{
    variant?: SkeletonVariant
    surface?: SkeletonSurface
    class?: HTMLAttributes['class']
  }>(),
  { variant: 'pulse', surface: 'opaque' },
)
</script>

<template>
  <div data-slot="skeleton"
    :data-surface="surface"
    :class="cn(
      'rounded-input',
      // The opaque default keeps the sanctioned `bg-muted` block (byte-identical);
      // the `glass` rung swaps to the translucent over-glass base (scoped CSS).
      surface === 'opaque' && 'bg-muted',
      surface === 'glass' && 'skeleton-over-glass',
      variant === 'pulse' && 'animate-pulse',
      variant === 'shimmer' && 'skeleton-shimmer',
      variant === 'breath' && 'skeleton-breath',
      props.class,
    )"
  />
</template>

<style scoped>
/* BA.W-SURFACE-AXIS — the over-glass register (IG-C2). The translucent base block
   that lets a frosted glass plate read THROUGH the loading skeleton (the opaque
   `bg-muted` default punches a flat hole in the plate over a rich substrate). The
   `--skeleton-glass-bg` token makes the translucency strength tunable; the default
   is the muted register at ~55% opacity (a `color-mix(--muted N%, transparent)`)
   so the glass plate reads through while the block still reads as an absence. The
   shimmer/breath sweeps composite over this translucent base unchanged. */
.skeleton-over-glass {
    background: var(
        --skeleton-glass-bg,
        color-mix(in oklab, var(--muted) 55%, transparent)
    );
}

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
