<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class']; hideIndicator?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, hideIndicator: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        menuItemVariants({ indicator: hideIndicator ? 'none' : 'start' }),
        props.class,
      )
    "
  >
    <span v-if="!hideIndicator" class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <span class="inline-block w-2 h-2 rounded-pill" style="background-color: var(--select-dot-color, currentColor)"></span>
      </SelectItemIndicator>
    </span>

    <div class="flex flex-col gap-0.5 min-w-0">
      <SelectItemText>
        <slot />
      </SelectItemText>
      <slot name="description" />
    </div>
  </SelectItem>
</template>
