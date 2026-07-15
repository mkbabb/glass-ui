<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../_shared/class-names'
import { useOptionalDockContext } from "../dock/composables/dockContext"
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis +
// the φ --overlay-pad-* ladder onto the dropdown (the overlay golden uniformity).
// Default `glass` is byte-identical to the prior bare `glass-floating` plate.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka Content + Portal family.
import { useMenuPart, useMenuTrigger } from './useMenuTrigger'

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(),
  {
    sideOffset: 4,
    // BC.W-DROPDOWN-FIX — mirror the Select default: the panel's left edge tracks
    // the trigger's left edge (one alignment grammar across the picker family).
    // At HEAD the `align` was unset so reka's `center` default applied (the
    // off-axis float); `align: 'start'` drops the menu flush-left under the
    // trigger. Clean break — a consumer wanting centre passes `align="center"`.
    align: 'start',
    surface: 'glass',
  },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const trigger = useMenuTrigger()
const ContentComp = useMenuPart('Content')
const PortalComp = useMenuPart('Portal')

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props
  // A context menu anchors at the pointer — the DropdownMenu-only positioning props
  // (side/align/sideOffset/arrowPadding/updatePositionStrategy) are not on the reka
  // ContextMenuContent surface; forward them only on the click branch.
  if (trigger.value === 'context') {
    const {
      side: _s,
      sideOffset: _so,
      align: _a,
      arrowPadding: _ap,
      updatePositionStrategy: _up,
      ...ctx
    } = delegated
    return ctx
  }
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = useOptionalDockContext()
</script>

<template>
  <component :is="PortalComp">
    <component
      :is="ContentComp"
      v-bind="forwarded"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :data-surface="props.surface"
      data-reveal="menu"
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
    </component>
  </component>
</template>
