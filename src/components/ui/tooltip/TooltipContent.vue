<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../../../utils'
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder (tight tooltip anchor) onto the tooltip chip + token-
// back the bare `text-sm` onto `--tooltip-text` (the overlay golden uniformity +
// the class-3 type-literal close). Default `glass` is byte-identical to HEAD.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(), {
  sideOffset: 4,
  surface: 'glass',
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-surface="props.surface"
      data-reveal="tooltip"
      :class="cn(
        'z-tooltip overflow-hidden rounded-tooltip border text-popover-foreground glass-reveal',
        surfaceClass(props.surface, 'floating'),
        // The tooltip is a compact chip — a TIGHT inline anchor (--spacing(2) =
        // 0.5rem); the block axis lifts by sqrt-φ (`*1.272`). The bare `text-sm`
        // routes onto the `--tooltip-text` golden caption rung (`:root`-retunable).
        '[--overlay-pad-inline:--spacing(2)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) text-(length:--tooltip-text)',
        props.class,
      )"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
