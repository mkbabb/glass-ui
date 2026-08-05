<script setup lang="ts">
// the Motion TYPE & NUMBER family. The per-glyph, per-figure
// motion primitives (typewriter · countup) collapse
// onto ONE text-motion page — the type-and-number motion family — sectioned by member
// via <FamilyTabs>. Zero content re-authored: each member SFC is composed bare
// (STORY_NESTED_KEY).
//
// BK.#18 W-DELETE: the `animated-digit` member died with its component
// (GESTALT RULING 1 — "trivial recipe, 92 LOC", DELETE-with-relay STANDS). The
// number-motion axis keeps its specimen in `countup`, which mounts the surviving
// `useAnimatedNumber` recipe DIRECTLY rather than through the deleted wrapper.
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
            }"
        >
            <FamilyTabs :members="members" aria-label="Text motion family" />
        </div>
    </StoryPage>
</template>
