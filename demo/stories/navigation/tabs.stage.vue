<script setup lang="ts">
// Tabs' stage: one glass tab strip, laid out on either axis.
import { ref } from "vue";
import {
    SegmentedTabs,
    type SegmentedTabOption,
    type SegmentedTabsOrientation,
} from "@glass/components/tabs";

withDefaults(defineProps<{ orientation?: SegmentedTabsOrientation }>(), {
    orientation: "horizontal",
});

const view = ref("board");
const VIEWS: SegmentedTabOption[] = [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
    { label: "Board", value: "board" },
    { label: "Timeline", value: "timeline" },
];
</script>

<template>
    <SegmentedTabs
        v-model="view"
        :options="VIEWS"
        :orientation="orientation"
        semantics="tabs"
        aria-label="View"
    />
</template>
