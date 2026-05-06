<script setup lang="ts">
import { type HTMLAttributes, type ComputedRef, computed, inject, onBeforeUnmount } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@utils'
import { sliderVariants, type SliderVariants } from './index'

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class']
  /** Substrate recipe — see `sliderVariants` for axis docs. */
  variant?: SliderVariants['variant']
  /** Track + thumb geometry — sm | md (default) | lg. */
  size?: SliderVariants['size']
  /**
   * Acquire a `dockKeepOpen` token while the user drags the slider, so
   * an enclosing dock doesn't auto-collapse mid-gesture. The slider also
   * subscribes to the dock's `dockHeld` flag and reflects it via
   * `data-held` on its root, intensifying the thumb halo. Default: true.
   */
  keepDockOpen?: boolean
}>()
const emits = defineEmits<SliderRootEmits>()

const v = computed<NonNullable<SliderVariants['variant']>>(() => props.variant ?? 'standard')
const s = computed<NonNullable<SliderVariants['size']>>(() => props.size ?? 'md')
const keepDockOpen = computed(() => props.keepDockOpen ?? true)

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, keepDockOpen: ____, ...delegated } = props
  // Timeline + glass-pill carry the thumb inside the track; reka-ui's
  // `contain` alignment matches the visual intent (no overshoot).
  if ((v.value === 'timeline' || v.value === 'glass-pill') && !delegated.thumbAlignment) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

/* J.W5.C — dock-keep-open wiring. The slider subscribes to the dock's
   reactive `dockHeld` flag (provided by `useDockState` alongside the
   existing `dockKeepOpen`/`dockRelease` callable pair) and reflects it
   on the root via `data-held` for the thumb-halo intensification recipe
   in scoped CSS. We also acquire/release a token of our own around the
   drag gesture so the surrounding dock observes us as held — that
   crossover is what proves the API surface beyond a single consumer. */
const dockKeep = inject<(() => void) | null>('dockKeepOpen', null)
const dockRelease = inject<(() => void) | null>('dockRelease', null)
const dockHeld = inject<ComputedRef<boolean> | null>('dockHeld', null)

let acquired = false
function acquire() {
  if (!keepDockOpen.value || acquired) return
  dockKeep?.()
  acquired = true
}
function release() {
  if (!acquired) return
  dockRelease?.()
  acquired = false
}

function onPointerDown() {
  acquire()
  // The pointerup fires on `window` because reka-ui sets pointer-capture
  // on the thumb during drag — listen at window scope to catch the
  // release wherever it lands.
  if (typeof window === 'undefined') return
  const onUp = () => {
    release()
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
  }
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

onBeforeUnmount(release)

const isHeld = computed(() => dockHeld?.value === true)
</script>

<template>
  <SliderRoot
    :class="cn(sliderVariants({ variant: v, size: s }), props.class)"
    :data-variant="v"
    :data-size="s"
    :data-held="isHeld || undefined"
    v-bind="forwarded"
    @pointerdown="onPointerDown"
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
/* ── Shared geometry — size axis lifts via CSS vars set by sliderVariants ── */
.slider-track {
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    border-radius: var(--radius-pill);
    height: var(--slider-track-height, 0.375rem);
    background: var(--slider-track-bg, var(--muted-medium));
    transition:
        background var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
}

.slider-range {
    position: absolute;
    height: 100%;
    background: var(--slider-range-bg, var(--surface-tint-25));
    transition: background var(--duration-fast) var(--ease-standard);
}

.slider-thumb {
    display: block;
    width: var(--slider-thumb-size, 1rem);
    height: var(--slider-thumb-size, 1rem);
    border-radius: var(--radius-pill);
    border: var(--slider-thumb-border-width, 2px) solid
        var(--slider-thumb-border-color, var(--background));
    background: var(--slider-thumb-bg, var(--foreground));
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
    transition:
        background var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard);
}

.glass-slider:active .slider-thumb {
    transform: scale(var(--scale-press-btn));
}

.glass-slider[data-disabled] .slider-thumb {
    pointer-events: none;
    opacity: var(--opacity-disabled);
}

/* ── Variant: spectrum (tall bg track, thin bar thumb) ── */
.glass-slider[data-variant="spectrum"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--slider-track-bg, var(--secondary));
}

.glass-slider[data-variant="spectrum"] .slider-range {
    background: transparent;
}

.glass-slider[data-variant="spectrum"] .slider-thumb {
    width: calc(var(--slider-thumb-size, 1rem) * 0.75);
    height: 100%;
    border-color: var(--slider-thumb-border-color, color-mix(in srgb, var(--foreground) 40%, transparent));
    background: transparent;
    box-shadow: none;
}

/* ── Variant: timeline (glass-wash scrub track, disc thumb) ── */
.glass-slider[data-variant="timeline"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--slider-track-bg, var(--surface-tint-6));
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
}

.glass-slider[data-variant="timeline"] .slider-range {
    background: var(--slider-range-bg, var(--surface-tint-8));
    border-radius: var(--radius-pill);
}

.glass-slider[data-variant="timeline"] .slider-thumb {
    background: var(--slider-thumb-bg, var(--surface-tint-15));
    border: none;
    box-shadow: none;
}

/* ── Variant: glass-pill (pill substrate w/ halo thumb) ── */
.glass-slider[data-variant="glass-pill"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 0.875);
    background: var(--surface-tint-6);
    backdrop-filter: var(--glass-blur-wash);
    -webkit-backdrop-filter: var(--glass-blur-wash);
    border: 1px solid var(--surface-tint-8);
}

.glass-slider[data-variant="glass-pill"] .slider-range {
    background: linear-gradient(
        to right,
        var(--surface-tint-15),
        var(--surface-tint-25)
    );
    border-radius: var(--radius-pill);
}

.glass-slider[data-variant="glass-pill"] .slider-thumb {
    background: var(--background);
    border: 1.5px solid var(--surface-tint-22);
    box-shadow: var(--shadow-md);
}

.glass-slider[data-variant="glass-pill"]:hover .slider-thumb,
.glass-slider[data-variant="glass-pill"] .slider-thumb:focus-visible {
    box-shadow:
        0 0 0 6px var(--surface-tint-12),
        var(--shadow-md);
}

/* J.W5.C — held-state halo: when a dock-keep-open token is held by THIS
   slider's drag (or any sibling drag the dock observes), we lift the
   thumb halo to a denser tint rung. The substrate response in dock.css
   intensifies in parallel. */
.glass-slider[data-held] .slider-thumb {
    box-shadow:
        0 0 0 8px var(--surface-tint-15),
        var(--shadow-md);
}

.glass-slider[data-variant="glass-pill"][data-held] .slider-thumb {
    box-shadow:
        0 0 0 10px var(--surface-tint-18),
        var(--shadow-md);
}

/* ── Variant: glass-cartoon (cartoon-bordered thumb + 2px-bordered track) ── */
.glass-slider[data-variant="glass-cartoon"] .slider-track {
    background: var(--card);
    border: 2px solid var(--border);
}

.glass-slider[data-variant="glass-cartoon"] .slider-range {
    background: var(--surface-tint-25);
}

.glass-slider[data-variant="glass-cartoon"] .slider-thumb {
    background: var(--background);
    border: 2px solid var(--border);
    box-shadow: var(--shadow-cartoon-sm);
}

.glass-slider[data-variant="glass-cartoon"]:hover .slider-thumb,
.glass-slider[data-variant="glass-cartoon"] .slider-thumb:focus-visible {
    box-shadow: var(--shadow-cartoon-md);
}

.glass-slider[data-variant="glass-cartoon"]:active .slider-thumb {
    box-shadow: var(--shadow-cartoon-accent, var(--shadow-cartoon-sm));
}
</style>
