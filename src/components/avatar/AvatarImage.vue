<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import { AvatarImage, type AvatarImageProps } from 'reka-ui'

// reka's AvatarImageProps does not type `alt`; declare it and default an
// unnamed avatar to decorative while preserving a consumer-provided name.
const props = withDefaults(
  defineProps<AvatarImageProps & { alt?: ImgHTMLAttributes['alt'] }>(),
  { alt: '' },
)
</script>

<template>
  <AvatarImage v-bind="props" class="h-full w-full object-cover" />
</template>
