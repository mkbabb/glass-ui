<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { type NumberFieldVariants, numberFieldVariants } from '.'
import { cn } from '@utils'

const props = defineProps<NumberFieldRootProps & {
  class?: HTMLAttributes['class']
  variant?: NumberFieldVariants['variant']
}>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="cn(numberFieldVariants({ variant }), props.class)">
    <slot />
  </NumberFieldRoot>
</template>
