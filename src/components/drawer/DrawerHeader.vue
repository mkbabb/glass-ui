<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <!-- BB.W-CARD-PAD — the overlay-band golden padding ladder. The Drawer is a
       non-Card surface (the `.glass-drawer` recipe owns its base), so it mints its
       OWN self-contained overlay tokens (inline anchor 1rem; block lifts by sqrt-phi
       `*1.272`; the title gap is phi-squared-tight `/2.618`). `pb-0` drops the
       bottom pad so the header→content breath is owned by the body, not doubled. -->
  <div
    :class="
      cn(
        '[--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] [--card-pad-title-gap:calc(var(--overlay-pad-inline)/2.618)]',
        'grid gap-(--card-pad-title-gap) px-(--overlay-pad-inline) pt-(--overlay-pad-block) pb-0 text-center sm:text-left',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
