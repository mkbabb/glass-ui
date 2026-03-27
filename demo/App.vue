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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ConfigPanel from "./components/ConfigPanel.vue";
import { FONTS, applyFont, type FontOption } from "./fonts";
import { AURORA_SECTIONS, METABALL_SECTIONS, ATMOSPHERE_SECTIONS } from "./backgroundConfigs";

// ── Page navigation ──
type Page = "demo" | "config";
const currentPage = ref<Page>("demo");

// ── Dark mode ──
const isDark = ref(false);
const toggleDark = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
};

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

// Toggle derived mode
function toggleDerived() {
    if (auroraConfig.colorMode === "explicit") {
        Object.assign(auroraConfig, ATMOSPHERE_PRESET);
    } else {
        Object.assign(auroraConfig, {
            ...DEFAULT_AURORA_CONFIG,
            colors: DEFAULT_AURORA_CONFIG.colors,
        });
    }
}

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
</script>

<template>
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
            <header class="glass sticky top-4 z-50 mb-8 flex flex-wrap items-center gap-4 rounded-2xl p-4">
                <span class="text-small font-medium">glass-ui</span>

                <Separator orientation="vertical" class="h-6" />

                <Select
                    :model-value="activeFont.name"
                    @update:model-value="(name: string) => {
                        const f = FONTS.find(f => f.name === name);
                        if (f) activeFont = f;
                    }"
                >
                    <SelectTrigger class="w-48 h-9">
                        <SelectValue placeholder="Choose font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sans-Serif</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'sans')" :key="f.name" :value="f.name">{{ f.name }}</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Serif</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'serif')" :key="f.name" :value="f.name">{{ f.name }}</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Monospace</SelectLabel>
                            <SelectItem v-for="f in FONTS.filter(f => f.category === 'mono')" :key="f.name" :value="f.name">{{ f.name }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" class="h-6" />

                <div class="flex rounded-full border border-border/30 p-0.5">
                    <Button
                        :variant="bgMode === 'aurora' ? 'secondary' : 'ghost'"
                        size="sm"
                        class="rounded-full px-3 h-7 text-micro"
                        @click="bgMode = 'aurora'"
                    >
                        Aurora
                    </Button>
                    <Button
                        :variant="bgMode === 'metaballs' ? 'secondary' : 'ghost'"
                        size="sm"
                        class="rounded-full px-3 h-7 text-micro"
                        @click="bgMode = 'metaballs'"
                    >
                        Metaballs
                    </Button>
                </div>

                <!-- Derived mode sub-toggle (only when aurora active) -->
                <template v-if="bgMode === 'aurora'">
                    <Button
                        :variant="auroraConfig.colorMode === 'derived' ? 'secondary' : 'ghost'"
                        size="sm"
                        class="rounded-full px-3 h-7 text-micro"
                        @click="toggleDerived"
                    >
                        {{ auroraConfig.colorMode === 'derived' ? 'Derived' : 'Explicit' }}
                    </Button>
                    <input
                        v-if="auroraConfig.colorMode === 'derived'"
                        type="color"
                        v-model="baseColor"
                        class="h-7 w-7 cursor-pointer appearance-none rounded-full border-2 border-border/30 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                        title="Base color"
                    />
                </template>

                <div class="flex-1" />

                <!-- Page nav -->
                <div class="flex rounded-full border border-border/30 p-0.5">
                    <Button
                        :variant="currentPage === 'demo' ? 'secondary' : 'ghost'"
                        size="sm"
                        class="rounded-full px-3 h-7 text-micro"
                        @click="currentPage = 'demo'"
                    >
                        Demo
                    </Button>
                    <Button
                        :variant="currentPage === 'config' ? 'secondary' : 'ghost'"
                        size="sm"
                        class="rounded-full px-3 h-7 text-micro"
                        @click="currentPage = 'config'"
                    >
                        Config
                    </Button>
                </div>

                <Separator orientation="vertical" class="h-6" />

                <Button variant="ghost" size="sm" class="rounded-full" @click="toggleDark">
                    {{ isDark ? "☀ Light" : "● Dark" }}
                </Button>
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
                    <div class="glass mb-12 rounded-xl p-3">
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
                                <Button variant="glass-subtle" size="sm" class="rounded-full h-7 px-3 text-micro" @click="replayCharStagger">↻ Replay</Button>
                            </div>
                            <h2 v-if="showCharStagger" class="char-stagger text-display-2" v-html="heroChars" />
                        </div>

                        <div class="mb-8">
                            <div class="mb-2 flex items-center gap-3">
                                <p class="text-caption text-muted-foreground">Weight breathing</p>
                                <Button variant="glass-subtle" size="sm" class="rounded-full h-7 px-3 text-micro" @click="replayBreathe">↻ Replay</Button>
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
                            <div class="glass rounded-2xl p-6"><h3 class="text-heading mb-2">.glass</h3><p class="text-small text-muted-foreground">blur 16, sat 1.6, bright 1.05</p></div>
                            <div class="glass-medium rounded-2xl p-6"><h3 class="text-heading mb-2">.glass-medium</h3><p class="text-small text-muted-foreground">blur 20, sat 1.7</p></div>
                            <div class="glass-elevated rounded-2xl p-6"><h3 class="text-heading mb-2">.glass-elevated</h3><p class="text-small text-muted-foreground">blur 28, sat 1.8</p></div>
                        </div>
                        <div class="glass-medium mt-6 rounded-2xl p-6">
                            <p class="text-glass-legible text-display">Legible over glass</p>
                        </div>
                    </section>

                    <!-- GlassPanel -->
                    <section class="mb-20">
                        <p class="section-label mb-6">GlassPanel — Tiered Renderer</p>
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <GlassPanel tier="css" variant="default" class="rounded-2xl p-6"><h3 class="text-heading mb-2">CSS</h3><p class="text-small text-muted-foreground">backdrop-filter + grain</p></GlassPanel>
                            <GlassPanel tier="svg-filter" :blur="16" :refraction="0.6" :chromatic-aberration="true" class="rounded-2xl p-6"><h3 class="text-heading mb-2">SVG filter</h3><p class="text-small text-muted-foreground">Snell displacement + Fresnel</p></GlassPanel>
                            <GlassPanel tier="css" variant="elevated" class="rounded-2xl p-6"><h3 class="text-heading mb-2">CSS elevated</h3><p class="text-small text-muted-foreground">Max frosting + grain</p></GlassPanel>
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
                        <Transition name="fade"><div v-if="showDialog" class="glass-overlay fixed inset-0 z-40" @click="showDialog = false" /></Transition>
                        <Transition name="dialog-scale">
                            <div v-if="showDialog" class="glass-elevated fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8">
                                <h3 class="text-heading mb-3">Spring Dialog</h3>
                                <p class="text-small mb-4 text-muted-foreground">--spring-bouncy: 20% overshoot</p>
                                <Button variant="glass" size="sm" @click="showDialog = false">Close</Button>
                            </div>
                        </Transition>
                        <Transition name="dropdown"><div v-if="showDropdown" class="glass-elevated inline-block rounded-xl p-3 mb-4"><div class="space-y-1 text-small"><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 1</div><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 2</div><div class="rounded-lg px-3 py-2 hover:bg-accent">Item 3</div></div></div></Transition>
                        <Transition name="pop"><div v-if="showPop" class="glass inline-block rounded-2xl p-6 mb-4"><p class="text-heading">Pop!</p></div></Transition>
                        <Transition name="fade-slide"><div v-if="showFadeSlide" class="glass rounded-2xl p-6 mb-4"><p class="text-heading">Fade-slide</p></div></Transition>
                        <div class="glass rounded-xl p-4"><code class="text-micro block space-y-1"><div>--spring-smooth: no overshoot</div><div>--spring-snappy: 7% overshoot</div><div>--spring-bouncy: 20% overshoot</div><div>--spring-gentle: ~0.6% overshoot</div></code></div>
                    </section>

                    <!-- Stagger -->
                    <section class="mb-20">
                        <p class="section-label mb-6">Stagger & Entry</p>
                        <Button variant="glass" class="mb-4" @click="replayStagger">↻ Replay stagger</Button>
                        <div v-if="showStagger" class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-3 mb-12">
                            <div v-for="(item, i) in staggerItems" :key="i" class="glass rounded-xl p-4"><p class="text-small">{{ item }}</p></div>
                        </div>
                        <div class="mb-2 flex items-center gap-3">
                            <p class="text-caption text-muted-foreground">.scroll-reveal-reverse</p>
                            <Button variant="glass-subtle" size="sm" class="rounded-full h-7 px-3 text-micro" @click="replayScrollReveal">↻ Replay</Button>
                        </div>
                        <div v-if="showScrollReveal" class="space-y-4 mb-12">
                            <div v-for="i in 4" :key="i" class="scroll-reveal-reverse glass rounded-xl p-6"><p class="text-heading">Scroll-revealed {{ i }}</p></div>
                        </div>
                        <p class="text-caption mb-2 text-muted-foreground">.scroll-weight-reveal</p>
                        <p class="scroll-weight-reveal text-display-2">Weight reveals on scroll</p>
                    </section>

                    <footer class="pb-12 text-center">
                        <p class="text-caption text-muted-foreground">glass-ui — glassmorphism, spring motion, kinetic type</p>
                    </footer>
                </div>
            </Transition>
        </div>
    </div>
</template>
