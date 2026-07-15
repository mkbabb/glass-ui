<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    Home,
    Search,
    Layers,
    Package,
    Library,
    Bell,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "@lucide/vue";
import {
    GlassDock,
    DockSection,
    DockControl,
    type DockSectionDescriptor,
} from "@glass/components/dock";
import DockStage from "./DockStage.vue";

// BA.W-DOCK-SECTIONS — the declarative tripartite <DockSection> chassis. A consumer
// passes ONE `sections: DockSectionDescriptor[]` array and the dock body renders the
// three-zone gestalt — a leading `rail-core` home/brand region, named `section`
// groups demarcated by <DockSeparator>, a trailing `nav` group — by composing the
// existing <DockSeparator> over the controls the consumer authors into the per-section
// slots (keyed by descriptor id). The chassis is `display: contents`: it GROUPS the
// in-flow controls + adds the divider seams, so the dock box shrink-wraps exactly as
// it does without it (the NO-INFLATION contract — never a re-mounted column-rail group).
//
// A 5-section dock renders FROM the array (not a hardcoded three-element literal — the
// gate's S1 bite): a rail-core, three named sections, and a nav. The descriptor's
// `layers` facets ride the seam rail OUTSIDE the dock box (W-RAIL3); here the focus is
// the section grammar itself, so the sections carry no facets.
const sections: readonly DockSectionDescriptor[] = [
    { kind: "rail-core", id: "home", label: "Home" },
    { kind: "section", id: "browse", label: "Browse" },
    { kind: "section", id: "assets", label: "Assets" },
    { kind: "section", id: "system", label: "System" },
    { kind: "nav", id: "nav", label: "Navigate" },
];
</script>

<template>
    <StoryPage>
        <!-- BA.W-STAGE scope 8/9 (FD-DOCK-1) — the section-chassis demo sits over the
             ONE shared, offscreen-paused aurora field (DockStage); the dock floats over
             the live field in a transparent `.dock-stage-tile` slot. <DockSection> is
             `display: contents` chrome over the existing controls — NO net-new GL/
             substrate context (the one-GL-per-route budget holds). -->
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="Declarative tripartite sections" gap="md">
                <p class="text-sm text-muted-foreground">
                    One <code class="rounded bg-muted px-1">sections</code> descriptor
                    array drives the dock's
                    <strong>rail-core | divided sections | nav</strong> gestalt.
                    <code class="rounded bg-muted px-1">&lt;DockSection&gt;</code> renders
                    the zones by composing
                    <code class="rounded bg-muted px-1">&lt;DockSeparator&gt;</code> over
                    the controls authored into the per-section slots — it is
                    <code class="rounded bg-muted px-1">display: contents</code>, so the
                    dock box shrink-wraps exactly as it would without it (no inflation).
                </p>
                <div
                    class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
                >
                    <GlassDock :background-canvas="backgroundCanvas" always-expanded class="relative z-10">
                        <DockSection
                            :sections="sections"
                            aria-label="Workspace sections"
                        >
                            <!-- rail-core: the leading home/brand region -->
                            <template #home>
                                <DockControl aria-label="Home"><Home /></DockControl>
                            </template>
                            <!-- section: Browse -->
                            <template #browse>
                                <DockControl aria-label="Search"><Search /></DockControl>
                                <DockControl aria-label="Layers"><Layers /></DockControl>
                            </template>
                            <!-- section: Assets -->
                            <template #assets>
                                <DockControl aria-label="Packages"><Package /></DockControl>
                                <DockControl aria-label="Libraries"><Library /></DockControl>
                            </template>
                            <!-- section: System -->
                            <template #system>
                                <DockControl aria-label="Notifications"><Bell /></DockControl>
                                <DockControl aria-label="Settings"><Settings /></DockControl>
                            </template>
                            <!-- nav: the trailing nav arrows -->
                            <template #nav>
                                <DockControl aria-label="Previous"><ChevronLeft /></DockControl>
                                <DockControl aria-label="Next"><ChevronRight /></DockControl>
                            </template>
                        </DockSection>
                    </GlassDock>
                </div>
                <p class="text-mono-caption text-muted-foreground">
                    The nav-separator seam is the rail's default anchor (the
                    <code class="rounded bg-muted px-1">anchorId</code> prop overrides it).
                </p>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>
