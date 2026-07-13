<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import {
  ToastRoot,
  type ToastRootEmits,
  type ToastRootProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import { type Surface, surfaceClass } from '../_shared/useSurfaceAxis'
import type { ToastVariant } from './use-toast'

// BA.W-FEEDBACK-TONE — tone rides ON glass. The Toast `variant` no longer paints a
// SOLID `bg-<tone>` token plate over the `glass-floating` base (the AW.W25 opaque-slab
// map that occluded the backdrop — R8-12). It now composes the ONE shared tinted-glass
// tone register (`feedback-tone.css`): `.feedback-tone .feedback-tone-<name>` tints the
// floating rung a BOUNDED % toward the house `--{success,warning,info,destructive}`
// token (the backdrop shows through — colored GLASS, not a colored slab) + a tone-keyed
// rim + a full-chroma glyph; the body text stays `--foreground` for legibility (the
// Alert discipline). The `ToastVariant` union is sourced once from `use-toast.ts`.
//
// BB.W-SURFACE-AXIS-COMPLETE — Toast joins the shared {glass·veil·opaque} surface axis
// (the R8-12 "toasts" close). `surface` (default `glass`) chooses the DECORATION of the
// floating rung via the ONE `surfaceClass(surface, "floating")` resolver; the
// `:data-surface` binding reaches the `surface-axis.css` veil/opaque rules. It is
// ORTHOGONAL to the `variant` tone arm: the `feedback-tone` tint rides ON the resolved
// glass surface exactly as before (the tone mixes the rung token at the element). The
// `glass` default is byte-identical to the prior bare `glass-floating` plate.

interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariant
  surface?: Surface
}

interface ToastEmits extends ToastRootEmits {}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
  surface: 'glass',
})

const emits = defineEmits<ToastEmits>()

// AW.W26 — idiomatic forward-emits. The manual six-event re-emit
// (`@update:open`/`@escapeKeyDown`/`@swipe*`) is replaced by
// `useForwardPropsEmits`, matching every other reka wrapper. The
// `<ToastProvider>`/`<ToastViewport>` are app-root singletons owned by
// `Toaster.vue`; per-toast nesting broke swipe/stacking/region semantics under
// N>1 toasts, so this is now a clean `<ToastRoot>` wrapper.
const delegatedProps = computed(() => {
  const { class: _, variant: __, surface: ___, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    data-slot="toast"
    :data-variant="variant"
    :data-surface="surface"
    data-reveal="transient"
    v-bind="forwarded"
    :class="
      cn(
        // AW.W25 — the overlay-band material carve: Toast joins the shared
        // `glass-floating` substrate every overlay sibling (Dialog / Sheet /
        // Popover / DropdownMenu / Combobox) already uses, retiring the flat
        // `bg-background`/`shadow-modal`. BB.W-SURFACE-AXIS-COMPLETE resolves the
        // base through surfaceClass(surface, floating) — see the script block above
        // (no quotes/parens detail here: this comment lives inside the binding attr).
        surfaceClass(surface, 'floating'),
        // BI.W-REGISTER-TABLE — the toast MATERIALIZES via the `enter-transient` register
        // (a CENTER-SEED bloom: scale-from ~0.5, decongest-blur, fade, on the gentle
        // transient spring — MOTION-LADDER M5), NOT a slide-in-from-viewport-edge. The
        // reka `tw-animate-css` `data-[state=open]:animate-in` / `animate-out` /
        // `slide-in-from-*-full` / `fade-out-80` chain + the own `transition-[opacity,
        // transform]` are RETIRED (clean break, no alias) — `.glass-reveal` owns the
        // data-state enter (via @starting-style, transform-origin center) AND the exit
        // (the `glass-reveal-out` keyframe reka's usePresence awaits). The swipe-drag
        // gesture keeps its reka-driven `translate-x` (with `transition-none` during the
        // active move); the reveal's own `translate` leg springs the cancel/settle back.
        // BB.W-CARD-PAD — the overlay-band golden padding ladder (inline anchor --spacing(6),
        // block axis sqrt-phi *1.272); `pr-8` STAYS (close-button clearance).
        'glass-reveal [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-panel px-(--overlay-pad-inline) py-(--overlay-pad-block) pr-8 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none',
        // The body text stays --foreground (legibility); the tinted-glass wash + the
        // tone-keyed rim + the full-chroma glyph carry the semantic. Toggling on the
        // tone register only for a NON-default variant keeps `default` the un-toned
        // floating glass.
        'text-foreground',
        {
          'feedback-tone [&_svg]:text-(--tone)': variant !== 'default',
          'feedback-tone-destructive': variant === 'destructive',
          'feedback-tone-success': variant === 'success',
          'feedback-tone-warning': variant === 'warning',
          'feedback-tone-info': variant === 'info',
        },
        props.class,
      )
    "
  >
    <slot />
  </ToastRoot>
</template>
