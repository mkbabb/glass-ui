<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import type { DismissableContentEmits } from "../_shared/interaction";
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
</script>

<template>
    <!-- Submenus share the content portal so scroll clipping cannot hide them. -->
    <component :is="PortalComp">
        <component
            :is="SubContentComp"
            v-bind="forwardedAttrs"
            :side-offset="sideOffset"
            :align-offset="alignOffset"
            :avoid-collisions="true"
            data-slot="dropdown-menu-sub-content"
            data-reveal="menu"
            :class="
                cn(
                    'dropdown-sub-content dropdown-menu__sub-content glass-floating glass-reveal',
                    props.class,
                )
            "
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
