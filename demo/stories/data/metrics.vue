<script setup lang="ts">
// BG.W-DEMO-IA-REDESIGN — the Data METRICS family. The metric primitives
// (metric-cell · metric-stack · metric-badge) collapse onto ONE
// metrics page — the ledger's numeric-readout family, sectioned by member via
// <FamilyTabs>. The metric-badge atom moves OUT of Display (it is a data
// readout, not a display atom). Zero content re-authored — each member composed bare.
// (scrolling-text left the family at BI.W-SPEEDTEST-ONLY-PAIR — RETIRE-RELOCATED to
// speedtest, its sole binary consumer.)
import { defineAsyncComponent } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";

const members: FamilyMember[] = [
    {
        id: "metric-cell",
        label: "Metric cell",
        component: defineAsyncComponent(() => import("./metric-cell.vue")),
    },
    {
        id: "metric-stack",
        label: "Metric stack",
        component: defineAsyncComponent(() => import("./metric-stack.vue")),
    },
    {
        id: "metric-badge",
        label: "Metric badge",
        component: defineAsyncComponent(() => import("../display/metric-badge.vue")),
    },
];
</script>

<template>
    <StoryPage>
        <FamilyTabs :members="members" aria-label="Metric family" />
    </StoryPage>
</template>
