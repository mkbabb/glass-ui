<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { HeaderRibbon } from "../../../src/components/custom/header-ribbon";
import { DockIconButton } from "../../../src/components/custom/dock";
import { Menu, Settings, Search, Bell, PanelTop } from "@lucide/vue";
import { IconChip } from "../../../src/components/custom/icon-chip";
// BA.W-SUFFUSE2 — the navigation band's ONE coherent --section-color-12 indigo identity.
const NAV_STOP = 12;

// HeaderRibbon is normally `position: fixed` to the viewport corner; inside a
// story we host it in a `relative` framed surface so the hover-tracking
// expand/collapse can be exercised without occluding the page chrome.
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the navigation-band identity event family on --section-color-12. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${NAV_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="PanelTop" :section="NAV_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Navigation · Header ribbon
                </span>
                <p class="text-small text-muted-foreground">
                    Hover-tracking chrome ribbon — the controls stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection
            label="hover-tracking ribbon"
            blurb="An anchor button that reveals a row of controls on hover, then auto-collapses after the hide timeout. The anchor slot exposes pinned / toggled state."
        >
            <div
                class="relative h-32 w-full overflow-hidden rounded-card border border-border/60 bg-card"
            >
                <HeaderRibbon position="left" class="!absolute">
                    <template #anchor="{ pinned }">
                        <DockIconButton
                            type="button"
                            :aria-pressed="pinned"
                            aria-label="Toggle navigation ribbon"
                        >
                            <Menu aria-hidden="true" />
                        </DockIconButton>
                    </template>
                    <template #items>
                        <DockIconButton type="button" aria-label="Search">
                            <Search aria-hidden="true" />
                        </DockIconButton>
                        <DockIconButton type="button" aria-label="Notifications">
                            <Bell aria-hidden="true" />
                        </DockIconButton>
                        <DockIconButton type="button" aria-label="Settings">
                            <Settings aria-hidden="true" />
                        </DockIconButton>
                    </template>
                </HeaderRibbon>
                <p
                    class="absolute inset-x-0 bottom-3 text-center text-mono-caption text-muted-foreground"
                >
                    hover the anchor to expand · click to pin
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>
