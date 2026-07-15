<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui'

import { cn } from '../_shared/class-names'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- BD.W-CHIP-CONGRUENT-GLASS — the tag chip joins the ONE chip family: a warm-glass
       stadium LENS (`.glass-chip .glass-capsule .glass-capsule-hover`, composed read-
       only) instead of the prior flat `.control-surface` well. A tag is a persistent
       REMOVABLE chip (never a toggle — no `data-state="on"` flood fires), so it reads the
       `.glass-chip` IDLE register: the warm floor + the capsule rim/lift, congruent with
       ToggleChip/SelectableChip. The capsule owns the stadium radius (`--radius-pill` →
       half-height end-cap); the keyboard-selected state keeps the WARM `.focus-ring`
       box-shadow (AW.W26), NOT a cold ring. reka's roving-tabindex `data-[state=active]`
       BEHAVIOUR is untouched — only the paint it drives. -->
  <TagsInputItem v-bind="forwardedProps" :class="cn('glass-chip glass-capsule glass-capsule-hover flex h-6 items-center px-2.5 text-caption data-[state=active]:shadow-focus-ring', props.class)">
    <slot />
  </TagsInputItem>
</template>
