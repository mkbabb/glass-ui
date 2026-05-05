<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, computed, inject } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui'
import { toggleVariants } from '../toggle'
import { cn } from '@utils'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()

const context = inject<{ variant?: ToggleGroupVariants['variant']; size?: ToggleGroupVariants['size'] }>('toggleGroup')

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const resolvedVariant = computed(() => context?.variant ?? props.variant)
const resolvedSize = computed(() => context?.size ?? props.size)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="cn(toggleVariants({ variant: resolvedVariant, size: resolvedSize }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
