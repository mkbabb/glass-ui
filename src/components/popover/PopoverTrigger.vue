<script setup lang="ts">
// PopoverTrigger — root-adaptive (BI.W-OVERLAY-UNION). Renders the reka
// HoverCardTrigger under the union's fine-hover root, else the reka
// PopoverTrigger. Injects the resolved-root flag from `<Popover>`; a trigger
// used without a union parent falls to the PopoverTrigger (click) branch.
import { computed } from "vue";
import {
    PopoverTrigger,
    HoverCardTrigger,
    type PopoverTriggerProps,
} from "reka-ui";
import { usePopoverUnion } from "./popoverContext";

const props = defineProps<PopoverTriggerProps>();

const union = usePopoverUnion();
const usesHoverRoot = computed(() => union?.usesHoverRoot.value ?? false);
</script>

<template>
    <HoverCardTrigger v-if="usesHoverRoot" :as="props.as" :as-child="props.asChild">
        <slot />
    </HoverCardTrigger>
    <PopoverTrigger v-else v-bind="props">
        <slot />
    </PopoverTrigger>
</template>
