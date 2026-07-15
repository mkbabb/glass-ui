<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p data-slot="card-description" :class="cn('text-sm text-muted-foreground-strong', props.class)">
    <slot />
  </p>
</template>
