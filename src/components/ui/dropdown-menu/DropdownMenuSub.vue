<script setup lang="ts">
import {
  type DropdownMenuSubEmits,
  type DropdownMenuSubProps,
  useForwardPropsEmits,
} from 'reka-ui'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Sub family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuSubProps>()
const emits = defineEmits<DropdownMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const SubComp = useMenuPart('Sub')
</script>

<template>
  <component :is="SubComp" v-bind="forwarded">
    <slot />
  </component>
</template>
