<script lang="ts" setup>
// BB.W-DRAWER-ABROGATE — the scrim on the HOUSE reka `DialogOverlay` (off vaul's).
// The scrim utility classes are PRESERVED byte-for-byte; only the underlying
// component identity changes (vaul → reka). The `showOverlay:false` live-behind
// opt-out is the content's `v-if` over this overlay (no paint, page-interactive).
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '../../../utils'

const props = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogOverlay v-bind="delegatedProps" :class="cn('fixed inset-0 z-overlay bg-overlay-scrim-strong [backdrop-filter:var(--glass-blur-wash)]', props.class)" />
</template>
