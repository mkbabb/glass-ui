<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { X } from 'lucide-vue-next'
import { cn } from '../../../utils'

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

// Center fade + zoom only — no slide animation.
const baseClasses = 'fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 p-6 shadow-xl duration-[var(--duration-normal)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'

const variantClasses = computed(() =>
  props.variant === 'opaque'
    ? 'bg-background border sm:rounded-xl'
    : 'glass-elevated rounded-xl'
)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-overlay bg-black/50 [backdrop-filter:var(--glass-blur-subtle)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="cn(baseClasses, variantClasses, props.class)"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
