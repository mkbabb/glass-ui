<script setup lang="ts">
// W-I.8 prototype page (?c=dock-wi8&cell=<id>[&neck=a|b][&label=a|b][&ground=flat|stripes]).
// One cell renders at a time so every cell sits in the viewport at 390 and 1440.
// The same page builds on v11.0.1 (the RED column): there the new APIs are absent, so
// the fission cell is daraksha's second pinned dock and the outlet cell is daraksha's
// `<Teleport defer>` into a host element inside the run.
//   w-std     standard dock: Home in #persistent, labelled page seats with dividers,
//             a #collapsed glyph, the theme seat in #beside
//   w-pill    the plain pill: page seats and a #collapsed glyph, no regions
//   w-layers  a layer-switcher dock (DockLayerGroup with its switcher), collapsible
//   w-figure  a figure dock: data-preset="figure", chips in #persistent, controls in the run
//   w-wide    a dock holding a wide control (a Slider), collapsible
//   w-outlet  a dock with id="wi8-reader"; a sibling tree contributes two seats and a
//             Popover through DockOutlet, and a Play seat to #persistent-end
//   w-xf      an always-open DockCrossfade, faces of 2, 4, 1 and 3 rows
//   w-flow    the layer dock in flow, with a paragraph under it
//   w-rounded shape="rounded", no #collapsed, no regions (the empty summary)
import { computed, ref } from "vue";
import * as dock from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import {
    Home,
    Search,
    BookOpen,
    Bookmark,
    Settings,
    Sun,
    Moon,
    Package,
    Layers,
    Library,
    Type,
    Image,
    Volume2,
    SlidersHorizontal,
    Play,
    Pause,
    Palette,
    Filter,
    BarChart3,
    Table2,
    PanelTop,
} from "@lucide/vue";

const { GlassDock, DockControl, DockSeparator, DockLayerGroup, DockLayer, DockCrossfade } = dock;
const DockOutlet = (dock as Record<string, unknown>).DockOutlet as typeof GlassDock | undefined;
const proto = !!DockOutlet;

const q = new URLSearchParams(location.search);
const cell = q.get("cell") ?? "w-std";
const neck = q.get("neck") === "b" ? "b" : "a";
const labelEnter = q.get("label") === "b" ? "b" : "a";
const ground = q.get("ground") ?? "";
const flags = { "data-neck": neck, "data-label-enter": labelEnter };

const dark = ref(document.documentElement.classList.contains("dark"));
function toggleTheme(): void {
    dark.value = !dark.value;
    document.documentElement.classList.toggle("dark", dark.value);
}
const pages = [
    { id: "read", label: "Reader", icon: BookOpen },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Library", icon: Library },
    { id: "marks", label: "Bookmarks", icon: Bookmark },
];
const current = ref("read");
const layers = [
    { id: "assets", label: "Assets", icon: Package, blurb: "images, fonts, tokens" },
    { id: "layers", label: "Layers", icon: Layers, blurb: "z-ordered surface stack" },
    { id: "libs", label: "Libraries", icon: Library, blurb: "shared component kits" },
];
const groupLayer = ref("assets");
const xf = ref("assets");
const xfPanes = [
    { id: "assets", label: "Assets", icon: Package, rows: ["images", "fonts"] },
    { id: "layers", label: "Layers", icon: Layers, rows: ["surface stack", "z-order", "blend", "opacity"] },
    { id: "type", label: "Type", icon: Type, rows: ["families"] },
    { id: "media", label: "Media", icon: Image, rows: ["photos", "video", "audio"] },
];
const volume = ref(40);
const playing = ref(false);
const popOpen = ref(false);
const stageStyle = computed(() =>
    ground === "stripes"
        ? { background: "repeating-linear-gradient(90deg, #111 0 6px, #f4f4f4 6px 12px)" }
        : ground === "flat"
          ? { background: dark.value ? "#20242c" : "#e9edf3" }
          : {},
);
</script>

<template>
    <div class="wi8-stage" :class="{ 'wi8-top': cell === 'w-flow' }" :style="stageStyle" :data-cell="cell" data-testid="wi8-stage">
        <!-- w-std -->
        <template v-if="cell === 'w-std'">
            <GlassDock v-if="proto" data-testid="w-std" aria-label="standard" collapse="closed" v-bind="flags">
                <template #persistent>
                    <DockControl aria-label="Home" data-testid="w-std-home"><Home /></DockControl>
                </template>
                <DockControl
                    v-for="p in pages"
                    :key="p.id"
                    :label="p.label"
                    :data-testid="`w-std-${p.id}`"
                    :aria-current="current === p.id ? 'page' : undefined"
                    @click="current = p.id"
                >
                    <component :is="p.icon" />
                </DockControl>
                <DockSeparator />
                <DockControl label="Settings" data-testid="w-std-settings"><Settings /></DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
                <template #beside>
                    <DockControl aria-label="Theme" data-glyph="turn" data-testid="w-std-theme" @click="toggleTheme">
                        <Moon v-if="dark" /><Sun v-else />
                    </DockControl>
                </template>
            </GlassDock>
            <!-- RED: daraksha's composition, a second pinned dock in a row -->
            <div v-else class="wi8-row" data-testid="w-std-row">
                <GlassDock data-testid="w-std" aria-label="standard" collapse="closed" style="margin-inline: 0">
                    <template #persistent>
                        <DockControl aria-label="Home" data-testid="w-std-home"><Home /></DockControl>
                    </template>
                    <DockControl
                        v-for="p in pages"
                        :key="p.id"
                        :aria-label="p.label"
                        :data-testid="`w-std-${p.id}`"
                        :aria-current="current === p.id ? 'page' : undefined"
                        @click="current = p.id"
                    >
                        <component :is="p.icon" />
                    </DockControl>
                    <DockSeparator />
                    <DockControl aria-label="Settings" data-testid="w-std-settings"><Settings /></DockControl>
                    <template #collapsed>
                        <BookOpen class="h-4 w-4" aria-hidden="true" />
                    </template>
                </GlassDock>
                <GlassDock data-testid="w-std-second" aria-label="theme" :collapse="false" style="margin-inline: 0">
                    <DockControl aria-label="Theme" data-testid="w-std-theme" @click="toggleTheme">
                        <Moon v-if="dark" /><Sun v-else />
                    </DockControl>
                </GlassDock>
            </div>
        </template>

        <!-- w-pill -->
        <GlassDock v-if="cell === 'w-pill'" data-testid="w-pill" aria-label="pill" collapse="closed" v-bind="flags">
            <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label" :data-testid="`w-pill-${p.id}`">
                <component :is="p.icon" />
            </DockControl>
            <template #collapsed>
                <BookOpen class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>

        <!-- w-layers -->
        <GlassDock v-if="cell === 'w-layers'" data-testid="w-layers" aria-label="layers" fit-content collapse="closed" v-bind="flags">
            <DockLayerGroup v-model:active="groupLayer" motion="full" data-testid="w-layers-group">
                <DockLayer v-for="l in layers" :id="l.id" :key="l.id" :label="l.label" :icon="l.icon">
                    <component :is="l.icon" class="h-4 w-4" />
                    <span class="px-1 text-small font-medium">{{ l.label }}</span>
                    <span class="text-micro text-muted-foreground">{{ l.blurb }}</span>
                </DockLayer>
            </DockLayerGroup>
            <template #collapsed>
                <Layers class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>

        <!-- w-figure -->
        <GlassDock v-if="cell === 'w-figure'" data-testid="w-figure" aria-label="figure" collapse="closed" data-preset="figure" backdrop-mode="static" v-bind="flags">
            <template #persistent>
                <DockControl aria-label="Chart" data-testid="w-figure-chart"><BarChart3 /></DockControl>
            </template>
            <DockControl aria-label="Table" data-testid="w-figure-table"><Table2 /></DockControl>
            <DockControl aria-label="Filter" data-testid="w-figure-filter"><Filter /></DockControl>
            <DockControl aria-label="Palette" data-testid="w-figure-palette"><Palette /></DockControl>
            <DockControl aria-label="Panel" data-testid="w-figure-panel"><PanelTop /></DockControl>
            <template #collapsed>
                <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>

        <!-- w-wide -->
        <GlassDock v-if="cell === 'w-wide'" data-testid="w-wide" aria-label="wide" collapse="closed" v-bind="flags">
            <DockControl aria-label="Volume"><Volume2 /></DockControl>
            <div class="flex w-56 items-center px-2" data-testid="w-wide-slider">
                <Slider v-model="volume" :max="100" :step="1" aria-label="Volume" />
            </div>
            <DockControl aria-label="Settings"><Settings /></DockControl>
            <template #collapsed>
                <Volume2 class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>

        <!-- w-outlet -->
        <template v-if="cell === 'w-outlet'">
            <GlassDock id="wi8-reader" data-testid="w-outlet" aria-label="reader" collapse="closed" v-bind="flags">
                <template #persistent>
                    <DockControl aria-label="Home" data-testid="w-outlet-home"><Home /></DockControl>
                </template>
                <DockControl aria-label="Reader" data-testid="w-outlet-read"><BookOpen /></DockControl>
                <DockControl aria-label="Search" data-testid="w-outlet-search"><Search /></DockControl>
                <span v-if="!proto" id="wi8-dock-page" style="display: contents"></span>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <!-- the page's own tree: contributes controls from outside the dock -->
            <section class="wi8-page" data-testid="w-outlet-page">
                <p>A page that contributes its tools to the dock.</p>
                <component :is="DockOutlet" v-if="proto" to="wi8-reader">
                    <DockControl aria-label="Bookmark" data-testid="w-outlet-mark"><Bookmark /></DockControl>
                    <Popover v-model:open="popOpen" keep-dock-open>
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Options" data-testid="w-outlet-options"><Settings /></DockControl>
                        </PopoverTrigger>
                        <PopoverContent data-testid="w-outlet-pop" class="w-56 p-3">
                            <p class="text-small">Options for this page.</p>
                        </PopoverContent>
                    </Popover>
                </component>
                <component :is="DockOutlet" v-if="proto" to="wi8-reader" region="persistent-end">
                    <DockControl :aria-label="playing ? 'Pause' : 'Play'" data-testid="w-outlet-play" @click="playing = !playing">
                        <Pause v-if="playing" /><Play v-else />
                    </DockControl>
                </component>
                <Teleport v-if="!proto" defer to="#wi8-dock-page">
                    <DockControl aria-label="Bookmark" data-testid="w-outlet-mark"><Bookmark /></DockControl>
                    <Popover v-model:open="popOpen" keep-dock-open>
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Options" data-testid="w-outlet-options"><Settings /></DockControl>
                        </PopoverTrigger>
                        <PopoverContent data-testid="w-outlet-pop" class="w-56 p-3">
                            <p class="text-small">Options for this page.</p>
                        </PopoverContent>
                    </Popover>
                </Teleport>
            </section>
        </template>

        <!-- w-xf -->
        <template v-if="cell === 'w-xf'">
            <div style="display: flex; gap: 4px">
                <button v-for="p in xfPanes" :key="p.id" type="button" :data-testid="`w-xf-${p.id}`" @click="xf = p.id">
                    {{ p.label }}
                </button>
            </div>
            <GlassDock data-testid="w-xf" aria-label="crossfade" :collapse="false" fit-content v-bind="flags">
                <DockCrossfade :active="xf">
                    <DockLayer v-for="p in xfPanes" :id="p.id" :key="p.id" :label="p.label" :icon="p.icon">
                        <div class="flex flex-col gap-1 py-1">
                            <div class="flex items-center gap-2 px-1">
                                <component :is="p.icon" class="h-4 w-4" />
                                <span class="text-small font-medium">{{ p.label }}</span>
                            </div>
                            <span v-for="(row, i) in p.rows" :key="i" class="px-1 text-micro text-muted-foreground">{{ row }}</span>
                        </div>
                    </DockLayer>
                </DockCrossfade>
            </GlassDock>
        </template>

        <!-- w-flow -->
        <div v-if="cell === 'w-flow'" class="wi8-flow">
            <GlassDock data-testid="w-flow" aria-label="flow" fit-content collapse="closed" v-bind="flags">
                <DockLayerGroup v-model:active="groupLayer" motion="full">
                    <DockLayer v-for="l in layers" :id="l.id" :key="l.id" :label="l.label" :icon="l.icon">
                        <component :is="l.icon" class="h-4 w-4" />
                        <span class="px-1 text-small font-medium">{{ l.label }}</span>
                    </DockLayer>
                </DockLayerGroup>
                <template #collapsed>
                    <Layers class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <p data-testid="w-flow-next" class="wi8-next">The paragraph after the dock.</p>
        </div>

        <!-- w-rounded -->
        <GlassDock v-if="cell === 'w-rounded'" data-testid="w-rounded" aria-label="rounded" shape="rounded" collapse="closed" v-bind="flags">
            <DockControl aria-label="Home"><Home /></DockControl>
            <DockControl aria-label="Search"><Search /></DockControl>
            <DockControl aria-label="Settings"><Settings /></DockControl>
        </GlassDock>
    </div>
</template>

<style>
.wi8-stage {
    min-height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px 8px;
    border-radius: 20px;
}
.wi8-top {
    justify-content: flex-start;
}
.wi8-row {
    display: flex;
    align-items: center;
    gap: 6px;
}
.wi8-page {
    font: 13px/1.4 system-ui, sans-serif;
    opacity: 0.8;
}
.wi8-flow {
    display: block;
    text-align: center;
}
.wi8-flow > .glass-dock {
    margin-inline: auto;
}
.wi8-next {
    font: 13px/1.4 system-ui, sans-serif;
    margin-top: 8px;
}
</style>
