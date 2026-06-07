<script setup lang="ts">
import type { ButtonHTMLAttributes, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '../../../utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
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
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    v-bind="hostAttrs"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
