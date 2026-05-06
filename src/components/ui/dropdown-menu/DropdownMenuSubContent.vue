<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@utils'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    :class="cn('dropdown-sub-content z-popover min-w-32 overflow-hidden rounded-panel border glass-floating p-1 text-popover-foreground popover-animate slide-in-from-side', props.class)"
  >
    <slot />
  </DropdownMenuSubContent>
</template>

<style scoped>
.dropdown-sub-content {
    font-family: var(--dropdown-menu-font, inherit);
}
</style>
