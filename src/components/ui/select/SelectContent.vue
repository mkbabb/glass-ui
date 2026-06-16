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

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
    align: 'center',
    collisionPadding: 16,
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

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
      bounded the `zoom-in-95` (popover-animate) enter no longer sweeps an unbounded
      column, and the scale origin tracks reka's measured anchor edge for non-center
      triggers (the panel grows from the trigger edge with no lateral settle).
    -->
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :data-glass-dock-portal="dockContext?.id ? '' : undefined"
      :data-glass-dock-owner="dockContext?.id"
      data-slot="select-content"
      :class="cn(
        'relative z-popover min-w-32 overflow-y-auto rounded-panel border text-popover-foreground popover-animate origin-(--reka-select-content-transform-origin)',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        'glass-floating',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('p-1 overflow-y-auto', position === 'popper' && 'h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
