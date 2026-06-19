<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui'
import { Circle } from "@lucide/vue"
import { cn } from '../../../utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'tap-squish focus-ring relative touch-hit-area aspect-square h-4 w-4 rounded-pill border border-(--control-ring) text-primary transition-control disabled:cursor-not-allowed disabled:opacity-disabled data-[state=checked]:border-(--control-checked-bg) data-[state=checked]:bg-(--control-checked-bg) data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      class="flex items-center justify-center text-current"
    >
      <Circle class="h-2.5 w-2.5 fill-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
