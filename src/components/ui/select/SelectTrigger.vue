<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '../../../utils'

const props = defineProps<SelectTriggerProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'glass-subtle focus-visible:shadow-[var(--focus-ring-shadow)]',
      'flex h-10 w-full items-center justify-between rounded-full px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-[background-color,border-color,color,opacity] duration-fast',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="transition-transform duration-200 ease-[var(--ease-standard)] [&[data-state=open]]:rotate-180 h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
