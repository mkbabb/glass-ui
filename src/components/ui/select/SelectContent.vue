<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'reka-ui'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'
import { cn } from '../../../utils'
import { useOptionalDockContext } from "../../custom/dock/composables/dockContext"
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder onto the Select listbox (the overlay golden uniformity).
// Default `glass` is byte-identical to the prior bare `glass-floating` plate.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class']; surface?: Surface }>(),
  {
    position: 'popper',
    // BC.W-DROPDOWN-FIX — the panel's left edge tracks the trigger's left edge
    // (the inspector-idiom alignment), not a centred narrow box floating off-axis.
    // With `position: 'popper'` reka exposes `--reka-select-trigger-width`; the
    // viewport's `min-w-(--reka-select-trigger-width)` floor makes `align: start`
    // drop the panel flush-left under the trigger AT its width — one continuous
    // control. Clean break (no `align-legacy`): a consumer wanting centre passes
    // `align="center"` explicitly (the prop survives; only the DEFAULT flips).
    align: 'start',
    collisionPadding: 16,
    surface: 'glass',
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, surface: __, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = useOptionalDockContext()
</script>

<template>
  <SelectPortal>
    <!--
      BA.W-EMISSION (BA-VJS-A2-WO1/WO2): the collision-bound moved OUT of the dead
      arbitrary-bracket class `[max-height:var(--reka-popper-available-height,60dvh)]`
      (which compiled only into a dist/*.js chunk no consumer content-scan reaches)
      into the PRECOMPILED `[data-slot="select-content"]` rule in src/styles/select.css
      — it now SHIPS in dist/glass-ui.css regardless of consumer JIT reach, so a 16-item
      dropdown bounds inside the viewport with inner scroll in EVERY consumer. The
      `origin-(--reka-select-content-transform-origin)` STAYS (WO-2): once the box is
      bounded the `.glass-reveal` spring-clocked scale-in (BB.W-LIQUID-REVEAL, off the
      retired `popover-animate` bezier zoom-95) no longer sweeps an unbounded column,
      and the scale origin tracks reka's measured anchor edge for non-center triggers
      (the panel blooms from the trigger edge with no lateral settle).
    -->
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      :data-surface="props.surface"
      data-slot="select-content"
      :class="cn(
        'relative z-popover min-w-(--overlay-min-width) overflow-y-auto rounded-panel border text-popover-foreground glass-reveal origin-(--reka-select-content-transform-origin)',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        surfaceClass(props.surface, 'floating'),
        '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('px-(--overlay-pad-inline) py-(--overlay-pad-block) overflow-y-auto', position === 'popper' && 'h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
