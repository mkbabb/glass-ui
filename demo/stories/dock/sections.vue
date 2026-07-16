<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    Home,
    Layers,
    Library,
    Package,
    Search,
    Settings,
} from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import DockStage from "./_frame/DockStage.vue";
</script>

<template>
    <StoryPage>
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="Semantic groups and separators" gap="md">
                <p class="text-sm text-muted-foreground">
                    Ordinary groups and <code class="rounded bg-muted px-1">DockSeparator</code>
                    express dock hierarchy without another component or descriptor model.
                </p>
                <div
                    class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
                >
                    <GlassDock :background-canvas="backgroundCanvas" always-expanded class="relative z-10">
                        <div class="contents" role="group" aria-label="Home">
                            <DockControl aria-label="Home"><Home /></DockControl>
                        </div>
                        <DockSeparator />
                        <div class="contents" role="group" aria-label="Browse">
                            <DockControl aria-label="Search"><Search /></DockControl>
                            <DockControl aria-label="Layers"><Layers /></DockControl>
                        </div>
                        <DockSeparator />
                        <div class="contents" role="group" aria-label="Assets">
                            <DockControl aria-label="Packages"><Package /></DockControl>
                            <DockControl aria-label="Libraries"><Library /></DockControl>
                        </div>
                        <DockSeparator />
                        <div class="contents" role="group" aria-label="System">
                            <DockControl aria-label="Notifications"><Bell /></DockControl>
                            <DockControl aria-label="Settings"><Settings /></DockControl>
                        </div>
                        <DockSeparator />
                        <div class="contents" role="group" aria-label="Navigate">
                            <DockControl aria-label="Previous"><ChevronLeft /></DockControl>
                            <DockControl aria-label="Next"><ChevronRight /></DockControl>
                        </div>
                    </GlassDock>
                </div>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>
