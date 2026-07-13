<script setup lang="ts">
import {
  type DropdownMenuRadioGroupEmits,
  type DropdownMenuRadioGroupProps,
  useForwardPropsEmits,
} from 'reka-ui'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka RadioGroup family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuRadioGroupProps>()
const emits = defineEmits<DropdownMenuRadioGroupEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const RadioGroupComp = useMenuPart('RadioGroup')
</script>

<template>
  <component :is="RadioGroupComp" v-bind="forwarded">
    <slot />
  </component>
</template>
