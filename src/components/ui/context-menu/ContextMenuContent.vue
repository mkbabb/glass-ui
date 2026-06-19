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
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder (menu-row anchor) onto the context menu (the overlay
// golden uniformity). Default `glass` is byte-identical to HEAD.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

const props = withDefaults(
  defineProps<ContextMenuContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(),
  {
    surface: 'glass',
  },
)
const emits = defineEmits<ContextMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="forwarded"
      :data-surface="props.surface"
      :class="cn(
        'z-popover min-w-(--overlay-min-width) overflow-hidden rounded-panel border text-popover-foreground glass-reveal',
        surfaceClass(props.surface, 'floating'),
        // The prior `p-1` menu-row gutter onto the φ --overlay-pad-* ladder (the
        // tight menu inline anchor --spacing(1) = 0.25rem = the old p-1, block
        // lifted by sqrt-φ) so a `:root --overlay-pad-inline` override retunes it
        // in lockstep with every overlay.
        '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)',
        props.class,
      )"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
