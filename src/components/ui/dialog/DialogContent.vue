<script setup lang="ts">
import { type HTMLAttributes, computed, type CSSProperties } from 'vue'
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

const props = withDefaults(
  defineProps<DialogContentProps & {
    class?: HTMLAttributes['class'];
    /** Visual variant: "glass" (translucent blur, default) or "opaque" (solid background). */
    variant?: 'glass' | 'opaque';
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
  }>(),
  { variant: 'glass', showClose: true },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: _v, scrimAnimation: _sa, spring: _sp, showClose: _sc, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Center fade + zoom only — no slide animation. The glass-floating tier
// (composed via `variantClasses` below) paints `--glass-shadow-floating`;
// the prior `shadow-xl` literal clobbered it (audit U.W0.C-a §5.2).
const baseClasses = 'fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 p-6'
// Default cubic path retains the canonical popover-animate + translate trick.
const defaultMotionClasses = '-translate-x-1/2 -translate-y-1/2 duration-normal popover-animate'

const variantClasses = computed(() =>
  props.variant === 'opaque'
    ? 'bg-background border sm:rounded-dialog'
    : 'glass-floating rounded-dialog'
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
  // Translate (-50%) preserves the centring; the entrance scales 0.95 → 1
  // and opacity 0 → 1 as p slides 1 → 0.
  const scale = 1 - 0.05 * p
  return {
    transform: `translate(-50%, -50%) scale(${scale})`,
    opacity: String(1 - p),
    // `animation: none` overrides tw-animate-css's enter/exit keyframes; the
    // spring-driven inline transform / opacity must be the sole source.
    animation: 'none',
    transition: 'none',
  }
})
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
      :style="springStyle"
      :data-spring="props.spring ? (typeof props.spring === 'string' ? props.spring : 'smooth') : undefined"
    >
      <slot />

      <DialogClose
        v-if="props.showClose"
        class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
