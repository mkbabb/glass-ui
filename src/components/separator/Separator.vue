<script setup lang="ts">
import { type HTMLAttributes, computed, useAttrs, useId } from 'vue'
import { Separator, type SeparatorProps } from 'reka-ui'
import { cn } from '../_shared/class-names'

defineOptions({ inheritAttrs: false })

// BC.W-SEPARATOR-FIX — the labelled arm is a SPLIT-RULE flexbox, not an
// absolute label floated over a 1px line.
//
// The un-labelled separator is the reka `Separator` primitive's single warm
// hairline (`--separator-ink`, the BA.W-NO-GRAY warm rule — never grey
// `--border`). A LABELLED separator is the textbook `[rule] [label] [rule]`
// divider: a flex row (horizontal) / column (vertical) where the label is
// centered by the flexbox AT ITS NORMAL SIZE, between two rule segments that
// grow to fill (`flex-1`). The rule is genuinely two segments — so it reads as
// "─── or ───" on ANY host, glass or opaque, with NO absolute-occlusion trick
// (the retired floated-label design rode a single 1px line + a `bg-background`
// occluder behind the label, which fails on the rebuilt translucent material:
// the line bled through). The split-rule needs no occluder — the rules simply
// stop at the gap. The label keeps a small `bg-background` chip backplate (the
// sanctioned legibility-allowlist survivor) so the centered caption reads
// clearly over a busy glass/aurora host, but it is a label chip, not an
// occluder over a continuous line. reka's `Separator` carries
// `role="separator"` + `aria-orientation`;
// the labelled arm wraps it as `role="separator"` with the label as its
// accessible name.
const props = defineProps<
  SeparatorProps & {
    class?: HTMLAttributes['class']
    label?: string
  }
>()

const isVertical = computed(() => props.orientation === 'vertical')
const attrs = useAttrs()
const labelId = `${useId()}-label`

const delegatedProps = computed(() => {
  const {
    class: _class,
    label: _label,
    ...delegated
  } = props

  return delegated
})

const labelledAttrs = computed(() => {
  const {
    role: _role,
    'aria-orientation': _orientation,
    'aria-label': rawAriaLabel,
    'aria-labelledby': rawAriaLabelledby,
    ...rest
  } = attrs
  if (props.decorative) return { ...rest, role: 'none' }

  const ariaLabel = typeof rawAriaLabel === 'string' ? rawAriaLabel : undefined
  const ariaLabelledby = typeof rawAriaLabelledby === 'string' ? rawAriaLabelledby : undefined
  const labelledby = ariaLabelledby ?? (ariaLabel ? undefined : labelId)
  return {
    ...rest,
    role: 'separator',
    'aria-orientation': isVertical.value ? ('vertical' as const) : undefined,
    'aria-label': labelledby ? undefined : ariaLabel,
    'aria-labelledby': labelledby,
  }
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
    v-bind="labelledAttrs"
    data-slot="separator"
    :class="
      cn(
        'flex items-center',
        isVertical ? 'flex-col w-px h-full gap-2' : 'flex-row w-full gap-3',
        props.class,
      )
    "
  >
    <span :class="ruleClass" />
    <!-- The label chip carries a legible opaque backplate (the sanctioned
         legibility-allowlist survivor — a label floated between two rule
         segments must read clearly over ANY host, glass or paper, so it gets a
         small `bg-background` chip; this is the chip backplate, NOT the retired
         absolute-occlusion trick — the rule is genuinely two segments). -->
    <span :id="labelId" class="text-mono-caption text-muted-foreground bg-background shrink-0 px-1.5 rounded-sm">{{ props.label }}</span>
    <span :class="ruleClass" />
  </div>

  <!-- UN-LABELLED: the reka single hairline, warm-ink. -->
  <Separator
    v-else
    data-slot="separator"
    v-bind="{ ...$attrs, ...delegatedProps }"
    :class="
      cn(
        'shrink-0 bg-(--separator-ink)',
        isVertical ? 'w-px h-full' : 'h-px w-full',
        props.class,
      )
    "
  />
</template>
