<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui'
import { cn } from '../../_shared/class-names'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <!-- BC.W-DROPDOWN-FIX / DESHADCN census — the divider hairline reads the WARM
       ink, not the neutral shadcn `bg-muted` slab (the residual the census names
       for the select band). `color-mix(in srgb, var(--foreground) N%, transparent)`
       is the warm-hairline identity (re-tints under .dark via --foreground, the same
       seam the menu-section `--border-hairline` reads). Clean break, no alias. -->
  <SelectSeparator v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]', props.class)" />
</template>
