<script setup lang="ts">
import { type HTMLAttributes, computed, onBeforeUnmount, useTemplateRef, watch } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
import { useTouchGate } from '../../../composables/dom/useTouchGate'
import { useOptionalDockContext } from '../../custom/dock/composables/dockContext'
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
  // Timeline + glass-pill + glass-scrubber carry the thumb inside the track;
  // reka-ui's `contain` alignment matches the visual intent (no overshoot).
  if (
    (v.value === 'timeline' || v.value === 'glass-pill' || v.value === 'glass-scrubber')
    && !delegated.thumbAlignment
  ) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

/* J.W5.C — dock-keep-open wiring. The slider subscribes to the dock's
   reactive `held` flag (surfaced on the canonical typed `DockContext`
   alongside the `keepOpen`/`release` callable pair) and reflects it on
   the root via `data-held` for the thumb-halo intensification recipe in
   scoped CSS. We also acquire/release a token of our own around the
   drag gesture so the surrounding dock observes us as held — that
   crossover is what proves the API surface beyond a single consumer.
   O.W2 Lane B — migrated from 3 raw string-key injects to a single
   `useOptionalDockContext()` call (befitting silent default: Slider may
   render outside a `<GlassDock>`, in which case `dock` is null and all
   `dock?.` calls are no-ops). */
const dock = useOptionalDockContext()

let acquired = false
function acquire() {
  if (!keepDockOpen.value || acquired) return
  dock?.keepOpen()
  acquired = true
}
function release() {
  if (!acquired) return
  dock?.release()
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

/* N.W0 Lane A1 — useTouchGate wire. Mirrors the canonical consumer
   pattern at `src/components/custom/dock/GlassDock.vue:85` (instantiate
   the gate, wire `touchstart`/`touchmove`/`touchend` on the root, and
   reflect `isActive` as a data attribute). On touch devices the first
   tap activates the slider; off-control taps deactivate via the shared
   global listener. Desktop pointers are unaffected — the gate is a
   no-op when `isTouchDevice` is false. While the touch gate is active
   we also acquire the existing `dockKeepOpen` token so an enclosing
   dock observes the gesture and won't auto-collapse mid-touch. */
const sliderRootRef = useTemplateRef<{ $el: HTMLElement } | HTMLElement | null>('sliderRootRef')
const touchGate = useTouchGate()

function getRootEl(): HTMLElement | null {
  const ref = sliderRootRef.value
  if (!ref) return null
  if (ref instanceof HTMLElement) return ref
  return (ref.$el as HTMLElement | undefined) ?? null
}

function onTouchStart(event: TouchEvent): void {
  const root = getRootEl()
  const touch = event.touches[0]
  if (!root || !touch) return

  if (!touchGate.handleTouchStart(root, touch.clientY)) {
    // Gate is pending activation — swallow this initial tap so the
    // SliderRoot doesn't treat it as a drag while the gate decides
    // (matches the canonical GlassDock pattern).
    event.preventDefault()
    event.stopPropagation()
  }
}

function onTouchMove(event: TouchEvent): void {
  touchGate.handleScrollCheck(event)
}

function onTouchEnd(): void {
  touchGate.handleTouchEnd()
}

/* When the gate flips active, mirror the existing pointerdown acquire
   path so the dock sees the touch gesture as held. When it flips
   inactive (timer, off-control tap), release the token. */
watch(touchGate.isActive, (isActive) => {
  if (isActive) {
    acquire()
  } else {
    release()
  }
})

onBeforeUnmount(release)

const isHeld = computed(() => dock?.held.value === true)
const isTouchActive = computed(() => touchGate.isActive.value)
</script>

<template>
  <SliderRoot
    ref="sliderRootRef"
    :class="cn(sliderVariants({ variant: v, size: s }), props.class)"
    :data-variant="v"
    :data-size="s"
    :data-held="isHeld || undefined"
    :data-touch-active="isTouchActive || undefined"
    v-bind="forwarded"
    @pointerdown="onPointerDown"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
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
        /* The thumb morph shares the dock's control register so an in-dock
           slider breathes on the same iOS spring as the dock collapse. */
        transform var(--duration-fast) var(--slider-thumb-spring, var(--spring-snappy));
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
    border-color: var(--slider-thumb-border-color, var(--surface-tint-40));
    background: transparent;
    box-shadow: none;
}

/* ── Variant: timeline (glass-wash scrub track, disc thumb) ── */
.glass-slider[data-variant="timeline"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--slider-track-bg, var(--surface-tint-6));
    backdrop-filter: var(--glass-blur-quiet);
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
    backdrop-filter: var(--glass-blur-quiet);
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

/* ── Variant: glass-scrubber (P.W3 Lane A; canonicalizes the fourier-analysis
   3-site shadow recipe — GlassTimeline / SliderControl / ConvergenceTimeline,
   562 LOC / 82% overlap). Tall scrub track + grab-friendly thin-bar thumb
   that materializes on hover/focus + scrub-active state. All paints compose
   substrate tokens (--surface-tint-N + --ring); consumers retint per site
   via the --slider-scrub-* token block in tokens.css. ── */
.glass-slider[data-variant="glass-scrubber"] .slider-track {
    height: var(--slider-scrub-track-height, 1.25rem);
    background: var(--slider-scrub-track-bg, var(--surface-tint-6));
    backdrop-filter: var(--slider-scrub-backdrop, var(--glass-blur-quiet));
    cursor: pointer;
}

.glass-slider[data-variant="glass-scrubber"]:hover .slider-track,
.glass-slider[data-variant="glass-scrubber"] .slider-track:focus-within {
    background: var(--slider-scrub-track-bg-hover, var(--surface-tint-8));
}

.glass-slider[data-variant="glass-scrubber"] .slider-range {
    background: var(--slider-scrub-range-bg, var(--surface-tint-8));
    border-radius: var(--radius-pill);
}

.glass-slider[data-variant="glass-scrubber"]:hover .slider-range {
    background: var(--slider-scrub-range-bg-hover, var(--surface-tint-15));
}

/* Thin-bar thumb — hidden by default; opacity + size lift on hover/focus.
   The hover lift matches the 3 recipes' grab-affordance pattern. */
.glass-slider[data-variant="glass-scrubber"] .slider-thumb {
    width: var(--slider-scrub-thumb-width, 0.375rem);
    height: var(--slider-scrub-thumb-height, 1rem);
    border: none;
    border-radius: 2px;
    background: var(--slider-scrub-thumb-bg, var(--surface-tint-25));
    box-shadow: none;
    opacity: 0;
    transition:
        opacity var(--duration-fast) var(--ease-standard),
        width var(--duration-fast) var(--ease-standard),
        height var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard);
}

.glass-slider[data-variant="glass-scrubber"]:hover .slider-thumb,
.glass-slider[data-variant="glass-scrubber"] .slider-thumb:focus-visible,
.glass-slider[data-variant="glass-scrubber"][data-held] .slider-thumb,
.glass-slider[data-variant="glass-scrubber"][data-touch-active] .slider-thumb {
    opacity: 1;
    width: var(--slider-scrub-thumb-width-hover, 0.5rem);
    height: var(--slider-scrub-thumb-height-hover, 1.125rem);
    background: var(--slider-scrub-thumb-bg-hover, var(--surface-tint-40));
}

/* Scrub-active state (pointer down) — the press-scale on the baseline
   .slider-thumb rule still applies; we additionally lift the halo via the
   ring token to match the 3-site `:focus-visible` ring recipe. */
.glass-slider[data-variant="glass-scrubber"] .slider-track:focus-visible {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 40%, transparent);
}
</style>
