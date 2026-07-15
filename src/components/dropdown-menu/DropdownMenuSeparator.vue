<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuSeparatorProps,
} from 'reka-ui'
import { cn } from '../_shared/class-names'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Separator family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const SeparatorComp = useMenuPart('Separator')
</script>

<template>
  <component :is="SeparatorComp" v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-border/70', props.class)" />
</template>
