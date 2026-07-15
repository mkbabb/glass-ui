<script setup lang="ts">
import { type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'
import { useMenuPart } from './useMenuTrigger'

// BI.W-MENU-TRIGGER — anchors the menu. `trigger="click"` renders the reka
// DropdownMenuTrigger (a button anchor); `trigger="context"` renders the reka
// ContextMenuTrigger (the right-click / long-press surface). Same props (disabled/
// asChild/as) across both families.
const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
const TriggerComp = useMenuPart('Trigger')
</script>

<template>
  <component :is="TriggerComp" class="outline-none" v-bind="forwardedProps">
    <slot />
  </component>
</template>
