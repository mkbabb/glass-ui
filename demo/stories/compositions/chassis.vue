<script setup lang="ts">
// compositions/chassis — the demo-kit reference. StorySection owns hierarchy;
// ShowcaseFrame is the one specimen surface; matrices are ordinary local grids.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ShowcaseFrame } from "../../chassis";
import { ref } from "vue";
import { Button } from "@glass/components/button";
import { Badge } from "@glass/components/badge";
import { Switch } from "@glass/components/switch";

// The grid cells — each renders a glassy specimen cell hosting a Badge.
const toneCells = [
    { id: "default", heading: "default", variant: "default" },
    { id: "secondary", heading: "secondary", variant: "secondary" },
    { id: "outline", heading: "outline", variant: "outline" },
] as const;

const runState = ref<"idle" | "running">("idle");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Specimen"
            blurb="One specimen surface hosting real components at their intrinsic widths."
        >
            <ShowcaseFrame>
                <div class="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button emphasis="primary">Primary</Button>
                    <Badge tone="success">shipped</Badge>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Interaction"
            blurb="Real Buttons and Switches on the quieter specimen tier."
        >
            <ShowcaseFrame tier="quiet">
                <div class="flex max-w-2xl flex-col gap-3">
                    <div class="flex flex-wrap items-center gap-3">
                        <Button size="sm" @click="runState = 'running'">
                            Run
                        </Button>
                        <Button
                            emphasis="quiet"
                            size="sm"
                            :disabled="runState === 'idle'"
                            @click="runState = 'idle'"
                        >
                            Reset
                        </Button>
                        <span class="text-small text-muted-foreground" role="status">
                            {{ runState === "running" ? "Running" : "Idle" }}
                        </span>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                        <span id="chassis-reduced-motion" class="text-small"
                            >Reduced motion</span
                        >
                        <Switch aria-labelledby="chassis-reduced-motion" />
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Grid"
            blurb="A responsive variant matrix built from the same specimen surface."
        >
            <div
                class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(12rem,100%),1fr))]"
            >
                <ShowcaseFrame
                    v-for="cell in toneCells"
                    :key="cell.id"
                    tier="quiet"
                    pad="sm"
                    :caption="cell.heading"
                >
                    <Badge :variant="cell.variant">{{ cell.heading }}</Badge>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            heading="Composition"
            blurb="A composed scene with one clear surface and no nested specimen hierarchy."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex max-w-2xl flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex flex-col gap-1">
                            <span id="chassis-notifications" class="text-subheading"
                                >Notifications</span
                            >
                            <span class="text-small text-muted-foreground">
                                Email me when a run completes.
                            </span>
                        </div>
                        <Switch
                            :default-value="true"
                            aria-labelledby="chassis-notifications"
                        />
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex flex-col gap-1">
                            <span class="text-subheading">Theme</span>
                            <span class="text-small text-muted-foreground">
                                Follow the system appearance.
                            </span>
                        </div>
                        <Badge variant="outline">system</Badge>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
