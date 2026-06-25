<script setup lang="ts">
import { type HTMLAttributes, computed, type CSSProperties, watch, onScopeDispose } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  injectDialogRootContext,
  useForwardPropsEmits,
} from 'reka-ui'
import { X } from "@lucide/vue"
import { cn } from '../../../utils'
import { useSpringMount, type SpringPreset } from '../../../composables/motion/useSpringMount'
import ModalOverlay from '../_shared/ModalOverlay.vue'
// BA.W-SURFACE-AXIS — Dialog's binary `variant: glass|opaque` string RETIRES onto
// the SHARED {glass·veil·opaque} `surface` axis (clean break, no alias — the prior
// `variant` was Dialog-local and never matched the Card grammar; MIGRATION.md row).
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(
  defineProps<DialogContentProps & {
    class?: HTMLAttributes['class'];
    /** Surface decoration register (BA.W-SURFACE-AXIS) — the SHARED
     *  {glass·veil·opaque} axis. `glass` (translucent blur, default) renders the
     *  floating glass tier; `veil` overlays the borderless/rimless text-legibility
     *  plate; `opaque` sets `--glass-level:0` (the solid-card escape). Replaces the
     *  retired binary `variant: glass|opaque` (clean break). */
    surface?: Surface;
    /**
     * Optional CSS `animation` shorthand forwarded to the portaled scrim
     * via the `--scrim-animation` typed cascade variable. reka-ui's
     * `DialogPortal` teleports the `DialogOverlay` outside the consumer's
     * component subtree, so a scoped `--scrim-animation` declaration on a
     * parent of `<Dialog>` never reaches the overlay — the publisher owns
     * the bridge.
     *
     * Pass a complete `animation` shorthand (e.g. `"scrim-breath 6s
     * ease-in-out infinite"`); the rule
     * `[data-scrim-animation] { animation: var(--scrim-animation, none) }`
     * in `animations.css` consumes it on the portaled overlay element.
     * Composes with the default `animate="fade"` enter/exit (distinct
     * selectors: `[data-state]` keys the fade, `[data-scrim-animation]`
     * keys the breath — no cascade fight).
     *
     * Reduced-motion: the global `@media (prefers-reduced-motion: reduce)`
     * bracket in `animations.css` retires the breath automatically.
     *
     * AJ-W4-δ.
     */
    scrimAnimation?: string;
    /**
     * Opt into iOS spring-physics entrance via `useSpringMount` (W13). When
     * truthy, the dialog content scales+fades via a `useSpring`-driven
     * transform instead of the default `popover-animate` cubic transition.
     * Pass `true` for the canonical `smooth` preset, or name one of
     * `'smooth' | 'snappy' | 'bouncy' | 'gentle'` to pick a different
     * (response, ζ) pair (matches the `--spring-*` tokens).
     *
     * PRM: `useSpring`'s `respectReducedMotion` snaps the spring to target
     * immediately — entrance becomes a no-op transform.
     */
    spring?: boolean | SpringPreset;
    /**
     * Render the default top-right close (X) button (default `true`).
     * Set `false` when the consumer composes its own header / dismiss control
     * (e.g. a hand-composed access modal) so the built-in X does not
     * double-up. The default keeps every existing mount byte-identical.
     */
    showClose?: boolean;
    /**
     * BD.W-OVERLAY-STAGE-COUPLE — the scene-staging enum for the centered modal band.
     * `none` (default — byte-identical to HEAD) leaves the page untouched; `dim`/
     * `scale`/`immersive` flip the ONE `--stage-t` scalar 0→1 on open so the page
     * RECEDES + SCALES behind the dialog (the iOS card-recede) and the scrim deepens.
     * PRM degrades `scale`/`immersive` → `dim` (no page transform, fold C1·R6).
     */
    stage?: 'none' | 'dim' | 'scale' | 'immersive';
  }>(),
  { surface: 'glass', showClose: true, stage: 'none' },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: _su, scrimAnimation: _sa, spring: _sp, showClose: _sc, stage: _st, ...delegated } = props
  return delegated
})

// BD.W-OVERLAY-STAGE-COUPLE — the centered modal flips `--stage-t` 0→1 on open (the
// drawer drives it per-frame; a dialog has no detent, so it transitions the ONE
// scalar at `:root` on `--spring-snappy`). The honest `stage` enum gates the
// page-wrapper recede; PRM degrades `scale`/`immersive` → `dim` (no page transform).
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const resolvedStage = computed(() => {
  const base = props.stage
  if (prefersReducedMotion && (base === 'scale' || base === 'immersive')) return 'dim'
  return base
})
const dialogRoot = injectDialogRootContext()
function syncStage(open: boolean) {
  if (typeof document === 'undefined' || props.stage === 'none') return
  const root = document.documentElement
  const wrapper = document.querySelector('[data-stage-wrapper]') as HTMLElement | null
  const scrim = document.querySelector('[data-stage-scrim]') as HTMLElement | null
  // Flip the ONE `--stage-t` scalar 0→1 on open. The `data-stage-flip` marker on
  // `:root` arms the CSS-owned flip TRANSITION (`:root[data-stage-flip]` in drawer.css
  // — a snappy spring, NOT an inline `transition` shorthand on `:root` which would
  // clobber unrelated root transitions) so the value glides 0→1. On close the marker is
  // dropped + the inline value removed → the registered property reverts to 0 (no stale
  // full-staged latch on re-open).
  if (open) {
    root.setAttribute('data-stage-flip', '')
    // seat at 0, then flip to 1 next frame so the CSS transition catches the delta.
    root.style.setProperty('--stage-t', '0')
    requestAnimationFrame(() => root.style.setProperty('--stage-t', '1'))
  } else {
    root.removeAttribute('data-stage-flip')
    root.style.removeProperty('--stage-t')
  }
  const wantScale = open && (resolvedStage.value === 'scale' || resolvedStage.value === 'immersive')
  const wantImmersive = open && resolvedStage.value === 'immersive'
  if (wrapper) wrapper.toggleAttribute('data-stage-scale', wantScale)
  if (scrim) scrim.toggleAttribute('data-stage-immersive', wantImmersive)
}
watch(() => dialogRoot?.open.value, (open) => syncStage(!!open), { immediate: true })
onScopeDispose(() => syncStage(false))

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Center fade + zoom only — no slide animation. The glass-floating tier
// (composed via `variantClasses` below) paints `--glass-shadow-floating`;
// the prior `shadow-xl` literal clobbered it (audit U.W0.C-a §5.2).
// BB.W-CARD-PAD — the overlay-band golden padding ladder. The overlay anchor is
// `--overlay-pad-inline` (--spacing(6) = 24px for the modal band); the block axis
// lifts by sqrt-phi (`*1.272`) so the heading clears the top edge against a 24px
// side. `gap-4` between header/body/footer sections STAYS (the overlay-band rhythm).
const baseClasses = 'fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)'
// BB.W-LIQUID-REVEAL — the default (non-spring) path composes the spring-clocked
// `.glass-reveal` LIQUID-ENTER recipe (off the retired `popover-animate` bezier
// zoom-95, clean break). The `-translate-x-1/2 -translate-y-1/2` centering stays
// (unlayered utilities; `.glass-reveal` never writes the BASE `translate` — only its
// `data-side` variants do, and a center Dialog has no `data-side`, so the centering
// is never clobbered). The recipe owns the clock, so `duration-normal` is dropped.
const defaultMotionClasses = '-translate-x-1/2 -translate-y-1/2 glass-reveal'

// BA.W-SURFACE-AXIS — the surface decoration rides the SHARED resolver on the
// `floating` tier. `surfaceClass` emits `glass-floating` + the veil/opaque
// decoration; Dialog appends its own `rounded-dialog` radius. The `opaque` rung
// rides the SAME glass-floating tier (edge, rim, under-shadow preserved) + adds
// `.glass-opaque` (`--glass-level:0` through the ONE knob, NOT a parallel solid
// recipe); the `veil` rung overlays the borderless text-legibility plate — the
// byte-identical `glass`/`opaque` output the prior binary string emitted, now
// reached through the ONE axis with the `veil` rung gained for free.
const variantClasses = computed(() =>
  cn(surfaceClass(props.surface, 'floating'), 'rounded-dialog')
)

// W13 spring entrance. Inject reka-ui's open ref and wire a useSpringMount
// (without dragHandlers — Dialog has no drag-dismiss gesture). The position
// 0→1 drives an inverse-scale + opacity so the dialog grows-in from 95% with
// a soft bouncy overshoot when preset = 'bouncy'.
const rootContext = props.spring ? injectDialogRootContext() : null
const springMount = props.spring && rootContext
  ? useSpringMount({
      open: rootContext.open,
      preset: typeof props.spring === 'string' ? props.spring : 'smooth',
    })
  : null

const springStyle = computed<CSSProperties | undefined>(() => {
  if (!springMount) return undefined
  const p = springMount.position.value // 0 = mounted, 1 = dismissed
  // BD.W-OVERLAY-STAGE-COUPLE — the centered-dialog SQUISH via `scale:`/`translate:`
  // LONGHANDS, never `transform: translate() scale()` (build-trap (e): a
  // `transform:scale()` over a centering translate composes ONE matrix, so the squish
  // would re-derive the -50% offset off the scaled box and drift the dialog off
  // center mid-bloom). The centering rides `translate: -50% -50%` (its OWN channel);
  // the entrance squishes `scale: 0.95 → 1` as p slides 1 → 0 (independent channels,
  // no cross-talk). `transform: none` clears any utility-class matrix so the longhands
  // are the sole source.
  const scale = 1 - 0.05 * p
  return {
    transform: 'none',
    translate: '-50% -50%',
    scale: String(scale),
    opacity: String(1 - p),
    // `animation: none` overrides tw-animate-css's enter/exit keyframes; the
    // spring-driven inline longhands / opacity must be the sole source.
    animation: 'none',
    transition: 'none',
  }
})

// BC.W-DIALOG-GLASS — the dialog reads as ACTUAL iOS-27 liquid glass: drop the
// modal plate from the floating tier (0.80 — "NOT glassy at all") to the SEE-
// THROUGH `--glass-bg-dialog` register (0.68). This is the SELF-RE-POINT recipe
// (the dock precedent, tokens/glass.css §substitution-vs-inheritance): the dialog
// re-DECLARES the composed `--glass-bg-floating` onto `--glass-bg-dialog` on its
// OWN scope, so the base `.glass-floating` rule (`background: var(--glass-bg-
// floating)`) resolves the transparent dialog plate WHILE keeping the floating
// edge/rim/under-shadow LIFT (the modal floats off the scrim). NOT a raw rung
// override (which won't re-compose the already-resolved :root value); the re-
// declaration on the scope is the documented retune path. Rides the DEFAULT
// `glass` surface; `surface="opaque"` still reaches `--glass-level:0` (the re-
// point sets the bg token, the level seam zeroes it through unchanged). The
// `--glass-bg-dialog` token carries the BC.W-ADAPTIVE-RECONCILE oklab tint
// wrapper, so the bright-bucket darken reaches the modal for AA over a busy page.
const plateStyle: CSSProperties = {
  '--glass-bg-floating': 'var(--glass-bg-dialog)',
} as CSSProperties

const contentStyle = computed<CSSProperties>(() => ({
  ...plateStyle,
  ...(springStyle.value ?? {}),
}))
</script>

<template>
  <DialogPortal>
    <ModalOverlay
      scrim="glass"
      animate="fade"
      layout="centered"
      :scrim-animation="props.scrimAnimation"
    />
    <DialogContent
      v-bind="forwarded"
      :class="cn(baseClasses, props.spring ? '' : defaultMotionClasses, variantClasses, props.class)"
      :style="contentStyle"
      :data-surface="props.surface"
      :data-spring="props.spring ? (typeof props.spring === 'string' ? props.spring : 'smooth') : undefined"
    >
      <slot />

      <!-- BC.W-DIALOG-GLASS — the dismiss tracks the overlay golden padding ladder
           (DG4). At the floating tier's `right-4 top-4` (16px) the close jammed
           inside the 24px inline / ~30.5px block overlay pad; re-pointed onto the
           same `--overlay-pad-inline`/`--overlay-pad-block` tokens the content body
           reads so the X clears the heading and breathes with the pad. -->
      <DialogClose
        v-if="props.showClose"
        class="focus-ring absolute right-(--overlay-pad-inline) top-(--overlay-pad-block) rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
