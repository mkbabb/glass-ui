<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import { useOptionalDockContext } from "../../custom/dock/composables/dockContext"
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis +
// the φ --overlay-pad-* ladder onto the dropdown (the overlay golden uniformity).
// Default `glass` is byte-identical to the prior bare `glass-floating` plate.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(),
  {
    sideOffset: 4,
    surface: 'glass',
  },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = useOptionalDockContext()
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="forwarded"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :data-surface="props.surface"
      :class="cn(
        'dropdown-menu-content z-popover min-w-(--overlay-min-width) max-h-(--overlay-max-block) overflow-y-auto rounded-panel border text-popover-foreground glass-reveal',
        surfaceClass(props.surface, 'floating'),
        // The menu rows own their type/state padding via `menuItemVariants`; the
        // content carries the φ --overlay-pad-* ladder (the tight menu inline
        // anchor) so the row gutter breathes on the golden sqrt-φ cadence and a
        // `:root --overlay-pad-inline` override retunes it in lockstep with every
        // overlay.
        '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)',
        props.class,
      )"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
