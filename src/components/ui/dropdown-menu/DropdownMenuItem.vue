<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      menuItemVariants({ indicator: inset ? 'start-wide' : 'none' }),
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
