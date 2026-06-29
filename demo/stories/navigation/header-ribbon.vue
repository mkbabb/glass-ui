<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { HeaderRibbon } from "@glass/components/custom/header-ribbon";
import { DockIconButton } from "@glass/components/custom/dock";
import { IconChip } from "@glass/components/custom/icon-chip";
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
