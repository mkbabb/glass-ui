<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import {
  ToastProvider,
  ToastRoot,
  ToastViewport,
  type ToastRootEmits,
  type ToastRootProps,
} from 'reka-ui'
import { type ToastVariants, toastVariants } from '.'
import { cn } from '@utils'

interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}

interface ToastEmits extends ToastRootEmits {}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
})

const emits = defineEmits<ToastEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastProvider>
    <ToastRoot
      v-bind="delegatedProps"
      :class="cn(toastVariants({ variant }), props.class)"
      @update:open="emits('update:open', $event)"
      @escapeKeyDown="emits('escapeKeyDown', $event)"
      @swipeStart="emits('swipeStart', $event)"
      @swipeMove="emits('swipeMove', $event)"
      @swipeEnd="emits('swipeEnd', $event)"
      @swipeCancel="emits('swipeCancel', $event)"
    >
      <slot />
    </ToastRoot>
    <ToastViewport />
  </ToastProvider>
</template>
