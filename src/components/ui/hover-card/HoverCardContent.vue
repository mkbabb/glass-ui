<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardPortal,
  useForwardProps,
} from 'reka-ui'
import { cn } from '../../../utils'

const props = withDefaults(
  defineProps<HoverCardContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4,
  },
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="forwardedProps"
      :class="
        cn(
          'z-hovercard w-64 rounded-panel border glass-floating p-4 text-popover-foreground outline-none popover-animate slide-in-from-side',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
