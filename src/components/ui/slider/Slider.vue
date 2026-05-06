<script setup lang="ts">
import { type HTMLAttributes, computed, inject, onBeforeUnmount } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@utils'
import { sliderVariants, type SliderVariants } from './index'
import {
  DOCK_KEEP_OPEN_SINK_KEY,
  type DockKeepOpenSink,
} from '../../custom/dock'

const props = defineProps<SliderRootProps & {
  class?: HTMLAttributes['class']
  /**
   * Visual recipe — class-name dispatch through `sliderVariants` CVA.
   *   `'standard'`    — glass track + circular thumb (default)
   *   `'spectrum'`    — tall track + bar thumb
   *   `'timeline'`    — glass scrub track
   *   `'glass-track'` — subtle/medium glass track + cartoon-accent thumb
   */
  variant?: NonNullable<SliderVariants['variant']>
  /**
   * When mounted inside a `<DockLayerGroup>`, hold the parent dock open
   * while the user is dragging the slider. Calls
   * `dockKeepOpenSink.acquire()` on pointerdown and `release(token)` on
   * pointerup / pointercancel. Default `false`.
   */
  keepDockOpen?: boolean
}>()
const emits = defineEmits<SliderRootEmits>()

const v = computed(() => props.variant ?? 'standard')

const delegatedProps = computed(() => {
  const { class: _, variant: __, keepDockOpen: ___, ...delegated } = props
  // Timeline variant: contain thumb within track bounds by default
  if (v.value === 'timeline' && !delegated.thumbAlignment) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// --- dock keep-open wiring ---
const dockSink = inject<DockKeepOpenSink | null>(DOCK_KEEP_OPEN_SINK_KEY, null)
let activeToken: symbol | null = null

function onPointerDown() {
  if (!props.keepDockOpen || !dockSink || activeToken !== null) return
  activeToken = dockSink.acquire()
}

function onPointerUp() {
  if (activeToken === null) return
  dockSink?.release(activeToken)
  activeToken = null
}

onBeforeUnmount(() => {
  // Drain any held token so the parent counter unwinds.
  if (activeToken !== null) {
    dockSink?.release(activeToken)
    activeToken = null
  }
})
</script>

<template>
  <SliderRoot
    :class="cn(sliderVariants({ variant: v }), props.class)"
    v-bind="forwarded"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
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
    background: var(--slider-track-bg, color-mix(in srgb, var(--muted) 50%, transparent));
}

.slider-range {
    position: absolute;
    height: 100%;
    background: var(--slider-range-bg, color-mix(in srgb, var(--foreground) 25%, transparent));
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
    background: var(--slider-track-bg, color-mix(in srgb, var(--foreground) 5%, transparent));
    backdrop-filter: var(--glass-blur-subtle);
    -webkit-backdrop-filter: var(--glass-blur-subtle);
}

.glass-slider--timeline .slider-range {
    background: var(--slider-range-bg, color-mix(in srgb, var(--foreground) 7%, transparent));
    border-radius: var(--radius-pill);
}

.glass-slider--timeline .slider-thumb {
    width: var(--slider-thumb-size, 1.5rem);
    height: var(--slider-thumb-size, 1.5rem);
    background: var(--slider-thumb-bg, color-mix(in srgb, var(--foreground) 15%, transparent));
    border: none;
    box-shadow: none;
}

/* ── Variant: glass-track ──
   Subtle glass-bg-subtle at rest (4px); lifts to medium (6px) on hover.
   Cartoon-shadow-accent on the thumb when actively dragged. */
.glass-slider--glass-track .slider-track {
    height: var(--slider-track-height, 0.25rem);
    background: var(--slider-track-bg, var(--glass-bg-subtle));
    transition:
        height var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard);
}

.glass-slider--glass-track:hover .slider-track {
    height: 0.375rem;
    background: var(--glass-bg-medium);
}

.glass-slider--glass-track .slider-range {
    background: var(--slider-range-bg, color-mix(in srgb, var(--foreground) 18%, transparent));
    border-radius: var(--radius-pill);
}

.glass-slider--glass-track .slider-thumb {
    width: var(--slider-thumb-size, 1rem);
    height: var(--slider-thumb-size, 1rem);
    background: var(--slider-thumb-bg, var(--background));
    border: var(--slider-thumb-border-width, 2px) solid
        var(--slider-thumb-border-color, var(--foreground));
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
    transition:
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.glass-slider--glass-track .slider-thumb:active,
.glass-slider--glass-track .slider-thumb[data-state="active"] {
    transform: scale(var(--scale-press));
    box-shadow: var(--shadow-cartoon-accent);
}
</style>
