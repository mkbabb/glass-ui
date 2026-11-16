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
// PROTOTYPE-2 cells (the spec after RULINGS-2):
//   w-seat    the site dock: Home in #persistent, four page seats with aria-current, a
//             divider and Settings; the open-seat cells change the current page
//   w-card    shape="card", horizontal          w-vert   a vertical pill
//   w-rail    atlas's vertical card rail (Home in #persistent)
//   w-ctl     ControlsDock (&corner=, &within=viewport|parent), four seats
//   w-ctl1    ControlsDock with one seat        w-ctlout  an outlet into a ControlsDock
//   w-scope   a pill under [data-dock-scope] with a follower at var(--dock-expand-t) * 100px
//   w-transport keyframes's transport: collapse closed, Play in #persistent, no #collapsed
//   w-fourier fourier's canvas dock: ControlsDock within="parent", Edit in #persistent-end
//   w-daraksha daraksha's composition: the site dock and a ControlsDock at the foot's end
//             corner, the page's controls contributed through DockOutlet, the theme seat last
//   w-sci     sci-report's filters: ControlsDock collapse="closed", words in #collapsed
// PROTOTYPE-3 cells (the spec after RULINGS-2, the rest of build step 7):
//   w-g8      overlays from run seats: a menu, a hover popover, a dialog, a sheet;
//             &press=1 opens the dock by press (expandOn="press")
//   w-g7      the outlet: two outlets into the run, one into #persistent-end on route A
//             only, &order=outlet-first mounts the outlets before the dock; buttons
//             unmount and remount the dock and switch the route; a probe in the
//             contributed content reports the dock context's id
//   w-lseats  a layer group whose faces hold DockControl seats (G-13 roving)
//   w-two     the site dock and two controls docks at two corners (G-13)
//   w-seatset the site dock with a seat added and removed by v-if, and a route that
//             changes the seat set (G-4)
//   w-color   value.js's Tools/Tool swap: a DockCrossfade of two faces in an open dock
//   w-kfcode  keyframes's code-pane controls dock: within="parent", corner top-end
// MEASURE-3 cells (the five behaviours the second fold left unbuilt):
//   w-many    O-358's dock: five tabs (the first current) and two avatar seats
//   w-ctl6    a ControlsDock of six controls (the cap), at 360
//   w-rim     a pill with the reading-progress rim at 40 % in its plate (#rim)
//   w-long    a site dock of ten seats, so the run scrolls even when compact
// MEASURE-6 cells (RULINGS-5):
//   w-words   three worded Select triggers in an open dock; a button outside sets the middle one's
//             value to a longer word (RULINGS-4's clarification of RU-28: the neighbours carried)
//   w-railp   a vertical rail whose folded face is only its persistent seats (no #collapsed):
//             it rests open on a coarse pointer (RU-43, O-376 (b))
import { computed, defineComponent, h, ref, onMounted } from "vue";
import * as dock from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { DockTrigger } from "@glass/components/dock/trigger";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@glass/components/menu";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";
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
    SkipBack,
    Repeat,
    Gauge,
    Copy,
} from "@lucide/vue";

const { GlassDock, DockControl, DockSeparator, DockLayerGroup, DockLayer, DockCrossfade } = dock;
const ControlsDock = (dock as Record<string, unknown>).ControlsDock as typeof GlassDock | undefined;
const DockOutlet = (dock as Record<string, unknown>).DockOutlet as typeof GlassDock | undefined;
const proto = !!DockOutlet;

const q = new URLSearchParams(location.search);
const cell = q.get("cell") ?? "w-std";
const neck = q.get("neck") === "b" ? "b" : "a";
const labelEnter = q.get("label") === "b" ? "b" : "a";
const ground = q.get("ground") ?? "";
const flags = { "data-neck": neck, "data-label-enter": labelEnter };
const corner = q.get("corner") ?? "bottom-end";
const within = q.get("within") === "parent" ? "parent" : "viewport";
// FOLD-2 (C2-8): &dir=rtl sets the page's direction before anything mounts.
if (q.get("dir") === "rtl") document.documentElement.dir = "rtl";
// MEASURE-4: the pill dock's exposed API, so a cell can call collapse() (G-1 (h)).
const pillDock = ref<{ collapse(): void } | null>(null);
onMounted(() => {
    (window as unknown as { __dockApi: typeof pillDock }).__dockApi = pillDock;
});
const g8Select = ref("a");
const wordsA = ref("day");
const wordsB = ref("bw");
/** MEASURE-7 w-glyphs: an unsized picture glyph (a disc), as a site's own image would be. */
const GLYPH_IMG = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#888"/></svg>');
const wordsC = ref("all");
const g8Pop = ref(false);

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
// PROTOTYPE-3 state
const press = q.get("press") === "1";
const outletFirst = q.get("order") === "outlet-first";
const g7Dock = ref(true);
const g7Route = ref<"a" | "b">("a");
const dialogOpen = ref(false);
const sheetOpen = ref(false);
const hoverOpen = ref(false);
const extraSeat = ref(false);
const seatRoute = ref<"x" | "y">("x");
const routePages = computed(() =>
    seatRoute.value === "x"
        ? pages
        : [pages[0]!, { id: "gallery", label: "Gallery", icon: Image }, { id: "type", label: "Type", icon: Type }],
);
const colorTool = ref("tools");
const lfaces = [
    { id: "draw", label: "Draw", seats: [{ id: "pen", icon: Type }, { id: "fill", icon: Palette }, { id: "erase", icon: Filter }] },
    { id: "view", label: "View", seats: [{ id: "grid", icon: Table2 }, { id: "zoom", icon: Search }] },
];
const lface = ref("draw");
// MEASURE-3: O-358's dock, five tabs and two avatar seats.
const manyTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Library", icon: Library },
    { id: "marks", label: "Bookmarks", icon: Bookmark },
    { id: "settings", label: "Settings", icon: Settings },
];
const manyCurrent = ref("home");
// MEASURE-3: a run that scrolls even when compact (ten seats), for two changes within 90 ms.
const longSeats = [Home, Search, Library, Bookmark, Settings, Layers, Palette, Filter, Table2, Image].map((icon, i) => ({ id: `s${i}`, label: `Seat ${i}`, icon }));
const longCurrent = ref(0);
/** Reports the dock context its slot sees (G-7: the outlet provides the dock's context). */
const CtxProbe = defineComponent({
    setup() {
        const ctx = (dock as Record<string, unknown>).useOptionalDockContext as (() => { id: string } | undefined) | undefined;
        const c = ctx?.();
        return () => h("span", { "data-testid": "w-g7-ctx", "data-dock-id": c?.id ?? "", hidden: true });
    },
});
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
        <GlassDock v-if="cell === 'w-pill'" ref="pillDock" data-testid="w-pill" aria-label="pill" collapse="closed" v-bind="flags">
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
                    <Popover v-model:open="popOpen">
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
                    <Popover v-model:open="popOpen">
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

        <!-- PROTOTYPE-2 cells -->
        <GlassDock v-if="cell === 'w-seat'" data-testid="w-seat" aria-label="site" collapse="closed">
            <template #persistent>
                <DockControl aria-label="Home" data-testid="w-seat-home"><Home /></DockControl>
            </template>
            <DockControl
                v-for="p in pages"
                :key="p.id"
                :aria-label="p.label"
                :data-testid="`w-seat-${p.id}`"
                :aria-current="current === p.id ? 'page' : undefined"
                @click="current = p.id"
            >
                <component :is="p.icon" />
            </DockControl>
            <DockSeparator />
            <DockControl aria-label="Settings" data-testid="w-seat-settings"><Settings /></DockControl>
            <template #collapsed>
                <BookOpen class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-card'" data-testid="w-card" aria-label="card" shape="card" collapse="closed">
            <DockControl aria-label="Home"><Home /></DockControl>
            <DockControl aria-label="Search"><Search /></DockControl>
            <DockControl aria-label="Library"><Library /></DockControl>
            <DockControl aria-label="Settings"><Settings /></DockControl>
            <template #collapsed>
                <Layers class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-vert'" data-testid="w-vert" aria-label="vertical" orientation="vertical" collapse="closed">
            <DockControl aria-label="Home"><Home /></DockControl>
            <DockControl aria-label="Search"><Search /></DockControl>
            <DockControl aria-label="Library"><Library /></DockControl>
            <template #collapsed>
                <Layers class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-rail'" data-testid="w-rail" aria-label="rail" orientation="vertical" shape="card" collapse="closed">
            <template #persistent>
                <DockControl aria-label="Home"><Home /></DockControl>
            </template>
            <DockControl aria-label="Reader" aria-current="page"><BookOpen /></DockControl>
            <DockControl aria-label="Search"><Search /></DockControl>
            <DockControl aria-label="Library"><Library /></DockControl>
            <template #collapsed>
                <Layers class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <template v-if="ControlsDock && cell === 'w-ctl'">
            <div :class="within === 'parent' ? 'wi8-figure' : ''" data-testid="w-ctl-host">
                <component :is="ControlsDock" data-testid="w-ctl" label="Figure controls" :corner="corner" :within="within" collapse="closed">
                    <DockControl aria-label="Table"><Table2 /></DockControl>
                    <DockControl aria-label="Filter"><Filter /></DockControl>
                    <DockControl aria-label="Palette"><Palette /></DockControl>
                    <DockControl aria-label="Panel"><PanelTop /></DockControl>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                    </template>
                </component>
            </div>
        </template>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-ctl1'" data-testid="w-ctl1" label="Theme" :corner="corner">
            <DockControl aria-label="Theme" @click="toggleTheme"><Moon v-if="dark" /><Sun v-else /></DockControl>
        </component>
        <!-- FOLD-2 (C2-11): one control that is the consumer's own element; a button and a slider -->
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-ctl-own'" data-testid="w-ctl-own" label="Zoom">
            <button type="button" aria-label="Zoom" style="inline-size: 44px; block-size: 44px">+</button>
        </component>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-ctl-mix'" data-testid="w-ctl-mix" label="Volume">
            <DockControl aria-label="Mute"><Volume2 /></DockControl>
            <Slider v-model="volume" :min="0" :max="100" aria-label="Volume" style="inline-size: 120px" />
        </component>
        <template v-if="ControlsDock && cell === 'w-ctlout'">
            <component :is="ControlsDock" id="wi8-controls" data-testid="w-ctlout" label="Page controls" collapse="closed">
                <DockControl aria-label="Theme" @click="toggleTheme"><Moon v-if="dark" /><Sun v-else /></DockControl>
                <template #collapsed>
                    <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                </template>
            </component>
            <section class="wi8-page">
                <component :is="DockOutlet" to="wi8-controls">
                    <DockControl aria-label="Grid" data-testid="w-ctlout-grid"><Table2 /></DockControl>
                    <DockControl aria-label="Gallery" data-testid="w-ctlout-gallery"><Image /></DockControl>
                </component>
            </section>
        </template>
        <div v-if="cell === 'w-scope'" data-dock-scope class="wi8-scope" data-testid="w-scope-host">
            <GlassDock data-testid="w-scope" aria-label="scoped" collapse="closed">
                <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <div class="wi8-follower" data-testid="w-scope-follower"></div>
        </div>
        <GlassDock v-if="cell === 'w-transport'" data-testid="w-transport" aria-label="transport" collapse="closed">
            <template #persistent>
                <DockControl :aria-label="playing ? 'Pause' : 'Play'" @click="playing = !playing"><Pause v-if="playing" /><Play v-else /></DockControl>
            </template>
            <DockControl aria-label="Volume"><Volume2 /></DockControl>
            <DockControl aria-label="Settings"><Settings /></DockControl>
        </GlassDock>
        <div v-if="ControlsDock && cell === 'w-fourier'" class="wi8-figure wi8-canvas" data-testid="w-fourier-host">
            <component :is="ControlsDock" data-testid="w-fourier" label="Canvas tools" within="parent" collapse="closed">
                <DockControl aria-label="Layers"><Layers /></DockControl>
                <DockControl aria-label="Palette"><Palette /></DockControl>
                <DockControl aria-label="Filter"><Filter /></DockControl>
                <template #persistent-end>
                    <DockControl aria-label="Edit"><Type /></DockControl>
                </template>
                <template #collapsed>
                    <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                </template>
            </component>
        </div>
        <template v-if="ControlsDock && cell === 'w-daraksha'">
            <GlassDock data-testid="w-daraksha-site" aria-label="site" collapse="closed">
                <template #persistent>
                    <DockControl aria-label="Home"><Home /></DockControl>
                </template>
                <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label" :aria-current="current === p.id ? 'page' : undefined" @click="current = p.id">
                    <component :is="p.icon" />
                </DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <component :is="ControlsDock" id="wi8-page-controls" data-testid="w-daraksha" label="Page controls">
                <DockControl aria-label="Theme" data-testid="w-daraksha-theme" @click="toggleTheme"><Moon v-if="dark" /><Sun v-else /></DockControl>
                <template #collapsed>
                    <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                </template>
            </component>
            <section class="wi8-page">
                <component :is="DockOutlet" to="wi8-page-controls">
                    <DockControl aria-label="Picker" data-testid="w-daraksha-picker"><Palette /></DockControl>
                    <DockControl aria-label="Grid"><Table2 /></DockControl>
                    <DockControl aria-label="Gallery"><Image /></DockControl>
                    <Popover v-model:open="popOpen">
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Info" data-testid="w-daraksha-info"><BookOpen /></DockControl>
                        </PopoverTrigger>
                        <PopoverContent data-testid="w-daraksha-pop" class="w-56 p-3">
                            <p class="text-small">About this page.</p>
                        </PopoverContent>
                    </Popover>
                </component>
            </section>
        </template>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-sci'" data-testid="w-sci" label="Filters" corner="top-end" collapse="closed">
            <DockControl aria-label="Sort"><BarChart3 /></DockControl>
            <DockControl aria-label="Filter"><Filter /></DockControl>
            <DockControl aria-label="Group"><Layers /></DockControl>
            <template #collapsed>
                <span>Filters · 3</span>
            </template>
        </component>

        <!-- PROTOTYPE-3 cells -->
        <template v-if="cell === 'w-g8'">
            <GlassDock data-testid="w-g8" aria-label="overlays" collapse="closed" :expand-on="press ? 'press' : 'hover'">
                <DockControl aria-label="Home" data-testid="w-g8-home"><Home /></DockControl>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <DockControl aria-label="Menu" data-testid="w-g8-menu"><Layers /></DockControl>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent data-testid="w-g8-menu-content">
                        <DropdownMenuItem>First</DropdownMenuItem>
                        <DropdownMenuItem>Second</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Popover v-model:open="hoverOpen" trigger="hover">
                    <PopoverTrigger as-child>
                        <DockControl aria-label="Info" data-testid="w-g8-hover"><BookOpen /></DockControl>
                    </PopoverTrigger>
                    <PopoverContent data-testid="w-g8-hover-pop" class="w-56 p-3"><p class="text-small">On hover.</p></PopoverContent>
                </Popover>
                <Dialog v-model:open="dialogOpen">
                    <DialogTrigger as-child>
                        <DockControl aria-label="Dialog" data-testid="w-g8-dialog"><PanelTop /></DockControl>
                    </DialogTrigger>
                    <DialogContent data-testid="w-g8-dialog-content">
                        <DialogTitle>Page settings</DialogTitle>
                        <DialogClose as-child><button type="button" data-testid="w-g8-dialog-close">Done</button></DialogClose>
                    </DialogContent>
                </Dialog>
                <Dialog v-model:open="sheetOpen">
                    <DialogTrigger as-child>
                        <DockControl aria-label="Sheet" data-testid="w-g8-sheet"><SlidersHorizontal /></DockControl>
                    </DialogTrigger>
                    <SheetContent side="bottom" data-testid="w-g8-sheet-content">
                        <DialogTitle>Filters</DialogTitle>
                        <DialogClose as-child><button type="button" data-testid="w-g8-sheet-close">Done</button></DialogClose>
                    </SheetContent>
                </Dialog>
                <!-- FOLD-2 (C2-10): a Select and a click Popover with no prop -->
                <Select v-model="g8Select">
                    <DockTrigger for="select" aria-label="View" data-testid="w-g8-select"><SelectValue /></DockTrigger>
                    <SelectContent data-testid="w-g8-select-content">
                        <SelectItem value="a">Alpha</SelectItem>
                        <SelectItem value="b">Beta</SelectItem>
                    </SelectContent>
                </Select>
                <Popover v-model:open="g8Pop">
                    <PopoverTrigger as-child>
                        <DockControl aria-label="Options" data-testid="w-g8-pop"><Settings /></DockControl>
                    </PopoverTrigger>
                    <PopoverContent data-testid="w-g8-pop-content" class="w-56 p-3"><p class="text-small">By click.</p></PopoverContent>
                </Popover>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
        </template>
        <template v-if="DockOutlet && cell === 'w-g7'">
            <div style="display: flex; gap: 6px">
                <button type="button" data-testid="w-g7-toggle-dock" @click="g7Dock = !g7Dock">dock</button>
                <button type="button" data-testid="w-g7-toggle-route" @click="g7Route = g7Route === 'a' ? 'b' : 'a'">route</button>
            </div>
            <section v-if="outletFirst" class="wi8-page" data-testid="w-g7-page">
                <component :is="DockOutlet" to="wi8-g7">
                    <DockControl aria-label="Bookmark" data-testid="w-g7-mark"><Bookmark /></DockControl>
                    <CtxProbe />
                </component>
                <component :is="DockOutlet" to="wi8-g7">
                    <DockControl aria-label="Options" data-testid="w-g7-options"><Settings /></DockControl>
                </component>
                <component :is="DockOutlet" v-if="g7Route === 'a'" to="wi8-g7" region="persistent-end">
                    <DockControl aria-label="Play" data-testid="w-g7-play"><Play /></DockControl>
                </component>
            </section>
            <GlassDock v-if="g7Dock" id="wi8-g7" data-testid="w-g7" aria-label="reader" collapse="closed">
                <DockControl aria-label="Reader" data-testid="w-g7-read"><BookOpen /></DockControl>
                <DockControl aria-label="Search" data-testid="w-g7-search"><Search /></DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <section v-if="!outletFirst" class="wi8-page" data-testid="w-g7-page">
                <component :is="DockOutlet" to="wi8-g7">
                    <DockControl aria-label="Bookmark" data-testid="w-g7-mark"><Bookmark /></DockControl>
                    <CtxProbe />
                </component>
                <component :is="DockOutlet" to="wi8-g7">
                    <DockControl aria-label="Options" data-testid="w-g7-options"><Settings /></DockControl>
                </component>
                <component :is="DockOutlet" v-if="g7Route === 'a'" to="wi8-g7" region="persistent-end">
                    <DockControl aria-label="Play" data-testid="w-g7-play"><Play /></DockControl>
                </component>
            </section>
        </template>
        <GlassDock v-if="cell === 'w-lseats'" data-testid="w-lseats" aria-label="tools" fit-content collapse="closed">
            <DockLayerGroup v-model:active="lface" motion="full">
                <DockLayer v-for="f in lfaces" :id="f.id" :key="f.id" :label="f.label">
                    <DockControl v-for="st in f.seats" :key="st.id" :aria-label="st.id" :data-testid="`w-lseats-${st.id}`"><component :is="st.icon" /></DockControl>
                </DockLayer>
            </DockLayerGroup>
            <template #collapsed>
                <Layers class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <template v-if="ControlsDock && cell === 'w-two'">
            <GlassDock data-testid="w-two-site" aria-label="site" collapse="closed">
                <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
            <component :is="ControlsDock" data-testid="w-two-a" label="Page controls" corner="bottom-end" :collapse="q.get('closed') ? 'closed' : undefined">
                <DockControl aria-label="Grid"><Table2 /></DockControl>
                <DockControl aria-label="Theme" @click="toggleTheme"><Moon v-if="dark" /><Sun v-else /></DockControl>
            </component>
            <component :is="ControlsDock" data-testid="w-two-b" label="Filters" corner="top-end" :collapse="q.get('closed') ? 'closed' : undefined">
                <DockControl aria-label="Filter"><Filter /></DockControl>
                <DockControl aria-label="Sort"><BarChart3 /></DockControl>
            </component>
        </template>
        <template v-if="cell === 'w-inflow'">
            <!-- INPUT-hover-shift (reading only): an in-flow collapsible dock in a row beside a neighbour, a block below -->
            <div data-testid="w-inflow-row" style="display: flex; align-items: center; gap: 12px">
                <GlassDock data-testid="w-inflow" aria-label="figure" collapse="closed">
                    <DockControl aria-label="Grid" data-testid="w-inflow-grid"><Table2 /></DockControl>
                    <DockControl aria-label="Filter"><Filter /></DockControl>
                    <DockControl aria-label="Sort"><BarChart3 /></DockControl>
                    <DockControl aria-label="Theme"><Palette /></DockControl>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                    </template>
                </GlassDock>
                <div data-testid="w-inflow-beside" style="padding: 8px 12px; border: 1px solid currentColor">legend</div>
            </div>
            <div data-testid="w-inflow-below" style="margin-top: 12px; padding: 8px 12px; border: 1px solid currentColor">the figure below</div>
        </template>
        <!-- MEASURE-7 (RU-61's prototype cells, from the sites' source as USAGE.md reads it):
             w-atlas   atlas's figure head row: a title, the legend (words and a link) and PlateDock, anchor="end" with
                       its Table seat in #persistent (PlateDock.vue:150-156)
             w-kf      keyframes's transport: a fixed wrapper at the bottom centre holding an in-flow dock whose Play
                       seat is #persistent (TransportDock.vue:6-9), as shipped (anchor unset, so "center")
             w-kfs     the same with anchor="start" (question 15's other row)
             w-dk      daraksha's Motion page: a fixed wrapper holding the site dock with #persistent-end filled
                       (SiteDock.vue:232, :289-294) -->
        <template v-if="cell === 'w-atlas'">
            <div data-testid="w-atlas-row" style="display: flex; align-items: center; gap: 12px; inline-size: min(100%, 720px)">
                <h3 data-testid="w-atlas-title" style="margin: 0; font-size: 15px">Wages by region, 2019 to 2025</h3>
                <div data-testid="w-atlas-legend" style="display: flex; gap: 10px; align-items: center; margin-inline-start: auto; font-size: 13px">
                    <span>North-east</span><span>South</span><span>West</span><a href="#legend" data-testid="w-atlas-link">sources</a>
                </div>
                <GlassDock data-testid="w-atlas" aria-label="figure" collapse="closed" anchor="end">
                    <template #persistent>
                        <DockControl aria-label="Table" data-testid="w-atlas-table"><Table2 /></DockControl>
                    </template>
                    <DockControl aria-label="Grid"><Filter /></DockControl>
                    <DockControl aria-label="Sort"><BarChart3 /></DockControl>
                    <DockControl aria-label="Theme"><Palette /></DockControl>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                    </template>
                </GlassDock>
            </div>
            <div data-testid="w-atlas-below" style="margin-top: 12px; padding: 8px 12px; border: 1px solid currentColor; inline-size: min(100%, 720px)">the figure</div>
        </template>
        <template v-if="cell === 'w-kf' || cell === 'w-kfs'">
            <div data-testid="w-kf-wrap" style="position: fixed; inset-block-end: 24px; inset-inline: 0; display: flex; justify-content: center; pointer-events: none">
                <div style="pointer-events: auto">
                    <GlassDock data-testid="w-kf" aria-label="transport" collapse="closed" :anchor="cell === 'w-kfs' ? 'start' : undefined">
                        <template #persistent>
                            <DockControl aria-label="Play" data-testid="w-kf-play"><Play /></DockControl>
                        </template>
                        <DockControl aria-label="Back"><SkipBack /></DockControl>
                        <DockControl aria-label="Loop"><Repeat /></DockControl>
                        <DockControl aria-label="Speed"><Gauge /></DockControl>
                        <DockControl aria-label="Copy CSS"><Copy /></DockControl>
                    </GlassDock>
                </div>
            </div>
        </template>
        <template v-if="cell === 'w-dk'">
            <div data-testid="w-dk-wrap" style="position: fixed; inset-block-end: 24px; inset-inline: 0; display: flex; justify-content: center; pointer-events: none">
                <div style="pointer-events: auto">
                    <GlassDock data-testid="w-dk" aria-label="site" collapse="closed">
                        <DockControl aria-label="Home"><Home /></DockControl>
                        <DockControl aria-label="Motion" aria-current="page"><Gauge /></DockControl>
                        <DockControl aria-label="Library"><Library /></DockControl>
                        <template #persistent-end>
                            <DockControl aria-label="Play" data-testid="w-dk-play"><Play /></DockControl>
                        </template>
                        <template #collapsed>
                            <BookOpen class="h-4 w-4" aria-hidden="true" />
                        </template>
                    </GlassDock>
                </div>
            </div>
        </template>
        <template v-if="cell === 'w-seatset'">
            <div style="display: flex; gap: 6px">
                <button type="button" data-testid="w-seatset-add" @click="extraSeat = !extraSeat">seat</button>
                <button type="button" data-testid="w-seatset-route" @click="seatRoute = seatRoute === 'x' ? 'y' : 'x'">route</button>
            </div>
            <GlassDock data-testid="w-seatset" aria-label="site" collapse="closed">
                <DockControl v-for="p in routePages" :key="p.id" :aria-label="p.label" :aria-current="p.id === routePages[0]!.id ? 'page' : undefined"><component :is="p.icon" /></DockControl>
                <DockControl v-if="extraSeat" aria-label="Extra" data-testid="w-seatset-extra"><Palette /></DockControl>
                <template #collapsed>
                    <BookOpen class="h-4 w-4" aria-hidden="true" />
                </template>
            </GlassDock>
        </template>
        <template v-if="cell === 'w-color'">
            <div style="display: flex; gap: 4px">
                <button type="button" data-testid="w-color-tools" @click="colorTool = 'tools'">Tools</button>
                <button type="button" data-testid="w-color-tool" @click="colorTool = 'tool'">Tool</button>
            </div>
            <GlassDock data-testid="w-color" aria-label="colour" :collapse="false" fit-content>
                <DockCrossfade :active="colorTool">
                    <DockLayer id="tools" label="Tools">
                        <DockControl aria-label="Picker"><Palette /></DockControl>
                        <DockControl aria-label="Mixer"><SlidersHorizontal /></DockControl>
                        <DockControl aria-label="Gradient"><Layers /></DockControl>
                        <DockControl aria-label="Library"><Library /></DockControl>
                    </DockLayer>
                    <DockLayer id="tool" label="Tool">
                        <DockControl aria-label="Back"><Home /></DockControl>
                        <div class="flex w-40 items-center px-2"><Slider v-model="volume" :max="100" :step="1" aria-label="Hue" /></div>
                    </DockLayer>
                </DockCrossfade>
            </GlassDock>
        </template>
        <!-- MEASURE-3 cells -->
        <template v-if="cell === 'w-words'">
            <GlassDock data-testid="w-words" aria-label="figure" :collapse="false">
                <Select v-model="wordsA">
                    <DockTrigger for="select" aria-label="Range" data-testid="w-words-a"><SelectValue /></DockTrigger>
                    <SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="week">Week</SelectItem></SelectContent>
                </Select>
                <Select v-model="wordsB">
                    <DockTrigger for="select" aria-label="View" data-testid="w-words-b"><SelectValue /></DockTrigger>
                    <SelectContent><SelectItem value="bw">View: Bandwidth</SelectItem><SelectItem value="cbw">View: Contracted bandwidth</SelectItem></SelectContent>
                </Select>
                <Select v-model="wordsC">
                    <DockTrigger for="select" aria-label="Region" data-testid="w-words-c"><SelectValue /></DockTrigger>
                    <SelectContent><SelectItem value="all">All regions</SelectItem><SelectItem value="ne">North-east</SelectItem></SelectContent>
                </Select>
            </GlassDock>
            <button type="button" data-testid="w-words-longer" style="margin-top: 24px" @click="wordsB = wordsB === 'bw' ? 'cbw' : 'bw'">longer</button>
        </template>
        <!-- MEASURE-7 (RU-55, RU-58, RU-65): w-glyphs, G-13's two census lines. An icon dock whose seats hold each of
             the four glyph forms unsized (a lucide svg, an img, a picture, a [data-dock-glyph] mark) and a labelled icon
             seat (o1's form), and a tab dock whose seats hold the same four forms beside a word. -->
        <template v-if="cell === 'w-glyphs'">
            <GlassDock data-testid="w-glyphs-icon" aria-label="icons" :collapse="false">
                <DockControl aria-label="svg" data-glyph="svg"><Home /></DockControl>
                <DockControl aria-label="img" data-glyph="img"><img :src="GLYPH_IMG" alt="" /></DockControl>
                <DockControl aria-label="picture" data-glyph="picture"><picture><img :src="GLYPH_IMG" alt="" style="inline-size: 100%; block-size: 100%" /></picture></DockControl>
                <DockControl aria-label="mark" data-glyph="mark"><span data-dock-glyph style="background: currentColor; border-radius: 50%"></span></DockControl>
                <DockControl compact aria-label="Focus" data-glyph="svg" data-worded=""><Home /><span>Focus</span></DockControl>
            </GlassDock>
            <GlassDock data-testid="w-glyphs-tab" aria-label="tabs" :collapse="false">
                <DockControl shape="tab" data-glyph="svg" data-worded=""><Home /><span>Home</span></DockControl>
                <DockControl shape="tab" data-glyph="img" data-worded=""><img :src="GLYPH_IMG" alt="" /><span>Image</span></DockControl>
                <DockControl shape="tab" data-glyph="picture" data-worded=""><picture><img :src="GLYPH_IMG" alt="" style="inline-size: 100%; block-size: 100%" /></picture><span>Picture</span></DockControl>
                <DockControl shape="tab" data-glyph="mark" data-worded=""><span data-dock-glyph style="background: currentColor; border-radius: 50%"></span><span>Mark</span></DockControl>
            </GlassDock>
        </template>
        <!-- MEASURE-7 (RU-54, C6-M8): w-pwords, a dock capped by its stage whose #persistent seat is a worded Select
             trigger; the button outside makes its word longer or shorter, which takes room from the run with the run's
             seats, their count and the root's extent unchanged. -->
        <template v-if="cell === 'w-pwords'">
            <GlassDock data-testid="w-pwords" aria-label="figure" :collapse="false" style="max-inline-size: 100%">
                <template #persistent>
                    <Select v-model="wordsB">
                        <DockTrigger for="select" aria-label="View" data-testid="w-pwords-view"><SelectValue /></DockTrigger>
                        <SelectContent><SelectItem value="bw">View: Bandwidth</SelectItem><SelectItem value="cbw">View: Contracted bandwidth</SelectItem></SelectContent>
                    </Select>
                </template>
                <DockControl v-for="p in manyTabs.slice(0, 3)" :key="p.id" :aria-label="p.label" :data-testid="`w-pwords-${p.id}`"><component :is="p.icon" /></DockControl>
            </GlassDock>
            <button type="button" data-testid="w-pwords-longer" style="margin-top: 24px" @click="wordsB = wordsB === 'bw' ? 'cbw' : 'bw'">longer</button>
        </template>
        <GlassDock v-if="cell === 'w-railp'" data-testid="w-railp" aria-label="sections" orientation="vertical" collapse="closed">
            <template #persistent>
                <DockControl aria-label="Home" data-testid="w-railp-home"><Home /></DockControl>
            </template>
            <DockControl aria-label="Reader" aria-current="page"><BookOpen /></DockControl>
            <DockControl aria-label="Search"><Search /></DockControl>
            <template #persistent-end>
                <DockControl aria-label="Settings"><Settings /></DockControl>
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-many'" data-testid="w-many" aria-label="dashboard" collapse="closed">
            <DockControl
                v-for="p in manyTabs"
                :key="p.id"
                :aria-label="p.label"
                :data-testid="`w-many-${p.id}`"
                :aria-current="manyCurrent === p.id ? 'page' : undefined"
                @click="manyCurrent = p.id"
            >
                <component :is="p.icon" />
            </DockControl>
            <DockControl aria-label="Ana" data-testid="w-many-ana"><span class="wi8-avatar">A</span></DockControl>
            <DockControl aria-label="Ben" data-testid="w-many-ben"><span class="wi8-avatar">B</span></DockControl>
            <template #collapsed>
                <Home class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-long'" data-testid="w-long" aria-label="site" collapse="closed">
            <DockControl
                v-for="(p, i) in longSeats"
                :key="p.id"
                :aria-label="p.label"
                :data-testid="`w-long-${i}`"
                :aria-current="longCurrent === i ? 'page' : undefined"
                @click="longCurrent = i"
            >
                <component :is="p.icon" />
            </DockControl>
            <template #collapsed>
                <Home class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-ctl6'" data-testid="w-ctl6" label="Six controls" collapse="closed">
            <DockControl aria-label="Table"><Table2 /></DockControl>
            <DockControl aria-label="Filter"><Filter /></DockControl>
            <DockControl aria-label="Palette"><Palette /></DockControl>
            <DockControl aria-label="Panel"><PanelTop /></DockControl>
            <DockControl aria-label="Layers"><Layers /></DockControl>
            <DockControl aria-label="Theme"><Sun /></DockControl>
            <template #collapsed>
                <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
            </template>
        </component>
        <GlassDock v-if="cell === 'w-rim'" data-testid="w-rim" aria-label="reader" collapse="closed">
            <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
            <template #collapsed>
                <BookOpen class="h-4 w-4" aria-hidden="true" />
            </template>
            <template #rim>
                <ScrollProgressRim :value="0.4" edge="border" data-testid="w-rim-rim" />
            </template>
        </GlassDock>

        <div v-if="ControlsDock && cell === 'w-kfcode'" class="wi8-figure" data-testid="w-kfcode-host">
            <component :is="ControlsDock" data-testid="w-kfcode" label="Code actions" within="parent" corner="top-end" collapse="closed">
                <DockControl aria-label="Copy"><Bookmark /></DockControl>
                <DockControl aria-label="Format"><Type /></DockControl>
                <DockControl aria-label="Run"><Play /></DockControl>
                <template #collapsed>
                    <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                </template>
            </component>
        </div>
    </div>
</template>

<style>
.wi8-figure {
    position: relative;
    width: min(92vw, 640px);
    height: 320px;
    border-radius: 16px;
    background: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.04) 0 10px, transparent 10px 20px);
}
.wi8-scope {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}
.wi8-follower {
    width: 24px;
    height: 8px;
    border-radius: 4px;
    background: currentColor;
    translate: calc(var(--dock-expand-t, 0) * 100px) 0;
}
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
.wi8-avatar {
    display: grid;
    place-items: center;
    inline-size: 1.5rem;
    block-size: 1.5rem;
    border-radius: 50%;
    font: 600 12px/1 system-ui, sans-serif;
    background: color-mix(in oklab, currentColor 14%, transparent);
}
.wi8-next {
    font: 13px/1.4 system-ui, sans-serif;
    margin-top: 8px;
}
</style>
