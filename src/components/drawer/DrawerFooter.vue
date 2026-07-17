<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '../_shared/class-names'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <!-- The overlay-band golden padding ladder. The Drawer is a
       non-Card surface, so it mints its OWN self-contained overlay tokens (inline
       anchor 1rem; block lifts by sqrt-phi `*1.272`; the footer gap is phi-stepped
       `/1.618` — the settling cadence). `pt-(--card-pad-footer)` is the tight
       settling gap above the actions; `pb-(--overlay-pad-block)` the lifted bottom. -->
  <div
    :class="
      cn(
        '[--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] [--card-pad-footer:calc(var(--overlay-pad-block)/1.618)]',
        'mt-auto flex flex-col gap-2 px-(--overlay-pad-inline) pt-(--card-pad-footer) pb-(--overlay-pad-block)',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
