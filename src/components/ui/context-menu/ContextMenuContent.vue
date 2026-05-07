<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ContextMenuContent,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
  ContextMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'

const props = defineProps<ContextMenuContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ContextMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="forwarded"
      :class="cn(
        'z-popover min-w-32 overflow-hidden rounded-panel border bg-popover glass-floating p-1 text-popover-foreground shadow-md popover-animate slide-in-from-side',
        props.class,
      )"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
