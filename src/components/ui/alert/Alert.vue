<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'
import { type AlertVariants, alertVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  tone?: AlertVariants['tone']
}>()
</script>

<template>
  <div
    data-slot="alert"
    :data-tone="tone"
    :class="cn(alertVariants({ tone }), props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>
