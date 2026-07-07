<script setup lang="ts">
// BG.W-DEMO-IA-REDESIGN — the Motion SCROLL family. The three scroll pages
// (native scroll-driven · the reader edge-fade system · the choreography register)
// collapse onto ONE scroll page in dependency order (native → reader → choreography),
// sectioned by member via <FamilyTabs>. Zero content re-authored — each member SFC is
// composed bare (STORY_NESTED_KEY). The mechanical file consolidation rides F7.3.
import { defineAsyncComponent } from "vue";
import StoryPage from "../StoryPage.vue";
import FamilyTabs, { type FamilyMember } from "../FamilyTabs.vue";

const members: FamilyMember[] = [
    {
        id: "scroll-vt",
        label: "Native scroll-driven",
        component: defineAsyncComponent(() => import("./scroll-vt.vue")),
    },
    {
        id: "scroll-system",
        label: "Reader system",
        component: defineAsyncComponent(() => import("./scroll-system.vue")),
    },
    {
        id: "scroll-choreography",
        label: "Choreography",
        component: defineAsyncComponent(() => import("./scroll-choreography.vue")),
    },
];
</script>

<template>
    <StoryPage>
        <!-- The motion band's ONE coherent color event — the family switcher's
             ink-mark underline reads the demo-local --motion-accent violet (the
             --viz-legendre twin; never a library token). -->
        <div
            :style="{
                '--paper-ink-mark-color': 'var(--motion-accent)',
                '--section-label-accent': 'var(--motion-accent)',
            }"
        >
            <FamilyTabs :members="members" aria-label="Scroll motion family" />
        </div>
    </StoryPage>
</template>
