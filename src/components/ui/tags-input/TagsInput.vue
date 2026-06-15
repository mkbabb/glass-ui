<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'

const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- AX.W54 — GLASS-FIRST. BA.W-SURFACE-AXIS scope 7 — re-pointed onto the SHARED
       `--control-surface-*` REST register (the same Input/Textarea/NumberField/
       Select read) so the whole form family is ONE material at rest. The flex-wrap
       multi-line layout (auto height + `rounded-input`) is why this mirrors the
       recipe inline instead of composing `.input-pill` (which hardcodes a
       single-line `height: 2.5rem` + pill radius) — it reads the shared tokens, not
       the pill class. -->
  <TagsInputRoot data-slot="tags-input" v-bind="forwarded" :class="cn('flex flex-wrap gap-2 items-center rounded-input border border-(--control-surface-border) bg-(--control-surface-bg) [backdrop-filter:var(--control-surface-blur)] px-3 py-2 text-sm', props.class)">
    <slot />
  </TagsInputRoot>
</template>
