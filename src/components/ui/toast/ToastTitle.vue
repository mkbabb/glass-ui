<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ToastTitle, type ToastTitleProps } from 'reka-ui'
import { cn } from '../../../utils'

interface Props extends ToastTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ToastTitle
    v-bind="delegatedProps"
    :class="cn('text-sm font-semibold', props.class)"
  >
    <slot />
  </ToastTitle>
</template>
