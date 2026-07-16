<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { HeaderRibbon } from "@glass/components/header-ribbon";
import { DockControl } from "@glass/components/dock";
import { Menu, Settings, Search, Bell } from "@lucide/vue";

// HeaderRibbon is normally `position: fixed` to the viewport corner; inside a
// story we host it in a framed surface so pointer, focus, and pinned states can
// be exercised without occluding the page chrome.
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
                    default mode · always available
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Collapsible command band"
            blurb="The anchor reveals actions on pointer hover or keyboard focus. Click or touch activation pins the row; Escape unpins and returns focus, then the row collapses when focus leaves."
        >
            <div
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon
                    mode="collapsible"
                    placement="left"
                    aria-label="Left header actions"
                    anchor-label="Toggle left header actions"
                    class="header-ribbon--specimen"
                >
                    <template #anchor>
                        <Menu aria-hidden="true" />
                    </template>
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
                    hover or focus to reveal · click or tap to pin
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Placement + states"
            blurb="The RTL specimen stays on the physical right and expands its actions inward. A disabled control keeps its place in the row but drops out of the tab order."
        >
            <div
                dir="rtl"
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon
                    mode="collapsible"
                    placement="right"
                    aria-label="Right header actions"
                    anchor-label="Toggle right header actions"
                    class="header-ribbon--specimen"
                >
                    <template #anchor>
                        <Menu aria-hidden="true" />
                    </template>
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
                    RTL · physical right · actions expand inward
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
