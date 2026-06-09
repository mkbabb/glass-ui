<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList, type TabsListProps } from 'reka-ui'
import { cn } from '../../../utils'
import TabsIndicator from './TabsIndicator.vue'

const props = withDefaults(
  defineProps<TabsListProps & {
    class?: HTMLAttributes['class']
    /**
     * AW.W25 — render the spring `TabsIndicator` pill behind the triggers so
     * the base default `<Tabs>` matches its own indicator primitive (the
     * polished pill previously lived only in the custom SegmentedTabs; the base
     * under-delivered vs its own `TabsIndicator.vue`). Default `true`. Set
     * `:indicator="false"` for a list that drives its own active-state vocab.
     */
    indicator?: boolean
  }>(),
  { indicator: true },
)

const delegatedProps = computed(() => {
  const { class: _, indicator: __, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(
      'relative inline-flex h-[var(--control-h-md)] items-center justify-center rounded-input p-1 text-muted-foreground',
      props.class,
    )"
  >
    <TabsIndicator v-if="indicator" />
    <slot />
  </TabsList>
</template>
