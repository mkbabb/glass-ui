<script setup lang="ts">
import { computed } from "vue";
import {
    Brush,
    CircleDot,
    Layers,
    Palette,
    Sliders,
    Wind,
    RefreshCw,
    Plus,
} from "lucide-vue-next";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { LabeledSlider } from "@/components/custom/labeled-field";
import { BouncyTabs } from "@/components/custom/tabs";
import { GlassDock, DockLayerGroup, DockLayer } from "@/components/custom/dock";
import { SortableList, SortableItem } from "@/components/custom/sortable-list";
import type {
    AuroraConfig,
    AuroraMedium,
    FlowPattern,
    OklchStop,
    StrokeMode,
    WarpMode,
} from "@/components/custom/aurora";
import { MAX_NUCLEI, MAX_STOPS } from "@/components/custom/aurora";
import OklchStopRow from "./OklchStopRow.vue";

const props = defineProps<{
    config: AuroraConfig;
    activeLayer: string;
}>();

const emit = defineEmits<{
    (e: "update:activeLayer", v: string): void;
    (e: "reset"): void;
}>();

function activeLayerProxy(next: string) {
    emit("update:activeLayer", next);
}

// ── Option tables ─────────────────────────────────────────────────────

const mediumOptions = [
    { label: "Smooth", value: "smooth" },
    { label: "Watercolor", value: "watercolor" },
    { label: "Pastel", value: "pastel" },
    { label: "Oil", value: "oil" },
] as const;

const strokeModeOptions = [
    { label: "Oil", value: "oil" },
    { label: "Knife", value: "knife" },
    { label: "Crayon", value: "crayon" },
    { label: "Chunky", value: "chunky" },
] as const;

const flowPatternOptions = [
    { label: "None", value: "none" },
    { label: "Radial", value: "radial" },
    { label: "Swirl", value: "swirl" },
    { label: "Diagonal", value: "diagonal" },
    { label: "Multi", value: "multi" },
] as const;

const warpModeOptions = [
    { label: "fBm", value: "fbm" },
    { label: "Cellular", value: "cellular" },
    { label: "Hybrid", value: "hybrid" },
] as const;

const strokeLayersOptions = [
    { label: "Single", value: "1" },
    { label: "Crosshatch", value: "2" },
] as const;

const noiseOctavesOptions = [
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
] as const;

// ── Palette helpers ───────────────────────────────────────────────────

function updateStop(i: number, next: OklchStop) {
    props.config.palette[i] = next;
}
function removeStop(i: number) {
    if (props.config.palette.length <= 2) return;
    props.config.palette.splice(i, 1);
}
function addStop() {
    if (props.config.palette.length >= MAX_STOPS) return;
    const last = props.config.palette[props.config.palette.length - 1]!;
    props.config.palette.push({ L: last.L, C: last.C, h: (last.h + 45) % 360 });
}
/**
 * Stable palette-stop IDs for sortable reorder. `config.palette` is an array
 * of plain OklchStop objects; SortableList needs `getId` to return a stable
 * identifier. We derive one from array index + a per-row key cached via
 * WeakMap so drags don't collapse when values collide.
 */
const stopIds = new WeakMap<OklchStop, string>();
function idFor(stop: OklchStop): string {
    let id = stopIds.get(stop);
    if (!id) {
        id = Math.random().toString(36).slice(2, 10);
        stopIds.set(stop, id);
    }
    return id;
}
interface StopRef { sid: string; stop: OklchStop; }

const stopsWithIds = computed<StopRef[]>(() =>
    props.config.palette.map((stop) => ({ sid: idFor(stop), stop })),
);

function stopRefId(item: StopRef): string { return item.sid; }

function onPaletteReorder(next: readonly StopRef[]) {
    props.config.palette = next.map((x) => x.stop);
}

// ── Nucleus helpers ───────────────────────────────────────────────────

function removeNucleus(i: number) {
    if (props.config.nuclei.length <= 1) return;
    props.config.nuclei.splice(i, 1);
}
function addNucleus() {
    if (props.config.nuclei.length >= MAX_NUCLEI) return;
    props.config.nuclei.push({
        x: 0.5,
        y: 0.5,
        radius: 0.5,
        paletteBias: 0.5,
        valueBias: 0,
        driftRadius: 0.01,
        driftPhase: Math.random() * Math.PI * 2,
    });
}

// ── Visibility helpers ────────────────────────────────────────────────

const showFocal = computed(
    () => props.config.flow.pattern === "radial" || props.config.flow.pattern === "swirl",
);
const showAngle = computed(() => props.config.flow.pattern === "diagonal");
const showStrokeMode = computed(() => props.config.medium === "oil");

// Coerce select / segmented values into the right TS union types.
function setMedium(v: string) { props.config.medium = v as AuroraMedium; }
function setStrokeMode(v: string) { props.config.strokeMode = v as StrokeMode; }
function setFlowPattern(v: string) { props.config.flow.pattern = v as FlowPattern; }
function setWarpMode(v: string) { props.config.warpMode = v as WarpMode; }
function setStrokeLayers(v: string) { props.config.strokeLayers = Number(v) as 1 | 2; }
function setNoiseOctaves(v: string) { props.config.noiseOctaves = Number(v) as 3 | 4 | 5; }
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Header with reset -->
        <div class="flex items-center justify-between gap-2 border-b border-border/40 px-3 py-2">
            <p class="text-admin-label text-muted-foreground">Configurator</p>
            <Button
                variant="ghost"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                :aria-label="'Reset current preset'"
                @click="emit('reset')"
            >
                <RefreshCw :size="12" />
                Reset
            </Button>
        </div>

        <GlassDock
            orientation="vertical"
            :always-expanded="true"
            position="inline"
            class="flex-1 overflow-hidden"
        >
            <DockLayerGroup
                :active="activeLayer"
                @update:active="activeLayerProxy"
                orientation="vertical"
                :show-rail="true"
                rail-position="start"
            >
                <!-- ── Medium ─────────────────────────────────────────────── -->
                <DockLayer id="medium" label="Medium" :icon="Brush">
                    <div class="flex min-w-[280px] flex-col gap-3 p-3">
                        <div class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Medium</p>
                            <BouncyTabs
                                :options="[...mediumOptions]"
                                :model-value="config.medium"
                                variant="pill"
                                @update:model-value="setMedium"
                            />
                        </div>
                        <div v-if="showStrokeMode" class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Stroke mode</p>
                            <BouncyTabs
                                :options="[...strokeModeOptions]"
                                :model-value="config.strokeMode"
                                variant="pill"
                                @update:model-value="setStrokeMode"
                            />
                        </div>
                        <div v-if="showStrokeMode" class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Stroke layers</p>
                            <BouncyTabs
                                :options="[...strokeLayersOptions]"
                                :model-value="String(config.strokeLayers)"
                                variant="pill"
                                @update:model-value="setStrokeLayers"
                            />
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Noise octaves</p>
                            <BouncyTabs
                                :options="[...noiseOctavesOptions]"
                                :model-value="String(config.noiseOctaves)"
                                variant="pill"
                                @update:model-value="setNoiseOctaves"
                            />
                        </div>
                    </div>
                </DockLayer>

                <!-- ── Palette ───────────────────────────────────────────── -->
                <DockLayer id="palette" label="Palette" :icon="Palette">
                    <div class="flex min-w-[320px] flex-col gap-2 p-3">
                        <div class="flex items-center justify-between">
                            <p class="text-admin-label text-muted-foreground">
                                Stops ({{ config.palette.length }}/{{ MAX_STOPS }})
                            </p>
                            <Button
                                variant="glass"
                                size="sm"
                                class="h-7 gap-1.5 px-2 text-caption"
                                :disabled="config.palette.length >= MAX_STOPS"
                                @click="addStop"
                            >
                                <Plus :size="12" />
                                Stop
                            </Button>
                        </div>
                        <SortableList
                            :items="stopsWithIds"
                            :get-id="stopRefId"
                            class="flex flex-col gap-2"
                            @reorder="onPaletteReorder"
                        >
                            <SortableItem
                                v-for="(item, i) in stopsWithIds"
                                :key="item.sid"
                                :id="item.sid"
                                as="div"
                            >
                                <OklchStopRow
                                    :stop="item.stop"
                                    :index="i"
                                    :removable="config.palette.length > 2"
                                    @update="(next) => updateStop(i, next)"
                                    @remove="removeStop(i)"
                                />
                            </SortableItem>
                        </SortableList>
                    </div>
                </DockLayer>

                <!-- ── Flow ──────────────────────────────────────────────── -->
                <DockLayer id="flow" label="Flow" :icon="Wind">
                    <div class="flex min-w-[280px] flex-col gap-3 p-3">
                        <div class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Pattern</p>
                            <BouncyTabs
                                :options="[...flowPatternOptions]"
                                :model-value="config.flow.pattern"
                                variant="pill"
                                @update:model-value="setFlowPattern"
                            />
                        </div>
                        <LabeledSlider
                            v-if="showFocal"
                            :model-value="config.flow.focalX"
                            label="Focal X"
                            tooltip="0..1 · horizontal center of radial/swirl"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.flow.focalX = v)"
                        />
                        <LabeledSlider
                            v-if="showFocal"
                            :model-value="config.flow.focalY"
                            label="Focal Y"
                            tooltip="0..1 · vertical center (top-origin)"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.flow.focalY = v)"
                        />
                        <LabeledSlider
                            v-if="showAngle"
                            :model-value="config.flow.angle"
                            label="Angle"
                            tooltip="Flow angle in degrees (-180..180)"
                            :min="-180" :max="180" :step="1"
                            @update:model-value="(v: number) => (config.flow.angle = v)"
                        />
                        <LabeledSlider
                            :model-value="config.flow.curl"
                            label="Curl"
                            tooltip="Per-position perturbation strength"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.flow.curl = v)"
                        />
                    </div>
                </DockLayer>

                <!-- ── Texture ───────────────────────────────────────────── -->
                <DockLayer id="texture" label="Texture" :icon="Layers">
                    <div class="flex min-w-[280px] flex-col gap-3 p-3">
                        <LabeledSlider
                            :model-value="config.strokeAmount"
                            label="Stroke amount"
                            tooltip="0..1 · overall strength of medium texture"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.strokeAmount = v)"
                        />
                        <LabeledSlider
                            :model-value="config.strokeScale"
                            label="Stroke scale"
                            tooltip="Reciprocal density for strokes"
                            :min="40" :max="320" :step="2"
                            @update:model-value="(v: number) => (config.strokeScale = v)"
                        />
                        <LabeledSlider
                            :model-value="config.strokeAnisotropy"
                            label="Anisotropy"
                            tooltip="0..1 · stroke elongation along flow"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.strokeAnisotropy = v)"
                        />
                        <LabeledSlider
                            :model-value="config.impasto"
                            label="Impasto"
                            tooltip="0..1 · edge catch-light for oil"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.impasto = v)"
                        />
                        <LabeledSlider
                            :model-value="config.brokenColor"
                            label="Broken color"
                            tooltip="0..1 · per-stroke hue jitter"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.brokenColor = v)"
                        />
                        <LabeledSlider
                            :model-value="config.canvasGrain"
                            label="Canvas grain"
                            tooltip="0..0.1 · oil canvas weave strength"
                            :min="0" :max="0.1" :step="0.002"
                            @update:model-value="(v: number) => (config.canvasGrain = v)"
                        />
                        <LabeledSlider
                            :model-value="config.wetEdge"
                            label="Wet edge"
                            tooltip="0..1 · watercolor cauliflower darkening"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.wetEdge = v)"
                        />
                        <LabeledSlider
                            :model-value="config.granulation"
                            label="Granulation"
                            tooltip="0..1 · paper-fiber pigment settle"
                            :min="0" :max="1" :step="0.01"
                            @update:model-value="(v: number) => (config.granulation = v)"
                        />
                        <LabeledSlider
                            :model-value="config.paperGrain"
                            label="Paper grain"
                            tooltip="0..0.02 · final film-grain"
                            :min="0" :max="0.02" :step="0.001"
                            @update:model-value="(v: number) => (config.paperGrain = v)"
                        />
                    </div>
                </DockLayer>

                <!-- ── Composition ───────────────────────────────────────── -->
                <DockLayer id="composition" label="Comp" :icon="Sliders">
                    <div class="flex min-w-[280px] flex-col gap-3 p-3">
                        <div class="flex flex-col gap-1">
                            <p class="text-admin-label text-muted-foreground">Warp mode</p>
                            <BouncyTabs
                                :options="[...warpModeOptions]"
                                :model-value="config.warpMode"
                                variant="pill"
                                @update:model-value="setWarpMode"
                            />
                        </div>
                        <LabeledSlider
                            :model-value="config.warpAmount"
                            label="Warp amount"
                            tooltip="0..0.6 · domain warp amplitude"
                            :min="0" :max="0.6" :step="0.01"
                            @update:model-value="(v: number) => (config.warpAmount = v)"
                        />
                        <LabeledSlider
                            :model-value="config.warpScale"
                            label="Warp scale"
                            tooltip="0.5..3 · warp noise frequency"
                            :min="0.5" :max="3" :step="0.05"
                            @update:model-value="(v: number) => (config.warpScale = v)"
                        />
                        <LabeledSlider
                            :model-value="config.warpDrift"
                            label="Warp drift"
                            tooltip="0..0.015 · warp evolution speed"
                            :min="0" :max="0.015" :step="0.0005"
                            @update:model-value="(v: number) => (config.warpDrift = v)"
                        />
                        <LabeledSlider
                            :model-value="config.softmaxBeta"
                            label="Softmax β"
                            tooltip="3..10 · nucleus blend sharpness"
                            :min="1" :max="10" :step="0.1"
                            @update:model-value="(v: number) => (config.softmaxBeta = v)"
                        />
                        <LabeledSlider
                            :model-value="config.saturation"
                            label="Saturation"
                            tooltip="0.6..1.3 · global saturation trim"
                            :min="0.5" :max="1.3" :step="0.01"
                            @update:model-value="(v: number) => (config.saturation = v)"
                        />
                        <LabeledSlider
                            :model-value="config.valueVariance"
                            label="Value variance"
                            tooltip="0..0.3 · within-region L/C mottling"
                            :min="0" :max="0.3" :step="0.01"
                            @update:model-value="(v: number) => (config.valueVariance = v)"
                        />
                        <LabeledSlider
                            :model-value="config.nucleiDrift"
                            label="Nuclei drift"
                            tooltip="0..0.05 · nucleus orbit speed"
                            :min="0" :max="0.05" :step="0.001"
                            @update:model-value="(v: number) => (config.nucleiDrift = v)"
                        />
                        <LabeledSlider
                            :model-value="config.paletteDrift"
                            label="Palette drift"
                            tooltip="0..0.04 · palette-id phase"
                            :min="0" :max="0.04" :step="0.001"
                            @update:model-value="(v: number) => (config.paletteDrift = v)"
                        />
                        <LabeledSlider
                            :model-value="config.breathDepth"
                            label="Breath depth"
                            tooltip="0..0.15 · luminance wobble amplitude"
                            :min="0" :max="0.15" :step="0.005"
                            @update:model-value="(v: number) => (config.breathDepth = v)"
                        />
                        <LabeledSlider
                            :model-value="config.breathPeriod"
                            label="Breath period"
                            tooltip="10..90s · breath cycle"
                            :min="10" :max="90" :step="1"
                            @update:model-value="(v: number) => (config.breathPeriod = v)"
                        />
                    </div>
                </DockLayer>

                <!-- ── Nuclei ────────────────────────────────────────────── -->
                <DockLayer id="nuclei" label="Nuclei" :icon="CircleDot">
                    <div class="flex min-w-[300px] flex-col gap-3 p-3">
                        <div class="flex items-center justify-between">
                            <p class="text-admin-label text-muted-foreground">
                                Nuclei ({{ config.nuclei.length }}/{{ MAX_NUCLEI }})
                            </p>
                            <Button
                                variant="glass"
                                size="sm"
                                class="h-7 gap-1.5 px-2 text-caption"
                                :disabled="config.nuclei.length >= MAX_NUCLEI"
                                @click="addNucleus"
                            >
                                <Plus :size="12" />
                                Add
                            </Button>
                        </div>
                        <p class="text-caption text-muted-foreground">
                            alt-click canvas to add · shift-click / right-click to remove · drag to move
                        </p>
                        <div class="flex flex-col gap-3">
                            <div
                                v-for="(nu, i) in config.nuclei"
                                :key="i"
                                :class="cn('flex flex-col gap-1.5 rounded-panel border border-border/40 bg-card/50 p-2')"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="text-mono-caption text-muted-foreground">#{{ i + 1 }}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        class="h-6 px-2 text-caption text-muted-foreground hover:text-destructive"
                                        :disabled="config.nuclei.length <= 1"
                                        @click="removeNucleus(i)"
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <LabeledSlider
                                    :model-value="nu.x"
                                    label="X"
                                    tooltip="Horizontal position 0..1 (top-origin)"
                                    :min="0" :max="1" :step="0.01"
                                    @update:model-value="(v: number) => (nu.x = v)"
                                />
                                <LabeledSlider
                                    :model-value="nu.y"
                                    label="Y"
                                    tooltip="Vertical position 0..1 (top-origin)"
                                    :min="0" :max="1" :step="0.01"
                                    @update:model-value="(v: number) => (nu.y = v)"
                                />
                                <LabeledSlider
                                    :model-value="nu.radius"
                                    label="Radius"
                                    tooltip="Gaussian falloff (larger = broader influence)"
                                    :min="0.1" :max="0.8" :step="0.01"
                                    @update:model-value="(v: number) => (nu.radius = v)"
                                />
                                <LabeledSlider
                                    :model-value="nu.paletteBias"
                                    label="Palette bias"
                                    tooltip="0..1 · which palette stop this nucleus pulls toward"
                                    :min="0" :max="1" :step="0.01"
                                    @update:model-value="(v: number) => (nu.paletteBias = v)"
                                />
                                <LabeledSlider
                                    :model-value="nu.valueBias"
                                    label="Value bias"
                                    tooltip="-0.3..0.3 · local lightness pull"
                                    :min="-0.3" :max="0.3" :step="0.01"
                                    @update:model-value="(v: number) => (nu.valueBias = v)"
                                />
                                <LabeledSlider
                                    :model-value="nu.driftRadius"
                                    label="Drift radius"
                                    tooltip="0..0.05 · orbit amplitude"
                                    :min="0" :max="0.05" :step="0.001"
                                    @update:model-value="(v: number) => (nu.driftRadius = v)"
                                />
                            </div>
                        </div>
                    </div>
                </DockLayer>
            </DockLayerGroup>
        </GlassDock>
    </div>
</template>
