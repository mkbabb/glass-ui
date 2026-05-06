<script setup lang="ts">
import { type HTMLAttributes, computed, inject } from 'vue'
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes['class']; portal?: boolean }>(),
  {
    align: 'center',
    sideOffset: 4,
    portal: true,
  },
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, portal: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = inject<{ id: string } | null>("glassDockContext", null)
</script>

<template>
  <PopoverPortal v-if="portal">
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :class="
        cn(
          'z-popover w-72 rounded-panel border glass-floating p-4 text-popover-foreground shadow-md outline-none popover-animate slide-in-from-side',
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
    :class="
      cn(
        'z-popover w-72 rounded-panel border glass-floating p-4 text-popover-foreground shadow-md outline-none popover-animate slide-in-from-side',
        props.class,
      )
    "
  >
    <slot />
  </PopoverContent>
</template>
