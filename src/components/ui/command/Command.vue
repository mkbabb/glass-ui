<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
// BA.W-SURFACE-AXIS — Command CONSUMES the shared {glass·veil·opaque} axis (the
// IG-C4 residual: the plate is already `glass-floating`; `surface="veil"` lands
// the busy-substrate legibility feather — the SAME --veil-feather axis the floating
// feedback band rides).
import { decorationClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class']; surface?: Surface }>(), {
  open: true,
  modelValue: '',
  surface: 'glass',
})

const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// BA.W-SURFACE-AXIS — the veil/opaque decoration over the baked `glass-floating`
// plate. BI.W-SURFACE-EXTRACT — decoration-only, no `.replace` tier-strip wart;
// `:data-surface` drives the seam.
const surfaceDecoration = computed(() =>
  decorationClass(props.surface),
)
</script>

<template>
  <!-- AW.W25 — the overlay-band material carve: Command joins the shared
       `glass-floating` substrate every overlay sibling already uses, retiring the
       flat `bg-popover`. -->
  <ComboboxRoot
    data-slot="command"
    v-bind="forwarded"
    :data-surface="props.surface"
    :class="cn('glass-floating flex h-full w-full flex-col overflow-hidden rounded-panel text-popover-foreground', surfaceDecoration, props.class)"
  >
    <slot />
  </ComboboxRoot>
</template>
