<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, injectToggleGroupRootContext, useForwardProps } from 'reka-ui'
import { toggleVariants } from '../toggle'
import { useOptionalToggleGroupContext, type ToggleGroupVariants } from './toggleGroupContext'
import { cn } from '../_shared/class-names'

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}>()

const context = useOptionalToggleGroupContext()

// BB.W-CONTROL-TOKENS (RADIO) — on the single-select arm the item is a radio,
// not a toggle. Read reka's own ToggleGroupRoot context (the re-exported
// `injectToggleGroupRootContext`): `isSingle` gates the role, `modelValue` is
// the live selection so `aria-checked` reflects the actual chosen item (never a
// static `false`). On the `multiple` arm both stay undefined → reka's native
// `aria-pressed` toggle-strip semantics survive untouched. The root carries
// `role="radiogroup"` in lockstep (ToggleGroup.vue). The wrapper reads reka's
// LIVE state rather than shadowing it — one source of truth for the selection.
// Pass `null` as the fallback so a bare `<ToggleGroupItem>` (no root provider)
// returns null rather than throwing — mirroring the optional glass-ui context.
const rootContext = injectToggleGroupRootContext(null)

const isSingle = computed(() => rootContext?.isSingle?.value === true)

const itemChecked = computed(() => {
  if (!isSingle.value) return undefined
  return rootContext?.modelValue?.value === props.value
})

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

// The single-select arm threads `role="radio"` + `aria-checked` (the live
// selection) AND suppresses reka's inner `aria-pressed` (invalid on a
// `role="radio"` per axe `aria-allowed-attr` — `aria-pressed: undefined` removes
// the attr) so the radio reads with `aria-checked` ALONE. The `multiple` (or
// unset) arm adds NEITHER, so reka's native toggle-strip `role`/`aria-pressed`
// survive untouched — the role-per-type discipline on the ONE wrapper. Merged
// into ONE bound object (two argument-less `v-bind`s trip the compiler).
const ariaAttrs = computed(() =>
  isSingle.value
    ? { role: 'radio', 'aria-checked': itemChecked.value, 'aria-pressed': undefined }
    : {},
)

const itemBindings = computed(() => ({
  ...forwardedProps.value,
  ...ariaAttrs.value,
}))
</script>

<template>
  <!-- BC.W-CONTROL-SMOOTH — the item INHERITS the toggle radius from `toggleVariants`:
       the base now resolves `rounded-pill` (the small-inline-control stadium register,
       not the prior square 10px `rounded-button`), the `outline` variant the glass-well
       `.control-surface`, and the surface legs the quick `transition-control` clock
       (--duration-control 0.12s). The `card` variant keeps `--radius-card` via the CVA
       compoundVariant (the large glass tile's 1rem squircle — untouched). No per-item
       fork — the one CVA edit re-rounds + re-times every ToggleGroupItem. -->
  <ToggleGroupItem
    v-bind="itemBindings"
    :class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
