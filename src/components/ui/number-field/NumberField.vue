<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { type HTMLAttributes, computed, provide } from 'vue'
import { type NumberFieldVariants, numberFieldVariants } from '.'
import { cn } from '@utils'

const props = defineProps<NumberFieldRootProps & {
  class?: HTMLAttributes['class']
  variant?: NumberFieldVariants['variant']
}>()
const emits = defineEmits<NumberFieldRootEmits>()

// Provide the resolved variant to descendant NumberFieldInput so it can
// apply the matching slice of `numberFieldInputVariants` without the root
// pushing styles via descendant attribute selectors. Mirrors the Tabs
// `provide('glassTabs', { variant })` precedent.
provide('glassNumberField', { variant: computed(() => props.variant) })

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
