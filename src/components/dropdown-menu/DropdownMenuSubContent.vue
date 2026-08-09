<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type { DismissableContentEmits } from "../_shared/interaction";
import { overlayContentAttrs, useDockParticipation } from "../_shared/overlay";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuSubContentProps {
    sideOffset?: number;
    alignOffset?: number;
    class?: HTMLAttributes["class"];
}

export interface DropdownMenuSubContentEmits extends DismissableContentEmits {
    entryFocus: [event: Event];
}

defineOptions({ name: "DropdownMenuSubContent", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), {
    sideOffset: 0,
    alignOffset: 0,
});
const emit = defineEmits<DropdownMenuSubContentEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        side: _side,
        align: _align,
        loop: _loop,
        ...forwarded
    } = attrs;
    return forwarded;
});
const SubContentComp = useMenuPart("SubContent");
const PortalComp = useMenuPart("Portal");

/* A SUBMENU IS A PORTALLED ROOT TOO, and it emitted no dock stamp at all — so
   opening a submenu inside a dock-owned menu read as "the pointer left the
   dock". Same seam as its parent; the family cannot have two answers. */
const dock = useDockParticipation();
const contentAttrs = computed(() =>
    overlayContentAttrs({
        role: "menu",
        slot: "dropdown-menu-sub-content",
        dock: dock.portalAttrs.value,
        class: props.class,
    }),
);
</script>

<template>
    <!-- Submenus share the content portal so scroll clipping cannot hide them. -->
    <component :is="PortalComp">
        <component
            :is="SubContentComp"
            v-bind="{ ...forwardedAttrs, ...contentAttrs }"
            :side-offset="sideOffset"
            :align-offset="alignOffset"
            :avoid-collisions="true"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
            @open-auto-focus="emit('openAutoFocus', $event)"
            @close-auto-focus="emit('closeAutoFocus', $event)"
            @entry-focus="emit('entryFocus', $event)"
        >
            <slot />
        </component>
    </component>
</template>
