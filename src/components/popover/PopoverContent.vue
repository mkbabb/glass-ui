<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    HoverCardContent as RekaHoverCardContent,
    HoverCardPortal as RekaHoverCardPortal,
    PopoverContent as RekaPopoverContent,
    PopoverPortal as RekaPopoverPortal,
} from "reka-ui";
import type { Surface } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import { floatingContentAttrs, type FloatingPlacementProps } from "../_shared/floating";
import type { DismissableContentEmits } from "../_shared/interaction";
import { useOptionalDockContext } from "../dock/composables/dockContext";
import { usePopoverUnion } from "./popoverContext";

export interface PopoverContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    /** Teleport content to the document body. */
    portal?: boolean;
    surface?: Surface;
    /** Accessible name for the hover group or click dialog. */
    ariaLabel?: string;
}

export interface PopoverContentEmits extends DismissableContentEmits {}

defineOptions({ name: "PopoverContent", inheritAttrs: false });

const props = withDefaults(defineProps<PopoverContentProps>(), {
    side: "bottom",
    sideOffset: 4,
    align: "center",
    alignOffset: 0,
    portal: true,
    surface: "glass",
});
const emit = defineEmits<PopoverContentEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        role: _role,
        "aria-modal": _ariaModal,
        ...forwarded
    } = floatingContentAttrs(attrs);
    return forwarded;
});
const placementProps = computed(() => ({
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
}));

const union = usePopoverUnion();
const usesHoverRoot = computed(() => union?.usesHoverRoot.value ?? false);

const dockContext = useOptionalDockContext();
const dockPortalAttr = computed(() => (dockContext?.id ? "" : undefined));
const contentClass = computed(() =>
    cn(
        "popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal",
        props.class,
    ),
);
</script>

<template>
    <RekaHoverCardPortal v-if="usesHoverRoot" :disabled="!portal">
        <RekaHoverCardContent
            v-bind="{ ...placementProps, ...forwardedAttrs }"
            :data-glass-dock-portal="dockPortalAttr"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="surface"
            data-material="overlay"
            data-reveal="menu"
            role="group"
            :aria-label="ariaLabel"
            :class="contentClass"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
        >
            <slot />
        </RekaHoverCardContent>
    </RekaHoverCardPortal>

    <RekaPopoverPortal v-else-if="portal">
        <RekaPopoverContent
            v-bind="{ ...placementProps, ...forwardedAttrs }"
            :data-glass-dock-portal="dockPortalAttr"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="surface"
            data-material="overlay"
            data-reveal="menu"
            :aria-label="ariaLabel"
            :class="contentClass"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
            @open-auto-focus="emit('openAutoFocus', $event)"
            @close-auto-focus="emit('closeAutoFocus', $event)"
        >
            <slot />
        </RekaPopoverContent>
    </RekaPopoverPortal>

    <RekaPopoverContent
        v-else
        v-bind="{ ...placementProps, ...forwardedAttrs }"
        :data-glass-dock-portal="dockPortalAttr"
        :data-glass-dock-owner="dockContext?.id"
        :data-surface="surface"
        data-material="overlay"
        data-reveal="menu"
        :aria-label="ariaLabel"
        :class="contentClass"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
        @focus-outside="emit('focusOutside', $event)"
        @interact-outside="emit('interactOutside', $event)"
        @open-auto-focus="emit('openAutoFocus', $event)"
        @close-auto-focus="emit('closeAutoFocus', $event)"
    >
        <slot />
    </RekaPopoverContent>
</template>
