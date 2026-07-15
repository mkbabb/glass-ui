<script setup lang="ts">
import { computed } from 'vue'
import {
  injectDropdownMenuRootContext,
  type DropdownMenuTriggerProps,
  useForwardProps,
} from 'reka-ui'
import { useMenuPart, useMenuTrigger } from './useMenuTrigger'

// BI.W-MENU-TRIGGER — anchors the menu. `trigger="click"` renders the reka
// DropdownMenuTrigger (a button anchor); `trigger="context"` renders the reka
// ContextMenuTrigger (the right-click / long-press surface). Same props (disabled/
// asChild/as) across both families.
export type DropdownMenuTriggerAction = 'click' | 'pointerdown'

const props = withDefaults(
  defineProps<DropdownMenuTriggerProps & { action?: DropdownMenuTriggerAction }>(),
  { action: 'click' },
)

const delegatedProps = computed(() => {
  const { action: _, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
const menuTrigger = useMenuTrigger()
const TriggerComp = useMenuPart('Trigger')
const root = injectDropdownMenuRootContext(null)

let suppressTrailingClick = false

function onPointerDown(event: PointerEvent): void {
  if (
    props.action !== 'pointerdown'
    || menuTrigger.value !== 'click'
    || !root
    || props.disabled
    || event.button !== 0
    || event.ctrlKey
  ) return

  suppressTrailingClick = true
  root.onOpenToggle()
  if (root.open.value) event.preventDefault()
}

function onClickCapture(event: MouseEvent): void {
  if (!suppressTrailingClick) return
  suppressTrailingClick = false
  if (event.detail === 0) return
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <component
    :is="TriggerComp"
    class="outline-none"
    v-bind="forwardedProps"
    @pointerdown.capture="onPointerDown"
    @pointercancel.capture="suppressTrailingClick = false"
    @click.capture="onClickCapture"
  >
    <slot />
  </component>
</template>
