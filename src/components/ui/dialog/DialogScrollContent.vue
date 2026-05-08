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
    <ModalOverlay
      scrim="clear"
      animate="fade"
      layout="scroll"
      :class="props.overlayClass"
    >
      <DialogContent
        :class="
          cn(
            'popover-content relative z-overlay grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 [box-shadow:var(--glass-shadow-floating)] duration-200 sm:rounded-dialog md:w-full',
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
          class="focus-ring absolute top-3 right-3 p-0.5 transition-colors rounded-pill hover:bg-secondary"
        >
          <X class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </ModalOverlay>
  </DialogPortal>
</template>
