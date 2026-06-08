<script setup lang="ts">
import { type HTMLAttributes, computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
import { useTouchGate } from '../../../composables/dom/useTouchGate'
import { useOptionalDockContext } from '../../custom/dock/composables/dockContext'
import { useDockHold } from '../../custom/dock/composables/useDockHold'
import { sliderVariants, type SliderVariants } from './index'

const props = withDefaults(defineProps<SliderRootProps & {
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
}>(), {
  // Vue casts an ABSENT boolean prop to `false`, not `undefined` — so the prior
  // `props.keepDockOpen ?? true` never reached `true` for the common
  // no-prop call site (the documented `Default: true` silently disarmed the
  // hold). `withDefaults` resolves an absent prop to `true`; an explicit
  // `:keep-dock-open="false"` still disarms. (AX.W03.)
  keepDockOpen: true,
})
const emits = defineEmits<SliderRootEmits>()

const v = computed<NonNullable<SliderVariants['variant']>>(() => props.variant ?? 'standard')
const s = computed<NonNullable<SliderVariants['size']>>(() => props.size ?? 'md')
const keepDockOpen = computed(() => props.keepDockOpen)

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, keepDockOpen: ____, ...delegated } = props
  // The spectrum gradient-track knob is contained within the capsule so it
  // never overshoots the tall track; reka-ui's `contain` alignment matches
  // that intent. The standard knob keeps the default `overflow` alignment so
  // its center tracks the value edge-to-edge (the iOS continuous feel).
  if (v.value === 'spectrum' && !delegated.thumbAlignment) {
    delegated.thumbAlignment = 'contain'
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

/* AX.W03 — the host-native dock hold (one owner, one acquire path).
   The Slider subscribes to the dock's reactive `held` flag (surfaced on
   the canonical typed `DockContext` alongside the `keepOpen`/`release`
   pair, O.W2 single-typed-key) and reflects it on the root via
   `data-held` for the thumb-halo intensification recipe in scoped CSS.

   The acquire/release of that hold is owned ENTIRELY by `useDockHold`,
   which attaches NATIVE `pointerdown`/`touchstart` listeners on the
   slider's RESOLVED host element. This is the device-proven fix: reka's
   `<SliderRoot>` is a forwarding component (CollectionSlot +
   resolveDynamicComponent + forwardRef), so a Vue `@pointerdown` template
   binding arrives as `$attrs.onPointerdown` and is DROPPED across the
   Slot/forwardRef boundary — reka's own cached `onPointerdown` shadows
   it. vue-tsc + units pass; only a real drag catches it (the canonical
   binding-verification class). A native listener on the resolved host is
   immune. The prior duplicated acquire/release booleans, the
   window-`pointerup` re-implementation, AND the parallel
   `watch(touchGate.isActive)` acquire path are all GONE — collapsed onto
   the one `useDockHold` owner. */
const dock = useOptionalDockContext()
const sliderRootRef = useTemplateRef<{ $el: HTMLElement } | HTMLElement | null>('sliderRootRef')

function getRootEl(): HTMLElement | null {
  const ref = sliderRootRef.value
  if (!ref) return null
  if (ref instanceof HTMLElement) return ref
  return (ref.$el as HTMLElement | undefined) ?? null
}

// The native hold resolves the reka forwardRef host at its own `onMounted`
// (template refs are live by then). A resolver getter — not a ref Slider
// populates in a sibling `onMounted` — sidesteps the onMounted-ordering trap.
useDockHold(getRootEl, { enabled: () => keepDockOpen.value })

/* N.W0 Lane A1 — useTouchGate scroll-vs-drag arbitration (a SEPARATE
   concern from the hold: it decides whether a touch is a drag or a
   scroll, swallowing the initial tap so reka's SliderRoot doesn't treat
   a scroll as a drag). On touch devices the first tap activates the
   slider; off-control taps deactivate via the shared global listener.
   Desktop pointers are unaffected — the gate is a no-op when
   `isTouchDevice` is false. The arbitration handlers are attached
   NATIVELY (alongside the hold) — the template `@touchstart` chain is
   dropped across the same reka forwarding boundary as `@pointerdown`,
   so a template binding never fired. It FEEDS the one hold (the native
   `touchstart` in `useDockHold` acquires); it no longer races it. */
const touchGate = useTouchGate()

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

onMounted(() => {
  const root = getRootEl()
  if (!root) return
  // Native touch-arbitration listeners on the resolved host — same reason
  // as the hold: the template chain is dropped across reka's forwarding.
  // `touchstart` is NON-passive (the arbitration calls preventDefault on a
  // pending tap); move/end are passive reads.
  root.addEventListener('touchstart', onTouchStart, { passive: false })
  root.addEventListener('touchmove', onTouchMove, { passive: true })
  root.addEventListener('touchend', onTouchEnd, { passive: true })
})

onBeforeUnmount(() => {
  const root = getRootEl()
  if (!root) return
  root.removeEventListener('touchstart', onTouchStart)
  root.removeEventListener('touchmove', onTouchMove)
  root.removeEventListener('touchend', onTouchEnd)
})

const isHeld = computed(() => dock?.held.value === true)
const isTouchActive = computed(() => touchGate.isActive.value)
</script>

<template>
  <SliderRoot data-slot="slider"
    ref="sliderRootRef"
    :class="cn(sliderVariants({ variant: v, size: s }), props.class)"
    :data-variant="v"
    :data-size="s"
    :data-held="isHeld || undefined"
    :data-touch-active="isTouchActive || undefined"
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
    /* AW.W13 — the standard range fills to the thumb as state feedback. Was
       `--surface-tint-25` (a 25% tint over the muted track — sub-visible on
       cream, the audit's "no fill" finding); the lift to `--primary` makes the
       filled portion left of the thumb read as progress against the muted
       track. This extends the proven fill mechanic (the spectrum variant's
       gradient IS its fill); it forks no new track/range element. Consumers
       retint via `--slider-range-bg`. */
    background: var(--slider-range-bg, var(--primary));
    transition: background var(--duration-fast) var(--ease-standard);
}

/* ── The continuous iOS knob (standard) ──
   The thumb is a fully-circular knob (width == height, border-radius: 50%)
   that sits IN the track and reads as a swelling of the capsule — no border
   ring, no detached offset disc. The four-state contract is carried entirely
   by box-shadow halo rungs (idle → none, hover/held → tinted halo) and the
   iOS press spring on the transform channel. */
.slider-thumb {
    display: block;
    width: var(--slider-thumb-size, 1rem);
    height: var(--slider-thumb-size, 1rem);
    border-radius: 50%;
    border: none;
    background: var(--slider-thumb-bg, var(--foreground));
    box-shadow: var(--slider-thumb-shadow, none);
    transition:
        background var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-spring);
}

/* Hover/focus lift a light specular halo — the knob swells rather than
   gaining a border. */
.glass-slider:hover .slider-thumb,
.slider-thumb:focus-visible {
    box-shadow: 0 0 0 4px var(--surface-tint-8);
}

/* iOS press spring — the snappy spring ease on the transform channel makes
   the knob "give" under the pointer. */
.glass-slider:active .slider-thumb {
    transform: scale(var(--scale-press-btn));
}

.glass-slider[data-disabled] .slider-thumb {
    pointer-events: none;
    opacity: var(--opacity-disabled);
}

/* J.W5.C — held-state halo: when a dock-keep-open token is held by THIS
   slider's drag (or any sibling drag the dock observes), we lift the
   thumb halo to a denser tint rung. The substrate response in dock.css
   intensifies in parallel. Unscoped so it applies to both recipes. */
.glass-slider[data-held] .slider-thumb {
    box-shadow: 0 0 0 8px var(--surface-tint-15);
}

/* ── The gradient-track color slider (spectrum) ──
   A tall capsule track whose background is a consumer-supplied
   `--slider-track-bg: linear-gradient(...)` (the LCH/hue ramp). The range
   is transparent — the gradient itself IS the fill — and the knob is a
   small ringed disc that reads against any track hue. */
.glass-slider[data-variant="spectrum"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--slider-track-bg, var(--secondary));
}

.glass-slider[data-variant="spectrum"] .slider-range {
    background: transparent;
}

.glass-slider[data-variant="spectrum"] .slider-thumb {
    width: calc(var(--slider-thumb-size, 1rem) * 0.85);
    height: calc(var(--slider-thumb-size, 1rem) * 0.85);
    border: 2px solid var(--slider-thumb-border-color, var(--background));
    background: var(--slider-thumb-bg, transparent);
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
}

.glass-slider[data-variant="spectrum"]:hover .slider-thumb,
.glass-slider[data-variant="spectrum"] .slider-thumb:focus-visible {
    box-shadow:
        0 0 0 4px var(--surface-tint-8),
        var(--shadow-sm);
}
</style>
