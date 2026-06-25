<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui'
import { provideToggleGroupContext, type ToggleGroupVariants } from './toggleGroupContext'
import { cn } from '../../../utils'

const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

provideToggleGroupContext({
  variant: props.variant,
  size: props.size,
})

// BB.W-CONTROL-TOKENS (RADIO) — a `type="single"` group is semantically a
// single-select chooser (a radio group); reka renders `role="group"` + items
// as `aria-pressed` toggles in BOTH modes, so a screen reader announces N
// independent toggles, not "1 of N selected". On the single-select arm the
// wrapper routes `role="radiogroup"`; `<ToggleGroupItem>` carries the per-item
// `role="radio"`/`aria-checked` (reading the live reka selection). The
// `multiple` (or unset) arm keeps `role="group"` — reka's native toggle-strip
// semantic — and the items keep reka's `aria-pressed`. The role-per-type
// discipline lives on the ONE wrapper, never a fork.
//
// reka hardcodes `role="group"` on its inner Primitive, and its Slot merges the
// CHILD's props OVER the incoming attrs (`mergeProps(attrs, child.props)`), so a
// `:role` fall-through attr on `<ToggleGroupRoot>` LOSES to reka's group. The
// idiomatic override is `as-child` over our OWN root element: reka merges its
// roving-focus/dir/tabindex props onto OUR div whose explicit `:role` wins.
const groupRole = computed(() =>
  props.type === 'single' ? 'radiogroup' : 'group',
)

// BD.W-CHIP-CONGRUENT-GLASS — congruence-by-inheritance. An EXCLUSIVE
// (`type="single"`) group is a segmented control: its chips sit in a RECESSED
// warm channel — the SHARED `.glass-capsule-track` (the tabs-extract sunken well,
// composed read-only, never re-forked). The multi-select arm keeps the bare flex
// row (each chip carries its own punch — no traveling indicator). The gliding
// `useTabIndicator` indicator is a DEFERRED follow-on (the tabs convergence); the
// base group earns the well by inheritance with ZERO chip-specific work. A
// recessed track needs inset padding so the chips do not paint over its rim.
const groupTrack = computed(() =>
  props.type === 'single'
    ? 'glass-capsule-track rounded-pill p-1'
    : '',
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" as-child>
    <div data-slot="toggle-group" :role="groupRole" :class="cn('flex items-center justify-center gap-1', groupTrack, props.class)">
      <slot />
    </div>
  </ToggleGroupRoot>
</template>
