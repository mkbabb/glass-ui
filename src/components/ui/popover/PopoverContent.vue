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
const dockContext = useOptionalDockContext()
</script>

<template>
  <PopoverPortal v-if="portal">
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :class="
        cn(
          'popover-content z-popover w-72 glass-floating p-4 popover-animate slide-in-from-side',
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
        'popover-content z-popover w-72 glass-floating p-4 popover-animate slide-in-from-side',
        props.class,
      )
    "
  >
    <slot />
  </PopoverContent>
</template>
