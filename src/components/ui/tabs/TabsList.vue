<script setup lang="ts">
import { type HTMLAttributes, type ComputedRef, computed, inject } from 'vue'
import { TabsList, type TabsListProps } from 'reka-ui'
import { type TabsListVariants, tabsListVariants } from '.'
import { cn } from '@utils'

const props = defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: TabsListVariants['variant']
}>()

const tabsCtx = inject<{ variant: ComputedRef<TabsListVariants['variant']> } | null>('glassTabs', null)
const resolvedVariant = computed(() => props.variant ?? tabsCtx?.variant.value)

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn(tabsListVariants({ variant: resolvedVariant }), props.class)"
  >
    <slot />
  </TabsList>
</template>
