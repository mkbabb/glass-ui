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
  <!-- AX.W54 — GLASS-FIRST. Mirrors the `.input-pill` glass family its
       siblings (Input/Textarea/NumberField) carry — the quiet-tier glass
       background + 10px blur — rather than the opaque `bg-background`. The
       flex-wrap multi-line layout (auto height + `rounded-input`) is why this
       mirrors the recipe inline instead of composing `.input-pill` (which
       hardcodes a single-line `height: 2.5rem` + pill radius). -->
  <TagsInputRoot data-slot="tags-input" v-bind="forwarded" :class="cn('flex flex-wrap gap-2 items-center rounded-input border border-input bg-[var(--glass-bg-quiet)] [backdrop-filter:var(--glass-blur-quiet)] px-3 py-2 text-sm', props.class)">
    <slot />
  </TagsInputRoot>
</template>
