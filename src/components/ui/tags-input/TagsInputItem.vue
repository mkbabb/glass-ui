<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui'

import { cn } from '../../../utils'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <!-- BC.W-CONTROL-SMOOTH (DESHADCN census, reskin-target) — the tag chip was the ONLY
       live cold shadcn focus halo in ui/: `bg-secondary` slab + `data-[state=active]:
       ring-ring ring-2 ring-offset-2 ring-offset-background`. Re-pointed onto the house
       registers: the chip surface → `.control-surface` (the warm glass-WELL material +
       rim, no `bg-secondary` slab); the active (keyboard-selected) state → the WARM
       `.focus-ring` box-shadow `--focus-ring-shadow` (AW.W26), NOT the cold `ring-ring` +
       offset gap; the corner → `rounded-pill` (a chip is a small control — the stadium
       register, not the 4px square `rounded`). reka's roving-tabindex `data-[state=
       active]` BEHAVIOUR is untouched — only the paint it drives. This retires the
       ring-ring/ring-2/ring-offset residual (proof:no-shadcn-default) + re-earns
       proof:ba-gestalt. -->
  <TagsInputItem v-bind="forwardedProps" :class="cn('control-surface flex h-6 items-center rounded-pill px-2 data-[state=active]:shadow-[var(--focus-ring-shadow)]', props.class)">
    <slot />
  </TagsInputItem>
</template>
