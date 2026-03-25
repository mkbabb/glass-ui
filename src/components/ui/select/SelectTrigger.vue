<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '../../../utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class']
    /** 'default' = glass bg; 'ghost' = transparent, no border/shadow */
    variant?: 'default' | 'ghost'
  }>(),
  { variant: 'default' },
)

const delegatedProps = computed(() => {
  const { class: _, variant: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const variantClass = computed(() =>
  props.variant === 'ghost'
    ? 'bg-transparent border-none shadow-none'
    : 'glass',
)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    style="font-family: var(--select-font, inherit)"
    :class="cn(
      variantClass,
      'flex h-10 w-full items-center justify-between rounded-full px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_hsl(var(--ring)/0.4)] disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="transition-transform duration-200 ease-[var(--ease-standard)] [[data-state=open]>&]:rotate-180 h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
