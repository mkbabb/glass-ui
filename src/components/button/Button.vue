<script setup lang="ts">
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from './'
import { cn } from '../_shared/class-names'
import type { Surface } from '../_shared/useSurfaceAxis'
import { useLiquidPress } from '../../composables/motion/useLiquidPress'
import { vSpecular } from '../../composables/glass'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  // BI.W-BUTTON-TONE (PASS-4B ruling 5) — the semantic tone axis, ORTHOGONAL to the
  // `variant` STYLE register. `tone="destructive"` replaces the retired
  // `variant="destructive"` (clean break, no alias); a destructive intent is a tone,
  // not a style (proof:variant-residual · the Kronecker factorization). Derives off the
  // CVA `tone` map, so `ButtonVariants['tone']` publishes on `/api` in lockstep.
  tone?: ButtonVariants['tone']
  // BH.W-SIZE-UNIFY — the icon-only SHAPE axis (square p-0), orthogonal to the
  // scale `size` rung. `<Button iconOnly>` replaces the retired `size="icon"`.
  iconOnly?: ButtonVariants['iconOnly']
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
  // BD.W-BUTTON-GLASS-CONSUME (§4b) — the opt-in LOUD cartoon-punch interaction
  // tier. `.btn-punch` sits ON TOP of the shared `.glass-capsule` (it is NOT a
  // material): the press rides `--ease-cartoon-punch` (anticipation pre-dip +
  // overshoot follow-through), the reciprocal squish re-targets to a louder fenced
  // amplitude (maxStretch 1.04→1.09, composed-area ≤1.14), the glyph settles a beat
  // after the capsule (overlapping action, the BD.W-TABS-LIQUID register), and an
  // INERT `.cartoon-cast` child carries the moving cast (the BD.W-CARTOON-CASTER
  // caster — NEVER a button-local `::after` re-fork). Default-ON for the
  // `primary-audacious`/`gold-audacious` hero register; opt-in elsewhere. The dock
  // default stays CALM (no punch — a dock of punching icons is manic).
  //
  // BI.W-SHADOW-GRAMMAR (Law 4) — the offset-stamp requires a CARD silhouette. A
  // button is a PILL, so the pill cast re-points to a SOFT radius-following drop
  // (`--shadow-lg`, cards.css `.btn-punch .cartoon-cast`) instead of the hard 0-blur
  // `--shadow-cartoon` offset stamp that pokes the lopsided crescent off the stadium
  // (UF-A8/A9). The punch WEIGHT re-lands on the soft drop + the press-squish + the
  // specular gleam (the ratified judgment — the weight survives, the crescent dies);
  // the caster still travels down-left on press. The hard stamp stays legal only on a
  // card-radius surface (Card `surface="cartoon"`).
  punch?: boolean
  // Element-specific <button> attributes forwarded to the rendered host. reka's
  // Primitive only types `as`/`as-child`, so these are spread through `$attrs`
  // (see `hostAttrs`) rather than bound on <Primitive> directly.
  type?: ButtonHTMLAttributes['type']
  disabled?: ButtonHTMLAttributes['disabled']
  /** Marks an in-flight command and disables native activation until it settles. */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const interactionDisabled = computed(
  () => props.loading === true || props.disabled === true || props.disabled === 'true',
)

const hostAttrs = computed(() => ({
  type: props.type ?? (!props.asChild && props.as === 'button' ? 'button' : undefined),
  disabled: interactionDisabled.value,
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

// Loud variants share the same press owner with a slightly wider, still fenced
// reciprocal squish. The spring clock and gesture lifecycle remain canonical.
const LOUD_VARIANTS = new Set<ButtonVariants['variant']>([
  'primary-audacious',
  'gold-audacious',
])
const punchActive = computed(
  () => props.punch === true || LOUD_VARIANTS.has(props.variant ?? 'default'),
)
const punchDecoration = computed(() => (punchActive.value ? 'btn-punch' : undefined))

const press = useLiquidPress({
  disabled: () => interactionDisabled.value,
  pressVar: '--glass-btn-press-t',
  maxStretch: () => (punchActive.value ? 1.09 : 1.04),
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
// BD.W-BUTTON-GLASS-CONSUME — `ai` now joins the shared glass register (amber accent
// in the gleam), so it arms the pointer-following specular like the rest of the family.
const GLASS_VARIANTS = new Set<ButtonVariants['variant']>([
  'default',
  'glass',
  'glass-wash',
  'primary-audacious',
  'gold-audacious',
  'outline',
  'secondary',
  'accent',
  'ai',
])
const specularArmed = computed(() => GLASS_VARIANTS.has(props.variant ?? 'default'))

// The host style carries the press squish/drive only; the specular position write is
// the directive's job now (a direct `el.style` host write, not a merged `:style`
// object). The press squish overrides the CVA `scale` utility (the single-source press).
const hostStyle = computed<CSSProperties>(() => ({
  ...press.pressStyle.value,
  ...(punchActive.value
    ? { '--cartoon-press-t': press.value.value.toFixed(4) }
    : {}),
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
    :data-tone="tone"
    :data-icon-only="iconOnly || undefined"
    :data-surface="surface"
    :data-loading="loading || undefined"
    :data-press-armed="press.armed ? '' : undefined"
    :aria-busy="loading || undefined"
    v-bind="hostAttrs"
    :class="cn(buttonVariants({ variant, size, iconOnly, tone }), surfaceDecoration, liquidDecoration, punchDecoration, props.class)"
    :style="hostStyle"
    @pointerdown="press.handlers.onPointerdown"
    @pointerup="press.handlers.onPointerup"
    @pointercancel="press.handlers.onPointercancel"
    @pointerleave="press.handlers.onPointerleave"
    @pointerenter="press.handlers.onPointerenter"
    @keydown="press.handlers.onKeydown"
    @keyup="press.handlers.onKeyup"
    @blur="press.handlers.onBlur"
  >
    <!-- BD.W-BUTTON-GLASS-CONSUME (§4b) — the INERT moving cast child (the
         BD.W-CARTOON-CASTER inert-child pattern: a real aria-hidden child, NEVER a
         `::before`/`::after` — both pseudos are OCCUPIED on the glass carrier by the
         specular catch-light + the grain overlay). The `.cartoon-cast` css (cards.css)
         reads `--motion-weight × --cartoon-press-t` and travels on the compositor. Only
         rendered on the punch register; absent (zero DOM cost) otherwise.
         BI.W-SHADOW-GRAMMAR (Law 4) — under the `.btn-punch` pill host the cast paints a
         SOFT radius-following drop (`--shadow-lg`), NOT the hard `--shadow-cartoon`
         offset stamp (which pokes the UF-A8/A9 crescent off the stadium); the hard
         stamp is legal only under a card-radius ancestor. -->
    <span v-if="punchActive" class="cartoon-cast" aria-hidden="true" />
    <slot />
  </Primitive>
</template>
