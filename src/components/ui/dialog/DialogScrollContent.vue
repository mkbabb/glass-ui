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

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class']
  overlayClass?: HTMLAttributes['class']
}>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, overlayClass: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      :class="cn(
        'fixed inset-0 z-overlay grid place-items-center overflow-y-auto bg-black/40 [backdrop-filter:var(--glass-blur-subtle)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        props.overlayClass,
      )"
    >
      <DialogContent
        :class="
          cn(
            'relative z-overlay grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-2xl md:w-full',
            props.class,
          )
        "
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="absolute top-3 right-3 p-0.5 transition-colors rounded-full hover:bg-secondary focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--ring)_30%,transparent),0_0_8px_color-mix(in_srgb,var(--ring)_15%,transparent)]"
        >
          <X class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
