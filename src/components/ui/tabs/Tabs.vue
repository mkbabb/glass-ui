<script setup lang="ts">
import { computed, provide } from 'vue'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { TabsListVariants } from '.'

const props = defineProps<TabsRootProps & {
  /** Default variant for descendant TabsList + TabsTrigger; overridable per-leaf. */
  variant?: TabsListVariants['variant']
}>()
const emits = defineEmits<TabsRootEmits>()

provide('glassTabs', { variant: computed(() => props.variant) })

const delegated = computed(() => {
  const { variant: _, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
