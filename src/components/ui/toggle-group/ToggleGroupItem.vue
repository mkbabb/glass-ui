<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui'
import { toggleVariants } from '../toggle'
import { useOptionalToggleGroupContext, type ToggleGroupRegister, type ToggleGroupVariants } from './toggleGroupContext'
import { cn } from '../../../utils'

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
  /** Per-item material register override (E21/E23). Group `register` propagates by default. */
  register?: ToggleGroupRegister
}>()

const context = useOptionalToggleGroupContext()

/* E21/E23 — resolve the item's toggle variant. Precedence: an EXPLICIT `variant`
   (item, then group) wins; otherwise the MATERIAL register (`register="glass"`,
   item then group) resolves to `variant: "glass"`. So `<ToggleGroup register="glass">`
   frosts every item without a per-item `variant`, while a call-site that names a
   `variant` keeps it. */
const resolvedVariant = computed<ToggleGroupVariants['variant']>(() => {
  const explicit = props.variant ?? context?.variant
  if (explicit) return explicit
  const register: ToggleGroupRegister | undefined = props.register ?? context?.register
  return register === 'glass' ? 'glass' : undefined
})

const delegatedProps = computed(() => {
  // `register` is a glass-ui chrome-tier prop, not a reka ToggleGroupItem prop —
  // strip it (with `variant`/`size`/`class`) so it never leaks onto the DOM root.
  const { class: _, variant: __, size: ___, register: ____, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps" :class="cn(toggleVariants({
      variant: resolvedVariant,
      size: context?.size || props.size,
    }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
