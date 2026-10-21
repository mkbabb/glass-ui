<script lang="ts">
import type { Direction } from "../_shared/primitive";
import type { MenuTrigger } from "./context";

interface DropdownMenuBaseProps {
    /** Logical reading direction for roving focus and submenu keys. */
    dir?: Direction;
    /** Whether opening the menu makes outside content inert (and locks page scroll).
     *  Default `false`. */
    modal?: boolean;
}

export interface DropdownMenuClickProps extends DropdownMenuBaseProps {
    /** Button-anchored menus support caller-owned open state. */
    trigger?: "click";
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when the menu is uncontrolled. */
    defaultOpen?: boolean;
}

export interface DropdownMenuContextProps extends DropdownMenuBaseProps {
    /** Context menus open only from a pointer, long-press, or keyboard anchor. */
    trigger: "context";
    open?: never;
    defaultOpen?: never;
}

export type DropdownMenuProps = DropdownMenuClickProps | DropdownMenuContextProps;

/** Vue runtime projection; `DropdownMenuProps` is the discriminated data contract. */
export interface DropdownMenuComponentProps extends DropdownMenuBaseProps {
    trigger?: MenuTrigger;
    open?: boolean;
    defaultOpen?: boolean;
}

export interface DropdownMenuEmits {
    "update:open": [value: boolean];
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
    ContextMenuRoot as RekaContextMenuRoot,
    DropdownMenuRoot as RekaDropdownMenuRoot,
} from "reka-ui";
import { provideMenuTrigger } from "./context";

defineOptions({ name: "DropdownMenu", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuComponentProps>(), {
    defaultOpen: undefined,
    /* Non-modal by default (U/B7 D-2). A modal menu takes reka's scroll lock, which
       writes `overflow: hidden` onto `body`; under a root whose overflow is not
       `visible` that makes `body` the scroll container, every sticky ancestor drops
       to its in-flow position and the menu follows its trigger off screen. An action
       menu needs neither the lock nor the inert page. Pass `modal` for a menu that
       must make the page inert. */
    modal: false,
    open: undefined,
    trigger: "click",
});
const emit = defineEmits<DropdownMenuEmits>();
defineSlots<{ default?: () => unknown }>();

const trigger = computed(() => {
    if (
        props.trigger === "context" &&
        (props.open !== undefined || props.defaultOpen !== undefined)
    ) {
        throw new TypeError(
            "[glass-ui] Context menus open from an invocation anchor, not open/defaultOpen props.",
        );
    }
    return props.trigger;
});
provideMenuTrigger(trigger);
</script>

<template>
    <RekaContextMenuRoot
        v-if="trigger === 'context'"
        data-slot="menu"
        data-menu-trigger="context"
        :dir="dir"
        :modal="modal"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaContextMenuRoot>

    <RekaDropdownMenuRoot
        v-else
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

