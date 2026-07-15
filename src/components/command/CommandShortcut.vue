<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('ml-auto text-dropdown-secondary tracking-widest text-muted-foreground', props.class)">
    <slot />
  </span>
</template>
