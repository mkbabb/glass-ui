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
import { X } from 'lucide-vue-next'
import { cn } from '../../../utils'
import ModalOverlay from '../_shared/ModalOverlay.vue'

const props = withDefaults(
  defineProps<DialogContentProps & {
    class?: HTMLAttributes['class'];
    /** Visual variant: "glass" (translucent blur, default) or "opaque" (solid background). */
    variant?: 'glass' | 'opaque';
  }>(),
  { variant: 'glass' },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: _v, ...delegated } = props
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
    <ModalOverlay scrim="glass" animate="fade" layout="centered" />
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
