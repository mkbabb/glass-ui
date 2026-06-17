<script setup lang="ts">
import type { ButtonHTMLAttributes, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '../../../utils'
import type { Surface } from '../_shared/useSurfaceAxis'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  // BB.W-SURFACE-AXIS-COMPLETE — the shared {glass·veil·opaque} surface-decoration
  // axis (the R8-12 "buttons" close), threaded as the ORTHOGONAL cross-cutting
  // decoration on TOP of the `variant` register (default UNSET — `variant` owns
  // Button's default). The `:data-surface` binding (the Card attr path) reaches the
  // `surface-axis.css` veil/opaque rules: `surface="veil"` strips the rim into a
  // borderless glass plate, `surface="opaque"` rides the `--glass-level:0` escape.
  // `surface="opaque"` and the `solid` variant are the same `--glass-level:0`
  // endpoint reached from two axes — NOT duplicated recipes; `surface` is the
  // cross-cutting one the variant cannot reach.
  surface?: Surface
  // Element-specific <button> attributes forwarded to the rendered host. reka's
  // Primitive only types `as`/`as-child`, so these are spread through `$attrs`
  // (see `hostAttrs`) rather than bound on <Primitive> directly.
  type?: ButtonHTMLAttributes['type']
  disabled?: ButtonHTMLAttributes['disabled']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})

const hostAttrs = computed(() => ({
  type: props.type,
  disabled: props.disabled,
}))

// BB.W-SURFACE-AXIS-COMPLETE — the surface DECORATION composed alongside
// `buttonVariants`. Button owns its base register on the `variant` axis, so the
// shared axis is the cross-cutting `[data-surface]` attr (the load-bearing thread
// the `surface-axis.css` rules read) plus the bare decoration class (`veil-surface`
// / `glass-opaque`) — NOT a forced `glass-${tier}` base, which would clobber the
// variant. `surface` UNSET (the default) emits nothing — `variant` paints alone.
const surfaceDecoration = computed(() => {
  if (props.surface === 'veil') return 'veil-surface'
  if (props.surface === 'opaque') return 'glass-opaque'
  return undefined
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-surface="surface"
    v-bind="hostAttrs"
    :class="cn(buttonVariants({ variant, size }), surfaceDecoration, props.class)"
  >
    <slot />
  </Primitive>
</template>
