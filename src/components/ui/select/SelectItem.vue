<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'reka-ui'
import { cn } from '../../../utils'
import { menuItemVariants } from '../_shared/menuItemVariants'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class']; hideIndicator?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, hideIndicator: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

// BC.W-DROPDOWN-FIX — the dot-render and its 28px gutter are STRUCTURALLY coupled
// through ONE resolved value: when `indicator !== 'none'` the row reserves the
// `pl-7` gutter (menuItemVariants `indicator: 'start'`) AND paints the dot; when
// `'none'` it reserves no gutter AND paints no dot. The defect was a dot painted
// over the label with NO reserved space (live `padding-left: 0px`) — impossible
// now: the `<span>` renders IFF the gutter is reserved. `hideIndicator` collapses
// BOTH legs together.
const indicator = computed<'start' | 'none'>(() =>
  props.hideIndicator ? 'none' : 'start',
)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        menuItemVariants({ indicator }),
        props.class,
      )
    "
  >
    <!-- The selected-state DOT renders IFF the gutter is reserved (indicator !==
         'none') — never painted without its 28px `pl-7` lane, so it can never
         occlude the label. It is DECORATIVE (`aria-hidden`): the a11y selected
         state is reka's `aria-selected` on the role="option" row, not this paint
         (the AN.W4 decorative-glyph discipline). -->
    <span v-if="indicator !== 'none'" aria-hidden="true" class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <!-- BD.W-SELECT-WELL — the selected dot keys to the warm `--glass-accent`
             axis (the SAME chromatic axis cards/tabs/the row-chip read) so the
             selected dot + the warm-accent row read as ONE warm event, not a gray
             tick. `--select-dot-color` stays the consumer override; its default
             now resolves the accent (falling to currentColor when `--glass-accent`
             is the neutral transparent identity). The dot stays aria-hidden
             decorative — reka's `aria-selected` is the a11y truth (untouched). -->
        <span class="inline-block w-2 h-2 rounded-pill" style="background-color: var(--select-dot-color, var(--glass-accent, currentColor))"></span>
      </SelectItemIndicator>
    </span>

    <div class="flex flex-col gap-0.5 min-w-0">
      <SelectItemText>
        <slot />
      </SelectItemText>
      <slot name="description" />
    </div>
  </SelectItem>
</template>
