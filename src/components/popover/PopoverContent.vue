<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    HoverCardContent as RekaHoverCardContent,
    HoverCardPortal as RekaHoverCardPortal,
    PopoverContent as RekaPopoverContent,
    PopoverPortal as RekaPopoverPortal,
} from "reka-ui";
import type { DismissableContentEmits } from "../_shared/interaction";
import {
    overlayContentAttrs,
    useDockParticipation,
    type FloatingPlacementProps,
} from "../_shared/overlay";
import { usePopoverUnion } from "./popoverContext";

export interface PopoverContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
    /** Teleport content to the document body. */
    portal?: boolean;
    /**
     * Accessible name. REQUIRED on the HOVER arm — that is the one arm this
     * component gives `role="group"`, and a group with no name is a landmark
     * screen readers cannot announce. The click arm is reka's `role="dialog"`
     * either way, modal or not, and may take its name from a heading inside
     * instead.
     */
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
});
const emit = defineEmits<PopoverContentEmits>();
defineSlots<{ default?: () => unknown }>();

/* NO ATTRIBUTE STRIP. `$attrs` used to be filtered through a `role` /
   `aria-modal` destructure, which is precisely how the popover became unable to
   be modal: the two attributes a modal panel MUST carry were the two the
   component threw away, while the (now deleted) 38-entry denylist swallowed
   `trap-focus` and `disable-outside-pointer-events` — the only other route in.
   The `modal` axis below is the honest cure, so the strip has nothing left to
   do and is gone: attributes forward whole. */
const attrs = useAttrs();

const placementProps = computed(() => ({
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
}));

/* THE HOVER/CLICK FORK IS A COMPONENT SELECTION, and that is ALL it is. Three
   near-identical subtrees used to spell the same fifteen bindings three times —
   once per (hover-root × portal) combination — so the portal stamp appeared
   three times in one file and a change to any binding had three places to
   forget. Two ternaries replace them.

   `portal: false` selects NO portal component, not a DISABLED one. The two arms
   used to disagree about that (the hover arm passed `:disabled`, the click arm
   dropped the wrapper entirely), and the drop is the correct half: reka's
   Teleport gates its whole subtree on `useMounted()`, so a "disabled" portal
   still withholds the content until mount — a wrapper that is not a no-op is not
   an off switch. */
const PassThrough = (_props: unknown, { slots }: { slots: Record<string, undefined | (() => unknown)> }) =>
    slots.default?.();

const union = usePopoverUnion();
const usesHoverRoot = computed(() => union?.usesHoverRoot.value ?? false);
const PortalComp = computed(() =>
    !props.portal
        ? PassThrough
        : usesHoverRoot.value
          ? RekaHoverCardPortal
          : RekaPopoverPortal,
);
const ContentComp = computed(() =>
    usesHoverRoot.value ? RekaHoverCardContent : RekaPopoverContent,
);

/* ONE AXIS, DERIVED CONSEQUENCES (§3.5). A hover preview is never modal — it has
   no dismissal gesture of its own — so the hover arm resolves `false` whatever
   the root says.

   WHAT THE AXIS OWNS, and what it honestly does not. `aria-modal` is the axis's:
   it appears exactly when the root is enforcing modality and never otherwise —
   which is the repair, because the old code STRIPPED it off `$attrs` while the
   root could not be modal at all, so the two facts could never agree.
   The ROLE is reka's on the click arm (`PopoverContent` writes `role="dialog"`
   in its own template, after `$attrs`, so nothing here could override it and
   pretending otherwise would be a claim with no paint) — and that is correct
   either way: a click popover is a dialog whether or not it is modal. The hover
   arm renders no role of its own, so the annotation `group` is stated here, once,
   where it actually lands. */
const isModal = computed(() => (union?.modal.value ?? false) && !usesHoverRoot.value);
const a11yAttrs = computed(() => ({
    "aria-label": props.ariaLabel,
    ...(usesHoverRoot.value ? { role: "group" } : {}),
    ...(isModal.value ? { "aria-modal": "true" } : {}),
}));

const dock = useDockParticipation();
const contentAttrs = computed(() =>
    overlayContentAttrs({
        role: "panel",
        slot: "popover-content",
        dock: dock.portalAttrs.value,
        class: ["z-popover", props.class],
    }),
);
</script>

<template>
    <component :is="PortalComp">
        <component
            :is="ContentComp"
            v-bind="{
                ...placementProps,
                ...attrs,
                ...a11yAttrs,
                ...contentAttrs,
            }"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
            @focus-outside="emit('focusOutside', $event)"
            @interact-outside="emit('interactOutside', $event)"
            @open-auto-focus="emit('openAutoFocus', $event)"
            @close-auto-focus="emit('closeAutoFocus', $event)"
        >
            <slot />
        </component>
    </component>
</template>
