<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { HeaderRibbon } from "@glass/components/header-ribbon";
import { DockControl } from "@glass/components/dock";
import { Settings, Search, Bell } from "@lucide/vue";

// HeaderRibbon is normally `position: fixed` to the viewport corner; inside a
// story we host it in a framed surface so it does not occlude the page chrome.
</script>

<template>
    <StoryPage>
        <StorySection
            label="Persistent by default"
            blurb="Action-only ribbons are expanded and operable on their first render; no disclosure anchor or reveal gesture is required."
        >
            <div
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon
                    placement="left"
                    aria-label="Persistent header actions"
                    class="header-ribbon--specimen"
                >
                    <template #items>
                        <DockControl type="button" aria-label="Search">
                            <Search aria-hidden="true" />
                        </DockControl>
                        <DockControl type="button" aria-label="Notifications">
                            <Bell aria-hidden="true" />
                        </DockControl>
                        <DockControl type="button" aria-label="Settings">
                            <Settings aria-hidden="true" />
                        </DockControl>
                    </template>
                </HeaderRibbon>
                <p
                    class="absolute inset-x-0 bottom-3 text-center text-mono-caption text-muted-foreground"
                >
                    always available
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Placement + RTL"
            blurb="The right-placed specimen stays on the physical right; under RTL the action row flows inward while the band keeps its corner. A disabled control holds its place in the row but drops out of the tab order."
        >
            <div
                dir="rtl"
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon
                    placement="right"
                    aria-label="Right header actions"
                    class="header-ribbon--specimen"
                >
                    <template #items>
                        <DockControl type="button" aria-label="Search">
                            <Search aria-hidden="true" />
                        </DockControl>
                        <DockControl type="button" aria-label="Notifications">
                            <Bell aria-hidden="true" />
                        </DockControl>
                        <DockControl
                            type="button"
                            disabled
                            aria-label="Settings (locked)"
                        >
                            <Settings aria-hidden="true" />
                        </DockControl>
                    </template>
                </HeaderRibbon>
                <p
                    class="absolute inset-x-0 bottom-3 text-center text-mono-caption text-muted-foreground"
                >
                    RTL · physical right
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.header-ribbon--specimen {
    position: absolute;
}
</style>
