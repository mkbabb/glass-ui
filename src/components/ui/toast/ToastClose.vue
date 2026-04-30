<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ToastClose, type ToastCloseProps } from 'reka-ui'
import { X } from 'lucide-vue-next'
import { cn } from '@utils'

interface Props extends ToastCloseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    :class="
      cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)] group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50',
        props.class,
      )
    "
  >
    <X class="h-4 w-4" />
  </ToastClose>
</template>
