<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import {
    Home,
    Search,
    Layers,
    Package,
    Bell,
    Settings,
    Star,
    Image as ImageIcon,
    Music,
    Video,
    FileText,
    Map as MapIcon,
} from "@lucide/vue";
import {
    GlassDock,
    DockControl,
    DockTrigger,
    DockSeparator,
} from "@glass/components/dock";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@glass/components/select";
import { useSelectionGroup } from "@glass/composables/motion/core";
import DockStage from "./_frame/DockStage.vue";

// the reference CONTROLS demo. The dock IS SegmentedTabs/
// ToggleGroup wearing chrome, so its control run is driven by the SAME headless
// `useSelectionGroup` engine (the roving machine + the scrollIntoView recenter +
// role-per-mode ARIA), and its controls are ordinary `<DockControl>` (the folded
// icon+tab survivor) + `<DockTrigger>` (the folded overlay trigger).

// ── The useSelectionGroup-driven scrollable control row ──
//
// A single-select filter strip of icon controls. The engine owns the roving
// tabindex + arrow keys + Home/End, writes the caller's `filter` model (the ONE
// registry), and recenters a selection past the fold via `scrollIntoView`.
interface Filter {
    value: string;
    label: string;
    icon: typeof Home;
}
const filters: readonly Filter[] = [
    { value: "all", label: "All", icon: Layers },
    { value: "images", label: "Images", icon: ImageIcon },
    { value: "music", label: "Music", icon: Music },
    { value: "video", label: "Video", icon: Video },
    { value: "docs", label: "Docs", icon: FileText },
    { value: "maps", label: "Maps", icon: MapIcon },
    { value: "starred", label: "Starred", icon: Star },
    { value: "packages", label: "Packages", icon: Package },
];
const filter = ref<string>("all");
const filterRowRef = ref<HTMLElement | null>(null);
const filterBtnRefs = ref<HTMLElement[]>([]);
const selection = useSelectionGroup<Filter>({
    options: computed(() => [...filters]),
    model: filter,
    // A single-select filter strip rendered as a toggle group (role="group" +
    // aria-pressed) — consistent with the DockControl `active` selected register.
    // (The engine's radiogroup/tablist role modes are exercised at the group level
    // by SegmentedTabs, ToggleGroup, folded onto this engine in.)
    mode: "single",
    role: "group",
    containerRef: filterRowRef,
    buttonRefs: filterBtnRefs,
});

// ── The overlay-trigger fold demo ──
const view = ref<string>("grid");
</script>

<template>
    <StoryPage>
        <StorySection heading="DockControl — one control, a shape axis">
            <DockStage>
                <GlassDock always-expanded aria-label="Dock control shapes">
                    <template #persistent>
                        <DockControl aria-label="Home"><Home /></DockControl>
                    </template>

                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockControl :active="true" aria-label="Notifications">
                        <Bell />
                    </DockControl>
                    <DockSeparator />
                    <DockControl shape="tab">Overview</DockControl>
                    <DockControl shape="tab">Activity</DockControl>

                    <template #persistent-end>
                        <DockControl aria-label="Settings"><Settings /></DockControl>
                    </template>
                </GlassDock>
            </DockStage>
        </StorySection>

        <StorySection heading="useSelectionGroup — one engine drives the control run">
            <DockStage>
                <GlassDock always-expanded aria-label="Media filter">
                    <div
                        ref="filterRowRef"
                        :role="selection.groupRole.value === 'radiogroup' ? 'radiogroup' : 'group'"
                        aria-label="Media filter"
                        class="flex items-center gap-1 overflow-x-auto"
                        @keydown="selection.onKeydown"
                    >
                        <DockControl
                            v-for="(f, idx) in filters"
                            :key="f.value"
                            :ref="(el: any) => { if (el?.$el) filterBtnRefs[idx] = el.$el as HTMLElement }"
                            :active="selection.isSelected(f.value)"
                            :tabindex="selection.rovingTabindex(idx)"
                            v-bind="selection.itemAttrs(f.value)"
                            :aria-label="f.label"
                            @click="selection.select(f.value, idx)"
                        >
                            <component :is="f.icon" />
                        </DockControl>
                    </div>
                </GlassDock>
            </DockStage>
            <p class="text-small text-muted-foreground mt-3">
                Active filter: <strong>{{ filter }}</strong> — arrow keys rove, Home/End
                jump, a selection past the fold recenters itself.
            </p>
        </StorySection>

        <StorySection heading="DockTrigger — one overlay trigger">
            <DockStage>
                <GlassDock always-expanded aria-label="View picker">
                    <Select v-model="view">
                        <DockTrigger for="select" aria-label="View">
                            <SelectValue placeholder="View" />
                        </DockTrigger>
                        <SelectContent>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="list">List</SelectItem>
                            <SelectItem value="columns">Columns</SelectItem>
                        </SelectContent>
                    </Select>
                </GlassDock>
            </DockStage>
        </StorySection>
    </StoryPage>
</template>
