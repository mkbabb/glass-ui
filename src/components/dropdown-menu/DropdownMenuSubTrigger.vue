<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuSubTriggerProps,
  useForwardProps,
} from 'reka-ui'
import { ChevronRight } from "@lucide/vue"
import { cn } from '../_shared/class-names'
import { menuItemVariants } from '../_shared/menuItemVariants'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka SubTrigger family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const SubTriggerComp = useMenuPart('SubTrigger')
</script>

<template>
  <component
    :is="SubTriggerComp"
    v-bind="forwardedProps"
    :class="cn(
      menuItemVariants({ indicator: 'none' }),
      props.class,
    )"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </component>
</template>
