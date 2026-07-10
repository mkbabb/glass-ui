<script setup lang="ts">
// BG.W-DEMO-IA-REDESIGN — the Motion TYPE & NUMBER family. The per-glyph / per-digit
// motion primitives (typewriter · split-chars · animated-digit · countup) collapse
// onto ONE text-motion page — the type-and-number motion family — sectioned by member
// via <FamilyTabs>. Zero content re-authored: each member SFC is composed bare
// (STORY_NESTED_KEY).
import { defineAsyncComponent } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";

const members: FamilyMember[] = [
    {
        id: "typewriter",
        label: "Typewriter",
        component: defineAsyncComponent(() => import("./typewriter.vue")),
    },
    {
        id: "split-chars",
        label: "Split chars",
        component: defineAsyncComponent(() => import("./split-chars.vue")),
    },
    {
        id: "animated-digit",
        label: "Animated digit",
        component: defineAsyncComponent(() => import("./animated-digit.vue")),
    },
    {
        id: "countup",
        label: "Countup",
        component: defineAsyncComponent(() => import("./countup.vue")),
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
            <FamilyTabs :members="members" aria-label="Text motion family" />
        </div>
    </StoryPage>
</template>
