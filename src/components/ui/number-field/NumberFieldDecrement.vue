<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui'
import { NumberFieldDecrement, useForwardProps } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { Minus } from "@lucide/vue"
import { Button } from '../button'
import { cn } from '../../_shared/class-names'

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldDecrement data-slot="decrement" v-bind="forwarded" as-child>
    <Button
      variant="ghost"
      iconOnly
      :class="cn('absolute top-1/2 -translate-y-1/2 left-0 disabled:cursor-not-allowed disabled:opacity-20', props.class)"
    >
      <slot>
        <Minus class="size-icon-sm" />
      </slot>
    </Button>
  </NumberFieldDecrement>
</template>
