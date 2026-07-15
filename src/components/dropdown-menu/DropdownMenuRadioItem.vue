<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../_shared/class-names'
import { menuItemVariants } from '../_shared/menuItemVariants'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka RadioItem + ItemIndicator.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const RadioItemComp = useMenuPart('RadioItem')
const ItemIndicatorComp = useMenuPart('ItemIndicator')
</script>

<template>
  <component
    :is="RadioItemComp"
    v-bind="forwarded"
    :class="cn(
      menuItemVariants({ indicator: 'start' }),
      props.class,
    )"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <component :is="ItemIndicatorComp">
        <span class="inline-block w-2 h-2 rounded-pill bg-current"></span>
      </component>
    </span>
    <slot />
  </component>
</template>
