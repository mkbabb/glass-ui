<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ContextMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
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
  <ContextMenuSubContent
    v-bind="forwarded"
    data-reveal="menu"
    :class="
      cn(
        'z-popover min-w-32 overflow-hidden rounded-panel border glass-floating p-1 text-popover-foreground glass-reveal',
        props.class,
      )
    "
  >
    <slot />
  </ContextMenuSubContent>
</template>
