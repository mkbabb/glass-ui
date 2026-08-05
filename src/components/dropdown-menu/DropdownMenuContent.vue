<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { FloatingPlacementProps } from "../_shared/floating";
import type {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
} from "../_shared/interaction";
import { cn } from "../_shared/class-names";
import { useOptionalDockContext } from "../dock/composables/dockContext";
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";
import { useMenuPart, useMenuTrigger } from "./useMenuTrigger";

export interface DropdownMenuContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    surface?: Surface;
}

export interface DropdownMenuContentEmits {
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
    focusOutside: [event: FocusOutsideEvent];
    interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
    closeAutoFocus: [event: Event];
}

defineOptions({ name: "DropdownMenuContent", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    surface: "glass",
});
const emit = defineEmits<DropdownMenuContentEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { loop: _loop, ...forwarded } = attrs;
    return forwarded;
});

const trigger = useMenuTrigger();
const ContentComp = useMenuPart("Content");
const PortalComp = useMenuPart("Portal");
const placementProps = computed(() =>
    trigger.value === "context"
        ? {
              alignOffset: props.alignOffset,
              avoidCollisions: true,
          }
        : {
              side: props.side,
              sideOffset: props.sideOffset,
              align: props.align,
              alignOffset: props.alignOffset,
              avoidCollisions: true,
          },
);
const dockContext = useOptionalDockContext();
</script>

<template>
    <component :is="PortalComp">
        <component
            :is="ContentComp"
            v-bind="{ ...placementProps, ...forwardedAttrs }"
            :data-glass-dock-portal="dockContext?.id ? '' : undefined"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="props.surface"
            data-slot="dropdown-menu-content"
            data-reveal="menu"
            :class="
                cn(
                    'dropdown-menu-content dropdown-menu__content glass-reveal',
                    resolveSurfaceClass('floating'),
                    props.class,
                )
            "
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
            @close-auto-focus="emit('closeAutoFocus', $event)"
        >
            <slot />
        </component>
    </component>
</template>
