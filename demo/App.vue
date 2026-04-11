<script setup lang="ts">
import { ref, reactive, nextTick, watch, computed } from "vue";
import { useCharSplit } from "@/composables/useCharSplit";
import { GlassPanel } from "@/components/custom/glass-panel";
import { useAurora, DEFAULT_AURORA_CONFIG, ATMOSPHERE_PRESET } from "@/components/custom/aurora/composables/useAurora";
import { useMetaballs, DEFAULT_METABALL_CONFIG, type MetaballConfig } from "@/components/custom/metaballs";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BouncyTabs } from "@/components/custom/tabs";
import { DarkModeToggle } from "@/components/custom/controls";
import { GlassDock, DockLayerGroup, DockLayer } from "@/components/custom/dock";
import { SortableList, SortableItem, SortableHandle } from "@/components/custom/sortable-list";
import { ToggleChip } from "@/components/custom/toggle-chip";
import { Layers, Package, Library, GripVertical } from "lucide-vue-next";
import ConfigPanel from "./components/ConfigPanel.vue";
import { FONTS, applyFont, type FontOption } from "./fonts";
import { AURORA_SECTIONS, METABALL_SECTIONS, ATMOSPHERE_SECTIONS } from "./backgroundConfigs";

// ── Page navigation ──
type Page = "demo" | "config";
const currentPage = ref<Page>("demo");

// ── Dark mode (via useGlobalDark — shared with DarkModeToggle + aurora) ──

// ── Font ──
const activeFont = ref<FontOption>(FONTS[0]);
watch(activeFont, (f) => applyFont(f), { immediate: true });

// ── Background mode ──
type BgMode = "aurora" | "metaballs";
const bgMode = ref<BgMode>("aurora");
const baseColor = ref("#c084fc");

// ── Canvas refs ──
const auroraCanvasRef = ref<HTMLCanvasElement | null>(null);
const metaballCanvasRef = ref<HTMLCanvasElement | null>(null);

// ── Configs ──
const auroraConfig = reactive({ ...DEFAULT_AURORA_CONFIG });
const metaballConfig = reactive<Required<MetaballConfig>>({
    ...DEFAULT_METABALL_CONFIG,
    colors: ["#c084fc", "#60a5fa", "#f472b6", "#34d399"],
    bgAlpha: 0.0,
});

// ── Initialize composables (shared reactive config) ──
useAurora(auroraCanvasRef, auroraConfig, baseColor);
useMetaballs(metaballCanvasRef, metaballConfig);

// Aurora color mode toggle — applies full preset when switching
const auroraColorMode = computed({
    get: () => auroraConfig.colorMode,
    set: (mode: string) => {
        if (mode === "derived") {
            Object.assign(auroraConfig, ATMOSPHERE_PRESET);
        } else {
            Object.assign(auroraConfig, {
                ...DEFAULT_AURORA_CONFIG,
                colors: DEFAULT_AURORA_CONFIG.colors,
            });
        }
    },
});

// ── Active config for config page ──
const activeConfigObj = computed(() => bgMode.value === "aurora" ? auroraConfig : metaballConfig);
const activeSections = computed(() => {
    if (bgMode.value === "metaballs") return METABALL_SECTIONS;
    return auroraConfig.colorMode === "derived" ? ATMOSPHERE_SECTIONS : AURORA_SECTIONS;
});
const activeDefaults = computed(() => {
    if (bgMode.value === "metaballs") return { ...DEFAULT_METABALL_CONFIG };
    return auroraConfig.colorMode === "derived"
        ? { ...DEFAULT_AURORA_CONFIG, ...ATMOSPHERE_PRESET }
        : { ...DEFAULT_AURORA_CONFIG };
});
const panelTitle = computed(() => {
    if (bgMode.value === "metaballs") return "Metaballs";
    return auroraConfig.colorMode === "derived" ? "Aurora (derived)" : "Aurora";
});

// ── Demo state ──
const heroChars = useCharSplit("Glassmorphism");
const showCharStagger = ref(true);
const replayCharStagger = async () => { showCharStagger.value = false; await nextTick(); showCharStagger.value = true; };
const showBreathe = ref(true);
const replayBreathe = async () => { showBreathe.value = false; await nextTick(); showBreathe.value = true; };
const showDialog = ref(false);
const showDropdown = ref(false);
const showPop = ref(false);
const showFadeSlide = ref(false);
const staggerItems = ["Spring-smooth", "Snappy dropdown", "Bouncy dialog", "Gentle panel", "Progressive blur", "Caustic shimmer"];
const showStagger = ref(true);
const replayStagger = async () => { showStagger.value = false; await nextTick(); showStagger.value = true; };
const showScrollReveal = ref(true);
const replayScrollReveal = async () => { showScrollReveal.value = false; await nextTick(); showScrollReveal.value = true; };

// ── Vertical GlassDock example state ──
const verticalDockLayer = ref("assets");

// ── Sortable list example state ──
interface SortableRow {
    id: string;
    label: string;
    subtitle: string;
}
const sortableRows = ref<SortableRow[]>([
    { id: "hero", label: "Hero", subtitle: "Above the fold" },
    { id: "featured", label: "Featured work", subtitle: "Case study carousel" },
    { id: "about", label: "About", subtitle: "Bio + values" },
    { id: "journal", label: "Journal", subtitle: "Recent notes" },
    { id: "contact", label: "Contact", subtitle: "Footer card" },
]);
function commitSortableReorder(next: SortableRow[]) {
    sortableRows.value = next;
}

// ── ToggleChip example state ──
const toggleChipFilter = ref<"outer" | "counter">("outer");
const toggleChipBones = ["crown", "base", "throat", "stem", "tail"] as const;
const activeBone = ref<string | null>("stem");
const posePreviewIds = [
    { id: "idle", label: "Idle" },
    { id: "excited", label: "Excited" },
    { id: "scared", label: "Scared" },
    { id: "sleepy", label: "Sleepy" },
    { id: "sad", label: "Sad" },
] as const;
const activePose = ref<string>("idle");
</script>

<template>
    <TooltipProvider>
    <div class="min-h-screen text-foreground">
        <!-- ═══ Background canvases ═══ -->
        <canvas
            v-show="bgMode === 'aurora'"
            ref="auroraCanvasRef"
            aria-hidden="true"
            style="position: fixed; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;"
        />
        <canvas
            v-show="bgMode === 'metaballs'"
            ref="metaballCanvasRef"
            aria-hidden="true"
            class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        />

        <div class="mx-auto max-w-6xl px-6 py-8">

            <!-- ═══════════ Shared Header (persists across pages) ═══════════ -->
            <header class="glass-default sticky top-4 z-overlay mb-8 flex flex-wrap items-center gap-4 rounded-card p-4">
                <span class="text-small font-medium">glass-ui</span>

                <Separator orientation="vertical" class="h-6" />

                <Select
                    :model-value="activeFont.name"
                    @update:model-value="(name) => {
                        const f = FONTS.find(f => f.name === String(name));
                        if (f) activeFont = f;
                    }"
                >
                    <SelectTrigger class="w-48 h-9 font-sans text-sm">
                        <SelectValue placeholder="Choose font" />
                    </SelectTrigger>
                    <SelectContent class="font-sans">
                        <SelectGroup>
                            <SelectLabel class="font-sans text-xs">Sans-Serif</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'sans')" :key="f.name" :value="f.name" :style="{ fontFamily: f.family }">{{ f.name }}</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel class="font-sans text-xs">Serif</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'serif')" :key="f.name" :value="f.name" :style="{ fontFamily: f.family }">{{ f.name }}</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel class="font-sans text-xs">Monospace</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'mono')" :key="f.name" :value="f.name" :style="{ fontFamily: f.family }">{{ f.name }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" class="h-6" />

                <BouncyTabs
                    v-model="bgMode"
                    variant="pill"
                    :options="[{ label: 'Aurora', value: 'aurora' }, { label: 'Metaballs', value: 'metaballs' }]"
                />

                <!-- Derived mode sub-toggle (only when aurora active) -->
                <template v-if="bgMode === 'aurora'">
                    <BouncyTabs
                        v-model="auroraColorMode"
                        variant="pill"
                        :options="[{ label: 'Explicit', value: 'explicit' }, { label: 'Derived', value: 'derived' }]"
                    />
                    <input
                        v-if="auroraConfig.colorMode === 'derived'"
                        type="color"
                        v-model="baseColor"
                        class="h-7 w-7 cursor-pointer appearance-none rounded-pill border-2 border-border/30 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-pill [&::-webkit-color-swatch]:border-none"
                        title="Base color"
                    />
                </template>

                <div class="flex-1" />

                <!-- Page nav -->
                <BouncyTabs
                    v-model="currentPage"
                    :options="[{ label: 'Demo', value: 'demo' }, { label: 'Config', value: 'config' }]"
                />

                <Separator orientation="vertical" class="h-6" />

                <DarkModeToggle class="size-6" />
            </header>

            <!-- ═══════════ Page content with animated transition ═══════════ -->
            <Transition name="pane-swap" mode="out-in">

                <!-- ════════ CONFIG PAGE ════════ -->
                <div v-if="currentPage === 'config'" key="config">
                    <ConfigPanel
                        :config="activeConfigObj"
                        :sections="activeSections"
                        :defaults="activeDefaults"
                        :title="panelTitle"
                    />
                </div>

                <!-- ════════ DEMO PAGE ════════ -->
                <div v-else key="demo">
                    <!-- Font info -->
                    <div class="glass-default mb-12 rounded-panel p-3">
                        <div class="flex items-baseline gap-3">
                            <span class="text-heading" :style="{ fontFamily: activeFont.family }">{{ activeFont.name }}</span>
                            <span class="text-caption text-muted-foreground">{{ activeFont.axes }}</span>
                        </div>
                        <p class="text-small text-muted-foreground mt-1">{{ activeFont.personality }}</p>
                    </div>

                    <!-- Typography -->
                    <section class="mb-20">
                        <p class="section-label mb-4">Typography & Kinetic Type</p>
                        <h1 class="text-display-3 mb-4">The future is translucent</h1>
                        <p class="text-title mb-8 text-muted-foreground">Swiss confidence, not corporate heaviness</p>

                        <div class="mb-8">
                            <div class="mb-2 flex items-center gap-3">
                                <p class="text-caption text-muted-foreground">Per-character stagger</p>
                                <Button variant="glass-subtle" size="sm" class="rounded-pill h-7 px-3 text-micro" @click="replayCharStagger">↻ Replay</Button>
                            </div>
                            <h2 v-if="showCharStagger" class="char-stagger text-display-2" v-html="heroChars" />
                        </div>

                        <div class="mb-8">
                            <div class="mb-2 flex items-center gap-3">
                                <p class="text-caption text-muted-foreground">Weight breathing</p>
                                <Button variant="glass-subtle" size="sm" class="rounded-pill h-7 px-3 text-micro" @click="replayBreathe">↻ Replay</Button>
                            </div>
                            <p v-if="showBreathe" class="text-breathe text-display">Ambient motion</p>
                        </div>

                        <div class="mb-8">
                            <p class="text-caption mb-2 text-muted-foreground">WONK/SOFT hover</p>
                            <p class="text-wonk-hover text-display cursor-pointer">Hover me</p>
                        </div>

                        <div class="grid grid-cols-2 gap-8">
                            <div>
                                <p class="text-caption mb-2 text-muted-foreground">.tabular-nums</p>
                                <div class="tabular-nums text-heading space-y-1">
                                    <div>1,234,567.89</div>
                                    <div>9,876,543.21</div>
                                    <div>&nbsp;&nbsp;&nbsp;100,000.00</div>
                                </div>
                            </div>
                            <div>
                                <p class="text-caption mb-2 text-muted-foreground">.text-hover-spread</p>
                                <p class="text-hover-spread text-title cursor-pointer">Hover to spread</p>
                            </div>
                        </div>
                    </section>

                    <!-- Glass Depth -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Glass Depth System</p>
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div class="glass-subtle rounded-card p-6"><h3 class="text-heading mb-2">.glass-subtle</h3><p class="text-small text-muted-foreground">blur 4px, sat 1.05, opacity 30%</p></div>
                            <div class="glass-default rounded-card p-6"><h3 class="text-heading mb-2">.glass-default</h3><p class="text-small text-muted-foreground">blur 8px, sat 1.2, opacity 50%</p></div>
                            <div class="glass-medium rounded-card p-6"><h3 class="text-heading mb-2">.glass-medium</h3><p class="text-small text-muted-foreground">blur 12px, sat 1.3, opacity 65%</p></div>
                        </div>
                        <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                            <div class="glass-elevated rounded-card p-6"><h3 class="text-heading mb-2">.glass-elevated</h3><p class="text-small text-muted-foreground">blur 16px, sat 1.4, opacity 80%</p></div>
                            <div class="glass-card p-6"><h3 class="text-heading mb-2">.glass-card</h3><p class="text-small text-muted-foreground">default tier + radius-card + shadow</p></div>
                        </div>
                        <div class="glass-medium mt-6 rounded-card p-6">
                            <p class="text-glass-legible text-display">Legible over glass</p>
                        </div>
                    </section>

                    <!-- GlassPanel -->
                    <section class="mb-20">
                        <p class="section-label mb-6">GlassPanel — Tiered Renderer</p>
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <GlassPanel tier="css" variant="default" class="rounded-card p-6"><h3 class="text-heading mb-2">CSS</h3><p class="text-small text-muted-foreground">backdrop-filter + grain</p></GlassPanel>
                            <GlassPanel tier="svg-filter" :blur="16" :refraction="0.6" :chromatic-aberration="true" class="rounded-card p-6"><h3 class="text-heading mb-2">SVG filter</h3><p class="text-small text-muted-foreground">Snell displacement + Fresnel</p></GlassPanel>
                            <GlassPanel tier="css" variant="elevated" class="rounded-card p-6"><h3 class="text-heading mb-2">CSS elevated</h3><p class="text-small text-muted-foreground">Max frosting + grain</p></GlassPanel>
                        </div>
                    </section>

                    <!-- Spring Animations -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Spring Animations</p>
                        <div class="flex flex-wrap gap-3 mb-6">
                            <Button variant="glass" @click="showDialog = !showDialog">Dialog (bouncy)</Button>
                            <Button variant="glass" @click="showDropdown = !showDropdown">Dropdown (snappy)</Button>
                            <Button variant="glass" @click="showPop = !showPop">Pop (bouncy)</Button>
                            <Button variant="glass" @click="showFadeSlide = !showFadeSlide">Fade-slide (smooth)</Button>
                        </div>
                        <Transition name="fade"><div v-if="showDialog" class="glass-overlay fixed inset-0 z-overlay" @click="showDialog = false" /></Transition>
                        <Transition name="dialog-scale">
                            <div v-if="showDialog" class="glass-elevated fixed left-1/2 top-1/2 z-modal w-80 -translate-x-1/2 -translate-y-1/2 rounded-dialog p-8">
                                <h3 class="text-heading mb-3">Spring Dialog</h3>
                                <p class="text-small mb-4 text-muted-foreground">--spring-bouncy: 20% overshoot</p>
                                <Button variant="glass" size="sm" @click="showDialog = false">Close</Button>
                            </div>
                        </Transition>
                        <Transition name="dropdown"><div v-if="showDropdown" class="glass-elevated inline-block rounded-panel p-3 mb-4"><div class="space-y-1 text-small"><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 1</div><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 2</div><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 3</div></div></div></Transition>
                        <Transition name="pop"><div v-if="showPop" class="glass-default inline-block rounded-card p-6 mb-4"><p class="text-heading">Pop!</p></div></Transition>
                        <Transition name="fade-slide"><div v-if="showFadeSlide" class="glass-default rounded-card p-6 mb-4"><p class="text-heading">Fade-slide</p></div></Transition>
                        <div class="glass-subtle rounded-panel p-4"><code class="text-micro block space-y-1"><div>--spring-smooth: no overshoot</div><div>--spring-snappy: 7% overshoot</div><div>--spring-bouncy: 20% overshoot</div><div>--spring-gentle: ~0.6% overshoot</div></code></div>
                    </section>

                    <!-- Stagger -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Stagger & Entry</p>
                        <Button variant="glass" class="mb-4" @click="replayStagger">↻ Replay stagger</Button>
                        <div v-if="showStagger" class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-3 mb-12">
                            <div v-for="(item, i) in staggerItems" :key="i" class="glass-default rounded-panel p-4"><p class="text-small">{{ item }}</p></div>
                        </div>
                        <div class="mb-2 flex items-center gap-3">
                            <p class="text-caption text-muted-foreground">.scroll-reveal-reverse</p>
                            <Button variant="glass-subtle" size="sm" class="rounded-pill h-7 px-3 text-micro" @click="replayScrollReveal">↻ Replay</Button>
                        </div>
                        <div v-if="showScrollReveal" class="space-y-4 mb-12">
                            <div v-for="i in 4" :key="i" class="scroll-reveal-reverse glass-default rounded-panel p-6"><p class="text-heading">Scroll-revealed {{ i }}</p></div>
                        </div>
                        <p class="text-caption mb-2 text-muted-foreground">.scroll-weight-reveal</p>
                        <p class="scroll-weight-reveal text-display-2">Weight reveals on scroll</p>
                    </section>

                    <!-- Vertical GlassDock with DockLayer children -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Vertical GlassDock & Multi-Layer</p>
                        <div class="flex flex-wrap items-start gap-8">
                            <GlassDock
                                orientation="vertical"
                                :always-expanded="true"
                                :start-collapsed="false"
                                position="inline"
                                class="self-start"
                            >
                                <DockLayerGroup
                                    v-model:active="verticalDockLayer"
                                    orientation="vertical"
                                >
                                    <DockLayer id="assets" label="Assets" :icon="Package">
                                        <div class="flex flex-col gap-2 p-2 min-w-48">
                                            <p class="text-caption text-muted-foreground">Assets</p>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Logo.svg</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Hero.png</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Pattern.jpg</div>
                                        </div>
                                    </DockLayer>
                                    <DockLayer id="layers" label="Layers" :icon="Layers">
                                        <div class="flex flex-col gap-2 p-2 min-w-48">
                                            <p class="text-caption text-muted-foreground">Layers</p>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Background</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Frame 01</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Frame 02</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">Text</div>
                                        </div>
                                    </DockLayer>
                                    <DockLayer id="libs" label="Libraries" :icon="Library">
                                        <div class="flex flex-col gap-2 p-2 min-w-48">
                                            <p class="text-caption text-muted-foreground">Libraries</p>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">glass-ui</div>
                                            <div class="rounded-lg px-3 py-2 text-small hover:bg-accent">reka-ui</div>
                                        </div>
                                    </DockLayer>
                                </DockLayerGroup>
                            </GlassDock>
                            <div class="flex-1 text-small text-muted-foreground">
                                <p class="mb-2">A vertical <code>GlassDock</code> hosts a <code>DockLayerGroup</code> with three <code>DockLayer</code> children (Assets / Layers / Libraries).</p>
                                <p>The group auto-generates a switcher rail from each layer's icon + label, and crossfades between panes with a FLIP size animation on the active axis.</p>
                            </div>
                        </div>
                    </section>

                    <!-- SortableList — pointer-drag reorder -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Sortable — Pointer-drag Reorder</p>
                        <div class="flex flex-col gap-4 md:flex-row md:items-start">
                            <SortableList
                                :items="sortableRows"
                                :get-id="(r: SortableRow) => r.id"
                                class="flex-1"
                                @reorder="commitSortableReorder"
                            >
                                <ul class="flex flex-col gap-2">
                                    <SortableItem
                                        v-for="row in sortableRows"
                                        :key="row.id"
                                        :id="row.id"
                                        as="li"
                                        class="glass-default flex items-center gap-3 rounded-panel p-3"
                                    >
                                        <SortableHandle class="text-muted-foreground">
                                            <GripVertical :size="16" />
                                        </SortableHandle>
                                        <div class="flex flex-col">
                                            <span class="text-small font-medium">{{ row.label }}</span>
                                            <span class="text-caption text-muted-foreground">{{ row.subtitle }}</span>
                                        </div>
                                    </SortableItem>
                                </ul>
                            </SortableList>
                            <div class="flex-1 text-small text-muted-foreground">
                                <p class="mb-2">Drag the grip handle on any row — pointer capture drives the drag; drop target resolves against row midpoints.</p>
                                <p class="mb-2">The composable is headless (<code>useSortable</code>); this list uses the <code>&lt;SortableList&gt;</code> / <code>&lt;SortableItem&gt;</code> / <code>&lt;SortableHandle&gt;</code> wrappers. The drag ghost is auto-cloned from the source row so it matches whatever markup you put inside.</p>
                                <p>Works on touch + mouse + pen; no HTML5 DnD, no <code>user-select</code> fights. Pass the same <code>group</code> id to multiple lists for cross-list drops.</p>
                            </div>
                        </div>
                    </section>

                    <!-- ToggleChip — selectable chip + cell variants -->
                    <section class="mb-20">
                        <p class="section-label mb-6">ToggleChip — Selector Chips &amp; Cells</p>
                        <div class="flex flex-col gap-8 md:flex-row md:items-start">
                            <div class="flex-1 flex flex-col gap-6">
                                <div>
                                    <p class="text-caption text-muted-foreground mb-2">Exclusive — contour filter (chip variant)</p>
                                    <div class="flex items-center gap-2">
                                        <ToggleChip
                                            :pressed="toggleChipFilter === 'outer'"
                                            @update:pressed="toggleChipFilter = 'outer'"
                                        >Outer</ToggleChip>
                                        <ToggleChip
                                            :pressed="toggleChipFilter === 'counter'"
                                            @update:pressed="toggleChipFilter = 'counter'"
                                        >Counter</ToggleChip>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-caption text-muted-foreground mb-2">Single-select — bone picker (chip variant)</p>
                                    <div class="flex flex-wrap items-center gap-1.5">
                                        <ToggleChip
                                            v-for="bone in toggleChipBones"
                                            :key="bone"
                                            :pressed="activeBone === bone"
                                            @update:pressed="activeBone = $event ? bone : null"
                                        >{{ bone }}</ToggleChip>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-caption text-muted-foreground mb-2">Grid — pose picker (cell variant)</p>
                                    <div class="grid grid-cols-3 gap-2 max-w-md">
                                        <ToggleChip
                                            v-for="pose in posePreviewIds"
                                            :key="pose.id"
                                            variant="cell"
                                            :pressed="activePose === pose.id"
                                            @update:pressed="activePose = pose.id"
                                        >
                                            <Layers :size="22" />
                                            <span>{{ pose.label }}</span>
                                        </ToggleChip>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 text-small text-muted-foreground">
                                <p class="mb-2">Toggleable <code>ToggleChip</code> is a thin cva wrapper around reka-ui's <code>Toggle</code> root — <code>aria-pressed</code>, keyboard activation, and <code>data-state</code> styling come free.</p>
                                <p class="mb-2">Two variants today: <code>chip</code> (inline, caption-sized) for token-like selectors; <code>cell</code> (vertical card with icon + label) for preview grids.</p>
                                <p>Use plain <code>pressed</code> / <code>@update:pressed</code> for exclusive one-shot selects, or stack multiple instances for multi-select — no <code>ToggleGroup</code> required.</p>
                            </div>
                        </div>
                    </section>

                    <footer class="pb-12 text-center">
                        <p class="text-caption text-muted-foreground">glass-ui — glassmorphism, spring motion, kinetic type</p>
                    </footer>
                </div>
            </Transition>
        </div>
    </div>
    </TooltipProvider>
</template>

<style scoped>
/* Drop-target hint styling for the SortableList demo. The
   composable toggles these classes on whichever row the
   insertion line currently crosses — a 2px inset line along
   the upper edge (drop-above) or lower edge (drop-below). */
:deep(.is-sortable-drop-above) {
    box-shadow: inset 0 2px 0 0 hsl(260 85% 65%);
}
:deep(.is-sortable-drop-below) {
    box-shadow: inset 0 -2px 0 0 hsl(260 85% 65%);
}
:deep(.is-sortable-dragging) {
    opacity: 0.35;
}
</style>
