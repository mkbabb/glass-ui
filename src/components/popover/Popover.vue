<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
    HoverCardRoot as RekaHoverCardRoot,
    PopoverRoot as RekaPopoverRoot,
} from "reka-ui";
import type { Trigger } from "../_shared/axes";
import { useDockParticipation } from "../_shared/overlay";
import { providePopoverUnion } from "./popoverContext";

export type PopoverTriggerMode = Extract<Trigger, "click" | "hover">;

export interface PopoverProps {
    /** Controlled visibility. */
    open?: boolean;
    /** Initial visibility for an uncontrolled popover. */
    defaultOpen?: boolean;
    /** Click command or pointer-adaptive hover preview. */
    trigger?: PopoverTriggerMode;
    /** Delay before a fine-pointer hover preview opens, in milliseconds. */
    openDelay?: number;
    /** Delay before a fine-pointer hover preview closes, in milliseconds. */
    closeDelay?: number;
    /** Hold an ancestor GlassDock open while this surface is visible. */
    keepDockOpen?: boolean;
    /**
     * THE A11Y AXIS — one fact, and the consequences that actually derive from
     * it.
     *
     * `false` (default): non-modal. Focus is never trapped and the page behind
     * stays operable. `true`: reka's modal discipline — focus trapped, outside
     * pointers disabled, the page behind inert — and the content stamps
     * `aria-modal` exactly then, because that is the one attribute this axis can
     * enforce.
     *
     * THE ROLE IS NOT ON THIS AXIS. The click arm keeps reka's `role="dialog"`
     * whether or not it is modal (`PopoverContent` writes it in its own
     * template, after `$attrs`, so nothing here could override it), and
     * `role="group"` belongs to the hover arm alone. A hover preview is never
     * modal by construction and ignores this prop.
     *
     * There used to be NO way to reach the modal state at all: `modal` never
     * reached `PopoverRoot`, and the content stripped `role`/`aria-modal` off
     * `$attrs` on the way past.
     */
    modal?: boolean;
}

export interface PopoverEmits {
    "update:open": [value: boolean];
}

defineOptions({ name: "Popover", inheritAttrs: false });

const props = withDefaults(defineProps<PopoverProps>(), {
    open: undefined,
    defaultOpen: false,
    trigger: "click",
    openDelay: 250,
    closeDelay: 150,
    keepDockOpen: false,
    modal: false,
});
const emit = defineEmits<PopoverEmits>();
defineSlots<{ default?: () => unknown }>();

const localOpen = ref(props.open ?? props.defaultOpen);
watch(
    () => props.open,
    (next) => {
        if (next !== undefined) localOpen.value = next;
    },
);
const resolvedOpen = computed(() => props.open ?? localOpen.value);

function updateOpen(next: boolean): void {
    if (props.open === undefined) localOpen.value = next;
    emit("update:open", next);
}

const isCoarsePointer =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
const usesHoverRoot = computed(() => props.trigger === "hover" && !isCoarsePointer);

providePopoverUnion({ usesHoverRoot, modal: computed(() => props.modal) });

/* THE KEEP-OPEN TOKEN IS THE CONTRACT'S, not this component's. What stood here
   was the fourth hand-rolled copy of the same six lines — a local `isHeld`, a
   guarded acquire, a guarded release, and a `onScopeDispose` that had to
   remember. `useDockParticipation` owns the discipline once, for all four
   holders, and takes the condition declaratively so the watch disappears too. */
useDockParticipation({ hold: () => resolvedOpen.value && props.keepDockOpen });
</script>

<template>
    <RekaHoverCardRoot
        v-if="usesHoverRoot"
        data-slot="popover"
        :open="resolvedOpen"
        :open-delay="openDelay"
        :close-delay="closeDelay"
        @update:open="updateOpen"
    >
        <slot />
    </RekaHoverCardRoot>

    <!-- `modal` REACHES reka now. It is what engages the focus trap, the
       outside-pointer discipline and the background `aria-hidden` — the three
       behaviours the content's `role="dialog"` + `aria-modal` claim. Announcing
       a modal the layer does not enforce is worse than not offering one. -->
    <RekaPopoverRoot
        v-else
        data-slot="popover"
        :open="resolvedOpen"
        :modal="modal"
        @update:open="updateOpen"
    >
        <slot />
    </RekaPopoverRoot>
</template>
