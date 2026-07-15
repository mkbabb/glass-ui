<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('px-(--card-pad-inline) pt-(--card-pad-section-gap) pb-(--card-pad-block)', props.class)">
    <slot />
  </div>
</template>
