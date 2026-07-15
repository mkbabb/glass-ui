<script setup lang="ts">
import { type DropdownMenuGroupProps } from 'reka-ui'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Group family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuGroupProps>()
const GroupComp = useMenuPart('Group')
</script>

<template>
  <component :is="GroupComp" v-bind="props">
    <slot />
  </component>
</template>
