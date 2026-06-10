<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui'
import { provideToggleGroupContext, type ToggleGroupRegister, type ToggleGroupVariants } from './toggleGroupContext'
import { cn } from '../../../utils'

const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
  /**
   * The MATERIAL register (E21/E23 — d-glassui M2). `register="glass"` moves
   * every item onto the control-glass chip tier (wash-rest, quiet-on-select)
   * without each call-site naming `variant="glass"`. An explicit `variant` wins.
   */
  register?: ToggleGroupRegister
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

provideToggleGroupContext({
  variant: props.variant,
  size: props.size,
  register: props.register,
})

const delegatedProps = computed(() => {
  // `register` is a glass-ui chrome-tier prop, NOT a reka ToggleGroupRoot prop —
  // strip it (alongside `class`) so it never leaks onto the forwarded DOM root.
  const { class: _, register: __, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot data-slot="toggle-group" v-bind="forwarded" :class="cn('flex items-center justify-center gap-1', props.class)">
    <slot />
  </ToggleGroupRoot>
</template>
