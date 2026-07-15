<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../_shared/class-names'
// BI.W-MENU-TRIGGER — the trigger axis switches the reka SubContent + Portal family.
import { useMenuPart } from './useMenuTrigger'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const SubContentComp = useMenuPart('SubContent')
const PortalComp = useMenuPart('Portal')
</script>

<template>
  <!-- The SubContent MUST portal (the same Portal wrapper Content uses).
       DropdownMenuContent carries `max-h overflow-y-auto`; an un-portaled submenu
       paints INSIDE that scroll container and is clipped invisible — ARIA-expanded but
       pointer-unreachable. Portaling teleports the submenu to the body so it escapes the
       parent's scroll clip, matching how Content portals (both trigger families). -->
  <component :is="PortalComp">
    <component
      :is="SubContentComp"
      v-bind="forwarded"
      data-reveal="menu"
      :class="cn('dropdown-sub-content z-popover min-w-32 overflow-hidden rounded-panel border glass-floating text-popover-foreground glass-reveal', props.class)"
    >
      <slot />
    </component>
  </component>
</template>
