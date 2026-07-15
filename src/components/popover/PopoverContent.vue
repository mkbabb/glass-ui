<script setup lang="ts">
// PopoverContent — root-adaptive union content (BI.W-OVERLAY-UNION).
//
// Renders reka's HoverCardContent under the union's fine-hover root, else reka's
// PopoverContent. Composes the SHARED {glass·veil·opaque} surface axis (the veil
// legibility feather / the opaque solid-card escape) over the baked glass-floating
// tier. The `role` axis: `dialog` (default on click/context — reka's native
// role="dialog") · `card` → `role="group"` (the ruling-7 decision). `role="dialog"`
// under a hover trigger is REFUSED (a hover surface cannot be a modal-adjacent
// dialog — WCAG 1.4.13): dev-warn, fall to card. The card role override on the
// CLICK path rides the `as-child` seam — reka `mergeProps(attrs, child.props)`
// merges the child's explicit `role="group"` OVER a passed `:role` attr (which
// would lose to reka's hardcoded `role="dialog"`), so the inner div's role is the
// only override seam.
import { type HTMLAttributes, computed } from "vue";
import {
    PopoverContent,
    type PopoverContentEmits,
    type PopoverContentProps,
    PopoverPortal,
    HoverCardContent,
    HoverCardPortal,
    useForwardPropsEmits,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { useOptionalDockContext } from "../dock/composables/dockContext";
import { decorationClass, type Surface } from "../_shared/useSurfaceAxis";
import { usePopoverUnion } from "./popoverContext";

defineOptions({ inheritAttrs: false });

type PopoverRole = "dialog" | "card";

const props = withDefaults(
    defineProps<
        PopoverContentProps & {
            class?: HTMLAttributes["class"];
            portal?: boolean;
            surface?: Surface;
            /** `dialog` (default click/context) · `card` (→ role="group"). */
            role?: PopoverRole;
            /** Accessible name passthrough for the `role="group"` card surface. */
            ariaLabel?: string;
        }
    >(),
    {
        align: "center",
        sideOffset: 4,
        portal: true,
        surface: "glass",
    },
);
const emits = defineEmits<PopoverContentEmits>();

const union = usePopoverUnion();
const usesHoverRoot = computed(() => union?.usesHoverRoot.value ?? false);

// role resolution — default dialog on click/context, card on hover. `dialog`
// under hover is refused (WCAG trap) → dev-warn, fall to card.
const resolvedRole = computed<PopoverRole>(() => {
    const requested = props.role ?? (usesHoverRoot.value ? "card" : "dialog");
    if (usesHoverRoot.value && requested === "dialog") {
        if (import.meta.env.DEV)
            console.warn(
                '[glass-ui:Popover] role="dialog" is refused under trigger="hover" (a hover surface cannot be a modal-adjacent dialog — WCAG 1.4.13); falling back to role="card" (role="group").',
            );
        return "card";
    }
    return requested;
});

// The CLICK path needs the `as-child` override ONLY when role=card (reka
// hardcodes role="dialog" on its Primitive). The hover path binds role directly
// (HoverCardContent hardcodes no role).
const cardOverride = computed(
    () => !usesHoverRoot.value && resolvedRole.value === "card",
);

const delegatedProps = computed(() => {
    const {
        class: _c,
        portal: _p,
        surface: _s,
        role: _r,
        ariaLabel: _a,
        ...delegated
    } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);

// The positioning subset HoverCardContent shares with PopoverContent (the hover
// root's content prop surface — a narrow, type-safe pick).
const hoverProps = computed(() => ({
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: props.avoidCollisions,
    collisionBoundary: props.collisionBoundary,
    collisionPadding: props.collisionPadding,
    arrowPadding: props.arrowPadding,
    sticky: props.sticky,
    hideWhenDetached: props.hideWhenDetached,
    updatePositionStrategy: props.updatePositionStrategy,
}));

const dockContext = useOptionalDockContext();
const surfaceDecoration = computed(() => decorationClass(props.surface));

const contentClass = computed(() =>
    cn(
        "popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal",
        surfaceDecoration.value,
        props.class,
    ),
);

const dockPortalAttr = computed(() =>
    dockContext?.id ? "" : undefined,
);
</script>

<template>
    <!-- fine-hover → HoverCardPortal + HoverCardContent (role bound directly). -->
    <HoverCardPortal v-if="usesHoverRoot">
        <HoverCardContent
            v-bind="{ ...hoverProps, ...$attrs }"
            :data-glass-dock-portal="dockPortalAttr"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="props.surface"
            data-reveal="menu"
            :role="resolvedRole === 'card' ? 'group' : 'dialog'"
            :aria-label="ariaLabel"
            :class="contentClass"
        >
            <slot />
        </HoverCardContent>
    </HoverCardPortal>

    <!-- click/context + role=card → the as-child role="group" override seam. -->
    <template v-else-if="cardOverride">
        <PopoverPortal v-if="portal">
            <PopoverContent v-bind="forwarded" as-child>
                <div
                    v-bind="$attrs"
                    :data-glass-dock-portal="dockPortalAttr"
                    :data-glass-dock-owner="dockContext?.id"
                    :data-surface="props.surface"
                    data-reveal="menu"
                    role="group"
                    :aria-label="ariaLabel"
                    :class="contentClass"
                >
                    <slot />
                </div>
            </PopoverContent>
        </PopoverPortal>
        <PopoverContent v-else v-bind="forwarded" as-child>
            <div
                v-bind="$attrs"
                :data-glass-dock-portal="dockPortalAttr"
                :data-glass-dock-owner="dockContext?.id"
                :data-surface="props.surface"
                data-reveal="menu"
                role="group"
                :aria-label="ariaLabel"
                :class="contentClass"
            >
                <slot />
            </div>
        </PopoverContent>
    </template>

    <!-- click/context + role=dialog (default) → reka's native role="dialog". -->
    <template v-else>
        <PopoverPortal v-if="portal">
            <PopoverContent
                v-bind="{ ...forwarded, ...$attrs }"
                :data-glass-dock-portal="dockPortalAttr"
                :data-glass-dock-owner="dockContext?.id"
                :data-surface="props.surface"
                data-reveal="menu"
                :class="contentClass"
            >
                <slot />
            </PopoverContent>
        </PopoverPortal>
        <PopoverContent
            v-else
            v-bind="{ ...forwarded, ...$attrs }"
            :data-glass-dock-portal="dockPortalAttr"
            :data-glass-dock-owner="dockContext?.id"
            :data-surface="props.surface"
            data-reveal="menu"
            :class="contentClass"
        >
            <slot />
        </PopoverContent>
    </template>
</template>
