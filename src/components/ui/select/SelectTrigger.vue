<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { type SelectTriggerVariants, selectTriggerVariants } from '.'
import { cn } from '@utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class']
    variant?: SelectTriggerVariants['variant']
  }>(),
  { variant: 'default' },
)

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(selectTriggerVariants({ variant }), props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="transition-transform duration-200 ease-[var(--ease-standard)] [&[data-state=open]]:rotate-180 h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
