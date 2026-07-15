<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { Check } from "@lucide/vue"
import { cn } from '../_shared/class-names'
import { menuItemVariants } from '../_shared/menuItemVariants'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka CheckboxItem + ItemIndicator.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const CheckboxItemComp = useMenuPart('CheckboxItem')
const ItemIndicatorComp = useMenuPart('ItemIndicator')
</script>

<template>
  <component
    :is="CheckboxItemComp"
    v-bind="forwarded"
    :class="cn(
      menuItemVariants({ indicator: 'start-wide' }),
      props.class,
    )"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <component :is="ItemIndicatorComp">
        <Check class="w-4 h-4" />
      </component>
    </span>
    <slot />
  </component>
</template>
