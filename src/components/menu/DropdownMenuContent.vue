<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
} from "../_shared/interaction";
import {
    injectContextMenuRootContext,
    injectDropdownMenuRootContext,
} from "reka-ui";
import {
    overlayContentAttrs,
    useDockParticipation,
    useModalShortcutBarrier,
    type FloatingPlacementProps,
} from "../_shared/overlay";
import { useMenuPart, useMenuTrigger } from "./context";

export interface DropdownMenuContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
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
/* Both menu roots publish `open` and `modal`, and which one is overhead depends on
   the trigger — so both are injected with a `null` fallback and the live one answers.
   `modal` is the measurement, as everywhere else: a `modal={false}` menu leaves the
   page operable and keeps its accelerators. */
const menuRoot = injectDropdownMenuRootContext(null);
const contextRoot = injectContextMenuRootContext(null);
const openModalRoot = computed(() =>
    trigger.value === "context" ? contextRoot : menuRoot,
);
useModalShortcutBarrier(
    () =>
        (openModalRoot.value?.open.value ?? false) &&
        (openModalRoot.value?.modal.value ?? false),
);

const dock = useDockParticipation();
/* ONE CLASS SPELLING. The root used to carry BOTH `dropdown-menu-content` and
   `menu__content` — two names for one element, feeding two different
   unlayered sheets. Both are gone; the register is `.glass-overlay-plate`, which
   `overlayContentAttrs` writes. */
const contentAttrs = computed(() =>
    overlayContentAttrs({
        role: "menu",
        slot: "menu-content",
        dock: dock.portalAttrs.value,
        class: props.class,
    }),
);
</script>

<template>
    <component :is="PortalComp">
        <component
            :is="ContentComp"
            v-bind="{ ...placementProps, ...forwardedAttrs, ...contentAttrs }"
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
