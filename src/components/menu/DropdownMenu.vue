<script lang="ts">
import type { Direction } from "../_shared/primitive";

export interface DropdownMenuProps {
    /** Logical reading direction for roving focus and submenu keys. */
    dir?: Direction;
    /** Whether opening the menu makes outside content inert (and locks page scroll).
     *  Default `false`. */
    modal?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when the menu is uncontrolled. */
    defaultOpen?: boolean;
}

export interface DropdownMenuEmits {
    "update:open": [value: boolean];
}
</script>

<script setup lang="ts">
import { DropdownMenuRoot as RekaDropdownMenuRoot } from "reka-ui";
import { provideMenuFamily } from "./context";
import { CLICK_MENU_FAMILY } from "./family-click";

defineOptions({ name: "DropdownMenu", inheritAttrs: false });

withDefaults(defineProps<DropdownMenuProps>(), {
    defaultOpen: undefined,
    /* Non-modal by default (U/B7 D-2). A modal menu takes reka's scroll lock, which
       writes `overflow: hidden` onto `body`; under a root whose overflow is not
       `visible` that makes `body` the scroll container, every sticky ancestor drops
       to its in-flow position and the menu follows its trigger off screen. An action
       menu needs neither the lock nor the inert page. Pass `modal` for a menu that
       must make the page inert. */
    modal: false,
    open: undefined,
});
const emit = defineEmits<DropdownMenuEmits>();
defineSlots<{ default?: () => unknown }>();

/* A button-anchored menu. The region-anchored menu is `ContextMenu`, a separate root,
   so this root bundles reka's DropdownMenu family alone (U/B7c C3-3). */
provideMenuFamily(CLICK_MENU_FAMILY);
</script>

<template>
    <RekaDropdownMenuRoot
        data-slot="menu"
        data-menu-trigger="click"
        :open="open"
        :default-open="defaultOpen ?? false"
        :dir="dir"
        :modal="modal"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaDropdownMenuRoot>
</template>
