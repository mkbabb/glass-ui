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
import SelectScrollDownButton from './SelectScrollDownButton.vue'
import SelectScrollUpButton from './SelectScrollUpButton.vue'
import { cn } from '../_shared/class-names'
import { useOptionalDockContext } from "../dock/composables/dockContext"
// BC.W-OVERLAY-UNIFORM — thread the SHARED {glass·veil·opaque} surface axis + the
// φ --overlay-pad-* ladder onto the Select listbox (the overlay golden uniformity).
// Default `glass` is byte-identical to the prior bare `glass-floating` plate.
import { surfaceClass, type Surface } from '../_shared/useSurfaceAxis'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & {
    class?: HTMLAttributes['class']
    surface?: Surface
    /**
     * BD.W-SELECT-WELL — the route's warm-field HUE re-emitted onto the portalled
     * menu so it transmits its route identity even though it escapes to <body>
     * (the page field stops at the route root; the portal does not). The menu-local
     * `.glass-field-portal` spine reads this `--field-h`. A forms route resolves 48
     * (terracotta); a feedback route a different warm hue — so each dropdown reads as
     * different warm glass, none gray. Unset → the select.css `--field-h: 48` floor.
     */
    fieldHue?: number
  }>(),
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
  const { class: _, surface: __, fieldHue: ___, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const dockContext = useOptionalDockContext()

// BD.W-SELECT-WELL — re-emit the route's warm-field hue onto the portalled menu.
// Only writes `--field-h` when the consumer supplies it (a bare Select inherits the
// select.css `--field-h: 48` floor); `data-field-palette` is a paint-inert marker.
const fieldStyle = computed(() =>
  props.fieldHue != null ? { '--field-h': String(props.fieldHue) } : undefined,
)
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
      data-material="transient-overlay"
      data-reveal="menu"
      data-slot="select-content"
      :class="cn(
        'relative z-popover min-w-(--overlay-min-width) overflow-y-auto rounded-panel border text-popover-foreground glass-reveal origin-(--reka-select-content-transform-origin)',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        surfaceClass(props.surface, 'floating'),
        // BD.W-SELECT-WELL — the portal escapes the route's field to <body>, so the
        // menu carries its OWN clipped warm field. `.glass-field-portal` (select.css)
        // paints a 3-stop warm spine keyed to `--field-h` BEHIND the plate so the
        // floating `backdrop-filter` finally has warm chroma to bend (the un-gray
        // amplifier — the floor in select.css is the guarantee). The route re-emits
        // its own `--field-h` via the `:style` below; absent that it floors to 48
        // (forms terracotta) so a bare Select still reads warm.
        'glass-field-portal',
        '[--overlay-pad-inline:--spacing(1)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]',
        props.class,
      )
      "
      :style="fieldStyle"
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('px-(--overlay-pad-inline) py-(--overlay-pad-block) overflow-y-auto', position === 'popper' && 'h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
