<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot } from 'reka-ui'
import { type AvatarVariants, avatarVariants } from '.'
import { cn } from '../../_shared/class-names'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
}>(), {
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot data-slot="avatar" :class="cn(avatarVariants({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
