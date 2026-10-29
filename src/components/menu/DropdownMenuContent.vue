<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import type {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
} from "../_shared/interaction";
import {
    overlayContentAttrs,
    useDockParticipation,
    useModalShortcutBarrier,
    useSheetWidth,
    type FloatingPlacementProps,
} from "../_shared/overlay";
import { useMenuFamily } from "./context";

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

const family = useMenuFamily();
const ContentComp = family.parts.Content;
const PortalComp = family.parts.Portal;
const placementProps = computed(() =>
    family.trigger === "context"
        ? {
              alignOffset: props.alignOffset,
              avoidCollisions: true,
              collisionPadding: 16,
          }
        : {
              side: props.side,
              sideOffset: props.sideOffset,
              align: props.align,
              alignOffset: props.alignOffset,
              avoidCollisions: true,
              collisionPadding: 16,
          },
);
/* The root overhead publishes `open` and `modal`; the family reads its own reka root
   context. `modal` is the measurement, as everywhere else: a `modal={false}` menu
   leaves the page operable and keeps its accelerators. */
const menuRoot = family.injectRoot();
useModalShortcutBarrier(
    () => (menuRoot?.open.value ?? false) && (menuRoot?.modal.value ?? false),
);

/* A menu a dock seat opened closes when that dock collapses: the collapse owns the
   close, through the menu root's own open channel (O-102 (3)). */
const dock = useDockParticipation({
    close: () => {
        if (menuRoot?.open.value) menuRoot.onOpenChange(false);
    },
});
/* A DOCK MENU AT SHEET WIDTH (U/B7 D-6). Below 30rem a menu a dock opened covers the
   page it sits over, as the Select's sheet form does, so it wears the opaque rung. The
   register decides from two facts it already holds (the dock stamp and the viewport);
   the content carries no material prop (BK #66). An anchored menu outside a dock, or
   any menu above 30rem, keeps glass. */
const sheetWidth = useSheetWidth(() => menuRoot?.open.value ?? false);
const opaque = computed(() => sheetWidth.value && "data-glass-dock-portal" in dock.portalAttrs.value);
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
            :data-surface="opaque ? 'opaque' : undefined"
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
