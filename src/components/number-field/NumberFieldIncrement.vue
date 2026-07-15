<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui'
import { NumberFieldIncrement, useForwardProps } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { Plus } from "@lucide/vue"
import { Button } from '../button'
import { cn } from '../_shared/class-names'

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldIncrement data-slot="increment" v-bind="forwarded" as-child>
    <Button
      variant="ghost"
      iconOnly
      :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20', props.class)"
    >
      <slot>
        <Plus class="size-icon-sm" />
      </slot>
    </Button>
  </NumberFieldIncrement>
</template>
