<script setup lang="ts">
// BG.W-DEMO-IA-REDESIGN — the Display ATOMS wall. The trivial single-primitive
// atoms (separator · pulse · status-dot · stacked-icons · dark-mode-toggle · avatar)
// no longer each earn a standalone route; they render as sections of ONE designed
// atoms page via the family switcher. Zero content re-authored — each member is its
// own SFC, composed bare (STORY_NESTED_KEY) inside <FamilyTabs>.
import { defineAsyncComponent } from "vue";
import StoryPage from "../StoryPage.vue";
import FamilyTabs, { type FamilyMember } from "../FamilyTabs.vue";

const members: FamilyMember[] = [
    {
        id: "separator",
        label: "Separator",
        component: defineAsyncComponent(() => import("./separator.vue")),
    },
    {
        id: "status-dot",
        label: "Status dot",
        component: defineAsyncComponent(() => import("./status-dot.vue")),
    },
    {
        id: "pulse",
        label: "Pulse",
        component: defineAsyncComponent(() => import("./pulse.vue")),
    },
    {
        id: "stacked-icons",
        label: "Stacked icons",
        component: defineAsyncComponent(() => import("./stacked-icons.vue")),
    },
    {
        id: "avatar",
        label: "Avatar",
        component: defineAsyncComponent(() => import("../data/avatar.vue")),
    },
    {
        id: "dark-mode-toggle",
        label: "Dark toggle",
        component: defineAsyncComponent(() => import("./dark-mode-toggle.vue")),
    },
];
</script>

<template>
    <StoryPage>
        <FamilyTabs :members="members" aria-label="Display atoms" />
    </StoryPage>
</template>
