<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardPortal,
  useForwardProps,
} from 'reka-ui'
import { cn } from '../../../utils'
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis onto
// HoverCard (the half-threaded case: the golden φ --overlay-pad-* ladder already
// lands — KEPT byte-untouched; only the surface axis is gained). Default `glass`
// is byte-identical to the prior bare `glass-floating` plate.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(
  defineProps<HoverCardContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(),
  {
    sideOffset: 4,
    surface: 'glass',
  },
)

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="forwardedProps"
      :data-surface="props.surface"
      :class="
        cn(
          'z-hovercard w-64 rounded-panel border [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) text-popover-foreground outline-none glass-reveal',
          surfaceClass(props.surface, 'floating'),
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
