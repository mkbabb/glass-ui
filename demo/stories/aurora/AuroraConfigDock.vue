<script setup lang="ts">
import { RefreshCw } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { BouncyTabs } from "@/components/custom/tabs";
import { DockLayerGroup, DockLayer } from "@/components/custom/dock";
import type { AuroraConfig } from "@/components/custom/aurora";
import CompositionLayer from "./config/CompositionLayer.vue";
import FlowLayer from "./config/FlowLayer.vue";
import MediumLayer from "./config/MediumLayer.vue";
import NucleiLayer from "./config/NucleiLayer.vue";
import PaletteLayer from "./config/PaletteLayer.vue";
import TextureLayer from "./config/TextureLayer.vue";
import { layerOptions } from "./config/options";

defineProps<{
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

        <!--
          Pill-tab switcher above the layer stack. DockLayerGroup keeps its
          crossfade transition but its built-in icon rail is hidden via
          `:show-rail="false"` — full labels in a pill row are clearer than
          a column of single-letter glyphs.
        -->
        <div class="border-b border-border/40 px-3 py-2">
            <BouncyTabs
                :options="[...layerOptions]"
                :model-value="activeLayer"
                variant="pill"
                class="overflow-x-auto scrollbar-hidden"
                @update:model-value="activeLayerProxy"
            />
        </div>
        <!--
          Layer content scrolls vertically. `min-h-0` lets the flex item
          shrink below intrinsic content height; `overflow-y-auto` keeps
          tall layers from pushing the panel taller than the stage frame.
        -->
        <div class="flex-1 min-h-0 overflow-y-auto">
            <DockLayerGroup
                :active="activeLayer"
                @update:active="activeLayerProxy"
                orientation="vertical"
                :show-rail="false"
            >
                <!-- ── Medium ─────────────────────────────────────────────── -->
                <DockLayer id="medium" label="Medium">
                    <MediumLayer :config="config" />
                </DockLayer>

                <!-- ── Palette ───────────────────────────────────────────── -->
                <DockLayer id="palette" label="Palette">
                    <PaletteLayer :config="config" />
                </DockLayer>

                <!-- ── Flow ──────────────────────────────────────────────── -->
                <DockLayer id="flow" label="Flow">
                    <FlowLayer :config="config" />
                </DockLayer>

                <!-- ── Texture ───────────────────────────────────────────── -->
                <DockLayer id="texture" label="Texture">
                    <TextureLayer :config="config" />
                </DockLayer>

                <!-- ── Composition ───────────────────────────────────────── -->
                <DockLayer id="composition" label="Comp">
                    <CompositionLayer :config="config" />
                </DockLayer>

                <!-- ── Nuclei ────────────────────────────────────────────── -->
                <DockLayer id="nuclei" label="Nuclei">
                    <NucleiLayer :config="config" />
                </DockLayer>
            </DockLayerGroup>
        </div>
    </div>
</template>
