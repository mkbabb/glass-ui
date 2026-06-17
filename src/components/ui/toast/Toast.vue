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
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-panel p-6 pr-8 transition-[opacity,transform] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
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
