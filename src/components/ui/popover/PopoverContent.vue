<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import { useOptionalDockContext } from "../../custom/dock/composables/dockContext"
// BA.W-SURFACE-AXIS — Popover gains the SHARED {glass·veil·opaque} surface axis
// (the floating-band sibling had no surface variant). The veil rung lands the
// busy-substrate legibility feather; the opaque rung the solid-card escape.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes['class']; portal?: boolean; surface?: Surface }>(),
  {
    align: 'center',
    sideOffset: 4,
    portal: true,
    surface: 'glass',
  },
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, portal: __, surface: ___, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = useOptionalDockContext()

// BA.W-SURFACE-AXIS — the veil/opaque decoration on top of the baked
// `glass-floating` tier (strip the resolver's base-tier prefix). The
// `:data-surface` attr drives the CSS seam in lockstep.
const surfaceDecoration = computed(() =>
  surfaceClass(props.surface).replace(/^glass-\w+\s*/, ''),
)
</script>

<template>
  <PopoverPortal v-if="portal">
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :data-surface="props.surface"
      :class="
        cn(
          'popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal',
          surfaceDecoration,
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
  <PopoverContent
    v-else
    v-bind="{ ...forwarded, ...$attrs }"
    :data-glass-dock-portal="dockContext?.id ? '' : undefined"
    :data-glass-dock-owner="dockContext?.id"
    :data-surface="props.surface"
    :class="
      cn(
        'popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal',
        surfaceDecoration,
        props.class,
      )
    "
  >
    <slot />
  </PopoverContent>
</template>
