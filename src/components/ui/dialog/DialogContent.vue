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
// BH.W-MOTION-AXIS — the `spring` boolean dies onto the ONE `motion` axis (the preset
// carves off onto the distinct `springPreset` prop; motion gates the JS entrance).
import type { Motion } from '../_shared/axes'
import { useMotionAxis } from '../_shared/useMotionAxis'
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
     * BH.W-MOTION-AXIS — the ONE motion-weight axis (the `spring` boolean's clean-break
     * successor). `full` (default) is the FULL liquid register: the default entrance is
     * the spring-clocked `.glass-reveal` CSS bloom (byte-identical to HEAD's unset
     * `spring`); an explicit `springPreset` opts into the JS `useSpringMount` entrance.
     * `reduced`/`off` opt DOWN — the JS spring entrance unbinds and the `.glass-reveal`
     * CSS floor stands (the SAME state PRM produces). PRM forces `full → reduced`
     * regardless (a11y absolute).
     */
    motion?: Motion;
    /**
     * BH.W-MOTION-AXIS — the JS spring entrance PRESET (the curve choice carved OFF the
     * retired `spring` boolean; a distinct concern from motion INTENSITY). UNSET (default)
     * keeps the `.glass-reveal` CSS bloom (byte-identical to HEAD's unset `spring`);
     * naming one of `'smooth' | 'snappy' | 'bouncy' | 'gentle'` opts into the
     * `useSpringMount` JS entrance (the W13 iOS spring-physics scale+fade). Ignored when
     * `motion === "off"` (the CSS floor stands). PRM snaps the spring to target (no-op
     * transform).
     */
    springPreset?: SpringPreset;
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
  const { class: _, surface: _su, scrimAnimation: _sa, motion: _mo, springPreset: _spp, showClose: _sc, stage: _st, ...delegated } = props
  return delegated
})

// BH.W-MOTION-AXIS — the resolved motion state. The JS spring entrance arms iff a
// `springPreset` is named AND the resolved motion is not `off` (a preset-less dialog
// keeps the `.glass-reveal` CSS bloom — byte-identical to HEAD's unset `spring`).
const motionAxis = useMotionAxis(() => props.motion)
const springActive = computed(
  () => props.springPreset != null && motionAxis.resolved.value !== 'off',
)

// BD.W-OVERLAY-STAGE-COUPLE — the centered modal flips `--stage-t` 0→1 on open (the
// drawer drives it per-frame; a dialog has no detent, so it transitions the ONE scalar
// on `--spring-snappy`, scoped to the reader roots — BI.W-DRAWER-PERF). The honest
// `stage` enum gates the page-wrapper recede; PRM degrades `scale`/`immersive` → `dim`.
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const resolvedStage = computed(() => {
  const base = props.stage
  if (prefersReducedMotion && (base === 'scale' || base === 'immersive')) return 'dim'
  return base
})
const dialogRoot = injectDialogRootContext()
// BI.W-DRAWER-PERF — flip `--stage-t` 0→1 SCOPED to the reader roots (the page-wrapper
// + the scrim), NOT `document.documentElement`. `--stage-t` is `inherits: false`
// (drawer.css), so a write on the app-root wrapper recalcs ONLY the wrapper — a whole-
// document `:root` write invalidated the inherited-property cache for the entire app
// subtree (the storm the drawer's per-frame writer paid at 120×; the modal flip is
// one-shot but shares the retired lever). The reader roots resolve AFTER the portal
// commits (this watch runs pre-flush; one rAF lands post-commit so the freshly-portaled
// scrim exists), and the CSS flip transition catches the 0→1 delta via a two-frame
// seat-0 → flip-1 (both the persistent wrapper AND the fresh scrim gain a before-change
// style, so both GLIDE rather than snap). On close each root reverts to the registered
// `initial-value: 0` (no stale full-staged latch on re-open).
function syncStage(open: boolean) {
  if (typeof document === 'undefined' || props.stage === 'none') return
  if (open) {
    requestAnimationFrame(() => {
      const wrapper = document.querySelector('[data-stage-wrapper]') as HTMLElement | null
      const scrim = document.querySelector('[data-stage-scrim]') as HTMLElement | null
      const wantScale = resolvedStage.value === 'scale' || resolvedStage.value === 'immersive'
      const wantImmersive = resolvedStage.value === 'immersive'
      for (const el of [wrapper, scrim]) {
        if (!el) continue
        // Arm the CSS-owned flip transition (`[data-stage-*][data-stage-flip]` in
        // drawer.css — a snappy spring, NOT an inline shorthand that would clobber
        // unrelated transitions) + seat 0 so the next-frame flip to 1 glides.
        el.setAttribute('data-stage-flip', '')
        el.style.setProperty('--stage-t', '0')
      }
      if (wrapper) wrapper.toggleAttribute('data-stage-scale', wantScale)
      if (scrim) scrim.toggleAttribute('data-stage-immersive', wantImmersive)
      requestAnimationFrame(() => {
        for (const el of [wrapper, scrim]) {
          if (el) el.style.setProperty('--stage-t', '1')
        }
      })
    })
  } else {
    const wrapper = document.querySelector('[data-stage-wrapper]') as HTMLElement | null
    const scrim = document.querySelector('[data-stage-scrim]') as HTMLElement | null
    for (const el of [wrapper, scrim]) {
      if (!el) continue
      el.removeAttribute('data-stage-flip')
      el.style.removeProperty('--stage-t')
    }
    if (wrapper) wrapper.removeAttribute('data-stage-scale')
    if (scrim) scrim.removeAttribute('data-stage-immersive')
  }
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
const rootContext = springActive.value ? injectDialogRootContext() : null
const springMount = springActive.value && rootContext
  ? useSpringMount({
      open: rootContext.open,
      preset: props.springPreset ?? 'smooth',
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
  // BH.W-MOTION-AXIS — the `--motion-weight: 0` off-write (undefined at full/reduced).
  ...((motionAxis.hostStyle.value as CSSProperties | undefined) ?? {}),
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
      :class="cn(baseClasses, springActive ? '' : defaultMotionClasses, variantClasses, props.class)"
      :style="contentStyle"
      :data-surface="props.surface"
      data-reveal="overlay"
      :data-motion="motionAxis.dataMotion.value"
      :data-spring="springActive ? (props.springPreset ?? 'smooth') : undefined"
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
