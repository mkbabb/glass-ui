<script setup lang="ts">
import { reactive, watch } from "vue";
import { RefreshCw } from "@lucide/vue";
import { Button } from "../../../src/components/ui/button";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { DockLayerGroup, DockLayer } from "../../../src/components/custom/dock";
import {
    resolveAtoms,
    type AuroraConfig,
    type AuroraAtoms,
} from "../../../src/components/custom/aurora";
import AuroraAtomsPanel from "./AuroraAtomsPanel.vue";
import CompositionLayer from "./config/CompositionLayer.vue";
import FlowLayer from "./config/FlowLayer.vue";
import MediumLayer from "./config/MediumLayer.vue";
import NucleiLayer from "./config/NucleiLayer.vue";
import PaletteLayer from "./config/PaletteLayer.vue";
import TextureLayer from "./config/TextureLayer.vue";
import { layerOptions } from "./config/options";

/**
 * The dock opens on the "Atoms" tab — the few intuitive controls (COLOR / ZONES
 * / NOISE / MEDIUM / MOTION) drive the canvas through `resolveAtoms`. The full
 * `AuroraConfig` lives behind the "Advanced" disclosure (the raw `config/*Layer.vue`
 * panels) — the escape hatch, not the default chrome.
 *
 * Data flow: the Atoms panel edits an `AuroraAtoms` object; on any atom change
 * `resolveAtoms(atoms)` is copied field-by-field onto the live `props.config`
 * reactive, so the canvas, the Advanced raw layers, and the preset dirty-detection
 * all read the one config object.
 */

const props = defineProps<{
    config: AuroraConfig;
    activeLayer: string;
    /** "atoms" (default) | "advanced" — which top-level surface is shown. */
    tab: string;
}>();

const emit = defineEmits<{
    (e: "update:activeLayer", v: string): void;
    (e: "update:tab", v: string): void;
    (e: "reset"): void;
}>();

// The Atoms surface state — the ≤7 control elements. The default atoms resolve to
// the wispy-sky default; editing one writes the resolved config onto props.config.
const atoms = reactive<AuroraAtoms>({
    seed: "#3a7bd5",
    harmony: "analogous",
    colorEnergy: 0.5,
    zones: { count: 2, arrangement: "composed" },
    noise: 0.5,
    medium: { kind: "smooth" },
    motion: "drifting",
});

/** Copy a resolved config onto the live reactive in place (preserve proxy identity). */
function applyAtoms() {
    const resolved = resolveAtoms({ ...atoms, zones: { ...atoms.zones! }, medium: { ...atoms.medium! } });
    Object.assign(props.config, resolved);
}

// Drive the canvas whenever any atom changes (deep — the zones/medium nested objects).
watch(atoms, applyAtoms, { deep: true });

const TOP_TABS = [
    { label: "Atoms", value: "atoms" },
    { label: "Advanced", value: "advanced" },
] as const;

function setTab(next: string | string[]) {
    emit("update:tab", String(next));
}
function activeLayerProxy(next: string | string[]) {
    emit("update:activeLayer", String(next));
}
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Header with reset -->
        <div class="flex items-center justify-between gap-2 border-b border-border/40 px-3 py-2">
            <p class="text-admin-label text-muted-foreground">Aurora</p>
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

        <!--
          Top-level Atoms ↔ Advanced switch. The Atoms tab is the DEFAULT surface
          (the ≤7 control elements); Advanced is the raw ~28-field escape hatch.
        -->
        <div class="border-b border-border/40 px-3 py-2">
            <SegmentedTabs
                :options="[...TOP_TABS]"
                :model-value="tab"
                variant="pill"
                @update:model-value="setTab"
            />
        </div>

        <!-- ── Atoms surface (DEFAULT) — drives the canvas via resolveAtoms. ── -->
        <div
            v-show="tab === 'atoms'"
            class="flex-1 min-h-0 overflow-y-auto overflow-x-clip scroll-fade-y scrollbar-hidden"
            data-aurora-atoms-surface
        >
            <AuroraAtomsPanel v-model:atoms="atoms" />
        </div>

        <!-- ── Advanced surface — the raw config layers (the escape hatch). ── -->
        <template v-if="tab === 'advanced'">
            <div class="border-b border-border/40 px-3 py-2">
                <SegmentedTabs
                    :options="[...layerOptions]"
                    :model-value="activeLayer"
                    variant="pill"
                    overflow="scroll"
                    @update:model-value="activeLayerProxy"
                />
            </div>
            <div class="flex-1 min-h-0 overflow-y-auto overflow-x-clip scroll-fade-y scrollbar-hidden">
                <DockLayerGroup
                    :active="activeLayer"
                    @update:active="activeLayerProxy"
                    orientation="vertical"
                    :show-rail="false"
                >
                    <DockLayer id="medium" label="Medium">
                        <MediumLayer :config="config" />
                    </DockLayer>
                    <DockLayer id="palette" label="Palette">
                        <PaletteLayer :config="config" />
                    </DockLayer>
                    <DockLayer id="flow" label="Flow">
                        <FlowLayer :config="config" />
                    </DockLayer>
                    <DockLayer id="texture" label="Texture">
                        <TextureLayer :config="config" />
                    </DockLayer>
                    <DockLayer id="composition" label="Comp">
                        <CompositionLayer :config="config" />
                    </DockLayer>
                    <DockLayer id="nuclei" label="Nuclei">
                        <NucleiLayer :config="config" />
                    </DockLayer>
                </DockLayerGroup>
            </div>
        </template>
    </div>
</template>
