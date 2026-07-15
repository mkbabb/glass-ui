<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxEmptyProps } from 'reka-ui'
import { ComboboxEmpty } from 'reka-ui'
import { cn } from '../../_shared/class-names'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxEmpty v-bind="delegatedProps" :class="cn('py-6 text-center text-dropdown', props.class)">
    <slot />
  </ComboboxEmpty>
</template>
