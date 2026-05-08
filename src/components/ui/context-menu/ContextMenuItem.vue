<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<ContextMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()
const emits = defineEmits<ContextMenuItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    :class="cn(
      menuItemVariants({ indicator: inset ? 'start-wide' : 'none' }),
      props.class,
    )"
  >
    <slot />
  </ContextMenuItem>
</template>
