<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { X } from "@lucide/vue"
import { cn } from '../../../utils'
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
  }>(),
  { variant: 'glass' },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: _v, scrimAnimation: _sa, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Center fade + zoom only — no slide animation. The glass-floating tier
// (composed via `variantClasses` below) paints `--glass-shadow-floating`;
// the prior `shadow-xl` literal clobbered it (audit U.W0.C-a §5.2).
const baseClasses = 'fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 p-6 duration-[var(--duration-normal)] popover-animate'

const variantClasses = computed(() =>
  props.variant === 'opaque'
    ? 'bg-background border sm:rounded-dialog'
    : 'glass-floating rounded-dialog'
)
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
      :class="cn(baseClasses, variantClasses, props.class)"
    >
      <slot />

      <DialogClose
        class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
