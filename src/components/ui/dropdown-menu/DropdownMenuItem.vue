<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Item family (one CVA, one engine).
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const ItemComp = useMenuPart('Item')
</script>

<template>
  <component
    :is="ItemComp"
    v-bind="forwardedProps"
    :class="cn(
      menuItemVariants({ indicator: inset ? 'start-wide' : 'none' }),
      props.class,
    )"
  >
    <slot />
  </component>
</template>
