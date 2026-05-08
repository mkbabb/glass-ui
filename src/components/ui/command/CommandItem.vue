<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="cn(menuItemVariants({ indicator: 'none' }), props.class)"
  >
    <slot />
  </ComboboxItem>
</template>
