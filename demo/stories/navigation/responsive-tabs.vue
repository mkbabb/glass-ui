<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ResponsiveTabs } from "../../../src/components/custom/responsive-tabs";
import type { TabOption } from "../../../src/components/custom/tabs";

// ResponsiveTabs swaps a mobile <Select> for the desktop <UnderlineTabs> at the
// breakpoint, both driven by one v-model. Resize past 640px to see the swap.
const view = ref("overview");

const options: TabOption[] = [
    { label: "Overview", value: "overview" },
    { label: "Activity", value: "activity" },
    { label: "Members", value: "members" },
    { label: "Settings", value: "settings" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="matchMedia swap"
            blurb="One v-model drives a mobile Select below the breakpoint and desktop UnderlineTabs at/above it. Narrow the viewport past 640px to watch the control swap."
        >
            <div class="max-w-md">
                <ResponsiveTabs
                    v-model="view"
                    :options="options"
                    aria-label="Project view"
                />
                <p class="mt-4 text-mono-caption text-muted-foreground">
                    active view: <code class="fira-code">{{ view }}</code>
                </p>
            </div>
        </StorySection>

        <StorySection
            label="desktop subset"
            blurb="`desktopOptions` exposes only a subset of tabs at/above the breakpoint — the mobile Select keeps the full option list."
        >
            <div class="max-w-md">
                <ResponsiveTabs
                    v-model="view"
                    :options="options"
                    :desktop-options="options.slice(0, 3)"
                    breakpoint="768px"
                    aria-label="Project view (compact desktop)"
                />
            </div>
        </StorySection>
    </StoryPage>
</template>
