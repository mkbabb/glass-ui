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
import { cn } from '../_shared/class-names'
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
        data-reveal="overlay"
        :class="
          cn(
            // BB.W-CARD-PAD — the overlay-band golden padding ladder + the off-glass
            // `bg-background` → `glass-floating` tier fix (the scroll dialog had drifted
            // off the shared floating glass substrate). The overlay anchor lifts the
            // block axis by sqrt-phi (`*1.272`) over the inline anchor.
            // BI.W-ENTER-EXIT-LANDING — the scroll dialog joins the enter-overlay
            // register (glass-reveal + data-reveal overlay), the SAME focal bloom the
            // modal DialogContent rides. The hand-rolled duration-200 clock (which
            // clobbered the reveal's per-leg transition-duration) is RETIRED onto the
            // register — clean break, no local clock.
            'popover-content relative z-overlay grid w-full max-w-lg my-8 gap-4 border border-border glass-floating [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) [box-shadow:var(--glass-shadow-floating)] glass-reveal sm:rounded-dialog md:w-full',
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
