<script setup lang="ts">
// the ONE Fourier view (the collapse). The three duplicate views (the
// ambient page, the re-embedded ambient companion, the separate Canvas2D stage) are GONE:
// this single <FourierField> over its configurator IS both the ambient field and the
// interactive teaching surface. The renderer is the WGSL-primary GPU substrate (the Canvas2D
// renderer RETIRED); drag N and watch the curve assemble, pick a source/color, drag the
// cursor to SCRUB the reconstruction. The teal demo preset is RETIRED — the warm-cream
// library identity is the default; the cool/violet options read the shipped --viz-* tokens
// (presets-in-consumers; no demo-local teal).
import { computed, reactive, ref, watch } from "vue";
import VizStudio from "./_frame/VizStudio.vue";
import RendererStatusView from "./_frame/RendererStatus.vue";
import { pendingRenderer, type RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";
import {
    FourierField,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
    type BasisComponent,
    type FourierFieldConfig,
} from "@glass/components/fourier-field";
import { DEFAULT_FOURIER_CONFIG } from "@glass/components/fourier-field";
import { mulberry32, hashString } from "@glass/composables/glass/procedural/prng";
import {
    cssToOklch,
    type OklchStop,
} from "@glass/composables/color";
import { useGlobalDark } from "@glass/composables/dark";
import { DockBackgroundToggle } from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
import {
    Configurator,
    ConfiguratorLayer,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import {
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import { FOURIER_SHAPES, getFourierShape } from "./fourier-field/fourier-paths";

// ── The ONE view config (the variant bundles fold into config PRESETS). ──
interface FourierViewCfg {
    /** The spectrum source — "elliptic" (generated) or a curated shape key. */
    source: string;
    /** Harmonic count N — TRUNCATE the partial sum (the assembling axis). */
    harmonics: number;
    /** Show the rotating epicycle chain (orthogonal to N). */
    showEpicycles: boolean;
    /** How many chain arms to draw (≤ N). */
    epicycleArms: number;
    /** Paint the chain as a warm-anchored hue sweep vs one analogous hue. */
    rainbowChain: boolean;
    /** Comet-body length (fraction of the period). */
    trailArc: number;
    /** Comet stroke weight in CSS px. */
    trailWidth: number;
    /** Outer loudness envelope (per-layer alpha multiply). */
    intensity: number;
    /** Generated-spectrum character (smooth ellipse → crinkled). */
    harmonicScale: number;
    /** The curve hue — the library viz palette (warm default). */
    color: string;
}

// The brand viz colors (the SHIPPED library tokens — NO demo-local teal; the warm Fourier
// default + the cool/violet --viz-* reads).
const COLOR_OPTIONS = [
    { label: "Fourier (warm)", value: "var(--viz-fourier)" },
    { label: "Chebyshev (cool)", value: "var(--viz-chebyshev)" },
    { label: "Legendre (violet)", value: "var(--viz-legendre)" },
];

//  B2 — the coefficient-driven closed-figure family (fourier flowers)
// beside the generated ellipse + the traced glyphs.
const FIGURE_LABELS: Record<string, string> = {
    trefoil: "Trefoil flower",
    quatrefoil: "Quatrefoil flower",
    pentafoil: "Pentafoil flower",
    hexafoil: "Hexafoil flower",
    spiro: "Spirograph",
};
const SOURCE_OPTIONS = [
    { label: "Elliptic — generated", value: "elliptic" },
    ...FOURIER_FIGURE_KEYS.map((k) => ({ label: FIGURE_LABELS[k] ?? k, value: k })),
    ...FOURIER_SHAPES.map((s) => ({ label: `Trace ${s.label}`, value: s.key })),
];

// The config presets fold the retired `variant`: Ambient ellipse (= hero), Dense
// reconstruction (= final), Brand mark ℱ, Summing harmonics.
const presets: readonly ConfiguratorPreset<FourierViewCfg>[] = [
    {
        //  B2 — a DELIBERATE closed epicycle figure opens the route.
        key: "flower",
        label: "Fourier flower",
        sub: "closed epicycle figure",
        config: {
            source: "pentafoil",
            harmonics: 2,
            showEpicycles: true,
            epicycleArms: 2,
            rainbowChain: true,
            trailArc: 0.72,
            trailWidth: 5,
            intensity: 1,
            harmonicScale: 0.24,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "ambient",
        label: "Ambient ellipse",
        sub: "few phasors · epicycles on",
        config: {
            source: "elliptic",
            harmonics: 4,
            showEpicycles: true,
            epicycleArms: 4,
            rainbowChain: true,
            trailArc: 0.43,
            trailWidth: 5,
            intensity: 1,
            harmonicScale: 0.24,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "dense",
        label: "Dense reconstruction",
        sub: "many phasors · curve only",
        config: {
            source: "elliptic",
            harmonics: 14,
            showEpicycles: false,
            epicycleArms: 8,
            rainbowChain: false,
            trailArc: 0.6,
            trailWidth: 5,
            intensity: 1,
            harmonicScale: 0.17,
            color: "var(--viz-chebyshev)",
        },
    },
    {
        key: "brand",
        label: "Brand mark ℱ",
        sub: "traced by its own DFT",
        config: {
            source: "f-mark",
            harmonics: 24,
            showEpicycles: true,
            epicycleArms: 18,
            rainbowChain: true,
            trailArc: 0.5,
            trailWidth: 4,
            intensity: 1,
            harmonicScale: 0.24,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "summing",
        label: "Summing harmonics",
        sub: "watch it assemble",
        config: {
            source: "elliptic",
            harmonics: 2,
            showEpicycles: true,
            epicycleArms: 8,
            rainbowChain: true,
            trailArc: 0.43,
            trailWidth: 5,
            intensity: 1.1,
            harmonicScale: 0.2,
            color: "var(--viz-legendre)",
        },
    },
];

const studio = useConfiguratorState<FourierViewCfg>({
    presets,
    initialPreset: "flower",
    cloneMode: "per-preset",
});

const sourceOpen = ref(false);
const colorOpen = ref(false);
const speedOpen = ref(false);

// The active CPU-minted spectrum (a generated elliptic OR a curated shape's DFT). The N
// slider maxes at the available term count of the active spectrum.
const ellipticSpectrum = computed<BasisComponent[]>(() =>
    makeEllipticSpectrum(mulberry32(hashString("fourier-view-elliptic")), {
        harmonics: 14,
        harmonicScale: studio.config.harmonicScale,
    }),
);
const activeSpectrum = computed<readonly BasisComponent[]>(() => {
    const src = studio.config.source;
    if (src === "elliptic") return ellipticSpectrum.value;
    // B2 — a closed-figure recipe (fourier flower) generates its integer-index spectrum.
    if (FOURIER_FIGURES[src]) return makeHarmonicFigure(FOURIER_FIGURES[src]);
    return getFourierShape(src).spectrum;
});
const maxHarmonics = computed(() => Math.max(1, activeSpectrum.value.length));
const getSpectrum = (): readonly BasisComponent[] => activeSpectrum.value;

// Keep N within the active spectrum's term budget when a source swap shrinks it.
watch(maxHarmonics, (mx) => {
    if (studio.config.harmonics > mx) studio.config.harmonics = mx;
    if (studio.config.epicycleArms > mx) studio.config.epicycleArms = mx;
});

// ── The resolved palette (warm-cream default; the --viz-* token re-resolves on a dark flip). ──
const { isDark } = useGlobalDark();
const probe = ref<HTMLElement | null>(null);
function resolveCss(css: string): string {
    if (!css.includes("var(") && !css.includes("light-dark(")) return css;
    const el = probe.value ?? document.body;
    const prev = el.style.color;
    el.style.color = css;
    const out = getComputedStyle(el).color;
    el.style.color = prev;
    return out || css;
}
const palette = computed<OklchStop[]>(() => {
    void isDark.value;
    const base = cssToOklch(resolveCss(studio.config.color));
    return [
        { L: Math.max(0.52, base.L), C: Math.max(0.14, base.C), h: base.h },
        { L: Math.min(0.9, base.L + 0.24), C: base.C * 0.4, h: base.h + 16 },
    ];
});
const getPalette = (): OklchStop[] => palette.value;

// ── The transport — speed + scrub (the field owns the head_t clock; the scrubber reads/writes it). ──
const paused = ref(false);
const speed = ref("1×");
const SPEED_OPTIONS = ["0.25×", "0.5×", "1×", "2×"];
const speedFactor = computed(() => {
    const m = speed.value.match(/^([\d.]+)/);
    return m ? Number(m[1]) : 1;
});

// The reactive config the <FourierField> reads (every configurator edit reaches it).
const fieldConfig = reactive<FourierFieldConfig>({
    ...DEFAULT_FOURIER_CONFIG,
    get source() {
        return studio.config.source;
    },
    get harmonics() {
        return Math.min(studio.config.harmonics, maxHarmonics.value);
    },
    get showEpicycles() {
        return studio.config.showEpicycles;
    },
    get epicycleArms() {
        return Math.min(studio.config.epicycleArms, maxHarmonics.value);
    },
    get rainbowChain() {
        return studio.config.rainbowChain;
    },
    get trailArc() {
        return studio.config.trailArc;
    },
    get trailWidth() {
        return studio.config.trailWidth;
    },
    get intensity() {
        return studio.config.intensity;
    },
    get harmonicScale() {
        return studio.config.harmonicScale;
    },
    get speed() {
        return speedFactor.value;
    },
    palette: DEFAULT_FOURIER_CONFIG.palette,
    respectReducedMotion: true,
    interactive: true,
}) as FourierFieldConfig;

const fieldRef = ref<InstanceType<typeof FourierField> | null>(null);
const scrubT = ref(0);

watch(paused, (p) => {
    const f = fieldRef.value as unknown as {
        pause?: () => void;
        resume?: () => void;
    } | null;
    if (!f) return;
    if (p) f.pause?.();
    else f.resume?.();
});
function onScrub(v: number): void {
    scrubT.value = v;
    const f = fieldRef.value as unknown as { setHeadT?: (t: number) => void } | null;
    f?.setHeadT?.(v);
}

const liveStatus = computed(() => (paused.value ? "paused" : "playing"));
const rendererStatus = ref<RendererStatus>(pendingRenderer("webgpu"));
</script>

<template>
    <!-- The shared VizStudio owns the page header, configurator, and rounded clip.
         These slots provide only Fourier-specific stage, controls, and presets. -->
    <VizStudio
        heading="Fourier Field"
        label="harmonics · epicycles · shape-trace · scrub"
        blurb="Watch rotating circles reconstruct a curve term by term. Change the harmonic count, choose a source and color, or drag across the field to scrub backward and forward."
        height-class="h-[min(72vh,600px)]"
        :presets="presets"
        :active-preset="studio.activePreset.value"
        @select-preset="studio.selectPreset"
        @reset="studio.resetCurrent"
    >
        <span ref="probe" class="sr-only" aria-hidden="true" />
                    <template #stage>
                        <div class="relative flex h-full w-full flex-col">
                            <div class="relative min-h-0 flex-1 overflow-hidden rounded-card">
                                <FourierField
                                    ref="fieldRef"
                                    :config="fieldConfig"
                                    :spectrum="
                                        studio.config.source === 'elliptic'
                                            ? undefined
                                            : activeSpectrum
                                    "
                                    :get-palette="getPalette"
                                    data-testid="fourier-field-canvas"
                                    @renderer-status="rendererStatus = $event"
                                />
                                <RendererStatusView :status="rendererStatus" class="pointer-events-none absolute top-3 left-3" />
                                <div
                                    class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                                    data-testid="fourier-field-status"
                                >
                                    <span class="text-micro font-mono text-muted-foreground">
                                        N {{ fieldConfig.harmonics }} / {{ maxHarmonics }}
                                    </span>
                                    <span class="text-micro font-mono text-muted-foreground/60">
                                        {{ liveStatus }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="flex items-center gap-3 border-t border-border/30 px-3 py-2"
                                data-testid="fourier-field-transport"
                            >
                                <DockBackgroundToggle v-model:paused="paused" />
                                <div class="min-w-0 flex-1">
                                    <!-- The transport COMMANDS the head, so it is
                                         a Slider (role=slider), not a timeline
                                         (role=progressbar). Note the array
                                         binding + the unwrap: Slider's value is
                                         `number[] | null`, and a scalar bound
                                         here silently paints an empty track. -->
                                    <Slider
                                        :model-value="[scrubT]"
                                        :min="0"
                                        :max="1"
                                        :step="0.01"
                                        aria-label="Scrub head_t"
                                        @update:model-value="(v) => onScrub(v?.[0] ?? 0)"
                                    />
                                </div>
                                <div class="w-28 shrink-0">
                                    <Select v-model="speed" v-model:open="speedOpen">
                                        <SelectTrigger aria-label="Clock speed">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                v-for="option in SPEED_OPTIONS"
                                                :key="option"
                                                :value="option"
                                            >
                                                {{ option }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Spectrum" sub="--harmonics" dividers>
                            <LabeledSelect
                                v-model="studio.config.source"
                                v-model:open="sourceOpen"
                                :items="SOURCE_OPTIONS.map((o) => o.value)"
                                label="Source"
                                description="A generated elliptic spectrum, or a curated shape traced by its own forward DFT (dftFromPoints)."
                            />
                            <LabeledSlider
                                v-model="studio.config.harmonics"
                                :min="1"
                                :max="maxHarmonics"
                                :step="1"
                                label="Harmonics"
                                description="The partial-sum term count — TRUNCATE the spectrum and watch the curve assemble: 1 = a single ellipse, climbing to the full reconstruction."
                            />
                            <LabeledSlider
                                v-model="studio.config.harmonicScale"
                                :min="0.05"
                                :max="0.4"
                                :step="0.01"
                                label="Harmonic scale"
                                description="Character of the generated elliptic spectrum — smooth ellipse → crinkled."
                            />
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Epicycles" sub="orthogonal to N" dividers>
                            <LabeledSwitch
                                v-model="studio.config.showEpicycles"
                                label="Show chain"
                                description="Draw the rotating epicycle chain."
                            />
                            <LabeledSlider
                                v-if="studio.config.showEpicycles"
                                v-model="studio.config.epicycleArms"
                                :min="1"
                                :max="maxHarmonics"
                                :step="1"
                                label="Epicycle arms"
                                description="How many epicycle arms to draw — independent of N (the orthogonal axis)."
                            />
                            <LabeledSwitch
                                v-if="studio.config.showEpicycles"
                                v-model="studio.config.rainbowChain"
                                label="Rainbow chain"
                                description="Paint the chain as a warm hue sweep."
                            />
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Comet" sub="--trail" dividers>
                            <LabeledSlider
                                v-model="studio.config.trailArc"
                                :min="0.15"
                                :max="1"
                                :step="0.01"
                                label="Trail arc"
                                description="Comet body length as a fraction of the period."
                            />
                            <LabeledSlider
                                v-model="studio.config.trailWidth"
                                :min="1"
                                :max="6"
                                :step="0.1"
                                label="Trail width"
                                description="Comet stroke weight in px."
                            />
                            <LabeledSlider
                                v-model="studio.config.intensity"
                                :min="0"
                                :max="2"
                                :step="0.05"
                                label="Intensity"
                                description="Outer loudness envelope (per-layer alpha multiply)."
                            />
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Color" sub="--viz-*" dividers>
                            <LabeledSelect
                                v-model="studio.config.color"
                                v-model:open="colorOpen"
                                :items="COLOR_OPTIONS.map((o) => o.value)"
                                label="Curve hue"
                                description="The curve hue — the shipped library viz palette (Fourier warm / Chebyshev cool / Legendre violet)."
                            />
                        </ConfiguratorLayer>
                    </template>
    </VizStudio>
</template>
