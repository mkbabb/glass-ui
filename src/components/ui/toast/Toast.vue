<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import {
  ToastRoot,
  type ToastRootEmits,
  type ToastRootProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import type { ToastVariant } from './use-toast'

// AW.W25 — semantic-tone parity. The Toast `variant` resolves the
// `success`/`warning`/`info` tones from the existing `--{success,warning,info}`
// + `-foreground` tokens (Badge already ships them), retiring the demo fakes.
// The `ToastVariant` union is sourced once from `use-toast.ts`.

interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariant
}

interface ToastEmits extends ToastRootEmits {}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
})

const emits = defineEmits<ToastEmits>()

// AW.W26 — idiomatic forward-emits. The manual six-event re-emit
// (`@update:open`/`@escapeKeyDown`/`@swipe*`) is replaced by
// `useForwardPropsEmits`, matching every other reka wrapper. The
// `<ToastProvider>`/`<ToastViewport>` are app-root singletons owned by
// `Toaster.vue`; per-toast nesting broke swipe/stacking/region semantics under
// N>1 toasts, so this is now a clean `<ToastRoot>` wrapper.
const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    data-slot="toast"
    :data-variant="variant"
    v-bind="forwarded"
    :class="
      cn(
        // AW.W25 — the overlay-band material carve: Toast joins the shared
        // `glass-floating` substrate every overlay sibling (Dialog / Sheet /
        // Popover / DropdownMenu / Combobox) already uses, retiring the flat
        // `bg-background`/`shadow-modal`.
        'glass-floating group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-panel p-6 pr-8 transition-[opacity,transform] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        {
          'text-foreground': variant === 'default',
          'bg-destructive text-destructive-foreground border-destructive': variant === 'destructive',
          'bg-success text-success-foreground border-success': variant === 'success',
          'bg-warning text-warning-foreground border-warning': variant === 'warning',
          'bg-info text-info-foreground border-info': variant === 'info',
        },
        props.class,
      )
    "
  >
    <slot />
  </ToastRoot>
</template>
