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
import { type SheetVariants, sheetVariants } from '.'
import { cn } from '../../../utils'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, side, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-overlay bg-overlay-scrim [backdrop-filter:var(--glass-blur-wash)] sheet-animate"
    />
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />

      <DialogClose
        class="focus-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X class="w-4 h-4 text-muted-foreground" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
