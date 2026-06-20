<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Separator, type SeparatorProps } from 'reka-ui'
import { cn } from '../../../utils'

// BC.W-SEPARATOR-FIX — the labelled arm is a SPLIT-RULE flexbox, not an
// absolute label floated over a 1px line.
//
// The un-labelled separator is the reka `Separator` primitive's single warm
// hairline (`--separator-ink`, the BA.W-NO-GRAY warm rule — never grey
// `--border`). A LABELLED separator is the textbook `[rule] [label] [rule]`
// divider: a flex row (horizontal) / column (vertical) where the label is
// centered by the flexbox AT ITS NORMAL SIZE, between two rule segments that
// grow to fill (`flex-1`). The rule is genuinely two segments — so it reads as
// "─── or ───" on ANY host, glass or opaque, with NO `bg-background` occlusion
// trick (which fails on the rebuilt translucent material: the line bled through
// the label). reka's `Separator` carries `role="separator"` + `aria-orientation`;
// the labelled arm wraps it as `role="separator"` with the label as its
// accessible name.
const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'], label?: string }
>()

const isVertical = computed(() => props.orientation === 'vertical')

const delegatedProps = computed(() => {
  const { class: _class, label: _label, ...delegated } = props

  return delegated
})

// The rule-segment class (one axis painted, the warm hairline ink).
const ruleClass = computed(() =>
  cn(
    'shrink-0 bg-(--separator-ink)',
    isVertical.value ? 'w-px flex-1' : 'h-px flex-1',
  ),
)
</script>

<template>
  <!-- LABELLED: the split-rule flexbox. role="separator" on the wrapper; the
       visible label is the accessible name. -->
  <div
    v-if="props.label"
    data-slot="separator"
    role="separator"
    :aria-orientation="isVertical ? 'vertical' : 'horizontal'"
    :aria-label="props.label"
    :class="
      cn(
        'flex items-center',
        isVertical ? 'flex-col w-px h-full gap-2' : 'flex-row w-full gap-3',
        props.class,
      )
    "
  >
    <span :class="ruleClass" />
    <span class="text-mono-caption text-muted-foreground shrink-0">{{ props.label }}</span>
    <span :class="ruleClass" />
  </div>

  <!-- UN-LABELLED: the reka single hairline, warm-ink. -->
  <Separator
    v-else
    data-slot="separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'shrink-0 bg-(--separator-ink)',
        isVertical ? 'w-px h-full' : 'h-px w-full',
        props.class,
      )
    "
  />
</template>
