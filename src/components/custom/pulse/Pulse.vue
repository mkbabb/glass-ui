<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../utils'

/**
 * Pulse — three variants:
 *  - `dots`  : three-glyph loading indicator (default)
 *  - `ring`  : single ring spinner
 *  - `aura`  : ambient surface-scope halo (AB.W3.T1). Paints an
 *              absolutely-positioned radial gradient that breathes
 *              (scale + opacity) inside the parent surface. The host
 *              element MUST be `position: relative` and own a
 *              `border-radius` — the aura inherits both. The host
 *              also controls colour via `--pulse-aura-color`
 *              (default `currentColor`).
 *
 * `aura` is the AB.W3 Living-UI primitive: consumers compose it on
 * an existing surface (a button, a hero pill, a result-row value
 * span, a timeline marker) without hand-rolling pulse keyframes.
 * The shipped tokens (--animate-ambient-pulse-*) parameterise the
 * cycle so consumers do not redefine the breathing rhythm per site.
 *
 * Reduced motion: the `breath` keyframe collapses to a static halo
 * at media-query level (animations.css). The depth/colour stays
 * visible; only the scale + opacity cycle disables.
 */
type PulseVariant = 'dots' | 'ring' | 'aura'
type PulseSpeed = 'slow' | 'normal' | 'fast'
type PulseIntensity = 'subtle' | 'normal' | 'vivid'

const props = withDefaults(
  defineProps<{
    variant?: PulseVariant
    count?: number
    speed?: PulseSpeed
    /**
     * Aura-only — amplitude of the breathing cycle. `subtle` reads
     * as a quiet halo, `vivid` reads as a celebratory pulse. Default
     * `normal`.
     */
    intensity?: PulseIntensity
    /**
     * Aura-only — one-shot mode. When `true`, the aura plays a
     * single breath then collapses. Used for the completion pulse
     * (no permanent celebratory throbbing per the W3 contract).
     */
    once?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'dots',
    count: 3,
    speed: 'normal',
    intensity: 'normal',
    once: false,
  },
)

const dots = computed(() => Array.from({ length: props.count }, (_, i) => i))

const durationVar = computed(() => ({
  slow: 'var(--duration-slow, 0.45s)',
  normal: 'var(--duration-panel, 0.55s)',
  fast: 'var(--duration-fast, 0.2s)',
}[props.speed]))

// Intensity maps to the scale max stop. Subtle reads a 1.06× breath;
// normal rides the canonical 1.15× token; vivid pushes to 1.22×.
const auraScaleMax = computed(() => ({
  subtle: '1.06',
  normal: 'var(--animate-ambient-pulse-scale-max, 1.15)',
  vivid: '1.22',
}[props.intensity]))
</script>

<template>
  <div
    v-if="variant === 'aura'"
    :class="cn(
      'pulse-aura',
      once && 'pulse-aura--once',
      props.class,
    )"
    :style="{
      '--pulse-aura-scale-max': auraScaleMax,
    }"
    aria-hidden="true"
  />
  <div
    v-else
    :class="cn(
      'inline-flex items-center',
      variant === 'dots' && 'gap-1',
      props.class,
    )"
    :style="{ '--pulse-duration': durationVar }"
  >
    <template v-if="variant === 'dots'">
      <span
        v-for="i in dots"
        :key="i"
        class="pulse-dot"
        :style="{ '--pulse-index': i }"
      />
    </template>
    <template v-else-if="variant === 'ring'">
      <span class="pulse-ring" />
    </template>
  </div>
</template>

<style scoped>
/* Keyframes pulse-dot-bounce + pulse-ring-spin + ambient-pulse live in
 * src/styles/animations.css */
.pulse-dot {
    display: inline-block;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 9999px;
    background: currentColor;
    opacity: 0.35;
    animation: pulse-dot-bounce calc(var(--pulse-duration) * 2) ease-in-out infinite;
    animation-delay: calc(var(--pulse-index, 0) * (var(--pulse-duration) * 0.3));
}

.pulse-ring {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    animation: pulse-ring-spin var(--pulse-duration) linear infinite;
}

/*
 * Aura variant — ambient surface-scope halo.
 *
 * The element is absolutely positioned over its host surface; the host
 * must be `position: relative` (every glass-ui surface already is) and
 * own a border-radius (inherited by the aura). The radial gradient
 * paints a centred halo in --pulse-aura-color; the breath cycle
 * animates scale + opacity off the shipped --animate-ambient-pulse-*
 * tokens.
 *
 * `pointer-events: none` keeps the host's hit region intact. The aura
 * sits behind the host's content via `z-index: 0` (the host's content
 * stays at the natural ≥1 stacking order); set --pulse-aura-z to lift
 * if needed.
 */
.pulse-aura {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: var(--pulse-aura-z, 0);
    background: radial-gradient(
        ellipse at 50% 50%,
        color-mix(in srgb, var(--pulse-aura-color, currentColor) var(--pulse-aura-opacity-pct, 55%), transparent) 0%,
        color-mix(in srgb, var(--pulse-aura-color, currentColor) calc(var(--pulse-aura-opacity-pct-num, 55) * 0.35 * 1%), transparent) 45%,
        transparent 75%
    );
    opacity: var(--pulse-aura-opacity-min, 0.55);
    transform: scale(var(--animate-ambient-pulse-scale-min, 1));
    animation: ambient-pulse
        var(--animate-ambient-pulse-duration, 6s)
        var(--animate-ambient-pulse-easing, ease-in-out)
        infinite;
    will-change: transform, opacity;
}

.pulse-aura--once {
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@media (prefers-reduced-motion: reduce) {
    .pulse-dot,
    .pulse-ring { animation: none; opacity: 0.6; }

    /*
     * W3 contract: depth/colour stays visible; the breath cycle
     * disables. The static halo reads at the canonical mid-cycle
     * scale + opacity so the visual identity persists.
     */
    .pulse-aura {
        animation: none;
        transform: scale(1);
        opacity: var(--pulse-aura-opacity-min, 0.55);
    }
}
</style>
