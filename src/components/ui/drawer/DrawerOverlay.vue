<script lang="ts" setup>
// BB.W-DRAWER-ABROGATE — the scrim on the HOUSE reka `DialogOverlay` (off vaul's).
// The scrim utility classes are PRESERVED byte-for-byte; only the underlying
// component identity changes (vaul → reka). The `showOverlay:false` live-behind
// opt-out is the content's `v-if` over this overlay (no paint, page-interactive).
import { DialogOverlay, type DialogOverlayProps } from 'reka-ui'
import { type HtmlHTMLAttributes, computed } from 'vue'
import { cn } from '../../_shared/class-names'

const props = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <!-- BD.W-OVERLAY-STAGE-COUPLE — the scrim DEEPENS with the detent (coupling B). The
       `data-stage-scrim` attr routes the α onto the `--stage-t`-tracked recipe
       (drawer.css) off the fixed `bg-overlay-scrim-strong` — a peek drawer barely
       dims, a full drawer commits hard. The warm `--overlay-scrim-ink` hue is kept
       (warm, never flat black); only the α is now t-coupled. The wash blur stays the
       resting floor; the `immersive` engage (coupling D) ramps a deeper backdrop-blur
       one-shot when `data-stage-immersive` is gated on (Drawer.vue). -->
  <DialogOverlay
    v-bind="delegatedProps"
    data-stage-scrim
    :class="cn('fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]', props.class)"
  />
</template>
