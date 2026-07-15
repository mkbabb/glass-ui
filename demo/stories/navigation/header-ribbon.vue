<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { HeaderRibbon } from "@glass/components/header-ribbon";
import { DockControl } from "@glass/components/dock";
import { IconChip } from "@glass/components/icon-chip";
import { Menu, Settings, Search, Bell, PanelTop } from "@lucide/vue";

// HeaderRibbon is normally `position: fixed` to the viewport corner; inside a
// story we host it in a `relative` framed surface so the hover-tracking
// expand/collapse can be exercised without occluding the page chrome.

// BC.W-SUFFUSE-reconcile — the navigation band's ONE coherent --section-color-12 indigo identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape).
const NAV_STOP = 12;
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${NAV_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="PanelTop" :section="NAV_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Navigation · Header ribbon
                </span>
                <p class="text-small text-muted-foreground">
                    Banner ribbon surfaces — the section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection
            label="hover-tracking ribbon"
            blurb="An anchor button that reveals a row of controls on hover or keyboard focus, then auto-collapses after the hide timeout. The anchor slot exposes pinned / toggled state."
        >
            <div
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon placement="left" class="!absolute">
                    <template #anchor="{ pinned }">
                        <DockControl
                            type="button"
                            :aria-pressed="pinned"
                            aria-label="Toggle navigation ribbon"
                        >
                            <Menu aria-hidden="true" />
                        </DockControl>
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
                    hover or focus the anchor to expand · click to pin
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Placement + states"
            blurb="The ribbon anchors to either top corner via placement; a right-placed ribbon expands leftward. A disabled control stays PRESENT (the row geometry holds) but drops out of the tab order."
        >
            <div
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon placement="right" class="!absolute">
                    <template #anchor="{ pinned }">
                        <DockControl
                            type="button"
                            :aria-pressed="pinned"
                            aria-label="Toggle right ribbon"
                        >
                            <Menu aria-hidden="true" />
                        </DockControl>
                    </template>
                    <template #items>
                        <DockControl type="button" aria-label="Search">
                            <Search aria-hidden="true" />
                        </DockControl>
                        <DockControl type="button" aria-label="Notifications">
                            <Bell aria-hidden="true" />
                        </DockControl>
                        <DockControl type="button" disabled aria-label="Settings (locked)">
                            <Settings aria-hidden="true" />
                        </DockControl>
                    </template>
                </HeaderRibbon>
                <p
                    class="absolute inset-x-0 bottom-3 text-center text-mono-caption text-muted-foreground"
                >
                    placement="right" · the third control is disabled
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>
