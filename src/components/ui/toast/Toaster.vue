<script setup lang="ts">
import { computed } from 'vue'
import { ToastProvider, ToastViewport } from 'reka-ui'
import Toast from './Toast.vue'
import ToastClose from './ToastClose.vue'
import ToastTitle from './ToastTitle.vue'
import ToastDescription from './ToastDescription.vue'
import { useToast } from './use-toast'
import { cn } from '../../../utils'

export type ToasterPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

const props = withDefaults(
  defineProps<{ position?: ToasterPosition }>(),
  { position: 'bottom-right' },
)

const { toasts } = useToast()

// Invariant viewport chrome — identical across every anchor. The anchor
// fragment (flex-direction + edge) is interleaved between the two halves
// so the `bottom-right` default reproduces the pre-W3 hardcoded class
// byte-for-byte (proven in docs/tranches/AO — see W1.4 R0G-4).
const VIEWPORT_BASE = 'fixed top-0 z-toast flex max-h-screen w-full'
const VIEWPORT_PAD = 'p-4'
const VIEWPORT_WIDTH = 'md:max-w-[420px]'

// Per-position anchor: `[direction, edge]`. `direction` is the flex stack
// order (placed BEFORE the padding); `edge` is the responsive anchor
// (placed AFTER the padding). Bottom anchors stack newest-at-bottom via
// the mobile-top reverse + the `sm:` bottom override; top anchors stack
// newest-on-top with a plain `flex-col` and drop the reverse.
const VIEWPORT_ANCHOR: Record<ToasterPosition, readonly [string, string]> = {
  'bottom-right': ['flex-col-reverse', 'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col'],
  'bottom-left': ['flex-col-reverse', 'sm:bottom-0 sm:left-0 sm:top-auto sm:flex-col'],
  'bottom-center': ['flex-col-reverse', 'sm:bottom-0 sm:left-1/2 sm:top-auto sm:-translate-x-1/2 sm:flex-col'],
  'top-right': ['right-0 flex-col', ''],
  'top-left': ['left-0 flex-col', ''],
  'top-center': ['left-1/2 -translate-x-1/2 flex-col', ''],
}

const viewportClass = computed(() => {
  const [direction, edge] = VIEWPORT_ANCHOR[props.position]
  return cn(VIEWPORT_BASE, direction, VIEWPORT_PAD, edge, VIEWPORT_WIDTH)
})
</script>

<template>
  <ToastProvider>
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
    >
      <div class="grid gap-1">
        <ToastTitle v-if="toast.title">
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription v-if="toast.description">
          {{ toast.description }}
        </ToastDescription>
      </div>
      <ToastClose />
    </Toast>
    <ToastViewport :class="viewportClass" />
  </ToastProvider>
</template>
