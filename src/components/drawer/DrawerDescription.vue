<script lang="ts" setup>
// BB.W-DRAWER-ABROGATE — the description on the HOUSE reka `DialogDescription` (off
// vaul's). The type-bind + the typography class are PRESERVED; only the component
// identity changes.
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<DialogDescriptionProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogDescription v-bind="delegatedProps" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </DialogDescription>
</template>
