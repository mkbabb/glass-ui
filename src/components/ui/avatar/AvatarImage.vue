<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import { AvatarImage, type AvatarImageProps } from 'reka-ui'

// reka's AvatarImageProps does not type `alt`; declare it so the accessible
// image name lands on the rendered <img>.
const props = defineProps<AvatarImageProps & { alt?: ImgHTMLAttributes['alt'] }>()
</script>

<template>
  <AvatarImage v-bind="props" class="h-full w-full object-cover" />
</template>
