<script setup lang="ts">
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from 'vue'
import { computed, watch } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '../../../utils'
import type { Surface } from '../_shared/useSurfaceAxis'
import { useSpringPress } from '../../../composables/motion/useSpringPress'
import { useLiquidFlex } from '../../../composables/motion/useLiquidFlex'
import { vSpecular } from '../../../composables/glass'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  // BB.W-SURFACE-AXIS-COMPLETE — the shared {glass·veil·opaque} surface-decoration
  // axis (the R8-12 "buttons" close), threaded as the ORTHOGONAL cross-cutting
  // decoration on TOP of the `variant` register (default UNSET — `variant` owns
  // Button's default). The `:data-surface` binding (the Card attr path) reaches the
  // `surface-axis.css` veil/opaque rules: `surface="veil"` strips the rim into a
  // borderless glass plate, `surface="opaque"` rides the `--glass-level:0` escape.
  // `surface="opaque"` and the `solid` variant are the same `--glass-level:0`
  // endpoint reached from two axes — NOT duplicated recipes; `surface` is the
  // cross-cutting one the variant cannot reach.
  surface?: Surface
  // BB.W-BUTTON-GLASS (e) — the optional refraction-edge opt-in (additive,
  // default OFF). On a supporting engine (`@supports (backdrop-filter: url(#…))`,
  // glass-refract.css) a `:liquid` button adds the EXISTING `.glass-lens` axis
  // (the `#glass-refract` squircle-bevel SVG filter, BB.W-LENSING), so it reads the
  // iOS-26 edge-bend over its blur base; off-Chromium it degrades cleanly to the un-gated
  // `.btn-glass` blur+tint base (the no-workaround floor). CONSUMES the one shared
  // refraction axis — NEVER a button-local lens fork. The `:active` lens read is the
  // CHEAP coupled press squish + the gleam lift (NOT a per-frame displacement-map
  // re-rasterize — the one-refractive-element-per-route budget). Opt-in on glass
  // variants only (a non-glass `solid` button has no blur base to refract).
  liquid?: boolean
  // Element-specific <button> attributes forwarded to the rendered host. reka's
  // Primitive only types `as`/`as-child`, so these are spread through `$attrs`
  // (see `hostAttrs`) rather than bound on <Primitive> directly.
  type?: ButtonHTMLAttributes['type']
  disabled?: ButtonHTMLAttributes['disabled']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const hostAttrs = computed(() => ({
  type: props.type,
  disabled: props.disabled,
}))

// BB.W-SURFACE-AXIS-COMPLETE — the surface DECORATION composed alongside
// `buttonVariants`. Button owns its base register on the `variant` axis, so the
// shared axis is the cross-cutting `[data-surface]` attr (the load-bearing thread
// the `surface-axis.css` rules read) plus the bare decoration class (`veil-surface`
// / `glass-opaque`) — NOT a forced `glass-${tier}` base, which would clobber the
// variant. `surface` UNSET (the default) emits nothing — `variant` paints alone.
const surfaceDecoration = computed(() => {
  if (props.surface === 'veil') return 'veil-surface'
  if (props.surface === 'opaque') return 'glass-opaque'
  return undefined
})

// BB.W-BUTTON-GLASS (b) — the squishy interruptible press. `useSpringPress`
// (response 0.25, ζ 0.7, ~5% overshoot — the iOS tap-press canonical, PRM-safe)
// drives a 0..1 press value; `useLiquidFlex` projects that onto the volume-
// preserving X/Y reciprocal squish (the SAME primitive the tabs indicator + the
// dock orientation-morph speak — this is `useSpringPress`'s FIRST binary consumer,
// the visual-load-bearing activation the audit names). The squish is SQUISH-ONLY
// (a button has no size span), so it feeds the spring value as the `linear`-law
// travel fraction, capped LOW at 1.04 (never a taffy-pull). The press is
// INTERRUPTIBLE (a rapid re-press re-targets the spring mid-flight) and releases at
// settle on the `--spring-snappy-duration` clock the spring carries.
//
// PRM-safe by construction: `useSpringPress` respects `prefers-reduced-motion`
// (the spring snaps to the endpoint with zero in-between frames), so under reduce
// the press still FUNCTIONS (the scale arrives) with the squish physics off.
//
// BC.W-BUTTON-GLASS-IOS (move 3 / BG-IOS-3) — the iOS interactive press register.
// The press reads `useSpringPress`'s DEFAULTS — the ONE source. The Apple
// `interactiveSpring` (response 0.15 / ζ 0.86, the sub-100ms iOS press window with a
// tiny alive overshoot) is BOOKED in the `press` SPRING_PRESETS row that BC.W-SPRING-
// EASE owns + re-points the `useSpringPress` defaults onto (springPresets.ts +
// useSpringPress.ts — OUT of this wave's footprint). Button stays consumer #1 of
// `useSpringPress` (direct composition, `proof:button-glass` B2). NO button-local
// magic-number spring (the W-GLASS-CAL spring fence) — the press physics live at the
// ONE table, never a per-call literal. When SPRING-EASE lands the 0.15/0.86 row, the
// press answers in the iOS window with zero edit here.
const press = useSpringPress()
const squish = useLiquidFlex({
  from: 0,
  to: 1,
  axis: 'width',
  maxStretch: 1.04,
  squishLaw: 'linear',
})

// Feed the live spring value as the squish travel via a WATCH (the side-effect
// site — NOT inside a computed getter, which would mutate `useLiquidFlex`'s travel
// ref during render). The reciprocal stretch swells as the press travels and
// relaxes to 1 as it settles — the SAME drive calls carry the release, no free-
// running timer (the M5 determinism `useLiquidFlex` documents).
watch(
  () => press.value.value,
  (t) => squish.squish(t),
  { immediate: true, flush: 'sync' },
)

const pressStyle = computed<CSSProperties>(() => {
  const t = press.value.value
  const stretch = squish.stretch.value
  // The press SHRINK (the iOS uniform contraction) couples WITH the volume-
  // preserving reciprocal squish: the X axis reads `shrink · stretch`, the Y axis
  // `shrink / stretch` (the volume preserved on the travel axis). `shrink` rides the
  // CSS press-scale token (`--scale-press-btn`, 0.97) so the JS path AGREES with the
  // CSS `.tap-squish active:scale` floor's magnitude — the JS is the ENHANCEMENT
  // (the reciprocal deform), not a competing shrink. Inline `scale` wins over the
  // CVA `active:scale-*` utility, so the hydrated path is the SINGLE press source;
  // pre-hydration the CSS scale floor is the only press (the no-JS / SSR floor).
  const shrink = 1 - t * 0.03
  const scaleX = (shrink * stretch).toFixed(4)
  const scaleY = (shrink / stretch).toFixed(4)
  const style: CSSProperties = {
    // The ONE press drive scalar the coupled specular lift + the optional
    // `.glass-refract` lens read consume (surfaces.css / property-regs.css). The
    // `:active` gleam couples a sub-perceptual brightness nudge on this drive so the
    // glass reads as DEFORMING, not just shrinking.
    '--glass-btn-press-t': t.toFixed(4),
  } as CSSProperties
  // Emit the JS reciprocal `scale` ONLY while the press is engaged (t past a
  // sub-perceptual threshold) — at rest the inline `scale` is OMITTED so the CVA
  // hover utilities (`hover:scale-(--scale-hover-btn)` on primary/gold-audacious)
  // win unimpeded. The inline value wins over the CVA `active:scale-*` floor while
  // pressed (the single-source press), then yields back to the utility cascade as it
  // settles — no desync, no double-apply (the §Triumvirate single-source).
  if (t > 0.001) {
    style.scale = `${scaleX} ${scaleY}`
  }
  return style
})

// BB.W-LIQUIDHOVER — the moving-specular gleam AUTO-ARMS via the `v-specular`
// directive (the tier-root delivery wrapping the ONE position-write core,
// `createSpecularWriter`). The prior BB.W-BUTTON-GLASS hand-wire (the explicit
// `useSpecularTracking` + `@pointermove` pair — the documented "auto-arm not landed"
// branch) RETIRES onto it now that the auto-arm IS landed: a bare `<Button
// variant="glass">` gleams pointer-following with ZERO call-site wiring. The directive
// arms only the GLASS-register variants (the `.glass-wash::before` recipe paints there;
// a `solid`/`link`/`outline` button has no `::before` to gleam, so it opts out — no
// wasted pointermove listener). PRM-aware by construction (the wrapped core skips the
// write under reduce; the CSS bracket pins the catch-light static at centre).
// BC.W-BUTTON-GLASS-IOS (BG-IOS-6) — the de-shadcn-reskinned `outline`/`secondary`/
// `accent` now compose the `glass-wash btn-glass` register (the `.glass-wash::before`
// gleam recipe), so the pointer-following gleam arms on them too (one material, the
// same lit-control affordance). reka behavior is untouched — only the gleam arm widens.
const GLASS_VARIANTS = new Set<ButtonVariants['variant']>([
  'default',
  'glass',
  'glass-wash',
  'primary-audacious',
  'gold-audacious',
  'outline',
  'secondary',
  'accent',
])
const specularArmed = computed(() => GLASS_VARIANTS.has(props.variant ?? 'default'))

// The host style carries the press squish/drive only; the specular position write is
// the directive's job now (a direct `el.style` host write, not a merged `:style`
// object). The press squish overrides the CVA `scale` utility (the single-source press).
const hostStyle = computed<CSSProperties>(() => ({
  ...pressStyle.value,
}))

// The refraction opt-in is a GLASS-register-only decoration (a `solid` button has
// no blur base to refract). `liquid` adds the EXISTING refraction axis — the class
// is `.glass-lens` (BB.W-LENSING renamed `.glass-refract`→`.glass-lens`, clean break,
// no alias; the `--glass-refract` magnitude axis name is kept).
const liquidDecoration = computed(() =>
  props.liquid ? 'glass-lens' : undefined,
)
</script>

<template>
  <Primitive
    v-specular="specularArmed"
    :as="as"
    :as-child="asChild"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-surface="surface"
    v-bind="hostAttrs"
    :class="cn(buttonVariants({ variant, size }), surfaceDecoration, liquidDecoration, props.class)"
    :style="hostStyle"
    @pointerdown="press.press"
    @pointerup="press.release"
    @pointercancel="press.release"
    @pointerleave="press.release"
  >
    <slot />
  </Primitive>
</template>
