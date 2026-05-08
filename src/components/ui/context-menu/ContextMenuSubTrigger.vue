<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
  useForwardProps,
} from 'reka-ui'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<ContextMenuSubTriggerProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      menuItemVariants({ indicator: inset ? 'start-wide' : 'none' }),
      props.class,
    )"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
