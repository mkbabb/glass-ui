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
    ChevronRight,
} from "@lucide/vue";
import { Button } from "@glass/components/button";
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

// ── interaction="manual" — the consumer owns posture ──
//
// On a manual dock every internal environmental writer (hover / focus / idle timer /
// outside-click / collapsed-tap / touch) is suppressed at BOTH poles; only the
// imperative `expand()`/`collapse()` write. Here a single reducer (`manualExpanded`)
// owns posture and drives the exposed methods, and a `#persistent` disclosure button
// (never inert, reachable in both poles) is the a11y-honest expand affordance the
// manual contract requires.
const manualDock = ref<InstanceType<typeof GlassDock> | null>(null);
const manualExpanded = ref(false);
function toggleManual() {
    manualExpanded.value = !manualExpanded.value;
    if (manualExpanded.value) manualDock.value?.expand();
    else manualDock.value?.collapse();
}

// The mode flip exercises the axis's flip watch live: a timer armed in auto
// must never fire a ghost collapse after the flip to manual.
const dockInteraction = ref<"auto" | "manual">("manual");
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

        <StorySection heading="interaction=&quot;manual&quot; — the consumer owns posture">
            <DockStage>
                <GlassDock
                    ref="manualDock"
                    :interaction="dockInteraction"
                    start-collapsed
                    aria-label="Consumer-owned dock"
                >
                    <template #persistent>
                        <DockControl
                            aria-label="Toggle dock"
                            :aria-expanded="manualExpanded"
                            @click="toggleManual"
                        >
                            <ChevronRight
                                class="transition-transform"
                                :class="{ 'rotate-90': manualExpanded }"
                            />
                        </DockControl>
                    </template>

                    <DockControl aria-label="Home"><Home /></DockControl>
                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockSeparator />
                    <DockControl aria-label="Starred"><Star /></DockControl>

                    <template #collapsed>
                        <span class="text-small text-muted-foreground px-2">Docked</span>
                    </template>
                </GlassDock>
            </DockStage>
            <p class="text-small text-muted-foreground mt-3">
                Posture is: <strong>{{ manualExpanded ? "expanded" : "collapsed" }}</strong>
                — hover, focus, idle, and outside-click move nothing. Only the
                <code>#persistent</code> disclosure (never inert, reachable in both poles)
                drives <code>expand()</code>/<code>collapse()</code>.
            </p>
            <Button
                emphasis="quiet"
                class="mt-2"
                @click="dockInteraction = dockInteraction === 'manual' ? 'auto' : 'manual'"
            >
                interaction: {{ dockInteraction }} — flip
            </Button>
        </StorySection>
    </StoryPage>
</template>
