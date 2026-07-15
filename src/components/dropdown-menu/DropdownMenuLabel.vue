<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type DropdownMenuLabelProps, useForwardProps } from 'reka-ui'
import { cn } from '../_shared/class-names'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Label family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const LabelComp = useMenuPart('Label')
</script>

<template>
  <component
    :is="LabelComp"
    v-bind="forwardedProps"
    :class="cn('px-2 py-1.5 text-dropdown-secondary font-semibold', inset && 'pl-8', props.class)"
  >
    <slot />
  </component>
</template>
