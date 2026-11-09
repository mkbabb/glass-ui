<script lang="ts">
import type { Direction } from "../_shared/primitive";

export interface ContextMenuProps {
    /** Logical reading direction for roving focus and submenu keys. */
    dir?: Direction;
    /** Whether opening the menu makes outside content inert (and locks page scroll).
     *  Default `false`. */
    modal?: boolean;
}

export interface ContextMenuEmits {
    "update:open": [value: boolean];
}
</script>

<script setup lang="ts">
import { ContextMenuRoot as RekaContextMenuRoot } from "reka-ui";
import { provideMenuFamily } from "./context";
import { CONTEXT_MENU_FAMILY } from "./family-context";

defineOptions({ name: "ContextMenu", inheritAttrs: false });

withDefaults(defineProps<ContextMenuProps>(), {
    /* Non-modal by default, as DropdownMenu (U/B7 D-2). */
    modal: false,
});
const emit = defineEmits<ContextMenuEmits>();
defineSlots<{ default?: () => unknown }>();

/* A region-anchored menu: it opens from a right click, a long press or the keyboard
   context key on the `DropdownMenuTrigger` region, never from caller-owned open state.
   The parts are the shared menu family; this root hands them reka's ContextMenu
   primitives. */
provideMenuFamily(CONTEXT_MENU_FAMILY);
</script>

<template>
    <RekaContextMenuRoot
        data-slot="menu"
        data-menu-trigger="context"
        :dir="dir"
        :modal="modal"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaContextMenuRoot>
</template>
