<script setup lang="ts">
// The Fourier studio: one field, one clock, one set of controls that all change the
// picture. Every number the page prints is a number the frame used.
import { computed, reactive, ref, watch } from "vue";
import VizStudio from "./_frame/VizStudio.vue";
import RendererStatusView from "./_frame/RendererStatus.vue";
import {
    pendingRenderer,
    type RendererStatus,
} from "@glass/composables/glass/webgpu/rendererStatus";
import {
    FourierField,
    makeEllipticSpectrum,
    makeHarmonicFigure,
    mintSpectrum,
    FOURIER_FIGURES,
    FOURIER_FIGURE_KEYS,
    DEFAULT_FOURIER_CONFIG,
    type FourierFieldConfig,
    type MintedSpectrum,
} from "@glass/components/fourier-field";
import { mulberry32, hashString } from "@glass/composables/glass/procedural/prng";
import { cssToOklch, type OklchStop } from "@glass/composables/color";
import { useGlobalDark } from "@glass/composables/dark";
import { DockBackgroundToggle } from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
import {
    Configurator,
    ConfiguratorLayer,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import { LabeledSlider, LabeledSwitch } from "@glass/components/labeled-field";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import LabeledSelect from "../../chassis/field/LabeledSelect.vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import { FOURIER_SHAPES, getFourierShape } from "./fourier-field/fourier-paths";

/** The view model. Every field is a control, and every control changes the picture. */
interface FourierViewCfg {
    source: string;
    harmonics: number;
    showMachine: boolean;
    rainbowChain: boolean;
    interactive: boolean;
    trailArc: number;
    markStroke: number;
    inkOffset: number;
    squash: number;
    glow: number;
    intensity: number;
    richness: number;
    color: string;
}

const COLOR_OPTIONS = [
    { label: "Fourier (warm)", value: "var(--viz-fourier)" },
    { label: "Chebyshev (cool)", value: "var(--viz-chebyshev)" },
    { label: "Legendre (violet)", value: "var(--viz-legendre)" },
];

const FIGURE_LABELS: Record<string, string> = {
    trefoil: "Trefoil",
    quatrefoil: "Quatrefoil",
    pentafoil: "Pentafoil",
    hexafoil: "Hexafoil",
    spiro: "Spirograph",
};

const ELLIPTIC_SEED = "fourier-studio";

/** Mint every source once, so the picker can state each one's honest term count. */
function mintFor(key: string, richness: number): MintedSpectrum {
    if (key === "elliptic") {
        return mintSpectrum(
            makeEllipticSpectrum(mulberry32(hashString(`fourier-field/${ELLIPTIC_SEED}`)), richness),
        );
    }
    if (key in FOURIER_FIGURES) {
        return mintSpectrum(
            makeHarmonicFigure(FOURIER_FIGURES[key as keyof typeof FOURIER_FIGURES]),
        );
    }
    return mintSpectrum(getFourierShape(key).spectrum);
}

const presets: readonly ConfiguratorPreset<FourierViewCfg>[] = [
    {
        key: "studio",
        label: "Studio",
        sub: "the machine, running",
        config: {
            source: "elliptic",
            harmonics: 6,
            showMachine: true,
            rainbowChain: true,
            interactive: true,
            trailArc: 0.43,
            markStroke: 8,
            inkOffset: 0.7,
            squash: 0.55,
            glow: 0.14,
            intensity: 1,
            richness: 0.5,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "teaching",
        label: "Teaching",
        sub: "one term, quarter speed",
        config: {
            source: "f-mark",
            harmonics: 1,
            showMachine: true,
            rainbowChain: false,
            interactive: true,
            trailArc: 1,
            markStroke: 8,
            inkOffset: 0.7,
            squash: 0.3,
            glow: 0.1,
            intensity: 1,
            richness: 0.5,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "ambient",
        label: "Ambient",
        sub: "curve only, calm",
        config: {
            source: "pentafoil",
            harmonics: 2,
            showMachine: false,
            rainbowChain: false,
            interactive: true,
            trailArc: 0.72,
            markStroke: 4,
            inkOffset: 0.55,
            squash: 0.4,
            glow: 0.08,
            intensity: 0.85,
            richness: 0.5,
            color: "var(--viz-chebyshev)",
        },
    },
    {
        key: "technicolor",
        label: "Technicolor",
        sub: "ink detached, chain swept",
        config: {
            source: "star",
            harmonics: 18,
            showMachine: true,
            rainbowChain: true,
            interactive: true,
            trailArc: 0.6,
            markStroke: 12,
            inkOffset: 1,
            squash: 0.8,
            glow: 0.24,
            intensity: 1.2,
            richness: 0.5,
            color: "var(--viz-legendre)",
        },
    },
    {
        key: "frozen",
        label: "Frozen",
        sub: "the clock held",
        config: {
            source: "heart",
            harmonics: 8,
            showMachine: true,
            rainbowChain: true,
            interactive: false,
            trailArc: 1,
            markStroke: 8,
            inkOffset: 0.7,
            squash: 0,
            glow: 0.14,
            intensity: 1,
            richness: 0.5,
            color: "var(--viz-fourier)",
        },
    },
];

const studio = useConfiguratorState<FourierViewCfg>({
    presets,
    initialPreset: "studio",
    cloneMode: "per-preset",
});

const sourceOpen = ref(false);
const colorOpen = ref(false);
const speedOpen = ref(false);

const isElliptic = computed(() => studio.config.source === "elliptic");

/** The active mint. Re-mints on a source change, and — elliptic only — on a richness edit. */
const minted = computed<MintedSpectrum>(() =>
    mintFor(studio.config.source, studio.config.richness),
);
const maxHarmonics = computed(() => minted.value.terms.length);

/** Every source labelled with the term count IT actually carries. */
const SOURCE_OPTIONS = computed(() => {
    const rows: { label: string; value: string }[] = [];
    const term = (n: number) => `${n} term${n === 1 ? "" : "s"}`;
    rows.push({
        label: `Elliptic — generated · ${term(mintFor("elliptic", studio.config.richness).terms.length)}`,
        value: "elliptic",
    });
    for (const k of FOURIER_FIGURE_KEYS) {
        rows.push({
            label: `${FIGURE_LABELS[k] ?? k} · ${term(mintFor(k, 0).terms.length)}`,
            value: k,
        });
    }
    for (const s of FOURIER_SHAPES) {
        rows.push({
            label: `${s.label} · ${term(mintFor(s.key, 0).terms.length)}`,
            value: s.key,
        });
    }
    return rows;
});

// Keep N inside the active source's honest budget when a swap shrinks it.
watch(maxHarmonics, (mx) => {
    if (studio.config.harmonics > mx) studio.config.harmonics = mx;
});

// ── The ramp. The --viz-* token re-resolves on a dark flip. ──
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

// ── The transport. The field owns the clock; this reads and writes it. ──
const paused = ref(false);
const speed = ref("1×");
const SPEED_OPTIONS = ["0.25×", "0.5×", "1×", "2×"];
const speedFactor = computed(() => Number(speed.value.match(/^([\d.]+)/)?.[1] ?? 1));

const STROKE_RUNGS = ["4", "8", "12"];
const strokeRung = computed({
    get: () => String(studio.config.markStroke),
    set: (v: string) => {
        studio.config.markStroke = Number(v) || 8;
    },
});

const fieldConfig = reactive<FourierFieldConfig>({
    ...DEFAULT_FOURIER_CONFIG,
    get source() {
        return studio.config.source as FourierFieldConfig["source"];
    },
    get harmonics() {
        return Math.min(studio.config.harmonics, maxHarmonics.value);
    },
    get showMachine() {
        return studio.config.showMachine;
    },
    get rainbowChain() {
        return studio.config.rainbowChain;
    },
    get trailArc() {
        return studio.config.trailArc;
    },
    get markStroke() {
        return studio.config.markStroke;
    },
    get inkOffset() {
        return studio.config.inkOffset;
    },
    get squash() {
        return studio.config.squash;
    },
    get glow() {
        return studio.config.glow;
    },
    get intensity() {
        return studio.config.intensity;
    },
    get richness() {
        return studio.config.richness;
    },
    get speed() {
        return speedFactor.value;
    },
    palette: DEFAULT_FOURIER_CONFIG.palette,
    respectReducedMotion: true,
}) as FourierFieldConfig;

const fieldRef = ref<InstanceType<typeof FourierField> | null>(null);
/** The scrubber reads the field's OWN parameter — there is no second copy of the clock. */
const headT = computed<number>(() => (fieldRef.value as { headT?: number } | null)?.headT ?? 0);
const summedN = computed(() => Math.min(studio.config.harmonics, maxHarmonics.value));

watch(paused, (p) => {
    const f = fieldRef.value as unknown as {
        pause?: () => void;
        resume?: () => void;
    } | null;
    if (p) f?.pause?.();
    else f?.resume?.();
});
function onScrub(v: number): void {
    (fieldRef.value as unknown as { setHeadT?: (t: number) => void } | null)?.setHeadT?.(v);
}

const rendererStatus = ref<RendererStatus>(pendingRenderer("webgpu"));
</script>

<template>
    <!-- [BK #58 G-ONE-NAME] `heading="Fourier Field"` is STRUCK — the chassis <h1>
         already names the route; the studio section reprinted it verbatim one line
         below. The label is the section's real contribution. -->
    <VizStudio
        label="terms · the machine · the clock"
        blurb="A stack of rotating circles draws a curve. Each circle is one term of the transform; adding the next one adds the biggest correction that is still missing. Drag the term count to watch it assemble, drag across the field to move through the loop."
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
                        :spectrum="minted.terms"
                        :get-palette="getPalette"
                        :interactive="studio.config.interactive"
                        data-testid="fourier-field-canvas"
                        @renderer-status="rendererStatus = $event"
                    />
                    <RendererStatusView
                        :status="rendererStatus"
                        class="pointer-events-none absolute top-3 left-3"
                    />
                </div>
                <!-- The transport, full-width directly under the stage in both arms. Its
                     readout is the field's own parameter and the count the frame summed. -->
                <div
                    class="flex flex-wrap items-center gap-3 border-t border-border/30 px-3 py-2"
                    data-testid="fourier-field-transport"
                >
                    <DockBackgroundToggle v-model:paused="paused" />
                    <span
                        class="shrink-0 font-mono text-micro text-muted-foreground"
                        data-testid="fourier-field-readout"
                    >
                        N {{ summedN }}/{{ maxHarmonics }} · t {{ headT.toFixed(2) }}
                    </span>
                    <div class="min-w-40 flex-1">
                        <Slider
                            :model-value="[headT]"
                            :min="0"
                            :max="1"
                            :step="0.01"
                            aria-label="Move through the loop"
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
            <ConfiguratorLayer label="Spectrum" sub="the terms" dividers>
                <LabeledSelect
                    v-model="studio.config.source"
                    v-model:open="sourceOpen"
                    :items="SOURCE_OPTIONS"
                    label="Source"
                    description="Each source states the number of terms it actually carries — the count survives a paint floor, so nothing in the list is padding."
                />
                <LabeledSlider
                    v-model="studio.config.harmonics"
                    :min="1"
                    :max="maxHarmonics"
                    :step="1"
                    label="Terms"
                    :description="`Summing ${summedN} of ${maxHarmonics}. The terms are ordered by size, so every step adds the largest correction still missing.`"
                />
                <LabeledSlider
                    v-model="studio.config.richness"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :disabled="!isElliptic"
                    label="Richness"
                    :description="
                        isElliptic
                            ? 'How crinkled the generated figure is. The paint floor decides how many of those harmonics survive, so the term count moves with it.'
                            : 'Inert here — a curated source carries its own spectrum.'
                    "
                />
            </ConfiguratorLayer>
            <ConfiguratorLayer label="The machine" sub="rings, arms, dots" dividers>
                <LabeledSwitch
                    v-model="studio.config.showMachine"
                    label="Show the machine"
                    description="Draw the rings, the arms and the joints. A ring only draws once its own diameter reaches the stroke; below that the term is still summed and still chained."
                />
                <LabeledSwitch
                    v-model="studio.config.rainbowChain"
                    label="Sweep the chain"
                    description="Sweep the chain's hue about the palette anchor instead of painting one hue."
                />
                <LabeledSwitch
                    v-model="studio.config.interactive"
                    label="Interactive"
                    description="The pointer moves the clock and the field becomes a slider you can tab to. Off is the decor mount: no listeners, no tab stop."
                />
            </ConfiguratorLayer>
            <ConfiguratorLayer label="The curve" sub="mark and ink" dividers>
                <LabeledSlider
                    v-model="studio.config.trailArc"
                    :min="0.15"
                    :max="1"
                    :step="0.01"
                    label="Trail arc"
                    description="How much of the loop the body covers."
                />
                <div class="flex flex-col gap-1.5">
                    <span class="text-caption text-muted-foreground">Mark stroke</span>
                    <ToggleGroup v-model="strokeRung" type="single" aria-label="Mark stroke">
                        <ToggleGroupItem v-for="r in STROKE_RUNGS" :key="r" :value="r">
                            {{ r }} px
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <span class="text-caption text-muted-foreground">
                        Three rungs, three visibly different pictures. The stroke is also
                        what the ring law measures against.
                    </span>
                </div>
                <LabeledSlider
                    v-model="studio.config.inkOffset"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    label="Ink offset"
                    description="How far the ink sits behind its mark, in stroke widths. Below about a half it hides underneath; at 1 it reads as a second line."
                />
            </ConfiguratorLayer>
            <ConfiguratorLayer label="The head" sub="weight and light" dividers>
                <LabeledSlider
                    v-model="studio.config.squash"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    label="Squash"
                    description="The head stretches along the curve on the straights and squashes across it at the corners. 0 is a dead round disc."
                />
                <LabeledSlider
                    v-model="studio.config.glow"
                    :min="0"
                    :max="0.3"
                    :step="0.01"
                    label="Glow"
                    description="The halo around the head."
                />
                <LabeledSlider
                    v-model="studio.config.intensity"
                    :min="0"
                    :max="2"
                    :step="0.05"
                    label="Intensity"
                    description="Overall loudness. Above 1 the paint clamps, so the picture stops changing before the slider does."
                />
            </ConfiguratorLayer>
            <ConfiguratorLayer label="Colour" sub="--viz-*" dividers>
                <LabeledSelect
                    v-model="studio.config.color"
                    v-model:open="colorOpen"
                    :items="COLOR_OPTIONS"
                    label="Hue"
                    description="The shipped viz palette. The ink and the head are derived from it, one ramp step down and half a step up."
                />
            </ConfiguratorLayer>
        </template>
    </VizStudio>
</template>
