<script lang="ts" setup>
// BB.W-DRAWER-ABROGATE — the title on the HOUSE reka `DialogTitle` (off vaul's). The
// type-bind + the typography class are PRESERVED; only the component identity changes.
import { DialogTitle, type DialogTitleProps } from 'reka-ui'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '../../../utils'

const props = defineProps<DialogTitleProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogTitle v-bind="delegatedProps" :class="cn('text-subheading leading-none tracking-tight', props.class)">
    <slot />
  </DialogTitle>
</template>
