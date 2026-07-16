<script setup lang="ts">
import { computed, onScopeDispose, ref, watch } from "vue";
import {
    HoverCardRoot as RekaHoverCardRoot,
    PopoverRoot as RekaPopoverRoot,
} from "reka-ui";
import type { Trigger } from "../_shared/axes";
import { useOptionalDockContext } from "../dock/composables/dockContext";
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

providePopoverUnion({ usesHoverRoot });

const dock = useOptionalDockContext();
let isHeld = false;
function releaseDock(): void {
    if (!isHeld) return;
    dock?.release();
    isHeld = false;
}
watch(
    [resolvedOpen, () => props.keepDockOpen],
    ([open, keepDockOpen]) => {
        if (open && keepDockOpen && dock && !isHeld) {
            dock.keepOpen();
            isHeld = true;
        } else if (!open || !keepDockOpen) {
            releaseDock();
        }
    },
    { immediate: true },
);
onScopeDispose(releaseDock);
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

    <RekaPopoverRoot
        v-else
        data-slot="popover"
        :open="resolvedOpen"
        @update:open="updateOpen"
    >
        <slot />
    </RekaPopoverRoot>
</template>
