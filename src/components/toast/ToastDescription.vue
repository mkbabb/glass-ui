<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ToastDescription, type ToastDescriptionProps } from 'reka-ui'
import { cn } from '../_shared/class-names'

interface Props extends ToastDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastDescription
    v-bind="delegatedProps"
    :class="cn('text-sm opacity-90', props.class)"
  >
    <slot />
  </ToastDescription>
</template>
