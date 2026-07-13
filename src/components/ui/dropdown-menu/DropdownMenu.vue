<script setup lang="ts">
import { computed } from 'vue'
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import { provideMenuTrigger, useMenuPart, type MenuTrigger } from './useMenuTrigger'

// BI.W-MENU-TRIGGER — the Menu family's `trigger` axis (ContextMenu folded onto Menu).
// `trigger="click"` (default) is the button-anchored dropdown; `trigger="context"` is
// the right-click / long-press anchored menu (the reka ContextMenu substrate). ONE menu
// engine — roving-focus + typeahead + `menuItemVariants` are identical; the trigger only
// switches the anchoring family.
const props = withDefaults(
  defineProps<DropdownMenuRootProps & { trigger?: MenuTrigger }>(),
  { trigger: 'click' },
)
const emits = defineEmits<DropdownMenuRootEmits>()

provideMenuTrigger(computed(() => props.trigger))

const RootComp = useMenuPart('Root')

// The context-menu root anchors at the pointer — it has NO `open`/`defaultOpen`
// (those are the click-dropdown's controlled-open props). Forward only the props the
// target root accepts; both families share `dir`/`modal` + the `update:open` emit
// (re-emitted below so `v-model:open` round-trips in both trigger modes).
const rootProps = computed(() =>
  props.trigger === 'context'
    ? { dir: props.dir, modal: props.modal }
    : { open: props.open, defaultOpen: props.defaultOpen, dir: props.dir, modal: props.modal },
)
</script>

<template>
  <component
    :is="RootComp"
    data-slot="dropdown-menu"
    :data-menu-trigger="trigger"
    v-bind="rootProps"
    @update:open="emits('update:open', $event)"
  >
    <slot />
  </component>
</template>
