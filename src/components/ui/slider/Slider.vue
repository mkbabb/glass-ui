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
  // BOTH recipes inscribe the thumb within the capsule so it never overshoots the
  // rounded ends — reka-ui's `contain` alignment enforces the containment law. The
  // standard cylinder seats the round knob INSIDE the thick track (a ball-bearing
  // in the cylinder, protrusion 0), and the spectrum squircle spans the tall
  // gradient track; neither floats past the capsule. The knob's value-follow
  // centre is the value point, clamped so the inscribed knob never overhangs.
  if (!delegated.thumbAlignment) {
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
      class="slider-thumb glass-specular-track"
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

/* ── The continuous GLASS fill (standard) ──
   The fill is ONE continuous glass rounded-pill spanning the FULL thick-track
   height, pulled left/right; the inscribed round knob is seated INSIDE it so the
   fill flows straight under the knob (the value point) — ONE continuous cylinder,
   not a detached disc on a bar. The range carries the W52 liquid-glass material
   (backdrop blur + the unified edge rim) tinted to `--primary`, so the filled
   portion is a glass cylinder over the muted track, not a flat bar. The reka
   SliderThumb is styled below as the inscribed knob (a11y/keyboard/focus stay
   native on it). */
.slider-range {
    position: absolute;
    height: 100%;
    border-radius: var(--radius-pill);
    /* The fill tints toward --primary over the glass blur — a consumer
       retints the cylinder via `--slider-range-bg`. The color-mix keeps the
       backdrop bleed reading through the glass (the liquid-glass identity). */
    background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88%, transparent);
    /* AY.W-GLASS — the range blur routes the `--glass-blur-quiet` rung (the
       ~2px-equivalent radius that SCALES by `--glass-level`), not a literal
       `blur(2px)` off the level knob: when a consumer sets `--glass-level: 0`
       (the opaque escape, prefers-reduced-transparency, or forced-colors) the
       range flattens to `blur(0)` with the rest of the band. A consumer's
       explicit `--slider-range-blur` override still wins. */
    backdrop-filter: var(--slider-range-blur, var(--glass-blur-quiet));
    -webkit-backdrop-filter: var(--slider-range-blur, var(--glass-blur-quiet));
    /* The unified edge rim (W52) reads the cylinder's curvature; under-shadow
       lays the glass-thickness floor at the leading edge. */
    box-shadow:
        var(--glass-material-rim),
        var(--slider-range-shadow, var(--glass-under-shadow-quiet));
    transition:
        background var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

/* ── The inscribed round knob (standard) ──
   The thumb is a FULLY ROUNDED iOS knob — a circle the size of the size token —
   INSCRIBED inside the thick glass capsule (track height = thumb + 4px, a 2px
   inset reveal each side), so it is SEATED in the cylinder with zero protrusion:
   a ball-bearing in the tube, ONE continuous piece, never a floating disc on a
   wire. The fill flows straight under it (the knob's centre IS the value point).
   It carries a faint specular grip so the grab affordance reads, and the
   four-state contract rides the box-shadow halo + the iOS press spring on
   transform. */
.slider-thumb {
    display: block;
    /* A round knob: a square footprint (1:1) at the size token, so the 50%
       radius paints a true circle. The track is thicker (thumb + 4px) so the
       knob sits inside the capsule — inscribed, never protruding past it. */
    width: var(--slider-thumb-size, 1rem);
    aspect-ratio: 1;
    border-radius: 50%;
    border: none;
    /* AY.W-GLASS — a flat fill; the grip catch-light is the SHARED opt-in
       edge-gleam (the `.glass-specular-track` `::before` recipe Card/Button/dock-
       controls use, composed on the thumb in the template), NOT a hand-rolled
       static `linear-gradient` lip (the parallel specular idiom the band did not
       speak). The thumb is the slider's interactive knob, so it is a legitimate
       opt-in (wire-or-omit: it WIRES); the gleam wakes only on pointer-move, idle
       at rest. */
    background: var(--slider-thumb-bg, var(--primary));
    box-shadow: var(--slider-thumb-shadow, none);
    /* The thumb `transform` carries the press-give (the `:active` uniform
       `scale()` give below) — a TRANSFORM/PRESS leg, so per the §6 easing doctrine it
       rides `--spring-smooth` (the ONE hover/press register), NOT `--spring-dock`
       (the dock-box MORPH register, an enter-class size animation, not a press).
       The reka SliderThumb owns the value-follow POSITION (inline inset, not this
       CSS transform), so this transition governs only the felt knob give. The
       `--slider-thumb-spring` hook keeps the per-consumer retune. */
    transition:
        background var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast)
            var(--slider-thumb-spring, var(--spring-smooth));
}

/* Hover lifts a light specular halo on the knob — the inscribed knob
   brightens its grip rather than gaining a second detached ring. */
.glass-slider:hover .slider-thumb {
    box-shadow: 0 0 0 4px var(--surface-tint-8);
}

/* D5 — keyboard focus rises to the ONE button focus register: the warm-ink
   double ring (`--focus-ring-shadow`, 30% ring + 15% halo) the `.focus-ring`
   utility keys off, NOT a hand-set 8%-alpha ghost. One focus system, one
   calibration — the token-first focus axis (CLAUDE.md §".focus-ring utility"). */
.slider-thumb:focus-visible {
    box-shadow: var(--focus-ring-shadow);
}

/* iOS press spring — the snappy spring ease on the transform channel makes
   the knob "give" under the pointer (a uniform shrink, the felt press). */
.glass-slider:active .slider-thumb {
    transform: scale(var(--scale-press-btn, 0.97));
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

/* ── The gradient-track color slider (spectrum, AX.W59) ──
   A tall capsule track whose background is a consumer-supplied
   `--slider-track-bg: linear-gradient(...)` (the value.js LCH/hue ramp). The
   range is transparent — the gradient itself IS the fill — and the thumb is a
   SQUIRCLE the HEIGHT of the track (the iOS color-picker idiom), spanning the
   full track height rather than floating as a circle. */
.glass-slider[data-variant="spectrum"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--slider-track-bg, var(--secondary));
}

.glass-slider[data-variant="spectrum"] .slider-range {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
}

.glass-slider[data-variant="spectrum"] .slider-thumb {
    /* The squircle thumb spans the FULL track height; a near-square footprint
       so the superellipse silhouette READS (the corner-shape only paints at a
       large radius relative to the box). */
    width: calc(var(--slider-thumb-size, 1rem) * 1.1);
    height: 100%;
    background: var(--slider-thumb-bg, transparent);
    border: 2px solid var(--slider-thumb-border-color, var(--background));
    /* The cross-engine CONTRACT: a GENEROUS radius proportional to the box
       (0.7× the thumb-size, ≈0.64× the 1.1× box WIDTH) reads squircle-adjacent
       on Safari/Firefox/old-Chrome — NOT the old bare 10px `--radius-lg` that
       left a rounded RECT on the ~35% without `corner-shape`. The superellipse
       is the @supports-gated PE tier that REFINES this curve, never its base. */
    border-radius: calc(var(--slider-thumb-size, 1rem) * 0.7);
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
}

/* The squircle PE tier (Chrome 139+; ~65% global) — `corner-shape` only
   changes the CURVE within the --radius box, so the round fallback above
   stays honest cross-engine. `var()` is not @supports-evaluable, so the gate
   tests the LITERAL `superellipse(2)` feature (the same Chrome-139 query the
   big-dock squircle rides — AX.W56). */
@supports (corner-shape: superellipse(2)) {
    .glass-slider[data-variant="spectrum"] .slider-thumb {
        corner-shape: var(--corner-shape-thumb);
    }
}

.glass-slider[data-variant="spectrum"]:hover .slider-thumb {
    box-shadow:
        0 0 0 4px var(--surface-tint-8),
        var(--shadow-sm);
}

/* D5 — the spectrum thumb keyboard focus rides the SAME button focus register
   (`--focus-ring-shadow`) as the standard knob, over the squircle's drop-shadow. */
.glass-slider[data-variant="spectrum"] .slider-thumb:focus-visible {
    box-shadow:
        var(--focus-ring-shadow),
        var(--shadow-sm);
}
</style>
