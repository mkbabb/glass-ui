<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- The SubContent MUST portal (the same DropdownMenuPortal wrapper Content
       uses). DropdownMenuContent carries `max-h-[60vh] overflow-y-auto`; an
       un-portaled submenu paints INSIDE that scroll container and is clipped
       invisible — ARIA-expanded but pointer-unreachable. Portaling teleports the
       submenu to the body so it escapes the parent's scroll clip, matching how
       Content portals. -->
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      v-bind="forwarded"
      :class="cn('dropdown-sub-content z-popover min-w-32 overflow-hidden rounded-panel border glass-floating text-popover-foreground glass-reveal', props.class)"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
